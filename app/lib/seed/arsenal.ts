import type { ArsenalMcp, FrameworkStep } from "@/app/lib/types";

// Top 10 most-used skills today (curated — broad ecosystem usage, mid-2026).
// IDs map to entries in ARSENAL_SKILLS.
export const MOST_USED: { id: string; why: string }[] = [
  { id: "mcp-builder", why: "MCP is the hottest integration layer — everyone's building servers." },
  { id: "subagent-driven-development", why: "Run big work across independent subagents — core agentic pattern." },
  { id: "prompt-engineering", why: "Foundational — better prompts, better everything." },
  { id: "systematic-debugging", why: "Methodical bug-fixing beats guess-and-check, every time." },
  { id: "test-driven-development", why: "Write tests first — the reliability default." },
  { id: "skill-creator", why: "Create & optimize your own skills — meta and rising fast." },
  { id: "nextjs-best-practices", why: "Next.js dominates production React; used constantly." },
  { id: "web-artifacts-builder", why: "Spin up rich web artifacts (React + Tailwind + shadcn)." },
  { id: "using-git-worktrees", why: "Isolate parallel work safely — staple of agentic dev." },
  { id: "requesting-code-review", why: "Rigorous review before merge — quality gate of choice." },
];

// ───────────── MCP SERVERS (plug into Claude Code) ─────────────
export const ARSENAL_MCPS: ArsenalMcp[] = [
  {
    name: "21st.dev Magic MCP",
    pkg: "@21st-dev/magic",
    cmd: "npx -y @21st-dev/magic@latest",
    description:
      "AI-powered UI component generator that creates modern, production-ready components from natural language descriptions directly in your IDE.",
    features: [
      "Generate UI components from natural language",
      "Search and insert professional logos via SVGL",
      "Components follow your project code style",
    ],
  },
  {
    name: "Chrome DevTools MCP",
    pkg: "chrome-devtools-mcp",
    cmd: "npx -y chrome-devtools-mcp@latest",
    description:
      "Lets your coding agent control and inspect a live Chrome browser via the Chrome DevTools Protocol — performance traces, network inspection, and browser automation.",
    features: [
      "Record performance traces and run Lighthouse audits",
      "Inspect network requests, console messages, screenshots",
      "Automate browser input — click, type, fill forms",
    ],
  },
  {
    name: "Remotion MCP",
    pkg: "@remotion/mcp",
    cmd: "npx -y @remotion/mcp@latest",
    description:
      "Indexes Remotion documentation so your AI assistant can accurately help with programmatic video creation — compositions, animations, and rendering.",
    features: [
      "Up-to-date Remotion API documentation in context",
      "Accurate code generation for video compositions",
      "Works with Claude Code, Cursor, and other MCP editors",
    ],
  },
  {
    name: "Context7 MCP",
    pkg: "@upstash/context7-mcp",
    cmd: "npx -y @upstash/context7-mcp@latest",
    description:
      "Fetches up-to-date, version-specific library documentation and code examples directly into your LLM context — eliminates hallucinated APIs.",
    features: [
      "Pull real, current docs for thousands of libraries",
      "Version-specific documentation (React, Next.js, etc.)",
      "Eliminates hallucinated APIs and outdated patterns",
    ],
  },
  {
    name: "Playwright MCP",
    pkg: "@playwright/mcp",
    cmd: "npx -y @playwright/mcp@latest",
    description:
      "Browser automation via Playwright, enabling LLMs to interact with web pages through structured accessibility snapshots — cross-browser support included.",
    features: [
      "Accessibility-driven automation (uses a11y tree)",
      "Cross-browser: Chromium, Firefox, WebKit",
      "Navigate, click, fill forms, take screenshots, run JS",
    ],
  },
  {
    name: "Obsidian MCP",
    pkg: "obsidian-mcp",
    cmd: "npx -y obsidian-mcp@latest",
    description:
      "Enables AI assistants to read, create, edit, search, and manage notes and tags in your Obsidian vaults — full vault access from your editor.",
    features: [
      "Read, create, edit, move, and delete vault notes",
      "Manage tags across your entire vault",
      "Multi-vault support (pass additional paths)",
    ],
  },
  {
    name: "GoHighLevel MCP (Official)",
    pkg: "services.leadconnectorhq.com/mcp",
    cmd: "https://services.leadconnectorhq.com/mcp/",
    remote: true,
    description:
      "HighLevel's official MCP server. 36 tools across Contacts, Conversations, Opportunities, Calendars, Payments, Social, Blogs, and Emails. Auth via Private Integration Token scoped to a single sub-account.",
    features: [
      "36 tools — contacts, conversations, opportunities, calendars, payments, social, blogs, emails",
      "Private Integration Token auth (Settings → Private Integrations on the sub-account)",
      "Remote HTTP MCP — no local install, always current with the GHL API",
    ],
  },
];

