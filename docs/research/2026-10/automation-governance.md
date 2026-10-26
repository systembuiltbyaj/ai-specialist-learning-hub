# Automation platforms & AI governance — verified 2026-10-26

Method: every row below was read off the cited page on 2026-10-26 unless labelled (secondary). GHL changelog dates were read from the Canny `publishedAt` field embedded in each entry page (the rendered page shows no date). Prices are list prices seen on the date given; vendors change them without notice.

## Platform rows

| id | vendor | name | category | current version or edition (only if sourced) | status | pricing or applicability note (with date seen) | source URL |
|---|---|---|---|---|---|---|---|
| gohighlevel | HighLevel | GoHighLevel (HighLevel) | crm | — | live | Starter $97/mo ($970/yr), Unlimited $297/mo ($2,970/yr), Agency Pro $497/mo ($4,970/yr), Enterprise contact sales (seen 2026-10-26) | https://www.gohighlevel.com/pricing |
| ghl-ai-employee | HighLevel | AI Employee plans | crm | pricing article last updated 2026-10-20 | live | Growth $50/mo, Unlimited $97/mo per enabled location, or Pay-Per-Use (token cost). Unlimited covers Conversation AI, Voice AI, Reviews AI, Content AI (fair use); **Agent Studio is excluded from every plan and stays pay-per-use** (seen 2026-10-26) | https://help.gohighlevel.com/support/solutions/articles/155000006652-ai-product-pricing |
| ghl-voice-ai | HighLevel | Voice AI | crm | — | live | Pay-per-use: voice engine $0.045/min + TTS (OpenAI/Cartesia $0.015/min, ElevenLabs V2.5 $0.035, V3 $0.170) + LLM tokens + phone charges; Growth incl. 100 min/mo (seen 2026-10-26) | https://help.gohighlevel.com/support/solutions/articles/155000006652-ai-product-pricing |
| ghl-agent-studio | HighLevel | Agent Studio | crm | — | live | Token + feature usage only (e.g. Tavily web search $0.01/search); no plan allowance (seen 2026-10-26) | https://help.gohighlevel.com/support/solutions/articles/155000006652-ai-product-pricing |
| ghl-managed-agents | HighLevel | Managed Agents | crm | — | live | Growth 100 runs/mo, Unlimited 1,000 runs/mo, free test 30 runs/mo (seen 2026-10-26) | https://help.gohighlevel.com/support/solutions/articles/155000006652-ai-product-pricing |
| ghl-ai-studio | HighLevel | AI Studio (app/website builder) | crm | — | GA from Labs 2026-09-22 | Ask AI + AI Studio usage metered in 5-hour windows; Unlimited = 3x Growth (seen 2026-10-26) | https://ideas.gohighlevel.com/changelog/ai-studio-live-for-all |
| ghl-mcp | HighLevel | LeadConnector MCP Server | crm | endpoints `/mcp/{anthropic,openai,cursor,muse}/v2`; docs page labelled v3 | live (agency-wide multi-sub-account install "rolling out") | OAuth consent flow; 4 unified tools (`list_locations`, `search_operations`, `describe_operation`, `execute_operation`) over 550+ operations in 38 domains (seen 2026-10-26) | https://marketplace.gohighlevel.com/docs/other/mcp |
| ghl-api | HighLevel | API v2 (v1 deprecated) | crm | v2 | v1 deprecated, "no immediate shutoff" (post dated 2026-06-26) | PIT for internal use, OAuth 2.0 for Marketplace apps | https://www.gohighlevel.com/post/deprecating-the-highlevel-api-v1-and-migrating-to-v2 |
| n8n | n8n GmbH | n8n | automation | 2.45 (2026-10-20, release notes); GitHub "latest" release n8n@2.44.6 (2026-10-22) | live | Cloud Starter €20/mo (2.5K executions), Pro €50/mo (10K), billed annually; Business €667/mo (40K, self-hosted); Enterprise custom. Billed per workflow execution. Community Edition self-hosted free under Sustainable Use License (seen 2026-10-26) | https://n8n.io/pricing/ |
| zapier | Zapier | Zapier | automation | — | live | Free 100 tasks; Pro from $19.99/mo annual ($29.99 monthly) at 750 tasks; Team from $69/mo annual at 2,000 tasks; Enterprise custom (seen 2026-10-26) | https://zapier.com/pricing |
| zapier-mcp | Zapier | Zapier MCP | automation | — | live | Included on every plan; each tool call uses 2 tasks; 9,000+ apps (seen 2026-10-26) | https://zapier.com/mcp |
| zapier-next-gen-zaps | Zapier | Next Gen Zaps | automation | — | early access (announced 2026-09-23) | Free to build/run on paid plans during early access; then task-based | https://community.zapier.com/product-updates/the-next-generation-of-zaps-is-here-53832 |
| zapier-ai-by-zapier | Zapier | AI by Zapier (formerly Zapier Agents) | automation | — | live, migration banner for old agents (2026-10-06) | Agents now an AI step inside a Zap, billed in tasks ("universal task billing"); run pauses for a human at 75 tasks | https://zapier.com/blog/zapier-agents-is-now-ai-by-zapier/ |
| make | Celonis (not re-checked) | Make | automation | — | live | Billing unit = **credits** since 2025-08-27; Free 1,000 credits/mo; plans Free/Core/Pro/Teams/Enterprise (dollar prices not rendered on fetch) (seen 2026-10-26) | https://www.make.com/en/pricing |
| make-maia | Make | Maia by Make | automation | upgraded 2026-10-20 (Plan mode, memory, image attach, resolve error) | launched 2026-08-12, "live today for all Make users" | Uses credits | https://www.make.com/blog/plan-and-build-better-workflows-with-maia-by-make-upgraded |
| make-ai-agents | Make | Make AI Agents | automation | — | available on all paid plans (no beta label on help article) | paid plans only | https://help.make.com/make-ai-agents-the-next-step-in-automation |
| trigger-dev | Trigger.dev | Trigger.dev | automation | v4.8.1 (2026-10-23) | live | Free $0 ($5 credits), Hobby $10/mo, Pro $50/mo (credits included), Enterprise custom (seen 2026-10-26) | https://trigger.dev/pricing |
| langfuse | ClickHouse (acquired Langfuse) | Langfuse | observability | v4.70.0 (GitHub, 2026-10-24) | live; "stays open source and self-hostable" | — | https://langfuse.com/blog/joining-clickhouse |
| langsmith | LangChain | LangSmith | observability | — | live | Developer $0 (1 seat, 5k base traces/mo), Plus $39/seat/mo (10k base traces), Enterprise custom; Deployment metered in LSUs (seen 2026-10-26) | https://www.langchain.com/pricing |
| helicone | Helicone | Helicone | observability | last GitHub release v2025.08.21-1 | maintenance mode after Mintlify acquisition (2026-03-03); site banner now says "no longer part of Mintlify. Details to come soon." | — | https://mintlify.com/blog/mintlify-acquires-helicone |
| arize-phoenix | Arize AI | Arize Phoenix | observability | v20.26.1 (2026-10-25) | live | Elastic License 2.0 (source-available, not OSI); self-host free | https://www.arize.com/docs/phoenix/self-hosting/license.md |
| otel-genai-semconv | OpenTelemetry | GenAI semantic conventions | standard | no tagged release; dedicated repo `semantic-conventions-genai` created 2026-05-05; core semconv v1.44.0 (2026-08-04) | Status: Development | Apache-2.0 | https://github.com/open-telemetry/semantic-conventions-genai |
| promptfoo | OpenAI (acquired) | Promptfoo | observability | 0.125.1 (2026-10-25) | open source continues; acquisition announced 2026-03-09 | MIT | https://openai.com/index/openai-to-acquire-promptfoo/ |
| deepeval | Confident AI | DeepEval | observability | python-v4.2.4 (2026-09-22) | live | Apache-2.0 | https://github.com/confident-ai/deepeval |
| inspect-ai | UK AISI | Inspect | observability | 0.3.285 (2026-10-25) | live | MIT | https://github.com/UKGovernmentBEIS/inspect_ai |
| pgvector | pgvector | pgvector | vector-db | latest tag v0.8.7 | live | Postgres extension, free | https://github.com/pgvector/pgvector |
| pinecone | Pinecone | Pinecone | vector-db | — | live | Starter free (2 GB); Builder $20/mo flat; Standard $50/mo minimum; Enterprise $500/mo minimum (seen 2026-10-26) | https://www.pinecone.io/pricing/ |
| qdrant | Qdrant | Qdrant | vector-db | v1.20.0 (2026-10-22) | live | Cloud free tier 0.5 vCPU / 1 GB RAM / 4 GB disk; Standard usage-based (seen 2026-10-26) | https://qdrant.tech/pricing/ |
| weaviate | Weaviate | Weaviate | vector-db | v1.40.2 (2026-10-22) | live | Free $0 (100k objects); Flex from $45/mo; Premium from $400/mo (seen 2026-10-26) | https://weaviate.io/pricing |
| openrouter | OpenRouter | OpenRouter | gateway | — | live | No inference markup; 5.5% fee on credit purchases (Standard), 8% (Business); BYOK free to $25k/mo then 5%; 500+ models, 80+ providers (seen 2026-10-26) | https://openrouter.ai/pricing |
| litellm | BerriAI | LiteLLM | gateway | v1.106.4 (2026-10-25) | live | open source proxy/SDK | https://github.com/BerriAI/litellm |
| vercel-ai-gateway | Vercel | AI Gateway | gateway | docs last_updated 2026-09-08 | GA | No markup or platform fee on tokens incl. BYOK; add-ons: team-wide ZDR/provider allowlist $0.10 per 1k requests; trace drains $0.05 per 1k traces (seen 2026-10-26) | https://vercel.com/docs/ai-gateway/pricing |
| eu-ai-act | European Union | AI Act (Reg. (EU) 2024/1689) as amended by AI Omnibus (Reg. (EU) 2026/1744) | regulation | Omnibus in force 2026-07-27 | in force, phased | Annex III high-risk now 2027-12-02; Annex I 2028-08-02 | https://ai-act-service-desk.ec.europa.eu/en/ai-act/timeline/timeline-implementation-eu-ai-act |
| nist-ai-rmf | NIST | AI RMF 1.0 (AI 100-1) + GenAI Profile (AI 600-1) | standard | AI 600-1 released 2024-07-26; AI RMF 1.0 under revision | voluntary | US voluntary framework | https://www.nist.gov/itl/ai-risk-management-framework |
| iso-42001 | ISO/IEC | ISO/IEC 42001:2023 (AIMS) | standard | Edition 1, 2023-12 | current, certifiable | companion: 42005:2025 (impact assessment, 2025-05), 42006:2025 (cert bodies, 2025-07) | https://www.iso.org/standard/42001 |
| owasp-llm-top10 | OWASP GenAI Security Project | Top 10 for LLM Applications | standard | 2026 edition, published 2026-08-03 | current | free | https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/ |
| owasp-agentic-top10 | OWASP GenAI Security Project | Top 10 for Agentic Applications | standard | published 2025-12-09 (secondary) | current | ASI01 Agent Goal Hijack … ASI10 Rogue Agents (secondary) | https://cycode.com/blog/owasp-top-10-agentic-applications/ |
| mcp-spec | AAIF / Linux Foundation | Model Context Protocol spec | standard | 2026-07-28 | current | Stateless core; Roots, Sampling, Logging deprecated | https://modelcontextprotocol.io/specification/2026-07-28/changelog |

