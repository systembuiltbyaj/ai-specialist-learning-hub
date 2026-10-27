import type { InterviewGuide } from "@/app/lib/types";

// Interview guides adapted from the Interview Materials kit (documents 02-05):
// how to lead a discovery call, the call prompts, conversational phrases, and
// lessons from real calls. Generated from the kit's source — edit content here.
export const INTERVIEW_GUIDES: InterviewGuide[] = [
  {
    "id": "discovery",
    "title": "Discovery & Consultation Guide",
    "subtitle": "How to lead a discovery call: understand the business, find the bottleneck, then recommend the system.",
    "cover": [
      "Lead the conversation, then design.",
      "Follow the client’s story. Ask one useful question, listen, then go one level deeper. Summarize the process back before recommending anything.",
      "Section 1 is the one-page sheet to glance at during a live call. The rest explains each step in depth."
    ],
    "sections": [
      {
        "title": "Live-Call Sheet",
        "intro": [
          "Glance at this during a call.",
          "Pick the next question from what the client just said; you don’t need every line. Step numbers point to the deeper guidance in this document."
        ],
        "blocks": [],
        "items": [
          {
            "heading": "Process (steps 2.1–2.2)",
            "blocks": [
              {
                "kind": "bullet",
                "text": "“Walk me through the process from lead to fulfillment.”"
              },
              {
                "kind": "bullet",
                "text": "“Who handles each step?”"
              },
              {
                "kind": "bullet",
                "text": "“What triggers the next step?”"
              },
              {
                "kind": "bullet",
                "text": "“Can you show me how you do it now?”"
              }
            ]
          },
          {
            "heading": "Pain points (steps 3.1, 4.2)",
            "blocks": [
              {
                "kind": "bullet",
                "text": "“Which tasks are manual or repetitive?”"
              },
              {
                "kind": "bullet",
                "text": "“Where do mistakes or delays happen?”"
              },
              {
                "kind": "bullet",
                "text": "“Where do things fall through the cracks?”"
              },
              {
                "kind": "bullet",
                "text": "“What are the common exceptions?”"
              }
            ]
          },
          {
            "heading": "Outcome (steps 6.2, 7.3)",
            "blocks": [
              {
                "kind": "bullet",
                "text": "“If we fixed one thing first, what would it be?”"
              },
              {
                "kind": "bullet",
                "text": "“What does success look like?”"
              },
              {
                "kind": "bullet",
                "text": "“Is it saving time, reducing errors, adding capacity, or faster response?”"
              },
              {
                "kind": "bullet",
                "text": "“How much time and how many people are involved now?”"
              }
            ]
          },
          {
            "heading": "Technical (steps 3.2, 5.1–6.1, 8.2)",
            "blocks": [
              {
                "kind": "bullet",
                "text": "“What tools do you use, and which is the source of truth?”"
              },
              {
                "kind": "bullet",
                "text": "“Any existing automations or integrations?”"
              },
              {
                "kind": "bullet",
                "text": "“Any security or compliance requirements?”"
              },
              {
                "kind": "bullet",
                "text": "“Who will use and maintain it?”"
              },
              {
                "kind": "bullet",
                "text": "“Which steps need human approval?”"
              }
            ]
          },
          {
            "heading": "Project (steps 8.1, 8.3)",
            "blocks": [
              {
                "kind": "bullet",
                "text": "“What’s the target timeline?”"
              },
              {
                "kind": "bullet",
                "text": "“Who makes the final decision, and who else is involved?”"
              },
              {
                "kind": "bullet",
                "text": "“What range were you planning for this phase?”"
              },
              {
                "kind": "bullet",
                "text": "“Do you need ongoing support?”"
              }
            ]
          },
          {
            "heading": "Before you hang up",
            "blocks": [
              {
                "kind": "tip",
                "label": "Close the loop",
                "text": "Summarize the main problem and confirm it. Say what you will send and when. Confirm who needs to see the proposal."
              }
            ]
          }
        ]
      },
      {
        "title": "Understand the Business and the Process",
        "intro": [
          "The call flow: understand → map → find the bottleneck → identify data → clarify rules → explore exceptions → choose automation → test the need for AI → define approval → plan failures → define KPIs → recommend → explain value.",
          "Use these questions when the client’s answer creates the opening, not as a list to read aloud. Pause when needed."
        ],
        "blocks": [],
        "items": [
          {
            "heading": "Understand the business",
            "blocks": [
              {
                "kind": "kv",
                "label": "Start",
                "text": "‘Tell me a little about the business and what you’d like to improve.’"
              },
              {
                "kind": "kv",
                "label": "Then explore",
                "text": "‘Who do you mainly serve?’ ‘Which offer is the priority right now?’ ‘What happens from the first inquiry until the customer receives the service?’"
              },
              {
                "kind": "kv",
                "label": "Go deeper",
                "text": "‘What is becoming harder as the business grows?’ ‘If we improved one thing first, what would matter most?’"
              },
              {
                "kind": "kv",
                "label": "Listen for",
                "text": "What they sell, who buys, the team involved, and the outcome they actually want. ‘We need AI’ is a proposed solution; ask what led them to that idea."
              }
            ]
          },
          {
            "heading": "Map the current process",
            "blocks": [
              {
                "kind": "kv",
                "label": "Start",
                "text": "‘Walk me through the last inquiry you received. What happened first?’"
              },
              {
                "kind": "kv",
                "label": "Then follow the sequence",
                "text": "‘What happens after that?’ ‘Who handles that step?’ ‘What do they need before they can act?’ ‘Where is it recorded?’ ‘How do they know it’s finished?’"
              },
              {
                "kind": "kv",
                "label": "Go deeper",
                "text": "‘Can we look at one example together?’ ‘Is that how everyone does it, or does it vary by person?’"
              },
              {
                "kind": "kv",
                "label": "Capture",
                "text": "Trigger, input, owner, decision, action, system, handoff, and exit. Draw the current process before the proposed process. Keep any unknown step visibly unresolved."
              },
              {
                "kind": "you",
                "text": "‘Okay, I see the flow now. The inquiry comes in, sales qualifies it, and operations takes over after payment. Before I suggest anything, I want to understand that handoff. What information does operations receive?’"
              }
            ]
          }
        ]
      },
      {
        "title": "Find the Cause and the Data",
        "intro": [],
        "blocks": [],
        "items": [
          {
            "heading": "Find the bottleneck",
            "blocks": [
              {
                "kind": "kv",
                "label": "Start",
                "text": "‘Where does that process usually slow down or get missed?’"
              },
              {
                "kind": "kv",
                "label": "Follow-up",
                "text": "‘How often does that happen?’ ‘What is the team doing while the work is waiting?’ ‘What happens to the customer when it’s delayed?’"
              },
              {
                "kind": "kv",
                "label": "Test the assumption",
                "text": "‘You mentioned needing more leads. Are existing leads getting a response and a next step consistently?’"
              },
              {
                "kind": "kv",
                "label": "Ask for evidence",
                "text": "‘Can you show me a recent example that didn’t go well?’ Compare it with a case that worked. A symptom such as low sales might come from traffic quality, qualification, missed follow-up, or the offer. Don’t decide which one before looking."
              },
              {
                "kind": "kv",
                "label": "Common signals",
                "text": "Manual repetition, lead leakage, slow response times, disconnected software, duplicate data entry, missing follow-up, poor CRM visibility, and reporting gaps."
              },
              {
                "kind": "client",
                "text": "‘We need to automate our sales.’"
              },
              {
                "kind": "you",
                "text": "‘Got it. Which part is taking the most manual work right now: reviewing the inquiry, following up, or moving it to the next person?’"
              }
            ]
          },
          {
            "heading": "Identify the data and its owner",
            "blocks": [
              {
                "kind": "kv",
                "label": "Start",
                "text": "‘Where does the team find the information needed for that step?’"
              },
              {
                "kind": "kv",
                "label": "Follow-up",
                "text": "‘Which system should we trust if two records disagree?’ ‘What identifies the same customer, order, or request across these tools?’ ‘Who updates the information?’"
              },
              {
                "kind": "kv",
                "label": "Go deeper",
                "text": "‘Are any fields missing or entered differently by different people?’ ‘Can we inspect an anonymized sample?’ ‘Do we have authorized API access or only manual exports?’"
              },
              {
                "kind": "kv",
                "label": "Capture",
                "text": "Source of truth for each kind of data, stable IDs, required fields, types, ownership, update timing, and access. Ask separately about volume, bursts, historical imports, and retention. A spreadsheet can be useful, but it should have a clear role instead of silently becoming another conflicting master."
              },
              {
                "kind": "kv",
                "label": "Privacy",
                "text": "‘Does this include sensitive customer or employee information, and who should be able to see it?’ Agree on what the automation needs, what can be omitted, and which external services may receive it."
              },
              {
                "kind": "note",
                "text": "Don’t request credentials in chat. Identify the account administrator and arrange authorization through the platform’s supported process when implementation is approved."
              }
            ]
          }
        ]
      },
      {
        "title": "Make the Rules and Exceptions Explicit",
        "intro": [],
        "blocks": [],
        "items": [
          {
            "heading": "Understand the business rules",
            "blocks": [
              {
                "kind": "kv",
                "label": "Start",
                "text": "‘What decides which path this record takes?’"
              },
              {
                "kind": "kv",
                "label": "Follow-up",
                "text": "‘What makes a lead qualified?’ ‘When should the opportunity move stages?’ ‘How is an owner assigned?’ ‘When should follow-up stop?’"
              },
              {
                "kind": "kv",
                "label": "Go deeper",
                "text": "‘Is that rule documented, or does each salesperson decide?’ ‘Do products or customer types have different rules?’ ‘What happens outside business hours?’"
              },
              {
                "kind": "kv",
                "label": "For timing",
                "text": "‘Is the deadline measured in clock hours or working hours?’ ‘Which timezone, holidays, and cutoffs apply?’"
              },
              {
                "kind": "kv",
                "label": "For money",
                "text": "‘Does a sale mean an order placed, a payment collected, or revenue after refunds?’"
              },
              {
                "kind": "kv",
                "label": "For records",
                "text": "‘What should happen when the same person submits again?’"
              },
              {
                "kind": "you",
                "text": "‘So booking should stop that nurture sequence, but the appointment reminders should continue. Is that the behavior you want for every offer, or are there exceptions?’"
              }
            ]
          },
          {
            "heading": "Identify exceptions before building",
            "blocks": [
              {
                "kind": "kv",
                "label": "Start",
                "text": "‘What happens when the normal process doesn’t apply?’"
              },
              {
                "kind": "kv",
                "label": "Follow-up",
                "text": "‘What if required information is missing?’ ‘What if they cancel, reschedule, request a refund, or change products?’ ‘What if the assigned person is unavailable?’"
              },
              {
                "kind": "kv",
                "label": "Go deeper",
                "text": "‘Which exceptions happen often enough to need a defined path?’ ‘Which ones should stop the automation and go to a person?’"
              },
              {
                "kind": "kv",
                "label": "Capture",
                "text": "A small scenario table: event → expected behavior → owner → notification → recovery. Include duplicate events, late events, conflicting updates, and a successful external action followed by a failed notification."
              },
              {
                "kind": "kv",
                "label": "Confirm",
                "text": "‘If payment succeeds but account creation fails, should we hold the welcome email and alert operations? Who should resolve it?’ This is more useful than a general question about whether they want error handling."
              },
              {
                "kind": "note",
                "text": "Don’t silently choose thresholds, refund behavior, qualification rules, or message frequency for the client. Propose a starting point when helpful, label it as a proposal, and confirm it."
              }
            ]
          }
        ]
      },
      {
        "title": "Choose Automation, AI, or a Person",
        "intro": [],
        "blocks": [],
        "items": [
          {
            "heading": "Decide what should be automated",
            "blocks": [
              {
                "kind": "kv",
                "label": "Start",
                "text": "‘Which steps follow the same rule every time?’"
              },
              {
                "kind": "kv",
                "label": "Follow-up",
                "text": "‘Which steps take the most time without needing much judgment?’ ‘Is the process consistent enough to automate?’ ‘Would clarifying ownership solve part of this first?’"
              },
              {
                "kind": "kv",
                "label": "Good deterministic candidates",
                "text": "A verified payment updates customer status; a booked appointment stops a relevant nurture sequence; a due date triggers a reminder; an approved record creates a task. The rules, data, and permissions still need testing."
              }
            ]
          },
          {
            "heading": "Decide whether AI is actually necessary",
            "blocks": [
              {
                "kind": "kv",
                "label": "Start",
                "text": "‘What part requires understanding something unpredictable, like a free-text message?’"
              },
              {
                "kind": "kv",
                "label": "Follow-up",
                "text": "‘Could a form or fixed rule handle it?’ ‘What mistakes would be acceptable, and which would be serious?’ ‘Do we have approved examples or documents to test against?’"
              },
              {
                "kind": "kv",
                "label": "Go deeper",
                "text": "‘Who owns the knowledge?’ ‘How often does it change?’ ‘What should happen when the answer isn’t in the material?’"
              },
              {
                "kind": "kv",
                "label": "Possible AI role",
                "text": "Summarize a conversation or suggest a category for review. Keep objective actions, authorization, money calculations, and status transitions controlled by rules. Consider RAG only when the task needs access to relevant approved knowledge; first resolve outdated or conflicting sources."
              }
            ]
          },
          {
            "heading": "Identify human approval points",
            "blocks": [
              {
                "kind": "kv",
                "label": "Start",
                "text": "‘Which decisions would you still want a person to approve?’"
              },
              {
                "kind": "kv",
                "label": "Follow-up",
                "text": "‘Who is authorized to approve?’ ‘What evidence should they see?’ ‘How long can it wait?’ ‘Who handles it if that person is unavailable?’"
              },
              {
                "kind": "kv",
                "label": "Go deeper",
                "text": "‘What happens if the underlying record changes while approval is pending?’"
              },
              {
                "kind": "you",
                "text": "‘For the reminders and CRM updates, a normal workflow should be enough. We could test AI on summarizing the conversation, but I’d keep pricing exceptions with your team. Does that fit how you want to work?’"
              }
            ]
          }
        ]
      },
      {
        "title": "Plan Recovery and Define Success",
        "intro": [],
        "blocks": [],
        "items": [
          {
            "heading": "Plan error handling and ownership",
            "blocks": [
              {
                "kind": "kv",
                "label": "Start",
                "text": "‘If this stops working, who needs to know, and how quickly?’"
              },
              {
                "kind": "kv",
                "label": "Follow-up",
                "text": "‘What can the team still do manually?’ ‘Which actions are safe to retry?’ ‘How do we identify something that already succeeded?’"
              },
              {
                "kind": "kv",
                "label": "Go deeper",
                "text": "‘Who owns expired credentials?’ ‘How do you want failed items queued for review?’ ‘What is the acceptable recovery time?’"
              },
              {
                "kind": "kv",
                "label": "Plan",
                "text": "Validate input; authenticate events; record safe identifiers; handle duplicates; retry temporary failures within limits; route permanent failures to an owner; reconcile uncertain external results before replaying an action. Avoid alerts that repeatedly notify everyone without a clear next step."
              },
              {
                "kind": "you",
                "text": "‘If the task exists but the notification fails, we should recover the notification without creating another task. I’ll include that in the acceptance tests.’"
              }
            ]
          },
          {
            "heading": "Define KPIs before promising improvement",
            "blocks": [
              {
                "kind": "kv",
                "label": "Start",
                "text": "‘What would make you say this project was worth it?’"
              },
              {
                "kind": "kv",
                "label": "Follow-up",
                "text": "‘What is that number today?’ ‘Where does it come from?’ ‘Who trusts and uses the report?’ ‘How soon should we review it after launch?’"
              },
              {
                "kind": "kv",
                "label": "Choose relevant measures",
                "text": "Median and overdue response time; unanswered inquiries; booking and show rates; sales conversion with an agreed denominator; manual minutes per record; processing failure rate; overdue creative tasks; products lacking approved content. For AI, include answer correctness and appropriate escalation, not just how many messages it handled."
              },
              {
                "kind": "kv",
                "label": "Define the measure",
                "text": "Name, numerator and denominator where applicable, data source, timezone, date range, baseline, target, and owner. Separate automated acknowledgements from a meaningful salesperson response if that distinction matters."
              },
              {
                "kind": "you",
                "text": "‘That helps. If we’re measuring faster response, should we count the automatic acknowledgement, or the first actual response from the salesperson? Those would tell us different things.’"
              }
            ]
          }
        ]
      },
      {
        "title": "Recommend the System and Its Value",
        "intro": [],
        "blocks": [],
        "items": [
          {
            "heading": "Recommend architecture after discovery",
            "blocks": [
              {
                "kind": "text",
                "text": "Summarize the process and confirm the main problem first. Then identify the source of truth, trigger, validation, rules, destination, owner, failure path, and reporting. Keep GHL-native logic where it meets the requirement. Add n8n for a defined integration or processing need. Add AI only for the step that benefits from interpretation."
              },
              {
                "kind": "kv",
                "label": "Ask",
                "text": "‘Are these tools staying?’ ‘Who will maintain the workflow?’ ‘What volume and response time do we need to support?’ ‘Are there access or plan limitations?’ ‘Which part should we pilot first?’"
              },
              {
                "kind": "you",
                "text": "‘From what you’ve shown me, the biggest gap is the handoff after qualification. I’d first make ownership and the next action visible in the CRM. If the task tool needs the same information, we can connect it. I’d test that path first before adding the rest.’"
              }
            ]
          },
          {
            "heading": "Sort what you found before you recommend",
            "blocks": [
              {
                "kind": "desc",
                "text": "Group every opportunity from the call into four buckets, so the client sees a sequence instead of a wish list."
              },
              {
                "kind": "table",
                "rows": [
                  [
                    "Bucket",
                    "What goes in it"
                  ],
                  [
                    "Quick wins",
                    "Immediate value with little build effort"
                  ],
                  [
                    "Core infrastructure",
                    "What makes daily operations reliable"
                  ],
                  [
                    "AI opportunities",
                    "Where AI meaningfully reduces workload"
                  ],
                  [
                    "Future infrastructure",
                    "What only matters once volume grows"
                  ]
                ]
              },
              {
                "kind": "kv",
                "label": "Prioritize by",
                "text": "Business impact × frequency × automation feasibility ÷ implementation cost."
              },
              {
                "kind": "you",
                "text": "‘Here’s what I’d fix first, what keeps it reliable, and what can wait until the volume justifies it.’"
              }
            ]
          },
          {
            "heading": "Explain ROI and business value honestly",
            "blocks": [
              {
                "kind": "text",
                "text": "Ask about time spent, frequency, rework, missed opportunities, operating cost, and implementation effort. Separate expected savings from measured results. Time saved may free up capacity without reducing payroll, and higher sales depend on more than the automation."
              },
              {
                "kind": "kv",
                "label": "Illustration only",
                "text": "If a task takes 5 minutes and happens 200 times a week, that is about 16.7 hours of work. If a tested workflow saves 3 minutes per case, the estimated capacity gain is 10 hours per week. Subtract review time, exceptions, software costs, and maintenance before discussing net value. These are example assumptions, not project results."
              },
              {
                "kind": "kv",
                "label": "For a financial estimate",
                "text": "Use the client’s agreed value of recovered time and a conservative, evidenced benefit estimate. Compare ongoing benefit with operating costs and the upfront project cost. Don’t present uncertain revenue as guaranteed ROI."
              },
              {
                "kind": "you",
                "text": "‘I can estimate the time this could save once we confirm the volume and handling time. I’d validate that with a small pilot first, then compare the result with the running cost.’"
              }
            ]
          }
        ]
      },
      {
        "title": "Confirm the Project, Decision, and Fit",
        "intro": [
          "Ask these after you understand the problem.",
          "Budget and decision questions land better once the client has heard you understand their business."
        ],
        "blocks": [],
        "items": [
          {
            "heading": "Who decides and who is involved",
            "blocks": [
              {
                "kind": "kv",
                "label": "Start",
                "text": "‘Besides you, who else will be involved in deciding on this?’"
              },
              {
                "kind": "kv",
                "label": "Follow-up",
                "text": "‘Who will use the system day to day?’ ‘Who can confirm the business rules we discussed?’ ‘Who signs off when we test it?’"
              },
              {
                "kind": "kv",
                "label": "Go deeper",
                "text": "‘Has the team tried to fix this before? What happened?’"
              },
              {
                "kind": "kv",
                "label": "Listen for",
                "text": "A buyer who is not the user, a user who was not consulted, or an approver who has not been on the call. A proposal can stall on anyone you did not meet."
              }
            ]
          },
          {
            "heading": "What already exists",
            "blocks": [
              {
                "kind": "kv",
                "label": "Start",
                "text": "‘Are there automations or integrations already running that touch this process?’"
              },
              {
                "kind": "kv",
                "label": "Follow-up",
                "text": "‘Who set them up, and who maintains them now?’ ‘Is anything connected through Zapier, Make, or a developer’s script?’"
              },
              {
                "kind": "kv",
                "label": "Compliance",
                "text": "‘Are there privacy, industry, or contract requirements on how this data is handled or who can see it?’"
              },
              {
                "kind": "kv",
                "label": "Why",
                "text": "Existing automations are a common source of duplicate messages and conflicting updates. Find them before you build a second system on top."
              }
            ]
          },
          {
            "heading": "Timeline, budget, and support",
            "blocks": [
              {
                "kind": "kv",
                "label": "Timeline",
                "text": "‘Is there a date driving this, like a launch or a hire?’ ‘What happens if it lands later?’"
              },
              {
                "kind": "kv",
                "label": "Budget",
                "text": "‘Do you have a range in mind for this phase? It helps me recommend the right scope instead of guessing.’"
              },
              {
                "kind": "kv",
                "label": "Support",
                "text": "‘After launch, do you want someone maintaining and improving it, or will your team own it?’"
              },
              {
                "kind": "kv",
                "label": "Listen for",
                "text": "A timeline tied to a real event is firm; ‘as soon as possible’ is not. If they have no range, give one based on scope and see how they react instead of pushing for a number."
              },
              {
                "kind": "you",
                "text": "‘I don’t want to design something that doesn’t fit what you planned to invest. Do you have a range in mind? If not, I can show you a smaller first phase and a fuller version, and we can pick from there.’"
              }
            ]
          }
        ]
      },
      {
        "title": "Present the Solution Without Selling",
        "intro": [
          "The proposal should read like a summary of their own call.",
          "If they recognize their problem in it, you don’t need to persuade."
        ],
        "blocks": [],
        "items": [
          {
            "heading": "The structure",
            "blocks": [
              {
                "kind": "desc",
                "text": "Problem → Current process → Proposed process → Business impact → Scope → Investment → Next step. Use only facts confirmed on the call. Mark anything still unknown as open instead of filling the gap."
              },
              {
                "kind": "kv",
                "label": "Problem",
                "text": "One sentence, in their words. ‘Qualified leads wait hours for a first call, and some are never followed up.’"
              },
              {
                "kind": "kv",
                "label": "Current process",
                "text": "The map you drew, with the bottleneck marked."
              },
              {
                "kind": "kv",
                "label": "Proposed process",
                "text": "The same map with the change. Show the flow, not a list of tools."
              },
              {
                "kind": "kv",
                "label": "Business impact",
                "text": "What improves and how you will measure it against their baseline. Estimates are labelled as estimates."
              },
              {
                "kind": "kv",
                "label": "Scope",
                "text": "What phase one includes, what is deferred, and what the client provides."
              },
              {
                "kind": "kv",
                "label": "Investment",
                "text": "A project fee for the outcome and phase, plus any recurring software or support costs listed separately."
              },
              {
                "kind": "kv",
                "label": "Next step",
                "text": "One clear action and date."
              }
            ]
          },
          {
            "heading": "Rules that keep it from sounding salesy",
            "blocks": [
              {
                "kind": "kv",
                "label": "Lead with the business, not the build",
                "text": "They bought a fix to a problem, not n8n nodes. Technical detail goes in an appendix or comes out when they ask."
              },
              {
                "kind": "kv",
                "label": "Recommend one option",
                "text": "Offer a smaller alternative when budget is uncertain. Three equal options push the thinking back onto them."
              },
              {
                "kind": "kv",
                "label": "Name the risks yourself",
                "text": "What depends on their access, their data, or their team’s time. Raising it first builds more trust than a clean pitch."
              },
              {
                "kind": "kv",
                "label": "Don’t promise revenue",
                "text": "Commit to the process change and the measure, not a sales number."
              },
              {
                "kind": "kv",
                "label": "Ask for the decision plainly",
                "text": "Silence after a clear question is fine."
              },
              {
                "kind": "you",
                "text": "‘So that’s the handoff problem you described, how I’d fix it, and what phase one includes. Does this match what you need? If it does, the next step is the agreement and a kickoff call, and I can start the week after.’"
              }
            ]
          },
          {
            "heading": "If they hesitate",
            "blocks": [
              {
                "kind": "text",
                "text": "‘What part are you unsure about?’ is better than lowering the price. The concern is usually scope, timing, or trust. Address that one. If budget is the issue, reduce the scope, not your rate."
              },
              {
                "kind": "tip",
                "label": "Scripts for common objections",
                "text": "“Too expensive,” “not ready yet,” “need to ask my partner,” and “send me something” each have a full script in Learnings & Tips for Every Call, section 8."
              }
            ]
          }
        ]
      },
      {
        "title": "Practice Case: Four Connected Needs",
        "intro": [
          "Hypothetical discovery scenario based on a prospect’s requested scope.",
          "No implementation or results are implied. Use it to rehearse questions across several connected systems."
        ],
        "blocks": [],
        "items": [
          {
            "heading": "Message response monitoring",
            "blocks": [
              {
                "kind": "kv",
                "label": "Ask",
                "text": "‘Which pages and inboxes are included?’ ‘Where does the team actually reply?’ ‘Can we identify the salesperson on each reply?’ ‘What is the response target during working hours?’ ‘Which conversations should be excluded?’"
              },
              {
                "kind": "text",
                "text": "Confirm official access, event coverage, ownership, and response definitions before promising all-channel monitoring. If quality scoring is requested, agree on a rubric and human review."
              }
            ]
          },
          {
            "heading": "Sales performance and weekly reporting",
            "blocks": [
              {
                "kind": "kv",
                "label": "Ask",
                "text": "‘Where is a completed sale recorded?’ ‘How is it linked to a salesperson and product?’ ‘How do you treat cancellations and refunds?’ ‘What are the individual targets?’"
              },
              {
                "kind": "text",
                "text": "Recommend a shared source of truth and salesperson views rather than separate disconnected databases for each person. Reconcile the weekly totals to source records."
              }
            ]
          },
          {
            "heading": "Creative-team production tracking",
            "blocks": [
              {
                "kind": "kv",
                "label": "Ask",
                "text": "‘What happens after a script is approved?’ ‘Who owns the editor and presenter handoff?’ ‘Can one script produce multiple videos?’ ‘Where is the final asset stored?’"
              },
              {
                "kind": "text",
                "text": "Define stages, ownership, deadlines, approvals, asset links, and escalation before configuring reminders. A reminder can’t fix an undefined handoff."
              }
            ]
          },
          {
            "heading": "Product content and advertising coverage",
            "blocks": [
              {
                "kind": "kv",
                "label": "Ask",
                "text": "‘Where is the product master?’ ‘How does an ad connect to a product?’ ‘Does active mean enabled or actually delivering?’ ‘Should out-of-stock products be excluded?’"
              },
              {
                "kind": "text",
                "text": "Use stable product IDs and agreed coverage rules. A paused ad may be intentional; confirm the business reason before flagging it as a failure."
              },
              {
                "kind": "you",
                "text": "‘I can see how those four areas connect. I’d first confirm where the messages, sales, product list, and production tasks live. Then we can choose the first workflow based on the biggest gap and the data we can reliably access.’"
              }
            ]
          }
        ]
      },
      {
        "title": "Close With a Clear, Realistic Plan",
        "intro": [],
        "blocks": [],
        "items": [
          {
            "heading": "A natural closing recommendation",
            "blocks": [
              {
                "kind": "you",
                "text": "‘So from what you’ve shared, the main issue is that qualified leads don’t always reach the right person with the information they need. I’d start by defining that handoff and making the next action visible in the CRM. Then we can automate the assignment and follow-up around the rules we agreed on. I’d test it with a small set of cases, including missing information and an unavailable owner. We’d measure response time and missed follow-ups against your current numbers. Once that is working, we can decide whether the next phase needs another integration or any AI.’"
              },
              {
                "kind": "note",
                "text": "This is a scenario response. Replace the problem and measurements with what the client actually confirmed; don’t deliver it unchanged to every business."
              }
            ]
          },
          {
            "heading": "Before you estimate or begin the build",
            "blocks": [
              {
                "kind": "text",
                "text": "Confirm the problem, current flow, agreed rules, source systems, ownership, permissions, exceptions, acceptance tests, reporting definitions, and unresolved questions. State what is included in phase one and what is deferred. Separate build work from recurring software, API, hosting, and maintenance costs."
              }
            ]
          },
          {
            "heading": "Questions that protect a useful scope",
            "blocks": [
              {
                "kind": "bullet",
                "text": "‘Which result needs to work first?’"
              },
              {
                "kind": "bullet",
                "text": "‘Who can confirm these rules?’"
              },
              {
                "kind": "bullet",
                "text": "‘What access or sample data is still missing?’"
              },
              {
                "kind": "bullet",
                "text": "‘Who signs off on the test?’"
              },
              {
                "kind": "bullet",
                "text": "‘What would change our timeline?’"
              },
              {
                "kind": "bullet",
                "text": "‘Who will own it after handoff?’"
              }
            ]
          },
          {
            "heading": "When you don’t have enough information",
            "blocks": [
              {
                "kind": "you",
                "text": "‘I understand the outcome you want. I still need to confirm whether the current system exposes that data and how your team assigns ownership. Once those two points are clear, I can give you a more reliable plan.’"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "prompts",
    "title": "Discovery Call Prompts",
    "subtitle": "Three copy-paste practice prompts: a first interview, a client consultation, and a GHL & n8n technical interview.",
    "cover": [
      "Practice with the real material.",
      "Each prompt reads your own PDFs first, then runs a realistic session one question at a time.",
      "Copy the text inside the gray box, then attach the PDF it asks for."
    ],
    "sections": [
      {
        "title": "How to Use These Prompts",
        "intro": [],
        "blocks": [
          {
            "kind": "table",
            "rows": [
              [
                "Prompt",
                "Attach this PDF"
              ],
              [
                "1  First Interview Simulator",
                "1 - Interview Master Sheet"
              ],
              [
                "2  Client Consultation Simulator",
                "2 - Discovery & Consultation Guide (the “Consultation Sheet”)"
              ],
              [
                "3  GHL & n8n Technical Interview",
                "1 - Interview Master Sheet (optional, to set the difficulty)"
              ]
            ]
          },
          {
            "kind": "bullet",
            "text": "Open a new conversation in Claude or GPT for each session."
          },
          {
            "kind": "bullet",
            "text": "Paste the whole prompt, attach the PDF, and answer out loud as if it were a real call."
          },
          {
            "kind": "bullet",
            "text": "The prompts keep your approved answers as they are. Ask for a rewrite only when you want one."
          },
          {
            "kind": "tip",
            "label": "End-of-session commands",
            "text": "Prompt 2 ends when you say END CONSULTATION. Prompt 3 reviews a scenario only after you say FINAL ANSWER."
          }
        ],
        "items": []
      },
      {
        "title": "Prompt 1: First Interview Simulator",
        "intro": [],
        "blocks": [
          {
            "kind": "desc",
            "text": "A senior recruiter and hiring manager interviews you, using your Master Sheet as the source of truth. Attach: 1 - Interview Master Sheet."
          },
          {
            "kind": "prompt",
            "lines": [
              "## PROMPT 1 | FIRST INTERVIEW SIMULATOR",
              "## ROLE",
              "Act as a senior technical recruiter and hiring manager interviewing me for an AI Automation & Business Systems Engineer position.",
              "## STEP 1: ANALYZE MY MASTER SHEET PDF",
              "Read the entire attached Master Sheet PDF before asking questions. Identify my real background, strongest skills, projects, career transition, responsibilities, and potential concerns. Treat existing answers in the Master Sheet as approved reference material, not drafts requiring improvement.",
              "## STEP 2: CONDUCT A REALISTIC FIRST INTERVIEW",
              "Ask questions based on the Master Sheet, including my introduction, work history, GoHighLevel, n8n, AI tools, custom development, project ownership, problem-solving, communication, and fit for the role.",
              "Use realistic follow-up questions to test whether I can explain the experiences documented in the PDF. If an answer is unclear, ask a targeted follow-up instead of rewriting it.",
              "Challenge me occasionally on AI-assisted building, decision-making, troubleshooting, limitations, and the value I provide beyond AI-generated work.",
              "## STEP 3: ADAPT THE INTERVIEW",
              "Begin with natural introductory questions, then move into experience and increasingly demanding hiring-manager questions.",
              "Maintain a professional, conversational interview pace. Stay in interviewer mode; do not interrupt with scoring or coaching unless I ask for feedback.",
              "## RULES",
              "• Ask only one question at a time and wait for my response.",
              "• Do not reveal future questions or provide model answers before I respond.",
              "• Use the attached PDF as the source of truth; never invent credentials, projects, results, or experience.",
              "• Preserve the high-quality answers and wording in my reference PDF. Do not rewrite, polish, or replace those answers unless I explicitly request it.",
              "• Start by confirming you have read the Master Sheet PDF, then ask your first question."
            ]
          }
        ],
        "items": []
      },
      {
        "title": "Prompt 2: Client Consultation Simulator",
        "intro": [],
        "blocks": [
          {
            "kind": "desc",
            "text": "A realistic business owner lets you lead a discovery call. Attach: 2 - Discovery & Consultation Guide."
          },
          {
            "kind": "prompt",
            "lines": [
              "## PROMPT 2 | CLIENT CONSULTATION SIMULATOR",
              "## ROLE",
              "Act as a realistic prospective business owner in a client discovery consultation. Use my attached Consultation Sheet PDF as your reference for my approach, not as a script to read aloud.",
              "## STEP 1: ANALYZE MY CONSULTATION SHEET PDF",
              "Review the full PDF to understand the discovery framework, diagnostic questions, business priorities, solution criteria, and consultation flow. Keep its existing approved wording intact; do not rewrite its suggested questions or answers.",
              "## STEP 2: SIMULATE A CLIENT CONSULTATION",
              "Create a believable business and operational problem, such as inconsistent lead follow-up, missed appointments, unreliable automations, CRM disorganization, or manual admin work.",
              "Reveal information gradually in response to my questions. Be realistic: sometimes busy, skeptical, vague, or concerned about cost and complexity.",
              "Let me lead discovery, prioritize the issue, assess business impact, and recommend an appropriate solution. Do not force every question in the sheet into the call.",
              "## STEP 3: ROLEPLAY AND DEBRIEF",
              "Remain in character and respond naturally one turn at a time. Do not coach me mid-call unless I request it.",
              "When I say END CONSULTATION, give concise feedback on discovery, business understanding, technical fit, and communication. Identify missed questions and questionable assumptions without automatically rewriting my responses or the PDF content.",
              "## RULES",
              "• Ask only one question at a time and wait for my response.",
              "• Do not reveal future questions or provide model answers before I respond.",
              "• Use the attached PDF as the source of truth; never invent credentials, projects, results, or experience.",
              "• Preserve the high-quality answers and wording in my reference PDF. Do not rewrite, polish, or replace those answers unless I explicitly request it.",
              "• Start by confirming you read the Consultation Sheet, briefly introduce yourself as the client, and let me open the consultation."
            ]
          }
        ],
        "items": []
      },
      {
        "title": "Prompt 3: GHL & n8n Technical Interview",
        "intro": [],
        "blocks": [
          {
            "kind": "desc",
            "text": "A senior GHL and n8n engineer runs scenario-based troubleshooting incidents. Attach: 1 - Interview Master Sheet (optional)."
          },
          {
            "kind": "prompt",
            "lines": [
              "## PROMPT 3 | GHL & n8n TECHNICAL INTERVIEW",
              "## ROLE",
              "Act as a senior GoHighLevel and n8n automation engineer conducting a practical, scenario-based technical interview. Analyze my Master Sheet PDF if attached to calibrate the difficulty.",
              "## STEP 1: SELECT REAL-WORLD TECHNICAL SCENARIOS",
              "GoHighLevel: form and survey triggers, contact duplicates, workflows, pipeline opportunities, calendars, email/SMS conditions, Meta Pixel/CAPI, attribution, API/webhooks, and workflow race conditions.",
              "n8n: webhooks, HTTP requests, OAuth/API keys, JSON transformations, missing fields, branching, pagination, rate limits, retries, idempotency, AI outputs, and GHL integration.",
              "Architecture: GHL vs n8n vs Zapier vs custom code, logging, monitoring, security, data consistency, testing, and production reliability.",
              "## STEP 2: INTERACTIVE TROUBLESHOOTING",
              "Give one realistic incident at a time, such as a GHL form submission that does not trigger a workflow, duplicated SMS, or a webhook returning 200 without updating the contact.",
              "Let me ask diagnostic questions. Reveal logs, configurations, HTTP responses, or symptoms incrementally, only as appropriate to my investigation.",
              "Ask what I would inspect first, how I would isolate root cause, what fix I would implement, and how I would validate and prevent recurrence. Never disclose the root cause upfront.",
              "## STEP 3: TECHNICAL REVIEW AND DIFFICULTY",
              "Wait until I say FINAL ANSWER before reviewing the scenario. Then evaluate technical correctness, diagnostic sequence, production safety, and communication. Distinguish proven facts from hypotheses.",
              "Explain any material mistakes and the correct diagnostic approach, but do not automatically rewrite my personal interview answers or modify approved PDF content.",
              "Start at intermediate difficulty and progressively add intermittent failures, competing causes, API limits, and cross-system tradeoffs.",
              "## RULES",
              "• Ask only one question at a time and wait for my response.",
              "• Do not reveal future questions or provide model answers before I respond.",
              "• Use the attached PDF as the source of truth; never invent credentials, projects, results, or experience.",
              "• Preserve the high-quality answers and wording in my reference PDF. Do not rewrite, polish, or replace those answers unless I explicitly request it.",
              "• Begin immediately with one intermediate GHL troubleshooting scenario."
            ]
          }
        ],
        "items": []
      }
    ]
  },
  {
    "id": "phrases",
    "title": "Conversational Responses",
    "subtitle": "Natural phrases and bridges for interviews, discovery calls, and client conversations.",
    "cover": [
      "Sound like you’re listening, not reading a questionnaire.",
      "Core pattern: acknowledge → confirm what matters → continue one level deeper. Don’t force all three into every response.",
      "Mix your acknowledgements. Don’t say “Got it” after every answer."
    ],
    "sections": [
      {
        "title": "When You Understand",
        "intro": [],
        "blocks": [
          {
            "kind": "bullet",
            "text": "Got it, that makes sense."
          },
          {
            "kind": "bullet",
            "text": "Okay, I understand."
          },
          {
            "kind": "bullet",
            "text": "Oh, I see what you mean."
          },
          {
            "kind": "bullet",
            "text": "Yeah, that makes sense."
          },
          {
            "kind": "bullet",
            "text": "Got it. So that’s how you’re currently handling it."
          },
          {
            "kind": "bullet",
            "text": "Okay, now I understand the process better."
          }
        ],
        "items": []
      },
      {
        "title": "When They Share Something Important",
        "intro": [],
        "blocks": [
          {
            "kind": "bullet",
            "text": "Thanks for sharing that. That gives me more context."
          },
          {
            "kind": "bullet",
            "text": "That’s helpful, thank you."
          },
          {
            "kind": "bullet",
            "text": "Oh, I see. That actually explains a lot."
          },
          {
            "kind": "bullet",
            "text": "Got it. That’s an important detail."
          },
          {
            "kind": "bullet",
            "text": "Okay, that helps me understand where the issue is coming from."
          }
        ],
        "items": []
      },
      {
        "title": "Confirm Your Understanding",
        "intro": [],
        "blocks": [
          {
            "kind": "bullet",
            "text": "Just to be clear, you’re saying that…"
          },
          {
            "kind": "bullet",
            "text": "So if I understand correctly…"
          },
          {
            "kind": "bullet",
            "text": "Let me make sure I understood that correctly."
          },
          {
            "kind": "bullet",
            "text": "So basically, the current process is…"
          },
          {
            "kind": "bullet",
            "text": "Just so I’m following you correctly…"
          },
          {
            "kind": "bullet",
            "text": "So the main issue right now is ___, correct?"
          }
        ],
        "items": []
      },
      {
        "title": "Keep Them Talking",
        "intro": [],
        "blocks": [
          {
            "kind": "bullet",
            "text": "Got it. And what happens after that?"
          },
          {
            "kind": "bullet",
            "text": "Okay. Then what happens next?"
          },
          {
            "kind": "bullet",
            "text": "I see. How does the team handle that part?"
          },
          {
            "kind": "bullet",
            "text": "Interesting. Can you walk me through that?"
          },
          {
            "kind": "bullet",
            "text": "And who normally handles that?"
          },
          {
            "kind": "bullet",
            "text": "How are you currently doing that?"
          },
          {
            "kind": "bullet",
            "text": "What happens if that doesn’t happen?"
          }
        ],
        "items": []
      },
      {
        "title": "When the Problem Becomes Clearer",
        "intro": [],
        "blocks": [
          {
            "kind": "bullet",
            "text": "Oh, okay. Now that makes sense."
          },
          {
            "kind": "bullet",
            "text": "Ah, I see. So that’s where the problem starts."
          },
          {
            "kind": "bullet",
            "text": "Got it. So the issue isn’t really ___, it’s more about ___."
          },
          {
            "kind": "bullet",
            "text": "Okay, now I can see why that’s causing problems."
          },
          {
            "kind": "bullet",
            "text": "That gives me a much clearer picture."
          }
        ],
        "items": []
      },
      {
        "title": "Ask for Clarification",
        "intro": [],
        "blocks": [
          {
            "kind": "bullet",
            "text": "Just to clarify, when you say ___, what exactly do you mean?"
          },
          {
            "kind": "bullet",
            "text": "Can you give me an example of that?"
          },
          {
            "kind": "bullet",
            "text": "When you say ‘manual,’ what does that process actually look like?"
          },
          {
            "kind": "bullet",
            "text": "Who is responsible for that right now?"
          },
          {
            "kind": "bullet",
            "text": "Is that happening every time, or only in certain cases?"
          },
          {
            "kind": "bullet",
            "text": "When does that usually become a problem?"
          }
        ],
        "items": []
      },
      {
        "title": "Agree Without Overcommitting",
        "intro": [],
        "blocks": [
          {
            "kind": "bullet",
            "text": "Yeah, that could work. I’d just want to check one thing first."
          },
          {
            "kind": "bullet",
            "text": "I understand what you’re trying to achieve."
          },
          {
            "kind": "bullet",
            "text": "That makes sense as a direction. I’d want to validate the current setup first."
          },
          {
            "kind": "bullet",
            "text": "Potentially, yes. I’d need to see how the current workflow is structured."
          },
          {
            "kind": "bullet",
            "text": "I can see why you’re considering that."
          }
        ],
        "items": []
      },
      {
        "title": "When You Don’t Know Yet",
        "intro": [],
        "blocks": [
          {
            "kind": "bullet",
            "text": "That’s a good question. I don’t want to guess."
          },
          {
            "kind": "bullet",
            "text": "I haven’t confirmed that yet."
          },
          {
            "kind": "bullet",
            "text": "I’d need to check the current setup before giving you a definite answer."
          },
          {
            "kind": "bullet",
            "text": "I’m not completely sure yet, but I know what I’d check first."
          },
          {
            "kind": "bullet",
            "text": "I’d rather validate that before recommending an approach."
          }
        ],
        "items": []
      },
      {
        "title": "Transition Into Your Recommendation",
        "intro": [],
        "blocks": [
          {
            "kind": "bullet",
            "text": "Got it. Based on what you’ve shared, here’s how I’d approach it."
          },
          {
            "kind": "bullet",
            "text": "Okay, that gives me enough context."
          },
          {
            "kind": "bullet",
            "text": "I see. In that case, I probably wouldn’t automate everything at once."
          },
          {
            "kind": "bullet",
            "text": "That makes sense. I think the first thing I’d solve is ___."
          },
          {
            "kind": "bullet",
            "text": "Based on that, I’d keep the process simple."
          },
          {
            "kind": "bullet",
            "text": "Okay, so rather than replacing everything, I’d probably start with ___."
          }
        ],
        "items": []
      },
      {
        "title": "Challenge an Idea Politely",
        "intro": [],
        "blocks": [
          {
            "kind": "bullet",
            "text": "I see what you’re trying to do. My only concern would be ___."
          },
          {
            "kind": "bullet",
            "text": "That could work, although I think there may be a simpler approach."
          },
          {
            "kind": "bullet",
            "text": "I understand the idea. Before we do that, I’d want to understand why the current process isn’t working."
          },
          {
            "kind": "bullet",
            "text": "We could build it that way. I’d just be concerned about maintaining it later."
          },
          {
            "kind": "bullet",
            "text": "That makes sense from a business perspective. Technically, I might approach it a little differently."
          }
        ],
        "items": []
      },
      {
        "title": "Wrap Up a Topic",
        "intro": [],
        "blocks": [
          {
            "kind": "bullet",
            "text": "Got it. I think I understand that part now."
          },
          {
            "kind": "bullet",
            "text": "Okay, that makes sense. Let’s move to the next part."
          },
          {
            "kind": "bullet",
            "text": "Perfect. That answers my question."
          },
          {
            "kind": "bullet",
            "text": "Thanks, that gives me enough context."
          },
          {
            "kind": "bullet",
            "text": "Okay, so we’ve established ___."
          },
          {
            "kind": "bullet",
            "text": "Great. I think we can work with that."
          }
        ],
        "items": []
      },
      {
        "title": "Put It Together Naturally",
        "intro": [],
        "blocks": [
          {
            "kind": "desc",
            "text": "How the phrases sound in a real exchange. Notice that every reply acknowledges, then asks the next useful question."
          },
          {
            "kind": "client",
            "text": "Right now someone manually checks Facebook leads and sends them to whichever salesperson is available."
          },
          {
            "kind": "you",
            "text": "Oh, I see. So someone is still manually deciding who gets each lead. How do they decide which salesperson should take it?"
          },
          {
            "kind": "client",
            "text": "Usually based on who’s available."
          },
          {
            "kind": "you",
            "text": "Got it. And what happens if that person doesn’t respond?"
          },
          {
            "kind": "client",
            "text": "That’s actually one of our problems. Sometimes nobody notices until later."
          },
          {
            "kind": "you",
            "text": "Okay, that makes sense. So the bigger issue isn’t just lead assignment. It’s also making sure someone actually follows up after the assignment. Is that right?"
          }
        ],
        "items": []
      },
      {
        "title": "Useful Follow-up Triggers",
        "intro": [],
        "blocks": [
          {
            "kind": "desc",
            "text": "Certain words are signals. When you hear one, you know what to ask next."
          },
          {
            "kind": "table",
            "rows": [
              [
                "If they say…",
                "Ask about…"
              ],
              [
                "“usually”",
                "The exception"
              ],
              [
                "“someone”",
                "Who owns it"
              ],
              [
                "“the system”",
                "Which system"
              ],
              [
                "“it works”",
                "How they measure that"
              ],
              [
                "“we need AI”",
                "What part actually requires judgment or understanding"
              ],
              [
                "A specific tool",
                "The business problem, before agreeing with the tool"
              ]
            ]
          }
        ],
        "items": []
      },
      {
        "title": "Your Voice Check",
        "intro": [],
        "blocks": [
          {
            "kind": "tip",
            "label": "Before you answer, ask yourself",
            "text": "Could I actually say this out loud? Am I responding to what they just said? Am I asking the next useful question instead of showing how technical I am? Am I treating an assumption as a fact?"
          },
          {
            "kind": "tip",
            "label": "Vary your acknowledgements",
            "text": "Don’t say “Got it” after every answer. Mix in “Okay,” “I see,” “That makes sense,” “Thanks for sharing that,” or sometimes skip the acknowledgement completely and ask the natural next question."
          }
        ],
        "items": []
      }
    ]
  },
  {
    "id": "tips",
    "title": "Learnings & Tips for Every Call",
    "subtitle": "What real interviews and discovery calls teach: how to prepare, what to say, and how to handle pushback.",
    "cover": [
      "Lessons from real calls, kept in one place.",
      "Read this before every interview or discovery call. It starts with the one framework to use everywhere and how a business systems engineer applies it, then what worked, what didn’t, the AI-value cheat sheet, the objection scripts, and the Automation Strategist training prompt.",
      "Add a new lesson after every call while it’s still fresh."
    ],
    "sections": [
      {
        "title": "Think Like a Strategist",
        "intro": [
          "One framework for every call and every build: Problem → Cause → Solution → Impact → Measurement.",
          "Use the same five steps to run a discovery call, design a GHL or n8n build, and answer interview questions. The Discovery & Consultation Guide (document 2) goes deeper on each step."
        ],
        "blocks": [],
        "items": [
          {
            "heading": "The 5 steps, and the mistake to avoid at each one",
            "blocks": [
              {
                "kind": "table",
                "rows": [
                  [
                    "Step",
                    "Ask yourself",
                    "Avoid"
                  ],
                  [
                    "1  Problem",
                    "What’s happening in the business, and what do they want to improve?",
                    "Starting with tools"
                  ],
                  [
                    "2  Cause",
                    "Why is it happening? What’s the real bottleneck?",
                    "Assuming the cause without checking"
                  ],
                  [
                    "3  Solution",
                    "What’s the simplest fix that works?",
                    "Automating everything. Sometimes fixing the process is enough."
                  ],
                  [
                    "4  Impact",
                    "Why does fixing it matter to the business?",
                    "Selling workflows instead of the outcome they support"
                  ],
                  [
                    "5  Measurement",
                    "How will we know it worked?",
                    "Stopping after implementation. Test, measure, optimize."
                  ]
                ]
              }
            ]
          },
          {
            "heading": "What it sounds like in a real call",
            "blocks": [
              {
                "kind": "desc",
                "text": "Example: a client is getting leads but not enough appointments."
              },
              {
                "kind": "kv",
                "label": "1  Problem",
                "text": "“We’re getting leads, but not enough appointments.”"
              },
              {
                "kind": "kv",
                "label": "2  Cause",
                "text": "“Are leads not qualified, or is the team responding too slowly?”"
              },
              {
                "kind": "kv",
                "label": "3  Solution",
                "text": "“If response time is the issue, I’d improve lead routing and follow-up in GHL.”"
              },
              {
                "kind": "kv",
                "label": "4  Impact",
                "text": "“This could reduce missed opportunities and help the team book more appointments.”"
              },
              {
                "kind": "kv",
                "label": "5  Measurement",
                "text": "“I’d compare response times and lead-to-appointment conversion before and after.”"
              }
            ]
          },
          {
            "heading": "Designing a GHL or n8n build? Same steps, one extra question",
            "blocks": [
              {
                "kind": "desc",
                "text": "Before building anything, ask the five steps as questions. Builds add one: “What if?” Every automation needs a plan for when something fails."
              },
              {
                "kind": "table",
                "rows": [
                  [
                    "Ask",
                    "Meaning",
                    "Same as step"
                  ],
                  [
                    "Why?",
                    "Why does the business need this?",
                    "Problem & Impact"
                  ],
                  [
                    "What?",
                    "What exactly needs improvement?",
                    "Cause"
                  ],
                  [
                    "How?",
                    "How should we solve it?",
                    "Solution"
                  ],
                  [
                    "What if?",
                    "What happens if something fails?",
                    "Added for builds"
                  ],
                  [
                    "Did it work?",
                    "How do we measure success?",
                    "Measurement"
                  ]
                ]
              }
            ]
          },
          {
            "heading": "Answering “How do you approach a problem?”: remember 4 words",
            "blocks": [
              {
                "kind": "desc",
                "text": "Don’t memorize the answer word for word. Remember four keywords; they’re the same five steps said out loud."
              },
              {
                "kind": "kv",
                "label": "Understand",
                "text": "the problem and what’s causing it (steps 1–2)"
              },
              {
                "kind": "kv",
                "label": "Strategize",
                "text": "the simplest reliable solution, and why it matters (steps 3–4)"
              },
              {
                "kind": "kv",
                "label": "Execute",
                "text": "build and test it"
              },
              {
                "kind": "kv",
                "label": "Own",
                "text": "measure the result and keep improving (step 5)"
              },
              {
                "kind": "desc",
                "text": "A natural answer to practice:"
              },
              {
                "kind": "you",
                "text": "“First, I’d understand the problem and what the business is trying to achieve. Then I’d look at the existing process to identify what’s actually causing the issue. From there, I’d recommend the simplest reliable solution, whether that’s improving an existing workflow, building an automation, or fixing the process itself. After implementation, I’d measure the results to make sure we’re solving the actual business problem.”"
              }
            ]
          }
        ]
      },
      {
        "title": "Think Like a Business Systems Engineer",
        "intro": [
          "Don’t start with tools. Start with the business problem.",
          "A workflow builder asks what to automate. A business systems engineer understands how the business runs, finds the bottleneck, designs a reliable system, and proves the result."
        ],
        "blocks": [],
        "items": [
          {
            "heading": "Open with the business, not the automation list",
            "blocks": [
              {
                "kind": "table",
                "rows": [
                  [
                    "Workflow builder asks",
                    "Business systems engineer asks"
                  ],
                  [
                    "“What automations do you want me to build?”",
                    "“Can you walk me through your business process, from lead generation through service delivery and customer management?”"
                  ]
                ]
              },
              {
                "kind": "text",
                "text": "The goal is to understand operations, diagnose bottlenecks, design reliable systems, and deliver measurable business value, not simply to automate tasks."
              }
            ]
          },
          {
            "heading": "Map the full business journey before opening GHL",
            "blocks": [
              {
                "kind": "desc",
                "text": "Marketing and lead generation → Lead capture and qualification → Sales and appointments → Conversion → Onboarding and fulfillment → Support and retention → Reporting and optimization."
              },
              {
                "kind": "text",
                "text": "For every stage, write down:"
              },
              {
                "kind": "kv",
                "label": "Who",
                "text": "the owner and the tools they use"
              },
              {
                "kind": "kv",
                "label": "Start",
                "text": "the trigger and the inputs"
              },
              {
                "kind": "kv",
                "label": "Flow",
                "text": "the decisions and the handoffs"
              },
              {
                "kind": "kv",
                "label": "Risk",
                "text": "the exceptions and failure points"
              },
              {
                "kind": "kv",
                "label": "Result",
                "text": "the success metric"
              }
            ]
          },
          {
            "heading": "Cover five areas in every discovery call",
            "blocks": [
              {
                "kind": "table",
                "rows": [
                  [
                    "Area",
                    "Core question"
                  ],
                  [
                    "Business goals",
                    "What problem are you solving, and what outcome matters?"
                  ],
                  [
                    "Current process",
                    "Walk me through how the business operates today."
                  ],
                  [
                    "Existing systems",
                    "Which CRM, calling tools, software, and integrations are in place?"
                  ],
                  [
                    "Bottlenecks",
                    "Where are leads, time, revenue, or productivity being lost?"
                  ],
                  [
                    "Requirements",
                    "What are the priorities, budget, timeline, constraints, and metrics?"
                  ]
                ]
              },
              {
                "kind": "desc",
                "text": "Three follow-ups that work in almost any call:"
              },
              {
                "kind": "bullet",
                "text": "“What happens when this fails?”"
              },
              {
                "kind": "bullet",
                "text": "“Who owns the next action?”"
              },
              {
                "kind": "bullet",
                "text": "“How do you measure success?”"
              },
              {
                "kind": "note",
                "text": "On a straightforward hiring call, pick the areas the job description doesn’t already answer (see 4.1)."
              }
            ]
          },
          {
            "heading": "Run every project through six stages",
            "blocks": [
              {
                "kind": "desc",
                "text": "The same five steps from section 1, stretched across a full project."
              },
              {
                "kind": "table",
                "rows": [
                  [
                    "Stage",
                    "What you do",
                    "Section 1 step"
                  ],
                  [
                    "Discover",
                    "Understand objectives, stakeholders, and the current process",
                    "Problem"
                  ],
                  [
                    "Diagnose",
                    "Find the bottlenecks, manual work, and risks",
                    "Cause"
                  ],
                  [
                    "Architect",
                    "Define CRM structure, workflows, data flows, integrations, and boundaries",
                    "Solution"
                  ],
                  [
                    "Implement",
                    "Build in phases with maintainable, reusable components",
                    "Solution"
                  ],
                  [
                    "Validate",
                    "Test normal cases, edge cases, failures, and acceptance criteria",
                    "Measurement"
                  ],
                  [
                    "Optimize",
                    "Monitor outcomes, improve performance, document the system",
                    "Measurement"
                  ]
                ]
              },
              {
                "kind": "tip",
                "label": "Fix the process before automating it",
                "text": "Don’t automate an inefficient process without first checking whether it should be simplified or redesigned."
              }
            ]
          },
          {
            "heading": "Pick the tool from the requirement, not from habit",
            "blocks": [
              {
                "kind": "table",
                "rows": [
                  [
                    "Tool",
                    "Use it for"
                  ],
                  [
                    "GoHighLevel",
                    "CRM, leads, sales, calendars, messaging, native workflows"
                  ],
                  [
                    "n8n",
                    "Complex orchestration, APIs, data transformation, integrations"
                  ],
                  [
                    "Zapier",
                    "Straightforward integrations with strong native connectors"
                  ],
                  [
                    "Supabase",
                    "Structured database, authentication, application backend"
                  ],
                  [
                    "Vercel",
                    "Web app deployment and hosting"
                  ],
                  [
                    "Claude Code",
                    "Development, architecture, debugging, documentation"
                  ],
                  [
                    "Hermes",
                    "AI assistant, research, operational coordination, scheduled tasks"
                  ]
                ]
              },
              {
                "kind": "tip",
                "label": "Decision rule",
                "text": "Prefer GHL-native features when they’re enough. Add an external tool only when a specific requirement justifies it."
              }
            ]
          },
          {
            "heading": "Present outcomes, not features",
            "blocks": [
              {
                "kind": "desc",
                "text": "Example: a sales team that follows up by hand."
              },
              {
                "kind": "kv",
                "label": "Problem",
                "text": "Staff follow up manually, so responses are slow and appointments get missed."
              },
              {
                "kind": "kv",
                "label": "Solution",
                "text": "GHL lead routing, automated reminders, no-show recovery, and pipeline tracking."
              },
              {
                "kind": "kv",
                "label": "Expected benefit",
                "text": "Faster response, less manual effort, better appointment management."
              },
              {
                "kind": "kv",
                "label": "KPIs",
                "text": "Lead response time, booking rate, show-up rate, conversion rate."
              },
              {
                "kind": "note",
                "text": "Benefits stay hypotheses until they’re measured. Say “expected,” not “will.”"
              }
            ]
          },
          {
            "heading": "Portfolio project: one complete GHL business journey",
            "blocks": [
              {
                "kind": "text",
                "text": "Build an end-to-end CRM and operations system for a fictional credit repair and funding company: lead capture, referral partner acquisition, qualification, appointments, onboarding, document requests, funding stages, follow-ups, and reporting. Use synthetic data with proper security and consent safeguards."
              },
              {
                "kind": "desc",
                "text": "Document the whole lifecycle: Discovery → Process map → Architecture → Implementation → QA → Demo video → Case study."
              },
              {
                "kind": "tip",
                "label": "Label it honestly",
                "text": "Call it a self-directed demonstration, not a client engagement. Don’t invent revenue gains or outcomes. Never claim you delivered an identical client system; describe the parts you genuinely built, your transferable experience, and the proposed architecture or working demo."
              }
            ]
          },
          {
            "heading": "Practice drill before the next call",
            "blocks": [
              {
                "kind": "bullet",
                "text": "Run a mock discovery call before opening GHL."
              },
              {
                "kind": "bullet",
                "text": "Draw the current-state and future-state business journeys."
              },
              {
                "kind": "bullet",
                "text": "Define pipelines, custom fields, triggers, conditions, actions, owners, and exceptions."
              },
              {
                "kind": "bullet",
                "text": "Build and test the journey with synthetic contacts."
              },
              {
                "kind": "bullet",
                "text": "Record a 3–5 minute non-technical walkthrough: problem → design → workflow → business outcome."
              },
              {
                "kind": "tip",
                "label": "Remember",
                "text": "Understand → Diagnose → Design → Build → Validate → Optimize."
              }
            ]
          }
        ]
      },
      {
        "title": "Before the Call",
        "intro": [
          "Preparation decides most calls before they start.",
          "Study the role, know your evidence, and decide in advance what you can honestly claim."
        ],
        "blocks": [],
        "items": [
          {
            "heading": "Study every requirement in the job description",
            "blocks": [
              {
                "kind": "text",
                "text": "Be prepared for questions about anything mentioned in the job description."
              },
              {
                "kind": "text",
                "text": "For example, if they mention Meta Pixel, understand how it works, what it tracks, how it connects with GHL, and the basic setup and troubleshooting process."
              },
              {
                "kind": "desc",
                "text": "But always be transparent about your actual experience:"
              },
              {
                "kind": "you",
                "text": "“That’s something I understand and I’m familiar with how it works, but I haven’t personally implemented it hands-on yet. I don’t want to claim experience I don’t have. If it’s something required for the role, I’m comfortable researching, testing, and learning it properly.”"
              }
            ]
          },
          {
            "heading": "Know your evidence before you say “I built this”",
            "blocks": [
              {
                "kind": "text",
                "text": "Be ready to explain the trigger, key conditions, the data, what you personally configured, one test, and the visible result. If it was a practice build, say that. If you can’t support a result, explain what you would measure instead."
              },
              {
                "kind": "table",
                "rows": [
                  [
                    "Say",
                    "Use it for"
                  ],
                  [
                    "“I built”",
                    "Work you actually completed"
                  ],
                  [
                    "“I practiced”",
                    "Exercises and practice builds"
                  ],
                  [
                    "“I would”",
                    "A proposed approach you haven’t implemented"
                  ]
                ]
              },
              {
                "kind": "note",
                "text": "Use a specific credential, client name, rate, or availability only when you can confirm it is accurate and current."
              }
            ]
          },
          {
            "heading": "Keep practice builds labelled as practice",
            "blocks": [
              {
                "kind": "text",
                "text": "My learning work includes orders tracked in Google Sheets, a customer request form connected to ClickUp and Gmail, supplier-file processing, and customer-record comparison. These are practice projects, not evidence of client ROI or production reliability."
              },
              {
                "kind": "text",
                "text": "Explain the part I configured and tested. The onboarding orchestrator was assistant-built and I tested it, so I don’t present it as a workflow I independently designed from scratch."
              }
            ]
          }
        ]
      },
      {
        "title": "During the Call",
        "intro": [
          "Follow their story, not your script.",
          "Answer what they asked, keep it relevant to the role, and save your strongest point for the end."
        ],
        "blocks": [],
        "items": [
          {
            "heading": "Keep the questions relevant and straightforward",
            "blocks": [
              {
                "kind": "text",
                "text": "Some clients prefer a straightforward conversation without too many questions. Their time is valuable, so focus on questions that are directly relevant to the role and based on the job description."
              },
              {
                "kind": "text",
                "text": "If their existing systems and workflows are already built, there’s no need to map out their entire business process. Focus on what they actually need from the person they’re hiring."
              }
            ]
          },
          {
            "heading": "Listen to the question. Answer exactly that. Explain your reasoning. Then stop.",
            "blocks": [
              {
                "kind": "text",
                "text": "Answer the question they actually asked, give the reason behind your answer, and let them ask the follow-up. A short, specific answer beats a long one that lists every tool."
              },
              {
                "kind": "tip",
                "label": "Prioritize this over another AI tool",
                "text": "Answering exactly what was asked is the most valuable interview habit to build right now."
              }
            ]
          },
          {
            "heading": "Be ready when they ask, “Is there anything else you’d like to share?”",
            "blocks": [
              {
                "kind": "desc",
                "text": "Don’t waste this opportunity by repeating your introduction. Use it to explain what makes you different."
              },
              {
                "kind": "you",
                "text": "“Yeah, one thing I’d add is that I’m not limited to HighLevel. GHL is one of my strongest platforms, but I also work with n8n, Zapier, APIs, webhooks, AI tools like Claude, and custom development when needed.”"
              },
              {
                "kind": "you",
                "text": "“So if something can’t be solved cleanly inside HighLevel, I can look outside the platform and figure out a better way to connect or build it.”"
              },
              {
                "kind": "you",
                "text": "“I think that’s one of the main things I can bring to the role. I’m not just looking at one tool. I’m looking at the system as a whole and finding the best way to make it work.”"
              }
            ]
          },
          {
            "heading": "Close every call with a clear next step",
            "blocks": [
              {
                "kind": "bullet",
                "text": "Summarize the main problem and confirm it."
              },
              {
                "kind": "bullet",
                "text": "Say what you will send and when."
              },
              {
                "kind": "bullet",
                "text": "Confirm who else needs to see it before a decision is made."
              }
            ]
          }
        ]
      },
      {
        "title": "Speak Clearly",
        "intro": [
          "The goal isn’t to never say “umm” again.",
          "Even experienced speakers use fillers occasionally. Aim to speak clearly, avoid unnecessary repetition, and stay comfortable with silence."
        ],
        "blocks": [],
        "items": [
          {
            "heading": "Practice fluency and structure separately",
            "blocks": [
              {
                "kind": "text",
                "text": "Speaking fluently is one skill. Understanding, organizing, and delivering a technical answer is another. Practice them separately and both improve faster."
              },
              {
                "kind": "tip",
                "label": "The real goal",
                "text": "You don’t need to sound like a native English speaker. You need to be someone a business owner can trust to understand a requirement, solve the problem, and communicate the outcome."
              }
            ]
          },
          {
            "heading": "Replace “umm” with silence",
            "blocks": [
              {
                "kind": "text",
                "text": "Instead of filling every gap with sound, give yourself 1–2 seconds to think."
              },
              {
                "kind": "table",
                "rows": [
                  [
                    "Old habit",
                    "New habit"
                  ],
                  [
                    "“So, umm, I think we can, umm, use conditional logic, and then, umm, redirect them…”",
                    "“I’d use conditional logic. [Pause] Qualified leads go to the main calendar. [Pause] Unqualified leads go to a separate calendar.”"
                  ]
                ]
              },
              {
                "kind": "text",
                "text": "Silence isn’t a mistake. It gives you time to think and makes your explanation easier to follow."
              }
            ]
          },
          {
            "heading": "Use a phrase only when you need time",
            "blocks": [
              {
                "kind": "desc",
                "text": "Don’t memorize all of them. Start with three."
              },
              {
                "kind": "table",
                "rows": [
                  [
                    "Situation",
                    "What to say"
                  ],
                  [
                    "You need a moment",
                    "“Good question. Let me think.”"
                  ],
                  [
                    "You want to organize your answer",
                    "“I’d approach it in three steps.”"
                  ],
                  [
                    "You’re explaining something complex",
                    "“Here’s how it would work.”"
                  ],
                  [
                    "You didn’t understand",
                    "“Could you clarify that last part?”"
                  ],
                  [
                    "You lose your train of thought",
                    "“The main point is…”"
                  ],
                  [
                    "You don’t know the answer",
                    "“I haven’t done that exact setup, but here’s how I’d investigate it.”"
                  ]
                ]
              },
              {
                "kind": "tip",
                "label": "Don’t swap every “umm” for “Good question”",
                "text": "Use a phrase only when it adds meaning. Otherwise, silence is better."
              }
            ]
          },
          {
            "heading": "Speak in shorter sentences",
            "blocks": [
              {
                "kind": "text",
                "text": "Fillers aren’t the only habit. Restarting sentences does the same damage:"
              },
              {
                "kind": "bullet",
                "text": "“So what I’m trying to say is…”"
              },
              {
                "kind": "bullet",
                "text": "“I mean, I mean…”"
              },
              {
                "kind": "bullet",
                "text": "“Something like that…”"
              },
              {
                "kind": "text",
                "text": "Instead of explaining the whole automation in one long sentence, explain one step at a time. For technical questions:"
              },
              {
                "kind": "you",
                "text": "“First, I understand the problem. [Pause] Then I build the simplest solution. [Pause] Finally, I test and measure the result.”"
              },
              {
                "kind": "note",
                "text": "These are the four keywords from 1.4, said in short sentences. That’s enough to start; expand only if they ask for more detail."
              }
            ]
          },
          {
            "heading": "Your speaking practice focus",
            "blocks": [
              {
                "kind": "tip",
                "label": "Practice one habit at a time",
                "text": "Replace “umm” with a one-second silent pause while answering technical questions out loud. Master that before worrying about advanced vocabulary or sounding more fluent."
              },
              {
                "kind": "text",
                "text": "Why it works: interview feedback said I was clearer when I slowed down and stopped trying to explain everything at once."
              }
            ]
          }
        ]
      },
      {
        "title": "Lessons From Real Builds",
        "intro": [
          "Mistakes I already paid for, so I don’t repeat them.",
          "Use these as stories in interviews: what happened, what I changed, and what I check now."
        ],
        "blocks": [],
        "items": [
          {
            "heading": "Always test the full journey, not just the data",
            "blocks": [
              {
                "kind": "text",
                "text": "On a GHL webinar checkout build, the tracking looked fine at first. It turned out hard-coded UTMs were giving us incorrect attribution. I fixed the links, tested from the landing page all the way to checkout, and added a checklist so it wouldn’t happen again."
              },
              {
                "kind": "tip",
                "label": "The lesson",
                "text": "Don’t assume something is working just because the data looks okay. Test the full journey end to end."
              }
            ]
          },
          {
            "heading": "A new execution ID is not duplicate prevention",
            "blocks": [
              {
                "kind": "text",
                "text": "In an onboarding workflow test, tasks and a manager email completed before the employee email failed. A new form submission then created another full task batch."
              },
              {
                "kind": "tip",
                "label": "The lesson",
                "text": "Safe recovery needs persistent business references. Recover only the missing step instead of rerunning everything, and identify the original request by a stable key, not the run ID."
              }
            ]
          }
        ]
      },
      {
        "title": "AI Value Cheat Sheet",
        "intro": [
          "The core message: AI speeds up execution. You own the strategy, the validation, and the outcome.",
          "Clients are starting to ask why they need you when AI can build it. Don’t get defensive and don’t dismiss AI, since you use it yourself. Agree first, then show where business judgment and accountability come in. Full answers are in section 4 of the Interview Master Sheet."
        ],
        "blocks": [],
        "items": [
          {
            "heading": "The 5 things to remember",
            "blocks": [
              {
                "kind": "desc",
                "text": "When a client questions your value against AI, every answer comes back to one of these messages."
              },
              {
                "kind": "table",
                "rows": [
                  [
                    "Question",
                    "Key message"
                  ],
                  [
                    "Why hire you?",
                    "Strategy and ownership"
                  ],
                  [
                    "Better than AI?",
                    "Business judgment"
                  ],
                  [
                    "Relying on AI?",
                    "Validation and accountability"
                  ],
                  [
                    "Prove your value?",
                    "Measurable outcomes"
                  ],
                  [
                    "Why pay you?",
                    "Save time and reduce operational burden"
                  ]
                ]
              }
            ]
          }
        ]
      },
      {
        "title": "Objection Handling",
        "intro": [
          "The main rule: don’t immediately fight the objection.",
          "An objection is usually a question in disguise. Every script below follows the same four steps: 1. Acknowledge it (“I understand” / “That makes sense”). 2. Ask what’s really behind it, then let them answer. 3. Address the real concern, not the surface one. 4. Agree on a clear next step before the call ends."
        ],
        "blocks": [],
        "items": [
          {
            "heading": "“That’s too much” / “I can’t afford it”",
            "blocks": [
              {
                "kind": "desc",
                "text": "What it usually means: either a real budget limit or doubt that the result is worth the price. Find out which one before you answer, because each needs a different response."
              },
              {
                "kind": "client",
                "text": "“That’s too much for me.”"
              },
              {
                "kind": "you",
                "text": "“I understand. Is it more of a budget issue right now, or are you still unsure if the value is worth the investment?”"
              },
              {
                "kind": "cue",
                "text": "If it’s budget"
              },
              {
                "kind": "you",
                "text": "“Got it, that makes sense. If we could split the payment into something more manageable, would that make it easier for you to move forward?”"
              },
              {
                "kind": "cue",
                "text": "If yes"
              },
              {
                "kind": "you",
                "text": "“Okay, then let’s see what payment structure makes sense for both sides.”"
              },
              {
                "kind": "cue",
                "text": "If it’s value"
              },
              {
                "kind": "you",
                "text": "“That’s fair. What result would make this worth it for you?”"
              },
              {
                "kind": "cue",
                "text": "Then tie the scope back to that result: hours saved, leads no longer missed, faster follow-up."
              },
              {
                "kind": "note",
                "text": "If budget is the real issue, reduce the scope, not your rate."
              }
            ]
          },
          {
            "heading": "“I’m not ready yet”",
            "blocks": [
              {
                "kind": "desc",
                "text": "What it usually means: something still feels unresolved, like timing, clarity, or confidence. Find out what “ready” looks like to them. Some of it may be solvable as part of the project itself."
              },
              {
                "kind": "client",
                "text": "“I don’t think I’m ready yet.”"
              },
              {
                "kind": "you",
                "text": "“Yeah, I understand. What do you feel needs to happen first before you’d be ready?”"
              },
              {
                "kind": "cue",
                "text": "Let them answer, then"
              },
              {
                "kind": "you",
                "text": "“Got it. The reason I’m asking is because some of those things might actually be something we can solve as part of the project.”"
              },
              {
                "kind": "cue",
                "text": "If appropriate"
              },
              {
                "kind": "you",
                "text": "“So instead of waiting until everything is perfect, we could start with the most important piece first and build from there.”"
              }
            ]
          },
          {
            "heading": "“I need to talk to my partner / team”",
            "blocks": [
              {
                "kind": "desc",
                "text": "What it usually means: another decision-maker is involved, or it’s a polite pause. Either way, help them make the case instead of waiting on a conversation you’re not part of."
              },
              {
                "kind": "client",
                "text": "“I need to talk to my partner first.”"
              },
              {
                "kind": "you",
                "text": "“Of course, that makes sense. What do you think they’ll want to know before making a decision?”"
              },
              {
                "kind": "cue",
                "text": "Let them answer, then"
              },
              {
                "kind": "you",
                "text": "“Got it. I can give you everything you need to explain it to them. Or if it’s easier, I’m happy to jump on a quick call with both of you so we can answer everything together.”"
              }
            ]
          },
          {
            "heading": "“Can you send me something to review?”",
            "blocks": [
              {
                "kind": "desc",
                "text": "What it usually means: often a soft exit. Surface the real doubt while you’re still on the call, then lock in a follow-up time before you hang up."
              },
              {
                "kind": "client",
                "text": "“Can you send me something to review?”"
              },
              {
                "kind": "you",
                "text": "“Yeah, absolutely. Before I send it, though, is there anything specific you’re still unsure about?”"
              },
              {
                "kind": "cue",
                "text": "Let them answer, then"
              },
              {
                "kind": "you",
                "text": "“Got it. Let me clarify that now so when I send everything over, you’ll have exactly what you need to make a decision.”"
              },
              {
                "kind": "cue",
                "text": "Then close"
              },
              {
                "kind": "you",
                "text": "“I’ll send you the details after the call. When would be a good time for us to follow up?”"
              }
            ]
          }
        ]
      },
      {
        "title": "Automation Strategist Training Prompt",
        "intro": [
          "Master Training Prompt | GoHighLevel, n8n, AI & Business Systems",
          "Use this to train consulting judgment, not just implementation. It teaches one concept at a time and waits for your answer."
        ],
        "blocks": [
          {
            "kind": "kv",
            "label": "How to use",
            "text": "Copy everything in the gray box into a new AI conversation. Attach 1 - Interview Master Sheet and 2 - Discovery & Consultation Guide (the “Consultation Sheet”) when available. The assistant should teach progressively and ask only one training question at a time."
          },
          {
            "kind": "prompt",
            "lines": [
              "## AUTOMATION STRATEGIST: MASTER TRAINING PROMPT",
              "## ROLE",
              "Act as a senior business automation strategist, GoHighLevel solutions architect, AI systems consultant, and experienced technical advisor. Train me to become a strategic automation consultant, not simply a technical implementer. Bring expertise in sales, marketing, operations, customer experience, profitability, process optimization, CRM, automation, AI agents, and custom software.",
              "## MY BACKGROUND",
              "I am an AI Automation & Business Systems Engineer specializing in GoHighLevel (CRM, pipelines, funnels, workflows, calendars, communications); n8n, Zapier, APIs, webhooks; Claude and other AI models; AI agents; custom applications and integrations; and business operations and process improvement.",
              "I may attach my Master Sheet and Consultation Sheet PDFs. Analyze them thoroughly for my experience, existing answers, consultation approach, strengths, and gaps. Do not invent experience or unnecessarily rewrite answers that are already strong. If PDFs are not attached, say so and proceed using the background above.",
              "## CORE PHILOSOPHY",
              "AI can increasingly build workflows, apps, and integrations. Technical implementation alone is not a sufficient competitive advantage. My value comes from:",
              "• Understanding the business and thinking strategically.",
              "• Finding root causes rather than treating symptoms.",
              "• Knowing what should and should not be automated.",
              "• Prioritizing by business impact.",
              "• Designing reliable end-to-end systems and journeys.",
              "• Anticipating failures, exceptions, and operational risks.",
              "• Connecting technical decisions to revenue, efficiency, and experience.",
              "• Measuring results, improving systems, and owning outcomes rather than task completion.",
              "## PART 1: STRATEGIC THINKING",
              "Teach how experienced consultants analyze business models and revenue flow; lead generation and conversion; sales and pipeline management; acquisition and retention; employee accountability; bottlenecks; data quality and reporting; automation opportunities; financial impact and ROI; and priorities and constraints.",
              "For EACH topic explain what to understand, why it matters, high-value questions, warning signs, common mistakes, diagnostic approach, and a realistic GoHighLevel/n8n example.",
              "## PART 2: DISCOVERY CALL MASTERY",
              "Train me to prepare for calls, set an agenda, ask concise relevant questions, find the real problem, understand the current process efficiently, decide if automation is necessary, discuss impact, handle clients using AI, explain recommendations without jargon, and close with next steps. Build a reusable discovery framework for agencies, coaches, consultants, and service businesses. Respect client time; do not ask questions that the job description or provided materials already answer.",
              "## PART 3: SOLUTION ARCHITECTURE",
              "For each solution evaluate: business objective; current and desired workflows; trigger and entry conditions; data sources and system of record; business rules and routing; integrations; failure handling and retries; deduplication and idempotency; security and permissions; human approvals and escalation; monitoring; reporting; testing and acceptance criteria; maintenance; and scale.",
              "Explain when to use GHL, n8n, Zapier, AI agents, custom apps, and manual processes. Challenge overengineering. Recommend the simplest reliable architecture, with tradeoffs.",
              "## PART 4: BUSINESS IMPACT & ROI",
              "Teach how to evaluate time saved, labor cost, lead response speed, conversion, missed opportunities, retention, errors, capacity, and implementation/maintenance costs. Use transparent assumptions, baseline versus target, and sensitivity ranges. Never promise unsupported revenue gains.",
              "## PART 5: REAL-WORLD CASE STUDIES",
              "Use these realistic cases:",
              "• Cleaning company receives leads but struggles to book.",
              "• Coaching business has duplicate GHL workflows and enrollment errors.",
              "• Agency has unreliable attribution and inaccurate CRM reporting.",
              "• Business wants AI agents but has no documented sales process.",
              "• Company uses overlapping automation tools.",
              "• Client believes Claude can replace an automation specialist.",
              "• Automations run but the business cannot measure performance.",
              "For each case, let me diagnose, ask discovery questions, identify root-cause hypotheses, prioritize, propose an architecture, explain expected value, and define success metrics. Do NOT reveal the ideal solution before I finish.",
              "## PART 6: OBJECTIONS & INTERVIEW QUESTIONS",
              "Challenge me with questions such as: Why hire you if Claude builds automations? What differentiates you from a GHL builder? Which process comes first? What if automations already work? How do you measure value? What if your automation fails? How do you avoid overengineering? How can you improve operations without building? How do you resolve conflicting priorities? What would you do in your first 30 days? Coach concise, natural, truthful answers.",
              "## PART 7: MY REUSABLE OPERATING FRAMEWORK",
              "Build 10 practical assets: pre-call checklist; discovery framework; business process audit checklist; opportunity scoring model; architecture checklist; implementation and QA checklist; client communication framework; KPI/ROI framework; post-launch optimization process; and interview preparation framework. Make each concise, actionable, and reusable.",
              "## PART 8: CONTINUOUS TRAINING",
              "In every session: (1) teach one strategic concept; (2) explain a realistic example; (3) give one scenario; (4) ask what I would do; (5) WAIT for my answer; (6) challenge weak assumptions; (7) evaluate reasoning; (8) explain the senior-consultant approach; (9) provide one practical lesson. Score strategic thinking, business understanding, technical judgment, communication, and prioritization. Do not focus on grammar unless clarity suffers.",
              "## NON-NEGOTIABLE RULES",
              "• Treat me as an experienced implementer developing consulting judgment.",
              "• Do not assume automation or AI is always the answer.",
              "• Do not confuse completed workflows with business results.",
              "• Separate hypotheses, assumptions, and verified facts.",
              "• Push back when I lead with tools instead of outcomes.",
              "• Explain tradeoffs, operating ownership, and maintenance implications.",
              "• Prioritize practical decisions over abstract theory.",
              "• Build independent judgment, not dependence on AI.",
              "• Ask only ONE training question at a time and wait for my response.",
              "## START NOW",
              "First analyze attached PDFs, if available. Then rank and explain the 10 most important capabilities for a high-value automation strategist. Begin teaching the highest-priority capability through one realistic business scenario. Ask exactly one training question, then stop and wait."
            ]
          }
        ],
        "items": []
      }
    ]
  }
];

export const GUIDES_BY_ID: Record<string, InterviewGuide> = Object.fromEntries(INTERVIEW_GUIDES.map((g) => [g.id, g]));
