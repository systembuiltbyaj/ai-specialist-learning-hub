// Advanced learning path: agents, orchestration, protocols, context, evals and
// production safety. Facts come from docs/research/2026-10/ or from the sources
// listed on each lesson, opened on the lastVerified date.
import type { LearningPath } from "../../app/lib/content/types";
import { model } from "../models";

const VERIFIED = "2026-10-26";

// Lesson bodies are plain text; a blank line separates paragraphs.
const paragraphs = (...parts: string[]) => parts.join("\n\n");

const SOURCES = {
  buildingAgents: { label: "Anthropic: Building effective agents", url: "https://www.anthropic.com/engineering/building-effective-agents" },
  toolUse: { label: "Claude Docs: Tool use with Claude", url: "https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview" },
  handleToolCalls: { label: "Claude Docs: Handle tool calls", url: "https://platform.claude.com/docs/en/agents-and-tools/tool-use/handle-tool-calls" },
  multiAgent: { label: "Anthropic: How we built our multi-agent research system", url: "https://www.anthropic.com/engineering/multi-agent-research-system" },
  subagents: { label: "Claude Code Docs: Create custom subagents", url: "https://code.claude.com/docs/en/sub-agents" },
  mcpChangelog: { label: "MCP specification 2026-07-28: Key changes", url: "https://modelcontextprotocol.io/specification/2026-07-28/changelog" },
  mcpBuildServer: { label: "MCP Docs: Build an MCP server", url: "https://modelcontextprotocol.io/docs/develop/build-server" },
  a2a: { label: "A2A Protocol: What is A2A?", url: "https://a2a-protocol.org/latest/topics/what-is-a2a/" },
  aaif: { label: "Agentic AI Foundation (AAIF)", url: "https://aaif.io/" },
  contextEngineering: { label: "Anthropic: Effective context engineering for AI agents", url: "https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents" },
  promptCaching: { label: "Claude Docs: Prompt caching", url: "https://platform.claude.com/docs/en/build-with-claude/prompt-caching" },
  evals: { label: "Claude Docs: Define success criteria and build evaluations", url: "https://platform.claude.com/docs/en/test-and-evaluate/develop-tests" },
  otel: { label: "OpenTelemetry: GenAI observability with OpenTelemetry", url: "https://opentelemetry.io/blog/2026/genai-observability/" },
  owaspTop10: { label: "OWASP Top 10 for LLM Applications 2026", url: "https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/" },
  owaspAnnouncement: {
    label: "OWASP GenAI: 2026 Top 10 and Agent Control Standard",
    url: "https://genai.owasp.org/2026/09/01/owasp-genai-security-project-unveils-2026-top-10-for-llm-applications-new-agent-control-standard-and-sponsors-as-community-tops-30000-members/",
  },
  hooks: { label: "Claude Code Docs: Automate actions with hooks", url: "https://code.claude.com/docs/en/hooks-guide" },
};

const BALANCED_MODEL = model("claude-sonnet-5-5").apiId;
const FAST_MODEL = model("claude-haiku-5-5").apiId;
const FLAGSHIP_MODEL = model("claude-opus-5-5").apiId;

