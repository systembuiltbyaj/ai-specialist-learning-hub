import type { Metadata } from "next";
import { PROJECTS } from "@/data/projects";
import { ProjectGrid, type ProjectCard } from "./ProjectWidgets";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Hands-on AI projects with architecture, prerequisites, step-by-step builds, example workflows and testing — from a personal assistant to a deployed full-stack AI app.",
};

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
      <header>
        <p className="eyebrow">Learn by building</p>
        <h1 className="section-title">🛠 Projects</h1>
        <p className="mt-2 max-w-2xl text-muted">
          Real builds, start to finish: the architecture, what you need first, every step, a worked example, and how to
          test it — including what happens when things fail. Tick steps off as you go.
        </p>
      </header>
      <ProjectGrid projects={cards} />
    </div>
  );
}
