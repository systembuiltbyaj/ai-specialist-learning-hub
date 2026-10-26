# AI coding tools & media AI — verified 2026-10-26

Method: official vendor pages fetched live on 2026-10-26 (pricing, docs, changelogs, blogs, GitHub). Secondary outlets used only to corroborate and labelled as such. "Seen" dates are fetch dates. Several pricing pages render partly client-side; where figures did not load, the row says so.

## Tool registry rows

| id | vendor | name | category | current version (only if sourced) | status | pricing note (with date seen) | source URL |
|---|---|---|---|---|---|---|---|
| cursor | Anysphere (wholly owned by SpaceX since 2026-08-14) | Cursor | ide | Desktop 3.27 (download page); own models Grok 4.7 / 4.6 / 4.5 + Composer 2.5 | acquired | Free $0 · Plus $8 (Grok models only) · Premium $30 · Super $100 · Ultra $200 · Teams $30+/user · Enterprise custom. Bundled with X/Grok features. Claude/GPT/Gemini billed separately at API list price, Premium and up only (seen 2026-10-26) | https://cursor.com/pricing · https://cursor.com/docs/models-and-pricing · https://cursor.com/download |
| devin-desktop | Cognition | Devin Desktop (formerly Windsurf) | ide | model SWE-2 (2026-09-10) | active (renamed) | Free $0 · Pro $20/mo · Max $200/mo · Teams $80/mo + $40/dev seat · Enterprise custom (seen 2026-10-26; windsurf.com/pricing 308 to devin.ai/pricing) | https://devin.ai/pricing · https://devin.ai/blog/windsurf-is-now-devin-desktop |
| devin | Cognition | Devin (Cloud / CLI / Review) | autonomous-agent | SWE-2 | active | Same plan grid as Devin Desktop above (seen 2026-10-26) | https://devin.ai/ · https://cognition.com/blog/swe-2 |
| cline | Cline Bot Inc. | Cline | ide (extension) + cli-agent | VS Code ext 4.1.25 (inferred from marketplace asset URL) | active | Open source (Apache-2.0), free for individuals, pay inference/BYOK · Enterprise custom (seen 2026-10-26). 5,735,223 VS Code installs | https://cline.bot/pricing · https://github.com/cline/cline · https://marketplace.visualstudio.com/items?itemName=saoudrizwan.claude-dev |
| roo-code | Roo Code Inc. | Roo Code | ide (extension) | — | discontinued | Extension shut down 2026-05-15; repo archived. README points to ZooCode (fork) and Cline | https://github.com/RooCodeInc/Roo-Code |
| roomote | Roo Code team | Roomote | autonomous-agent | — | active | Cloud $49/mo (≤10 users) · $249 (11–50) · $499 (51–100); self-hosted free ≤10 users (seen 2026-10-26; roocode.com 301s here) | https://roomote.dev/ |
| aider | Aider-AI (open source) | Aider | cli-agent | v0.86.1 (latest numbered; v0.86.0 dated 9 Aug, release notes imply 2025) | active, but no numbered release in ~14 months | Free, open source, BYO model key | https://aider.chat/HISTORY.html · https://github.com/Aider-AI/aider/releases |
| zed | Zed Industries | Zed | ide | 1.25.3 (2026-10-23) | active | Personal $0 · Pro $10/mo (incl. $5 tokens, then API +10%) · Business $30/seat/mo (seen 2026-10-26) | https://zed.dev/pricing · https://zed.dev/releases/stable |
| junie | JetBrains | Junie (agent: CLI, IDE, GitHub/GitLab) | cli-agent | — | active | Junie Lite free; BYOK at provider rate; AI Pro "$8.33/user/mo" 10 credits; AI Ultimate "$25/user/mo" 35 credits (junie page, billing period unstated). JetBrains help 2026.2 page shows two conflicting tables ($10/$30 and $20/$60) (seen 2026-10-26) | https://junie.jetbrains.com/ · https://www.jetbrains.com/help/ai-assistant/2026.2/licensing-and-subscriptions.html |
| replit-agent | Replit | Replit Agent | app-builder | no version named on official pages | active | Core $20/mo ($18 annual) incl. $20 credits · Pro $100/mo ($90 annual) · Enterprise custom; "Free Mode" chat (seen 2026-10-26) | https://replit.com/pricing · https://replit.com/blog/ |
| lovable | Lovable | Lovable | app-builder | — | active | Free: 5 build credits/day (≤30/mo) + 20 Cloud credits/mo. Paid prices did not render (seen 2026-10-26) | https://lovable.dev/pricing · https://docs.lovable.dev/introduction/plans-and-credits |
| bolt-new | StackBlitz (inferred from ToS links) | Bolt.new | app-builder | — | active | Free 1M tokens/mo (300K/day) · Pro $18/mo annual ($25 monthly-equivalent) 10M tokens · Teams $27/member/mo annual · Enterprise custom (seen 2026-10-26) | https://bolt.new/pricing |
| v0 | Vercel | v0 | app-builder | — | active | Free (7 messages/day) · Plus $30/user/mo ($30 credits + $2/day) · Business $100/user/mo · Enterprise custom (seen 2026-10-26) | https://v0.app/pricing |
| openhands | OpenHands (cloud at all-hands.dev) | OpenHands / Agent Canvas | autonomous-agent | 1.33.0 (Docker quickstart) | active | Agent Canvas free, MIT, self-host · Teams $499/mo (≤10 users, +$50/seat, 5,000 sessions/mo cap) · Enterprise custom · OpenHands Cloud commercial (seen 2026-10-26). 91.9k stars | https://openhands.dev/pricing · https://github.com/OpenHands/OpenHands |
| kiro | AWS | Kiro (IDE + CLI) | ide | Kiro CLI V3 default from 2026-10-09 | active | Free $0 50 credits · Pro $20 1,000 · Pro+ $40 2,000 · Pro Max $100 5,000 · Power $200 10,000; overage $0.04/credit (seen 2026-10-26) | https://kiro.dev/pricing/ · https://kiro.dev/blog/ |
| warp | Warp | Warp Terminal / Agent CLI / Warp Factories | cli-agent | — | active | Free $0 · Build $20/mo ($20 agent usage) · Max $200/mo · Business $50/user/mo · Enterprise custom; Factories billed separately (seen 2026-10-26) | https://www.warp.dev/pricing |
| amp | Amp Frontier Corporation (spun out of Sourcegraph, 2025-12-02) | Amp | cli-agent | — | active | Hobby free · Individual $20/mo · Teams "no extra charge" · Enterprise custom; can run on linked ChatGPT or Claude plan (seen 2026-10-26) | https://ampcode.com/pricing · https://ampcode.com/news |
| antigravity | Google | Google Antigravity | ide | Antigravity 2.0 (2026-05-19); Gemini 4 Argon added 2026-10-13 | active (GA) | Individuals $0 · higher limits via Google AI Pro / Ultra · business via Google Cloud from $30/seat/mo or pay-as-you-go (seen 2026-10-26) | https://antigravity.google/pricing · https://antigravity.google/blog |
| openclaw | OpenClaw Foundation (501(c)(3)) | OpenClaw | autonomous-agent (personal assistant runtime) | — | active | Free, MIT, self-hosted; BYO model. 393.1k stars | https://github.com/openclaw/openclaw · https://docs.openclaw.ai |
| hermes-agent | Nous Research | Hermes Agent | autonomous-agent (personal assistant runtime) | — | active | Free, MIT, self-hosted; BYO model (Nous Portal, OpenRouter, OpenAI, custom). 257.1k stars | https://github.com/NousResearch/hermes-agent |
| sora | OpenAI | Sora 2 / Sora 2 Pro | video | sora-2, sora-2-pro | discontinued | API and Videos API shut down 2026-09-24, "no one-to-one replacement". App shutdown announced 2026-03-24 (app end date 2026-04-26 is secondary) | https://developers.openai.com/api/docs/guides/video-generation |
| veo | Google DeepMind | Veo 3.1 | video | Veo 3.1 (1080p/4K, native audio) | active in Gemini app / Flow / Vids / Enterprise; Gemini API preview IDs shut down 2026-10-22 | API users told to migrate to Gemini Omni Flash or GA models on Gemini Enterprise Agent Platform | https://deepmind.google/models/veo/ · https://ai.google.dev/gemini-api/docs/video |
| gemini-omni-flash | Google | Gemini Omni Flash | video | gemini-omni-1.1-flash (stable) | active | Gemini app / Flow for AI Plus, Pro, Ultra; free in YouTube Shorts Remix / YouTube Create (announced I/O, May 2026) | https://ai.google.dev/gemini-api/docs/models · https://blog.google/innovation-and-ai/technology/ai/google-io-2026-all-our-announcements/ |
| runway | Runway (runwayml.com 308s to runway.com) | Gen-4.5 (+ Aleph 2.0, GWM Worlds 2 preview) | video | Gen-4.5 (no date on page) | active | Free 125 one-time credits · Standard $12/mo annual ($15) 625 cr · Pro $28 ($35) 2,250 cr · Max $76 ($95) 9,500 cr (seen 2026-10-26) | https://runway.com/research · https://runway.com/pricing |
| kling | Kuaishou (owner per secondary) | Kling 4.0 | video | Kling 4.0 (launched 2026-10-15, secondary); Kling Image 3.0 | active | API pricing at kling.ai/dev/pricing (did not fetch) | https://kling.ai/ |
| luma | Luma AI | Ray3.2 | video | Ray3.2 (2026-06-09) | active | No prices on homepage; app.lumalabs.ai | https://lumalabs.ai/ |
| pika | Pika | Pika 2.5 | video | Pika 2.5 | active | Free $0 · Starter $10 (900 cr) · Creator $35 (3,150) · Fancy $95+ (8,550+); card and table figures conflict (seen 2026-10-26) | https://pika.art/pricing |
| hailuo | MiniMax | Hailuo / MiniMax H3 | video | H3 (2026-07-31 per secondary; H3 Max 2026-09-02 per OpenRouter) | active | Price did not render on site; OpenRouter lists from $0.13/s (secondary) | https://hailuoai.video/ |
| midjourney | Midjourney | Midjourney V8.x | image | V8.1 default 2026-06-11 (official); V8.2 default 2026-07-24 (secondary only) | active | Official docs and pricing returned 403 | https://updates.midjourney.com/v8-1-is-now-the-default-model |
| gpt-image | OpenAI | GPT-Image-2.5 (Sunburst / Flare) | image | gpt-image-2.5-sunburst-2026-09-08 | active | Sunburst: text in $5/1M, image in $8/1M, image out $30/1M ($15 batch) (seen 2026-10-26) | https://developers.openai.com/api/docs/models/gpt-image-2.5-sunburst |
| nano-banana | Google | Nano Banana 2.1 / 2 / 2 Lite / Pro | image | gemini-nano-banana-2.1 (stable); gemini-3.1-flash-image; gemini-3-pro-image | active | See Gemini API pricing (not fetched). Imagen 4 shut down | https://ai.google.dev/gemini-api/docs/models |
| flux | Black Forest Labs | FLUX 3 (Image, Video, Max, Image Klein, Action) | image + video | FLUX 3 (2026-07-23); Image Klein 5.6B open weights (2026-10-15) | active | API pricing at bfl.ai pricing page (not fetched) | https://bfl.ai/ · https://bfl.ai/blog |
| ideogram | Ideogram | Ideogram 4.5 | image | 4.5 (highest listed; 4.0 also current) | active | Pricing page 403 | https://docs.ideogram.ai/create/models.md |
| elevenlabs | ElevenLabs | Eleven v4 / v4 Turbo; Scribe v2; Music v2.5 | voice | eleven_v4, eleven_v4_turbo (launched 2026-09-28, date secondary) | active | Not fetched; $22/$11 per 1M chars intro API price is secondary only | https://elevenlabs.io/docs/models · https://elevenlabs.io/v4 |
| openai-realtime | OpenAI | GPT-Realtime-2.1 / GPT-Live 1 | voice | gpt-realtime-2.1, gpt-realtime-2.1-mini, gpt-live-1, gpt-transcribe | active | gpt-realtime-2.1 audio: $32 in / $0.40 cached / $64 out per 1M (seen 2026-10-26). gpt-4o-mini-tts and gpt-realtime-mini deprecated | https://developers.openai.com/api/docs/models · https://developers.openai.com/api/docs/models/gpt-realtime-2.1 |
| cartesia | Cartesia | Sonic 3.6 | voice | sonic-3.6-2026-08-27 (GA) | active | Not fetched | https://docs.cartesia.ai/build-with-cartesia/tts-models |
| heygen | HeyGen | Avatar V (+ Avatar IV) | avatar | Avatar V (2026-04-08) | active | Free $0 (3 videos/mo) · Creator $29 ($24 annual) · Pro $49+ · Business $149 + $20/seat · Enterprise custom (seen 2026-10-26, India-localized page) | https://www.heygen.com/pricing · https://www.heygen.com/blog |
| synthesia | Synthesia | Synthesia 3.0 / Express-2 engine | avatar | Express-2 (post 2025-09-04) | active | Basic $0 · Starter $29/mo ($18 annual) · Pro $89/mo ($64 annual) · Enterprise custom (seen 2026-10-26) | https://www.synthesia.io/pricing · https://www.synthesia.io/post/express-2-is-synthesias-next-chapter-for-full-body-expressive-ai-avatars |
| suno | Suno | Suno v6 | music | v6 (2026-09-09) | active | Free 50 credits/day, no commercial rights · Pro $8/mo 2,500 · Premier $24/mo 10,000 (seen 2026-10-26) | https://suno.com/pricing · https://suno.com/blog |
| udio | Udio | Udio | music | — | active, restricted; licensed relaunch pending | No confirmed relaunch. Official blog's latest posts are the UMG (2025-10-29) and WMG (2025-11-19) deals | https://www.udio.com/blog |

