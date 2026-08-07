import type { Metadata } from "next";
import AutomationHubClient from "./AutomationHubClient";
import HubWhatsNew, { type WhatsNewItem } from "@/app/components/HubWhatsNew";

const AUTOMATION_NEWS: WhatsNewItem[] = [
  {
    date: "May 2026",
    title: "n8n's valuation doubles to $5.2B with SAP investment",
    blurb:
      "After a $180M Series C in October 2025 at $2.5B, n8n reportedly doubled to $5.2B alongside a strategic investment from SAP. Relevant when you're picking a platform to build a business on — this one isn't going anywhere.",
    source: "https://www.softomatesolutions.com/blog/n8n-updates-2026-whats-new/",
    sourceLabel: "n8n 2026 roundup",
  },
  {
    date: "2026",
    title: "n8n's AI Agent node is the power pick",
    blurb:
      "The rebuilt AI Agent node does tool-calling across six LLM providers, with 35+ new nodes including Anthropic Claude and Google Gemini, a Canvas UI overhaul, and production-grade error handling with configurable retries and error branching.",
    source: "https://www.softomatesolutions.com/blog/n8n-updates-2026-whats-new/",
    sourceLabel: "n8n 2026 roundup",
  },
  {
    date: "Jan 2026",
    title: "n8n 2.0 added multi-agent orchestration",
    blurb:
      "The AI Agent Tool Node enables multi-agent orchestration, with native LangChain integration across 70+ AI nodes, agent memory that persists between executions, vector-database support for RAG, and sandboxed code execution.",
    source: "https://www.softomatesolutions.com/blog/n8n-updates-2026-whats-new/",
    sourceLabel: "n8n 2026 roundup",
  },
  {
    date: "2026",
    title: "Make 'Maia' builds scenarios from plain English",
    blurb:
      "Make's Maia assistant generates a scenario from a natural-language description across 3,000+ apps. Its agent builder is still flagged beta — describe the outcome, let AI draft the flow, then refine and harden it.",
    source: "https://www.make.com/",
    sourceLabel: "Make",
  },
  {
    date: "2026",
    title: "Zapier Agents run autonomously across 8,000+ apps",
    blurb:
      "Zapier Agents execute multi-step tasks across its huge app catalog. Zapier still wins for fast 2–3 step Zaps; reach for n8n when logic gets complex, Make for visual mid-complexity.",
    source: "https://zapier.com/agents",
    sourceLabel: "Zapier Agents",
  },
  {
    date: "Landscape",
    title: "All three now speak to every major model",
    blurb:
      "Zapier, Make, and n8n each ship native connections to OpenAI, Anthropic, and Google Gemini plus purpose-built agent templates. The model is no longer the differentiator — pick on logic complexity, hosting, and price.",
    source: "https://www.digitalapplied.com/blog/zapier-vs-make-vs-n8n-2026-automation-comparison",
    sourceLabel: "2026 comparison",
  },
  {
    date: "Pattern",
    title: "Treat AI-drafted workflows as first drafts",
    blurb:
      "Across all three platforms the model can now scaffold a workflow for you — but it still needs guardrails, error handling, and idempotency before production. Use AI to start, not to ship.",
  },
];

export const metadata: Metadata = {
  title: "AI Automation Hub",
  description:
    "Learn Zapier, Make, and n8n — core concepts, AI-in-automation, build-ready recipes, and a learning path from beginner to AI-powered workflows.",
};

export default function AutomationHubPage() {
  return (
    <div className="container-hub space-y-6 py-8">
      <header>
        <p className="eyebrow">Zapier · Make · n8n</p>
        <h1 className="mt-3 font-display text-3xl font-extrabold uppercase tracking-tight text-text sm:text-5xl">
          AI Automation{" "}
          <span className="bg-gradient-to-r from-neon-blue to-violet-light bg-clip-text text-transparent">
            Hub
          </span>
        </h1>
        <p className="mt-2 max-w-2xl text-muted">
          Go from clicking your first Zap to building AI-powered, self-hosted
          workflows — platforms, core concepts, AI steps, recipes, and a learning
          path.
        </p>
      </header>

      <HubWhatsNew items={AUTOMATION_NEWS} accent="#38bdf8" verified="7 Aug 2026" />

      <AutomationHubClient />
    </div>
  );
}
