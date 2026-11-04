import type { Metadata } from "next";
import { DICTIONARY } from "@/data/dictionary";
import { LESSON_ORDER, PATHS, lessonHref } from "@/data/paths";
import { PROJECTS } from "@/data/projects";
import MeClient, { type MeCatalog } from "./MeClient";
import PageHeader from "@/app/components/PageHeader";

export const metadata: Metadata = {
  title: "My Progress",
  description: "Your streak, lessons, flashcards, quiz weak spots, interview readiness and bookmarks — stored only in your browser.",
  robots: { index: false, follow: true },
};

export default function MePage() {
  // Titles and links only — the client joins them with what this browser has saved.
  const catalog: MeCatalog = {
    terms: Object.fromEntries(
      DICTIONARY.filter((t) => t.status !== "deprecated").map((t) => [t.id, { title: t.term, href: `/dictionary/${t.id}` }]),
    ),
    lessons: LESSON_ORDER.map(({ pathId, lesson }) => ({
      id: lesson.id,
      title: lesson.title,
      href: lessonHref(pathId, lesson.id),
      pathId,
    })),
    paths: PATHS.map((p) => ({ id: p.id, title: p.title, lessonIds: p.lessons.map((l) => l.id) })),
    projects: PROJECTS.map((p) => ({ id: p.id, title: p.title, href: `/projects/${p.id}`, steps: p.steps.length })),
  };

  return (
    <div className="container-hub space-y-6 py-8">
      <PageHeader href="/me" eyebrow="Your learning, at a glance" title="My" accent="Progress">
        Everything here lives in this browser only — no account, nothing sent anywhere. Download a backup now and then;
        clearing site data or switching devices starts you fresh.
      </PageHeader>
      <MeClient catalog={catalog} />
    </div>
  );
}
