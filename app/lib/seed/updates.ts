import type { Update } from "@/app/lib/types";

// Updates focused on GHL, Claude, AI Automation, and broader AI News. Newest first.
// These are editable + autosaved per browser on the Updates page.
// Items dated/sourced from official changelogs & newsrooms (verified June 2026).
export const SEED_UPDATES: Update[] = [
  // ── Week of June 17–24, 2026 (latest pull) ──
  {
    id: "u-2026-w26-ghl-1",
    week: "Week of 2026-06-22",
    title: "GHL: SLA workflow triggers for conversations",
    category: "GHL",
    content:
      "New (June 24) workflow triggers fire when a conversation SLA is 'due soon, overdue, or manually dismissed,' plus admin permission controls. Build escalation automations that auto-route or notify a rep before a lead goes cold. Source: https://ideas.gohighlevel.com/changelog",
  },
  {
    id: "u-2026-w26-claude-1",
    week: "Week of 2026-06-08",
    title: "Claude: Fable 5 & Mythos 5 launch — then a US export hold",
    category: "Claude",
    content:
      "Anthropic released its new flagship models, Claude Fable 5 and Mythos 5, on June 9 (1M-token context, always-on adaptive thinking). On June 12 a US government export-control directive suspended access to both. Confirm availability before standardizing automations on them. Source: https://www.anthropic.com/news",
  },
  {
    id: "u-2026-w26-news-1",
    week: "Week of 2026-06-15",
    title: "AI News: the frontier model race keeps accelerating",
    category: "AI News",
    content:
      "June brought a wave of frontier releases — Anthropic's Claude Fable 5 (Jun 9), Zhipu's GLM-5.2 (Jun 16), plus coding-focused models from Moonshot (Kimi K2.7 Code) and Cohere. Capability gaps between labs keep narrowing — pick models per task, not by loyalty. Source: https://llm-stats.com/llm-updates",
  },
  {
    id: "u-2026-w26-ghl-2",
    week: "Week of 2026-06-22",
    title: "GHL: 7 new workflow templates (Asana, ClickUp, Slack, Google)",
    category: "GHL",
    content:
      "HighLevel shipped 7 prebuilt workflow templates (June 20) for Asana, ClickUp, Slack, and Google — drop-in starting points for cross-tool automations instead of building from scratch. Pairs well with the upgraded Workflow AI step (structured JSON output + test mode). Source: https://ideas.gohighlevel.com/changelog",
  },
  {
    id: "u-2026-w26-claude-2",
    week: "Week of 2026-06-22",
    title: "Claude: 'Claude Tag' for team collaboration",
    category: "Claude",
    content:
      "Anthropic introduced Claude Tag (June 23), a new offering for collaborating with Claude across a team — relevant as you move from solo Claude use toward shared client workspaces. Source: https://www.anthropic.com/news",
  },
  {
    id: "u-2026-w26-auto-1",
    week: "Week of 2026-06-22",
    title: "Automation: n8n's AI Agent node is the power pick",
    category: "AI Automation",
    content:
      "As of mid-2026, n8n's rebuilt AI Agent node does tool-calling across Claude, GPT, Gemini, and Groq with persistent memory (Redis/Postgres) and per-node retries — the strongest option for complex multi-step LLM automations. Zapier still wins for fast 2–3 step Zaps; Make sits in between visually.",
  },
  {
    id: "u-2026-w26-auto-2",
    week: "Week of 2026-06-22",
    title: "Automation: natural-language scenario building goes mainstream",
    category: "AI Automation",
    content:
      "Make's Maia assistant builds scenarios from a plain-English description and Zapier Agents run autonomous tasks across 8,000+ apps. The shared pattern: describe the outcome, let AI draft the workflow, then you refine and harden it. Treat AI-drafted flows as first drafts, not production.",
  },
  {
    id: "u-2026-w26-news-2",
    week: "Week of 2026-06-08",
    title: "AI News: export controls now shape which models you can use",
    category: "AI News",
    content:
      "On June 12 the US government issued an export-control directive suspending access to Anthropic's Fable 5 and Mythos 5 — a reminder that geopolitics now directly affects model availability. Design automations with a fallback model in mind so a single restriction can't break production. Source: https://www.anthropic.com/news",
  },
  // ── Earlier history ──
  {
    id: "u-2026-w23-1",
    week: "Week of 2026-06-02",
    title: "Claude: deeper agentic coding & MCP ecosystem",
    category: "Claude",
    content:
      "Claude Code keeps expanding agentic capabilities — better long-running tasks, richer MCP tool ecosystems, and stronger multi-file edits. Lean on MCP servers to connect Claude to your real tools (GHL, GitHub, Calendar).",
  },
  {
    id: "u-2026-w23-2",
    week: "Week of 2026-06-02",
    title: "GHL: AI-native workflow steps maturing",
    category: "GHL",
    content:
      "GoHighLevel continues deepening AI inside workflows — Conversation AI and Content AI for first-touch responses. Pair trigger links with custom fields to segment leads the moment they engage.",
  },
  {
    id: "u-2026-w23-3",
    week: "Week of 2026-06-02",
    title: "AI Automation: LLM nodes are now standard",
    category: "AI Automation",
    content:
      "n8n, Make, and Zapier all ship first-class AI/LLM steps. Practical takeaway: drop a model call directly into a workflow to classify, summarize, or route data — no external glue code needed.",
  },
  {
    id: "u-2026-w22-1",
    week: "Week of 2026-05-26",
    title: "Claude: stronger tool use & structured output",
    category: "Claude",
    content:
      "Function calling and structured output keep improving — more reliable JSON and better tool selection. For agent builders, that means fewer parsing hacks and more dependable multi-step automations.",
  },
  {
    id: "u-2026-w22-2",
    week: "Week of 2026-05-26",
    title: "GHL: snapshots make agency onboarding instant",
    category: "GHL",
    content:
      "Snapshots remain the agency superpower — build a system once (workflows, pipelines, funnels, custom values) and deploy it into a new sub-account in seconds. Standardize your snapshot to slash onboarding time.",
  },
  {
    id: "u-2026-w22-3",
    week: "Week of 2026-05-26",
    title: "AI Automation: self-hosting n8n with Docker",
    category: "AI Automation",
    content:
      "Self-hosting n8n in Docker is the cost-effective path for high-volume workflows — no per-task fees and full control. Worth the steeper learning curve once your automation volume grows.",
  },
];
