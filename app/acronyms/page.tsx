import type { Metadata } from "next";
import { ACRONYMS, ACRONYM_CATEGORIES } from "@/data/acronyms";
import AcronymsClient from "./AcronymsClient";

export const metadata: Metadata = {
  title: "Acronym Decoder",
  description:
    "Every AI-world acronym decoded in plain English — what it stands for and what it actually means, searchable and grouped by category.",
};

export default function AcronymsPage() {
  return (
    <div className="container-hub space-y-6 py-8">
      <header>
        <p className="eyebrow">Reference</p>
        <h1 className="section-title">🔤 Acronym Decoder</h1>
        <p className="mt-2 max-w-2xl text-muted">
          {ACRONYMS.length} acronyms from the AI, automation, dev, and business
          worlds — each with <span className="text-gold">what it stands for</span>{" "}
          and a plain-English meaning. Search any term or filter by one of{" "}
          {ACRONYM_CATEGORIES.length} categories.
        </p>
      </header>

      <AcronymsClient />
    </div>
  );
}
