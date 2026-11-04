import type { Metadata } from "next";
import ClaudeHubClient from "./ClaudeHubClient";
import type { WhatsNewItem } from "@/app/lib/types";
import { model } from "@/data/models";
import { TOKEN, tint } from "@/app/lib/color";
import PageHeader from "@/app/components/PageHeader";
import { ARSENAL_CATEGORIES, ARSENAL_TOTAL } from "@/app/lib/seed/arsenal-skills";
import { ARSENAL_MCPS, FRAMEWORK_STEPS } from "@/app/lib/seed/arsenal";
import type { ModelEntry } from "@/app/lib/content/types";
import HubTimeline from "@/app/components/hub/HubTimeline";
import SectionHead from "@/app/components/hub/SectionHead";
import FlowSteps from "@/app/components/hub/FlowSteps";
import CtaBanner from "@/app/components/hub/CtaBanner";
import HubIcon, { type HubIconName } from "@/app/components/hub/HubIcon";

const RELEASE_NOTES = "https://platform.claude.com/docs/en/release-notes/overview";
const PRICING = "https://platform.claude.com/docs/en/about-claude/pricing";

const OPUS = model("claude-opus-5-5");
const SONNET = model("claude-sonnet-5-5");
const HAIKU = model("claude-haiku-5-5");
const FABLE = model("claude-fable-5-1");

const CLAUDE_NEWS: WhatsNewItem[] = [
  {
    date: "Oct 22, 2026",
    title: "Agent Skills donated to the Agentic AI Foundation",
    blurb:
      "Anthropic handed the Agent Skills standard (name, GitHub org and the agentskills.io domain) to the Linux Foundation's Agentic AI Foundation, which also hosts MCP, A2A and AGENTS.md. Anthropic says more than 70 agent platforms have integrated the format.",
    source: "https://www.anthropic.com/news/donating-agent-skills-to-the-agentic-ai-foundation",
    sourceLabel: "Anthropic news",
  },
  {
    date: "Oct 21, 2026",
    title: "API version 2026-10-21 removes sampling parameters",
    blurb:
      "temperature, top_p and top_k now return a 400 error — steer output with the prompt instead. New major SDK versions (Python 2.0.0, TypeScript 1.0.0 and others) default to this API version, carry breaking changes and move from MIT to Apache 2.0. Re-test any automation that sets temperature before upgrading.",
    source: RELEASE_NOTES,
    sourceLabel: "API release notes",
  },
  {
    date: "Oct 7, 2026",
    title: `${HAIKU.name} ships`,
    blurb: `${HAIKU.name} has a 1M-token context, 128K max output and adaptive thinking. Pricing depends on prompt length: ${HAIKU.pricingNote}. The cheapest current Claude tier, suited to routing, extraction and sub-agent steps.`,
    source: PRICING,
    sourceLabel: "Claude pricing docs",
  },
  {
    date: "Sep 28, 2026",
    title: `${SONNET.name} ships`,
    blurb: `${SONNET.name} launched at ${SONNET.pricingNote}. Anthropic says it runs 30%+ faster and costs up to 30% less for most work than Sonnet 5.`,
    source: "https://www.anthropic.com/news",
    sourceLabel: "Anthropic news",
  },
  {
    date: "Sep 22, 2026",
    title: `${OPUS.name} ships — Fable-level on most work, cheaper to run`,
    blurb: `${OPUS.name} is the default model in Claude Code on paid plans and the API, and the model Anthropic's docs recommend starting with. 1M-token context at ${OPUS.pricingNote}. Anthropic says it performs at the level of ${FABLE.name} on most work and costs about 40% less to run than Opus 5 on typical workloads.`,
    source: "https://www.anthropic.com/claude-opus-5-5",
    sourceLabel: "Anthropic announcement",
  },
  {
    date: "Sep 16, 2026",
    title: "Claude Cowork merges into the Claude app",
    blurb:
      "Cowork and chat are now one Claude app, rolling out to Pro and Max first.",
    source: "https://claude.com/blog/cowork-is-now-claude",
    sourceLabel: "Claude blog",
  },
  {
    date: "Sep 1, 2026",
    title: `${FABLE.name} succeeds Fable 5`,
    blurb: `${FABLE.name} ships at the same $10 / $50 list price as Fable 5, but with cache reads cut 75% to $0.25 per million tokens — worth revisiting any automation that leans on prompt caching for cost control.`,
    source: RELEASE_NOTES,
    sourceLabel: "API release notes",
  },
  {
    date: "Aug 10, 2026",
    title: "Sonnet 5's $2 / $10 price made permanent",
    blurb: `Anthropic cancelled the planned September 1 rise to $3 / $15: $2 / $10 per million tokens is now Sonnet 5's standard price. ${SONNET.name} launched at the same price, so cost new automations on it.`,
    source: PRICING,
    sourceLabel: "Claude pricing docs",
  },
  {
    date: "Jun 12, 2026",
    title: "US export controls suspend Fable 5 and Mythos 5",
    blurb:
      "On June 12 the US government applied export controls to Anthropic's newest models, and Anthropic disabled Fable 5 and Mythos 5 for all customers because it couldn't verify nationality in real time. The controls were lifted June 30; Fable 5 was restored globally from July 1, and Mythos 5 returned to US organisations first.",
    source: "https://www.anthropic.com/news/redeploying-fable-5",
    sourceLabel: "Anthropic news",
  },
  {
    date: "Reminder",
    title: "Skills + MCP connectors are your reuse layer",
    blurb:
      "Package repeatable workflows as Agent Skills and plug Claude into apps with prebuilt MCP connectors — a dependable way to make Claude Code consistent across client projects without rebuilding integrations.",
  },
];

