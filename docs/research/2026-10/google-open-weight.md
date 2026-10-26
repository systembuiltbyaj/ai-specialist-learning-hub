# Google, xAI & open-weight models — verified 2026-10-26

Method: live fetches of vendor docs (ai.google.dev, docs.cloud.google.com, antigravity.google, docs.x.ai, x.ai, api-docs.deepseek.com, mistral.ai, kimi.com, ai.meta.com, developer.meta.com), Hugging Face org pages and API (`huggingface.co/api/models?author=…`), and the GitHub releases API. "HF created" dates are repository creation dates and can come before the public launch. Use them as an upper bound, not as the launch date.

## Model registry rows

| id | vendor | display name | API model id or HF repo | tier | released (only if sourced) | status | context window | license or pricing note (with date seen) | source URL |
|---|---|---|---|---|---|---|---|---|---|
| gemini-4-argon | Google | Gemini 4 Argon | `gemini-4-argon` | flagship | 2026-10-13 (GA) | current | 1,048,576 unified in+out; max output 65,536 (up to 1,048,576 with long decode) | Paid tier only. $2.00 in / $10.00 out per 1M through 2026-11-30, then $4.00 / $20.00 from 2026-12-01. Implicit caching only (seen 2026-10-26) | https://ai.google.dev/gemini-api/docs/models/gemini-4-argon · https://ai.google.dev/gemini-api/docs/pricing |
| gemini-3-8-flash | Google | Gemini 3.8 Flash | `gemini-3.8-flash` | balanced | 2026-09-02 (GA) | current | 1,048,576 in / 65,536 out | Free tier available. Paid: $0.75 in / $3.75 out through 2026-12-31, then $1.50 / $7.50 from 2027-01-01 (seen 2026-10-26) | https://ai.google.dev/gemini-api/docs/changelog |
| gemini-3-6-flash | Google | Gemini 3.6 Flash | `gemini-3.6-flash` | balanced | 2026-07-21 (GA) | current (labelled "previous-generation") | 1,048,576 / 65,536 | Same promo pricing as 3.8 Flash (seen 2026-10-26) | https://ai.google.dev/gemini-api/docs/deprecations |
| gemini-3-5-flash-lite | Google | Gemini 3.5 Flash-Lite | `gemini-3.5-flash-lite` | fast | 2026-07-21 (GA) | current | 1,048,576 / 65,536 | $0.30 in / $2.50 out; Batch $0.15 / $1.25 (seen 2026-10-26) | https://ai.google.dev/gemini-api/docs/pricing |
| gemini-3-1-flash-lite | Google | Gemini 3.1 Flash-Lite | `gemini-3.1-flash-lite` | fast | 2026-05-07 (GA) | current; earliest shutdown 2027-05-07 | not re-checked | $0.25 in (text/img/video) / $1.50 out (seen 2026-10-26) | https://ai.google.dev/gemini-api/docs/deprecations |
| gemini-3-1-pro-preview | Google | Gemini 3.1 Pro (Preview) | `gemini-3.1-pro-preview`, `gemini-3.1-pro-preview-customtools` | legacy (still preview, no longer the flagship) | 2026-02-19 (preview) | preview; no shutdown date announced | 1,048,576 / 65,536 | $2.00 / $12.00 at ≤200k prompt tokens; $4.00 / $18.00 above. No free tier (seen 2026-10-26) | https://ai.google.dev/gemini-api/docs/pricing |
| gemini-3-7-flash | Google | Gemini 3.7 Flash | `gemini-3.7-flash` | balanced | 2026-08-13 | deprecated 2026-10-08 (requests auto-route to 3.8 Flash) | — | — | https://ai.google.dev/gemini-api/docs/changelog |
| gemini-3-5-flash | Google | Gemini 3.5 Flash | `gemini-3.5-flash` | balanced | 2026-05-19 | deprecated 2026-10-08 (auto-routes to 3.6 Flash) | — | — | https://ai.google.dev/gemini-api/docs/changelog |
| gemini-3-pro-preview | Google | Gemini 3 Pro Preview | `gemini-3-pro-preview` | — | 2025-11-18 | retired 2026-03-09 (alias now points to 3.1 Pro Preview) | — | — | https://ai.google.dev/gemini-api/docs/deprecations |
| gemini-2-5-pro / flash / flash-lite | Google | Gemini 2.5 family | `gemini-2.5-pro`, `gemini-2.5-flash`, `gemini-2.5-flash-lite` | legacy | 2025 | legacy. Not deprecated, but since 2026-09-18 access is limited to prior users | — | — | https://ai.google.dev/gemini-api/docs/models |
| gemini-2-0-flash | Google | Gemini 2.0 Flash / Flash-Lite | `gemini-2.0-flash`, `gemini-2.0-flash-lite` | — | 2025-02 | retired 2026-06-01 | — | — | https://ai.google.dev/gemini-api/docs/deprecations |
| nano-banana-2-1 | Google | Nano Banana 2.1 | `gemini-nano-banana-2.1` | other (image) | 2026-10-06 (GA) | current | — | replaces Nano Banana 2 | https://ai.google.dev/gemini-api/docs/changelog |
| nano-banana-2 | Google | Nano Banana 2 | `gemini-3.1-flash-image` | other (image) | 2026-05-28 (GA) | deprecated 2026-10-06 (no shutdown date) | — | — | https://ai.google.dev/gemini-api/docs/changelog |
| nano-banana-pro | Google | Nano Banana Pro | `gemini-3-pro-image` | other (image) | 2026-05-28 (GA) | current | — | — | https://ai.google.dev/gemini-api/docs/models |
| imagen-4 | Google | Imagen 4 | `imagen-4.0-generate-001` etc. | other (image) | — | retired 2026-08-17 (Gemini API) | — | — | https://ai.google.dev/gemini-api/docs/changelog |
| gemini-omni-flash | Google | Gemini Omni Flash (video gen/edit) | `gemini-omni-1.1-flash` | other (video) | 2026-08-27 (GA) | current; the recommended Gemini API video model | — | — | https://ai.google.dev/gemini-api/docs/video |
| veo-3-1 | Google | Veo 3.1 (Preview) | `veo-3.1-generate-preview`, `-fast-`, `-lite-` | other (video) | — | retired in the Gemini API 2026-10-22. GA versions remain on Gemini Enterprise Agent Platform | — | — | https://ai.google.dev/gemini-api/docs/video |
| antigravity-agent | Google | Antigravity Agent (managed agent) | `antigravity-preview-09-2026` | other (agent) | 2026-09-17 | preview (replaced 05-2026, which shut down 2026-10-05) | — | — | https://ai.google.dev/gemini-api/docs/changelog |
| gemma-4 | Google | Gemma 4 (E2B, E4B, 12B, 26B-A4B, 31B) | `google/gemma-4-31B-it`, `google/gemma-4-26B-A4B-it`, … | open-weight | 2026-04-02 (Gemini API launch of 26B-A4B & 31B); 12B HF created 2026-05-23 | current | 256K / 128K per model card (size-dependent) | **Apache 2.0** (seen 2026-10-26) | https://huggingface.co/google/gemma-4-31B-it · https://ai.google.dev/gemini-api/docs/changelog |
| grok-4-7 | SpaceXSI (formerly xAI) | Grok 4.7 | `grok-4.7` | flagship | 2026-09-21 | current | 500k | $2 in / $0.50 cached / $6 out per 1M below 200k prompt tokens; $4 / $1 / $12 above. "Grok 4.7 Fast" costs 2x and is available only in Cursor and Grok Build (seen 2026-10-26) | https://docs.x.ai/developers/release-notes · https://docs.x.ai/docs/models |
| grok-2-open | xAI | Grok 2 (weights) | `xai-org/grok-2` | open-weight | HF created 2025-08-22 | legacy | — | license tag empty on HF | https://huggingface.co/xai-org/grok-2 |
| llama-4-scout | Meta | Llama 4 Scout | `meta-llama/Llama-4-Scout-17B-16E-Instruct` | open-weight | HF 2025-04-02 | legacy (no meta-llama release since 2025-04) | 10M (Meta blog) | Llama 4 Community License (HF tag "other") | https://ai.meta.com/blog/llama-4-multimodal-intelligence/ |
| llama-4-maverick | Meta | Llama 4 Maverick | `meta-llama/Llama-4-Maverick-17B-128E-Instruct` | open-weight | HF 2025-04-01 | legacy | not re-verified | Llama 4 Community License | https://huggingface.co/meta-llama |
| muse-glimmer | Meta (MSL) | Muse Glimmer 30B | `meta-models/Muse-Glimmer-30B` | open-weight | August 2026 (model card); HF 2026-08-09 | current | not stated | **Apache 2.0**. Distilled from Muse Spark; runs on a single GPU or a Mac Mini | https://huggingface.co/meta-models/Muse-Glimmer-30B · https://developers.meta.com/blog/meta-connect-recap/ |
| muse-spark-open | Meta (MSL) | Muse Spark Open 816B-A42B | `meta-models/Muse-Spark-Open-816B-A42B` | open-weight | HF 2026-09-15 | current | could not read (gated repo) | license "other" (gated; text not readable) | https://developer.meta.com/ai/ |
| muse-spark | Meta (MSL) | Muse Spark (1.3 latest per Connect) | Meta Model API | flagship (closed) | 2026-04-08 | current | — | proprietary | https://ai.meta.com/blog/introducing-muse-spark-msl/ |
| qwen3-8-27b | Alibaba Qwen | Qwen3.8-27B | `Qwen/Qwen3.8-27B` | open-weight | HF 2026-08-05 | current | 262,144 (card also mentions 524,288) | Apache 2.0 | https://huggingface.co/Qwen/Qwen3.8-27B |
| qwen3-8-max-open | Alibaba Qwen | Qwen3.8-2.4T-A95B (Max) | `Qwen/Qwen3.8-2.4T-A95B` | open-weight | HF 2026-08-08 (card says August 3, 2026) | current | 262,144 | "Qwen3.8-Max License": MIT-style, plus required attribution above 100M MAU or $20M monthly revenue, plus a MaaS clause above $50M revenue | https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B |
| qwen3-8-flash-next | Alibaba Qwen | Qwen3.8-Flash-Next | `Qwen/Qwen3.8-Flash-Next` | open-weight | HF 2026-08-24 | current | not checked | license "other" | https://huggingface.co/Qwen |
| deepseek-v4-1-flash | DeepSeek | DeepSeek-V4.1-Flash (-1017) | `deepseek-ai/DeepSeek-V4.1-Flash-1017`; API `deepseek-flash` | open-weight | V4.1-Flash 2026-09-10; -1017 update 2026-10-17 | current | 1M | MIT. API price per 1M: cache-miss input $0.15 off-peak / $0.30 peak; output $0.60 / $1.20 (seen 2026-10-26). 552B-backbone multimodal MoE | https://api-docs.deepseek.com/quick_start/pricing · https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash |
| deepseek-v4-pro | DeepSeek | DeepSeek-V4-Pro (-0813) | `deepseek-ai/DeepSeek-V4-Pro-0813`; API `deepseek-v4-pro` | open-weight (flagship) | preview 2026-04-24; GA 2026-08-13 | current | 1M (API) | MIT. API input $0.66 / $1.32, output $1.98 / $3.96 (off-peak / peak). No vision | https://api-docs.deepseek.com/quick_start/pricing |
| mistral-large-4 | Mistral | Mistral Large 4 | API preview (Mistral Studio) | open-weight (announced) | 2026-10-06 (public preview) | preview. Weights promised "end of this month"; no HF repo found 2026-10-26 | not stated | $1.36 in / $4.18 out per 1M | https://mistral.ai/news/mistral-large-4/ |
| mistral-medium-3-5 | Mistral | Mistral Medium 3.5 128B | `mistralai/Mistral-Medium-3.5-128B` | open-weight | HF 2026-03-31 | current | 256k | license "other" ("open-source license … with exceptions") | https://huggingface.co/mistralai/Mistral-Medium-3.5-128B |
| mistral-small-4 | Mistral | Mistral Small 4 119B | `mistralai/Mistral-Small-4-119B-2603` | open-weight | 2603 (Mar 2026) | current | not checked | Apache 2.0 | https://huggingface.co/mistralai |
| glm-5-3 | Zhipu / Z.ai | GLM-5.3 | `zai-org/GLM-5.3` | open-weight | HF 2026-08-25 (card date 2026/08/14) | current | evaluated at 300k; not stated as a hard limit | **GLM-5.3 License (no longer plain MIT)**: MIT-style, but a MaaS business above $10B revenue must pass Z.AI security review | https://huggingface.co/zai-org/GLM-5.3 |
| glm-5-3-flash | Zhipu / Z.ai | GLM-5.3-Flash | `zai-org/GLM-5.3-Flash` | open-weight | HF 2026-08-25 | current | not checked | MIT | https://huggingface.co/zai-org/GLM-5.3-Flash |
| glm-5-2 | Zhipu / Z.ai | GLM-5.2 | `zai-org/GLM-5.2` | open-weight | 2026-06-16 | legacy (card's `new_version` points to GLM-5.3) | not checked | MIT | https://huggingface.co/zai-org/GLM-5.2 |
| kimi-k3 | Moonshot | Kimi K3 | `moonshotai/Kimi-K3` | open-weight | HF created 2026-06-13; launch date not pinned (blog assets dated 2026-07-16/17) | current | 1M (blog) | Kimi K3 License: modified MIT, a separate agreement required for some commercial uses, attribution above 100M MAU or $20M monthly revenue. 2.8T params, 16 of 896 experts active | https://www.kimi.com/blog/kimi-k3 |
| kimi-k2-7-code | Moonshot | Kimi K2.7 Code | `moonshotai/Kimi-K2.7-Code` | open-weight | HF 2026-06-11 | current | not checked | license "other" | https://huggingface.co/moonshotai/Kimi-K2.7-Code |
| gpt-oss-120b | OpenAI | gpt-oss-120b / 20b | `openai/gpt-oss-120b`, `openai/gpt-oss-20b` | open-weight | HF 2025-08-04 | current (no newer gpt-oss on HF as of 2026-10-26) | not re-checked | Apache 2.0 | https://huggingface.co/openai |
| minimax-m3 | MiniMax | MiniMax-M3 / M3.1-Flash | `MiniMaxAI/MiniMax-M3`, `MiniMaxAI/MiniMax-M3.1-Flash` | open-weight | HF 2026-06-02 / 2026-10-17 | current | not checked | license "other" | https://huggingface.co/MiniMaxAI |

## Verified facts

1. Gemini 4 Argon (`gemini-4-argon`) went GA on 2026-10-13 and is Google's flagship reasoning model — https://ai.google.dev/gemini-api/docs/changelog — (official)
2. Gemini 4 Argon has a unified 1,048,576-token context, default max output of 65,536, and long decode up to 1M tokens. It supports thinking levels low/medium/high, but implicit caching only — https://ai.google.dev/gemini-api/docs/models/gemini-4-argon — (official)
3. Gemini 4 Argon is not on the free tier. It costs $2/$10 per 1M through 2026-11-30, then $4/$20 from 2026-12-01 — https://ai.google.dev/gemini-api/docs/pricing — (official)
4. Gemini 3.1 Pro is still **preview only** (`gemini-3.1-pro-preview`, released 2026-02-19), with no shutdown date announced. It costs $2/$12 at ≤200k tokens and $4/$18 above — https://ai.google.dev/gemini-api/docs/deprecations — (official)
5. Gemini 3.8 Flash went GA 2026-09-02. Its promo price of $0.75/$3.75 doubles to $1.50/$7.50 on 2027-01-01 — https://ai.google.dev/gemini-api/docs/pricing — (official)
6. Gemini 3.7 Flash and 3.5 Flash were deprecated 2026-10-08. Their endpoints auto-route to 3.8 Flash and 3.6 Flash respectively — https://ai.google.dev/gemini-api/docs/changelog — (official)
7. Since 2026-09-18, access to the Gemini 2.5 models is limited to users who have used them before. They are not deprecated. Google recommends 3.5 Flash-Lite or 3.8 Flash for new work — https://ai.google.dev/gemini-api/docs/models — (official)
8. Gemini 2.0 Flash and Flash-Lite shut down 2026-06-01 — https://ai.google.dev/gemini-api/docs/deprecations — (official)
9. Nano Banana 2.1 (`gemini-nano-banana-2.1`) went GA 2026-10-06, and `gemini-3.1-flash-image` (Nano Banana 2) is deprecated — https://ai.google.dev/gemini-api/docs/changelog — (official)
10. Imagen 4 models shut down in the Gemini API on 2026-08-17 — https://ai.google.dev/gemini-api/docs/changelog — (official)
11. Veo 3.1 Preview in the Gemini API shut down 2026-10-22. Google now recommends Gemini Omni Flash (`gemini-omni-1.1-flash`) or the GA Veo models on Gemini Enterprise Agent Platform — https://ai.google.dev/gemini-api/docs/video — (official)
12. Vertex AI was renamed **Gemini Enterprise Agent Platform** on 2026-04-22. Vertex AI Studio became Agent Studio, and the Vertex AI API became the Agent Platform API — https://docs.cloud.google.com/gemini-enterprise-agent-platform/release-notes — (official)
13. Antigravity is now "Generally Available". The individual plan is $0/month with basic weekly rate limits, Google AI Pro and Ultra raise the limits, and Business runs through Gemini Enterprise (Standard/Plus from $30/seat/month, or pay-as-you-go) — https://antigravity.google/pricing — (official)
14. Antigravity 2.0, the Antigravity CLI, the Antigravity SDK and "Changes to Antigravity plans" were all announced 2026-05-19. IDE extensions followed 2026-08-20 — https://antigravity.google/blog/rss.xml — (official)
15. Antigravity's reasoning-model roster includes Gemini 4 Argon (Pro/Ultra/Enterprise; not in the Antigravity IDE), Gemini 3.8 Flash (all plans), Claude Sonnet/Opus 5.5 (Pro/Ultra/Enterprise) and GPT-OSS-120b. The Claude 4.6 models and GPT-OSS-120b will be removed 2026-11-02 — https://antigravity.google/docs/models — (official)
16. Gemini CLI's latest stable release is v0.65.0 (2026-10-20), Apache-2.0, with nightlies at v0.67.0 — https://github.com/google-gemini/gemini-cli/releases — (official)
17. Jules is still active. Its latest changelog entry announces Gemini 3.1 Pro in Jules for Google Pro plan users — https://jules.google/docs/changelog/ — (official)
18. Gemma 4 launched 2026-04-02 with `gemma-4-26b-a4b-it` and `gemma-4-31b-it` on the Gemini API and AI Studio. Gemma 4 is licensed Apache 2.0 — https://ai.google.dev/gemini-api/docs/changelog · https://huggingface.co/google/gemma-4-31B-it — (official)
19. Grok 4.7 (`grok-4.7`) went live on the API 2026-09-21. It has a 500k context and reasoning effort low/medium/high/xhigh, and costs $2/$0.50/$6 below 200k tokens and $4/$1/$12 above — https://docs.x.ai/developers/release-notes — (official)
20. xAI's official docs and site now brand the company "SpaceXSI" (page titles "SpaceXSI Docs" and "SpaceXSI") — https://docs.x.ai/docs/models — (official). The rename went xAI → SpaceXAI → SpaceXSI, after Musk said "Yes, we will make that change" on 2026-10-04 — https://teslanorth.com/2026/10/10/spacexai-spacexsi-x-rename/ — (secondary)
21. On 2026-10-12, "The X Subscription" was launched, bundling Grok, Grok Bot, Cursor and X Premium. Existing SuperGrok, Cursor and X Premium subscribers can keep their current plans — https://x.ai/news/x-subscription — (official). Tier prices: Premium $30, Super $100, Ultra $200 per month — https://cursor.com/pricing — (official, Cursor billing page)
22. Meta launched Muse Spark, its first Meta Superintelligence Labs model, on 2026-04-08 as a closed model — https://ai.meta.com/blog/introducing-muse-spark-msl/ — (official)
23. Meta released Muse Glimmer, a 30B open-weights model under Apache 2.0, in August 2026, and lists "Muse Spark Open" (816B-A42B) as an open-weight model — https://huggingface.co/meta-models/Muse-Glimmer-30B · https://developer.meta.com/ai/ — (official)
24. The `meta-llama` HF org has had no new model release since April 2025 (Llama 4 / Llama Guard 4) — https://huggingface.co/meta-llama — (official)
25. Llama 4 Scout has a 10M-token context window — https://ai.meta.com/blog/llama-4-multimodal-intelligence/ — (official)
26. DeepSeek's release timeline: V4 Preview 2026-04-24, V4-Pro GA 2026-08-13, V4-Flash-Vision-Exp 2026-08-21, V4.1-Flash 2026-09-10, V4.1-Flash-1017 2026-10-17 — https://api-docs.deepseek.com/news/news260910 — (official)
27. DeepSeek API model names are now `deepseek-flash` (→ V4.1-Flash-1017) and `deepseek-v4-pro`. Both have a 1M context, and pricing is split into peak and off-peak rates — https://api-docs.deepseek.com/quick_start/pricing — (official)
28. GLM-5.3 uses the same base model as GLM-5.2; Z.ai calls it "the most capable open-weights model for coding". Its license moved from MIT to a custom GLM-5.3 License — https://huggingface.co/zai-org/GLM-5.3 — (official)
29. GLM-5.2 was released 2026-06-16 under MIT — https://huggingface.co/zai-org/GLM-5.2 — (official)
30. Kimi K3 has 2.8T parameters (16 of 896 experts active), native vision and a 1M context. Moonshot calls it "the world's first open 3T-class model" and says it still trails Claude Fable 5 and GPT 5.6 Sol — https://www.kimi.com/blog/kimi-k3 — (official)
31. Mistral Large 4 entered public API preview 2026-10-06 at $1.36/$4.18. Weights are promised "by the end of the month" — https://mistral.ai/news/mistral-large-4/ — (official)
32. Qwen3.8 shipped Aug 2026 in two license tracks: 27B under Apache 2.0, and the 2.4T-A95B "Max" under the Qwen3.8-Max License — https://huggingface.co/Qwen — (official)
33. Ollama is on v0.40.11 (2026-10-24), MIT. It added speech model support on 2026-10-24, and its repo description no longer mentions Llama — https://github.com/ollama/ollama · https://ollama.com/blog — (official)
34. vLLM is on v0.32.0 (2026-10-18), Apache-2.0 — https://github.com/vllm-project/vllm/releases — (official)
35. llama.cpp ships continuous builds (b11889 on 2026-10-25), MIT — https://github.com/ggml-org/llama.cpp/releases — (official)
36. LM Studio introduced "LM Studio Bionic: the AI agent for open models" on 2026-07-16, and the site now leads with Bionic — https://lmstudio.ai/blog/introducing-lm-studio-bionic — (official)

## Site claim audit

| file:line | claim | verdict | correct value | source |
|---|---|---|---|---|
| app/lib/seed/tools.ts:111 | "Gemini 3.1 Pro" as Google's model card | WRONG (stale) | Google's flagship is **Gemini 4 Argon** (`gemini-4-argon`, GA 2026-10-13). 3.1 Pro is still preview-only | https://ai.google.dev/gemini-api/docs/models |
| app/lib/seed/tools.ts:116 | "Huge (1M+) context window" | CONFIRMED | 1,048,576 tokens (3.1 Pro and 4 Argon) | https://ai.google.dev/gemini-api/docs/models/gemini-4-argon |
| app/lib/seed/tools.ts:130 | "Competitive — cheap Flash tier, paid Pro tier" | CONFIRMED but vague | Flash: 3.8 Flash $0.75/$3.75 (promo to 2026-12-31, then $1.50/$7.50). Flash-Lite: $0.30/$2.50. Flagship: 4 Argon $2/$10 (promo to 2026-11-30, then $4/$20) | https://ai.google.dev/gemini-api/docs/pricing |
| app/lib/seed/tools.ts:136 | "Grok 4.7" | CONFIRMED | `grok-4.7`, released 2026-09-21, 500k context | https://docs.x.ai/developers/release-notes |
| app/lib/seed/tools.ts:137 | creator: "xAI" | WRONG (renamed) | Official docs now say "SpaceXSI" (via "SpaceXAI"). Suggest "SpaceXSI (formerly xAI)" | https://docs.x.ai/docs/models |
| app/lib/seed/tools.ts:156 | "API ~$2/M input, $6/M output" | CONFIRMED (≤200k-token prompts) | $2 / $0.50 cached / $6. Above 200k: $4 / $1 / $12 | https://docs.x.ai/developers/release-notes |
| app/lib/seed/tools.ts:156 | "Included with X Premium+" | WRONG (outdated) | Since 2026-10-12, Grok consumer access is sold as **The X Subscription** (Premium $30 / Super $100 / Ultra $200, bundling Grok, Cursor and X Premium). Legacy Premium+ subscribers can keep their plan | https://x.ai/news/x-subscription |
| app/lib/seed/tools.ts:300 | "Powered by Gemini 3" | WRONG (stale) | Multi-model: Gemini 4 Argon, Gemini 3.8 Flash, Claude Sonnet/Opus 5.5 and GPT-OSS-120b, depending on plan | https://antigravity.google/docs/models |
| app/lib/seed/tools.ts:301 | "Built on VS Code base" | UNVERIFIABLE | Antigravity now ships as App, CLI, IDE and IDE extensions. The VS Code lineage was not confirmed in this pass | https://antigravity.google/blog/rss.xml |
| app/lib/seed/tools.ts:302, :314 | "Free during preview" / "Free in preview" | WRONG | **Generally Available**: $0 individual plan with basic weekly rate limits; Google AI Pro/Ultra for higher limits; Business via Gemini Enterprise ($30/seat Standard/Plus, or pay-as-you-go) | https://antigravity.google/pricing |
| app/lib/seed/devtools.ts:49 | badge "Free preview" | WRONG | "Free tier · GA" | https://antigravity.google/pricing |
| app/lib/seed/devtools.ts:51, :85 | "up to 8 agents" | UNVERIFIABLE | No official agent cap found. Antigravity 2.0 added subagents and custom agents | https://antigravity.google/blog/rss.xml |
| app/lib/seed/devtools.ts:85 | "✓ preview" (free column) | WRONG | Free tier, GA | https://antigravity.google/pricing |
| app/lib/seed/devtools.ts:120 | "Gemini 3.1 Pro … Google DeepMind's flagship" | WRONG (stale) | Gemini 4 Argon is the flagship. 3.1 Pro remains preview | https://ai.google.dev/gemini-api/docs/changelog |
| app/lib/seed/devtools.ts:129 | "Llama 4 (Scout / Maverick)" as the Meta open-weight pick | WRONG (stale) | Llama 4 (Apr 2025) is Meta's last Llama release. Meta's current open weights are **Muse Glimmer 30B** (Apache 2.0, Aug 2026) and **Muse Spark Open 816B-A42B** (Sep 2026, custom license) | https://developer.meta.com/ai/ · https://huggingface.co/meta-llama |
| app/lib/seed/devtools.ts:133-135 | "up to ~10M-token context" | CONFIRMED (Scout only) | Llama 4 Scout 10M. Maverick's context was not re-verified | https://ai.meta.com/blog/llama-4-multimodal-intelligence/ |
| app/lib/seed/devtools.ts:134 | "biggest community and ecosystem" | UNVERIFIABLE | No measurable source. Ollama's own repo description now leads with Kimi, GLM, MiniMax, DeepSeek, gpt-oss, Qwen and Gemma | https://github.com/ollama/ollama |
| app/lib/seed/devtools.ts:138 | "GLM-5.3" | CONFIRMED | `zai-org/GLM-5.3`, HF 2026-08-25 | https://huggingface.co/zai-org/GLM-5.3 |
| app/lib/seed/devtools.ts:139-141 | pill "Open Source", badge "Free" | WRONG (license) | Open-weight under the **GLM-5.3 License**, not MIT/OSI. It is free to use, but a MaaS business above $10B revenue needs Z.AI security review. GLM-5.3-Flash is MIT | https://huggingface.co/zai-org/GLM-5.3 |
| app/lib/seed/devtools.ts:142 | "Top open model for coding agents" | CONFIRMED (vendor claim) | Z.ai calls it "the most capable open-weights model for coding". Kimi K3 is close on Terminal Bench 2.1 (88.3 vs 88.2, vendor table) | https://huggingface.co/zai-org/GLM-5.3 |
| app/lib/seed/devtools.ts:147 | "DeepSeek V4.1" | WRONG (imprecise) | No plain "V4.1" exists. The models are **DeepSeek-V4.1-Flash** (2026-09-10; -1017 update) and the flagship **DeepSeek-V4-Pro** (GA 2026-08-13). Both MIT | https://api-docs.deepseek.com/news/news260910 |
| app/lib/seed/devtools.ts:150 | "Cheapest path to frontier-level quality" | CONFIRMED (pricing) | `deepseek-flash` input $0.15–0.30 / output $0.60–1.20 per 1M (off-peak/peak) | https://api-docs.deepseek.com/quick_start/pricing |
| app/lib/seed/webguide.ts:303 | Closed examples "(Claude, ChatGPT, Gemini)" | CONFIRMED | — | — |
| app/lib/seed/webguide.ts:304 | Open Source "Anyone can download and run it (Llama, Qwen, DeepSeek)" | WRONG (terminology) | These are **open-weight** models, and licenses vary (Llama Community License, Qwen3.8-Max License, MIT for DeepSeek). The OSI definition of open-source AI also requires data information and code. Relabel as "Open weights" | https://opensource.org/ai/open-source-ai-definition |
| app/lib/seed/webguide.ts:409 | "Gemini 3.1 Pro — cheap at scale" | WRONG | The cheap-at-scale model is Gemini 3.8 Flash or 3.5 Flash-Lite. 3.1 Pro is preview-only, costs $2/$12, and has no free tier | https://ai.google.dev/gemini-api/docs/pricing |
| app/lib/seed/updates.ts:30 | "Zhipu's GLM-5.2 (Jun 16)" | CONFIRMED | GLM-5.2, 2026-06-16, MIT | https://huggingface.co/zai-org/GLM-5.2 |
| app/lib/seed/updates.ts:30 | "Moonshot (Kimi K2.7 Code)" in June | CONFIRMED | `moonshotai/Kimi-K2.7-Code`, HF 2026-06-11 | https://huggingface.co/moonshotai/Kimi-K2.7-Code |
| app/lib/seed/updates.ts:30 | Cohere coding model, June | UNVERIFIABLE (out of domain) | — | — |
| app/lib/seed/updates.ts:30 | Source "llm-stats.com" | NOTE | Aggregator. Cite the vendor pages instead | — |
| app/lib/seed/updates.ts:54 | n8n AI Agent node supports "Gemini" | UNVERIFIABLE (out of domain) | — | — |
| data/dictionary.ts:217 | foundation model examples "Claude, GPT, or Gemini" | CONFIRMED | — | — |
| data/dictionary.ts:2264-2272 | term "Open Source Model" with alias "open weights" | WRONG (conflation) | Make "Open-weight model" the primary term and keep "open source" for OSI-compliant releases. The examples are open-weight models | https://opensource.org/ai/open-source-ai-definition |
| data/dictionary.ts:2272 | "Running Llama locally via Ollama" | CONFIRMED but dated | Valid, but Llama is no longer the default local example. Gemma 4, Qwen3.8-27B or Muse Glimmer are current | https://ollama.com/blog |
| data/dictionary.ts:2283 | "Most top models (Claude, GPT, Gemini) are closed" | CONFIRMED | — | — |

## New developments since June 2026 worth covering

- **Gemini 4 Argon** (GA 2026-10-13): a new flagship with long decode up to 1M output tokens. Its introductory price doubles on 2026-12-01.
- **Gemini Flash cadence**: 3.6 Flash and 3.5 Flash-Lite (Jul 21), 3.7 Flash (Aug 13), 3.8 Flash (Sep 2). 3.5 and 3.7 Flash were deprecated within months, and their endpoints silently auto-route to newer models. The lesson for readers: pin model IDs, and watch `-latest` aliases.
- **Gemini 2.5 access restricted** (2026-09-18) to prior users.
- **Google media consolidation**: Imagen 4 shut down (Aug 17), Veo 3.1 preview shut down in the Gemini API (Oct 22), Gemini Omni Flash GA (Aug 27), Nano Banana 2.1 GA (Oct 6), Lyria 3.5 GA (Sep 3).
- **Gemini 3.8 Live / TTS / 3.5 Transcribe**: new speech-model stack (Aug–Sep 2026).
- **Vertex AI → Gemini Enterprise Agent Platform** (Apr 22, 2026). Any site copy that says "Vertex AI" should use the new name.
- **Antigravity**: GA, version 2.0 (May 19), CLI and SDK, IDE extensions (Aug 20), custom agents (Aug 12), a Gemini Enterprise tier, and a managed Antigravity Agent API (`antigravity-preview-09-2026`). It also hosts Claude models.
- **xAI → SpaceXSI** branding, **Grok 4.7** (Sep 21), and **The X Subscription** (Oct 12), which bundles Grok, Cursor and X Premium.
- **Meta pivot**: Muse Spark (closed, Apr 8), then the open-weight Muse Glimmer 30B (Apache 2.0, Aug) and Muse Spark Open 816B-A42B (Sep). Llama is dormant.
- **Kimi K3** (2.8T, 1M context, open-weight), **GLM-5.3** (Aug), **Qwen3.8** family (Aug), **DeepSeek V4-Pro GA / V4.1-Flash** (Aug–Oct), **Mistral Large 4** preview (Oct 6, weights pending), **MiniMax M3 / M3.1-Flash**.
- **License trend**: flagship Chinese open-weight releases are moving from plain MIT/Apache to custom "MIT-plus" licenses (GLM-5.3, Qwen3.8-Max, Kimi K3) with revenue- or MAU-based conditions. Their smaller siblings stay MIT/Apache (GLM-5.3-Flash, Qwen3.8-27B). This is good material for an "open-weight vs open-source" explainer.
- **Self-hosting tools**: Ollama added speech models and a cloud offering. LM Studio repositioned as "LM Studio Bionic", an agent for open models. vLLM v0.32.

## Terminology

| term | definition | authoritative URL |
|---|---|---|
| Open-weight model | Model weights are downloadable under some license. This does not imply the training data or code are open, or that the license is OSI-approved | https://opensource.org/ai/open-source-ai-definition |
| Open-source AI (OSAID) | OSI definition: grants freedom to use, study, modify and share, and requires data information, code and weights | https://opensource.org/ai/open-source-ai-definition |
| Quantization | Storing weights and activations at lower precision (8/4-bit, FP8, NVFP4, MXFP4) to cut memory and speed up inference | https://huggingface.co/docs/transformers/main/en/quantization/overview |
| QAT (quantization-aware training) | Training with quantization simulated, so the low-bit model loses less quality. Used by Gemma 4 "-qat" checkpoints and Kimi K3 | https://www.kimi.com/blog/kimi-k3 |
| GGUF | Single-file model format used by llama.cpp, Ollama and LM Studio for local inference | https://huggingface.co/docs/hub/gguf |
| Mixture of Experts (MoE) | Only a subset of expert sub-networks runs per token. Naming like "26B-A4B" or "816B-A42B" means total params vs active params | https://huggingface.co/blog/moe |
| Distillation | Training a smaller "student" model to mimic a larger "teacher" (e.g., Muse Glimmer distilled from Muse Spark) | https://arxiv.org/abs/1503.02531 |
| Long decode | Gemini 4 Argon's mode allowing output up to ~1M tokens | https://ai.google.dev/gemini-api/docs/models/gemini-4-argon |
| Flex / Priority inference | Gemini API service tiers (launched 2026-04-01) that trade cost against latency | https://ai.google.dev/gemini-api/docs/flex-inference |
| Model as a Service (MaaS) | Hosting a model for third parties via API. Several 2026 open-weight licenses restrict it above revenue thresholds | https://huggingface.co/zai-org/GLM-5.3 |
| Model lifecycle: stable / preview / latest / experimental, deprecated vs shut down | Gemini naming and lifecycle stages. "Deprecated" means a shutdown is announced; "shut down" means the endpoint is gone. Some deprecated IDs now auto-route instead of failing | https://ai.google.dev/gemini-api/docs/deprecations |

**Deprecated or renamed terms**
- "Vertex AI" → **Gemini Enterprise Agent Platform**. "Vertex AI Studio" → **Agent Studio** (2026-04-22).
- "xAI" → **SpaceXSI** in official docs (company brand). The product name remains Grok.
- "X Premium+ (Grok access)" → **The X Subscription** tiers (legacy plans grandfathered).
- "Imagen" (Gemini API) → retired. Image generation is now **Nano Banana** (2.1 / Pro / 2 Lite).
- "Veo" in the Gemini API → **Gemini Omni Flash**. Veo GA remains on Agent Platform.
- "LM Studio" → now marketed as **LM Studio Bionic** (agent app).
- "deepseek-v4-flash" API name → **`deepseek-flash`** (legacy name still accepted).
- "Llama" as Meta's flagship → **Muse** family.

## Could not verify

- Whether Antigravity is "built on VS Code base" today, and any "up to 8 agents" cap.
- Muse Spark Open's license terms and context window (the HF repo is gated; LICENSE returned 401).
- Kimi K3's exact public launch date (HF repo created 2026-06-13; blog assets dated 2026-07-16/17).
- Llama 4 Maverick's context window (not re-fetched this pass).
- Jules V2 / "Project Jitro" from I/O 2026 (single secondary source, aiweekly.co). Jules plan pricing.
- Antigravity Google AI Pro/Ultra plan prices (the pricing page names the plans but lists no price).
- Mistral Large 4 parameter count, context window and final license (weights not yet released as of 2026-10-26).
- Gemma 4 per-size context windows (card shows 256K/128K; the size mapping was not confirmed).
- Official corporate confirmation of the SpaceXSI legal-entity rename. Official docs use the brand, and news reports cite only Musk's X post.
