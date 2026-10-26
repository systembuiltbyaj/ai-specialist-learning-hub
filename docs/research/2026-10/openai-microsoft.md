# OpenAI & Microsoft — verified 2026-10-26

Sources were read on 2026-10-26. openai.com/index/* and help.openai.com return HTTP 403 to automated fetches, so the OpenAI facts below come from developers.openai.com (API docs, changelog, deprecations, pricing) and learn.chatgpt.com (ChatGPT/Codex docs). Both are official.

## Model registry rows

| id | vendor | display name | API model id | tier | released | status | context window | pricing note (per MTok, seen 2026-10-26) | source URL |
|---|---|---|---|---|---|---|---|---|---|
| gpt-6-astra | OpenAI | GPT-6 Astra | `gpt-6-astra` | flagship | 2026-09-03 | current | 1,050,000 (922K max input, 128K max output) | $10 in / $1 cached / $12.50 cache write / $50 out; >272K-token prompts: 2x input and 1.5x output for the whole request; Batch/Flex 50%; Fast 2x | https://developers.openai.com/api/docs/models/gpt-6-astra |
| gpt-6-1-sol | OpenAI | GPT-6.1 Sol | `gpt-6.1-sol` | balanced | 2026-09-29 | current | 1,050,000 (922K in / 128K out) | $2 in / $0.10 cached / $2.50 cache write / $10 out; Ultrafast 6x | https://developers.openai.com/api/docs/models/gpt-6.1-sol |
| gpt-6-sol | OpenAI | GPT-6 Sol | `gpt-6-sol` | reasoning | 2026-09-22 | current | 1,050,000 (922K in / 128K out) | $2 in / $0.20 cached / $2.50 cache write / $10 out | https://developers.openai.com/api/docs/models/gpt-6-sol |
| gpt-6-luna | OpenAI | GPT-6 Luna | `gpt-6-luna` | fast | 2026-09-22 | current | 1,050,000 (922K in / 128K out) | $0.10 in / $0.01 cached / $0.125 cache write / $0.50 out | https://developers.openai.com/api/docs/models/gpt-6-luna |
| gpt-5-6-sol | OpenAI | GPT-5.6 Sol | `gpt-5.6-sol` (alias `gpt-5.6`) | flagship (previous gen) | 2026-07-09 | current, superseded | 1,050,000 | $4 in / $0.40 cached / $20 out (promo price, "at least through November 21, 2026") | https://developers.openai.com/api/docs/models/gpt-5.6-sol |
| gpt-5-6-terra | OpenAI | GPT-5.6 Terra | `gpt-5.6-terra` | balanced (previous gen) | 2026-07-09 | current, superseded | 1,050,000 | $2 in / $0.20 cached / $12 out | https://developers.openai.com/api/docs/models/gpt-5.6-terra |
| gpt-5-6-luna | OpenAI | GPT-5.6 Luna | `gpt-5.6-luna` | fast (previous gen) | 2026-07-09 | current, superseded | 1,050,000 | $0.20 in / $0.02 cached / $1.20 out | https://developers.openai.com/api/docs/models/gpt-5.6-luna |
| gpt-5-5 | OpenAI | GPT-5.5 | `gpt-5.5` (snapshot `gpt-5.5-2026-04-23`) | flagship (older) | 2026-04-24 (API) | legacy; retired from Codex with ChatGPT sign-in on 2026-10-14, API unaffected | 1,050,000 | $5 in / $0.50 cached / $30 out | https://developers.openai.com/api/docs/models/gpt-5.5 |
| gpt-5-4 | OpenAI | GPT-5.4 | `gpt-5.4` | balanced (older) | 2026-03-05 | legacy | not checked | $2.50 in / $0.25 cached / $15 out | https://developers.openai.com/api/docs/changelog |
| gpt-5-4-mini | OpenAI | GPT-5.4 mini | `gpt-5.4-mini` | fast (older) | 2026-03-17 | legacy | 400,000 | $0.75 in / $0.075 cached / $4.50 out | https://developers.openai.com/api/docs/models/gpt-5.4-mini |
| gpt-5-4-nano | OpenAI | GPT-5.4 nano | `gpt-5.4-nano` | fast | 2026-03-17 | deprecated, shuts down 2027-04-01 (use `gpt-6-luna`) | not checked | $0.20 in / $0.02 cached / $1.25 out | https://developers.openai.com/api/docs/deprecations |
| gpt-5-3-codex | OpenAI | GPT-5.3-Codex | `gpt-5.3-codex` | other (coding) | 2026-02-24 (API) | deprecated, shuts down 2027-04-01 (use `gpt-6-sol`) | not checked | not checked | https://developers.openai.com/api/docs/deprecations |
| gpt-5-1 | OpenAI | GPT-5.1 | `gpt-5.1` | balanced | — | deprecated, shuts down 2027-04-01 (use `gpt-6-sol`) | — | — | https://developers.openai.com/api/docs/deprecations |
| gpt-5 | OpenAI | GPT-5 / mini / nano / pro | `gpt-5`, `gpt-5-mini`, `gpt-5-nano`, `gpt-5-pro` | — | — | deprecated, shut down 2026-12-11 (use the matching gpt-5.6 model) | — | — | https://developers.openai.com/api/docs/deprecations |
| o3 | OpenAI | o3 / o3-pro | `o3`, `o3-pro` | reasoning | — | deprecated, shut down 2026-12-11 (use `gpt-5.6-sol`) | — | — | https://developers.openai.com/api/docs/deprecations |
| gpt-4o-family | OpenAI | GPT-4o, GPT-4o mini, GPT-4.1, GPT-4.1 mini (listed snapshots) | `gpt-4o-2024-08-06`, `gpt-4o-2024-11-20`, `gpt-4o-mini-2024-07-18`, `gpt-4.1-2025-04-14`, `gpt-4.1-mini-2025-04-14` | — | — | deprecated, shut down 2027-01-14 (use `gpt-6-luna`) | — | — | https://developers.openai.com/api/docs/deprecations |
| legacy-retired-2026-10-23 | OpenAI | GPT-3.5 Turbo, GPT-4, GPT-4 Turbo, GPT-4.1 nano, gpt-4o-2024-05-13, o1, GPT Image 1 | `gpt-3.5-turbo`, `gpt-4`, `gpt-4-turbo`, `gpt-4.1-nano`, `o1`, `gpt-image-1` | — | — | retired 2026-10-23 | — | — | https://developers.openai.com/api/docs/deprecations |
| gpt-5-6-cyber | OpenAI | GPT-5.6 Cyber | `gpt-5.6-cyber` | other (restricted, Daybreak Red) | 2026-08-07 (Daybreak tiers) | current, approval required | not checked | see pricing page | https://developers.openai.com/api/docs/models/gpt-5.6-cyber |
| gpt-rosalind | OpenAI | GPT-Rosalind | `gpt-rosalind-research` | other (life sciences, trusted access) | 2026-09-08 (GA) | current, approval required | not checked | $5 in / $0.50 cached / $25 out; billing from 2026-10-05 | https://developers.openai.com/api/docs/changelog |
| gpt-oss-120b | OpenAI | gpt-oss-120b | `gpt-oss-120b` | open-weight | — | current (listed) | 131,072 | open weights, no OpenAI token price listed | https://developers.openai.com/api/docs/models/gpt-oss-120b |
| gpt-oss-20b | OpenAI | gpt-oss-20b | `gpt-oss-20b` | open-weight | — | current (listed) | not checked | open weights | https://developers.openai.com/api/docs/models |
| gpt-live-1 | OpenAI | GPT-Live 1 | `gpt-live-1` | other (full-duplex voice) | 2026-09-10 (GA) | current | n/a | $0.05 per minute, billed per second; backend model billed separately | https://developers.openai.com/api/docs/models/gpt-live-1 |
| gpt-realtime-2-1 | OpenAI | GPT-Realtime-2.1 / 2.1 mini | `gpt-realtime-2.1`, `gpt-realtime-2.1-mini` | other (realtime voice) | 2026-07-06 | current | 128,000 | 2.1: text $4 in / $0.40 cached / $24 out; audio in $32 | https://developers.openai.com/api/docs/models/gpt-realtime-2.1 |
| gpt-realtime-legacy | OpenAI | GPT-Realtime, GPT-Realtime mini, GPT-Audio, GPT-4o realtime/audio | `gpt-realtime`, `gpt-realtime-mini`, `gpt-audio`, `gpt-audio-mini`, `gpt-4o-realtime`, `gpt-4o-audio` … | — | — | deprecated, shut down 2027-01-20 | — | — | https://developers.openai.com/api/docs/deprecations |
| gpt-transcribe | OpenAI | GPT Transcribe / GPT Live Transcribe | `gpt-transcribe`, `gpt-live-transcribe` | other (speech-to-text) | 2026-07-28 | current | n/a | see pricing | https://developers.openai.com/api/docs/changelog |
| whisper-1 | OpenAI | Whisper + gpt-4o(-mini)-transcribe(-diarize) | `whisper-1` etc. | — | — | deprecated, shut down 2027-02-26 | — | — | https://developers.openai.com/api/docs/deprecations |
| tts-1 | OpenAI | TTS-1, TTS-1 HD, gpt-4o-mini-tts | `tts-1`, `tts-1-hd`, `gpt-4o-mini-tts` | — | — | deprecated, shut down 2027-01-06 (use `gpt-realtime-2.1-mini`) | — | — | https://developers.openai.com/api/docs/deprecations |
| gpt-image-2-5 | OpenAI | GPT Image 2.5 Sunburst / Flare | `gpt-image-2.5-sunburst`, `gpt-image-2.5-flare` | other (image) | 2026-09-08 | current | n/a | GPT Image 2 token rates | https://developers.openai.com/api/docs/changelog |
| gpt-image-2 | OpenAI | GPT Image 2 | `gpt-image-2` | other (image) | 2026-04-21 | current | n/a | see pricing | https://developers.openai.com/api/docs/models/gpt-image-2 |
| sora-2 | OpenAI | Sora 2 / Sora 2 Pro + Videos API | `sora-2`, `sora-2-pro` | other (video) | — | retired 2026-09-24, no replacement API | — | — | https://developers.openai.com/api/docs/models/sora-2 |
| codex-mini-latest | OpenAI | codex-mini-latest | `codex-mini-latest` | other (coding) | — | listed, legacy | 200,000 | $1.50 in / $0.375 cached / $6 out | https://developers.openai.com/api/docs/models/codex-mini-latest |
| chat-latest | OpenAI | Chat Latest | `chat-latest` | other (alias to ChatGPT model) | snapshot updated 2026-10-07 | current, not recommended for production | — | — | https://developers.openai.com/api/docs/changelog |

## Verified facts

1. GPT-6 Astra (`gpt-6-astra`) shipped in the API on Sep 3, 2026, described as "our most capable model, built for the hardest end-to-end work". It doesn't support `none` reasoning effort, custom temperature, top_p or logprobs. Tool calling needs the Responses API. — https://developers.openai.com/api/docs/changelog — (official)
2. GPT-6 Astra has a 1,050,000-token context window (922K max input, 128K max output) and an Apr 30, 2026 knowledge cutoff. Its reasoning effort goes from low to max. — https://developers.openai.com/api/docs/models/gpt-6-astra — (official)
3. GPT-6 Astra standard pricing is $10 input, $1 cached, $12.50 cache write and $50 output per MTok. Prompts over 272K tokens cost 2x input and 1.5x output. — https://developers.openai.com/api/docs/models/gpt-6-astra — (official)
4. Three Responses API features launched with Astra on Sep 3, 2026: async tool calling, mid-turn steering over WebSockets, and changing reasoning effort mid-conversation. — https://developers.openai.com/api/docs/changelog — (official)
5. The models page now recommends three models: GPT-6 Astra as the flagship for complex reasoning and coding, GPT-6.1 Sol to balance intelligence and cost, and GPT-6 Luna for cost-sensitive, high-volume work. — https://developers.openai.com/api/docs/models — (official)
6. GPT-6 Sol and GPT-6 Luna were released Sep 22, 2026. GPT-6.1 Sol was released Sep 29, 2026, "for complex coding and professional work at a lower cost than GPT-6 Astra", with Multi-agent support in beta. — https://developers.openai.com/api/docs/changelog — (official)
7. The GPT-5.6 family (Sol, Terra, Luna) was released Jul 9, 2026. Fast mode replaced Priority Processing on Jul 30, 2026. — https://developers.openai.com/api/docs/changelog — (official)
8. Ultrafast mode is a service tier (`service_tier: "ultrafast"`). It is available for GPT-6 Astra (Sep 29) and GPT-6.1 Sol (Oct 8), and in the Agents API (Oct 16). On GPT-6.1 Sol it costs 6x the Standard price. — https://developers.openai.com/api/docs/changelog — (official)
9. The Agents API went to public beta on Sep 10, 2026. It is a managed Codex harness with durable sessions, MCP support, and sandboxes that are either OpenAI-hosted or your own. Computer use was added Sep 29. — https://developers.openai.com/api/docs/changelog — (official)
10. The Assistants API shut down on Aug 26, 2026. The migration path is the Responses API plus the Conversations API. — https://developers.openai.com/api/docs/changelog — (official)
11. Agent Builder was deprecated on Jun 3, 2026 and shuts down Nov 30, 2026. ChatKit remains. The migration path is the Agents SDK or ChatGPT Workspace Agents. The Evals platform and reusable prompt objects also shut down Nov 30, 2026. — https://developers.openai.com/api/docs/deprecations — (official)
12. The Agents SDK was updated, and the TypeScript version gained sandbox agents and an open-source harness on May 6, 2026. — https://developers.openai.com/api/docs/changelog — (official)
13. GPT-Live 1 (`gpt-live-1`) became generally available Sep 10, 2026. It is full-duplex voice at $0.05/min, and it delegates reasoning to a backend model. — https://developers.openai.com/api/docs/models/gpt-live-1 — (official)
14. The Decisions API launched in beta Oct 6, 2026 and reached general availability Oct 22, 2026, running on `gpt-6-luna`. It turns text and images into typed answers. — https://developers.openai.com/api/docs/changelog — (official)
15. The Sora 2 models and the Videos API shut down on Sep 24, 2026 with "no one-to-one replacement API". The deprecation was announced Mar 24, 2026. — https://developers.openai.com/api/docs/models/sora-2 — (official)
16. The Sora consumer app shut down on Apr 26, 2026, as part of a two-stage shutdown announced Mar 24, 2026. — https://the-decoder.com/openai-sets-two-stage-sora-shutdown-with-app-closing-april-2026-and-api-following-in-september/ — (secondary)
17. Codex today covers the Codex CLI, the IDE extension, Codex Cloud, Codex in the ChatGPT desktop app, the Codex SDK, the App Server and a GitHub Action. It is not "a code model via API". — https://developers.openai.com/codex/llms.txt — (official)
18. Codex is included in ChatGPT plans: Free $0, Go $8, Plus $20, Pro $100/$200/$500 a month, Business $20/user/month billed annually ($25 monthly), plus Enterprise & Edu. It can also run on an API key at API token prices, without the cloud features. — https://developers.openai.com/codex/pricing — (official)
19. GPT-5.5 retired from Codex for ChatGPT sign-in on Oct 14, 2026. The replacement is GPT-6.1 Sol on paid plans and GPT-6 Luna on Free and Go. — https://developers.openai.com/codex/models — (official)
20. ChatGPT Work is a mode that brings the technology behind Codex into ChatGPT for longer, multi-step tasks. — https://learn.chatgpt.com/docs/get-started-with-work.md — (official)
21. DevDay 2026 was Sep 29, 2026. It introduced "dots" (always-on agents with their own cloud computer), ChatGPT Space (Pages), cross-device Work, Astra Ultrafast in Codex, and reusable Codex Cloud environments. — https://learn.chatgpt.com/docs/whats-new/devday-2026.md — (official)
22. GPT-6 Astra Ultrafast in Codex and ChatGPT Work requires the Pro $500/month plan or an eligible Enterprise or Edu plan. — https://learn.chatgpt.com/docs/whats-new/september-28-october-2-2026.md — (official)
23. In ChatGPT and Codex, Free and Go get GPT-6 Luna, and Plus gets GPT-6.1 Sol and GPT-6 Luna. — https://learn.chatgpt.com/docs/pricing.md — (official)
24. GPT-6 Astra rolled out first to Daybreak/enterprise early access. Secondary outlets report that OpenAI rated it "Critical" for cybersecurity under its Preparedness Framework. — https://itbrief.co.uk/story/openai-launches-gpt-6-astra-for-paid-chatgpt-users — (secondary)
25. GitHub Copilot plans: Free; Student (free); Pro $10/mo; Pro+ $39/mo; Max $100/mo; Business $19/seat/mo; Enterprise $39/seat/mo. Every plan includes Copilot CLI and the Copilot app. — https://docs.github.com/en/copilot/get-started/plans — (official)
26. Copilot moved to usage-based billing with "GitHub AI Credits" on Jun 1, 2026, replacing premium requests. Code completions and next edit suggestions don't consume credits on paid plans. Org overage costs $0.01 per credit. — https://github.blog/changelog/2026-06-01-updates-to-github-copilot-billing-and-plans/ — (official)
27. "Copilot coding agent" is now called "Copilot cloud agent" in GitHub's plan docs, next to agent mode, code review, MCP and third-party agents (public preview). — https://docs.github.com/en/copilot/get-started/plans — (official)
28. Copilot is multi-vendor. The GitHub changelog added Claude Haiku 5.5 (Oct 7, 2026) and Gemini 4 Argon (Oct 13, 2026) to Copilot. — https://github.blog/changelog/label/copilot/ — (official)
29. Microsoft 365 Copilot (enterprise add-on) costs $30.00/user/month, paid yearly. Copilot Chat is included at no extra cost for eligible Entra users. Agents, Copilot Cowork and connectors are metered. — https://www.microsoft.com/en-us/copilot/pricing/enterprise — (official)
30. Microsoft 365 Copilot Business add-on: $21 list, $18 promo on annual billing from Jul 1 to Dec 31, 2026 (first year only), or $25.20 monthly. Business Standard with Copilot is $23.50 and Business Premium with Copilot is $32.00 (annual). — https://www.microsoft.com/en-us/copilot/pricing/business — (official)
31. The current brand is "Microsoft Foundry". It was previously Azure AI Studio / Azure AI Foundry, and Azure AI Services is now "Foundry Tools". The Foundry Agent API moved from Assistants (Agents v0.5/v1) to Responses (Agents v2). The catalog has more than 10,000 models, including OpenAI and Anthropic. — https://learn.microsoft.com/en-us/azure/ai-foundry/what-is-azure-ai-foundry — (official)
32. Microsoft Agent Framework "combines AutoGen's simple agent abstractions with Semantic Kernel's enterprise features" and adds graph-based workflows. The latest releases are .NET 1.26.0 (2026-10-23) and Python 1.23.0 (2026-10-22). The Go version is in public preview. — https://learn.microsoft.com/en-us/agent-framework/overview/ and https://github.com/microsoft/agent-framework/releases — (official)
33. Cognition, not OpenAI, acquired Windsurf (announced Jul 14, 2025). It took over the IP, product, trademark and brand. — https://cognition.com/blog/windsurf — (official)
34. VS Code docs describe running agent harnesses "such as Copilot, Anthropic Claude, or OpenAI Codex" inside the editor. The Copilot Chat extension was open-sourced on Jun 30, 2025. — https://code.visualstudio.com/docs/copilot/overview and https://code.visualstudio.com/blogs/2025/05/19/openSourceAIEditor — (official)

## Site claim audit

| file:line | claim | verdict | correct value | source |
|---|---|---|---|---|
| app/lib/seed/tools.ts:86 | Name "GPT-6 Astra" (OpenAI flagship) | CONFIRMED | Real official name; API id `gpt-6-astra`, released 2026-09-03. Still OpenAI's top model | https://developers.openai.com/api/docs/models |
| app/lib/seed/tools.ts:89 | "state-of-the-art on computer use, coding, and browsing" | UNVERIFIABLE (vendor marketing) | OpenAI's own wording: "most capable model… for reasoning, coding, computer use, research, and document creation" | https://developers.openai.com/api/docs/changelog |
| app/lib/seed/tools.ts:92 | "1.1M-token context window" | WRONG (minor) | 1,050,000 context (≈1.05M), 922K max input, 128K max output | https://developers.openai.com/api/docs/models/gpt-6-astra |
| app/lib/seed/tools.ts:93 | "Async tool calls & mid-turn steering" | CONFIRMED | Also: reasoning effort can change mid-conversation | https://developers.openai.com/api/docs/changelog |
| app/lib/seed/tools.ts:94 | "Largest developer ecosystem & tooling" | UNVERIFIABLE | — | — |
| app/lib/seed/tools.ts:98 | "Highest cybersecurity capability tier means tighter usage guardrails" | UNVERIFIABLE from official docs (secondary only) | Official docs confirm asynchronous "misalignment monitoring" and staged Daybreak early access. The "Critical" cyber rating appears only in secondary press | https://developers.openai.com/api/docs/changelog ; https://itbrief.co.uk/story/openai-launches-gpt-6-astra-for-paid-chatgpt-users |
| app/lib/seed/tools.ts:105 | "$10/M input, $1/M cached input, $50/M output" | CONFIRMED | Add: $12.50 cache write; >272K-token prompts cost 2x input and 1.5x output; Batch/Flex −50%; Fast 2x | https://developers.openai.com/api/docs/models/gpt-6-astra |
| app/lib/seed/tools.ts:221 | Codex = "Code model via API — the engine behind many completion tools" | WRONG | Codex is OpenAI's coding agent: CLI, IDE extension, Codex Cloud, ChatGPT desktop app, SDK, GitHub Action. It runs GPT-6.x models (e.g. `gpt-6.1-sol`). The `gpt-5.x-codex` API models are being deprecated (`gpt-5.3-codex` → `gpt-6-sol`) | https://developers.openai.com/codex/llms.txt ; https://developers.openai.com/api/docs/deprecations |
| app/lib/seed/tools.ts:229-230 | Weaknesses "No standalone IDE", "Requires API integration" | WRONG | It has a CLI, an IDE extension and a desktop app, and you can sign in with ChatGPT (no API key needed) | https://developers.openai.com/codex/pricing |
| app/lib/seed/tools.ts:238 | pricing "Based on OpenAI token pricing" | WRONG / incomplete | Included in ChatGPT plans: Free $0, Go $8, Plus $20, Pro $100/$200/$500, Business $20/user (annual), Enterprise/Edu. Or use an API key at token prices (no cloud features) | https://developers.openai.com/codex/pricing |
| app/lib/seed/tools.ts:239 | when_to_use "building code-AI features into your own application" | WRONG (outdated framing) | Its main use is delegating coding tasks to an agent (local or cloud). The embedding use case is the Codex SDK/App Server or the Agents API | https://developers.openai.com/codex/llms.txt |
| app/lib/seed/tools.ts:247, 255 | VS Code "no AI built in" / "No AI on its own (needs extensions)" | UNVERIFIABLE / likely outdated | VS Code docs present Copilot, Claude and Codex agent harnesses in the editor. Couldn't confirm whether Copilot ships pre-installed | https://code.visualstudio.com/docs/copilot/overview |
| app/lib/seed/tools.ts:270 | Windsurf creator "Codeium" | WRONG (outdated) | Cognition (acquired July 2025) | https://cognition.com/blog/windsurf |
| app/lib/seed/tools.ts:321 | Copilot creator "GitHub / OpenAI" | WRONG | GitHub (Microsoft). The product is multi-vendor (OpenAI, Anthropic, Google models) | https://github.blog/changelog/label/copilot/ |
| app/lib/seed/tools.ts:327 | "Now has chat + agent modes" | CONFIRMED | Also Copilot cloud agent, Copilot CLI, Copilot app, code review | https://docs.github.com/en/copilot/get-started/plans |
| app/lib/seed/tools.ts:332 | "Less autonomous than Cursor/Windsurf" | UNVERIFIABLE (opinion) | Copilot now has a cloud agent and CLI on all plans | https://docs.github.com/en/copilot/get-started/plans |
| app/lib/seed/tools.ts:339 | "~$10–19/mo (free for some students/OSS)" | WRONG (outdated/incomplete) | Free $0; Student free; Pro $10; Pro+ $39; Max $100; Business $19/seat; Enterprise $39/seat. Usage is metered in GitHub AI Credits since 2026-06-01 | https://docs.github.com/en/copilot/get-started/plans |
| app/lib/seed/devtools.ts:22-23 | Windsurf "now owned by OpenAI" / tag "by OpenAI" | WRONG | The OpenAI deal fell through. Cognition acquired Windsurf (announced 2025-07-14) | https://cognition.com/blog/windsurf |
| app/lib/seed/devtools.ts:42 | Copilot "enterprise standard… SSO and audit trails… chat and agent modes" | CONFIRMED (broadly) | — | https://docs.github.com/en/copilot/get-started/plans |
| app/lib/seed/devtools.ts:84 | Copilot row: Free tier "✗" | WRONG | Copilot Free exists, and Copilot Student is free | https://docs.github.com/en/copilot/get-started/plans |
| app/lib/seed/devtools.ts:84 | Copilot row: Multi-file/agents "~ Limited" | WRONG (outdated) | Agent mode plus Copilot cloud agent, CLI and app | https://docs.github.com/en/copilot/get-started/plans |
| app/lib/seed/devtools.ts:111-117 | "GPT-6 Astra", OpenAI flagship, computer use & browsing | CONFIRMED (name, flagship, computer use) | "largest tooling ecosystem" is unverifiable | https://developers.openai.com/api/docs/models |
| app/lib/seed/webguide.ts:408 | OpenAI: "GPT-6 Astra — most popular" | Name CONFIRMED; "most popular" UNVERIFIABLE | Suggest "GPT-6 Astra (flagship) · GPT-6.1 Sol / GPT-6 Luna for cost" | https://developers.openai.com/api/docs/models |
| app/lib/seed/updates.ts:22 | Availability on "Microsoft Foundry" | CONFIRMED (brand name) | "Microsoft Foundry" is the current name. Claude availability itself is outside this domain | https://learn.microsoft.com/en-us/azure/ai-foundry/what-is-azure-ai-foundry |
| app/lib/seed/arsenal.ts:271 | GSD "Works across … Codex, … Copilot" | UNVERIFIABLE (third-party tool claim) | Codex CLI and Copilot CLI both exist | — |
| data/dictionary.ts:217, 2260, 2283 | "GPT" used generically as a closed foundation/LLM example | CONFIRMED | — | https://developers.openai.com/api/docs/models |

## New developments since June 2026 worth covering

- **2026-06-01**: GitHub Copilot switches to usage-based billing (GitHub AI Credits). — https://github.blog/changelog/2026-06-01-updates-to-github-copilot-billing-and-plans/
- **2026-06-01**: OpenAI models (GPT-5.4, GPT-5.5) become available on Amazon Bedrock through an OpenAI-compatible Responses endpoint. — https://developers.openai.com/api/docs/changelog
- **2026-06-03**: Agent Builder, the Evals platform and reusable prompts are deprecated (shutdown 2026-11-30). — https://developers.openai.com/api/docs/deprecations
- **2026-06-11**: GPT-5 (all sizes), o3 and o3-pro are deprecated, shutting down 2026-12-11. — https://developers.openai.com/api/docs/deprecations
- **2026-07-06**: GPT-Realtime-2.1 and 2.1 mini. — https://developers.openai.com/api/docs/changelog
- **2026-07-09**: GPT-5.6 Sol / Terra / Luna, with Programmatic Tool Calling, `max` effort, Pro mode, and Multi-agent (beta). — https://developers.openai.com/api/docs/changelog
- **2026-07-22**: hard spend limits on the API platform. — https://developers.openai.com/api/docs/changelog
- **2026-07-28**: GPT Transcribe and GPT Live Transcribe. — https://developers.openai.com/api/docs/changelog
- **2026-07-30**: Fast mode replaces Priority Processing. — https://developers.openai.com/api/docs/changelog
- **2026-08-07**: Daybreak Blue/Red cyber-defense access tiers, plus GPT-5.6 Cyber. — https://developers.openai.com/api/docs/changelog
- **2026-08-26**: Assistants API shut down. — https://developers.openai.com/api/docs/changelog
- **2026-09-03**: GPT-6 Astra, with async tool calling and mid-turn steering. — https://developers.openai.com/api/docs/changelog
- **2026-09-08**: GPT Image 2.5 Sunburst/Flare, and GPT-Rosalind generally available (trusted access). — https://developers.openai.com/api/docs/changelog
- **2026-09-10**: Agents API public beta (managed Codex harness) and GPT-Live 1 generally available. — https://developers.openai.com/api/docs/changelog
- **2026-09-22**: GPT-6 Sol and GPT-6 Luna. — https://developers.openai.com/api/docs/changelog
- **2026-09-24**: Sora 2 and the Videos API shut down (no replacement). — https://developers.openai.com/api/docs/models/sora-2
- **2026-09-29**: GPT-6.1 Sol and DevDay 2026: dots, ChatGPT Space, Ultrafast, computer use in the Agents API. — https://learn.chatgpt.com/docs/whats-new/devday-2026.md
- **2026-10-06**: API usage tiers simplified to Build / Launch / Grow, and the Decisions API beta (GA 2026-10-22). — https://developers.openai.com/api/docs/changelog
- **2026-10-14**: GPT-5.5 retired from Codex with ChatGPT sign-in, and GPT-4o / 4o-mini / 4.1 / 4.1-mini snapshots deprecated (shutdown 2027-01-14). — https://developers.openai.com/codex/models ; https://developers.openai.com/api/docs/deprecations
- **2026-10-20**: 12-hour prompt caching (cache writes cost 2.5x input). — https://developers.openai.com/api/docs/changelog
- **2026-10-23**: GPT-3.5 Turbo, GPT-4, GPT-4 Turbo, GPT-4.1 nano, o1 and gpt-image-1 retired. — https://developers.openai.com/api/docs/deprecations
- **2026-07-01 → 2026-12-31**: Microsoft 365 Copilot Business promo price of $18 (list $21). — https://www.microsoft.com/en-us/copilot/pricing/business
- **2026-10 (GitHub)**: local sandboxing for Copilot GA (Oct 7), Copilot can interact with desktop apps (Oct 1), dynamic workflows in Copilot CLI and the Copilot app (Oct 1). — https://github.blog/changelog/label/copilot/

## Terminology

**New / changed terms**
- **Responses API**: OpenAI's primary generation API. GPT-6 Astra requires it for tool calling. — https://developers.openai.com/api/docs/guides/migrate-to-responses
- **Agents API**: a managed agent runtime (Codex harness) with durable sessions, sandboxes, MCP and computer use. Public beta since 2026-09-10. — https://developers.openai.com/api/docs/guides/agents-api/overview
- **Decisions API**: returns typed answers from text and images, on `gpt-6-luna`. — https://developers.openai.com/api/docs/guides/decisions
- **GPT-Live**: OpenAI's full-duplex voice model/API. It listens and speaks at once and delegates reasoning to a backend model. — https://developers.openai.com/api/docs/guides/live
- **Ultrafast mode / Fast mode**: paid service tiers that speed up token generation. Fast costs 2x and replaced Priority Processing. Ultrafast costs about 6x on GPT-6.1 Sol. — https://developers.openai.com/api/docs/guides/ultrafast-mode
- **Mid-turn steering**: sending new instructions to a response while it is still in progress, over WebSockets. — https://developers.openai.com/api/docs/guides/steering
- **Async tool calling**: the model keeps working while your app runs tools. — https://developers.openai.com/api/docs/guides/async-tool-calling
- **Misalignment monitoring**: asynchronous OpenAI safety checks during agent work that can stop a conversation. — https://developers.openai.com/api/docs/guides/safety-checks/misalignment-monitoring
- **Codex**: OpenAI's coding agent across the CLI, IDE extension, cloud and desktop app. It is not a model. — https://developers.openai.com/codex/llms.txt
- **ChatGPT Work**: a ChatGPT mode for delegating multi-step tasks, built on Codex technology. — https://learn.chatgpt.com/docs/get-started-with-work.md
- **Dots**: always-on ChatGPT agents with their own cloud computer and browser. Announced at DevDay 2026. — https://learn.chatgpt.com/docs/dots
- **Daybreak**: OpenAI's approved-access program for defensive security (Blue) and offensive testing (Red). — https://developers.openai.com/api/docs/models/gpt-daybreak-blue-latest
- **GitHub AI Credits**: Copilot's usage-based billing unit since 2026-06-01. — https://docs.github.com/en/copilot/get-started/plans
- **Copilot cloud agent**: GitHub's asynchronous agent, formerly "Copilot coding agent". — https://docs.github.com/en/copilot/get-started/plans
- **Microsoft Foundry / Foundry Tools**: the current names for Azure AI Foundry and Azure AI Services. — https://learn.microsoft.com/en-us/azure/ai-foundry/what-is-azure-ai-foundry
- **Microsoft Agent Framework**: Microsoft's agent SDK (.NET/Python, Go in preview) that unifies AutoGen and Semantic Kernel. — https://learn.microsoft.com/en-us/agent-framework/overview/

**Deprecated / renamed → replacement**
- Assistants API → Responses API + Conversations API (shut down 2026-08-26)
- Agent Builder → Agents SDK or ChatGPT Workspace Agents (shuts down 2026-11-30); ChatKit stays
- Priority Processing → Fast mode
- Realtime API Beta → GA Realtime API (removed 2026-05-12); `tts-1`/`gpt-4o-mini-tts` → `gpt-realtime-2.1-mini`; `whisper-1` → `gpt-transcribe` / `gpt-live-transcribe`
- Sora 2 / Videos API → none (retired 2026-09-24)
- DALL·E 2/3 → GPT Image (removed 2026-05-12)
- o-series (o1 retired, o3 deprecated) → GPT-5.6 / GPT-6 reasoning models
- Copilot premium requests → GitHub AI Credits
- Copilot coding agent → Copilot cloud agent
- Azure AI Studio / Azure AI Foundry → Microsoft Foundry; Azure AI Services → Foundry Tools; Foundry Agents v1 (Assistants-style) → Agents v2 (Responses)
- AutoGen + Semantic Kernel → Microsoft Agent Framework

## Could not verify

- OpenAI's GPT-6 Astra launch blog (openai.com/index/…) and help.openai.com: both return HTTP 403. The ChatGPT rollout details, the "Astra Pro" allowance and the Preparedness "Critical" cyber rating are confirmed only by secondary outlets.
- Search snippets claimed that GPT-6 Sol/Luna were "50% cheaper than GPT-5.6 promotional pricing". I couldn't read the source page (403). The changelog prices above are authoritative.
- Sora consumer app shutdown date (2026-04-26): secondary sources only.
- Whether VS Code now ships Copilot pre-installed or still as an extension.
- Copilot Studio pricing: the Microsoft page lists prepaid capacity packs with no visible prices.
- The Microsoft Foundry rename date.
- The GPT-5.4 context window, the gpt-oss-20b context window, and GPT-5.6 Cyber pricing were not checked.
- ChatGPT consumer feature specifics beyond the Codex/Work pricing page (e.g. message caps per plan), because chatgpt.com/pricing wasn't fetched.
