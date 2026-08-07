import type { Metadata } from "next";
import RefCard from "@/app/components/RefCard";
import RefTable from "@/app/components/RefTable";
import SectionLabel from "@/app/components/SectionLabel";
import {
  WEB_BASICS,
  ANALOGY,
  CODE_SAMPLE,
  NEED_MORE,
  CSS_FRAMEWORKS,
  JS_FRAMEWORKS,
  MIN_AI_STACK,
  CLAUDE_FLOW,
  CODE_CLAUDE,
  TOOL_GROUPS,
  STACK_MAP,
  STACK_FLOW,
  STACK_ONE_SENTENCE,
} from "@/app/lib/seed/webguide";

export const metadata: Metadata = {
  title: "Web Dev & AI Guide",
  description:
    "From zero — HTML, CSS, JS — to CSS/JS frameworks, the Claude stack, and a grouped reference of every tool in the ecosystem.",
};

const SECTIONS = [
  { id: "map", label: "Stack Map" },
  { id: "basics", label: "Web Basics" },
  { id: "more", label: "When You Need More" },
  { id: "css", label: "CSS Frameworks" },
  { id: "js", label: "JS Frameworks" },
  { id: "claude", label: "Claude Stack" },
  { id: "tools", label: "All Tools" },
];

export default function WebGuidePage() {
  return (
    <div className="container-hub py-8">
      {/* Hero */}
      <header className="mb-6 border-b border-line pb-6">
        <p className="eyebrow">Complete developer reference</p>
        <h1 className="mt-3 font-display text-3xl font-extrabold uppercase leading-tight tracking-tight text-text sm:text-5xl">
          Web Dev &amp;{" "}
          <span className="bg-gradient-to-r from-gold to-violet-light bg-clip-text text-transparent">
            AI Tools
          </span>{" "}
          Guide
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-muted">
          From zero — HTML, CSS, JS — to frameworks, the Claude/Anthropic stack,
          and a grouped reference of every tool worth knowing.
        </p>
        <nav className="mt-5 flex flex-wrap gap-2">
          {SECTIONS.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="chip hover:border-violet-soft/60">
              {s.label}
            </a>
          ))}
        </nav>
      </header>

      {/* 00 — Plain-English Stack Map */}
      <SectionLabel num="00" title="Plain-English Stack Map" id="map" />
      <div className="my-4 rounded-r-lg border-l-2 border-violet-soft bg-surface-2 px-4 py-3 text-[0.8rem] leading-relaxed text-muted">
        The entire modern web stack in plain language — what each piece does, an
        everyday analogy, and a one-line way to remember it. This covers ~80–90% of
        what you&apos;ll meet building apps like this hub.
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {STACK_MAP.map((group) => (
          <article key={group.label} className="card p-5" style={{ borderTopColor: group.tint, borderTopWidth: 2 }}>
            <h3 className="mb-3 flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wide" style={{ color: group.tint }}>
              <span className="text-lg">{group.icon}</span> {group.label}
            </h3>
            <ul className="space-y-3">
              {group.items.map((it) => (
                <li key={it.name} className="border-t border-line pt-3 first:border-0 first:pt-0">
                  <div className="flex items-center gap-2">
                    <span>{it.icon}</span>
                    <span className="font-bold text-text">{it.name}</span>
                  </div>
                  <p className="mt-1 text-[0.78rem] leading-relaxed text-text/80">{it.meaning}</p>
                  <p className="mt-0.5 text-[0.72rem] italic text-muted">🟰 Like: {it.like}</p>
                  {it.remember && (
                    <p className="mt-1.5 inline-block rounded-md border border-line bg-white/[0.03] px-2 py-0.5 font-mono text-[0.62rem] text-text/80">
                      💡 {it.remember}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      {/* The flow diagram */}
      <div className="card accent-bar accent-purple mt-5 p-5">
        <p className="font-display text-sm font-bold text-violet-light">🚀 The modern website flow</p>
        <ol className="mt-4 space-y-0">
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

      {/* One sentence to remember */}
      <div className="mt-4 rounded-lg border border-gold/30 bg-gold/[0.06] p-4">
        <p className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.2em] text-gold">
          ⭐ One sentence to remember
        </p>
        <p className="mt-2 text-[0.85rem] font-medium leading-relaxed text-text/90">
          {STACK_ONE_SENTENCE}
        </p>
      </div>

      {/* 01 — Web Basics */}
      <SectionLabel num="01" title="The Web Basics — HTML, CSS, JavaScript" id="basics" />
      <div className="my-4 rounded-r-lg border-l-2 border-gold bg-surface-2 px-4 py-3 text-[0.8rem] leading-relaxed text-muted">
        The three foundations of every website — even the most complex apps still
        use HTML + CSS + JS under the hood. You don&apos;t need a framework to start.
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {WEB_BASICS.map((c) => (
          <RefCard key={c.name} card={c} />
        ))}
      </div>
      <div className="mt-4 rounded-lg border border-gold/30 bg-gold/[0.06] p-4">
        <p className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.2em] text-gold">
          💡 Analogy
        </p>
        <p className="mt-2 text-[0.8rem] leading-relaxed text-text/80">{ANALOGY}</p>
      </div>
      <CodeBlock filename="landing-page.html" code={CODE_SAMPLE} />

      {/* 02 — When you need more */}
      <SectionLabel num="02" title="When Do You Actually Need More?" id="more" />
      <p className="mb-4 mt-3 text-[0.78rem] leading-relaxed text-muted">
        Match what you&apos;re building to the smallest stack that does the job.
      </p>
      <RefTable table={NEED_MORE} />

      {/* 03 — CSS Frameworks */}
      <SectionLabel num="03" title="CSS Frameworks — so you don't write CSS from scratch" id="css" />
      <p className="mb-5 mt-3 text-[0.78rem] leading-relaxed text-muted">
        Pre-made styles to move faster. None are required — they&apos;re just convenient.
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        {CSS_FRAMEWORKS.map((c) => (
          <RefCard key={c.name} card={c} />
        ))}
      </div>

      {/* 04 — JS Frameworks */}
      <SectionLabel num="04" title="JavaScript Frameworks — for complex apps" id="js" />
      <p className="mb-5 mt-3 text-[0.78rem] leading-relaxed text-muted">
        When an app grows — many pages, components, shared state — plain JS gets
        messy. Frameworks keep it organized and scalable.
      </p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {JS_FRAMEWORKS.map((c) => (
          <RefCard key={c.name} card={c} />
        ))}
      </div>

      {/* 05 — Claude stack */}
      <SectionLabel num="05" title="The Claude / Anthropic Stack" id="claude" />
      <p className="mb-4 mt-3 text-[0.78rem] leading-relaxed text-muted">
        How to put Claude inside your own app — the most relevant AI stack for
        building an AI-powered site or tool.
      </p>

      {/* minimum stack highlight */}
      <div className="card accent-bar accent-purple p-5 shadow-glow">
        <p className="font-display text-sm font-bold text-violet-light">
          🤖 Minimum stack to build an app with Claude inside
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {MIN_AI_STACK.map((s) => (
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
      </div>

      {/* numbered flow */}
      <ol className="mt-4 space-y-2">
        {CLAUDE_FLOW.map((step) => (
          <li key={step.n} className="card flex items-start gap-4 p-4">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gold font-mono text-xs font-bold text-bg">
              {step.n}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-bold text-text">{step.title}</h3>
                <span className="font-mono text-[0.6rem] text-muted">{step.badge}</span>
              </div>
              <p className="mt-1 text-[0.78rem] leading-relaxed text-text/70">
                {step.desc}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <CodeBlock filename="claude-call.ts" code={CODE_CLAUDE} />

      {/* 06 — All tools reference */}
      <SectionLabel num="06" title="All Tools — Quick Reference" id="tools" />
      <p className="mb-5 mt-3 text-[0.78rem] leading-relaxed text-muted">
        The whole ecosystem, grouped by what each tool is for — pick one per row
        as you build.
      </p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {TOOL_GROUPS.map((g) => (
          <article key={g.label} className="card card-hover p-5">
            <h3 className="mb-3 flex items-center gap-2 font-display text-sm font-bold text-text">
              <span className="text-lg">{g.icon}</span> {g.label}
            </h3>
            <ul className="space-y-1.5">
              {g.tools.map((t) => (
                <li key={t.name} className="text-[0.78rem] leading-snug">
                  <span className="font-semibold text-text">{t.name}</span>
                  <span className="text-muted"> — {t.note}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <p className="mt-10 text-center font-mono text-[0.65rem] tracking-wide text-muted">
        Complete developer reference · HTML → AI stacks · grouped for clarity
      </p>
    </div>
  );
}

function CodeBlock({ filename, code }: { filename: string; code: string }) {
  return (
    <div className="mt-4 overflow-hidden rounded-xl border border-line bg-black/40">
      <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-neon-pink" />
        <span className="h-2.5 w-2.5 rounded-full bg-gold" />
        <span className="h-2.5 w-2.5 rounded-full bg-violet-soft" />
        <span className="ml-2 font-mono text-[0.62rem] text-muted">{filename}</span>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[0.72rem] leading-relaxed text-text/85">
        <code>{code}</code>
      </pre>
    </div>
  );
}
