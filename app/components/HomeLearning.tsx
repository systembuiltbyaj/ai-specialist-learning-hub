"use client";

import Link from "next/link";
import { useHydrated, useLearner } from "@/app/lib/learner/store";
import { currentStreak, dueCardIds, localDay } from "@/app/lib/learner/state";
import { ContinueLearning, type LessonLink } from "@/app/learn/LearnWidgets";

// The home page's "pick up where you left off" strip. Static markup on the
// server; personal numbers appear once the browser's saved progress is read.
export default function HomeLearning({ lessons, deck }: { lessons: LessonLink[]; deck: string[] }) {
  const [learner] = useLearner();
  const hydrated = useHydrated();
  const today = localDay(new Date());
  const due = hydrated ? dueCardIds(deck, learner, today, 0).length : 0;
  const started = hydrated && Object.keys(learner.cards).length > 0;
  const streak = hydrated ? currentStreak(learner.activeDays, today) : 0;

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
      <ContinueLearning lessons={lessons} />
      <Link href="/flashcards" className="card card-hover flex items-center justify-between gap-4 p-5">
        <div>
          <p className="eyebrow">Flashcards</p>
          <p className="mt-1 text-lg font-bold text-text">
            {started ? (due > 0 ? `${due} card${due === 1 ? "" : "s"} due` : "All caught up") : "Start reviewing"}
          </p>
          <p className="text-xs text-muted">
            {streak > 0 ? `🔥 ${streak}-day streak · ` : ""}
            <span className="text-gold">My Progress</span> tracks it all
          </p>
        </div>
        <span className="text-gold">→</span>
      </Link>
    </div>
  );
}
