"use client";

import { useMemo, useState } from "react";
import type { ArsenalMcp, FrameworkStep } from "@/app/lib/types";
import {
  ARSENAL_SKILLS,
  ARSENAL_CATEGORIES,
  ARSENAL_TOTAL,
  ARSENAL_BUNDLE_MB,
} from "@/app/lib/seed/arsenal-skills";
import { ARSENAL_MCPS, FRAMEWORK_STEPS, MOST_USED } from "@/app/lib/seed/arsenal";

const TABS = ["Skills", "MCPs", "Framework"] as const;
type Tab = (typeof TABS)[number];

const PALETTE = [
  "#A78BFA", "#10B981", "#3B82F6", "#F59E0B", "#EC4899",
  "#F97316", "#06B6D4", "#8B5CF6", "#f43f5e", "#22d3ee",
];
const catColor = (name: string) => {
  const i = ARSENAL_CATEGORIES.findIndex((c) => c.name === name);
  return PALETTE[(i < 0 ? 0 : i) % PALETTE.length];
};

export default function ClaudeHubClient() {
  const [tab, setTab] = useState<Tab>("Skills");

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`chip ${tab === t ? "chip-active" : "hover:border-violet-soft/60"}`}
          >
            {t === "Skills" ? "✦ " : t === "MCPs" ? "⚡ " : "▣ "}
            {t}
          </button>
        ))}
      </div>

      {tab === "Skills" && <SkillsTab />}
      {tab === "MCPs" && <McpsTab />}
      {tab === "Framework" && <FrameworkTab />}
    </div>
  );
}