export const metadata: Metadata = {
  title: "Claude Code Arsenal",
  description:
    "Browse the skills library, plug in MCP servers, and follow the framework — everything to turn Claude Code into a shipping-grade setup.",
};

const VERIFIED = "26 Oct 2026";

// The current lineup, strongest first. Opus is lit as the card to start from:
// its registry summary records Anthropic's docs recommending it for most work.
const LINEUP: { entry: ModelEntry; featured?: boolean }[] = [
  { entry: FABLE },
  { entry: OPUS, featured: true },
  { entry: SONNET },
  { entry: HAIKU },
];

const TIER_LABEL: Partial<Record<ModelEntry["tier"], string>> = {
  flagship: "Flagship",
  balanced: "Balanced",
  fast: "Fast",
};
const TIER_COLOR: Partial<Record<ModelEntry["tier"], string>> = {
  flagship: TOKEN.purple,
  balanced: TOKEN.blue,
  fast: TOKEN.green,
};

function formatContext(tokens: number): string {
  return tokens >= 1_000_000 ? `${tokens / 1_000_000}M` : `${Math.round(tokens / 1000)}K`;
}

const ON_THIS_PAGE: { href: string; label: string; icon: HubIconName }[] = [
  { href: "#whats-new", label: "What's New", icon: "rss" },
  { href: "#models", label: "Models", icon: "layers" },
  { href: "#workflow", label: "Workflow", icon: "flow" },
  { href: "#skills", label: "Skills", icon: "sparkle" },
  { href: "#mcps", label: "MCPs", icon: "plug" },
  { href: "#framework", label: "Framework", icon: "list" },
];

// Keyed by step number; a step added to the seed falls back to a check.
const WORKFLOW_ICON: Record<string, HubIconName> = {
  "01": "user",
  "02": "shield",
  "03": "bolt",
  "04": "book",
  "05": "rocket",
};

