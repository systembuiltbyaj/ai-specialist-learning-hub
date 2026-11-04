"use client";

import { useEffect, useId, useMemo, useState } from "react";
import type { Update, UpdateCategory } from "@/app/lib/types";
import { formatIsoDate } from "@/app/lib/content/format";
import NavIcon from "@/app/components/NavIcons";
const STORAGE_KEY = "lh.updates.v2";
const LEGACY_KEY = "lh.updates.v1";
const CATEGORIES: UpdateCategory[] = ["GHL", "Claude", "AI Automation", "AI News"];

const CHIP_STYLES: Record<UpdateCategory, string> = {
  GHL: "border-neon-pink/45 bg-neon-pink/10 text-neon-pink",
  Claude: "border-gold/50 bg-gold/10 text-gold",
  "AI Automation": "border-success/45 bg-success/10 text-success",
  "AI News": "border-neon-blue/45 bg-neon-blue/10 text-neon-blue",
};

interface Draft {
  title: string;
  category: UpdateCategory;
  week: string;
  content: string;
}
const emptyDraft = (): Draft => ({ title: "", category: "GHL", week: "", content: "" });

// Turn raw URLs in update text into clickable links.
function renderContent(text: string) {
  return text.split(/(https?:\/\/[^\s)]+)/g).map((part, i) =>
    /^https?:\/\//.test(part) ? (
      <a
        key={i}
        href={part}
        target="_blank"
        rel="noopener noreferrer"
        className="break-all text-violet-light underline underline-offset-2 hover:text-gold"
      >
        {part}
      </a>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

// The collapsed row is a button, so its preview can't hold links; the source
// URL is shown, clickable, once the row is opened.
function preview(text: string): string {
  return text
    .replace(/\s*Source:\s*https?:\/\/\S+/g, "")
    .replace(/https?:\/\/[^\s)]+/g, "")
    .trim();
}

function weekLabel(week: string): string {
  const iso = week.match(/\d{4}-\d{2}-\d{2}/)?.[0];
  return iso ? `Week of ${formatIsoDate(iso)}` : week;
}

// What a visitor changed, layered over the current news. Saving the whole list
// (v1) froze it: anyone who had visited once never saw a newer edition again.
interface Personal {
  custom: Update[];
  edits: Record<string, Draft>;
  removed: string[];
}
const EMPTY: Personal = { custom: [], edits: {}, removed: [] };
// Visitor-added items have timestamp ids (`u-<Date.now()>`); seed items don't.
const isCustomId = (id: string) => /^u-\d{10,}$/.test(id);

function loadPersonal(): Personal {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved) as Partial<Personal>;
      return { custom: parsed.custom ?? [], edits: parsed.edits ?? {}, removed: parsed.removed ?? [] };
    }
    // One-time carry-over: keep what the visitor added themselves, drop the old snapshot.
    const legacy = localStorage.getItem(LEGACY_KEY);
    if (legacy) {
      const items = JSON.parse(legacy) as Update[];
      localStorage.removeItem(LEGACY_KEY);
      return { ...EMPTY, custom: Array.isArray(items) ? items.filter((u) => isCustomId(u.id)) : [] };
    }
  } catch {
    /* corrupt or blocked storage: start from the current news */
  }
  return EMPTY;
}

// Newest week first; anything a visitor filed as "This week" sits on top.
function weekRank(week: string): string {
  const iso = week.match(/\d{4}-\d{2}-\d{2}/)?.[0];
  return iso ?? "9999-99-99";
}

