import type {
  McpEntry,
  Skill,
  Snippet,
  BestPractice,
  AgentEntry,
  Recommendation,
} from "@/app/lib/types";

// ───────────────────────── AGENTS (this setup) ─────────────────────────
export const SEED_AGENTS: AgentEntry[] = [
  {
    id: "a-claude",
    name: "claude",
    role: "Default / catch-all",
    tools: "All tools",
    description:
      "The general default agent used when no specific agent is named. Handles any task that doesn't fit a more specialized agent.",
  },
  {
    id: "a-general",
    name: "general-purpose",
    role: "Research & multi-step execution",
    tools: "All tools",
    description:
      "For researching complex questions, searching code, and executing multi-step tasks when you're not confident the first match will be right.",
  },
  {
    id: "a-explore",
    name: "Explore",
    role: "Fast read-only search",
    tools: "Read-only (no edits)",
    description:
      "Read-only fan-out search agent for sweeping many files/dirs. Locates code and returns conclusions, not file dumps. Great for 'where is X?'.",
  },
  {
    id: "a-plan",
    name: "Plan",
    role: "Software architect",
    tools: "Read-only (no edits)",
    description:
      "Designs implementation plans — step-by-step strategy, critical files, and architectural trade-offs — before any code is written.",
  },
  {
    id: "a-ccguide",
    name: "claude-code-guide",
    role: "Claude Code / SDK / API expert",
    tools: "Glob, Grep, Read, WebFetch, WebSearch",
    description:
      "Answers questions about Claude Code (hooks, slash commands, MCP, settings), the Agent SDK, and the Claude API.",
  },
  {
    id: "a-statusline",
    name: "statusline-setup",
    role: "Status line config",
    tools: "Read, Edit",
    description: "Configures the Claude Code status line setting.",
  },
];

// ───────────────────────── MCPs (connected) ─────────────────────────
export const SEED_MCPS: McpEntry[] = [
  {
    id: "mcp-ghl",
    name: "GoHighLevel MCP",
    creator: "GoHighLevel",
    status: "Active",
    use_cases: [
      "Manage contacts, opportunities & pipelines",
      "Create/trigger workflows, campaigns & calendars",
      "Conversations, SMS/email, invoices & payments",
      "Funnels, blogs, social planner & custom objects",
    ],
    setup: "Connected via your GHL API key (stored as an env var / MCP config — never in code).",
    notes:
      "Your biggest integration — hundreds of tools across CRM, funnels, calendars, conversations, and commerce. Keep scopes minimal.",
  },
];

