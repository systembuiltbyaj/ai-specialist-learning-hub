"use client";

import { useMemo, useState } from "react";
import {
  ACRONYMS,
  ACRONYM_CATEGORIES,
  type AcronymCategory,
} from "@/data/acronyms";
import SearchBar from "@/app/components/SearchBar";
import { highlight } from "@/app/lib/highlight";
import { ACRONYM_TO_TERM, slugify } from "@/app/lib/reference";

const GOLD = "#f6cb1f";
const COLOR_OF: Record<string, string> = Object.fromEntries(
  ACRONYM_CATEGORIES.map((c) => [c.key, c.color]),
);
const ICON_OF: Record<string, string> = Object.fromEntries(
  ACRONYM_CATEGORIES.map((c) => [c.key, c.icon]),
);

export default function AcronymsClient() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<AcronymCategory | "All">("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ACRONYMS.filter((a) => cat === "All" || a.category === cat)
      .filter((a) => {
        if (!q) return true;
        return `${a.acronym} ${a.full} ${a.meaning}`.toLowerCase().includes(q);
      })
      .sort((a, b) => a.acronym.localeCompare(b.acronym, undefined, { sensitivity: "base" }));
  }, [query, cat]);

  const countFor = (k: AcronymCategory | "All") =>
    k === "All" ? ACRONYMS.length : ACRONYMS.filter((a) => a.category === k).length;

  return (
    <div className="space-y-6">
      <SearchBar
        value={query}
        onChange={setQuery}
        placeholder="Search acronym, full name, or meaning…  (Ctrl+F)"
        resultCount={filtered.length}
      />

      {/* Category chips */}
      <div className="flex flex-wrap gap-2">
        <Chip label="All" icon="✦" count={countFor("All")} color={GOLD} active={cat === "All"} onClick={() => setCat("All")} />
        {ACRONYM_CATEGORIES.map((c) => (
          <Chip
            key={c.key}
            label={c.key}
            icon={c.icon}
            count={countFor(c.key)}
            color={c.color}
            active={cat === c.key}
            onClick={() => setCat(c.key)}
          />
        ))}
      </div>

      <p className="text-xs text-muted">
        <span className="font-bold text-text">{filtered.length}</span> acronym
        {filtered.length === 1 ? "" : "s"}
        {cat !== "All" && <> in {cat}</>}
      </p>

      {filtered.length === 0 ? (
        <div className="card p-10 text-center text-muted">
          No acronyms match your filters{query && <> for “{query}”</>}.
        </div>
      ) : (
        <div className="grid gap-3 md:grid-cols-2">
          {filtered.map((a) => {
            const color = COLOR_OF[a.category] ?? GOLD;
            return (
              <article key={a.acronym} className="card card-hover p-5">
                <div className="flex items-start gap-3">
                  <span
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-xl"
                    style={{ backgroundColor: `${color}1a`, border: `1px solid ${color}44` }}
                  >
                    {a.icon}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline gap-x-2">
                      <h3 className="font-display text-lg font-extrabold tracking-tight text-text">
                        {highlight(a.acronym, query)}
                      </h3>
                      <span className="text-sm font-semibold" style={{ color }}>
                        {highlight(a.full, query)}
                      </span>
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-text/80">
                      {highlight(a.meaning, query)}
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-3">
                      <span
                        className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[0.55rem] font-semibold uppercase tracking-wide"
                        style={{ color, borderColor: `${color}55`, backgroundColor: `${color}10` }}
                      >
                        {ICON_OF[a.category]} {a.category}
                      </span>
                      {/* Acronyms the dictionary already covers link straight to
                          that entry, so the deeper page always wins. */}
                      <a
                        href={
                          ACRONYM_TO_TERM[slugify(a.acronym)]
                            ? `/dictionary/${ACRONYM_TO_TERM[slugify(a.acronym)]}`
                            : `/acronyms/${slugify(a.acronym)}`
                        }
                        className="text-xs font-medium text-gold hover:underline"
                      >
                        {ACRONYM_TO_TERM[slugify(a.acronym)] ? "Full entry ↗" : "Details ↗"}
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}

function Chip({
  label,
  icon,
  count,
  color,
  active,
  onClick,
}: {
  label: string;
  icon?: string;
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
          ? { color: "#08060e", backgroundColor: color, borderColor: color }
          : { color: "#e8e8f0", borderColor: "#2a2250" }
      }
    >
      {icon && <span aria-hidden>{icon}</span>}
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
