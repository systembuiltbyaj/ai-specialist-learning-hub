"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { replaceLearnerState, useHydrated, useLearner } from "@/app/lib/learner/store";
import {
  currentStreak,
  dueCardIds,
  emptyState,
  localDay,
  nextLessonId,
  parseState,
  serializeState,
  weakTermIds,
} from "@/app/lib/learner/state";
import { downloadFile } from "@/app/lib/export";

export interface MeCatalog {
  terms: Record<string, { title: string; href: string }>;
  lessons: { id: string; title: string; href: string; pathId: string }[];
  paths: { id: string; title: string; lessonIds: string[] }[];
  projects: { id: string; title: string; href: string; steps: number }[];
}

function Stat({ value, label, hint }: { value: string | number; label: string; hint?: string }) {
  return (
    <div className="card p-4">
      <div className="text-3xl font-black text-gold">{value}</div>
      <div className="mt-0.5 text-sm text-text/80">{label}</div>
      {hint && <div className="text-xs text-muted">{hint}</div>}
    </div>
  );
}

function Panel({ title, action, children }: { title: string; action?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="card p-5">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="eyebrow">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

export default function MeClient({ catalog }: { catalog: MeCatalog }) {
  const [learner] = useLearner();
  const hydrated = useHydrated();
  const today = localDay(new Date());
  const fileInput = useRef<HTMLInputElement>(null);
  const [notice, setNotice] = useState<{ tone: "ok" | "error"; text: string } | null>(null);
  const [confirmingReset, setConfirmingReset] = useState(false);

  const derived = useMemo(() => {
    const deck = Object.keys(catalog.terms);
    const lessonIds = catalog.lessons.map((l) => l.id);
    const nextId = nextLessonId(lessonIds, learner);
    const interview = Object.values(learner.interview);
    return {
      streak: currentStreak(learner.activeDays, today),
      lessonsDone: lessonIds.filter((id) => learner.lessons[id]).length,
      next: catalog.lessons.find((l) => l.id === nextId),
      dueCards: dueCardIds(deck, learner, today, 0).length,
      inRotation: deck.filter((id) => learner.cards[id]).length,
      weak: weakTermIds(learner, 8).filter((id) => catalog.terms[id]),
      projectsStarted: catalog.projects.filter((p) => (learner.projectSteps[p.id]?.length ?? 0) > 0),
      interview: {
        nailed: interview.filter((r) => r.rating === "nailed").length,
        shaky: interview.filter((r) => r.rating === "shaky").length,
        missed: interview.filter((r) => r.rating === "missed").length,
      },
    };
  }, [catalog, learner, today]);

  if (!hydrated) return <div className="card p-10 text-center text-muted">Loading your progress…</div>;

  const titleFor = (kind: string, id: string) => {
    if (kind === "term") return catalog.terms[id];
    if (kind === "lesson") return catalog.lessons.find((l) => l.id === id);
    return catalog.projects.find((p) => p.id === id);
  };
  const bookmarks = learner.bookmarks
    .map((b) => ({ ...b, target: titleFor(b.kind, b.id) }))
    .filter((b): b is typeof b & { target: { title: string; href: string } } => Boolean(b.target));

  const exportBackup = () => {
    downloadFile(serializeState(learner), `systemlab-progress-${today}.json`, "application/json");
    setNotice({ tone: "ok", text: "Backup downloaded." });
  };

  const importBackup = async (file: File) => {
    // A backup is untrusted input: size-capped and schema-validated before it replaces anything.
    if (file.size > 2_000_000) {
      setNotice({ tone: "error", text: "That file is too large to be a SystemLab backup." });
      return;
    }
    const parsed = parseState(await file.text());
    if (!parsed.ok) {
      setNotice({ tone: "error", text: parsed.error });
      return;
    }
    replaceLearnerState(parsed.state);
    setNotice({ tone: "ok", text: "Progress restored from backup." });
  };

  const isEmpty =
    learner.activeDays.length === 0 && learner.bookmarks.length === 0 && Object.keys(learner.cards).length === 0;

  return (
    <div className="space-y-6">
      {isEmpty && (
        <div className="card border-gold/40 p-5">
          <p className="font-bold text-gold">Nothing here yet — that changes fast.</p>
          <p className="mt-1 text-sm text-muted">
            Finish a lesson, review a few flashcards or take a quiz, and this page fills in.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Link href="/learn" className="btn-gold px-4 py-2 text-xs">
              Start the first lesson →
            </Link>
            <Link href="/flashcards" className="btn-ghost px-4 py-2 text-xs">
              Try flashcards
            </Link>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat value={derived.streak} label={`day streak`} hint={`${learner.activeDays.length} active days total`} />
        <Stat value={`${derived.lessonsDone}/${catalog.lessons.length}`} label="lessons done" />
        <Stat value={derived.dueCards} label="flashcards due" hint={`${derived.inRotation} in rotation`} />
        <Stat value={learner.quiz.history.length} label="quizzes taken" hint={`${derived.weak.length} weak spots`} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Learning paths" action={<Link href="/learn" className="text-xs text-gold hover:underline">All paths →</Link>}>
          <ul className="space-y-3">
            {catalog.paths.map((path) => {
              const done = path.lessonIds.filter((id) => learner.lessons[id]).length;
              const pct = Math.round((done / path.lessonIds.length) * 100);
              return (
                <li key={path.id}>
                  <div className="flex justify-between text-sm">
                    <span className="text-text/85">{path.title}</span>
                    <span className="font-mono text-xs text-muted">
                      {done}/{path.lessonIds.length}
                    </span>
                  </div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-text/10">
                    <div className="h-full rounded-full bg-gradient-to-r from-gold to-violet-soft" style={{ width: `${pct}%` }} />
                  </div>
                </li>
              );
            })}
          </ul>
          {derived.next && (
            <Link href={derived.next.href} className="mt-4 flex items-center justify-between rounded-lg border border-violet-soft/30 bg-violet-soft/[0.08] p-3 text-sm">
              <span>
                <span className="eyebrow block">Next lesson</span>
                <span className="font-semibold text-text">{derived.next.title}</span>
              </span>
              <span className="text-gold">→</span>
            </Link>
          )}
        </Panel>

        <Panel title="Weak spots" action={derived.weak.length > 0 && <Link href="/quiz" className="text-xs text-gold hover:underline">Drill them →</Link>}>
          {derived.weak.length === 0 ? (
            <p className="text-sm text-muted">No weak spots yet. Terms you miss in quizzes show up here.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {derived.weak.map((id) => (
                <Link key={id} href={catalog.terms[id].href} className="chip hover:border-gold/60">
                  {catalog.terms[id].title}
                  <span className="ml-1 text-muted">×{learner.quiz.missed[id]}</span>
                </Link>
              ))}
            </div>
          )}
          {Object.keys(learner.quiz.bests).length > 0 && (
            <div className="mt-4">
              <p className="mb-1.5 text-xs text-muted">Best exam scores</p>
              <ul className="space-y-1 text-sm">
                {Object.entries(learner.quiz.bests).map(([subject, best]) => (
                  <li key={subject} className="flex justify-between">
                    <span className="text-text/80">{subject}</span>
                    <span className="font-mono text-gold">{best.pct}%</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Panel>

        <Panel title="Projects in progress" action={<Link href="/projects" className="text-xs text-gold hover:underline">All projects →</Link>}>
          {derived.projectsStarted.length === 0 ? (
            <p className="text-sm text-muted">Tick off a step on any project and it appears here.</p>
          ) : (
            <ul className="space-y-2.5">
              {derived.projectsStarted.map((p) => {
                const done = learner.projectSteps[p.id]?.length ?? 0;
                return (
                  <li key={p.id}>
                    <Link href={p.href} className="flex justify-between text-sm hover:text-gold">
                      <span className="text-text/85">{p.title}</span>
                      <span className="font-mono text-xs text-muted">
                        {done}/{p.steps} steps
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </Panel>

        <Panel title="Interview readiness" action={<Link href="/interview" className="text-xs text-gold hover:underline">Practise →</Link>}>
          {derived.interview.nailed + derived.interview.shaky + derived.interview.missed === 0 ? (
            <p className="text-sm text-muted">Run a practice round in Interview and your ratings show up here.</p>
          ) : (
            <div className="flex gap-6 text-sm">
              <span className="text-success">{derived.interview.nailed} nailed</span>
              <span className="text-gold">{derived.interview.shaky} shaky</span>
              <span className="text-danger">{derived.interview.missed} missed</span>
            </div>
          )}
        </Panel>
      </div>

      <Panel title={`Bookmarks (${bookmarks.length})`}>
        {bookmarks.length === 0 ? (
          <p className="text-sm text-muted">Use ☆ Save on any term, lesson or project to keep it here.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-3">
            {(["term", "lesson", "project"] as const).map((kind) => {
              const items = bookmarks.filter((b) => b.kind === kind);
              if (items.length === 0) return null;
              return (
                <div key={kind}>
                  <p className="mb-1.5 text-xs uppercase tracking-wider text-muted">{kind}s</p>
                  <ul className="space-y-1">
                    {items.map((b) => (
                      <li key={`${b.kind}-${b.id}`}>
                        <Link href={b.target.href} className="text-sm text-text/85 hover:text-gold">
                          {b.target.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        )}
      </Panel>

      <Panel title="Backup & restore">
        <p className="text-sm text-muted">
          Download your progress as a file, or restore it on another browser. Restoring replaces what&apos;s here now.
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <button onClick={exportBackup} className="btn-violet px-4 py-2 text-xs">
            ⬇ Download backup
          </button>
          <button onClick={() => fileInput.current?.click()} className="btn-ghost px-4 py-2 text-xs">
            ⬆ Restore from file
          </button>
          <input
            ref={fileInput}
            type="file"
            accept="application/json,.json"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) void importBackup(file);
              e.target.value = "";
            }}
          />
          {confirmingReset ? (
            <span className="ml-auto flex items-center gap-2 text-xs">
              <span className="text-muted">Erase all progress?</span>
              <button
                onClick={() => {
                  replaceLearnerState(emptyState());
                  setConfirmingReset(false);
                  setNotice({ tone: "ok", text: "Progress reset." });
                }}
                className="rounded-md border border-danger/60 px-3 py-1.5 text-danger hover:bg-danger/10"
              >
                Erase
              </button>
              <button onClick={() => setConfirmingReset(false)} className="btn-ghost px-3 py-1.5">
                Keep
              </button>
            </span>
          ) : (
            <button onClick={() => setConfirmingReset(true)} className="ml-auto text-xs text-muted hover:text-neon-pink">
              Reset progress
            </button>
          )}
        </div>
        {notice && (
          <p role="status" className={`mt-3 text-xs ${notice.tone === "ok" ? "text-success" : "text-danger"}`}>
            {notice.text}
          </p>
        )}
      </Panel>
    </div>
  );
}
