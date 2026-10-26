"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { InterviewEntry } from "@/app/lib/types";
import { exportInterviewToMarkdown, downloadFile } from "@/app/lib/export";
import { useHydrated, useLearner } from "@/app/lib/learner/store";
import type { InterviewRating, LearnerState } from "@/app/lib/learner/state";
import InterviewPractice from "./InterviewPractice";

// Textarea that grows to fit its content — see the whole answer while editing.
function AutoTextarea({
  minRows = 3,
  className = "",
  ...props
}: React.ComponentProps<"textarea"> & { minRows?: number }) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const fit = (el: HTMLTextAreaElement | null) => {
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  };
  useEffect(() => {
    fit(ref.current);
  }, [props.value]);
  return (
    <textarea
      ref={ref}
      rows={minRows}
      onInput={(e) => fit(e.currentTarget)}
      className={`resize-y overflow-hidden ${className}`}
      {...props}
    />
  );
}

const STORAGE_KEY = "lh.interview.v2";

interface Draft {
  question: string;
  answer: string;
  topic: string;
}

const EMPTY_DRAFT: Draft = { question: "", answer: "", topic: "" };

export const RATING_STYLE: Record<InterviewRating | "unrated", { label: string; className: string }> = {
  nailed: { label: "Nailed", className: "border-success/50 bg-success/10 text-success" },
  shaky: { label: "Shaky", className: "border-gold/50 bg-gold/10 text-gold" },
  missed: { label: "Missed", className: "border-danger/50 bg-danger/10 text-danger" },
  unrated: { label: "Not practised", className: "border-line text-muted" },
};

function ratingOf(learner: LearnerState, id: string): InterviewRating | "unrated" {
  return learner.interview[id]?.rating ?? "unrated";
}

