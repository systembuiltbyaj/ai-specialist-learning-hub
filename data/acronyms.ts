// AI-world acronym decoder. Source of truth for /acronyms.
// Plain-English meanings written for a beginner-to-intermediate AI builder.

export type AcronymCategory =
  | "AI & ML Core"
  | "Models & Training"
  | "Prompting & Techniques"
  | "Agents & Protocols"
  | "Speech, Vision & Media"
  | "Eval, Safety & Data"
  | "Dev & Infrastructure"
  | "Business & Product"
  | "Automation & Comms";

export interface Acronym {
  acronym: string;
  full: string; // what it stands for
  meaning: string; // plain-English explanation
  icon: string;
  category: AcronymCategory;
}

export const ACRONYM_CATEGORIES: { key: AcronymCategory; icon: string; color: string }[] = [
  { key: "AI & ML Core", icon: "🤖", color: "#7c5cfc" },
  { key: "Models & Training", icon: "🏋️", color: "#ac4bff" },
  { key: "Prompting & Techniques", icon: "✍️", color: "#f6cb1f" },
  { key: "Agents & Protocols", icon: "🔌", color: "#ff8a3d" },
  { key: "Speech, Vision & Media", icon: "🎬", color: "#f472b6" },
  { key: "Eval, Safety & Data", icon: "🛡️", color: "#34d399" },
  { key: "Dev & Infrastructure", icon: "💻", color: "#38bdf8" },
  { key: "Business & Product", icon: "📊", color: "#f6cb1f" },
  { key: "Automation & Comms", icon: "📶", color: "#34d399" },
];

