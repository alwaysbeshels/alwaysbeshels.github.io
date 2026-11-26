import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const localized = z.object({
  title: z.string(),
  summary: z.string(),
  body: z.array(z.string()).min(1),
  points: z.array(z.string()).optional(),
});

/**
 * One JSON file per project, both languages inside it.
 * Never set `repo` for a private repository. Link `live` only.
 * C'est déjà l'enfer is the case to copy for that: live URL, no repo.
 */
const projects = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/projects" }),
  schema: z.object({
    kind: z.enum(["product", "opensource"]),
    order: z.number().int(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    license: z.string().optional(),
    repo: z.url().optional(),
    live: z.url().optional(),
    tags: z.object({
      en: z.array(z.string()),
      fr: z.array(z.string()),
    }),
    metrics: z
      .array(
        z.object({
          value: z.object({ en: z.string(), fr: z.string() }),
          label: z.object({ en: z.string(), fr: z.string() }),
        }),
      )
      .min(1)
      .max(4),
    en: localized,
    fr: localized,
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    lang: z.enum(["en", "fr"]),
    translationKey: z.string(),
  }),
});

export const collections = { projects, blog };