## Verified facts

1. GHL changelog "GPT-6 Sol and GPT-6 Luna Now Available in AI Agent and GPT Actions" published 2026-09-23; replaces GPT-5.6 models in the dropdown; both cost about half what GPT-5.6 did. — https://ideas.gohighlevel.com/changelog/gpt-6-sol-and-gpt-6-luna-now-available-in-ai-agent-and-gpt-actions — (official)
2. "AI Studio Live for All" published 2026-09-22: AI Studio leaves Labs for all locations, **but sub-account user/admin access is off by default** except for users who had it on in Labs; agency owners grant access from a Home banner. — https://ideas.gohighlevel.com/changelog/ai-studio-live-for-all — (official)
3. HighLevel AI Studio is an app/website builder ("a complete build environment"), introduced 2026-04-02, not the AI-agent builder. — https://www.gohighlevel.com/post/highlevel-ai-studio-from-idea-to-fully-built-in-minutes — (official)
4. "Set a Fixed Price for Your AI Products" published 2026-08-07: Conversation AI and Voice AI can be rebilled at a fixed rate instead of only a usage markup, per product and per sub-account (labelled SaaS Mode). — https://ideas.gohighlevel.com/changelog/set-a-fixed-price-for-your-ai-products — (official)
5. "Company custom fields now supported in snapshots" published 2026-08-06. — https://ideas.gohighlevel.com/changelog/company-custom-fields-now-supported-in-snapshots — (official)
6. "TikTok Lead Ads migration to Marketplace Architecture" published 2026-08-07; existing connections keep working with no reconfiguration and migrate automatically later. — https://ideas.gohighlevel.com/changelog/tiktok-lead-ads-migration-to-marketplace-architecture — (official)
7. "Slack migration to Marketplace Architecture" published 2026-08-06 (Labs early access). — https://ideas.gohighlevel.com/changelog/slack-migration-to-marketplace-architecture — (official)
8. GHL list prices: Starter $97, Unlimited $297, Agency Pro $497 per month. — https://www.gohighlevel.com/pricing — (official)
9. AI Employee Growth $50/mo and Unlimited $97/mo per location; Agent Studio excluded from all plans; Funnel AI free up to 1,000 prompts/day/location; Managed Agents 100/1,000 runs. Article updated 2026-10-20. — https://help.gohighlevel.com/support/solutions/articles/155000006652-ai-product-pricing — (official)
10. The GHL MCP server now uses OAuth with per-client v2 endpoints and 4 meta-tools fronting 550+ operations across 38 domains. — https://marketplace.gohighlevel.com/docs/other/mcp — (official)
11. GHL API v1 is deprecated; the 2026-06-26 post says "No immediate shutoff". — https://www.gohighlevel.com/post/deprecating-the-highlevel-api-v1-and-migrating-to-v2 — (official)
12. n8n's latest release is 2.45 (2026-10-20); 2.x is the current major. — https://docs.n8n.io/release-notes/ — (official)
13. n8n AI Agent node: "The AI Agent node's agent type setting is deprecated from n8n 1.82.0"; every AI Agent now works as a Tools Agent. No ReAct option is documented. — https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/ — (official)
14. n8n memory sub-nodes: Simple Memory, Redis Chat Memory, Postgres Chat Memory, MongoDB Chat Memory, Motorhead, Xata, Zep (+ Chat Memory Manager). MCP nodes: MCP Client, MCP Client Tool, MCP Server Trigger, plus instance-level MCP server. — https://docs.n8n.io/llms.txt — (official)
15. n8n licensing: Sustainable Use License ("only for your own internal business purposes or for non-commercial or personal use"), with `.ee` files under the n8n Enterprise License. Source-available, not OSI open source. — https://github.com/n8n-io/n8n/blob/master/LICENSE.md — (official)
16. n8n Cloud pricing is per workflow execution: Starter €20/mo, Pro €50/mo (annual), Business €667/mo. — https://n8n.io/pricing/ — (official)
17. SAP strategic investment values n8n at $5.2B, more than double its valuation from less than a year earlier; n8n will be embedded in SAP Joule Studio (May 2026). — https://blog.n8n.io/n8n-sap/ — (official)
18. n8n Series C: $180M led by Accel at $2.5B (Oct 2025). — https://n8n.io/press/ — (official)
19. Zapier Agents became "AI by Zapier" on 2026-10-06: agents now live as an AI step inside a Zap and bill in tasks. — https://zapier.com/blog/zapier-agents-is-now-ai-by-zapier/ — (official)
20. Next Gen Zaps announced 2026-09-23 at ZapConnect, early access, built from MCP clients or Zapier's canvas. — https://community.zapier.com/product-updates/the-next-generation-of-zaps-is-here-53832 — (official)
21. Zapier MCP is included on every plan, each tool call costs 2 tasks; Zapier lists 9,000+ apps. — https://zapier.com/mcp — (official)
22. Zapier pricing: Free 100 tasks/mo; Pro $19.99/mo annual; Team $69/mo annual. — https://zapier.com/pricing — (official)
23. Make: "As of August 27, credits are the billing unit in Make"; Free = 1,000 credits/mo; Make AI Provider features may use more than one credit. — https://www.make.com/en/pricing — (official)
24. Make operations converted 1:1 to credits; operations still appear in run history but no longer drive billing. — https://help.make.com/introducing-credits-new-billing-unit-live-in-make — (official)
25. Make homepage claims "3,000+ native apps"; the pricing FAQ separately says Standard Apps include "more than 1,000 3rd party apps". — https://www.make.com/en/pricing — (official)
26. Maia by Make launched 2026-08-12 ("live today for all Make users"); upgraded 2026-10-20 with Plan mode, memory, image attach, resolve error. — https://www.make.com/blog/plan-and-build-better-workflows-with-maia-by-make-upgraded — (official)
27. Make AI Agents "now available on all paid plans", with no beta label. — https://help.make.com/make-ai-agents-the-next-step-in-automation — (official)
28. Trigger.dev current major is v4 (v4.8.1, Oct 23); v4.8.0 added hosted webhooks and Slack/Linear agents for `chat.agent`. — https://trigger.dev/changelog — (official)
29. AAIF formed 2025-12-09 under the Linux Foundation; MCP (Anthropic), goose (Block) and AGENTS.md (OpenAI) were founding projects; supporters include Google, Microsoft, AWS, Cloudflare and Bloomberg. — https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation — (official)
30. MCP spec 2026-07-28: protocol made stateless (no `initialize` handshake, no `Mcp-Session-Id`), new `server/discover`, Multi Round-Trip Requests replace server-initiated requests, tasks moved to an extension, and **Roots, Sampling and Logging are deprecated** (12-month minimum window). HTTP+SSE transport is formally Deprecated. — https://modelcontextprotocol.io/specification/2026-07-28/changelog — (official)
31. EU AI Act milestones: prohibitions + AI literacy 2025-02-02; GPAI model obligations 2025-08-02; most rules, Art. 50 transparency, and enforcement (incl. GPAI) 2026-08-02; new prohibitions (non-consensual sexual deepfakes/CSAM) and Art. 50(2) grace end 2026-12-02; Annex III high-risk 2027-12-02; Annex I high-risk 2028-08-02. — https://ai-act-service-desk.ec.europa.eu/en/ai-act/timeline/timeline-implementation-eu-ai-act — (official)
32. AI Omnibus (Regulation (EU) 2026/1744 of 8 July 2026) entered into force 2026-07-27; it extends SME simplifications to small mid-caps and streamlines AI literacy and database obligations. — https://interoperable-europe.ec.europa.eu/collection/free-and-open-source-software/news/artificial-intelligence-omnibus-regulation-enters-force — (official)
33. NIST AI 600-1 (GenAI Profile) released 2024-07-26; AI RMF 1.0 is being revised under the White House AI Action Plan, and the Playbook will be updated after. — https://www.nist.gov/itl/ai-risk-management-framework — (official)
34. ISO/IEC 42001 is still the 2023 edition (Edition 1, 2023-12); ISO/IEC 42005:2025 (May 2025) and 42006:2025 (July 2025) are published. — https://www.iso.org/standard/42001 — (official)
35. OWASP Top 10 for LLM Applications 2026 published 2026-08-03; announced with the Agent Control Standard (ACS) on 2026-09-02; Excessive Agency is now #3. — https://genai.owasp.org/2026/09/01/owasp-genai-security-project-unveils-2026-top-10-for-llm-applications-new-agent-control-standard-and-sponsors-as-community-tops-30000-members/ — (official)
36. 2026 list order: LLM01 Prompt Injection, 02 Sensitive Information Disclosure, 03 Excessive Agency, 04 Supply Chain, 05 Data and Model Poisoning, 06 Unbounded Consumption, 07 Misinformation, 08 Hidden Context Exposure (replaces System Prompt Leakage), 09 Vector and Embedding Weaknesses, 10 Improper Output Handling. — https://labs.cloudsecurityalliance.org/research/csa-research-note-owasp-genai-top10-2026-agent-control-stand/ — (secondary)
37. OpenTelemetry GenAI conventions are "already in use today and under active development"; attributes include `gen_ai.request.model`, `gen_ai.usage.input_tokens`/`output_tokens`, `gen_ai.input.messages`, `gen_ai.output.messages`. — https://opentelemetry.io/blog/2026/genai-observability/ — (official)
38. GenAI conventions now live in a dedicated repo `open-telemetry/semantic-conventions-genai` (created 2026-05-05, no tagged release; agent-span doc marked Status: Development). — https://github.com/open-telemetry/semantic-conventions-genai — (official)
39. ClickHouse acquired Langfuse (Jan 2026); Langfuse stays open source and self-hostable, with no planned licensing changes. — https://langfuse.com/blog/joining-clickhouse — (official)
40. Mintlify acquired Helicone (post dated 2026-03-03); Helicone moved to maintenance mode. As of 2026-10-26 the helicone.ai banner reads "Helicone is no longer part of Mintlify. Details to come soon." — https://mintlify.com/blog/mintlify-acquires-helicone and https://www.helicone.ai/ — (official)
41. LangGraph Platform was renamed LangSmith Deployment (Oct 2025) and LangGraph Studio became LangSmith Studio. — https://changelog.langchain.com/announcements/product-naming-changes-langsmith-deployment-and-langsmith-studio — (official)
42. OpenAI announced the Promptfoo acquisition on 2026-03-09; the open-source project continues. — https://openai.com/index/openai-to-acquire-promptfoo/ — (official)
43. Arize Phoenix is under Elastic License 2.0. — https://www.arize.com/docs/phoenix/self-hosting/license.md — (official)
44. Vercel AI Gateway charges no markup and no platform fee on tokens, including BYOK. — https://vercel.com/docs/ai-gateway/pricing — (official)
45. OpenRouter: no inference markup; 5.5% fee on credit purchases (Standard). — https://openrouter.ai/pricing — (official)

