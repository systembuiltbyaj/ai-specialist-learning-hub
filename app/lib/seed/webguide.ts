import type { RefCard } from "@/app/lib/types";

// ───────────── Chapter 01 · The Web Basics ─────────────
export const WEB_BASICS: RefCard[] = [
  {
    name: "HTML",
    pill: "Structure",
    accent: "pink",
    tagline: "HyperText Markup Language",
    desc: "The skeleton of a webpage. It defines what content exists — headings, paragraphs, buttons, images, links. It doesn't style or animate anything, just labels the content.",
    tags: ["<h1> headings", "<p> text", "<div> boxes", "<img>", "<a> links"],
  },
  {
    name: "CSS",
    pill: "Style",
    accent: "blue",
    tagline: "Cascading Style Sheets",
    desc: "The skin and clothing — colors, fonts, spacing, layout, animations. Without CSS everything is plain black text on white. CSS is what makes things look designed.",
    tags: ["colors", "fonts", "flex / grid", "animations", "responsive"],
  },
  {
    name: "JavaScript",
    pill: "Behavior",
    accent: "yellow",
    tagline: "The programming language of the browser",
    desc: "The muscles — moving content, sending data, opening modals, loading content without a page refresh. Every interactive behavior on the web is powered by JS.",
    tags: ["click events", "fetch / API", "DOM", "logic"],
  },
];

export const ANALOGY =
  "HTML = the bones of a person · CSS = the skin and clothes · JavaScript = the muscles and brain. For a simple landing page, HTML + CSS is all you need. Add JS only when you want a button or element to actually do something.";

export const CODE_SAMPLE = `<!-- Simplest possible landing page — zero frameworks needed -->
<html>
  <head>
    <style>
      body   { font-family: sans-serif; background: #0a0a0f; color: white; }
      h1     { font-size: 3rem; color: #f6cb1f; }
      button { padding: 12px 28px; background: #f6cb1f; }
    </style>
  </head>
  <body>
    <h1>My Landing Page</h1>
    <p>Zero frameworks. Pure HTML + CSS.</p>
    <button onclick="alert('It works!')">Click me</button>
  </body>
</html>

<!-- ^ This is a complete website. Open in any browser. Done. -->`;

// ───────────── Chapter 02 · When Do You Need More? ─────────────
export const NEED_MORE = {
  columns: ["What you're building", "Minimum needed", "Framework?", "Database?"],
  rows: [
    ["Landing page / portfolio", "HTML + CSS", "✗ No", "✗ No"],
    ["Blog / content site", "HTML + CSS + JS", "~ Optional", "✗ No"],
    ["Contact form", "HTML + JS + Formspree", "✗ No", "✗ No"],
    ["E-commerce store", "Shopify or Next.js", "✓ Yes", "✓ Yes"],
    ["SaaS app with login", "Next.js + Supabase", "✓ Yes", "✓ Yes"],
    ["Real-time chat / dashboard", "Next.js + Supabase + Node", "✓ Yes", "✓ Yes"],
    ["AI-powered app", "Next.js + Anthropic API", "✓ Yes", "~ Depends"],
  ],
};

// ───────────── Chapter 03 · CSS Frameworks ─────────────
export const CSS_FRAMEWORKS: RefCard[] = [
  {
    name: "Tailwind CSS",
    pill: "Most popular",
    accent: "blue",
    tagline: "Utility classes — no CSS file needed",
    desc: 'You don\'t write a CSS file. You compose classes directly in your markup: className="flex bg-black text-white p-4 rounded". Very fast to prototype; the trade-off is busy-looking markup.',
    tags: ["utility-first", "no CSS file", "React-friendly"],
  },
  {
    name: "Bootstrap",
    pill: "Classic",
    accent: "purple",
    tagline: "Pre-built components — buttons, nav, grid",
    desc: "Older but still widely used. Ready-made components (navbars, modals, cards). Easy for beginners, but Bootstrap sites tend to look alike. Works in plain HTML — no React needed.",
    tags: ["components", "beginner-friendly", "plain HTML ok"],
  },
  {
    name: "Plain CSS / Variables",
    accent: "pink",
    tagline: "Write it yourself — full control",
    desc: "Zero dependencies. Slower to start but smaller files, more unique design, nothing extra to learn. The right choice for simple sites — this hub's base styles work this way.",
    tags: ["zero dependency", "full control", "smallest file size"],
  },
  {
    name: "shadcn/ui",
    pill: "Trending",
    accent: "teal",
    tagline: "Copy-paste components built on Tailwind",
    desc: "Not an installed library — you copy-paste the component code into your project. Built on Tailwind + Radix. Extremely clean design. Used by most modern Next.js + React projects.",
    tags: ["copy-paste", "React only", "Tailwind-based"],
  },
];