// ───────────── FRAMEWORK — blank install → shipping-grade Claude ─────────────
const CLAUDE_MD_TEMPLATE = `# Global Claude - <Your Name> (<Your Brand>)

This file applies to every project. Project-level CLAUDE.md files extend this
context - they do not override it unless they explicitly say so.

---

## Who I Am

Name:      <Your Name>
Brand:     <Company / brand>
Location:  <City, Country> (<timezone, e.g. PHT = UTC+8>)
GitHub:    <handle> (<email>)
Portfolio: <url>
Main site: <url>

Short bio (1-3 sentences - role, stack, how you work):
<e.g. "Support specialist in X, building tools under the Y brand. Services: VA,
automation, vibe coding, web dev.">

---

## How I Work With Claude

- Autonomy: <e.g. "Never ask, just do. Show me the diff after.">
- Answer shape: <short + direct / explain the why / show tradeoffs>
- Stack defaults: <e.g. Next.js + Tailwind + Supabase, ES modules, async/await>
- Don't: <e.g. add deps without asking, rewrite style without reason>

---

## My Projects

- <project> - <one-liner> - path: <local path> - stack: <stack>
- <project> - <one-liner> - path: <local path> - stack: <stack>

---

## Rules

- Secrets: env vars only, never commit .env, .env in .gitignore before first commit
- Deploy: review changes before pushing to main/production
- Tone: <direct, concise, colleague-not-beginner>`;

