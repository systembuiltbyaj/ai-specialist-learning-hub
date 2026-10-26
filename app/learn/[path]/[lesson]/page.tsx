import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DICTIONARY_BY_ID } from "@/data/dictionary";
import { LESSON_ORDER, findLesson, lessonHref } from "@/data/paths";
import { formatIsoDate } from "@/app/lib/content/format";
import { CodeBlock, Paragraphs } from "@/app/components/Prose";
import BookmarkButton from "@/app/components/BookmarkButton";
import { LessonActions } from "../../LearnWidgets";

export const dynamicParams = false;

export function generateStaticParams() {
  return LESSON_ORDER.map(({ pathId, lesson }) => ({ path: pathId, lesson: lesson.id }));
}

type Params = { params: Promise<{ path: string; lesson: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { path, lesson } = await params;
  const ref = findLesson(path, lesson);
  if (!ref) return {};
  return {
    title: ref.lesson.title,
    description: ref.lesson.summary,
    alternates: { canonical: lessonHref(path, lesson) },
    openGraph: { title: `${ref.lesson.title} — AJ Learning Hub`, description: ref.lesson.summary, type: "article" },
  };
}

export default async function LessonPage({ params }: Params) {
  const { path: pathId, lesson: lessonId } = await params;
  const ref = findLesson(pathId, lessonId);
  if (!ref) notFound();
  const { path, lesson, index, prev, next } = ref;
  const terms = lesson.termIds.map((id) => DICTIONARY_BY_ID[id]).filter(Boolean);

  return (
    <article className="container-hub max-w-3xl space-y-8 py-8">
      <nav className="entry-meta flex flex-wrap gap-x-2">
        <Link href="/learn" className="hover:text-gold">
          Learning Paths
        </Link>
        <span className="text-line">/</span>
        <Link href={`/learn/${path.id}`} className="hover:text-gold">
          {path.title}
        </Link>
      </nav>

      <header className="space-y-3 border-t-2 border-gold/60 pt-5">
        <p className="eyebrow">
          {path.level} · Lesson {index + 1} of {path.lessons.length} · {lesson.minutes} min
        </p>
        <h1 className="entry-head text-[2rem] sm:text-[2.6rem]">{lesson.title}</h1>
        <p className="text-lg leading-relaxed text-text/80">{lesson.summary}</p>
        <BookmarkButton kind="lesson" id={lesson.id} label={lesson.title} />
      </header>

      {lesson.sections.map((section, i) => (
        <section key={i} className="space-y-4">
          <h2 className="text-xl font-bold text-text">{section.heading}</h2>
          <Paragraphs text={section.body} />
          {section.code && <CodeBlock code={section.code} />}
        </section>
      ))}

      <section className="card border-gold/30 p-5">
        <h2 className="eyebrow mb-3">Key points</h2>
        <ul className="space-y-2">
          {lesson.keyPoints.map((point, i) => (
            <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-text/85">
              <span className="text-gold">◆</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </section>

      {terms.length > 0 && (
        <section>
          <h2 className="eyebrow mb-3">Terms in this lesson</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {terms.map((term) => (
              <Link key={term.id} href={`/dictionary/${term.id}`} className="card card-hover p-3">
                <span className="block font-semibold text-gold">{term.term}</span>
                <span className="mt-0.5 line-clamp-2 block text-xs text-text/65">{term.simple}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="card space-y-3 p-5">
        <h2 className="eyebrow">Try it · exercise</h2>
        <p className="text-sm leading-relaxed text-text/90">{lesson.exercise.prompt}</p>
        <ol className="list-decimal space-y-1.5 pl-5 text-sm text-text/80">
          {lesson.exercise.steps.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
        <p className="border-l-2 border-[#34d399]/60 pl-3 text-sm text-text/75">
          <span className="font-semibold text-[#34d399]">You&apos;re done when: </span>
          {lesson.exercise.successCheck}
        </p>
      </section>

      <LessonActions
        lessonId={lesson.id}
        quizHref={`/quiz?terms=${lesson.termIds.join(",")}&label=${encodeURIComponent(lesson.title)}`}
        next={next ? { href: lessonHref(next.path.id, next.lesson.id), title: next.lesson.title } : undefined}
      />

      <footer className="space-y-4 border-t border-line pt-5">
        <div>
          <h2 className="entry-meta mb-1.5">Sources</h2>
          <ul className="entry-xref mt-0 flex-col items-start">
            {lesson.sources.map((source) => (
              <li key={source.url}>
                <a href={source.url} target="_blank" rel="noopener noreferrer" className="entry-xref-link">
                  {source.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="entry-meta flex flex-wrap justify-between gap-3">
          {prev ? (
            <Link href={lessonHref(path.id, prev.id)} className="hover:text-gold">
              ← {prev.title}
            </Link>
          ) : (
            <span />
          )}
          <span>
            Last verified <time dateTime={lesson.lastVerified}>{formatIsoDate(lesson.lastVerified)}</time>
          </span>
          {next && (
            <Link href={lessonHref(next.path.id, next.lesson.id)} className="hover:text-gold">
              {next.lesson.title} →
            </Link>
          )}
        </div>
      </footer>
    </article>
  );
}
