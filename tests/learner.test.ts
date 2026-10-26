import { describe, it, expect } from "vitest";
import {
  addCards,
  addDays,
  currentStreak,
  dueCardIds,
  emptyState,
  isBookmarked,
  markActive,
  nextLessonId,
  parseState,
  practiceOrder,
  rateInterviewAnswer,
  recordQuizRun,
  reviewCard,
  serializeState,
  setLessonComplete,
  toggleBookmark,
  toggleProjectStep,
  weakTermIds,
} from "@/app/lib/learner/state";

const NOW = new Date("2026-10-26T09:00:00");
const TODAY = "2026-10-26";

describe("dates", () => {
  it("adds days across month and year boundaries", () => {
    expect(addDays("2026-10-31", 1)).toBe("2026-11-01");
    expect(addDays("2026-12-31", 1)).toBe("2027-01-01");
    expect(addDays("2026-03-01", -1)).toBe("2026-02-28");
  });
});

describe("bookmarks", () => {
  it("toggles on and off without touching other bookmarks", () => {
    let state = toggleBookmark(emptyState(), "term", "rag", NOW);
    state = toggleBookmark(state, "lesson", "rag", NOW);
    expect(isBookmarked(state, "term", "rag")).toBe(true);
    state = toggleBookmark(state, "term", "rag", NOW);
    expect(isBookmarked(state, "term", "rag")).toBe(false);
    expect(isBookmarked(state, "lesson", "rag")).toBe(true);
  });
});

describe("lessons and projects", () => {
  it("finds the first incomplete lesson in path order", () => {
    const order = ["a", "b", "c"];
    let state = setLessonComplete(emptyState(), "a", true, NOW);
    expect(nextLessonId(order, state)).toBe("b");
    state = setLessonComplete(state, "b", true, NOW);
    state = setLessonComplete(state, "c", true, NOW);
    expect(nextLessonId(order, state)).toBeUndefined();
    state = setLessonComplete(state, "b", false, NOW);
    expect(nextLessonId(order, state)).toBe("b");
  });

  it("toggles project steps and keeps them sorted", () => {
    let state = toggleProjectStep(emptyState(), "p", 2);
    state = toggleProjectStep(state, "p", 0);
    expect(state.projectSteps.p).toEqual([0, 2]);
    state = toggleProjectStep(state, "p", 2);
    expect(state.projectSteps.p).toEqual([0]);
  });
});

describe("flashcards", () => {
  it("promotes a known card and spaces it out", () => {
    const state = reviewCard(emptyState(), "rag", "good", TODAY);
    expect(state.cards.rag).toEqual({ box: 2, due: "2026-10-28", reviews: 1, lapses: 0 });
  });

  it("keeps a hard card in its box", () => {
    let state = reviewCard(emptyState(), "rag", "good", TODAY);
    state = reviewCard(state, "rag", "hard", "2026-10-28");
    expect(state.cards.rag.box).toBe(2);
    expect(state.cards.rag.due).toBe("2026-10-30");
  });

  it("drops a missed card to box 1, due today, and counts the lapse", () => {
    let state = reviewCard(emptyState(), "rag", "good", TODAY);
    state = reviewCard(state, "rag", "good", "2026-10-28");
    state = reviewCard(state, "rag", "again", "2026-11-01");
    expect(state.cards.rag).toMatchObject({ box: 1, due: "2026-11-01", lapses: 1, reviews: 3 });
  });

  it("caps the box at 5", () => {
    let state = emptyState();
    for (let i = 0; i < 8; i++) state = reviewCard(state, "rag", "good", TODAY);
    expect(state.cards.rag.box).toBe(5);
  });

  it("adds missed terms as due today without resetting cards already in rotation", () => {
    let state = reviewCard(emptyState(), "rag", "good", TODAY);
    state = addCards(state, ["rag", "mcp"], TODAY);
    expect(state.cards.rag.box).toBe(2);
    expect(state.cards.mcp).toEqual({ box: 1, due: TODAY, reviews: 0, lapses: 0 });
  });

  it("serves due cards first, then a limited number of new ones", () => {
    let state = reviewCard(emptyState(), "due-old", "again", "2026-10-20");
    state = reviewCard(state, "not-due", "good", TODAY);
    const deck = ["due-old", "not-due", "new-1", "new-2", "new-3"];
    expect(dueCardIds(deck, state, TODAY, 2)).toEqual(["due-old", "new-1", "new-2"]);
  });
});

