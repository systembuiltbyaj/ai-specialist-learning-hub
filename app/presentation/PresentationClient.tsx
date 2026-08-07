"use client";

import { useState } from "react";
import type { PresentationSlide } from "@/app/lib/types";
import AppliedClients from "./AppliedClients";

type Mode = "Booked" | "Applied";

// Slides arrive as props from the gated server component — never imported here,
// which would bake them into a publicly-fetchable client chunk.
export default function PresentationClient({
  bookedSlides: BOOKED_SLIDES,
  appliedSlides,
}: {
  bookedSlides: PresentationSlide[];
  appliedSlides: PresentationSlide[];
}) {
  const [mode, setMode] = useState<Mode>("Booked");

  return (
    <div className="space-y-6">
      <div className="grid gap-2 sm:grid-cols-2">
        <ModeButton
          active={mode === "Booked"}
          onClick={() => setMode("Booked")}
          icon="📅"
          title="Booked Call"
          subtitle="A client booked you — one fixed pitch & close flow."
        />
        <ModeButton
          active={mode === "Applied"}
          onClick={() => setMode("Applied")}
          icon="🚀"
          title="Applied"
          subtitle="You applied — a tailored deck per client (folders)."
        />
      </div>

      {mode === "Booked" ? (
        <>
          <div className="rounded-lg border border-line bg-white/[0.03] p-3 text-sm text-text/80">
            <span className="font-semibold text-gold">{BOOKED_SLIDES.length} sections.</span>{" "}
            Tap any to expand the talking points — and use the{" "}
            <span className="text-gold">“Say it”</span> lines as a ready script.
          </div>
          <div className="space-y-3">
            {BOOKED_SLIDES.map((s) => (
              <SlideCard key={s.n} slide={s} accent="#f6cb1f" defaultOpen={s.n === "01"} />
            ))}
          </div>
        </>
      ) : (
        <AppliedClients appliedSlides={appliedSlides} />
      )}
    </div>
  );
}

function ModeButton({
  active,
  onClick,
  icon,
  title,
  subtitle,
}: {
  active: boolean;
  onClick: () => void;
  icon: string;
  title: string;
  subtitle: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`card flex items-start gap-3 p-4 text-left transition-colors ${
        active ? "border-gold bg-gold/5" : "card-hover"
      }`}
    >
      <span className="text-xl">{icon}</span>
      <span>
        <span className={`block font-bold ${active ? "text-gold" : "text-text"}`}>{title}</span>
        <span className="text-xs text-muted">{subtitle}</span>
      </span>
    </button>
  );
}

function SlideCard({
  slide,
  accent,
  defaultOpen,
}: {
  slide: PresentationSlide;
  accent: string;
  defaultOpen: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <article className="card overflow-hidden" style={{ borderLeftColor: accent, borderLeftWidth: 3 }}>
      <button
        className="flex w-full items-start gap-4 p-5 text-left"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span
          className="grid h-10 w-10 shrink-0 place-items-center rounded-xl font-display text-base font-bold text-bg"
          style={{ backgroundColor: accent }}
        >
          {slide.n}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="font-bold text-text">{slide.title}</h3>
          <p className="mt-0.5 text-xs italic text-muted">{slide.goal}</p>
        </div>
        <span className="text-muted">{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div className="space-y-3 border-t border-line px-5 pb-5 pt-4">
          <ul className="space-y-2">
            {slide.points.map((p, i) => (
              <li key={i} className="flex gap-2 text-[0.85rem] leading-relaxed text-text/85">
                <span style={{ color: accent }}>•</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
          {slide.say && (
            <div className="rounded-lg border border-line bg-white/[0.03] p-3">
              <p className="font-mono text-[0.6rem] font-bold uppercase tracking-wider text-gold">
                💬 Say it
              </p>
              <p className="mt-1 text-sm italic leading-relaxed text-text/85">{slide.say}</p>
            </div>
          )}
        </div>
      )}
    </article>
  );
}
