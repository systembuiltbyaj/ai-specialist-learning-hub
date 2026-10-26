import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PATHS, PATHS_BY_ID, lessonHref } from "@/data/paths";
import { LessonDone, PathProgress } from "../LearnWidgets";

export const dynamicParams = false;

export function generateStaticParams() {
  return PATHS.map((path) => ({ path: path.id }));
}

type Params = { params: Promise<{ path: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { path: pathId } = await params;
  const path = PATHS_BY_ID[pathId];
  if (!path) return {};
  return { title: path.title, description: path.summary, alternates: { canonical: `/learn/${path.id}` } };
}

export default async function PathPage({ params }: Params) {
  const { path: pathId } = await params;
  const path = PATHS_BY_ID[pathId];
  if (!path) notFound();

  const minutes = path.lessons.reduce((sum, lesson) => sum + lesson.minutes, 0);

  return (
    <div className="container-hub max-w-3xl space-y-7 py-8">
      <nav className="entry-meta">
        <Link href="/learn" className="hover:text-gold">
          ← Learning Paths
        </Link>
      </nav>
      <header>
        <p className="eyebrow">
          {path.level} · {path.lessons.length} lessons · about {Math.round(minutes / 5) * 5} min
        </p>
        <h1 className="section-title mt-1 normal-case">{path.title}</h1>
        <p className="mt-2 text-muted">{path.summary}</p>
      </header>

      <section className="card p-5">
        <h2 className="eyebrow mb-2">By the end you&apos;ll be able to</h2>
        <ul className="space-y-1.5">
          {path.outcomes.map((outcome) => (
            <li key={outcome} className="flex gap-2 text-sm text-text/85">
              <span className="text-gold">✓</span>
              <span>{outcome}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <PathProgress lessonIds={path.lessons.map((l) => l.id)} />
        </div>
      </section>

      <ol className="space-y-2.5">
        {path.lessons.map((lesson, i) => (
          <li key={lesson.id}>
            <Link href={lessonHref(path.id, lesson.id)} className="card card-hover flex items-start gap-4 p-4">
              <LessonDone lessonId={lesson.id} />
              <span className="min-w-0 flex-1">
                <span className="block font-bold text-text">
                  <span className="mr-1.5 font-mono text-xs text-muted">{i + 1}.</span>
                  {lesson.title}
                </span>
                <span className="mt-0.5 block text-sm text-muted">{lesson.summary}</span>
              </span>
              <span className="shrink-0 font-mono text-xs text-muted">{lesson.minutes}m</span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
