import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DICTIONARY_BY_ID } from "@/data/dictionary";
import { TERM_IDS } from "@/app/lib/reference";
import { formatIsoDate } from "@/app/lib/content/format";
import { TOKEN } from "@/app/lib/color";
import BookmarkButton from "@/app/components/BookmarkButton";
import { BRAND } from "@/app/lib/constants";
import Glyph, { DICT_GLYPH, type GlyphName } from "@/app/components/ui/Glyph";
import { Tag, StatusTag } from "@/app/components/ui/Tag";

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
      title: `${term.term} — ${BRAND.name}`,
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
  const successor = term.supersededBy ? DICTIONARY_BY_ID[term.supersededBy] : undefined;

  return (
    <article className="container-hub max-w-4xl space-y-6 py-10">
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <Link href="/dictionary" className="rounded-md transition-colors hover:text-gold">
          ← Tech Dictionary
        </Link>
      </nav>

      <header className="card card-glow p-6 sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
          <span className="icon-tile h-14 w-14">
            <Glyph name={DICT_GLYPH[term.category]} className="h-7 w-7" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="eyebrow">Dictionary term</p>
            <h1 className="page-title mt-1 break-words">{term.term}</h1>
            {term.aliases.length > 0 && (
              <p className="mt-2 text-sm text-muted">Also called {term.aliases.join(" · ")}</p>
            )}
            <div className="mt-4 flex flex-wrap gap-2">
              <Tag>{term.category}</Tag>
              <Tag>{term.level}</Tag>
              <StatusTag status={term.status} />
            </div>
            <p className="mt-5 text-[1.0625rem] leading-relaxed text-text/90 sm:text-lg">{term.definition}</p>
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <BookmarkButton kind="term" id={term.id} label={term.term} />
              <Link href="/flashcards" className="btn-ghost px-3.5 py-1.5 text-xs">
                Practise with flashcards →
              </Link>
            </div>
          </div>
        </div>
      </header>

      {term.status === "deprecated" && (
        <section role="note" className="card p-5" style={{ borderColor: TOKEN.red }}>
          <h2 className="text-sm font-bold" style={{ color: TOKEN.red }}>
            Deprecated
          </h2>
          <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-text/85">
            {term.deprecationNote}
            {successor && (
              <>
                {term.deprecationNote ? " " : ""}Use{" "}
                <Link
                  href={`/dictionary/${successor.id}`}
                  className="font-semibold text-gold underline decoration-gold/40 underline-offset-4 hover:decoration-gold"
                >
                  {successor.term}
                </Link>{" "}
                instead.
              </>
            )}
          </p>
        </section>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {term.simple && <NoteCard glyph="prompt" label="In plain English" body={term.simple} />}
        {term.analogy && <NoteCard glyph="bulb" label="Analogy" body={term.analogy} />}
        <NoteCard glyph="target" label="Why it matters" body={term.whyItMatters} />
        {term.example && <NoteCard glyph="wrench" label="In practice" body={term.example} />}
      </div>

      {(related.length > 0 || term.sources.length > 0) && (
        <div className="grid gap-4 md:grid-cols-2">
          {related.length > 0 && (
            <section className="card p-5">
              <CardHeading glyph="link">Related terms</CardHeading>
              <div className="mt-3 flex flex-wrap gap-2">
                {related.map((r) => (
                  <Link key={r.id} href={`/dictionary/${r.id}`} className="chip hover:border-violet-soft/70 hover:text-text">
                    {r.term}
                  </Link>
                ))}
              </div>
            </section>
          )}

          {term.sources.length > 0 && (
            <section className="card p-5">
              <CardHeading glyph="book">Sources</CardHeading>
              <ul className="mt-3 space-y-2">
                {term.sources.map((source) => (
                  <li key={source.url}>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-start gap-2 rounded-sm text-sm text-text/85 transition-colors hover:text-gold"
                    >
                      <Glyph name="external" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-violet-light" />
                      {source.label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      )}

      <p className="flex flex-wrap justify-between gap-3 border-t border-violet-soft/20 pt-5 text-sm text-muted">
        <Link href="/dictionary" className="rounded-md font-semibold text-violet-light transition-colors hover:text-gold">
          Browse all terms →
        </Link>
        {term.lastVerified && (
          <span>
            Last verified <time dateTime={term.lastVerified}>{formatIsoDate(term.lastVerified)}</time>
          </span>
        )}
      </p>
    </article>
  );
}

function CardHeading({ glyph, children }: { glyph: GlyphName; children: React.ReactNode }) {
  return (
    <h2 className="flex items-center gap-3 text-base font-bold text-text">
      <span className="icon-tile-muted h-9 w-9">
        <Glyph name={glyph} className="h-[1.125rem] w-[1.125rem]" />
      </span>
      {children}
    </h2>
  );
}

function NoteCard({ glyph, label, body }: { glyph: GlyphName; label: string; body: string }) {
  return (
    <section className="card p-5">
      <CardHeading glyph={glyph}>{label}</CardHeading>
      <p className="mt-3 text-[0.9375rem] leading-relaxed text-text/80">{body}</p>
    </section>
  );
}