## Verified facts

1. Cursor was acquired by SpaceX; blog post "Cursor is now a part of SpaceX" is dated 2026-08-14. No price is given in the post. — https://cursor.com/blog/joining-spacex — (official)
2. The deal was a $60B all-stock purchase, announced 2026-06-16 after an April 2026 option agreement; SpaceX had merged with xAI on 2026-05-06. — https://en.wikipedia.org/wiki/Cursor_(company) , https://www.techzine.eu/news/devops/142197/spacex-acquires-cursor-for-60-billion/ — (secondary)
3. Cursor's tiers are now Free $0, Plus $8, Premium $30, Super $100, Ultra $200, Teams $30+/user and Enterprise. There is no "Pro" tier. The tiers include X features (checkmark, fewer ads) and Grok chat/voice/Imagine. — https://cursor.com/pricing — (official)
4. Cursor's included usage pool covers Grok 4.7/4.6/4.5 and Composer 2.5 only. Claude, GPT and Gemini are billed at API list price, on Premium and above only. Free and Plus get no third-party models. — https://cursor.com/docs/models-and-pricing — (official)
5. Cursor desktop's latest version is 3.27. — https://cursor.com/download — (official)
6. Cursor 2.0 was published 2025-10-29 and introduced Cursor's first model, "Composer". The post says "many agents in parallel" without naming a number. — https://cursor.com/blog/2-0 — (official)
7. Recent Cursor features: Projects (2026-09-10), Rollouts and Security Review bots (2026-09-23), Remote control for local agents (2026-10-06), Origin App Marketplace (2026-10-13), Cloud agent canvases (2026-10-16). — https://cursor.com/changelog — (official)
8. Cognition signed a definitive agreement to acquire Windsurf (IP, product, trademark, team) on 2025-07-14. — https://cognition.com/blog/windsurf — (official)
9. Windsurf was renamed Devin Desktop on 2026-06-02. Cascade was replaced as the primary agent by Devin Local, rewritten in Rust; legacy Cascade stayed available through July 1. Extensions and keybindings stay compatible, and plans and prices were unchanged at the time. windsurf.com now 308-redirects to devin.ai. — https://devin.ai/blog/windsurf-is-now-devin-desktop — (official)
10. Cognition's SWE-2 coding model was released 2026-09-10, post-trained from Kimi K3, in Devin Desktop and Devin CLI. — https://cognition.com/blog/swe-2 — (official)
11. The Roo Code extension was shut down 2026-05-15 and its repo archived. Its creators now ship Roomote. — https://github.com/RooCodeInc/Roo-Code , https://roomote.dev/ — (official)
12. The Cline VS Code extension shows 5,735,223 installs. Cline is Apache-2.0 and ships as an extension, a JetBrains plugin, a CLI, a desktop app and an SDK. — https://marketplace.visualstudio.com/items?itemName=saoudrizwan.claude-dev , https://github.com/cline/cline — (official)
13. OpenClaw is an MIT, self-hosted personal AI assistant. A local Gateway connects channels (WhatsApp, Telegram, Slack, Discord, Signal, iMessage) to hosted or local models. It is stewarded by the OpenClaw Foundation, a 501(c)(3), and has 393.1k stars. — https://github.com/openclaw/openclaw — (official)
14. OpenClaw was started by Peter Steinberger in late 2025 as Clawdbot, then Moltbot, then renamed OpenClaw. — https://operator.io/blog/what-is-openclaw — (secondary)
15. Hermes Agent ("The agent that grows with you") is Nous Research's MIT, self-improving agent. It has persistent memory, skills it writes itself (agentskills.io-compatible), cron, subagents, and a gateway for Telegram/Discord/Slack/WhatsApp/Signal. It has 257.1k stars. — https://github.com/NousResearch/hermes-agent — (official)
16. OpenHands now lives at github.com/OpenHands/OpenHands. It is MIT, 91.9k stars, v1.33.0. Agent Canvas is free to self-host; Teams is $499/mo. — https://github.com/OpenHands/OpenHands , https://openhands.dev/pricing — (official)
17. Google Antigravity is Generally Available with a $0 individual plan. Antigravity 2.0 shipped 2026-05-19, and Gemini 4 Argon was added 2026-10-13. The first post is dated 2025-11-18. — https://antigravity.google/pricing , https://antigravity.google/blog — (official)
18. Kiro (AWS) has 5 tiers from $0 to $200. Kiro CLI V3 became the default on 2026-10-09; memory shipped 2026-10-20. — https://kiro.dev/pricing/ , https://kiro.dev/blog/ — (official)
19. Amp is now Amp Frontier Corporation ("becoming its own company", 2025-12-02). The npm package moved from @sourcegraph/amp to @ampcode/cli (2026-05-14). Amp Free became ad-free (2026-03-30), and users can now run Amp on a Claude plan (2026-10-10). — https://ampcode.com/news — (official)
20. Zed's latest stable is 1.25.3 (2026-10-23). Pro is $10/mo. — https://zed.dev/releases/stable , https://zed.dev/pricing — (official)
21. OpenAI's Sora 2 models and Videos API were shut down 2026-09-24 with "no one-to-one replacement". — https://developers.openai.com/api/docs/guides/video-generation — (official)
22. The Sora app shutdown was announced 2026-03-24, with the web/app ending 2026-04-26. — https://engadget.com/ai/openai-is-shutting-down-its-sora-video-generation-app-211023358.html — (secondary)
23. OpenAI's current image models are gpt-image-2.5-sunburst and gpt-image-2.5-flare (snapshot 2026-09-08). — https://developers.openai.com/api/docs/models — (official)
24. GPT Image 2 launched 2026-04-21 (API) and as ChatGPT Images 2.0 on 2026-04-22. — https://en.wikipedia.org/wiki/GPT_Image — (secondary)
25. The Gemini API lists Nano Banana 2.1 (gemini-nano-banana-2.1), Nano Banana 2 (gemini-3.1-flash-image), 2 Lite and Pro (gemini-3-pro-image) as stable. Imagen 4 is shut down. Gemini Omni Flash (gemini-omni-1.1-flash) is the API's video model. — https://ai.google.dev/gemini-api/docs/models — (official)
26. Veo 3.1 Preview model IDs in the Gemini API were shut down 2026-10-22. Users are told to migrate to Gemini Omni Flash. — https://ai.google.dev/gemini-api/docs/video — (official)
27. Veo 3.1 remains DeepMind's "leading video model" (1080p/4K, native audio) in the Gemini app, Flow, AI Studio and Vids. No Veo 4 exists. — https://deepmind.google/models/veo/ — (official)
28. Gemini Omni Flash was announced at I/O 2026 and is rolling out to AI Plus/Pro/Ultra subscribers in the Gemini app and Flow. — https://blog.google/innovation-and-ai/technology/ai/google-io-2026-all-our-announcements/ — (official)
29. Midjourney V8.1 replaced V7 as the default on 2026-06-11. — https://updates.midjourney.com/v8-1-is-now-the-default-model — (official)
30. Midjourney V8.2 became the default on 2026-07-24. — https://tech-insider.org/how-to-use-midjourney-v8-2-2026/ , https://digg.com/ai/2qpalhke — (secondary)
31. FLUX 3 was announced 2026-07-23. FLUX 3 Video posted 2026-08-04, FLUX 3 Action 2026-09-23, and FLUX 3 Image Klein (5.6B open weights) 2026-10-15. — https://bfl.ai/blog — (official)
32. Ideogram 4.5 is the highest version in the picker. Docs say "For new work, use Ideogram 4.5 or 4.0." — https://docs.ideogram.ai/create/models.md — (official)
33. Ideogram 4.0 was released 2026-06-03 as open weights under a non-commercial licence. — https://noqta.tn/en/news/ideogram-4-open-weight-image-model-design-2026 — (secondary)
34. Runway's latest video model is Gen-4.5. Newer dated releases are Runway Characters (2026-07-19), Solaris (2026-09-01) and GWM Worlds 2 (2026-09-03, research preview). — https://runway.com/research — (official)
35. Kling 4.0 is the newest model on kling.ai. — https://kling.ai/ — (official)
36. Kling 4.0 launched 2026-10-15. — https://bernama.com/en/press/news.php?id=2622471 — (secondary, press release)
37. Luma Ray3.2 model and API were announced 2026-06-09. — https://lumalabs.ai/ — (official)
38. Hailuo's site shows "H3 LIVE NOW". — https://hailuoai.video/ — (official)
39. MiniMax H3 launched 2026-07-31 with 2K video, up to 15 s, and native audio. — https://blog.segmind.com/minimax-h3-release-date-open-weights-and-api-pricing-explained/ — (secondary)
40. Pika's latest model is Pika 2.5. — https://pika.art/pricing — (official)
41. ElevenLabs' flagship TTS is eleven_v4 / eleven_v4_turbo; v3 and multilingual_v2 are "previous generation". Turbo v2/v2.5 and scribe_v1 are deprecated. Scribe v2 and Music v2.5 are current. — https://elevenlabs.io/docs/models — (official)
42. Eleven v4 launched 2026-09-28. — https://unite.ai/elevenlabs-launches-eleven-v4-with-low-latency-turbo-variant — (secondary)
43. OpenAI's realtime lineup is gpt-realtime-2.1 (+mini), gpt-realtime-2, gpt-live-1, gpt-realtime-translate and gpt-transcribe. gpt-4o-mini-tts and the gpt-4o transcribe models are deprecated. — https://developers.openai.com/api/docs/models — (official)
44. Cartesia's latest is Sonic 3.6, GA with snapshot sonic-3.6-2026-08-27. — https://docs.cartesia.ai/build-with-cartesia/tts-models — (official)
45. HeyGen announced Avatar V on 2026-04-08. — https://www.heygen.com/blog — (official)
46. Synthesia's Express-2 post is dated 2025-09-04. Studio Express-1 avatars are a $1,000/yr add-on. — https://www.synthesia.io/post/express-2-is-synthesias-next-chapter-for-full-body-expressive-ai-avatars , https://www.synthesia.io/pricing — (official)
47. Suno v6 was introduced 2026-09-09, and Speech (beta) 2026-10-01. Suno also announced a BMG partnership (2026-08-12) and a downloads/ToS change (2026-08-10). — https://suno.com/blog — (official)
48. Udio's official blog has had no post since 2025-11-19 (the WMG deal). — https://www.udio.com/blog — (official)
49. Reports say Udio's licensed relaunch was still pending in early Oct 2026, with downloads disabled. — https://www.musegen.ai/blog/udio-review-2026 — (secondary)
50. "Vibe coding" was coined by Andrej Karpathy on 2025-02-02. — https://x.com/karpathy/status/1886192184808149383 , via https://en.wikipedia.org/wiki/Vibe_coding — (official post, cited via secondary)
51. Collins named "vibe coding" its 2025 Word of the Year on 2025-11-06. — https://www.shropshirestar.com/showbiz/2025/11/06/collins-word-of-the-year-for-2025-revealed — (secondary)
52. GitHub's 2025-09-02 post by Den Delimarsky defines spec-driven development: the spec is "a contract for how your code should behave" and the source of truth agents generate, test and validate against. It launched Spec Kit (github.com/github/spec-kit). — https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/ — (official)

