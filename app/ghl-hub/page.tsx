import type { Metadata } from "next";
import type { WhatsNewItem } from "@/app/lib/types";
import { RecipeCard } from "@/app/components/HubBlocks";
import { model } from "@/data/models";
import { TOKEN } from "@/app/lib/color";
import PageHeader from "@/app/components/PageHeader";
import { GHL_CONCEPTS, GHL_RECIPES, GHL_BEST_PRACTICES, GHL_LEARN } from "@/app/lib/seed/ghlhub";
import HubTabs from "@/app/components/hub/HubTabs";
import HubTimeline from "@/app/components/hub/HubTimeline";
import TopicPanel from "@/app/components/hub/TopicPanel";
import SectionHead from "@/app/components/hub/SectionHead";
import FlowSteps from "@/app/components/hub/FlowSteps";
import RefTile from "@/app/components/hub/RefTile";
import { TipGrid, LearnSteps, stripStepNumber } from "@/app/components/hub/HubLists";
import type { HubIconName } from "@/app/components/hub/HubIcon";

const VERIFIED = "26 Oct 2026";

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

// Icons for the building-block tiles; a concept added to the seed without one
// still renders, with the generic cube.
const CONCEPT_ICON: Record<string, HubIconName> = {
  "Sub-Account (Location)": "user",
  Snapshot: "layers",
  Workflow: "bolt",
  "Pipeline & Opportunity": "funnel",
  "Trigger Link": "link",
  "Custom Field & Custom Value": "database",
};
const FEATURED_CONCEPTS = 6;
const LEARN_ICONS: HubIconName[] = ["cube", "bolt", "flow", "layers", "plug"];

export default function GhlHubPage() {
  const overview = (
    <>
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)]">
        <HubTimeline
          title="What's new in GHL"
          items={GHL_NEWS}
          accent={TOKEN.green}
          verified={VERIFIED}
          note="against HighLevel's changelog and docs"
        />
        <TopicPanel
          title="Building blocks"
          icon="layers"
          link={{ href: "#concepts", label: `All ${GHL_CONCEPTS.length}` }}
          topics={GHL_CONCEPTS.slice(0, FEATURED_CONCEPTS).map((concept) => ({
            label: concept.name,
            sub: concept.pill,
            icon: CONCEPT_ICON[concept.name] ?? "cube",
            href: "#concepts",
          }))}
        />
      </div>

      <section className="space-y-4">
        <SectionHead
          icon="cap"
          title="Learning path"
          description="A path from core objects to integrations."
          link={{ href: "#learn", label: "See the full path" }}
        />
        <FlowSteps
          label="GHL learning path"
          steps={GHL_LEARN.map((step, i) => ({
            title: stripStepNumber(step.title),
            icon: LEARN_ICONS[i % LEARN_ICONS.length],
            href: "#learn",
          }))}
        />
      </section>
    </>
  );

  return (
    <div className="container-hub space-y-8 py-8">
      <PageHeader
        href="/ghl-hub"
        eyebrow="Build & learn"
        title="GHL"
        accent="Hub"
        stats={[
          { label: "Updates", value: GHL_NEWS.length, icon: "/updates" },
          { label: "Building blocks", value: GHL_CONCEPTS.length, icon: "/ghl-hub" },
          { label: "Recipes", value: GHL_RECIPES.length, icon: "/projects" },
          { label: "Learning steps", value: GHL_LEARN.length, icon: "/learn" },
        ]}
      >
        Your GoHighLevel command center — the core building blocks, ready-to-build automation recipes, best practices,
        and a path to go from operator to strategist.
      </PageHeader>

      <HubTabs
        label="GHL Hub sections"
        tabs={[
          { id: "whats-new", label: "What's New", icon: "rss", content: overview },
          {
            id: "concepts",
            label: "Concepts",
            icon: "layers",
            content: (
              <>
                <p className="text-sm text-muted">
                  The building blocks — get fluent here and automation is just moving these around.
                </p>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {GHL_CONCEPTS.map((concept) => (
                    <RefTile key={concept.name} card={concept} />
                  ))}
                </div>
              </>
            ),
          },
          {
            id: "build",
            label: "Build",
            icon: "bolt",
            content: (
              <>
                <p className="text-sm text-muted">
                  Copy-and-build automation recipes — trigger → steps → outcome. Start with Speed-to-Lead.
                </p>
                <div className="grid gap-3 md:grid-cols-2">
                  {GHL_RECIPES.map((recipe) => (
                    <RecipeCard key={recipe.title} recipe={recipe} />
                  ))}
                </div>
              </>
            ),
          },
          {
            id: "best-practices",
            label: "Best Practices",
            icon: "shield",
            content: <TipGrid tips={GHL_BEST_PRACTICES} />,
          },
          {
            id: "learn",
            label: "Learn",
            icon: "cap",
            content: (
              <>
                <p className="text-sm text-muted">A path from core objects to integrations.</p>
                <LearnSteps steps={GHL_LEARN} />
              </>
            ),
          },
        ]}
      />
    </div>
  );
}
