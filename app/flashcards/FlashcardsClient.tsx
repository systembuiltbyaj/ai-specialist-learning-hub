"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { DictCategory, DictLevel } from "@/data/dictionary";
import { useHydrated, useLearner } from "@/app/lib/learner/store";
import { BOX_INTERVAL_DAYS, dueCardIds, localDay, reviewCard, type CardGrade } from "@/app/lib/learner/state";
import BookmarkButton from "@/app/components/BookmarkButton";
import NavIcon from "@/app/components/NavIcons";
import StatStrip from "@/app/components/StatStrip";

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
  { grade: "again", key: "1", label: "Missed it", hint: "see it again today", tone: "border-danger/60 hover:bg-danger/10" },
  { grade: "hard", key: "2", label: "Shaky", hint: "same gap as last time", tone: "border-gold/60 hover:bg-gold/10" },
  { grade: "good", key: "3", label: "Knew it", hint: "wait longer next time", tone: "border-success/60 hover:bg-success/10" },
];

const NEW_CARDS_PER_SESSION = 10;
const TOP_BOX = Math.max(...Object.keys(BOX_INTERVAL_DAYS).map(Number));

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
    // A missed card rejoins the pile, so the total grows with it rather than the bar running past 100%.
    const sessionPct = Math.round((reviewed / (reviewed + remaining)) * 100);
    return (
      <div className="mx-auto max-w-3xl space-y-5">
        <div className="flex items-center justify-between text-xs text-muted">
          <button onClick={() => setQueue(null)} className="rounded-sm hover:text-neon-pink">
            ✕ End session
          </button>
          <Link href={`/dictionary/${card.id}`} target="_blank" className="rounded-sm text-gold hover:underline">
            Open full entry ↗
          </Link>
        </div>

        <div className="relative">
          <button
            onClick={() => setFlipped((value) => !value)}
            aria-label={flipped ? "Hide answer" : "Show answer"}
            className="card card-glow card-active flex min-h-[18rem] w-full flex-col items-center justify-center gap-4 px-5 pb-12 pt-16 text-center sm:px-10"
          >
            <span className="absolute left-4 top-4 inline-flex rounded-full border border-violet-soft/50 bg-violet/15 px-3 py-1 text-xs font-semibold text-violet-light sm:left-5 sm:top-5">
              {card.category} · {card.level}
            </span>
            <span className="entry-head block break-words text-[2rem] sm:text-[2.75rem]">{card.term}</span>
            {card.aliases.length > 0 && <span className="entry-variants block">also {card.aliases.join(" · ")}</span>}
            {flipped ? (
              <span className="block max-w-xl space-y-3 text-left" aria-live="polite">
                <span className="block text-base leading-relaxed text-text">{card.simple}</span>
                <span className="block text-sm leading-relaxed text-text/60">{card.definition}</span>
              </span>
            ) : (
              <span className="block text-base text-text/80 sm:text-lg">
                Say what it means, then flip —{" "}
                <kbd className="rounded border border-line px-1 font-mono text-[0.7rem]">Space</kbd>
              </span>
            )}
          </button>
          {/* A sibling, not a child: a button can't sit inside the flip button. */}
          <div className="absolute right-4 top-4 z-10 sm:right-5 sm:top-5">
            <BookmarkButton kind="term" id={card.id} label={card.term} compact />
          </div>
        </div>

        {flipped ? (
          <div className="grid gap-2 sm:grid-cols-3">
            {GRADES.map((g) => (
              <button key={g.grade} onClick={() => rate(g.grade)} className={`rounded-xl border bg-violet/[0.06] p-3.5 text-left transition-colors ${g.tone}`}>
                <span className="block text-sm font-bold text-text">
                  <kbd className="mr-1.5 rounded border border-line px-1 font-mono text-[0.7rem] text-muted">{g.key}</kbd>
                  {g.label}
                </span>
                <span className="text-xs text-muted">{g.hint}</span>
              </button>
            ))}
          </div>
        ) : (
          <div className="flex justify-center">
            <button onClick={() => setFlipped(true)} className="btn-violet rounded-full px-8 py-3 text-base">
              <FlipIcon />
              Show answer
            </button>
          </div>
        )}

        <div className="flex items-center gap-4 text-sm">
          <span className="shrink-0 text-text/85">
            {reviewed} reviewed · <span className="text-gold">{remaining} left</span>
          </span>
          <div
            className="h-2 flex-1 overflow-hidden rounded-full bg-violet-soft/15"
            role="progressbar"
            aria-label="Session progress"
            aria-valuenow={sessionPct}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div className="h-full rounded-full bg-gradient-to-r from-violet-light to-violet transition-all" style={{ width: `${sessionPct}%` }} />
          </div>
          <span className="w-10 shrink-0 text-right text-muted">{sessionPct}%</span>
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
  const deckLabel = deckOptions.find((option) => option.key === deck)?.label ?? "All terms";
  // "Mastered" = the top Leitner box: known often enough to wait the longest interval.
  const mastered = deckIds.filter((id) => learner.cards[id]?.box === TOP_BOX).length;
  const rotationPct = deckIds.length ? Math.round((inRotation / deckIds.length) * 100) : 0;
  // Before hydration the learner store is empty, so its figures would read as a false zero.
  const show = (value: number) => (hydrated ? value : "–");

  return (
    <div className="space-y-6">
      <StatStrip
        stats={[
          { label: "Cards in this deck", value: deck === "bookmarks" ? show(deckIds.length) : deckIds.length, icon: "/flashcards" },
          { label: "Ready now", value: show(due.length), icon: "/tasks" },
          { label: "In rotation", value: show(inRotation), icon: "/learn" },
          { label: "Mastered", value: show(mastered), icon: "/me" },
        ]}
      />

      {finishedSession && (
        <div className="card card-active p-5 text-center" role="status">
          <p className="text-lg font-bold text-gold">Session done — {reviewed} card{reviewed === 1 ? "" : "s"} reviewed.</p>
          <p className="mt-1 text-sm text-muted">Cards you knew are scheduled further out. Come back tomorrow for the next batch.</p>
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
        <p className="shrink-0 pt-2 text-sm font-semibold text-text" id="deck-label">
          Deck
        </p>
        <div className="flex flex-wrap gap-2" role="group" aria-labelledby="deck-label">
          {deckOptions.map((option) => (
            <button
              key={option.key}
              onClick={() => setDeck(option.key)}
              aria-pressed={deck === option.key}
              className={`chip px-4 py-2 text-sm ${deck === option.key ? "chip-active" : "hover:border-violet-soft/60"}`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="card card-glow card-active mx-auto flex max-w-3xl flex-col items-center gap-2 px-5 pb-10 pt-14 text-center sm:px-10">
        <span className="absolute left-4 top-4 inline-flex rounded-full border border-violet-soft/50 bg-violet/15 px-3 py-1 text-xs font-semibold text-violet-light sm:left-5 sm:top-5">
          {deckLabel}
        </span>
        <p className="text-5xl font-extrabold leading-none tracking-[-0.04em] text-text sm:text-6xl">{show(due.length)}</p>
        <p className="text-base text-text/85 sm:text-lg">card{due.length === 1 ? "" : "s"} ready to review</p>
        {deck === "bookmarks" && hydrated && deckIds.length === 0 && (
          <p className="text-xs text-muted">Bookmark terms with ★ in the dictionary to build this deck.</p>
        )}
        <button
          onClick={start}
          disabled={!hydrated || due.length === 0}
          className="btn-gold mt-4 px-7 py-3 text-base disabled:cursor-not-allowed disabled:opacity-40"
        >
          {due.length === 0 ? "All caught up ✓" : "Start review →"}
        </button>
      </div>

      <div className="mx-auto flex max-w-3xl items-center gap-4 text-sm">
        <span className="shrink-0 text-text/85">
          {show(inRotation)} of {deckIds.length} in rotation
        </span>
        <div
          className="h-2 flex-1 overflow-hidden rounded-full bg-violet-soft/15"
          role="progressbar"
          aria-label="Deck in rotation"
          aria-valuenow={hydrated ? rotationPct : 0}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-violet-light to-violet transition-all"
            style={{ width: `${hydrated ? rotationPct : 0}%` }}
          />
        </div>
        <span className="w-10 shrink-0 text-right text-muted">{hydrated ? `${rotationPct}%` : "–"}</span>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <button
          onClick={() => setDeck("bookmarks")}
          aria-pressed={deck === "bookmarks"}
          className={`card card-hover flex items-center gap-3.5 p-4 text-left ${deck === "bookmarks" ? "card-active" : ""}`}
        >
          <span className="icon-tile-muted h-11 w-11 text-lg" aria-hidden>
            ★
          </span>
          <span className="min-w-0">
            <span className="block font-bold text-text">Bookmarked deck</span>
            <span className="block text-xs text-muted">Only the terms you starred</span>
          </span>
        </button>
        <Link href="/me" className="card card-hover flex items-center gap-3.5 p-4">
          <span className="icon-tile-muted h-11 w-11">
            <NavIcon href="/me" className="h-5 w-5" />
          </span>
          <span className="min-w-0">
            <span className="block font-bold text-text">Review stats</span>
            <span className="block text-xs text-muted">Due cards, streak and quiz history</span>
          </span>
        </Link>
        <Link href="/quiz" className="card card-hover flex items-center gap-3.5 p-4">
          <span className="icon-tile-muted h-11 w-11">
            <NavIcon href="/quiz" className="h-5 w-5" />
          </span>
          <span className="min-w-0">
            <span className="block font-bold text-text">Quiz yourself</span>
            <span className="block text-xs text-muted">Multiple choice on the same terms</span>
          </span>
        </Link>
      </div>

      <p className="text-xs leading-relaxed text-muted">
        How it works: each card sits in one of five boxes. <span className="text-text/80">Knew it</span> moves it up a box and
        doubles the wait (1, 2, 4, 8, then 16 days). <span className="text-text/80">Missed it</span> sends it back to box one.
        A card in box five counts as mastered. Up to {NEW_CARDS_PER_SESSION} new cards join each session. Progress stays in
        this browser.
      </p>
    </div>
  );
}

function FlipIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20 11a8 8 0 0 0-14.3-4.9L4 8" />
      <path d="M4 4v4h4" />
      <path d="M4 13a8 8 0 0 0 14.3 4.9L20 16" />
      <path d="M20 20v-4h-4" />
    </svg>
  );
}
