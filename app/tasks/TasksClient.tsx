"use client";

import { useEffect, useMemo, useState } from "react";
import type { TaskItem, TaskStatus } from "@/app/lib/types";

const STORAGE_KEY = "lh.tasks.v1";
const STATUSES: TaskStatus[] = ["To Do", "In Progress", "Done"];
const DAYS = ["This week", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
type Filter = "All" | "Urgent" | TaskStatus;

const STATUS_CHIP: Record<TaskStatus, string> = {
  "To Do": "border-line text-muted",
  "In Progress": "border-neon-blue/50 text-neon-blue",
  Done: "border-neon-teal/50 text-neon-teal",
};

interface Draft {
  title: string;
  notes: string;
  day: string;
  status: TaskStatus;
  urgent: boolean;
}
const emptyDraft = (): Draft => ({
  title: "",
  notes: "",
  day: "This week",
  status: "To Do",
  urgent: false,
});

export default function TasksClient() {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [filter, setFilter] = useState<Filter>("All");
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setTasks(JSON.parse(saved));
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch {
      /* ignore */
    }
  }, [tasks, hydrated]);

  const counts = useMemo(
    () => ({
      total: tasks.length,
      urgent: tasks.filter((t) => t.urgent && t.status !== "Done").length,
      progress: tasks.filter((t) => t.status === "In Progress").length,
      done: tasks.filter((t) => t.status === "Done").length,
    }),
    [tasks],
  );

  const filtered = useMemo(() => {
    const list = tasks.filter((t) => {
      if (filter === "All") return true;
      if (filter === "Urgent") return t.urgent;
      return t.status === filter;
    });
    // Sort: not-done first, urgent first within that, newest first; done sinks.
    return [...list].sort((a, b) => {
      const ad = a.status === "Done" ? 1 : 0;
      const bd = b.status === "Done" ? 1 : 0;
      if (ad !== bd) return ad - bd;
      if (a.urgent !== b.urgent) return a.urgent ? -1 : 1;
      return b.createdAt - a.createdAt;
    });
  }, [tasks, filter]);

  const nextCreatedAt = () => tasks.reduce((m, t) => Math.max(m, t.createdAt), 0) + 1;

  const addTask = (d: Draft) => {
    setTasks((prev) => [
      { id: `t-${Date.now()}`, ...d, title: d.title.trim(), notes: d.notes.trim(), createdAt: nextCreatedAt() },
      ...prev,
    ]);
    setAdding(false);
  };

  const editTask = (id: string, d: Draft) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, ...d, title: d.title.trim(), notes: d.notes.trim() } : t,
      ),
    );
    setEditingId(null);
  };

  const setStatus = (id: string, status: TaskStatus) =>
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));

  const toggleUrgent = (id: string) =>
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, urgent: !t.urgent } : t)));

  const removeTask = (id: string) =>
    setTasks((prev) => prev.filter((t) => t.id !== id));

  const clearDone = () => setTasks((prev) => prev.filter((t) => t.status !== "Done"));

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Tasks" value={counts.total} accent="text-text" />
        <Stat label="Urgent" value={counts.urgent} accent="text-neon-pink" />
        <Stat label="In Progress" value={counts.progress} accent="text-neon-blue" />
        <Stat label="Done" value={counts.done} accent="text-neon-teal" />
      </div>

      {/* Controls */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {(["All", "Urgent", ...STATUSES] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`chip ${filter === f ? "chip-active" : "hover:border-violet-soft/60"}`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="flex shrink-0 gap-2">
          {counts.done > 0 && (
            <button onClick={clearDone} className="btn-ghost px-4 py-2 text-xs">
              Clear done
            </button>
          )}
          <button
            onClick={() => setAdding((v) => !v)}
            className="btn-violet px-4 py-2 text-xs"
          >
            {adding ? "Cancel" : "+ Add Task"}
          </button>
        </div>
      </div>

      {adding && (
        <TaskForm
          initial={emptyDraft()}
          submitLabel="Add Task"
          onSubmit={addTask}
          onCancel={() => setAdding(false)}
        />
      )}

      {/* List */}
      {filtered.length === 0 ? (
        <div className="card p-10 text-center text-muted">
          No tasks here. Click <span className="text-gold">+ Add Task</span> to plan your week.
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((t) =>
            editingId === t.id ? (
              <TaskForm
                key={t.id}
                initial={t}
                submitLabel="Save"
                onSubmit={(d) => editTask(t.id, d)}
                onCancel={() => setEditingId(null)}
              />
            ) : (
              <article
                key={t.id}
                className={`card card-hover accent-bar ${t.urgent && t.status !== "Done" ? "accent-pink" : "accent-purple"} group flex items-start gap-3 p-4`}
              >
                <button
                  onClick={() => toggleUrgent(t.id)}
                  title={t.urgent ? "Unmark urgent" : "Mark urgent"}
                  className={`mt-0.5 shrink-0 text-base leading-none transition-colors ${
                    t.urgent ? "text-neon-pink" : "text-muted hover:text-neon-pink"
                  }`}
                >
                  ⚡
                </button>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3
                      className={`font-semibold ${
                        t.status === "Done" ? "text-muted line-through" : "text-text"
                      }`}
                    >
                      {t.title}
                    </h3>
                    {t.day && t.day !== "This week" && (
                      <span className="chip border border-line text-[0.6rem]">{t.day}</span>
                    )}
                    {t.urgent && t.status !== "Done" && (
                      <span className="chip border border-neon-pink/50 text-[0.6rem] text-neon-pink">
                        Urgent
                      </span>
                    )}
                  </div>
                  {t.notes && <p className="mt-0.5 text-sm text-muted">{t.notes}</p>}
                  <div className="mt-2 flex flex-wrap items-center gap-1.5">
                    {STATUSES.map((s) => (
                      <button
                        key={s}
                        onClick={() => setStatus(t.id, s)}
                        className={`chip text-[0.6rem] ${
                          t.status === s ? "chip-active" : `border ${STATUS_CHIP[s]} hover:border-violet-soft/60`
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                  <button
                    onClick={() => setEditingId(t.id)}
                    className="text-xs text-muted hover:text-gold"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => removeTask(t.id)}
                    className="text-muted hover:text-neon-pink"
                    aria-label="Delete task"
                  >
                    ✕
                  </button>
                </div>
              </article>
            ),
          )}
        </div>
      )}

      <p className="text-center text-xs text-muted">
        Saved to your browser (localStorage). Plan your week, mark progress, flag what&apos;s urgent.
      </p>
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: number; accent: string }) {
  return (
    <div className="card card-hover p-4">
      <div className={`text-2xl font-black ${accent}`}>{value}</div>
      <div className="mt-0.5 text-xs text-text/70">{label}</div>
    </div>
  );
}

function TaskForm({
  initial,
  submitLabel,
  onSubmit,
  onCancel,
}: {
  initial: Draft | TaskItem;
  submitLabel: string;
  onSubmit: (d: Draft) => void;
  onCancel: () => void;
}) {
  const [title, setTitle] = useState(initial.title);
  const [notes, setNotes] = useState(initial.notes);
  const [day, setDay] = useState(initial.day || "This week");
  const [status, setStatus] = useState<TaskStatus>(initial.status);
  const [urgent, setUrgent] = useState(initial.urgent);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit({ title, notes, day, status, urgent });
  };

  return (
    <form onSubmit={submit} className="card space-y-3 p-5">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task *"
        className="input-hub"
        required
      />
      <input
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Notes (optional)"
        className="input-hub"
      />
      <div className="grid gap-3 sm:grid-cols-2">
        <select value={day} onChange={(e) => setDay(e.target.value)} className="input-hub">
          {DAYS.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as TaskStatus)}
          className="input-hub"
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
      <label className="flex items-center gap-2 text-sm text-text/80">
        <input
          type="checkbox"
          checked={urgent}
          onChange={(e) => setUrgent(e.target.checked)}
          className="h-4 w-4 accent-neon-pink"
        />
        ⚡ Mark as urgent
      </label>
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
