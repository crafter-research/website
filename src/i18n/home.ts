export const copyByLang = {
	en: {
		description:
			"Crafter Research is a public-interest AI research lab for Peru and LATAM, building reproducible artifacts, datasets, evals, registries, and accountability tools.",
		label: "Crafter Research",
		navLog: "Research log",
		kicker: "Crafter Research / Lima, Peru",
		heroTitle: "Public-interest AI research for Peru and LATAM.",
		heroBody:
			"We turn public data, legal and civic corpora, and model evaluations into reproducible artifacts, datasets, registries, and accountability tools.",
		primaryCta: "Read the log",
		secondaryCta: "GitHub",
		instrumentLabel: "Team overview",
		instrumentTitle: "Research should ship artifacts people can inspect.",
		instrumentBody:
			"We work on source-backed datasets, scorecards, registries, evaluation artifacts, and small tools tied to public-interest questions.",
		projectsLabel: "Published work",
		projectsTitle: "Evidence you can inspect, not promises.",
		projectsBody:
			"Five current projects with their released surfaces, supporting evidence, verification date, and known limits.",
		artifactsLabel: "Artifact types",
		limitationLabel: "Current limitation",
		linksLabel: "project links",
		verifiedLabel: "Verified",
		maturity: {
			maintained: "Maintained",
			published: "Published",
		},
		chainLabel: "Operating model",
		chainTitle: "From source material to reusable artifacts.",
		chainBody: "Question, sources, artifact, review, documentation, release.",
		ledgerLabel: "Work surfaces",
		ledgerTitle: "The lab is organized around four artifact types.",
		ledgerBody:
			"Projects can move at different speeds, but the output should stay inspectable and reusable.",
		logLabel: "Lab notes",
		logTitle: "Research logs with artifacts.",
		logCta: "Read all notes",
		stanceLabel: "Operating stance",
		stanceTitle: "Small, practical, evidence-first.",
		footerMade: "Made by",
		footerAnd: "and",
		footerStation: "Crafter Station",
	},
	es: {
		description:
			"Crafter Research es un AI research lab de interés público para Perú y LATAM, enfocado en artefactos reproducibles, datasets, evals, registros y tools de accountability.",
		label: "Crafter Research",
		navLog: "Registro",
		kicker: "Crafter Research / Lima, Perú",
		heroTitle: "AI research de interés público para Perú y LATAM.",
		heroBody:
			"Convertimos data pública, corpora legales y cívicos, y evaluaciones de modelos en artefactos reproducibles, datasets, registros y tools de accountability.",
		primaryCta: "Leer registro",
		secondaryCta: "GitHub",
		instrumentLabel: "Overview del team",
		instrumentTitle: "El research debería producir artefactos inspeccionables.",
		instrumentBody:
			"Trabajamos en datasets source-backed, scorecards, registros, artefactos de evaluación y tools pequeñas atadas a preguntas de interés público.",
		projectsLabel: "Trabajo publicado",
		projectsTitle: "Evidencia que puedes inspeccionar, no promesas.",
		projectsBody:
			"Cinco proyectos actuales con sus superficies publicadas, evidencia, fecha de verificación y límites conocidos.",
		artifactsLabel: "Tipos de artefacto",
		limitationLabel: "Limitación actual",
		linksLabel: "enlaces del proyecto",
		verifiedLabel: "Verificado",
		maturity: {
			maintained: "Mantenido",
			published: "Publicado",
		},
		chainLabel: "Modelo operativo",
		chainTitle: "De fuente pública a artefactos reutilizables.",
		chainBody: "Pregunta, fuentes, artefacto, review, documentación, release.",
		ledgerLabel: "Superficies de trabajo",
		ledgerTitle: "El lab se organiza alrededor de cuatro tipos de artefacto.",
		ledgerBody:
			"Los proyectos pueden moverse a distintos ritmos, pero el output debe seguir siendo inspeccionable y reusable.",
		logLabel: "Notas del lab",
		logTitle: "Research logs con artefactos.",
		logCta: "Leer todas las notas",
		stanceLabel: "Postura operativa",
		stanceTitle: "Pequeño, práctico y evidence-first.",
		footerMade: "Hecho por",
		footerAnd: "y",
		footerStation: "Crafter Station",
	},
} as const;

export const heroPathByLang = {
	en: ["public source", "dataset", "eval", "registry", "tool", "docs"],
	es: ["fuente pública", "dataset", "eval", "registro", "tool", "docs"],
} as const;

