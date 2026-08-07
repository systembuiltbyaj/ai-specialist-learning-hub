import type { RefCard, AutomationRecipe, Tip, LearnStep } from "@/app/lib/types";

// ───────────── Core building blocks ─────────────
export const GHL_CONCEPTS: RefCard[] = [
  {
    name: "Sub-Account (Location)",
    pill: "Foundation",
    accent: "teal",
    tagline: "One isolated workspace per client.",
    desc: "Each client gets their own Location with separate contacts, automations, and branding. Your agency manages many from the top.",
    tags: ["Per client", "Isolated data", "Agency view"],
  },
  {
    name: "Snapshot",
    pill: "Reuse",
    accent: "purple",
    tagline: "A saved blueprint of a whole account.",
    desc: "Build a system once (workflows, pipelines, funnels, custom values) and load it into any new sub-account in seconds. Your onboarding superpower.",
    tags: ["Templates", "Fast onboarding", "Reusable"],
  },
  {
    name: "Workflow",
    pill: "Automation",
    accent: "yellow",
    tagline: "Trigger → actions, run automatically.",
    desc: "The automation engine. A trigger starts it; actions (SMS, email, tags, pipeline moves, waits, conditions) run in order. Keep them simple and purposeful.",
    tags: ["Trigger", "Actions", "If/else"],
  },
  {
    name: "Pipeline & Opportunity",
    pill: "Sales",
    accent: "blue",
    tagline: "Visual board of your sales stages.",
    desc: "Drag deals (opportunities) across stages: New → Contacted → Booked → Won/Lost. Automations can fire when a deal moves.",
    tags: ["Stages", "Deal value", "Forecasting"],
  },
  {
    name: "Trigger Link",
    pill: "Tracking",
    accent: "pink",
    tagline: "A smart link that fires automation on click.",
    desc: "Drop it in an email/SMS — when the contact clicks, GHL can tag them, start a workflow, or move them in a pipeline. Great for measuring interest.",
    tags: ["Click = intent", "Tag on click", "Segment"],
  },
  {
    name: "Custom Field & Custom Value",
    pill: "Data",
    accent: "orange",
    tagline: "Store business data + reusable variables.",
    desc: "Custom fields hold per-contact data (e.g., 'service interest'); custom values are reusable variables (booking link, business hours) you set once and reference everywhere.",
    tags: ["Personalize", "Reuse", "Merge fields"],
  },
  {
    name: "Smart List",
    pill: "Segments",
    accent: "teal",
    tagline: "A list that updates itself by rule.",
    desc: "Define a rule once ('spent $1,000+', 'tag = hot lead') and contacts flow in/out automatically as they qualify.",
    tags: ["Dynamic", "Behavior-based", "No manual work"],
  },
  {
    name: "Calendar & Booking",
    pill: "Appointments",
    accent: "blue",
    tagline: "Self-booking with reminders built in.",
    desc: "Round-robin or single-user calendars with availability rules, confirmations, and reminder workflows to cut no-shows.",
    tags: ["Self-book", "Reminders", "Round-robin"],
  },
  {
    name: "Funnels & Websites",
    pill: "Pages",
    accent: "yellow",
    tagline: "Landing pages, funnels, and full sites.",
    desc: "Drag-and-drop pages with forms that feed straight into the CRM and trigger automations. No separate page builder needed.",
    tags: ["Drag & drop", "Forms → CRM", "Hosted"],
  },
  {
    name: "Conversation AI & Voice AI",
    pill: "AI",
    accent: "purple",
    tagline: "AI that answers and books for you.",
    desc: "Conversation AI handles first-touch SMS/chat with memory across sessions; Voice AI can answer calls, check the calendar, and book appointments live.",
    tags: ["First response", "Books appts", "24/7"],
  },
];

