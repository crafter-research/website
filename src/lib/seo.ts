import type { CollectionEntry } from "astro:content";
import type { Lang } from "../i18n/ui";
import { getAuthor } from "./authors";

const SITE = "https://crafter.ing";
const CRAFTER_STATION_ID = "https://crafter.run/#organization";
const ORGANIZATION_ID = `${SITE}/#organization`;
const WEBSITE_ID = `${SITE}/#website`;

const crafterStation = {
	"@type": "Organization",
	"@id": CRAFTER_STATION_ID,
	name: "Crafter Station",
	url: "https://crafter.run",
};

const organization = {
	"@type": "ResearchOrganization",
	"@id": ORGANIZATION_ID,
	name: "Crafter Research",
	url: SITE,
	logo: `${SITE}/crafter-glyph.svg`,
	location: "Lima, Peru",
	sameAs: ["https://github.com/crafter-research"],
	parentOrganization: { "@id": CRAFTER_STATION_ID },
};

const website = {
	"@type": "WebSite",
	"@id": WEBSITE_ID,
	name: "Crafter Research",
	url: SITE,
	publisher: { "@id": ORGANIZATION_ID },
};

export const siteJsonLd: Record<string, unknown> = {
	"@context": "https://schema.org",
	"@graph": [crafterStation, organization, website],
};

interface ProjectSeo {
	keywords: string[];
	about: Record<string, unknown>[];
	software?: Record<string, unknown>[];
	isBasedOn?: Record<string, unknown>[];
}

const projectSeo: Record<string, ProjectSeo> = {
	khipu: {
		keywords: [
			"khipu",
			"quipu",
			"quipus",
			"kipu",
			"Inka khipu",
			"quipu inca",
			"quipus incas",
			"khipus",
			"Inca quipu",
			"desciframiento del quipu",
			"khipu decipherment",
			"Open Khipu Repository",
			"permutation test",
			"prueba de permutación",
			"khipu-null",
		],
		about: [
			{
				"@type": "Thing",
				name: "Khipu (quipu)",
				alternateName: ["quipu", "kipu", "khipu"],
				sameAs: [
					"https://en.wikipedia.org/wiki/Quipu",
					"https://www.wikidata.org/wiki/Q185292",
				],
			},
		],
		software: [
			{
				"@type": "SoftwareSourceCode",
				"@id": "https://github.com/crafter-research/khipu-null",
				name: "khipu-null",
				description:
					"Open-source CLI that ranks khipus (quipus) against a reference pattern and tests whether the match is chance with structure-preserving permutation nulls, top-k tests and Benjamini-Hochberg q-values.",
				codeRepository: "https://github.com/crafter-research/khipu-null",
				url: "https://pypi.org/project/khipu-null/",
				programmingLanguage: "Python",
				runtimePlatform: "Python 3.11+",
				license: "https://opensource.org/licenses/MIT",
				keywords:
					"khipu, quipu, permutation test, null model, Inka, Peru, digital humanities",
				author: { "@id": ORGANIZATION_ID },
			},
		],
		isBasedOn: [
			{
				"@type": "Dataset",
				name: "Open Khipu Repository 2.1.0",
				url: "https://doi.org/10.5281/zenodo.18025748",
			},
		],
	},
};

export function researchKeywords(entry: CollectionEntry<"research">): string[] {
	const seo = projectSeo[entry.data.project];
	return [...new Set([...entry.data.tags, ...(seo?.keywords ?? [])])];
}

export function researchJsonLd(
	entry: CollectionEntry<"research">,
	lang: Lang,
	url: string,
	imageUrl: string,
): Record<string, unknown>[] {
	const d = entry.data;
	const author = getAuthor(d.author);
	const seo = projectSeo[d.project];
	const researchIndex =
		lang === "en" ? `${SITE}/research` : `${SITE}/${lang}/research`;
	const authorNode = {
		"@type": "Person",
		...(author.personId ? { "@id": author.personId } : {}),
		name: author.name,
		url: author.github,
	};
	const article = {
		"@context": "https://schema.org",
		"@type": "ScholarlyArticle",
		headline: d.title,
		description: d.description,
		abstract: d.abstract ?? d.description,
		inLanguage: d.lang,
		datePublished: d.date.toISOString(),
		url,
		mainEntityOfPage: url,
		image: imageUrl,
		keywords: researchKeywords(entry).join(", "),
		author: [authorNode, { "@id": ORGANIZATION_ID }],
		publisher: { "@id": ORGANIZATION_ID },
		isAccessibleForFree: true,
		...(seo?.about ? { about: seo.about } : {}),
		...(seo?.software ? { mentions: seo.software } : {}),
		...(seo?.isBasedOn ? { isBasedOn: seo.isBasedOn } : {}),
	};
	const breadcrumbs = {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: [
			{
				"@type": "ListItem",
				position: 1,
				name: "Crafter Research",
				item: SITE,
			},
			{
				"@type": "ListItem",
				position: 2,
				name: "Research",
				item: researchIndex,
			},
			{ "@type": "ListItem", position: 3, name: d.title, item: url },
		],
	};
	return [article, breadcrumbs];
}
