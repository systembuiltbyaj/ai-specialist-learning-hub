"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { DictCategory, DictLevel } from "@/data/dictionary";
import { useHydrated, useLearner } from "@/app/lib/learner/store";
import { dueCardIds, localDay, reviewCard, type CardGrade } from "@/app/lib/learner/state";
import BookmarkButton from "@/app/components/BookmarkButton";

export interface CardFace {
  id: string;
  term: string;
  aliases: string[];
  category: DictCategory;
  level: DictLevel;
  simple: string;
  definition: string;
}

type Deck = "all" | "bookmarks" | DictCategory;

const GRADES: { grade: CardGrade; key: string; label: string; hint: string; tone: string }[] = [
  { grade: "again", key: "1", label: "Missed it", hint: "see it again today", tone: "border-[#ff6b6b]/60 hover:bg-[#ff6b6b]/10" },
  { grade: "hard", key: "2", label: "Shaky", hint: "same gap as last time", tone: "border-gold/60 hover:bg-gold/10" },
  { grade: "good", key: "3", label: "Knew it", hint: "wait longer next time", tone: "border-[#34d399]/60 hover:bg-[#34d399]/10" },
];

const NEW_CARDS_PER_SESSION = 10;

export default function FlashcardsClient({ cards, categories }: { cards: CardFace[]; categories: DictCategory[] }) {
  const [learner, update] = useLearner();
  const hydrated = useHydrated();
  const today = localDay(new Date());

  const [deck, setDeck] = useState<Deck>("all");
  // The session queue is fixed when it starts, so rating a card doesn't reshuffle the pile under you.
  const [queue, setQueue] = useState<string[] | null>(null);
  const [flipped, setFlipped] = useState(false);
  const [reviewed, setReviewed] = useState(0);

  const byId = useMemo(() => new Map(cards.map((card) => [card.id, card])), [cards]);

  const deckIds = useMemo(() => {
    if (deck === "all") return cards.map((card) => card.id);
    if (deck === "bookmarks") {
      return learner.bookmarks.filter((b) => b.kind === "term" && byId.has(b.id)).map((b) => b.id);
    }
    return cards.filter((card) => card.category === deck).map((card) => card.id);
  }, [byId, cards, deck, learner.bookmarks]);

  const due = useMemo(
    () => dueCardIds(deckIds, learner, today, NEW_CARDS_PER_SESSION),
    [deckIds, learner, today],
  );
  const inRotation = deckIds.filter((id) => learner.cards[id]).length;

  const start = () => {
    setQueue(due);
    setFlipped(false);
    setReviewed(0);
  };

  const currentId = queue?.[0];
  const card = currentId ? byId.get(currentId) : undefined;

  const rate = useCallback(
    (grade: CardGrade) => {
      if (!queue || !currentId || !flipped) return;
      update((state) => reviewCard(state, currentId, grade, today));
      // A missed card goes to the back of this session's pile instead of disappearing until tomorrow.
      setQueue(grade === "again" ? [...queue.slice(1), currentId] : queue.slice(1));
      setFlipped(false);
      setReviewed((n) => n + 1);
    },
    [currentId, flipped, queue, today, update],
  );

  useEffect(() => {
    if (!card) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (event.key === " " || event.key === "Enter") {
        event.preventDefault();
        setFlipped((value) => !value);
        return;
      }
      const grade = GRADES.find((g) => g.key === event.key);
      if (grade) rate(grade.grade);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [card, rate]);

  // ── Session in progress ────────────────────────────────────
  if (queue && card) {
    const remaining = queue.length;
    return (
      <div className="mx-auto max-w-2xl space-y-5">
        <div className="flex items-center justify-between text-xs text-muted">
          <button onClick={() => setQueue(null)} className="hover:text-neon-pink">
            ✕ End session
          </button>
          <span>
            {reviewed} reviewed · <span className="text-gold">{remaining} left</span>
          </span>
        </div>

        <button
          onClick={() => setFlipped((value) => !value)}
          aria-label={flipped ? "Hide answer" : "Show answer"}
          className="card card-hover flex min-h-[18rem] w-full flex-col items-center justify-center gap-4 p-8 text-center"
        >
          <p className="entry-meta">
            {card.category} · {card.level}
          </p>
          <p className="entry-head text-[2rem] sm:text-[2.5rem]">{card.term}</p>
          {card.aliases.length > 0 && <p className="entry-variants">also {card.aliases.join(" · ")}</p>}
          {flipped ? (
            <div className="max-w-xl space-y-3 text-left" aria-live="polite">
              <p className="text-base leading-relaxed text-text">{card.simple}</p>
              <p className="text-sm leading-relaxed text-text/60">{card.definition}</p>
            </div>
          ) : (
            <p className="text-sm text-muted">
              Say what it means, then flip — <kbd className="rounded border border-line px-1 font-mono text-[0.7rem]">Space</kbd>
            </p>
          )}
        </button>

        {flipped ? (
          <div className="grid gap-2 sm:grid-cols-3">
            {GRADES.map((g) => (
              <button key={g.grade} onClick={() => rate(g.grade)} className={`rounded-xl border p-3 text-left transition-colors ${g.tone}`}>
                <span className="block text-sm font-bold text-text">
                  <kbd className="mr-1.5 rounded border border-line px-1 font-mono text-[0.7rem] text-muted">{g.key}</kbd>
                  {g.label}
                </span>
                <span className="text-xs text-muted">{g.hint}</span>
              </button>
            ))}
          </div>
        ) : (
          <button onClick={() => setFlipped(true)} className="btn-violet w-full">
            Show answer
          </button>
        )}

        <div className="flex items-center justify-between text-xs">
          <Link href={`/dictionary/${card.id}`} target="_blank" className="text-gold hover:underline">
            Open full entry ↗
          </Link>
          <BookmarkButton kind="term" id={card.id} label={card.term} compact />
        </div>
      </div>
    );
  }

  // ── Deck picker / session summary ──────────────────────────
  const finishedSession = queue !== null;
  const deckOptions: { key: Deck; label: string }[] = [
    { key: "all", label: "All terms" },
    { key: "bookmarks", label: "★ Bookmarked" },
    ...categories.map((category) => ({ key: category as Deck, label: category })),
  ];

  return (
    <div className="space-y-6">
      {finishedSession && (
        <div className="card border-gold/40 p-5 text-center">
          <p className="text-lg font-bold text-gold">Session done — {reviewed} card{reviewed === 1 ? "" : "s"} reviewed.</p>
          <p className="mt-1 text-sm text-muted">Cards you knew are scheduled further out. Come back tomorrow for the next batch.</p>
        </div>
      )}

      <div>
        <p className="eyebrow mb-2">Deck</p>
        <div className="flex flex-wrap gap-2">
          {deckOptions.map((option) => (
            <button
              key={option.key}
              onClick={() => setDeck(option.key)}
              aria-pressed={deck === option.key}
              className={`chip ${deck === option.key ? "chip-active" : "hover:border-gold/60"}`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="card flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="text-3xl font-black text-gold">{hydrated ? due.length : "–"}</p>
          <p className="text-sm text-text/80">
            card{due.length === 1 ? "" : "s"} ready ·{" "}
            <span className="text-muted">
              {inRotation} of {deckIds.length} in rotation
            </span>
          </p>
          {deck === "bookmarks" && deckIds.length === 0 && (
            <p className="text-xs text-muted">Bookmark terms with ★ in the dictionary to build this deck.</p>
          )}
        </div>
        <button onClick={start} disabled={!hydrated || due.length === 0} className="btn-gold px-6 disabled:cursor-not-allowed disabled:opacity-40">
          {due.length === 0 ? "All caught up ✓" : "Start review →"}
        </button>
      </div>

      <p className="text-xs text-muted">
        How it works: each card sits in one of five boxes. <span className="text-text/80">Knew it</span> moves it up a box and
        doubles the wait (1, 2, 4, 8, then 16 days). <span className="text-text/80">Missed it</span> sends it back to box one.
        Up to {NEW_CARDS_PER_SESSION} new cards join each session. Progress stays in this browser.
      </p>
    </div>
  );
}
