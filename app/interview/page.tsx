import type { Metadata } from "next";
import { INTERVIEW_SEED } from "@/app/lib/seed/interview";
import {
  DISCOVERY_FLOW,
  DISCOVERY_QUESTIONS,
  EXPLAIN_POINTS,
  DISCOVERY_DOS,
  DISCOVERY_DONTS,
} from "@/app/lib/seed/discovery";
import InterviewTabs from "./InterviewTabs";

export const metadata: Metadata = {
  title: "Interview",
  description:
    "Two modes — prep your own interview answers (Employee), and a discovery playbook to drive a client conversation (Employer).",
  robots: { index: false, follow: false },
};

// Private route (middleware-gated). This data is imported HERE, in a server
// component, so it travels only in the gated RSC payload — never in a static
// /_next/static chunk, which is served without authentication.
export default function InterviewPage() {
  const discovery = {
    flow: DISCOVERY_FLOW,
    questions: DISCOVERY_QUESTIONS,
    explainPoints: EXPLAIN_POINTS,
    dos: DISCOVERY_DOS,
    donts: DISCOVERY_DONTS,
  };

  return (
    <div className="container-hub space-y-6 py-8">
      <header>
        <p className="eyebrow">Practice</p>
        <h1 className="section-title">🎤 Interview</h1>
        <p className="mt-2 max-w-2xl text-muted">
          Two modes: <span className="text-gold">Employee</span> — prep answers
          for when you&apos;re interviewed; and{" "}
          <span className="text-gold">Employer</span> — a discovery playbook for
          when you interview a client about their business.
        </p>
      </header>

      <InterviewTabs interviewSeed={INTERVIEW_SEED} discovery={discovery} />
    </div>
  );
}
