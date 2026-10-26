import type { Metadata } from "next";
import AutomationHubClient from "./AutomationHubClient";
import HubWhatsNew, { type WhatsNewItem } from "@/app/components/HubWhatsNew";
import { TOKEN } from "@/app/lib/color";

const AUTOMATION_NEWS: WhatsNewItem[] = [
  {
    date: "Oct 20, 2026",
    title: "Maia by Make gets Plan mode and memory",
    blurb:
      "Maia, Make's assistant that builds scenarios from plain English, launched for all Make users on Aug 12. The Oct 20 upgrade adds Plan mode, memory, image attachments, and help resolving errors. Maia runs on credits, Make's billing unit since August 2025, and Make AI Agents are available on all paid plans.",
    source: "https://www.make.com/blog/plan-and-build-better-workflows-with-maia-by-make-upgraded",
    sourceLabel: "Make blog",
  },
  {
    date: "Oct 6, 2026",
    title: "Zapier Agents is now AI by Zapier",
    blurb:
      "Agents now live as an AI step inside a Zap and bill in tasks, the same unit as every other step; a run pauses for a human at 75 tasks. Existing agents show a migration banner. Zapier still wins for fast 2–3 step Zaps; reach for n8n when logic gets complex, Make for visual mid-complexity.",
    source: "https://zapier.com/blog/zapier-agents-is-now-ai-by-zapier/",
    sourceLabel: "Zapier blog",
  },
  {
    date: "Sep 23, 2026",
    title: "Zapier opens early access to Next Gen Zaps",
    blurb:
      "Announced at ZapConnect: Zaps you can build from Claude, ChatGPT, or Cursor over MCP, or in Zapier's canvas, with self-healing runs, no 500-item loop cap, and human-in-the-loop pauses. Free to build and run on paid plans during early access, then task-based. Zapier MCP itself is on every plan, at 2 tasks per tool call.",
    source: "https://community.zapier.com/product-updates/the-next-generation-of-zaps-is-here-53832",
    sourceLabel: "Zapier community",
  },
  {
    date: "Aug 3, 2026",
    title: "OWASP LLM Top 10 2026: Excessive Agency moves to #3",
    blurb:
      "The 2026 edition ranks Excessive Agency (giving an LLM app more permissions, tools, or autonomy than its task needs) third; OWASP later announced it alongside a new Agent Control Standard for runtime agent controls. Every agent you drop into a workflow carries this risk: scope its tools to the job and gate high-impact actions behind a human.",
    source: "https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/",
    sourceLabel: "OWASP GenAI Security Project",
  },
  {
    date: "Jul 28, 2026",
    title: "MCP spec 2026-07-28 goes stateless",
    blurb:
      "The new revision drops the initialize handshake and session header, adds server/discover and Multi Round-Trip Requests, moves Tasks to an extension, and deprecates Roots, Sampling, and Logging (12-month minimum window). The old HTTP+SSE transport is formally deprecated; use Streamable HTTP.",
    source: "https://modelcontextprotocol.io/specification/2026-07-28/changelog",
    sourceLabel: "MCP spec changelog",
  },
  {
    date: "May 2026",
    title: "n8n valued at $5.2B with SAP investment",
    blurb:
      "SAP's strategic investment values n8n at $5.2B, more than double the $2.5B of its $180M Series C in October 2025, and n8n will be embedded in SAP Joule Studio. Relevant when you're picking a platform to build a business on.",
    source: "https://blog.n8n.io/n8n-sap/",
    sourceLabel: "n8n blog",
  },
  {
    date: "Dec 9, 2025",
    title: "MCP moves to the Agentic AI Foundation",
    blurb:
      "The Linux Foundation formed the Agentic AI Foundation (AAIF) with MCP (Anthropic), goose (Block), and AGENTS.md (OpenAI) as founding projects, backed by Google, Microsoft, AWS, Cloudflare, and Bloomberg. A vendor-neutral MCP is why n8n ships MCP Client and Server nodes and Zapier exposes its 9,000+ apps through Zapier MCP.",
    source: "https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation",
    sourceLabel: "Linux Foundation",
  },
  {
    date: "Landscape",
    title: "n8n's AI Agent node: one agent type, native MCP",
    blurb:
      "Since n8n 1.82 the agent-type setting is deprecated and every AI Agent works as a Tools Agent; there is no separate ReAct mode. Attach a memory sub-node (Simple, Redis, Postgres, MongoDB, Motorhead, Xata, or Zep), call external tools with the MCP Client Tool, or expose a workflow to AI clients with the MCP Server Trigger.",
    source: "https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/",
    sourceLabel: "n8n docs",
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

      <HubWhatsNew items={AUTOMATION_NEWS} accent={TOKEN.blue} verified="26 Oct 2026" />

      <AutomationHubClient />
    </div>
  );
}
