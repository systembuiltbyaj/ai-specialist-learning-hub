import { describe, it, expect } from "vitest";
import { DICTIONARY_BY_ID } from "@/data/dictionary";
import { PATHS, LESSON_ORDER, findLesson } from "@/data/paths";
import { PROJECTS } from "@/data/projects";
import { LearningPathSchema, ProjectSchema } from "@/app/lib/content/schema";

function issues(result: { success: boolean; error?: { issues: { path: PropertyKey[]; message: string }[] } }): string[] {
  return result.success ? [] : (result.error?.issues ?? []).map((i) => `${i.path.join(".")} ${i.message}`);
}

describe("learning paths", () => {
  it("has the three levels in order", () => {
    expect(PATHS.map((p) => p.level)).toEqual(["Beginner", "Intermediate", "Advanced"]);
  });

  it("every path passes the schema", () => {
    for (const path of PATHS) expect(issues(LearningPathSchema.safeParse(path)), path.id).toEqual([]);
  });

  it("lesson ids are unique across all paths", () => {
    const ids = LESSON_ORDER.map((entry) => entry.lesson.id);
    expect(ids.length).toBe(new Set(ids).size);
  });

  it("every linked term exists in the dictionary", () => {
    const missing = LESSON_ORDER.flatMap(({ lesson }) =>
      lesson.termIds.filter((id) => !DICTIONARY_BY_ID[id]).map((id) => `${lesson.id} → ${id}`),
    );
    expect(missing).toEqual([]);
  });

  it("links the last lesson of a path to the first of the next", () => {
    const lastBeginner = PATHS[0].lessons.at(-1)!;
    const ref = findLesson(PATHS[0].id, lastBeginner.id);
    expect(ref?.next?.path.id).toBe(PATHS[1].id);
    expect(ref?.next?.lesson.id).toBe(PATHS[1].lessons[0].id);
    const lastAdvanced = PATHS[2].lessons.at(-1)!;
    expect(findLesson(PATHS[2].id, lastAdvanced.id)?.next).toBeUndefined();
  });

  it("returns undefined for a lesson in the wrong path", () => {
    expect(findLesson(PATHS[1].id, PATHS[0].lessons[0].id)).toBeUndefined();
  });
});

describe("projects", () => {
  it("every project passes the schema", () => {
    for (const project of PROJECTS) expect(issues(ProjectSchema.safeParse(project)), project.id).toEqual([]);
  });

  it("ids are unique and sorted easiest first", () => {
    const ids = PROJECTS.map((p) => p.id);
    expect(ids.length).toBe(new Set(ids).size);
    const rank = { Beginner: 0, Intermediate: 1, Advanced: 2 };
    const levels = PROJECTS.map((p) => rank[p.level]);
    expect(levels).toEqual([...levels].sort((a, b) => a - b));
  });

  it("every linked term exists in the dictionary", () => {
    const missing = PROJECTS.flatMap((p) => p.termIds.filter((id) => !DICTIONARY_BY_ID[id]).map((id) => `${p.id} → ${id}`));
    expect(missing).toEqual([]);
  });
});
