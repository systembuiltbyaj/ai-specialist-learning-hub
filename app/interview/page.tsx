import type { Metadata } from "next";
import { INTERVIEW_SEED } from "@/app/lib/seed/interview";
import { INTERVIEW_GUIDES } from "@/app/lib/seed/interview-guides";
import InterviewTabs from "./InterviewTabs";
import PageHeader from "@/app/components/PageHeader";

export const metadata: Metadata = {
  title: "Interview Prep",
  description:
    "An answer bank of AI, automation and GoHighLevel interview questions with fill-in templates you can personalise, practise and download as a PDF — plus a discovery-call guide, conversational phrases and call tips.",
};

// The seed and guides are imported here in the server component and passed down,
// so they stay out of /_next/static chunks — keep that pattern if any of this
// content is ever made private (CLAUDE.md Rule 1).
export default function InterviewPage() {
  return (
    <div className="container-hub space-y-6 py-8">
      <PageHeader href="/interview" eyebrow="Get ready for the call" title="Interview" accent="Prep" stats={[{ label: "Template answers", value: INTERVIEW_SEED.length, icon: "/interview" }, { label: "Guides", value: INTERVIEW_GUIDES.length, icon: "/learn" }]}>
        Start with the answer bank: every answer is a template — swap the highlighted{" "}
        <mark className="rounded bg-violet-soft/15 px-0.5 text-violet-light">[blanks]</mark> for your own details, practise
        out loud, then download your answers as a PDF. The guides cover leading a discovery call, phrases that keep a
        conversation natural, and what real calls teach.
      </PageHeader>

      <InterviewTabs interviewSeed={INTERVIEW_SEED} guides={INTERVIEW_GUIDES} />
    </div>
  );
}
