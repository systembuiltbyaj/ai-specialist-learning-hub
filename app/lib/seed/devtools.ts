import type { RefCard, RefTable, StackItem } from "@/app/lib/types";
import { model } from "@/data/models";

const OPUS = model("claude-opus-5-5");
const SONNET = model("claude-sonnet-5-5");
const ARGON = model("gemini-4-argon");
const GEMINI_FLASH = model("gemini-3-8-flash");
const MUSE_GLIMMER = model("muse-glimmer");
const LLAMA_4 = model("llama-4");
const GLM = model("glm-5-3");
const DEEPSEEK_FLASH = model("deepseek-v4-1-flash");
const DEEPSEEK_PRO = model("deepseek-v4-pro");

// ───────────────────────── 01 · AI CODE EDITORS ─────────────────────────
// Widely used editors, verified October 2026. Research trail: docs/research/2026-10/.
export const AI_EDITORS: RefCard[] = [
  {
    name: "Cursor",
    pill: "AI-native IDE",
    badge: { label: "Free tier", kind: "free" },
    accent: "pink",
    tagline: "A dedicated AI editor with its own Composer and Grok models built in.",
    desc: "Made by Anysphere, a SpaceX subsidiary since August 2026. Plans include Cursor's own Composer 2.5 and Grok models; Claude, GPT and Gemini are available on Premium ($30/mo) and up, billed at API list price. Runs agents in parallel, locally or in the cloud.",
    tags: ["Composer 2.5", "Grok models", "Parallel agents"],
    bestFor: "daily coding in a dedicated AI IDE",
  },
  {
    name: "Devin Desktop (formerly Windsurf)",
    pill: "Agent-led editor",
    badge: { label: "Free tier", kind: "free" },
    accent: "yellow",
    tagline: "The former Windsurf editor, now Cognition's Devin Desktop.",
    desc: "Cognition acquired Windsurf in July 2025 and renamed it Devin Desktop in June 2026. The Devin Local agent replaced Cascade, VS Code extensions and keybindings still work, and the same plans cover Devin's cloud agent. The free tier has a light quota.",
    tags: ["Devin Local", "by Cognition", "VS Code-compatible"],
    bestFor: "agent-led coding with a path to Devin's cloud agent",
  },
  {
    name: "Claude Code",
    pill: "Terminal agent",
    badge: { label: "Paid", kind: "paid" },
    accent: "orange",
    tagline: "Anthropic's agentic coding tool — terminal-first and extensible.",
    desc: `Anthropic's coding agent, running on ${OPUS.name} by default on paid plans and the API. It reads files, runs commands and checks its own work, and extends with skills, subagents, hooks, MCP servers and plugins. Included on every Claude plan except Free. (This hub was built with it.)`,
    tags: ["Terminal / CLI", "Subagents & hooks", "Agentic"],
    bestFor: "complex, multi-step coding tasks",
  },
  {
    name: "GitHub Copilot",
    pill: "Enterprise / teams",
    badge: { label: "Free tier", kind: "free" },
    accent: "blue",
    tagline: "AI in the IDE you already use, with SSO & audit trails.",
    desc: "GitHub's (Microsoft) assistant: completions, chat and agent mode, plus the Copilot cloud agent, CLI and app on every plan. Models come from OpenAI, Anthropic and Google. Free and Student tiers; paid plans from Pro at $10/mo, with usage metered in GitHub AI Credits since June 2026.",
    tags: ["All major IDEs", "Cloud agent", "Enterprise"],
    bestFor: "enterprise & teams",
  },
  {
    name: "Antigravity",
    pill: "Multi-agent",
    badge: { label: "Free tier", kind: "free" },
    accent: "purple",
    tagline: "Google's agent-first development platform — generally available.",
    desc: `Google's agent-first IDE, CLI and SDK. Version 2.0 added subagents and custom agents. ${GEMINI_FLASH.name} runs on every plan, and ${SONNET.name} and ${OPUS.name} on paid tiers. The individual plan is free; Google AI Pro or Ultra raise the limits.`,
    tags: ["Subagents", "Gemini + Claude", "Agent-first"],
    bestFor: "multi-agent coding",
  },
  {
    name: "Zed",
    pill: "Lightweight",
    badge: { label: "Free", kind: "free" },
    accent: "teal",
    tagline: "A performance-focused editor with AI built in.",
    desc: "A lean editor with built-in AI and agent features. The Personal plan is free; Pro is $10/mo and includes $5 of model tokens. A good pick when responsiveness matters more than a huge extension catalogue.",
    tags: ["Lightweight", "Free personal plan", "Pro $10/mo"],
    bestFor: "speed and a minimal setup",
  },
  {
    name: "VS Code + Cline",
    pill: "Free & open source",
    badge: { label: "Free", kind: "os" },
    accent: "blue",
    tagline: "Open-source AI inside the universal editor.",
    desc: "Stay in plain VS Code and add Cline, the open-source (Apache-2.0) coding agent with 5M+ installs. Free for individuals — bring your own model key and pay only for inference, with full control over your stack.",
    tags: ["Open source", "Cline", "Bring your own key"],
    bestFor: "free + quality, full control",
  },
];

