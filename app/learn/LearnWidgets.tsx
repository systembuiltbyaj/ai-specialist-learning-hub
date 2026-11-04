"use client";

import Link from "next/link";
import { useHydrated, useLearner } from "@/app/lib/learner/store";
import { nextLessonId, setLessonComplete } from "@/app/lib/learner/state";

// Small client islands for otherwise-static learning pages. Each renders the
// "nothing done yet" state on the server and fills in from browser storage.

export interface LessonLink {
  id: string;
  title: string;
  href: string;
  pathTitle: string;
  minutes: number;
}

export function LessonDone({ lessonId }: { lessonId: string }) {
  const [learner] = useLearner();
  const hydrated = useHydrated();
  const done = hydrated && Boolean(learner.lessons[lessonId]);
  return (
    <span
      aria-label={done ? "Completed" : "Not completed"}
      className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border-[1.5px] text-xs font-bold transition-colors ${
        done ? "border-success bg-success/15 text-success" : "border-violet-soft/40 text-transparent"
      }`}
    >
      ✓
    </span>
  );
}

export function PathProgress({ lessonIds }: { lessonIds: string[] }) {
  const [learner] = useLearner();
  const hydrated = useHydrated();
  const done = hydrated ? lessonIds.filter((id) => learner.lessons[id]).length : 0;
  const pct = Math.round((done / lessonIds.length) * 100);
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs font-medium text-text/80">
        <span>
          {done} of {lessonIds.length} lessons
        </span>
        <span className="text-muted">{pct}%</span>
      </div>
      <div
        className="h-1.5 overflow-hidden rounded-full bg-violet-soft/15"
        role="progressbar"
        aria-label="Lessons completed"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={`h-full rounded-full transition-all ${pct === 100 ? "bg-success" : "bg-gradient-to-r from-violet-light to-violet"}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

const PLAY = (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
    <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
  </svg>
);

// The full version is the lit banner at the top of /learn; `inset` is the
// compact tile used inside the home dashboard.
export function ContinueLearning({ lessons, inset = false }: { lessons: LessonLink[]; inset?: boolean }) {
  const [learner] = useLearner();
  const hydrated = useHydrated();
  if (!hydrated) return null;

  const done = lessons.filter((l) => learner.lessons[l.id]).length;
  const nextId = nextLessonId(lessons.map((l) => l.id), learner);
  const next = lessons.find((l) => l.id === nextId);

  if (!next) {
    return (
      <div className={`card ${inset ? "" : "card-glow"} p-5`}>
        <p className="font-bold text-gold">You&apos;ve finished every lesson. 🎓</p>
        <p className="mt-1 text-sm text-muted">Lock it in with a project, or keep your memory fresh with flashcards.</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Link href="/projects" className="btn-gold px-4 py-2 text-xs">
            Pick a project →
          </Link>
          <Link href="/flashcards" className="btn-ghost px-4 py-2 text-xs">
            Review flashcards
          </Link>
        </div>
      </div>
    );
  }

  const label = done === 0 ? "Start here" : "Continue where you left off";
  const meta = `${next.pathTitle} · ${next.minutes} min · ${done} of ${lessons.length} lessons done`;

  if (inset) {
    return (
      <Link href={next.href} className="card card-hover flex items-center gap-4 p-4">
        <span className="icon-tile h-12 w-12">{PLAY}</span>
        <span className="min-w-0 flex-1">
          <span className="block text-xs text-muted">{label}</span>
          <span className="block truncate text-lg font-bold text-text">{next.title}</span>
          <span className="block truncate text-xs text-muted">{meta}</span>
        </span>
        <span aria-hidden className="text-xl text-text/70">→</span>
      </Link>
    );
  }

  return (
    <Link href={next.href} className="card card-glow card-hover flex items-center gap-4 p-5">
      <span className="icon-tile h-14 w-14">{PLAY}</span>
      <span className="min-w-0 flex-1">
        <span className="eyebrow block">{label}</span>
        <span className="mt-0.5 block truncate text-xl font-bold text-text">{next.title}</span>
        <span className="block truncate text-xs text-muted">{meta}</span>
      </span>
      <span className="btn-gold shrink-0 px-5 py-2">{done === 0 ? "Start →" : "Continue →"}</span>
    </Link>
  );
}

export function LessonActions({
  lessonId,
  quizHref,
  next,
}: {
  lessonId: string;
  quizHref: string;
  next?: { href: string; title: string };
}) {
  const [learner, update] = useLearner();
  const hydrated = useHydrated();
  const done = hydrated && Boolean(learner.lessons[lessonId]);

  return (
    <div className="card card-glow space-y-4 p-5 sm:p-6">
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={() => update((state) => setLessonComplete(state, lessonId, !done, new Date()))}
          aria-pressed={done}
          className={done ? "btn-ghost rounded-full px-5" : "btn-gold px-5"}
        >
          {done ? "✓ Completed — undo" : "Mark lesson complete"}
        </button>
        <Link href={quizHref} className="btn-violet rounded-full px-5">
          Quiz me on this lesson
        </Link>
      </div>
      {done && next && (
        <Link
          href={next.href}
          className="card card-hover flex items-center gap-4 p-3.5 text-sm"
        >
          <span className="icon-tile h-10 w-10">{PLAY}</span>
          <span className="min-w-0 flex-1">
            <span className="eyebrow block">Up next</span>
            <span className="block truncate font-semibold text-text">{next.title}</span>
          </span>
          <span aria-hidden className="text-lg text-violet-light">→</span>
        </Link>
      )}
    </div>
  );
}
