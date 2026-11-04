import type { Metadata } from "next";
import { SEED_UPDATES, UPDATES_VERIFIED_ON } from "@/app/lib/seed/updates";
import { formatIsoDate } from "@/app/lib/content/format";
import UpdatesClient from "./UpdatesClient";
import PageHeader from "@/app/components/PageHeader";

export const metadata: Metadata = {
  title: "AI Updates & News",
  description:
    "What changed in GoHighLevel, Claude, AI automation and AI models — grouped by week, each with its official source and why it matters for builders.",
};

export default function UpdatesPage() {
  // Derived from the content, so the header can't claim a freshness the items don't have.
  const updated = formatIsoDate(UPDATES_VERIFIED_ON);
  const weeks = new Set(SEED_UPDATES.map((u) => u.week)).size;

  return (
    <div className="container-hub space-y-6 py-8">
      <PageHeader
        href="/updates"
        eyebrow="What changed, and why it matters"
        title="AI Updates"
        accent="& News"
        stats={[
          { label: "Sourced items", value: SEED_UPDATES.length, icon: "/updates" },
          { label: "Weeks covered", value: weeks, icon: "/learn" },
          { label: "Last updated", value: updated, icon: "/me" },
        ]}
      >
        The releases and shifts that affect how you build — across GHL, Claude, AI automation and the wider model
        landscape. Every item links its official source. Refreshed by hand, not a live feed.
      </PageHeader>

      <UpdatesClient initial={SEED_UPDATES} />
    </div>
  );
}