## Site claim audit

| file:line | claim | verdict | correct value | source |
|---|---|---|---|---|
| app/lib/seed/tools.ts:192 | Cursor creator "Anysphere" | CONFIRMED with a caveat | Anysphere is now a wholly owned SpaceX subsidiary (2026-08-14) | https://cursor.com/blog/joining-spacex |
| app/lib/seed/tools.ts:197 | "Can use Claude or GPT" | WRONG as written | Its own models are Grok 4.7/4.6/4.5 + Composer 2.5. Claude/GPT/Gemini only on Premium ($30) and up, billed at API list price outside the plan pool; Free/Plus are Grok-only | https://cursor.com/docs/models-and-pricing |
| app/lib/seed/tools.ts:204 | "Depends on third-party models" | WRONG | Default models are now Cursor's own Grok and Composer | https://cursor.com/docs/models-and-pricing |
| app/lib/seed/tools.ts:212 | "Free tier · Pro $20/mo" | WRONG | Free $0 · Plus $8 · Premium $30 · Super $100 · Ultra $200 · Teams $30+/user. No Pro tier (seen 2026-10-26) | https://cursor.com/pricing |
| app/lib/seed/tools.ts:194 | "AI-native VS Code" | UNVERIFIABLE (not re-checked) | — | — |
| app/lib/seed/tools.ts:261 | VS Code use case "Add Copilot / Claude / Codeium" | WRONG / stale | The Codeium brand is retired. Its successor, Windsurf, is now Devin Desktop. Suggest Cline / Continue / Claude Code instead | https://devin.ai/blog/windsurf-is-now-devin-desktop |
| app/lib/seed/tools.ts:268-270 | name "Windsurf", creator "Codeium" | WRONG | Now Devin Desktop by Cognition (acquired 2025-07-14, renamed 2026-06-02) | https://cognition.com/blog/windsurf · https://devin.ai/blog/windsurf-is-now-devin-desktop |
| app/lib/seed/tools.ts:272,274 | "Cascade" agent | WRONG / stale | Devin Local (Rust) replaced Cascade as the primary agent; legacy Cascade ran through July 1 | https://devin.ai/blog/windsurf-is-now-devin-desktop |
| app/lib/seed/tools.ts:275 | "Built on VS Code — extensions still work" | CONFIRMED | Extensions carry over; VS Code-compatible | https://devin.ai/blog/windsurf-is-now-devin-desktop |
| app/lib/seed/tools.ts:276 | "More autonomous than Cursor" | UNVERIFIABLE (subjective) | Drop it or rephrase as an opinion | — |
| app/lib/seed/tools.ts:277 | "Generous free tier" | WRONG-ish | Free tier is "Light quota", "Limited model availability" | https://devin.ai/pricing |
| app/lib/seed/tools.ts:281 | "Newer, smaller community than Cursor" | UNVERIFIABLE | — | — |
| app/lib/seed/tools.ts:288 | "Free tier · paid plans for more" | CONFIRMED (vague) | Free $0 · Pro $20 · Max $200 · Teams $80 + $40/seat · Enterprise | https://devin.ai/pricing |
| app/lib/seed/tools.ts:300 | Antigravity "Powered by Gemini 3" | WRONG / stale | Runs Gemini 4 Argon (added 2026-10-13) and Gemini 3.8 Flash, among others | https://antigravity.google/blog |
| app/lib/seed/tools.ts:302,314 | "Free during preview" / "Free in preview" | WRONG | Generally Available: $0 individual plan; higher limits via Google AI Pro/Ultra; Cloud business from $30/seat | https://antigravity.google/pricing |
| app/lib/seed/tools.ts:305 | "Very new — still maturing" | stale | Launched 2025-11-18; 2.0 shipped 2026-05-19 | https://antigravity.google/blog |
| app/lib/seed/tools.ts:346-348 | "Hermes", creator "Community / open ecosystem", "Lightweight framework for building task-running autonomous agents" | WRONG | Hermes Agent by Nous Research. MIT, self-hosted, self-improving personal agent with memory, auto-created skills, cron, and messaging gateways. It is a product runtime, not a framework | https://github.com/NousResearch/hermes-agent |
| app/lib/seed/tools.ts:358 | Hermes "Smaller community" | WRONG | 257.1k GitHub stars | https://github.com/NousResearch/hermes-agent |
| app/lib/seed/tools.ts:366 | Hermes "Open-source / self-hosted" | CONFIRMED | MIT | https://github.com/NousResearch/hermes-agent |
| app/lib/seed/tools.ts:373 | OpenHands creator "All Hands AI (open-source)" | PARTLY STALE | Repo org is now "OpenHands"; the cloud still links to all-hands.dev. Suggest "OpenHands (open-source)" | https://github.com/OpenHands/OpenHands · https://openhands.dev/pricing |
| app/lib/seed/tools.ts:375 | "formerly OpenDevin" | UNVERIFIABLE (not re-checked this session) | — | — |
| app/lib/seed/tools.ts:378-380 | "Active community", "sandboxed", "model-agnostic" | CONFIRMED | 91.9k stars; BYO LLM key; Docker | https://github.com/OpenHands/OpenHands |
| app/lib/seed/tools.ts:392 | "Open-source / self-hosted (pay model API costs)" | CONFIRMED, incomplete | Also Teams $499/mo (self-hosted multi-user) and the commercial OpenHands Cloud | https://openhands.dev/pricing |
| app/lib/seed/tools.ts:397-401 | OpenClaw "Open ecosystem", "Open agent platform for chaining tools into autonomous workflows" | WRONG | Real project: self-hosted personal AI assistant you talk to through WhatsApp/Telegram/Slack/Discord etc., by the OpenClaw Foundation (501(c)(3)), MIT | https://github.com/openclaw/openclaw |
| app/lib/seed/tools.ts:408-409 | OpenClaw "Early-stage maturity", "Sparse documentation" | WRONG | 393.1k stars; full docs site (docs.openclaw.ai). The real caveat is security: the agent has system access | https://github.com/openclaw/openclaw |
| app/lib/seed/tools.ts:417 | OpenClaw "Open-source / self-hosted" | CONFIRMED | MIT | https://github.com/openclaw/openclaw |
| app/lib/seed/tools.ts:216-238 | Codex "Code model via API… No standalone IDE" | OUT OF SCOPE, flagged | Codex is OpenAI's agent product (CLI/app/cloud), not just an API model. Hand to the models researcher | — |
| app/lib/seed/devtools.ts:4 | "verified Sept 2026" | stale | Section misses the Windsurf rename (2026-06-02) and the Antigravity GA, and was written before the current Cursor pricing (seen 2026-10-26) | — |
| app/lib/seed/devtools.ts:11,13 | Cursor "1M+ daily active users" / "1M+ DAU" | UNVERIFIABLE | Not on official pages fetched | — |
| app/lib/seed/devtools.ts:12 | "Supermaven-powered autocomplete" | UNVERIFIABLE (not re-checked) | — | — |
| app/lib/seed/devtools.ts:12 | "multi-model support" | PARTLY TRUE | Third-party models only Premium and up, billed at API list price | https://cursor.com/docs/models-and-pricing |
| app/lib/seed/devtools.ts:12 | "Cursor 2.0 can orchestrate up to ~8 agents" | STALE / UNVERIFIABLE | The current desktop is 3.27. The 2.0 post (2025-10-29) says "many agents in parallel", with no number | https://cursor.com/download · https://cursor.com/blog/2-0 |
| app/lib/seed/devtools.ts:9 | Cursor badge "Paid" | WRONG-ish | Free $0 tier exists; cheapest paid is Plus $8 (Grok-only) | https://cursor.com/pricing |
| app/lib/seed/devtools.ts:17-24 | Windsurf "Originally built by Codeium, now owned by OpenAI", tag "by OpenAI" | WRONG | Owned by Cognition (2025-07-14); renamed Devin Desktop (2026-06-02). Never owned by OpenAI | https://cognition.com/blog/windsurf · https://devin.ai/blog/windsurf-is-now-devin-desktop |
| app/lib/seed/devtools.ts:22 | "agentic 'Cascade' flow" | STALE | Devin Local replaced Cascade | https://devin.ai/blog/windsurf-is-now-devin-desktop |
| app/lib/seed/devtools.ts:51-52,85 | Antigravity "up to 8 agents", "Free preview", "✓ preview" | WRONG (preview) / UNVERIFIABLE (8 agents) | GA; free individual plan; no agent limit stated | https://antigravity.google/pricing |
| app/lib/seed/devtools.ts:58-62 | Zed "Free", "Rust-built", "startup under 1 second" | Free CONFIRMED (Personal $0; Pro $10). Rust / <1 s UNVERIFIABLE (not re-checked) | Stable 1.25.3 (2026-10-23) | https://zed.dev/pricing · https://zed.dev/releases/stable |
| app/lib/seed/devtools.ts:72 | "Cline (5M+ installs)" | CONFIRMED | 5,735,223 installs | https://marketplace.visualstudio.com/items?itemName=saoudrizwan.claude-dev |
| app/lib/seed/devtools.ts:72 | Continue.dev | UNVERIFIABLE (not checked) | — | — |
| app/lib/seed/devtools.ts:81 | Cursor "✓ Composer (8 agents)", free "~ Limited" | 8 agents UNVERIFIABLE; "~ Limited" CONFIRMED | Composer is now a model (Composer 2.5) | https://cursor.com/docs/models-and-pricing |
| app/lib/seed/devtools.ts:82 | Windsurf "✓ Cascade", "Beginners" | STALE | Rename to Devin Desktop; agent is Devin Local | https://devin.ai/blog/windsurf-is-now-devin-desktop |
| app/lib/seed/devtools.ts:95 | Winner "Beginners: Windsurf" | STALE | The product is now Devin Desktop. Re-evaluate the pick | — |
| app/lib/seed/webguide.ts:420 | "Cursor — AI code editor" | CONFIRMED | — | https://cursor.com/ |
| app/lib/seed/webguide.ts:448 | "Lovable / Bolt — AI generates a full app" | CONFIRMED | Both active app builders | https://bolt.new/pricing · https://lovable.dev/pricing |
| app/lib/seed/arsenal.ts:53 | Remotion MCP "Works with Claude Code, Cursor…" | UNVERIFIABLE (not checked) | — | — |
| app/lib/seed/arsenal.ts:268,286 | GSD "Spec-driven workflow" | CONFIRMED as terminology | SDD per GitHub Spec Kit post (2025-09-02) | https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/ |
| data/acronyms.ts:96 | T2I "like Midjourney or DALL·E" | STALE | DALL·E is retired in the API. The current OpenAI image models are GPT-Image-2.5; suggest "Midjourney, GPT Image, Nano Banana" | https://developers.openai.com/api/docs/models |

