import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { DICTIONARY } from "@/data/dictionary";
import { ACRONYM_SLUGS, ACRONYM_TO_TERM, acronymBySlug } from "@/app/lib/reference";

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
    <article className="container-hub max-w-3xl space-y-6 py-8">
      <nav className="text-sm text-muted">
        <Link href="/acronyms" className="hover:text-gold">
          ← Acronym Decoder
        </Link>
      </nav>

      <header>
        <span className="chip border border-gold/40 text-gold">{entry.category}</span>
        <h1 className="section-title mt-3">
          <span className="mr-2">{entry.icon}</span>
          {entry.acronym}
        </h1>
        <p className="mt-2 text-lg text-text/80">{entry.full}</p>
      </header>

      <p className="text-base leading-relaxed text-text/85">{entry.meaning}</p>

      {relatedTerms.length > 0 && (
        <section>
          <h2 className="text-xs font-bold uppercase tracking-wider text-muted">
            Go deeper in the dictionary
          </h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {relatedTerms.map((t) => (
              <Link
                key={t.id}
                href={`/dictionary/${t.id}`}
                className="chip hover:border-gold hover:text-gold"
              >
                {t.term}
              </Link>
            ))}
          </div>
        </section>
      )}

      <p className="border-t border-line pt-6 text-sm text-muted">
        <Link href="/acronyms" className="text-gold hover:underline">
          All acronyms
        </Link>
        {" · "}
        <Link href="/dictionary" className="text-gold hover:underline">
          Browse the dictionary →
        </Link>
      </p>
    </article>
  );
}