// ───────────────────────── SKILLS (installed) ─────────────────────────
// Your actual installed skills, grouped by category.
export const SEED_SKILLS: Skill[] = [
  // Funnels / Marketing / Copy
  { id: "s-copywriter", name: "copywriter", category: "Funnels & Marketing", description: "High-converting direct-response copy for emails, pages & ads." },
  { id: "s-10p", name: "sales-page-10p", category: "Funnels & Marketing", description: "Build sales pages with the 10P framework." },
  { id: "s-landing", name: "landing-page", category: "Funnels & Marketing", description: "Distinctive, high-converting landing pages." },
  { id: "s-gusten", name: "gusten-sun-funnel-brain", category: "Funnels & Marketing", description: "Funnel strategy, audits & offer creation." },
  { id: "s-websys", name: "website-system-builder", category: "Funnels & Marketing", description: "Strategy-first websites for any business." },
  { id: "s-stylelib", name: "website-style-library", category: "Funnels & Marketing", description: "Real-world wireframes & style references by niche." },
  { id: "s-clone", name: "my-clone", category: "Funnels & Marketing", description: "Clone/recreate sites & funnels from a URL or screenshot." },
  { id: "s-ads", name: "competitive-ads-extractor", category: "Funnels & Marketing", description: "Pull & analyze competitor ads for inspiration." },

  // Design / UI
  { id: "s-designstudio", name: "design-studio", category: "Design & UI", description: "Designer + Auditor + Critic pipeline for UI." },
  { id: "s-uiux", name: "ui-ux-pro-max", category: "Design & UI", description: "UI/UX intelligence: styles, palettes, fonts, patterns." },
  { id: "s-awesome", name: "awesome-design", category: "Design & UI", description: "Apply real brand design systems (Vercel, Stripe…)." },
  { id: "s-webguide", name: "web-design-guidelines", category: "Design & UI", description: "Review UI for accessibility & best practices." },
  { id: "s-theme", name: "theme-factory", category: "Design & UI", description: "Apply preset/on-the-fly themes to any artifact." },
  { id: "s-canvas", name: "canvas-design", category: "Design & UI", description: "Beautiful PNG/PDF visual art & posters." },

  // Dev / Code
  { id: "s-claudeapi", name: "claude-api", category: "Dev & Code", description: "Build/debug Claude API & Agent SDK apps (with caching)." },
  { id: "s-mcpbuilder", name: "mcp-builder", category: "Dev & Code", description: "Create high-quality MCP servers (Python/TS)." },
  { id: "s-supabase", name: "supabase-postgres-best-practices", category: "Dev & Code", description: "Postgres performance & schema best practices." },
  { id: "s-vercelreact", name: "vercel-react-best-practices", category: "Dev & Code", description: "React/Next.js performance patterns." },
  { id: "s-webapptest", name: "webapp-testing", category: "Dev & Code", description: "Drive & test local web apps with Playwright." },
  { id: "s-workflow", name: "workflow", category: "Dev & Code", description: "Durable, resumable workflows (Vercel Workflow DevKit)." },
  { id: "s-remotion", name: "remotion-video", category: "Dev & Code", description: "Programmatic video with React (Remotion)." },

  // Docs / Office
  { id: "s-docx", name: "docx", category: "Docs & Office", description: "Create/edit Word documents." },
  { id: "s-pptx", name: "pptx", category: "Docs & Office", description: "Create/edit PowerPoint decks." },
  { id: "s-xlsx", name: "xlsx", category: "Docs & Office", description: "Create/edit spreadsheets & clean data." },
  { id: "s-pdf", name: "pdf", category: "Docs & Office", description: "Read, merge, split, fill & OCR PDFs." },
  { id: "s-coauthor", name: "doc-coauthoring", category: "Docs & Office", description: "Structured doc/spec/proposal co-authoring." },
  { id: "s-comms", name: "internal-comms", category: "Docs & Office", description: "Internal updates, reports & FAQs." },

  // Media / Video
  { id: "s-nano", name: "nano-banana", category: "Media & Video", description: "Generate AI images (Gemini) at multiple resolutions." },
  { id: "s-seedance", name: "seedance suite (15+)", category: "Media & Video", description: "Seedance video prompt styles — cinematic, anime, ads, 3D…" },
  { id: "s-darbs", name: "realtalk-darbs-video-style", category: "Media & Video", description: "Viral Filipino-creator video scripts." },
  { id: "s-gif", name: "slack-gif-creator", category: "Media & Video", description: "Animated GIFs optimized for Slack." },
  { id: "s-imgenh", name: "image-enhancer", category: "Media & Video", description: "Upscale & sharpen images/screenshots." },
  { id: "s-ytdl", name: "video-downloader", category: "Media & Video", description: "Download YouTube videos in chosen quality." },

  // Research / Productivity
  { id: "s-research", name: "deep-research", category: "Research & Productivity", description: "Multi-source, fact-checked, cited research reports." },
  { id: "s-leads", name: "lead-research-assistant", category: "Research & Productivity", description: "Find & qualify leads with contact strategies." },
  { id: "s-domain", name: "domain-name-brainstormer", category: "Research & Productivity", description: "Brainstorm domains & check availability." },
  { id: "s-files", name: "file-organizer", category: "Research & Productivity", description: "Organize files, find duplicates, suggest structure." },
  { id: "s-invoices", name: "invoice-organizer", category: "Research & Productivity", description: "Sort & rename invoices for tax prep." },
  { id: "s-meeting", name: "meeting-insights-analyzer", category: "Research & Productivity", description: "Analyze meeting transcripts for patterns." },
  { id: "s-resume", name: "tailored-resume-generator", category: "Research & Productivity", description: "Tailor resumes to job descriptions." },
  { id: "s-twitter", name: "twitter-algorithm-optimizer", category: "Research & Productivity", description: "Optimize tweets using the open-source algorithm." },

  // Claude / Meta workflow
  { id: "s-skillcreator", name: "skill-creator", category: "Claude & Meta", description: "Create, edit & eval your own skills." },
  { id: "s-skillauditor", name: "skill-auditor", category: "Claude & Meta", description: "Audit & optimize installed skills/plugins/agents." },
  { id: "s-findskills", name: "find-skills", category: "Claude & Meta", description: "Discover & install new skills." },
  { id: "s-brainstorm", name: "brainstorming", category: "Claude & Meta", description: "Explore intent & requirements before building." },
  { id: "s-connect", name: "connect", category: "Claude & Meta", description: "Connect Claude to Gmail, Slack, Notion & 1000+ apps." },
  { id: "s-parallel", name: "dispatching-parallel-agents", category: "Claude & Meta", description: "Run independent tasks across parallel agents." },
  { id: "s-tdd", name: "test-driven-development", category: "Claude & Meta", description: "Write tests before implementation." },
  { id: "s-debug", name: "systematic-debugging", category: "Claude & Meta", description: "Methodical debugging before proposing fixes." },
  { id: "s-changelog", name: "changelog-generator", category: "Claude & Meta", description: "Customer-friendly changelogs from git history." },
];

export const SKILL_CATEGORIES = [
  "Funnels & Marketing",
  "Design & UI",
  "Dev & Code",
  "Docs & Office",
  "Media & Video",
  "Research & Productivity",
  "Claude & Meta",
];