describe("quiz history", () => {
  const run = (correct: number, total: number, mode: "exam" | "practice" = "exam") => ({
    subject: "Claude",
    mode,
    correct,
    total,
    date: NOW.toISOString(),
  });

  it("tracks weak terms and lets correct answers earn them back", () => {
    let { state } = recordQuizRun(emptyState(), run(0, 2), [
      { termId: "mcp", correct: false },
      { termId: "rag", correct: false },
    ]);
    ({ state } = recordQuizRun(state, run(1, 2), [
      { termId: "mcp", correct: false },
      { termId: "rag", correct: true },
    ]));
    expect(state.quiz.missed).toEqual({ mcp: 2 });
    expect(weakTermIds(state)).toEqual(["mcp"]);
  });

  it("records a new best only for exam runs that beat the previous best", () => {
    const first = recordQuizRun(emptyState(), run(6, 10), []);
    expect(first.newBest).toBe(true);
    const worse = recordQuizRun(first.state, run(5, 10), []);
    expect(worse.newBest).toBe(false);
    const practice = recordQuizRun(first.state, run(10, 10, "practice"), []);
    expect(practice.newBest).toBe(false);
    expect(practice.state.quiz.bests.Claude.pct).toBe(60);
  });

  it("caps history length", () => {
    let state = emptyState();
    for (let i = 0; i < 60; i++) state = recordQuizRun(state, run(1, 1), []).state;
    expect(state.quiz.history).toHaveLength(50);
  });
});

describe("interview practice", () => {
  it("orders missed, then shaky, then unrated, then nailed — oldest first within a band", () => {
    let state = rateInterviewAnswer(emptyState(), "nailed", "nailed", new Date("2026-10-01"));
    state = rateInterviewAnswer(state, "shaky", "shaky", new Date("2026-10-02"));
    state = rateInterviewAnswer(state, "missed-new", "missed", new Date("2026-10-20"));
    state = rateInterviewAnswer(state, "missed-old", "missed", new Date("2026-10-10"));
    expect(practiceOrder(["nailed", "unrated", "shaky", "missed-new", "missed-old"], state)).toEqual([
      "missed-old",
      "missed-new",
      "shaky",
      "unrated",
      "nailed",
    ]);
  });

  it("counts repetitions", () => {
    let state = rateInterviewAnswer(emptyState(), "q", "shaky", NOW);
    state = rateInterviewAnswer(state, "q", "nailed", NOW);
    expect(state.interview.q).toMatchObject({ rating: "nailed", reps: 2 });
  });
});

describe("activity streak", () => {
  it("counts consecutive days ending today", () => {
    let state = emptyState();
    for (const day of ["2026-10-24", "2026-10-25", "2026-10-26"]) state = markActive(state, day);
    expect(currentStreak(state.activeDays, TODAY)).toBe(3);
  });

  it("still counts a streak that ended yesterday, and breaks on a gap", () => {
    expect(currentStreak(["2026-10-25", "2026-10-24"], TODAY)).toBe(2);
    expect(currentStreak(["2026-10-24"], TODAY)).toBe(0);
  });

  it("does not duplicate today", () => {
    const state = markActive(markActive(emptyState(), TODAY), TODAY);
    expect(state.activeDays).toEqual([TODAY]);
  });
});

describe("backup", () => {
  it("round-trips through serialize and parse", () => {
    const state = toggleBookmark(reviewCard(emptyState(), "rag", "good", TODAY), "term", "rag", NOW);
    const parsed = parseState(serializeState(state));
    expect(parsed.ok && parsed.state).toEqual(state);
  });

  it("rejects malformed JSON and foreign shapes with a readable error", () => {
    expect(parseState("{not json").ok).toBe(false);
    expect(parseState(JSON.stringify({ version: 2 })).ok).toBe(false);
    const bad = parseState(JSON.stringify({ ...emptyState(), cards: { rag: { box: 9, due: "x", reviews: 0, lapses: 0 } } }));
    expect(bad.ok).toBe(false);
  });
});
