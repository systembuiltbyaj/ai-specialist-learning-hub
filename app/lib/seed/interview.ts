import type { InterviewEntry } from "@/app/lib/types";

// GHL Specialist interview prep — draft answers to refine.
// Listed in question order; createdAt is set descending so they render in order.
const RAW: Omit<InterviewEntry, "createdAt">[] = [
  {
    id: "iv-about-self",
    topic: "About You",
    question: "Tell me about yourself.",
    answer:
      "Hi, I'm Allen, but you can call me AJ. I have nearly 6 years of experience in eCommerce and business operations. I started my career in the Amazon industry as a Product Researcher and was eventually promoted to Business Operations Manager, where I managed various aspects of the business, including operations, team coordination, and process improvement.\n\nOver the past year, I've focused on learning automation, particularly within GoHighLevel. To strengthen my skills, I enrolled in Jaycee Tan's intensive GoHighLevel training program, where I gained hands-on experience building funnels, websites, workflows, CRM setups, calendars, forms, surveys, and automation systems.\n\nI enjoy creating efficient systems that help businesses streamline their processes, improve lead management, and scale more effectively. I'm always eager to keep learning and growing in this field.",
  },
  {
    id: "iv-approach-automations",
    topic: "Process",
    question: "What is your approach to building automations in GoHighLevel?",
    answer:
      "I believe simple automations are usually better than complex ones. Many people think that more workflows mean more leads, but that's not necessarily true. The goal is to create an efficient system that nurtures leads and converts them into paying clients. If a simple workflow can achieve that, there's no need to overcomplicate it. 🚀",
  },
  {
    id: "iv-audit-account",
    topic: "Process",
    question: "How do you audit a system or account?",
    answer:
      "The first thing I do is understand the business flow and how leads are coming into the business. Then I look at the customer journey to identify how contacts enter the CRM — whether through Facebook ads, website forms, landing pages, or other lead sources.\n\nOnce I understand the entire process, I create a workflow and automation plan that supports the customer's journey. The main objective is to move leads from cold prospects to qualified opportunities and ultimately closed deals. 🚀",
  },
  {
    id: "iv-q4",
    topic: "About You",
    question: "What makes you different from other GHL Specialists?",
    answer:
      "I believe my biggest advantage is that I don't just focus on the technical side of GoHighLevel. My background is in business operations, so I always try to understand the business goals before building any automation.\n\nMany people can build workflows, but I focus on why we're building them and how they contribute to lead generation, customer experience, and revenue growth. I also enjoy learning and continuously improving my skills, which helps me stay updated with best practices.",
  },
  {
    id: "iv-q5",
    topic: "About You",
    question: "Why should we hire you?",
    answer:
      "You should hire me because I bring both operations and automation experience. I understand how businesses work behind the scenes and how systems can improve efficiency.\n\nI'm proactive, detail-oriented, and willing to learn. Even when I encounter something new, I'm confident in my ability to research, test, and find solutions. My goal is always to help businesses save time, improve processes, and generate better results.",
  },
  {
    id: "iv-q6",
    topic: "GHL Skills",
    question: "What GoHighLevel features are you most confident using?",
    answer:
      "I'm most confident with funnel and website building, workflow automations, CRM management, pipelines, calendars, forms, surveys, email and SMS automation, snapshots, and lead management.\n\nI also have experience setting up customer journeys and creating automation workflows that help nurture leads and improve follow-up processes.",
  },
  {
    id: "iv-q7",
    topic: "Experience",
    question: "What type of businesses have you worked with or built projects for?",
    answer:
      "Most of my professional experience comes from the eCommerce industry, particularly Amazon operations. As I transitioned into GoHighLevel, I've worked on projects involving lead generation funnels, appointment booking systems, CRM setups, and automation workflows.\n\nI've also studied and built projects for service-based businesses because they are one of the most common industries using GoHighLevel.",
  },
  {
    id: "iv-q8",
    topic: "Experience",
    question: "Can you tell me about a project you're proud of?",
    answer:
      "One project I'm proud of was building a complete lead generation funnel with automated follow-ups. The project included a landing page, form submission process, pipeline stages, calendar booking, and automated email and SMS sequences.\n\nWhat I enjoyed most was seeing how all the pieces connected together to create a smoother customer journey and reduce manual work for the business.",
  },
  {
    id: "iv-q9",
    topic: "Experience",
    question: "What is the most challenging automation you've built?",
    answer:
      "One of the more challenging projects involved creating multiple workflow conditions based on different customer actions. The challenge wasn't necessarily building the automation itself but making sure every possible scenario was accounted for without creating conflicts between workflows.\n\nIt taught me the importance of planning the customer journey before building anything inside the system.",
  },
  {
    id: "iv-q11",
    topic: "Process",
    question: "When a new client comes to you, what's the first thing you do?",
    answer:
      "The first thing I do is understand the business model and how they currently generate leads. I want to know where leads are coming from, how they're being managed, and what challenges they're experiencing.\n\nOnce I understand their current process, I map out the customer journey and identify opportunities where automation can improve efficiency and conversions.",
  },
  {
    id: "iv-q12",
    topic: "Process",
    question: "How do you map out a customer journey before building automations?",
    answer:
      "I start by identifying every touchpoint between the customer and the business. I look at how leads enter the CRM, what actions they take, what follow-ups they receive, and what happens after they become customers.\n\nOnce I understand the full journey, I create a process map and identify which steps can be automated to improve the customer experience and reduce manual tasks.",
  },
  {
    id: "iv-q13",
    topic: "Strategy",
    question: "What do you think makes an effective lead nurturing system?",
    answer:
      "An effective lead nurturing system provides the right message at the right time. It follows up consistently without overwhelming the lead and focuses on building trust.\n\nThe goal is to keep prospects engaged until they're ready to make a buying decision. Good nurturing systems combine automation with personalization.",
  },
  {
    id: "iv-q14",
    topic: "Strategy",
    question: "What's a common mistake businesses make when using GoHighLevel?",
    answer:
      "One common mistake is overcomplicating their workflows. Many businesses create too many automations that become difficult to manage and troubleshoot.\n\nI believe simplicity is often more effective. Every workflow should have a clear purpose and contribute directly to moving leads closer to becoming paying customers.",
  },
  {
    id: "iv-q16",
    topic: "Communication",
    question: "How do you explain technical concepts to non-technical clients?",
    answer:
      "I try to avoid technical jargon and explain things using business outcomes. Instead of talking about workflow triggers and conditions, I explain how the automation will save time, improve follow-up, or help convert more leads.\n\nI always focus on what the client cares about most—the results.",
  },
  {
    id: "iv-q17",
    topic: "Communication",
    question: "What would you do if a client requested something that wasn't the best solution?",
    answer:
      "I would respectfully explain the pros and cons and provide my recommendation based on experience and best practices.\n\nAt the end of the day, it's the client's business, but I believe it's my responsibility to provide honest advice and explain why there may be a better approach.",
  },
  {
    id: "iv-q18",
    topic: "Process",
    question: "How do you gather requirements before starting a project?",
    answer:
      "I ask questions about the business goals, target audience, lead sources, sales process, current challenges, and desired outcomes.\n\nI want to understand not only what the client wants but also why they want it. That helps me design solutions that actually support their business objectives.",
  },
  {
    id: "iv-q19",
    topic: "Troubleshooting",
    question: "What would you do if a client said their automations weren't generating results?",
    answer:
      "I would first analyze the entire process rather than assuming the automation is the problem.\n\nI would review the lead source, customer journey, messaging, timing, funnel performance, and workflow setup. Sometimes the automation is working correctly, but another part of the process needs improvement.",
  },
  {
    id: "iv-q20",
    topic: "Communication",
    question: "How do you handle difficult clients or changing requirements?",
    answer:
      "I focus on communication and setting clear expectations. If requirements change, I make sure we discuss the impact on timelines and project scope.\n\nI stay professional, listen carefully, and work toward solutions rather than focusing on problems.",
  },
  {
    id: "iv-q22",
    topic: "Troubleshooting",
    question: "A workflow isn't firing properly. How would you troubleshoot it?",
    answer:
      "I would start by checking the workflow trigger to make sure contacts are actually meeting the trigger conditions.\n\nThen I would review filters, workflow settings, contact records, and workflow history to identify where the process is breaking. I like to test using sample contacts and isolate each step until I find the root cause.",
  },
  {
    id: "iv-q23",
    topic: "Troubleshooting",
    question: "How would you improve a low-converting funnel?",
    answer:
      "I would first analyze the data to identify where visitors are dropping off.\n\nThen I would review the offer, messaging, call-to-action, page design, form length, and follow-up process. Small improvements in these areas can often lead to significant increases in conversion rates.",
  },
  {
    id: "iv-q26",
    topic: "About You",
    question: "How do you stay updated with GoHighLevel changes?",
    answer:
      "I regularly follow GoHighLevel updates, watch training videos, participate in communities, and continue building projects to practice new features.\n\nTechnology changes quickly, so continuous learning is very important in this industry.",
  },
  {
    id: "iv-q27",
    topic: "Process",
    question: "How do you prioritize tasks when handling multiple clients?",
    answer:
      "I prioritize based on urgency, business impact, and deadlines. Critical issues that affect lead generation, sales, or client operations are handled first.\n\nI also use task management tools and maintain clear communication with clients regarding timelines and expectations.",
  },
  {
    id: "iv-q28",
    topic: "About You",
    question: "What do you enjoy most about automation?",
    answer:
      "What I enjoy most is solving problems and creating systems that make businesses more efficient.\n\nIt's rewarding to see repetitive tasks become automated and know that the business can focus more on growth rather than manual work.",
  },
  {
    id: "iv-q29",
    topic: "About You",
    question: "What are your strengths and weaknesses?",
    answer:
      "Strengths: I'm detail-oriented, analytical, organized, and always willing to learn. My operations background has taught me how to identify inefficiencies and improve processes.\n\nWeakness: Sometimes I can spend extra time reviewing details because I want to make sure everything works correctly. However, I've learned to balance quality with efficiency and deadlines.",
  },
  {
    id: "iv-q30",
    topic: "About You",
    question: "Where do you see yourself in the next 3 years?",
    answer:
      "In the next three years, I see myself becoming a highly skilled Automation Specialist and GoHighLevel expert, managing more complex projects and helping businesses scale through systems and automation.\n\nI also want to continue growing my knowledge in CRM strategy, AI automation, integrations, and business process optimization so I can provide even more value to clients.",
  },
];

// Preserve listed order under the newest-first sort in the UI.
export const INTERVIEW_SEED: InterviewEntry[] = RAW.map((e, i) => ({
  ...e,
  createdAt: RAW.length - i,
}));
