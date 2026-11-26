import fs from "node:fs";
import path from "node:path";
import { postPath, projectPath, routes, type Lang } from "./paths";

export type AlternatePair = { en: string; fr: string };

/**
 * Every indexable URL and its translation. Used by the sitemap.
 * Page templates pass their own pair into the layout for hreflang.
 */
export function loadAlternateMap(root = process.cwd()): Map<string, AlternatePair> {
  const map = new Map<string, AlternatePair>();
  const add = (en: string, fr: string) => {
    const pair = { en, fr };
    map.set(en, pair);
    map.set(fr, pair);
  };

  for (const key of Object.keys(routes) as (keyof typeof routes)[]) {
    add(routes[key].en, routes[key].fr);
  }

  const projectDir = path.join(root, "src/content/projects");
  for (const file of fs.readdirSync(projectDir)) {
    if (!file.endsWith(".json")) continue;
    const slug = file.slice(0, -".json".length);
    add(projectPath("en", slug), projectPath("fr", slug));
  }

  const groups = new Map<string, Partial<Record<Lang, string>>>();
  for (const lang of ["en", "fr"] as const) {
    const dir = path.join(root, "src/content/blog", lang);
    if (!fs.existsSync(dir)) continue;
    for (const file of fs.readdirSync(dir)) {
      if (!file.endsWith(".md")) continue;
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const key = raw.match(/^translationKey:\s*(\S+)/m)?.[1];
      if (!key) continue;
      const slug = file.slice(0, -".md".length);
      const group = groups.get(key) ?? {};
      group[lang] = postPath(lang, slug);
      groups.set(key, group);
    }
  }

  for (const group of groups.values()) {
    if (group.en && group.fr) add(group.en, group.fr);
  }

  return map;
}
