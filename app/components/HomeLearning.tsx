"use client";

import Link from "next/link";
import { useHydrated, useLearner } from "@/app/lib/learner/store";
import { currentStreak, dueCardIds, localDay } from "@/app/lib/learner/state";
import { ContinueLearning, type LessonLink } from "@/app/learn/LearnWidgets";
import NavIcon from "@/app/components/NavIcons";

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
    <div className="grid gap-4 md:grid-cols-2">
      <ContinueLearning lessons={lessons} inset />
      <Link href="/flashcards" className="card card-hover flex items-center gap-4 p-4">
        <span className="icon-tile h-12 w-12">
          <NavIcon href="/flashcards" className="h-5 w-5" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-xs text-muted">Flashcards</span>
          <span className="block text-lg font-bold text-text">
            {started ? (due > 0 ? `${due} card${due === 1 ? "" : "s"} due` : "All caught up") : "Start reviewing"}
          </span>
          <span className="block text-xs text-muted">
            {streak > 0 ? `🔥 ${streak}-day streak · ` : ""}My Progress tracks it all
          </span>
        </span>
        <span aria-hidden className="text-xl text-text/70">→</span>
      </Link>
    </div>
  );
}