## New developments since June 2026 worth covering

- **Cursor joined SpaceX and xAI** (closed 2026-08-14). Pricing was rebuilt around Grok, with X Premium perks bundled in. Claude/GPT are now a paid add-on at API rates. This changes the "best overall editor" framing on the site.
- **Windsurf became Devin Desktop** (2026-06-02). Cascade gave way to Devin Local, third-party agents (Codex, Claude Agent, OpenCode) run via the Agent Client Protocol, and SWE-2 shipped 2026-09-10.
- **Roo Code shut down** (2026-05-15). Its team now ships Roomote, a self-hosted PR agent.
- **Google Antigravity is GA**, with 2.0 (2026-05-19) and Gemini 4 Argon (2026-10-13).
- **Kiro (AWS)** added CLI V3 as default (2026-10-09), memory (2026-10-20), Kiro workflows (2026-09-30) and a 5-tier credit pricing model.
- **Amp spun out of Sourcegraph** as Amp Frontier Corporation. It added subscriptions (2026-07-18) and can now run on an existing ChatGPT or Claude plan.
- **Personal agent runtimes are the new category**: OpenClaw (393k stars, foundation-governed) and Nous Research's Hermes Agent (257k stars). Both are MIT, self-hosted and run from your chat apps.
- **OpenAI exited video**: the Sora API was shut down 2026-09-24. Images moved to GPT-Image-2.5 Sunburst/Flare (2026-09-08), and realtime voice to gpt-realtime-2.1 and gpt-live-1.
- **Google consolidated media under Gemini Omni Flash** (I/O, May 2026). Veo 3.1 Preview API IDs shut down 2026-10-22, Imagen 4 is shut down, and Nano Banana 2.1 is stable.
- **Video model wave**: FLUX 3 with video and audio (2026-07-23), MiniMax H3 (2026-07-31, secondary), Kling 4.0 (2026-10-15, secondary), Luma Ray3.2 (2026-06-09), Runway world models (GWM Worlds 2, 2026-09-03).
- **Image**: Midjourney V8.1 became default 2026-06-11 (V8.2 on 2026-07-24 per secondary). Ideogram 4.0 went open-weight (non-commercial) and 4.5 is current.
- **Voice**: ElevenLabs Eleven v4 / v4 Turbo (2026-09-28, secondary date) and Cartesia Sonic 3.6 (2026-08-27).
- **Music**: Suno v6 (2026-09-09), Suno Speech beta (2026-10-01), BMG deal and a downloads policy change. Udio's licensed relaunch has still not shipped.

