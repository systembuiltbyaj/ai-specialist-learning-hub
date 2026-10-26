import { describe, it, expect } from "vitest";
import { DICTIONARY } from "@/data/dictionary";
import { generateQuiz, QUIZ_SUBJECTS } from "@/app/lib/quiz";

const deprecated = DICTIONARY.filter((term) => term.status === "deprecated");
const deprecatedIds = new Set(deprecated.map((term) => term.id));
const deprecatedNames = new Set(deprecated.map((term) => term.term));

describe("generateQuiz", () => {
  it("has deprecated terms to exclude (guards against this test going vacuous)", () => {
    expect(deprecated.length).toBeGreaterThan(0);
  });

  // Quizzes are random, so sample each subject repeatedly with the largest pool.
  it("never asks about, or offers as an option, a deprecated term", () => {
    for (const { key } of QUIZ_SUBJECTS) {
      for (let run = 0; run < 25; run++) {
        for (const question of generateQuiz(key, "All", 20)) {
          expect(deprecatedIds.has(question.termId), `${key}: asked about ${question.termId}`).toBe(false);
          for (const option of question.options) {
            expect(deprecatedNames.has(option), `${key}: offered ${option}`).toBe(false);
          }
        }
      }
    }
  });

  it("always builds four distinct options with the answer among them", () => {
    for (const question of generateQuiz("Tech Dictionary", "All", 20)) {
      expect(question.options).toHaveLength(4);
      expect(new Set(question.options).size).toBe(4);
      expect(question.correctIndex).toBeGreaterThanOrEqual(0);
      expect(question.correctIndex).toBeLessThan(4);
    }
  });
});
