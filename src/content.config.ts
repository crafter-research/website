import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const langEnum = z.enum(["en", "es", "pt", "zh"]);

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
		lang: langEnum,
		project: z.string().default("legalize-pe"),
		tags: z.array(z.string()).default([]),
		supersedes: z.string().optional(),
	}),
});

const blog = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		date: z.coerce.date(),
		urlSlug: z.string(),
		lang: langEnum,
		author: z.string().default("Crafter Research"),
		tags: z.array(z.string()).default([]),
	}),
});

export const collections = { research, blog };