## Terminology

- **Vibe coding**: building software by prompting an AI and accepting its output without reading the code ("forget that the code even exists"). Coined by Andrej Karpathy on 2025-02-02; Collins Word of the Year 2025. https://x.com/karpathy/status/1886192184808149383
- **Spec-driven development (SDD)**: write a specification first and treat it as the contract and source of truth that AI agents generate, test and validate code against. https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/
- **Agentic engineering**: the disciplined successor to vibe coding. Humans orchestrate agents and own the architecture, tests and review. Attributed to Karpathy (2026), but secondary sources only and the dates conflict. https://thenewstack.io/vibe-coding-is-passe-karpathy-has-a-new-name-for-the-future-of-software/
- **Agent Client Protocol (ACP)**: a protocol that lets third-party coding agents (Codex, Claude Agent, OpenCode) run inside an editor host. Seen in Devin Desktop and Zed. https://devin.ai/blog/windsurf-is-now-devin-desktop
- **Cloud agents / background agents**: coding agents that run on remote machines and keep working after the laptop closes (Cursor Cloud Agents, Devin Cloud, Amp Orbs). https://cursor.com/changelog
- **Personal agent runtime**: a self-hosted, always-on agent daemon reached through messaging apps, with memory, skills and scheduled jobs (OpenClaw, Hermes Agent). https://github.com/openclaw/openclaw
- **Agent Skills (agentskills.io)**: an open format for reusable agent skill packages, adopted by Hermes Agent. https://github.com/NousResearch/hermes-agent
- **World model (generative)**: a model that simulates an interactive environment frame by frame in real time, not a fixed clip (Runway GWM Worlds 2, Google Genie). https://runway.com/research

