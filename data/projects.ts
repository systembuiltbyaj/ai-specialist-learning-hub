// Hands-on project library, easiest first. Content lives in data/projects/;
// validated by tests/paths.test.ts.
import type { Project } from "../app/lib/content/types";
import { PROJECTS_A } from "./projects/batch-a";
import { PROJECTS_B } from "./projects/batch-b";

const LEVEL_ORDER = { Beginner: 0, Intermediate: 1, Advanced: 2 } as const;

export const PROJECTS: Project[] = [...PROJECTS_A, ...PROJECTS_B].sort(
  (a, b) => LEVEL_ORDER[a.level] - LEVEL_ORDER[b.level],
);

export const PROJECTS_BY_ID: Record<string, Project> = Object.fromEntries(PROJECTS.map((project) => [project.id, project]));
