"use client";

import { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
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
import BookmarkButton from "@/app/components/BookmarkButton";
import { highlight } from "@/app/lib/highlight";
import Glyph, { DICT_GLYPH } from "@/app/components/ui/Glyph";
import { Tag, StatusTag } from "@/app/components/ui/Tag";
import { CategoryPanel, CategoryPills, type CategoryItem } from "@/app/components/ui/CategoryFilter";
import { SelectField, ViewToggle } from "@/app/components/ui/Controls";
import Pagination from "@/app/components/ui/Pagination";

const PAGE_SIZE = 12;

type Sort = "az" | "za" | "level";
type View = "grid" | "list";

const LEVEL_RANK: Record<DictLevel, number> = { Beginner: 0, Intermediate: 1, Advanced: 2 };

const byName = (a: DictionaryTerm, b: DictionaryTerm) =>
  a.term.localeCompare(b.term, undefined, { sensitivity: "base" });

function sortTerms(terms: DictionaryTerm[], sort: Sort): DictionaryTerm[] {
  const sorted = [...terms];
  if (sort === "za") return sorted.sort((a, b) => byName(b, a));
  if (sort === "level") return sorted.sort((a, b) => LEVEL_RANK[a.level] - LEVEL_RANK[b.level] || byName(a, b));
  return sorted.sort(byName);
}

function matches(term: DictionaryTerm, q: string): boolean {
  if (!q) return true;
  return [term.term, ...term.aliases, term.definition, term.whyItMatters, term.analogy, term.example]
    .filter(Boolean)
    .join(" ")
    .toLowerCase()
    .includes(q);
}

const CATEGORY_ITEMS: CategoryItem[] = [
  { key: "All", label: "All terms", count: DICTIONARY.length, glyph: "grid" },
  ...CATEGORIES.map((c) => ({
    key: c,
    label: c,
    count: DICTIONARY.filter((t) => t.category === c).length,
    glyph: DICT_GLYPH[c],
  })),
];

export default function DictionaryClient() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<DictCategory | "All">("All");
  const [level, setLevel] = useState<DictLevel | "All">("All");
  const [sort, setSort] = useState<Sort>("az");
  const [view, setView] = useState<View>("grid");
  const [page, setPage] = useState(1);
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());
  const [flashId, setFlashId] = useState<string | null>(null);
  const [pendingScrollId, setPendingScrollId] = useState<string | null>(null);

  const cardRefs = useRef<Record<string, HTMLElement | null>>({});
  const resultsRef = useRef<HTMLElement>(null);

  const sortedAll = useMemo(() => sortTerms(DICTIONARY, sort), [sort]);

  // Search and filters run over every entry; pagination only slices the result.
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return sortedAll
      .filter((t) => cat === "All" || t.category === cat)
      .filter((t) => level === "All" || t.level === level)
      .filter((t) => matches(t, q));
  }, [sortedAll, query, cat, level]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, pageCount);
  const firstIndex = (current - 1) * PAGE_SIZE;
  const visible = filtered.slice(firstIndex, firstIndex + PAGE_SIZE);

  // Jump to a term: clear filters so it's visible, turn to its page, open it,
  // flash + scroll.
  const goTo = (id: string) => {
    if (!DICTIONARY_BY_ID[id]) return;
    setQuery("");
    setCat("All");
    setLevel("All");
    setPage(Math.floor(sortedAll.findIndex((t) => t.id === id) / PAGE_SIZE) + 1);
    setOpenIds((prev) => new Set(prev).add(id));
    setFlashId(id);
    setPendingScrollId(id);
    window.setTimeout(() => setFlashId(null), 1600);
  };

  // Scroll once the target entry is actually in the DOM.
  useEffect(() => {
    if (!pendingScrollId) return;
    const el = cardRefs.current[pendingScrollId];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      setPendingScrollId(null);
    }
  }, [filtered, current, pendingScrollId]);

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

  // Any change to what's being looked at starts again from page 1.
  const search = (value: string) => {
    setQuery(value);
    setPage(1);
  };
  const chooseCategory = (key: string) => {
    setCat(key as DictCategory | "All");
    setPage(1);
  };
  const turnPage = (next: number) => {
    setPage(next);
    resultsRef.current?.scrollIntoView({ block: "start" });
  };
  const clearFilters = () => {
    search("");
    setCat("All");
    setLevel("All");
  };

  return (
    <div className="space-y-6">
      <div className="[&_input]:h-14 [&_input]:rounded-2xl [&_input]:text-base">
        <SearchBar
          value={query}
          onChange={search}
          placeholder="Search terms, e.g. “RAG”, “MCP”, “webhook”…"
          resultCount={filtered.length}
        />
      </div>

      <CategoryPills items={CATEGORY_ITEMS} active={cat} onSelect={chooseCategory} label="Filter by category" />

      <div className="grid gap-6 xl:grid-cols-[15rem_minmax(0,1fr)]">
        <aside className="hidden xl:block">
          <div className="sticky top-6">
            <CategoryPanel items={CATEGORY_ITEMS} active={cat} onSelect={chooseCategory} label="Dictionary categories" />
          </div>
        </aside>

        <section ref={resultsRef} aria-label="Dictionary entries" className="min-w-0 scroll-mt-24 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted" aria-live="polite">
              {filtered.length === 0 ? (
                "No terms"
              ) : (
                <>
                  Showing{" "}
                  <span className="font-semibold text-text">
                    {firstIndex + 1}–{firstIndex + visible.length}
                  </span>{" "}
                  of {filtered.length} {filtered.length === 1 ? "term" : "terms"}
                </>
              )}
              {cat !== "All" && <> · {cat}</>}
              {level !== "All" && <> · {level}</>}
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <SelectField
                label="Level"
                value={level}
                onChange={(value) => {
                  setLevel(value);
                  setPage(1);
                }}
                options={[{ value: "All", label: "All" }, ...LEVELS.map((l) => ({ value: l, label: l }))]}
              />
              <SelectField
                label="Sort"
                value={sort}
                onChange={(value) => {
                  setSort(value);
                  setPage(1);
                }}
                options={[
                  { value: "az", label: "A → Z" },
                  { value: "za", label: "Z → A" },
                  { value: "level", label: "Beginner first" },
                ]}
              />
              <ViewToggle
                label="Layout"
                value={view}
                onChange={setView}
                options={[
                  { value: "grid", label: "Grid view", glyph: "grid" },
                  { value: "list", label: "List view", glyph: "list" },
                ]}
              />
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="card px-6 py-14 text-center">
              <p className="text-[0.9375rem] text-muted">
                No entries match{query && <> “{query}”</>}. Try a broader category or clear the search.
              </p>
              <button type="button" onClick={clearFilters} className="btn-ghost mt-5 px-4 py-2 text-xs">
                Clear search and filters
              </button>
            </div>
          ) : (
            <div className={view === "grid" ? "grid gap-4 sm:grid-cols-2" : "space-y-3"}>
              {visible.map((t) => (
                <TermCard
                  key={t.id}
                  ref={(el) => {
                    cardRefs.current[t.id] = el;
                  }}
                  term={t}
                  query={query}
                  compact={view === "list"}
                  open={openIds.has(t.id)}
                  flash={flashId === t.id}
                  onToggle={() => toggle(t.id)}
                  onRelated={goTo}
                />
              ))}
            </div>
          )}

          <Pagination page={current} pageCount={pageCount} onChange={turnPage} label="Dictionary pages" />
        </section>
      </div>
    </div>
  );
}

