import type { Metadata } from "next";
import GhlHubClient from "./GhlHubClient";
import HubWhatsNew, { type WhatsNewItem } from "@/app/components/HubWhatsNew";

// Every item below was read directly off the HighLevel changelog, not a
// third-party roundup. If you add one, open the changelog and confirm it — a
// source link is a claim that you checked it.
const GHL_NEWS: WhatsNewItem[] = [
  {
    date: "Sep 23, 2026",
    title: "GPT-6 Sol and GPT-6 Luna land in AI Agent",
    blurb:
      "Two new OpenAI models are selectable inside the AI Agent action and GPT action in workflows: Sol for complex, multi-step agent tasks spanning multiple apps, Luna for high-volume classification, summaries, tagging, and quick replies. Both run about 50% cheaper than their predecessors.",
    source: "https://ideas.gohighlevel.com/changelog",
    sourceLabel: "HighLevel changelog",
  },
  {
    date: "Sep 22, 2026",
    title: "AI Studio Live for All",
    blurb:
      "AI Studio's live builder is now broadly available with updated permission settings — worth revisiting if you previously hit an access wall building or testing AI Agents for a client sub-account.",
    source: "https://ideas.gohighlevel.com/changelog",
    sourceLabel: "HighLevel changelog",
  },
  {
    date: "Aug 7, 2026",
    title: "Fixed pricing for AI products in SaaS Mode",
    blurb:
      "You can set fixed pricing on AI products when reselling through SaaS Mode. If you're rebilling AI features to clients, this is the difference between a predictable margin and one that moves with usage.",
    source: "https://ideas.gohighlevel.com/changelog",
    sourceLabel: "HighLevel changelog",
  },
  {
    date: "Aug 6, 2026",
    title: "Company custom fields in Snapshots",
    blurb:
      "Company-level custom fields now travel with a Snapshot. One less thing to rebuild by hand every time you deploy your standard build into a new sub-account.",
    source: "https://ideas.gohighlevel.com/changelog",
    sourceLabel: "HighLevel changelog",
  },
  {
    date: "Aug 7, 2026",
    title: "TikTok Lead Ads moves to Marketplace architecture",
    blurb:
      "The TikTok Lead Ads integration migrated to the Marketplace app architecture, alongside a similar move for Slack. Worth re-checking the connection on any account running TikTok lead flows.",
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
        verified="23 Sep 2026"
        note="against the HighLevel changelog"
      />

      <GhlHubClient />
    </div>
  );
}