export const EDITOR_COMPARISON: RefTable = {
  columns: ["Tool", "AI built-in", "Multi-file / agents", "Free tier", "Best for"],
  rows: [
    ["Cursor", "✓", "✓ Parallel agents", "~ Limited", "General coding"],
    ["Devin Desktop", "✓", "✓ Devin Local", "✓", "Agent-led coding"],
    ["Claude Code", "✓ CLI", "✓ Subagents", "✗", "Complex tasks / terminal"],
    ["GitHub Copilot", "✓ ext", "✓ Agent mode + cloud agent", "✓", "Enterprise / teams"],
    ["Antigravity", "✓", "✓ Subagents", "✓", "Multi-agent"],
    ["Zed", "✓", "~", "✓", "Speed"],
    ["VS Code + Cline", "✓ ext", "✓ (Cline)", "✓", "Free & quality"],
  ],
};

// Editorial picks shown under the editors section — guidance, not rankings.
export const EDITOR_WINNERS = [
  { label: "General coding", pick: "Cursor", note: "good default for a dedicated AI IDE" },
  { label: "Complex tasks", pick: "Claude Code", note: "good fit for terminal-first, multi-step work" },
  { label: "Beginners", pick: "GitHub Copilot", note: "free tier inside the editor you already use" },
];

// ───────────────────────── 02 · LLMs ─────────────────────────
// Current flagship and open-weight models, verified October 2026 — closed vs open-weight.
// Names and prices come from data/models.ts.
export const LLMS: RefCard[] = [
  {
    name: OPUS.name,
    pill: "Closed Source",
    badge: { label: "API", kind: "paid" },
    accent: "orange",
    tagline: "Anthropic's recommended starting model — strong coding and agentic work, 1M-token context.",
    desc: `Anthropic's docs recommend it as the starting model for most workloads. Anthropic says it performs at the level of ${model("claude-fable-5-1").name} on most work and costs about 40% less to run than ${model("claude-opus-5").name}. ${OPUS.pricingNote}. The default model in Claude Code.`,
    tags: ["Anthropic", "Claude Code default", "1M context"],
  },
  {
    name: model("gpt-6-astra").name,
    pill: "Closed Source",
    badge: { label: "API", kind: "paid" },
    accent: "pink",
    tagline: "OpenAI's flagship for complex reasoning, coding and computer use.",
    desc: `OpenAI's flagship for complex reasoning, coding, agentic work and computer use. For lower cost, ${model("gpt-6-1-sol").name} is the balanced tier and ${model("gpt-6-luna").name} the cheapest.`,
    tags: ["OpenAI", "Computer use", "Agentic"],
  },
  {
    name: ARGON.name,
    pill: "Closed Source",
    badge: { label: "API", kind: "paid" },
    accent: "blue",
    tagline: "Google's flagship reasoning model, 1M-token context.",
    desc: `Google's flagship Gemini model, generally available since 13 October 2026, with a 1M-token context and long-decode output. ${ARGON.pricingNote}. For cheap, high-volume work, ${GEMINI_FLASH.name} has a free tier.`,
    tags: ["Google", "Reasoning", "1M context"],
  },
  {
    name: MUSE_GLIMMER.name,
    pill: "Open weights",
    badge: { label: "Free", kind: "free" },
    accent: "teal",
    tagline: "Meta's current open-weight model — small enough for one GPU.",
    desc: `Meta's open weights now come from the Muse family. ${MUSE_GLIMMER.name} (Apache 2.0, August 2026) is distilled from the closed Muse Spark and runs on a single consumer GPU. ${LLAMA_4.name} (April 2025) was Meta's last Llama release — still downloadable, with a 10M-token context on Scout, but no longer updated.`,
    tags: ["Meta", "Apache 2.0", "Self-host"],
  },
  {
    name: GLM.name,
    pill: "Open weights",
    badge: { label: "Free", kind: "free" },
    accent: "purple",
    tagline: "Z.ai's coding-focused open-weight flagship.",
    desc: `Z.ai calls it "the most capable open-weights model for coding". Free to use under its own licence, not an OSI open-source one: ${GLM.pricingNote}.`,
    tags: ["Open weights", "Coding agents", "Custom licence"],
  },
  {
    name: DEEPSEEK_FLASH.name,
    pill: "Open weights",
    badge: { label: "Free", kind: "free" },
    accent: "yellow",
    tagline: "Very low API prices, MIT-licensed weights.",
    desc: `DeepSeek's fast multimodal model with a 1M-token context. ${DEEPSEEK_FLASH.pricingNote}. The flagship ${DEEPSEEK_PRO.name} (text only) is also MIT. Self-hostable for budget-conscious, high-volume use.`,
    tags: ["MIT licence", "Low cost", "Self-host"],
  },
];

