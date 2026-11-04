"use client";

import { useState } from "react";
import Link from "next/link";
import type { Level } from "@/app/lib/content/types";
import { useHydrated, useLearner } from "@/app/lib/learner/store";
import { toggleProjectStep } from "@/app/lib/learner/state";
import BookmarkButton from "@/app/components/BookmarkButton";
import LevelIcon from "@/app/learn/LevelIcon";

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
  const complete = total > 0 && done === total;
  return (
    <div className="flex items-center gap-3 text-xs text-muted">
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-violet-soft/15" aria-hidden>
        <div
          className={`h-full rounded-full transition-all ${complete ? "bg-success" : "bg-gradient-to-r from-violet-light to-violet"}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className={`font-mono ${complete ? "font-bold text-success" : ""}`}>
        {done}/{total}
        {complete && <span aria-hidden> ✓</span>}
      </span>
    </div>
  );
}

const PLAY = (
  <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor" aria-hidden>
    <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
  </svg>
);

function ProjectTile({ project }: { project: ProjectCard }) {
  const done = useStepsDone(project.id).length;
  const complete = project.stepCount > 0 && done === project.stepCount;
  const extraTools = project.stack.length - 2;
  return (
    <article className={`card card-hover flex flex-col p-5 ${complete ? "!border-success/50" : ""}`}>
      <div className="flex items-start justify-between gap-3">
        <p className="inline-flex rounded-full border border-violet-soft/35 bg-violet/10 px-2.5 py-0.5 text-[0.7rem] font-semibold text-violet-light">
          {project.level} · {project.hours}
        </p>
        {/* Lifted above the card's stretched link so it stays its own button. */}
        <div className="relative z-10">
          <BookmarkButton kind="project" id={project.id} label={project.title} compact />
        </div>
      </div>

      <div className="mt-4 flex flex-1 items-start gap-3.5">
        <span className="icon-tile-muted h-12 w-12">
          <LevelIcon level={project.level} className="h-6 w-6" />
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="text-base font-bold leading-snug text-text sm:text-[1.0625rem]">
            {/* The stretched link makes the whole card clickable while the bookmark stays its own button. */}
            <Link href={`/projects/${project.id}`} className="rounded-sm after:absolute after:inset-0 after:rounded-[1.25rem] hover:text-gold">
              {project.title}
            </Link>
          </h2>
          <p className="mt-1.5 line-clamp-2 text-sm text-muted">{project.summary}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.stack.slice(0, 2).map((tool) => (
          <span key={tool} className="tag rounded-full px-2.5">
            {tool}
          </span>
        ))}
        {extraTools > 0 && (
          <span className="tag rounded-full px-2.5" title={project.stack.slice(2).join(", ")}>
            +{extraTools}
          </span>
        )}
      </div>

      <div className="mt-4">
        <ProgressLine done={done} total={project.stepCount} />
      </div>

      {/* Visual affordances only — the stretched title link already makes the whole card the target. */}
      <div aria-hidden className="mt-4 flex items-center justify-between gap-3 text-sm">
        {complete ? (
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-success/40 bg-success/15 px-3.5 py-1.5 text-xs font-bold text-success">
            ✓ Completed
          </span>
        ) : (
          <span className="inline-flex items-center gap-2 rounded-lg bg-violet-soft/25 px-3.5 py-1.5 text-xs font-bold text-text">
            {PLAY}
            {done > 0 ? "Continue" : "Start"}
          </span>
        )}
        <span className="text-xs font-medium text-text/80">View details →</span>
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
            className={`chip px-4 py-2 text-sm ${level === l ? "chip-active" : "hover:border-violet-soft/60"}`}
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
        done ? "border-success bg-success/15 text-success" : "border-gold/60 text-gold hover:bg-gold/10"
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
