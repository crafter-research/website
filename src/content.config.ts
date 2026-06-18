import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

/**
 * Research log. One file per milestone per language under `{en,es}/{slug}.md`.
 * Per-language subdirs keep collection ids unique (a flat `{slug}.en.md` /
 * `{slug}.es.md` collides because the loader strips both dotted suffixes).
 * Posts are English-first (research/papers ship in English); Spanish reaches the
 * LATAM community. pt/zh fall back to en, consistent with the site i18n.
 */
const research = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/research" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    // Milestone status, shown as a mono badge like the homepage project cards.
    status: z.enum(["wip", "milestone", "result", "retired"]).default("milestone"),
    // Stable URL key shared across languages so /research/<key> and /es/research/<key>
    // pair up. NOT named `slug` — Astro reserves `slug` as the entry id, which would
    // collide between the en/ and es/ versions of the same milestone.
    urlSlug: z.string(),
    lang: z.enum(["en", "es"]),
    project: z.string().default("legalize-pe"),
    tags: z.array(z.string()).default([]),
    // Optional: mark a post as a correction/update of a prior belief (research-log honesty).
    supersedes: z.string().optional(),
  }),
});

export const collections = { research };
