"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { TaskItem, TaskStatus } from "@/app/lib/types";
import Glyph, { type GlyphName } from "./Glyph";

const STORAGE_KEY = "lh.tasks.v1";
const STATUSES: TaskStatus[] = ["To Do", "In Progress", "Done"];
const DAYS = ["This week", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

type Priority = "all" | "urgent" | "normal";

// Each column owns one hue — violet waiting, yellow in motion, green finished —
// so a card's state reads from across the room before its title does.
const COLUMN: Record<
  TaskStatus,
  { dot: string; head: string; frame: string; drop: string; pill: string; art: string; glyph: GlyphName; empty: [string, string] }
> = {
  "To Do": {
    dot: "bg-violet-soft",
    head: "text-violet-light",
    frame: "border-violet-soft/45 bg-violet/[0.08]",
    drop: "border-violet-soft bg-violet/[0.16] shadow-glow",
    pill: "border-violet-soft/60 text-violet-light hover:bg-violet/15",
    art: "border-violet-soft/50 bg-violet/20 text-violet-light",
    glyph: "lines",
    empty: ["No cards yet", "Add your first task to get started."],
  },
  "In Progress": {
    dot: "bg-neon-yellow",
    head: "text-neon-yellow",
    frame: "border-neon-yellow/40 bg-neon-yellow/[0.05]",
    drop: "border-neon-yellow bg-neon-yellow/[0.1]",
    pill: "border-neon-yellow/60 text-neon-yellow hover:bg-neon-yellow/10",
    art: "border-neon-yellow/50 bg-neon-yellow/15 text-neon-yellow",
    glyph: "dots",
    empty: ["Nothing in progress", "Move a card here when you start working on it."],
  },
  Done: {
    dot: "bg-success",
    head: "text-success",
    frame: "border-success/35 bg-success/[0.05]",
    drop: "border-success bg-success/[0.1]",
    pill: "border-success/60 text-success hover:bg-success/10",
    art: "border-success/50 bg-success/15 text-success",
    glyph: "check",
    empty: ["Nothing done yet", "Completed cards will appear here."],
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
  const [dayFilter, setDayFilter] = useState("All");
  const [priority, setPriority] = useState<Priority>("all");

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

  const filtering = dayFilter !== "All" || priority !== "all";
  const visible = (t: TaskItem) =>
    (dayFilter === "All" || t.day === dayFilter) &&
    (priority === "all" || (priority === "urgent" ? t.urgent : !t.urgent));

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

  // Until storage is read the counts are unknown, not zero.
  const count = (n: number) => (hydrated ? n : "—");
  const stats: { label: string; value: number; glyph: GlyphName; tone: string }[] = [
    { label: "Total cards", value: tasks.length, glyph: "layers", tone: "bg-violet/20 text-violet-light" },
    { label: "To Do", value: byStatus["To Do"].length, glyph: "clipboard", tone: "bg-violet/20 text-violet-light" },
    { label: "In Progress", value: byStatus["In Progress"].length, glyph: "progress", tone: "bg-neon-yellow/15 text-neon-yellow" },
    { label: "Done", value: byStatus.Done.length, glyph: "done", tone: "bg-success/15 text-success" },
  ];

  return (
    <div className="space-y-5">
      {/* Screen readers get told about moves; sighted users see the card jump. */}
      <p aria-live="polite" className="sr-only">
        {announcement}
      </p>

      <div className="stat-strip grid-cols-2 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="flex items-center gap-3 px-4 py-4 sm:px-5">
            <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-full ${s.tone}`}>
              <Glyph name={s.glyph} className="h-6 w-6" />
            </span>
            <span className="min-w-0">
              <span className="block text-2xl font-extrabold leading-none tracking-[-0.03em] text-text">{count(s.value)}</span>
              <span className="mt-1 block truncate text-sm text-muted">{s.label}</span>
            </span>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button onClick={() => setAddingTo("To Do")} className="btn-violet">
          <Glyph name="plus" className="h-4 w-4" /> Add card
        </button>
        <label className="min-w-[9rem] flex-1 sm:max-w-[13rem]">
          <span className="sr-only">Filter by day</span>
          <select value={dayFilter} onChange={(e) => setDayFilter(e.target.value)} className="input-hub py-2.5 text-sm">
            <option value="All">All days</option>
            {DAYS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </label>
        <label className="min-w-[9rem] flex-1 sm:max-w-[13rem]">
          <span className="sr-only">Filter by priority</span>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
            className="input-hub py-2.5 text-sm"
          >
            <option value="all">All priorities</option>
            <option value="urgent">Urgent only</option>
            <option value="normal">Not urgent</option>
          </select>
        </label>
        {byStatus.Done.length > 0 && (
          <button
            onClick={clearDone}
            className="ml-auto text-sm font-medium text-muted underline decoration-line underline-offset-4 transition-colors hover:text-danger hover:decoration-danger"
          >
            Clear done ({byStatus.Done.length})
          </button>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {STATUSES.map((status) => {
          const all = byStatus[status];
          const cards = all.filter(visible);
          const isTarget = dropTarget === status;
          const style = COLUMN[status];
          const adding = addingTo === status;

          return (
            <section
              key={status}
              aria-label={status}
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
              className={`flex min-w-0 flex-col rounded-[1.25rem] border transition-[border-color,background-color,box-shadow] ${
                isTarget ? style.drop : style.frame
              }`}
            >
              <header className="flex items-center gap-2.5 border-b border-text/10 px-4 py-3.5">
                <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${style.dot}`} />
                <h2 className={`font-mono text-sm font-bold uppercase tracking-[0.12em] ${style.head}`}>{status}</h2>
                <span className={`ml-auto font-mono text-sm ${style.head}`}>
                  {filtering && hydrated ? `${cards.length}/${all.length}` : count(all.length)}
                </span>
              </header>

              <div className="flex min-h-[15rem] flex-1 flex-col gap-2.5 p-3">
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

                {cards.length === 0 && !adding && hydrated && (
                  <div className="flex flex-1 flex-col items-center justify-center px-2 pt-4 text-center">
                    <div className="relative h-14 w-20" aria-hidden>
                      <span className={`absolute left-0 top-2 h-11 w-16 -rotate-6 rounded-xl border opacity-60 ${style.art}`} />
                      <span className={`absolute right-0 top-0 grid h-11 w-16 place-items-center rounded-xl border ${style.art}`}>
                        <Glyph name={style.glyph} className="h-7 w-7" />
                      </span>
                    </div>
                    <p className="mt-4 font-bold text-text">
                      {all.length > 0 ? "No matching cards" : style.empty[0]}
                    </p>
                    <p className="mt-1 text-sm text-muted">
                      {all.length > 0 ? "Change the filters to see the rest of this column." : style.empty[1]}
                    </p>
                  </div>
                )}

                {adding ? (
                  <CardForm
                    initial={emptyDraft()}
                    submitLabel="Add card"
                    onSubmit={(d) => addTask(status, d)}
                    onCancel={() => setAddingTo(null)}
                  />
                ) : (
                  <button
                    onClick={() => setAddingTo(status)}
                    className={`inline-flex items-center gap-2 self-center rounded-full border px-5 py-2 text-sm font-semibold transition-colors ${style.pill} ${
                      cards.length === 0 && hydrated ? "mb-6 mt-4" : "mt-auto"
                    }`}
                  >
                    <Glyph name="plus" className="h-4 w-4" /> Add a card
                  </button>
                )}
              </div>
            </section>
          );
        })}
      </div>

      <p className="flex items-start gap-2 text-sm text-muted">
        <Glyph name="info" className="mt-0.5 h-4 w-4 shrink-0" />
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
      className={`group cursor-grab rounded-xl border border-violet-soft/20 bg-surface/80 px-3.5 py-3 shadow-card transition-[opacity,border-color] hover:border-violet-soft/45 active:cursor-grabbing ${
        dragging ? "opacity-40" : ""
      }`}
    >
      <div className="flex items-start gap-2">
        <h3
          className={`min-w-0 flex-1 break-words text-[0.9rem] font-semibold leading-snug ${
            done ? "text-muted line-through" : "text-text"
          }`}
        >
          {task.title}
        </h3>
        {task.urgent && !done && (
          <span className="shrink-0 rounded-full border border-neon-pink/50 bg-neon-pink/10 px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-neon-pink">
            Urgent
          </span>
        )}
      </div>

      {task.notes && (
        <p className="mt-1 line-clamp-2 text-[0.8rem] leading-relaxed text-muted">{task.notes}</p>
      )}

      <div className="mt-2.5 flex items-center gap-2">
        <span className="rounded-full bg-violet/10 px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-wider text-muted">
          {task.day}
        </span>

        {/* Drag-and-drop is mouse-only, so every move is also reachable by
            keyboard through these controls. Always shown on touch-sized screens. */}
        <div className="ml-auto flex items-center gap-0.5 transition-opacity sm:opacity-0 sm:focus-within:opacity-100 sm:group-hover:opacity-100">
          <IconButton label={`Move ${task.title} left`} disabled={i === 0} onClick={() => onMove(-1)}>
            ←
          </IconButton>
          <IconButton label={`Move ${task.title} right`} disabled={i === STATUSES.length - 1} onClick={() => onMove(1)}>
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
      className={`grid h-7 w-7 place-items-center rounded-lg font-mono text-[0.8rem] transition-colors hover:bg-violet/10 disabled:opacity-25 disabled:hover:bg-transparent ${
        danger ? "text-muted hover:text-danger" : "text-muted hover:text-gold"
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
    <form onSubmit={submit} className="space-y-2.5 rounded-xl border border-violet-soft/50 bg-surface/90 p-3 shadow-glow">
      <input
        ref={inputRef}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="What needs doing?"
        aria-label="Card title"
        className="input-hub px-3 py-2 text-[0.875rem]"
        required
      />
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Notes (optional)"
        aria-label="Notes"
        rows={2}
        className="input-hub resize-y px-3 py-2 text-[0.8rem]"
      />
      <div className="flex items-center gap-2">
        <select
          value={day}
          onChange={(e) => setDay(e.target.value)}
          aria-label="Day"
          className="input-hub w-auto min-w-0 flex-1 px-2.5 py-2 text-[0.8rem]"
        >
          {DAYS.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
        <label className="flex items-center gap-1.5 text-[0.8rem] text-muted">
          <input
            type="checkbox"
            checked={urgent}
            onChange={(e) => setUrgent(e.target.checked)}
            className="accent-neon-pink"
          />
          Urgent
        </label>
      </div>
      <div className="flex gap-2">
        <button type="submit" className="btn-violet px-4 py-1.5 text-xs">
          {submitLabel}
        </button>
        <button type="button" onClick={onCancel} className="btn-ghost px-4 py-1.5 text-xs">
          Cancel
        </button>
      </div>
    </form>
  );
}
