"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { InterviewEntry, InterviewFollowUp } from "@/app/lib/types";
import { exportInterviewToMarkdown, downloadFile } from "@/app/lib/export";
import { blanksIn, isEdited } from "@/app/lib/interview";
import { useHydrated, useLearner } from "@/app/lib/learner/store";
import type { InterviewRating, LearnerState } from "@/app/lib/learner/state";
import InterviewPractice from "./InterviewPractice";
import TemplateText from "./TemplateText";

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

// v3 holds the generic answer bank. v2 held the earlier, personal set — it is
// never overwritten, so anyone who used it can bring those answers back.
const STORAGE_KEY = "lh.interview.v3";
const LEGACY_KEY = "lh.interview.v2";
const NAME_KEY = "lh.interview.name.v1";

interface Draft {
  question: string;
  answer: string;
  topic: string;
  followUps: InterviewFollowUp[];
}

const EMPTY_DRAFT: Draft = { question: "", answer: "", topic: "", followUps: [] };

export const RATING_STYLE: Record<InterviewRating | "unrated", { label: string; className: string }> = {
  nailed: { label: "Nailed", className: "border-success/50 bg-success/10 text-success" },
  shaky: { label: "Shaky", className: "border-gold/50 bg-gold/10 text-gold" },
  missed: { label: "Missed", className: "border-danger/50 bg-danger/10 text-danger" },
  unrated: { label: "Not practised", className: "border-line text-muted" },
};

function ratingOf(learner: LearnerState, id: string): InterviewRating | "unrated" {
  return learner.interview[id]?.rating ?? "unrated";
}

function readJson<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