export default function UpdatesClient({ initial }: { initial: Update[] }) {
  const [personal, setPersonal] = useState<Personal>(EMPTY);
  const [hydrated, setHydrated] = useState(false);
  const [filter, setFilter] = useState<"All" | UpdateCategory>("All");
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Per-browser only: the shared weekly feed is retired, and edits never leave
  // the visitor's own localStorage.
  useEffect(() => {
    setPersonal(loadPersonal());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(personal));
    } catch {
      /* ignore */
    }
  }, [personal, hydrated]);

  const updates = useMemo(() => {
    const removed = new Set(personal.removed);
    const seed = initial
      .filter((u) => !removed.has(u.id))
      .map((u) => (personal.edits[u.id] ? { ...u, ...personal.edits[u.id] } : u));
    return [...personal.custom, ...seed];
  }, [initial, personal]);

  const filtered = useMemo(
    () => (filter === "All" ? updates : updates.filter((u) => u.category === filter)),
    [updates, filter],
  );

  const grouped = useMemo(() => {
    const map = new Map<string, Update[]>();
    for (const u of filtered) {
      if (!map.has(u.week)) map.set(u.week, []);
      map.get(u.week)!.push(u);
    }
    return Array.from(map.entries()).sort((a, b) => weekRank(b[0]).localeCompare(weekRank(a[0])));
  }, [filtered]);

  const addUpdate = (d: Draft) => {
    const item: Update = { id: `u-${Date.now()}`, ...d, week: d.week.trim() || "This week", ts: Date.now() };
    setPersonal((prev) => ({ ...prev, custom: [item, ...prev.custom] }));
    setAdding(false);
  };

  const editUpdate = (id: string, d: Draft) => {
    setPersonal((prev) => {
      if (isCustomId(id)) {
        return { ...prev, custom: prev.custom.map((u) => (u.id === id ? { ...u, ...d, week: d.week.trim() || u.week } : u)) };
      }
      const original = initial.find((u) => u.id === id);
      return { ...prev, edits: { ...prev.edits, [id]: { ...d, week: d.week.trim() || original?.week || d.week } } };
    });
    setEditingId(null);
  };

  const removeUpdate = (id: string) => {
    setPersonal((prev) =>
      isCustomId(id)
        ? { ...prev, custom: prev.custom.filter((u) => u.id !== id) }
        : { ...prev, removed: [...prev.removed, id] },
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
          {(["All", ...CATEGORIES] as const).map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              aria-pressed={filter === c}
              className={`chip px-4 py-2 text-sm ${filter === c ? "chip-active" : "hover:border-violet-soft/60"}`}
            >
              {c}
            </button>
          ))}
        </div>
        <button onClick={() => setAdding((v) => !v)} className="btn-violet shrink-0 self-start sm:self-auto">
          {adding ? "Cancel" : "+ Add update"}
        </button>
      </div>

      {adding && (
        <UpdateForm
          initial={emptyDraft()}
          submitLabel="Save update"
          onSubmit={addUpdate}
          onCancel={() => setAdding(false)}
        />
      )}

      {grouped.length === 0 && (
        <div className="card p-10 text-center text-muted">
          No updates here yet. Click <span className="text-gold">+ Add update</span> to log one.
        </div>
      )}

      <div className="space-y-5">
        {grouped.map(([week, items], index) => (
          <section key={week} className={`card p-4 sm:p-6 ${index === 0 ? "card-glow" : ""}`}>
            <header className="flex items-center gap-3 border-b border-violet-soft/15 pb-3">
              <span className={`${index === 0 ? "icon-tile" : "icon-tile-muted"} h-10 w-10`}>
                <NavIcon href="/updates" className="h-5 w-5" />
              </span>
              <h2 className="text-lg font-bold tracking-[-0.02em] text-text">{weekLabel(week)}</h2>
              <span className="ml-auto shrink-0 text-xs text-muted">
                {items.length} update{items.length > 1 ? "s" : ""}
              </span>
            </header>
            <ol className="relative before:absolute before:bottom-6 before:left-[0.6875rem] before:top-6 before:w-px before:bg-violet-soft/30 before:content-['']">
              {items.map((u) =>
                editingId === u.id ? (
                  <li key={u.id} className="py-3">
                    <UpdateForm
                      initial={u}
                      submitLabel="Update"
                      onSubmit={(d) => editUpdate(u.id, d)}
                      onCancel={() => setEditingId(null)}
                    />
                  </li>
                ) : (
                  <UpdateRow
                    key={u.id}
                    update={u}
                    onEdit={() => setEditingId(u.id)}
                    onRemove={() => removeUpdate(u.id)}
                  />
                ),
              )}
            </ol>
          </section>
        ))}
      </div>

      <p className="text-center text-xs text-muted">
        Anything you add or edit is saved to this browser only.
      </p>
    </div>
  );
}

