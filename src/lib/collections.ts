import { type CollectionEntry, getCollection } from "astro:content";
import { defaultLang, type Lang } from "../i18n/ui";

export type ContentType = "research" | "blog";

const localeTag: Record<Lang, string> = {
	en: "en-US",
	es: "es-PE",
	pt: "pt-BR",
	zh: "zh-CN",
};

export function fmtDate(d: Date, lang: Lang): string {
	return d.toLocaleDateString(localeTag[lang] ?? "en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
		timeZone: "UTC",
	});
}

type AnyEntry = CollectionEntry<"research"> | CollectionEntry<"blog">;

export interface ResolvedEntry<T extends AnyEntry = AnyEntry> {
	entry: T;
	untranslated: boolean;
}

/**
 * One entry per urlSlug. Prefers the doc written in `lang`; otherwise falls
 * back to the default-language (en) doc and flags it as untranslated.
 * The default language always exists for a slug to appear at all.
 */
export async function getEntriesWithFallback<T extends ContentType>(
	type: T,
	lang: Lang,
): Promise<ResolvedEntry<CollectionEntry<T>>[]> {
	const all = (await getCollection(type)) as CollectionEntry<T>[];

	const bySlug = new Map<string, Partial<Record<Lang, CollectionEntry<T>>>>();
	for (const entry of all) {
		const slug = entry.data.urlSlug;
		const group = bySlug.get(slug) ?? {};
		group[entry.data.lang as Lang] = entry;
		bySlug.set(slug, group);
	}

	const resolved: ResolvedEntry<CollectionEntry<T>>[] = [];
	for (const group of bySlug.values()) {
		const localized = group[lang];
		const fallback = group[defaultLang];
		const entry = localized ?? fallback;
		if (!entry) continue; // no default-language source, skip
		resolved.push({ entry, untranslated: !localized });
	}

	return resolved.sort(
		(a, b) => b.entry.data.date.valueOf() - a.entry.data.date.valueOf(),
	);
}

/** Resolve a single slug for a language, with default-language fallback. */
export async function getEntryWithFallback<T extends ContentType>(
	type: T,
	lang: Lang,
	urlSlug: string,
): Promise<ResolvedEntry<CollectionEntry<T>> | null> {
	const all = (await getCollection(type)) as CollectionEntry<T>[];
	const forSlug = all.filter((e) => e.data.urlSlug === urlSlug);
	const localized = forSlug.find((e) => (e.data.lang as Lang) === lang);
	const fallback = forSlug.find((e) => (e.data.lang as Lang) === defaultLang);
	const entry = localized ?? fallback;
	if (!entry) return null;
	return { entry, untranslated: !localized };
}

/** Every distinct urlSlug that has a default-language source (for getStaticPaths). */
export async function getSlugs(type: ContentType): Promise<string[]> {
	const all = await getCollection(type);
	const slugs = new Set<string>();
	for (const entry of all) {
		if ((entry.data.lang as Lang) === defaultLang)
			slugs.add(entry.data.urlSlug);
	}
	return [...slugs];
}
