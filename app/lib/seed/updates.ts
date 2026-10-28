import type { Update } from "@/app/lib/types";

// AI news for builders: GHL, Claude, AI automation and the wider model landscape.
// Newest week first. Every item names its official source; nothing here is
// rumour or a secondary-source date. Research trail: docs/research/2026-10/,
// plus the vendors' own changelogs checked 2026-10-28.
// Visitors can add, edit or hide items in their own browser (see UpdatesClient).
export const UPDATES_VERIFIED_ON = "2026-10-28";

export const SEED_UPDATES: Update[] = [
  // ── Week of 2026-10-26 ──
  {
    id: "u-2026-10-27-ghl-sheets-triggers",
    week: "Week of 2026-10-26",
    title: "GHL: Google Sheets can now start a workflow",
    category: "GHL",
    content:
      "Four new workflow triggers fire on a new spreadsheet, a new row, an updated row or a new worksheet. Teams that already collect leads or project data in Sheets can hand it straight to a HighLevel workflow instead of checking the sheet by hand. They're marked Premium in the builder, so usage charges may apply. Source: https://ideas.gohighlevel.com/changelog",
  },
  {
    id: "u-2026-10-27-ghl-workflow-canvas",
    week: "Week of 2026-10-26",
    title: "GHL: Workflow Canvas and Workflow Maps",
    category: "GHL",
    content:
      "Workflow Canvas shows a workflow together with the workflows it links to, so you can follow a whole lead-to-follow-up process in one view. Workflow Maps gives agency users an account-wide overview, with a filter for workflows that have issues. Useful for audits and for explaining a build to a client. Source: https://ideas.gohighlevel.com/changelog",
  },
  {
    id: "u-2026-10-27-ghl-brand-email-domain",
    week: "Week of 2026-10-26",
    title: "GHL: a notification email domain per brand",
    category: "GHL",
    content:
      "SaaS agencies using Multi-Brand Management can give each brand its own domain for system notification emails, so customers only ever see that brand's identity. Source: https://ideas.gohighlevel.com/changelog",
  },
  {
    id: "u-2026-10-27-anthropic-gsa",
    week: "Week of 2026-10-26",
    title: "Claude: expanded US government agreement",
    category: "AI News",
    content:
      "Anthropic expanded its partnership with the US General Services Administration, giving government partners a 40% discount on Claude Enterprise, Claude for Government and the Claude API. The same day it shared early results from research partnerships using Claude to speed up drug development. Source: https://www.anthropic.com/news/expanding-partnership-gsa",
  },

  // ── Week of 2026-10-19 ──
  {
    id: "u-2026-10-21-claude-api-version",
    week: "Week of 2026-10-19",
    title: "Claude: API version 2026-10-21 removes temperature and top_p",
    category: "Claude",
    content:
      "The new API version rejects temperature, top_p and top_k on every model. You steer output with prompting and the effort setting instead. If you have older HTTP calls, Make or n8n modules, or code samples that send these fields, remove them before you switch versions. Source: https://platform.claude.com/docs/en/api/migration-2026-10-21",
  },
  {
    id: "u-2026-10-22-agent-skills-aaif",
    week: "Week of 2026-10-19",
    title: "Claude: Agent Skills becomes an open standard",
    category: "Claude",
    content:
      "Anthropic donated Agent Skills to the Agentic AI Foundation, which already hosts MCP and A2A. More than 70 agent platforms, including ChatGPT, Cursor, GitHub Copilot and VS Code, have adopted the format, so a skill you write once can travel between tools. Source: https://www.anthropic.com/news/donating-agent-skills-to-the-agentic-ai-foundation",
  },
  {
    id: "u-2026-10-22-claude-google-cloud",
    week: "Week of 2026-10-19",
    title: "Claude: Anthropic-managed Claude on Google Cloud",
    category: "Claude",
    content:
      "You can now reach the Anthropic-operated Claude API through your own Google Cloud project, with Google Cloud IAM for access and Google Cloud Marketplace for billing. Fast mode for Opus 5.5 is available there too. Handy for clients who must keep spend and access inside Google Cloud. Source: https://platform.claude.com/docs/en/release-notes/overview",
  },
  {
    id: "u-2026-10-23-claude-tag-api",
    week: "Week of 2026-10-19",
    title: "Claude: Claude Tag API (beta) for Slack settings",
    category: "Claude",
    content:
      "Claude Enterprise admins can now read and change Claude Tag settings for Slack channels and workspaces through an API, instead of clicking through each one. Source: https://platform.claude.com/docs/en/release-notes/overview",
  },
  {
    id: "u-2026-10-19-ghl-workflows-api",
    week: "Week of 2026-10-19",
    title: "GHL: create workflows through the API",
    category: "GHL",
    content:
      "HighLevel's developer API gained Workflows endpoints to create, validate, search and delete workflows and to list step types. This opens the door to building standard client automations from code or from an AI agent instead of rebuilding them by hand. Source: https://marketplace.gohighlevel.com/docs/Changelog/",
  },
  {
    id: "u-2026-10-20-make-maia-upgrade",
    week: "Week of 2026-10-19",
    title: "Automation: Make's Maia gets Plan mode and memory",
    category: "AI Automation",
    content:
      "Maia, Make's AI assistant, can now plan a scenario with you before building it, remember context, build from an image of a process, and help resolve errors. Source: https://www.make.com/blog/plan-and-build-better-workflows-with-maia-by-make-upgraded",
  },
  {
    id: "u-2026-10-23-openai-retirements",
    week: "Week of 2026-10-19",
    title: "AI News: OpenAI retires GPT-3.5, GPT-4 and o1",
    category: "AI News",
    content:
      "GPT-3.5 Turbo, GPT-4, GPT-4 Turbo, GPT-4.1 nano, o1 and gpt-image-1 stopped working on October 23. If an old Zap, scenario or script still points at one of them, it now fails, so check your model IDs. OpenAI also added 12-hour prompt caching on October 20. Source: https://developers.openai.com/api/docs/deprecations",
  },
  {
    id: "u-2026-10-22-veo-preview-shutdown",
    week: "Week of 2026-10-19",
    title: "AI News: Veo 3.1 preview leaves the Gemini API",
    category: "AI News",
    content:
      "Google shut down the Veo 3.1 preview model IDs in the Gemini API and points developers to Gemini Omni Flash for video generation and editing. Source: https://ai.google.dev/gemini-api/docs/video",
  },

  // ── Week of 2026-10-12 ──
  {
    id: "u-2026-10-13-gemini-4-argon",
    week: "Week of 2026-10-12",
    title: "AI News: Gemini 4 Argon is Google's new flagship",
    category: "AI News",
    content:
      "Gemini 4 Argon is generally available, with a context window of about a million tokens. It's paid tier only, and the introductory price doubles on December 1, so budget for that if you build on it. Source: https://ai.google.dev/gemini-api/docs/models/gemini-4-argon",
  },
  {
    id: "u-2026-10-14-openai-deprecations",
    week: "Week of 2026-10-12",
    title: "AI News: GPT-4o and GPT-4.1 snapshots get a shutdown date",
    category: "AI News",
    content:
      "OpenAI deprecated the GPT-4o, GPT-4o mini, GPT-4.1 and GPT-4.1 mini snapshots, which shut down on January 14, 2027. GPT-6 Luna is the named replacement. Plenty of automations still run on 4o, so this is a good month to migrate. Source: https://developers.openai.com/api/docs/deprecations",
  },
  {
    id: "u-2026-10-14-claude-otel",
    week: "Week of 2026-10-12",
    title: "Claude: OpenTelemetry export (beta)",
    category: "Claude",
    content:
      "Claude can now export traces in the OpenTelemetry format, so your agents' calls, tool use and costs show up in the observability tools you already use. Source: https://platform.claude.com/docs/en/release-notes/overview",
  },

  // ── Week of 2026-10-05 ──
  {
    id: "u-2026-10-07-haiku-5-5",
    week: "Week of 2026-10-05",
    title: "Claude: Haiku 5.5, the new fast and cheap tier",
    category: "Claude",
    content:
      "Haiku 5.5 is Anthropic's fastest, lowest-cost model, priced in tiers by prompt length. It's a good fit for lead classification, routing and data extraction inside automations. Max and Team plans also started including monthly API credits. Source: https://platform.claude.com/docs/en/release-notes/overview",
  },
  {
    id: "u-2026-10-06-ai-by-zapier",
    week: "Week of 2026-10-05",
    title: "Automation: Zapier Agents is now AI by Zapier",
    category: "AI Automation",
    content:
      "Zapier folded its agents into Zaps as an AI step, billed in tasks like everything else. Existing agents show a migration banner. Source: https://zapier.com/blog/zapier-agents-is-now-ai-by-zapier/",
  },
  {
    id: "u-2026-10-09-managed-agents-workflows",
    week: "Week of 2026-10-05",
    title: "Claude: multi-agent workflows in Managed Agents (beta)",
    category: "Claude",
    content:
      "Managed Agents can now run dynamic workflows that fan work out to several agents in the background and return one result. Source: https://platform.claude.com/docs/en/release-notes/overview",
  },
  {
    id: "u-2026-10-06-mistral-large-4",
    week: "Week of 2026-10-05",
    title: "AI News: Mistral Large 4 enters preview",
    category: "AI News",
    content:
      "Mistral's new flagship is in public API preview, with open weights promised for later. Source: https://mistral.ai/news/mistral-large-4/",
  },

  // ── Week of 2026-09-28 ──
  {
    id: "u-2026-09-28-sonnet-5-5",
    week: "Week of 2026-09-28",
    title: "Claude: Sonnet 5.5 launches",
    category: "Claude",
    content:
      "Sonnet 5.5 is the new balanced tier, offering strong coding and tool use at a production-friendly price. Sonnet 4.5 was deprecated on September 30 and retires on November 30, so move any automations still using it. Source: https://platform.claude.com/docs/en/about-claude/model-deprecations",
  },
  {
    id: "u-2026-09-29-openai-devday",
    week: "Week of 2026-09-28",
    title: "AI News: GPT-6.1 Sol and DevDay 2026",
    category: "AI News",
    content:
      "OpenAI released GPT-6.1 Sol as its balanced model and used DevDay to add computer use to its Agents API. Source: https://developers.openai.com/api/docs/changelog",
  },

  // ── Week of 2026-09-21 ──
  {
    id: "u-2026-09-22-opus-5-5",
    week: "Week of 2026-09-21",
    title: "Claude: Opus 5.5, the new default in Claude Code",
    category: "Claude",
    content:
      "Opus 5.5 comes close to Fable on most work and costs less. Anthropic reports about 40% lower running cost than Opus 5, and it's now the default model in Claude Code on paid plans. Fast mode became generally available on October 15. Source: https://www.anthropic.com/claude-opus-5-5",
  },
  {
    id: "u-2026-09-22-ghl-ai-studio",
    week: "Week of 2026-09-21",
    title: "GHL: AI Studio is live for everyone",
    category: "GHL",
    content:
      "AI Studio, HighLevel's AI app and website builder, is generally available. Note that sub-account access is off by default. It's a separate product from Agent Studio, the agent builder. Source: https://ideas.gohighlevel.com/changelog/ai-studio-live-for-all",
  },
  {
    id: "u-2026-09-23-ghl-gpt6-workflows",
    week: "Week of 2026-09-21",
    title: "GHL: GPT-6 Sol and Luna inside workflows",
    category: "GHL",
    content:
      "The AI Agent and GPT actions in HighLevel workflows can now use OpenAI's GPT-6 Sol and GPT-6 Luna. Source: https://ideas.gohighlevel.com/changelog/gpt-6-sol-and-gpt-6-luna-now-available-in-ai-agent-and-gpt-actions",
  },
  {
    id: "u-2026-09-23-zapier-next-gen-zaps",
    week: "Week of 2026-09-21",
    title: "Automation: Next Gen Zaps (early access)",
    category: "AI Automation",
    content:
      "Zapier's next generation of Zaps can be built from Claude, ChatGPT or Cursor through MCP or in Zapier's canvas, with self-healing runs and human-in-the-loop pauses. Source: https://community.zapier.com/product-updates/the-next-generation-of-zaps-is-here-53832",
  },
  {
    id: "u-2026-09-24-sora-shutdown",
    week: "Week of 2026-09-21",
    title: "AI News: OpenAI shuts down the Sora API",
    category: "AI News",
    content:
      "Sora 2, Sora 2 Pro and the Videos API stopped on September 24, with no replacement API. Any automation that generated video through Sora needs another provider. Source: https://developers.openai.com/api/docs/models/sora-2",
  },

  // ── Week of 2026-09-14 ──
  {
    id: "u-2026-09-16-cowork-merged",
    week: "Week of 2026-09-14",
    title: "Claude: Cowork merges into the main Claude app",
    category: "Claude",
    content:
      "Claude Cowork is now part of the main Claude app rather than a separate product. Source: https://claude.com/blog/cowork-is-now-claude",
  },

  // ── Week of 2026-08-31 ──
  {
    id: "u-2026-09-01-fable-5-1",
    week: "Week of 2026-08-31",
    title: "Claude: Fable 5.1, Anthropic's most capable model",
    category: "Claude",
    content:
      "Fable 5.1 is the top generally available Claude model for the hardest reasoning and long-running agent work. It adds watermarking and C2PA Content Credentials. Source: https://platform.claude.com/docs/en/models/fable-5-1/whats-new-fable-5-1",
  },
  {
    id: "u-2026-09-03-gpt-6-astra",
    week: "Week of 2026-08-31",
    title: "AI News: GPT-6 Astra is OpenAI's new flagship",
    category: "AI News",
    content:
      "GPT-6 Astra launched with a context window of about a million tokens, async tool calls and mid-turn steering for long workflows. Source: https://developers.openai.com/api/docs/models/gpt-6-astra",
  },

  // ── August 2026 ──
  {
    id: "u-2026-08-27-a2a-aaif",
    week: "Week of 2026-08-24",
    title: "AI Automation: A2A joins the Agentic AI Foundation",
    category: "AI Automation",
    content:
      "The Agent2Agent protocol, which lets agents from different vendors work together, moved under the same neutral foundation as MCP. Source: https://a2a-protocol.org/latest/blog/2026/08/27/a-new-chapter-for-a2a-joining-the-agentic-ai-foundation/",
  },
  {
    id: "u-2026-08-26-assistants-api",
    week: "Week of 2026-08-24",
    title: "AI News: OpenAI's Assistants API is shut down",
    category: "AI News",
    content:
      "The Assistants API stopped on August 26. Builds that relied on it need the Responses API or the Agents API instead. Source: https://developers.openai.com/api/docs/changelog",
  },
  {
    id: "u-2026-08-19-claude-files-skills-ga",
    week: "Week of 2026-08-17",
    title: "Claude: Files API, Skills and computer use are generally available",
    category: "Claude",
    content:
      "Three building blocks for agents left beta at once: the Files API, Agent Skills on the API, and computer use. A new browser-use toolset launched alongside them. Source: https://platform.claude.com/docs/en/release-notes/overview",
  },
  {
    id: "u-2026-08-14-cursor-spacex",
    week: "Week of 2026-08-10",
    title: "AI News: Cursor joins SpaceX",
    category: "AI News",
    content:
      "Cursor's maker, Anysphere, is now part of SpaceX. Plans were rebuilt around Cursor's own Grok and Composer models, and Claude and GPT are a paid add-on on higher plans. Source: https://cursor.com/blog/joining-spacex",
  },
  {
    id: "u-2026-08-12-make-maia",
    week: "Week of 2026-08-10",
    title: "Automation: Make launches Maia",
    category: "AI Automation",
    content:
      "Maia builds Make scenarios from a plain-English description. Make now bills in credits rather than operations, and AI steps can use more than one credit. Source: https://www.make.com/en/blog/maia-conversational-ai-coworker-for-ai-agents-and-automation",
  },
  {
    id: "u-2026-08-07-ghl-fixed-ai-pricing",
    week: "Week of 2026-08-03",
    title: "GHL: set a fixed price for your AI products",
    category: "GHL",
    content:
      "Agencies can rebill Conversation AI and Voice AI to clients at a fixed rate instead of passing through usage, which makes AI easier to package and price. Source: https://ideas.gohighlevel.com/changelog/set-a-fixed-price-for-your-ai-products",
  },
  {
    id: "u-2026-08-03-owasp-llm-2026",
    week: "Week of 2026-08-03",
    title: "AI Automation: OWASP Top 10 for LLM apps, 2026 edition",
    category: "AI Automation",
    content:
      "The new edition moves Excessive Agency to number 3, a reminder to give agents only the tools and permissions they actually need, and ships an Agent Control Standard for runtime enforcement. Source: https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/",
  },

  // ── July 2026 ──
  {
    id: "u-2026-07-28-mcp-spec",
    week: "Week of 2026-07-27",
    title: "AI Automation: the biggest MCP spec change in a year",
    category: "AI Automation",
    content:
      "MCP revision 2026-07-28 makes the protocol stateless (no initialize handshake, no session header) and deprecates Roots, Sampling and Logging. If you run your own MCP server, check the migration notes. Source: https://modelcontextprotocol.io/specification/2026-07-28/changelog",
  },
  {
    id: "u-2026-07-27-eu-ai-omnibus",
    week: "Week of 2026-07-27",
    title: "AI News: EU pushes back high-risk AI Act deadlines",
    category: "AI News",
    content:
      "The EU's AI Omnibus is in force. High-risk obligations under Annex III move to December 2, 2027, and those under Annex I to August 2, 2028. Transparency duties still applied from August 2, 2026. Source: https://ai-act-service-desk.ec.europa.eu/en/ai-act/timeline/timeline-implementation-eu-ai-act",
  },
];