// ───────────────────────── RECOMMENDATIONS (latest & most-used) ─────────────────────────
export const SEED_RECOMMENDED: Recommendation[] = [
  // MCPs
  { id: "r-mcp-github", name: "GitHub MCP", kind: "MCP", tag: "Most-used", description: "Read repos, PRs & issues so Claude can reference your code." },
  { id: "r-mcp-fs", name: "Filesystem MCP", kind: "MCP", tag: "Essential", description: "Give Claude scoped read/write access to local folders." },
  { id: "r-mcp-supabase", name: "Supabase MCP", kind: "MCP", tag: "Trending", description: "Query & manage your Postgres/Supabase project directly." },
  { id: "r-mcp-playwright", name: "Playwright MCP", kind: "MCP", tag: "Trending", description: "Drive a real browser for testing & scraping." },
  { id: "r-mcp-context7", name: "Context7 MCP", kind: "MCP", tag: "Trending", description: "Pull up-to-date library docs into context on demand." },
  { id: "r-mcp-notion", name: "Notion MCP", kind: "MCP", tag: "Most-used", description: "Read/write Notion pages & databases." },

  // Skills
  { id: "r-sk-research", name: "deep-research", kind: "Skill", tag: "Most-used", description: "The go-to for serious, cited research reports." },
  { id: "r-sk-design", name: "design-studio", kind: "Skill", tag: "Trending", description: "Distinctive UI that doesn't look AI-generated." },
  { id: "r-sk-mcp", name: "mcp-builder", kind: "Skill", tag: "Trending", description: "Build your own MCP servers as integrations grow." },
  { id: "r-sk-connect", name: "connect", kind: "Skill", tag: "Essential", description: "Take real actions across 1000+ apps (Gmail, Slack…)." },
  { id: "r-sk-office", name: "docx · pptx · xlsx · pdf", kind: "Skill", tag: "Most-used", description: "The office suite — deliverables clients actually open." },

  // Agents
  { id: "r-ag-sdd", name: "subagent-driven-development", kind: "Agent", tag: "Trending", description: "Execute implementation plans with independent task agents." },
  { id: "r-ag-parallel", name: "dispatching-parallel-agents", kind: "Agent", tag: "Most-used", description: "Fan out 2+ independent tasks at once for speed." },
  { id: "r-ag-plan", name: "Plan", kind: "Agent", tag: "Essential", description: "Architect a plan before building anything complex." },
];

// ───────────────────────── SNIPPETS ─────────────────────────
export const SEED_SNIPPETS: Snippet[] = [
  {
    id: "snip-mcp",
    title: "Add an MCP server (Claude Code)",
    language: "bash",
    description: "Register an MCP server and list configured ones.",
    code: `claude mcp add my-server -- node ./server.js
claude mcp list`,
  },
  {
    id: "snip-supabase",
    title: "Supabase client (browser)",
    language: "ts",
    description: "Create a typed Supabase client from public env vars.",
    code: `import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(url, key);`,
  },
  {
    id: "snip-fetch",
    title: "Fetch rows with graceful fallback",
    language: "ts",
    description: "Query Supabase, fall back to local seed data on error.",
    code: `export async function getTerms() {
  if (!supabase) return SEED_TERMS;
  const { data, error } = await supabase.from("terms").select("*");
  if (error || !data?.length) return SEED_TERMS;
  return data;
}`,
  },
  {
    id: "snip-webhook",
    title: "n8n webhook responder (Function node)",
    language: "js",
    description: "Return a JSON response from an incoming webhook.",
    code: `return [
  {
    json: {
      received: true,
      contact: $json.body.email,
    },
  },
];`,
  },
];

// ───────────────────────── BEST PRACTICES ─────────────────────────
export const SEED_BEST_PRACTICES: BestPractice[] = [
  { id: "bp-secrets", title: "Never hardcode secrets", detail: "Keep API keys in env vars / .env.local (gitignored). Use .env.example with placeholder names only." },
  { id: "bp-context", title: "Give Claude the right context", detail: "A focused CLAUDE.md, the relevant files, and a clear goal beat a long vague prompt. Enable only the MCPs you actually use." },
  { id: "bp-small", title: "Small, focused changes", detail: "Ask for incremental edits over sweeping rewrites. Review diffs, run typecheck/tests, then continue." },
  { id: "bp-verify", title: "Verify before you trust", detail: "Models can hallucinate APIs and facts. Run the build, check outputs, and confirm sources before shipping." },
  { id: "bp-agents", title: "Use agents for parallel work", detail: "Fan out independent tasks (research, search) to subagents; use Plan to architect before building." },
];

// ───────────────────────── SETUP ─────────────────────────
export const SETUP_STEPS: { title: string; body: string }[] = [
  { title: "1. Install Claude Code", body: "npm install -g @anthropic-ai/claude-code, then run `claude` in your project folder." },
  { title: "2. Add a CLAUDE.md", body: "Document your stack, style, and rules so every session starts with shared context." },
  { title: "3. Connect MCPs", body: "Add only the MCP servers you need (GoHighLevel, GitHub, Supabase). Store tokens in env vars." },
  { title: "4. Wire up Supabase (optional)", body: "Copy .env.example to .env.local, add your project URL + anon key, and run the schema SQL." },
  { title: "5. Deploy to Vercel", body: "Push to GitHub, import the repo in Vercel, add the env vars, and deploy." },
];
