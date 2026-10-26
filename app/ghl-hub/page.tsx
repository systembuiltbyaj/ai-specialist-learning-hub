import type { Metadata } from "next";
import GhlHubClient from "./GhlHubClient";
import HubWhatsNew, { type WhatsNewItem } from "@/app/components/HubWhatsNew";
import { model } from "@/data/models";

// Every item below was read directly off HighLevel's own changelog, docs, or
// help center, not a third-party roundup. If you add one, open the page and
// confirm it — a source link is a claim that you checked it.
const GHL_NEWS: WhatsNewItem[] = [
  {
    date: "Oct 20, 2026",
    title: "AI pricing: Growth and Unlimited plans, Agent Studio stays pay-per-use",
    blurb:
      "HighLevel's AI pricing article lists two AI Employee plans per enabled location, Growth ($50/mo) and Unlimited ($97/mo), alongside pay-per-use. Unlimited covers Conversation AI, Voice AI, Reviews AI, and Content AI under fair use. Agent Studio is excluded from every plan and stays pay-per-use, and Managed Agents are metered per run.",
    source: "https://help.gohighlevel.com/support/solutions/articles/155000006652-ai-product-pricing",
    sourceLabel: "HighLevel help center",
  },
  {
    date: "Sep 23, 2026",
    title: `${model("gpt-6-sol").name} and ${model("gpt-6-luna").name} land in AI Agent`,
    blurb:
      "Two new OpenAI models replace the previous ones in the AI Agent action and GPT action dropdowns in workflows: Sol for complex, multi-step agent tasks spanning multiple apps, Luna for high-volume classification, summaries, tagging, and quick replies. Both cost about half what the models they replace did.",
    source: "https://ideas.gohighlevel.com/changelog/gpt-6-sol-and-gpt-6-luna-now-available-in-ai-agent-and-gpt-actions",
    sourceLabel: "HighLevel changelog",
  },
  {
    date: "Sep 22, 2026",
    title: "AI Studio Live for All",
    blurb:
      "AI Studio, HighLevel's prompt-to-app and website builder, left Labs for every location. Sub-account user and admin access is off by default (except for users who had it on in Labs), so agency owners grant it from a banner on Home. It isn't the agent builder: agents are built in Agent Studio.",
    source: "https://ideas.gohighlevel.com/changelog/ai-studio-live-for-all",
    sourceLabel: "HighLevel changelog",
  },
  {
    date: "Aug 7, 2026",
    title: "Fixed pricing for AI products in SaaS Mode",
    blurb:
      "Conversation AI and Voice AI can now be rebilled at a fixed rate, set per product and per sub-account, instead of only a usage markup. If you're rebilling AI to clients, this is the difference between a predictable margin and one that moves with usage.",
    source: "https://ideas.gohighlevel.com/changelog/set-a-fixed-price-for-your-ai-products",
    sourceLabel: "HighLevel changelog",
  },
  {
    date: "Aug 7, 2026",
    title: "TikTok Lead Ads moves to Marketplace architecture",
    blurb:
      "The TikTok Lead Ads integration is moving to the Marketplace app architecture. Existing connections keep working with no reconfiguration and migrate automatically later. Slack made the same move a day earlier, as a Labs early-access feature.",
    source: "https://ideas.gohighlevel.com/changelog/tiktok-lead-ads-migration-to-marketplace-architecture",
    sourceLabel: "HighLevel changelog",
  },
  {
    date: "Aug 6, 2026",
    title: "Company custom fields in Snapshots",
    blurb:
      "Company-level custom fields now travel with a Snapshot. One less thing to rebuild by hand every time you deploy your standard build into a new sub-account.",
    source: "https://ideas.gohighlevel.com/changelog/company-custom-fields-now-supported-in-snapshots",
    sourceLabel: "HighLevel changelog",
  },
  {
    date: "Jun 26, 2026",
    title: "API v1 is deprecated — build on v2",
    blurb:
      "HighLevel deprecated API v1 with no immediate shutoff date. New integrations should use v2: Private Integration Tokens for internal use, OAuth 2.0 for Marketplace apps.",
    source: "https://www.gohighlevel.com/post/deprecating-the-highlevel-api-v1-and-migrating-to-v2",
    sourceLabel: "HighLevel blog",
  },
  {
    date: "Landscape",
    title: "The HighLevel MCP server now signs in with OAuth",
    blurb:
      "The LeadConnector MCP server uses an OAuth consent flow with per-client endpoints for Anthropic, OpenAI, Cursor, and Muse, and fronts 550+ operations across 38 domains with four tools: list_locations, search_operations, describe_operation, and execute_operation. Agency-wide installs across sub-accounts are still rolling out.",
    source: "https://marketplace.gohighlevel.com/docs/other/mcp",
    sourceLabel: "HighLevel developer docs",
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
        verified="26 Oct 2026"
        note="against HighLevel's changelog and docs"
      />

      <GhlHubClient />
    </div>
  );
}
