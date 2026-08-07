"use client";

import { useEffect, useRef } from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  /** Enable Ctrl/Cmd+F focus capture and "/" shortcut. */
  shortcut?: boolean;
  resultCount?: number;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search…",
  shortcut = true,
  resultCount,
}: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!shortcut) return;
    const handler = (e: KeyboardEvent) => {
      const isFind = (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "f";
      const isSlash =
        e.key === "/" &&
        !["INPUT", "TEXTAREA"].includes(
          (document.activeElement?.tagName ?? "").toUpperCase(),
        );
      if (isFind || isSlash) {
        e.preventDefault();
        inputRef.current?.focus();
        inputRef.current?.select();
      }
      if (e.key === "Escape" && document.activeElement === inputRef.current) {
        inputRef.current?.blur();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [shortcut]);

  return (
    <div className="relative">
      {/* A drawn glyph, not an emoji — emoji as iconography reads as filler and
          undercuts the reference-work tone. */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="6.5" />
        <path d="m16 16 4 4" />
      </svg>
      <input
        ref={inputRef}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="input-hub pl-11 pr-28 font-serif text-[1.0625rem]"
        aria-label="Search"
      />
      <div className="pointer-events-none absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-2">
        {typeof resultCount === "number" && value && (
          <span className="font-mono text-[0.68rem] text-muted">{resultCount} found</span>
        )}
        {shortcut && !value && (
          <kbd className="hidden rounded border border-line px-1.5 py-0.5 font-mono text-[0.6rem] text-muted sm:inline">
            Ctrl+F
          </kbd>
        )}
      </div>
    </div>
  );
}