// ───────────────────────── 03 · DOMAIN REGISTRARS ─────────────────────────
export const REGISTRARS: RefCard[] = [
  {
    name: "Namecheap",
    accent: "teal",
    tagline: "Dev favorite. Cheap, honest pricing, good UI.",
    desc: "Popular among developers. Transparent pricing, no dark patterns on renewal. Free WhoisGuard privacy. Solid DNS management. Great for personal projects and startups.",
    tags: ["Privacy included", "Dev-friendly", "~$10/yr .com"],
  },
  {
    name: "GoDaddy",
    accent: "pink",
    tagline: "Most recognized name. But notorious for upselling.",
    desc: "Massive company, owns millions of domains. Good for non-techies. But known for aggressive upsells, confusing UI, and charging extra for privacy. Avoid if you know what you're doing.",
    tags: ["Biggest registrar", "Upsells", "Non-dev"],
  },
  {
    name: "Cloudflare Registrar",
    accent: "yellow",
    tagline: "At-cost pricing. Best if you already use Cloudflare.",
    desc: "Cloudflare sells domains at wholesale cost — no markup. Free privacy. Best DNS in the world. But you can mainly transfer existing domains rather than register every new TLD. Ideal for serious devs.",
    tags: ["At-cost", "Best DNS", "Transfer-first"],
  },
  {
    name: "Squarespace Domains",
    accent: "blue",
    tagline: "Formerly Google Domains. Now run by Squarespace.",
    desc: "Google Domains was beloved for simplicity, then sold to Squarespace in 2023. Clean UI, fair pricing. If you were on Google Domains, you're now on Squarespace Domains.",
    tags: ["Acquired", "Simple UI", "Squarespace"],
  },
  {
    name: "Porkbun",
    accent: "purple",
    tagline: "Quirky, cheap, great for .io and .ai domains.",
    desc: "A developer darling. Fun branding, genuinely cheap prices (especially for .io, .ai, .dev). Free WHOIS privacy. Good DNS management. Great for indie hackers and side projects.",
    tags: ["Cheap .ai/.io", "Dev favorite", "Fun brand"],
  },
  {
    name: "Hover",
    accent: "orange",
    tagline: "Clean, no-upsell experience. Simple and honest.",
    desc: "A clean, no-nonsense registrar. No upsells, no confusion. Slightly pricier but great customer support. Good for people who hate the GoDaddy checkout maze.",
    tags: ["No upsells", "Clean UX", "Premium price"],
  },
];

