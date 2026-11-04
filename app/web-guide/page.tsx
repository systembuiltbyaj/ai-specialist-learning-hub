import type { Metadata } from "next";
import RefTable from "@/app/components/RefTable";
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
import { TOKEN } from "@/app/lib/color";
import PageHeader from "@/app/components/PageHeader";
import SectionHead from "@/app/components/hub/SectionHead";
import RefTile from "@/app/components/hub/RefTile";
import FlowSteps from "@/app/components/hub/FlowSteps";
import CodePanel from "@/app/components/hub/CodePanel";
import HubIcon, { type HubIconName } from "@/app/components/hub/HubIcon";

export const metadata: Metadata = {
  title: "Web Dev & AI Guide",
  description:
    "From zero — HTML, CSS, JS — to CSS/JS frameworks, the Claude stack, and a grouped reference of every tool in the ecosystem.",
};

// One entry per chapter: the chip nav and the "pick a topic" grid both read it.
const SECTIONS: { id: string; label: string; blurb: string; icon: HubIconName }[] = [
  { id: "map", label: "Stack Map", blurb: "Every piece of the stack in plain language, with an everyday analogy.", icon: "book" },
  { id: "basics", label: "Web Basics", blurb: "HTML, CSS and JavaScript — the three foundations of every website.", icon: "code" },
  { id: "more", label: "When You Need More", blurb: "Match what you're building to the smallest stack that does the job.", icon: "scale" },
  { id: "css", label: "CSS Frameworks", blurb: "Pre-made styles to move faster. None are required.", icon: "layout" },
  { id: "js", label: "JS Frameworks", blurb: "Keep apps with many pages, components and shared state organized.", icon: "cube" },
  { id: "claude", label: "Claude Stack", blurb: "How to put Claude inside your own app.", icon: "sparkle" },
  { id: "tools", label: "All Tools", blurb: "The whole ecosystem, grouped by what each tool is for.", icon: "list" },
];

const TOOL_COUNT = TOOL_GROUPS.reduce((sum, group) => sum + group.tools.length, 0);
const TERM_COUNT = STACK_MAP.reduce((sum, group) => sum + group.items.length, 0);

