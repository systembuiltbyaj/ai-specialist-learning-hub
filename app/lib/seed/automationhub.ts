import type { RefCard, AutomationRecipe, Tip, LearnStep } from "@/app/lib/types";

// ───────────── Platforms (when to use which) ─────────────
export const AUTO_PLATFORMS: RefCard[] = [
  {
    name: "Zapier",
    pill: "Easiest",
    badge: { label: "Start here", kind: "free" },
    accent: "orange",
    tagline: "No-code, 7000+ apps, fastest to set up.",
    desc: "Pick a trigger, pick an action, done. The biggest app library and the gentlest learning curve. Best for simple 2–3 step automations and the widest integrations.",
    tags: ["No-code", "7000+ apps", "Simple"],
    bestFor: "quick wins & the most app coverage",
  },
  {
    name: "Make (Integromat)",
    pill: "Balance",
    badge: { label: "Mid", kind: "free" },
    accent: "purple",
    tagline: "Visual scenarios — power without code.",
    desc: "A drag-and-drop canvas with routers, filters, iterators, and data mapping. More capable than Zapier, friendlier than n8n. Great price-to-power.",
    tags: ["Visual", "Routers", "1000+ apps"],
    bestFor: "multi-step flows with branching logic",
  },
  {
    name: "n8n",
    pill: "Power",
    badge: { label: "Self-host", kind: "os" },
    accent: "teal",
    tagline: "Open-source, self-hostable, code when needed.",
    desc: "The most flexible — visual nodes plus optional JavaScript. Self-host for no per-task fees and full control. Steeper curve, biggest ceiling. AI-native nodes built in.",
    tags: ["Open source", "Code steps", "No per-task fee"],
    bestFor: "complex, high-volume, or self-hosted automation",
  },
];

// ───────────── Core concepts ─────────────
export const AUTO_CONCEPTS: RefCard[] = [
  {
    name: "Trigger",
    pill: "Start",
    accent: "yellow",
    tagline: "The event that kicks off the automation.",
    desc: "'New form submission', 'new row in a sheet', 'scheduled time', 'incoming webhook'. Everything starts here.",
    tags: ["Event", "Polling", "Instant"],
  },
  {
    name: "Action",
    pill: "Do",
    accent: "blue",
    tagline: "A step the automation performs.",
    desc: "Send an email, create a CRM contact, update a row, call an API. Chain them to build the flow.",
    tags: ["Create", "Update", "Send"],
  },
  {
    name: "Webhook",
    pill: "Connect",
    accent: "pink",
    tagline: "Real-time data push between apps.",
    desc: "One app POSTs data to a URL the moment something happens — the universal glue when there's no native integration.",
    tags: ["Instant", "POST", "Universal"],
  },
  {
    name: "Filter / Router",
    pill: "Logic",
    accent: "orange",
    tagline: "Only continue (or branch) when conditions match.",
    desc: "Filters stop a run unless a condition is true; routers split the flow down different paths (VIP vs standard, US vs intl).",
    tags: ["If/then", "Branch", "Conditions"],
  },
  {
    name: "Data Mapping",
    pill: "Wiring",
    accent: "purple",
    tagline: "Pass the right fields between steps.",
    desc: "Drag an earlier step's output (name, email, amount) into a later step's input. The skill that makes automations actually work.",
    tags: ["Fields", "Variables", "Transform"],
  },
  {
    name: "Iterator / Loop",
    pill: "Bulk",
    accent: "teal",
    tagline: "Process a list one item at a time.",
    desc: "Split an array (line items, multiple contacts) and run the following steps per item. Pair with an aggregator to recombine.",
    tags: ["Arrays", "Per-item", "Aggregate"],
  },
  {
    name: "Error Handling",
    pill: "Reliability",
    accent: "blue",
    tagline: "What happens when a step fails.",
    desc: "Retries, fallback paths, and idempotency keys keep automations from duplicating or silently breaking on a hiccup.",
    tags: ["Retry", "Fallback", "Idempotent"],
  },
  {
    name: "Schedule / Cron",
    pill: "Timing",
    accent: "yellow",
    tagline: "Run on a clock, not just on events.",
    desc: "Daily digests, hourly syncs, weekly reports — time-based triggers for anything that should happen on a schedule.",
    tags: ["Daily", "Hourly", "Reports"],
  },
];