// `seed` arrives as a prop from the server component — never imported here,
// which would bake it into a publicly-fetchable client chunk if it were private.
export default function InterviewClient({ seed }: { seed: InterviewEntry[] }) {
  const [entries, setEntries] = useState<InterviewEntry[]>(seed);
  const [hydrated, setHydrated] = useState(false);
  const [legacy, setLegacy] = useState<InterviewEntry[]>([]);
  const [name, setName] = useState("");
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState<string>("All");
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [practicing, setPracticing] = useState(false);
  const [buildingPdf, setBuildingPdf] = useState(false);
  const [pdfError, setPdfError] = useState(false);

  const [learner] = useLearner();
  const learnerReady = useHydrated();
  const seedById = useMemo(() => new Map(seed.map((s) => [s.id, s])), [seed]);

  useEffect(() => {
    const saved = readJson<InterviewEntry[]>(STORAGE_KEY);
    if (Array.isArray(saved)) {
      // New template questions appear automatically; nothing the visitor wrote is touched.
      const ids = new Set(saved.map((e) => e.id));
      const missing = seed.filter((s) => !ids.has(s.id));
      setEntries(missing.length ? [...saved, ...missing] : saved);
    }
    const old = readJson<InterviewEntry[]>(LEGACY_KEY);
    if (Array.isArray(old) && old.length > 0) {
      const restored = new Set((saved ?? []).map((e) => e.id));
      setLegacy(old.filter((e) => !restored.has(e.id)));
    }
    setName(readJson<string>(NAME_KEY) ?? "");
    setHydrated(true);
  }, [seed]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
      localStorage.setItem(NAME_KEY, JSON.stringify(name));
    } catch {
      /* quota or privacy mode: edits still work for this visit */
    }
  }, [entries, name, hydrated]);

  // Topics in the order the answer bank teaches them, not alphabetically.
  const topicCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const e of [...entries].sort((a, b) => b.createdAt - a.createdAt)) {
      if (e.topic) counts.set(e.topic, (counts.get(e.topic) ?? 0) + 1);
    }
    return [...counts.entries()];
  }, [entries]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return entries
      .filter((e) => topic === "All" || e.topic === topic)
      .filter((e) => {
        if (!q) return true;
        const followUps = (e.followUps ?? []).map((f) => `${f.question} ${f.answer}`).join(" ");
        return `${e.question} ${e.answer} ${e.topic} ${followUps}`.toLowerCase().includes(q);
      })
      .sort((a, b) => b.createdAt - a.createdAt);
  }, [entries, query, topic]);

  const readiness = useMemo(() => {
    const counts = { nailed: 0, shaky: 0, missed: 0, unrated: 0 };
    for (const e of entries) counts[learnerReady ? ratingOf(learner, e.id) : "unrated"]++;
    return counts;
  }, [entries, learner, learnerReady]);

  const progress = useMemo(() => {
    const personalised = entries.filter((e) => isEdited(e, seedById.get(e.id))).length;
    const blanks = filtered.reduce((n, e) => n + blanksIn(e), 0);
    return { personalised, blanks };
  }, [entries, filtered, seedById]);

  // Lowest createdAt sorts last; new questions go to the top.
  const nextCreatedAt = () => entries.reduce((m, e) => Math.max(m, e.createdAt), 0) + 1;

  const clean = (d: Draft) => ({
    question: d.question.trim(),
    answer: d.answer.trim(),
    topic: d.topic.trim(),
    followUps: d.followUps
      .map((f) => ({ question: f.question.trim(), answer: f.answer.trim() }))
      .filter((f) => f.question),
  });

  const addEntry = (d: Draft) => {
    setEntries((prev) => [{ id: `iv-${Date.now()}`, createdAt: nextCreatedAt(), ...clean(d) }, ...prev]);
    setAdding(false);
  };

  const updateEntry = (id: string, d: Draft) => {
    setEntries((prev) => prev.map((e) => (e.id === id ? { ...e, ...clean(d) } : e)));
    setEditingId(null);
  };

  const resetEntry = (id: string) => {
    const original = seedById.get(id);
    if (original) setEntries((prev) => prev.map((e) => (e.id === id ? { ...original } : e)));
  };

  const removeEntry = (id: string) => setEntries((prev) => prev.filter((e) => e.id !== id));

  const restoreLegacy = () => {
    const top = nextCreatedAt();
    setEntries((prev) => [
      ...legacy.map((e, i) => ({ ...e, topic: e.topic ? `My answers · ${e.topic}` : "My answers", createdAt: top + legacy.length - i })),
      ...prev,
    ]);
    setLegacy([]);
    setTopic("All");
  };

  const handleMarkdown = () => downloadFile(exportInterviewToMarkdown(filtered), "my-interview-answers.md", "text/markdown");

  // Exports what's on screen, and the PDF's subtitle names the active filter —
  // so a partial export can't be mistaken for the full set.
  const handlePdf = async () => {
    setBuildingPdf(true);
    setPdfError(false);
    try {
      const { exportInterviewToPdf } = await import("@/app/lib/exportPdf");
      await exportInterviewToPdf(filtered, { topic, total: entries.length, name });
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
    <div className="space-y-5">
      {legacy.length > 0 && (
        <div className="card flex flex-col gap-3 border-gold/40 p-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-text/85">
            <span className="font-bold text-gold">You have {legacy.length} answers from the earlier version</span> saved in
            this browser. Bring them back alongside the new templates?
          </p>
          <div className="flex shrink-0 gap-2">
            <button onClick={restoreLegacy} className="btn-gold px-4 py-2 text-xs">
              Restore my answers
            </button>
            <button onClick={() => setLegacy([])} className="btn-ghost px-4 py-2 text-xs">
              Not now
            </button>
          </div>
        </div>
      )}

      {/* How saving works — said plainly, because there is no account behind it. */}
      <div className="card grid gap-4 p-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:p-5">
        <div className="space-y-1.5 text-sm">
          <p className="font-semibold text-text">Make these answers yours, then download them.</p>
          <p className="text-muted">
            Click any question → <span className="text-text/80">Edit</span> → replace the highlighted blanks. Your edits save
            automatically in this browser only — they don&apos;t sync to other devices and disappear if you clear browsing
            data, so download a PDF when you&apos;re done.
          </p>
          <p className="text-xs text-muted" aria-live="polite">
            {progress.personalised} of {entries.length} personalised
            {progress.blanks > 0 && ` · ${progress.blanks} blanks left in what's shown`}
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:w-64">
          <label className="block">
            <span className="mb-1 block text-xs font-medium text-muted">Your name on the PDF (optional)</span>
            <input value={name} onChange={(e) => setName(e.target.value.slice(0, 80))} placeholder="e.g. Sam Rivera" className="input-hub py-2 text-sm" />
          </label>
          <button onClick={handlePdf} disabled={buildingPdf || filtered.length === 0} className="btn-violet w-full disabled:opacity-50">
            {buildingPdf ? "Building PDF…" : `⬇ Download my answers (PDF)`}
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[13.5rem_minmax(0,1fr)]">
        {/* ── Sidebar: search, topics, readiness ── */}
        <aside className="space-y-5 lg:sticky lg:top-6 lg:self-start">
          <label className="block">
            <span className="sr-only">Search questions and answers</span>
            <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search…" className="input-hub" />
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
            <ul className="max-h-[50vh] space-y-0.5 overflow-y-auto pr-1">
              {[["All", entries.length] as const, ...topicCounts].map(([t, n]) => (
                <li key={t}>
                  <button
                    onClick={() => setTopic(t)}
                    aria-current={topic === t ? "true" : undefined}
                    className={`flex w-full items-center justify-between gap-2 rounded-md px-2.5 py-1.5 text-left text-sm transition-colors ${
                      topic === t ? "bg-violet/10 font-semibold text-violet-light" : "text-text/75 hover:bg-text/5 hover:text-text"
                    }`}
                  >
                    <span className="truncate">{t === "All" ? "All topics" : t}</span>
                    <span className="text-xs text-muted">{n}</span>
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
                  <span className="text-muted">{readiness[r]}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* ── Main: toolbar + questions ── */}
        <section className="min-w-0 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <button onClick={() => setPracticing(true)} disabled={filtered.length === 0} className="btn-gold px-4 py-2 text-xs disabled:opacity-40">
              ▶ Practice {filtered.length > 0 && `(${filtered.length})`}
            </button>
            <button onClick={handleMarkdown} className="btn-ghost px-4 py-2 text-xs">
              ⬇ Markdown
            </button>
            <button onClick={() => setAdding((v) => !v)} className="btn-ghost ml-auto px-4 py-2 text-xs">
              {adding ? "Cancel" : "+ Add your own question"}
            </button>
          </div>

          <p className="text-xs text-muted" aria-live="polite">
            {filtered.length} of {entries.length} question{entries.length === 1 ? "" : "s"}
            {topic !== "All" && ` in ${topic}`}
            {query && ` matching “${query}”`}
          </p>

          {adding && <EntryForm initial={EMPTY_DRAFT} submitLabel="Save question" onSubmit={addEntry} onCancel={() => setAdding(false)} />}

          {filtered.length === 0 ? (
            <div className="card p-10 text-center text-muted">
              {entries.length === 0 ? (
                <>
                  No questions yet. Click <span className="text-gold">+ Add your own question</span> to log one.
                </>
              ) : (
                "Nothing matches — clear the search or pick another topic."
              )}
            </div>
          ) : (
            <div className="space-y-2.5">
              {filtered.map((e) =>
                editingId === e.id ? (
                  <EntryForm key={e.id} initial={e} submitLabel="Save" onSubmit={(d) => updateEntry(e.id, d)} onCancel={() => setEditingId(null)} />
                ) : (
                  <EntryCard
                    key={e.id}
                    entry={e}
                    rating={learnerReady ? ratingOf(learner, e.id) : "unrated"}
                    edited={hydrated && isEdited(e, seedById.get(e.id))}
                    canReset={seedById.has(e.id)}
                    onEdit={() => setEditingId(e.id)}
                    onReset={() => resetEntry(e.id)}
                    onDelete={() => removeEntry(e.id)}
                  />
                ),
              )}
            </div>
          )}

          {pdfError && (
            <p className="text-center text-xs text-neon-pink">
              The PDF couldn&apos;t be built. Your answers are safe — try again, or download Markdown instead.
            </p>
          )}
        </section>
      </div>
    </div>
  );
}

function EntryCard({
  entry,
  rating,
  edited,
  canReset,
  onEdit,
  onReset,
  onDelete,
}: {
  entry: InterviewEntry;
  rating: InterviewRating | "unrated";
  edited: boolean;
  canReset: boolean;
  onEdit: () => void;
  onReset: () => void;
  onDelete: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [confirming, setConfirming] = useState<"delete" | "reset" | null>(null);
  const style = RATING_STYLE[rating];
  const blanks = blanksIn(entry);

  return (
    <article className="card p-4 sm:p-5">
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
        {!expanded && <p className="mt-1.5 line-clamp-2 text-sm text-text/60">{entry.answer || <span className="italic">No answer yet.</span>}</p>}
        <div className="mt-2.5 flex flex-wrap items-center gap-2 text-[0.68rem]">
          <span className={`rounded-full border px-2 py-0.5 font-semibold ${style.className}`}>{style.label}</span>
          {blanks > 0 ? (
            <span className="rounded-full border border-violet-soft/40 bg-violet-soft/10 px-2 py-0.5 font-semibold text-violet-light">
              {blanks} blank{blanks === 1 ? "" : "s"} to fill
            </span>
          ) : (
            edited && <span className="rounded-full border border-success/40 bg-success/10 px-2 py-0.5 font-semibold text-success">Personalised</span>
          )}
          {(entry.followUps?.length ?? 0) > 0 && (
            <span className="text-muted">
              {entry.followUps!.length} follow-up{entry.followUps!.length === 1 ? "" : "s"}
            </span>
          )}
          {entry.topic && <span className="text-muted">· {entry.topic}</span>}
        </div>
      </button>

      {expanded && (
        <div className="mt-4 space-y-4 border-t border-line pt-4">
          {entry.answer ? (
            <TemplateText text={entry.answer} className="text-sm leading-relaxed text-text/85" />
          ) : (
            <p className="text-sm italic text-muted">No answer yet — click Edit.</p>
          )}

          {entry.followUps?.map((f, i) => (
            <div key={i} className="rounded-xl border border-line/80 bg-text/[0.03] px-4 py-3">
              <p className="text-xs font-bold text-violet-light">They may follow up: {f.question}</p>
              <TemplateText text={f.answer} className="mt-1 text-sm leading-relaxed text-text/80" />
            </div>
          ))}

          {entry.alternative && (
            <div className="rounded-xl border-l-2 border-violet-soft/50 bg-violet-soft/[0.06] px-4 py-3">
              <p className="text-xs font-bold text-violet-light">{entry.alternative.label || "If they push further"}</p>
              <TemplateText text={entry.alternative.answer} className="mt-1 text-sm leading-relaxed text-text/80" />
            </div>
          )}

          {entry.tip && (
            <p className="rounded-xl border-l-2 border-gold bg-gold-fill/[0.08] px-4 py-2.5 text-sm text-text/80">
              <span className="font-bold text-gold">Tip: </span>
              {entry.tip}
            </p>
          )}

          <div className="flex flex-wrap items-center justify-end gap-2">
            {confirming ? (
              <>
                <span className="text-xs text-muted">{confirming === "delete" ? "Delete this question?" : "Undo your edits and restore the template?"}</span>
                <button
                  onClick={() => {
                    if (confirming === "delete") onDelete();
                    else onReset();
                    setConfirming(null);
                  }}
                  className="rounded-md border border-danger/60 px-3 py-1.5 text-xs text-danger hover:bg-danger/10"
                >
                  {confirming === "delete" ? "Delete" : "Restore template"}
                </button>
                <button onClick={() => setConfirming(null)} className="btn-ghost px-3 py-1.5 text-xs">
                  Keep
                </button>
              </>
            ) : (
              <>
                <button onClick={onEdit} className="btn-violet px-4 py-1.5 text-xs">
                  Edit answer
                </button>
                {canReset && edited && (
                  <button onClick={() => setConfirming("reset")} className="px-2 text-xs text-muted hover:text-text">
                    Reset to template
                  </button>
                )}
                <button onClick={() => setConfirming("delete")} className="px-2 text-xs text-muted hover:text-neon-pink">
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
  const [followUps, setFollowUps] = useState<InterviewFollowUp[]>(initial.followUps ?? []);

  const setFollowUp = (i: number, patch: Partial<InterviewFollowUp>) =>
    setFollowUps((prev) => prev.map((f, j) => (j === i ? { ...f, ...patch } : f)));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    onSubmit({ question, answer, topic, followUps });
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
        <span className="mb-1.5 block text-xs text-muted">Replace anything in [square brackets] with your own details.</span>
        <AutoTextarea value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder="Write your answer here…" minRows={6} className="input-hub" />
      </label>

      {followUps.map((f, i) => (
        <div key={i} className="space-y-2 rounded-xl border border-line/80 p-3">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-semibold text-violet-light">Follow-up {i + 1}</span>
            <button type="button" onClick={() => setFollowUps((prev) => prev.filter((_, j) => j !== i))} className="text-xs text-muted hover:text-neon-pink">
              Remove
            </button>
          </div>
          <input
            value={f.question}
            onChange={(e) => setFollowUp(i, { question: e.target.value })}
            placeholder="What they might ask next"
            aria-label={`Follow-up ${i + 1} question`}
            className="input-hub py-2 text-sm"
          />
          <AutoTextarea
            value={f.answer}
            onChange={(e) => setFollowUp(i, { answer: e.target.value })}
            placeholder="Your answer"
            aria-label={`Follow-up ${i + 1} answer`}
            minRows={3}
            className="input-hub text-sm"
          />
        </div>
      ))}
      <button type="button" onClick={() => setFollowUps((prev) => [...prev, { question: "", answer: "" }])} className="text-xs font-medium text-violet-light hover:underline">
        + Add a follow-up question
      </button>

      <label className="block">
        <span className="eyebrow mb-1.5 block">Topic</span>
        <input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="e.g. General & Experience" className="input-hub" />
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
