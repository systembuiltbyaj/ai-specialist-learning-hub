import type { Metadata } from "next";
import GhlHubClient from "./GhlHubClient";
import HubWhatsNew, { type WhatsNewItem } from "@/app/components/HubWhatsNew";

const GHL_NEWS: WhatsNewItem[] = [
  {
    date: "May–Jun 2026",
    title: "AI Employee unifies Voice + Conversation AI + Appointment Setter",
    blurb:
      "GoHighLevel's AI Employee bundles Voice AI, Conversation AI, and the AI Appointment Setter under one interface — one place to configure the bot that answers calls, texts back leads, and books appointments. The headline AI release of 2026 so far.",
    source: "https://www.highlevel.ai/blog/gohighlevel-ai-changelog",
    sourceLabel: "GHL AI changelog",
  },
  {
    date: "Jun 2026",
    title: "Workflow AI gets structured output + test mode",
    blurb:
      "The Workflow AI action can now return JSON with defined fields, inject contact variables into prompts at run time, and be tested before activation — so you can route on an AI decision reliably without pushing data out to n8n/Make.",
    source: "https://ideas.gohighlevel.com/changelog",
    sourceLabel: "HighLevel changelog",
  },
  {
    date: "Jun 24, 2026",
    title: "SLA workflow triggers for conversations",
    blurb:
      "New triggers fire when a conversation SLA is due soon, overdue, or manually dismissed, plus admin permission controls — build escalation automations that notify a rep before a lead goes cold.",
    source: "https://ideas.gohighlevel.com/changelog",
    sourceLabel: "HighLevel changelog",
  },
  {
    date: "Jun 2026",
    title: "New integrations + 7 workflow templates",
    blurb:
      "One-click Calendly import and direct WhatsApp Business API reached general availability, plus 7 prebuilt workflow templates for Asana, ClickUp, Slack, and Google — drop-in starting points for cross-tool automations.",
    source: "https://ideas.gohighlevel.com/changelog",
    sourceLabel: "HighLevel changelog",
  },
];

export const metadata: Metadata = {
  title: "GHL Hub",
  description:
    "Learn and build with GoHighLevel — core building blocks, copy-and-build automation recipes, best practices, and a learning path.",
};

export default function GhlHubPage() {
  return (
    <div className="container-hub space-y-6 py-8">
      <header>
        <p className="eyebrow">Build & learn</p>
        <h1 className="mt-3 font-display text-3xl font-extrabold uppercase tracking-tight text-text sm:text-5xl">
          GHL{" "}
          <span className="bg-gradient-to-r from-gold to-neon-pink bg-clip-text text-transparent">
            Hub
          </span>
        </h1>
        <p className="mt-2 max-w-2xl text-muted">
          Your GoHighLevel command center — the core building blocks,
          ready-to-build automation recipes, best practices, and a path to go
          from operator to strategist.
        </p>
      </header>

      <HubWhatsNew items={GHL_NEWS} accent="#34d399" note="Verified vs GHL changelog" />

      <GhlHubClient />
    </div>
  );
}