export default function WebGuidePage() {
  return (
    <div className="container-hub space-y-12 py-8">
      <PageHeader
        href="/web-guide"
        eyebrow="Reference"
        title="Web Dev &"
        accent="AI Tools Guide"
        stats={[
          { label: "Plain-English terms", value: TERM_COUNT, icon: "/dictionary" },
          { label: "Frameworks compared", value: CSS_FRAMEWORKS.length + JS_FRAMEWORKS.length, icon: "/web-guide" },
          { label: "Tool groups", value: TOOL_GROUPS.length, icon: "/tools" },
          { label: "Tools listed", value: TOOL_COUNT, icon: "/dev-tools" },
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
        From zero — HTML, CSS, JS — to frameworks, the Claude/Anthropic stack, and a grouped reference of every tool
        worth knowing.
      </PageHeader>

      {/* Pick a topic */}
      <section className="space-y-4" aria-labelledby="pick-topic">
        <div className="card flex items-center gap-4 p-5">
          <span className="icon-tile h-12 w-12">
            <HubIcon name="target" className="h-6 w-6" />
          </span>
          <div className="min-w-0">
            <h2 id="pick-topic" className="font-display text-lg font-extrabold tracking-[-0.02em] text-text sm:text-xl">
              Pick a topic to start
            </h2>
            <p className="mt-0.5 text-sm text-muted">
              {SECTIONS.length} chapters, from your first HTML file to Claude in your own app.
            </p>
          </div>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="card card-hover group flex h-full items-start gap-3.5 p-4">
                <span className="icon-tile-muted h-11 w-11">
                  <HubIcon name={s.icon} className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-bold text-text">{s.label}</span>
                  <span className="mt-0.5 block text-xs leading-relaxed text-muted">{s.blurb}</span>
                </span>
                <span aria-hidden className="self-end text-text/60 transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* Plain-English Stack Map */}
      <section className="space-y-5">
        <SectionHead
          id="map"
          icon="book"
          title="Plain-English stack map"
          description="The entire modern web stack in plain language — what each piece does, an everyday analogy, and a one-line way to remember it. This covers ~80–90% of what you'll meet building apps like this hub."
        />
        <div className="grid gap-3 md:grid-cols-2">
          {STACK_MAP.map((group) => (
            <article key={group.label} className="card p-5" style={{ borderTopColor: group.tint, borderTopWidth: 2 }}>
              <h3 className="mb-3 flex items-center gap-2.5 font-display text-sm font-bold uppercase tracking-wide text-text">
                <span aria-hidden className="icon-tile-muted h-9 w-9 text-lg">
                  {group.icon}
                </span>
                {group.label}
              </h3>
              <ul className="space-y-3">
                {group.items.map((it) => (
                  <li key={it.name} className="border-t border-violet-soft/15 pt-3 first:border-0 first:pt-0">
                    <div className="flex items-center gap-2">
                      <span aria-hidden>{it.icon}</span>
                      <span className="font-bold text-text">{it.name}</span>
                    </div>
                    <p className="mt-1 text-[0.8rem] leading-relaxed text-text/80">{it.meaning}</p>
                    <p className="mt-0.5 text-[0.75rem] italic text-muted">🟰 Like: {it.like}</p>
                    {it.remember && (
                      <p className="mt-1.5 inline-block rounded-md border border-violet-soft/20 bg-violet/[0.07] px-2 py-0.5 font-mono text-[0.62rem] text-text/80">
                        💡 {it.remember}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <SectionHead as="h3" icon="rocket" title="The modern website flow" />
        <FlowSteps
          label="The modern website flow"
          steps={STACK_FLOW.map((step) => ({ title: step.name, body: step.note, emoji: step.icon }))}
        />

        <OneLiner label="One sentence to remember" icon="star">
          <p className="text-[0.9rem] font-medium leading-relaxed text-text/90">{STACK_ONE_SENTENCE}</p>
        </OneLiner>
      </section>

      {/* Web Basics */}
      <section className="space-y-5">
        <SectionHead
          id="basics"
          icon="code"
          title="The web basics — HTML, CSS, JavaScript"
          description="The three foundations of every website — even the most complex apps still use HTML + CSS + JS under the hood. You don't need a framework to start."
        />
        <div className="grid gap-3 sm:grid-cols-3">
          {WEB_BASICS.map((card) => (
            <RefTile key={card.name} card={card} />
          ))}
        </div>
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]">
          <OneLiner label="Analogy" icon="sparkle">
            <p className="text-[0.85rem] leading-relaxed text-text/85">{ANALOGY}</p>
          </OneLiner>
          <CodePanel filename="landing-page.html" code={CODE_SAMPLE} />
        </div>
      </section>

      {/* When you need more */}
      <section className="space-y-5">
        <SectionHead
          id="more"
          icon="scale"
          title="When do you actually need more?"
          description="Match what you're building to the smallest stack that does the job."
        />
        <RefTable table={NEED_MORE} />
      </section>

      {/* CSS Frameworks */}
      <section className="space-y-5">
        <SectionHead
          id="css"
          icon="layout"
          title="CSS frameworks — so you don't write CSS from scratch"
          description="Pre-made styles to move faster. None are required — they're just convenient."
        />
        <div className="grid gap-3 sm:grid-cols-2">
          {CSS_FRAMEWORKS.map((card) => (
            <RefTile key={card.name} card={card} />
          ))}
        </div>
      </section>

      {/* JS Frameworks */}
      <section className="space-y-5">
        <SectionHead
          id="js"
          icon="cube"
          title="JavaScript frameworks — for complex apps"
          description="When an app grows — many pages, components, shared state — plain JS gets messy. Frameworks keep it organized and scalable."
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {JS_FRAMEWORKS.map((card) => (
            <RefTile key={card.name} card={card} />
          ))}
        </div>
      </section>

      {/* Claude stack */}
      <section className="space-y-5">
        <SectionHead
          id="claude"
          icon="sparkle"
          title="The Claude / Anthropic stack"
          description="How to put Claude inside your own app — the most relevant AI stack for building an AI-powered site or tool."
          link={{ href: "/claude-hub", label: "Claude Hub" }}
        />

        <div className="card card-active p-5">
          <p className="flex items-center gap-2 font-display text-sm font-bold text-violet-light">
            <HubIcon name="terminal" className="h-4 w-4" />
            Minimum stack to build an app with Claude inside
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {MIN_AI_STACK.map((s) => (
              <span key={s.name} className="chip">
                <span className="font-semibold text-text">{s.name}</span>
                <span className="ml-1.5 font-mono text-[0.6rem] uppercase tracking-wide text-muted">{s.role}</span>
              </span>
            ))}
          </div>
        </div>

        <ol className="grid gap-3 md:grid-cols-2">
          {CLAUDE_FLOW.map((step) => (
            <li key={step.n} className="card flex items-start gap-4 p-4">
              <span className="icon-tile h-9 w-9 rounded-full font-mono text-xs font-bold">{step.n}</span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
                  <h3 className="font-bold text-text">{step.title}</h3>
                  <span className="break-all font-mono text-[0.62rem] text-muted">{step.badge}</span>
                </div>
                <p className="mt-1 text-[0.8rem] leading-relaxed text-muted">{step.desc}</p>
              </div>
            </li>
          ))}
        </ol>

        <CodePanel filename="claude-call.ts" code={CODE_CLAUDE} />
      </section>

      {/* All tools reference */}
      <section className="space-y-5">
        <SectionHead
          id="tools"
          icon="list"
          title="All tools — quick reference"
          description="The whole ecosystem, grouped by what each tool is for — pick one per row as you build."
          link={{ href: "/dev-tools", label: "Dev Tools Universe" }}
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {TOOL_GROUPS.map((g) => (
            <article key={g.label} className="card card-hover p-5">
              <h3 className="mb-3 flex items-center gap-2.5 font-display text-sm font-bold text-text">
                <span aria-hidden className="icon-tile-muted h-9 w-9 text-lg">
                  {g.icon}
                </span>
                {g.label}
              </h3>
              <ul className="space-y-1.5">
                {g.tools.map((t) => (
                  <li key={t.name} className="text-[0.8rem] leading-snug">
                    <span className="font-semibold text-text">{t.name}</span>
                    <span className="text-muted"> — {t.note}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <p className="text-center font-mono text-[0.65rem] tracking-wide text-muted">
        Complete developer reference · HTML → AI stacks · grouped for clarity
      </p>
    </div>
  );
}

function OneLiner({ label, icon, children }: { label: string; icon: HubIconName; children: React.ReactNode }) {
  return (
    <div className="card flex flex-col gap-2 p-5" style={{ borderLeftColor: TOKEN.amber, borderLeftWidth: 3 }}>
      <p className="flex items-center gap-2 font-mono text-[0.62rem] font-bold uppercase tracking-[0.2em] text-gold">
        <HubIcon name={icon} className="h-3.5 w-3.5" />
        {label}
      </p>
      {children}
    </div>
  );
}
