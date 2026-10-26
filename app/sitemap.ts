import type { MetadataRoute } from "next";
import { NAV_ITEMS } from "@/app/lib/constants";
import { TERM_IDS, ACRONYM_SLUGS } from "@/app/lib/reference";
import { siteUrl } from "@/app/lib/siteUrl";
import { PATHS, LESSON_ORDER, lessonHref } from "@/data/paths";
import { PROJECTS } from "@/data/projects";

// Generated from the same data the pages render, so the sitemap cannot drift
// out of sync with what actually exists.
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();

  const pages = NAV_ITEMS.map((item) => ({
    url: `${base}${item.href}`,
    priority: item.href === "/" ? 1 : 0.8,
  }));

  const terms = TERM_IDS.map((id) => ({
    url: `${base}/dictionary/${id}`,
    priority: 0.7,
  }));

  const acronyms = ACRONYM_SLUGS.map((slug) => ({
    url: `${base}/acronyms/${slug}`,
    priority: 0.6,
  }));

  const learning = [
    ...PATHS.map((path) => ({ url: `${base}/learn/${path.id}`, priority: 0.8 })),
    ...LESSON_ORDER.map(({ pathId, lesson }) => ({ url: `${base}${lessonHref(pathId, lesson.id)}`, priority: 0.7 })),
    ...PROJECTS.map((project) => ({ url: `${base}/projects/${project.id}`, priority: 0.7 })),
  ];

  // /me is personal, per-browser state with nothing to index.
  return [...pages.filter((page) => !page.url.endsWith("/me")), ...terms, ...acronyms, ...learning];
}
