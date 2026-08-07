import type { Metadata } from "next";
import { SEED_UPDATES } from "@/app/lib/seed/updates";
import UpdatesClient from "./UpdatesClient";

export const metadata: Metadata = {
  title: "AI Updates & News",
  description:
    "An archive of GHL, Claude, and AI-automation updates through June 2026, grouped by week.",
};

export default function UpdatesPage() {
  return (
    <div className="container-hub space-y-6 py-8">
      <header>
        <p className="eyebrow">Archive</p>
        <h1 className="section-title">📰 AI Updates &amp; News</h1>
        <p className="mt-2 max-w-2xl text-muted">
          Big releases, trends, and shifts across{" "}
          <span className="text-gold">GHL</span>,{" "}
          <span className="text-gold">Claude</span>, and{" "}
          <span className="text-gold">AI automation</span>. This is a snapshot
          archive — last updated <span className="text-gold">June 2026</span>,
          not a live feed.
        </p>
      </header>

      <UpdatesClient initial={SEED_UPDATES} />
    </div>
  );
}
