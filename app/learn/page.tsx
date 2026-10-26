import type { Metadata } from "next";
import Link from "next/link";
import { PATHS, LESSON_ORDER, PATHS_BY_ID, lessonHref } from "@/data/paths";
import { ContinueLearning, LessonDone, PathProgress, type LessonLink } from "./LearnWidgets";

export const metadata: Metadata = {
  title: "Learning Paths",
  description:
    "Beginner, intermediate and advanced AI learning paths — from how LLMs work to agents, MCP, evals and production security. Short lessons with exercises.",
};

export default function LearnPage() {
  const lessons: LessonLink[] = LESSON_ORDER.map(({ pathId, lesson }) => ({
    id: lesson.id,
    title: lesson.title,
    href: lessonHref(pathId, lesson.id),
    pathTitle: PATHS_BY_ID[pathId].title,
    minutes: lesson.minutes,
  }));

  return (
    <div className="container-hub space-y-8 py-8">
      <header>
        <p className="eyebrow">Learn in order</p>
        <h1 className="section-title">🎓 Learning Paths</h1>
        <p className="mt-2 max-w-2xl text-muted">
          Three paths, {LESSON_ORDER.length} short lessons. Each one links the dictionary terms it uses, ends with a
          hands-on exercise, and can quiz you on what you just read. Start at the beginning, or jump to your level.
        </p>
      </header>

      <ContinueLearning lessons={lessons} />

      <div className="grid gap-5 lg:grid-cols-3">
        {PATHS.map((path) => (
          <section key={path.id} className="card flex flex-col p-5" aria-labelledby={`path-${path.id}`}>
            <p className="eyebrow">{path.level}</p>
            <h2 id={`path-${path.id}`} className="mt-1 text-xl font-bold text-text">
              <Link href={`/learn/${path.id}`} className="hover:text-gold">
                {path.title}
              </Link>
            </h2>
            <p className="mt-2 text-sm text-muted">{path.summary}</p>
            <div className="mt-4">
              <PathProgress lessonIds={path.lessons.map((l) => l.id)} />
            </div>
            <ol className="mt-4 flex-1 space-y-1">
              {path.lessons.map((lesson, i) => (
                <li key={lesson.id}>
                  <Link
                    href={lessonHref(path.id, lesson.id)}
                    className="flex items-center gap-3 rounded-md px-2 py-2 text-sm transition-colors hover:bg-text/5"
                  >
                    <LessonDone lessonId={lesson.id} />
                    <span className="flex-1 text-text/85">
                      <span className="mr-1.5 font-mono text-xs text-muted">{i + 1}.</span>
                      {lesson.title}
                    </span>
                    <span className="shrink-0 font-mono text-xs text-muted">{lesson.minutes}m</span>
                  </Link>
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>
    </div>
  );
}
