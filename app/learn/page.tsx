import type { Metadata } from "next";
import Link from "next/link";
import { PATHS, LESSON_ORDER, PATHS_BY_ID, lessonHref } from "@/data/paths";
import { ContinueLearning, LessonDone, PathProgress, type LessonLink } from "./LearnWidgets";
import LevelIcon from "./LevelIcon";
import PageHeader from "@/app/components/PageHeader";

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
      <PageHeader href="/learn" eyebrow="Learn in order" title="Learning" accent="Paths">
        {PATHS.length} paths, {LESSON_ORDER.length} short lessons. Each one links the dictionary terms it uses, ends with a
        hands-on exercise, and can quiz you on what you just read. Start at the beginning, or jump to your level.
      </PageHeader>

      <ContinueLearning lessons={lessons} />

      <div className="grid gap-5 lg:grid-cols-3">
        {PATHS.map((path) => (
          <section
            key={path.id}
            className="card card-glow flex flex-col p-5 pb-8 sm:p-6 sm:pb-10"
            aria-labelledby={`path-${path.id}`}
          >
            <p className="flex items-center gap-2.5 text-sm font-semibold text-violet-light">
              <LevelIcon level={path.level} className="h-6 w-6" />
              {path.level}
            </p>
            <h2 id={`path-${path.id}`} className="mt-3 text-xl font-extrabold leading-tight tracking-[-0.02em] text-text sm:text-[1.375rem]">
              <Link href={`/learn/${path.id}`} className="rounded-sm hover:text-gold">
                {path.title}
              </Link>
            </h2>
            <p className="mt-2.5 text-sm leading-relaxed text-muted">{path.summary}</p>
            <div className="mt-5">
              <PathProgress lessonIds={path.lessons.map((l) => l.id)} />
            </div>
            <ol className="-mx-2 mt-4 flex-1 space-y-0.5">
              {path.lessons.map((lesson, i) => (
                <li key={lesson.id}>
                  <Link
                    href={lessonHref(path.id, lesson.id)}
                    className="flex items-center gap-3 rounded-lg px-2 py-2 text-sm transition-colors hover:bg-violet-soft/10"
                  >
                    <LessonDone lessonId={lesson.id} />
                    <span className="w-5 shrink-0 text-right text-xs text-muted">{i + 1}.</span>
                    <span className="min-w-0 flex-1 font-medium text-text/90">{lesson.title}</span>
                    <span className="shrink-0 text-xs text-muted">{lesson.minutes}m</span>
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
