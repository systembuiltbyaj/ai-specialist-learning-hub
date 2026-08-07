import type { Term } from "@/app/lib/types";

// 60+ curated AI / automation / GHL terms.
// Sourced & expanded from the user's TECH-DICTIONARY-TEMPLATE.md.
export const SEED_TERMS: Term[] = [
  // ───────────────────────── CONCEPTS ─────────────────────────
  {
    id: "agent",
    name: "Agent",
    category: "Concepts",
    definition:
      "An AI system that can perceive its environment, make decisions, and take actions to achieve goals — often operating autonomously across multiple steps.",
    use_cases: [
      "Email management agent that reads, decides, and replies",
      "Calendar booking agent that checks availability and books",
      "Customer service agent that handles inquiries and escalates",
    ],
    explanation:
      "An agent is like hiring a smart assistant who can think for themselves. Tell it your goal and it figures out the steps, makes decisions, and completes the task without asking for each step.",
    related_terms: ["Workflow", "Function Calling", "Tool", "Automation", "LLM"],
    examples: [
      "I need an agent to monitor my inbox and respond to routine emails automatically.",
    ],
  },
  {
    id: "llm",
    name: "LLM (Large Language Model)",
    category: "Concepts",
    definition:
      "A neural network trained on massive amounts of text to understand and generate human language. Claude, GPT, and Gemini are all LLMs.",
    use_cases: [
      "Generating and explaining code",
      "Writing and summarizing content",
      "Powering chatbots and agents",
    ],
    explanation:
      "An LLM is the 'brain' behind AI chat tools. It has read an enormous amount of text and uses that to predict the most useful next words for whatever you ask.",
    related_terms: ["Token", "Inference", "Context Window", "Model", "Hallucination"],
    examples: ["Claude is an LLM built by Anthropic for reasoning and coding."],
  },
  {
    id: "token",
    name: "Token",
    category: "Concepts",
    definition:
      "The basic unit of text an LLM processes — roughly 3–4 characters or about ¾ of a word. Pricing and context limits are measured in tokens.",
    use_cases: [
      "Estimating API cost (priced per million tokens)",
      "Knowing how much text fits in the context window",
      "Trimming prompts to stay under limits",
    ],
    explanation:
      "Tokens are how AI counts text — like syllables for a model. 'automation' might be 2–3 tokens. You pay per token in and per token out.",
    related_terms: ["Context Window", "LLM", "Inference", "Temperature"],
    examples: ["Claude pricing is roughly $3 per million input tokens."],
  },
  {
    id: "context-window",
    name: "Context Window",
    category: "Concepts",
    definition:
      "The maximum amount of text (in tokens) a model can consider at once — its short-term memory for a single request.",
    use_cases: [
      "Feeding a whole codebase to an agent",
      "Long document analysis",
      "Keeping conversation history available",
    ],
    explanation:
      "The context window is how much the AI can 'hold in its head' at one time. A bigger window means you can paste more — whole files or long chats — without it forgetting the start.",
    related_terms: ["Token", "LLM", "Knowledge Cutoff", "Model"],
    examples: ["Claude's large context window lets it read a 200K-token document at once."],
  },
  {
    id: "prompt-engineering",
    name: "Prompt Engineering",
    category: "Concepts",
    definition:
      "The practice of crafting inputs (prompts) to get reliable, high-quality outputs from an AI model.",
    use_cases: [
      "Writing system prompts for agents",
      "Designing few-shot examples",
      "Reducing hallucinations with clear instructions",
    ],
    explanation:
      "Prompt engineering is learning how to 'ask well.' The same model gives much better answers when you're specific, give examples, and set the role and format.",
    related_terms: ["System Prompt", "Few-shot Prompting", "Chain of Thought", "LLM"],
    examples: ["Adding 'think step by step' improved the model's math accuracy."],
  },
  {
    id: "system-prompt",
    name: "System Prompt",
    category: "Concepts",
    definition:
      "A persistent instruction that sets the AI's role, rules, and behavior before the user's messages are processed.",
    use_cases: [
      "Defining an agent's persona and guardrails",
      "Enforcing output format",
      "Setting non-negotiable safety rules",
    ],
    explanation:
      "The system prompt is the AI's job description. It runs in the background and shapes every reply — like telling an employee the company rules before they start.",
    related_terms: ["Prompt Engineering", "Agent", "LLM"],
    examples: ["System prompt: 'You are a concise senior engineer. Never expose secrets.'"],
  },
  {
    id: "hallucination",
    name: "Hallucination",
    category: "Concepts",
    definition:
      "When an AI confidently generates information that is false, fabricated, or not grounded in real data.",
    use_cases: [
      "Why you verify AI-cited sources",
      "Why RAG is used to ground answers",
      "Why critical outputs need human review",
    ],
    explanation:
      "A hallucination is when the AI 'makes something up' but says it confidently. It isn't lying on purpose — it's predicting plausible text. Always verify facts.",
    related_terms: ["RAG", "Embeddings", "LLM", "Knowledge Cutoff"],
    examples: ["The model hallucinated a library function that doesn't exist."],
  },
  {
    id: "rag",
    name: "RAG (Retrieval-Augmented Generation)",
    category: "Concepts",
    definition:
      "A technique where relevant documents are retrieved (usually via vector search) and fed to the model so its answer is grounded in real data.",
    use_cases: [
      "Chat over your own documents",
      "Reducing hallucinations",
      "Company knowledge-base assistants",
    ],
    explanation:
      "RAG is 'open-book' AI. Instead of answering from memory, the model first looks up the right pages, then answers using them — so it's more accurate and current.",
    related_terms: ["Embeddings", "Vector Database", "Semantic Search", "Hallucination"],
    examples: ["A RAG bot answers support questions using your help docs."],
  },
  {
    id: "embeddings",
    name: "Embeddings",
    category: "Concepts",
    definition:
      "Numeric vector representations of text (or images) that capture meaning, enabling similarity comparison and semantic search.",
    use_cases: [
      "Semantic search",
      "Recommendation systems",
      "Powering RAG pipelines",
    ],
    explanation:
      "Embeddings turn words into coordinates so the computer can measure how related two pieces of text are by meaning, not spelling.",
    related_terms: ["Vector Database", "Semantic Search", "RAG", "LLM"],
    examples: ["'Car' and 'automobile' have nearby embeddings even though they're spelled differently."],
  },
  {
    id: "semantic-search",
    name: "Semantic Search",
    category: "Concepts",
    definition:
      "Search that matches by meaning rather than exact keywords, powered by embeddings and vector similarity.",
    use_cases: [
      "Finding docs that mean the same thing",
      "Better internal knowledge search",
      "RAG retrieval step",
    ],
    explanation:
      "Semantic search finds results by what you mean, not just the words you typed. Search 'AI that books meetings' and it finds 'calendar agent.'",
    related_terms: ["Embeddings", "Vector Database", "RAG"],
    examples: ["Semantic search returns the right doc even with no shared keywords."],
  },
  {
    id: "function-calling",
    name: "Function Calling",
    category: "Concepts",
    definition:
      "A capability that lets a model invoke predefined functions/tools with structured arguments to take real actions instead of only producing text.",
    use_cases: [
      "Claude calls send_email(to, subject, body)",
      "Claude calls book_calendar(slot)",
      "Claude calls search_database(query)",
    ],
    explanation:
      "Function calling is a remote control for your app. Instead of just talking, the model can press buttons — call functions — to make things happen.",
    related_terms: ["Tool", "MCP", "Agent", "API"],
    examples: ["Define send_email(to, subject, body) so Claude can send emails directly."],
  },
  {
    id: "tool",
    name: "Tool (Tool Use)",
    category: "Concepts",
    definition:
      "An external capability an AI can invoke — search, code execution, an API call — extending it beyond text generation.",
    use_cases: [
      "Giving an agent a calculator",
      "Letting a model run code",
      "Connecting search to a chatbot",
    ],
    explanation:
      "Tools are abilities you hand the AI. On its own it just writes; with tools it can do — search the web, run code, hit an API.",
    related_terms: ["Function Calling", "MCP", "Agent"],
    examples: ["The agent used its web-search tool to find today's date."],
  },
  {
    id: "multimodal",
    name: "Multimodal",
    category: "Concepts",
    definition:
      "An AI model that can understand and/or generate more than one type of data — text, images, audio, or video.",
    use_cases: [
      "Describing or analyzing an image",
      "Reading a screenshot of an error",
      "Video understanding",
    ],
    explanation:
      "Multimodal means the AI has more than one 'sense.' It can read text and look at pictures, so you can paste a screenshot and ask about it.",
    related_terms: ["LLM", "Model", "Inference"],
    examples: ["Gemini is strong at multimodal image and video tasks."],
  },
  {
    id: "inference",
    name: "Inference",
    category: "Concepts",
    definition:
      "The process of running a trained model to generate an output for a given input — i.e., actually using the model.",
    use_cases: [
      "Every API call you make",
      "Real-time chatbot responses",
      "Batch processing documents",
    ],
    explanation:
      "Inference is the AI 'thinking' to answer you. Training is how it learned; inference is it doing the job. You pay for inference each time you use it.",
    related_terms: ["LLM", "Token", "Model", "Temperature"],
    examples: ["High traffic increased our monthly inference costs."],
  },
  {
    id: "temperature",
    name: "Temperature",
    category: "Concepts",
    definition:
      "A setting (typically 0–1) that controls output randomness. Low = focused and deterministic; high = creative and varied.",
    use_cases: [
      "Low temp for code and data extraction",
      "High temp for brainstorming and copy",
      "Tuning chatbot personality",
    ],
    explanation:
      "Temperature is the AI's creativity dial. Turn it down for precise, repeatable answers; turn it up when you want fresh, varied ideas.",
    related_terms: ["Inference", "LLM", "Prompt Engineering"],
    examples: ["Set temperature 0 for deterministic SQL generation."],
  },
  {
    id: "few-shot",
    name: "Few-shot Prompting",
    category: "Concepts",
    definition:
      "Including a handful of example input/output pairs in the prompt so the model infers the pattern you want.",
    use_cases: [
      "Enforcing a specific output format",
      "Teaching a classification scheme",
      "Matching a writing tone",
    ],
    explanation:
      "Few-shot means 'show, don't just tell.' Give the AI two or three examples of what good looks like and it copies the pattern.",
    related_terms: ["Zero-shot Prompting", "Prompt Engineering", "System Prompt"],
    examples: ["Three labeled examples made the model classify tickets correctly."],
  },
  {
    id: "zero-shot",
    name: "Zero-shot Prompting",
    category: "Concepts",
    definition:
      "Asking a model to perform a task with no examples — relying purely on its pretrained knowledge and your instructions.",
    use_cases: [
      "Quick one-off tasks",
      "When examples aren't available",
      "Simple, well-known tasks",
    ],
    explanation:
      "Zero-shot is just asking directly, no examples. Works great for common tasks the model already understands.",
    related_terms: ["Few-shot Prompting", "Prompt Engineering"],
    examples: ["'Translate this to Spanish' is a zero-shot prompt."],
  },
  {
    id: "chain-of-thought",
    name: "Chain of Thought",
    category: "Concepts",
    definition:
      "Prompting a model to reason step by step before answering, which improves accuracy on complex problems.",
    use_cases: [
      "Math and logic problems",
      "Multi-step planning",
      "Debugging reasoning",
    ],
    explanation:
      "Chain of thought is making the AI 'show its work.' Walking through steps out loud helps it reach the right final answer.",
    related_terms: ["Reasoning Model", "Prompt Engineering", "LLM"],
    examples: ["'Let's think step by step' triggers chain-of-thought reasoning."],
  },
  {
    id: "reasoning-model",
    name: "Reasoning Model",
    category: "Concepts",
    definition:
      "A model designed to spend extra compute 'thinking' through problems before responding, excelling at complex multi-step tasks.",
    use_cases: [
      "Hard coding and math",
      "Complex planning",
      "Scientific analysis",
    ],
    explanation:
      "A reasoning model deliberately slows down to think harder. It trades a bit of speed for much better answers on tough problems.",
    related_terms: ["Chain of Thought", "LLM", "Inference"],
    examples: ["For a tricky algorithm, a reasoning model outperforms a fast one."],
  },
  {
    id: "knowledge-cutoff",
    name: "Knowledge Cutoff",
    category: "Concepts",
    definition:
      "The date after which a model has no built-in knowledge, because its training data stops there.",
    use_cases: [
      "Knowing when to add web search",
      "Explaining missing recent facts",
      "Choosing RAG for current data",
    ],
    explanation:
      "The cutoff is the AI's 'last day of school.' It doesn't know events after that date unless you give it tools or fresh documents.",
    related_terms: ["LLM", "RAG", "Hallucination"],
    examples: ["Past the knowledge cutoff, give the model a web-search tool."],
  },
  {
    id: "fine-tuning",
    name: "Fine-tuning",
    category: "Concepts",
    definition:
      "Further training a base model on your own examples to specialize its behavior, tone, or domain knowledge.",
    use_cases: [
      "Brand-specific writing style",
      "Domain-specialized classification",
      "Consistent structured output",
    ],
    explanation:
      "Fine-tuning is custom training. You take a smart general model and teach it your specific job with your own examples.",
    related_terms: ["LLM", "Few-shot Prompting", "Model"],
    examples: ["We fine-tuned a model on our support tickets for on-brand replies."],
  },
  {
    id: "model",
    name: "Model",
    category: "Concepts",
    definition:
      "A specific trained AI system with a name and version (e.g., Claude Opus, GPT-4o) that you send inputs to and receive outputs from.",
    use_cases: [
      "Picking the right model for a task",
      "Balancing cost vs capability",
      "Versioning your AI stack",
    ],
    explanation:
      "A model is one specific 'brain' you can use. Different models have different strengths, speeds, and prices — pick the right one for the job.",
    related_terms: ["LLM", "Inference", "Multimodal"],
    examples: ["Use a fast model for chat, a reasoning model for hard code."],
  },
  {
    id: "agentic-ai",
    name: "Agentic AI",
    category: "Concepts",
    definition:
      "AI that doesn't just answer — it plans, takes multi-step actions with tools, observes results, and adapts to reach a goal with minimal hand-holding.",
    use_cases: [
      "An agent that books meetings end-to-end",
      "Autonomous coding (read → edit → test → fix)",
      "Research agents that search, read, and synthesize",
    ],
    explanation:
      "Agentic AI is the shift from 'AI that talks' to 'AI that does.' You give a goal; it figures out the steps and executes them, checking its own work along the way.",
    related_terms: ["Agent", "Tool", "Reasoning Model", "Function Calling"],
    examples: ["Claude Code is agentic — it edits files, runs commands, and verifies."],
  },
  {
    id: "prompt-caching",
    name: "Prompt Caching",
    category: "Concepts",
    definition:
      "Reusing a previously-processed chunk of prompt (e.g., a long system prompt or document) so repeat requests are cheaper and faster.",
    use_cases: [
      "Caching a big system prompt across calls",
      "Cutting cost on repeated long-context requests",
      "Faster multi-turn agents",
    ],
    explanation:
      "Prompt caching is like the model 'remembering' the expensive part of your prompt so it doesn't re-read it every time — big savings on cost and latency.",
    related_terms: ["Token", "Context Window", "Inference", "Latency"],
    examples: ["Cache a 50-page policy doc once, then ask many questions cheaply."],
  },
  {
    id: "structured-output",
    name: "Structured Output",
    category: "Concepts",
    definition:
      "Forcing a model to return data in a strict shape (usually JSON matching a schema) instead of free-form text.",
    use_cases: [
      "Reliable JSON for your app to parse",
      "Extracting fields from messy text",
      "Tool/function arguments",
    ],
    explanation:
      "Structured output makes the AI fill in a form instead of writing an essay — so your code can trust the shape and stop doing fragile text parsing.",
    related_terms: ["Function Calling", "Tool", "Evals"],
    examples: ['Return {"name": "...", "email": "..."} every time, validated against a schema.'],
  },
  {
    id: "guardrails",
    name: "Guardrails",
    category: "Concepts",
    definition:
      "Rules, filters, and checks that constrain what an AI can say or do — for safety, brand, compliance, or correctness.",
    use_cases: [
      "Blocking unsafe or off-brand responses",
      "Validating output before it's used",
      "Restricting which tools an agent may call",
    ],
    explanation:
      "Guardrails are the fence around the AI — they keep it on-task and out of trouble, catching bad outputs before they reach users or systems.",
    related_terms: ["System Prompt", "Evals", "Agent"],
    examples: ["A guardrail rejects any reply that leaks a customer's personal data."],
  },
  {
    id: "evals",
    name: "Evals (Evaluation)",
    category: "Concepts",
    definition:
      "Systematic tests that measure how well a model or prompt performs on a task, so you can compare options and catch regressions.",
    use_cases: [
      "Comparing two prompts or models objectively",
      "Catching quality drops after a change",
      "Proving an AI feature is good enough to ship",
    ],
    explanation:
      "Evals are unit tests for AI. Instead of guessing 'this prompt feels better,' you score it on real examples and let the numbers decide.",
    related_terms: ["Prompt Engineering", "Structured Output", "Hallucination"],
    examples: ["Run 50 sample tickets through two prompts and compare accuracy."],
  },
  {
    id: "vibe-coding",
    name: "Vibe Coding",
    category: "Concepts",
    definition:
      "Building software mostly by describing what you want in natural language and letting an AI write the code — guiding by intent and feel rather than hand-writing every line.",
    use_cases: [
      "Rapid prototyping",
      "Non-experts shipping working apps",
      "Quickly testing an idea",
    ],
    explanation:
      "Vibe coding is steering the AI with plain-English intent and iterating on what it produces. Powerful for speed — still needs review for production quality.",
    related_terms: ["Agentic AI", "Context Engineering", "Prompt Engineering"],
    examples: ["'Make a dark dashboard with a sales chart' → AI builds it, you refine."],
  },
  {
    id: "context-engineering",
    name: "Context Engineering",
    category: "Concepts",
    definition:
      "Deliberately choosing what information goes into a model's context window — the right files, instructions, examples, and tools — to get the best output.",
    use_cases: [
      "Feeding an agent only the relevant files",
      "Designing a tight CLAUDE.md",
      "RAG retrieval tuning",
    ],
    explanation:
      "Context engineering is the evolution of prompt engineering: it's less about clever wording and more about giving the model exactly the right context — no more, no less.",
    related_terms: ["Prompt Engineering", "Context Window", "RAG", "System Prompt"],
    examples: ["Include the 3 files that matter, not the whole repo, to keep the model focused."],
  },
  {
    id: "reasoning-thinking",
    name: "Thinking / Extended Reasoning",
    category: "Concepts",
    definition:
      "A mode where a model spends extra compute working through a problem step-by-step before answering, improving accuracy on hard tasks.",
    use_cases: [
      "Complex math, logic, and planning",
      "Hard debugging",
      "Multi-constraint decisions",
    ],
    explanation:
      "Thinking mode lets the model 'show its work' internally before responding. It's slower but much sharper on tough problems — turn it on when difficulty is high.",
    related_terms: ["Reasoning Model", "Chain of Thought", "Inference"],
    examples: ["Enable extended thinking for a tricky algorithm; skip it for simple chat."],
  },
  {
    id: "quantization",
    name: "Quantization",
    category: "Concepts",
    definition:
      "Compressing a model by storing its weights at lower numeric precision, so it runs faster and on smaller hardware with minimal quality loss.",
    use_cases: [
      "Running open models on a laptop/GPU",
      "Cheaper self-hosted inference",
      "Edge / on-device AI",
    ],
    explanation:
      "Quantization shrinks a model so it fits on modest hardware — like saving a photo at slightly lower resolution: much smaller, still looks fine for most uses.",
    related_terms: ["LLM", "Inference", "Model"],
    examples: ["A 4-bit quantized Llama runs on a laptop via Ollama."],
  },
  {
    id: "latency",
    name: "Latency",
    category: "Concepts",
    definition:
      "The delay between sending a request and getting a response. In AI, often measured as time-to-first-token and total response time.",
    use_cases: [
      "Choosing a fast model for chat UIs",
      "Using streaming to feel faster",
      "Picking fast-inference providers (e.g., Groq)",
    ],
    explanation:
      "Latency is how long the user waits. For chat it matters a lot — streaming and faster models keep the experience snappy.",
    related_terms: ["Inference", "Token", "Prompt Caching"],
    examples: ["Stream responses so the first words appear instantly, lowering felt latency."],
  },
  {
    id: "idempotency",
    name: "Idempotency",
    category: "Automation",
    definition:
      "A property where running the same operation multiple times has the same effect as running it once — preventing duplicates on retries.",
    use_cases: [
      "Webhook handlers that may fire twice",
      "Safe automation retries",
      "Avoiding duplicate contacts/charges",
    ],
    explanation:
      "Idempotency means 'safe to repeat.' If a webhook fires twice, an idempotent handler won't create two contacts or charge twice — it recognizes the duplicate.",
    related_terms: ["Webhook", "Automation", "Trigger", "API"],
    examples: ["Use an idempotency key so a retried payment isn't charged twice."],
  },
  {
    id: "rate-limit",
    name: "Rate Limit",
    category: "Automation",
    definition:
      "A cap on how many requests you can make to an API in a time window, to protect the service from overload.",
    use_cases: [
      "Avoiding 429 errors in automations",
      "Throttling bulk sends",
      "Planning API usage at scale",
    ],
    explanation:
      "A rate limit is the API's speed limit. Go over it and requests get rejected (HTTP 429) — so high-volume workflows add delays or batching to stay under it.",
    related_terms: ["API", "Webhook", "Automation"],
    examples: ["Add a 1-second delay between calls to stay under the rate limit."],
  },
  {
    id: "mcp",
    name: "MCP (Model Context Protocol)",
    category: "Concepts",
    definition:
      "An open protocol that lets Claude connect to external tools, services, and data sources — acting like plugins for the model.",
    use_cases: [
      "Google Calendar MCP to check your schedule",
      "GitHub MCP to access repos",
      "Gmail MCP to read and send email",
    ],
    explanation:
      "MCPs are power-ups for Claude. They let it do things outside its core abilities — check your calendar, send emails, or read files.",
    related_terms: ["API", "Tool", "Function Calling", "Integration"],
    examples: ["With the Calendar MCP, Claude checks if you're free before suggesting times."],
  },

  // ───────────────────────── TOOLS ─────────────────────────
  {
    id: "claude",
    name: "Claude",
    category: "Tools",
    definition:
      "Anthropic's family of large language models built for reasoning, writing, and coding, with very long context windows.",
    use_cases: [
      "Complex problem-solving and analysis",
      "Code generation and debugging",
      "Building AI agents and workflows",
    ],
    explanation:
      "Claude is like a thoughtful, highly capable colleague — especially strong at reasoning and code. Not always the fastest, but careful and reliable.",
    related_terms: ["LLM", "Claude Code", "MCP", "Model"],
    examples: ["I used Claude to refactor a tricky module and explain each change."],
  },
  {
    id: "claude-code",
    name: "Claude Code",
    category: "Tools",
    definition:
      "Anthropic's agentic coding tool that lets Claude read, write, run, and debug code directly in your project from the terminal or IDE.",
    use_cases: [
      "Building projects from scratch",
      "Refactoring and code review",
      "Understanding existing codebases",
    ],
    explanation:
      "Claude Code is a coding mentor that actually does the work — it edits files, runs commands, and explains what it's doing as it goes.",
    related_terms: ["Claude", "Cursor", "Agent", "MCP"],
    examples: ["npm install -g @anthropic-ai/claude-code"],
  },
  {
    id: "supabase",
    name: "Supabase",
    category: "Tools",
    definition:
      "An open-source Firebase alternative: a Postgres database with authentication, storage, and instant APIs.",
    use_cases: [
      "Storing app data",
      "User authentication",
      "Building a backend without server code",
    ],
    explanation:
      "Supabase gives you a real database and backend without building one yourself — it handles data, logins, and files out of the box.",
    related_terms: ["Database", "API", "Next.js", "Vercel"],
    examples: ["This Learning Hub uses Supabase to persist terms and resources."],
  },
  {
    id: "vercel",
    name: "Vercel",
    category: "Tools",
    definition:
      "A cloud platform for deploying and hosting web apps — especially Next.js — with automatic builds from Git.",
    use_cases: [
      "Deploying a website in minutes",
      "Auto-deploy on every push",
      "Hosting Next.js apps with edge performance",
    ],
    explanation:
      "Vercel puts your site on the internet. Connect your repo, push code, and it builds and hosts it automatically.",
    related_terms: ["Next.js", "GitHub", "Deployment"],
    examples: ["Deploy the Learning Hub to Vercel by importing the GitHub repo."],
  },
  {
    id: "nextjs",
    name: "Next.js",
    category: "Tools",
    definition:
      "A React framework for production: routing, server rendering, API routes, and optimizations built in.",
    use_cases: [
      "Full-stack React apps",
      "SEO-friendly server rendering",
      "This Learning Hub",
    ],
    explanation:
      "Next.js is React with batteries included — it handles pages, routing, and performance so you focus on features.",
    related_terms: ["React", "Vercel", "Tailwind CSS"],
    examples: ["The app uses the Next.js 14 App Router for its pages."],
  },
  {
    id: "react",
    name: "React",
    category: "Tools",
    definition:
      "A JavaScript library for building user interfaces from reusable, state-driven components.",
    use_cases: [
      "Interactive web UIs",
      "Reusable component systems",
      "Single-page applications",
    ],
    explanation:
      "React lets you build UI in pieces (components) that update automatically when data changes — like LEGO bricks for web apps.",
    related_terms: ["Next.js", "Tailwind CSS"],
    examples: ["Each TermCard on the dictionary page is a React component."],
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    category: "Tools",
    definition:
      "A utility-first CSS framework that styles elements with small composable classes directly in markup.",
    use_cases: [
      "Rapid, consistent styling",
      "Responsive design without custom CSS",
      "Design systems via config",
    ],
    explanation:
      "Tailwind styles by stacking tiny classes like text-white and p-4 right on your elements — fast and consistent, no separate CSS files to hunt through.",
    related_terms: ["React", "Next.js"],
    examples: ["The brand navy and gold are defined in tailwind.config.ts."],
  },
  {
    id: "cursor",
    name: "Cursor",
    category: "Tools",
    definition:
      "An AI-native code editor (built on VS Code) by Anysphere that uses Claude or GPT to assist development across your whole project.",
    use_cases: [
      "Professional full-stack development",
      "AI pair-programming in a full IDE",
      "Working in large codebases",
    ],
    explanation:
      "Cursor is VS Code with AI built in — a full editor that understands your entire project and helps you write and edit code in place.",
    related_terms: ["Claude Code", "Codex", "GitHub"],
    examples: ["Cursor Pro is $20/month and supports Claude and GPT models."],
  },
  {
    id: "codex",
    name: "Codex",
    category: "Tools",
    definition:
      "OpenAI's code-focused model offering, available via API, used to power code completion and generation in many tools.",
    use_cases: [
      "Adding coding AI to your own app",
      "Code completion features",
      "Automated code generation",
    ],
    explanation:
      "Codex is the API behind many code-completion tools. You build on top of it rather than using it as a standalone editor.",
    related_terms: ["Claude Code", "Cursor", "API", "GPT"],
    examples: ["A plugin calls Codex to autocomplete functions as you type."],
  },
  {
    id: "gpt",
    name: "GPT",
    category: "Tools",
    definition:
      "OpenAI's series of large language models (GPT-4, GPT-4o) known for speed, web integration, and a large developer ecosystem.",
    use_cases: [
      "Fast general-purpose responses",
      "Consumer-facing products",
      "Real-time integrations",
    ],
    explanation:
      "GPT is a fast generalist that's good at a bit of everything and has lots of tools and integrations available.",
    related_terms: ["LLM", "Codex", "Claude", "Gemini"],
    examples: ["GPT-4o is a strong choice when you need speed and web access."],
  },
  {
    id: "gemini",
    name: "Gemini",
    category: "Tools",
    definition:
      "Google DeepMind's multimodal model family, strong at understanding images and video and integrated with Google's ecosystem.",
    use_cases: [
      "Image and video analysis",
      "Multimodal tasks",
      "Budget-conscious projects",
    ],
    explanation:
      "Gemini is Google's all-rounder, especially good at understanding pictures and video, with competitive pricing.",
    related_terms: ["LLM", "Multimodal", "Claude", "GPT"],
    examples: ["Gemini is a good pick when image understanding is the priority."],
  },
  {
    id: "playwright",
    name: "Playwright",
    category: "Tools",
    definition:
      "A library for automating web browser actions — clicking, typing, scrolling — used for testing and scraping.",
    use_cases: [
      "Automated end-to-end testing",
      "Web scraping",
      "Form-filling automation",
    ],
    explanation:
      "Playwright is a robot that controls your browser. Tell it 'click this' or 'type that' and it does it — great for testing and automation.",
    related_terms: ["Automation", "Web Scraping", "Docker"],
    examples: ["Use Playwright to auto-fill and submit a form on a website."],
  },
  {
    id: "docker",
    name: "Docker",
    category: "Tools",
    definition:
      "A containerization platform that packages an app with all its dependencies so it runs identically anywhere.",
    use_cases: [
      "Consistent deployments",
      "Self-hosting tools like n8n",
      "Isolating services",
    ],
    explanation:
      "Docker is a shipping container for software — put your app inside with everything it needs and it works the same on any machine.",
    related_terms: ["Deployment", "n8n", "GitHub"],
    examples: ["Run a self-hosted n8n instance with a single Docker command."],
  },
  {
    id: "github",
    name: "GitHub",
    category: "Tools",
    definition:
      "A platform for hosting Git repositories: version control, collaboration, and deployment integrations.",
    use_cases: [
      "Storing and versioning code",
      "Team collaboration",
      "Triggering deployments",
    ],
    explanation:
      "GitHub is Google Drive for code — you save it there, track every change, and collaborate with others.",
    related_terms: ["Git", "Vercel", "Deployment"],
    examples: ["Push the Learning Hub to GitHub, then import it into Vercel."],
  },
  {
    id: "git",
    name: "Git",
    category: "Tools",
    definition:
      "A distributed version control system that tracks changes to files and lets multiple people work on the same code safely.",
    use_cases: [
      "Tracking code history",
      "Branching for features",
      "Reverting mistakes",
    ],
    explanation:
      "Git is an undo history for your whole project. Every change is saved, so you can rewind, branch off, and merge work together.",
    related_terms: ["GitHub", "Deployment"],
    examples: ["git commit saves a snapshot of your changes."],
  },
  {
    id: "vector-database",
    name: "Vector Database",
    category: "Tools",
    definition:
      "A database optimized for storing and searching embedding vectors, enabling fast semantic similarity search.",
    use_cases: [
      "Semantic search over documents",
      "Recommendation systems",
      "RAG knowledge bases",
    ],
    explanation:
      "A vector database is a librarian that finds things by meaning, not keywords. Ask for 'books about AI' and it finds them all, even without matching titles.",
    related_terms: ["Embeddings", "Semantic Search", "RAG"],
    examples: ["Store resource embeddings in a vector DB to search by meaning."],
  },
  {
    id: "api",
    name: "API (Application Programming Interface)",
    category: "Tools",
    definition:
      "A defined set of rules that lets different software applications communicate and exchange data.",
    use_cases: [
      "Apps pulling data from a service",
      "Connecting tools together",
      "Calling Claude's API for AI responses",
    ],
    explanation:
      "An API is a translator between apps. App A wants something from App B — they use the API to talk and exchange data.",
    related_terms: ["MCP", "Webhook", "SDK", "Integration"],
    examples: ["Our app uses the OpenWeather API to get the current temperature."],
  },
  {
    id: "sdk",
    name: "SDK (Software Development Kit)",
    category: "Tools",
    definition:
      "A bundle of tools, libraries, and docs that make it easier to build on top of a platform or API in a specific language.",
    use_cases: [
      "Calling an API with less boilerplate",
      "Type-safe access to a service",
      "Faster integration",
    ],
    explanation:
      "An SDK is a starter kit for a service — pre-built helpers so you don't have to wire up raw API calls by hand.",
    related_terms: ["API", "Integration"],
    examples: ["The @supabase/supabase-js SDK wraps Supabase's REST API."],
  },

  // ───────────────────────── AUTOMATION ─────────────────────────
  {
    id: "workflow",
    name: "Workflow",
    category: "Automation",
    definition:
      "A predefined sequence of automated steps that execute in order. Unlike agents, workflows follow a fixed path unless you add conditional logic.",
    use_cases: [
      "Send a daily digest at 9 AM",
      "Save form submissions to a spreadsheet",
      "Notify the team when a new lead arrives",
    ],
    explanation:
      "A workflow is a recipe — you define the exact steps and they run in that order every time. Perfect for routine tasks that never change.",
    related_terms: ["Agent", "Trigger", "Action", "Automation"],
    examples: ["Workflow: email arrives → save attachment → send confirmation."],
  },
  {
    id: "trigger",
    name: "Trigger",
    category: "Automation",
    definition:
      "An event or condition that starts a workflow or automation — the 'when' of an automated process.",
    use_cases: [
      "Email received → save attachment",
      "Form submitted → create CRM lead",
      "Scheduled time → send report",
    ],
    explanation:
      "A trigger is the 'if' in 'if this happens, then do that.' It's whatever kicks off the automation.",
    related_terms: ["Workflow", "Action", "Webhook", "Automation"],
    examples: ["Trigger: 'new email from address' → Action: 'add to spreadsheet.'"],
  },
  {
    id: "action",
    name: "Action",
    category: "Automation",
    definition:
      "A single step an automation performs after being triggered — sending an email, updating a record, calling an API.",
    use_cases: [
      "Send a Slack message",
      "Create a contact",
      "Update a spreadsheet row",
    ],
    explanation:
      "An action is the 'then do that' part. After the trigger fires, actions are the actual things that happen.",
    related_terms: ["Trigger", "Workflow", "Automation"],
    examples: ["Action: create a row in Google Sheets with the form data."],
  },
  {
    id: "automation",
    name: "Automation",
    category: "Automation",
    definition:
      "Using technology to perform tasks automatically without manual intervention, to save time and reduce errors.",
    use_cases: [
      "Routing emails to the right person",
      "Copying form data to a spreadsheet",
      "Auto-generating and sending reports",
    ],
    explanation:
      "Automation is getting computers to do the repetitive work for you — set it up once and forget it.",
    related_terms: ["Workflow", "Agent", "Trigger", "Integration"],
    examples: ["Automate sales: new lead → welcome email → add to CRM → notify team."],
  },
  {
    id: "webhook",
    name: "Webhook",
    category: "Automation",
    definition:
      "A mechanism where one app sends real-time data to another the moment an event happens, instead of being polled.",
    use_cases: [
      "GitHub notifies Slack on a push",
      "Stripe notifies your app on payment",
      "Form submission stored in a database",
    ],
    explanation:
      "A webhook is a doorbell for apps. When something happens, one app rings the other's doorbell to say 'hey, this just happened!'",
    related_terms: ["Trigger", "API", "Integration", "Automation"],
    examples: ["Webhook: new CRM lead → POST to your Slack notifier."],
  },
  {
    id: "integration",
    name: "Integration",
    category: "Automation",
    definition:
      "A connection that lets two or more apps share data or trigger actions in each other.",
    use_cases: [
      "Connecting a CRM to email",
      "Linking forms to spreadsheets",
      "Syncing data between tools",
    ],
    explanation:
      "An integration is a bridge between apps so they can work together instead of living in separate silos.",
    related_terms: ["API", "Webhook", "Automation", "MCP"],
    examples: ["A GHL ↔ Slack integration posts new leads to a channel."],
  },
  {
    id: "conditional-logic",
    name: "Conditional Logic",
    category: "Automation",
    definition:
      "Branching rules (if/then/else) inside an automation that change behavior based on data or conditions.",
    use_cases: [
      "Route VIP leads differently",
      "Skip steps when a field is empty",
      "Send different emails by segment",
    ],
    explanation:
      "Conditional logic lets an automation make simple decisions — 'if the deal is over $1,000, alert the manager; otherwise, just log it.'",
    related_terms: ["Workflow", "Trigger", "Automation"],
    examples: ["If country = US → send US pricing, else → send international pricing."],
  },
  {
    id: "n8n",
    name: "n8n",
    category: "Automation",
    definition:
      "An open-source, self-hostable workflow automation platform with a visual node-based builder and code flexibility.",
    use_cases: [
      "Complex custom workflows",
      "Self-hosted automation",
      "Connecting APIs with custom logic",
    ],
    explanation:
      "n8n is a visual automation builder you can run yourself for free. More powerful and flexible than Zapier, with a steeper learning curve.",
    related_terms: ["Make", "Zapier", "Automation", "Webhook"],
    examples: ["Self-host n8n in Docker to build unlimited workflows."],
  },
  {
    id: "make",
    name: "Make (Integromat)",
    category: "Automation",
    definition:
      "A low-code visual automation platform balancing power and ease, connecting 1000+ apps with a scenario builder.",
    use_cases: [
      "Visual multi-step automations",
      "Mid-complexity integrations",
      "Non-developer automation",
    ],
    explanation:
      "Make sits between Zapier and n8n — more capable than Zapier, friendlier than n8n, with a drag-and-drop scenario canvas.",
    related_terms: ["n8n", "Zapier", "Automation", "Scenario"],
    examples: ["Build a Make scenario that enriches leads across three apps."],
  },
  {
    id: "zapier",
    name: "Zapier",
    category: "Automation",
    definition:
      "The most beginner-friendly no-code automation platform, connecting 7000+ apps via simple trigger-action 'Zaps.'",
    use_cases: [
      "Simple two-app automations",
      "Quick setup with popular apps",
      "Non-technical users",
    ],
    explanation:
      "Zapier is the easiest way to connect apps — pick a trigger, pick an action, done. Great for simple automations and huge app coverage.",
    related_terms: ["Make", "n8n", "Automation", "Webhook"],
    examples: ["Zap: new Typeform response → add row to Google Sheets."],
  },
  {
    id: "scenario",
    name: "Scenario",
    category: "Automation",
    definition:
      "The term Make uses for a single automation — a visual flow of connected modules from trigger to actions.",
    use_cases: [
      "Naming an automation in Make",
      "Organizing multi-step flows",
    ],
    explanation:
      "A scenario is just Make's word for one automation — the same idea as a 'Zap' in Zapier or a 'workflow' in n8n.",
    related_terms: ["Make", "Workflow", "Automation"],
    examples: ["The lead-enrichment scenario runs every 15 minutes."],
  },
  {
    id: "cron-job",
    name: "Cron Job",
    category: "Automation",
    definition:
      "A time-based scheduler that runs a task automatically at fixed intervals or specific times.",
    use_cases: [
      "Nightly database backups",
      "Daily report generation",
      "Periodic data syncs",
    ],
    explanation:
      "A cron job is an alarm clock for tasks — 'run this every day at 9 AM' — so things happen on schedule without you.",
    related_terms: ["Trigger", "Automation", "Workflow"],
    examples: ["A cron job sends the weekly digest every Monday at 8 AM."],
  },
  {
    id: "no-code",
    name: "No-code",
    category: "Automation",
    definition:
      "Building apps or automations through visual interfaces without writing code.",
    use_cases: [
      "Zapier automations",
      "Website builders",
      "Internal tools without engineers",
    ],
    explanation:
      "No-code means building by clicking and configuring instead of programming — fast to start, great for non-developers.",
    related_terms: ["Low-code", "Zapier", "Automation"],
    examples: ["Zapier is a no-code way to connect your apps."],
  },
  {
    id: "low-code",
    name: "Low-code",
    category: "Automation",
    definition:
      "Mostly visual development that still allows custom code where needed for flexibility.",
    use_cases: [
      "Make and n8n workflows",
      "Custom logic in visual flows",
      "Faster delivery with some code",
    ],
    explanation:
      "Low-code is mostly drag-and-drop but lets you drop into code for the tricky parts — a middle ground between no-code and full development.",
    related_terms: ["No-code", "Make", "n8n"],
    examples: ["n8n is low-code: visual nodes plus optional JavaScript steps."],
  },

  // ───────────────────────── GHL-SPECIFIC ─────────────────────────
  {
    id: "ghl-workflow",
    name: "Workflow (GHL)",
    category: "GHL-Specific",
    definition:
      "In GoHighLevel, an automated sequence of marketing and sales actions triggered by contact events.",
    use_cases: [
      "Welcome sequences for new contacts",
      "Lead-nurture sequences",
      "Customer onboarding automation",
    ],
    explanation:
      "A GHL workflow is an automated marketing assembly line: new contact joins → welcome email → follow-up → upsell, all hands-off.",
    related_terms: ["Trigger", "Custom Field", "Campaign", "Automation"],
    examples: ["New contact → SMS welcome → wait 1 day → nurture email."],
  },
  {
    id: "ghl-custom-field",
    name: "Custom Field (GHL)",
    category: "GHL-Specific",
    definition:
      "Additional data fields you create in GHL to store business-specific information on contacts.",
    use_cases: [
      "Track product preferences",
      "Store custom metrics",
      "Segment and personalize",
    ],
    explanation:
      "A custom field is an extra box on a contact's record for data GHL doesn't track by default — like 'preferred service' — that you can use in automations.",
    related_terms: ["Workflow (GHL)", "Smart List", "Custom Value"],
    examples: ["Custom field 'Preferred service' drives which offer they get."],
  },
  {
    id: "ghl-smart-list",
    name: "Smart List (GHL)",
    category: "GHL-Specific",
    definition:
      "A dynamic GHL list that automatically adds or removes contacts based on criteria you define.",
    use_cases: [
      "Auto-segment high-value customers",
      "Build behavior-based audiences",
      "Keep lists current without manual work",
    ],
    explanation:
      "A smart list updates itself. Set the rule once — 'spent $1,000+' — and contacts flow in and out automatically as they qualify.",
    related_terms: ["Custom Field (GHL)", "Workflow (GHL)", "Pipeline"],
    examples: ["Smart list 'High-value customers' = anyone who spent $1,000+."],
  },
  {
    id: "ghl-pipeline",
    name: "Pipeline (GHL)",
    category: "GHL-Specific",
    definition:
      "A visual representation of your sales process in GHL, with stages opportunities move through from lead to close.",
    use_cases: [
      "Tracking deals by stage",
      "Forecasting revenue",
      "Triggering automation on stage change",
    ],
    explanation:
      "A pipeline is a sales board with columns for each stage. You drag deals across as they progress, and automations can fire when a deal moves.",
    related_terms: ["Workflow (GHL)", "Smart List", "Opportunity"],
    examples: ["Pipeline stages: New → Contacted → Proposal → Won/Lost."],
  },
  {
    id: "ghl-trigger-link",
    name: "Trigger Link (GHL)",
    category: "GHL-Specific",
    definition:
      "A special trackable link in GHL that fires an automation when a contact clicks it.",
    use_cases: [
      "Tag contacts by interest on click",
      "Start a workflow from an email link",
      "Track engagement",
    ],
    explanation:
      "A trigger link is a smart link — when someone clicks it, GHL knows and can react: tag them, start a sequence, or move them in a pipeline.",
    related_terms: ["Workflow (GHL)", "Trigger", "Campaign"],
    examples: ["Click 'I'm interested' → tag 'Hot Lead' → start sales workflow."],
  },
  {
    id: "ghl-snapshot",
    name: "Snapshot (GHL)",
    category: "GHL-Specific",
    definition:
      "A reusable template of an entire GHL setup — workflows, pipelines, funnels, fields — that can be loaded into another sub-account.",
    use_cases: [
      "Onboarding new clients fast",
      "Reusing a proven setup",
      "Selling pre-built systems",
    ],
    explanation:
      "A snapshot is a saved blueprint of a whole GHL account. Build once, then deploy the entire system into new accounts in seconds.",
    related_terms: ["Sub-Account", "Workflow (GHL)", "Pipeline"],
    examples: ["Load your agency snapshot into a new client's sub-account."],
  },
  {
    id: "ghl-sub-account",
    name: "Sub-Account (GHL)",
    category: "GHL-Specific",
    definition:
      "An isolated GHL workspace (also called a Location) for a single client or business, managed under an agency account.",
    use_cases: [
      "One workspace per client",
      "Separating data and branding",
      "Agency client management",
    ],
    explanation:
      "A sub-account is one client's private GHL space. Your agency manages many of them from the top, each with its own contacts and automations.",
    related_terms: ["Snapshot", "Workflow (GHL)", "Pipeline"],
    examples: ["Each client gets their own sub-account with a loaded snapshot."],
  },
  {
    id: "ghl-campaign",
    name: "Campaign (GHL)",
    category: "GHL-Specific",
    definition:
      "A sequence of scheduled marketing messages (email/SMS) sent to contacts over time in GHL.",
    use_cases: [
      "Drip nurture sequences",
      "Promotional pushes",
      "Re-engagement series",
    ],
    explanation:
      "A campaign is a planned series of messages that go out on a schedule — a drip of emails and texts that warm up a contact over days or weeks.",
    related_terms: ["Workflow (GHL)", "Trigger Link", "Custom Field (GHL)"],
    examples: ["A 5-email campaign nurtures new leads over their first week."],
  },
  {
    id: "ghl-custom-value",
    name: "Custom Value (GHL)",
    category: "GHL-Specific",
    definition:
      "A reusable variable in GHL (like a business phone or booking link) that can be inserted across messages and updated in one place.",
    use_cases: [
      "Reuse a booking link everywhere",
      "Update business info once",
      "Keep messaging consistent",
    ],
    explanation:
      "A custom value is a saved variable — set your booking link once as a custom value, reference it everywhere, and change it in a single spot later.",
    related_terms: ["Custom Field (GHL)", "Campaign", "Workflow (GHL)"],
    examples: ["{{custom_values.booking_link}} stays correct across all templates."],
  },
];
