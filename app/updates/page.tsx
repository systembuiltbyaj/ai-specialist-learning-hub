import type { Metadata } from "next";
import { SEED_UPDATES, UPDATES_VERIFIED_ON } from "@/app/lib/seed/updates";
import { formatIsoDate } from "@/app/lib/content/format";
import UpdatesClient from "./UpdatesClient";

export const metadata: Metadata = {
  title: "AI Updates & News",
  description:
    "What changed in GoHighLevel, Claude, AI automation and AI models — grouped by week, each with its official source and why it matters for builders.",
};

export default function UpdatesPage() {
  // Derived from the content, so the header can't claim a freshness the items don't have.
  const updated = formatIsoDate(UPDATES_VERIFIED_ON);

  return (
    <div className="container-hub space-y-6 py-8">
      <header>
        <p className="eyebrow">What changed, and why it matters</p>
        <h1 className="section-title">📰 AI Updates &amp; News</h1>
        <p className="mt-2 max-w-2xl text-muted">
          The releases and shifts that affect how you build — across <span className="text-gold">GHL</span>,{" "}
          <span className="text-gold">Claude</span>, <span className="text-gold">AI automation</span> and the wider model
          landscape. Every item links its official source. Last updated{" "}
          <time dateTime={UPDATES_VERIFIED_ON} className="text-gold">
            {updated}
          </time>
          ; this is refreshed by hand, not a live feed.
        </p>
      </header>

      <UpdatesClient initial={SEED_UPDATES} />
    </div>
  );
}
