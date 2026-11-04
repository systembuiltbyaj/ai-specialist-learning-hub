import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { DICTIONARY } from "@/data/dictionary";
import { ACRONYM_SLUGS, ACRONYM_TO_TERM, acronymBySlug } from "@/app/lib/reference";
import Glyph, { ACRONYM_GLYPH } from "@/app/components/ui/Glyph";
import { Tag } from "@/app/components/ui/Tag";

// dynamicParams stays true so the 22 overlapping slugs remain routable and can
// redirect. Anything genuinely unknown calls notFound() below.
export function generateStaticParams() {
  return ACRONYM_SLUGS.map((slug) => ({ slug }));
}

// params is a Promise as of Next 15.
type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const entry = acronymBySlug(slug);
  if (!entry || ACRONYM_TO_TERM[slug]) return {};

  const description = `${entry.acronym} stands for ${entry.full}. ${entry.meaning}`.slice(0, 155);
  return {
    title: `${entry.acronym} — ${entry.full}`,
    description,
    keywords: [entry.acronym, entry.full, entry.category],
    openGraph: {
      title: `${entry.acronym} — ${entry.full}`,
      description,
      type: "article",
    },
    alternates: { canonical: `/acronyms/${slug}` },
  };
}

export default async function AcronymPage({ params }: Params) {
  const { slug } = await params;

  // The dictionary already covers this concept in more depth. Send readers
  // there rather than publishing a thinner page that competes with it.
  const termId = ACRONYM_TO_TERM[slug];
  if (termId) permanentRedirect(`/dictionary/${termId}`);

  const entry = acronymBySlug(slug);
  if (!entry) notFound();

  const needle = entry.full.toLowerCase();
  const relatedTerms = DICTIONARY.filter(
    (t) =>
      t.term.toLowerCase().includes(needle) ||
      t.aliases.some((a) => a.toLowerCase() === entry.acronym.toLowerCase()),
  ).slice(0, 4);

  return (
    <article className="container-hub max-w-4xl space-y-6 py-10">
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <Link href="/acronyms" className="rounded-md transition-colors hover:text-gold">
          ← Acronym Decoder
        </Link>
      </nav>

      <header className="card card-glow p-6 sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
          <span className="icon-tile h-14 w-14">
            <Glyph name={ACRONYM_GLYPH[entry.category]} className="h-7 w-7" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="eyebrow">Acronym</p>
            <h1 className="page-title mt-1 break-words">{entry.acronym}</h1>
            <p className="mt-2 text-lg font-semibold leading-snug text-violet-light">{entry.full}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Tag>{entry.category}</Tag>
            </div>
            <p className="mt-5 text-[1.0625rem] leading-relaxed text-text/90 sm:text-lg">{entry.meaning}</p>
          </div>
        </div>
      </header>

      {relatedTerms.length > 0 && (
        <section className="card p-5">
          <h2 className="flex items-center gap-3 text-base font-bold text-text">
            <span className="icon-tile-muted h-9 w-9">
              <Glyph name="book" className="h-[1.125rem] w-[1.125rem]" />
            </span>
            Go deeper in the dictionary
          </h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {relatedTerms.map((t) => (
              <Link key={t.id} href={`/dictionary/${t.id}`} className="chip hover:border-violet-soft/70 hover:text-text">
                {t.term}
              </Link>
            ))}
          </div>
        </section>
      )}

      <p className="flex flex-wrap gap-x-5 gap-y-2 border-t border-violet-soft/20 pt-5 text-sm">
        <Link href="/acronyms" className="rounded-md font-semibold text-violet-light transition-colors hover:text-gold">
          All acronyms
        </Link>
        <Link href="/dictionary" className="rounded-md font-semibold text-violet-light transition-colors hover:text-gold">
          Browse the dictionary →
        </Link>
      </p>
    </article>
  );
}
