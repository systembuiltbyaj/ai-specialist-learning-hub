import type { Metadata } from "next";
import RefTable from "@/app/components/RefTable";
import {
  AI_EDITORS,
  EDITOR_COMPARISON,
  EDITOR_WINNERS,
  LLMS,
  REGISTRARS,
  STACK,
} from "@/app/lib/seed/devtools";
import { T3_STACK, STACK_FLOW, STACK_ONE_SENTENCE } from "@/app/lib/seed/webguide";
import type { StackItem } from "@/app/lib/types";
import { TOKEN, tint } from "@/app/lib/color";
import PageHeader from "@/app/components/PageHeader";
import SectionHead from "@/app/components/hub/SectionHead";
import RefTile, { accentColor } from "@/app/components/hub/RefTile";
import FlowSteps from "@/app/components/hub/FlowSteps";
import CtaBanner from "@/app/components/hub/CtaBanner";
import HubIcon, { type HubIconName } from "@/app/components/hub/HubIcon";

export const metadata: Metadata = {
  title: "Dev Tools Universe",
  description:
    "AI code editors, language models, domain registrars, and the full modern web stack — compared.",
};

const VERIFIED = "26 Oct 2026";

// In-page section links (shown as quick anchors below the hero).
const SECTIONS: { id: string; label: string; icon: HubIconName }[] = [
  { id: "editors", label: "AI Code Editors", icon: "code" },
  { id: "llms", label: "Language Models", icon: "cube" },
  { id: "domains", label: "Domain Registrars", icon: "globe" },
  { id: "stack", label: "Full Stack", icon: "layers" },
  { id: "flow", label: "The Flow", icon: "flow" },
];

