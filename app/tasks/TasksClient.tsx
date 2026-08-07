"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { TaskItem, TaskStatus } from "@/app/lib/types";

const STORAGE_KEY = "lh.tasks.v1";
const STATUSES: TaskStatus[] = ["To Do", "In Progress", "Done"];
const DAYS = ["This week", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// Gold marks the work happening now. To Do is waiting, Done recedes — a
// finished column should get quieter, not louder.
const COLUMN: Record<TaskStatus, { rail: string; head: string; tint: string }> = {
  "To Do": {
    rail: "bg-violet-soft",
    head: "text-violet-light",
    tint: "bg-violet/[0.07]",
  },
  "In Progress": {
    rail: "bg-gold",
    head: "text-gold",
    tint: "bg-gold/[0.06]",
  },
  Done: {
    rail: "bg-line",
    head: "text-muted",
    tint: "bg-white/[0.02]",
  },
};

interface Draft {
  title: string;
  notes: string;
  day: string;
  urgent: boolean;
}
const emptyDraft = (): Draft => ({ title: "", notes: "", day: "This week", urgent: false });

export default function TasksClient() {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [addingTo, setAddingTo] = useState<TaskStatus | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dropTarget, setDropTarget] = useState<TaskStatus | null>(null);
  const [announcement, setAnnouncement] = useState("");

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

  const byStatus = useMemo(() => {
    const map: Record<TaskStatus, TaskItem[]> = {
      "To Do": [],
      "In Progress": [],
      Done: [],
    };
    for (const t of tasks) map[t.status]?.push(t);
    for (const s of STATUSES) {
      map[s].sort((a, b) => {
        if (a.urgent !== b.urgent) return a.urgent ? -1 : 1;
        return b.createdAt - a.createdAt;
      });
    }
    return map;
  }, [tasks]);

  const nextCreatedAt = () => tasks.reduce((m, t) => Math.max(m, t.createdAt), 0) + 1;

  const addTask = (status: TaskStatus, d: Draft) => {
    if (!d.title.trim()) return;
    setTasks((prev) => [
      {
        id: `t-${Date.now()}`,
        ...d,
        title: d.title.trim(),
        notes: d.notes.trim(),
        status,
        createdAt: nextCreatedAt(),
      },
      ...prev,
    ]);
    setAddingTo(null);
  };

  const editTask = (id: string, d: Draft) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, ...d, title: d.title.trim(), notes: d.notes.trim() } : t,
      ),
    );
    setEditingId(null);
  };

  const moveTo = (id: string, status: TaskStatus) => {
    const task = tasks.find((t) => t.id === id);
    if (!task || task.status === status) return;
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));
    setAnnouncement(`${task.title} moved to ${status}`);
  };

  const toggleUrgent = (id: string) =>
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, urgent: !t.urgent } : t)));

  const removeTask = (id: string) => setTasks((prev) => prev.filter((t) => t.id !== id));

  const clearDone = () => setTasks((prev) => prev.filter((t) => t.status !== "Done"));

  return (
    <div className="space-y-4">
      {/* Screen readers get told about moves; sighted users see the card jump. */}
      <p aria-live="polite" className="sr-only">
        {announcement}
      </p>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="entry-meta">
          {tasks.length} {tasks.length === 1 ? "card" : "cards"}
          {byStatus.Done.length > 0 && <> · {byStatus.Done.length} done</>}
        </p>
        {byStatus.Done.length > 0 && (
          <button
            onClick={clearDone}
            className="font-mono text-[0.68rem] text-muted underline decoration-line underline-offset-4 transition-colors hover:text-neon-pink hover:decoration-neon-pink"
          >
            clear done
          </button>
        )}
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {STATUSES.map((status) => {
          const cards = byStatus[status];
          const isTarget = dropTarget === status;

          return (
            <section
              key={status}
              onDragOver={(e) => {
                e.preventDefault();
                setDropTarget(status);
              }}
              onDragLeave={() => setDropTarget((t) => (t === status ? null : t))}
              onDrop={(e) => {
                e.preventDefault();
                const id = e.dataTransfer.getData("text/plain");
                if (id) moveTo(id, status);
                setDropTarget(null);
                setDraggingId(null);
              }}
              className={`flex flex-col rounded-xl border transition-colors ${
                isTarget ? "border-gold bg-gold/[0.06]" : `border-line ${COLUMN[status].tint}`
              }`}
            >
              <header className="flex items-center gap-2 border-b border-line/70 px-4 py-3">
                <span className={`h-2 w-2 shrink-0 rounded-full ${COLUMN[status].rail}`} />
                <h2
                  className={`font-mono text-[0.7rem] font-bold uppercase tracking-[0.16em] ${COLUMN[status].head}`}
                >
                  {status}
                </h2>
                <span className="ml-auto font-mono text-[0.7rem] text-muted">
                  {cards.length}
                </span>
              </header>

              <div className="flex min-h-[7rem] flex-1 flex-col gap-2 p-3">
                {cards.map((task) =>
                  editingId === task.id ? (
                    <CardForm
                      key={task.id}
                      initial={task}
                      submitLabel="Save"
                      onSubmit={(d) => editTask(task.id, d)}
                      onCancel={() => setEditingId(null)}
                    />
                  ) : (
                    <Card
                      key={task.id}
                      task={task}
                      dragging={draggingId === task.id}
                      onDragStart={(e) => {
                        e.dataTransfer.setData("text/plain", task.id);
                        e.dataTransfer.effectAllowed = "move";
                        setDraggingId(task.id);
                      }}
                      onDragEnd={() => {
                        setDraggingId(null);
                        setDropTarget(null);
                      }}
                      onMove={(dir) => {
                        const i = STATUSES.indexOf(task.status);
                        const next = STATUSES[i + dir];
                        if (next) moveTo(task.id, next);
                      }}
                      onEdit={() => setEditingId(task.id)}
                      onToggleUrgent={() => toggleUrgent(task.id)}
                      onRemove={() => removeTask(task.id)}
                    />
                  ),
                )}

                {addingTo === status ? (
                  <CardForm
                    initial={emptyDraft()}
                    submitLabel="Add card"
                    onSubmit={(d) => addTask(status, d)}
                    onCancel={() => setAddingTo(null)}
                  />
                ) : (
                  <button
                    onClick={() => setAddingTo(status)}
                    className="mt-auto rounded-lg border border-dashed border-line px-3 py-2 text-left font-mono text-[0.7rem] text-muted transition-colors hover:border-gold/60 hover:text-gold"
                  >
                    + Add a card
                  </button>
                )}
              </div>
            </section>
          );
        })}
      </div>

      <p className="font-mono text-[0.65rem] text-muted">
        Drag a card between columns, or use the ← → buttons. Saved to this browser only.
      </p>
    </div>
  );
}

