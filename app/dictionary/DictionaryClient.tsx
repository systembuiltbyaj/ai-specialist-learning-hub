"use client";

import { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import {
  DICTIONARY,
  DICTIONARY_BY_ID,
  CATEGORIES,
  LEVELS,
  type DictCategory,
  type DictLevel,
  type DictionaryTerm,
} from "@/data/dictionary";
import SearchBar from "@/app/components/SearchBar";
import { highlight } from "@/app/lib/highlight";

// No per-category colour and no emoji. A reference work distinguishes sections
// with notation, not decoration — and reserving gold for headwords is what lets
// it mean something.

export default function DictionaryClient() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<DictCategory | "All">("All");
  const [level, setLevel] = useState<DictLevel | "All">("All");
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());
  const [flashId, setFlashId] = useState<string | null>(null);
  const [pendingScrollId, setPendingScrollId] = useState<string | null>(null);

  const cardRefs = useRef<Record<string, HTMLElement | null>>({});

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return DICTIONARY.filter((t) => cat === "All" || t.category === cat)
      .filter((t) => level === "All" || t.level === level)
      .filter((t) => {
        if (!q) return true;
        return [t.term, ...t.aliases, t.definition, t.whyItMatters, t.analogy, t.example]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(q);
      });
  }, [query, cat, level]);

  // Jump to a term: clear filters so it's visible, open it, flash + scroll.
  const goTo = (id: string) => {
    if (!DICTIONARY_BY_ID[id]) return;
    setQuery("");
    setCat("All");
    setLevel("All");
    setOpenIds((prev) => new Set(prev).add(id));
    setFlashId(id);
    setPendingScrollId(id);
    window.setTimeout(() => setFlashId(null), 1600);
  };

  // Scroll once the (now-unfiltered) target entry is actually in the DOM.
  useEffect(() => {
    if (!pendingScrollId) return;
    const el = cardRefs.current[pendingScrollId];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      setPendingScrollId(null);
    }
  }, [filtered, pendingScrollId]);

  // Deep-link support: /dictionary#term-<id>.
  useEffect(() => {
    const hash = window.location.hash.replace(/^#term-/, "");
    if (hash && DICTIONARY_BY_ID[hash]) goTo(hash);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggle = (id: string) =>
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const countForCat = (k: DictCategory | "All") =>
    k === "All" ? DICTIONARY.length : DICTIONARY.filter((t) => t.category === k).length;

  return (
    <div className="space-y-7">
      <SearchBar
        value={query}
        onChange={setQuery}
        placeholder="Search terms, abbreviations, definitions…  (Ctrl+F)"
        resultCount={filtered.length}
      />

      {/* Filters — set as an index, the way a reference book lists its sections. */}
      <div className="space-y-3 border-y border-line/70 py-4">
        <FilterRow label="Section">
          <FilterItem
            label="All"
            count={countForCat("All")}
            active={cat === "All"}
            onClick={() => setCat("All")}
          />
          {CATEGORIES.map((c) => (
            <FilterItem
              key={c}
              label={c}
              count={countForCat(c)}
              active={cat === c}
              onClick={() => setCat(c)}
            />
          ))}
        </FilterRow>

        <FilterRow label="Level">
          <FilterItem label="All" active={level === "All"} onClick={() => setLevel("All")} />
          {LEVELS.map((l) => (
            <FilterItem
              key={l}
              label={l}
              active={level === l}
              onClick={() => setLevel(l)}
            />
          ))}
        </FilterRow>
      </div>

      <p className="entry-meta">
        {filtered.length} {filtered.length === 1 ? "entry" : "entries"}
        {cat !== "All" && <> · {cat}</>}
        {level !== "All" && <> · {level}</>}
      </p>

      {filtered.length === 0 ? (
        <p className="border-t border-line py-16 text-center text-[0.9375rem] text-muted">
          No entries match{query && <> “{query}”</>}. Try a broader section or clear the search.
        </p>
      ) : (
        <div className="border-b border-line/70">
          {filtered.map((t) => (
            <Entry
              key={t.id}
              ref={(el) => {
                cardRefs.current[t.id] = el;
              }}
              term={t}
              query={query}
              open={openIds.has(t.id)}
              flash={flashId === t.id}
              onToggle={() => toggle(t.id)}
              onRelated={goTo}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function FilterRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
      <span className="w-14 shrink-0 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-gold">
        {label}
      </span>
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">{children}</div>
    </div>
  );
}

function FilterItem({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count?: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`font-mono text-[0.72rem] tracking-wide underline-offset-[6px] transition-colors ${
        active
          ? "text-text underline decoration-gold decoration-2"
          : "text-muted hover:text-text"
      }`}
    >
      {label}
      {count !== undefined && <span className="ml-1.5 text-muted/60">{count}</span>}
    </button>
  );
}

const Entry = forwardRef<
  HTMLElement,
  {
    term: DictionaryTerm;
    query: string;
    open: boolean;
    flash: boolean;
    onToggle: () => void;
    onRelated: (id: string) => void;
  }
>(function Entry({ term, query, open, flash, onToggle, onRelated }, ref) {
  const related = term.related.map((id) => DICTIONARY_BY_ID[id]).filter(Boolean);

  return (
    <article
      ref={ref}
      id={`term-${term.id}`}
      className={`entry scroll-mt-24 ${flash ? "bg-gold/[0.06]" : ""}`}
    >
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="entry-link group w-full text-left"
      >
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
          <h3 className="entry-head">{highlight(term.term, query)}</h3>
          <p className="entry-meta shrink-0">
            {term.category} <span className="text-line">·</span>{" "}
            <span className="entry-meta-strong">{term.level}</span>
          </p>
        </div>

        {term.aliases.length > 0 && (
          <p className="entry-variants">also {term.aliases.join(" · ")}</p>
        )}

        <p className="entry-body">{highlight(term.definition, query)}</p>

        <span className="mt-3 inline-block font-mono text-[0.68rem] tracking-wide text-muted transition-colors group-hover:text-gold">
          {open ? "− less" : "+ analogy, why it matters, example"}
        </span>
      </button>

      {open && (
        <div className="mt-1">
          {term.analogy && (
            <section className="entry-note">
              <h4 className="entry-note-label">Analogy</h4>
              <p className="entry-note-body">{highlight(term.analogy, query)}</p>
            </section>
          )}

          <section className="entry-note">
            <h4 className="entry-note-label">Why it matters</h4>
            <p className="entry-note-body">
              {highlight(term.whyItMatters, query)}
            </p>
          </section>

          {term.example && (
            <section className="entry-note">
              <h4 className="entry-note-label">In practice</h4>
              <p className="entry-note-body">
                {highlight(term.example, query)}
              </p>
            </section>
          )}

          <div className="entry-xref">
            {related.length > 0 && (
              <>
                <span className="entry-xref-mark" aria-hidden>
                  →
                </span>
                <span className="sr-only">Related terms:</span>
                {related.map((r, i) => (
                  <span key={r.id}>
                    <button onClick={() => onRelated(r.id)} className="entry-xref-link">
                      {r.term}
                    </button>
                    {i < related.length - 1 && (
                      <span className="ml-3 select-none text-line" aria-hidden>
                        ·
                      </span>
                    )}
                  </span>
                ))}
              </>
            )}
            <a
              href={`/dictionary/${term.id}`}
              className="ml-auto text-muted underline decoration-line underline-offset-4 transition-colors hover:text-gold hover:decoration-gold"
            >
              full entry ↗
            </a>
          </div>
        </div>
      )}
    </article>
  );
});