const TermCard = forwardRef<
  HTMLElement,
  {
    term: DictionaryTerm;
    query: string;
    compact: boolean;
    open: boolean;
    flash: boolean;
    onToggle: () => void;
    onRelated: (id: string) => void;
  }
>(function TermCard({ term, query, compact, open, flash, onToggle, onRelated }, ref) {
  const related = term.related.map((id) => DICTIONARY_BY_ID[id]).filter(Boolean);

  return (
    <article
      ref={ref}
      id={`term-${term.id}`}
      className={`card card-hover scroll-mt-24 ${compact ? "px-4 py-3.5" : "p-5"} ${
        open || flash ? "card-active" : ""
      } ${open && !compact ? "sm:col-span-2" : ""}`}
    >
      <div className={`flex items-start ${compact ? "gap-3" : "gap-4"}`}>
        <span className={`icon-tile ${compact ? "h-10 w-10" : "h-12 w-12"}`}>
          <Glyph name={DICT_GLYPH[term.category]} className={compact ? "h-5 w-5" : "h-6 w-6"} />
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="text-lg font-bold leading-snug tracking-[-0.01em] text-text">
                <Link href={`/dictionary/${term.id}`} className="rounded-sm transition-colors hover:text-gold">
                  {highlight(term.term, query)}
                </Link>
              </h3>
              {term.aliases.length > 0 && (
                <p className="mt-0.5 text-xs text-muted">also {highlight(term.aliases.join(" · "), query)}</p>
              )}
            </div>
            <BookmarkButton kind="term" id={term.id} label={term.term} compact />
          </div>

          <p className={`mt-2 text-sm leading-relaxed text-text/80 ${open ? "" : compact ? "line-clamp-1" : "line-clamp-2"}`}>
            {highlight(term.definition, query)}
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Tag>{term.category}</Tag>
            <Tag>{term.level}</Tag>
            <StatusTag status={term.status} />
            <button
              type="button"
              onClick={onToggle}
              aria-expanded={open}
              aria-label={open ? `Show less about ${term.term}` : `More about ${term.term}: analogy, why it matters, example`}
              className="ml-auto rounded-md text-xs font-semibold text-violet-light transition-colors hover:text-gold"
            >
              {open ? "Less ↑" : "More ↓"}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="mt-5 space-y-4 border-t border-violet-soft/20 pt-4">
          <div className="grid gap-3 md:grid-cols-[repeat(auto-fit,minmax(13rem,1fr))]">
            {term.analogy && <Note label="Analogy" body={highlight(term.analogy, query)} />}
            <Note label="Why it matters" body={highlight(term.whyItMatters, query)} />
            {term.example && <Note label="In practice" body={highlight(term.example, query)} />}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {related.length > 0 && (
              <>
                <span className="text-xs font-semibold text-muted">Related</span>
                {related.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => onRelated(r.id)}
                    className="chip hover:border-violet-soft/70 hover:text-text"
                  >
                    {r.term}
                  </button>
                ))}
              </>
            )}
            <Link
              href={`/dictionary/${term.id}`}
              className="ml-auto rounded-md text-xs font-semibold text-violet-light transition-colors hover:text-gold"
            >
              Full entry →
            </Link>
          </div>
        </div>
      )}
    </article>
  );
});

function Note({ label, body }: { label: string; body: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-violet-soft/20 bg-violet/[0.06] p-3.5">
      <h4 className="text-xs font-semibold text-violet-light">{label}</h4>
      <p className="mt-1 text-sm leading-relaxed text-text/80">{body}</p>
    </section>
  );
}
