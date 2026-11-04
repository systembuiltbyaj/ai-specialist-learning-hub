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
import NavIcon from "@/app/components/NavIcons";
import Glyph from "./Glyph";

export interface MeCatalog {
  terms: Record<string, { title: string; href: string }>;
  lessons: { id: string; title: string; href: string; pathId: string }[];
  paths: { id: string; title: string; lessonIds: string[] }[];
  projects: { id: string; title: string; href: string; steps: number }[];
}

function Bar({ pct, className = "" }: { pct: number; className?: string }) {
  return (
    <div className={`h-1.5 overflow-hidden rounded-full bg-text/10 ${className}`}>
      <div
        className="h-full rounded-full bg-gradient-to-r from-violet-soft to-violet-light transition-[width] duration-500"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

function Stat({
  icon,
  value,
  label,
  hint,
  pct,
}: {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  hint?: string;
  pct?: number;
}) {
  return (
    <div className="card p-4 sm:p-5">
      <span className="block text-violet-light">{icon}</span>
      <div className="mt-3 text-3xl font-extrabold leading-none tracking-[-0.03em] text-neon-yellow">{value}</div>
      <div className="mt-1.5 text-[0.9375rem] font-medium text-text">{label}</div>
      {hint && <div className="mt-0.5 text-xs text-muted">{hint}</div>}
      {pct !== undefined && <Bar pct={pct} className="mt-3" />}
    </div>
  );
}

function Panel({
  icon,
  title,
  action,
  className = "",
  children,
}: {
  icon: React.ReactNode;
  title: string;
  action?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section className={`card p-5 sm:p-6 ${className}`}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="flex items-center gap-3 text-lg font-bold tracking-[-0.02em] text-text sm:text-xl">
          <span className="text-violet-light">{icon}</span>
          {title}
        </h2>
        {action}
      </div>
      {children}
    </section>
  );
}

function PanelLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-neon-yellow hover:underline">
      {children}
      <Glyph name="arrow" className="h-4 w-4" />
    </Link>
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
    downloadFile(serializeState(learner), `aj-learning-hub-progress-${today}.json`, "application/json");
    setNotice({ tone: "ok", text: "Backup downloaded." });
  };

  const importBackup = async (file: File) => {
    // A backup is untrusted input: size-capped and schema-validated before it replaces anything.
    if (file.size > 2_000_000) {
      setNotice({ tone: "error", text: "That file is too large to be an AJ Learning Hub backup." });
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

  const lessonPct = catalog.lessons.length ? Math.round((derived.lessonsDone / catalog.lessons.length) * 100) : 0;
  const ratings = [
    { key: "nailed", label: "Nailed", count: derived.interview.nailed, bar: "bg-success/70", text: "text-success" },
    { key: "shaky", label: "Shaky", count: derived.interview.shaky, bar: "bg-neon-yellow/70", text: "text-neon-yellow" },
    { key: "missed", label: "Missed", count: derived.interview.missed, bar: "bg-danger/70", text: "text-danger" },
  ];
  const rated = ratings.reduce((n, r) => n + r.count, 0);
  const tallest = Math.max(1, ...ratings.map((r) => r.count));

  return (
    <div className="space-y-5">
      {isEmpty && (
        <div className="card card-glow card-active flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:gap-5 sm:p-6">
          <span className="icon-tile h-14 w-14 rounded-2xl">
            <Glyph name="trophy" className="h-7 w-7" />
          </span>
          <div className="min-w-0">
            <p className="text-lg font-bold tracking-[-0.02em] text-text">Nothing here yet — that changes fast.</p>
            <p className="mt-1 text-sm text-muted">
              Finish a lesson, review a few flashcards or take a quiz, and this page fills in.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/learn" className="btn-gold">
                Start the first lesson <Glyph name="arrow" className="h-4 w-4" />
              </Link>
              <Link href="/flashcards" className="btn-ghost rounded-full">
                Try flashcards
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <Stat
          icon={<Glyph name="calendar" className="h-7 w-7" />}
          value={derived.streak}
          label="day streak"
          hint={`${learner.activeDays.length} active days total`}
        />
        <Stat
          icon={<NavIcon href="/learn" className="h-7 w-7" />}
          value={`${derived.lessonsDone}/${catalog.lessons.length}`}
          label="lessons done"
          pct={lessonPct}
        />
        <Stat
          icon={<NavIcon href="/flashcards" className="h-7 w-7" />}
          value={derived.dueCards}
          label="flashcards due"
          hint={`${derived.inRotation} in rotation`}
        />
        <Stat
          icon={<Glyph name="target" className="h-7 w-7" />}
          value={learner.quiz.history.length}
          label="quizzes taken"
          hint={`${derived.weak.length} weak spots`}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
        <Panel
          icon={<NavIcon href="/learn" className="h-7 w-7" />}
          title="Learning paths"
          action={<PanelLink href="/learn">All paths</PanelLink>}
        >
          <ul className="divide-y divide-violet-soft/15">
            {catalog.paths.map((path) => {
              const done = path.lessonIds.filter((id) => learner.lessons[id]).length;
              const pct = path.lessonIds.length ? Math.round((done / path.lessonIds.length) * 100) : 0;
              return (
                <li key={path.id}>
                  <Link
                    href={`/learn/${path.id}`}
                    className="group -mx-2 flex items-center gap-3 rounded-xl px-2 py-2.5 transition-colors hover:bg-violet/[0.08]"
                  >
                    <span className="icon-tile-muted h-10 w-10">
                      <NavIcon href="/learn" className="h-5 w-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-baseline justify-between gap-3 text-sm">
                        <span className="truncate font-medium text-text">{path.title}</span>
                        <span className="shrink-0 font-mono text-xs text-muted">
                          {done}/{path.lessonIds.length}
                        </span>
                      </span>
                      <Bar pct={pct} className="mt-2" />
                    </span>
                    <Glyph name="chevron" className="h-4 w-4 shrink-0 text-muted transition-colors group-hover:text-text" />
                  </Link>
                </li>
              );
            })}
          </ul>
          {derived.next && (
            <Link
              href={derived.next.href}
              className="mt-4 flex items-center gap-3 rounded-xl border border-violet-soft/45 bg-gradient-to-r from-violet/45 to-violet/10 p-3 transition-shadow hover:shadow-glow"
            >
              <span className="icon-tile h-10 w-10">
                <Glyph name="play" className="h-5 w-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-xs text-muted">Next lesson</span>
                <span className="block truncate font-semibold text-text">{derived.next.title}</span>
              </span>
              <Glyph name="arrow" className="h-5 w-5 shrink-0 text-text" />
            </Link>
          )}
        </Panel>

        <Panel
          icon={<Glyph name="target" className="h-7 w-7" />}
          title="Weak spots"
          action={derived.weak.length > 0 && <PanelLink href="/quiz">Drill them</PanelLink>}
        >
          {derived.weak.length === 0 ? (
            <div className="flex flex-col items-center py-4 text-center">
              <div className="relative h-24 w-24" aria-hidden>
                <span className="icon-tile-muted absolute inset-3 rotate-12 rounded-2xl" />
                <span className="icon-tile absolute inset-3 -rotate-6 rounded-2xl text-4xl font-black">?</span>
              </div>
              <p className="mt-4 font-bold text-text">No weak spots yet.</p>
              <p className="mt-1 text-sm text-muted">Terms you miss in quizzes show up here.</p>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {derived.weak.map((id) => (
                <Link key={id} href={catalog.terms[id].href} className="chip hover:border-violet-soft/70">
                  {catalog.terms[id].title}
                  <span className="ml-1 text-muted">×{learner.quiz.missed[id]}</span>
                </Link>
              ))}
            </div>
          )}
          {Object.keys(learner.quiz.bests).length > 0 && (
            <div className="mt-5 border-t border-violet-soft/15 pt-4">
              <p className="mb-2 text-xs text-muted">Best exam scores</p>
              <ul className="space-y-1.5 text-sm">
                {Object.entries(learner.quiz.bests).map(([subject, best]) => (
                  <li key={subject} className="flex justify-between gap-3">
                    <span className="truncate text-text/85">{subject}</span>
                    <span className="font-mono text-gold">{best.pct}%</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Panel>

        <Panel
          icon={<NavIcon href="/projects" className="h-7 w-7" />}
          title="Projects in progress"
          action={<PanelLink href="/projects">All projects</PanelLink>}
        >
          {derived.projectsStarted.length === 0 ? (
            <p className="text-sm text-muted">Tick off a step on any project and it appears here.</p>
          ) : (
            <ul className="space-y-3">
              {derived.projectsStarted.map((p) => {
                const done = learner.projectSteps[p.id]?.length ?? 0;
                return (
                  <li key={p.id}>
                    <Link href={p.href} className="group block">
                      <span className="flex items-baseline justify-between gap-3 text-sm">
                        <span className="truncate font-medium text-text group-hover:text-gold">{p.title}</span>
                        <span className="shrink-0 font-mono text-xs text-muted">
                          {done}/{p.steps} steps
                        </span>
                      </span>
                      <Bar pct={p.steps ? Math.round((done / p.steps) * 100) : 0} className="mt-2" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </Panel>

        <Panel
          icon={<NavIcon href="/interview" className="h-7 w-7" />}
          title="Interview readiness"
          action={<PanelLink href="/interview">Practise</PanelLink>}
        >
          {rated === 0 ? (
            <div className="flex items-end justify-between gap-4">
              <p className="text-sm text-muted">Run a practice round in Interview and your ratings show up here.</p>
              {/* A picture of the chart to come — no figures, so nothing to mistake for data. */}
              <div className="flex shrink-0 items-end gap-1.5" aria-hidden>
                <span className="h-6 w-4 rounded-t bg-violet-soft/20" />
                <span className="h-9 w-4 rounded-t bg-violet-soft/30" />
                <span className="h-12 w-4 rounded-t bg-violet-soft/45" />
              </div>
            </div>
          ) : (
            <ul className="flex items-end gap-5" aria-label="Interview ratings">
              {ratings.map((r) => (
                <li key={r.key} className="flex flex-col items-center gap-1.5">
                  <span className={`font-mono text-sm font-bold ${r.text}`}>{r.count}</span>
                  <span
                    className={`w-9 rounded-t-md ${r.bar}`}
                    style={{ height: `${Math.max(4, Math.round((r.count / tallest) * 64))}px` }}
                    aria-hidden
                  />
                  <span className="text-xs text-muted">{r.label}</span>
                </li>
              ))}
            </ul>
          )}
        </Panel>
      </div>

      <section className="card relative p-5 sm:p-6">
        {/* The ribbon is decoration; the count in the heading is the information. */}
        <span
          className="absolute right-6 top-0 hidden h-9 w-8 place-items-center rounded-b-md bg-violet-soft/25 text-violet-light sm:grid"
          aria-hidden
        >
          <Glyph name="star" className="h-4 w-4" />
        </span>
        <div className="flex items-start gap-4">
          <span className="text-violet-light">
            <Glyph name="bookmark" className="h-8 w-8" />
          </span>
          <div className="min-w-0 flex-1">
            <h2 className="text-lg font-bold tracking-[-0.02em] text-text sm:text-xl">Bookmarks ({bookmarks.length})</h2>
            {bookmarks.length === 0 && (
              <p className="mt-1 text-sm text-muted">Use ☆ Save on any term, lesson or project to keep it here.</p>
            )}
          </div>
        </div>
        {bookmarks.length > 0 && (
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {(["term", "lesson", "project"] as const).map((kind) => {
              const items = bookmarks.filter((b) => b.kind === kind);
              if (items.length === 0) return null;
              return (
                <div key={kind} className="rounded-xl border border-violet-soft/20 bg-violet/[0.05] p-3.5">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">{kind}s</p>
                  <ul className="space-y-1.5">
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
      </section>

      <section className="card p-5 sm:p-6">
        <div className="flex items-start gap-4">
          <span className="text-violet-light">
            <Glyph name="database" className="h-8 w-8" />
          </span>
          <div className="min-w-0">
            <h2 className="text-lg font-bold tracking-[-0.02em] text-text sm:text-xl">Backup &amp; restore</h2>
            <p className="mt-1 text-sm text-muted">
              Download your progress as a file, or restore it on another browser. Restoring replaces what&apos;s here now.
            </p>
          </div>
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button onClick={exportBackup} className="btn-violet">
            <Glyph name="download" className="h-4 w-4" /> Download backup
          </button>
          <button onClick={() => fileInput.current?.click()} className="btn-ghost">
            <Glyph name="upload" className="h-4 w-4" /> Restore from file
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
            <span className="flex items-center gap-2 text-sm sm:ml-auto">
              <span className="text-muted">Erase all progress?</span>
              <button
                onClick={() => {
                  replaceLearnerState(emptyState());
                  setConfirmingReset(false);
                  setNotice({ tone: "ok", text: "Progress reset." });
                }}
                className="rounded-xl border border-danger/60 px-3 py-1.5 font-semibold text-danger hover:bg-danger/10"
              >
                Erase
              </button>
              <button onClick={() => setConfirmingReset(false)} className="btn-ghost px-3 py-1.5">
                Keep
              </button>
            </span>
          ) : (
            <button
              onClick={() => setConfirmingReset(true)}
              className="inline-flex items-center gap-2 rounded-xl px-2 py-1.5 text-sm font-semibold text-text/85 transition-colors hover:text-danger sm:ml-auto"
            >
              <Glyph name="reset" className="h-4 w-4" /> Reset progress
            </button>
          )}
        </div>
        {notice && (
          <p role="status" className={`mt-3 text-sm ${notice.tone === "ok" ? "text-success" : "text-danger"}`}>
            {notice.text}
          </p>
        )}
      </section>
    </div>
  );
}
