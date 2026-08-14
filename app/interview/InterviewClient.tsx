"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { InterviewEntry } from "@/app/lib/types";
import SearchBar from "@/app/components/SearchBar";
import { exportInterviewToMarkdown, downloadFile } from "@/app/lib/export";

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

// `seed` arrives as a prop from the gated server component — never imported
// here, which would bake it into a publicly-fetchable client chunk.
export default function InterviewClient({ seed }: { seed: InterviewEntry[] }) {
  const [entries, setEntries] = useState<InterviewEntry[]>(seed);
  const [hydrated, setHydrated] = useState(false);
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState<string>("All");
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [printing, setPrinting] = useState(false);

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

  const topics = useMemo(() => {
    const set = new Set(entries.map((e) => e.topic).filter(Boolean));
    return ["All", ...Array.from(set).sort()];
  }, [entries]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return entries
      .filter((e) => topic === "All" || e.topic === topic)
      .filter((e) =>
        !q ? true : `${e.question} ${e.answer} ${e.topic}`.toLowerCase().includes(q),
      )
      .sort((a, b) => b.createdAt - a.createdAt);
  }, [entries, query, topic]);

  const nextCreatedAt = () =>
    entries.reduce((m, e) => Math.max(m, e.createdAt), 0) + 1;

  const addEntry = (d: Draft) => {
    setEntries((prev) => [
      {
        id: `iv-${Date.now()}`,
        question: d.question.trim(),
        answer: d.answer.trim(),
        topic: d.topic.trim(),
        createdAt: nextCreatedAt(),
      },
      ...prev,
    ]);
    setAdding(false);
  };

  const updateEntry = (id: string, d: Draft) => {
    setEntries((prev) =>
      prev.map((e) =>
        e.id === id
          ? { ...e, question: d.question.trim(), answer: d.answer.trim(), topic: d.topic.trim() }
          : e,
      ),
    );
    setEditingId(null);
  };

  const removeEntry = (id: string) =>
    setEntries((prev) => prev.filter((e) => e.id !== id));

  const handleExport = () =>
    downloadFile(
      exportInterviewToMarkdown(entries),
      "interview-prep.md",
      "text/markdown",
    );

  // PDF goes through the browser's own print-to-PDF rather than a bundled
  // renderer: no dependency, and the output keeps selectable text. Answers are
  // only mounted when their card is open, so the whole list is force-expanded
  // for the print pass and released once the dialog closes.
  useEffect(() => {
    if (!printing) return;
    const done = () => setPrinting(false);
    window.addEventListener("afterprint", done);
    const frame = requestAnimationFrame(() => window.print());
    return () => {
      window.removeEventListener("afterprint", done);
      cancelAnimationFrame(frame);
    };
  }, [printing]);

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <Stat label="Questions" value={entries.length} accent="text-gold" />
        <Stat label="Topics" value={topics.length - 1} accent="text-violet-light" />
        <Stat
          label="Showing"
          value={filtered.length}
          accent="text-neon-blue"
          className="col-span-2 sm:col-span-1"
        />
      </div>

      {/* Search */}
      <SearchBar
        value={query}
        onChange={setQuery}
        placeholder="Search questions, answers, topics…  (Ctrl+F)"
        resultCount={filtered.length}
      />

      {/* Topic filters + actions */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {topics.map((t) => (
            <button
              key={t}
              onClick={() => setTopic(t)}
              className={`chip ${topic === t ? "chip-active" : "hover:border-violet-soft/60"}`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="flex shrink-0 gap-2">
          <button onClick={handleExport} className="btn-ghost px-4 py-2 text-xs">
            ⬇ Markdown
          </button>
          <button
            onClick={() => setPrinting(true)}
            className="btn-ghost px-4 py-2 text-xs"
            title="Opens your browser's print dialog — choose “Save as PDF”"
          >
            ⬇ PDF
          </button>
          <button
            onClick={() => setAdding((v) => !v)}
            className="btn-violet px-4 py-2 text-xs"
          >
            {adding ? "Cancel" : "+ Add Question"}
          </button>
        </div>
      </div>

      {/* Add form */}
      {adding && (
        <EntryForm
          initial={EMPTY_DRAFT}
          submitLabel="Save Question"
          onSubmit={addEntry}
          onCancel={() => setAdding(false)}
        />
      )}

      {/* List — also the print region. Everything outside `.print-doc` is
          dropped by the print stylesheet. */}
      <div className="print-doc">
        <PrintHeader shown={filtered.length} total={entries.length} topic={topic} />

        {filtered.length === 0 ? (
          <div className="card p-10 text-center text-muted">
            No questions here yet. Click{" "}
            <span className="text-gold">+ Add Question</span> to log one.
          </div>
        ) : (
          <div className="space-y-3">
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
                  forceOpen={printing}
                  onEdit={() => setEditingId(e.id)}
                  onDelete={() => removeEntry(e.id)}
                />
              ),
            )}
          </div>
        )}
      </div>

      <p className="text-center text-xs text-muted">
        Saved to your browser (localStorage) — clearing site data wipes it. Take
        a copy with <span className="text-text/80">Markdown</span> to keep
        editing, or <span className="text-text/80">PDF</span> to send to someone.
      </p>
    </div>
  );
}

