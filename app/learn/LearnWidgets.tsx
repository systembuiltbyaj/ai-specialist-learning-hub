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
      className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border text-xs font-bold ${
        done ? "border-[#34d399] bg-[#34d399]/15 text-[#34d399]" : "border-line text-transparent"
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
    <div className="space-y-1.5">
      <div className="flex justify-between text-xs text-muted">
        <span>
          {done} of {lessonIds.length} lessons
        </span>
        <span>{pct}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/10" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
        <div className="h-full rounded-full bg-gradient-to-r from-gold to-violet-soft transition-all" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export function ContinueLearning({ lessons }: { lessons: LessonLink[] }) {
  const [learner] = useLearner();
  const hydrated = useHydrated();
  if (!hydrated) return null;

  const done = lessons.filter((l) => learner.lessons[l.id]).length;
  const nextId = nextLessonId(lessons.map((l) => l.id), learner);
  const next = lessons.find((l) => l.id === nextId);

  if (!next) {
    return (
      <div className="card border-gold/40 p-5">
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

  return (
    <Link href={next.href} className="card card-hover flex items-center justify-between gap-4 border-gold/40 p-5">
      <div className="min-w-0">
        <p className="eyebrow">{done === 0 ? "Start here" : "Continue where you left off"}</p>
        <p className="mt-1 truncate text-lg font-bold text-text">{next.title}</p>
        <p className="text-xs text-muted">
          {next.pathTitle} · {next.minutes} min · {done} of {lessons.length} lessons done
        </p>
      </div>
      <span className="btn-gold shrink-0 px-4 py-2 text-xs">{done === 0 ? "Start →" : "Continue →"}</span>
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
    <div className="card space-y-4 p-5">
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => update((state) => setLessonComplete(state, lessonId, !done, new Date()))}
          aria-pressed={done}
          className={done ? "btn-ghost px-5" : "btn-gold px-5"}
        >
          {done ? "✓ Completed — undo" : "Mark lesson complete"}
        </button>
        <Link href={quizHref} className="btn-violet px-5">
          Quiz me on this lesson
        </Link>
      </div>
      {done && next && (
        <Link href={next.href} className="flex items-center justify-between rounded-lg border border-gold/40 bg-gold/5 p-3 text-sm">
          <span>
            <span className="eyebrow block">Up next</span>
            <span className="font-semibold text-text">{next.title}</span>
          </span>
          <span className="text-gold">→</span>
        </Link>
      )}
    </div>
  );
}