## Site claim audit

| file:line | claim | verdict | correct value | source |
|---|---|---|---|---|
| app/ghl-hub/page.tsx:10-13 | Sep 23, 2026: GPT-6 Sol/Luna in AI Agent + GPT action, ~50% cheaper | CONFIRMED | 50% cheaper than the GPT-5.6 models they replace | https://ideas.gohighlevel.com/changelog/gpt-6-sol-and-gpt-6-luna-now-available-in-ai-agent-and-gpt-actions |
| app/ghl-hub/page.tsx:18 | Sep 22, 2026: AI Studio Live for All | CONFIRMED (date/title) | — | https://ideas.gohighlevel.com/changelog/ai-studio-live-for-all |
| app/ghl-hub/page.tsx:21 | AI Studio is for "building or testing AI Agents"; implies the access wall is gone | WRONG | AI Studio is HighLevel's app/website builder; agents are built in Agent Studio. Sub-account user access is **off by default** and agency owners must grant it | https://www.gohighlevel.com/post/highlevel-ai-studio-from-idea-to-fully-built-in-minutes |
| app/ghl-hub/page.tsx:26-29 | Aug 7, 2026: fixed pricing for AI products in SaaS Mode | CONFIRMED | Covers Conversation AI and Voice AI specifically | https://ideas.gohighlevel.com/changelog/set-a-fixed-price-for-your-ai-products |
| app/ghl-hub/page.tsx:34-37 | Aug 6, 2026: company custom fields in Snapshots | CONFIRMED | — | https://ideas.gohighlevel.com/changelog/company-custom-fields-now-supported-in-snapshots |
| app/ghl-hub/page.tsx:42-45 | Aug 7, 2026: TikTok Lead Ads → Marketplace; Slack made a similar move | CONFIRMED | Slack entry dated Aug 6, 2026. The changelog says existing connections need no reconfiguration, so "re-check the connection" is advice, not a requirement. The item is listed after an Aug 6 item, so the order is off | https://ideas.gohighlevel.com/changelog/tiktok-lead-ads-migration-to-marketplace-architecture |
| app/ghl-hub/page.tsx:78 | verified="23 Sep 2026" | WRONG (stale) | Newer changelog entries exist through 2026-10-26 | https://ideas.gohighlevel.com/changelog |
| app/automation-hub/page.tsx:7-11 | May 2026: n8n $5.2B with SAP; after $180M Series C Oct 2025 at $2.5B | CONFIRMED | Swap the third-party source for n8n's own post | https://blog.n8n.io/n8n-sap/ |
| app/automation-hub/page.tsx:16-18 | AI Agent node "ships a ReAct execution mode", "four memory backends (in-memory, Redis, Postgres, Motorhead)", native MCP | WRONG (partly) | Agent types are deprecated since 1.82.0 and every AI Agent is a Tools Agent; no ReAct mode is documented. There are 7 memory sub-nodes (Simple, Redis, Postgres, MongoDB, Motorhead, Xata, Zep). MCP support is CONFIRMED (MCP Client Tool, MCP Server Trigger, instance-level MCP). The "JSON-schema validation and configurable retries" claim is UNVERIFIABLE | https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/ |
| app/automation-hub/page.tsx:23-27 | Dec 2025: MCP donated to AAIF under Linux Foundation; OpenAI, AWS, Google, Microsoft, Cloudflare, Bloomberg on board | CONFIRMED | 2025-12-09. OpenAI and Block are co-founders, not just supporters. Better source: LF press release | https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation |
| app/automation-hub/page.tsx:31-35 | Make Maia builds scenarios from plain English; "agent builder is still flagged beta" | CONFIRMED / WRONG | Maia CONFIRMED (launched 2026-08-12, upgraded 2026-10-20). "Still beta" is not supported: the Make AI Agents help article says "available on all paid plans" with no beta label. Date should be "Aug 2026" | https://www.make.com/blog/plan-and-build-better-workflows-with-maia-by-make-upgraded |
| app/automation-hub/page.tsx:39-43 | Zapier Agents execute multi-step tasks | WRONG (outdated) | Since 2026-10-06 Zapier Agents is "AI by Zapier", an AI step inside a Zap billed in tasks. Also new: Next Gen Zaps (early access, 2026-09-23) | https://zapier.com/blog/zapier-agents-is-now-ai-by-zapier/ |
| app/automation-hub/page.tsx:47-51 | All three ship native OpenAI/Anthropic/Gemini connections | UNVERIFIABLE (not checked in this pass) | — | — |
| app/automation-hub/page.tsx:86 | verified="24 Sep 2026" | WRONG (stale) | Zapier and Make changes in October 2026 postdate it | — |
| app/lib/seed/automationhub.ts:10,12 | Zapier "7000+ apps" | WRONG | 9,000+ apps | https://zapier.com/mcp |
| app/lib/seed/automationhub.ts:22 | Make "1000+ apps" | WRONG | Make claims 3,000+ native apps (its pricing FAQ still says 1,000+ Standard apps) | https://www.make.com/en/pricing |
| app/lib/seed/automationhub.ts:30,32 | n8n "Open-source" / tag "Open source" | WRONG | Source-available (Sustainable Use License, not OSI). data/dictionary.ts:1406 already says "source-available", so the two files disagree | https://github.com/n8n-io/n8n/blob/master/LICENSE.md |
| app/lib/seed/automationhub.ts:31-32 | Self-host for "no per-task fees" | CONFIRMED (self-host Community Edition) | n8n Cloud bills per execution | https://n8n.io/pricing/ |
| app/lib/seed/ghlhub.ts:82 | Conversation AI with memory across sessions; Voice AI answers calls, checks calendar, books | UNVERIFIABLE (feature detail not checked) | — | — |
| app/lib/seed/ghlhub.ts:177 | GHL API docs at highlevel.stoplight.io | UNVERIFIABLE (URL still returns 200) | Current developer docs (incl. MCP) live at marketplace.gohighlevel.com/docs | https://marketplace.gohighlevel.com/docs/other/mcp |
| app/lib/seed/tools.ts:430 | n8n "Self-hostable and open-source" | WRONG | Self-hostable, source-available | https://github.com/n8n-io/n8n/blob/master/LICENSE.md |
| app/lib/seed/tools.ts:431 | n8n "AI Agent node with ReAct reasoning mode and native MCP support" | WRONG (ReAct) / CONFIRMED (MCP) | Tools Agent only since 1.82.0; MCP Client Tool + MCP Server Trigger | https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/ |
| app/lib/seed/tools.ts:445 | n8n "Free (self-hosted) · Cloud tiers available" | CONFIRMED | Suggested wording: "Free Community Edition (self-hosted) · Cloud from €20/mo (annual), billed per execution" | https://n8n.io/pricing/ |
| app/lib/seed/tools.ts:452 | Make creator "Celonis" | UNVERIFIABLE (not re-checked) | — | — |
| app/lib/seed/tools.ts:454,457 | Maia builds scenarios from natural language | CONFIRMED | — | https://www.make.com/en/blog/maia-conversational-ai-coworker-for-ai-agents-and-automation |
| app/lib/seed/tools.ts:458 | Make "1000+ app integrations" | WRONG | 3,000+ native apps (homepage claim) | https://www.make.com/en/pricing |
| app/lib/seed/tools.ts:464 | "Operations-based pricing can add up" | WRONG | Credits-based (since 2025-08-27); AI steps can consume more than 1 credit | https://help.make.com/introducing-credits-new-billing-unit-live-in-make |
| app/lib/seed/tools.ts:471 | Make "Free tier · Paid plans by operations" | WRONG | "Free tier (1,000 credits/mo) · Paid plans by credits" | https://www.make.com/en/pricing |
| app/lib/seed/tools.ts:480,483 | "autonomous Zapier Agents" | WRONG (renamed) | AI by Zapier (agents as an AI step in Zaps, task-billed) | https://zapier.com/blog/zapier-agents-is-now-ai-by-zapier/ |
| app/lib/seed/tools.ts:484 | Zapier "7000+ app integrations" | WRONG | 9,000+ apps | https://zapier.com/mcp |
| app/lib/seed/tools.ts:497 | Zapier "Free tier · Paid plans by tasks" | CONFIRMED | Free 100 tasks; Pro from $19.99/mo annual. Agents/AI steps and MCP calls (2 tasks each) also draw from tasks | https://zapier.com/pricing |
| data/dictionary.ts:1249-1251 | Zapier task = billing unit | CONFIRMED | — | https://zapier.com/pricing |
| data/dictionary.ts:1304 | Make "formerly Integromat" | CONFIRMED (long-standing; not re-fetched) | — | — |
| data/dictionary.ts:1355 | "Operation (Make)… the unit Make bills against your plan" | WRONG | Credits are the billing unit since 2025-08-27; operations remain a run-history measure | https://help.make.com/introducing-credits-new-billing-unit-live-in-make |
| data/dictionary.ts:1357-1358 | "Operations determine Make's cost"; 10 items ≈ 10 operations | WRONG (cost framing) | Standard modules ≈ 1 credit each; AI Provider modules bill by model/tokens | https://www.make.com/en/pricing |
| data/dictionary.ts:953, 1048 | Polling/filters "consume operations/tasks" | WRONG (minor) | "credits/tasks" | https://www.make.com/en/pricing |
| data/dictionary.ts:1406 | n8n is "source-available" | CONFIRMED | — | https://github.com/n8n-io/n8n/blob/master/LICENSE.md |
| data/dictionary.ts:1512 | AI Agent node "can reason and call connected tools, memory, and models" | CONFIRMED | Could add: Tools Agent is the only agent type since 1.82.0 | https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/ |
| data/dictionary.ts:1608, 1627 | SaaS Mode with usage-based rebilling (markup) | CONFIRMED (incomplete) | Since 2026-08-07, Conversation AI and Voice AI can also be rebilled at a fixed rate | https://ideas.gohighlevel.com/changelog/set-a-fixed-price-for-your-ai-products |
| data/dictionary.ts:1665 | Conversation AI definition | CONFIRMED (product exists, token-billed); modes detail UNVERIFIABLE | — | https://help.gohighlevel.com/support/solutions/articles/155000006652-ai-product-pricing |
| data/dictionary.ts:1683 | Voice AI definition | CONFIRMED (product exists; inbound, outbound and widget) | — | https://help.gohighlevel.com/support/solutions/articles/155000006652-ai-product-pricing |
| data/dictionary.ts:1701 | Content AI drafts text and images | CONFIRMED | Pay-per-use $0.063/image, $0.0945 per 1,000 words | https://help.gohighlevel.com/support/solutions/articles/155000006652-ai-product-pricing |
| data/dictionary.ts:1719 | Workflow AI = AI actions inside workflows | CONFIRMED (name exists in the AI Employee pricing article) | Workflows also have a dedicated "AI Agent" action and "GPT" action (GPT-6 Sol/Luna) | https://ideas.gohighlevel.com/changelog/gpt-6-sol-and-gpt-6-luna-now-available-in-ai-agent-and-gpt-actions |
| data/dictionary.ts:1737-1739 | Agent Studio = framework for custom agents | CONFIRMED | Worth adding: pay-per-use only, excluded from AI Employee plans | https://help.gohighlevel.com/support/solutions/articles/155000006652-ai-product-pricing |
| data/dictionary.ts:453 (outside assigned categories; flagged) | MCP is "an open standard from Anthropic" | WRONG (outdated) | Created by Anthropic, governed since 2025-12-09 under the AAIF (Linux Foundation) | https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation |
| data/dictionary.ts:538 (outside assigned categories; flagged) | MCP Sampling described as a current feature | WRONG (deprecated) | Deprecated in spec 2026-07-28; migrate to direct LLM provider APIs | https://modelcontextprotocol.io/specification/2026-07-28/changelog |
| data/dictionary.ts:504 (outside assigned categories; flagged) | Transports: stdio or streamable HTTP | CONFIRMED | HTTP+SSE now formally Deprecated; Streamable HTTP has lost sessions and resumability | https://modelcontextprotocol.io/specification/2026-07-28/changelog |

