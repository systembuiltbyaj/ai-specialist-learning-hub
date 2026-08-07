"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { DICTIONARY, type DictCategory } from "@/data/dictionary";

const CAT_COLOR: Record<DictCategory, string> = {
  "AI Foundations": "#7c5cfc",
  Prompting: "#f6cb1f",
  "Agentic AI": "#ac4bff",
  Claude: "#ff8a3d",
  "Automation Platforms": "#38bdf8",
  GoHighLevel: "#34d399",
  "Web/Dev": "#f472b6",
};

// Map a term's category onto a Quiz Mode subject so "Quiz me" preselects it.
function quizSubjectFor(cat: DictCategory): string {
  if (cat === "Claude") return "Claude";
  if (cat === "GoHighLevel") return "GoHighLevel";
  if (cat === "Automation Platforms" || cat === "Agentic AI") return "Automation Hub";
  return "Tech Dictionary";
}

// Deterministic day-of-year index so the term is stable for the whole day.
function dayIndex(): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  return Math.floor((now.getTime() - start.getTime()) / 86_400_000);
}

export default function TermOfTheDay() {
  const [shuffle, setShuffle] = useState(0);

  const term = useMemo(() => {
    const i = (dayIndex() + shuffle) % DICTIONARY.length;
    return DICTIONARY[i];
  }, [shuffle]);

  const color = CAT_COLOR[term.category];

  return (
    <article className="card accent-bar accent-purple flex flex-col gap-3 p-6">
      <div className="flex items-center justify-between gap-3">
        <p className="eyebrow">📅 Term of the Day</p>
        <button
          onClick={() => setShuffle((s) => s + 1)}
          className="text-xs text-muted transition-colors hover:text-gold"
          aria-label="Show another term"
        >
          🎲 Another
        </button>
      </div>

      <div>
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-display text-xl font-extrabold uppercase tracking-tight text-text">
            {term.term}
          </h3>
          {term.aliases.length > 0 && (
            <span className="text-sm text-muted">{term.aliases.join(" · ")}</span>
          )}
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          <span
            className="rounded-full border px-2 py-0.5 text-[0.55rem] font-semibold uppercase tracking-wide"
            style={{ color, borderColor: `${color}66`, backgroundColor: `${color}14` }}
          >
            {term.category}
          </span>
          <span className="rounded-full border border-line bg-white/[0.03] px-2 py-0.5 text-[0.55rem] font-semibold uppercase tracking-wide text-muted">
            {term.level}
          </span>
        </div>
      </div>

      <p className="text-sm leading-relaxed text-text/85">{term.definition}</p>
      {term.analogy && (
        <p className="text-sm italic leading-relaxed text-muted">💡 {term.analogy}</p>
      )}

      <div className="mt-1 flex flex-wrap items-center gap-x-5 gap-y-2">
        <Link
          href={`/dictionary/${term.id}`}
          className="inline-flex text-sm font-medium text-gold hover:underline"
        >
          Open in dictionary →
        </Link>
        <Link
          href={`/quiz?subject=${encodeURIComponent(quizSubjectFor(term.category))}`}
          className="inline-flex text-sm font-medium text-violet-light hover:underline"
        >
          🧪 Quiz me on {quizSubjectFor(term.category)} →
        </Link>
      </div>
    </article>
  );
}