// `seed` arrives as a prop from the server component — never imported here,
// which would bake it into a publicly-fetchable client chunk if it were private.
export default function InterviewClient({ seed }: { seed: InterviewEntry[] }) {
  const [entries, setEntries] = useState<InterviewEntry[]>(seed);
  const [hydrated, setHydrated] = useState(false);
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState<string>("All");
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [practicing, setPracticing] = useState(false);
  const [buildingPdf, setBuildingPdf] = useState(false);
  const [pdfError, setPdfError] = useState(false);

  const [learner] = useLearner();
  const learnerReady = useHydrated();

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const savedEntries: InterviewEntry[] = JSON.parse(saved);
        // Merge in any NEW seed questions (by id) without touching your edits.
        const ids = new Set(savedEntries.map((e) => e.id));
        const missing = seed.filter((s) => !ids.has(s.id));
        setEntries(missing.length ? [...missing, ...savedEntries] : savedEntries);
      }
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, [seed]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    } catch {
      /* ignore quota / privacy errors */
    }
  }, [entries, hydrated]);

  const topicCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const e of entries) if (e.topic) counts.set(e.topic, (counts.get(e.topic) ?? 0) + 1);
    return [...counts.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  }, [entries]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return entries
      .filter((e) => topic === "All" || e.topic === topic)
      .filter((e) => (!q ? true : `${e.question} ${e.answer} ${e.topic}`.toLowerCase().includes(q)))
      .sort((a, b) => b.createdAt - a.createdAt);
  }, [entries, query, topic]);

  const readiness = useMemo(() => {
    const counts = { nailed: 0, shaky: 0, missed: 0, unrated: 0 };
    for (const e of entries) counts[learnerReady ? ratingOf(learner, e.id) : "unrated"]++;
    return counts;
  }, [entries, learner, learnerReady]);

  const nextCreatedAt = () => entries.reduce((m, e) => Math.max(m, e.createdAt), 0) + 1;

  const addEntry = (d: Draft) => {
    setEntries((prev) => [
      { id: `iv-${Date.now()}`, question: d.question.trim(), answer: d.answer.trim(), topic: d.topic.trim(), createdAt: nextCreatedAt() },
      ...prev,
    ]);
    setAdding(false);
  };

  const updateEntry = (id: string, d: Draft) => {
    setEntries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, question: d.question.trim(), answer: d.answer.trim(), topic: d.topic.trim() } : e)),
    );
    setEditingId(null);
  };

  const removeEntry = (id: string) => setEntries((prev) => prev.filter((e) => e.id !== id));

  const handleMarkdown = () => downloadFile(exportInterviewToMarkdown(entries), "interview-prep.md", "text/markdown");

  // Exports what's on screen, and the PDF's subtitle names the active filter —
  // so a partial export can't be mistaken for a full backup.
  const handlePdf = async () => {
    setBuildingPdf(true);
    setPdfError(false);
    try {
      const { exportInterviewToPdf } = await import("@/app/lib/exportPdf");
      await exportInterviewToPdf(filtered, { topic, total: entries.length });
    } catch {
      setPdfError(true);
    } finally {
      setBuildingPdf(false);
    }
  };

  if (practicing) {
    return <InterviewPractice entries={filtered} scope={topic === "All" ? "All topics" : topic} onExit={() => setPracticing(false)} />;
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[13.5rem_minmax(0,1fr)]">
      {/* ── Sidebar: search, topics, readiness ── */}
      <aside className="space-y-5 lg:sticky lg:top-6 lg:self-start">
        <label className="block">
          <span className="sr-only">Search questions and answers</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search…"
            className="input-hub"
          />
        </label>

        {/* Mobile: a compact select. Desktop: the full topic list. */}
        <label className="block lg:hidden">
          <span className="eyebrow mb-1.5 block">Topic</span>
          <select value={topic} onChange={(e) => setTopic(e.target.value)} className="input-hub">
            <option value="All">All topics ({entries.length})</option>
            {topicCounts.map(([t, n]) => (
              <option key={t} value={t}>
                {t} ({n})
              </option>
            ))}
          </select>
        </label>

        <nav aria-label="Topics" className="hidden lg:block">
          <p className="eyebrow mb-2">Topics</p>
          <ul className="space-y-0.5">
            {[["All", entries.length] as const, ...topicCounts].map(([t, n]) => (
              <li key={t}>
                <button
                  onClick={() => setTopic(t)}
                  aria-current={topic === t ? "true" : undefined}
                  className={`flex w-full items-center justify-between rounded-md px-2.5 py-1.5 text-left text-sm transition-colors ${
                    topic === t ? "bg-violet/10 font-semibold text-violet-light" : "text-text/75 hover:bg-text/5 hover:text-text"
                  }`}
                >
                  <span className="truncate">{t === "All" ? "All topics" : t}</span>
                  <span className="font-mono text-xs text-muted">{n}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden lg:block">
          <p className="eyebrow mb-2">Readiness</p>
          <ul className="space-y-1 text-xs">
            {(["nailed", "shaky", "missed", "unrated"] as const).map((r) => (
              <li key={r} className="flex justify-between">
                <span className="text-text/70">{RATING_STYLE[r].label}</span>
                <span className="font-mono text-muted">{readiness[r]}</span>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* ── Main: toolbar + questions ── */}
      <section className="min-w-0 space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setPracticing(true)}
            disabled={filtered.length === 0}
            className="btn-gold px-4 py-2 text-xs disabled:opacity-40"
          >
            ▶ Practice {filtered.length > 0 && `(${filtered.length})`}
          </button>
          <details className="relative">
            <summary className="btn-ghost cursor-pointer list-none px-4 py-2 text-xs">Export ▾</summary>
            <div className="absolute left-0 z-20 mt-1 w-56 rounded-lg border border-line bg-surface p-1 shadow-card">
              <button onClick={handleMarkdown} className="block w-full rounded-md px-3 py-2 text-left text-xs hover:bg-text/5">
                Markdown — all questions
                <span className="block text-muted">Best for editing and backups</span>
              </button>
              <button
                onClick={handlePdf}
                disabled={buildingPdf}
                className="block w-full rounded-md px-3 py-2 text-left text-xs hover:bg-text/5 disabled:opacity-60"
              >
                {buildingPdf ? "Building PDF…" : "PDF — what's shown"}
                <span className="block text-muted">Best for sending to someone</span>
              </button>
            </div>
          </details>
          <button onClick={() => setAdding((v) => !v)} className="btn-violet ml-auto px-4 py-2 text-xs">
            {adding ? "Cancel" : "+ Add question"}
          </button>
        </div>

        <p className="text-xs text-muted" aria-live="polite">
          {filtered.length} of {entries.length} question{entries.length === 1 ? "" : "s"}
          {topic !== "All" && ` in ${topic}`}
          {query && ` matching “${query}”`}
        </p>

        {adding && (
          <EntryForm initial={EMPTY_DRAFT} submitLabel="Save question" onSubmit={addEntry} onCancel={() => setAdding(false)} />
        )}

        {filtered.length === 0 ? (
          <div className="card p-10 text-center text-muted">
            {entries.length === 0 ? (
              <>
                No questions yet. Click <span className="text-gold">+ Add question</span> to log one.
              </>
            ) : (
              "Nothing matches — clear the search or pick another topic."
            )}
          </div>
        ) : (
          <div className="space-y-2.5">
            {filtered.map((e) =>
              editingId === e.id ? (
                <EntryForm
                  key={e.id}
                  initial={e}
                  submitLabel="Update"
                  onSubmit={(d) => updateEntry(e.id, d)}
                  onCancel={() => setEditingId(null)}
                />
              ) : (
                <EntryCard
                  key={e.id}
                  entry={e}
                  rating={learnerReady ? ratingOf(learner, e.id) : "unrated"}
                  onEdit={() => setEditingId(e.id)}
                  onDelete={() => removeEntry(e.id)}
                />
              ),
            )}
          </div>
        )}

        {pdfError && (
          <p className="text-center text-xs text-neon-pink">
            The PDF couldn&apos;t be built. Your answers are safe — try again, or use Markdown.
          </p>
        )}

        <p className="text-center text-xs text-muted">
          Saved in this browser only — clearing site data wipes it. Export to Markdown to keep a copy.
        </p>
      </section>
    </div>
  );
}

function EntryCard({
  entry,
  rating,
  onEdit,
  onDelete,
}: {
  entry: InterviewEntry;
  rating: InterviewRating | "unrated";
  onEdit: () => void;
  onDelete: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const style = RATING_STYLE[rating];

  return (
    <article className="card card-hover p-4 sm:p-5">
      <button className="w-full text-left" onClick={() => setExpanded((v) => !v)} aria-expanded={expanded}>
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-bold leading-snug text-text">
            <span className="mr-1.5 text-gold">Q</span>
            {entry.question}
          </h3>
          <span className="mt-0.5 shrink-0 text-xs text-muted" aria-hidden>
            {expanded ? "▲" : "▼"}
          </span>
        </div>
        {!expanded && (
          <p className="mt-1.5 line-clamp-2 text-sm text-text/60">
            {entry.answer || <span className="italic">No answer yet.</span>}
          </p>
        )}
        <div className="mt-2.5 flex flex-wrap items-center gap-2 text-[0.65rem]">
          <span className={`rounded-full border px-2 py-0.5 font-semibold ${style.className}`}>{style.label}</span>
          {entry.topic && <span className="text-muted">{entry.topic}</span>}
        </div>
      </button>

      {expanded && (
        <div className="mt-4 space-y-4 border-t border-line pt-4">
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-text/85">
            {entry.answer || <span className="italic text-muted">No answer yet — click Edit.</span>}
          </p>
          <div className="flex items-center justify-end gap-2">
            {confirming ? (
              <>
                <span className="text-xs text-muted">Delete this question?</span>
                <button onClick={onDelete} className="rounded-md border border-danger/60 px-3 py-1.5 text-xs text-danger hover:bg-danger/10">
                  Delete
                </button>
                <button onClick={() => setConfirming(false)} className="btn-ghost px-3 py-1.5 text-xs">
                  Keep
                </button>
              </>
            ) : (
              <>
                <button onClick={onEdit} className="btn-ghost px-3 py-1.5 text-xs">
                  Edit
                </button>
                <button onClick={() => setConfirming(true)} className="px-2 text-xs text-muted hover:text-neon-pink">
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </article>
  );
}

function EntryForm({
  initial,
  submitLabel,
  onSubmit,
  onCancel,
}: {
  initial: Draft | InterviewEntry;
  submitLabel: string;
  onSubmit: (d: Draft) => void;
  onCancel: () => void;
}) {
  const [question, setQuestion] = useState(initial.question);
  const [answer, setAnswer] = useState(initial.answer);
  const [topic, setTopic] = useState(initial.topic);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    onSubmit({ question, answer, topic });
  };

  return (
    <form onSubmit={submit} className="card space-y-3 p-5">
      <label className="block">
        <span className="eyebrow mb-1.5 block">Question *</span>
        <AutoTextarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="e.g. How would you design an automation for…?"
          minRows={2}
          className="input-hub"
          required
        />
      </label>
      <label className="block">
        <span className="eyebrow mb-1.5 block">Your answer</span>
        <AutoTextarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Write your answer here…"
          minRows={6}
          className="input-hub"
        />
      </label>
      <label className="block">
        <span className="eyebrow mb-1.5 block">Topic</span>
        <input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g. Automation, GHL Skills, Experience"
          className="input-hub"
        />
      </label>
      <div className="flex gap-2">
        <button type="submit" className="btn-violet">
          {submitLabel}
        </button>
        <button type="button" onClick={onCancel} className="btn-ghost">
          Cancel
        </button>
      </div>
    </form>
  );
}
