import { featuredProjects, projects } from "../src/data/projects";
import {
	auditedPublicRepositoryCount,
	excludedPublicRepositories,
	portfolioAudit,
	publicRepositoryCount,
} from "../src/data/portfolio-audit";
import { publicSystems } from "../src/data/public-systems";

const requiredFeaturedProjects = 5;
const maintainedFreshnessDays = 90;
const urls = new Set<string>();
const slugs = new Set<string>();
const errors: string[] = [];
const auditSlugs = new Set<string>();
const systemSlugs = new Set<string>();

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

for (const project of portfolioAudit) {
	if (auditSlugs.has(project.slug)) errors.push(`Duplicate audit slug: ${project.slug}`);
	auditSlugs.add(project.slug);
	if (!project.summary.en || !project.summary.es) {
		errors.push(`${project.slug}: audit summary must be bilingual`);
	}
	if (!project.limitation.en || !project.limitation.es) {
		errors.push(`${project.slug}: audit limitation must be bilingual`);
	}
	if (project.proof.length === 0 || project.proof.some((item) => !item.en || !item.es)) {
		errors.push(`${project.slug}: audit proof must be present and bilingual`);
	}
	if (!/^https:\/\/github\.com\/crafter-research\//.test(project.repository)) {
		errors.push(`${project.slug}: audit repository must be public Crafter Research GitHub`);
	}
	if (!/^\d{4}-\d{2}-\d{2}$/.test(project.lastActivity)) {
		errors.push(`${project.slug}: lastActivity must use YYYY-MM-DD`);
	}
	if (!/^\d{4}-\d{2}-\d{2}$/.test(project.verifiedAt)) {
		errors.push(`${project.slug}: audit verifiedAt must use YYYY-MM-DD`);
	}
	if (Object.values(project.scores).some((score) => score < 0 || score > 4)) {
		errors.push(`${project.slug}: audit scores must be between 0 and 4`);
	}
	urls.add(project.repository);
	if (project.homepage) urls.add(project.homepage);
}

if (publicSystems.length !== 6) {
	errors.push(`Expected 6 public-system records, found ${publicSystems.length}`);
}

for (const record of publicSystems) {
	if (systemSlugs.has(record.slug)) errors.push(`Duplicate system slug: ${record.slug}`);
	systemSlugs.add(record.slug);
	if (record.reviewState !== "first-pass") {
		errors.push(`${record.slug}: unsupported public review state`);
	}
	if (record.agencyResponseState !== "not-contacted") {
		errors.push(`${record.slug}: agency-response state must match the evidence`);
	}
	if (!/^\d{4}-\d{2}-\d{2}$/.test(record.lastReviewed)) {
		errors.push(`${record.slug}: lastReviewed must use YYYY-MM-DD`);
	}
	if (record.sources.length === 0) errors.push(`${record.slug}: sources are required`);
	if (record.missingPublicEvidence.length === 0) {
		errors.push(`${record.slug}: missing-public-evidence fields are required`);
	}
	if (!record.boundary.en || !record.boundary.es) {
		errors.push(`${record.slug}: claim boundary must be bilingual`);
	}
	if (Object.values(record.coverage).some((value) => value < 0 || value > 2)) {
		errors.push(`${record.slug}: evidence coverage must be 0, 1, or 2`);
	}
	for (const source of record.sources) urls.add(source.url);
}

if (portfolioAudit.length !== auditedPublicRepositoryCount) {
	errors.push(
		`Expected ${auditedPublicRepositoryCount} audited public projects, found ${portfolioAudit.length}`,
	);
}
if (portfolioAudit.length + excludedPublicRepositories.length !== publicRepositoryCount) {
	errors.push("Audited and excluded repositories do not match the declared public scope");
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
	`Validated ${projects.length} featured-project records, ${portfolioAudit.length} audited projects, ${publicSystems.length} public-system records, and ${urls.size} public URLs.`,
);