export default function ClaudeHubPage() {
  return (
    <div className="container-hub space-y-10 py-8">
      <PageHeader
        href="/claude-hub"
        eyebrow={`Hub · verified ${VERIFIED}`}
        title="Claude Code"
        accent="Arsenal"
        stats={[
          { label: "Claude Code skills", value: ARSENAL_TOTAL, icon: "/claude-hub" },
          { label: "Skill categories", value: ARSENAL_CATEGORIES.length, icon: "/dictionary" },
          { label: "MCP servers", value: ARSENAL_MCPS.length, icon: "/tools" },
          { label: "Framework steps", value: FRAMEWORK_STEPS.length, icon: "/learn" },
        ]}
        actions={
          <nav aria-label="On this page" className="flex flex-wrap gap-2">
            {ON_THIS_PAGE.map((item) => (
              <a key={item.href} href={item.href} className="chip gap-1.5 hover:border-violet-soft/60">
                <HubIcon name={item.icon} className="h-3.5 w-3.5" />
                {item.label}
              </a>
            ))}
          </nav>
        }
      >
        The Anthropic agent that actually ships work. Browse the skills library, plug in MCPs, and follow the framework
        — from a blank install to a shipping-grade Claude setup.
      </PageHeader>

      <div id="whats-new" className="scroll-mt-20">
        <HubTimeline
          title="What's new in Claude"
          items={CLAUDE_NEWS}
          accent={TOKEN.orange}
          verified={VERIFIED}
          note="against Anthropic docs"
        />
      </div>

      <section className="space-y-4">
        <SectionHead
          id="models"
          icon="layers"
          title="Claude models"
          description="Anthropic's current lineup — names, prices and context windows come from the site's model registry."
          link={{ href: "/dev-tools#llms", label: "Compare with other models" }}
        />
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {LINEUP.map(({ entry, featured }) => {
            const color = TIER_COLOR[entry.tier] ?? TOKEN.violet;
            return (
              <article
                key={entry.id}
                className={`card card-hover flex h-full flex-col p-5 ${featured ? "card-active" : ""}`}
              >
                <div className="flex items-start gap-3">
                  <span className="icon-tile h-10 w-10">
                    <HubIcon name="sparkle" className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display font-bold leading-snug text-text">{entry.name}</h3>
                    {TIER_LABEL[entry.tier] && (
                      <span
                        className="mt-1 inline-block rounded-full px-2 py-0.5 text-[0.65rem] font-semibold"
                        style={{ color, backgroundColor: tint(color, 14) }}
                      >
                        {TIER_LABEL[entry.tier]}
                      </span>
                    )}
                  </div>
                </div>
                <p className="mb-4 mt-3 text-[0.82rem] leading-relaxed text-text/85">{entry.summary}</p>
                <dl className="mt-auto space-y-1 border-t border-violet-soft/15 pt-3 text-[0.72rem] text-muted [&_dt]:font-semibold [&_dt]:text-text/80">
                  {entry.contextTokens !== undefined && (
                    <div>
                      <dt className="inline">Context: </dt>
                      <dd className="inline">{formatContext(entry.contextTokens)} tokens</dd>
                    </div>
                  )}
                  <div>
                    <dt className="inline">Price: </dt>
                    <dd className="inline">{entry.pricingNote}</dd>
                  </div>
                </dl>
              </article>
            );
          })}
        </div>
      </section>

      <section className="space-y-4">
        <SectionHead
          id="workflow"
          icon="flow"
          title="The Claude workflow"
          description={`${FRAMEWORK_STEPS.length} steps from a blank install to a shipping-grade Claude setup.`}
          link={{ href: "#framework", label: "Open the framework" }}
        />
        <FlowSteps
          label="Claude Code framework"
          steps={FRAMEWORK_STEPS.map((step) => ({
            title: step.title,
            body: step.kicker,
            icon: WORKFLOW_ICON[step.n] ?? "check",
            href: "#framework",
          }))}
        />
      </section>

      <section className="space-y-4">
        <SectionHead
          icon="terminal"
          title="The arsenal"
          description="Search the skills library, copy MCP configs, and work through the framework."
        />
        <ClaudeHubClient />
      </section>

      <CtaBanner
        icon="rocket"
        title="Start building with Claude"
        body="Put the skills, MCPs and framework to work on a hands-on project, step by step."
        href="/projects"
        label="Explore projects"
      />
    </div>
  );
}
