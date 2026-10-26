"use client";

import { useHydrated, useLearner } from "@/app/lib/learner/store";
import { isBookmarked, toggleBookmark, type BookmarkKind } from "@/app/lib/learner/state";

// Saves a term, lesson or project to "My Progress". Safe on static pages: it
// renders the unsaved state until the browser's saved data is readable.
export default function BookmarkButton({
  kind,
  id,
  label,
  compact = false,
}: {
  kind: BookmarkKind;
  id: string;
  label: string;
  compact?: boolean;
}) {
  const [learner, update] = useLearner();
  const hydrated = useHydrated();
  const saved = hydrated && isBookmarked(learner, kind, id);

  return (
    <button
      type="button"
      onClick={(event) => {
        // Bookmark buttons sit inside clickable cards; don't also open the card.
        event.stopPropagation();
        update((state) => toggleBookmark(state, kind, id, new Date()));
      }}
      aria-pressed={saved}
      aria-label={saved ? `Remove ${label} from bookmarks` : `Bookmark ${label}`}
      title={saved ? "Bookmarked — click to remove" : "Bookmark"}
      className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-xs transition-colors ${
        saved ? "border-gold/60 bg-gold/10 text-gold" : "border-line text-muted hover:border-gold/50 hover:text-gold"
      }`}
    >
      <span aria-hidden>{saved ? "★" : "☆"}</span>
      {!compact && <span>{saved ? "Saved" : "Save"}</span>}
    </button>
  );
}
