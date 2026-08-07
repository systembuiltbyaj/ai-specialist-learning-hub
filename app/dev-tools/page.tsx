import type { Metadata } from "next";
import RefCard from "@/app/components/RefCard";
import RefTable from "@/app/components/RefTable";
import SectionLabel from "@/app/components/SectionLabel";
import {
  AI_EDITORS,
  EDITOR_COMPARISON,
  EDITOR_WINNERS,
  LLMS,
  REGISTRARS,
  STACK,
} from "@/app/lib/seed/devtools";
import { T3_STACK, STACK_FLOW, STACK_ONE_SENTENCE } from "@/app/lib/seed/webguide";
import type { AccentKey } from "@/app/lib/types";

export const metadata: Metadata = {
  title: "Dev Tools Universe",
  description:
    "AI code editors, language models, domain registrars, and the full modern web stack — compared.",
};

const ACCENT_BG: Record<AccentKey, string> = {
  teal: "bg-neon-teal",
  pink: "bg-neon-pink",
  yellow: "bg-neon-yellow",
  blue: "bg-neon-blue",
  purple: "bg-neon-purple",
  orange: "bg-neon-orange",
};

// In-page section links (shown as quick anchors below the hero).
const SECTIONS = [
  { id: "editors", label: "AI Code Editors" },
  { id: "llms", label: "Language Models" },
  { id: "domains", label: "Domain Registrars" },
  { id: "stack", label: "Full Stack" },
  { id: "flow", label: "The Flow" },
];

