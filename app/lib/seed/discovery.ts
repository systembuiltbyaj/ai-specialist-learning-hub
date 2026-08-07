import type { QuestionGroup, ExplainPoint } from "@/app/lib/types";

// How to drive the conversation (you're the strategist, not an order-taker).
export const DISCOVERY_FLOW: { n: string; title: string; detail: string }[] = [
  {
    n: "1",
    title: "Open — set the frame",
    detail:
      "Lead with curiosity, not features. “Before I show you anything, I'd love to understand how your business works so I can point to exactly where this fits.” This makes you the expert and takes the pressure off.",
  },
  {
    n: "2",
    title: "Diagnose — ask, then shut up",
    detail:
      "Work through the question groups below. Let them talk 80% of the time. Take notes out loud (“that's great, let me write that down”) — it shows you're listening and buys thinking time.",
  },
  {
    n: "3",
    title: "Reflect back — prove you heard them",
    detail:
      "Summarize: “So leads come from Facebook and referrals, follow-up is you texting manually when you remember, and a few slip through each week — did I get that right?” Agreement here = trust.",
  },
  {
    n: "4",
    title: "Show the gap — name the cost",
    detail:
      "Quantify the pain in their words: lost leads, no-shows, hours of manual follow-up. “If even 3 leads a month slip through and each is worth ₱X, that's ₱Y you're leaving on the table.”",
  },
  {
    n: "5",
    title: "Explain the fix — outcomes, not features",
    detail:
      "Translate GHL into their world using the “What to explain” points. Tie it to 1–2 quick wins specific to THEIR business — not a feature tour.",
  },
  {
    n: "6",
    title: "Next step — small and concrete",
    detail:
      "Don't overwhelm. Propose one first build (“let's start with instant lead follow-up + booking”), agree on a timeline, and set the follow-up. A clear small yes beats a vague big maybe.",
  },
];

// The questions to ASK the client, grouped. You drive — they answer.
export const DISCOVERY_QUESTIONS: QuestionGroup[] = [
  {
    group: "Business & Offer",
    accent: "teal",
    why: "You can't position a system without understanding what they sell and to whom.",
    questions: [
      "Tell me about your business — what do you sell, and who's your ideal customer?",
      "What's a typical customer worth to you (average sale or lifetime value)?",
      "What makes someone choose you over a competitor?",
      "Walk me through what happens from the moment someone's interested to when they pay.",
    ],
  },
  {
    group: "Lead Generation",
    accent: "pink",
    why: "Where leads come from decides where the automation has to plug in.",
    questions: [
      "Where do your leads come from today — Facebook/IG ads, referrals, website, walk-ins?",
      "Roughly how many new leads or enquiries do you get a month?",
      "Which source brings your best customers?",
      "Are you running paid ads now? Who handles them?",
    ],
  },
  {
    group: "Current Process & Tools",
    accent: "blue",
    why: "You need the 'before' picture to show the 'after'.",
    questions: [
      "When a new lead comes in, what happens next — who responds, and how fast?",
      "How are you tracking leads and customers right now (spreadsheet, notebook, a CRM, your head)?",
      "What tools are you paying for today (email, booking, CRM, SMS, social)?",
      "How do people book or buy from you currently?",
    ],
  },
  {
    group: "Pain Points",
    accent: "orange",
    why: "Pain is the budget. Find what's costing them money, time, or sleep.",
    questions: [
      "Where do leads fall through the cracks?",
      "What's the most repetitive, manual task you or your team do every week?",
      "How often do you follow up with a lead that doesn't buy the first time?",
      "What frustrates you most about how things run right now?",
    ],
  },
  {
    group: "Goals & Success",
    accent: "yellow",
    why: "Anchor the project to their outcome, not your feature list.",
    questions: [
      "If we fixed one thing in the next 90 days, what would make the biggest difference?",
      "What does success look like to you — more leads, faster follow-up, less manual work, more reviews?",
      "Where do you want the business to be in 6–12 months?",
    ],
  },
  {
    group: "Decision & Next Steps",
    accent: "purple",
    why: "Qualify gently so you don't build a proposal for someone who can't say yes.",
    questions: [
      "Who else is involved in a decision like this?",
      "Do you have a timeline in mind for getting something set up?",
      "Have you set aside a budget for improving this, or are we still exploring?",
      "If this does what we talked about, what would stop you from moving forward?",
    ],
  },
];

// What to EXPLAIN to a client who's never heard of GHL — feature → outcome, no jargon.
export const EXPLAIN_POINTS: ExplainPoint[] = [
  {
    feature: "All-in-one platform",
    outcome:
      "It replaces 5–6 tools (CRM, funnels, email + SMS, calendar, automation) with one login and one bill — less cost, less chaos.",
  },
  {
    feature: "Instant lead follow-up (speed-to-lead)",
    outcome:
      "The second someone fills a form or calls, they get a text/email automatically — you win the leads your competitors are too slow to answer.",
  },
  {
    feature: "Automated nurture",
    outcome:
      "Leads who aren't ready yet get followed up consistently for weeks, so none are forgotten and more turn into sales.",
  },
  {
    feature: "Online booking + reminders",
    outcome:
      "Customers book themselves and get automatic reminders — fewer no-shows, no phone tag.",
  },
  {
    feature: "Reviews on autopilot",
    outcome:
      "Happy customers are automatically asked for a Google review — more trust and more inbound leads, free.",
  },
  {
    feature: "Database reactivation",
    outcome:
      "We can wake up old leads you already paid for and turn some into new sales — often the fastest win.",
  },
  {
    feature: "One dashboard",
    outcome:
      "Every lead, conversation, and deal in one place — you finally see what's working instead of guessing.",
  },
];

// Quick reminders to keep the call on track.
export const DISCOVERY_DOS: string[] = [
  "Lead with questions — you're diagnosing, not pitching.",
  "Let them talk 80% of the time.",
  "Mirror their words back before you propose anything.",
  "Translate every feature into a result for THEIR business.",
  "End with one small, concrete next step.",
];
export const DISCOVERY_DONTS: string[] = [
  "Don't open with a feature tour or GHL jargon (workflows, triggers, pipelines).",
  "Don't pitch before you've diagnosed the pain.",
  "Don't dump every capability — overwhelm kills deals.",
  "Don't assume budget — ask.",
  "Don't leave without a scheduled next step.",
];
