import type { Metadata } from "next";
import { DICTIONARY, CATEGORIES } from "@/data/dictionary";
import FlashcardsClient, { type CardFace } from "./FlashcardsClient";

export const metadata: Metadata = {
  title: "Flashcards",
  description:
    "Spaced-review flashcards for every AI and automation term in the dictionary. Cards you miss come back sooner; cards you know wait longer.",
};

export default function FlashcardsPage() {
  // Only what a card shows — the full entry is one link away.
  const cards: CardFace[] = DICTIONARY.filter((term) => term.status !== "deprecated").map((term) => ({
    id: term.id,
    term: term.term,
    aliases: term.aliases,
    category: term.category,
    level: term.level,
    simple: term.simple,
    definition: term.definition,
  }));

  return (
    <div className="container-hub space-y-6 py-8">
      <header>
        <p className="eyebrow">Remember what you read</p>
        <h1 className="section-title">🃏 Flashcards</h1>
        <p className="mt-2 max-w-2xl text-muted">
          See the term, recall what it means, then flip and rate yourself honestly. Cards you miss come back sooner;
          cards you know wait longer. Ten minutes a day beats an hour once a week.
        </p>
      </header>
      <FlashcardsClient cards={cards} categories={CATEGORIES} />
    </div>
  );
}
