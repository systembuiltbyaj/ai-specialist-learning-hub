# Anthropic & agent standards — verified 2026-10-26

Primary sources fetched 2026-10-26: Claude Platform models overview, pricing, model deprecations, API release notes, model "what's new" pages, anthropic.com/news, Claude Code docs, claude.com/pricing, modelcontextprotocol.io, aaif.io, a2a-protocol.org, agents.md, agentskills.io.

## Model registry rows

Prices are per million tokens (MTok), input/output, as listed on https://platform.claude.com/docs/en/about-claude/pricing on 2026-10-26. Release dates come from the API release notes (https://platform.claude.com/docs/en/release-notes/overview). "Legacy (still available)" is the label the models overview uses. Deprecation status comes from the deprecations table, where every model listed here is "Active" unless marked otherwise.

| id | vendor | display name | API model id | tier | released | status | context window | pricing note | source URL |
|---|---|---|---|---|---|---|---|---|---|
| claude-fable-5-1 | Anthropic | Claude Fable 5.1 | `claude-fable-5-1` | flagship | 2026-09-01 | current | 1M (128K max output) | $10 / $50; cache read $0.25 (0.025x); batch $5/$25 (seen 2026-10-26) | https://platform.claude.com/docs/en/models/fable-5-1/whats-new-fable-5-1 |
| claude-mythos-5-1 | Anthropic | Claude Mythos 5.1 | `claude-mythos-5-1` | other (limited access: same capabilities as Fable 5.1) | 2026-09-01 | current (verified orgs only) | 1M (128K) | $10 / $50; cache read $0.25 (seen 2026-10-26) | https://platform.claude.com/docs/en/about-claude/pricing |
| claude-opus-5-5 | Anthropic | Claude Opus 5.5 | `claude-opus-5-5` | flagship (docs' recommended starting model) | 2026-09-22 | current | 1M (128K) | $4 / $20; cache read $0.20 (0.05x); fast mode $8/$40 (seen 2026-10-26) | https://platform.claude.com/docs/en/about-claude/models/overview |
| claude-sonnet-5-5 | Anthropic | Claude Sonnet 5.5 | `claude-sonnet-5-5` | balanced | 2026-09-28 | current | 1M (128K) | $2 / $10; cache read $0.10, down from $0.20 on 2026-10-07 (seen 2026-10-26) | https://platform.claude.com/docs/en/about-claude/pricing |
| claude-haiku-5-5 | Anthropic | Claude Haiku 5.5 | `claude-haiku-5-5` | fast | 2026-10-07 | current | 1M (128K) | $0.10 / $0.50 for prompts up to 100K tokens; $0.50 / $2.50 for prompts over 100K (seen 2026-10-26) | https://platform.claude.com/docs/en/about-claude/pricing |
| claude-fable-5 | Anthropic | Claude Fable 5 | `claude-fable-5` | flagship (prev.) | 2026-06-09 | legacy (Active; retirement not before 2027-06-09) | 1M | $10 / $50; cache read $1 (seen 2026-10-26) | https://platform.claude.com/docs/en/about-claude/model-deprecations |
| claude-mythos-5 | Anthropic | Claude Mythos 5 | `claude-mythos-5` | other (limited access) | 2026-06-09 | legacy (Active) | 1M | $10 / $50; cache read $1 (seen 2026-10-26) | https://platform.claude.com/docs/en/about-claude/pricing |
| claude-mythos-preview | Anthropic | Claude Mythos Preview | `claude-mythos-preview` | other | (not sourced) | deprecated 2026-06-09, retirement TBA | (not sourced) | (not listed) | https://platform.claude.com/docs/en/about-claude/model-deprecations |
| claude-opus-5 | Anthropic | Claude Opus 5 | `claude-opus-5` | flagship (prev.) | 2026-07-24 | legacy (Active) | 1M | $5 / $25; cache read $0.50 (seen 2026-10-26) | https://platform.claude.com/docs/en/release-notes/overview |
| claude-opus-4-8 | Anthropic | Claude Opus 4.8 | `claude-opus-4-8` | flagship (prev.) | (not sourced) | legacy (Active; retirement not before 2027-05-28) | 1M | $5 / $25 (seen 2026-10-26) | https://platform.claude.com/docs/en/about-claude/model-deprecations |
| claude-opus-4-7 | Anthropic | Claude Opus 4.7 | `claude-opus-4-7` | flagship (prev.) | (not sourced) | legacy (Active; retirement not before 2027-04-16) | 1M | $5 / $25 (seen 2026-10-26) | https://platform.claude.com/docs/en/about-claude/model-deprecations |
| claude-opus-4-6 | Anthropic | Claude Opus 4.6 | `claude-opus-4-6` | flagship (prev.) | (not sourced) | legacy (Active; retirement not before 2027-02-05) | 1M via `[1m]` | $5 / $25 (seen 2026-10-26) | https://platform.claude.com/docs/en/about-claude/model-deprecations |
| claude-opus-4-5 | Anthropic | Claude Opus 4.5 | `claude-opus-4-5-20251101` | flagship (prev.) | (not sourced) | legacy (Active; retirement not before 2026-11-24) | (not sourced) | $5 / $25 (seen 2026-10-26) | https://platform.claude.com/docs/en/about-claude/model-deprecations |
| claude-sonnet-5 | Anthropic | Claude Sonnet 5 | `claude-sonnet-5` | balanced (prev.) | 2026-06-30 | legacy (Active; retirement not before 2027-06-30) | 1M | $2 / $10, now the standard price (the $3/$15 increase was cancelled); cache read $0.20 (seen 2026-10-26) | https://platform.claude.com/docs/en/about-claude/pricing |
| claude-sonnet-4-6 | Anthropic | Claude Sonnet 4.6 | `claude-sonnet-4-6` | balanced (prev.) | (not sourced) | legacy (Active; retirement not before 2027-02-17) | 1M via `[1m]` | $3 / $15 (seen 2026-10-26) | https://platform.claude.com/docs/en/about-claude/model-deprecations |
| claude-sonnet-4-5 | Anthropic | Claude Sonnet 4.5 | `claude-sonnet-4-5-20250929` | balanced (prev.) | (not sourced) | deprecated 2026-09-30; retires 2026-11-30, replaced by `claude-sonnet-5-5` | (not sourced) | $3 / $15 (seen 2026-10-26) | https://platform.claude.com/docs/en/about-claude/model-deprecations |
| claude-haiku-4-5 | Anthropic | Claude Haiku 4.5 | `claude-haiku-4-5-20251001` | fast (prev.) | (not sourced) | legacy (Active; retirement not before 2026-10-15, a date that has already passed) | (not sourced) | $1 / $5 (seen 2026-10-26) | https://platform.claude.com/docs/en/about-claude/model-deprecations |
| claude-opus-4-1 | Anthropic | Claude Opus 4.1 | `claude-opus-4-1-20250805` | flagship (old) | (not sourced) | retired 2026-08-05 (Claude API) | n/a | $15 / $75 (historical) | https://platform.claude.com/docs/en/about-claude/model-deprecations |
| claude-opus-4 / claude-sonnet-4 | Anthropic | Claude Opus 4 / Sonnet 4 | `claude-opus-4-20250514` / `claude-sonnet-4-20250514` | old | (not sourced) | retired 2026-06-15 | n/a | n/a | https://platform.claude.com/docs/en/about-claude/model-deprecations |
| claude-3-x | Anthropic | Claude Haiku 3 / Haiku 3.5 / Sonnet 3.7 | `claude-3-haiku-20240307`, `claude-3-5-haiku-20241022`, `claude-3-7-sonnet-20250219` | old | (not sourced) | retired 2026-04-20 / 2026-02-19 / 2026-02-19 | n/a | n/a | https://platform.claude.com/docs/en/about-claude/model-deprecations |

Shared notes for the 4.7-and-later generation:
- The batch API is 50% off.
- The tokenizer produces about 30% more tokens for the same text than older models.
- Thinking is adaptive only. Manual `budget_tokens` extended thinking is not accepted.
- `temperature`, `top_p` and `top_k` return a 400 error.
- Default effort is `high` on Fable 5.1 and Sonnet 5.5, and `medium` on Opus 5.5 and Haiku 5.5.

## Verified facts

1. The current lineup on the models overview is Fable 5.1, Opus 5.5, Sonnet 5.5 and Haiku 5.5, all with a 1M context window and 128K max output. The docs say "start with Claude Opus 5.5 for most workloads", and to use Fable 5.1 for demanding reasoning and long-horizon agentic work. https://platform.claude.com/docs/en/about-claude/models/overview (official)
2. Opus 5.5 launched 2026-09-22 at $4/$20 per MTok. The announcement says it "costs 40% less to run than Opus 5" on typical workloads at default settings and "performs at the level of Claude Fable 5.1 on most work". The per-token price is 20% below Opus 5 ($5/$25). The 40% figure is a run-cost claim, not a list-price cut. https://www.anthropic.com/claude-opus-5-5 (official)
3. Fable 5.1 and Mythos 5.1 launched 2026-09-01 at $10/$50, with cache reads at $0.25, down from $1 on Fable 5 (a 75% cut). https://platform.claude.com/docs/en/release-notes/overview (official). The anthropic.com/news list dates the "Introducing Claude Mythos and Fable 5.1" post Sep 15, 2026. That conflicts with the API date, so use 2026-09-01 for API availability. https://www.anthropic.com/news (official)
4. Mythos 5.1 has the "Same capabilities as Claude Fable 5.1". It is available only to "organizations verified through Anthropic's verification programs, such as the Cyber Verification Program". It is not a higher capability tier. https://platform.claude.com/docs/en/models/fable-5-1/whats-new-fable-5-1 (official)
5. Fable 5.1 and Mythos 5.1 carry 30-day data retention and aren't available under zero data retention (ZDR) unless Anthropic expressly authorizes it. They reject `tool_choice` `any`/`tool`, and their text output carries a statistical watermark. Same source as fact 4 (official)
6. Sonnet 5 launched 2026-06-30 at $2/$10. On 2026-08-10 that introductory price became the standard price, and the planned September 1 increase to $3/$15 "will not occur". https://platform.claude.com/docs/en/about-claude/pricing (official)
7. Sonnet 5.5 launched 2026-09-28 at $2/$10. Anthropic says it runs "30%+ faster" and "costs up to 30% less for most work" than Sonnet 5. https://www.anthropic.com/news (official)
8. Haiku 5.5 launched 2026-10-07 with a 1M context window, 128K max output and adaptive thinking. Pricing depends on prompt length: $0.10/$0.50 up to 100K tokens, $0.50/$2.50 above. It returns a 400 error for `budget_tokens`, sampling parameters, prefill and `computer_20250124`. https://platform.claude.com/docs/en/release-notes/overview (official)
9. Fable 5 and Mythos 5 launched 2026-06-09. On Friday June 12, "the US government applied export controls to our newest models". Anthropic disabled the models for all customers because it could not verify nationality in real time. The controls were lifted June 30. Fable 5 was restored globally from July 1. Mythos 5 was restored to US organizations after government approval on June 26, and broader access for Glasswing partners was still being coordinated. https://www.anthropic.com/news/redeploying-fable-5 (official). The API release notes for 2026-07-01 say "We've restored access to Claude Fable 5 and Claude Mythos 5." (official). Secondary coverage says the directive was a letter signed by Commerce Secretary Howard Lutnick with BIS. https://www.mlex.com/mlex/articles/2495889 (secondary)
10. Opus 5 launched 2026-07-24 at $5/$25 with a 1M context window. https://platform.claude.com/docs/en/release-notes/overview (official)
11. Retirements:
    - Opus 4.1 retired 2026-08-05.
    - Opus 4 and Sonnet 4 retired 2026-06-15.
    - Sonnet 4.5 was deprecated 2026-09-30 and retires 2026-11-30, with `claude-sonnet-5-5` as the replacement.
    - Mythos Preview was deprecated 2026-06-09.

    https://platform.claude.com/docs/en/about-claude/model-deprecations (official)
12. API version `2026-10-21` removes `temperature`, `top_p` and `top_k` (they return a 400 error). New major SDK versions default to it: Python 2.0.0, TypeScript 1.0.0, Go 2.0.0, Java 3.0.0, C# 13.0.0, PHP 1.0.0, Ruby 2.0.0, `ant` CLI 2.0.0. These have breaking changes and moved from the MIT license to Apache 2.0. https://platform.claude.com/docs/en/release-notes/overview (official)
13. Prompt-cache read multipliers: 0.025x on Fable 5.1 and Mythos 5.1, 0.05x on Opus 5.5 and Sonnet 5.5, 0.1x on all other models. https://platform.claude.com/docs/en/about-claude/pricing (official)
14. Claude Managed Agents is "a pre-built, configurable agent harness that runs in managed infrastructure". It is in beta under the header `managed-agents-2026-04-01` and enabled by default for all API accounts. It is billed on tokens plus $0.08 per session-hour, and it is not eligible for ZDR or HIPAA BAA coverage. https://platform.claude.com/docs/en/managed-agents/overview (official)
15. Graduated to GA on 2026-08-19:
    - Files API (no `files-api-2025-04-14` header needed).
    - Agent Skills and the `/v1/skills` API (no `skills-2025-10-02` header).
    - Computer use, as `computer_toolset_20260801`.

    A browser use toolset (`browser_toolset_20260801`) launched the same day. https://platform.claude.com/docs/en/release-notes/overview (official)
16. Web search costs $10 per 1,000 searches plus token costs. https://platform.claude.com/docs/en/about-claude/pricing (official)
17. Workbench in the Claude Console was renamed "playground" on 2026-08-18. The legacy Workbench and the experimental prompt-tools APIs were retired on 2026-08-17. https://platform.claude.com/docs/en/release-notes/overview (official)
18. In Claude Code, `opus`, `sonnet` and `haiku` resolve to Opus 5.5, Sonnet 5.5 and Haiku 5.5 on the Anthropic API. The default model on Pro, Max, Team, Enterprise and the API is Opus 5.5. "Fable is not the default on any plan or provider." A `fable` alias resolves to Fable 5.1, and a `best` alias resolves to Fable where available. https://code.claude.com/docs/en/model-config (official)
19. Claude Code's extension layer has these parts:
    - CLAUDE.md, `.claude/rules/` and output styles
    - Skills
    - Code intelligence (LSP)
    - MCP
    - Subagents
    - Dynamic workflows (scripts that run many subagents)
    - Cross-session messaging
    - Hooks, which can run a shell command, HTTP request, MCP tool call, prompt or subagent
    - Plugins and marketplaces
    - Artifacts

    https://code.claude.com/docs/en/features-overview (official)
20. The Claude Code SDK was renamed the Claude Agent SDK. Its repositories are `anthropics/claude-agent-sdk-typescript` and `claude-agent-sdk-python`. https://code.claude.com/docs/en/agent-sdk/migration-guide (official)
21. The latest Claude Code CHANGELOG entry is 2.1.310 (no date in the file). https://raw.githubusercontent.com/anthropics/claude-code/main/CHANGELOG.md (official)
22. Plans on claude.com/pricing (individual, 2026-10-26):
    - Free: $0.
    - Pro: $20/month, or $17/month billed annually ($200 up front).
    - Max: from $100/month.
    - Team Standard seat: $25 monthly or $20 annual.
    - Team Premium seat: $125 monthly or $100 annual.

    Claude Code is included on every plan except Free. https://claude.com/pricing (official)
23. "Claude Cowork is now just Claude" (2026-09-16): Cowork and chat merge into one Claude app, rolling out to Pro and Max first. https://claude.com/blog/cowork-is-now-claude (official)
24. The Claude Tag API (settings for Claude in Slack) entered beta for Enterprise on 2026-10-20 under the header `experimental-claude-tag-2026-10-21`. https://platform.claude.com/docs/en/release-notes/overview (official)
25. MCP's latest spec revision is 2026-07-28. The previous one was 2025-11-25. https://modelcontextprotocol.io/specification/2026-07-28/changelog (official). Main changes:
    - The protocol is stateless: the `initialize` handshake and `Mcp-Session-Id` are removed.
    - Servers must implement `server/discover`.
    - `subscriptions/listen` replaces the GET stream and resource subscribe.
    - Multi Round-Trip Requests (`input_required`) replace server-initiated requests.
    - Tasks moved out of the core into an extension.
    - Roots, Sampling and Logging are deprecated.
    - OAuth Dynamic Client Registration is deprecated in favour of Client ID Metadata Documents.
    - A deprecation policy with a 12-month minimum window was adopted.
26. MCP's legal entity is "Model Context Protocol a Series of LF Projects, LLC". The lead maintainers are David Soria Parra and Den Delimarsky. https://modelcontextprotocol.io/community/governance (official)
27. The Agentic AI Foundation (AAIF) sits under the Linux Foundation and was co-founded by Anthropic, Block and OpenAI. It hosts MCP, Agent Skills, A2A, AGENTS.md, goose and Agent Router. https://aaif.io/ (official). https://www.anthropic.com/news/donating-agent-skills-to-the-agentic-ai-foundation (official)
28. Anthropic donated Agent Skills to AAIF on 2026-10-22, including the name, logo, GitHub org and the agentskills.io domain. Anthropic published the standard in December 2025, and "More than 70 agent platforms" have integrated it. https://www.anthropic.com/news/donating-agent-skills-to-the-agentic-ai-foundation (official)
29. A2A was accepted as a Growth Stage project at AAIF on 2026-08-27, with a "stable v1.0 specification". The latest GitHub release is v1.0.1. https://a2a-protocol.org/latest/blog/2026/08/27/a-new-chapter-for-a2a-joining-the-agentic-ai-foundation/ (official). https://github.com/a2aproject/A2A/releases (official)
30. Agent Skills format: a folder containing `SKILL.md`, which needs `name` and `description` frontmatter at minimum. Optional folders are `scripts/`, `references/` and `assets/`. https://agentskills.io/ (official)
31. AGENTS.md is "a simple, open format for guiding coding agents" and is listed as an AAIF project. https://agents.md/ (official). https://aaif.io/ (official)
32. docs.anthropic.com and docs.claude.com redirect (301/302) to platform.claude.com/docs (curl check, 2026-10-26) (official)

## Site claim audit

| file:line | claim | verdict | correct value | source |
|---|---|---|---|---|
| app/lib/seed/tools.ts:29 | Fable 5.1 "$10/$50 per MTok, cached reads ~$0.25/MTok" | CONFIRMED | $10/$50; cache read $0.25 | https://platform.claude.com/docs/en/about-claude/pricing |
| app/lib/seed/tools.ts:38 | Opus 5.5 is "Anthropic's newest model" | WRONG (stale) | Sonnet 5.5 (2026-09-28) and Haiku 5.5 (2026-10-07) are newer. Opus 5.5 is the recommended default. | https://platform.claude.com/docs/en/release-notes/overview |
| app/lib/seed/tools.ts:42 | Opus 5.5 "Costs ~40% less than Opus 5 on typical workloads" | CONFIRMED | Anthropic's own claim. List price is $4/$20 vs $5/$25, which is 20% lower per token. | https://www.anthropic.com/claude-opus-5-5 |
| app/lib/seed/tools.ts:55 | Opus 5.5 pricing "check Anthropic for current rates" | INCOMPLETE | $4 / $20 per MTok, cache read $0.20 | https://platform.claude.com/docs/en/about-claude/pricing |
| app/lib/seed/tools.ts:60-80 | Sonnet 5 "$2/$10 per MTok" | CONFIRMED (price), but superseded model | $2/$10 is now the standard price. The current Sonnet is Sonnet 5.5 (`claude-sonnet-5-5`), also $2/$10. | https://platform.claude.com/docs/en/about-claude/pricing |
| data/dictionary.ts:759 | "Opus is the newest reasoning/coding model and matches Fable on most work at a lower cost" | PARTLY WRONG | "Matches Fable on most work" is confirmed. "Newest" is stale (Haiku 5.5 is newest). | https://www.anthropic.com/claude-opus-5-5 |
| data/dictionary.ts:759 | "Mythos is an invite-only research tier above Fable, not generally available" | WRONG | Mythos 5.1 has the "same capabilities as Claude Fable 5.1". It is limited to orgs verified through Anthropic's verification programs (for example the Cyber Verification Program). It is not "above" Fable. | https://platform.claude.com/docs/en/models/fable-5-1/whats-new-fable-5-1 |
| data/dictionary.ts:748-755 | aliases "Fable 5.1", "Opus 5.5", "Sonnet 5", "Haiku" | STALE | Add Sonnet 5.5 and Haiku 5.5. Sonnet 5 is legacy. | https://platform.claude.com/docs/en/about-claude/models/overview |
| app/lib/seed/webguide.ts:178 | "Haiku 4.5 = cheapest & fastest… Sonnet 5 = best balance, recommended for most apps" | WRONG (stale) | Current models are Haiku 5.5 and Sonnet 5.5. The docs now recommend starting with Opus 5.5 for most workloads. | https://platform.claude.com/docs/en/about-claude/models/overview |
| app/lib/seed/webguide.ts:196 | badge "docs.anthropic.com" | STALE | Docs live at platform.claude.com/docs (old domain 301-redirects) | curl check 2026-10-26 |
| app/lib/seed/webguide.ts:206 | code sample `model: "claude-sonnet-4-6"` | STALE (still works) | Sonnet 4.6 is legacy (Active, retirement not before 2027-02-17). Use `claude-sonnet-5-5`, or `claude-opus-5-5` per docs guidance. TypeScript SDK 1.0.0 (2026-10-21) has breaking changes, so re-test the sample. | https://platform.claude.com/docs/en/about-claude/model-deprecations |
| app/lib/seed/devtools.ts:32 | Claude Code "now running on Opus 5.5 by default" | CONFIRMED | Default on Pro, Max, Team, Enterprise and API | https://code.claude.com/docs/en/model-config |
| app/lib/seed/devtools.ts:32, 94 | "Strongest SWE-bench scores" / "#1 on SWE-bench" | UNVERIFIABLE | No current leaderboard checked | n/a |
| app/lib/seed/devtools.ts:107 | Opus 5.5 is "Anthropic's newest model… Matches flagship Fable 5.1 on most work at ~40% lower cost. Powers Claude Code by default." | PARTLY WRONG | "Newest" is stale. The other claims are confirmed. Note the 40% is lower cost than Opus 5, not lower than Fable. | https://www.anthropic.com/claude-opus-5-5 |
| app/lib/seed/claude.ts:14-57 | built-in agent names (claude, general-purpose, Explore, Plan, claude-code-guide, statusline-setup) | UNVERIFIABLE from public docs | These match the local harness listing. Not checked against docs. | n/a |
| app/claude-hub/page.tsx:7-10 | Sep 22, 2026: Opus 5.5 ships; default Opus in Claude Code; 1M context; ~40% cheaper than Opus 5; matches Fable 5.1 | CONFIRMED | n/a | https://www.anthropic.com/claude-opus-5-5 ; https://code.claude.com/docs/en/model-config |
| app/claude-hub/page.tsx:15-18 | Sep 1, 2026: Fable 5.1 succeeds Fable 5 at $10/$50, cache reads cut 75% to $0.25 | CONFIRMED | ($1 to $0.25) | https://platform.claude.com/docs/en/release-notes/overview |
| app/claude-hub/page.tsx:23-26 | "Sonnet 5 ran at $2/$10 through Aug 31; it's now at the standard $3/$15 rate" | WRONG | On 2026-08-10, $2/$10 became the standard price, and the $3/$15 increase "will not occur". | https://platform.claude.com/docs/en/about-claude/pricing |
| app/lib/seed/updates.ts:19-22 | Fable 5 released June 9; 1M context; always-on adaptive thinking; GA on API/Bedrock/Google Cloud/Foundry; Mythos 5 limited to approved customers under Project Glasswing | CONFIRMED (incomplete) | Release date, context and thinking are confirmed. The item omits that both models were disabled June 12 to July 1 under US export controls. Mythos 5 access is now via verification programs (US orgs first). | https://platform.claude.com/docs/en/release-notes/overview ; https://www.anthropic.com/news/redeploying-fable-5 |
| app/lib/seed/updates.ts:30 | "Anthropic's Claude Fable 5 (Jun 9)" | CONFIRMED | Other labs' items are out of scope | https://platform.claude.com/docs/en/release-notes/overview |
| app/lib/seed/updates.ts:70 | Mythos 5 invitation-only under Glasswing; Fable 5 GA | CONFIRMED as of June; STALE now | Current successors are Fable 5.1 (GA) and Mythos 5.1 (verified orgs) | https://platform.claude.com/docs/en/about-claude/pricing |
| (removed in commit 434e123; flagged in audits/os-audit-2026-08-07.md:31) | "a US export-control directive suspended Fable 5 and Mythos 5 on June 12" | CONFIRMED | Anthropic: "On Friday, June 12, the US government applied export controls to our newest models". Access was disabled for all customers. The controls were lifted June 30, and Fable 5 was restored July 1. The removal was a false negative, so the item can be restored with this source. | https://www.anthropic.com/news/redeploying-fable-5 |
| app/lib/seed/updates.ts:43 | "Claude Tag" exists | CONFIRMED (existence) | Claude Tag is Claude in Slack. The API entered Enterprise beta on 2026-10-20. | https://platform.claude.com/docs/en/release-notes/overview |
| app/lib/seed/webguide.ts:190 | MCP is "Anthropic's open standard" | STALE framing | MCP was created by Anthropic but is now an LF Projects series hosted under AAIF (Linux Foundation) | https://modelcontextprotocol.io/community/governance ; https://aaif.io/ |

## New developments since June 2026 worth covering

- 2026-06-09: Fable 5 and Mythos 5 launch, and Mythos Preview is deprecated. https://platform.claude.com/docs/en/release-notes/overview
- 2026-06-12 to 2026-07-01: US export controls force Anthropic to disable Fable 5 and Mythos 5 globally. The controls were lifted June 30. https://www.anthropic.com/news/redeploying-fable-5
- 2026-06-26: usage tiers consolidated into Start, Build and Scale, with raised rate limits. https://platform.claude.com/docs/en/release-notes/overview
- 2026-06-30: Sonnet 5 launches. Its $2/$10 price was made permanent on 2026-08-10. https://platform.claude.com/docs/en/about-claude/pricing
- 2026-07-24: Opus 5 launches. Effort (`low` to `max`) becomes the primary control, and server-side `fallbacks` gets a beta. https://platform.claude.com/docs/en/release-notes/overview
- 2026-07-28: MCP spec revision 2026-07-28 makes the protocol stateless, adds MRTR, moves Tasks to an extension and deprecates Roots, Sampling and Logging. https://modelcontextprotocol.io/specification/2026-07-28/changelog
- 2026-08-19: Files API, Agent Skills/`/v1/skills` and computer use (`computer_toolset_20260801`) go GA, and the new browser use toolset launches. https://platform.claude.com/docs/en/release-notes/overview
- 2026-08-27: A2A joins AAIF as a Growth Stage project. https://a2a-protocol.org/latest/blog/2026/08/27/a-new-chapter-for-a2a-joining-the-agentic-ai-foundation/
- 2026-09-01: Fable 5.1 and Mythos 5.1 launch. They add text watermarking and C2PA Content Credentials, and these betas: turn-scoped system messages, per-message effort and `thinking.display: "updates"`. https://platform.claude.com/docs/en/models/fable-5-1/whats-new-fable-5-1
- 2026-09-14: compaction on demand enters beta (`compact-2026-09-04`). https://platform.claude.com/docs/en/release-notes/overview
- 2026-09-16: Claude Cowork merges into the main Claude app. https://claude.com/blog/cowork-is-now-claude
- 2026-09-22: Opus 5.5 launches at $4/$20 and becomes the Claude Code default. Fast mode GA followed on 2026-10-15. https://www.anthropic.com/claude-opus-5-5
- 2026-09-28: Sonnet 5.5 launches. https://platform.claude.com/docs/en/release-notes/overview
- 2026-09-30: Sonnet 4.5 deprecated, retiring 2026-11-30. https://platform.claude.com/docs/en/about-claude/model-deprecations
- 2026-10-07: Haiku 5.5 launches with prompt-length tiered pricing, and Max and Team plans start including monthly API credits. https://platform.claude.com/docs/en/release-notes/overview
- 2026-10-09: Managed Agents dynamic workflows (multiagent) enter beta. https://platform.claude.com/docs/en/release-notes/overview
- 2026-10-14: OpenTelemetry export enters beta. https://platform.claude.com/docs/en/release-notes/overview
- 2026-10-21: API version `2026-10-21` removes sampling params, and major SDK versions move to Apache 2.0. https://platform.claude.com/docs/en/release-notes/overview
- 2026-10-22: Agent Skills donated to AAIF. https://www.anthropic.com/news/donating-agent-skills-to-the-agentic-ai-foundation

## Terminology

| term | definition | docs URL |
|---|---|---|
| Adaptive thinking | The model decides how much to think, steered by the `effort` parameter. It is the only thinking mode on current models. | https://platform.claude.com/docs/en/build-with-claude/thinking |
| Effort | Request parameter (`low` to `max`) that controls thinking depth and token spend. It is the primary control from Opus 5 on, and can change mid-conversation (beta). | https://platform.claude.com/docs/en/build-with-claude/effort |
| Agent harness | The loop, tools, runtime and context management around a model. Managed Agents is Anthropic's "pre-built, configurable agent harness". | https://platform.claude.com/docs/en/managed-agents/overview |
| Claude Managed Agents | Anthropic-hosted agent runtime (agents, environments, sessions, events), billed on tokens plus session-hours. Beta. | https://platform.claude.com/docs/en/managed-agents/overview |
| Context engineering | Curating the full set of tokens (system prompt, tools, retrieved data, history) an agent sees at each step. Anthropic presents it as the successor to prompt engineering. | https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents |
| Agent Skills | An open format: a folder with `SKILL.md` (name and description plus instructions) and optional scripts, references and assets, loaded on demand. Stewarded by AAIF. | https://agentskills.io/ |
| Subagents | Claude Code workers with an isolated context window that return a summary to the caller | https://code.claude.com/docs/en/sub-agents |
| Dynamic workflows | Scripts Claude writes that run many subagents in the background and return one result. Claude Code feature; also a Managed Agents beta. | https://code.claude.com/docs/en/workflows |
| Hooks | Deterministic actions (shell, HTTP, MCP tool, prompt or subagent) fired on Claude Code lifecycle events. Used for guardrails. | https://code.claude.com/docs/en/hooks-guide |
| Plugins / marketplaces | The packaging and distribution unit that bundles skills, hooks, subagents and MCP servers | https://code.claude.com/docs/en/plugins/overview |
| Claude Agent SDK | Library (TypeScript and Python) that exposes the Claude Code harness for building agents | https://code.claude.com/docs/en/agent-sdk/overview |
| Compaction | Server-side summarizing of old context so long sessions fit the window. On-demand compaction is in beta. | https://platform.claude.com/docs/en/build-with-claude/compaction |
| Mid-conversation system messages | `role: "system"` messages placed inside `messages`. Turn-scoped ones use `clear_at`. | https://platform.claude.com/docs/en/build-with-claude/mid-conversation-system-messages |
| Advisor tool | Beta tool that lets an executor model consult a more capable advisor model | https://platform.claude.com/docs/en/agents-and-tools/tool-use/advisor-tool |
| Refusal fallback | `stop_reason: "refusal"` plus a `fallbacks` parameter that retries on a permitted model | https://platform.claude.com/docs/en/build-with-claude/refusals-and-fallback |
| Fast mode | Higher-speed inference at premium prices (Opus 5.5: up to 2.5x speed, $8/$40) | https://platform.claude.com/docs/en/about-claude/pricing |
| MCP Multi Round-Trip Requests (MRTR) | Server returns `input_required`, and the client retries with `inputResponses`. Replaces server-initiated sampling and elicitation requests. | https://modelcontextprotocol.io/specification/2026-07-28/changelog |
| MCP Apps / Tasks extensions | Optional MCP extensions: inline interactive UI, and async long-running operations | https://modelcontextprotocol.io/specification/latest |
| AAIF (Agentic AI Foundation) | Linux Foundation body hosting MCP, A2A, AGENTS.md, Agent Skills, goose and Agent Router | https://aaif.io/ |
| A2A (Agent2Agent) | Open protocol for agent-to-agent discovery, task delegation and exchange. Stable v1.0. AAIF project. | https://a2a-protocol.org/latest/ |
| AGENTS.md | Repo-root markdown file that gives coding agents build, test and convention context | https://agents.md/ |

Deprecated or renamed terms:
- **Extended thinking** (`thinking.type: "enabled"` + `budget_tokens`) was replaced by adaptive thinking. It is deprecated on Opus 4.6 and Sonnet 4.6 and not accepted on later models.
- **`temperature` / `top_p` / `top_k`** are removed in API version `2026-10-21`. Steer with prompting instead.
- **Forced tool use** (`tool_choice` `any`/`tool`) is rejected on Fable 5.1, Mythos 5.1 and Opus 5.5. Use strict tool use or structured outputs.
- **Claude Code SDK** was renamed the **Claude Agent SDK**.
- **Workbench** was renamed **playground** (2026-08-18).
- **Claude Cowork** was merged into **Claude** (2026-09-16 onward).
- **docs.anthropic.com** moved to **platform.claude.com/docs**.
- **MCP Roots, Sampling and Logging** are deprecated in the 2026-07-28 revision (12-month window).
- **MCP HTTP+SSE transport** is formally Deprecated. Use Streamable HTTP.
- **OAuth Dynamic Client Registration** in MCP is deprecated in favour of Client ID Metadata Documents.
- **MCP `initialize` handshake and `Mcp-Session-Id`** are removed (stateless MCP).
- **Claude Mythos Preview** was deprecated 2026-06-09. Successors are Mythos 5 and Mythos 5.1.

## Could not verify

- An anthropic.com announcement page for Fable 5.1 / Mythos 5.1. `/claude-fable-5-1` returned 404. Facts come from the docs. The news index dates the post Sep 15, while the API release notes date the launch Sep 1. Treat Sep 1 as API availability.
- Which agency issued the June 12 export-control directive. Anthropic says "the US government". Commerce/BIS and Lutnick's signature come from secondary reporting only.
- Release dates for Opus 4.5 to 4.8, Sonnet 4.5/4.6 and Haiku 4.5. They are not in the release-note range read here. Retirement floors are given instead.
- Haiku 4.5's status after its "not sooner than October 15, 2026" floor passed. It is still listed Active.
- The A2A v1.0.1 release year: GitHub shows "28 May" with no year in the fetched view.
- Whether AAIF is formally a "directed fund": this comes from secondary sources only. aaif.io and the A2A blog say "under the Linux Foundation" and "Linux Foundation-directed AAIF".
- SWE-bench "#1" claims for Claude Code or Opus 5.5: not checked against a current leaderboard.
- Context windows for Opus 4.5, Sonnet 4.5 and Haiku 4.5: not shown on the pages read.
- The release date of Claude Code 2.1.310: the CHANGELOG has no dates.