function Card({
  task,
  dragging,
  onDragStart,
  onDragEnd,
  onMove,
  onEdit,
  onToggleUrgent,
  onRemove,
}: {
  task: TaskItem;
  dragging: boolean;
  onDragStart: (e: React.DragEvent) => void;
  onDragEnd: () => void;
  onMove: (dir: 1 | -1) => void;
  onEdit: () => void;
  onToggleUrgent: () => void;
  onRemove: () => void;
}) {
  const i = STATUSES.indexOf(task.status);
  const done = task.status === "Done";

  return (
    <article
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      className={`group cursor-grab rounded-lg border border-line bg-surface px-3 py-2.5 transition-opacity active:cursor-grabbing ${
        dragging ? "opacity-40" : ""
      }`}
    >
      <div className="flex items-start gap-2">
        {task.urgent && !done && (
          <span
            className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-neon-pink"
            title="Urgent"
          />
        )}
        <h3
          className={`flex-1 text-[0.875rem] font-semibold leading-snug ${
            done ? "text-muted line-through" : "text-text"
          }`}
        >
          {task.title}
        </h3>
      </div>

      {task.notes && (
        <p className="mt-1 line-clamp-2 text-[0.78rem] leading-relaxed text-muted">
          {task.notes}
        </p>
      )}

      <div className="mt-2 flex items-center gap-2">
        <span className="font-mono text-[0.6rem] uppercase tracking-wider text-muted">
          {task.day}
        </span>

        {/* Drag-and-drop is mouse-only, so every move is also reachable by
            keyboard through these controls. */}
        <div className="ml-auto flex items-center gap-1 opacity-0 transition-opacity focus-within:opacity-100 group-hover:opacity-100">
          <IconButton
            label={`Move ${task.title} left`}
            disabled={i === 0}
            onClick={() => onMove(-1)}
          >
            ←
          </IconButton>
          <IconButton
            label={`Move ${task.title} right`}
            disabled={i === STATUSES.length - 1}
            onClick={() => onMove(1)}
          >
            →
          </IconButton>
          <IconButton label={`Flag ${task.title} urgent`} onClick={onToggleUrgent}>
            !
          </IconButton>
          <IconButton label={`Edit ${task.title}`} onClick={onEdit}>
            ✎
          </IconButton>
          <IconButton label={`Delete ${task.title}`} onClick={onRemove} danger>
            ✕
          </IconButton>
        </div>
      </div>
    </article>
  );
}

function IconButton({
  label,
  onClick,
  disabled,
  danger,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  danger?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className={`grid h-5 w-5 place-items-center rounded font-mono text-[0.7rem] transition-colors disabled:opacity-25 ${
        danger ? "text-muted hover:text-neon-pink" : "text-muted hover:text-gold"
      }`}
    >
      {children}
    </button>
  );
}

function CardForm({
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
  const [day, setDay] = useState(initial.day);
  const [urgent, setUrgent] = useState(initial.urgent);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => inputRef.current?.focus(), []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit({ title, notes, day, urgent });
  };

  return (
    <form
      onSubmit={submit}
      className="space-y-2 rounded-lg border border-gold/50 bg-surface p-3"
    >
      <input
        ref={inputRef}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="What needs doing?"
        className="input-hub px-2.5 py-1.5 text-[0.875rem]"
        required
      />
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Notes (optional)"
        rows={2}
        className="input-hub resize-y px-2.5 py-1.5 text-[0.8rem]"
      />
      <div className="flex items-center gap-2">
        <select
          value={day}
          onChange={(e) => setDay(e.target.value)}
          className="input-hub w-auto flex-1 px-2 py-1.5 font-mono text-[0.7rem]"
        >
          {DAYS.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
        <label className="flex items-center gap-1.5 font-mono text-[0.68rem] text-muted">
          <input
            type="checkbox"
            checked={urgent}
            onChange={(e) => setUrgent(e.target.checked)}
            className="accent-[#ff6ba3]"
          />
          urgent
        </label>
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          className="rounded-md bg-gold px-3 py-1.5 text-[0.75rem] font-bold text-bg transition-colors hover:brightness-110"
        >
          {submitLabel}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md border border-line px-3 py-1.5 font-mono text-[0.7rem] text-muted transition-colors hover:text-text"
        >
          cancel
        </button>
      </div>
    </form>
  );
}
