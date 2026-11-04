import type { Metadata } from "next";
import { PROJECTS } from "@/data/projects";
import type { Level } from "@/app/lib/content/types";
import { ProjectGrid, type ProjectCard } from "./ProjectWidgets";
import PageHeader from "@/app/components/PageHeader";
import NavIcon from "@/app/components/NavIcons";
import LevelIcon from "@/app/learn/LevelIcon";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Hands-on AI projects with architecture, prerequisites, step-by-step builds, example workflows and testing — from a personal assistant to a deployed full-stack AI app.",
};

const LEVELS: Level[] = ["Beginner", "Intermediate", "Advanced"];

export default function ProjectsPage() {
  const cards: ProjectCard[] = PROJECTS.map((p) => ({
    id: p.id,
    title: p.title,
    level: p.level,
    summary: p.summary,
    hours: p.hours,
    stack: p.stack,
    stepCount: p.steps.length,
  }));

  return (
    <div className="container-hub space-y-6 py-8">
      <PageHeader href="/projects" eyebrow="Learn by building" title="Projects">
        Real builds, start to finish: the architecture, what you need first, every step, a worked example, and how to
        test it — including what happens when things fail. Tick steps off as you go.
      </PageHeader>

      {/* PageHeader's strip only takes route icons; the level figures need the level glyphs. */}
      <div className="stat-strip grid-cols-2 sm:grid-cols-4">
        <div className="flex items-center gap-3.5 px-5 py-4">
          <span className="icon-tile-muted h-11 w-11">
            <NavIcon href="/projects" className="h-5 w-5" />
          </span>
          <span className="min-w-0">
            <span className="block text-2xl font-extrabold leading-none tracking-[-0.03em] text-text">{PROJECTS.length}</span>
            <span className="mt-1 block truncate text-sm text-muted">Projects</span>
          </span>
        </div>
        {LEVELS.map((level) => (
          <div key={level} className="flex items-center gap-3.5 px-5 py-4">
            <span className="icon-tile-muted h-11 w-11">
              <LevelIcon level={level} className="h-5 w-5" />
            </span>
            <span className="min-w-0">
              <span className="block text-2xl font-extrabold leading-none tracking-[-0.03em] text-text">
                {PROJECTS.filter((p) => p.level === level).length}
              </span>
              <span className="mt-1 block truncate text-sm text-muted">{level}</span>
            </span>
          </div>
        ))}
      </div>

      <ProjectGrid projects={cards} />
    </div>
  );
}