function UpdateRow({ update, onEdit, onRemove }: { update: Update; onEdit: () => void; onRemove: () => void }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <li className="relative border-b border-violet-soft/15 pl-8 last:border-0">
      <span
        aria-hidden
        className="absolute left-[0.4375rem] top-[1.4rem] h-2.5 w-2.5 rounded-full bg-violet-light ring-4 ring-violet/20"
      />
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className="group flex w-full flex-col items-start gap-2 rounded-lg py-4 text-left sm:flex-row sm:gap-4"
      >
        <span
          className={`shrink-0 rounded-full border px-2.5 py-0.5 text-[0.68rem] font-bold uppercase tracking-wide sm:mt-0.5 sm:w-[7.75rem] sm:text-center ${CHIP_STYLES[update.category]}`}
        >
          {update.category}
        </span>
        <span className="flex w-full min-w-0 flex-1 items-start gap-3">
          <span className="min-w-0 flex-1">
            <span className="block font-bold leading-snug text-text transition-colors group-hover:text-gold">
              {update.title}
            </span>
            {!open && <span className="mt-1 line-clamp-2 text-sm text-muted">{preview(update.content)}</span>}
          </span>
          <svg
            viewBox="0 0 24 24"
            className={`mt-0.5 h-5 w-5 shrink-0 text-muted transition-transform group-hover:text-text ${open ? "rotate-90" : ""}`}
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="m9 6 6 6-6 6" />
          </svg>
        </span>
      </button>
      {open && (
        <div id={panelId} className="pb-4 sm:pl-[8.75rem]">
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-text/80">{renderContent(update.content)}</p>
          <div className="mt-3 flex gap-3">
            <button onClick={onEdit} className="text-xs font-semibold text-muted hover:text-gold">
              Edit
            </button>
            <button onClick={onRemove} className="text-xs font-semibold text-muted hover:text-danger" aria-label={`Delete ${update.title}`}>
              Delete
            </button>
          </div>
        </div>
      )}
    </li>
  );
}

function UpdateForm({
  initial,
  submitLabel,
  onSubmit,
  onCancel,
}: {
  initial: Draft | Update;
  submitLabel: string;
  onSubmit: (d: Draft) => void;
  onCancel: () => void;
}) {
  const [title, setTitle] = useState(initial.title);
  const [category, setCategory] = useState<UpdateCategory>(initial.category);
  const [week, setWeek] = useState(initial.week);
  const [content, setContent] = useState(initial.content);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit({ title, category, week, content });
  };

  return (
    <form onSubmit={submit} className="card card-active space-y-3 p-5">
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Update title *"
          aria-label="Update title"
          className="input-hub"
          required
        />
        <input
          value={week}
          onChange={(e) => setWeek(e.target.value)}
          placeholder="Week (e.g. Week of 2026-06-09)"
          aria-label="Week"
          className="input-hub"
        />
      </div>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value as UpdateCategory)}
        aria-label="Category"
        className="input-hub"
      >
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What changed / what you learned…"
        aria-label="Details"
        rows={4}
        className="input-hub resize-y"
      />
      <div className="flex gap-2">
        <button type="submit" className="btn-violet">
          {submitLabel}
        </button>
        <button type="button" onClick={onCancel} className="btn-ghost">
          Cancel
        </button>
      </div>
    </form>
  );
}