## New developments since June 2026 worth covering

- **EU AI Omnibus in force (2026-07-27).** Annex III high-risk obligations move from 2026-08-02 to 2027-12-02, and Annex I to 2028-08-02. Art. 50 transparency still applied from 2026-08-02. A new prohibition on non-consensual sexual deepfakes/CSAM applies from 2026-12-02. GPAI obligations (since 2025-08-02) are unchanged, and enforcement on them began 2026-08-02.
- **MCP spec 2026-07-28.** The core is now stateless (no `initialize` handshake, no session header), adds `server/discover` and Multi Round-Trip Requests, moves Tasks to an extension, and deprecates Roots, Sampling and Logging. This is the biggest MCP change since Streamable HTTP and affects the site's MCP Sampling, MCP Primitive and MCP Transport entries.
- **OWASP Top 10 for LLM Applications 2026 (2026-08-03).** Excessive Agency moves to #3, and Hidden Context Exposure replaces System Prompt Leakage. It shipped with the OWASP Agent Control Standard (runtime enforcement for agents).
- **Zapier.** Next Gen Zaps (2026-09-23, early access) are built from Claude/ChatGPT/Cursor via MCP or in Zapier's canvas, with self-healing runs, no 500-item loop cap, and human-in-the-loop pauses. Zapier Agents became AI by Zapier (2026-10-06), with agent usage moving to task billing.
- **Make.** Maia launched (2026-08-12) and was upgraded (2026-10-20: Plan mode, memory, image-to-scenario, resolve error).
- **HighLevel.** AI Studio went GA (2026-09-22, sub-account access off by default). GPT-6 Sol/Luna arrived in workflows (2026-09-23). Fixed-rate AI rebilling shipped (2026-08-07). The MCP server was rebuilt on OAuth with 4 meta-tools over 550+ operations. AI Employee now has a Growth tier ($50) alongside Unlimited ($97), and Managed Agents are a metered product. API v1 is deprecated (post dated 2026-06-26).
- **n8n.** SAP invested at a $5.2B valuation, with n8n embedded in Joule Studio (May 2026). The 2.x line continues (2.45 on 2026-10-20) with instance-level MCP client/server work and "AI Assistant" renamed to "n8n Assistant" (2.40).
- **Observability consolidation.** ClickHouse acquired Langfuse (Jan 2026). Mintlify acquired Helicone (Mar 2026, maintenance mode), and as of today Helicone says it is "no longer part of Mintlify". OpenAI is acquiring Promptfoo (announced 2026-03-09). OTel GenAI conventions moved into their own repo (May 2026) and are still in Development status.
- **NIST.** An AI RMF 1.0 revision is underway (AI Action Plan). A Cyber AI Profile draft outline (Jan 2026) and a Critical Infrastructure profile concept note (2026-04-07) are in progress.

