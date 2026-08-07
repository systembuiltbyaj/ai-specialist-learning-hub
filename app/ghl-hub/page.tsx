import type { Metadata } from "next";
import GhlHubClient from "./GhlHubClient";
import HubWhatsNew, { type WhatsNewItem } from "@/app/components/HubWhatsNew";

const GHL_NEWS: WhatsNewItem[] = [
  {
    date: "Aug 5, 2026",
    title: "WhatsApp delivery stats built into Workflows",
    blurb:
      "Workflows now track the full delivery lifecycle of every WhatsApp message they send — sent, pending, delivered, read, failed — with custom date ranges and per-message detail including recipient and timestamp. You can finally prove a WhatsApp sequence is landing instead of guessing.",
    source: "https://ideas.gohighlevel.com/changelog",
    sourceLabel: "HighLevel changelog",
  },
  {
    date: "Jul 2026",
    title: "AI Builder does targeted and bulk edits",
    blurb:
      "AI Builder takes precise edit instructions — change one action or trigger and leave the rest untouched — and handles bulk edits across many actions at once, such as updating copy, pipeline stages, or sender identity. Much safer to point at a live workflow.",
    source: "https://ghldeveloper.io/blog/gohighlevel-july-2026-updates-hidden-features-you-probably-missed",
    sourceLabel: "July 2026 roundup",
  },
  {
    date: "Jul 2026",
    title: "Rentals goes account-wide",
    blurb:
      "Rental management left limited release and joined the scheduling suite for all accounts: inventory tracking, flexible pricing models, multi-item bookings, and a dedicated rentals calendar. A new vertical you can sell into without leaving the platform.",
    source: "https://ghldeveloper.io/blog/gohighlevel-july-2026-updates-hidden-features-you-probably-missed",
    sourceLabel: "July 2026 roundup",
  },
  {
    date: "Jul 2026",
    title: "Conversation AI routing overhaul + new connectors",
    blurb:
      "The second week of July focused on automation and AI: reworked Conversation AI routing, new workflow connectors, and template packs. Worth re-testing any escalation logic you built against the old routing behaviour.",
    source: "https://ideas.gohighlevel.com/changelog",
    sourceLabel: "HighLevel changelog",
  },
  {
    date: "Jun 2026",
    title: "Workflow AI: structured output + test mode",
    blurb:
      "The Workflow AI action returns JSON with defined fields, injects contact variables into prompts at run time, and can be tested before activation — so you can route on an AI decision reliably without pushing data out to n8n or Make.",
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

      <HubWhatsNew
        items={GHL_NEWS}
        accent="#34d399"
        verified="7 Aug 2026"
        note="against the HighLevel changelog"
      />

      <GhlHubClient />
    </div>
  );
}