## Could not verify

- Cursor "1M+ DAU", Supermaven-powered autocomplete, and any "8 agents" limit (Cursor 2.0 or Antigravity).
- Exact closing price of the Cursor deal from an official SpaceX/xAI source (x.ai returned 403; the $60B figure is secondary).
- Lovable paid plan prices (the pricing page rendered without figures).
- JetBrains AI Pro/Ultimate prices: the official help page shows two conflicting tables ($10/$30 vs $20/$60), and the Junie page shows $8.33/$25 with no billing period stated.
- Replit Agent version number (no version is named on official pages).
- Midjourney V8.2 default (official docs return 403; secondary only) and Midjourney pricing and video model version.
- Ideogram pricing (403) and the Ideogram 4.5 release date.
- Kling 4.0 and MiniMax H3 launch dates from vendor pages (secondary only), and whether H3 weights shipped.
- Eleven v4 launch date on an official page (model existence is confirmed in the docs).
- Udio relaunch status (no official post since 2025-11-19).
- Runway Gen-4.5 release date (none on the official page).
- FLUX 3 Dev open-weights release.
- OpenHands "formerly OpenDevin", Zed "<1 s startup", Continue.dev status, and Aider activity beyond tagged releases.
- The Sora app end date of 2026-04-26 (secondary; the API date is official).
