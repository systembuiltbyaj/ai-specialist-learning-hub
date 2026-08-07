"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { searchRecords } from "@/app/lib/search";
import type { SearchRecord } from "@/app/lib/types";

const TYPE_LABEL: Record<SearchRecord["type"], string> = {
  term: "Term",
  acronym: "Acronym",
  tool: "Tool",
};

export default function SiteSearch({ variant = "hero" }: { variant?: "hero" | "compact" }) {
  const router = useRouter();
  const listId = useId();
  const [records, setRecords] = useState<SearchRecord[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  // The index is fetched on first interaction, never on page load — that is what
  // keeps it off the critical path for visitors who never search.
  async function loadIndex() {
    if (records || failed) return;
    try {
      const res = await fetch("/search-index.json");
      if (!res.ok) throw new Error("index unavailable");
      setRecords((await res.json()) as SearchRecord[]);
    } catch {
      setFailed(true);
    }
  }

  useEffect(() => {
    function onClickAway(event: MouseEvent) {
      if (boxRef.current && !boxRef.current.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickAway);
    return () => document.removeEventListener("mousedown", onClickAway);
  }, []);

  const results = records ? searchRecords(records, query) : [];

  function go(record: SearchRecord) {
    setOpen(false);
    setQuery("");
    router.push(record.url);
  }

  function onKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Escape") {
      setOpen(false);
      return;
    }
    if (!results.length) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((i) => (i + 1) % results.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((i) => (i - 1 + results.length) % results.length);
    } else if (event.key === "Enter") {
      event.preventDefault();
      go(results[active]);
    }
  }

  const showPanel = open && query.trim() !== "";

  return (
    <div ref={boxRef} className="relative w-full">
      <input
        type="search"
        role="combobox"
        aria-expanded={showPanel && results.length > 0}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-label="Search the reference"
        aria-activedescendant={results.length ? `${listId}-${active}` : undefined}
        value={query}
        placeholder={variant === "hero" ? "Search terms, acronyms, tools…" : "Search…"}
        onFocus={() => {
          loadIndex();
          setOpen(true);
        }}
        onChange={(e) => {
          setQuery(e.target.value);
          setActive(0);
          setOpen(true);
        }}
        onKeyDown={onKeyDown}
        className={
          variant === "hero"
            ? "input-hub w-full text-base sm:text-lg"
            : "input-hub w-full text-sm"
        }
      />

      {showPanel && (
        <div className="absolute z-50 mt-2 w-full overflow-hidden rounded-xl border border-line bg-surface text-left shadow-card">
          {failed ? (
            <p className="p-4 text-sm text-muted">
              Search is unavailable right now.{" "}
              <a href="/dictionary" className="text-gold hover:underline">
                Browse the dictionary →
              </a>
            </p>
          ) : results.length === 0 ? (
            <p className="p-4 text-sm text-muted">
              No matches for “{query}”.{" "}
              <a href="/dictionary" className="text-gold hover:underline">
                Browse all terms →
              </a>
            </p>
          ) : (
            <ul id={listId} role="listbox" className="max-h-80 overflow-y-auto">
              {results.map((r, i) => (
                <li
                  key={`${r.type}-${r.url}-${r.title}`}
                  id={`${listId}-${i}`}
                  role="option"
                  aria-selected={i === active}
                  onMouseEnter={() => setActive(i)}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    go(r);
                  }}
                  className={`cursor-pointer border-b border-line/60 px-4 py-3 last:border-b-0 ${
                    i === active ? "bg-violet/15" : ""
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="chip border border-gold/30 text-[0.55rem] text-gold">
                      {TYPE_LABEL[r.type]}
                    </span>
                    <span className="font-medium text-text">{r.title}</span>
                  </div>
                  <p className="mt-1 line-clamp-2 text-xs text-muted">{r.snippet}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
