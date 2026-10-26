import type { LearningPath } from "../../app/lib/content/types";

// Lesson bodies are plain text with blank lines between paragraphs; this keeps
// each paragraph on its own line in source without leaking indentation.
const paragraphs = (...parts: string[]): string => parts.join("\n\n");

const VERIFIED = "2026-10-26";

export const BEGINNER_PATH: LearningPath = {
  id: "beginner",
  level: "Beginner",
  title: "AI foundations for builders",
  summary:
    "What AI models are, how they produce answers, how to prompt them, how to check their work, and how to put one into a small automated workflow with a person still in control.",
  outcomes: [
    "Explain the difference between AI, machine learning, generative AI and LLMs, and say what a model can and cannot do on its own.",
    "Describe tokens, context windows, inference and knowledge cutoffs, and why the same prompt can give different answers.",
    "Write clear prompts with a system prompt, examples and a fixed output format.",
    "Spot likely hallucinations and use grounding and a verification routine sized to the risk.",
    "Choose the right kind of AI tool for a task and build a first no-code AI workflow with a human review step.",
  ],
  lessons: [
    {
      id: "what-ai-actually-is",
      title: "What AI actually is",
      summary:
        "Sort out AI, machine learning, generative AI and large language models, and learn what a model can and cannot do before you build anything on it.",
      minutes: 10,
      sections: [
        {
          heading: "Four terms, one inside the other",
          body: paragraphs(
            "Artificial intelligence is the broad field: software that handles tasks we normally associate with human judgment, such as recognising speech, sorting messages or writing text.",
            "Machine learning is one way to build AI. Instead of writing every rule by hand, you show the system many examples and it learns the patterns. A spam filter or a lead-scoring model is machine learning. It outputs a label or a number, not new content.",
            "Generative AI is machine learning that produces new content: text, images, audio or code. A large language model (LLM) is the generative kind you will use most. It is trained on a very large amount of text and produces text in response to text.",
            "This matters when you evaluate tools. When a vendor says a feature is AI-powered, ask which kind. A scoring model and an LLM fail in different ways and need different checks.",
          ),
        },
        {
          heading: "What an LLM is doing when it answers",
          body: paragraphs(
            "An LLM starts life through pretraining: it reads a huge body of text and learns to predict the next word given everything before it. Anthropic's glossary notes that a model at this stage is not good at answering questions or following instructions. Further training turns it into an assistant that follows instructions.",
            "When you send a prompt, the model generates its reply one small piece at a time, each piece chosen because it fits what came before. It is not looking anything up unless the app around it gives it a search or retrieval tool. It is producing the most fitting continuation based on patterns it learned.",
            "Many current models are also multimodal, meaning they can take images or documents as input as well as text. The core behaviour is the same: input in, generated output out.",
          ),
        },
        {
          heading: "What models are good at",
          body: paragraphs(
            "LLMs are strong at work that involves messy language: summarising a long email thread, drafting a reply, pulling a name and phone number out of a free-text form, classifying a support ticket, rewriting copy for a different audience, or translating.",
            "A realistic business example: a lead fills in a contact form with a rambling paragraph. A model can turn that paragraph into a one-line summary, a service category and an urgency flag that your CRM can store. A rule-based filter would struggle because no two leads phrase things the same way.",
          ),
        },
        {
          heading: "What a model cannot do on its own",
          body: paragraphs(
            "A model has no knowledge of events after its training data ends unless you supply it. It cannot take actions such as sending an email or updating a contact unless it is connected to tools. It can be confidently wrong, and the same prompt can produce different wording each time.",
            "It also does not remember you between separate conversations unless the app stores memory and feeds it back in. And it is the wrong tool for exact, repeatable work like adding up invoice totals or checking whether a date has passed. A formula or a normal automation step does that reliably and for free.",
            "A useful rule from day one: deterministic tasks get deterministic automation. Use a model where the input is unstructured language and some judgment is needed, and check its output where mistakes are costly.",
          ),
        },
      ],
      keyPoints: [
        "AI contains machine learning, which contains generative AI, which includes LLMs.",
        "An LLM generates likely text from learned patterns; it does not look things up unless given a tool.",
        "Models are strong at unstructured language tasks: summarising, drafting, classifying and extracting.",
        "Models lack live knowledge, cannot act without tools and can be confidently wrong.",
        "Use plain rules and formulas for deterministic work; reserve models for judgment on messy input.",
      ],
      termIds: ["llm", "foundation-model", "multimodal", "inference", "hallucination", "knowledge-cutoff"],
      exercise: {
        prompt:
          "Sort five real tasks from your own week into work a model should do, work a rule or formula should do, and work a person must keep, then test one model task.",
        steps: [
          "List five recurring tasks from your work, such as replying to enquiries, updating a spreadsheet or writing a weekly summary.",
          "Label each one: model (messy language, some judgment), rule (exact and repeatable), or person (high stakes or relationship-critical).",
          "Pick one model task and try it in a free chat app with a real but non-sensitive example.",
          "Read the output line by line and mark each statement as correct, wrong or unverifiable.",
        ],
        successCheck:
          "You have a list of five tasks with a label and a one-line reason for each, plus one chat output where every statement is marked correct, wrong or unverifiable.",
      },
      sources: [
        { label: "Anthropic glossary", url: "https://platform.claude.com/docs/en/about-claude/glossary" },
        {
          label: "Anthropic docs: Context windows",
          url: "https://platform.claude.com/docs/en/build-with-claude/context-windows",
        },
      ],
      lastVerified: VERIFIED,
    },
    {
      id: "how-llms-work",
      title: "How LLMs work: tokens, context and variation",
      summary:
        "Learn the handful of mechanics that explain most model behaviour: tokens, the context window, inference, the knowledge cutoff and why answers vary.",
      minutes: 12,
      sections: [
        {
          heading: "Tokens are the unit of everything",
          body: paragraphs(
            "Models do not read whole words. They read tokens: chunks that can be a word, part of a word, a character or bytes. Your input is split into tokens, and the model generates its reply token by token.",
            "Tokens are also how you are billed and limited on APIs. A long prompt with a pasted transcript costs more and runs slower than a short one. Different models split text differently, and Anthropic notes its newer tokenizer produces noticeably more tokens for the same text than older models did, so cost estimates need re-checking when you switch models.",
            "Practical habit: before you automate something that runs thousands of times, measure the token count of a typical input with your provider's token-counting tool rather than guessing.",
          ),
        },
        {
          heading: "The context window is working memory",
          body: paragraphs(
            "The context window is everything the model can consider for one response: your system prompt, the conversation so far, any pasted documents and the reply itself. Anthropic describes it as working memory, separate from the data the model was trained on.",
            "In a chat, every message and reply accumulates in the window. When a conversation gets very long, chat apps may drop or summarise older turns, which is why a model can seem to forget an instruction you gave at the start.",
            "Bigger is not automatically better. Anthropic's docs note that as token count grows, accuracy and recall degrade, which they call context rot. Send the model what it needs for the task, not everything you have.",
          ),
        },
        {
          heading: "Inference and the knowledge cutoff",
          body: paragraphs(
            "Each time a model answers, it is running inference: using its already-trained weights to produce output. Your chat does not retrain the model. If it seems to learn your preferences, that is the app saving notes and adding them back into the context.",
            "Because training data stops at a point in time, every model has a knowledge cutoff. Ask about something after that date and it will either say it does not know, use a search tool if the app provides one, or produce a plausible guess. For anything time-sensitive, such as prices, product versions or regulations, give it the current source or check the answer yourself.",
          ),
        },
        {
          heading: "Why the same prompt gives different answers",
          body: paragraphs(
            "At each step the model scores many possible next tokens and samples one of the likely options rather than always taking the single top choice. Run the same prompt twice and the wording, and sometimes the substance, can differ.",
            "Some APIs expose sampling settings such as temperature to make output more or less varied. On the current Claude API version those sampling parameters have been removed, and you steer behaviour with clearer instructions, examples and a fixed output format instead.",
            "Design for variation rather than fighting it. If a downstream step needs exact values, ask for a fixed format and validate it. If you need consistency across runs, give examples of good output. Never build a workflow that only works when the model phrases things one exact way.",
          ),
        },
      ],
      keyPoints: [
        "Tokens drive cost, speed and limits; measure them on real inputs before scaling.",
        "The context window holds the prompt, history, documents and the reply, and more context can reduce accuracy.",
        "Inference uses fixed weights; chatting does not retrain the model.",
        "The knowledge cutoff means time-sensitive facts must be supplied or checked.",
        "Answers vary because models sample; steer with instructions, examples and validated formats.",
      ],
      termIds: ["token", "context-window", "inference", "knowledge-cutoff", "temperature", "latency"],
      exercise: {
        prompt: "Observe tokens, context limits, the knowledge cutoff and output variation directly in a free chat app.",
        steps: [
          "Open three fresh chats and ask the same open question, such as 'Suggest a subject line for a follow-up email to a lead who went quiet.' Save all three answers.",
          "In a new chat, ask about a news event from the past week and note whether the model says it does not know, searches, or answers anyway.",
          "Paste a long document (several pages), then ask about one specific detail from the middle of it.",
          "Write two sentences on what each test showed.",
        ],
        successCheck:
          "Your notes show at least one visible difference between the three answers, record how the model handled the recent event, and state whether the mid-document detail was answered correctly.",
      },
      sources: [
        { label: "Anthropic glossary", url: "https://platform.claude.com/docs/en/about-claude/glossary" },
        {
          label: "Anthropic docs: Context windows",
          url: "https://platform.claude.com/docs/en/build-with-claude/context-windows",
        },
        { label: "Claude API release notes", url: "https://platform.claude.com/docs/en/release-notes/overview" },
      ],
      lastVerified: VERIFIED,
    },
    {
      id: "prompting-basics",
      title: "Prompting basics",
      summary:
        "Write prompts that work the first time and keep working: clear instructions, a system prompt, a few good examples and a fixed output format.",
      minutes: 14,
      sections: [
        {
          heading: "Be clear and direct",
          body: paragraphs(
            "Anthropic's prompting guide suggests treating the model like a brilliant but new employee who lacks context on your norms. It will not guess your audience, your tone or what a good result looks like unless you say so.",
            "Compare 'Summarise this lead' with 'Summarise this lead in one sentence for a sales rep who will call them today. Include what they want and any deadline they mention. If no deadline is mentioned, say none given.' The second prompt states the reader, the purpose, the content and what to do when information is missing.",
            "If you want more than the bare task, such as a suggested next step, ask for it explicitly. Vague prompts get generic answers.",
          ),
        },
        {
          heading: "System prompts set the standing rules",
          body: paragraphs(
            "A system prompt holds instructions that apply to the whole conversation: the role, the audience, the tone and the rules that never change. In a chat app this is usually called project instructions or custom instructions. In an API call it is a separate system field.",
            "Even one sentence of role helps. 'You are a support triage assistant for a home services company' focuses the model before it sees any ticket. Put stable rules in the system prompt and the changing input, such as the actual ticket, in the user message.",
          ),
        },
        {
          heading: "Show it examples",
          body: paragraphs(
            "Asking with no examples is called zero-shot prompting. Adding a few worked examples is few-shot prompting, and Anthropic calls examples one of the most reliable ways to steer format, tone and structure. Its guide suggests three to five examples for best results.",
            "Good examples mirror your real inputs, cover edge cases such as an angry customer or a message with no useful detail, and vary enough that the model does not copy one surface pattern. Wrap them in tags such as <example> so the model can tell examples from instructions.",
          ),
        },
        {
          heading: "Structure the ask and fix the output",
          body: paragraphs(
            "When a prompt mixes instructions, background and input, separate them with descriptive tags such as <instructions>, <context> and <ticket>. This reduces the chance the model treats your data as instructions or the other way round.",
            "Then fix the output shape. If a person reads it, give headings. If an automation reads it, ask for exact fields and a fixed list of allowed values, and include an option for when the model is unsure. That last option is what stops a confused model from forcing a wrong label.",
          ),
          code: {
            language: "text",
            content: `SYSTEM:
You are a support triage assistant for a home services company.

USER:
<instructions>
Classify the ticket into exactly one category: billing, scheduling, complaint, other.
If you cannot tell, use other.
Reply with two lines only:
category: <one category>
summary: <one sentence, under 25 words>
</instructions>

<examples>
<example>
<ticket>I was charged twice for last Tuesday's visit.</ticket>
category: billing
summary: Customer reports a duplicate charge for last Tuesday's visit.
</example>
<example>
<ticket>Can the plumber come Friday instead of Thursday?</ticket>
category: scheduling
summary: Customer asks to move the plumbing visit from Thursday to Friday.
</example>
</examples>

<ticket>
{{ticket_text}}
</ticket>`,
          },
        },
      ],
      keyPoints: [
        "State the reader, purpose, content and what to do when information is missing.",
        "Put stable rules and role in the system prompt and the changing input in the user message.",
        "Three to five relevant, varied examples are one of the most reliable ways to steer output.",
        "Separate instructions, context and input with descriptive tags.",
        "Fix the output format and include an explicit option for uncertain cases.",
      ],
      termIds: ["prompt-engineering", "system-prompt", "zero-shot", "few-shot", "structured-output"],
      exercise: {
        prompt: "Build a ticket triage prompt, test it zero-shot, then improve it with examples and compare.",
        steps: [
          "Write five short, realistic support tickets, including one vague ticket and one angry one.",
          "In a free chat app, run the prompt from this lesson without the <examples> block against each ticket.",
          "Add the examples block back, plus one example of your own for the vague case, and rerun all five tickets in a fresh chat.",
          "Record the category and format each version produced for every ticket.",
        ],
        successCheck:
          "You have a five-row comparison, and the few-shot version returns exactly two lines in the category/summary format for all five tickets, with the vague ticket labelled other.",
      },
      sources: [
        {
          label: "Anthropic docs: Prompting best practices",
          url: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices",
        },
        {
          label: "Anthropic docs: Prompt engineering overview",
          url: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview",
        },
      ],
      lastVerified: VERIFIED,
    },
    {
      id: "hallucinations-and-verification",
      title: "Hallucinations and how to verify output",
      summary:
        "Understand why models make things up, how grounding reduces it, and how to check output with effort that matches the risk.",
      minutes: 12,
      sections: [
        {
          heading: "Why models make things up",
          body: paragraphs(
            "A model generates the most plausible continuation of your prompt. There is no built-in step that checks whether a statement is true. When it lacks the facts, plausible-sounding text fills the gap, and it sounds just as confident as a correct answer.",
            "Hallucinations cluster in predictable places: specific numbers, dates, names, quotes, citations and links, anything after the knowledge cutoff, and niche details about your own business that the model never saw. Treat a confident tone as zero evidence.",
          ),
        },
        {
          heading: "Grounding: give it the source and limit it to the source",
          body: paragraphs(
            "Grounding means putting trusted source material into the prompt and telling the model to answer only from it. A support assistant given your actual refund policy is far less likely to invent one than a model asked from memory.",
            "Anthropic's guidance adds two simple instructions that make a large difference. First, explicitly allow the model to say it does not know. Second, restrict it to the provided documents rather than its general knowledge. Without permission to say 'not in the document', a model tends to produce an answer anyway.",
            "At scale, retrieval-augmented generation (RAG) does the same thing automatically: it finds the relevant passages from your documents and grounds each answer in them.",
          ),
          code: {
            language: "text",
            content: `<policy>
{{paste the refund policy here}}
</policy>

Answer the customer's question using only the policy above.
First, copy the exact sentence(s) from the policy that support your answer.
Then give the answer in plain language.
If the policy does not cover the question, reply exactly:
"The policy does not cover this. A team member will follow up."

Question: {{customer_question}}`,
          },
        },
        {
          heading: "Make the output checkable",
          body: paragraphs(
            "Ask for evidence alongside the answer. For long documents, Anthropic suggests having the model extract word-for-word quotes first and base its answer on those. For drafts, ask it to cite a supporting quote for each claim and to remove any claim it cannot support.",
            "Another cheap check is to run the same prompt several times and compare. If the answers disagree on a fact, that fact needs checking. Consistent answers are not proof, but inconsistent ones are a warning.",
          ),
        },
        {
          heading: "Verify in proportion to the risk",
          body: paragraphs(
            "Anthropic is clear that these techniques reduce hallucinations but do not eliminate them, so critical information still needs validating. Match the effort to what breaks if the output is wrong.",
            "An internal meeting summary needs a skim. A customer-facing reply needs a person to read it before it sends. Anything with money, legal terms, health or contracts needs a person to check every number, name, date, quote and link against the source, and to open every URL.",
            "Do maths in a spreadsheet or code, not in the model. If a workflow will make decisions without a person, start with full human review, measure how often the model is wrong, and only reduce review once you have the numbers.",
          ),
        },
      ],
      keyPoints: [
        "Models have no truth check, so missing facts get filled with plausible text.",
        "Hallucinations cluster around numbers, names, dates, citations, links and recent events.",
        "Ground answers in supplied sources and explicitly allow 'I don't know'.",
        "Ask for supporting quotes so output can be checked against the source.",
        "Size verification to the risk and keep a person on anything customer-facing or high-stakes.",
      ],
      termIds: ["hallucination", "grounding", "rag", "knowledge-cutoff", "human-in-the-loop"],
      exercise: {
        prompt: "Compare an ungrounded and a grounded answer on the same questions about a real document.",
        steps: [
          "Pick a one- or two-page policy or FAQ you can share safely, such as a public returns policy.",
          "Write five questions: three the document answers and two it does not.",
          "In a fresh chat, ask all five questions without pasting the document and save the answers.",
          "In another fresh chat, use the grounded template from this lesson with the document pasted in and ask the same five questions.",
          "Use your browser's find function to confirm each quoted sentence appears in the document.",
        ],
        successCheck:
          "The grounded run returns the fixed 'policy does not cover this' reply for both unanswerable questions, and every quote in the other three answers is found word for word in the document.",
      },
      sources: [
        {
          label: "Anthropic docs: Reduce hallucinations",
          url: "https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations",
        },
        {
          label: "Anthropic docs: Prompting best practices",
          url: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices",
        },
      ],
      lastVerified: VERIFIED,
    },
    {
      id: "choosing-ai-tools",
      title: "Choosing AI tools",
      summary:
        "Tell chat apps, APIs, coding agents and automation platforms apart, understand closed versus open-weight models, and pick the right starting point for a task.",
      minutes: 12,
      sections: [
        {
          heading: "Four kinds of AI tool",
          body: paragraphs(
            "Chat apps such as Claude, ChatGPT and Gemini are where a person works with a model directly. A human starts every task and reads every answer, which makes them ideal for drafting, analysis and testing whether a task suits AI at all.",
            "APIs let your own code send prompts and receive responses. Nothing happens unless a program calls it, but you control the input, output format, logging and cost. Coding agents such as Claude Code go further: Anthropic describes Claude Code as an agentic coding tool that reads your codebase, edits files and runs commands.",
            "Automation platforms such as n8n, Zapier, Make and GoHighLevel workflows connect a trigger, like a new form submission, to a chain of actions. Most now include an AI step, so you can add a model without writing an application.",
          ),
        },
        {
          heading: "How to choose",
          body: paragraphs(
            "Ask who starts the work. If a person starts it each time and reads the result, a chat app is usually enough. If an event should start it automatically, such as a new lead or a new ticket, you need an automation platform or an API.",
            "Then ask about volume, where the data lives and how custom the logic is. A few tasks a week with simple steps fit a no-code platform. Thousands of runs, complex branching or a custom user interface point toward code calling an API.",
            "A sensible path for most business tasks: prove the prompt in a chat app, move it into an automation platform once the steps are stable, and move to custom code only when the platform becomes the bottleneck.",
          ),
        },
        {
          heading: "Closed versus open-weight models",
          body: paragraphs(
            "A closed model is one you can only use through the vendor's app or API. The vendor hosts it, updates it and sets the price. An open-weight model publishes its trained weights so you can download, run and fine-tune it yourself.",
            "Licences vary by release, so read the model card. Google's Gemma 4 models, for example, are published under Apache 2.0, while other families use their own community licences with extra conditions. Open weights usually do not include the training data or code.",
            "Running open weights gives you control over where data goes and can lower cost at high volume, but you take on hosting, scaling, security patches and upgrades. For most first projects, a hosted model through an API or platform is the faster and safer choice.",
          ),
        },
        {
          heading: "Practical defaults",
          body: paragraphs(
            "Match the model to the job. Classification and extraction usually work on a fast, low-cost model. Complex reasoning, long documents and agent work justify your provider's current flagship. Test both on real examples rather than assuming.",
            "Before you paste client or customer data anywhere, check the tool's data and retention terms and your agreement with the client. Workplace and API plans often have different data handling from free consumer plans.",
          ),
        },
      ],
      keyPoints: [
        "Chat apps suit person-started work; APIs and automation platforms suit event-started work.",
        "Coding agents read code, edit files and run commands, so they need the same care as a developer with access.",
        "Prove a task in chat, automate it on a platform, and move to code only when the platform limits you.",
        "Open-weight licences vary by release; read the model card before you rely on one.",
        "Pick a fast, low-cost model for simple tasks and a flagship for complex ones, and test both.",
      ],
      termIds: ["closed-source-model", "open-source-model", "api", "claude-code", "workflow-automation", "no-code-low-code"],
      exercise: {
        prompt: "Make a tool decision for one recurring task and check a real open-weight licence.",
        steps: [
          "Pick one recurring task, such as summarising new leads or drafting weekly client updates.",
          "Write down who starts it, how often it happens, where the data lives and what breaks if the output is wrong.",
          "Choose a tool category (chat app, automation platform, API or coding agent) and write two reasons.",
          "Open the Gemma 4 model card on Hugging Face and find the licence it is published under.",
        ],
        successCheck:
          "You have a short decision note that names one tool category with two reasons tied to your answers, and the licence name copied from the Gemma 4 model card.",
      },
      sources: [
        { label: "Claude Code overview", url: "https://code.claude.com/docs/en/overview" },
        { label: "Hugging Face: google/gemma-4-31B-it model card", url: "https://huggingface.co/google/gemma-4-31B-it" },
        { label: "n8n docs: Hosting n8n", url: "https://docs.n8n.io/hosting/" },
      ],
      lastVerified: VERIFIED,
    },
    {
      id: "your-first-ai-workflow",
      title: "Your first AI workflow",
      summary:
        "Build a no-code flow from a trigger to an AI step to an action, with a human review step so nothing reaches a customer unchecked.",
      minutes: 18,
      sections: [
        {
          heading: "The shape of every AI workflow",
          body: paragraphs(
            "Almost every useful AI automation follows the same shape: a trigger starts it, an AI step interprets or drafts, a review step lets a person check, and an action does something in the real world.",
            "A concrete example: a customer submits a support form (trigger). A model labels the message and drafts a reply (AI step). The draft lands in a review queue where a team member approves or edits it (review). Only then is the reply sent and the CRM record updated (action).",
            "Build the review step in from the start. It is far easier to remove a review step once you trust the output than to explain to a client why the system emailed a customer something wrong.",
          ),
        },
        {
          heading: "Pick a platform you can finish on",
          body: paragraphs(
            "n8n offers a Cloud free trial with no credit card and a free self-hosted community edition. Its AI Agent node needs at least one tool connected, so for a simple single-prompt step use the Basic LLM Chain node instead. Make has a free plan billed in credits, and its built-in AI features can use more than one credit.",
            "Zapier's free plan is limited to two-step Zaps, so a trigger, AI step, review and action flow needs a paid plan or trial. Its AI by Zapier step can require approval before running, set per tool. If your leads already live in GoHighLevel, its workflows are the natural home for anything that touches contacts, pipelines or messages.",
            "For the AI step you need model access. Use your platform's built-in AI step if it has one, or create a key on a provider's free tier, such as the Gemini API's free tier in Google AI Studio.",
          ),
        },
        {
          heading: "Design the AI step",
          body: paragraphs(
            "Send only the fields the model needs, usually the message text and maybe the customer's first name. Do not send full CRM records or payment details.",
            "Use a fixed list of categories with an explicit 'other' option, and ask for output in labelled lines or JSON so the next step can map each field. The prompt from the prompting lesson works here almost unchanged.",
          ),
          code: {
            language: "text",
            content: `Prompt in the AI step:
Classify this support message as billing, scheduling, complaint or other.
Then draft a short, polite reply. Do not promise refunds, dates or prices.
Reply in exactly this format:
category: <category>
draft: <reply>

Message: {{form.message}}

Mapped into the review sheet:
timestamp | customer_email | message | category | draft | status=pending`,
          },
        },
        {
          heading: "Add the human review step",
          body: paragraphs(
            "The simplest review queue is a spreadsheet tab: the workflow appends a row with the draft and a status of pending. A person reads it, edits the draft if needed and changes the status to approved. A second workflow, or a later step, only sends rows marked approved.",
            "Other good queues are a Slack message with approve and reject buttons, or a task in your CRM assigned to an owner. Whatever you choose, someone must own the queue and check it on a schedule, or drafts pile up and customers wait.",
            "What breaks if you skip it: a model that misreads sarcasm, invents a policy or promises a refund will do so directly to a customer, at the speed of automation.",
          ),
        },
        {
          heading: "Test with ugly inputs and watch the runs",
          body: paragraphs(
            "Test with at least five realistic messages, including an empty message, a very long one, an angry one and one in another language. Each platform keeps a run history (Executions in n8n, run history in Make, Zap History in Zapier). Open each run and confirm what went in and what came out.",
            "Decide what happens on failure before you go live. n8n lets you assign an error workflow that starts with an Error Trigger node and can send you an alert. A failed AI call should alert a person, not silently drop a customer's message.",
          ),
        },
      ],
      keyPoints: [
        "Trigger, AI step, human review, action is the shape of most useful AI automations.",
        "Choose a platform whose free tier supports enough steps to finish the flow.",
        "Send the model only the fields it needs and ask for a fixed, mappable format.",
        "A review queue needs an owner and a check schedule, or drafts pile up.",
        "Test with messy inputs, read the run history and set up failure alerts before going live.",
      ],
      termIds: ["trigger", "action", "workflow-automation", "human-in-the-loop", "n8n", "make", "zapier", "no-code-low-code"],
      exercise: {
        prompt:
          "Build a support-triage workflow on a free tier that drafts replies into a review sheet and sends nothing on its own.",
        steps: [
          "Create a Google Sheet with two tabs: Inbox (timestamp, email, message) and Review (timestamp, email, message, category, draft, status).",
          "In an n8n Cloud trial or a Make free account, create a workflow triggered by a new row in the Inbox tab.",
          "Add an AI step using the platform's built-in AI or a free-tier model key, with the prompt from this lesson.",
          "Add a step that appends a row to the Review tab with the category, the draft and status set to pending.",
          "Add three test rows to Inbox, including one angry message, and let the workflow run.",
        ],
        successCheck:
          "The Review tab shows three new rows, each with a category from the allowed list, a draft reply and the status pending, and no email or message was sent to anyone.",
      },
      sources: [
        { label: "n8n pricing", url: "https://n8n.io/pricing/" },
        { label: "Zapier pricing", url: "https://zapier.com/pricing" },
        { label: "n8n docs: Error handling", url: "https://docs.n8n.io/flow-logic/error-handling/" },
        { label: "n8n docs: Basic LLM Chain node", url: "https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.chainllm/" },
      ],
      lastVerified: VERIFIED,
    },
  ],
};
