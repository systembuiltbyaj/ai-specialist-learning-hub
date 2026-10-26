import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DICTIONARY_BY_ID } from "@/data/dictionary";
import { PROJECTS, PROJECTS_BY_ID } from "@/data/projects";
import { formatIsoDate } from "@/app/lib/content/format";
import { CodeBlock, Paragraphs } from "@/app/components/Prose";
import BookmarkButton from "@/app/components/BookmarkButton";
import { ProjectProgress, StepCheck } from "../ProjectWidgets";
import { BRAND } from "@/app/lib/constants";

export const dynamicParams = false;

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.id }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS_BY_ID[slug];
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/projects/${project.id}` },
    openGraph: { title: `${project.title} — ${BRAND.name}`, description: project.summary, type: "article" },
  };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = PROJECTS_BY_ID[slug];
  if (!project) notFound();
  const terms = project.termIds.map((id) => DICTIONARY_BY_ID[id]).filter(Boolean);

  return (
    <article className="container-hub max-w-3xl space-y-9 py-8">
      <nav className="entry-meta">
        <Link href="/projects" className="hover:text-gold">
          ← Projects
        </Link>
      </nav>

      <header className="space-y-3 border-t-2 border-gold/60 pt-5">
        <p className="eyebrow">
          {project.level} · about {project.hours}
        </p>
        <h1 className="entry-head text-[2rem] sm:text-[2.6rem]">{project.title}</h1>
        <p className="text-lg leading-relaxed text-text/80">{project.summary}</p>
        <p className="border-l-2 border-gold pl-3 text-sm text-text/75">
          <span className="font-semibold text-gold">You&apos;ll end up with: </span>
          {project.outcome}
        </p>
        <div className="flex flex-wrap items-center gap-1.5">
          {project.stack.map((tool) => (
            <span key={tool} className="tag">
              {tool}
            </span>
          ))}
        </div>
        <BookmarkButton kind="project" id={project.id} label={project.title} />
      </header>

      <section>
        <h2 className="mb-3 text-xl font-bold text-text">Before you start</h2>
        <ul className="space-y-1.5">
          {project.prerequisites.map((item, i) => (
            <li key={i} className="flex gap-2 text-sm text-text/85">
              <span className="text-gold">□</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-bold text-text">Architecture</h2>
        <ol className="space-y-0" aria-label="Data flow, in order">
          {project.architecture.map((node, i) => (
            <li key={i} className="flex gap-4">
              <div className="flex flex-col items-center" aria-hidden>
                <span className="grid h-7 w-7 place-items-center rounded-full border border-violet-soft/60 bg-violet/20 font-mono text-[0.65rem] font-bold text-violet-light">
                  {i + 1}
                </span>
                {i < project.architecture.length - 1 && <span className="w-px flex-1 bg-gradient-to-b from-violet-soft/60 to-gold/40" />}
              </div>
              <div className="pb-5">
                <p className="font-semibold text-text">{node.node}</p>
                <p className="text-sm text-text/70">{node.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="space-y-5">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="text-xl font-bold text-text">Build it, step by step</h2>
          <div className="w-full sm:w-56">
            <ProjectProgress projectId={project.id} total={project.steps.length} />
          </div>
        </div>
        <ol className="space-y-6">
          {project.steps.map((step, i) => (
            <li key={i} className="flex gap-4">
              <StepCheck projectId={project.id} step={i} title={step.title} />
              <div className="min-w-0 flex-1 space-y-3">
                <h3 className="pt-1 font-bold text-text">{step.title}</h3>
                <Paragraphs text={step.detail} />
                {step.code && <CodeBlock code={step.code} />}
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="card p-5">
        <h2 className="eyebrow mb-3">Example run</h2>
        <ol className="list-decimal space-y-2 pl-5 text-sm leading-relaxed text-text/85">
          {project.exampleWorkflow.map((line, i) => (
            <li key={i}>{line}</li>
          ))}
        </ol>
      </section>

      <div className="grid gap-4 md:grid-cols-2">
        <section className="card p-5">
          <h2 className="eyebrow mb-3">Test it</h2>
          <ul className="space-y-2 text-sm text-text/85">
            {project.testing.map((item, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-success">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
        <section className="card p-5">
          <h2 className="eyebrow mb-3">Watch out for</h2>
          <ul className="space-y-2 text-sm text-text/85">
            {project.pitfalls.map((item, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-danger">!</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {terms.length > 0 && (
        <section>
          <h2 className="eyebrow mb-3">Concepts used</h2>
          <div className="flex flex-wrap gap-2">
            {terms.map((term) => (
              <Link key={term.id} href={`/dictionary/${term.id}`} className="chip hover:border-gold/60" title={term.simple}>
                {term.term}
              </Link>
            ))}
          </div>
        </section>
      )}

      <footer className="space-y-3 border-t border-line pt-5">
        <h2 className="entry-meta">Sources</h2>
        <ul className="entry-xref mt-0 flex-col items-start">
          {project.sources.map((source) => (
            <li key={source.url}>
              <a href={source.url} target="_blank" rel="noopener noreferrer" className="entry-xref-link">
                {source.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="entry-meta">
          Last verified <time dateTime={project.lastVerified}>{formatIsoDate(project.lastVerified)}</time>
        </p>
      </footer>
    </article>
  );
}
