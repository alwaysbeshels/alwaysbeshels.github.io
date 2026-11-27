import { getCollection, type CollectionEntry } from "astro:content";
import { postPath, projectPath, type Lang } from "../i18n/paths";

export type ProjectEntry = CollectionEntry<"projects">;
export type PostEntry = CollectionEntry<"blog">;

export type ProjectView = {
  slug: string;
  kind: "product" | "opensource";
  title: string;
  summary: string;
  body: string[];
  points: string[];
  tags: string[];
  metrics: { value: string; label: string }[];
  live?: string;
  repo?: string;
  license?: string;
  href: string;
  image?: string;
  imageAlt?: string;
  monogram: string;
};

export type ThemeGroup = {
  id: string;
  order: number;
  title: string;
  summary: string;
  projects: ProjectView[];
};

export async function loadProjects(): Promise<ProjectEntry[]> {
  const all = await getCollection("projects");
  return all
    .filter((entry) => !entry.data.draft)
    .sort((a, b) => a.data.order - b.data.order);
}

export function projectsByKind(entries: ProjectEntry[], kind: ProjectView["kind"]): ProjectEntry[] {
  return entries.filter((entry) => entry.data.kind === kind);
}

/** Home shows featured items. If none are flagged, it shows the first of that kind. */
export function featuredProjects(entries: ProjectEntry[], kind: ProjectView["kind"]): ProjectEntry[] {
  const ofKind = projectsByKind(entries, kind);
  const picked = ofKind.filter((entry) => entry.data.featured);
  if (picked.length > 0) return picked;
  return ofKind.slice(0, 1);
}

export function toProjectView(entry: ProjectEntry, lang: Lang): ProjectView {
  const copy = entry.data[lang];
  return {
    slug: entry.id,
    kind: entry.data.kind,
    title: copy.title,
    summary: copy.summary,
    body: copy.body,
    points: copy.points ?? [],
    tags: entry.data.tags[lang],
    metrics: entry.data.metrics.map((metric) => ({
      value: metric.value[lang],
      label: metric.label[lang],
    })),
    live: entry.data.live,
    repo: entry.data.repo,
    license: entry.data.license,
    href: projectPath(lang, entry.id),
    image: entry.data.image,
    imageAlt: entry.data.image ? entry.data.imageAlt?.[lang] : undefined,
    monogram: monogram(copy.title),
  };
}

/** Two initials. Used only when a project has no image of its own. */
export function monogram(title: string): string {
  const words = title
    .replace(/['’]/g, "")
    .split(/[^0-9A-Za-zÀ-ÖØ-öø-ÿ]+/)
    .filter((word) => word.length > 0);
  const letters = words.map((word) => word[0] ?? "").join("");
  const raw = letters.length >= 2 ? letters.slice(0, 2) : (words[0] ?? title).slice(0, 2);
  return raw.toLocaleUpperCase("fr-CA");
}

/** Open-source entries that share theme.id render as one catalogue group. */
export function groupOpenSource(entries: ProjectEntry[], lang: Lang): ThemeGroup[] {
  const groups = new Map<string, ThemeGroup>();
  for (const entry of projectsByKind(entries, "opensource")) {
    const theme = entry.data.theme;
    const id = theme?.id ?? "open-source";
    const view = toProjectView(entry, lang);
    const existing = groups.get(id);
    if (existing) {
      existing.projects.push(view);
      continue;
    }
    groups.set(id, {
      id,
      order: theme?.order ?? 100,
      title: theme ? theme[lang].title : lang === "fr" ? "Code ouvert" : "Open source",
      summary: theme ? theme[lang].summary : "",
      projects: [view],
    });
  }
  return [...groups.values()].sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
}

export function postSlug(id: string): string {
  const slug = id.split("/").pop();
  if (!slug) throw new Error(`Post id has no slug: ${id}`);
  return slug;
}

export async function loadPosts(lang: Lang): Promise<PostEntry[]> {
  const all = await getCollection("blog", ({ data }) => data.lang === lang);
  return all.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function findPost(lang: Lang, slug: string): Promise<PostEntry | undefined> {
  const posts = await loadPosts(lang);
  return posts.find((post) => postSlug(post.id) === slug);
}

export async function findTranslation(translationKey: string, lang: Lang): Promise<PostEntry | undefined> {
  const posts = await loadPosts(lang);
  return posts.find((post) => post.data.translationKey === translationKey);
}

export function postHref(post: PostEntry): string {
  return postPath(post.data.lang, postSlug(post.id));
}