export const ACRONYMS: Acronym[] = [
  // ───────── AI & ML Core ─────────
  { acronym: "AI", full: "Artificial Intelligence", icon: "🤖", category: "AI & ML Core", meaning: "Computer systems that perform tasks normally needing human intelligence — understanding language, recognizing images, and making decisions." },
  { acronym: "ML", full: "Machine Learning", icon: "📈", category: "AI & ML Core", meaning: "A type of AI where systems learn patterns from data instead of being hand-programmed with rules." },
  { acronym: "DL", full: "Deep Learning", icon: "🧠", category: "AI & ML Core", meaning: "A branch of ML using many-layered neural networks to learn complex patterns. It powers modern AI like LLMs and image generation." },
  { acronym: "GenAI", full: "Generative AI", icon: "✨", category: "AI & ML Core", meaning: "AI that creates new content — text, images, audio, video, or code — rather than just classifying or predicting." },
  { acronym: "LLM", full: "Large Language Model", icon: "🤖", category: "AI & ML Core", meaning: "An AI trained on massive amounts of text so it can understand and generate human language. It's the tech behind ChatGPT, Claude, and Gemini." },
  { acronym: "SLM", full: "Small Language Model", icon: "🐣", category: "AI & ML Core", meaning: "A compact language model that runs cheaper and faster — even on a phone or laptop — trading some capability for speed and privacy." },
  { acronym: "LMM", full: "Large Multimodal Model", icon: "🖼️", category: "AI & ML Core", meaning: "A model that handles more than text — images, audio, or video — in one system, like describing a photo you upload." },
  { acronym: "AGI", full: "Artificial General Intelligence", icon: "🌐", category: "AI & ML Core", meaning: "A hypothetical AI that can do any intellectual task a human can, across all domains. It doesn't exist yet." },
  { acronym: "ASI", full: "Artificial Superintelligence", icon: "🚀", category: "AI & ML Core", meaning: "A theoretical AI that surpasses the smartest humans at virtually everything. Still hypothetical." },
  { acronym: "NLP", full: "Natural Language Processing", icon: "💬", category: "AI & ML Core", meaning: "The field of getting computers to understand and work with human language." },
  { acronym: "NLU", full: "Natural Language Understanding", icon: "🧩", category: "AI & ML Core", meaning: "The part of NLP focused on grasping the meaning and intent behind text." },
  { acronym: "NLG", full: "Natural Language Generation", icon: "✍️", category: "AI & ML Core", meaning: "The part of NLP focused on producing human-like text." },
  { acronym: "NN", full: "Neural Network", icon: "🕸️", category: "AI & ML Core", meaning: "A computing system loosely inspired by the brain, made of connected 'neurons' that learn from data." },
  { acronym: "CNN", full: "Convolutional Neural Network", icon: "👁️", category: "AI & ML Core", meaning: "A neural network great at images — it detects edges, shapes, and patterns. Common in computer vision." },
  { acronym: "RNN", full: "Recurrent Neural Network", icon: "🔁", category: "AI & ML Core", meaning: "A neural network for sequences like text or time series that remembers previous steps. Mostly replaced by transformers." },
  { acronym: "GAN", full: "Generative Adversarial Network", icon: "🎭", category: "AI & ML Core", meaning: "Two networks competing — one generates fakes, one detects them — used to create realistic images." },
  { acronym: "GPT", full: "Generative Pre-trained Transformer", icon: "🔡", category: "AI & ML Core", meaning: "The model architecture behind many LLMs — 'pre-trained' on huge text, then used to generate more." },
  { acronym: "MoE", full: "Mixture of Experts", icon: "🧑‍🔬", category: "AI & ML Core", meaning: "A model design that routes each input to a few specialized 'expert' sub-networks, giving big-model quality at lower cost." },
  { acronym: "XAI", full: "Explainable AI", icon: "🔍", category: "AI & ML Core", meaning: "Techniques that make an AI's decisions understandable to humans instead of a black box." },
  { acronym: "ANN", full: "Artificial Neural Network", icon: "🕸️", category: "AI & ML Core", meaning: "The formal name for a neural network — software 'neurons' in layers that learn from examples." },

  // ───────── Models & Training ─────────
  { acronym: "RL", full: "Reinforcement Learning", icon: "🎮", category: "Models & Training", meaning: "Training where an agent learns by trial and error, earning rewards for good actions." },
  { acronym: "RLHF", full: "Reinforcement Learning from Human Feedback", icon: "👍", category: "Models & Training", meaning: "Fine-tuning a model using human ratings of its answers, so it behaves more helpfully and safely." },
  { acronym: "RLAIF", full: "Reinforcement Learning from AI Feedback", icon: "🤝", category: "Models & Training", meaning: "Like RLHF but using AI-generated feedback instead of humans, to scale alignment cheaply." },
  { acronym: "DPO", full: "Direct Preference Optimization", icon: "⚖️", category: "Models & Training", meaning: "A simpler, popular way to align a model toward preferred answers without full reinforcement learning." },
  { acronym: "SFT", full: "Supervised Fine-Tuning", icon: "🎯", category: "Models & Training", meaning: "Training a base model on labeled examples to specialize it for a task, tone, or format." },
  { acronym: "PEFT", full: "Parameter-Efficient Fine-Tuning", icon: "🪶", category: "Models & Training", meaning: "Fine-tuning only a small slice of a model's weights to save time and cost." },
  { acronym: "LoRA", full: "Low-Rank Adaptation", icon: "🔧", category: "Models & Training", meaning: "A popular PEFT method that adds tiny trainable layers instead of retraining the whole model." },
  { acronym: "QLoRA", full: "Quantized Low-Rank Adaptation", icon: "💾", category: "Models & Training", meaning: "LoRA applied to a compressed (quantized) model, so you can fine-tune large models on modest hardware." },
  { acronym: "FLOPs", full: "Floating Point Operations", icon: "➗", category: "Models & Training", meaning: "A measure of how much raw computation a model uses. More FLOPs means more compute — and cost." },
  { acronym: "GPU", full: "Graphics Processing Unit", icon: "🎛️", category: "Models & Training", meaning: "A chip that does many calculations in parallel — the workhorse for training and running AI." },
  { acronym: "TPU", full: "Tensor Processing Unit", icon: "⚡", category: "Models & Training", meaning: "Google's custom AI chip, optimized for the math machine learning relies on." },
  { acronym: "VRAM", full: "Video RAM", icon: "🧮", category: "Models & Training", meaning: "The memory on a GPU. It limits how big a model you can run or fine-tune." },
  { acronym: "KV Cache", full: "Key-Value Cache", icon: "🗄️", category: "Models & Training", meaning: "A speed trick that stores past attention data so a model doesn't recompute it for every new token." },

  // ───────── Prompting & Techniques ─────────
  { acronym: "CoT", full: "Chain of Thought", icon: "🧠", category: "Prompting & Techniques", meaning: "Prompting a model to reason step by step before answering, which improves accuracy on hard problems." },
  { acronym: "ToT", full: "Tree of Thoughts", icon: "🌳", category: "Prompting & Techniques", meaning: "An advanced method where the model explores multiple reasoning paths and picks the best one." },
  { acronym: "ReAct", full: "Reasoning and Acting", icon: "🔁", category: "Prompting & Techniques", meaning: "A pattern where a model alternates thinking and taking actions (like calling tools) to solve a task." },
  { acronym: "ICL", full: "In-Context Learning", icon: "📚", category: "Prompting & Techniques", meaning: "A model learning a task purely from examples in the prompt, with no retraining." },
  { acronym: "RAG", full: "Retrieval-Augmented Generation", icon: "🔎", category: "Prompting & Techniques", meaning: "Giving a model relevant documents at query time so it answers from your data, not just its memory." },
  { acronym: "PE", full: "Prompt Engineering", icon: "🛠️", category: "Prompting & Techniques", meaning: "The craft of writing instructions that reliably get the best output from a model." },

  // ───────── Agents & Protocols ─────────
  { acronym: "MCP", full: "Model Context Protocol", icon: "🔌", category: "Agents & Protocols", meaning: "Anthropic's open standard that lets AI apps connect to tools and data — like a USB-C port for AI." },
  { acronym: "A2A", full: "Agent-to-Agent", icon: "🤝", category: "Agents & Protocols", meaning: "An open protocol that lets separate AI agents discover each other and collaborate on tasks." },
  { acronym: "API", full: "Application Programming Interface", icon: "🔗", category: "Agents & Protocols", meaning: "A defined way for two pieces of software to talk and exchange data — the backbone of every integration." },
  { acronym: "SDK", full: "Software Development Kit", icon: "🧰", category: "Agents & Protocols", meaning: "A bundle of tools and libraries that makes building on a platform (like the Claude API) much easier." },
  { acronym: "CLI", full: "Command Line Interface", icon: "⌨️", category: "Agents & Protocols", meaning: "Controlling software by typing commands instead of clicking — how tools like Claude Code and git work." },
  { acronym: "IDE", full: "Integrated Development Environment", icon: "💻", category: "Agents & Protocols", meaning: "An app for writing code with built-in editor, debugger, and tools — like VS Code or Cursor." },
  { acronym: "HITL", full: "Human in the Loop", icon: "🧍", category: "Agents & Protocols", meaning: "A design where a person reviews or approves an AI's actions before they take effect." },

  // ───────── Speech, Vision & Media ─────────
  { acronym: "CV", full: "Computer Vision", icon: "👁️", category: "Speech, Vision & Media", meaning: "AI that interprets images and video — detecting objects, faces, or text." },
  { acronym: "OCR", full: "Optical Character Recognition", icon: "🔠", category: "Speech, Vision & Media", meaning: "Turning images of text (scans, photos, receipts) into editable, searchable text." },
  { acronym: "TTS", full: "Text-to-Speech", icon: "🔊", category: "Speech, Vision & Media", meaning: "Converting written text into spoken audio — the tech behind AI voices." },
  { acronym: "STT", full: "Speech-to-Text", icon: "🎙️", category: "Speech, Vision & Media", meaning: "Converting spoken audio into written text — used for transcription and voice commands." },
  { acronym: "ASR", full: "Automatic Speech Recognition", icon: "🗣️", category: "Speech, Vision & Media", meaning: "The technology behind speech-to-text — machines transcribing what people say." },
  { acronym: "T2I", full: "Text-to-Image", icon: "🖼️", category: "Speech, Vision & Media", meaning: "Generating images from a text prompt, like Midjourney or DALL·E." },
  { acronym: "T2V", full: "Text-to-Video", icon: "🎬", category: "Speech, Vision & Media", meaning: "Generating video clips from a text prompt." },
  { acronym: "I2V", full: "Image-to-Video", icon: "📹", category: "Speech, Vision & Media", meaning: "Animating a still image into a short video." },

  // ───────── Eval, Safety & Data ─────────
  { acronym: "MMLU", full: "Massive Multitask Language Understanding", icon: "📝", category: "Eval, Safety & Data", meaning: "A popular benchmark testing a model's knowledge across 57 subjects." },
  { acronym: "SWE-bench", full: "Software Engineering Benchmark", icon: "🏆", category: "Eval, Safety & Data", meaning: "A benchmark that tests how well AI fixes real software bugs — a key scoreboard for coding models." },
  { acronym: "HHH", full: "Helpful, Honest, Harmless", icon: "🕊️", category: "Eval, Safety & Data", meaning: "Anthropic's shorthand for how a well-aligned assistant should behave." },
  { acronym: "RAI", full: "Responsible AI", icon: "🛡️", category: "Eval, Safety & Data", meaning: "Practices for building AI that's fair, safe, transparent, and accountable." },
  { acronym: "PII", full: "Personally Identifiable Information", icon: "🔐", category: "Eval, Safety & Data", meaning: "Data that identifies a person (name, email, phone). Handle it carefully and never log it carelessly." },
  { acronym: "AUP", full: "Acceptable Use Policy", icon: "📜", category: "Eval, Safety & Data", meaning: "The rules for what you're allowed to do with a product or API." },
  { acronym: "TOS", full: "Terms of Service", icon: "📄", category: "Eval, Safety & Data", meaning: "The legal agreement that governs how you may use a service." },

  // ───────── Dev & Infrastructure ─────────
  { acronym: "JSON", full: "JavaScript Object Notation", icon: "📄", category: "Dev & Infrastructure", meaning: "A simple text format for structured data — how most APIs and webhooks exchange information." },
  { acronym: "YAML", full: "YAML Ain't Markup Language", icon: "🧾", category: "Dev & Infrastructure", meaning: "A human-friendly format used for configuration files." },
  { acronym: "CSV", full: "Comma-Separated Values", icon: "🔢", category: "Dev & Infrastructure", meaning: "A plain-text table format — rows of values separated by commas. Opens in any spreadsheet." },
  { acronym: "SQL", full: "Structured Query Language", icon: "🗃️", category: "Dev & Infrastructure", meaning: "The language for querying and managing databases." },
  { acronym: "ORM", full: "Object-Relational Mapping", icon: "🔁", category: "Dev & Infrastructure", meaning: "A tool that lets you use a database from code without writing raw SQL (e.g., Prisma)." },
  { acronym: "REST", full: "Representational State Transfer", icon: "📬", category: "Dev & Infrastructure", meaning: "A common style for web APIs using standard HTTP methods like GET and POST." },
  { acronym: "HTTP", full: "HyperText Transfer Protocol", icon: "🌐", category: "Dev & Infrastructure", meaning: "The protocol browsers and apps use to talk to web servers." },
  { acronym: "HTTPS", full: "HyperText Transfer Protocol Secure", icon: "🔒", category: "Dev & Infrastructure", meaning: "HTTP with encryption, so data in transit stays private." },
  { acronym: "URL", full: "Uniform Resource Locator", icon: "🔗", category: "Dev & Infrastructure", meaning: "A web address that points to a page or resource." },
  { acronym: "DNS", full: "Domain Name System", icon: "📖", category: "Dev & Infrastructure", meaning: "The internet's phone book — it turns domain names into the server addresses behind them." },
  { acronym: "CDN", full: "Content Delivery Network", icon: "🌍", category: "Dev & Infrastructure", meaning: "A network of servers that caches your site near users so it loads fast worldwide." },
  { acronym: "CI/CD", full: "Continuous Integration / Continuous Delivery", icon: "🔄", category: "Dev & Infrastructure", meaning: "Automated pipelines that test and ship your code on every change." },
  { acronym: "SaaS", full: "Software as a Service", icon: "☁️", category: "Dev & Infrastructure", meaning: "Software you use over the internet by subscription — like GoHighLevel." },
  { acronym: "PaaS", full: "Platform as a Service", icon: "🏗️", category: "Dev & Infrastructure", meaning: "Cloud platforms that run your app for you, without managing servers (e.g., Vercel, Railway)." },
  { acronym: "IaaS", full: "Infrastructure as a Service", icon: "🖥️", category: "Dev & Infrastructure", meaning: "Renting raw cloud computing — servers and storage — like AWS EC2." },
  { acronym: "ETL", full: "Extract, Transform, Load", icon: "🔀", category: "Dev & Infrastructure", meaning: "The process of pulling data, cleaning it, and loading it into a destination." },
  { acronym: "CRUD", full: "Create, Read, Update, Delete", icon: "🗂️", category: "Dev & Infrastructure", meaning: "The four basic operations on stored data — the core of most apps." },
  { acronym: "UI", full: "User Interface", icon: "🎨", category: "Dev & Infrastructure", meaning: "The visual part of an app that users see and interact with." },
  { acronym: "UX", full: "User Experience", icon: "🧭", category: "Dev & Infrastructure", meaning: "How it feels to use a product — the flow, clarity, and ease." },
  { acronym: "OSS", full: "Open Source Software", icon: "🌍", category: "Dev & Infrastructure", meaning: "Software whose code is public and free to use, modify, and share." },
  { acronym: "DB", full: "Database", icon: "🗄️", category: "Dev & Infrastructure", meaning: "An organized store of data your app reads from and writes to." },

  // ───────── Business & Product ─────────
  { acronym: "MVP", full: "Minimum Viable Product", icon: "🚀", category: "Business & Product", meaning: "The simplest version of a product with only the essential features needed to solve a real problem and gather feedback." },
  { acronym: "POC", full: "Proof of Concept", icon: "🧪", category: "Business & Product", meaning: "A small build that proves an idea is technically possible before investing more." },
  { acronym: "ROI", full: "Return on Investment", icon: "💰", category: "Business & Product", meaning: "How much value you get back compared to what you put in." },
  { acronym: "KPI", full: "Key Performance Indicator", icon: "📊", category: "Business & Product", meaning: "A measurable number that tracks progress toward a goal." },
  { acronym: "GTM", full: "Go-to-Market", icon: "🎯", category: "Business & Product", meaning: "Your plan for launching and selling a product." },
  { acronym: "SLA", full: "Service Level Agreement", icon: "🤝", category: "Business & Product", meaning: "A promise about service quality — like guaranteed uptime or response time." },
  { acronym: "CRM", full: "Customer Relationship Management", icon: "📇", category: "Business & Product", meaning: "Software to manage leads and customers — GoHighLevel is one." },
  { acronym: "SOP", full: "Standard Operating Procedure", icon: "📋", category: "Business & Product", meaning: "A documented step-by-step process for a repeatable task." },
  { acronym: "B2B", full: "Business to Business", icon: "🏢", category: "Business & Product", meaning: "Selling products or services to other companies." },
  { acronym: "B2C", full: "Business to Consumer", icon: "🛍️", category: "Business & Product", meaning: "Selling directly to individual people." },
  { acronym: "R&D", full: "Research and Development", icon: "🔬", category: "Business & Product", meaning: "Work focused on creating new products or improving existing ones." },

  // ───────── Automation & Comms ─────────
  { acronym: "GHL", full: "GoHighLevel", icon: "📶", category: "Automation & Comms", meaning: "An all-in-one CRM and marketing platform built for agencies — your main stack." },
  { acronym: "SMS", full: "Short Message Service", icon: "📱", category: "Automation & Comms", meaning: "Standard text messaging between phones." },
  { acronym: "MMS", full: "Multimedia Messaging Service", icon: "🖼️", category: "Automation & Comms", meaning: "Text messages that include images, audio, or video." },
  { acronym: "A2P", full: "Application-to-Person", icon: "📨", category: "Automation & Comms", meaning: "Business messaging sent from software to people. In the US it requires 10DLC registration." },
  { acronym: "10DLC", full: "10-Digit Long Code", icon: "☎️", category: "Automation & Comms", meaning: "The US standard for registered business texting over normal 10-digit phone numbers." },
  { acronym: "OTP", full: "One-Time Password", icon: "🔑", category: "Automation & Comms", meaning: "A short code sent to verify identity, usually for login or checkout." },
  { acronym: "2FA", full: "Two-Factor Authentication", icon: "🔐", category: "Automation & Comms", meaning: "A second proof of identity beyond your password — like a code from an app." },
  { acronym: "MFA", full: "Multi-Factor Authentication", icon: "🛡️", category: "Automation & Comms", meaning: "Two or more verification steps for stronger account security." },
  { acronym: "OAuth", full: "Open Authorization", icon: "🎟️", category: "Automation & Comms", meaning: "A standard that lets apps access your account without you sharing your password." },
  { acronym: "SSO", full: "Single Sign-On", icon: "🔓", category: "Automation & Comms", meaning: "Logging into many apps with one set of credentials." },
  { acronym: "SPF", full: "Sender Policy Framework", icon: "✉️", category: "Automation & Comms", meaning: "A DNS record listing who's allowed to send email for your domain — helps you avoid spam folders." },
  { acronym: "DKIM", full: "DomainKeys Identified Mail", icon: "🔏", category: "Automation & Comms", meaning: "A digital signature proving an email really came from your domain and wasn't tampered with." },
  { acronym: "DMARC", full: "Domain-based Message Authentication, Reporting & Conformance", icon: "📭", category: "Automation & Comms", meaning: "A policy that tells receivers what to do when an email fails SPF or DKIM checks." },
];
