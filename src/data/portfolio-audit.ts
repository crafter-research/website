import type { ProjectArtifact, ProjectLocale } from "./projects";

type LocalizedText = Record<ProjectLocale, string>;

export type PortfolioFamily =
	| "earth-data"
	| "ai-evals"
	| "legal-infrastructure"
	| "government-clis"
	| "civic-knowledge";

export type PortfolioMaturity =
	| "maintained"
	| "published"
	| "experimental"
	| "dormant";

export interface PortfolioAuditRecord {
	slug: string;
	name: string;
	repository: string;
	homepage?: string;
	family: PortfolioFamily;
	maturity: PortfolioMaturity;
	artifactTypes: ProjectArtifact[];
	summary: LocalizedText;
	limitation: LocalizedText;
	proof: LocalizedText[];
	scores: {
		activity: 0 | 1 | 2 | 3 | 4;
		consistency: 0 | 1 | 2 | 3 | 4;
		output: 0 | 1 | 2 | 3 | 4;
	};
	metrics: {
		commits: number;
		activeWeeks: number;
		releases: number;
	};
	lastActivity: string;
	verifiedAt: string;
}

const github = (repo: string) => `https://github.com/crafter-research/${repo}`;

export const portfolioAudit: PortfolioAuditRecord[] = [
	{
		slug: "sismo-abierto",
		name: "Sismo Abierto",
		repository: github("sismo-abierto"),
		homepage: "https://sismo.crafter.run",
		family: "earth-data",
		maturity: "maintained",
		artifactTypes: ["web", "api", "cli", "dataset"],
		summary: {
			en: "Traceable earthquake, accelerometric, and volcanic data from official sources in Peru and Colombia.",
			es: "Datos sísmicos, acelerométricos y volcánicos trazables desde fuentes oficiales de Perú y Colombia.",
		},
		limitation: {
			en: "Operational history begins in July 2026; long-term reliability is still unproven.",
			es: "La historia operativa empieza en julio de 2026; la confiabilidad de largo plazo aún no está probada.",
		},
		proof: [
			{
				en: "140 commits across 5 active weeks",
				es: "140 commits en 5 semanas activas",
			},
			{
				en: "4 releases · web · API · CLI · OpenAPI",
				es: "4 releases · web · API · CLI · OpenAPI",
			},
		],
		scores: { activity: 4, consistency: 3, output: 4 },
		metrics: { commits: 140, activeWeeks: 5, releases: 4 },
		lastActivity: "2026-08-21",
		verifiedAt: "2026-08-21",
	},
	{
		slug: "latambench",
		name: "LatamBench",
		repository: github("latambench"),
		homepage: "https://latambench.org",
		family: "ai-evals",
		maturity: "maintained",
		artifactTypes: ["eval", "dataset", "web"],
		summary: {
			en: "Open Latin American cultural benchmark with transcripts, results, and a documented methodology.",
			es: "Benchmark cultural latinoamericano abierto con transcripciones, resultados y metodología documentada.",
		},
		limitation: {
			en: "Judge calibration remains in-sample and public datasets lack contamination analysis.",
			es: "La calibración del juez sigue siendo in-sample y los datasets públicos no tienen análisis de contaminación.",
		},
		proof: [
			{ en: "11 models · 500 questions", es: "11 modelos · 500 preguntas" },
			{
				en: "27 commits across 3 active weeks",
				es: "27 commits en 3 semanas activas",
			},
		],
		scores: { activity: 4, consistency: 3, output: 4 },
		metrics: { commits: 27, activeWeeks: 3, releases: 0 },
		lastActivity: "2026-08-19",
		verifiedAt: "2026-08-21",
	},
	{
		slug: "sunat-cli",
		name: "SUNAT CLI",
		repository: github("sunat-cli"),
		homepage: "https://sunat-cli.crafter.ing",
		family: "government-clis",
		maturity: "maintained",
		artifactTypes: ["cli", "api", "web"],
		summary: {
			en: "Agent-first CLI for supervised Peruvian tax workflows with safety controls and audit trails.",
			es: "CLI agent-first para flujos tributarios peruanos supervisados con controles de seguridad y trazabilidad.",
		},
		limitation: {
			en: "Several workflows depend on government portals that can change without notice.",
			es: "Varios flujos dependen de portales públicos que pueden cambiar sin aviso.",
		},
		proof: [
			{
				en: "12 releases · current package v0.6.1",
				es: "12 releases · paquete actual v0.6.1",
			},
			{
				en: "79 commits across 4 active weeks",
				es: "79 commits en 4 semanas activas",
			},
		],
		scores: { activity: 4, consistency: 3, output: 4 },
		metrics: { commits: 79, activeWeeks: 4, releases: 12 },
		lastActivity: "2026-08-09",
		verifiedAt: "2026-08-21",
	},
	{
		slug: "muniscan",
		name: "Muniscan",
		repository: github("muniscan"),
		homepage: "https://muniscan.crafter.ing",
		family: "civic-knowledge",
		maturity: "published",
		artifactTypes: ["dataset", "cli"],
		summary: {
			en: "Reproducible census of the digital surface Peru's municipalities declare on gob.pe.",
			es: "Censo reproducible de la superficie digital que las municipalidades peruanas declaran en gob.pe.",
		},
		limitation: {
			en: "Two scored snapshots demonstrate one recurrence, but not yet a stable monthly operating history.",
			es: "Dos snapshots puntuados demuestran una recurrencia, pero aún no una operación mensual estable.",
		},
		proof: [
			{
				en: "1,871 scored municipalities · 3,474 enriched entities",
				es: "1,871 municipalidades puntuadas · 3,474 entidades enriquecidas",
			},
			{
				en: "Two snapshots · diff · point-in-time HTTP sample",
				es: "Dos snapshots · diff · muestra HTTP puntual",
			},
		],
		scores: { activity: 4, consistency: 2, output: 4 },
		metrics: { commits: 10, activeWeeks: 2, releases: 0 },
		lastActivity: "2026-08-21",
		verifiedAt: "2026-08-21",
	},
	{
		slug: "legalize-pe-engine",
		name: "Legalize Perú Engine",
		repository: github("legalize-pe-engine"),
		homepage: "https://legalize-pe.crafter.ing",
		family: "legal-infrastructure",
		maturity: "published",
		artifactTypes: ["cli", "api", "web", "corpus"],
		summary: {
			en: "Open toolchain that produces, audits, and serves the versioned Peruvian legal corpus.",
			es: "Toolchain abierto que produce, audita y publica el corpus versionado de legislación peruana.",
		},
		limitation: {
			en: "The engine is explicitly pre-1.0 and does not promise a stable refresh cadence.",
			es: "El motor es explícitamente pre-1.0 y no promete una frecuencia estable de actualización.",
		},
		proof: [
			{
				en: "CLI · web · API · MCP · scraper packages",
				es: "CLI · web · API · MCP · paquetes de scraping",
			},
			{
				en: "71 commits across 5 active weeks",
				es: "71 commits en 5 semanas activas",
			},
		],
		scores: { activity: 2, consistency: 4, output: 4 },
		metrics: { commits: 71, activeWeeks: 5, releases: 0 },
		lastActivity: "2026-06-30",
		verifiedAt: "2026-08-21",
	},
	{
		slug: "amicus-eval",
		name: "Amicus Eval",
		repository: github("amicus-eval"),
		family: "ai-evals",
		maturity: "published",
		artifactTypes: ["eval", "dataset"],
		summary: {
			en: "Reproducible retrieval benchmark for Spanish-language Peruvian legal question answering.",
			es: "Benchmark reproducible de retrieval para preguntas legales peruanas en español.",
		},
		limitation: {
			en: "It evaluates retrieval, not the full hosted assistant or end-user answer quality.",
			es: "Evalúa retrieval, no el asistente alojado completo ni la calidad final de sus respuestas.",
		},
		proof: [
			{
				en: "Gold set, annotations, rankings, and metrics published",
				es: "Gold set, anotaciones, rankings y métricas publicadas",
			},
			{
				en: "Independent metric recomputation with bun verify.ts",
				es: "Recomputación independiente con bun verify.ts",
			},
		],
		scores: { activity: 2, consistency: 1, output: 4 },
		metrics: { commits: 1, activeWeeks: 1, releases: 0 },
		lastActivity: "2026-06-22",
		verifiedAt: "2026-08-21",
	},
	{
		slug: "amicus-sdk",
		name: "Amicus SDK",
		repository: github("amicus-sdk"),
		family: "legal-infrastructure",
		maturity: "experimental",
		artifactTypes: ["cli", "api"],
		summary: {
			en: "Open CLI, MCP, and documentation surface for the hosted Amicus legal-research service.",
			es: "Superficie abierta de CLI, MCP y documentación para el servicio de research legal Amicus.",
		},
		limitation: {
			en: "The hosted product is private and the public client has no release history yet.",
			es: "El producto alojado es privado y el cliente público todavía no tiene historial de releases.",
		},
		proof: [
			{
				en: "CLI and MCP source are public",
				es: "El código del CLI y MCP es público",
			},
			{
				en: "4 commits in one active week",
				es: "4 commits en una semana activa",
			},
		],
		scores: { activity: 1, consistency: 1, output: 2 },
		metrics: { commits: 4, activeWeeks: 1, releases: 0 },
		lastActivity: "2026-06-13",
		verifiedAt: "2026-08-21",
	},
	{
		slug: "legalize-pe",
		name: "Legalize Perú Corpus",
		repository: github("legalize-pe"),
		homepage: "https://legalize-pe.crafter.ing",
		family: "legal-infrastructure",
		maturity: "published",
		artifactTypes: ["corpus", "dataset", "web"],
		summary: {
			en: "Versioned public corpus of Peruvian national and regional legislation.",
			es: "Corpus público versionado de legislación peruana nacional y regional.",
		},
		limitation: {
			en: "Corpus commit history uses source publication dates, so repository activity is not a maintenance signal.",
			es: "El historial del corpus usa fechas de publicación de las fuentes, así que no mide mantenimiento.",
		},
		proof: [
			{
				en: "21,244 norms · approximately 98% full text",
				es: "21,244 normas · aproximadamente 98% con texto completo",
			},
			{
				en: "26 regional jurisdictions plus national coverage",
				es: "26 jurisdicciones regionales más cobertura nacional",
			},
		],
		scores: { activity: 1, consistency: 1, output: 4 },
		metrics: { commits: 1, activeWeeks: 1, releases: 0 },
		lastActivity: "2026-06-12",
		verifiedAt: "2026-08-21",
	},
	{
		slug: "timeline-peru",
		name: "Timeline Perú",
		repository: github("timeline-peru"),
		homepage: "https://timeline-peru.vercel.app",
		family: "civic-knowledge",
		maturity: "published",
		artifactTypes: ["dataset", "web"],
		summary: {
			en: "Interactive public timeline built from a large collection of structured historical events.",
			es: "Línea de tiempo pública e interactiva construida desde una colección amplia de eventos históricos estructurados.",
		},
		limitation: {
			en: "The repository contains extensive process documentation but no explicit source-quality rubric.",
			es: "El repositorio tiene documentación extensa de proceso, pero no una rúbrica explícita de calidad de fuentes.",
		},
		proof: [
			{
				en: "Public interactive web artifact",
				es: "Artefacto web interactivo público",
			},
			{
				en: "13 commits across 3 active weeks",
				es: "13 commits en 3 semanas activas",
			},
		],
		scores: { activity: 1, consistency: 2, output: 3 },
		metrics: { commits: 13, activeWeeks: 3, releases: 0 },
		lastActivity: "2026-05-22",
		verifiedAt: "2026-08-21",
	},
	{
		slug: "peru-financia",
		name: "Perú Financia",
		repository: github("peru-financia"),
		homepage: "https://peru-financia.crafter.ing",
		family: "civic-knowledge",
		maturity: "published",
		artifactTypes: ["dataset", "web"],
		summary: {
			en: "Open explorer of Peruvian political financing from ONPE records spanning 1995–2026.",
			es: "Explorador abierto del financiamiento político peruano con registros ONPE de 1995–2026.",
		},
		limitation: {
			en: "The last material repository activity predates the current audit by more than three months.",
			es: "La última actividad material del repositorio precede esta auditoría por más de tres meses.",
		},
		proof: [
			{
				en: "13,250+ records · search · profiles · CSV export",
				es: "13,250+ registros · búsqueda · perfiles · exportación CSV",
			},
			{
				en: "21 commits across 3 active weeks",
				es: "21 commits en 3 semanas activas",
			},
		],
		scores: { activity: 1, consistency: 2, output: 4 },
		metrics: { commits: 21, activeWeeks: 3, releases: 0 },
		lastActivity: "2026-05-17",
		verifiedAt: "2026-08-21",
	},
	{
		slug: "fem-graph",
		name: "Fem Graph",
		repository: github("Fem-graph"),
		family: "civic-knowledge",
		maturity: "published",
		artifactTypes: ["dataset", "web"],
		summary: {
			en: "Focused visualization of how Peru's PL 10342/2024-CR would narrow femicide protections.",
			es: "Visualización focalizada de cómo el PL 10342/2024-CR reduciría la protección legal ante feminicidios.",
		},
		limitation: {
			en: "The repository still documents npm commands and has only one active development week.",
			es: "El repositorio todavía documenta comandos npm y solo tuvo una semana activa de desarrollo.",
		},
		proof: [
			{
				en: "Analysis grounded in 166 MIMP cases",
				es: "Análisis basado en 166 casos del MIMP",
			},
			{
				en: "16 commits in one active week",
				es: "16 commits en una semana activa",
			},
		],
		scores: { activity: 0, consistency: 1, output: 3 },
		metrics: { commits: 16, activeWeeks: 1, releases: 0 },
		lastActivity: "2026-05-01",
		verifiedAt: "2026-08-21",
	},
	{
		slug: "onpe-cli",
		name: "ONPE CLI",
		repository: github("onpe-cli"),
		homepage: "https://onpe-cli.crafter.run",
		family: "government-clis",
		maturity: "published",
		artifactTypes: ["cli", "api", "web"],
		summary: {
			en: "Agent-first CLI for querying official Peruvian election results, polling tables, and geography.",
			es: "CLI agent-first para consultar resultados electorales oficiales, actas, mesas y geografía del Perú.",
		},
		limitation: {
			en: "No material activity has landed since April 2026 and no release history is published.",
			es: "No hay actividad material desde abril de 2026 ni historial de releases publicado.",
		},
		proof: [
			{
				en: "Installable CLI with documented commands",
				es: "CLI instalable con comandos documentados",
			},
			{
				en: "15 commits in one active week",
				es: "15 commits en una semana activa",
			},
		],
		scores: { activity: 0, consistency: 1, output: 3 },
		metrics: { commits: 15, activeWeeks: 1, releases: 0 },
		lastActivity: "2026-04-21",
		verifiedAt: "2026-08-21",
	},
	{
		slug: "political-graph",
		name: "Political Graph",
		repository: github("political-graph"),
		family: "civic-knowledge",
		maturity: "published",
		artifactTypes: ["dataset", "web"],
		summary: {
			en: "Interactive graph connecting Peruvian politicians, corruption cases, and supporting public documents.",
			es: "Grafo interactivo que conecta políticos peruanos, casos de corrupción y documentos públicos de respaldo.",
		},
		limitation: {
			en: "No material activity has landed since March 2026 and the README exposes no hosted interface.",
			es: "No hay actividad material desde marzo de 2026 y el README no expone una interfaz alojada.",
		},
		proof: [
			{
				en: "69 nodes · 37 relationships · 112 source documents",
				es: "69 nodos · 37 relaciones · 112 documentos fuente",
			},
			{
				en: "26 commits in one active week",
				es: "26 commits en una semana activa",
			},
		],
		scores: { activity: 0, consistency: 1, output: 3 },
		metrics: { commits: 26, activeWeeks: 1, releases: 0 },
		lastActivity: "2026-03-28",
		verifiedAt: "2026-08-21",
	},
	...[
		[
			"mtc-sutran-cli",
			"MTC / SUTRAN CLI",
			"MTC and SUTRAN mobility and compliance workflows.",
			"Flujos de movilidad y cumplimiento de MTC y SUTRAN.",
			8,
		],
		[
			"sunedu-cli",
			"SUNEDU CLI",
			"Public credential-verification workflows from SUNEDU.",
			"Flujos públicos de verificación de credenciales de SUNEDU.",
			7,
		],
		[
			"osce-seace-cli",
			"OSCE / SEACE CLI",
			"Public procurement checks with source provenance.",
			"Consultas de contratación pública con procedencia de fuentes.",
			5,
		],
		[
			"sunarp-cli",
			"SUNARP CLI",
			"Preflight and workflow contracts for public registry queries.",
			"Preflight y contratos de flujos para consultas de registros públicos.",
			6,
		],
		[
			"jne-cli",
			"JNE CLI",
			"Public electoral data from the Jurado Nacional de Elecciones.",
			"Datos electorales públicos del Jurado Nacional de Elecciones.",
			8,
		],
		[
			"bcrp-cli",
			"BCRP CLI",
			"Official macroeconomic series from BCRPData.",
			"Series macroeconómicas oficiales de BCRPData.",
			6,
		],
	].map(([slug, name, en, es, commits]) => ({
		slug: slug as string,
		name: name as string,
		repository: github(slug as string),
		family: "government-clis" as const,
		maturity: "dormant" as const,
		artifactTypes: ["cli", "api"] as ProjectArtifact[],
		summary: { en: en as string, es: es as string },
		limitation: {
			en: "The repository was built in one week, has no releases, and has seen no material activity since April 2026.",
			es: "El repositorio se construyó en una semana, no tiene releases y no registra actividad material desde abril de 2026.",
		},
		proof: [
			{
				en: "Installable v0.1 CLI surface",
				es: "Superficie CLI v0.1 instalable",
			},
			{
				en: `${commits} commits in one active week`,
				es: `${commits} commits en una semana activa`,
			},
		],
		scores: {
			activity: 0 as const,
			consistency: 1 as const,
			output: 2 as const,
		},
		metrics: { commits: commits as number, activeWeeks: 1, releases: 0 },
		lastActivity: "2026-04-23",
		verifiedAt: "2026-08-21",
	})),
	{
		slug: "candidatos",
		name: "Candidatos",
		repository: github("candidatos"),
		family: "civic-knowledge",
		maturity: "dormant",
		artifactTypes: ["web"],
		summary: {
			en: "Early candidate explorer intended to connect JNE data with political financing and relationship graphs.",
			es: "Explorador temprano de candidatos pensado para cruzar datos JNE con financiamiento y grafos políticos.",
		},
		limitation: {
			en: "The public repository contains one commit and an unchanged Astro starter README, with no inspectable research output.",
			es: "El repositorio público contiene un commit y un README inicial de Astro sin output de research inspeccionable.",
		},
		proof: [
			{ en: "Public source exists", es: "El código fuente es público" },
			{
				en: "1 commit · 1 active week · no release",
				es: "1 commit · 1 semana activa · sin release",
			},
		],
		scores: { activity: 0, consistency: 1, output: 1 },
		metrics: { commits: 1, activeWeeks: 1, releases: 0 },
		lastActivity: "2026-03-26",
		verifiedAt: "2026-08-21",
	},
];

export const auditedPublicRepositoryCount = 20;
export const publicRepositoryCount = 24;
export const excludedPublicRepositories = [
	"website",
	".github",
	"brand",
	"govhack",
];

export const portfolioScore = (project: PortfolioAuditRecord) =>
	project.scores.activity + project.scores.consistency + project.scores.output;
