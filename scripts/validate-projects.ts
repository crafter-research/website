import { featuredProjects, projects } from "../src/data/projects";

const requiredFeaturedProjects = 5;
const maintainedFreshnessDays = 90;
const urls = new Set<string>();
const slugs = new Set<string>();
const errors: string[] = [];

for (const project of projects) {
	if (slugs.has(project.slug)) errors.push(`Duplicate slug: ${project.slug}`);
	slugs.add(project.slug);

	if (project.featured && !project.publicSafe) {
		errors.push(`${project.slug}: featured projects must be public-safe`);
	}
	if (project.featured && project.evidence.length === 0) {
		errors.push(`${project.slug}: featured projects need evidence`);
	}
	if (project.featured && project.links.length === 0) {
		errors.push(`${project.slug}: featured projects need a public link`);
	}
	if (!/^\d{4}-\d{2}-\d{2}$/.test(project.verifiedAt)) {
		errors.push(`${project.slug}: verifiedAt must use YYYY-MM-DD`);
	}
	if (!project.limitation.en || !project.limitation.es) {
		errors.push(`${project.slug}: limitation must be bilingual`);
	}
	if (!project.summary.en || !project.summary.es) {
		errors.push(`${project.slug}: summary must be bilingual`);
	}
	if (project.maturity === "maintained") {
		const verifiedAt = new Date(`${project.verifiedAt}T23:59:59Z`);
		const ageDays = (Date.now() - verifiedAt.getTime()) / 86_400_000;
		if (ageDays > maintainedFreshnessDays) {
			errors.push(
				`${project.slug}: maintained evidence is ${Math.floor(ageDays)} days old`,
			);
		}
	}

	for (const evidence of project.evidence) {
		if (!evidence.label.en || !evidence.label.es) {
			errors.push(`${project.slug}: evidence labels must be bilingual`);
		}
		if (!evidence.value.en || !evidence.value.es) {
			errors.push(`${project.slug}: evidence values must be bilingual`);
		}
		urls.add(evidence.sourceUrl);
	}
	for (const link of project.links) {
		if (!link.label.en || !link.label.es) {
			errors.push(`${project.slug}: link labels must be bilingual`);
		}
		urls.add(link.url);
	}
}

if (featuredProjects.length !== requiredFeaturedProjects) {
	errors.push(
		`Expected ${requiredFeaturedProjects} featured projects, found ${featuredProjects.length}`,
	);
}

await Promise.all(
	[...urls].map(async (url) => {
		try {
			const response = await fetch(url, {
				headers: { "user-agent": "crafter-research-link-check" },
				redirect: "follow",
				signal: AbortSignal.timeout(15_000),
			});
			if (!response.ok) errors.push(`${url}: HTTP ${response.status}`);
		} catch (error) {
			errors.push(`${url}: ${error instanceof Error ? error.message : "request failed"}`);
		}
	}),
);

if (errors.length > 0) {
	for (const error of errors) console.error(error);
	process.exit(1);
}

console.log(
	`Validated ${projects.length} projects, ${featuredProjects.length} featured records, and ${urls.size} public URLs.`,
);