export default function DevToolsPage() {
  return (
    <div className="container-hub py-8">
      {/* Hero */}
      <header className="mb-6">
        <p className="eyebrow">Reference · compiled June 2026</p>
        <h1 className="mt-3 bg-gradient-to-r from-gold via-gold-soft to-violet-light bg-clip-text font-display text-3xl font-extrabold uppercase tracking-tight text-transparent sm:text-5xl">
          Dev Tools Universe
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-muted">
          AI editors · LLMs · domains · hosting · full-stack comparisons. The
          tools that build the modern web — and where each one fits.
        </p>
        <nav className="mt-5 flex flex-wrap gap-2">
          {SECTIONS.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="chip hover:border-neon-teal/60">
              {s.label}
            </a>
          ))}
        </nav>
      </header>

      {/* 01 — AI Code Editors */}
      <SectionLabel num="01" title="AI Code Editors" id="editors" />
      <p className="mb-5 mt-3 text-[0.78rem] leading-relaxed text-muted">
        The most-used AI editors right now (June 2026). Most pros run 2–3
        together — Cursor for daily editing, Claude Code for complex tasks, and
        open-source agents for background automation.
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        {AI_EDITORS.map((c) => (
          <RefCard key={c.name} card={c} />
        ))}
      </div>
      <div className="mt-4">
        <RefTable table={EDITOR_COMPARISON} />
      </div>
      {/* 2026 verdict */}
      <div className="card accent-bar accent-orange mt-4 p-5 shadow-glow-gold">
        <p className="font-display text-sm font-bold text-gold">🏆 The verdict (2026)</p>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {EDITOR_WINNERS.map((w) => (
            <div key={w.label} className="rounded-lg border border-line bg-white/5 p-3">
              <p className="font-mono text-[0.6rem] uppercase tracking-wider text-muted">
                {w.label}
              </p>
              <p className="mt-1 font-bold text-text">{w.pick}</p>
              <p className="text-xs text-muted">{w.note}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 02 — LLMs */}
      <SectionLabel num="02" title="AI Language Models (LLMs)" id="llms" />
      <p className="mb-5 mt-3 text-[0.78rem] leading-relaxed text-muted">
        The most-used models right now (June 2026) — closed source (API) vs open
        source (run it yourself).
      </p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {LLMS.map((c) => (
          <RefCard key={c.name} card={c} />
        ))}
      </div>

      {/* 03 — Domain Registrars */}
      <SectionLabel num="03" title="Domain Registrars" id="domains" />
      <p className="mb-5 mt-3 text-[0.78rem] leading-relaxed text-muted">
        Where you buy and manage domain names (e.g. mysite.com). The domain is
        separate from hosting.
      </p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {REGISTRARS.map((c) => (
          <RefCard key={c.name} card={c} />
        ))}
      </div>

      {/* 04 — Full Stack */}
      <SectionLabel num="04" title="Full Stack: Database · Backend · Hosting" id="stack" />
      <p className="mb-5 mt-3 text-[0.78rem] leading-relaxed text-muted">
        How modern web apps are built — from database to framework to deployment.
      </p>
      <div className="space-y-2">
        {STACK.map((item) => (
          <div
            key={item.name}
            className="card card-hover flex items-start gap-4 p-4"
          >
            <div
              className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white/5 text-lg`}
            >
              {item.icon}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-display text-sm font-bold text-text">
                  {item.name}
                </h3>
                {item.badge && (
                  <span className={`badge badge-${item.badge.kind}`}>
                    {item.badge.label}
                  </span>
                )}
              </div>
              <p className="mt-1 text-[0.78rem] leading-relaxed text-text/70">
                {item.desc}
              </p>
              <p className="mt-2 flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-wider text-muted">
                <span
                  className={`inline-block h-1.5 w-1.5 rounded-full ${ACCENT_BG[item.accent]}`}
                />
                Role → {item.role}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* T3 summary */}
      <div className="card accent-bar accent-teal mt-4 p-5 shadow-glow">
        <p className="font-display text-sm font-bold text-neon-teal">
          ⚡ The “T3 Stack” — most popular modern setup
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {T3_STACK.map((s) => (
            <span
              key={s.name}
              className="rounded-full border border-line bg-white/5 px-3 py-1.5 text-xs"
            >
              <span className="font-semibold text-text">{s.name}</span>
              <span className="ml-1.5 font-mono text-[0.6rem] uppercase tracking-wide text-muted">
                {s.role}
              </span>
            </span>
          ))}
        </div>
        <p className="mt-3 text-[0.75rem] leading-relaxed text-text/70">
          Full production SaaS app, all TypeScript, no separate backend server
          needed.
        </p>
      </div>

      {/* 05 — The Flow, Start to Finish */}
      <SectionLabel num="05" title="The Flow, Start to Finish" id="flow" />
      <p className="mb-5 mt-3 text-[0.78rem] leading-relaxed text-muted">
        How all these tools connect into one request — from a user&apos;s click to a
        global cloud. The plain-English version of the whole stack.
      </p>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="card p-5">
          <ol className="space-y-0">
            {STACK_FLOW.map((step, i) => (
              <li key={step.name}>
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-line bg-white/5 text-lg">
                    {step.icon}
                  </span>
                  <div className="min-w-0">
                    <span className="font-bold text-text">{step.name}</span>
                    <span className="ml-2 text-[0.75rem] text-muted">{step.note}</span>
                  </div>
                </div>
                {i < STACK_FLOW.length - 1 && (
                  <span className="my-0.5 ml-[1.1rem] block h-4 w-px bg-line" aria-hidden />
                )}
              </li>
            ))}
          </ol>
        </div>
        <div className="card accent-bar accent-yellow flex flex-col justify-center p-5">
          <p className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.2em] text-gold">
            ⭐ One sentence to remember
          </p>
          <p className="mt-3 text-[0.9rem] font-medium leading-relaxed text-text/90">
            {STACK_ONE_SENTENCE}
          </p>
          <p className="mt-4 text-[0.72rem] text-muted">
            New to these terms? The{" "}
            <a href="/web-guide#map" className="text-violet-light hover:underline">
              Web Dev Guide → Stack Map
            </a>{" "}
            breaks each one down with analogies.
          </p>
        </div>
      </div>

      <p className="mt-10 text-center font-mono text-[0.65rem] tracking-wide text-muted">
        Compiled June 2026 · comparisons are approximate · pricing changes
        frequently
      </p>
    </div>
  );
}