// ───────────────────────── 04 · FULL STACK ─────────────────────────
export const STACK: StackItem[] = [
  {
    name: "Supabase",
    icon: "🟢",
    accent: "teal",
    badge: { label: "Open Source", kind: "os" },
    desc: "Open-source Firebase alternative. Gives you a Postgres database, auth, storage, real-time subscriptions, and auto-generated REST + GraphQL APIs — all in one dashboard. Hugely popular for Next.js apps. Generous free tier.",
    role: "Database + Auth + Backend + Storage",
  },
  {
    name: "Next.js",
    icon: "⚡",
    accent: "yellow",
    badge: { label: "Open Source", kind: "os" },
    desc: "The most popular React framework. Handles routing, server-side rendering, API routes, and static generation. By Vercel. Most production React apps use Next.js. Works perfectly with Supabase, Prisma, and Tailwind.",
    role: "Frontend Framework (React-based)",
  },
  {
    name: "Node.js",
    icon: "🔷",
    accent: "blue",
    badge: { label: "Open Source", kind: "os" },
    desc: "JavaScript runtime that runs on the server. Powers the backend of most JS apps. Express, Fastify, and NestJS are popular frameworks built on Node. Essential to understand — Next.js itself runs on Node.",
    role: "Backend runtime (server-side JavaScript)",
  },
  {
    name: "Vercel",
    icon: "▲",
    accent: "pink",
    badge: { label: "Freemium", kind: "paid" },
    desc: "Best place to deploy Next.js apps — made by the same team. Push to GitHub → auto-deploys in ~30 seconds. Handles edge functions, CDN, previews, custom domains. Free tier is excellent for side projects. Competes with Netlify.",
    role: "Frontend Hosting / Deployment",
  },
  {
    name: "Prisma",
    icon: "🔷",
    accent: "purple",
    badge: { label: "Open Source", kind: "os" },
    desc: "TypeScript ORM — talks to your database beautifully. Define your schema in a .prisma file, run migrations, and query your DB with type-safe code. Works with Postgres, MySQL, SQLite, MongoDB. Often paired with Supabase or PlanetScale.",
    role: "Database ORM / Query Layer",
  },
  {
    name: "Docker",
    icon: "🐳",
    accent: "teal",
    badge: { label: "Open Source", kind: "os" },
    desc: "Packages your app and all its dependencies into a container that runs identically everywhere — your laptop, AWS, or a server in Germany. Standard in professional dev. Compose lets you run Postgres + Redis + your app with one command.",
    role: "Containerization / Dev Environment",
  },
  {
    name: "Railway / Render",
    icon: "🟠",
    accent: "orange",
    badge: { label: "Free tier", kind: "free" },
    desc: "Heroku alternatives. Deploy a backend (Node, Python, Go) or a Postgres DB with zero config. Railway is slicker; Render has a generous free tier. Both auto-deploy from GitHub. Perfect for fullstack apps that need a real backend server.",
    role: "Backend Hosting (servers, databases)",
  },
  {
    name: "Tailwind CSS",
    icon: "🟡",
    accent: "yellow",
    badge: { label: "Open Source", kind: "os" },
    desc: "Utility-first CSS framework. Instead of writing CSS files, you compose classes in your JSX. Extremely fast to prototype. Used by the vast majority of modern Next.js projects.",
    role: "Styling / CSS Framework",
  },
  {
    name: "AWS / GCP / Azure",
    icon: "☁️",
    accent: "blue",
    badge: { label: "Pay-as-you-go", kind: "cloud" },
    desc: "Big cloud providers. AWS dominates with 200+ services. GCP is excellent for ML workloads. Azure dominates enterprise. Complex but infinitely scalable. Most startups start on Vercel+Supabase, then move to AWS at scale.",
    role: "Cloud Infrastructure (production at scale)",
  },
  {
    name: "tRPC",
    icon: "🟢",
    accent: "teal",
    badge: { label: "Open Source", kind: "os" },
    desc: "End-to-end typesafe API layer for TypeScript. Call your backend from the frontend as if it's a local function — no REST endpoints, no JSON serialization headaches. Pairs perfectly with Next.js + Prisma. The T3 Stack = Next + tRPC + Tailwind + Prisma.",
    role: "Type-safe API layer (TypeScript)",
  },
];
