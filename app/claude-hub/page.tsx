import type { Metadata } from "next";
import ClaudeHubClient from "./ClaudeHubClient";
import HubWhatsNew, { type WhatsNewItem } from "@/app/components/HubWhatsNew";
import { model } from "@/data/models";
import { TOKEN } from "@/app/lib/color";

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

export default function ClaudeHubPage() {
  return (
    <div className="container-hub space-y-6 py-8">
      <header>
        <p className="eyebrow">Claude Code</p>
        <h1 className="mt-3 font-display text-3xl font-extrabold uppercase tracking-tight text-text sm:text-5xl">
          Claude Code{" "}
          <span className="bg-gradient-to-r from-violet-light to-neon-pink bg-clip-text text-transparent">
            Arsenal
          </span>
        </h1>
        <p className="mt-2 max-w-2xl text-muted">
          The Anthropic agent that actually ships work. Browse the skills library,
          plug in MCPs, and follow the framework — from a blank install to a
          shipping-grade Claude setup.
        </p>
      </header>

      <HubWhatsNew
        items={CLAUDE_NEWS}
        accent={TOKEN.orange}
        verified="26 Oct 2026"
        note="against Anthropic docs"
      />

      <ClaudeHubClient />
    </div>
  );
}
