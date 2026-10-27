import type { Metadata } from "next";
import { INTERVIEW_SEED } from "@/app/lib/seed/interview";
import { INTERVIEW_GUIDES } from "@/app/lib/seed/interview-guides";
import InterviewTabs from "./InterviewTabs";

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
      <header>
        <p className="eyebrow">Get ready for the call</p>
        <h1 className="section-title">🎤 Interview Prep</h1>
        <p className="mt-2 max-w-2xl text-muted">
          Start with the answer bank: every answer is a template — swap the highlighted{" "}
          <span className="rounded bg-violet-soft/15 px-1 text-violet-light">[blanks]</span> for your own details, practise
          out loud, then download your answers as a PDF. The guides cover leading a discovery call, phrases that keep a
          conversation natural, and what real calls teach.
        </p>
      </header>

      <InterviewTabs interviewSeed={INTERVIEW_SEED} guides={INTERVIEW_GUIDES} />
    </div>
  );
}
