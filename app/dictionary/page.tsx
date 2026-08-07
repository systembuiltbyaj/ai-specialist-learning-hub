import type { Metadata } from "next";
import { DICTIONARY } from "@/data/dictionary";
import DictionaryClient from "./DictionaryClient";

export const metadata: Metadata = {
  title: "Tech Dictionary",
  description:
    "A beginner-to-expert glossary for AI, prompting, agentic AI, Claude, automation platforms, GoHighLevel, and web/dev — each term with a plain-English definition, analogy, why it matters, and example.",
};

export default function DictionaryPage() {
  return (
    <div className="container-hub max-w-4xl space-y-7 py-10">
      <header className="border-b border-line/70 pb-6">
        <p className="eyebrow">The Reference</p>
        <h1 className="mt-2 font-serif text-4xl font-semibold tracking-[-0.02em] text-text sm:text-5xl">
          Tech Dictionary
        </h1>
        <p className="entry-body mt-3 max-w-[58ch]">
          {DICTIONARY.length} terms across AI, prompting, agentic systems, Claude,
          automation platforms, GoHighLevel, and web development — each in plain
          English, with an analogy and a real example.
        </p>
      </header>

      <DictionaryClient />
    </div>
  );
}
