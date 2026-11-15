import { focus, problems } from "../src/data/frontier";
import { people } from "../src/data/people";
import { featuredProjects, projects } from "../src/data/projects";

const requiredFeaturedProjects = 5;
const maintainedFreshnessDays = 90;
const errors: string[] = [];
const urls = new Set<string>();
const bilingual = (label: string, v: { en: string; es: string }) => {
	if (!v.en || !v.es) errors.push(`${label}: must be bilingual`);
};

const slugs = new Set<string>();
for (const project of projects) {
	if (slugs.has(project.slug)) errors.push(`Duplicate slug: ${project.slug}`);
	slugs.add(project.slug);
	if (project.featured && !project.publicSafe) errors.push(`${project.slug}: featured projects must be public-safe`);
	if (project.featured && project.links.length === 0) errors.push(`${project.slug}: featured projects need a public link`);
	if (!/^\d{4}-\d{2}-\d{2}$/.test(project.verifiedAt)) errors.push(`${project.slug}: verifiedAt must use YYYY-MM-DD`);
	bilingual(`${project.slug} summary`, project.summary);
	bilingual(`${project.slug} limitation`, project.limitation);
	if (project.maturity === "maintained") {
		const age = (Date.now() - new Date(`${project.verifiedAt}T23:59:59Z`).getTime()) / 86_400_000;
		if (age > maintainedFreshnessDays) errors.push(`${project.slug}: maintained evidence is ${Math.floor(age)} days old`);
	}
	for (const e of project.evidence) urls.add(e.sourceUrl);
	for (const l of project.links) if (l.url.startsWith("http")) urls.add(l.url);
}
if (featuredProjects.length !== requiredFeaturedProjects) {
	errors.push(`Expected ${requiredFeaturedProjects} featured projects, found ${featuredProjects.length}`);
}

const ids = new Set<string>();
for (const p of problems) {
	if (ids.has(p.id)) errors.push(`Duplicate problem id: ${p.id}`);
	ids.add(p.id);
	bilingual(`${p.id} title`, p.title);
	bilingual(`${p.id} oracle`, p.oracle);
}
for (const bet of focus) {
	if (!ids.has(bet.id)) errors.push(`Focus bet ${bet.id} is not in the problem catalogue`);
	for (const k of ["title", "belief", "oracle", "kill"] as const) bilingual(`${bet.id} ${k}`, bet[k]);
}
for (const person of people) {
	bilingual(`${person.name} role`, person.role);
	for (const l of person.links) urls.add(l.url);
}

// X, LinkedIn and some government hosts block automated requests; check reachability only where a HEAD is meaningful.
const skipHosts = ["x.com", "www.linkedin.com", "linkedin.com"];
await Promise.all(
	[...urls]
		.filter((u) => !skipHosts.includes(new URL(u).host))
		.map(async (url) => {
			try {
				const res = await fetch(url, { method: "GET", redirect: "follow", signal: AbortSignal.timeout(15_000) });
				if (res.status >= 400) errors.push(`${url}: HTTP ${res.status}`);
			} catch (error) {
				errors.push(`${url}: ${(error as Error).message}`);
			}
		}),
);

if (errors.length > 0) {
	console.error(errors.join("\n"));
	process.exit(1);
}
console.log(`Validated ${projects.length} projects, ${problems.length} problems, ${focus.length} focus bets, ${people.length} people, and ${urls.size} URLs.`);