## Terminology

New terms worth a glossary entry:

| term | one-line definition | authoritative URL |
|---|---|---|
| LLM observability | Capturing traces, token usage, latency, cost and inputs/outputs of each model and tool call so AI behaviour can be debugged and audited | https://opentelemetry.io/blog/2026/genai-observability/ |
| GenAI semantic conventions | OpenTelemetry's standard `gen_ai.*` attribute names for model, agent and tool spans and metrics, so any backend can read the same telemetry | https://github.com/open-telemetry/semantic-conventions-genai |
| Trace / span (LLM) | A trace is one end-to-end request; spans are its timed steps (model call, tool call, retrieval) | https://opentelemetry.io/blog/2026/genai-observability/ |
| LLM-as-a-judge | Using a model to score another model's output against a rubric as an automated eval | https://www.promptfoo.dev/ (URL not fetched for this definition) |
| Red teaming (AI) | Adversarial testing of an AI app for prompt injection, data leaks and unsafe actions before release | https://openai.com/index/openai-to-acquire-promptfoo/ |
| AI gateway | A proxy in front of many model providers that adds one API, routing, fallbacks, budgets, logging and key management | https://vercel.com/docs/ai-gateway/pricing |
| Model routing | Choosing which model or provider serves a request based on cost, latency, capability or availability | https://vercel.com/kb/guide/how-to-build-your-own-ai-model-router (URL not fetched) |
| BYOK | Bring Your Own Key: the gateway uses your provider API key, so you pay the provider directly | https://openrouter.ai/pricing |
| Zero Data Retention (ZDR) | Routing only to providers contractually bound not to store or train on prompts | https://vercel.com/docs/ai-gateway/pricing |
| Direct vs indirect prompt injection | Direct means the attacker types the malicious instruction. Indirect means it hides in content the model reads (web page, email, document, tool output) | https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/ |
| Excessive Agency (LLM03:2026) | Giving an LLM app more permissions, tools or autonomy than its task needs, so a bad output becomes a damaging action | https://genai.owasp.org/2026/09/01/owasp-genai-security-project-unveils-2026-top-10-for-llm-applications-new-agent-control-standard-and-sponsors-as-community-tops-30000-members/ |
| Hidden Context Exposure (LLM08:2026) | Leakage of anything hidden in the model's context: system prompt, retrieved docs, memory, tool responses (secondary) | https://labs.cloudsecurityalliance.org/research/csa-research-note-owasp-genai-top10-2026-agent-control-stand/ |
| Unbounded Consumption | Uncontrolled token/compute use that drives cost or denial of service | https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/ |
| Agent Goal Hijack (ASI01) | Redirecting an agent's objective through content it reads (secondary) | https://cycode.com/blog/owasp-top-10-agentic-applications/ |
| Agent Control Standard (ACS) | OWASP GenAI project standard for runtime enforcement of agent controls | https://genai.owasp.org/2026/09/01/owasp-genai-security-project-unveils-2026-top-10-for-llm-applications-new-agent-control-standard-and-sponsors-as-community-tops-30000-members/ |
| GPAI model | General-purpose AI model under the EU AI Act; provider obligations since 2025-08-02 | https://ai-act-service-desk.ec.europa.eu/en/ai-act/timeline/timeline-implementation-eu-ai-act |
| AI Omnibus | Regulation (EU) 2026/1744 amending the AI Act; delays high-risk dates and simplifies compliance | https://interoperable-europe.ec.europa.eu/collection/free-and-open-source-software/news/artificial-intelligence-omnibus-regulation-enters-force |
| AIMS | AI Management System, the certifiable management-system scope of ISO/IEC 42001 | https://www.iso.org/standard/42001 |
| Multi Round-Trip Requests (MRTR) | MCP 2026-07-28 pattern: a server returns `input_required` and the client retries with answers, replacing server-initiated sampling/elicitation requests | https://modelcontextprotocol.io/specification/2026-07-28/changelog |
| Credits (Make) | Make's billing unit since 2025-08-27; ~1 per module action, more for AI Provider steps | https://help.make.com/introducing-credits-new-billing-unit-live-in-make |
| Execution (n8n) | n8n Cloud's billing unit: one workflow run regardless of step count | https://n8n.io/pricing/ |
| Next Gen Zaps | Zapier's early-access workflow type built from MCP clients or the canvas, with branching/rejoin, nested loops and self-healing | https://community.zapier.com/product-updates/the-next-generation-of-zaps-is-here-53832 |
| Managed Agents (GHL) | HighLevel agents metered per run (100/1,000 runs on Growth/Unlimited) | https://help.gohighlevel.com/support/solutions/articles/155000006652-ai-product-pricing |
| AI Studio (GHL) | HighLevel's prompt-to-app/website builder (GA 2026-09-22); not the agent builder | https://www.gohighlevel.com/post/highlevel-ai-studio-from-idea-to-fully-built-in-minutes |

