import type { Metadata } from "next";
import ClaudeHubClient from "./ClaudeHubClient";
import HubWhatsNew, { type WhatsNewItem } from "@/app/components/HubWhatsNew";

const CLAUDE_NEWS: WhatsNewItem[] = [
  {
    date: "Jun 9, 2026",
    title: "Claude Fable 5 & Mythos 5 — then a US export hold",
    blurb:
      "Anthropic released new flagship models (1M-token context, always-on adaptive thinking) on June 9. On June 12 a US government export-control directive suspended access to both — confirm availability before standardizing automations on them.",
    source: "https://www.anthropic.com/news",
    sourceLabel: "Anthropic newsroom",
  },
  {
    date: "Jun 23, 2026",
    title: "Claude Tag for team collaboration",
    blurb:
      "A new offering for collaborating with Claude across a team — relevant as you move from solo Claude use toward shared client workspaces.",
    source: "https://www.anthropic.com/news",
    sourceLabel: "Anthropic newsroom",
  },
  {
    date: "2026",
    title: "Managed agents run in your own sandbox + private MCP",
    blurb:
      "Claude's managed agents can execute tools in a sandbox you control and connect to your private MCP servers (self-hosted on AWS, Cloudflare, Modal, Vercel, and more) — keeping tool execution and data on your infrastructure.",
    source: "https://www.anthropic.com/news",
    sourceLabel: "Anthropic newsroom",
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

      <HubWhatsNew items={CLAUDE_NEWS} accent="#ff8a3d" />

      <ClaudeHubClient />
    </div>
  );
}
