"use client";

import { useEffect, useMemo, useState } from "react";
import type { Resource, ResourceCategory } from "@/app/lib/types";
import { RESOURCE_CATEGORIES } from "@/app/lib/constants";
import { WEEKLY_GOAL_HOURS } from "@/app/lib/seed/resources";
import { exportResourcesToMarkdown, downloadFile } from "@/app/lib/export";
import { formatIsoDate } from "@/app/lib/content/format";
import NavIcon from "@/app/components/NavIcons";
import Glyph from "./Glyph";

const STORAGE_KEY = "lh.resources.v1";
const HOURS_KEY = "lh.hours.v1";

interface Draft {
  title: string;
  url: string;
  category: ResourceCategory;
  notes: string;
}

function hostOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

// Only a real ISO timestamp becomes a date; anything else is left out rather than guessed.
function savedOn(savedAt?: string): string {
  const day = savedAt?.match(/^\d{4}-\d{2}-\d{2}/)?.[0];
  return day ? formatIsoDate(day) : "";
}

export default function ResourcesClient({
  initial,
  remote,
}: {
  initial: Resource[];
  remote: boolean;
}) {
  const [resources, setResources] = useState<Resource[]>(initial);
  const [category, setCategory] = useState<(typeof RESOURCE_CATEGORIES)[number]>("All");
  const [query, setQuery] = useState("");
  const [hours, setHours] = useState<number>(0);
  const [hydrated, setHydrated] = useState(false);
  const [busy, setBusy] = useState(false);
  const [adding, setAdding] = useState(false);

  // Load local state. In remote mode, resources come from Supabase (initial);
  // only the hours counter stays per-device in localStorage.
  useEffect(() => {
    try {
      if (!remote) {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) setResources(JSON.parse(saved));
      }
      const savedHours = localStorage.getItem(HOURS_KEY);
      setHours(savedHours ? Number(savedHours) : 0);
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, [remote]);

  useEffect(() => {
    if (!hydrated || remote) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(resources));
    } catch {
      /* ignore */
    }
  }, [resources, hydrated, remote]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(HOURS_KEY, String(hours));
    } catch {
      /* ignore */
    }
  }, [hours, hydrated]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return resources
      .filter((r) => category === "All" || r.category === category)
      .filter((r) => !q || `${r.title} ${r.notes} ${r.url} ${r.category} ${r.type}`.toLowerCase().includes(q));
  }, [resources, category, query]);

  const countFor = (cat: (typeof RESOURCE_CATEGORIES)[number]) =>
    cat === "All" ? resources.length : resources.filter((r) => r.category === cat).length;

  // Server-supplied lists (remote mode) are real before hydration; a browser's own
  // list and hours are unknown until storage is read, so show a dash, not a zero.
  const listKnown = remote || hydrated;
  const completed = resources.filter((r) => r.completed).length;
  const progress = resources.length ? Math.round((completed / resources.length) * 100) : 0;
  const goalPct = Math.min(100, Math.round((hours / WEEKLY_GOAL_HOURS) * 100));

  async function remoteOp(payload: Record<string, unknown>) {
    setBusy(true);
    try {
      const res = await fetch("/api/resources", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data?.ok && Array.isArray(data.resources)) setResources(data.resources);
    } finally {
      setBusy(false);
    }
  }

  const toggleComplete = async (id: string) => {
    const r = resources.find((x) => x.id === id);
    if (!r) return;
    if (remote) await remoteOp({ op: "update", id, completed: !r.completed });
    else
      setResources((prev) =>
        prev.map((x) => (x.id === id ? { ...x, completed: !x.completed } : x)),
      );
  };

  const removeResource = async (id: string) => {
    if (remote) await remoteOp({ op: "delete", id });
    else setResources((prev) => prev.filter((r) => r.id !== id));
  };

  const addResource = async (d: Draft) => {
    let safeUrl = d.url.trim();
    if (safeUrl && !/^https?:\/\//i.test(safeUrl)) safeUrl = `https://${safeUrl}`;
    if (remote) {
      await remoteOp({ op: "create", ...d, url: safeUrl, type: "Post" });
    } else {
      setResources((prev) => [
        {
          id: `r-${Date.now()}`,
          title: d.title.trim(),
          url: safeUrl,
          category: d.category,
          type: "Post",
          notes: d.notes.trim(),
          completed: false,
        },
        ...prev,
      ]);
    }
  };

  const handleExport = () =>
    downloadFile(
      exportResourcesToMarkdown(resources, hours),
      "my-learning-journey.md",
      "text/markdown",
    );

  return (
    <div className="space-y-6">
      {/* ── Progress dashboard ── */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="card flex items-center gap-4 p-5">
          <span className="icon-tile-muted h-12 w-12">
            <NavIcon href="/resources" className="h-6 w-6" />
          </span>
          <div>
            <div className="text-3xl font-extrabold leading-none tracking-[-0.03em] text-text">
              {listKnown ? resources.length : "—"}
            </div>
            <div className="mt-1 text-sm text-muted">Resources saved</div>
          </div>
        </div>

        <div className="card flex items-start gap-4 p-5">
          <span className="icon-tile-muted h-12 w-12">
            <Glyph name="target" className="h-6 w-6" />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-sm font-semibold text-text">Learning progress</span>
              <span className="text-xl font-extrabold text-neon-yellow">{listKnown ? `${progress}%` : "—"}</span>
            </div>
            <ProgressBar pct={listKnown ? progress : 0} />
            <p className="mt-2 text-xs text-muted">
              {listKnown ? `${completed} of ${resources.length} completed` : "Reading your list…"}
            </p>
          </div>
        </div>

        <div className="card flex items-start gap-4 p-5">
          <span className="icon-tile-muted h-12 w-12">
            <Glyph name="calendar" className="h-6 w-6" />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-sm font-semibold text-text">Weekly goal · {WEEKLY_GOAL_HOURS}h</span>
              <span className="text-xl font-extrabold text-neon-yellow">{hydrated ? `${goalPct}%` : "—"}</span>
            </div>
            <ProgressBar pct={hydrated ? goalPct : 0} />
            <div className="mt-2 flex items-center justify-between gap-2">
              <span className="text-xs text-muted">
                {hydrated ? `${hours}h / ${WEEKLY_GOAL_HOURS}h logged` : "—"}
              </span>
              <span className="flex gap-1.5">
                <button
                  onClick={() => setHours((h) => Math.max(0, h - 1))}
                  className="grid h-8 w-8 place-items-center rounded-lg border border-violet-soft/35 bg-violet/[0.08] text-text transition-colors hover:border-violet-soft/70"
                  aria-label="Decrease hours"
                >
                  <Glyph name="minus" className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setHours((h) => h + 1)}
                  className="grid h-8 w-8 place-items-center rounded-lg border border-violet-soft/35 bg-violet/[0.08] text-text transition-colors hover:border-violet-soft/70"
                  aria-label="Add an hour"
                >
                  <Glyph name="plus" className="h-4 w-4" />
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Primary actions ── */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {!adding && (
          <button onClick={() => setAdding(true)} className="btn-gold">
            <Glyph name="plus" className="h-4 w-4" /> Save a resource
          </button>
        )}
        <button onClick={handleExport} className="btn-ghost ml-auto rounded-full">
          <Glyph name="download" className="h-4 w-4" /> Export learning journey
        </button>
      </div>

      {adding && <AddResourceForm onAdd={addResource} onClose={() => setAdding(false)} busy={busy} />}

      {/* ── Filters + search ── */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
          {RESOURCE_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              aria-pressed={category === cat}
              className={`chip px-4 py-2 text-sm ${category === cat ? "chip-active" : "hover:border-violet-soft/60"}`}
            >
              {cat}
              {listKnown && <span className="ml-1 opacity-80">({countFor(cat)})</span>}
            </button>
          ))}
        </div>
        <label className="relative block lg:w-80">
          <span className="sr-only">Search saved resources</span>
          <Glyph name="search" className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search saved resources…"
            className="input-hub py-2.5 pl-10 text-sm"
          />
        </label>
      </div>

      {/* ── Resource grid ── */}
      {filtered.length === 0 ? (
        <div className="card p-10 text-center text-muted">
          {!listKnown
            ? "Loading your saved resources…"
            : resources.length === 0
              ? "Nothing saved yet. Use “Save a resource” to add your first link."
              : "Nothing matches — clear the search or pick another category."}
        </div>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((r) => {
            const host = hostOf(r.url);
            const date = savedOn(r.saved_at);
            return (
              <li key={r.id} className="card card-hover flex gap-3.5 p-4 sm:p-5">
                <span className="icon-tile-muted h-11 w-11">
                  <Glyph name={r.type} className="h-5 w-5" />
                </span>
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start gap-2">
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`min-w-0 flex-1 break-words font-bold leading-snug hover:text-gold ${
                        r.completed ? "text-muted line-through" : "text-text"
                      }`}
                    >
                      {r.title}
                    </a>
                    <button
                      onClick={() => toggleComplete(r.id)}
                      aria-pressed={r.completed}
                      className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 transition-colors ${
                        r.completed
                          ? "border-transparent bg-violet text-onprimary"
                          : "border-muted/60 text-transparent hover:border-violet-soft"
                      }`}
                      aria-label={r.completed ? "Mark incomplete" : "Mark complete"}
                    >
                      <Glyph name="check" className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted">
                    <span className="rounded-md bg-violet/20 px-2 py-0.5 font-semibold text-violet-light">{r.type}</span>
                    {host && <span className="truncate">{host}</span>}
                    {date && <span>· {date}</span>}
                  </div>
                  {r.notes && <p className="mt-2 line-clamp-2 text-sm text-text/75">{r.notes}</p>}
                  <div className="mt-auto flex items-center justify-between gap-2 pt-3">
                    <span className="chip">{r.category}</span>
                    <button
                      onClick={() => removeResource(r.id)}
                      className="inline-flex items-center gap-1 rounded-lg px-1.5 py-1 text-xs text-muted transition-colors hover:text-danger"
                      aria-label={`Remove ${r.title}`}
                    >
                      <Glyph name="close" className="h-3.5 w-3.5" /> Remove
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <p className="text-center text-xs text-muted">
        {remote
          ? "Synced to Supabase — your resources follow you to every device."
          : "Saved to your browser (localStorage). Connect Supabase to sync across devices."}
      </p>
    </div>
  );
}

function ProgressBar({ pct }: { pct: number }) {
  return (
    <div className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-text/10">
      <div
        className="h-full rounded-full bg-gradient-to-r from-violet-soft to-violet-light transition-all duration-500"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

function AddResourceForm({
  onAdd,
  onClose,
  busy,
}: {
  onAdd: (d: Draft) => void;
  onClose: () => void;
  busy: boolean;
}) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState<ResourceCategory>("Jobpost");
  const [notes, setNotes] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !url.trim()) return;
    onAdd({ title, url, category, notes });
    setTitle("");
    setUrl("");
    setNotes("");
    onClose();
  };

  return (
    <form onSubmit={submit} className="card card-active space-y-3 p-5">
      <p className="font-bold text-text">Save a resource</p>
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title *"
          aria-label="Title"
          className="input-hub"
          required
        />
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="URL * (https://…)"
          aria-label="URL"
          className="input-hub"
          required
        />
      </div>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value as ResourceCategory)}
        aria-label="Category"
        className="input-hub"
      >
        {RESOURCE_CATEGORIES.filter((c) => c !== "All").map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <input
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Notes (optional)"
        aria-label="Notes"
        className="input-hub"
      />
      <div className="flex gap-2">
        <button type="submit" disabled={busy} className="btn-gold disabled:opacity-60">
          {busy ? "Saving…" : "Save"}
        </button>
        <button type="button" onClick={onClose} className="btn-ghost">
          Cancel
        </button>
      </div>
    </form>
  );
}
