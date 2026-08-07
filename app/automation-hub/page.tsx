import type { Metadata } from "next";
import AutomationHubClient from "./AutomationHubClient";
import HubWhatsNew, { type WhatsNewItem } from "@/app/components/HubWhatsNew";

const AUTOMATION_NEWS: WhatsNewItem[] = [
  {
    date: "2026",
    title: "n8n's AI Agent node is the power pick",
    blurb:
      "The rebuilt AI Agent node does tool-calling across Claude, GPT, Gemini, and Groq with persistent memory (Redis/Postgres), a new Canvas UI, and per-node retries — the strongest option for complex, multi-step LLM automations.",
    source: "https://n8n.io/",
    sourceLabel: "n8n",
  },
  {
    date: "2026",
    title: "Make 'Maia' builds scenarios from plain English",
    blurb:
      "Make's Maia assistant generates an automation scenario from a natural-language description, and Make AI Agents run autonomous tasks. Describe the outcome, let AI draft the flow, then refine and harden it.",
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

      <HubWhatsNew items={AUTOMATION_NEWS} accent="#38bdf8" />

      <AutomationHubClient />
    </div>
  );
}