Deprecated / renamed:

- Zapier Agents → **AI by Zapier** (agent = AI step in a Zap; activities → tasks), 2026-10-06.
- Make **operations → credits** as the billing unit, 2025-08-27.
- n8n AI Agent **agent types (ReAct, Conversational, etc.) deprecated** in 1.82.0; Tools Agent only. The v1 node "will be removed from n8n 3.0".
- n8n "AI Assistant" → **n8n Assistant** (2.40).
- LangGraph Platform → **LangSmith Deployment**; LangGraph Studio → **LangSmith Studio** (Oct 2025).
- OWASP LLM "System Prompt Leakage" → **Hidden Context Exposure** (2026 edition; secondary).
- MCP **Roots, Sampling, Logging deprecated**; HTTP+SSE transport Deprecated; Dynamic Client Registration deprecated in favour of Client ID Metadata Documents (2026-07-28).
- GHL **API v1 deprecated** (use v2 with Private Integration Tokens or OAuth).
- GHL MCP: PIT-auth, many-tool server → **OAuth v2 endpoints with 4 meta-tools** (the old tool names such as `contacts_get-contacts` are from the earlier design).
- GHL "AI Studio" (app builder) vs "Agent Studio" (agent builder): distinct products, easy to conflate.

## Could not verify

- GHL API v1 hard shutdown date: a secondary blog claims 2026-11-30 from an account notice. HighLevel's public post gives no date ("no immediate shutoff"). A search summary attributes a "2025-12-31 end-of-support" date to the help center, but I did not open that article.
- What Helicone's "no longer part of Mintlify" banner means (new owner, spin-out, shutdown): no details published yet.
- Exact Make plan dollar prices: the cards did not render on fetch.
- Zapier Agents add-on pricing: the pricing page still shows "activities" limits, which conflicts with the 2026-10-06 move to task billing. Which applies to legacy agents during migration is unclear.
- Whether Maia is still labelled "public beta" in the help center: the launch post says "live today for all Make users"; the help article body was not retrievable.
- Agent Studio GA status and the "AI Agent action in workflows" launch date (April 2026, secondary roundups only).
- OWASP 2026 LLM Top 10 full ordering: the official PDF was not opened, so the order comes from the CSA note (secondary).
- OWASP Agentic Top 10 details from the official page (secondary only).
- EU AI Act: GPAI models placed on the market before 2025-08-02 having until 2027-08-02 (original Art. 111). Not shown on the Service Desk timeline page, and not re-checked against the consolidated text. EUR-Lex returned empty content on fetch.
- NIST AI RMF revision release date (none announced).
- pgvector v0.8.7 release date (tag only, no GitHub release object).
- Make ownership by Celonis, and "all three ship native OpenAI/Anthropic/Gemini connections": not re-checked in this pass.
- Langfuse acquisition exact date (2026-01-16 per search summary; the official post was not opened for the date).