/* ───────────── SKILLS ───────────── */
function SkillsTab() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ARSENAL_SKILLS.filter((s) => cat === "All" || s.category === cat).filter(
      (s) =>
        !q ? true : `${s.name} ${s.id} ${s.description}`.toLowerCase().includes(q),
    );
  }, [query, cat]);

  const grouped = useMemo(() => {
    const map = new Map<string, typeof ARSENAL_SKILLS>();
    for (const s of filtered) {
      if (!map.has(s.category)) map.set(s.category, []);
      map.get(s.category)!.push(s);
    }
    return Array.from(map.entries());
  }, [filtered]);

  // Pinned "most used" only on the default view (no search, all categories).
  const showMostUsed = cat === "All" && !query.trim();
  const mostUsed = useMemo(
    () =>
      MOST_USED.map((m) => {
        const skill = ARSENAL_SKILLS.find((s) => s.id === m.id);
        return skill ? { ...skill, why: m.why } : null;
      }).filter(Boolean) as (typeof ARSENAL_SKILLS[number] & { why: string })[],
    [],
  );

  return (
    <div className="space-y-5">
      <div className="card flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm">
          <span className="font-black text-violet-light">{ARSENAL_TOTAL}</span>{" "}
          <span className="text-text/80">skills across</span>{" "}
          <span className="font-black text-violet-light">{ARSENAL_CATEGORIES.length}</span>{" "}
          <span className="text-text/80">categories</span>
        </p>
        <span className="font-mono text-xs text-muted">
          full library · {ARSENAL_BUNDLE_MB} MB
        </span>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`Search ${ARSENAL_TOTAL} skills by name, id, or description…`}
          className="input-hub flex-1"
        />
        <select
          value={cat}
          onChange={(e) => setCat(e.target.value)}
          className="input-hub sm:w-64"
        >
          <option value="All">All categories ({ARSENAL_TOTAL})</option>
          {ARSENAL_CATEGORIES.map((c) => (
            <option key={c.name} value={c.name}>
              {c.name} ({c.count})
            </option>
          ))}
        </select>
      </div>

      {showMostUsed && (
        <section>
          <div className="mb-3 flex items-center gap-2">
            <span className="text-gold">★</span>
            <h3 className="text-sm font-bold uppercase tracking-wider text-gold">
              Most Used Today
            </h3>
            <span className="text-xs text-muted">{mostUsed.length}</span>
            <div className="ml-2 h-px flex-1 bg-line" />
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {mostUsed.map((s, i) => {
              const color = catColor(s.category);
              return (
                <article
                  key={s.id}
                  className="card card-hover accent-bar accent-teal flex flex-col p-4"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-bold text-text">
                      <span className="mr-1.5 text-gold">#{i + 1}</span>
                      {s.name}
                    </h4>
                    <span
                      className="shrink-0 rounded-full px-2 py-0.5 text-[0.55rem] font-semibold uppercase tracking-wide"
                      style={{ color, backgroundColor: `${color}1a` }}
                    >
                      {s.category}
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-text/80">
                    <span className="font-semibold text-gold">Why: </span>
                    {s.why}
                  </p>
                  <div className="mt-2">
                    <span className="rounded border border-line bg-black/30 px-2 py-0.5 font-mono text-[0.6rem] text-text/70">
                      ❯ {s.id}
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      )}

      {grouped.length === 0 && (
        <div className="card p-10 text-center text-muted">No skills match “{query}”.</div>
      )}

      {grouped.map(([category, skills]) => {
        const color = catColor(category);
        return (
          <section key={category}>
            <div className="mb-3 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
              <h3 className="text-sm font-bold uppercase tracking-wider text-text">
                {category}
              </h3>
              <span className="text-xs text-muted">{skills.length}</span>
              <div className="ml-2 h-px flex-1 bg-line" />
            </div>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {skills.map((s) => (
                <article
                  key={s.id}
                  className="card card-hover flex flex-col p-4"
                  style={{ borderTopColor: color, borderTopWidth: 2 }}
                >
                  <span
                    className="self-start rounded-full px-2 py-0.5 text-[0.55rem] font-semibold uppercase tracking-wide"
                    style={{ color, backgroundColor: `${color}1a` }}
                  >
                    {category}
                  </span>
                  <h4 className="mt-2 font-bold text-text">{s.name}</h4>
                  <p className="mt-1 line-clamp-3 text-xs leading-relaxed text-muted">
                    {s.description}
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <span className="rounded border border-line bg-black/30 px-2 py-0.5 font-mono text-[0.6rem] text-text/70">
                      ❯ {s.id}
                    </span>
                    {s.hasBundle && (
                      <span className="rounded border border-neon-pink/40 px-1.5 py-0.5 text-[0.55rem] font-bold uppercase text-neon-pink">
                        ⬡ Bundle
                      </span>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

/* ───────────── MCPs ───────────── */
function configFor(m: ArsenalMcp): string {
  if (m.remote) {
    return JSON.stringify({ [m.name]: { type: "http", url: m.cmd } }, null, 2);
  }
  const args = m.cmd.replace(/^npx\s+/, "").split(/\s+/);
  const key = m.pkg.replace(/[@/]/g, "-").replace(/^-/, "");
  return JSON.stringify({ [key]: { command: "npx", args } }, null, 2);
}

function McpsTab() {
  return (
    <div className="space-y-5">
      <div className="card flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm">
          <span className="font-black text-violet-light">{ARSENAL_MCPS.length}</span>{" "}
          <span className="text-text/80">MCP servers ready to plug into Claude Code</span>
        </p>
        <span className="font-mono text-xs text-muted">
          Copy config → paste into ~/.claude.json
        </span>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {ARSENAL_MCPS.map((m) => (
          <McpCard key={m.name} mcp={m} />
        ))}
      </div>
    </div>
  );
}

function McpCard({ mcp }: { mcp: ArsenalMcp }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(configFor(mcp));
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  };
  return (
    <article className="card accent-bar accent-purple flex flex-col p-5">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-bold text-text">⚡ {mcp.name}</h3>
        <span className="rounded-full border border-neon-pink/40 px-2 py-0.5 font-mono text-[0.55rem] text-neon-pink">
          {mcp.pkg}
        </span>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-text/75">{mcp.description}</p>
      <ul className="mt-3 space-y-1.5">
        {mcp.features.map((f, i) => (
          <li key={i} className="flex gap-2 text-xs text-text/75">
            <span className="text-violet-light">✓</span>
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4 overflow-hidden rounded-lg border border-line">
        <div className="flex items-center justify-between border-b border-line bg-white/[0.03] px-3 py-2">
          <span className="font-mono text-[0.6rem] uppercase tracking-wider text-violet-light">
            Install command
          </span>
          <button onClick={copy} className="btn-ghost px-2.5 py-1 text-[0.65rem]">
            {copied ? "✓ Copied" : "Copy config"}
          </button>
        </div>
        <pre className="overflow-x-auto bg-black/40 px-3 py-2.5">
          <code className="font-mono text-[0.7rem] text-text/85">{mcp.cmd}</code>
        </pre>
      </div>
    </article>
  );
}

/* ───────────── FRAMEWORK ───────────── */
function FrameworkTab() {
  return (
    <div className="space-y-4">
      <div className="card p-4">
        <p className="text-sm">
          <span className="font-black text-violet-light">{FRAMEWORK_STEPS.length}</span>{" "}
          <span className="text-text/80">
            steps from a blank install to a shipping-grade Claude setup
          </span>
        </p>
      </div>
      {FRAMEWORK_STEPS.map((step) => (
        <StepCard key={step.n} step={step} />
      ))}
    </div>
  );
}

function StepCard({ step }: { step: FrameworkStep }) {
  const [open, setOpen] = useState(step.n === "01");
  return (
    <article className="card overflow-hidden" style={{ borderLeftColor: step.accent, borderLeftWidth: 3 }}>
      <button
        className="flex w-full items-start gap-4 p-5 text-left"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span
          className="grid h-11 w-11 shrink-0 place-items-center rounded-xl font-display text-lg font-bold text-white"
          style={{ backgroundColor: step.accent }}
        >
          {step.n}
        </span>
        <div className="min-w-0 flex-1">
          <span
            className="rounded-full px-2 py-0.5 text-[0.55rem] font-semibold uppercase tracking-wide"
            style={{ color: step.accent, backgroundColor: `${step.accent}1a` }}
          >
            {step.kicker}
          </span>
          <h3 className="mt-1 font-display text-lg font-bold text-text">{step.title}</h3>
          <p className="mt-1 text-sm text-muted">{step.summary}</p>
        </div>
        <span className="text-muted">{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div className="space-y-5 border-t border-line px-5 pb-5 pt-4">
          {step.sections.map((sec, si) => (
            <div key={si}>
              {sec.title && (
                <h4 className="mb-2 flex items-center gap-2 text-sm font-bold text-text">
                  <span
                    className="grid h-5 w-5 place-items-center rounded font-mono text-[0.6rem] text-white"
                    style={{ backgroundColor: step.accent }}
                  >
                    {si + 1}
                  </span>
                  {sec.title}
                </h4>
              )}
              {sec.text && (
                <p className="mb-2 text-[0.82rem] leading-relaxed text-text/80">{sec.text}</p>
              )}
              {sec.bullets && (
                <ul className="mb-2 space-y-1.5 pl-7">
                  {sec.bullets.map((b, bi) => (
                    <li key={bi} className="text-[0.82rem] leading-relaxed text-text/80">
                      <span className="mr-1" style={{ color: step.accent }}>—</span>
                      {b}
                    </li>
                  ))}
                </ul>
              )}
              {sec.code?.map((c, ci) => (
                <CodeBox key={ci} label={c.label} code={c.code} accent={step.accent} />
              ))}
            </div>
          ))}
          <div className="rounded-lg border border-line bg-white/[0.03] p-3">
            <p className="font-mono text-[0.6rem] font-bold uppercase tracking-wider" style={{ color: step.accent }}>
              ✓ Outcome
            </p>
            <p className="mt-1 text-sm text-text/80">{step.outcome}</p>
          </div>
        </div>
      )}
    </article>
  );
}

function CodeBox({ label, code, accent }: { label: string; code: string; accent: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  };
  return (
    <div className="mb-2 ml-7 overflow-hidden rounded-lg border border-line">
      <div className="flex items-center justify-between border-b border-line bg-white/[0.03] px-3 py-2">
        <span className="font-mono text-[0.6rem] uppercase tracking-wider" style={{ color: accent }}>
          {label}
        </span>
        <button onClick={copy} className="btn-ghost px-2.5 py-1 text-[0.65rem]">
          {copied ? "✓ Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto bg-black/40 p-3">
        <code className="font-mono text-[0.7rem] leading-relaxed text-text/85">{code}</code>
      </pre>
    </div>
  );
}
