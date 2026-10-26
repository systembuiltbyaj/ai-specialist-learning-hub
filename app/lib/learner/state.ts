import { z } from "zod";

// Everything the site remembers about one visitor, kept in their browser only.
// Pure functions over plain data: no window, no localStorage — store.ts owns that.
// Every update returns a new object so React can compare by reference.

export type BookmarkKind = "term" | "lesson" | "project";
export type CardGrade = "again" | "hard" | "good";
export type InterviewRating = "nailed" | "shaky" | "missed";

const ISO_DAY = /^\d{4}-\d{2}-\d{2}$/;

const LearnerStateSchema = z.object({
  version: z.literal(1),
  bookmarks: z.array(
    z.object({ kind: z.enum(["term", "lesson", "project"]), id: z.string().min(1), savedAt: z.string() }),
  ),
  lessons: z.record(z.string(), z.object({ completedAt: z.string() })),
  projectSteps: z.record(z.string(), z.array(z.number().int().nonnegative())),
  cards: z.record(
    z.string(),
    z.object({
      box: z.number().int().min(1).max(5),
      due: z.string().regex(ISO_DAY),
      reviews: z.number().int().nonnegative(),
      lapses: z.number().int().nonnegative(),
    }),
  ),
  quiz: z.object({
    history: z.array(
      z.object({
        subject: z.string(),
        mode: z.enum(["practice", "exam"]),
        correct: z.number().int().nonnegative(),
        total: z.number().int().positive(),
        date: z.string(),
      }),
    ),
    bests: z.record(z.string(), z.object({ pct: z.number(), correct: z.number(), total: z.number(), date: z.string() })),
    missed: z.record(z.string(), z.number().int().positive()),
  }),
  interview: z.record(
    z.string(),
    z.object({ rating: z.enum(["nailed", "shaky", "missed"]), ratedAt: z.string(), reps: z.number().int().positive() }),
  ),
  activeDays: z.array(z.string().regex(ISO_DAY)),
});

export type LearnerState = z.infer<typeof LearnerStateSchema>;
export type FlashCard = LearnerState["cards"][string];
export type QuizRun = LearnerState["quiz"]["history"][number];

export function emptyState(): LearnerState {
  return {
    version: 1,
    bookmarks: [],
    lessons: {},
    projectSteps: {},
    cards: {},
    quiz: { history: [], bests: {}, missed: {} },
    interview: {},
    activeDays: [],
  };
}

// ── Dates ─────────────────────────────────────────────────────
// Learning happens in the visitor's local day, so "today" is local, not UTC.
export function localDay(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function addDays(day: string, days: number): string {
  const [y, m, d] = day.split("-").map(Number);
  return localDay(new Date(y, m - 1, d + days));
}

// ── Bookmarks ─────────────────────────────────────────────────
export function isBookmarked(state: LearnerState, kind: BookmarkKind, id: string): boolean {
  return state.bookmarks.some((b) => b.kind === kind && b.id === id);
}

export function toggleBookmark(state: LearnerState, kind: BookmarkKind, id: string, now: Date): LearnerState {
  const bookmarks = isBookmarked(state, kind, id)
    ? state.bookmarks.filter((b) => !(b.kind === kind && b.id === id))
    : [{ kind, id, savedAt: now.toISOString() }, ...state.bookmarks];
  return { ...state, bookmarks };
}

// ── Lessons & projects ────────────────────────────────────────
export function setLessonComplete(state: LearnerState, lessonId: string, done: boolean, now: Date): LearnerState {
  const lessons = { ...state.lessons };
  if (done) lessons[lessonId] = { completedAt: now.toISOString() };
  else delete lessons[lessonId];
  return { ...state, lessons };
}

export function toggleProjectStep(state: LearnerState, projectId: string, step: number): LearnerState {
  const current = state.projectSteps[projectId] ?? [];
  const next = current.includes(step) ? current.filter((s) => s !== step) : [...current, step].sort((a, b) => a - b);
  return { ...state, projectSteps: { ...state.projectSteps, [projectId]: next } };
}

// First lesson not yet completed, walking the paths in order. Undefined once everything is done.
export function nextLessonId(orderedLessonIds: string[], state: LearnerState): string | undefined {
  return orderedLessonIds.find((id) => !state.lessons[id]);
}

// ── Flashcards: a five-box Leitner schedule ──────────────────
// A known card waits longer each time; a missed card drops to box 1 and comes
// back the same day. Simple enough to reason about, and it beats re-reading.
export const BOX_INTERVAL_DAYS: Record<number, number> = { 1: 1, 2: 2, 3: 4, 4: 8, 5: 16 };

export function reviewCard(state: LearnerState, termId: string, grade: CardGrade, today: string): LearnerState {
  const card = state.cards[termId] ?? { box: 1, due: today, reviews: 0, lapses: 0 };
  let box = card.box;
  let due: string;
  if (grade === "again") {
    box = 1;
    due = today;
  } else {
    if (grade === "good") box = Math.min(5, box + 1);
    due = addDays(today, BOX_INTERVAL_DAYS[box]);
  }
  const next: FlashCard = {
    box,
    due,
    reviews: card.reviews + 1,
    lapses: card.lapses + (grade === "again" ? 1 : 0),
  };
  return { ...state, cards: { ...state.cards, [termId]: next } };
}

// Puts terms into rotation as due today (e.g. the ones you just missed in a quiz).
// Cards already in rotation keep their schedule.
export function addCards(state: LearnerState, termIds: string[], today: string): LearnerState {
  const cards = { ...state.cards };
  for (const id of termIds) cards[id] ??= { box: 1, due: today, reviews: 0, lapses: 0 };
  return { ...state, cards };
}

// Cards already in rotation that are due, then up to `newLimit` never-seen
// cards from the deck, so a fresh visitor isn't buried under the whole dictionary.
export function dueCardIds(deck: string[], state: LearnerState, today: string, newLimit = 10): string[] {
  const due = deck
    .filter((id) => state.cards[id] && state.cards[id].due <= today)
    .sort((a, b) => state.cards[a].due.localeCompare(state.cards[b].due) || state.cards[a].box - state.cards[b].box);
  const fresh = deck.filter((id) => !state.cards[id]).slice(0, newLimit);
  return [...due, ...fresh];
}

// ── Quiz ──────────────────────────────────────────────────────
const HISTORY_LIMIT = 50;

export function recordQuizRun(
  state: LearnerState,
  run: QuizRun,
  results: { termId: string; correct: boolean }[],
): { state: LearnerState; newBest: boolean } {
  const missed = { ...state.quiz.missed };
  for (const { termId, correct } of results) {
    // A miss makes a term weaker; getting it right later earns it back.
    const count = (missed[termId] ?? 0) + (correct ? -1 : 1);
    if (count > 0) missed[termId] = count;
    else delete missed[termId];
  }

  const pct = Math.round((run.correct / run.total) * 100);
  const previous = state.quiz.bests[run.subject];
  const newBest = run.mode === "exam" && (!previous || pct > previous.pct);
  const bests = newBest
    ? { ...state.quiz.bests, [run.subject]: { pct, correct: run.correct, total: run.total, date: run.date } }
    : state.quiz.bests;

  return {
    state: { ...state, quiz: { history: [run, ...state.quiz.history].slice(0, HISTORY_LIMIT), bests, missed } },
    newBest,
  };
}

export function weakTermIds(state: LearnerState, limit = 20): string[] {
  return Object.entries(state.quiz.missed)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limit)
    .map(([id]) => id);
}