// ───────────── Automations to build ─────────────
export const GHL_RECIPES: AutomationRecipe[] = [
  {
    title: "Speed-to-Lead (5-minute response)",
    accent: "pink",
    tag: "Highest ROI",
    trigger: "New lead (form / FB-IG ad / landing page)",
    steps: [
      "Instant SMS + email within 1–2 minutes ('Hi {{first_name}}, thanks for reaching out…')",
      "Add tag 'New Lead' + create opportunity in 'New' stage",
      "Notify the rep (internal SMS/Slack) to call",
      "If no reply in 10 min → follow-up SMS; wait, then a 2nd touch",
    ],
    outcome: "Leads get answered in minutes, not hours — the #1 driver of conversion.",
  },
  {
    title: "Appointment Booking + No-Show Recovery",
    accent: "blue",
    trigger: "Calendar booking confirmed",
    steps: [
      "Confirmation SMS + email with details and reschedule link",
      "Reminder at 24h and 1h before",
      "On no-show → 'Sorry we missed you' + rebook link",
      "On attended → mark opportunity 'Booked' / move to next stage",
    ],
    outcome: "Fewer no-shows, more kept appointments — hands-off.",
  },
  {
    title: "Lead Nurture Sequence",
    accent: "yellow",
    trigger: "Tag added ('Nurture') or form submitted",
    steps: [
      "Welcome message + set expectations",
      "Value drip over 5–7 days (tips, proof, FAQ) via email + SMS",
      "Soft CTA to book a call (trigger link)",
      "On click → tag 'Hot Lead' + notify rep + start sales workflow",
    ],
    outcome: "Cold leads warm up automatically until they're ready to buy.",
  },
  {
    title: "Review Request",
    accent: "teal",
    trigger: "Opportunity marked 'Won' / job complete",
    steps: [
      "Wait 1 day → SMS + email asking for a Google review (with the link)",
      "If trigger link clicked but no review → gentle reminder in 2 days",
      "Tag 'Reviewed' to stop the sequence",
    ],
    outcome: "More 5-star reviews on autopilot, the cheapest marketing there is.",
  },
  {
    title: "Database Reactivation",
    accent: "orange",
    trigger: "Smart list of old/cold contacts (no activity 60+ days)",
    steps: [
      "Re-engagement offer via SMS + email",
      "Branch on reply / click → book a call",
      "No response after 3 touches → tag 'Dormant', exit",
    ],
    outcome: "Revenue from leads you already paid for — run it monthly.",
  },
  {
    title: "Client Onboarding",
    accent: "purple",
    trigger: "Deal 'Won' (new client)",
    steps: [
      "Welcome + intake form sent automatically",
      "On form filled → book kickoff call + send onboarding docs",
      "Day-7 check-in, Day-30 feedback/NPS survey",
    ],
    outcome: "Every client gets a consistent, professional onboarding with zero manual steps.",
  },
];

// ───────────── Best practices ─────────────
export const GHL_BEST_PRACTICES: Tip[] = [
  { title: "Map the journey before you build", detail: "Sketch how a lead enters, what happens next, and the goal. Build the automation to fit the journey — not the other way around." },
  { title: "Simple beats complex", detail: "More workflows ≠ more results. Every workflow should have one clear purpose that moves a lead closer to paying." },
  { title: "Use custom values for anything reused", detail: "Booking link, business hours, offer details — set once as a custom value and reference everywhere, so updates are one-and-done." },
  { title: "Name and tag with a convention", detail: "Prefix workflows by funnel/stage and use consistent tags. Future-you (and the client) will thank you when troubleshooting." },
  { title: "Always test with a sample contact", detail: "Run a test contact through end-to-end before going live. Check timing, conditions, and that nothing double-fires." },
  { title: "Standardize a snapshot", detail: "Turn your best setup into a snapshot so onboarding a new client takes minutes, not days." },
];

// ───────────── Learn path ─────────────
export const GHL_LEARN: LearnStep[] = [
  { title: "1. Master the core objects", detail: "Get fluent with contacts, custom fields, pipelines, tags, and smart lists — automation is just moving these around.", resource: { label: "GHL Help Center", url: "https://help.gohighlevel.com/" } },
  { title: "2. Build your first 3 workflows", detail: "Speed-to-lead, appointment reminders, and review request. These cover 80% of small-business needs." },
  { title: "3. Learn triggers & conditions deeply", detail: "Trigger links, if/else branches, and wait steps are where real value lives. Practice mapping every scenario." },
  { title: "4. Package it as a snapshot", detail: "Standardize a reusable system you can deploy to any niche client." },
  { title: "5. Connect the outside world", detail: "Webhooks, the GHL API, and Zapier/Make/n8n to integrate tools GHL doesn't cover natively.", resource: { label: "GHL API Docs", url: "https://highlevel.stoplight.io/" } },
];
