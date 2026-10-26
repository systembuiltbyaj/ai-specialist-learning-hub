import { describe, it, expect } from "vitest";
import { DICTIONARY, type DictionaryTerm } from "@/data/dictionary";
import { DictionaryTermSchema } from "@/app/lib/content/schema";
import { ageInDays, freshnessReport } from "@/app/lib/content/freshness";

function term(overrides: Partial<DictionaryTerm> = {}): DictionaryTerm {
  return {
    id: "sample-term",
    term: "Sample Term",
    aliases: [],
    category: "AI Foundations",
    level: "Beginner",
    definition: "A placeholder definition long enough to pass validation.",
    whyItMatters: "It exercises the schema.",
    related: [],
    ...overrides,
  };
}

describe("dictionary content", () => {
  it("every entry passes the schema", () => {
    const failures = DICTIONARY.flatMap((entry) => {
      const result = DictionaryTermSchema.safeParse(entry);
      return result.success ? [] : [`${entry.id}: ${result.error.issues.map((i) => `${i.path.join(".")} ${i.message}`).join("; ")}`];
    });
    expect(failures).toEqual([]);
  });

  it("ids are unique", () => {
    const ids = DICTIONARY.map((entry) => entry.id);
    expect(ids.length).toBe(new Set(ids).size);
  });

  it("every related id and supersededBy resolves, and no entry relates to itself", () => {
    const report = freshnessReport(DICTIONARY, new Date());
    expect(report.brokenRelated).toEqual([]);
    expect(report.supersededMissing).toEqual([]);
    expect(DICTIONARY.filter((entry) => entry.related.includes(entry.id)).map((entry) => entry.id)).toEqual([]);
  });
});

describe("DictionaryTermSchema", () => {
  it("rejects a deprecated term with no successor or note", () => {
    expect(DictionaryTermSchema.safeParse(term({ status: "deprecated" })).success).toBe(false);
    expect(DictionaryTermSchema.safeParse(term({ status: "deprecated", supersededBy: "other-term" })).success).toBe(true);
  });

  it("rejects non-https sources and malformed dates", () => {
    expect(DictionaryTermSchema.safeParse(term({ sources: [{ label: "Docs", url: "http://example.com" }] })).success).toBe(false);
    expect(DictionaryTermSchema.safeParse(term({ lastVerified: "2026-13-40" })).success).toBe(false);
    expect(DictionaryTermSchema.safeParse(term({ lastVerified: "Oct 2026" })).success).toBe(false);
    expect(
      DictionaryTermSchema.safeParse(term({ sources: [{ label: "Docs", url: "https://example.com" }], lastVerified: "2026-10-26" })).success,
    ).toBe(true);
  });

  it("rejects unknown fields so typos don't silently drop data", () => {
    expect(DictionaryTermSchema.safeParse({ ...term(), lastVerifed: "2026-10-26" }).success).toBe(false);
  });
});

describe("freshnessReport", () => {
  const today = new Date("2026-10-26T00:00:00Z");

  it("computes age in whole days", () => {
    expect(ageInDays("2026-10-25", today)).toBe(1);
    expect(ageInDays("2026-10-26", today)).toBe(0);
  });

  it("flags stale, unverified, unsourced and broken references", () => {
    const report = freshnessReport(
      [
        term({ id: "fresh", lastVerified: "2026-10-01", sources: [{ label: "Docs", url: "https://a.dev" }] }),
        term({ id: "old", lastVerified: "2026-01-01", sources: [{ label: "Docs", url: "https://a.dev" }] }),
        term({ id: "bare", related: ["fresh", "ghost"], supersededBy: "gone" }),
      ],
      today,
      120,
    );
    expect(report.stale).toEqual([{ id: "old", lastVerified: "2026-01-01", ageDays: 298 }]);
    expect(report.unverified).toEqual(["bare"]);
    expect(report.unsourced).toEqual(["bare"]);
    expect(report.brokenRelated).toEqual([{ id: "bare", missing: ["ghost"] }]);
    expect(report.supersededMissing).toEqual([{ id: "bare", supersededBy: "gone" }]);
  });

  it("does not flag an entry exactly at the age limit", () => {
    const report = freshnessReport([term({ lastVerified: "2026-06-28" })], today, 120);
    expect(report.stale).toEqual([]);
  });
});