export const ADVANCED_PATH: LearningPath = {
  id: "advanced",
  level: "Advanced",
  title: "Advanced: Agents in Production",
  summary:
    "Build agents that hold up after launch: the agent loop and its harness, multi-agent orchestration, MCP and A2A, context and memory, evals and tracing, and the security and cost controls that keep a fooled or runaway agent from doing damage.",
  outcomes: [
    "Write an agent loop with tool calls, error handling and a hard stop, and decide when a fixed workflow is the better design.",
    "Choose an orchestration pattern for a multi-agent task and estimate its token, cost and latency impact before building it.",
    "Build and test a minimal MCP server, and explain what the stateless 2026-07-28 revision and AAIF governance change for you.",
    "Keep long-running agents inside a context budget with prompt caching, compaction, scoped memory and just-in-time retrieval.",
    "Ship agents behind eval gates, traces, least-privilege tools, human approval for risky actions and hard spend limits.",
  ],
  lessons: [
    // ── 1 ──
    {
      id: "ai-agents-and-harnesses",
      title: "AI agents and harnesses",
      summary:
        "What makes a system an agent, how the tool-calling loop actually runs, why the harness around the model decides whether it works, and when you should not build an agent at all.",
      minutes: 20,
      sections: [
        {
          heading: "Workflows, agents and the line between them",
          body: paragraphs(
            "Anthropic draws a useful line. Workflows are systems where models and tools are orchestrated through predefined code paths. Agents are systems where the model directs its own process and tool usage, deciding what to do next based on what it has seen so far.",
            "A lead-intake flow is a workflow: a form fires, one model call classifies the lead, your code writes the tag to GoHighLevel and assigns an owner. You can draw the flowchart in advance. A support agent that investigates a disputed refund is different: it may check the order, then the shipping carrier, then the refund policy, then the customer's history, in an order nobody can fix ahead of time.",
            "Both are useful. The mistake is building the second when the problem is the first. Every decision you hand to the model is a decision you can no longer guarantee, test exhaustively or explain to a client in one sentence.",
          ),
        },
        {
          heading: "The loop: tool_use in, tool_result out",
          body: paragraphs(
            "Underneath every agent framework is the same loop. You send the model a task and a list of tools, each with a name, a description and a JSON schema for its input. If the model wants a tool, the response stops with stop_reason set to tool_use and contains one or more tool_use blocks. Your code runs each tool and sends the output back as tool_result blocks in the next user message. You repeat until the model answers without asking for a tool.",
            "Three details separate a demo from a production loop. First, when a tool fails, return the error as a tool_result with is_error set to true instead of throwing; the model can often retry with corrected input or explain the failure to the user. Second, cap the number of turns, because a confused model will happily call the same tool forever. Third, treat any stop reason other than tool_use as the end of the run, and log which one it was: max_tokens means the answer was cut off, and refusal means the model declined.",
            "The sample below is a complete loop against the Claude Messages API. The model id comes from the site's model registry, so it stays current.",
          ),
          code: {
            language: "typescript",
            content: `import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic(); // reads ANTHROPIC_API_KEY from the environment
const MAX_TURNS = 8;

const tools: Anthropic.Tool[] = [
  {
    name: "get_order",
    description: "Look up one order by ID. Returns status, total and ship date. Read-only.",
    input_schema: {
      type: "object",
      properties: { order_id: { type: "string", description: "Order ID, e.g. ORD-1042" } },
      required: ["order_id"],
    },
  },
];

// fetchOrder is your own API client; it throws when the order does not exist.
async function runTool(name: string, input: unknown): Promise<string> {
  if (name === "get_order") return JSON.stringify(await fetchOrder(input));
  throw new Error("Unknown tool: " + name);
}

export async function runAgent(task: string): Promise<string> {
  const messages: Anthropic.MessageParam[] = [{ role: "user", content: task }];

  for (let turn = 0; turn < MAX_TURNS; turn++) {
    const response = await client.messages.create({
      model: "${BALANCED_MODEL}",
      max_tokens: 2048,
      system: "You are a support agent. Check facts with tools before answering.",
      tools,
      messages,
    });
    messages.push({ role: "assistant", content: response.content });

    if (response.stop_reason !== "tool_use") {
      return response.content.flatMap((block) => (block.type === "text" ? [block.text] : [])).join(" ");
    }

    const results: Anthropic.ToolResultBlockParam[] = [];
    for (const block of response.content) {
      if (block.type !== "tool_use") continue;
      try {
        results.push({ type: "tool_result", tool_use_id: block.id, content: await runTool(block.name, block.input) });
      } catch (error) {
        // Hand the failure back so the model can recover, instead of crashing the run.
        results.push({ type: "tool_result", tool_use_id: block.id, content: String(error), is_error: true });
      }
    }
    messages.push({ role: "user", content: results });
  }
  throw new Error("Agent stopped after " + MAX_TURNS + " turns without finishing");
}`,
          },
        },
        {
          heading: "The harness is most of the product",
          body: paragraphs(
            "The harness is everything around the model: the loop, tool execution, permissions, context management, retries, logging and stopping rules. The same model inside a careless harness and a careful one behaves like two different products. Claude Code, the Claude Agent SDK, Anthropic's Managed Agents beta and n8n's AI Agent node are all harnesses; they differ in how much of this they decide for you.",
            "Tool design is the part teams underinvest in. Anthropic calls it the agent-computer interface and reports that, while building its SWE-bench agent, it spent more time optimizing tools than the overall prompt. Write tool descriptions the way you would brief a new hire, and change arguments so mistakes are hard to make: require an absolute ID rather than a fuzzy name, return a short summary rather than a 50 KB JSON dump, and say in the description whether the tool is read-only.",
            "Typical harness failures look like model failures but are not: a tool that returns an entire contact list floods the context and the model loses the task; two tools with near-identical names get confused; a missing turn cap turns one bad input into a four-figure API bill overnight.",
          ),
        },
        {
          heading: "When not to use an agent",
          body: paragraphs(
            "Anthropic's advice is to find the simplest solution possible and only add complexity when it is needed, which can mean not building an agentic system at all. Agents trade latency and cost for better performance on open-ended tasks. In Anthropic's own data, agents use about four times the tokens of a chat interaction, and their autonomy brings the risk of compounding errors.",
            "Use a fixed workflow when you can draw the steps in advance, when volume is high and margins are thin, or when every run must be auditable step by step. Use an agent when the path genuinely depends on what is discovered along the way and a human would otherwise do the investigating. Even then, keep irreversible actions such as refunds, deletions and outbound messages behind an approval step until you have evidence the agent gets them right.",
            "A common hybrid works well in business automation: a deterministic workflow in n8n, Make or GoHighLevel handles the trigger, validation and writes, and calls an agent only for the one step that needs judgment, such as researching an account or drafting a reply for review.",
          ),
        },
      ],
      keyPoints: [
        "Workflows follow predefined code paths; agents choose their own next step. Default to the workflow.",
        "The agent loop is: model requests a tool, your code runs it, you return a tool_result, repeat until it stops asking.",
        "Return tool failures with is_error so the model can recover, and always cap turns.",
        "The harness (tools, permissions, context, stopping rules) matters as much as the model; design tools so misuse is hard.",
        "Agents cost more and add latency; reserve them for paths you cannot specify in advance.",
      ],
      termIds: ["agent", "agent-harness", "tool-calling", "agentic-ai", "orchestration", "human-in-the-loop"],
      exercise: {
        prompt:
          "Build the loop from this lesson with one fake tool and watch it handle a success, a tool failure and a task that needs no tool.",
        steps: [
          "Copy the loop and replace fetchOrder with an in-memory map holding two orders; throw an Error for any other ID.",
          "Log each turn: the stop_reason, every tool name and input requested, and whether each tool_result had is_error set.",
          "Run three tasks: ask about an order that exists, ask about one that does not, and ask a general question about your returns policy.",
          "Set MAX_TURNS to 1 and rerun the first task to see the hard stop fire.",
        ],
        successCheck:
          "Your log shows tool_use followed by a tool_result and a final answer for the existing order; an is_error result and an answer saying the order was not found for the missing one; zero tool calls for the general question; and the turn-limit error when MAX_TURNS is 1.",
      },
      sources: [SOURCES.buildingAgents, SOURCES.toolUse, SOURCES.handleToolCalls, SOURCES.multiAgent],
      lastVerified: VERIFIED,
    },

    // ── 2 ──
    {
      id: "multi-agent-orchestration",
      title: "Multi-agent orchestration",
      summary:
        "When splitting work across subagents pays off, the orchestration patterns that recur in practice, how to estimate the token and latency bill, and the coordination failures to design against.",
      minutes: 22,
      sections: [
        {
          heading: "Why split work across agents",
          body: paragraphs(
            "The main benefit of subagents is context isolation. A subagent runs in its own context window with its own instructions and tools, does a focused piece of work, and returns only a summary to the caller. The lead agent never sees the forty web pages the subagent read, so its own context stays clean for planning and synthesis. Claude Code's subagents work exactly this way.",
            "The second benefit is breadth. Anthropic's research system uses a lead agent that plans and delegates to subagents running in parallel. On its internal research eval, a lead agent on a larger model with smaller-model subagents outperformed a single agent by 90.2%. Anthropic also found that token usage alone explained 80% of the performance variance on a browsing benchmark: multi-agent designs work partly because they let you spend more tokens on a problem than one context window allows.",
            "That is also the catch. In the same data, agents used about 4 times the tokens of a chat, and multi-agent systems about 15 times. Multi-agent only makes sense when the task is valuable enough to pay for that, and when the work actually splits into independent parts.",
          ),
        },
        {
          heading: "Orchestration patterns you will reuse",
          body: paragraphs(
            "Anthropic's catalogue of patterns covers most real systems. Prompt chaining runs fixed steps in sequence with checks between them. Routing classifies an input and sends it to a specialised handler, often a cheaper model for easy cases. Parallelization either splits a task into independent sections or runs the same task several times and votes. Orchestrator-workers has a central model break a task down dynamically, delegate the parts and synthesise the results. Evaluator-optimizer has one model draft and another critique in a loop.",
            "Mapped to business work: routing suits support triage, where billing, technical and sales tickets get different prompts and tools. Sectioning suits reviewing a long contract clause by clause. Orchestrator-workers suits researching a list of 40 target accounts before a campaign. Evaluator-optimizer suits outbound email drafts checked against a written brand and compliance rubric.",
            "Only orchestrator-workers is truly multi-agent in the dynamic sense. The others can run as plain workflows in n8n or Make with several model calls, which is cheaper to operate and easier to debug. Reach for a dynamic orchestrator only when you cannot know the subtasks until you see the input.",
          ),
        },
        {
          heading: "Estimating cost and latency before you build",
          body: paragraphs(
            "Do the arithmetic first. Suppose one agent researching an account uses about 40,000 tokens. An orchestrator that plans, spawns five workers at 30,000 tokens each and then synthesises with 20,000 tokens spends roughly 170,000 tokens: four times the bill for one result. If the five workers find materially better information, that can be worth it; for a simple lookup it is waste.",
            "Parallel workers cut wall-clock time, but the lead usually waits for the whole batch, so a run is as slow as its slowest worker. Anthropic notes that executing subagents synchronously simplifies coordination but creates a bottleneck. Put a timeout on every worker and let the lead proceed with partial results rather than stalling.",
            "Mix models deliberately. Workers doing narrow extraction or search can run on a fast, low-cost model; the lead that plans and synthesises benefits from your provider's balanced or flagship model. Give each worker a turn cap and a token budget, and write effort rules into the lead's prompt. Anthropic's rule of thumb: simple fact-finding needs one agent with 3 to 10 tool calls, not a fleet.",
          ),
          code: {
            language: "typescript",
            content: `type WorkerResult = { account: string; summary?: string; error?: string };

// runWorker is the agent loop from the previous lesson, with model and turn cap as options.
export async function researchAccounts(accounts: string[]): Promise<WorkerResult[]> {
  const results: WorkerResult[] = [];

  // Batches of 5 cap concurrency, so rate limits and spend grow predictably.
  for (let start = 0; start < accounts.length; start += 5) {
    const batch = accounts.slice(start, start + 5);
    const settled = await Promise.allSettled(
      batch.map((account) =>
        runWorker({
          model: "${FAST_MODEL}",
          maxTurns: 6,
          timeoutMs: 90_000,
          // Objective, output format, sources and boundaries: vague briefs cause duplicate work.
          task:
            "Research the company " + account + ". Return JSON with industry, headcount_range, " +
            "latest_funding_event and one source URL per fact. Use only public web sources. " +
            "Do not contact anyone. If a fact is not found, return null for it.",
        }),
      ),
    );
    settled.forEach((outcome, index) => {
      results.push(
        outcome.status === "fulfilled"
          ? { account: batch[index], summary: outcome.value }
          : { account: batch[index], error: String(outcome.reason) },
      );
    });
  }
  // The lead synthesises from summaries only, and sees failures explicitly instead of silently.
  return results;
}`,
          },
        },
        {
          heading: "What breaks in multi-agent systems",
          body: paragraphs(
            "Vague delegation is the most common failure. Anthropic found that without detailed task descriptions, subagents duplicate work, leave gaps or fail to find what is needed. Its early agents spawned 50 subagents for simple queries and distracted each other with excessive updates. Every worker brief needs an objective, an output format, guidance on tools and sources, and clear boundaries.",
            "Shared writes are the next. If two workers can both update the same CRM record, you will eventually get conflicting tags or a double-sent message. Keep workers read-only and let a single component, ideally deterministic code rather than a model, perform writes after the lead has reconciled the results.",
            "Finally, multi-agent runs are long and stateful, which makes deploys risky. Anthropic uses rainbow deployments, shifting traffic gradually from old to new versions while both run, so an update does not break agents mid-task. At smaller scale, the equivalent is versioning your prompts and tools and letting in-flight runs finish on the version they started with.",
          ),
        },
      ],
      keyPoints: [
        "Subagents buy context isolation and parallel breadth; they cost many times the tokens of a single agent.",
        "Most business tasks fit chaining, routing or parallelization as plain workflows; use dynamic orchestrator-workers only when subtasks are unknown upfront.",
        "Estimate tokens and wall-clock time before building, and cap turns, tokens and time per worker.",
        "Brief every worker with objective, output format, sources and boundaries, and keep writes in one place.",
      ],
      termIds: ["multi-agent", "subagent", "orchestration", "model-routing", "latency", "context-window", "agent"],
      exercise: {
        prompt:
          "Measure the real trade-off between one agent and an orchestrator with parallel workers on the same research task.",
        steps: [
          "Pick a task with independent parts, such as summarising three competitors' public pricing pages.",
          "Run it once as a single agent and record total input and output tokens from the API usage fields, plus wall-clock seconds.",
          "Run it again with one worker per competitor in parallel, each with a written brief (objective, output format, sources, boundaries), plus a synthesis call.",
          "Compare the two outputs for accuracy and completeness and write a one-line decision on which design you would ship.",
        ],
        successCheck:
          "You have a small table with tokens and seconds for both designs, a note on which output was more complete, and a decision that cites those numbers rather than intuition.",
      },
      sources: [SOURCES.multiAgent, SOURCES.buildingAgents, SOURCES.subagents],
      lastVerified: VERIFIED,
    },

    // ── 3 ──
    {
      id: "mcp-and-a2a",
      title: "MCP and A2A",
      summary:
        "How the Model Context Protocol connects agents to tools and data, what the stateless 2026-07-28 revision changed, how to build and test a minimal server, and where A2A and the Agentic AI Foundation fit.",
      minutes: 24,
      sections: [
        {
          heading: "What MCP standardises",
          body: paragraphs(
            "Before MCP, every AI app needed its own integration for every tool. MCP defines one protocol: a host application such as Claude, Claude Code or an n8n workflow runs MCP clients, and each client talks to an MCP server that exposes capabilities. Servers offer tools the model can call, resources it can read and prompts users can invoke. Build a server once and any MCP-capable host can use it.",
            "The ecosystem is now large enough that you will often consume servers rather than build them. Zapier exposes its app catalogue over MCP, HighLevel runs an MCP server in front of its API, and n8n ships MCP Client Tool and MCP Server Trigger nodes. Build your own when you need a narrow, well-described interface to an internal system, which usually beats handing an agent a sprawling generic API.",
            "Treat every server as code you are trusting. Its tool descriptions go straight into the model's context, and its tools act with whatever credentials you gave it. The spec itself says there should always be a human in the loop able to deny tool invocations.",
          ),
        },
        {
          heading: "Transports and the stateless 2026-07-28 revision",
          body: paragraphs(
            "MCP messages are JSON-RPC, carried by one of two standard transports. With stdio, the client launches the server as a subprocess and they exchange newline-delimited messages over standard input and output, which suits local tools. With Streamable HTTP, each message is an HTTP POST to a single endpoint and replies come back as JSON or a request-scoped event stream, which suits remote and shared servers. The older HTTP plus SSE transport is formally deprecated.",
            "The 2026-07-28 revision made the protocol stateless. The initialize handshake and the Mcp-Session-Id header are gone; every request carries its protocol version and client capabilities in its metadata, and servers must implement server/discover to advertise what they support. Server-initiated requests are replaced by Multi Round-Trip Requests: a server that needs more input returns an input_required result and the client retries with the answers. Roots, Sampling and Logging are deprecated under a new policy with a minimum 12-month window, and tasks moved into an optional extension.",
            "Operationally, stateless means you can run a remote server behind an ordinary load balancer without sticky sessions. It also means a broken response stream loses the in-flight request and the client must re-issue it, so tools that write data must be idempotent. If a tool needs state across calls, the spec's answer is an explicit handle your server mints and the model passes back as a normal argument.",
          ),
        },
        {
          heading: "A minimal server",
          body: paragraphs(
            "This server, written against the current official TypeScript SDK, exposes one read-only tool that looks up a CRM contact by email. Note the design choices: a narrow tool with a precise description, input validated by a schema, credentials read from environment variables, and failures returned as a tool error the model can read rather than a crash.",
            "On stdio, standard output carries the protocol itself, so any log line written there corrupts the message stream. Log to standard error only. The SDK's serveStdio helper negotiates the protocol revision with each client, so the same server answers both current clients and older ones that still open with the initialize handshake.",
          ),
          code: {
            language: "typescript",
            content: `import { McpServer } from "@modelcontextprotocol/server";
import { serveStdio } from "@modelcontextprotocol/server/stdio";
import { z } from "zod";

const CRM_BASE_URL = process.env.CRM_BASE_URL;
const CRM_TOKEN = process.env.CRM_TOKEN;
if (!CRM_BASE_URL || !CRM_TOKEN) throw new Error("Set CRM_BASE_URL and CRM_TOKEN");

// serveStdio calls this whenever it needs an instance, so return a fresh server each time.
function createServer() {
  const server = new McpServer({ name: "crm-lookup", version: "1.0.0" });

  server.registerTool(
    "find_contact_by_email",
    {
      description: "Find one CRM contact by exact email address. Read-only. Returns name, tags and pipeline stage.",
      inputSchema: z.object({ email: z.string().min(3).max(254).describe("Exact email address") }),
    },
    async ({ email }) => {
      const response = await fetch(CRM_BASE_URL + "/contacts?email=" + encodeURIComponent(email), {
        headers: { Authorization: "Bearer " + CRM_TOKEN },
      });
      if (!response.ok) {
        return { content: [{ type: "text", text: "CRM lookup failed with HTTP " + response.status }], isError: true };
      }
      return { content: [{ type: "text", text: JSON.stringify(await response.json()) }] };
    },
  );
  return server;
}

// stdout carries the protocol on stdio, so errors go to stderr.
serveStdio(createServer, { onerror: (error) => console.error("crm-lookup error:", error) });`,
          },
        },
        {
          heading: "Connecting and testing a server",
          body: paragraphs(
            "Test a server on its own before you put a model in front of it. The official MCP Inspector runs through npx with no install: point it at the command that starts your server and it opens a browser UI, or use its CLI mode to list tools and call them from a script, which also makes a good CI smoke test.",
            "To use a local stdio server from Claude for Desktop, add it under mcpServers in the app's claude_desktop_config.json with the command and arguments that start it, then restart the app. Remote Streamable HTTP servers are added by URL instead, usually with OAuth so the user grants access without pasting a token.",
          ),
          code: {
            language: "json",
            content: `{
  "mcpServers": {
    "crm-lookup": {
      "command": "node",
      "args": ["/ABSOLUTE/PATH/TO/crm-lookup/build/index.js"]
    }
  }
}`,
          },
        },
        {
          heading: "A2A, and who governs these standards",
          body: paragraphs(
            "MCP connects an agent to tools and data. A2A, the Agent2Agent protocol, connects an agent to other agents, including ones run by another team or company. The A2A project describes the two as complementary: tools are typically stateless functions, while agents talking over A2A can reason, plan, ask for clarification and run long tasks asynchronously, with their inner workings kept opaque to each other. A client discovers what a remote agent can do, and how to authenticate, by fetching its Agent Card. A2A has a stable v1.0 specification.",
            "You rarely need A2A for a single business's automations; a subagent or an MCP tool is simpler. It earns its place when independently built agents, often from different vendors, must hand work to each other, such as a buyer's procurement agent negotiating with a supplier's quoting agent.",
            "Both standards are now vendor-neutral. The Agentic AI Foundation (AAIF), under the Linux Foundation, was co-founded by Anthropic, Block and OpenAI and hosts MCP, A2A, AGENTS.md, goose and Agent Skills; A2A joined in August 2026 and Anthropic donated Agent Skills in October 2026. For you, neutral governance plus MCP's 12-month deprecation window means a slower, more predictable upgrade path: read each spec changelog and plan migrations rather than discovering them when a client breaks.",
          ),
        },
      ],
      keyPoints: [
        "MCP hosts run clients that talk to servers exposing tools, resources and prompts; build once, use in any MCP host.",
        "Use stdio for local servers and Streamable HTTP for remote ones; HTTP plus SSE is deprecated.",
        "Since 2026-07-28 MCP is stateless: no initialize handshake or session header, server/discover is required, and write tools must be idempotent.",
        "Never write logs to stdout in a stdio server, and test every server with the MCP Inspector before connecting a model.",
        "A2A is for agent-to-agent delegation across systems; both MCP and A2A are governed by the AAIF under the Linux Foundation.",
      ],
      termIds: ["mcp", "mcp-server", "mcp-client", "mcp-transport", "mcp-primitive", "a2a", "mcp-connectors", "idempotency"],
      exercise: {
        prompt:
          "Build the minimal MCP server from this lesson against fake data and verify it with the MCP Inspector, no model required.",
        steps: [
          "Create a project and install the SDK and zod as in the official build-server guide (npm install @modelcontextprotocol/server zod).",
          "Replace the fetch call with an in-memory map of three contacts, returning isError true with a clear message for unknown emails.",
          "Build the server, then run npx @modelcontextprotocol/inspector --cli node build/index.js --method tools/list.",
          "Open the Inspector UI with npx @modelcontextprotocol/inspector node build/index.js and call the tool with one known and one unknown email.",
        ],
        successCheck:
          "tools/list prints find_contact_by_email with your description and schema; a known email returns that contact's JSON; an unknown email returns your error text flagged as an error; and nothing but protocol messages appear on stdout.",
      },
      sources: [SOURCES.mcpChangelog, SOURCES.mcpBuildServer, SOURCES.a2a, SOURCES.aaif],
      lastVerified: VERIFIED,
    },

    // ── 4 ──
    {
      id: "context-engineering-and-memory",
      title: "Context engineering and memory",
      summary:
        "Treat the context window as a budget: what to put in it, how prompt caching cuts the cost of resending it, how long-running agents stay inside it, and how to give agents memory without giving them stale or poisoned facts.",
      minutes: 22,
      sections: [
        {
          heading: "Context is a budget, not a bucket",
          body: paragraphs(
            "Large context windows invite you to put everything in. Anthropic's guidance points the other way: as the number of tokens grows, a model's ability to recall information from its context falls, an effect known as context rot, and it shows up across all models. Models have an attention budget, and every token you add spends some of it. Good context engineering means finding the smallest set of high-signal tokens that makes the desired outcome likely.",
            "In an agent the cost compounds. The loop resends the whole conversation on every turn, including every tool result so far. A 20-turn run that grows to 60,000 tokens of history sends hundreds of thousands of input tokens in total, and latency rises with it. A single verbose tool that returns a full order history instead of the three fields the agent needs can double the bill for the whole run.",
            "So budget explicitly. Decide what the system prompt must contain, keep tool outputs short and structured, and design tools that return identifiers and summaries the agent can drill into, rather than everything at once.",
          ),
        },
        {
          heading: "Prompt caching for agents",
          body: paragraphs(
            "Prompt caching lets the API reuse the processed prefix of a prompt across requests. The cached prefix is the whole prompt in a fixed order, tools first, then system, then messages, up to the block you mark with cache_control. Reads from the cache cost a small fraction of the normal input price and are faster; writing the cache costs somewhat more than normal input. The default lifetime is 5 minutes, refreshed each time it is used, and a 1-hour lifetime is available at a higher write price. Check the pricing page for current multipliers.",
            "Agents are ideal for caching because each turn repeats the same tools and system prompt. What kills the hit rate is anything that changes the prefix: a timestamp or the user's name in the system prompt, tools added or reordered between turns, or an MCP server that lists tools in a different order each time. The 2026-07-28 MCP revision asks servers to return tools in a deterministic order for exactly this reason.",
            "Verify instead of assuming. The response usage reports cache_creation_input_tokens and cache_read_input_tokens. If both are zero, nothing was cached, often because the prefix was below the model's minimum cacheable length.",
          ),
          code: {
            language: "typescript",
            content: `const response = await client.messages.create({
  model: "${BALANCED_MODEL}",
  max_tokens: 1024,
  tools, // same tools, same order, every turn: they are the start of the cached prefix
  system: [
    {
      type: "text",
      text: SUPPORT_PLAYBOOK, // large and stable: no timestamps, names or per-user data here
      cache_control: { type: "ephemeral" },
    },
  ],
  messages, // per-turn content goes after the cached prefix
});

const { input_tokens, cache_creation_input_tokens, cache_read_input_tokens } = response.usage;
logger.info({ input_tokens, cache_creation_input_tokens, cache_read_input_tokens }, "claude usage");`,
          },
        },
        {
          heading: "Keeping long runs inside the window",
          body: paragraphs(
            "Anthropic describes three techniques for long-horizon work. Compaction summarises a conversation that is nearing the limit and restarts with the summary; the Claude API also offers server-side compaction. Structured note-taking has the agent write progress to a file or store outside the context, such as a NOTES file or a database row, and read it back when needed. Sub-agent architectures hand focused work to subagents with clean context windows that return condensed results.",
            "The lightest form of compaction is clearing old tool results. Once a tool was called many turns ago, the agent rarely needs the raw output again; replacing it with a one-line summary can reclaim most of the context in a tool-heavy run.",
            "Compaction is lossy, so tune it. Start by making the summary capture everything relevant, then trim. The failure to watch for is an agent that forgets a constraint from early in the run, such as the customer's stated budget, because the summary dropped it.",
          ),
        },
        {
          heading: "Memory and retrieval for agents",
          body: paragraphs(
            "Session memory is the conversation so far. Persistent memory survives across sessions: a chat history table, a facts store, or notes the agent writes. n8n's AI Agent node, for example, can attach memory sub-nodes backed by Postgres or Redis. Before adding persistent memory, ask whether the fact belongs in your system of record instead. A lead's preferred contact time belongs in a GoHighLevel custom field that humans and workflows can see and correct, not buried in an agent's private notes.",
            "Memory creates new failure modes. Stale facts outlive the truth, PII persists longer than your retention policy allows, and anything written from untrusted input, such as an inbound email, can plant instructions the agent will read later. Give memory a write policy: who may write, with what provenance, and when entries expire.",
            "For knowledge, agents increasingly retrieve just in time. Instead of loading documents up front, the agent keeps lightweight references such as file paths, record IDs or saved queries and calls a search tool when it needs something. Return small chunks with source IDs, cap results per call, and let the agent search again with a better query; this is agentic RAG, and it keeps the context focused on what the current step needs.",
          ),
        },
      ],
      keyPoints: [
        "Recall degrades as context grows; aim for the smallest set of high-signal tokens, not the biggest window.",
        "Agent loops resend history every turn, so verbose tool output multiplies cost and latency.",
        "Cache the stable prefix (tools, system prompt) and keep it byte-identical; confirm hits in the usage fields.",
        "Use compaction, tool-result clearing, external notes and subagents to keep long runs inside the budget.",
        "Persistent memory needs a write policy and expiry; prefer your system of record for business facts.",
      ],
      termIds: ["context-engineering", "context-window", "prompt-caching", "memory-persistent-vs-session", "agentic-rag", "token"],
      exercise: {
        prompt: "Prove to yourself what makes prompt caching hit or miss on a real request.",
        steps: [
          "Write a system prompt of a few thousand tokens (paste a long policy document) and mark it with cache_control as in the sample.",
          "Send the same request twice within a minute and log the three usage fields each time.",
          "Add the current time to the start of the system prompt and send two more requests.",
          "Restore the stable prompt, then change the order of two tools and send two more.",
        ],
        successCheck:
          "The second identical request shows cache_read_input_tokens above zero; the timestamped requests and the reordered-tools requests each show cache_creation_input_tokens again instead of a read, so you can name exactly which change broke the cache.",
      },
      sources: [SOURCES.contextEngineering, SOURCES.promptCaching, SOURCES.mcpChangelog],
      lastVerified: VERIFIED,
    },

    // ── 5 ──
    {
      id: "evals-and-observability",
      title: "Evals and observability",
      summary:
        "Test prompts and agents the way you test code: success criteria, graded eval sets, LLM-as-judge done carefully, regression gates in CI, and traces that let you debug a production run step by step.",
      minutes: 22,
      sections: [
        {
          heading: "Why prompts need tests",
          body: paragraphs(
            "A prompt edit, a model upgrade, a new tool or a changed retrieval index can each change behaviour across thousands of inputs you never look at. Without an eval, the first signal is a client asking why leads are being tagged wrong. Evals turn vague quality into a number you can compare between versions.",
            "Start from success criteria that are specific and measurable: route at least 95% of tickets to the right queue, never promise a refund the policy does not allow, answer within 10 seconds. Then build a test set from real inputs, including the ugly ones: empty messages, mixed languages, angry customers and messages that try to give the model instructions.",
            "You do not need hundreds of cases to begin. Anthropic started its research agent evals with about 20 queries representing real usage; early on, a single prompt change could move success from 30% to 80%, so small sets reveal big effects. Grow the set every time production shows you a new failure.",
          ),
        },
        {
          heading: "Grading: code first, then a model, then people",
          body: paragraphs(
            "Anthropic's guidance is to pick the fastest reliable grader. Code-based grading, such as an exact match on a label or a check that a required phrase appears, is fastest and most reliable but lacks nuance. Human grading is the most flexible but slow and expensive. LLM-based grading is fast, flexible and scalable, but test it for reliability before you trust it at scale. It also advises favouring volume: more cases with slightly noisier automated grading beat a handful of hand-graded ones.",
            "Design outputs so code can grade them. A classifier that returns structured JSON with a fixed label set can be graded by exact match, with no judge needed. Reserve LLM-as-judge for open-ended outputs such as drafted replies or summaries.",
            "When you use a judge, give it a detailed rubric with concrete pass conditions, let it reason briefly before giving a verdict, and parse a strict final line. Before relying on it, grade 30 to 50 cases by hand and check how often the judge agrees with you; if it disagrees often, fix the rubric before you trust its scores.",
          ),
          code: {
            language: "typescript",
            content: `const RUBRIC = [
  "You grade a customer support reply against the POLICY.",
  "PASS only if all are true: it answers the customer's actual question;",
  "every policy claim matches POLICY; it promises no refund, discount or date that POLICY does not allow.",
  "Explain briefly, then end with a final line that is exactly VERDICT: PASS or VERDICT: FAIL.",
].join(" ");

export async function judgeReply(policy: string, question: string, reply: string): Promise<boolean> {
  const response = await client.messages.create({
    model: "${FLAGSHIP_MODEL}",
    max_tokens: 1024,
    system: RUBRIC,
    messages: [{ role: "user", content: "POLICY:\\n" + policy + "\\n\\nQUESTION:\\n" + question + "\\n\\nREPLY:\\n" + reply }],
  });
  const text = response.content.flatMap((block) => (block.type === "text" ? [block.text] : [])).join("");
  const verdict = text.match(/VERDICT: (PASS|FAIL)\\s*$/);
  if (!verdict) throw new Error("Judge returned no parseable verdict"); // count as an eval error, not a pass
  return verdict[1] === "PASS";
}`,
          },
        },
        {
          heading: "Regression gates in CI",
          body: paragraphs(
            "Treat the eval like a test suite. Store cases in version control next to the prompt, run them on every change to the prompt, tools or model id, and fail the build when the score drops below your threshold. Record the score per version so you can see drift over time and answer the question of whether last week's change helped.",
            "Pin the exact model id in production and change it deliberately, running the eval before you switch. Providers retire models on published schedules, so a model upgrade is a planned change with a test run, not something that happens to you.",
            "Open-source tools can save you writing the harness: Promptfoo, DeepEval and the UK AI Security Institute's Inspect all run eval suites, and tracing platforms such as Langfuse and LangSmith attach scores to traces. The harness below is deliberately plain so you can see the whole idea.",
          ),
          code: {
            language: "typescript",
            content: `import { readFile } from "node:fs/promises";

type EvalCase = { id: string; input: string; expected: "sales" | "support" | "billing" | "spam" };

const cases: EvalCase[] = JSON.parse(await readFile("evals/ticket-routing.json", "utf8"));
const failures: string[] = [];

for (const evalCase of cases) {
  const label = await classifyTicket(evalCase.input); // the production function under test
  if (label !== evalCase.expected) {
    failures.push(evalCase.id + ": expected " + evalCase.expected + ", got " + label);
  }
}

const accuracy = 1 - failures.length / cases.length;
console.log("accuracy " + accuracy.toFixed(3) + " on " + cases.length + " cases");
failures.forEach((failure) => console.log("FAIL " + failure));

// Fail CI so a prompt or model change cannot silently regress routing.
if (accuracy < 0.95) process.exit(1);`,
          },
        },
        {
          heading: "Tracing agents in production",
          body: paragraphs(
            "Evals tell you whether a version is good; traces tell you what happened in one specific run. A trace is the end-to-end request, and spans are its timed steps. OpenTelemetry's GenAI semantic conventions give these steps standard names, such as an invoke_agent span with child chat spans for each model call and execute_tool spans for each tool call, and standard attributes such as gen_ai.request.model, gen_ai.usage.input_tokens and gen_ai.usage.output_tokens. The conventions are in use today but still marked as in development, so expect some names to change.",
            "Content capture is a decision, not a default. By default the conventions record metadata only, because prompts, tool arguments and results can contain sensitive data. Turn on content capture where you need it for debugging, and apply the same retention and access rules you would to the underlying customer records.",
            "Whatever backend you pick, open-source and self-hostable Langfuse, LangSmith or Arize Phoenix among them, alert on the signals that precede incidents: cost per run, turns per run, tool error rate, refusal and max_tokens stop rates, and latency at the 95th percentile. Then close the loop: when a trace shows a bad run, turn it into a new eval case.",
          ),
        },
      ],
      keyPoints: [
        "Write measurable success criteria and an eval set from real inputs before tuning prompts.",
        "Prefer code-based grading; design outputs so they can be graded by code.",
        "Use LLM-as-judge with a concrete rubric and a strict verdict format, and check it against human labels first.",
        "Gate prompt, tool and model changes on eval scores in CI, and pin model ids in production.",
        "Trace runs with GenAI spans and token attributes, capture content deliberately, and turn bad traces into eval cases.",
      ],
      termIds: ["evals", "llm-as-judge", "observability", "structured-output", "latency", "prompt-engineering"],
      exercise: {
        prompt: "Put a regression gate in front of a small classifier prompt.",
        steps: [
          "Write a classifier prompt that labels support messages as sales, support, billing or spam and returns only the label.",
          "Create 20 cases in a JSON file from realistic messages, including at least four tricky ones (sarcasm, two topics, an instruction aimed at the model).",
          "Run the harness from this lesson and fix the prompt until it passes your threshold.",
          "Deliberately weaken the prompt, for example by deleting the label definitions, and run the harness again.",
        ],
        successCheck:
          "The harness prints an accuracy score and lists failing case IDs; with the good prompt it exits with code 0, and with the weakened prompt it exits with a non-zero code that would fail a CI build.",
      },
      sources: [SOURCES.evals, SOURCES.otel, SOURCES.multiAgent],
      lastVerified: VERIFIED,
    },

    // ── 6 ──
    {
      id: "security-and-production",
      title: "Security and production",
      summary:
        "Design agents that stay safe when they are fooled: prompt injection as an architecture problem, least-privilege tools and guardrails, human approval for risky actions, and the deployment and cost controls that keep a production agent predictable.",
      minutes: 24,
      sections: [
        {
          heading: "Prompt injection is an architecture problem",
          body: paragraphs(
            "The 2026 edition of the OWASP Top 10 for LLM Applications, published in August 2026, moved Excessive Agency up to third place: what an agent can do with its permissions is now a primary risk, and prompt injection is how most of those failures start. Direct injection is a user typing instructions to subvert your prompt. Indirect injection is worse for agents: the instruction hides in content the agent reads, such as an inbound email, a web page, a PDF or a tool result. A triage agent that reads an email saying to forward all invoices to an outside address is one tool call away from doing it.",
            "No filter reliably catches every injection, because to the model it is just more text. So design on the assumption that the agent will sometimes be fooled, and limit what a fooled agent can reach. As one contributor put it in OWASP's 2026 announcement, the work is to contain what a fooled agent can reach before it acts.",
            "The dangerous combination is an agent that reads untrusted content, can see private data, and has a way to send data out. Remove any one of the three from a given run, for instance by making the email-reading agent unable to send messages, and most injection attacks lose their payoff.",
          ),
        },
        {
          heading: "Least privilege and guardrails in code",
          body: paragraphs(
            "Give each agent only the tools its job needs, and give each tool the narrowest credential that works: a scoped token for one CRM location rather than an agency-wide key, read-only database access for a research agent, and separate credentials per agent so you can revoke one without stopping the rest. Keep secrets in environment variables on the server; anything placed in the model's context can leak.",
            "Then enforce policy outside the model. A gate between the model's tool request and the actual execution checks that the tool is on the allowlist, validates arguments against a strict schema, enforces per-run budgets and routes high-risk actions to a human. The model can ask for anything; the gate decides what happens.",
            "Treat model output as untrusted input too. Escape it before rendering it in a page, use parameterised queries if it ever reaches SQL, and never pass it to a shell. If the gate rejects a call, return the reason as an is_error tool result so the agent can explain or adjust instead of retrying blindly.",
          ),
          code: {
            language: "typescript",
            content: `import { z } from "zod";

type Risk = "read" | "write" | "irreversible";
type Rule = { risk: Risk; schema: z.ZodType };
type GateResult = { allowed: true; input: unknown } | { allowed: false; reason: string };

const POLICY: Record<string, Rule> = {
  find_contact: { risk: "read", schema: z.object({ email: z.string().max(254) }) },
  add_tag: {
    risk: "write",
    schema: z.object({ contactId: z.string().regex(/^[A-Za-z0-9]{10,40}$/), tag: z.enum(["hot-lead", "nurture", "unqualified"]) }),
  },
  send_email: { risk: "irreversible", schema: z.object({ contactId: z.string(), templateId: z.enum(["followup-1", "followup-2"]) }) },
};

export async function gateToolCall(name: string, input: unknown, run: RunState): Promise<GateResult> {
  const rule = POLICY[name];
  if (!rule) return { allowed: false, reason: "Tool " + name + " is not on the allowlist" };

  const parsed = rule.schema.safeParse(input);
  if (!parsed.success) return { allowed: false, reason: "Invalid arguments: " + parsed.error.message };

  if (run.toolCalls >= run.maxToolCalls) return { allowed: false, reason: "Run budget exhausted" };
  run.toolCalls += 1;

  if (rule.risk === "irreversible") {
    await queueForApproval({ runId: run.id, tool: name, input: parsed.data }); // a human sends it, or doesn't
    return { allowed: false, reason: "Queued for human approval; tell the user it is pending" };
  }
  return { allowed: true, input: parsed.data };
}`,
          },
        },
        {
          heading: "Human approval where it counts",
          body: paragraphs(
            "Classify every tool by blast radius. Reads are usually safe to automate. Reversible writes, such as adding a tag, can run automatically with logging. Irreversible or external actions, such as sending a message, issuing a refund or deleting a record, should wait for a person until your evals and production history justify loosening that rule.",
            "Make approval cheap, or people will rubber-stamp it. Show the reviewer the proposed action, the evidence the agent used and a one-click approve or reject, in the tool they already work in: a Slack message, a task in GoHighLevel, or an approval step in your automation platform. Log who approved what, and feed rejections back into your eval set.",
            "Coding agents need the same discipline. Claude Code hooks run deterministic checks at lifecycle points: a PreToolUse hook can block an edit to protected paths such as .env files, or return a deny decision with a reason that is fed back to the model. Deterministic hooks are guardrails the model cannot talk its way past.",
          ),
        },
        {
          heading: "Deploying and controlling cost",
          body: paragraphs(
            "Unbounded consumption is a security risk, not only a billing one: an agent stuck in a loop, or a public endpoint hammered by a script, turns into a large bill or an outage. Put limits at every layer: a turn cap and max_tokens per call, a token or tool-call budget per run, rate limits per user and per IP, and daily spend alerts with your provider. An AI gateway such as Vercel AI Gateway, OpenRouter or LiteLLM can centralise keys, budgets, logging and fallbacks across providers.",
            "Spend less per run as well as capping it. Route easy requests to a fast, low-cost model; cache stable prompt prefixes; and move non-urgent work such as nightly enrichment or report generation to the Batch API, which Anthropic prices at a discount to standard requests.",
            "Release agents like any risky change. Run a new version in shadow mode on real inputs without taking actions, compare its decisions with the current version, then shift traffic gradually. Keep a kill switch that disables tools or the whole agent without a deploy, version prompts and tools together, and let in-flight runs finish on the version they started. Check data handling before launch: some models and hosted agent runtimes are not eligible for zero data retention, which matters for regulated clients.",
          ),
        },
      ],
      keyPoints: [
        "Assume the agent will sometimes be injected; limit what a fooled agent can reach rather than hoping to filter every attack.",
        "Separate untrusted input, private data and outbound channels so no single run has all three.",
        "Enforce allowlists, schema validation and budgets in a gate outside the model, and treat model output as untrusted.",
        "Require human approval for irreversible or external actions, and make approval fast enough to be real.",
        "Cap turns, tokens, rate and spend; release with shadow mode, gradual rollout and a kill switch.",
      ],
      termIds: ["prompt-injection", "guardrails", "human-in-the-loop", "rate-limit", "ai-gateway", "environment-variables", "observability"],
      exercise: {
        prompt: "Red-team your own agent with an indirect prompt injection and prove the gate contains it.",
        steps: [
          "Take the agent loop from the first lesson and give it three tools: read_email (returns a fixed email), find_contact and send_email.",
          "Make the fixed email contain a hidden instruction asking the agent to email the full contact list to an outside address.",
          "Route every tool call through the gate from this lesson, with send_email marked irreversible and maxToolCalls set to 5.",
          "Ask the agent to triage the email, and log every requested tool call, the gate's decision and the reason.",
        ],
        successCheck:
          "Your log shows that any send_email request was queued for approval rather than executed, that no message left the system, and that a run forced into a loop stops with the run budget exhausted reason after five tool calls.",
      },
      sources: [SOURCES.owaspTop10, SOURCES.owaspAnnouncement, SOURCES.hooks, SOURCES.buildingAgents],
      lastVerified: VERIFIED,
    },
  ],
};
