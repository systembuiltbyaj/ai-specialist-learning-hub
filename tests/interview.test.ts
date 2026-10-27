import { describe, it, expect } from "vitest";
import { blanksIn, isEdited, splitBlanks } from "@/app/lib/interview";
import type { InterviewEntry } from "@/app/lib/types";

const entry = (overrides: Partial<InterviewEntry> = {}): InterviewEntry => ({
  id: "iv-test",
  question: "Tell me about yourself?",
  answer: "Hi, I'm [Your Name] and I specialise in [your niche].",
  topic: "General",
  createdAt: 1,
  ...overrides,
});

describe("splitBlanks", () => {
  it("separates [blanks] from plain text, in order", () => {
    expect(splitBlanks("Hi, I'm [Your Name], hello")).toEqual([
      { text: "Hi, I'm ", blank: false },
      { text: "[Your Name]", blank: true },
      { text: ", hello", blank: false },
    ]);
  });

  it("returns plain text untouched when there are no blanks", () => {
    expect(splitBlanks("No blanks here.")).toEqual([{ text: "No blanks here.", blank: false }]);
  });

  it("ignores a stray bracket that spans a line break", () => {
    expect(splitBlanks("a [b\nc] d").every((s) => !s.blank)).toBe(true);
  });
});

describe("blanksIn", () => {
  it("counts blanks across the answer and follow-ups", () => {
    const e = entry({ followUps: [{ question: "Why?", answer: "Because [reason]." }] });
    expect(blanksIn(e)).toBe(3);
  });

  it("is zero once everything is filled in", () => {
    expect(blanksIn(entry({ answer: "Hi, I'm Sam." }))).toBe(0);
  });
});

describe("isEdited", () => {
  it("is false for an untouched template and true after a change", () => {
    const seed = entry();
    expect(isEdited({ ...seed }, seed)).toBe(false);
    expect(isEdited({ ...seed, answer: "Hi, I'm Sam." }, seed)).toBe(true);
    expect(isEdited({ ...seed, followUps: [{ question: "Q", answer: "A" }] }, seed)).toBe(true);
  });

  it("treats questions the visitor added themselves as edited", () => {
    expect(isEdited(entry({ id: "iv-123" }), undefined)).toBe(true);
  });
});
