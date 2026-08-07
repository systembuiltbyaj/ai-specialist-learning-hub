import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DICTIONARY_BY_ID } from "@/data/dictionary";
import { TERM_IDS } from "@/app/lib/reference";

// Every term is known at build time, so an unknown slug is a 404 rather than an
// attempt to render something that cannot exist.
export const dynamicParams = false;

export function generateStaticParams() {
  return TERM_IDS.map((slug) => ({ slug }));
}

// params is a Promise as of Next 15.
type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const term = DICTIONARY_BY_ID[slug];
  if (!term) return {};

  const description = term.definition.slice(0, 155);
  return {
    title: term.term,
    description,
    keywords: [term.term, ...term.aliases, term.category],
    openGraph: {
      title: `${term.term} — AJ Learning Hub`,
      description,
      type: "article",
    },
    alternates: { canonical: `/dictionary/${term.id}` },
  };
}

export default async function TermPage({ params }: Params) {
  const { slug } = await params;
  const term = DICTIONARY_BY_ID[slug];
  if (!term) notFound();

  const related = term.related.map((id) => DICTIONARY_BY_ID[id]).filter(Boolean);

  return (
    <article className="container-hub max-w-3xl py-10">
      <nav className="entry-meta mb-8">
        <Link href="/dictionary" className="transition-colors hover:text-gold">
          ← Tech Dictionary
        </Link>
      </nav>

      {/* ── Headword block ───────────────────────────────── */}
      <header className="border-t-2 border-gold/60 pt-5">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <h1 className="entry-head text-[2.5rem] sm:text-[3.25rem]">{term.term}</h1>
          <p className="entry-meta shrink-0">
            {term.category} <span className="text-line">·</span>{" "}
            <span className="entry-meta-strong">{term.level}</span>
          </p>
        </div>
        {term.aliases.length > 0 && (
          <p className="entry-variants">also {term.aliases.join(" · ")}</p>
        )}
      </header>

      {/* ── Definition ───────────────────────────────────── */}
      <p className="entry-body mt-6 text-[1.1875rem] sm:text-[1.25rem]">{term.definition}</p>

      {/* ── Annotation ───────────────────────────────────── */}
      {term.analogy && (
        <section className="entry-note">
          <h2 className="entry-note-label">Analogy</h2>
          <p className="entry-note-body">{term.analogy}</p>
        </section>
      )}

      <section className="entry-note">
        <h2 className="entry-note-label">Why it matters</h2>
        <p className="entry-note-body">{term.whyItMatters}</p>
      </section>

      {term.example && (
        <section className="entry-note">
          <h2 className="entry-note-label">In practice</h2>
          <p className="entry-note-body">{term.example}</p>
        </section>
      )}

      {/* ── Cross-references ─────────────────────────────── */}
      {related.length > 0 && (
        <section className="mt-10 border-t border-line pt-5">
          <div className="entry-xref">
            <span className="entry-xref-mark" aria-hidden>
              →
            </span>
            <span className="sr-only">Related terms:</span>
            {related.map((r, i) => (
              <span key={r.id}>
                <Link href={`/dictionary/${r.id}`} className="entry-xref-link">
                  {r.term}
                </Link>
                {i < related.length - 1 && (
                  <span className="ml-3 select-none text-line" aria-hidden>
                    ·
                  </span>
                )}
              </span>
            ))}
          </div>
        </section>
      )}

      <p className="entry-meta mt-12 border-t border-line/70 pt-5">
        <Link href="/dictionary" className="transition-colors hover:text-gold">
          Browse all terms →
        </Link>
      </p>
    </article>
  );
}
