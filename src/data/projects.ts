export type ProjectLocale = "en" | "es";
export type ProjectMaturity = "maintained" | "published";
export type ProjectArtifact =
	| "api"
	| "cli"
	| "corpus"
	| "dataset"
	| "eval"
	| "web";

type LocalizedText = Record<ProjectLocale, string>;

export interface ProjectEvidence {
	label: LocalizedText;
	value: LocalizedText;
	sourceUrl: string;
}

export interface ProjectLink {
	label: LocalizedText;
	url: string;
}

export interface ProjectRecord {
	slug: string;
	name: string;
	maturity: ProjectMaturity;
	featured: boolean;
	publicSafe: boolean;
	artifactTypes: ProjectArtifact[];
	summary: LocalizedText;
	evidence: ProjectEvidence[];
	links: ProjectLink[];
	verifiedAt: string;
	limitation: LocalizedText;
}

export const projects = [
	{
		slug: "sismo-abierto",
		name: "Sismo Abierto",
		maturity: "maintained",
		featured: true,
		publicSafe: true,
		artifactTypes: ["web", "api", "cli", "dataset"],
		summary: {
			en: "Official earthquake, accelerometric, and volcanic data from Peru and Colombia, exposed with traceable sources.",
			es: "Datos oficiales sísmicos, acelerométricos y volcánicos de Perú y Colombia, publicados con fuentes trazables.",
		},
		evidence: [
			{
				label: { en: "Released surfaces", es: "Superficies publicadas" },
				value: {
					en: "Web · API · CLI · OpenAPI",
					es: "Web · API · CLI · OpenAPI",
				},
				sourceUrl: "https://github.com/crafter-research/sismo-abierto",
			},
			{
				label: { en: "Release record", es: "Historial de releases" },
				value: { en: "4 GitHub releases", es: "4 releases en GitHub" },
				sourceUrl: "https://github.com/crafter-research/sismo-abierto/releases",
			},
		],
		links: [
			{
				label: { en: "Open system", es: "Abrir sistema" },
				url: "https://sismo.crafter.run",
			},
			{
				label: { en: "Source", es: "Código" },
				url: "https://github.com/crafter-research/sismo-abierto",
			},
		],
		verifiedAt: "2026-08-20",
		limitation: {
			en: "Operational history begins in July 2026, so long-term reliability is still unproven.",
			es: "La historia operativa empieza en julio de 2026, así que la confiabilidad de largo plazo aún no está probada.",
		},
	},
	{
		slug: "sunat-cli",
		name: "SUNAT CLI",
		maturity: "maintained",
		featured: true,
		publicSafe: true,
		artifactTypes: ["cli", "api", "web"],
		summary: {
			en: "An agent-first CLI for supervised Peruvian tax workflows, with explicit safety controls and audit trails.",
			es: "CLI agent-first para flujos tributarios peruanos supervisados, con controles de seguridad y trazabilidad explícitos.",
		},
		evidence: [
			{
				label: { en: "Current release", es: "Release actual" },
				value: { en: "npm v0.6.1", es: "npm v0.6.1" },
				sourceUrl: "https://registry.npmjs.org/%40crafter%2Fsunat-cli/latest",
			},
			{
				label: { en: "Release record", es: "Historial de releases" },
				value: { en: "12 GitHub releases", es: "12 releases en GitHub" },
				sourceUrl: "https://github.com/crafter-research/sunat-cli/releases",
			},
		],
		links: [
			{
				label: { en: "Read the docs", es: "Leer documentación" },
				url: "https://sunat-cli.crafter.ing",
			},
			{
				label: { en: "Source", es: "Código" },
				url: "https://github.com/crafter-research/sunat-cli",
			},
		],
		verifiedAt: "2026-08-20",
		limitation: {
			en: "Several workflows depend on government portals whose interfaces and availability can change without notice.",
			es: "Varios flujos dependen de portales públicos cuyas interfaces y disponibilidad pueden cambiar sin aviso.",
		},
	},
	{
		slug: "latambench",
		name: "LatamBench",
		maturity: "published",
		featured: true,
		publicSafe: true,
		artifactTypes: ["eval", "dataset", "web"],
		summary: {
			en: "An open observatory for Latin American cultural benchmarks that separates correctness, abstention, and hallucination.",
			es: "Observatorio abierto de benchmarks culturales latinoamericanos que separa correctitud, abstención y alucinación.",
		},
		evidence: [
			{
				label: { en: "Evaluated", es: "Evaluados" },
				value: {
					en: "11 models · 500 questions",
					es: "11 modelos · 500 preguntas",
				},
				sourceUrl: "https://github.com/crafter-research/latambench",
			},
			{
				label: { en: "Open evidence", es: "Evidencia abierta" },
				value: {
					en: "Transcripts · results · methodology",
					es: "Transcripciones · resultados · método",
				},
				sourceUrl:
					"https://github.com/crafter-research/latambench/tree/main/eval/runs",
			},
		],
		links: [
			{
				label: { en: "Explore results", es: "Explorar resultados" },
				url: "https://latambench.org",
			},
			{
				label: { en: "Source", es: "Código" },
				url: "https://github.com/crafter-research/latambench",
			},
		],
		verifiedAt: "2026-08-20",
		limitation: {
			en: "The judge calibration is in-sample, and the public benchmark datasets have no contamination analysis.",
			es: "La calibración del juez es in-sample y los datasets públicos no tienen análisis de contaminación.",
		},
	},
	{
		slug: "legalize-peru",
		name: "Legalize Perú",
		maturity: "published",
		featured: true,
		publicSafe: true,
		artifactTypes: ["corpus", "cli", "api", "web"],
		summary: {
			en: "A versioned corpus of Peruvian law and the open engine that produces, audits, and serves it.",
			es: "Corpus versionado de legislación peruana y el motor abierto que lo produce, audita y publica.",
		},
		evidence: [
			{
				label: { en: "Corpus", es: "Corpus" },
				value: {
					en: "21,244 norms · ~98% full text",
					es: "21,244 normas · ~98% con texto completo",
				},
				sourceUrl: "https://github.com/crafter-research/legalize-pe",
			},
			{
				label: { en: "Coverage", es: "Cobertura" },
				value: { en: "26 jurisdictions", es: "26 jurisdicciones" },
				sourceUrl:
					"https://github.com/crafter-research/legalize-pe#cobertura-regional",
			},
		],
		links: [
			{
				label: { en: "Search the corpus", es: "Buscar en el corpus" },
				url: "https://legalize-pe.crafter.ing",
			},
			{
				label: { en: "Corpus", es: "Corpus" },
				url: "https://github.com/crafter-research/legalize-pe",
			},
			{
				label: { en: "Engine", es: "Motor" },
				url: "https://github.com/crafter-research/legalize-pe-engine",
			},
		],
		verifiedAt: "2026-08-20",
		limitation: {
			en: "The engine is pre-1.0, and the current refresh cadence is not yet documented as an operating commitment.",
			es: "El motor es pre-1.0 y la frecuencia de actualización aún no está documentada como compromiso operativo.",
		},
	},
	{
		slug: "muniscan",
		name: "Muniscan",
		maturity: "published",
		featured: true,
		publicSafe: true,
		artifactTypes: ["dataset", "cli"],
		summary: {
			en: "A census-wide, reproducible index of the digital surface Peru's municipalities declare on gob.pe.",
			es: "Índice censal y reproducible de la superficie digital que las municipalidades peruanas declaran en gob.pe.",
		},
		evidence: [
			{
				label: { en: "Census", es: "Censo" },
				value: {
					en: "1,871 scored municipalities",
					es: "1,871 municipalidades puntuadas",
				},
				sourceUrl: "https://github.com/crafter-research/muniscan",
			},
			{
				label: { en: "Coverage", es: "Cobertura" },
				value: {
					en: "3,474 enriched entities",
					es: "3,474 entidades enriquecidas",
				},
				sourceUrl:
					"https://github.com/crafter-research/muniscan/blob/main/METHOD.md",
			},
		],
		links: [
			{
				label: { en: "Open live atlas", es: "Abrir atlas en vivo" },
				url: "https://muniscan.crafter.ing",
			},
			{
				label: { en: "Read research log", es: "Leer bitácora" },
				url: "/research/muniscan",
			},
			{
				label: { en: "Inspect data and method", es: "Revisar datos y método" },
				url: "https://github.com/crafter-research/muniscan",
			},
		],
		verifiedAt: "2026-08-21",
		limitation: {
			en: "Two scored snapshots demonstrate one recurrence, but not yet a stable monthly operating history.",
			es: "Dos snapshots puntuados demuestran una recurrencia, pero aún no una operación mensual estable.",
		},
	},
] satisfies ProjectRecord[];

export const featuredProjects = projects.filter(
	(project) => project.featured && project.publicSafe,
);
