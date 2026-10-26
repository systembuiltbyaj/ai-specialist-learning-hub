"use client";

import { useCallback, useSyncExternalStore } from "react";
import { emptyState, localDay, markActive, parseState, serializeState, type LearnerState } from "./state";

// Browser persistence for the learner state. One key, validated on every read,
// shared by every component through useSyncExternalStore — so a bookmark set on
// one card shows on the progress page, in this tab and in any other open tab.

const STORAGE_KEY = "lh.learner.v1";
// Best scores lived here before the learner store existed; folded in once.
const LEGACY_QUIZ_BESTS_KEY = "lh.quiz.bests.v1";

// Stable reference for server rendering and the hydration pass, so static pages
// render "no progress yet" markup and then fill in on the client without a mismatch.
const SERVER_SNAPSHOT = emptyState();

let cache: LearnerState | null = null;
const listeners = new Set<() => void>();

function migrateLegacy(state: LearnerState): LearnerState {
  try {
    const raw = localStorage.getItem(LEGACY_QUIZ_BESTS_KEY);
    if (!raw) return state;
    const legacy = JSON.parse(raw) as Record<string, { pct: number; correct: number; total: number; date: string }>;
    const bests = { ...state.quiz.bests };
    for (const [subject, best] of Object.entries(legacy)) {
      if (typeof best?.pct === "number" && !bests[subject]) {
        bests[subject] = { pct: best.pct, correct: best.correct, total: best.total, date: best.date };
      }
    }
    localStorage.removeItem(LEGACY_QUIZ_BESTS_KEY);
    return { ...state, quiz: { ...state.quiz, bests } };
  } catch {
    return state;
  }
}

function read(): LearnerState {
  if (cache) return cache;
  let state = emptyState();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = parseState(raw);
      // Corrupt or incompatible data is ignored rather than crashing the page.
      if (parsed.ok) state = parsed.state;
    }
    state = migrateLegacy(state);
  } catch {
    // Storage blocked (private mode, disabled site data): run in memory only.
  }
  cache = state;
  return state;
}

function write(next: LearnerState) {
  cache = next;
  try {
    localStorage.setItem(STORAGE_KEY, serializeState(next));
  } catch {
    // Quota or privacy mode: keep working in memory for this visit.
  }
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key !== STORAGE_KEY) return;
    cache = null;
    listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

/** Current learner state plus an updater. Any update counts today as an active day. */
export function useLearner() {
  const state = useSyncExternalStore(subscribe, read, () => SERVER_SNAPSHOT);
  const update = useCallback((change: (current: LearnerState) => LearnerState) => {
    write(markActive(change(read()), localDay(new Date())));
  }, []);
  return [state, update] as const;
}

/** Replace everything — used by backup restore and reset. */
export function replaceLearnerState(next: LearnerState) {
  write(next);
}

const noopSubscribe = () => () => {};

/** False during server render and hydration, true once client data is readable. */
export function useHydrated(): boolean {
  return useSyncExternalStore(noopSubscribe, () => true, () => false);
}
