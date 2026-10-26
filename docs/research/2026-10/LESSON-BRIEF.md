# Learning paths & projects brief (M2)

Shared instructions for every agent writing lessons or projects. Today is **2026-10-26**.

## The contract
- Types: `app/lib/content/types.ts` (`LearningPath`, `Lesson`, `Project`).
- Validation: `app/lib/content/schema.ts` (`LessonSchema`, `LearningPathSchema`, `ProjectSchema`). Your file must pass
  them. Check your work against the min/max lengths in that file.
- Imports must be **relative and type-only** (`import type { LearningPath } from "../../app/lib/content/types";`).
  The one exception is `import { model } from "../models";` (or `"./models"`), when you need a live model id or name.

## Facts
- Use only facts from the verified registers in `docs/research/2026-10/*.md`, or facts you verify yourself on official
  docs today (open the page). Every lesson and project needs 1-4 `sources` you have actually opened.
- **No hardcoded model versions or prices in prose.** Write "a fast, low-cost model" or "your provider's current
  flagship". If a code sample needs a model id, interpolate it: `${model("claude-sonnet-5-5").apiId}`.
- **Code samples must run against today's APIs.** Verify request shapes on the official docs:
  - Claude Messages API
  - Telegram Bot API
  - HighLevel API v2 and its OAuth / Private Integration tokens
  - n8n nodes
  - Supabase pgvector

  Claude requests must **not** send `temperature` or `top_p` (removed in API version 2026-10-21). Read secrets from
  environment variables and never inline them. Use `async/await`. Keep samples short: show the core idea, not a full app.
- Never present a guess as fact. If you can't verify something, leave it out.

## Linking to the dictionary
- `termIds` and any term you mention must be **existing ids in `data/dictionary.ts`** (grep it). Every lesson links
  2-8 terms. Don't redefine a term at length; the UI links to its dictionary page.

## Voice
- The audience is builders and business operators learning AI and automation, from beginner to advanced.
- Write clear, direct second person. Give operational reasons ("what breaks if you skip this").
- Ground examples in realistic business automation where it fits: lead capture, CRM updates, support triage, reporting.
  Name GoHighLevel, n8n, Zapier and Make when they're the natural tool. Don't force them in.
- No hype words, emoji or marketing tone. Plain text only: blank lines separate paragraphs, and no markdown syntax.
- Exercises must be doable in 10-30 minutes with free tiers, and `successCheck` must describe something observable.

## Lesson plan: write exactly these, in this order (ids fixed)
**Beginner** (`data/lessons/beginner.ts`, export `BEGINNER_PATH`, path id `beginner`)
1. `what-ai-actually-is`: AI, ML, generative AI and LLMs; what a model can and can't do
2. `how-llms-work`: tokens, context windows, inference, knowledge cutoff, why answers vary
3. `prompting-basics`: system prompts, clear instructions, examples (few-shot), structured asks
4. `hallucinations-and-verification`: why models make things up; grounding; how to check output
5. `choosing-ai-tools`: chat apps vs APIs vs coding agents vs automation platforms; closed vs open-weight
6. `your-first-ai-workflow`: a no-code flow from trigger to AI step to action, with a human review step

**Intermediate** (`data/lessons/intermediate.ts`, export `INTERMEDIATE_PATH`, path id `intermediate`)
1. `apis-and-keys`: REST, endpoints, auth, API keys in env vars, rate limits
2. `webhooks-and-triggers`: webhooks vs polling; payloads; designing triggers
3. `automation-platforms-compared`: n8n vs Zapier vs Make vs GHL workflows; when each fits
4. `structured-output-and-tool-calling`: JSON schemas, tool calling, validating model output
5. `rag-fundamentals`: embeddings, vector databases, chunking, retrieval, grounding answers in sources
6. `reliable-workflow-architecture`: idempotency, retries and backoff, error handling, logging, human-in-the-loop

**Advanced** (`data/lessons/advanced.ts`, export `ADVANCED_PATH`, path id `advanced`)
1. `ai-agents-and-harnesses`: the agent loop, tools, the harness, when not to use an agent
2. `multi-agent-orchestration`: subagents, orchestration patterns, cost and latency trade-offs
3. `mcp-and-a2a`: MCP servers and clients, transports, A2A, current governance (AAIF)
4. `context-engineering-and-memory`: context budgets, prompt caching, memory, retrieval for agents
5. `evals-and-observability`: evals, LLM-as-judge, tracing, regression testing prompts
6. `security-and-production`: prompt injection, guardrails, least privilege, HITL, deployment, cost control

## Projects (`data/projects.ts`, export `PROJECTS: Project[]`, ids fixed)
| id | level | brief |
|---|---|---|
| `personal-ai-assistant` | Beginner | A personal assistant in a chat app or Claude project with instructions, files and one connected tool |
| `n8n-ai-workflow` | Beginner | An n8n workflow: trigger, then an AI Agent node with a tool and memory, then an action, with error handling |
| `telegram-ai-agent` | Intermediate | A Telegram bot (Bot API) backed by an LLM with conversation memory and one tool, hosted on n8n or a small server |
| `crm-lead-qualification` | Intermediate | A GHL form or inbound webhook goes to an LLM classifier (structured output), which updates GHL tags/pipeline with human review for low confidence |
| `knowledge-bot` | Intermediate | A Q&A bot over a company's docs with citations; the simplest viable setup |
| `business-reporting-automation` | Intermediate | A scheduled job pulls metrics (CRM or sheet), an LLM summarises them, and the report is delivered to Slack or email; deterministic maths, AI only for narrative |
| `claude-external-tools-mcp` | Advanced | Connect Claude to external tools: use an existing MCP server, then build a minimal custom MCP server |
| `rag-application` | Advanced | A RAG app on Supabase pgvector: ingestion, chunking, embeddings, retrieval, cited answers, evals |
| `full-stack-ai-app` | Advanced | A Next.js app with an AI feature, server-side API calls, input validation, rate limits and deploy to Vercel |

Every project must include:
- `architecture`: 4-8 nodes in data-flow order.
- `steps`: 5-10 steps, with a code sample on the key ones.
- `exampleWorkflow`: a concrete walk-through with sample data.
- `testing`: including at least one failure case.
- `pitfalls`.

## Done means
- Your file compiles, and every object passes its schema. Write a throwaway check in the scratchpad or a temp test and
  delete it afterwards, or run `node node_modules/vitest/vitest.mjs run` once the lead's tests exist.
- **Run `node node_modules/next/dist/bin/next build`.** It must pass. Never use `npm run`, because the `&` in the path
  breaks npm.
- Edit only your assigned file(s).
- Final reply: under 150 words, giving counts, anything you couldn't verify, and the build result.