// ───────────── AI inside automation ─────────────
export const AUTO_AI: Tip[] = [
  { title: "Classify & route", detail: "Drop an LLM step (Claude / OpenAI) to read an incoming message and label it (support / sales / spam), then route with a router." },
  { title: "Summarize", detail: "Turn long emails, call transcripts, or form notes into a 2-line summary before saving to the CRM or notifying the team." },
  { title: "Extract structured data", detail: "Pull name, email, budget, and intent out of messy text into clean JSON fields your next step can use." },
  { title: "Generate content", detail: "Draft replies, social captions, or follow-ups in your brand voice, then send for review or auto-publish." },
  { title: "Enrich & decide", detail: "Have the model score a lead or pick the next best action, and branch the workflow on its answer." },
];

// ───────────── Recipes to build ─────────────
export const AUTO_RECIPES: AutomationRecipe[] = [
  {
    title: "Form → CRM + Team Notify",
    accent: "blue",
    tag: "Starter",
    trigger: "New form submission (Typeform / website / GHL)",
    steps: [
      "Create/Upsert the contact in your CRM (GHL)",
      "Add a tag based on the source",
      "Post a message to Slack / SMS the rep with the details",
    ],
    outcome: "Every lead lands in the CRM and the team knows instantly.",
  },
  {
    title: "AI Inbox Triage",
    accent: "purple",
    tag: "AI",
    trigger: "New email / message",
    steps: [
      "LLM step classifies: sales / support / spam + urgency",
      "Router branches by label",
      "Sales → create opportunity; Support → create ticket; Spam → archive",
    ],
    outcome: "Inbound gets sorted and routed without a human reading every message.",
  },
  {
    title: "Lead Enrichment → GHL",
    accent: "teal",
    trigger: "New lead webhook",
    steps: [
      "Call an enrichment API (company, role) ",
      "LLM scores fit (hot / warm / cold)",
      "Upsert to GHL with tags + score; hot leads trigger speed-to-lead",
    ],
    outcome: "Leads arrive enriched and prioritized, not raw.",
  },
  {
    title: "Content Repurposing",
    accent: "pink",
    tag: "AI",
    trigger: "New YouTube video / blog (RSS)",
    steps: [
      "Pull the transcript / text",
      "LLM generates: 1 blog summary, 3 social posts, 1 email",
      "Push drafts to a Google Doc / scheduler for review",
    ],
    outcome: "One piece of content becomes a week of posts — automatically.",
  },
  {
    title: "Daily Digest",
    accent: "yellow",
    trigger: "Schedule (every morning)",
    steps: [
      "Gather yesterday's new leads / sales / tasks from your tools",
      "LLM writes a tidy summary",
      "Send to email / Slack",
    ],
    outcome: "A clean morning briefing without opening five dashboards.",
  },
];

// ───────────── Learn path ─────────────
export const AUTO_LEARN: LearnStep[] = [
  { title: "1. Start on Zapier", detail: "Build 3 simple Zaps (form → sheet, form → CRM, scheduled message). Learn triggers, actions, and field mapping with the gentlest tool.", resource: { label: "Zapier Learn", url: "https://zapier.com/learn/" } },
  { title: "2. Graduate to Make", detail: "Rebuild one Zap as a Make scenario; add a router and a filter. Get comfortable with the visual canvas and data mapping.", resource: { label: "Make Academy", url: "https://www.make.com/en/academy" } },
  { title: "3. Go deep with n8n", detail: "Self-host n8n (Docker) and build a workflow with a webhook, a code step, and an AI node. This is your power tier.", resource: { label: "n8n Docs", url: "https://docs.n8n.io/" } },
  { title: "4. Add AI steps", detail: "Wire an LLM (Claude / OpenAI) into a workflow to classify, summarize, or generate. This is where automation gets a brain." },
  { title: "5. Ship a real project", detail: "Pick one painful manual task in your own work and automate it end-to-end. Nothing teaches faster than shipping." },
];
