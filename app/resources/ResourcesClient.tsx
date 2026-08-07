"use client";

import { useEffect, useMemo, useState } from "react";
import type { Resource, ResourceCategory } from "@/app/lib/types";
import { RESOURCE_CATEGORIES } from "@/app/lib/constants";
import { WEEKLY_GOAL_HOURS } from "@/app/lib/seed/resources";
import { exportResourcesToMarkdown, downloadFile } from "@/app/lib/export";

const STORAGE_KEY = "lh.resources.v1";
const HOURS_KEY = "lh.hours.v1";

const TYPE_ICON: Record<Resource["type"], string> = {
  Video: "▶",
  Docs: "📄",
  Article: "📝",
  Course: "🎓",
  Tool: "🛠",
  Post: "🔗",
};

interface Draft {
  title: string;
  url: string;
  category: ResourceCategory;
  notes: string;
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
  const [hours, setHours] = useState<number>(0);
  const [hydrated, setHydrated] = useState(false);
  const [busy, setBusy] = useState(false);

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

  const filtered = useMemo(
    () =>
      category === "All"
        ? resources
        : resources.filter((r) => r.category === category),
    [resources, category],
  );

  const completed = resources.filter((r) => r.completed).length;
  const progress = resources.length
    ? Math.round((completed / resources.length) * 100)
    : 0;
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
    <div className="space-y-8">
      {/* ── Progress dashboard ── */}
      <div className="grid gap-4 md:grid-cols-3">
        <StatPanel title="Resources Saved" value={resources.length} icon="🔖" />
        <div className="card p-5">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-text">Learning Progress</span>
            <span className="text-sm font-bold text-gold">{progress}%</span>
          </div>
          <ProgressBar pct={progress} />
          <p className="mt-2 text-xs text-muted">
            {completed} of {resources.length} completed
          </p>
        </div>
        <div className="card p-5">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-text">
              Weekly Goal · {WEEKLY_GOAL_HOURS}h
            </span>
            <span className="text-sm font-bold text-gold">{goalPct}%</span>
          </div>
          <ProgressBar pct={goalPct} />
          <div className="mt-3 flex items-center gap-2">
            <button
              onClick={() => setHours((h) => Math.max(0, h - 1))}
              className="grid h-7 w-7 place-items-center rounded border border-line text-text/70 hover:border-gold"
              aria-label="Decrease hours"
            >
              −
            </button>
            <span className="min-w-[3.5rem] text-center text-sm text-text/80">
              {hours}h logged
            </span>
            <button
              onClick={() => setHours((h) => h + 1)}
              className="grid h-7 w-7 place-items-center rounded border border-line text-text/70 hover:border-gold"
              aria-label="Add an hour"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <AddResourceForm onAdd={addResource} busy={busy} />

      {/* ── Filters + export ── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {RESOURCE_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`chip ${category === cat ? "chip-active" : "hover:border-violet-soft/60"}`}
            >
              {cat}
            </button>
          ))}
        </div>
        <button onClick={handleExport} className="btn-ghost shrink-0 px-4 py-2 text-xs">
          ⬇ Export Learning Journey
        </button>
      </div>

      {/* ── Resource list ── */}
      <div className="grid gap-3">
        {filtered.length === 0 && (
          <div className="card p-8 text-center text-muted">
            No resources in this category yet. Add one above.
          </div>
        )}
        {filtered.map((r) => (
          <div key={r.id} className="card card-hover flex items-start gap-3 p-4">
            <button
              onClick={() => toggleComplete(r.id)}
              className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded border text-xs transition-colors ${
                r.completed
                  ? "border-gold bg-gold text-bg"
                  : "border-line text-transparent hover:border-gold"
              }`}
              aria-label={r.completed ? "Mark incomplete" : "Mark complete"}
            >
              ✓
            </button>
            <div className="min-w-0 flex-1">
              <a
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`font-semibold hover:text-gold ${
                  r.completed ? "text-muted line-through" : "text-text"
                }`}
              >
                {TYPE_ICON[r.type]} {r.title}
              </a>
              {r.notes && (
                <p className="mt-0.5 truncate text-sm text-muted">{r.notes}</p>
              )}
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <span className="chip border border-line">{r.category}</span>
              <button
                onClick={() => removeResource(r.id)}
                className="text-muted hover:text-neon-pink"
                aria-label="Remove resource"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>

      <p className="text-center text-xs text-muted">
        {remote
          ? "Synced to Supabase — your resources follow you to every device."
          : "Saved to your browser (localStorage). Connect Supabase to sync across devices."}
      </p>
    </div>
  );
}

function StatPanel({ title, value, icon }: { title: string; value: number; icon: string }) {
  return (
    <div className="card p-5">
      <div className="text-2xl">{icon}</div>
      <div className="mt-1 text-3xl font-black text-gold">{value}</div>
      <div className="text-sm text-text">{title}</div>
    </div>
  );
}

function ProgressBar({ pct }: { pct: number }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-black/40">
      <div
        className="h-full rounded-full bg-gold transition-all duration-500"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

function AddResourceForm({
  onAdd,
  busy,
}: {
  onAdd: (d: Draft) => void;
  busy: boolean;
}) {
  const [open, setOpen] = useState(false);
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
    setOpen(false);
  };

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} className="btn-gold">
        + Save a Resource
      </button>
    );
  }

  return (
    <form onSubmit={submit} className="card space-y-3 p-5">
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title *"
          className="input-hub"
          required
        />
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="URL * (https://…)"
          className="input-hub"
          required
        />
      </div>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value as ResourceCategory)}
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
        className="input-hub"
      />
      <div className="flex gap-2">
        <button type="submit" disabled={busy} className="btn-gold disabled:opacity-60">
          {busy ? "Saving…" : "Save"}
        </button>
        <button type="button" onClick={() => setOpen(false)} className="btn-ghost">
          Cancel
        </button>
      </div>
    </form>
  );
}
