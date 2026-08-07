import type { PresentationSlide } from "@/app/lib/types";

// ───────────── BOOKED — a client booked a call with you ─────────────
// Your flow to run the call: understand → present → close.
export const BOOKED_SLIDES: PresentationSlide[] = [
  {
    n: "01",
    title: "Welcome & Agenda",
    goal: "Set the frame so you lead the call, not them.",
    points: [
      "Thank them for booking and for their time.",
      "Set the agenda: “I'll ask a few questions about your business, then show you exactly how I'd help — and if it's a fit, we'll talk next steps.”",
      "Get a soft yes: “Sound good?” — small agreement early.",
    ],
    say: "“Thanks for hopping on! Quick plan for our 15 minutes: I'll learn about your business, show you where I can help, and we'll see if it's a fit. Sound good?”",
  },
  {
    n: "02",
    title: "Recap & Confirm",
    goal: "Make them feel understood before you pitch anything.",
    points: [
      "Reflect back what you know from their booking/intake.",
      "Ask 2–3 sharp discovery questions to fill gaps (use the Interview → Employer playbook).",
      "Confirm the #1 outcome they want in the next 90 days.",
    ],
    say: "“So if I've got it right — leads come in but follow-up is manual and a few slip through each week. Did I capture that?”",
  },
  {
    n: "03",
    title: "The Real Problem",
    goal: "Name the cost of staying the same — this is the budget.",
    points: [
      "Translate the pain into numbers: lost leads, no-shows, hours of manual work.",
      "“If even 3 leads a month slip through, and each is worth ₱X, that's ₱Y a month walking out the door.”",
      "Keep it their words, not your jargon.",
    ],
  },
  {
    n: "04",
    title: "The Vision (the 'after')",
    goal: "Paint what their business runs like with a system in place.",
    points: [
      "Every lead answered in minutes, automatically.",
      "Clients book themselves; reminders cut no-shows.",
      "Happy customers asked for reviews on autopilot.",
      "One dashboard — they finally see what's working.",
    ],
    say: "“Imagine every lead gets a reply in under 2 minutes, books themselves, and you never chase a no-show again — all running while you do the actual work.”",
  },
  {
    n: "05",
    title: "The Solution — Your GHL System",
    goal: "Present what you'll build, in outcomes (not features).",
    points: [
      "Instant lead follow-up (speed-to-lead).",
      "Self-booking calendar + automatic reminders.",
      "Nurture sequences so no lead is forgotten.",
      "Reviews + database reactivation on autopilot.",
      "All-in-one: replaces 5–6 tools with one system.",
    ],
  },
  {
    n: "06",
    title: "How It Works (the flow)",
    goal: "Show the simple lead journey so it feels achievable.",
    points: [
      "Capture → Instant response → Book → Nurture → Close → Review.",
      "Walk them along the line in their business's language.",
      "Reassure: “You don't manage this — it runs in the background.”",
    ],
  },
  {
    n: "07",
    title: "Proof",
    goal: "Lower risk with evidence. (Fill with your own.)",
    points: [
      "Share a relevant result/case study or a before→after.",
      "Show a quick demo or screenshot of a system you built.",
      "Point to your portfolio / this Learning Hub as proof of skill.",
    ],
    say: "“Here's a system I built for a similar business — this is the follow-up that fires the second a lead comes in.”",
  },
  {
    n: "08",
    title: "What You Get (Packages)",
    goal: "Make the offer concrete: deliverables + timeline.",
    points: [
      "Starter — core build (speed-to-lead, booking, reminders, review request). Live in ~1–2 weeks.",
      "Growth — Starter + nurture, reactivation, pipeline automations, reporting.",
      "Always include: setup, testing, a walkthrough, and a short support window.",
    ],
  },
  {
    n: "09",
    title: "Investment",
    goal: "Present price with calm confidence, anchored to value.",
    points: [
      "Anchor to the cost of the problem first (slide 03), then the price.",
      "State the number plainly — then stop talking.",
      "Offer one simple choice (e.g., Starter vs Growth), not five.",
    ],
    say: "“The Growth build is ₱___ one-time, plus ₱___/mo for the platform. Given you said leads slipping is costing ~₱Y/month, it pays for itself fast.”",
  },
  {
    n: "10",
    title: "Objections",
    goal: "Have calm answers ready so momentum doesn't stall.",
    points: [
      "“Is it hard to use?” → You handle setup; they get a simple walkthrough + support.",
      "“I already pay for tools.” → GHL replaces several, often net-cheaper, all in one place.",
      "“How long?” → Core system live in 1–2 weeks; quick wins even sooner.",
      "“Let me think about it.” → “Totally — what's the one thing you'd want answered to decide?”",
    ],
  },
  {
    n: "11",
    title: "Close & Next Steps",
    goal: "Make the yes easy and the path obvious.",
    points: [
      "Recap the outcome they're buying (not the features).",
      "Propose one concrete first step: onboarding form + kickoff date.",
      "Confirm deposit/terms and book the next touch before you hang up.",
    ],
    say: "“If you're happy, here's what happens next: I'll send a short onboarding form, we lock a kickoff this week, and you'll have lead follow-up live within days. Want to go ahead?”",
  },
];

