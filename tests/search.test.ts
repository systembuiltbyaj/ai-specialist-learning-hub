import { describe, it, expect } from "vitest";
import { scoreRecord, searchRecords } from "@/app/lib/search";
import type { SearchRecord } from "@/app/lib/types";

const rec = (over: Partial<SearchRecord>): SearchRecord => ({
  type: "term",
  title: "Token",
  keywords: [],
  snippet: "A chunk of text.",
  category: "AI Foundations",
  url: "/dictionary/token",
  ...over,
});

describe("scoreRecord", () => {
  it("ranks an exact title match above a prefix match", () => {
    expect(scoreRecord(rec({ title: "RAG" }), "rag")).toBeGreaterThan(
      scoreRecord(rec({ title: "RAG Pipeline" }), "rag"),
    );
  });

  it("ranks a prefix match above an exact keyword match", () => {
    expect(scoreRecord(rec({ title: "Ragged" }), "rag")).toBeGreaterThan(
      scoreRecord(rec({ title: "Retrieval", keywords: ["RAG"] }), "rag"),
    );
  });

  it("ranks a keyword match above a snippet-only match", () => {
    expect(scoreRecord(rec({ title: "Retrieval", keywords: ["RAG"] }), "rag")).toBeGreaterThan(
      scoreRecord(rec({ title: "Retrieval", snippet: "uses rag internally" }), "rag"),
    );
  });

  it("returns 0 when nothing matches", () => {
    expect(scoreRecord(rec({}), "zzzz")).toBe(0);
  });

  it("returns 0 for a blank query", () => {
    expect(scoreRecord(rec({}), "   ")).toBe(0);
  });

  it("is case insensitive", () => {
    expect(scoreRecord(rec({ title: "Token" }), "TOKEN")).toBe(
      scoreRecord(rec({ title: "Token" }), "token"),
    );
  });
});

describe("searchRecords", () => {
  const records = [
    rec({ title: "Token" }),
    rec({ title: "Context Window", url: "/dictionary/context-window" }),
    rec({ title: "Tokenizer", url: "/dictionary/tokenizer" }),
  ];

  it("returns exact matches first", () => {
    expect(searchRecords(records, "token")[0].title).toBe("Token");
  });

  it("drops non-matches", () => {
    expect(searchRecords(records, "token").some((r) => r.title === "Context Window")).toBe(false);
  });

  it("returns nothing for a blank query", () => {
    expect(searchRecords(records, "   ")).toEqual([]);
  });

  it("respects the limit", () => {
    expect(searchRecords(records, "token", 1)).toHaveLength(1);
  });

  it("sorts ties alphabetically for a stable order", () => {
    const tied = [
      rec({ title: "Zebra Model", snippet: "mentions alpha" }),
      rec({ title: "Alpha Model", snippet: "mentions alpha" }),
    ];
    expect(searchRecords(tied, "alpha").map((r) => r.title)).toEqual([
      "Alpha Model",
      "Zebra Model",
    ]);
  });
});