export const heroSignalsByLang = {
	en: [
		[
			"data",
			"Public data",
			"Messy government and civic sources become reusable, versioned, and inspectable datasets.",
		],
		[
			"corpora",
			"Legal and civic corpora",
			"Fragmented public material becomes structured source trails, corpus cards, and research inputs.",
		],
		[
			"evals",
			"Model evaluations",
			"Evaluation work should separate correctness, abstention, hallucination, and evidence quality.",
		],
	],
	es: [
		[
			"data",
			"Data pública",
			"Fuentes cívicas y gubernamentales desordenadas se vuelven datasets reusables, versionados e inspeccionables.",
		],
		[
			"corpora",
			"Corpora legales y cívicos",
			"Material público fragmentado se vuelve source trails, corpus cards e inputs de research.",
		],
		[
			"evals",
			"Evaluaciones de modelos",
			"El trabajo de eval separa correctitud, abstención, alucinación y calidad de evidencia.",
		],
	],
} as const;

export const chainByLang = {
	en: [
		[
			"01",
			"Question",
			"A public-interest question tied to a real source, corpus, or model behavior.",
		],
		[
			"02",
			"Sources",
			"A source trail with URLs, dates, limitations, and evidence quality notes.",
		],
		[
			"03",
			"Artifact",
			"A dataset, eval, registry, scorecard, CLI, or accountability tool.",
		],
		[
			"04",
			"Review",
			"Check reproducibility, source quality, and limitations before claims harden.",
		],
		[
			"05",
			"Documentation",
			"Shareable notes that do not require private vault access to understand the work.",
		],
		[
			"06",
			"Next gate",
			"Promote, hold, or reshape the project based on evidence rather than excitement.",
		],
	],
	es: [
		[
			"01",
			"Pregunta",
			"Una pregunta de interés público atada a una fuente, corpus o comportamiento de modelo.",
		],
		[
			"02",
			"Fuentes",
			"Un rastro de URLs, fechas, limitaciones y notas de calidad de evidencia.",
		],
		[
			"03",
			"Artefacto",
			"Un dataset, eval, registro, scorecard, CLI o tool de accountability.",
		],
		[
			"04",
			"Review",
			"Revisar reproducibilidad, calidad de fuente y limitaciones antes de endurecer claims.",
		],
		[
			"05",
			"Documentación",
			"Notas shareables que no requieren acceso al vault privado para entender el trabajo.",
		],
		[
			"06",
			"Siguiente gate",
			"Promover, pausar o reformular el proyecto según evidencia, no entusiasmo.",
		],
	],
} as const;

export const ledgerByLang = {
	en: [
		[
			"Public data",
			"Datasets and manifests",
			"Public sources made easier to cite, refresh, verify, and reuse.",
			"Source trails, hashes, refresh logs",
		],
		[
			"Legal and civic corpora",
			"Structured source material",
			"Fragmented law, records, and civic text turned into reusable research inputs.",
			"Corpus cards, coverage notes",
		],
		[
			"Model evaluations",
			"Evals and scorecards",
			"Evaluation artifacts that make model behavior and evidence quality easier to inspect.",
			"Rubrics, runs, agreement checks",
		],
		[
			"Accountability tools",
			"Registries and small interfaces",
			"Focused tools that help people inspect public systems without hiding the source trail.",
			"Registries, CLIs, dashboards",
		],
	],
	es: [
		[
			"Data pública",
			"Datasets y manifests",
			"Fuentes públicas más fáciles de citar, refrescar, verificar y reutilizar.",
			"Source trails, hashes, logs",
		],
		[
			"Corpora legales y cívicos",
			"Material fuente estructurado",
			"Ley, records y texto cívico fragmentado convertidos en inputs reusables de research.",
			"Corpus cards, coverage notes",
		],
		[
			"Evaluaciones de modelos",
			"Evals y scorecards",
			"Artefactos de evaluación que hacen más inspeccionable el comportamiento de modelos y la calidad de evidencia.",
			"Rúbricas, runs, agreement checks",
		],
		[
			"Tools de accountability",
			"Registros e interfaces pequeñas",
			"Tools enfocadas para inspeccionar sistemas públicos sin esconder el rastro de fuentes.",
			"Registros, CLIs, dashboards",
		],
	],
} as const;

export const stanceByLang = {
	en: [
		[
			"Artifact-first",
			"Every serious claim should point to a dataset, eval, source card set, registry, run, or public method.",
		],
		[
			"Evidence before claims",
			"Public-facing work should be source-backed, limitation-aware, and reproducible enough to inspect.",
		],
		[
			"Shareable docs",
			"Project context should stand on its own without requiring access to private planning notes.",
		],
	],
	es: [
		[
			"Artifact-first",
			"Cada claim serio debe apuntar a dataset, eval, source cards, registro, run o método público.",
		],
		[
			"Evidencia antes que claims",
			"El trabajo público debe tener fuentes, limitaciones explícitas y reproducibilidad suficiente para inspeccionarlo.",
		],
		[
			"Docs shareables",
			"El contexto de cada proyecto debe entenderse sin acceso a notas privadas de planning.",
		],
	],
} as const;
