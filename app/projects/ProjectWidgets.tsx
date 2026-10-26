"use client";

import { useState } from "react";
import Link from "next/link";
import type { Level } from "@/app/lib/content/types";
import { useHydrated, useLearner } from "@/app/lib/learner/store";
import { toggleProjectStep } from "@/app/lib/learner/state";
import BookmarkButton from "@/app/components/BookmarkButton";

export interface ProjectCard {
  id: string;
  title: string;
  level: Level;
  summary: string;
  hours: string;
  stack: string[];
  stepCount: number;
}

const LEVELS: (Level | "All")[] = ["All", "Beginner", "Intermediate", "Advanced"];

function useStepsDone(projectId: string): number[] {
  const [learner] = useLearner();
  const hydrated = useHydrated();
  return hydrated ? (learner.projectSteps[projectId] ?? []) : [];
}

function ProgressLine({ done, total }: { done: number; total: number }) {
  const pct = total ? Math.round((done / total) * 100) : 0;
  return (
    <div className="flex items-center gap-2 text-xs text-muted">
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10" aria-hidden>
        <div className="h-full rounded-full bg-gradient-to-r from-gold to-violet-soft" style={{ width: `${pct}%` }} />
      </div>
      <span className="font-mono">
        {done}/{total}
      </span>
    </div>
  );
}

function ProjectTile({ project }: { project: ProjectCard }) {
  const done = useStepsDone(project.id).length;
  return (
    <article className="card card-hover relative flex flex-col p-5">
      <div className="flex items-start justify-between gap-3">
        <p className="eyebrow">
          {project.level} · {project.hours}
        </p>
        <BookmarkButton kind="project" id={project.id} label={project.title} compact />
      </div>
      <h2 className="mt-1.5 text-lg font-bold text-text">
        {/* The stretched link makes the whole card clickable while the bookmark stays its own button. */}
        <Link href={`/projects/${project.id}`} className="after:absolute after:inset-0 hover:text-gold">
          {project.title}
        </Link>
      </h2>
      <p className="mt-1.5 flex-1 text-sm text-muted">{project.summary}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {project.stack.slice(0, 5).map((tool) => (
          <span key={tool} className="tag">
            {tool}
          </span>
        ))}
      </div>
      <div className="mt-4">
        <ProgressLine done={done} total={project.stepCount} />
      </div>
    </article>
  );
}

export function ProjectGrid({ projects }: { projects: ProjectCard[] }) {
  const [level, setLevel] = useState<Level | "All">("All");
  const visible = projects.filter((p) => level === "All" || p.level === level);
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by level">
        {LEVELS.map((l) => (
          <button
            key={l}
            onClick={() => setLevel(l)}
            aria-pressed={level === l}
            className={`chip ${level === l ? "chip-active" : "hover:border-gold/60"}`}
          >
            {l}
          </button>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((project) => (
          <ProjectTile key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}

export function StepCheck({ projectId, step, title }: { projectId: string; step: number; title: string }) {
  const [, update] = useLearner();
  const done = useStepsDone(projectId).includes(step);
  return (
    <button
      onClick={() => update((state) => toggleProjectStep(state, projectId, step))}
      aria-pressed={done}
      aria-label={done ? `Mark step ${step + 1}, ${title}, as not done` : `Mark step ${step + 1}, ${title}, as done`}
      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border font-mono text-xs font-bold transition-colors ${
        done ? "border-[#34d399] bg-[#34d399]/15 text-[#34d399]" : "border-gold/60 text-gold hover:bg-gold/10"
      }`}
    >
      {done ? "✓" : step + 1}
    </button>
  );
}

export function ProjectProgress({ projectId, total }: { projectId: string; total: number }) {
  const done = useStepsDone(projectId).length;
  return (
    <div className="space-y-1">
      <p className="text-xs text-muted">{done === total ? "All steps done — nice work." : "Tick steps off as you build."}</p>
      <ProgressLine done={done} total={total} />
    </div>
  );
}
