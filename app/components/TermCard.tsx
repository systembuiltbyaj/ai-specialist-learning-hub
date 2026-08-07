"use client";

import { useState } from "react";
import type { Term, TermCategory } from "@/app/lib/types";
import { highlight } from "@/app/lib/highlight";

const CATEGORY_STYLES: Record<TermCategory, string> = {
  Concepts: "border-blue-400/40 text-blue-300",
  Tools: "border-emerald-400/40 text-emerald-300",
  "GHL-Specific": "border-pink-400/40 text-pink-300",
  Automation: "border-gold/50 text-gold",
};

interface TermCardProps {
  term: Term;
  query?: string;
  /** Jump to a related term by name (used by the dictionary page). */
  onRelatedClick?: (name: string) => void;
}

export default function TermCard({ term, query = "", onRelatedClick }: TermCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <article className="card card-hover animate-fade-up p-5">
      <button
        className="flex w-full items-start justify-between gap-4 text-left"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <div>
          <h3 className="text-lg font-bold text-white">
            {highlight(term.name, query)}
          </h3>
          <p className="mt-1 text-sm text-white/70">
            {highlight(term.definition, query)}
          </p>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-2">
          <span
            className={`chip border ${CATEGORY_STYLES[term.category]}`}
          >
            {term.category}
          </span>
          <span className="text-white/40">{open ? "▲" : "▼"}</span>
        </div>
      </button>

      {open && (
        <div className="mt-4 space-y-4 border-t border-navy-border pt-4 text-sm">
          <Field label="Beginner Explanation">
            <p className="text-white/80">{highlight(term.explanation, query)}</p>
          </Field>

          {term.use_cases.length > 0 && (
            <Field label="Use Cases">
              <ul className="list-disc space-y-1 pl-5 text-white/80">
                {term.use_cases.map((u, i) => (
                  <li key={i}>{highlight(u, query)}</li>
                ))}
              </ul>
            </Field>
          )}

          {term.examples.length > 0 && (
            <Field label="Example">
              {term.examples.map((ex, i) => (
                <blockquote
                  key={i}
                  className="border-l-2 border-gold pl-3 italic text-white/70"
                >
                  {highlight(ex, query)}
                </blockquote>
              ))}
            </Field>
          )}

          {term.related_terms.length > 0 && (
            <Field label="Related Terms">
              <div className="flex flex-wrap gap-2">
                {term.related_terms.map((r) => (
                  <button
                    key={r}
                    onClick={() => onRelatedClick?.(r)}
                    className="chip hover:border-gold hover:text-gold"
                  >
                    {r}
                  </button>
                ))}
              </div>
            </Field>
          )}
        </div>
      )}
    </article>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="eyebrow mb-1.5">{label}</p>
      {children}
    </div>
  );
}