// ───────────── Chapter 04 · JS Frameworks ─────────────
export const JS_FRAMEWORKS: RefCard[] = [
  {
    name: "React",
    pill: "Most used",
    accent: "blue",
    tagline: "by Meta — component-based UI library",
    desc: "Component-based UI library. Not a full framework — you add routing and data fetching yourself. The base of Next.js. Highest job-market demand of any frontend tool.",
    tags: ["components", "JSX", "huge ecosystem"],
  },
  {
    name: "Next.js",
    pill: "Dominant",
    accent: "teal",
    tagline: "by Vercel — React with superpowers",
    desc: "React + routing + server rendering + API routes in one. Deploy to Vercel in minutes. The most popular production React framework. Use it when you need frontend AND backend (this hub uses it).",
    tags: ["SSR / SSG", "API routes", "Vercel-optimized"],
  },
  {
    name: "Vue.js",
    pill: "Gentle",
    accent: "yellow",
    tagline: "Gentler learning curve than React",
    desc: "Easier to learn than React, with cleaner syntax. Popular with smaller teams. Nuxt.js is its Next.js equivalent. Smaller ecosystem than React.",
    tags: ["beginner-friendly", "Nuxt.js", "clean syntax"],
  },
  {
    name: "Svelte / SvelteKit",
    accent: "orange",
    tagline: "No virtual DOM — compiles to vanilla JS",
    desc: "Newer and faster than React. No runtime library — it compiles to plain JS, so bundles are smaller. SvelteKit is its Next.js equivalent. Growing fast.",
    tags: ["compiled", "fast", "small bundle"],
  },
  {
    name: "Remix",
    accent: "purple",
    tagline: "Next.js competitor from the React Router team",
    desc: "An alternative to Next.js — strong at form handling and data loading. Now merged with React Router v7. Good if you want to avoid Vercel lock-in.",
    tags: ["forms", "no lock-in", "React-based"],
  },
  {
    name: "Astro",
    pill: "Content sites",
    accent: "yellow",
    tagline: "Ships zero JS by default — super fast",
    desc: "Ships HTML-only by default, so it's blazing fast. Add React/Vue/Svelte components only where needed. Perfect for blogs, docs, and marketing sites — not heavy web apps.",
    tags: ["content sites", "zero JS default", "islands"],
  },
];

// ───────────── Chapter 05 · The Claude / Anthropic Stack ─────────────
export const MIN_AI_STACK = [
  { name: "Next.js", role: "Frontend + API" },
  { name: "Anthropic SDK", role: "Talk to Claude" },
  { name: "Vercel", role: "Deploy" },
  { name: "Supabase", role: "Save user data" },
  { name: "Tailwind", role: "Styling" },
  { name: "Auth.js / Clerk", role: "User login" },
];

