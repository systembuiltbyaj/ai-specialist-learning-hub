import type { Metadata } from "next";
import ClaudeHubClient from "./ClaudeHubClient";
import HubWhatsNew, { type WhatsNewItem } from "@/app/components/HubWhatsNew";

const CLAUDE_NEWS: WhatsNewItem[] = [
  {
    date: "Aug 31, 2026",
    title: "Sonnet 5 introductory pricing ends",
    blurb:
      "Claude Sonnet 5 runs at $2 / $10 per million tokens until August 31, after which it moves to $3 / $15. If you're costing out a client automation on Sonnet 5, price it at the standard rate — not the promo.",
    source: "https://platform.claude.com/docs/en/about-claude/pricing",
    sourceLabel: "Claude pricing docs",
  },
  {
    date: "Jul 24, 2026",
    title: "Claude Opus 5 — the default for agentic work",
    blurb:
      "Anthropic's recommendation for complex agentic coding and enterprise workloads: 1M-token context, 128k max output, adaptive thinking on by default. This is the model to reach for when building automations that run long chains of tool calls.",
    source: "https://platform.claude.com/docs/en/about-claude/models/overview",
    sourceLabel: "Models overview",
  },
  {
    date: "Jun 9, 2026",
    title: "Fable 5 is the capability ceiling; Mythos 5 is invite-only",
    blurb:
      "Claude Fable 5 is generally available and is Anthropic's most capable widely released model — 1M context, always-on adaptive thinking, $10 / $50 per MTok. Claude Mythos 5 shares its specs but is not self-serve: it's limited to approved customers under Project Glasswing for defensive cybersecurity work.",
    source: "https://platform.claude.com/docs/en/about-claude/models/overview",
    sourceLabel: "Models overview",
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
        verified="7 Aug 2026"
        note="against Anthropic docs"
      />

      <ClaudeHubClient />
    </div>
  );
}