export const FRAMEWORK_STEPS: FrameworkStep[] = [
  {
    n: "01",
    title: "Global CLAUDE.md Setup",
    kicker: "Identity layer",
    accent: "#8B5CF6",
    summary:
      "Teach Claude who you are, how you work, and the projects you run — once. Every session in every repo loads this file.",
    outcome:
      "Claude starts every session already knowing you. Zero re-briefing.",
    sections: [
      {
        title: "Create the file",
        text: "The global file lives at ~/.claude/CLAUDE.md (Windows: C:\\Users\\<you>\\.claude\\CLAUDE.md). Claude Code reads it at the start of every session across every project — think of it as your durable system prompt.",
        code: [
          {
            label: "macOS / Linux",
            code: "mkdir -p ~/.claude && ${EDITOR:-nano} ~/.claude/CLAUDE.md",
          },
          {
            label: "Windows (PowerShell)",
            code: 'New-Item -ItemType Directory -Path "$HOME/.claude" -Force; code "$HOME/.claude/CLAUDE.md"',
          },
        ],
      },
      {
        title: "Fill it with the four sections that matter",
        bullets: [
          "Who I am — name, role, brand, timezone, link to portfolio. Claude stops guessing.",
          "How I work with Claude — autonomy level, “never ask, just do”, answer-shape preferences.",
          "My projects — a one-liner + local path + stack per active project. Claude stops re-asking where code lives.",
          "Rules — deploy rules, design rules, banned patterns, tone. The non-obvious stuff that bit you before.",
        ],
      },
      {
        title: "Copy this template and fill the blanks",
        text: "A starter scaffold covering the four sections plus the toggles that save the most re-briefing. Replace every <...> placeholder and delete anything that doesn't apply.",
        code: [{ label: "~/.claude/CLAUDE.md (template)", code: CLAUDE_MD_TEMPLATE }],
      },
    ],
  },
  {
    n: "02",
    title: "Governance",
    kicker: "Guardrails + memory",
    accent: "#EC4899",
    summary:
      "Configure what Claude may do without asking, what requires confirmation, and what to remember across sessions.",
    outcome:
      "Claude has the exact permissions it needs, remembers what matters, and never surprises you.",
    sections: [
      {
        title: "Permissions",
        bullets: [
          "Use settings.json allow / deny / ask rules to pre-approve safe commands and gate risky ones.",
          "Allow the read-only and routine tools you trust; require confirmation for destructive or outward-facing actions.",
          "Project .claude/settings.json overrides your global defaults per repo.",
        ],
      },
      {
        title: "Memory",
        bullets: [
          "CLAUDE.md is durable context; add a memory file for facts worth keeping across sessions.",
          "Record decisions, gotchas, and 'why' — not what the code already says.",
          "Keep it lean: stale memory is worse than none.",
        ],
      },
    ],
  },
  {
    n: "03",
    title: "Caveman",
    kicker: "Token economy",
    accent: "#F97316",
    summary:
      "Install the Caveman skill — Claude writes telegraphically and compresses CLAUDE.md on disk. ~65% fewer output tokens, same technical accuracy.",
    outcome: "Sessions cost less, output is scannable, and your CLAUDE.md is smaller.",
    sections: [
      {
        title: "What it does",
        bullets: [
          "Forces terse, telegraphic output — fewer filler words, same technical substance.",
          "Compresses CLAUDE.md on disk so context loads cheaper every session.",
          "Reported ~65% fewer output tokens with no loss of accuracy.",
        ],
      },
      {
        title: "When to use it",
        text: "Great for long agentic sessions and big repos where token cost and scannability matter. Toggle off when you want fuller prose (docs, explanations).",
      },
    ],
  },
  {
    n: "04",
    title: "Obsidian Second Brain",
    kicker: "Knowledge layer",
    accent: "#10B981",
    summary:
      "Wire Claude into an Obsidian vault so it can read, write, and search your notes. PARA + Zettelkasten structure, Local REST API, obsidian-mcp.",
    outcome:
      "Claude reads, writes, and searches your vault. Domain questions get answered from your own notes.",
    sections: [
      {
        title: "Set it up",
        bullets: [
          "Install the Obsidian MCP (see the MCPs tab) and enable the Local REST API plugin in Obsidian.",
          "Structure the vault with PARA (Projects · Areas · Resources · Archives) + Zettelkasten linking.",
          "Now Claude can pull answers from your own knowledge base, not just its training data.",
        ],
        code: [{ label: "Install", code: "npx -y obsidian-mcp@latest" }],
      },
    ],
  },
  {
    n: "05",
    title: "GSD (Get Shit Done)",
    kicker: "Spec-driven workflow",
    accent: "#06B6D4",
    summary:
      "A meta-prompting + context-engineering system that plans, executes, verifies, and ships whole phases. Solves context rot. Works across Claude Code, Gemini, Codex, Cursor, Copilot, and more.",
    outcome:
      "Solo-dev output at small-team velocity. Claude plans, executes, verifies, and ships.",
    sections: [
      {
        title: "The loop",
        bullets: [
          "Plan — turn a goal into a spec and a phased plan before any code.",
          "Execute — work one phase at a time with the right context loaded (context engineering).",
          "Verify — run tests / checks and confirm the phase actually works before moving on.",
          "Ship — commit, deploy, and capture what was learned.",
        ],
      },
      {
        title: "Why it works",
        text: "Spec-driven + context-engineered phases beat one giant prompt — it avoids 'context rot' on long tasks and keeps quality high across many steps.",
      },
    ],
  },
];
