"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { InterviewEntry } from "@/app/lib/types";
import { useLearner } from "@/app/lib/learner/store";
import { practiceOrder, rateInterviewAnswer, type InterviewRating } from "@/app/lib/learner/state";
import TemplateText from "./TemplateText";

// Most interview answers should land in about two minutes; the timer is a nudge, not a rule.
const ANSWER_SECONDS = 120;

const RATINGS: { rating: InterviewRating; key: string; label: string; hint: string; tone: string }[] = [
  { rating: "missed", key: "1", label: "Missed", hint: "Blanked or rambled", tone: "border-danger/60 hover:bg-danger/10" },
  { rating: "shaky", key: "2", label: "Shaky", hint: "Right idea, weak delivery", tone: "border-gold/60 hover:bg-gold/10" },
  { rating: "nailed", key: "3", label: "Nailed", hint: "Clear, specific, on time", tone: "border-success/60 hover:bg-success/10" },
];

function clock(seconds: number): string {
  const s = Math.abs(seconds);
  return `${seconds < 0 ? "+" : ""}${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

export default function InterviewPractice({
  entries,
  scope,
  onExit,
}: {
  entries: InterviewEntry[];
  scope: string;
  onExit: () => void;
}) {
  const [learner, update] = useLearner();
  const byId = useMemo(() => new Map(entries.map((e) => [e.id, e])), [entries]);
  // Order is fixed at the start so rating an answer doesn't reshuffle the round.
  const [order] = useState(() => practiceOrder(entries.map((e) => e.id), learner));
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [timing, setTiming] = useState(false);
  const [remaining, setRemaining] = useState(ANSWER_SECONDS);
  const [results, setResults] = useState<InterviewRating[]>([]);

  const entry = byId.get(order[index]);
  const done = index >= order.length;

  useEffect(() => {
    if (!timing) return;
    const tick = setInterval(() => setRemaining((s) => s - 1), 1000);
    return () => clearInterval(tick);
  }, [timing]);

  const rate = useCallback(
    (rating: InterviewRating) => {
      if (!entry || !revealed) return;
      update((state) => rateInterviewAnswer(state, entry.id, rating, new Date()));
      setResults((r) => [...r, rating]);
      setIndex((i) => i + 1);
      setRevealed(false);
      setTiming(false);
      setRemaining(ANSWER_SECONDS);
    },
    [entry, revealed, update],
  );

  const reveal = useCallback(() => {
    setRevealed(true);
    setTiming(false);
  }, []);

  useEffect(() => {
    if (done) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (event.key === " " || event.key === "Enter") {
        event.preventDefault();
        if (!revealed) reveal();
        return;
      }
      if (event.key.toLowerCase() === "t" && !revealed) setTiming((t) => !t);
      const match = RATINGS.find((r) => r.key === event.key);
      if (match) rate(match.rating);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [done, rate, reveal, revealed]);

  if (done || !entry) {
    const count = (r: InterviewRating) => results.filter((x) => x === r).length;
    return (
      <div className="mx-auto max-w-2xl space-y-5">
        <div className="card p-8 text-center">
          <p className="eyebrow">Practice round complete · {scope}</p>
          <p className="mt-3 text-2xl font-black text-gold">{results.length} answers rehearsed</p>
          <div className="mt-4 flex justify-center gap-6 text-sm">
            <span className="text-success">{count("nailed")} nailed</span>
            <span className="text-gold">{count("shaky")} shaky</span>
            <span className="text-danger">{count("missed")} missed</span>
          </div>
          <p className="mt-4 text-sm text-muted">
            Rewrite the shaky and missed answers while they&apos;re fresh — they&apos;ll come up first next round.
          </p>
          <button onClick={onExit} className="btn-violet mt-5 px-6">
            Back to my answers
          </button>
        </div>
      </div>
    );
  }

  const overTime = remaining < 0;

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <div className="flex items-center justify-between text-xs text-muted">
        <button onClick={onExit} className="hover:text-neon-pink">
          ✕ End practice
        </button>
        <span>
          {scope} · <span className="text-gold">{index + 1}</span> / {order.length}
        </span>
      </div>

      <div className="h-1.5 w-full overflow-hidden rounded-full bg-text/10" aria-hidden>
        <div className="h-full rounded-full bg-gradient-to-r from-gold to-violet-soft transition-all" style={{ width: `${(index / order.length) * 100}%` }} />
      </div>

      <article className="card space-y-5 p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="eyebrow">{entry.topic || "Interview question"}</p>
            <h2 className="mt-2 text-xl font-bold leading-snug text-text">{entry.question}</h2>
          </div>
          <button
            onClick={() => setTiming((t) => !t)}
            disabled={revealed}
            aria-label={timing ? "Pause timer" : "Start two-minute timer"}
            className={`shrink-0 rounded-lg border px-3 py-2 font-mono text-sm transition-colors disabled:opacity-40 ${
              overTime ? "border-danger/60 text-danger" : timing ? "border-gold/60 text-gold" : "border-line text-muted hover:text-text"
            }`}
          >
            {timing ? "⏸" : "⏱"} {clock(remaining)}
          </button>
        </div>

        {!revealed ? (
          <div className="space-y-3">
            <p className="text-sm text-muted">
              Answer out loud as if you&apos;re in the room. Start the timer (<kbd className="rounded border border-line px-1 font-mono text-[0.7rem]">T</kbd>) to keep it tight.
            </p>
            <button onClick={reveal} className="btn-violet w-full">
              Reveal my written answer <span className="opacity-70">(Space)</span>
            </button>
          </div>
        ) : (
          <div className="space-y-4" aria-live="polite">
            <div className="border-l-2 border-gold pl-4">
              {entry.answer ? (
                <TemplateText text={entry.answer} className="text-sm leading-relaxed text-text/85" />
              ) : (
                <p className="text-sm italic text-muted">You haven&apos;t written an answer for this one yet.</p>
              )}
            </div>
            <p className="text-xs text-muted">How did your spoken answer compare?</p>
            <div className="grid gap-2 sm:grid-cols-3">
              {RATINGS.map((r) => (
                <button key={r.rating} onClick={() => rate(r.rating)} className={`rounded-xl border p-3 text-left transition-colors ${r.tone}`}>
                  <span className="block text-sm font-bold text-text">
                    <kbd className="mr-1.5 rounded border border-line px-1 font-mono text-[0.7rem] text-muted">{r.key}</kbd>
                    {r.label}
                  </span>
                  <span className="text-xs text-muted">{r.hint}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