export const CLAUDE_FLOW = [
  {
    n: 1,
    title: "Anthropic API",
    badge: "api.anthropic.com",
    desc: "The core. You send messages to Claude and get responses, via REST or the SDK. Free credits to start; then pay-per-token (more tokens = higher cost).",
  },
  {
    n: 2,
    title: "Anthropic SDK (Node / Python)",
    badge: "npm / pip",
    desc: "The official library that makes the API easy. `npm install @anthropic-ai/sdk`, then talk to Claude in a few lines. Supports streaming so responses appear word by word.",
  },
  {
    n: 3,
    title: "Claude models — Haiku · Sonnet · Opus",
    badge: "choose model",
    desc: "Haiku = cheapest & fastest, for simple tasks. Sonnet = best balance, recommended for most apps. Opus = most powerful, for complex reasoning (pricier).",
  },
  {
    n: 4,
    title: "Claude Code (CLI)",
    badge: "terminal",
    desc: "Anthropic's terminal tool. Claude lives in your terminal — reads files, writes code, runs commands. Like an AI developer next to you. (This hub was built with it.)",
  },
  {
    n: 5,
    title: "MCP — Model Context Protocol",
    badge: "open standard",
    desc: "Anthropic's open standard to connect Claude to external tools — GoHighLevel, GitHub, Supabase, Slack. Gives Claude live data, not just text. The future of AI agents.",
  },
  {
    n: 6,
    title: "Prompt engineering",
    badge: "docs.anthropic.com",
    desc: "The craft of writing instructions for Claude — system prompt, user message, history. Better prompt = better output. A skill worth learning.",
  },
];

export const CODE_CLAUDE = `// Simplest Claude API call in a Next.js API route
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const message = await client.messages.create({
  model: "claude-sonnet-4-6",
  max_tokens: 1024,
  messages: [{ role: "user", content: "Explain React in simple terms" }],
});

// message.content[0].text  →  Claude's answer`;

// ───────────── Chapter 06 · All Tools — Quick Reference ─────────────
// Used by the Dev Tools page's T3-stack summary.
export const T3_STACK = [
  { name: "Next.js", role: "framework" },
  { name: "Supabase", role: "database + auth" },
  { name: "Tailwind", role: "CSS" },
  { name: "Prisma", role: "ORM" },
  { name: "Vercel", role: "deployment" },
  { name: "tRPC", role: "typesafe API" },
];

// ───────────── Plain-English Stack Map (beginner mnemonics) ─────────────
export interface StackMapItem {
  name: string;
  icon: string;
  meaning: string; // what it does
  like: string; // analogy
  remember?: string; // one-liner to memorize
}
export interface StackMapGroup {
  label: string;
  icon: string;
  tint: string; // brand hex used for the group accent
  items: StackMapItem[];
}

