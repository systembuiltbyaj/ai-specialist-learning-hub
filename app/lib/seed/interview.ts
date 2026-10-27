import type { InterviewEntry } from "@/app/lib/types";

// Interview answer bank — fill-in templates adapted from the Interview Materials
// kit (document 01). Anything in [square brackets] is a blank for the candidate
// to personalise; the UI highlights it. Keep real names, clients and places out:
// this page is public and shared.
const RAW: Omit<InterviewEntry, "createdAt">[] = [
  {
    "id": "iv-tell-me-about-yourself",
    "topic": "General & Experience",
    "question": "Tell me about yourself?",
    "answer": "Hi, I'm [Your Name], but I prefer to be called [what you like to be called].\n\nI specialize in [your niche, e.g. GoHighLevel, AI automation and business systems]. Essentially, I help [who you serve, e.g. business owners, companies and agencies] build, fix, and improve their systems using tools like [your core tools, e.g. GoHighLevel, n8n and Zapier].\n\nBut before getting into automation, I spent around [number] years in [your previous field, e.g. e-commerce operations], working as [your previous roles, e.g. a Team Leader and Procurement Lead].\n\nSo my background is really a combination of [your previous strength, e.g. business operations] and technical automation. I understand both how businesses operate and how to build systems that make their processes more efficient."
  },
  {
    "id": "iv-your-experience-with-gohighlevel-and-automation",
    "topic": "General & Experience",
    "question": "Can you walk me through your experience with GoHighLevel and automation?",
    "answer": "I started with [your first platform, e.g. GoHighLevel] building [what you first built, e.g. funnels, workflows and simple automations] for businesses. Over time, I became more involved in building complex workflows and complete systems from scratch. That includes [the systems you've built, e.g. capturing leads, automating follow-ups, booking appointments and sending reminders]. I also expanded into [other tools you use, e.g. n8n, Zapier and AI] for more advanced automations. So now my focus isn't just building workflows; it's making sure everything works together and actually helps the business run more efficiently."
  },
  {
    "id": "iv-how-you-approach-a-new-business-process",
    "topic": "General & Experience",
    "question": "Can you walk me through how you approach a new business process?",
    "answer": "I start by understanding how the business works now, from the customer journey to what the team does behind the scenes. Then I find bottlenecks and build the simplest workflow that solves the core problem, test it, and add complexity only if needed."
  },
  {
    "id": "iv-example-of-a-system-or-automation-you-built",
    "topic": "General & Experience",
    "question": "Can you give me an example of a system or automation you've built?",
    "answer": "One example is a project I worked on for [type of business, e.g. a coaching business]. I built [what you built, e.g. an end-to-end automation for their online course] using [platform, e.g. GoHighLevel]. I handled everything from [the scope you owned, e.g. the sales page and lead capture to follow-ups, onboarding and membership access]. So once someone [the trigger event, e.g. bought the course], the system automatically [what happened next, e.g. sent the confirmation and gave them access]. The goal was to reduce manual work and make the whole process smoother for both the business and its customers.",
    "followUps": [
      {
        "question": "That's interesting. What was the biggest challenge you faced while building that automation, and how did you solve it?",
        "answer": "One challenge was [the hardest part, e.g. making sure payment, onboarding and membership access worked together properly]. Since [why it was tricky, e.g. the business had different course offers], I had to make sure [the requirement, e.g. customers got the right access for what they bought]. So I [how you solved it, e.g. set up separate conditions in GoHighLevel, tested each purchase scenario, and checked that the correct emails and access were triggered]. It taught me that building the automation is one thing, but testing end-to-end is just as important."
      },
      {
        "question": "What results did it produce?",
        "answer": "I can explain and demonstrate the workflow behavior. I wouldn't claim a conversion increase unless I had a baseline and measured results to support it."
      }
    ],
    "alternative": {
      "label": "Another example",
      "answer": "One example in my project work is [a second system you built, e.g. a lead-management and booking system]. I [the steps you owned, e.g. mapped the journey, built the landing page and form, connected the CRM and pipeline, and configured email and SMS follow-up]. [A key design decision, e.g. Once a lead booked, the nurture sequence stopped and appointment reminders took over.] The important part was [the principle behind it, e.g. keeping the communication aligned with the lead's actual stage]."
    }
  },
  {
    "id": "iv-what-did-you-build-for-your-previous-client",
    "topic": "General & Experience",
    "question": "What did you build before with your previous client?",
    "answer": "I worked with [type of business, e.g. a coaching business]. I was mainly responsible for their [your area, e.g. backend systems in GoHighLevel]. I handled their [what you handled, e.g. landing pages, funnels, CRM pipelines, automations, calendars and membership courses]. I also worked on [anything else you owned, e.g. tracking and integrations] to make sure everything was connected properly. My role wasn't just building separate workflows. I made sure the whole system worked together, from capturing a lead to [the end goal, e.g. converting them into a paying client or student].",
    "followUps": [
      {
        "question": "How did you make sure all those systems and automations were actually working properly?",
        "answer": "I usually test everything end-to-end using test contacts in [your CRM, e.g. GoHighLevel]. I check if the workflows trigger correctly, if emails and texts go out, and if people move to the right pipeline stage. I also look at the workflow logs for errors. Basically, I make sure it all works before going live."
      }
    ]
  },
  {
    "id": "iv-how-did-you-get-into-ai-automation",
    "topic": "General & Experience",
    "question": "How did you get into AI automation?",
    "answer": "I actually started with [your first platform, e.g. GoHighLevel]. I came across [a course or mentor], enrolled, and got really interested in how automation could solve real business problems. From there, I started exploring tools like [the tools you explored next, e.g. Zapier, n8n and Claude]. And the more projects I built, the more I realized I enjoy turning manual, repetitive tasks into automated systems that make businesses run more efficiently.",
    "followUps": [
      {
        "question": "What was the hardest part of learning automation, and how did you overcome it?",
        "answer": "I think the hardest part was [your hardest part, e.g. learning how different tools work together], especially when something didn't work as expected. But what kept me going was seeing that I could actually build systems that solve real business problems. Whenever I struggled with something new, I kept testing and figuring it out until it worked. And every project I completed made me more confident and pushed me to keep learning."
      }
    ]
  },
  {
    "id": "iv-why-move-from-operations-into-automation",
    "topic": "General & Experience",
    "question": "What made you decide to move from [your previous field, e.g. business operations] into automation?",
    "answer": "After [number] years in [your previous field, e.g. operations], I felt stuck and wanted growth. I discovered [your first platform, e.g. GoHighLevel] and automation through [a course or mentor] and realized I could solve the same [kind of problems, e.g. operational] problems with automation. It let me use my [your previous field] experience in a new way I enjoy."
  },
  {
    "id": "iv-what-makes-you-different-from-other-ghl-ai-specialists",
    "topic": "General & Experience",
    "question": "What makes you different from other GHL/AI Specialists?",
    "answer": "For me, it's process first, automation second. I don't automate something just because I can. I first understand how the business works, identify the bottlenecks, and then build the right solution around them.\n\nFor example, if someone asks for an AI agent for leads, I won't jump straight into building it. I'll check where the leads come from, how they're qualified, and where follow-ups break down. Sometimes the fix isn't more AI. It's having a better process with the right automations behind it.\n\nThat's what sets me apart: solving the actual business problem."
  },
  {
    "id": "iv-how-many-years-in-automation-or-gohighlevel",
    "topic": "General & Experience",
    "question": "How many years have you been in automation or in GoHighLevel?",
    "answer": "I started working with [your main platform, e.g. GoHighLevel] in [when you started, e.g. late 2025], building [what you built, e.g. funnels, workflows, pipelines and complete automation systems].\n\nOver time, I expanded into [other tools, e.g. n8n, Zapier, APIs and webhooks] to build more complex automations and connect different platforms. I also use [your AI tools, e.g. Claude and Codex] to build, troubleshoot, and learn faster.\n\nI'm still learning, of course, but I can already build complex automations, integrate different systems, and troubleshoot issues when things don't work as expected.\n\nFor me, it's not just about years of experience. It's about how quickly you can learn, adapt, solve problems, and deliver results.",
    "tip": "Lead with your experience, not with \"I want to be transparent.\" Starting with the facts sounds more confident."
  },
  {
    "id": "iv-why-choose-you-over-someone-with-more-experience",
    "topic": "General & Experience",
    "question": "You only have around [number] year(s) of automation experience. Why should we choose you over someone with more experience?",
    "answer": "I may not have the most years, but I compete on ownership and output. I map the process, spot failure points, and ship a working fix. If I hit a gap, I say it, get the answers, and move forward. That's the reliability clients get with me."
  },
  {
    "id": "iv-are-you-available-to-work-est-hours",
    "topic": "General & Experience",
    "question": "Are you available to work EST hours?",
    "answer": "Yes, I can cover [the hours you can cover, e.g. EST] when needed and I'll coordinate in advance. I'm flexible, and I'm open to discussing what works best for the team."
  },
  {
    "id": "iv-are-you-currently-working",
    "topic": "General & Experience",
    "question": "Are you currently working?",
    "answer": "At the moment, I'm [your current status, e.g. available]. I'm being intentional about my next role because I'm looking for more than just another project. I want to join a company where I can contribute my automation skills, take ownership of systems, and grow with the team long-term.",
    "followUps": [
      {
        "question": "If we decide to hire you, how soon can you start?",
        "answer": "I can start [your start date, e.g. right away, or within a few days for onboarding]."
      }
    ]
  },
  {
    "id": "iv-do-you-have-clients-right-now",
    "topic": "General & Experience",
    "question": "Do you have clients right now?",
    "answer": "Right now I'm [your current status, e.g. available and looking for a long-term opportunity]. I want to work with a team where I can take ownership of systems, contribute ideas, and help improve the business, not just build automations."
  },
  {
    "id": "iv-what-compensation-are-you-looking-for",
    "topic": "General & Experience",
    "question": "What compensation are you looking for?",
    "answer": "I'm looking at around [your target rate] per month for a [type of role, e.g. full-time] role, depending on the scope. Given my experience in [your strengths, e.g. automation and improving operations], that's a fair starting point. But I'm open to discussing it."
  },
  {
    "id": "iv-our-budget-is-lower-would-you-accept-that",
    "topic": "General & Experience",
    "question": "Our budget is only [a figure below your ask] per month. Would you accept that?",
    "answer": "I'm open to [their figure], but I'd like to understand the full responsibilities first. If we're aligned, I'd also appreciate a performance and compensation review after [number] months, based on the results I deliver."
  },
  {
    "id": "iv-comfortable-with-time-tracking-tools-like-hubstaff",
    "topic": "General & Experience",
    "question": "Are you comfortable using monitoring or time-tracking tools like Hubstaff?",
    "answer": "I'm more comfortable being measured by the quality of my work and the results I deliver. I prefer a setup built on trust and clear accountability. But I'm open to discussing how the team tracks productivity.",
    "followUps": [
      {
        "question": "We require Hubstaff for all team members. Would that be a problem for you?",
        "answer": "Yes, I can work with Hubstaff if that's your standard. I prefer focusing on results, and I'll follow your process as long as expectations are clear."
      }
    ]
  },
  {
    "id": "iv-why-should-we-hire-you",
    "topic": "General & Experience",
    "question": "Why should we hire you?",
    "answer": "I'm not limited to one tool. Give me a problem and a goal, and I'll pick the right approach, whether that's [the tools you use, e.g. GoHighLevel, n8n or Zapier] or a custom solution. I take ownership from build to test, to making sure it works as expected.",
    "followUps": [
      {
        "question": "If we hire you and after two weeks realize one part of the process you built isn't working as expected, what do you do?",
        "answer": "I take ownership. First, I'd check whether it's the workflow, data, or an integration. Once I find the cause, I'll fix it and test the whole flow again. I don't just patch it. I make sure it won't happen again."
      }
    ]
  },
  {
    "id": "iv-what-type-of-businesses-have-you-worked-with",
    "topic": "General & Experience",
    "question": "What type of businesses have you worked with or built projects for?",
    "answer": "Most of my hands-on experience is with [your main client types, e.g. coaching and service-based businesses], where I've built [what you built, e.g. funnels, CRM automations, appointment booking systems and course memberships] using [platform, e.g. GoHighLevel].\n\nI've also worked on automation projects for [other industries, e.g. sales operations and home services] using [tools, e.g. n8n, APIs and AI tools].\n\nSo while I've worked across different industries, my main focus is helping businesses reduce manual work and improve their operations."
  },
  {
    "id": "iv-tell-me-about-a-project-you-are-proud-of",
    "topic": "General & Experience",
    "question": "Can you tell me about a project you're proud of?",
    "answer": "One project I'm proud of was for [type of business, e.g. a coaching business]. I built their system from scratch in [platform, e.g. GoHighLevel], from [the scope, e.g. landing pages and lead capture to CRM follow-ups and course onboarding]. Basically, I connected the whole journey from someone showing interest to [the end goal, e.g. becoming a paying student]. What I'm proud of is that I didn't just build individual workflows. I helped put together a complete system that made things easier to manage.",
    "followUps": [
      {
        "question": "What was the most challenging part of that project, and how did you handle it?",
        "answer": "The hardest part was [the hardest part, e.g. connecting payments, onboarding and membership access], especially since [why it was tricky, e.g. there were different course offers]. I [how you handled it, e.g. set clear conditions in GoHighLevel, tested each scenario end-to-end, and double-checked that the right emails and access were triggered]. It taught me building is one thing, but testing and quality control are just as important."
      }
    ]
  },
  {
    "id": "iv-most-challenging-automation-you-have-built",
    "topic": "General & Experience",
    "question": "What is the most challenging automation you've built?",
    "answer": "The most challenging automation I built was for [type of business, e.g. a coaching business] where I connected [the parts, e.g. lead capture, follow-ups, payments and membership access] in [platform, e.g. GoHighLevel]. The tricky part was [what made it hard, e.g. making sure each course offer triggered the right access and messages], so I [how you solved it, e.g. set clear conditions and tested every path end-to-end]. It pushed me to document and test more rigorously, not just build."
  },
  {
    "id": "iv-what-are-your-strengths-and-weaknesses",
    "topic": "General & Experience",
    "question": "What are your strengths and weaknesses?",
    "answer": "My biggest strength is [your strength, e.g. ownership]. If you give me a problem, I understand it, build a solution, test it, and make sure it works.\n\nOne thing I'm working on is [a real weakness, e.g. explaining technical things quickly when I'm under pressure]. So I've been [what you're doing about it, e.g. practicing simpler, more conversational explanations].",
    "followUps": [
      {
        "question": "What would you want to own in this role?",
        "answer": "I want end-to-end ownership, from discovery to build, testing, and handoff. If something stretches beyond my current experience, I'm upfront about it, align early, and pull in the right support."
      }
    ]
  },
  {
    "id": "iv-how-does-your-operations-background-help",
    "topic": "General & Experience",
    "question": "How does your operations background help you with automation?",
    "answer": "My [your previous field, e.g. operations] background helps because I've done the manual work: [examples, e.g. spreadsheets, KPIs, handoffs and team coordination]. So when I automate, I'm not just thinking about the tools. I'm thinking about making the real work easier and more efficient."
  },
  {
    "id": "iv-what-is-your-goal",
    "topic": "General & Experience",
    "question": "What is your goal?",
    "answer": "My goal is to keep growing as a [the role you're growing into, e.g. GoHighLevel specialist and business systems engineer], while becoming someone the company can rely on.\n\nI want to be trusted with important projects, take ownership, solve problems, and consistently deliver quality results.",
    "followUps": [
      {
        "question": "What steps are you taking right now to move toward that goal?",
        "answer": "I'm doing that by building real projects, expanding beyond [your main platform, e.g. GHL] into [what you're learning, e.g. n8n, APIs, AI and custom development], and getting better at understanding business processes and explaining solutions clearly."
      }
    ]
  },
  {
    "id": "iv-where-do-you-see-yourself-in-2-3-years",
    "topic": "General & Experience",
    "question": "Where do you see yourself in 2–3 years with the company?",
    "answer": "In two to three years, I'd like to [your direction, e.g. lead automation projects, help with technical decisions, and mentor other team members] as the company grows."
  },
  {
    "id": "iv-how-would-you-handle-a-tool-you-have-never-used",
    "topic": "General & Experience",
    "question": "If we gave you a tool you've never used before, how would you handle it?",
    "answer": "I'd be honest that it's new to me. I'd go through the documentation, understand how it works, and test it in a safe environment before using it in a real project. If I get stuck, I'll ask questions rather than waste time guessing."
  },
  {
    "id": "iv-what-if-we-ask-you-something-you-do-not-know",
    "topic": "General & Experience",
    "question": "What if we ask you something you don't know?",
    "answer": "I'd be honest about it. If I have an idea of how it works but haven't actually done it myself, I'll tell you.\n\nAnd if it's something I really don't know, I'll research it, test it, and figure it out rather than pretend I know everything.\n\nFor me, it's okay not to know everything, as long as you're willing to learn and find the right solution."
  },
  {
    "id": "iv-how-do-you-decide-what-should-be-automated",
    "topic": "Business Process & Automation Strategy",
    "question": "How do you decide what should or shouldn't be automated?",
    "answer": "I usually look for three things:\n\nFirst, how often the task happens.\n\nSecond, how much time it takes.\n\nAnd third, whether it follows clear rules.\n\nIf it's repetitive, time-consuming, and predictable, it's a good fit for automation. But if it requires human judgment or important decisions, I keep a person in the loop."
  },
  {
    "id": "iv-what-if-the-client-has-no-clear-process-yet",
    "topic": "Business Process & Automation Strategy",
    "question": "What if the client doesn't have a clear process yet?",
    "answer": "That's actually where I start. I ask how they do it now, what's working, and where it breaks down. Then I help organize the process before automating it."
  },
  {
    "id": "iv-first-thing-you-do-with-a-new-client",
    "topic": "Business Process & Automation Strategy",
    "question": "When a new client comes to you, what's the first thing you do?",
    "answer": "I start by understanding what they want to achieve and how the process works today. I look for where things slow down or get missed, then agree on what to improve first before talking automation."
  },
  {
    "id": "iv-what-if-the-client-is-not-clear-about-their-process",
    "topic": "Business Process & Automation Strategy",
    "question": "What if the client isn't clear about their process?",
    "answer": "If the client isn't clear about the process, I don't make assumptions. I ask questions about how they currently get leads, how they follow up, who handles each step, and where things usually get stuck. Then I map the process with them so we both have a clear picture before building anything."
  },
  {
    "id": "iv-what-if-the-process-is-unclear-after-discovery",
    "topic": "Business Process & Automation Strategy",
    "question": "What if the process is still unclear after discovery?",
    "answer": "I'd start small. I'd identify the biggest pain point, solve that first, and then build from there as we understand the process better. I'd rather improve the system step by step than make assumptions and build the wrong thing."
  },
  {
    "id": "iv-how-do-you-map-a-customer-journey",
    "topic": "Business Process & Automation Strategy",
    "question": "How do you map out a customer journey before building automations?",
    "answer": "I usually map the journey from the first interaction to becoming a paying customer. I look at what happens at each stage, what the customer does, and how the business responds, then spot where automation can help.",
    "followUps": [
      {
        "question": "Can you give a quick example of how you mapped one?",
        "answer": "Sure. For [type of business, e.g. a coaching client], I mapped the path from [the journey stages, e.g. ad click to opt-in, then to booking, purchase and onboarding]. At each step, I checked what the customer did, what the business should do, and where things were dropping off. That showed where [what it revealed, e.g. reminders and onboarding automations] would help."
      }
    ]
  },
  {
    "id": "iv-how-do-you-decide-what-should-remain-manual",
    "topic": "Business Process & Automation Strategy",
    "question": "How do you decide what should remain manual?",
    "answer": "Anything that needs human judgment or important decisions should usually stay manual. I can automate the repetitive parts, but keep a human involved where it actually matters."
  },
  {
    "id": "iv-what-do-you-document-before-building",
    "topic": "Business Process & Automation Strategy",
    "question": "What do you document before building?",
    "answer": "I document the goal, trigger, steps, conditions, ownership, and tools involved. Basically, I want to have a clear picture of how the workflow should work before I start building it."
  },
  {
    "id": "iv-how-do-you-gather-requirements",
    "topic": "Business Process & Automation Strategy",
    "question": "How do you gather requirements before starting a project?",
    "answer": "I start with the goal, current process, pain points, and expected result. Then I map the workflow, tools involved, and different scenarios before I start building anything."
  },
  {
    "id": "iv-how-do-you-decide-which-tools-to-use",
    "topic": "Business Process & Automation Strategy",
    "question": "How do you decide which tools to use for a project?",
    "answer": "It depends on the problem. I first check if we can solve it with the client's existing tools. If not, then I look for the simplest tool that can handle the missing part without making the system complicated."
  },
  {
    "id": "iv-explain-technical-concepts-to-non-technical-clients",
    "topic": "Client Communication & Project Management",
    "question": "How do you explain technical concepts to non-technical clients?",
    "answer": "I avoid technical terms as much as possible and explain it based on what actually happens in the business. I usually walk them through the flow step by step so they understand what goes in, what happens, and what the result is."
  },
  {
    "id": "iv-client-requests-something-that-is-not-the-best-solution",
    "topic": "Client Communication & Project Management",
    "question": "What would you do if a client requested something that wasn't the best solution?",
    "answer": "I'd first understand why they want it, then explain the possible issues and recommend a better option. At the end of the day, it's their decision, but I want them to understand the trade-offs before we build it.",
    "followUps": [
      {
        "question": "What if the request expands the scope?",
        "answer": "I'd explain what it changes in effort, dependencies, and timing, then agree on priorities before adding it to the build."
      }
    ],
    "alternative": {
      "label": "Deeper answer",
      "answer": "I'd first make sure I understand why they want it. Then I'd explain the trade-offs using their business goal and offer a simpler option if there is one. If their choice is feasible and safe, we can agree on it with the consequences understood. I don't need to dismiss their idea to give a clear recommendation."
    }
  },
  {
    "id": "iv-difficult-clients-or-changing-requirements",
    "topic": "Client Communication & Project Management",
    "question": "How do you handle difficult clients or changing requirements?",
    "answer": "I try to keep communication clear and go back to the original goal. If something changes, I explain how it affects the timeline or existing system, then we decide if the change is really needed before implementing it."
  },
  {
    "id": "iv-prioritize-tasks-across-multiple-clients",
    "topic": "Client Communication & Project Management",
    "question": "How do you prioritize tasks when handling multiple clients?",
    "answer": "I prioritize based on urgency, business impact, and deadlines. Anything affecting live systems, leads, or customers comes first, then I work through the remaining tasks based on priority."
  },
  {
    "id": "iv-onboard-a-new-client-into-your-delivery-process",
    "topic": "Client Communication & Project Management",
    "question": "How do you onboard a new client into your own delivery process?",
    "answer": "I start with the business goals and current process, then collect the required access through the proper channels. I document the flow, scope, owners, and acceptance checks before building. I'd also agree on who reviews the work and how changes are handled, so we don't discover different expectations at the end.",
    "followUps": [
      {
        "question": "What does a good handoff include?",
        "answer": "A clear walkthrough, named workflows, configuration notes, tested scenarios, and who handles failures or future changes. The next person should understand why the system works that way."
      }
    ]
  },
  {
    "id": "iv-estimate-delivery-and-handle-delays",
    "topic": "Client Communication & Project Management",
    "question": "How do you estimate delivery and handle delays?",
    "answer": "I break the work into discovery, configuration, integrations, testing, and launch. My estimate depends on the scope and whether access and content are ready. If a blocker appears, I explain what is affected, what I've checked, and the next step. I'd rather give a realistic update early than promise a date I can't support.",
    "followUps": [
      {
        "question": "Two clients have urgent issues. How do you prioritize?",
        "answer": "I compare immediate business impact, severity, deadlines, and dependencies. Then I communicate what I'm handling and when the other client should expect an update."
      }
    ]
  },
  {
    "id": "iv-if-ai-can-build-it-what-value-do-you-bring",
    "topic": "Value Beyond AI",
    "question": "If AI can already build websites, workflows, and automations, what value can you still bring to our business?",
    "answer": "AI can definitely build websites, workflows, and automations, and I use those tools myself to work faster.\n\nBut AI can build what you ask for. The real question is, are you building the right solution?\n\nThat's where I bring value. I understand the business process, identify the actual problem, design the right system, and make sure everything works properly.\n\nSo AI helps me with execution, but the strategy, problem-solving, testing, and accountability are still my responsibility.\n\nYou're not just hiring me to build automations. You're hiring someone who can take ownership and make sure those systems actually help your business.",
    "followUps": [
      {
        "question": "\"But I can just tell Claude what I need, and it will build it for me.\"",
        "answer": "Absolutely, and I actually encourage using Claude for that.\n\nBut the question is, how do you know you're building the right thing?\n\nFor example, Claude can build a lead follow-up automation, but someone still needs to decide when to follow up, when to stop, how to handle errors, and how it fits into your sales process.\n\nThat's where I come in. I understand the business, design the right solution, and make sure everything works properly.\n\n**AI helps me build faster, but my value is making sure we're solving the right problem and getting the results your business actually needs.**"
      }
    ]
  },
  {
    "id": "iv-what-can-you-do-better-than-ai",
    "topic": "Value Beyond AI",
    "question": "What can you do better than AI?",
    "answer": "I wouldn't say I'm better than AI at every technical task. But I understand the business context, work with people, identify problems, and make decisions based on real situations. AI helps me execute, but I take ownership of the outcome."
  },
  {
    "id": "iv-how-do-i-know-you-are-not-just-relying-on-ai",
    "topic": "Value Beyond AI",
    "question": "How do I know you're not just relying on AI to do your work?",
    "answer": "I use AI to work faster, but I don't blindly trust its output. I review the logic, test the workflows, troubleshoot errors, and validate everything before deployment. AI is part of my workflow, but the decisions and responsibility are mine."
  },
  {
    "id": "iv-prove-your-automation-will-benefit-my-business",
    "topic": "Value Beyond AI",
    "question": "How can you prove that your automation will actually benefit my business?",
    "answer": "I start by understanding the problem and measuring the current process. Then I track improvements like response time, conversion rates, or hours saved. I don't just want to show that an automation works. I want to show that it makes a difference."
  },
  {
    "id": "iv-why-pay-you-instead-of-learning-it-myself",
    "topic": "Value Beyond AI",
    "question": "Why should I pay you instead of learning to build these systems myself?",
    "answer": "You absolutely can, and I encourage business owners to understand their systems. But learning, building, testing, and maintaining everything takes time. My value is taking that technical responsibility off your plate so you can focus on growing the business."
  },
  {
    "id": "iv-how-do-you-structure-a-crm-and-pipeline",
    "topic": "GoHighLevel: CRM, Forms & Funnels",
    "question": "How do you structure a CRM and pipeline?",
    "answer": "I first ask how a lead becomes a customer and what decisions happen along the way. Then I define useful stages, an owner, the information needed at each stage, and what moves the opportunity forward. I want the pipeline to help the team decide what to do next, rather than just show a long list of labels.",
    "followUps": [
      {
        "question": "Should every stage change be automated?",
        "answer": "No. A booking is an objective event, but qualification or a proposal decision may need the salesperson’s judgment. I’d agree on that boundary first."
      }
    ]
  },
  {
    "id": "iv-difference-between-a-contact-and-an-opportunity",
    "topic": "GoHighLevel: CRM, Forms & Funnels",
    "question": "What is the difference between a contact and an opportunity?",
    "answer": "The contact is the person’s record. The opportunity represents a potential sale and its progress. That distinction matters if the same customer is interested in different services or buys again. I’d decide how the business wants to track those sales before configuring opportunity creation and update rules.",
    "followUps": [
      {
        "question": "How would you prevent repeated submissions from creating duplicate deals?",
        "answer": "I’d define what counts as the same deal, check the existing opportunity, and decide whether the event should update it or create a genuinely new one. Email alone may not identify the deal."
      }
    ]
  },
  {
    "id": "iv-custom-fields-tags-or-custom-values",
    "topic": "GoHighLevel: CRM, Forms & Funnels",
    "question": "When would you use custom fields, tags, or custom values?",
    "answer": "I use custom fields for structured information the team needs to act on or report on, such as service interest or an agreed qualification answer. Tags can help with grouping or specific workflow signals. Custom values are useful for reusable account-level content such as a business name. I don’t want important reporting data buried in inconsistent notes or hundreds of tags.",
    "followUps": [
      {
        "question": "What if two workflows update the same status?",
        "answer": "I’d check which one should own that change. If both are writing different meanings into one field, I’d fix the responsibility or data structure before adding another condition."
      }
    ]
  },
  {
    "id": "iv-design-a-lead-capture-form",
    "topic": "GoHighLevel: CRM, Forms & Funnels",
    "question": "How would you design a lead-capture form?",
    "answer": "I’d start with the next decision the business needs to make. If the team only needs contact information and service interest to respond, I wouldn’t ask twenty questions upfront. I’d map the answers to the correct fields, preserve the lead source where available, and check what happens after submission, including confirmation, assignment, and follow-up.",
    "followUps": [
      {
        "question": "What about missing or invalid data?",
        "answer": "I’d use required fields where appropriate and validate again before important downstream actions. The system needs a clear path for incomplete records, not a silent failure."
      }
    ]
  },
  {
    "id": "iv-survey-instead-of-a-short-form",
    "topic": "GoHighLevel: CRM, Forms & Funnels",
    "question": "When would you use a survey instead of a short form?",
    "answer": "If qualification needs several questions or a more guided experience, I’d consider a survey. The choice depends on how much information is genuinely needed and how much effort we’re asking from the lead. I’d check the supported conditional behavior in the account rather than assume every question needs to appear for everyone.",
    "followUps": [
      {
        "question": "What if the client wants every field required?",
        "answer": "I’d ask how each answer is used. If it isn’t needed to take the next step, collecting it later may reduce friction without losing useful information."
      }
    ]
  },
  {
    "id": "iv-improve-a-low-converting-funnel",
    "topic": "GoHighLevel: CRM, Forms & Funnels",
    "question": "How would you improve a low-converting funnel?",
    "answer": "I’d check the data first to see where people are dropping off. Then I’d look at the offer, messaging, CTA, page experience, and follow-up instead of changing everything at once.",
    "followUps": [
      {
        "question": "How would you prove an improvement?",
        "answer": "I’d agree on the metric and period first, then compare like-for-like traffic where possible. More bookings after a change is useful evidence, but it doesn’t automatically prove that change caused all of the increase."
      }
    ],
    "alternative": {
      "label": "Deeper answer",
      "answer": "I’d trace where people drop off: the page, the form, the calendar, or the follow-up. Then I’d look at traffic quality, the offer, messaging, mobile experience, and the effort required to book. I wouldn’t assume a redesign is the answer. I’d change a meaningful variable and compare the relevant numbers."
    }
  },
  {
    "id": "iv-approach-to-building-workflows",
    "topic": "GoHighLevel: Workflows, Nurture & Communication",
    "question": "What is your approach to building workflows?",
    "answer": "I map the trigger, required data, conditions, actions, and exit rules before building. Each workflow should have a clear responsibility. If the process is complicated, I break it into understandable stages rather than putting everything into one long sequence. The reason is practical: it becomes easier to test, explain, and maintain."
  },
  {
    "id": "iv-effective-lead-nurturing-system",
    "topic": "GoHighLevel: Workflows, Nurture & Communication",
    "question": "What makes an effective lead nurturing system?",
    "answer": "For me, good lead nurturing is about sending the right message at the right time. It should follow up consistently based on what the lead does, without making it feel like they’re just receiving automated messages.",
    "followUps": [
      {
        "question": "Would you stop every workflow when a lead replies?",
        "answer": "I’d stop or redirect the relevant sales sequence. I wouldn’t assume every workflow should stop, because an internal task or another legitimate process may still be needed."
      }
    ],
    "alternative": {
      "label": "Deeper answer",
      "answer": "Consistent follow-up matters, but the messages also need to match what the lead has done. A reply, booking, purchase, or opt-out should change what happens next. I’d agree on timing and the human handoff with sales so automation helps their conversation instead of competing with it."
    }
  },
  {
    "id": "iv-booked-but-still-gets-book-a-call-messages",
    "topic": "GoHighLevel: Workflows, Nurture & Communication",
    "question": "Someone booked but still gets ‘book a call’ messages. Why?",
    "answer": "I’d check whether the booking event reached the right contact and whether the nurture workflow has the correct exit logic. I’d also look for another workflow sending the same type of message. Once I identify the source, I’d fix that responsibility and test booking, rescheduling, and cancellation with sample contacts.",
    "followUps": [
      {
        "question": "What if the conditions look correct?",
        "answer": "I’d look at the workflow history and the timing of the events. I want to see what actually happened to that contact, not only what the current configuration says should happen."
      }
    ]
  },
  {
    "id": "iv-set-up-appointment-routing",
    "topic": "GoHighLevel: Workflows, Nurture & Communication",
    "question": "How would you set up appointment routing?",
    "answer": "I’d clarify the appointment types, team availability, timezones, and who should handle each booking. Then I’d connect the right calendar, confirmation, reminders, and pipeline updates. I’d also test availability conflicts and calendar connections. A successful booking should create a clear next step for both the customer and the assigned person.",
    "followUps": [
      {
        "question": "What about cancellations and no-shows?",
        "answer": "They need their own agreed behavior. I’d stop obsolete reminders, update the record, and trigger the appropriate rescheduling or follow-up path."
      }
    ]
  },
  {
    "id": "iv-plan-email-and-sms-follow-up",
    "topic": "GoHighLevel: Workflows, Nurture & Communication",
    "question": "How do you plan email and SMS follow-up?",
    "answer": "I start with the purpose of the message and the customer’s stage. SMS may fit a short reminder, while email can carry more detail. I’d confirm consent, opt-outs, sending hours, and the account’s sending setup before launch. Sending through every channel isn’t automatically better if it overwhelms the customer.",
    "followUps": [
      {
        "question": "A workflow says ‘sent,’ but the customer didn’t receive it. What now?",
        "answer": "I’d check delivery status and provider errors, the address or phone data, suppression settings, and sending configuration. The workflow action completing isn’t the same as confirmed inbox delivery."
      }
    ]
  },
  {
    "id": "iv-handle-missed-calls-or-old-leads",
    "topic": "GoHighLevel: Workflows, Nurture & Communication",
    "question": "How would you handle missed calls or old leads?",
    "answer": "For missed calls, I’d define an acknowledgement and an owner for the follow-up, with checks to avoid repeated messages. For old leads, I’d confirm who is eligible, whether contact is permitted, and what makes the outreach relevant. Existing customers, opted-out contacts, and sensitive cases may need exclusions.",
    "followUps": [
      {
        "question": "Would you contact the entire old database at once?",
        "answer": "I’d start with a relevant segment and review the results and delivery health. The goal is useful re-engagement, not simply sending the largest possible batch."
      }
    ]
  },
  {
    "id": "iv-common-mistake-businesses-make-with-gohighlevel",
    "topic": "GoHighLevel: Workflows, Nurture & Communication",
    "question": "What's a common mistake businesses make when using GoHighLevel?",
    "answer": "A common mistake is trying to automate everything and making the system too complicated. GHL can do a lot, but I’d rather build simple workflows that are easy to manage, test, and improve."
  },
  {
    "id": "iv-automations-not-generating-results",
    "topic": "GoHighLevel: Workflows, Nurture & Communication",
    "question": "What would you do if a client said their automations weren't generating results?",
    "answer": "I wouldn’t assume the automation is the problem right away. I’d check the data first, from lead source and conversion rates to follow-ups and where leads are dropping off, then improve the part that’s actually causing the problem.",
    "followUps": [
      {
        "question": "Which metric do you check first?",
        "answer": "I’d start at the stage connected to the reported problem, then trace the earlier steps. A low close rate means something different if most leads never reached a conversation in the first place."
      }
    ],
    "alternative": {
      "label": "Deeper answer",
      "answer": "I’d separate technical operation from business performance. If the workflow is doing what we agreed, I’d look at the rest of the journey: lead quality, response timing, offer, booking rate, attendance, and the sales handoff. I don’t want to add more workflows when the bottleneck may be somewhere else."
    }
  },
  {
    "id": "iv-build-trustworthy-reporting",
    "topic": "GoHighLevel: Reporting, Onboarding & Platform",
    "question": "How would you build trustworthy reporting?",
    "answer": "I’d agree on what each number means before building the dashboard. For example, a won opportunity and collected revenue may be different things. I’d preserve source, owner, dates, and deal information, then reconcile the report with a sample of real records. A neat dashboard isn’t useful if the underlying definitions are inconsistent.",
    "followUps": [
      {
        "question": "Two reports disagree. What do you check?",
        "answer": "The date range, timezone, stage rules, attribution, duplicates, refunds, and source system. I’d compare individual records before assuming one report is wrong."
      }
    ]
  },
  {
    "id": "iv-what-happens-after-a-customer-purchases",
    "topic": "GoHighLevel: Reporting, Onboarding & Platform",
    "question": "What should happen after a customer purchases?",
    "answer": "I’d confirm where payment is verified and what operations needs to begin. Then I’d update the customer or opportunity state, send the appropriate onboarding information, and create the internal tasks. Different services may share some steps but require different forms, access, or owners.",
    "followUps": [
      {
        "question": "What if the payment fails or is refunded?",
        "answer": "Those are separate business events. I’d agree on how they affect access, onboarding, and communication instead of treating every checkout attempt as a successful purchase."
      }
    ]
  },
  {
    "id": "iv-snapshots-for-repeatable-delivery",
    "topic": "GoHighLevel: Reporting, Onboarding & Platform",
    "question": "How would you use snapshots for repeatable delivery?",
    "answer": "For similar client journeys, I’d standardize the reusable setup and use a snapshot to copy the relevant configuration. Then I’d customize the client’s business details, account connections, and operating rules, and test the loaded setup. A snapshot saves setup work; it doesn’t prove the new account is ready to launch.",
    "followUps": [
      {
        "question": "Does it transfer everything?",
        "answer": "No. I’d check the current asset list and exclusions. I wouldn’t expect live contacts, conversation history, or authenticated third-party connections to transfer. Those need separate handling."
      }
    ]
  },
  {
    "id": "iv-how-comfortable-are-you-with-saas-mode",
    "topic": "GoHighLevel: Reporting, Onboarding & Platform",
    "question": "How comfortable are you with SaaS mode?",
    "answer": "I understand the purpose: an agency can package access to HighLevel under its own offer, with plans and account setup around that service. I’d want to inspect how this agency handles billing, provisioning, permissions, and support before changing it. My strongest examples are [your strongest area, e.g. CRM and workflow builds], so I wouldn’t claim [what you haven’t done, e.g. that I’ve operated a large SaaS business].",
    "followUps": [
      {
        "question": "What would you test?",
        "answer": "The subscription-to-account flow, correct access, onboarding, and what happens when a subscription changes or fails. I’d verify the available behavior in that agency’s plan and configuration."
      }
    ]
  },
  {
    "id": "iv-worked-with-ai-calling-and-chatbots",
    "topic": "GoHighLevel: Reporting, Onboarding & Platform",
    "question": "Have you worked with AI calling and chatbots?",
    "answer": "[Your honest level, e.g. I’m developing my AI automation skills], and I’m more confident discussing the surrounding CRM process than claiming experience with every voice platform. I’d first ask what stack you use. Then I’d map eligibility, approved information, allowed actions, outcomes, retries, and the handoff to a person. I’d be specific about what I’ve implemented versus what I would need to validate.",
    "followUps": [
      {
        "question": "Would you let AI negotiate pricing?",
        "answer": "Not without clearly approved rules and limits. Pricing exceptions and sensitive complaints are the kind of decisions I’d route to a human."
      }
    ]
  },
  {
    "id": "iv-stay-updated-with-gohighlevel-and-automation",
    "topic": "GoHighLevel: Reporting, Onboarding & Platform",
    "question": "How do you stay updated with GoHighLevel and automation changes?",
    "answer": "I stay active in [communities you follow, e.g. GoHighLevel and n8n user groups], follow product updates, and keep building and testing new things myself. For me, actually using new features in projects is the best way to learn them."
  },
  {
    "id": "iv-describe-your-n8n-experience",
    "topic": "n8n: Fundamentals & Data",
    "question": "How would you describe your n8n experience?",
    "answer": "I’m [your honest level, e.g. intermediate] in n8n and actively improving through hands-on workflows. My background in [your background, e.g. operations and GoHighLevel] helps me understand the process, the data, and what the business needs from the automation. I’m building more confidence with [an area you’re still growing in, e.g. node behavior and debugging]. For larger production architecture or advanced AI systems, I’d be transparent about what I still need to validate.",
    "followUps": [
      {
        "question": "Are your examples client deployments?",
        "answer": "I’d distinguish project work and learning builds from live client work. I wouldn’t describe a successful practice workflow as a production system with proven business results."
      }
    ]
  },
  {
    "id": "iv-how-do-you-start-a-new-workflow",
    "topic": "n8n: Fundamentals & Data",
    "question": "How do you start a new workflow?",
    "answer": "I map what starts it, what information arrives, the decisions, the destination, and what counts as success. Then I test a small path with fictional data before adding complexity. I want the output to be visible in the client’s working system, such as their CRM or task board, rather than only showing a green execution in n8n.",
    "followUps": [
      {
        "question": "What if the requirements are vague?",
        "answer": "I’d walk through one real example with the client and confirm the expected result. That usually exposes missing rules faster than choosing nodes immediately."
      }
    ]
  },
  {
    "id": "iv-explain-json-and-n8n-items",
    "topic": "n8n: Fundamentals & Data",
    "question": "Explain JSON and n8n items practically.",
    "answer": "JSON is a structured way to represent information with fields and values. In n8n, I inspect whether I have one item containing an array or several separate items, because the next node may behave differently. I also check types. An amount stored as text or a missing ID can cause an incorrect calculation or update even when the field looks familiar.",
    "followUps": [
      {
        "question": "When would you use Split Out or Aggregate?",
        "answer": "Split Out helps turn an array into separate items. Aggregate helps collect items into a grouped structure. I’d choose based on what the next action needs."
      }
    ]
  },
  {
    "id": "iv-use-expressions-safely",
    "topic": "n8n: Fundamentals & Data",
    "question": "How do you use expressions safely?",
    "answer": "I use expressions to map or calculate values from the incoming data. I check the preview and the actual execution input instead of assuming the field is still available. For a current item, I might use $json.customer_id. For earlier data, I need the correct node reference and item relationship. A reference that returns a value isn’t necessarily the correct record.",
    "followUps": [
      {
        "question": "When is using .first() a problem?",
        "answer": "When there are several customers and each needs its own value. It can reuse the first customer for everyone. I’d use the correct item pairing or match by an ID."
      }
    ]
  },
  {
    "id": "iv-file-attachment-disappears-before-email-node",
    "topic": "n8n: Fundamentals & Data",
    "question": "A file attachment disappears before the email node. What do you check?",
    "answer": "I’d inspect the binary data at each step and find where it stops being carried forward. Some nodes return new data rather than preserving everything from the input. I’d restore or join the right file with the right record and verify the attachment field name before sending. I’d also check file size and supported formats.",
    "followUps": [
      {
        "question": "Would you paste the file content into a JSON field?",
        "answer": "Not as a general fix. I’d preserve the file as binary data and use the receiving node’s supported attachment or upload configuration."
      }
    ]
  },
  {
    "id": "iv-choose-between-if-and-switch",
    "topic": "n8n: Fundamentals & Data",
    "question": "How do you choose between IF and Switch?",
    "answer": "I use IF for a clear yes-or-no decision, such as whether required data is present. Switch fits several routes, such as request types or priority levels. I’d include a deliberate fallback for an unknown value so a new status doesn’t silently disappear from the process.",
    "followUps": [
      {
        "question": "What if the value is ‘High’ instead of ‘high’?",
        "answer": "I’d normalize the value at the boundary and compare against an agreed set. I’d avoid scattering different spelling rules across the workflow."
      }
    ]
  },
  {
    "id": "iv-what-can-go-wrong-with-merge",
    "topic": "n8n: Fundamentals & Data",
    "question": "What can go wrong with Merge?",
    "answer": "The mode has to match the purpose. Append collects items from inputs; combining by matching fields joins related records. Joining by position assumes the item order lines up, which can be wrong after filtering. I’d normally look for a stable ID and test missing matches, duplicates, and empty branches.",
    "followUps": [
      {
        "question": "One branch has no records. What then?",
        "answer": "I’d inspect whether it executed and what the node version does with that path. I wouldn’t use a Merge as a universal wait mechanism without testing the empty case."
      }
    ]
  },
  {
    "id": "iv-loop-for-every-list-of-records",
    "topic": "n8n: Fundamentals & Data",
    "question": "Do you need a loop for every list of records?",
    "answer": "No. Many n8n nodes already process incoming items. I’d use Loop Over Items when I need explicit batching or control over repeated work, then check how the loop returns and how the done output is used. If I’m limiting API calls, I also need deliberate pacing; a loop alone doesn’t guarantee that.",
    "followUps": [
      {
        "question": "How do you prevent an endless loop?",
        "answer": "I’d define the stop condition, track progress, and set a sensible limit. I’d test an empty batch and a failed item, not just the normal path."
      }
    ]
  },
  {
    "id": "iv-when-to-use-a-sub-workflow",
    "topic": "n8n: Fundamentals & Data",
    "question": "When would you use a sub-workflow?",
    "answer": "When several workflows need the same clearly defined operation, such as validating a record or preparing a standard notification. I’d define the input and output, document failure behavior, and decide whether the caller needs to wait for the result. [If true for you: I’m still deepening this pattern], so I’d test it with a small caller before reusing it widely.",
    "followUps": [
      {
        "question": "What would you avoid?",
        "answer": "A child workflow that silently depends on fields or state from one specific parent. Reuse is easier when the contract is explicit."
      }
    ]
  },
  {
    "id": "iv-google-sheets-vs-a-database",
    "topic": "n8n: Fundamentals & Data",
    "question": "When is Google Sheets enough, and when do you need a database?",
    "answer": "Sheets can work for a small operational tracker that staff need to inspect and edit. I’d use a stable key for updates and separate a current snapshot from an append-only history. If the process needs strong uniqueness, concurrent writes, relationships, or transactions, I’d consider a proper database. With database queries, I’d validate inputs and use parameters rather than constructing SQL from user text.",
    "followUps": [
      {
        "question": "Does Append or Update guarantee no duplicates?",
        "answer": "No. It depends on a correct matching key and existing data, and concurrent runs can still create problems. I wouldn’t treat it as a database uniqueness constraint."
      }
    ]
  },
  {
    "id": "iv-n8n-or-zapier-instead-of-gohighlevel",
    "topic": "Integrations, APIs & Webhooks",
    "question": "When would you use n8n or Zapier instead of building everything inside GoHighLevel?",
    "answer": "If GHL can handle the process well, I’d rather keep it there. I use n8n or Zapier when I need to connect external tools, handle more custom logic, or process data that GHL isn’t designed for.",
    "followUps": [
      {
        "question": "What if the client specifically asks for AI?",
        "answer": "I’d ask what part needs interpretation or judgment. Moving a confirmed payment into an onboarding workflow doesn’t need AI just because AI is available."
      },
      {
        "question": "What is the trade-off?",
        "answer": "More flexibility also means more responsibility for credentials, failures, monitoring, and maintenance. I’d include those in the decision."
      }
    ],
    "alternative": {
      "label": "Deeper answer: when n8n earns its place",
      "answer": "If GHL can handle the customer journey reliably with native features, I’d keep it there. I’d consider n8n when a process needs external data, more transformation, coordination across several systems, or logic that is awkward in the existing platform.\n\nI’d want a clear reason for adding another platform, because it also creates another place to maintain and troubleshoot. The reason should be a clearer or more capable process, not just because I want to use more nodes."
    }
  },
  {
    "id": "iv-other-technical-tasks-beyond-gohighlevel",
    "topic": "Integrations, APIs & Webhooks",
    "question": "Aside from GoHighLevel, are you comfortable helping with other technical or automation tasks?",
    "answer": "My primary expertise is [your main platform, e.g. GoHighLevel], but I can definitely help outside of it. I can integrate third-party tools using APIs and webhooks through [your integration tools, e.g. n8n or Zapier]. I’m also comfortable using [AI coding tools you actually use, e.g. Claude Code or Codex] to build simple internal tools and software when the business needs something beyond what GHL can do. I may not know every tool right away, but I’m comfortable researching, testing, and figuring things out."
  },
  {
    "id": "iv-system-connecting-multiple-tools",
    "topic": "Integrations, APIs & Webhooks",
    "question": "Can you walk me through a system where you connected multiple tools together?",
    "answer": "One example is [a system you built, e.g. an AI sales call auditor]. When [the trigger, e.g. a sales call transcript comes in], [your orchestrator, e.g. n8n] processes it, [the AI step, e.g. Claude reviews and scores the call], then the results are [where the output goes, e.g. logged in Google Sheets and sent to the team by email]. [Where source files are kept, e.g. Google Drive stores the call transcripts]."
  },
  {
    "id": "iv-comfortable-with-apis-and-webhooks",
    "topic": "Integrations, APIs & Webhooks",
    "question": "How comfortable are you working with APIs and webhooks?",
    "answer": "I’m comfortable working with APIs and webhooks, especially for connecting systems that don’t have a direct integration. I can work with authentication, requests, responses, and mapping the data between platforms."
  },
  {
    "id": "iv-platform-without-a-native-integration",
    "topic": "Integrations, APIs & Webhooks",
    "question": "What do you do if a platform doesn’t have a native integration?",
    "answer": "I check if the platform has an API or webhook available. If it does, I can usually connect it through n8n, Zapier, or a custom API request instead of relying on a native integration."
  },
  {
    "id": "iv-explain-apis-and-webhooks-to-a-client",
    "topic": "Integrations, APIs & Webhooks",
    "question": "Explain APIs and webhooks to a client.",
    "answer": "An API lets one system request or update information in another system. A webhook tells another system that something happened, such as a payment being completed. In a practical flow, the payment event could notify the automation, which then updates the CRM and starts onboarding. I’d check that we can identify the event and avoid processing it twice.",
    "followUps": [
      {
        "question": "What do you check before connecting the systems?",
        "answer": "The supported operation, authentication, permissions, required fields, account scope, limits, and failure behavior. I’d test one record before using live volume."
      }
    ]
  },
  {
    "id": "iv-webhook-in-a-business-workflow",
    "topic": "Integrations, APIs & Webhooks",
    "question": "What is a webhook in a business workflow?",
    "answer": "It’s a way for another system to notify the workflow when an event happens. For example, a payment event can start an onboarding process. I’d check who sent the event, whether the data is valid, and whether we’ve already processed it. Receiving an event doesn’t mean I should immediately trust every field or repeat every action.",
    "followUps": [
      {
        "question": "Why does a test webhook work but the live one doesn’t?",
        "answer": "I’d check the test versus production URL, whether the workflow is published or active for that n8n version, and whether the sender can reach the endpoint. Then I’d inspect the request and response."
      }
    ]
  },
  {
    "id": "iv-configure-an-http-request-node",
    "topic": "Integrations, APIs & Webhooks",
    "question": "How do you configure an HTTP Request node?",
    "answer": "I start with the API documentation and the operation I need. Then I set the method, endpoint, supported credential, parameters or body, and expected response. I’d test one request and inspect the status and returned data before mapping it into the next step. If a native node covers the operation well, I may use that to keep the setup simpler.",
    "followUps": [
      {
        "question": "What if the response only contains some records?",
        "answer": "I’d check pagination and filters. A successful response can still be only the first page, so I’d verify completeness rather than assume the result is the whole dataset."
      }
    ]
  },
  {
    "id": "iv-how-do-you-handle-authentication",
    "topic": "Integrations, APIs & Webhooks",
    "question": "How do you handle authentication?",
    "answer": "I use the method the app supports, such as OAuth or an API credential, and grant only the access needed. I keep secrets in managed credentials rather than expressions or screenshots. I’d also check the account or workspace scope. A connection can be valid but still point at the wrong business account.",
    "followUps": [
      {
        "question": "An API returns 401 or 403. What do you check?",
        "answer": "I’d check authentication and authorization separately: whether the credential is valid, whether access expired, and whether the scopes and account permissions allow that operation. I wouldn’t keep retrying an access problem blindly."
      }
    ]
  },
  {
    "id": "iv-workflow-not-firing-properly",
    "topic": "Workflow Engineering, QA & Reliability",
    "question": "A workflow isn't firing properly. How would you troubleshoot it?",
    "answer": "I start from the trigger and work through the workflow step by step. I check the conditions, contact data, logs, and integrations until I find where the process is breaking, then fix and test it again.",
    "followUps": [
      {
        "question": "Some contacts work and others don’t. What would you compare?",
        "answer": "Their source, fields, tags, timing, enrollment history, and the event they triggered. Comparing one successful record with one failed record is often more useful than changing several settings at once."
      }
    ],
    "alternative": {
      "label": "Deeper answer",
      "answer": "I check whether the contact actually met the trigger conditions. Then I review the relevant filters, workflow settings, contact data, and execution history. I’d trace the event through the system and isolate the first point where the actual behavior differs from the expected flow."
    }
  },
  {
    "id": "iv-errors-across-connected-systems",
    "topic": "Workflow Engineering, QA & Reliability",
    "question": "How do you handle errors when multiple systems are connected together?",
    "answer": "I handle errors at the important connection points. If something fails, the system should log it and either retry, notify someone, or send it for manual review instead of just losing the data.",
    "followUps": [
      {
        "question": "Does ‘continue on error’ solve it?",
        "answer": "Only if I deliberately handle the error output. Otherwise I may hide a failure and let later steps report success when the required action never happened."
      }
    ],
    "alternative": {
      "label": "Deeper answer",
      "answer": "I’d separate invalid input from a temporary service problem and an unexpected failure. Invalid data needs a useful response or review path. A failed execution should produce an actionable alert with a safe record reference. In n8n, I can link an Error Trigger workflow in the workflow settings; I’d test that behavior through an automatic execution."
    }
  },
  {
    "id": "iv-prevent-duplicate-actions",
    "topic": "Workflow Engineering, QA & Reliability",
    "question": "How do you prevent duplicate actions or the same automation running twice?",
    "answer": "Before creating or updating something, I check whether it already exists or has already been processed. I can use things like unique IDs, contact information, tags, or status fields depending on the system.",
    "followUps": [
      {
        "question": "Is an execution ID enough?",
        "answer": "It identifies that run, not the original business request. A resubmission gets a new execution ID, so it doesn’t by itself prevent duplicate tasks or messages."
      }
    ],
    "alternative": {
      "label": "Deeper answer",
      "answer": "I’d identify the event or business record with a stable key and keep a persistent processing record. Before repeating a side effect, I’d check its status or use the destination’s idempotency support. For concurrent events, I’d want an atomic claim or a unique database constraint. A separate lookup followed by create can race if two executions arrive together."
    }
  },
  {
    "id": "iv-human-approval-before-continuing",
    "topic": "Workflow Engineering, QA & Reliability",
    "question": "How do you handle an automation that needs human approval before continuing?",
    "answer": "I’d add a human-in-the-loop step. The automation prepares the information, someone reviews and approves or rejects it, then the workflow continues based on that decision.",
    "followUps": [
      {
        "question": "What if the record changes while approval is pending?",
        "answer": "I’d re-check the current state before executing. Approval of an earlier amount or status shouldn’t silently authorize a different action."
      }
    ],
    "alternative": {
      "label": "Deeper answer",
      "answer": "Before a consequential action such as a refund exception, changing access, or sending sensitive advice. The reviewer should see the proposed action and the supporting context. I’d define who can approve, how long approval is valid, and what happens if nobody responds. Approval should happen before the action, not after it. n8n supports human review for selected agent tools."
    }
  },
  {
    "id": "iv-workflow-from-testing-to-production",
    "topic": "Workflow Engineering, QA & Reliability",
    "question": "How do you take a workflow from testing to production?",
    "answer": "I don’t move it straight into production after one successful test. I test the normal flow, different scenarios, and possible failures first. Then I launch it and closely monitor the first few runs.",
    "followUps": [
      {
        "question": "What if the test data is pinned?",
        "answer": "I’d make sure the final check uses fresh data from the real trigger and intended environment. A successful test using fixed data may hide a problem in the live input."
      }
    ],
    "alternative": {
      "label": "Deeper answer",
      "answer": "I’d test the happy path, invalid input, duplicate delivery, missing records, an unavailable service, and partial success. I also check the actual app output and agree on the acceptance result with the client. Test credentials or fixtures should make it clear when a run could send a real message or change real data."
    }
  },
  {
    "id": "iv-monitor-an-automation-after-go-live",
    "topic": "Workflow Engineering, QA & Reliability",
    "question": "How do you monitor an automation after it goes live?",
    "answer": "I don’t consider the project finished just because it went live. I monitor the workflow, check failures and results, then make adjustments if we find something that didn’t appear during testing."
  },
  {
    "id": "iv-inherit-an-automation-built-by-someone-else",
    "topic": "Workflow Engineering, QA & Reliability",
    "question": "If you inherit an automation built by someone else, how would you approach it?",
    "answer": "First, I’d understand the goal and walk through the workflow from trigger to final action. Then I’d check what’s working, what’s broken, and what can be simplified before touching the existing setup."
  },
  {
    "id": "iv-workflow-too-complex-should-be-separated",
    "topic": "Workflow Engineering, QA & Reliability",
    "question": "How do you know when a workflow is becoming too complex and should be separated?",
    "answer": "If one workflow is trying to handle too many unrelated processes, I’d separate it. Smaller workflows are usually easier to maintain, troubleshoot, and update without affecting everything else."
  },
  {
    "id": "iv-many-overlapping-workflows",
    "topic": "Workflow Engineering, QA & Reliability",
    "question": "An account has many overlapping workflows. What do you do?",
    "answer": "I’d first document what each workflow owns, how it starts, and what depends on it. Then I’d identify duplicate actions and conflicting rules. I wouldn’t disable a group of workflows just because they look similar. I’d make a focused change, test the affected journeys, and keep a way to restore the previous setup.",
    "followUps": [
      {
        "question": "What would you test after cleanup?",
        "answer": "New lead, reply, booking, reschedule, cancellation, purchase, and opt-out where relevant. I’d verify the contact record and actual messages as well as the workflow history."
      }
    ]
  },
  {
    "id": "iv-api-returns-429",
    "topic": "Workflow Engineering, QA & Reliability",
    "question": "An API returns 429. What would you do?",
    "answer": "I’d respect the provider’s limit and Retry-After guidance where available, reduce request pressure, and use a bounded retry with increasing delays. I’d also look at whether several workflows share the same limit. Retrying immediately can make the problem worse. Once the retry limit is reached, the item needs a visible recovery path.",
    "followUps": [
      {
        "question": "Would you retry every error?",
        "answer": "No. A malformed request or denied permission usually needs a fix. I’d classify the error and check whether repeating that particular operation is safe."
      }
    ]
  },
  {
    "id": "iv-tasks-created-but-final-email-failed",
    "topic": "Workflow Engineering, QA & Reliability",
    "question": "Tasks were created, but the final email failed. Do you rerun everything?",
    "answer": "I’d first confirm which actions succeeded. Starting again could create another task batch. I’d prefer to resume or recover only the missing notification using the recorded task IDs. If the system doesn’t support safe recovery yet, I’d make that limitation clear before rerunning anything.",
    "followUps": [
      {
        "question": "The API timed out after create. Is it safe to retry?",
        "answer": "Not automatically. The remote system may have created the record already. I’d look it up using a stable reference or use an idempotency key if the API supports one."
      }
    ]
  },
  {
    "id": "iv-debug-a-workflow-that-stops-unexpectedly",
    "topic": "Workflow Engineering, QA & Reliability",
    "question": "How do you debug a workflow that stops unexpectedly?",
    "answer": "I trace the execution from the last successful step and inspect the next node’s input, output, item count, and error. I compare that with the expected data. I’d check expressions, missing fields, credentials, and branch behavior before changing several things. After the fix, I’d retest the affected path and verify the destination result.",
    "followUps": [
      {
        "question": "What if every node is green?",
        "answer": "I’d check whether the right records reached the destination and whether totals match. A successful execution status doesn’t prove the business result is correct."
      }
    ]
  },
  {
    "id": "iv-what-would-you-log-and-monitor",
    "topic": "Workflow Engineering, QA & Reliability",
    "question": "What would you log and monitor?",
    "answer": "Enough to identify the run, the safe business reference, the step, the outcome, the duration, and whether recovery is needed. I wouldn’t put passwords, tokens, or full customer messages into general logs. For monitoring, I’d watch failures, missing expected runs, processing delays, and business counts, not just server uptime.",
    "followUps": [
      {
        "question": "What about data saved in n8n execution history?",
        "answer": "That can contain sensitive inputs too. I’d review retention, permissions, redaction options, and what we actually need to keep for troubleshooting."
      }
    ]
  },
  {
    "id": "iv-used-claude-or-ai-inside-automations",
    "topic": "AI & Claude",
    "question": "How have you used Claude or AI inside your automations?",
    "answer": "I mainly use [the model you use, e.g. a current Claude model] when a workflow needs to understand or analyze unstructured information, extract key details, and make decisions based on specific criteria."
  },
  {
    "id": "iv-ai-vs-normal-rules-or-conditions",
    "topic": "AI & Claude",
    "question": "When would you use AI instead of normal rules or conditions?",
    "answer": "I don’t use AI for everything. If it’s a simple yes-or-no condition, normal logic is better. AI makes more sense when we need to understand language, context, or information that changes from case to case.",
    "followUps": [
      {
        "question": "What if both approaches could work?",
        "answer": "I’d compare accuracy, cost, speed, and maintenance using real examples. I’d choose the simpler option that meets the requirement."
      }
    ],
    "alternative": {
      "label": "Deeper answer",
      "answer": "When the task needs interpretation, such as understanding a free-text request or summarizing a conversation. If the rule is already clear—payment confirmed, update the CRM, create a task—I’d use deterministic logic. It’s usually easier to test and predict. AI should solve a specific problem in the process, not be added by default."
    }
  },
  {
    "id": "iv-make-ai-output-reliable-in-automation",
    "topic": "AI & Claude",
    "question": "How do you make sure AI output is reliable enough to use in an automation?",
    "answer": "I give the AI clear instructions and a specific output format, then validate the response before using it in the next step. For important decisions, I also keep a human in the loop instead of fully trusting the AI.",
    "followUps": [
      {
        "question": "How would you choose the model?",
        "answer": "I’d test representative cases and compare quality, latency, and cost. I wouldn’t automatically choose the largest model or assume a smaller model is sufficient without checking."
      }
    ],
    "alternative": {
      "label": "Deeper answer",
      "answer": "I’d define the task narrowly, provide the relevant context, and ask for an output shape the workflow can validate. Then I’d check the content against the business rules before taking an action. [If true for you: I’m actively learning this area.] Valid JSON is useful, but it doesn’t prove the answer is correct or that an amount, date, or classification can be trusted."
    }
  },
  {
    "id": "iv-what-is-an-ai-agent-and-when-to-avoid-one",
    "topic": "AI & Claude",
    "question": "What is an AI agent, and when would you avoid one?",
    "answer": "An agent can decide which available tools or steps to use within a task. That can help when the route varies, but it adds uncertainty. If I already know the sequence, I’d usually keep that sequence in the workflow. [If true for you: my agent experience is still developing, so] I’d start with narrow permissions and observable actions rather than a broad autonomous system.",
    "followUps": [
      {
        "question": "What does ‘agentic’ mean in your design?",
        "answer": "I’d explain the actual decisions the model can make, the tools it can call, the stop conditions, and what needs approval. The label matters less than those boundaries."
      }
    ]
  },
  {
    "id": "iv-explain-rag-to-a-client",
    "topic": "AI & Claude",
    "question": "How would you explain RAG to a client?",
    "answer": "It helps the model look up relevant information from approved sources before preparing an answer. For a support process, that might be policies and product documents. It doesn’t automatically make every answer correct. I’d first check whether the information is current, who owns it, and whether document search is actually needed. [Be honest about your depth, e.g. I’m deepening this area rather than claiming an established production RAG deployment.]",
    "followUps": [
      {
        "question": "What would you test technically?",
        "answer": "Document extraction, chunking, retrieval relevance, access filters, source references, updates, and no-answer cases. A good language model can’t fix a retrieval step that supplies the wrong policy."
      }
    ]
  },
  {
    "id": "iv-evaluate-and-secure-an-ai-workflow",
    "topic": "AI & Claude",
    "question": "How would you evaluate and secure an AI workflow?",
    "answer": "I’d test realistic questions, missing information, conflicting documents, and attempts to make the model ignore its rules. I’d measure correctness, unsupported answers, escalation quality, cost, and response time. Tool permissions should enforce boundaries outside the prompt. Retrieved text is data, not authority to change those boundaries.",
    "followUps": [
      {
        "question": "Would you use the model’s confidence score as the only safety check?",
        "answer": "No. I’d use evidence checks, deterministic validation, and human review where the risk calls for it. A confident answer can still be wrong."
      }
    ]
  },
  {
    "id": "iv-custom-solutions-beyond-ghl-n8n-zapier",
    "topic": "Security, Production & Custom Solutions",
    "question": "Can you build custom solutions when GHL, n8n, or Zapier isn’t enough?",
    "answer": "Yes. I normally start with the simplest solution, but I’m not limited to no-code tools. If the project needs custom logic, an API, or a small application, I can build that as part of the system."
  },
  {
    "id": "iv-security-for-client-data-and-credentials",
    "topic": "Security, Production & Custom Solutions",
    "question": "How do you think about security when handling client data, API keys, and credentials?",
    "answer": "My basic rule is to only access and store what the automation actually needs. Credentials should stay in secure credential storage, permissions should be limited, and sensitive data shouldn’t be exposed in logs or unnecessary steps."
  },
  {
    "id": "iv-secure-a-ghl-integration",
    "topic": "Security, Production & Custom Solutions",
    "question": "How would you secure a GHL integration?",
    "answer": "I’d use the supported authorization method for the integration, such as OAuth or a private integration token on the v2 API, and limit access to the operations it needs. I’d confirm which sub-account the connection can access and keep secrets in managed credentials. For incoming events, I’d verify the provider’s supported authentication or signature checks. I also want a clear owner for reconnecting access if it expires or is revoked.",
    "followUps": [
      {
        "question": "Can one connection be used for every client?",
        "answer": "I wouldn’t assume that. I’d follow the platform’s account and authorization model and keep client data isolated. Convenience isn’t a reason to give one client access to another client’s records."
      }
    ]
  },
  {
    "id": "iv-exposed-webhook-safe-enough",
    "topic": "Security, Production & Custom Solutions",
    "question": "What makes an exposed webhook safe enough to use?",
    "answer": "I’d verify the sender using the supported authentication or signature mechanism, validate the payload, limit accepted input, and check authorization before changing a record. I’d also plan duplicate handling and abuse controls. A long or hard-to-guess URL isn’t a replacement for access control when the operation needs it.",
    "followUps": [
      {
        "question": "What about HTML emails built from submitted text?",
        "answer": "I’d escape the text before inserting it into HTML. Validating an email address doesn’t make every other field safe to render."
      }
    ]
  },
  {
    "id": "iv-move-a-local-workflow-into-production",
    "topic": "Security, Production & Custom Solutions",
    "question": "How would you move a local workflow into production?",
    "answer": "I’d confirm reliable hosting, HTTPS, access controls, separate test and live credentials, persistent storage, backup and restore, monitoring, and ownership. I’d check the published trigger configuration and do a controlled live test. [If true for you: I’m still building depth in production operations, so] I’d validate the deployment with the relevant documentation or infrastructure support.",
    "followUps": [
      {
        "question": "Is a Docker container enough?",
        "answer": "It’s one part of deployment. It doesn’t automatically provide durable data, recovery, secure access, or monitoring. Someone still needs to own those responsibilities."
      }
    ]
  },
  {
    "id": "iv-handle-much-higher-volume",
    "topic": "Security, Production & Custom Solutions",
    "question": "How would you handle much higher volume?",
    "answer": "I’d measure where the delay comes from first: API limits, database work, large payloads, or workflow execution. I’d reduce unnecessary work and control concurrency before adding infrastructure. n8n queue mode uses Redis and workers with shared database access, but [if true for you: I haven’t run a large production deployment of it]. I’d validate the topology, credentials, storage, and recovery needs before choosing it.",
    "followUps": [
      {
        "question": "Will more workers solve an API limit?",
        "answer": "No. They may hit it faster. The outgoing request rate still needs control, and the service’s limit remains part of the design."
      }
    ]
  }
];

// createdAt counts down so the list renders in the order above.
export const INTERVIEW_SEED: InterviewEntry[] = RAW.map((entry, i) => ({ ...entry, createdAt: RAW.length - i }));
