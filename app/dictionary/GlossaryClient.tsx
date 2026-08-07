"use client";

import { useMemo, useState } from "react";
import type { GlossaryTerm } from "@/app/lib/types";
import { GLOSSARY_TERMS, GLOSSARY_CATEGORIES } from "@/app/lib/seed/glossary";
import SearchBar from "@/app/components/SearchBar";
import { highlight } from "@/app/lib/highlight";

const CAT_ICON: Record<string, string> = {
  "AI & Agents": "🧠",
  "Code & Build": "💻",
  "Web & Servers": "🌐",
  Data: "🗄️",
  "Marketing & Ops": "📣",
};
const GOLD = "#f6cb1f";
const colorOf = (key: string) =>
  GLOSSARY_CATEGORIES.find((c) => c.key === key)?.color ?? GOLD;

export default function GlossaryClient() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<string>("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return GLOSSARY_TERMS.filter((t) => cat === "All" || t.category === cat).filter(
      (t) => {
        if (!q) return true;
        return [t.term, t.fullName, t.tagline, t.eli5, t.analogy, t.example, t.category]
          .join(" ")
          .toLowerCase()
          .includes(q);
      },
    );
  }, [query, cat]);

  const countFor = (k: string) =>
    k === "All"
      ? GLOSSARY_TERMS.length
      : GLOSSARY_TERMS.filter((t) => t.category === k).length;

  return (
    <div className="space-y-6">
      <SearchBar
        value={query}
        onChange={setQuery}
        placeholder="Search terms, definitions, analogies…  (Ctrl+F)"
        resultCount={filtered.length}
      />

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2">
        <Tab
          label="All"
          icon="✦"
          count={countFor("All")}
          color={GOLD}
          active={cat === "All"}
          onClick={() => setCat("All")}
        />
        {GLOSSARY_CATEGORIES.map((c) => (
          <Tab
            key={c.key}
            label={c.key}
            icon={CAT_ICON[c.key] ?? "•"}
            count={countFor(c.key)}
            color={c.color}
            active={cat === c.key}
            onClick={() => setCat(c.key)}
          />
        ))}
      </div>

      <p className="text-xs text-muted">
        <span className="font-bold text-text">{filtered.length}</span> terms
      </p>

      {filtered.length === 0 ? (
        <div className="card p-10 text-center text-muted">
          No terms match “{query}”.
        </div>
      ) : (
        <div className="grid gap-3 md:grid-cols-2">
          {filtered.map((t) => (
            <GTermCard key={t.term} term={t} query={query} />
          ))}
        </div>
      )}
    </div>
  );
}

function Tab({
  label,
  icon,
  count,
  color,
  active,
  onClick,
}: {
  label: string;
  icon: string;
  count: number;
  color: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors"
      style={
        active
          ? { color: "#0a0a0f", backgroundColor: color, borderColor: color }
          : { color: "#e8e8f0", borderColor: "#2a2250" }
      }
    >
      <span aria-hidden>{icon}</span>
      {label}
      <span
        className="rounded-full px-1.5 text-[0.6rem] font-semibold"
        style={
          active
            ? { backgroundColor: "rgba(0,0,0,0.2)" }
            : { backgroundColor: "rgba(255,255,255,0.06)", color }
        }
      >
        {count}
      </span>
    </button>
  );
}

function GTermCard({ term, query }: { term: GlossaryTerm; query: string }) {
  const [open, setOpen] = useState(false);
  const color = colorOf(term.category);

  return (
    <article className="card card-hover animate-fade-up overflow-hidden">
      <button
        className="flex w-full items-start justify-between gap-3 p-5 text-left"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <div className="min-w-0">
          <h3 className="font-bold text-text">
            {highlight(term.term, query)}
            {term.fullName && (
              <span className="ml-2 text-sm font-normal text-muted">
                {term.fullName}
              </span>
            )}
          </h3>
          <p className="mt-1 text-sm text-muted">{highlight(term.tagline, query)}</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span
            className="hidden rounded-full border px-2 py-0.5 text-[0.55rem] font-semibold uppercase tracking-wide sm:inline"
            style={{ color, borderColor: `${color}66`, backgroundColor: `${color}14` }}
          >
            {term.category}
          </span>
          <span className="text-muted">{open ? "▲" : "▼"}</span>
        </div>
      </button>

      {open && (
        <div className="space-y-3 border-t border-line px-5 pb-5 pt-4">
          <p className="text-sm leading-relaxed text-text/85">
            {highlight(term.eli5, query)}
          </p>
          {term.analogy && (
            <InfoBox label="Analogy" icon="💡" color={color}>
              {highlight(term.analogy, query)}
            </InfoBox>
          )}
          {term.example && (
            <InfoBox label="In Practice" icon="⚙" color={color}>
              {highlight(term.example, query)}
            </InfoBox>
          )}
        </div>
      )}
    </article>
  );
}

function InfoBox({
  label,
  icon,
  color,
  children,
}: {
  label: string;
  icon: string;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-line bg-white/[0.03] p-3">
      <p
        className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.15em]"
        style={{ color }}
      >
        {icon} {label}
      </p>
      <p className="mt-1 text-sm leading-relaxed text-text/80">{children}</p>
    </div>
  );
}