export const STACK_MAP: StackMapGroup[] = [
  {
    label: "Frontend — what users see",
    icon: "🌐",
    tint: "#f472b6",
    items: [
      { name: "HTML", icon: "🦴", meaning: "Builds the structure of the website.", like: "The skeleton of a house.", remember: "HTML = builds the website." },
      { name: "CSS", icon: "🎨", meaning: "Makes the website look beautiful.", like: "Clothes and paint for the house.", remember: "CSS = decorates the website." },
      { name: "JavaScript", icon: "⚡", meaning: "Makes the website move and do things.", like: "Muscles that make the body move.", remember: "JS = makes the website interactive." },
      { name: "Next.js", icon: "⚛️", meaning: "Organizes and builds the whole app.", like: "The project manager building the entire house.", remember: "Next.js = builds the whole app." },
      { name: "Tailwind CSS", icon: "🪣", meaning: "A faster way to write CSS.", like: "A paint roller instead of a paintbrush.", remember: "Tailwind = faster CSS." },
    ],
  },
  {
    label: "Backend — behind the scenes",
    icon: "🧠",
    tint: "#38bdf8",
    items: [
      { name: "Node.js", icon: "🟢", meaning: "Runs the app's brain on the server.", like: "The kitchen where food is cooked.", remember: "Node.js = runs the app." },
      { name: "API", icon: "🔗", meaning: "Lets two apps talk to each other.", like: "A telephone between two friends." },
      { name: "REST API", icon: "📬", meaning: "A common way apps send information.", like: "Sending letters through the mail." },
      { name: "GraphQL", icon: "🍕", meaning: "Ask only for the information you need.", like: "Ordering only the toppings you want on your pizza." },
    ],
  },
  {
    label: "Database — stores information",
    icon: "🗄️",
    tint: "#34d399",
    items: [
      { name: "Supabase", icon: "🟢", meaning: "Stores users, passwords, files, and app data.", like: "A giant filing cabinet.", remember: "Supabase = stores data." },
      { name: "Prisma", icon: "💎", meaning: "Helps your app talk to the database.", like: "A translator between your app and the database.", remember: "Prisma = database translator." },
      { name: "ORM", icon: "🗃️", meaning: "Makes databases easier to use from code.", like: "A helper that translates database language." },
    ],
  },
  {
    label: "Hosting — put your app online",
    icon: "☁️",
    tint: "#f6cb1f",
    items: [
      { name: "Vercel", icon: "▲", meaning: "Puts your website on the internet.", like: "Opening your store so everyone can visit.", remember: "Vercel = publishes your website." },
      { name: "Railway / Render", icon: "🚂", meaning: "Runs your backend online.", like: "A factory working 24/7." },
      { name: "AWS / GCP / Azure", icon: "☁️", meaning: "Giant cloud computers that run big apps.", like: "Renting a huge building instead of building your own.", remember: "Cloud = powerful computers on the internet." },
    ],
  },
  {
    label: "Development tools",
    icon: "📦",
    tint: "#7c5cfc",
    items: [
      { name: "Docker", icon: "🐳", meaning: "Packs your app so it works anywhere.", like: "Packing all your toys into one box before traveling.", remember: "Docker = packs your app." },
      { name: "GitHub", icon: "🐙", meaning: "Stores your code online.", like: "A library for your projects." },
      { name: "Git", icon: "🌿", meaning: "Saves every change you make to your code.", like: "A magic undo button." },
      { name: "CLI", icon: "💻", meaning: "Control your computer by typing commands.", like: "Talking directly to your computer." },
      { name: "Extension", icon: "🧩", meaning: "Adds new features to VS Code.", like: "Installing a new app on your phone." },
    ],
  },
  {
    label: "AI terms",
    icon: "🤖",
    tint: "#ff8a3d",
    items: [
      { name: "LLM", icon: "🤖", meaning: "An AI that understands and writes text.", like: "A super-smart robot teacher." },
      { name: "Context Window", icon: "🧠", meaning: "How much the AI can remember in one conversation.", like: "Short-term memory." },
      { name: "Token", icon: "🪙", meaning: "Small pieces of words the AI reads.", like: "LEGO blocks that make sentences." },
      { name: "Closed Source", icon: "🔒", meaning: "You can use it, but can't see how it's built (Claude, ChatGPT, Gemini).", like: "A dish you order but never get the recipe for." },
      { name: "Open Source", icon: "🌍", meaning: "Anyone can download and run it (Llama, Qwen, DeepSeek).", like: "A recipe published in full." },
      { name: "SWE-Bench", icon: "🏆", meaning: "A coding exam for AI models.", like: "A report card for AI programmers." },
    ],
  },
  {
    label: "Networking",
    icon: "🔌",
    tint: "#ac4bff",
    items: [
      { name: "Webhook", icon: "🔔", meaning: "Automatically sends information when something happens.", like: "A doorbell that rings by itself." },
      { name: "JSON", icon: "📄", meaning: "A way computers organize and share information.", like: "A form with labels and answers." },
    ],
  },
];

// Vertical "how a modern site flows" diagram.
export const STACK_FLOW: { icon: string; name: string; note: string }[] = [
  { icon: "👤", name: "User", note: "visits your site" },
  { icon: "🦴", name: "HTML", note: "builds the structure" },
  { icon: "🎨", name: "CSS / Tailwind", note: "makes it beautiful" },
  { icon: "⚡", name: "JavaScript", note: "adds movement & interaction" },
  { icon: "⚛️", name: "Next.js", note: "builds the whole application" },
  { icon: "🟢", name: "Node.js", note: "runs the backend" },
  { icon: "💎", name: "Prisma", note: "talks to the database" },
  { icon: "🗄️", name: "Supabase", note: "stores all the data" },
  { icon: "▲", name: "Vercel", note: "puts the app online" },
  { icon: "☁️", name: "AWS / GCP / Azure", note: "used when your app gets very big" },
];

export const STACK_ONE_SENTENCE =
  "HTML builds it. CSS (or Tailwind) makes it beautiful. JavaScript makes it interactive. Next.js organizes the whole app. Node.js runs the backend. Prisma talks to the database. Supabase stores the data. Vercel publishes it online. AWS/GCP/Azure help it grow when millions of people use it.";

export interface ToolGroup {
  label: string;
  icon: string;
  tools: { name: string; note: string }[];
}