// ── Interview practice ────────────────────────────────────────
export function rateInterviewAnswer(
  state: LearnerState,
  entryId: string,
  rating: InterviewRating,
  now: Date,
): LearnerState {
  const reps = (state.interview[entryId]?.reps ?? 0) + 1;
  return { ...state, interview: { ...state.interview, [entryId]: { rating, ratedAt: now.toISOString(), reps } } };
}

const RATING_PRIORITY: Record<InterviewRating | "unrated", number> = { missed: 0, shaky: 1, unrated: 2, nailed: 3 };

// Weakest answers first; within a band, the one practised longest ago.
export function practiceOrder(entryIds: string[], state: LearnerState): string[] {
  return [...entryIds].sort((a, b) => {
    const ra = state.interview[a];
    const rb = state.interview[b];
    const pa = RATING_PRIORITY[ra?.rating ?? "unrated"];
    const pb = RATING_PRIORITY[rb?.rating ?? "unrated"];
    if (pa !== pb) return pa - pb;
    return (ra?.ratedAt ?? "").localeCompare(rb?.ratedAt ?? "");
  });
}

// ── Activity ──────────────────────────────────────────────────
const ACTIVE_DAYS_LIMIT = 120;

export function markActive(state: LearnerState, today: string): LearnerState {
  if (state.activeDays[0] === today) return state;
  const activeDays = [today, ...state.activeDays.filter((d) => d !== today)].slice(0, ACTIVE_DAYS_LIMIT);
  return { ...state, activeDays };
}

// Consecutive active days ending today — or yesterday, so the count doesn't
// read zero just because you haven't opened the site yet this morning.
export function currentStreak(activeDays: string[], today: string): number {
  const days = new Set(activeDays);
  let cursor = days.has(today) ? today : addDays(today, -1);
  let streak = 0;
  while (days.has(cursor)) {
    streak += 1;
    cursor = addDays(cursor, -1);
  }
  return streak;
}

// ── Backup ────────────────────────────────────────────────────
export function serializeState(state: LearnerState): string {
  return JSON.stringify(state, null, 2);
}

// Validates untrusted JSON (a restored backup, or whatever is in localStorage).
export function parseState(raw: string): { ok: true; state: LearnerState } | { ok: false; error: string } {
  let data: unknown;
  try {
    data = JSON.parse(raw);
  } catch {
    return { ok: false, error: "That file isn't valid JSON." };
  }
  const result = LearnerStateSchema.safeParse(data);
  return result.success
    ? { ok: true, state: result.data }
    : { ok: false, error: "That file isn't a SystemLab backup (or it's from an incompatible version)." };
}
