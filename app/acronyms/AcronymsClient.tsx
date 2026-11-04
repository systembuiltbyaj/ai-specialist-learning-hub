"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ACRONYMS, ACRONYM_CATEGORIES, type Acronym, type AcronymCategory } from "@/data/acronyms";
import SearchBar from "@/app/components/SearchBar";
import BookmarkButton from "@/app/components/BookmarkButton";
import { highlight } from "@/app/lib/highlight";
import { ACRONYM_TO_TERM, slugify } from "@/app/lib/reference";
import Glyph, { ACRONYM_GLYPH } from "@/app/components/ui/Glyph";
import { Tag } from "@/app/components/ui/Tag";
import { CategoryPanel, CategoryPills, type CategoryItem } from "@/app/components/ui/CategoryFilter";
import { SelectField, ViewToggle } from "@/app/components/ui/Controls";
import Pagination from "@/app/components/ui/Pagination";

const PAGE_SIZE = 12;

type Sort = "az" | "za";
type View = "grid" | "list";

const CATEGORY_ITEMS: CategoryItem[] = [
  { key: "All", label: "All acronyms", count: ACRONYMS.length, glyph: "grid" },
  ...ACRONYM_CATEGORIES.map(({ key }) => ({
    key,
    label: key,
    count: ACRONYMS.filter((a) => a.category === key).length,
    glyph: ACRONYM_GLYPH[key],
  })),
];

export default function AcronymsClient() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<AcronymCategory | "All">("All");
  const [sort, setSort] = useState<Sort>("az");
  const [view, setView] = useState<View>("grid");
  const [page, setPage] = useState(1);
  const resultsRef = useRef<HTMLElement>(null);

  // Search and filters run over every acronym; pagination only slices the result.
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const direction = sort === "za" ? -1 : 1;
    return ACRONYMS.filter((a) => cat === "All" || a.category === cat)
      .filter((a) => !q || `${a.acronym} ${a.full} ${a.meaning}`.toLowerCase().includes(q))
      .sort((a, b) => direction * a.acronym.localeCompare(b.acronym, undefined, { sensitivity: "base" }));
  }, [query, cat, sort]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, pageCount);
  const firstIndex = (current - 1) * PAGE_SIZE;
  const visible = filtered.slice(firstIndex, firstIndex + PAGE_SIZE);

  const search = (value: string) => {
    setQuery(value);
    setPage(1);
  };
  const chooseCategory = (key: string) => {
    setCat(key as AcronymCategory | "All");
    setPage(1);
  };
  const turnPage = (next: number) => {
    setPage(next);
    resultsRef.current?.scrollIntoView({ block: "start" });
  };

  return (
    <div className="space-y-6">
      <div className="[&_input]:h-14 [&_input]:rounded-2xl [&_input]:text-base">
        <SearchBar
          value={query}
          onChange={search}
          placeholder="Search an acronym, full name or meaning, e.g. “MCP”…"
          resultCount={filtered.length}
        />
      </div>

      <CategoryPills items={CATEGORY_ITEMS} active={cat} onSelect={chooseCategory} label="Filter by category" />

      <div className="grid gap-6 xl:grid-cols-[16rem_minmax(0,1fr)]">
        <aside className="hidden xl:block">
          <div className="sticky top-6">
            <CategoryPanel items={CATEGORY_ITEMS} active={cat} onSelect={chooseCategory} label="Acronym categories" />
          </div>
        </aside>

        <section ref={resultsRef} aria-label="Acronyms" className="min-w-0 scroll-mt-24 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted" aria-live="polite">
              {filtered.length === 0 ? (
                "No acronyms"
              ) : (
                <>
                  Showing{" "}
                  <span className="font-semibold text-text">
                    {firstIndex + 1}–{firstIndex + visible.length}
                  </span>{" "}
                  of {filtered.length} {filtered.length === 1 ? "acronym" : "acronyms"}
                </>
              )}
              {cat !== "All" && <> · {cat}</>}
            </p>
            <div className="flex flex-wrap items-center gap-2">
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
                No acronyms match your filters{query && <> for “{query}”</>}.
              </p>
              <button
                type="button"
                onClick={() => {
                  search("");
                  setCat("All");
                }}
                className="btn-ghost mt-5 px-4 py-2 text-xs"
              >
                Clear search and filters
              </button>
            </div>
          ) : (
            <div className={view === "grid" ? "grid gap-4 sm:grid-cols-2 2xl:grid-cols-3" : "space-y-3"}>
              {visible.map((a) => (
                <AcronymCard key={a.acronym} entry={a} query={query} compact={view === "list"} />
              ))}
            </div>
          )}

          <Pagination page={current} pageCount={pageCount} onChange={turnPage} label="Acronym pages" />
        </section>
      </div>
    </div>
  );
}

function AcronymCard({ entry, query, compact }: { entry: Acronym; query: string; compact: boolean }) {
  // Acronyms the dictionary already covers link straight to that entry, so the
  // deeper page always wins (and /acronyms/<slug> would only redirect there).
  const slug = slugify(entry.acronym);
  const termId = ACRONYM_TO_TERM[slug];
  const href = termId ? `/dictionary/${termId}` : `/acronyms/${slug}`;

  return (
    <article className={`card card-hover flex flex-col ${compact ? "px-4 py-3.5" : "p-5"}`}>
      <div className={`flex items-start ${compact ? "gap-3" : "gap-4"}`}>
        <span className={`icon-tile ${compact ? "h-10 w-10" : "h-12 w-12"}`}>
          <Glyph name={ACRONYM_GLYPH[entry.category]} className={compact ? "h-5 w-5" : "h-6 w-6"} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="break-words text-lg font-bold leading-snug tracking-[-0.01em] text-text">
                <Link href={href} className="rounded-sm transition-colors hover:text-gold">
                  {highlight(entry.acronym, query)}
                </Link>
              </h3>
              <p className="mt-0.5 text-sm font-semibold leading-snug text-violet-light">{highlight(entry.full, query)}</p>
            </div>
            {/* Bookmarks belong to dictionary terms, so only acronyms with an
                entry there can be saved. */}
            {termId && <BookmarkButton kind="term" id={termId} label={entry.acronym} compact />}
          </div>
          <p className={`mt-2 text-sm leading-relaxed text-text/80 ${compact ? "" : "line-clamp-3"}`}>
            {highlight(entry.meaning, query)}
          </p>
        </div>
      </div>

      <div className={`flex flex-wrap items-center gap-2 ${compact ? "mt-3 pl-[3.25rem]" : "mt-auto pt-4"}`}>
        <Tag>{entry.category}</Tag>
        <Link
          href={href}
          aria-label={`${termId ? "Full dictionary entry" : "Details"} for ${entry.acronym}`}
          className="ml-auto rounded-md text-xs font-semibold text-violet-light transition-colors hover:text-gold"
        >
          {termId ? "Full entry →" : "Details →"}
        </Link>
      </div>
    </article>
  );
}