export const TOOL_GROUPS: ToolGroup[] = [
  {
    label: "Hosting / Deploy",
    icon: "🌐",
    tools: [
      { name: "Vercel", note: "Best for Next.js · free tier" },
      { name: "Netlify", note: "Great for static sites" },
      { name: "Railway", note: "Backend servers" },
      { name: "Render", note: "Free-tier backends" },
      { name: "GitHub Pages", note: "Free · static only" },
      { name: "Cloudflare Pages", note: "Fast, free, global" },
    ],
  },
  {
    label: "Database",
    icon: "🗄️",
    tools: [
      { name: "Supabase", note: "Postgres + auth + realtime" },
      { name: "PlanetScale", note: "Serverless MySQL" },
      { name: "Neon", note: "Serverless Postgres" },
      { name: "MongoDB Atlas", note: "NoSQL · flexible" },
      { name: "Turso", note: "SQLite at the edge" },
      { name: "Firebase", note: "Google NoSQL · realtime" },
    ],
  },
  {
    label: "Auth / Login",
    icon: "🔐",
    tools: [
      { name: "Clerk", note: "Easiest drop-in auth" },
      { name: "Auth.js", note: "Free · open source" },
      { name: "Supabase Auth", note: "Built-in with the DB" },
      { name: "Firebase Auth", note: "Easy Google login" },
      { name: "Lucia", note: "Lightweight · DIY" },
      { name: "NextAuth", note: "→ now Auth.js" },
    ],
  },
  {
    label: "Payments",
    icon: "💳",
    tools: [
      { name: "Stripe", note: "Industry standard · PH ok" },
      { name: "LemonSqueezy", note: "Merchant of Record" },
      { name: "Paddle", note: "SaaS-focused" },
      { name: "PayMongo", note: "PH · GCash / Maya" },
      { name: "Xendit", note: "SE-Asian payments" },
      { name: "DragonPay", note: "PH banking" },
    ],
  },
  {
    label: "Email",
    icon: "📧",
    tools: [
      { name: "Resend", note: "Dev-friendly · cheap" },
      { name: "SendGrid", note: "Enterprise scale" },
      { name: "Mailgun", note: "API-first email" },
      { name: "Postmark", note: "Transactional email" },
      { name: "React Email", note: "Build emails in React" },
      { name: "Nodemailer", note: "DIY · Node.js" },
    ],
  },
  {
    label: "AI APIs",
    icon: "🤖",
    tools: [
      { name: "Anthropic", note: "Claude — best for coding" },
      { name: "OpenAI", note: "GPT-4o — most popular" },
      { name: "Google AI", note: "Gemini — cheap at scale" },
      { name: "Groq", note: "Fastest inference · free tier" },
      { name: "Replicate", note: "Run open models via API" },
      { name: "Together AI", note: "Cheap open-model API" },
    ],
  },
  {
    label: "Dev Tools",
    icon: "🔧",
    tools: [
      { name: "GitHub", note: "Code storage + CI/CD" },
      { name: "Cursor", note: "AI code editor" },
      { name: "Postman", note: "Test APIs" },
      { name: "Prisma", note: "Database ORM" },
      { name: "Zod", note: "TypeScript validation" },
      { name: "ESLint / Prettier", note: "Lint + formatting" },
    ],
  },
  {
    label: "Package Managers",
    icon: "📦",
    tools: [
      { name: "npm", note: "Default Node manager" },
      { name: "pnpm", note: "Faster · less disk" },
      { name: "bun", note: "Fastest · all-in-one" },
      { name: "yarn", note: "Old reliable" },
      { name: "pip", note: "Python packages" },
      { name: "cargo", note: "Rust packages" },
    ],
  },
  {
    label: "No-Code / Low-Code",
    icon: "🚀",
    tools: [
      { name: "Webflow", note: "Visual website builder" },
      { name: "Framer", note: "Design + publish" },
      { name: "Bubble", note: "Full no-code web app" },
      { name: "Notion", note: "Docs + simple sites" },
      { name: "Carrd", note: "Simple landing pages" },
      { name: "Lovable / Bolt", note: "AI generates a full app" },
    ],
  },
];
