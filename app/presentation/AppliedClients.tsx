"use client";

import { useEffect, useMemo, useState } from "react";
import type { AppliedClient, AppliedSlide, PresentationSlide } from "@/app/lib/types";
import { downloadFile } from "@/app/lib/export";
import { buildPresentationHtml } from "@/app/lib/presentationHtml";

const STORAGE_KEY = "lh.applied.v1";
const ACCENT = "#7c5cfc";

// Fresh copy of the template so each client starts tailorable.
function templateSlides(appliedSlides: PresentationSlide[]): AppliedSlide[] {
  return appliedSlides.map((s) => ({
    title: s.title,
    goal: s.goal,
    points: [...s.points],
    say: s.say ?? "",
  }));
}

function slug(name: string) {
  return (name || "presentation").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export default function AppliedClients({
  appliedSlides,
}: {
  appliedSlides: PresentationSlide[];
}) {
  const [clients, setClients] = useState<AppliedClient[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setClients(JSON.parse(saved));
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(clients));
    } catch {
      /* ignore */
    }
  }, [clients, hydrated]);

  const selected = useMemo(
    () => clients.find((c) => c.id === selectedId) ?? null,
    [clients, selectedId],
  );

  const addClient = (name: string, company: string, link: string) => {
    const c: AppliedClient = {
      id: `ac-${Date.now()}`,
      name: name.trim(),
      company: company.trim(),
      link: link.trim(),
      notes: "",
      slides: templateSlides(appliedSlides),
      updatedAt: Date.now(),
    };
    setClients((prev) => [c, ...prev]);
    setAdding(false);
    setSelectedId(c.id);
  };

  const updateClient = (id: string, patch: Partial<AppliedClient>) =>
    setClients((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...patch, updatedAt: Date.now() } : c)),
    );

  const removeClient = (id: string) => {
    setClients((prev) => prev.filter((c) => c.id !== id));
    if (selectedId === id) setSelectedId(null);
  };

  // ── Detail / editor view ──
  if (selected) {
    return (
      <ClientEditor
        client={selected}
        onBack={() => setSelectedId(null)}
        onChange={(patch) => updateClient(selected.id, patch)}
      />
    );
  }

  // ── List view ──
  return (
    <div className="space-y-5">
      <div className="rounded-lg border border-violet-soft/30 bg-violet/[0.06] p-3 text-sm text-text/80">
        <span className="font-semibold text-violet-light">One folder per client you applied to.</span>{" "}
        Each starts from the template — then tailor it exclusively for them. Autosaves.
      </div>

      <button onClick={() => setAdding((v) => !v)} className="btn-violet">
        {adding ? "Cancel" : "+ New Client Presentation"}
      </button>

      {adding && <AddClientForm onAdd={addClient} onCancel={() => setAdding(false)} />}

      {clients.length === 0 && !adding && (
        <div className="card p-10 text-center text-muted">
          No client presentations yet. Click{" "}
          <span className="text-violet-light">+ New Client Presentation</span> to make one.
        </div>
      )}

      <div className="grid gap-3 md:grid-cols-2">
        {clients.map((c) => (
          <article key={c.id} className="card card-hover accent-bar accent-purple flex flex-col p-5">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h3 className="font-bold text-text">{c.name}</h3>
                {c.company && <p className="text-xs text-muted">{c.company}</p>}
              </div>
              <button
                onClick={() => removeClient(c.id)}
                className="text-muted hover:text-neon-pink"
                aria-label="Delete client"
              >
                ✕
              </button>
            </div>
            {c.notes && <p className="mt-2 line-clamp-2 text-sm text-text/70">{c.notes}</p>}
            <div className="mt-3 flex items-center justify-between">
              <span className="font-mono text-[0.6rem] text-muted">
                {c.slides.length} sections
              </span>
              <button
                onClick={() => setSelectedId(c.id)}
                className="btn-ghost px-3 py-1.5 text-xs"
              >
                Open →
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function AddClientForm({
  onAdd,
  onCancel,
}: {
  onAdd: (name: string, company: string, link: string) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [link, setLink] = useState("");
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAdd(name, company, link);
  };
  return (
    <form onSubmit={submit} className="card space-y-3 p-5">
      <div className="grid gap-3 sm:grid-cols-2">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Client / contact name *" className="input-hub" required />
        <input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company / role" className="input-hub" />
      </div>
      <input value={link} onChange={(e) => setLink(e.target.value)} placeholder="Job post / company link (optional)" className="input-hub" />
      <div className="flex gap-2">
        <button type="submit" className="btn-violet">Create</button>
        <button type="button" onClick={onCancel} className="btn-ghost">Cancel</button>
      </div>
      <p className="text-xs text-muted">Starts with the Applied template (9 sections) for you to tailor.</p>
    </form>
  );
}

function ClientEditor({
  client,
  onBack,
  onChange,
}: {
  client: AppliedClient;
  onBack: () => void;
  onChange: (patch: Partial<AppliedClient>) => void;
}) {
  const [deckUrl, setDeckUrl] = useState<string | null>(null);
  const exportHtml = () =>
    downloadFile(
      buildPresentationHtml(client),
      `presentation-${slug(client.name)}.html`,
      "text/html",
    );
  const present = () => {
    const url = URL.createObjectURL(
      new Blob([buildPresentationHtml(client)], { type: "text/html" }),
    );
    setDeckUrl(url);
  };
  const closePresent = () =>
    setDeckUrl((u) => {
      if (u) URL.revokeObjectURL(u);
      return null;
    });
  const setSlide = (i: number, patch: Partial<AppliedSlide>) => {
    const slides = client.slides.map((s, idx) => (idx === i ? { ...s, ...patch } : s));
    onChange({ slides });
  };
  const addSlide = () =>
    onChange({ slides: [...client.slides, { title: "New section", goal: "", points: [], say: "" }] });
  const removeSlide = (i: number) =>
    onChange({ slides: client.slides.filter((_, idx) => idx !== i) });
  const moveSlide = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= client.slides.length) return;
    const slides = [...client.slides];
    [slides[i], slides[j]] = [slides[j], slides[i]];
    onChange({ slides });
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <button onClick={onBack} className="btn-ghost px-3 py-1.5 text-xs">← All clients</button>
        <div className="flex gap-2">
          <button onClick={present} className="btn-violet px-3 py-1.5 text-xs">
            ▶ Present
          </button>
          <button onClick={exportHtml} className="btn-ghost px-3 py-1.5 text-xs">
            ⬇ Export HTML
          </button>
        </div>
      </div>

      {/* Folder meta */}
      <div className="card space-y-3 p-5">
        <div className="grid gap-3 sm:grid-cols-2">
          <input value={client.name} onChange={(e) => onChange({ name: e.target.value })} placeholder="Client / contact name" className="input-hub" />
          <input value={client.company} onChange={(e) => onChange({ company: e.target.value })} placeholder="Company / role" className="input-hub" />
        </div>
        <input value={client.link} onChange={(e) => onChange({ link: e.target.value })} placeholder="Job post / company link" className="input-hub" />
        <textarea value={client.notes} onChange={(e) => onChange({ notes: e.target.value })} placeholder="Research notes about this client (their goals, pain, what to emphasize)…" rows={2} className="input-hub resize-y" />
      </div>

      {/* Slides editor */}
      <div className="space-y-3">
        {client.slides.map((s, i) => (
          <article key={i} className="card overflow-hidden" style={{ borderLeftColor: ACCENT, borderLeftWidth: 3 }}>
            <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg font-display text-xs font-bold text-bg" style={{ backgroundColor: ACCENT }}>
                {i + 1}
              </span>
              <input
                value={s.title}
                onChange={(e) => setSlide(i, { title: e.target.value })}
                placeholder="Section title"
                className="flex-1 bg-transparent font-bold text-text outline-none"
              />
              <button onClick={() => moveSlide(i, -1)} className="px-1 text-muted hover:text-gold" aria-label="Move up">↑</button>
              <button onClick={() => moveSlide(i, 1)} className="px-1 text-muted hover:text-gold" aria-label="Move down">↓</button>
              <button onClick={() => removeSlide(i)} className="px-1 text-muted hover:text-neon-pink" aria-label="Delete section">✕</button>
            </div>
            <div className="space-y-2 p-4">
              <input
                value={s.goal}
                onChange={(e) => setSlide(i, { goal: e.target.value })}
                placeholder="Goal of this section (optional)"
                className="input-hub text-sm"
              />
              <div>
                <label className="eyebrow mb-1 block">Talking points (one per line)</label>
                <textarea
                  value={s.points.join("\n")}
                  onChange={(e) => setSlide(i, { points: e.target.value.split("\n") })}
                  rows={Math.max(3, s.points.length)}
                  className="input-hub resize-y text-sm"
                />
              </div>
              <div>
                <label className="eyebrow mb-1 block">💬 Say it (script line)</label>
                <textarea
                  value={s.say}
                  onChange={(e) => setSlide(i, { say: e.target.value })}
                  placeholder="A ready-to-say line for this section…"
                  rows={2}
                  className="input-hub resize-y text-sm"
                />
              </div>
            </div>
          </article>
        ))}
        <button onClick={addSlide} className="btn-ghost w-full">+ Add section</button>
      </div>

      <p className="text-center text-xs text-muted">
        Saved to your browser (localStorage). <span className="text-violet-light">▶ Present</span> for
        a full-screen branded deck, or <span className="text-violet-light">Export HTML</span> for a
        self-contained website file.
      </p>

      {deckUrl && (
        <div className="fixed inset-0 z-[100] bg-bg">
          <iframe title="Presentation" src={deckUrl} className="h-full w-full border-0" />
          <button
            onClick={closePresent}
            className="absolute right-4 top-4 z-[101] grid h-10 w-10 place-items-center rounded-full border border-line bg-black/50 text-text backdrop-blur hover:border-neon-pink hover:text-neon-pink"
            aria-label="Close presentation"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
