export type Lang = "en" | "fr";

export const otherLang = (lang: Lang): Lang => (lang === "en" ? "fr" : "en");

export const htmlLang: Record<Lang, string> = {
  en: "en-CA",
  fr: "fr-CA",
};

export const ogLocale: Record<Lang, string> = {
  en: "en_CA",
  fr: "fr_CA",
};

/** Static routes. Dynamic project and post paths are built below. */
export const routes = {
  home: { en: "/", fr: "/fr/" },
  projects: { en: "/projects/", fr: "/fr/projets/" },
  blog: { en: "/blog/", fr: "/fr/blogue/" },
  timeline: { en: "/timeline/", fr: "/fr/parcours/" },
  about: { en: "/about/", fr: "/fr/a-propos/" },
  search: { en: "/search/", fr: "/fr/recherche/" },
  privacy: { en: "/privacy/", fr: "/fr/confidentialite/" },
  terms: { en: "/terms/", fr: "/fr/conditions/" },
  rss: { en: "/rss.xml", fr: "/fr/rss.xml" },
} as const;

export type RouteKey = keyof typeof routes;

export function projectPath(lang: Lang, slug: string): string {
  return lang === "en" ? `/projects/${slug}/` : `/fr/projets/${slug}/`;
}

export function postPath(lang: Lang, slug: string): string {
  return lang === "en" ? `/blog/${slug}/` : `/fr/blogue/${slug}/`;
}

export function absolute(pathname: string): string {
  return new URL(pathname, "https://alwaysbeshels.github.io").href;
}

function withSlash(pathname: string): string {
  if (pathname === "/") return "/";
  return pathname.endsWith("/") ? pathname : `${pathname}/`;
}

/** Home is an exact match so /fr/ does not light up on every French page. */
export function isCurrent(pathname: string, href: string): boolean {
  const current = withSlash(pathname);
  const target = withSlash(href);
  if (target === "/" || target === "/fr/") return current === target;
  return current === target || current.startsWith(target);
}
