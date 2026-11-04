import type { Metadata } from "next";
import { CATEGORIES, DICTIONARY } from "@/data/dictionary";
import DictionaryClient from "./DictionaryClient";
import PageHeader from "@/app/components/PageHeader";

export const metadata: Metadata = {
  title: "Tech Dictionary",
  description:
    "A beginner-to-expert glossary for AI, prompting, agentic AI, Claude, automation platforms, GoHighLevel, and web/dev — each term with a plain-English definition, analogy, why it matters, and example.",
};

export default function DictionaryPage() {
  return (
    <div className="container-hub space-y-7 py-10">
      <PageHeader href="/dictionary" eyebrow="Reference" title="Tech" accent="Dictionary" stats={[{ label: "Terms", value: DICTIONARY.length, icon: "/dictionary" }, { label: "Categories", value: CATEGORIES.length, icon: "/acronyms" }]}>
        AI, prompting, agentic systems, Claude, automation platforms, GoHighLevel and web development — each in plain
        English, with an analogy and a real example.
      </PageHeader>

      <DictionaryClient />
    </div>
  );
}
