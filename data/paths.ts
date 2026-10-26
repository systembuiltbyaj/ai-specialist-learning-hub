// The three learning paths, in the order a learner should take them.
// Lesson content lives in data/lessons/; validated by tests/paths.test.ts.
import type { LearningPath, Lesson } from "../app/lib/content/types";
import { BEGINNER_PATH } from "./lessons/beginner";
import { INTERMEDIATE_PATH } from "./lessons/intermediate";
import { ADVANCED_PATH } from "./lessons/advanced";

export const PATHS: LearningPath[] = [BEGINNER_PATH, INTERMEDIATE_PATH, ADVANCED_PATH];

export interface LessonRef {
  path: LearningPath;
  lesson: Lesson;
  index: number;
  prev?: Lesson;
  next?: { path: LearningPath; lesson: Lesson };
}

// Every lesson in study order across all paths — drives "continue learning".
export const LESSON_ORDER: { pathId: string; lesson: Lesson }[] = PATHS.flatMap((path) =>
  path.lessons.map((lesson) => ({ pathId: path.id, lesson })),
);

export const PATHS_BY_ID: Record<string, LearningPath> = Object.fromEntries(PATHS.map((path) => [path.id, path]));

export function lessonHref(pathId: string, lessonId: string): string {
  return `/learn/${pathId}/${lessonId}`;
}

export function findLesson(pathId: string, lessonId: string): LessonRef | undefined {
  const path = PATHS_BY_ID[pathId];
  const index = path?.lessons.findIndex((lesson) => lesson.id === lessonId) ?? -1;
  if (!path || index < 0) return undefined;
  const order = LESSON_ORDER.findIndex((entry) => entry.lesson.id === lessonId);
  const following = LESSON_ORDER[order + 1];
  return {
    path,
    lesson: path.lessons[index],
    index,
    prev: path.lessons[index - 1],
    next: following ? { path: PATHS_BY_ID[following.pathId], lesson: following.lesson } : undefined,
  };
}
