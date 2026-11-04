"use client";

import { useState } from "react";

type CopyState = "idle" | "copied" | "failed";

const LABEL: Record<CopyState, string> = { idle: "Copy", copied: "✓ Copied", failed: "Copy failed" };

// Copies text to the clipboard. The clipboard API can be refused (insecure
// origin, denied permission), so failure is shown rather than swallowed.
export default function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [state, setState] = useState<CopyState>("idle");

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setState("copied");
    } catch {
      setState("failed");
    }
    setTimeout(() => setState("idle"), 1500);
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-live="polite"
      className="inline-flex shrink-0 items-center rounded-lg border border-violet-soft/40 bg-violet/15 px-2.5 py-1 text-[0.68rem] font-semibold text-text transition-colors hover:border-violet-soft/70 hover:bg-violet/25"
    >
      {state === "idle" ? label : LABEL[state]}
    </button>
  );
}