// ───────────── APPLIED — you applied to a job / client ─────────────
// Your self-pitch when you reached out (interview, proposal, intro call).
export const APPLIED_SLIDES: PresentationSlide[] = [
  {
    n: "01",
    title: "Who I Am (elevator pitch)",
    goal: "20 seconds that make them want to keep listening.",
    points: [
      "Name + what you do + the value in one breath.",
      "Lead with outcomes you create, not your job title.",
      "Keep it confident and concise.",
    ],
    say: "“I'm AJ — I build the systems behind growth. I set up GoHighLevel and automations so businesses follow up with every lead, book more appointments, and stop losing sales to slow response.”",
  },
  {
    n: "02",
    title: "What I Do",
    goal: "Position your services clearly.",
    points: [
      "GHL specialist / strategist — funnels, CRM, pipelines, calendars, workflows.",
      "Automation builder — Zapier, Make, n8n; AI-powered workflows.",
      "I connect the tools so the business runs without manual chasing.",
    ],
  },
  {
    n: "03",
    title: "Why Me",
    goal: "Your differentiators — what others can't say.",
    points: [
      "Business operations background (Amazon → Ops Manager) — I think in systems, not just clicks.",
      "Simple beats complex — I build automations that are easy to manage and actually convert.",
      "Continuous learner — trained under Jaycee Tan; always leveling up (AI automation, vibe coding).",
    ],
  },
  {
    n: "04",
    title: "Proof & Portfolio",
    goal: "Evidence you can do the work.",
    points: [
      "Show built funnels, automations, and CRM setups.",
      "Point to this Learning Hub as a live example of what you ship.",
      "Share a before→after or a result where you can.",
    ],
    say: "“Here's a system I built end-to-end — landing page, pipeline, automated follow-up. Happy to walk you through how it works.”",
  },
  {
    n: "05",
    title: "How I Work",
    goal: "Show you're reliable and easy to work with.",
    points: [
      "Process: understand the goal → map the customer journey → build → test → iterate.",
      "Communication: clear updates, ask before assuming, deliver on time.",
      "Proactive and detail-oriented — I research, test, and find solutions.",
    ],
  },
  {
    n: "06",
    title: "What I Can Do For You",
    goal: "Make it about THEM — tailored value.",
    points: [
      "Reference their business specifically (do quick research first).",
      "Name 1–2 quick wins you'd implement in week one.",
      "Tie it to their goal: more leads, faster follow-up, less manual work.",
    ],
    say: "“For your business, the fastest win is instant lead follow-up + online booking — I could have that live in your first week.”",
  },
  {
    n: "07",
    title: "My Toolstack",
    goal: "Signal range without overwhelming.",
    points: [
      "GoHighLevel (funnels, CRM, workflows, snapshots).",
      "Zapier · Make · n8n for integrations and AI steps.",
      "Claude / vibe coding for custom tools and web builds.",
    ],
  },
  {
    n: "08",
    title: "Questions I'd Ask You",
    goal: "Show genuine interest and that you think strategically.",
    points: [
      "What does success look like for this role/project in 90 days?",
      "Where are leads or customers falling through right now?",
      "What's the most manual, repetitive task you'd love gone?",
    ],
  },
  {
    n: "09",
    title: "Close",
    goal: "End with a clear, confident next step.",
    points: [
      "Restate the value you bring in one line.",
      "State availability and how you'd like to start (trial task, paid pilot, kickoff).",
      "Give a clear CTA: “Happy to do a quick paid test build so you can see how I work.”",
    ],
    say: "“I'd love to help you turn leads into booked appointments on autopilot. I can start this week — want me to do a small test build so you can see the quality first?”",
  },
];
