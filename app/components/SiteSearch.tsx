"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { searchRecords } from "@/app/lib/search";
import type { SearchRecord } from "@/app/lib/types";

const TYPE_LABEL: Record<SearchRecord["type"], string> = {
  term: "Term",
  acronym: "Acronym",
  tool: "Tool",
  lesson: "Lesson",
  project: "Project",
};

export default function SiteSearch({ variant = "hero" }: { variant?: "hero" | "compact" }) {
  const router = useRouter();
  const listId = useId();
  const [records, setRecords] = useState<SearchRecord[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const [shortcut, setShortcut] = useState("Ctrl K");
  const boxRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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

  // Ctrl/⌘ K jumps to the sidebar search from anywhere. Only the compact box
  // listens, so the home page's second search box doesn't fight it for focus.
  useEffect(() => {
    if (variant !== "compact") return;
    if (/Mac|iPhone|iPad/.test(navigator.platform)) setShortcut("⌘K");
    function onShortcut(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        const input = inputRef.current;
        if (!input || input.offsetParent === null) return; // hidden copy (mobile drawer closed)
        event.preventDefault();
        input.focus();
      }
    }
    window.addEventListener("keydown", onShortcut);
    return () => window.removeEventListener("keydown", onShortcut);
  }, [variant]);

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
      <svg
        viewBox="0 0 24 24"
        aria-hidden
        className={`pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted ${variant === "hero" ? "h-5 w-5" : "h-4 w-4"}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>
      <input
        ref={inputRef}
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
            ? "input-hub w-full pl-11 pr-14 text-base"
            : "input-hub w-full py-2.5 pl-10 pr-16 text-sm"
        }
      />
      {variant === "compact" ? (
        <kbd className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md border border-violet-soft/30 px-1.5 py-0.5 font-sans text-[0.65rem] font-semibold text-muted">
          {shortcut}
        </kbd>
      ) : (
        <button
          type="button"
          aria-label="Open the top result"
          onClick={() => (results.length ? go(results[active]) : inputRef.current?.focus())}
          className="btn-violet absolute right-1.5 top-1/2 h-9 w-10 -translate-y-1/2 p-0"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
      )}

      {showPanel && (
        <div className="glass-pane absolute z-50 mt-2 w-full overflow-hidden rounded-xl text-left">
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
