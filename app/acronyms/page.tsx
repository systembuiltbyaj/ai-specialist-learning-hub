import type { Metadata } from "next";
import { ACRONYMS, ACRONYM_CATEGORIES } from "@/data/acronyms";
import AcronymsClient from "./AcronymsClient";
import PageHeader from "@/app/components/PageHeader";

export const metadata: Metadata = {
  title: "Acronym Decoder",
  description:
    "Every AI-world acronym decoded in plain English — what it stands for and what it actually means, searchable and grouped by category.",
};

export default function AcronymsPage() {
  return (
    <div className="container-hub space-y-7 py-10">
      <PageHeader
        href="/acronyms"
        eyebrow="Reference"
        title="Acronym"
        accent="Decoder"
        stats={[
          { label: "Acronyms", value: ACRONYMS.length, icon: "/acronyms" },
          { label: "Categories", value: ACRONYM_CATEGORIES.length, icon: "/dictionary" },
        ]}
      >
        Acronyms from the AI, automation, dev and business worlds — each with <span className="text-gold">what it stands for</span>{" "}
        and a plain-English meaning. Search any term or filter by category.
      </PageHeader>

      <AcronymsClient />
    </div>
  );
}
