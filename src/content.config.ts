import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const research = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/research" }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		date: z.coerce.date(),
		status: z
			.enum(["wip", "milestone", "result", "retired"])
			.default("milestone"),
		urlSlug: z.string(),
		lang: z.enum(["en", "es"]),
		project: z.string().default("legalize-pe"),
		tags: z.array(z.string()).default([]),
		supersedes: z.string().optional(),
	}),
});

export const collections = { research };