function Stat({
  label,
  value,
  accent,
  className = "",
}: {
  label: string;
  value: number;
  accent: string;
  className?: string;
}) {
  return (
    <div className={`card card-hover p-4 ${className}`}>
      <div className={`text-2xl font-black ${accent}`}>{value}</div>
      <div className="mt-0.5 text-xs text-text/70">{label}</div>
    </div>
  );
}

// Document header for the printed copy only — on screen the page already says
// all of this. Names the filter so a partial export can't be mistaken for the
// full set.
function PrintHeader({
  shown,
  total,
  topic,
}: {
  shown: number;
  total: number;
  topic: string;
}) {
  return (
    <div className="print-only mb-6">
      <h2 className="text-xl font-bold">Interview Prep — Q&amp;A</h2>
      <p className="mt-1 text-sm">
        {topic === "All"
          ? `${total} question${total === 1 ? "" : "s"}`
          : `Topic: ${topic} — ${shown} of ${total} questions`}
      </p>
    </div>
  );
}

function EntryCard({
  entry,
  onEdit,
  onDelete,
  forceOpen = false,
}: {
  entry: InterviewEntry;
  onEdit: () => void;
  onDelete: () => void;
  forceOpen?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const expanded = open || forceOpen;

  return (
    <article className="card card-hover accent-bar accent-purple animate-fade-up p-5">
      <div className="flex items-start justify-between gap-4">
        <button
          className="flex-1 text-left"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={expanded}
        >
          <h3 className="font-bold text-text">
            <span className="mr-1 text-gold">Q:</span>
            {entry.question}
          </h3>
          {entry.topic && (
            <span className="mt-1 inline-block text-xs text-muted">{entry.topic}</span>
          )}
        </button>
        <span className="print-hide text-muted">{expanded ? "▲" : "▼"}</span>
      </div>

      {expanded && (
        <div className="mt-4 space-y-4 border-t border-line pt-4">
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-text/85">
            <span className="font-semibold text-violet-light">A: </span>
            {entry.answer || (
              <span className="italic text-muted">No answer yet — click Edit.</span>
            )}
          </p>
          <div className="print-hide flex justify-end gap-2">
            <button onClick={onEdit} className="btn-ghost px-3 py-1.5 text-xs">
              Edit
            </button>
            <button
              onClick={onDelete}
              className="px-2 text-muted hover:text-neon-pink"
              aria-label="Delete question"
            >
              ✕
            </button>
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
      <div>
        <label className="eyebrow mb-1.5 block">Question *</label>
        <AutoTextarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="e.g. How would you design an automation for…?"
          minRows={2}
          className="input-hub"
          required
        />
      </div>
      <div>
        <label className="eyebrow mb-1.5 block">Your Answer</label>
        <AutoTextarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Write your answer here…"
          minRows={6}
          className="input-hub"
        />
      </div>
      <div>
        <label className="eyebrow mb-1.5 block">Topic</label>
        <input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g. Automation, GHL Skills, Experience"
          className="input-hub"
        />
      </div>
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
