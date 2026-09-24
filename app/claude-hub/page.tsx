import type { Metadata } from "next";
import ClaudeHubClient from "./ClaudeHubClient";
import HubWhatsNew, { type WhatsNewItem } from "@/app/components/HubWhatsNew";

const CLAUDE_NEWS: WhatsNewItem[] = [
  {
    date: "Sep 22, 2026",
    title: "Opus 5.5 ships — matches Fable 5.1, 40% cheaper",
    blurb:
      "Claude Opus 5.5 is now the default Opus model in Claude Code: 1M-token context, state-of-the-art coding and knowledge-work performance, and roughly 40% cheaper to run than Opus 5 on typical workloads. It matches flagship Fable 5.1 on most tasks.",
    source: "https://platform.claude.com/docs/en/about-claude/models/overview",
    sourceLabel: "Models overview",
  },
  {
    date: "Sep 1, 2026",
    title: "Fable 5.1 succeeds Fable 5",
    blurb:
      "Claude Fable 5.1 ships at the same $10 / $50 list price as Fable 5, but with cache reads cut 75% to $0.25 per million tokens — worth revisiting any automation that leans on prompt caching for cost control.",
    source: "https://platform.claude.com/docs/en/about-claude/models/overview",
    sourceLabel: "Models overview",
  },
  {
    date: "Aug 31, 2026",
    title: "Sonnet 5 introductory pricing ends",
    blurb:
      "Claude Sonnet 5 ran at $2 / $10 per million tokens through August 31; it's now at the standard $3 / $15 rate. If you're costing out a client automation on Sonnet 5, price it at the standard rate — not the promo.",
    source: "https://platform.claude.com/docs/en/about-claude/pricing",
    sourceLabel: "Claude pricing docs",
  },
  {
    date: "Reminder",
    title: "Skills + MCP connectors are your reuse layer",
    blurb:
      "Package repeatable workflows as Agent Skills and plug Claude into apps with prebuilt MCP connectors — the fastest way to make Claude Code consistent across client projects without rebuilding integrations.",
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
        accent="#ff8a3d"
        verified="24 Sep 2026"
        note="against Anthropic docs"
      />

      <ClaudeHubClient />
    </div>
  );
}
