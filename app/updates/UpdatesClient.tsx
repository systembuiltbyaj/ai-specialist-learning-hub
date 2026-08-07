"use client";

import { useEffect, useMemo, useState } from "react";
import type { Update, UpdateCategory } from "@/app/lib/types";
import { SEED_UPDATES } from "@/app/lib/seed/updates";

const STORAGE_KEY = "lh.updates.v1";
const CATEGORIES: UpdateCategory[] = ["GHL", "Claude", "AI Automation", "AI News"];

const CHIP_STYLES: Record<UpdateCategory, string> = {
  GHL: "border-neon-pink/40 text-neon-pink",
  Claude: "border-gold/50 text-gold",
  "AI Automation": "border-violet-soft/50 text-violet-light",
  "AI News": "border-neon-blue/40 text-neon-blue",
};
const ACCENT: Record<UpdateCategory, string> = {
  GHL: "accent-pink",
  Claude: "accent-teal",
  "AI Automation": "accent-purple",
  "AI News": "accent-blue",
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

export default function UpdatesClient({ initial }: { initial: Update[] }) {
  const [updates, setUpdates] = useState<Update[]>(initial);
  const [hydrated, setHydrated] = useState(false);
  const [filter, setFilter] = useState<"All" | UpdateCategory>("All");
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // The shared weekly feed was retired — this archive is per-browser only.
  // Edits never leave the visitor's own localStorage.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      setUpdates(saved ? JSON.parse(saved) : SEED_UPDATES);
    } catch {
      setUpdates(SEED_UPDATES);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updates));
    } catch {
      /* ignore */
    }
  }, [updates, hydrated]);

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
    return Array.from(map.entries());
  }, [filtered]);

  const addUpdate = (d: Draft) => {
    setUpdates((prev) => [
      { id: `u-${Date.now()}`, ...d, week: d.week.trim() || "This week", ts: Date.now() },
      ...prev,
    ]);
    setAdding(false);
  };

  const editUpdate = (id: string, d: Draft) => {
    setUpdates((prev) =>
      prev.map((u) => (u.id === id ? { ...u, ...d, week: d.week.trim() || u.week } : u)),
    );
    setEditingId(null);
  };

  const removeUpdate = (id: string) => {
    setUpdates((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {(["All", ...CATEGORIES] as const).map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`chip ${filter === c ? "chip-active" : "hover:border-violet-soft/60"}`}
            >
              {c}
            </button>
          ))}
        </div>
        <button
          onClick={() => setAdding((v) => !v)}
          className="btn-violet shrink-0 px-4 py-2 text-xs"
        >
          {adding ? "Cancel" : "+ Add Update"}
        </button>
      </div>

      {adding && (
        <UpdateForm
          initial={emptyDraft()}
          submitLabel="Save Update"
          onSubmit={addUpdate}
          onCancel={() => setAdding(false)}
        />
      )}

      {grouped.length === 0 && (
        <div className="card p-10 text-center text-muted">
          No updates here yet. Click <span className="text-gold">+ Add Update</span> to log one.
        </div>
      )}

      <div className="space-y-8">
        {grouped.map(([week, items]) => (
          <section key={week}>
            <div className="mb-3 flex items-center gap-3">
              <h2 className="text-sm font-bold uppercase tracking-wider text-gold">📅 {week}</h2>
              <div className="h-px flex-1 bg-line" />
              <span className="text-xs text-muted">
                {items.length} update{items.length > 1 ? "s" : ""}
              </span>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {items.map((u) =>
                editingId === u.id ? (
                  <UpdateForm
                    key={u.id}
                    initial={u}
                    submitLabel="Update"
                    onSubmit={(d) => editUpdate(u.id, d)}
                    onCancel={() => setEditingId(null)}
                  />
                ) : (
                  <article
                    key={u.id}
                    className={`card card-hover accent-bar ${ACCENT[u.category]} group p-5`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className={`chip border ${CHIP_STYLES[u.category]}`}>
                        {u.category}
                      </span>
                      <div className="flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                        <button
                          onClick={() => setEditingId(u.id)}
                          className="text-xs text-muted hover:text-gold"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => removeUpdate(u.id)}
                          className="text-muted hover:text-neon-pink"
                          aria-label="Delete update"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                    <h3 className="mt-3 font-bold text-text">{u.title}</h3>
                    <p className="mt-2 whitespace-pre-wrap text-sm text-text/70">
                      {renderContent(u.content)}
                    </p>
                  </article>
                ),
              )}
            </div>
          </section>
        ))}
      </div>

      <p className="text-center text-xs text-muted">
        Archive through June 2026. Anything you add is saved to this browser only.
      </p>
    </div>
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
    <form onSubmit={submit} className="card space-y-3 p-5 md:col-span-2">
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Update title *"
          className="input-hub"
          required
        />
        <input
          value={week}
          onChange={(e) => setWeek(e.target.value)}
          placeholder="Week (e.g. Week of 2026-06-09)"
          className="input-hub"
        />
      </div>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value as UpdateCategory)}
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