export default function DevToolsPage() {
  return (
    <div className="container-hub space-y-12 py-8">
      <PageHeader
        href="/dev-tools"
        eyebrow={`Reference · verified ${VERIFIED}`}
        title="Dev Tools"
        accent="Universe"
        stats={[
          { label: "AI code editors", value: AI_EDITORS.length, icon: "/dev-tools" },
          { label: "Language models", value: LLMS.length, icon: "/tools" },
          { label: "Domain registrars", value: REGISTRARS.length, icon: "/web-guide" },
          { label: "Stack tools", value: STACK.length, icon: "/projects" },
        ]}
        actions={
          <nav aria-label="On this page" className="flex flex-wrap gap-2">
            {SECTIONS.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="chip gap-1.5 hover:border-violet-soft/60">
                <HubIcon name={s.icon} className="h-3.5 w-3.5" />
                {s.label}
              </a>
            ))}
          </nav>
        }
      >
        AI editors, LLMs, domains, hosting and full-stack comparisons — the tools that build the modern web, and where
        each one fits.
      </PageHeader>

      {/* AI Code Editors */}
      <section className="space-y-5">
        <SectionHead
          id="editors"
          icon="code"
          title="AI code editors"
          description="The main AI editors and coding agents as of October 2026. A common setup pairs a full AI editor for daily work with a terminal agent such as Claude Code or Codex for larger, multi-step tasks."
          link={{ href: "#editor-comparison", label: "View comparison" }}
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {AI_EDITORS.map((card) => (
            <RefTile key={card.name} card={card} />
          ))}
        </div>

        <details id="editor-comparison" className="card group/cmp scroll-mt-20">
          <summary className="flex cursor-pointer list-none flex-wrap items-center gap-4 rounded-[1.25rem] p-5 [&::-webkit-details-marker]:hidden">
            <span className="icon-tile h-12 w-12">
              <HubIcon name="scale" className="h-6 w-6" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-display text-lg font-bold text-text">Quick comparison</span>
              <span className="block text-sm text-muted">A side-by-side look at the editors above.</span>
            </span>
            <span className="btn-violet px-4 py-2">
              <span className="group-open/cmp:hidden">View comparison</span>
              <span className="hidden group-open/cmp:inline">Hide comparison</span>
              <HubIcon name="chevron" className="h-4 w-4 rotate-90 transition-transform group-open/cmp:-rotate-90" />
            </span>
          </summary>
          <div className="border-t border-violet-soft/15 p-4 sm:p-5">
            <RefTable table={EDITOR_COMPARISON} />
          </div>
        </details>

        <div className="card p-5">
          <p className="flex items-center gap-2 font-display text-sm font-bold text-gold">
            <HubIcon name="star" className="h-4 w-4" />
            The verdict (2026)
          </p>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {EDITOR_WINNERS.map((w) => (
              <div key={w.label} className="rounded-xl border border-violet-soft/20 bg-violet/[0.07] p-3.5">
                <p className="font-mono text-[0.6rem] uppercase tracking-wider text-muted">{w.label}</p>
                <p className="mt-1 font-bold text-text">{w.pick}</p>
                <p className="text-xs text-muted">{w.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LLMs */}
      <section className="space-y-5">
        <SectionHead
          id="llms"
          icon="cube"
          title="AI language models (LLMs)"
          description="The main models as of October 2026 — closed models (API only) vs open-weight models (download the weights and run them yourself)."
          link={{ href: "/claude-hub#models", label: "Claude lineup" }}
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {LLMS.map((card) => (
            <RefTile key={card.name} card={card} />
          ))}
        </div>
      </section>

      {/* Domain Registrars */}
      <section className="space-y-5">
        <SectionHead
          id="domains"
          icon="globe"
          title="Domain registrars"
          description="Where you buy and manage domain names (e.g. mysite.com). The domain is separate from hosting."
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {REGISTRARS.map((card) => (
            <RefTile key={card.name} card={card} />
          ))}
        </div>
      </section>

      {/* Full Stack */}
      <section className="space-y-5">
        <SectionHead
          id="stack"
          icon="layers"
          title="Full stack: database · backend · hosting"
          description="How modern web apps are built — from database to framework to deployment."
        />
        <div className="grid gap-3 sm:grid-cols-2">
          {STACK.map((item) => (
            <StackTile key={item.name} item={item} />
          ))}
        </div>

        <div className="card card-active p-5">
          <p className="flex items-center gap-2 font-display text-sm font-bold text-violet-light">
            <HubIcon name="bolt" className="h-4 w-4" />
            The “T3 Stack” — most popular modern setup
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {T3_STACK.map((s) => (
              <span key={s.name} className="chip">
                <span className="font-semibold text-text">{s.name}</span>
                <span className="ml-1.5 font-mono text-[0.6rem] uppercase tracking-wide text-muted">{s.role}</span>
              </span>
            ))}
          </div>
          <p className="mt-3 text-[0.8rem] leading-relaxed text-muted">
            Full production SaaS app, all TypeScript, no separate backend server needed.
          </p>
        </div>
      </section>

      {/* The Flow, Start to Finish */}
      <section className="space-y-5">
        <SectionHead
          id="flow"
          icon="flow"
          title="The flow, start to finish"
          description="How all these tools connect into one request — from a user's click to a global cloud. The plain-English version of the whole stack."
        />
        <FlowSteps
          label="How a request flows through the stack"
          steps={STACK_FLOW.map((step) => ({ title: step.name, body: step.note, emoji: step.icon }))}
        />
        <div className="card flex flex-col gap-3 p-5" style={{ borderLeftColor: TOKEN.amber, borderLeftWidth: 3 }}>
          <p className="flex items-center gap-2 font-mono text-[0.62rem] font-bold uppercase tracking-[0.2em] text-gold">
            <HubIcon name="star" className="h-3.5 w-3.5" />
            One sentence to remember
          </p>
          <p className="text-[0.9rem] font-medium leading-relaxed text-text/90">{STACK_ONE_SENTENCE}</p>
          <p className="text-[0.75rem] text-muted">
            New to these terms? The{" "}
            <a href="/web-guide#map" className="rounded-sm text-violet-light hover:underline">
              Web Dev Guide → Stack Map
            </a>{" "}
            breaks each one down with analogies.
          </p>
        </div>
      </section>

      <CtaBanner
        icon="layers"
        title="Explore the complete stack"
        body="The Web Dev Guide walks the whole stack in plain English — from HTML to putting Claude inside your own app."
        href="/web-guide"
        label="Open the full guide"
      />

      <p className="text-center font-mono text-[0.65rem] tracking-wide text-muted">
        Verified {VERIFIED} · comparisons are approximate · pricing changes frequently
      </p>
    </div>
  );
}

function StackTile({ item }: { item: StackItem }) {
  const color = accentColor(item.accent);
  return (
    <article className="card card-hover flex items-start gap-4 p-4">
      <span
        aria-hidden
        className="icon-tile-muted h-11 w-11 text-lg"
        style={{ borderColor: tint(color, 35), backgroundColor: tint(color, 12) }}
      >
        {item.icon}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-display text-sm font-bold text-text">{item.name}</h3>
          {item.badge && <span className={`badge badge-${item.badge.kind} ml-0`}>{item.badge.label}</span>}
        </div>
        <p className="mt-1 text-[0.8rem] leading-relaxed text-muted">{item.desc}</p>
        <p className="mt-2 flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-wider text-muted">
          <span className="inline-block h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: color }} />
          Role → {item.role}
        </p>
      </div>
    </article>
  );
}
