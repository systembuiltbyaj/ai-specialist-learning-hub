import type { LearningPath } from "../../app/lib/content/types";
import { model } from "../models";

// Lesson bodies are plain text with blank lines between paragraphs; this keeps
// each paragraph on its own line in source without leaking indentation.
const paragraphs = (...parts: string[]): string => parts.join("\n\n");

const VERIFIED = "2026-10-26";
const FAST_MODEL = model("claude-haiku-5-5").apiId;

export const INTERMEDIATE_PATH: LearningPath = {
  id: "intermediate",
  level: "Intermediate",
  title: "Building reliable AI automations",
  summary:
    "Connect AI to real systems: call APIs safely, receive webhooks, choose an automation platform, get structured output a workflow can trust, ground answers in your own documents and design workflows that survive failures.",
  outcomes: [
    "Call a REST API with credentials from environment variables and handle rate limits and error codes.",
    "Receive webhooks safely: verify signatures, acknowledge fast and ignore duplicates.",
    "Choose between n8n, Zapier, Make and GoHighLevel workflows for a given job, and explain the trade-offs.",
    "Get schema-valid JSON and tool calls from a model, and validate them before they touch a CRM.",
    "Explain how a RAG pipeline chunks, embeds, retrieves and cites, and design workflows with idempotency, retries, logging and human review.",
  ],
  lessons: [
    {
      id: "apis-and-keys",
      title: "APIs and API keys",
      summary:
        "Learn how REST APIs work, how authentication and API keys fit in, why keys live in environment variables, and how to behave under rate limits.",
      minutes: 16,
      sections: [
        {
          heading: "REST in one page",
          body: paragraphs(
            "A REST API exposes resources at URLs called endpoints. You act on them with HTTP methods: GET reads, POST creates, PUT or PATCH updates, DELETE removes. Requests and responses usually carry JSON.",
            "The status code tells you what happened before you read the body. 2xx means success. 4xx means the request was wrong: bad input, missing auth, not found, or too many requests (429). 5xx means the server failed. Your code should branch on the status, not assume success.",
            "Every API also has its own required headers. HighLevel's v2 API, for example, needs a Version header on each request alongside the bearer token, and the Claude API needs an anthropic-version header. Missing one of these is a common cause of a 400 or 401 on a first call.",
          ),
        },
        {
          heading: "Authentication and key types",
          body: paragraphs(
            "Most APIs authenticate with a bearer token in the Authorization header. That token is either a static API key you create in a dashboard, or a short-lived access token obtained through OAuth when an app acts on behalf of someone else's account.",
            "Know which one you need. In HighLevel, a Private Integration token is for connecting your own account to a tool you control, while OAuth is for marketplace apps installed by other agencies or sub-accounts. In the Claude Console, Anthropic recommends a personal key for your own development and a service account key for anything shared, such as a production workflow, because personal keys stop working when that person leaves the organisation.",
            "Two more settings matter on the Claude API. You can set an expiration when you create a key, which limits how long a leaked key stays usable. And if your key is not scoped to a single workspace, every request must also send an anthropic-workspace-id header.",
          ),
        },
        {
          heading: "Keys live in environment variables",
          body: paragraphs(
            "An API key is a password that spends money or reads customer data. It never goes in source code, a Git repository, a front-end bundle or a shared screenshot. Keys committed to a public repo are found and abused quickly, and deleting the line afterwards does not help: you must rotate the key.",
            "Locally, put keys in a .env file that is listed in .gitignore before your first commit. On a host such as Vercel, set them in the project's environment settings. In n8n, Zapier and Make, use the platform's credential or connection store rather than pasting a key into a text field in a step.",
            "The sample below calls the Claude Messages API with plain fetch, reading the key from the environment and failing loudly if it is missing.",
          ),
          code: {
            language: "javascript",
            content: `// call-claude.mjs  run with: node --env-file=.env call-claude.mjs
const apiKey = process.env.ANTHROPIC_API_KEY;
if (!apiKey) throw new Error("ANTHROPIC_API_KEY is not set");

const workspaceId = process.env.ANTHROPIC_WORKSPACE_ID; // only for keys not scoped to one workspace

const response = await fetch("https://api.anthropic.com/v1/messages", {
  method: "POST",
  headers: {
    authorization: "Bearer " + apiKey,
    "anthropic-version": "2026-10-21",
    "content-type": "application/json",
    ...(workspaceId ? { "anthropic-workspace-id": workspaceId } : {}),
  },
  body: JSON.stringify({
    model: "${FAST_MODEL}",
    max_tokens: 300,
    messages: [
      { role: "user", content: "Summarise this lead in one sentence: Hi, our office AC died this morning, can someone come today?" },
    ],
  }),
});

const body = await response.json();
if (!response.ok) {
  throw new Error(response.status + " " + body.error.type + ": " + body.error.message + " (request " + body.request_id + ")");
}
console.log(body.content.find((block) => block.type === "text").text);`,
          },
        },
        {
          heading: "Rate limits",
          body: paragraphs(
            "Every API caps how fast you can call it. The Claude API measures requests per minute, input tokens per minute and output tokens per minute for each model class, and returns 429 when you exceed any of them. GitHub's REST API caps requests per hour and reports your remaining budget in x-ratelimit headers on every response.",
            "When a 429 includes a retry-after header, wait that long before retrying. Do not treat every 429 the same, though: on the Claude API, a 429 caused by reaching a spend cap has no retry-after header and keeps failing until access is restored, so retrying in a loop just burns time.",
            "Design for limits up front. Batch work where the API supports it, queue bursts instead of firing them all at once, and spread scheduled jobs so a whole agency's workflows do not start at the top of the hour together.",
          ),
        },
      ],
      keyPoints: [
        "Branch on status codes: 2xx success, 4xx fix the request, 5xx retry later, 429 slow down.",
        "Use a static key for your own account and OAuth when an app acts for other accounts.",
        "Use service account keys for shared workloads and set key expirations.",
        "Keys live in environment variables or a platform credential store, never in code; rotate a leaked key.",
        "Honour retry-after on 429s, and recognise 429s that retrying will not fix.",
      ],
      termIds: ["rest-api", "api-endpoint", "http-methods", "status-codes", "api-key", "oauth", "environment-variables", "rate-limit"],
      exercise: {
        prompt:
          "Use a free GitHub token to see authentication and rate limits in action, with the token kept in an environment variable.",
        steps: [
          "Run: curl -s -o /dev/null -D - https://api.github.com/users/octocat and note the x-ratelimit-limit and x-ratelimit-remaining headers.",
          "Create a fine-grained personal access token in GitHub settings with no extra permissions, and store it in an environment variable named GITHUB_TOKEN rather than pasting it into the command.",
          "Run: curl -s -o /dev/null -D - -H \"Authorization: Bearer $GITHUB_TOKEN\" https://api.github.com/user and note the same headers.",
          "Run the authenticated call again with one character of the token changed and note the status code.",
          "Delete the token in GitHub settings when you are done.",
        ],
        successCheck:
          "x-ratelimit-limit is much higher on the authenticated call than the unauthenticated one, x-ratelimit-remaining drops by one between calls, and the altered token returns a 401.",
      },
      sources: [
        { label: "Claude API overview: request headers", url: "https://platform.claude.com/docs/en/api/overview" },
        { label: "Anthropic docs: Authentication", url: "https://platform.claude.com/docs/en/manage-claude/authentication" },
        { label: "Anthropic docs: Rate limits", url: "https://platform.claude.com/docs/en/api/rate-limits" },
        {
          label: "HighLevel API: Private Integrations",
          url: "https://marketplace.gohighlevel.com/docs/Authorization/PrivateIntegrationsToken",
        },
      ],
      lastVerified: VERIFIED,
    },
    {
      id: "webhooks-and-triggers",
      title: "Webhooks and triggers",
      summary:
        "Understand webhooks versus polling, read a real webhook payload, receive webhooks safely and design triggers that fire on the right events.",
      minutes: 15,
      sections: [
        {
          heading: "Polling versus webhooks",
          body: paragraphs(
            "Polling means your automation asks a system on a schedule whether anything is new. It is simple and needs no public URL, but it adds delay and wastes calls when nothing changed. On Zapier, how often a polling trigger checks depends on your plan, with the free plan checking least often.",
            "A webhook reverses the direction: the source system sends an HTTP POST to your URL the moment an event happens. That gives near-instant reactions and no wasted calls, at the cost of running a public endpoint and handling whatever arrives, including duplicates and retries.",
            "Use webhooks when speed matters, such as replying to a new lead within minutes. Polling is fine for reports and syncs where a delay does not hurt.",
          ),
        },
        {
          heading: "Anatomy of a payload",
          body: paragraphs(
            "A webhook payload is the JSON body describing the event. HighLevel's webhook guide shows the common shape: an event type, a timestamp, a unique webhookId and a data object with the record's fields. Signature headers travel alongside the body.",
            "The event type tells you what happened. The webhookId identifies this delivery so you can recognise it if it arrives again. The data is a snapshot taken when the event fired, which may already be out of date by the time you process it.",
          ),
          code: {
            language: "json",
            content: `{
  "type": "ContactCreate",
  "timestamp": "2026-10-26T09:14:00.000Z",
  "webhookId": "a1b2c3d4-test",
  "data": {
    "firstName": "Jane",
    "lastName": "Doe",
    "email": "jane@example.com"
  }
}`,
          },
        },
        {
          heading: "Receiving webhooks safely",
          body: paragraphs(
            "Anyone who finds your URL can POST to it, so verify the signature before trusting the body. HighLevel signs deliveries with an Ed25519 key in the X-GHL-Signature header and publishes the public key in its docs. The older X-WH-Signature header was scheduled for deprecation on 1 September 2026, so new integrations should verify X-GHL-Signature.",
            "Acknowledge quickly with a 2xx and do the slow work afterwards. HighLevel treats any non-2xx response, timeout or connection failure as a failure and retries with exponential backoff and random jitter. A slow handler therefore causes repeat deliveries of the same event.",
            "That is why you store each webhookId and skip ones you have already processed. In production, keep processed IDs in a database table with a unique constraint rather than in memory.",
            "Verify the signature against the exact bytes you received, before parsing. If you parse the JSON and re-serialise it, key order or whitespace can change, and a genuine delivery fails the check (or you end up trusting bytes the sender never signed). That is why the sample reads this route's body raw.",
          ),
          code: {
            language: "javascript",
            content: `import crypto from "node:crypto";
import express from "express";

const app = express();

const ghlPublicKey = process.env.GHL_WEBHOOK_PUBLIC_KEY; // Ed25519 PEM from HighLevel's webhook guide
const processed = new Set(); // use a table with a unique webhook_id column in production

// Raw body on this route: the signature covers the bytes as sent, not a re-serialised copy.
app.post("/webhooks/highlevel", express.raw({ type: "application/json" }), async (req, res) => {
  const signature = req.get("x-ghl-signature");
  const valid = Boolean(signature) &&
    crypto.verify(null, req.body, ghlPublicKey, Buffer.from(signature, "base64"));
  if (!valid) return res.status(401).json({ error: "invalid signature" });

  const event = JSON.parse(req.body.toString("utf8"));
  if (processed.has(event.webhookId)) return res.status(200).json({ status: "duplicate" });
  processed.add(event.webhookId);

  res.status(200).json({ status: "accepted" }); // acknowledge first
  await enqueueForProcessing(event);            // your queue or background job
});`,
          },
        },
        {
          heading: "Designing triggers",
          body: paragraphs(
            "Subscribe to the narrowest event that means what you care about. If you only act when a lead is tagged hot, a tag-change event plus an early filter is better than reacting to every contact update and discarding most of them.",
            "Filter as early as possible, and treat the payload as a notification rather than the truth. Before you take an important action, fetch the current record from the API, because events can arrive late or out of order.",
            "Test against a test URL before going live. n8n's Webhook node has separate test and production URLs: the test URL listens while you click Listen for Test Event and shows the data in the editor, while the production URL is registered when you publish the workflow and its runs appear in Executions instead.",
          ),
        },
      ],
      keyPoints: [
        "Polling is simple but delayed; webhooks are instant but need a public endpoint.",
        "A payload has an event type, a delivery ID and a snapshot of data that may be stale.",
        "Verify signatures before trusting a webhook body.",
        "Return 2xx fast and process later, because slow or failed responses trigger retries.",
        "Deduplicate on the delivery ID, filter early, and re-fetch current state before important actions.",
      ],
      termIds: ["webhook", "polling-vs-push", "payload", "json", "trigger", "filter", "idempotency"],
      exercise: {
        prompt: "Catch a webhook in n8n, inspect the payload and route it with an early filter.",
        steps: [
          "In an n8n Cloud trial or a self-hosted instance, create a workflow with a Webhook node set to POST and copy its test URL.",
          "Click Listen for Test Event, then send the sample payload from this lesson with curl -X POST, a content-type: application/json header and the JSON as the body.",
          "Add an If node after the webhook that checks whether body.data.email is not empty.",
          "Listen again and send a second request with the email field removed.",
        ],
        successCheck:
          "The Webhook node's output shows type ContactCreate and the webhookId from your request, and the second request with no email goes down the If node's false branch.",
      },
      sources: [
        {
          label: "HighLevel API: Webhook Integration Guide",
          url: "https://marketplace.gohighlevel.com/docs/webhook/WebhookIntegrationGuide",
        },
        {
          label: "n8n docs: Webhook node",
          url: "https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook/",
        },
        { label: "Zapier pricing", url: "https://zapier.com/pricing" },
      ],
      lastVerified: VERIFIED,
    },
    {
      id: "automation-platforms-compared",
      title: "Automation platforms compared",
      summary:
        "Compare n8n, Zapier, Make and GoHighLevel workflows on billing, hosting, flexibility and who maintains them, and learn when each one fits.",
      minutes: 14,
      sections: [
        {
          heading: "What they share and where they differ",
          body: paragraphs(
            "All four do the same basic job: a trigger starts a run, steps transform data and call other apps, and a run history shows what happened. All four now offer AI steps.",
            "They differ in four ways that decide most projects: what counts as a billable unit, whether you can self-host, how much custom logic you can write, and who will maintain the automation after you hand it over.",
          ),
        },
        {
          heading: "Zapier and Make",
          body: paragraphs(
            "Zapier has a very large catalogue of prebuilt app integrations and the gentlest learning curve. It bills in tasks, where a task is an action step that completes successfully, so long Zaps that run often get expensive. Its AI by Zapier step lives inside a Zap, bills in tasks too, and can require approval per tool. Zapier fits when speed of setup matters, a strong native integration exists and a non-technical client will maintain it.",
            "Make builds scenarios on a visual canvas with routers, iterators and aggregators, which suits branching and data reshaping. Since August 2025 it bills in credits, converted one for one from the old operations, with built-in AI features able to use more than one credit. Make fits visual thinkers handling moderately complex data flows at a lower cost per step than Zapier.",
          ),
        },
        {
          heading: "n8n",
          body: paragraphs(
            "n8n bills Cloud plans per workflow execution regardless of how many steps a run has, so a long workflow costs the same as a short one. You can also self-host it on your own infrastructure. Its licence is source-available rather than open source: the Sustainable Use License allows internal business, non-commercial and personal use.",
            "It gives you more technical control than the others: code nodes, sub-workflows, error workflows, and an AI Agent node that works as a tools agent and needs at least one tool connected. n8n fits complex orchestration, API-heavy work, AI agents and high step counts, provided someone technical owns it.",
          ),
        },
        {
          heading: "GoHighLevel workflows",
          body: paragraphs(
            "GoHighLevel workflows run inside the CRM. They trigger on contact, opportunity, appointment and form events and act directly on tags, pipelines, SMS and email without any integration in between. For lead follow-up and client communication, that removes a whole category of sync problems.",
            "They are weaker for heavy data transformation, complex branching on external data and long multi-API chains. The common pattern is a hybrid: GoHighLevel owns the contact and the messages, and sends a webhook to n8n or Make for the heavy logic, which then writes the result back through the HighLevel API.",
          ),
        },
        {
          heading: "Choosing",
          body: paragraphs(
            "Start from where the data and the people live. If the leads and conversations are already in GoHighLevel, start there. If the client's team will maintain it themselves and the flow is simple, Zapier. If the flow branches heavily and cost per step matters, Make. If it needs agents, custom code, self-hosting or many steps per run, n8n.",
            "Do not add a platform just because you know it. Each extra tool is another login, another bill, another place to debug and another thing to hand over.",
          ),
        },
      ],
      keyPoints: [
        "Compare billing units, hosting, flexibility and who will maintain the automation.",
        "Zapier bills per task and suits simple flows a client maintains.",
        "Make bills in credits and suits visual, branching data flows.",
        "n8n bills per execution, can be self-hosted and suits complex, technical work.",
        "GoHighLevel workflows suit CRM-native follow-up; hand heavy logic to n8n or Make by webhook.",
      ],
      termIds: ["zapier", "zapier-task", "make", "make-credit", "n8n", "ghl-workflow", "workflow-automation"],
      exercise: {
        prompt: "Estimate the monthly billing units of one real process on three platforms and choose one.",
        steps: [
          "Pick a process, such as: form submitted, AI classifies the lead, contact created in the CRM, sales notified in Slack.",
          "Count the steps after the trigger and estimate monthly runs from real volume.",
          "Estimate Zapier tasks (successful action steps times runs), Make credits (modules executed times runs, plus extra for built-in AI) and n8n executions (one per run).",
          "Check each platform's current pricing page for the plan that covers your numbers.",
          "Write down the platform you would choose and two reasons, including who will maintain it.",
        ],
        successCheck:
          "You have a three-row table with the monthly billing units and matching plan for each platform, and a chosen platform with two reasons, one of which names the person who will maintain it.",
      },
      sources: [
        { label: "n8n pricing", url: "https://n8n.io/pricing/" },
        { label: "Zapier blog: Zapier Agents is now AI by Zapier", url: "https://zapier.com/blog/zapier-agents-is-now-ai-by-zapier/" },
        { label: "Make Help Center: Introducing credits", url: "https://help.make.com/introducing-credits-new-billing-unit-live-in-make" },
        {
          label: "n8n docs: AI Agent node",
          url: "https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/",
        },
      ],
      lastVerified: VERIFIED,
    },
    {
      id: "structured-output-and-tool-calling",
      title: "Structured output and tool calling",
      summary:
        "Get JSON that matches a schema, let a model call your functions, and validate both before anything touches a real system.",
      minutes: 18,
      sections: [
        {
          heading: "Why free text breaks automations",
          body: paragraphs(
            "An automation step needs fields: a category to map to a pipeline stage, an email to look up, a yes or no to branch on. Prose that varies from run to run breaks the parsing step, usually on the rare input you never tested.",
            "Structured outputs fix the shape. On the Claude API you pass a JSON schema in output_config.format, and the response text is JSON that matches it. Anthropic's docs describe two complementary features: JSON outputs control what Claude says, and strict tool use guarantees that tool inputs match their schema.",
          ),
          code: {
            language: "javascript",
            content: `const response = await fetch("https://api.anthropic.com/v1/messages", {
  method: "POST",
  headers: {
    authorization: "Bearer " + process.env.ANTHROPIC_API_KEY,
    "anthropic-version": "2026-10-21",
    "content-type": "application/json",
  },
  body: JSON.stringify({
    model: "${FAST_MODEL}",
    max_tokens: 500,
    system: "You qualify inbound leads for a home services company.",
    messages: [{ role: "user", content: leadMessage }],
    output_config: {
      format: {
        type: "json_schema",
        schema: {
          type: "object",
          properties: {
            service: { type: "string", enum: ["plumbing", "electrical", "hvac", "other"] },
            urgency: { type: "string", enum: ["today", "this_week", "flexible", "unknown"] },
            summary: { type: "string" },
            confidence: { type: "string", enum: ["high", "medium", "low"] },
          },
          required: ["service", "urgency", "summary", "confidence"],
          additionalProperties: false,
        },
      },
    },
  }),
});

const message = await response.json();
const lead = JSON.parse(message.content.find((block) => block.type === "text").text);`,
          },
        },
        {
          heading: "Designing the schema",
          body: paragraphs(
            "Use enums for anything a later step branches on, so the model cannot invent a category your CRM does not have. Include an explicit other or unknown value so the model has an honest option. Mark every field required and set additionalProperties to false so nothing unexpected appears.",
            "Add a confidence field and route low confidence to a person. Keep the schema flat where you can, and give fields clear names. Some JSON Schema constraints are not supported; Anthropic's SDK provides a helper that moves them into field descriptions. Two incompatibilities to know: citations cannot be combined with output_config.format (the API returns a 400), and message prefill does not work with JSON outputs.",
          ),
        },
        {
          heading: "Tool calling",
          body: paragraphs(
            "Tool calling lets the model ask your code to do something. You describe each tool with a name, a description and an input schema. When the model wants a tool, the response has stop_reason tool_use and a tool_use block with an id, the tool name and the input. Your code runs the operation and sends back a tool_result that references that id, and the model continues.",
            "Setting strict to true on a tool guarantees its inputs match the schema. Tools you define run in your application, while server tools such as web search run on Anthropic's infrastructure. The model never touches your CRM directly; your code decides what each tool call is allowed to do.",
          ),
          code: {
            language: "jsonc",
            content: `// 1. A tool you offer in the request's tools array
{
  "name": "lookup_contact",
  "description": "Find a CRM contact by email. Call this before drafting any reply.",
  "strict": true,
  "input_schema": {
    "type": "object",
    "properties": { "email": { "type": "string" } },
    "required": ["email"],
    "additionalProperties": false
  }
}

// 2. In the response (stop_reason: "tool_use"), a content block like:
{ "type": "tool_use", "id": "toolu_01AbC", "name": "lookup_contact", "input": { "email": "jane@example.com" } }

// 3. Your next user message returns the result
{
  "role": "user",
  "content": [
    { "type": "tool_result", "tool_use_id": "toolu_01AbC", "content": "{\\"found\\": true, \\"stage\\": \\"Booked\\"}" }
  ]
}`,
          },
        },
        {
          heading: "Validate anyway",
          body: paragraphs(
            "Schema-valid is not the same as correct. A perfectly formed JSON object can still put a plumbing lead in electrical, or contain an email address the model misread. Validate at the boundary with a schema library such as zod, then apply business rules: does the stage exist, does the email look real, is the confidence high enough to act without review.",
            "Log the raw model output next to the validated result so you can debug later, without logging personal data you do not need. And never let model output drive a destructive or customer-facing action, such as deleting a contact or sending an SMS, without a check in code or a person in between.",
          ),
        },
      ],
      keyPoints: [
        "Pass a JSON schema in output_config.format to get schema-matching JSON from the Claude API.",
        "Use enums, required fields, additionalProperties false and an explicit unknown option.",
        "Tool calls come back as tool_use blocks; your code runs them and returns tool_result.",
        "strict: true guarantees tool inputs match the schema; it does not make them correct.",
        "Validate with business rules and route low-confidence or risky actions to a person.",
      ],
      termIds: ["structured-output", "json", "tool-calling", "agent", "guardrails", "human-in-the-loop"],
      exercise: {
        prompt: "Write a lead-qualification schema and a validator, and prove the validator catches bad output.",
        steps: [
          "Copy the schema from this lesson and adapt the service enum to a business you know.",
          "Write five JSON objects by hand or with a chat app: three valid, one missing the urgency field, and one with a service value outside the enum.",
          "Write a small validator with zod (or any JSON Schema validator) that checks each object and also routes confidence low to a review list.",
          "If you have Claude API access, send three real lead messages with the request from this lesson and validate the responses too.",
        ],
        successCheck:
          "Your validator accepts the three valid objects, rejects the two broken ones with an error naming the bad field, and puts any object with confidence low on the review list.",
      },
      sources: [
        {
          label: "Anthropic docs: Structured outputs",
          url: "https://platform.claude.com/docs/en/build-with-claude/structured-outputs",
        },
        {
          label: "Anthropic docs: Strict tool use",
          url: "https://platform.claude.com/docs/en/agents-and-tools/tool-use/strict-tool-use",
        },
        { label: "Anthropic docs: Tool use overview", url: "https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview" },
      ],
      lastVerified: VERIFIED,
    },
    {
      id: "rag-fundamentals",
      title: "RAG fundamentals",
      summary:
        "Ground model answers in your own documents: embeddings, vector databases, chunking, retrieval and cited answers.",
      minutes: 18,
      sections: [
        {
          heading: "The problem RAG solves",
          body: paragraphs(
            "A model does not know your price list, your SOPs or last week's policy change. You could paste every document into each prompt, but that costs tokens, adds latency and, as Anthropic notes, accuracy degrades as context grows.",
            "Retrieval-augmented generation (RAG) fetches only the passages relevant to a question and puts those in the prompt. The pipeline has two halves. Ingestion runs ahead of time: split documents into chunks, turn each chunk into an embedding and store it. Answering runs per question: embed the question, find the closest chunks, and have the model answer from them with citations.",
          ),
        },
        {
          heading: "Embeddings and vector databases",
          body: paragraphs(
            "An embedding is a list of numbers that represents the meaning of a piece of text. Texts with similar meaning produce vectors that sit close together, which is what makes search by meaning possible: 'cancel my booking' finds the chunk about cancellations even though it never uses the word cancel.",
            "You need an embedding model for this. Anthropic does not offer its own and points to providers such as Voyage AI; open models such as gte-small also work. Whatever you choose, use the same model for documents and questions, and size your vector column to that model's dimensions.",
            "A vector database stores the vectors and finds the nearest ones fast. With Supabase you enable the pgvector extension and get a vector column type plus three distance operators: <-> for Euclidean distance, <#> for negative inner product and <=> for cosine distance. Supabase's client cannot call those operators directly, so you wrap the query in a Postgres function.",
          ),
          code: {
            language: "sql",
            content: `-- After enabling the "vector" extension in the Supabase dashboard
create table documents (
  id bigserial primary key,
  source_url text not null,   -- kept for citations
  body text not null,
  embedding extensions.vector(384)  -- match your embedding model's dimensions
);

create or replace function match_documents (
  query_embedding extensions.vector(384),
  match_threshold float,
  match_count int
)
returns table (id bigint, source_url text, body text, similarity float)
language sql stable
as $$
  select id, source_url, body, 1 - (embedding <=> query_embedding) as similarity
  from documents
  where 1 - (embedding <=> query_embedding) > match_threshold
  order by embedding <=> query_embedding asc
  limit match_count;
$$;`,
          },
        },
        {
          heading: "Chunking",
          body: paragraphs(
            "Chunking decides what a retrieval hit looks like. Chunks that are too large drag in unrelated text and dilute the match. Chunks that are too small lose the context that made them meaningful, such as which product a sentence refers to.",
            "Start with natural units, such as a section under a heading or a single FAQ answer, and include the heading in the chunk text. Store metadata with every chunk: the source URL or file, the title and the last-updated date. That metadata is what lets you cite sources and re-ingest a document when it changes.",
          ),
        },
        {
          heading: "Retrieval and grounded answers",
          body: paragraphs(
            "At question time, embed the question with the same model and call your match function with a similarity threshold and a result count. Supabase's docs stress that the right threshold varies by application and has to be found by testing on your own data.",
            "Put the retrieved chunks into the prompt inside tags with their IDs and source URLs, instruct the model to answer only from them, to cite the chunk it used and to say so when the answer is not there. If nothing clears the threshold, skip the model call and return 'I couldn't find that in our documents' with a route to a person.",
          ),
          code: {
            language: "javascript",
            content: `const { data: chunks, error } = await supabase.rpc("match_documents", {
  query_embedding: questionEmbedding, // same embedding model as ingestion
  match_threshold: 0.78,              // tune on your own data
  match_count: 5,
});
if (error) throw new Error("Retrieval failed: " + error.message);
if (chunks.length === 0) return { answer: null, reason: "no_match" };`,
          },
        },
        {
          heading: "Measure retrieval and answers separately",
          body: paragraphs(
            "When a RAG bot gives a wrong answer, the cause is either retrieval (the right chunk was not found) or generation (it was found and the model misused it). Fix the wrong one and nothing improves.",
            "Write twenty real questions with the document section that answers each. Check whether that section appears in the retrieved chunks, then check the answer. Re-run the set every time you change chunk size, the embedding model, the threshold or the prompt.",
          ),
        },
      ],
      keyPoints: [
        "RAG retrieves only the relevant passages instead of stuffing every document into context.",
        "Use the same embedding model for documents and questions, with matching vector dimensions.",
        "pgvector offers Euclidean, negative inner product and cosine distance operators.",
        "Chunk on natural sections and store source metadata for citations and re-ingestion.",
        "Tune the similarity threshold on your data and evaluate retrieval separately from answers.",
      ],
      termIds: ["rag", "embedding", "vector-database", "semantic-search", "grounding", "supabase", "hallucination"],
      exercise: {
        prompt: "See vector similarity work in Postgres using tiny hand-made vectors, with no embedding API needed.",
        steps: [
          "Create a free Supabase project and enable the vector extension from Database, then Extensions.",
          "In the SQL editor, create a table with a body text column and an embedding extensions.vector(3) column.",
          "Insert three rows: 'refund policy' with [1,0,0], 'refund timeline' with [0.9,0.1,0] and 'office hours' with [0,0,1].",
          "Run a query that selects body and embedding <=> '[1,0,0]'::extensions.vector as distance, ordered by distance ascending.",
        ],
        successCheck:
          "The query returns 'refund policy' first with a distance of 0, 'refund timeline' second with a small distance, and 'office hours' last with the largest distance.",
      },
      sources: [
        { label: "Supabase docs: Vector columns", url: "https://supabase.com/docs/guides/ai/vector-columns" },
        { label: "Anthropic docs: Embeddings", url: "https://platform.claude.com/docs/en/build-with-claude/embeddings" },
        {
          label: "Anthropic docs: Context windows",
          url: "https://platform.claude.com/docs/en/build-with-claude/context-windows",
        },
      ],
      lastVerified: VERIFIED,
    },
    {
      id: "reliable-workflow-architecture",
      title: "Reliable workflow architecture",
      summary:
        "Design automations that survive real-world failures: idempotency, retries with backoff, error handling, logging and human review.",
      minutes: 18,
      sections: [
        {
          heading: "Assume every step fails sometimes",
          body: paragraphs(
            "In production, APIs return 429s and 5xx errors, the Claude API occasionally returns 529 when it is overloaded, webhooks arrive twice, credentials expire and models return output that fails validation. None of this is rare at volume.",
            "For every step, answer three questions before launch. What happens when it fails? Who finds out, and how quickly? Can the run be repeated safely? If you cannot answer the third, you have an idempotency problem waiting to happen.",
          ),
        },
        {
          heading: "Idempotency",
          body: paragraphs(
            "An idempotent step gives the same result whether it runs once or five times. Without it, a retried webhook creates two opportunities, sends two welcome SMS messages or charges a card twice.",
            "The fix is a stable key. Use the event's own ID, such as HighLevel's webhookId, or a key derived from the business fact, such as form ID plus submission ID. Record it in a table with a unique constraint before you act, and skip the work if the insert fails because the key exists. Prefer update-or-create operations keyed on an external ID over blind creates.",
          ),
        },
        {
          heading: "Retries with backoff and jitter",
          body: paragraphs(
            "Retry only errors that can succeed later: 429s with a retry-after header, 500 and 529 from the Claude API, gateway errors and network timeouts. Do not retry 400, 401, 403 or 404, because the same request will fail the same way. On the Claude API, a 429 without retry-after signals a spend cap, which retrying cannot fix.",
            "Wait longer after each failure (exponential backoff), add randomness (jitter) so many clients do not retry in lockstep, and cap the number of attempts. Retrying a call that has side effects, such as creating a contact, is only safe when that step is idempotent.",
          ),
          code: {
            language: "typescript",
            content: `const RETRYABLE = new Set([429, 500, 502, 503, 504, 529]);
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function backoffMs(attempt: number): number {
  const ceiling = Math.min(30_000, 1_000 * 2 ** (attempt - 1));
  return ceiling / 2 + Math.random() * (ceiling / 2); // jitter
}

export async function fetchWithRetry(url: string, init: RequestInit, maxAttempts = 5): Promise<Response> {
  for (let attempt = 1; ; attempt++) {
    try {
      const response = await fetch(url, { ...init, signal: AbortSignal.timeout(60_000) });
      if (response.ok || !RETRYABLE.has(response.status) || attempt >= maxAttempts) return response;

      const retryAfter = Number(response.headers.get("retry-after"));
      // On the Claude API a 429 without retry-after is a spend cap; retrying won't help.
      if (response.status === 429 && !retryAfter) return response;
      await sleep(retryAfter > 0 ? retryAfter * 1_000 : backoffMs(attempt));
    } catch (error) {
      // Network failure or timeout: retry until attempts run out.
      if (attempt >= maxAttempts) throw error;
      await sleep(backoffMs(attempt));
    }
  }
}`,
          },
        },
        {
          heading: "Error handling and logging",
          body: paragraphs(
            "When retries run out, the failure must go somewhere a person will see it. In n8n, assign an error workflow that starts with an Error Trigger node and alerts the owner. Make offers error handlers on modules. In custom code, write failed items to an error queue or table that can be replayed after the fix.",
            "Log the inputs, the outcome and the identifiers you need to investigate: your own run ID, the event ID and the provider's request ID. Every Claude API response carries a request-id header for this. Do not log API keys, tokens or personal data you do not need; log a contact ID, not the contact's email and phone.",
          ),
        },
        {
          heading: "Human-in-the-loop by design",
          body: paragraphs(
            "Put a person in front of any action that is hard to undo or reaches a customer: sending messages, moving deals, issuing refunds, deleting records. Route model outputs with low confidence or failed validation to the same review queue.",
            "A review queue needs an owner, a check schedule and a fallback when it backs up. Log each reviewer's decision next to the model's suggestion. Those records tell you how often the model is right, which is the evidence you need before letting any category of action skip review.",
          ),
        },
      ],
      keyPoints: [
        "Decide for every step what happens on failure, who is told and whether it can safely re-run.",
        "Make side-effecting steps idempotent with a stable key and a unique constraint.",
        "Retry only transient errors, with exponential backoff, jitter and a cap.",
        "Send exhausted failures to an alert or replayable error queue, and log IDs rather than personal data.",
        "Review risky or low-confidence actions, and use logged decisions to earn automation.",
      ],
      termIds: ["idempotency", "retry-error-handling", "rate-limit", "observability", "human-in-the-loop", "webhook", "status-codes"],
      exercise: {
        prompt: "Harden one workflow against duplicates and failures, then prove it with two deliberate tests.",
        steps: [
          "Take a webhook-triggered workflow you built, or the n8n webhook from the webhooks lesson.",
          "Write a failure table: one row per step with its failure mode, how you detect it and the response (retry, queue or person).",
          "Add a duplicate check keyed on webhookId, for example a Remove Duplicates node in n8n or a lookup in a sheet or table before the action step.",
          "Create an error workflow with an Error Trigger node that sends you an email or Slack message, and assign it in the workflow settings.",
          "Publish the workflow so these tests run as real executions on the production URL rather than in the editor.",
          "Send the same payload twice, then break a credential used by a later step and send a new payload with a different webhookId.",
        ],
        successCheck:
          "The duplicate send produces only one record or action, and the broken credential produces an alert in your email or Slack instead of a silent failure.",
      },
      sources: [
        { label: "Anthropic docs: API errors", url: "https://platform.claude.com/docs/en/api/errors" },
        { label: "n8n docs: Error handling", url: "https://docs.n8n.io/flow-logic/error-handling/" },
        {
          label: "HighLevel API: Webhook Integration Guide",
          url: "https://marketplace.gohighlevel.com/docs/webhook/WebhookIntegrationGuide",
        },
      ],
      lastVerified: VERIFIED,
    },
  ],
};
