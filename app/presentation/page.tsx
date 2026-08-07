import type { Metadata } from "next";
import { BOOKED_SLIDES, APPLIED_SLIDES } from "@/app/lib/seed/presentation";
import PresentationClient from "./PresentationClient";

export const metadata: Metadata = {
  title: "Presentation",
  description:
    "Two presentation scripts — pitch a client who booked you (Booked), and pitch yourself when you applied (Applied).",
  robots: { index: false, follow: false },
};

// Private route (middleware-gated). Scripts are imported HERE, in a server
// component, so they travel only in the gated RSC payload — never in a static
// /_next/static chunk, which is served without authentication.

export default function PresentationPage() {
  return (
    <div className="container-hub space-y-6 py-8">
      <header>
        <p className="eyebrow">Workspace</p>
        <h1 className="section-title">▶ Presentation</h1>
        <p className="mt-2 max-w-2xl text-muted">
          Your talking-points scripts for live calls.{" "}
          <span className="text-gold">Booked</span> — one fixed flow to present
          how you help a client who booked you;{" "}
          <span className="text-gold">Applied</span> — a folder per client you
          applied to, each with its own tailored, editable deck.
        </p>
      </header>

      <PresentationClient
        bookedSlides={BOOKED_SLIDES}
        appliedSlides={APPLIED_SLIDES}
      />
    </div>
  );
}
