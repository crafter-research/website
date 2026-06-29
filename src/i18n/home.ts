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
		emptyNoteMeta: "Reserved slot",
		emptyNoteTitle: "Next research artifact",
		emptyNoteBody:
			"This space stays open until a note has source trail, method, and reusable output.",
		stanceLabel: "Operating stance",
		stanceTitle: "Small, practical, evidence-first.",
		footerMade: "Made by",
		footerAnd: "and",
		footerStation: "Crafter Station",
	},
	es: {
		description:
			"Crafter Research es un AI research lab de interes publico para Peru y LATAM, enfocado en artefactos reproducibles, datasets, evals, registros y tools de accountability.",
		label: "Crafter Research",
		navLog: "Registro",
		kicker: "Crafter Research / Lima, Peru",
		heroTitle: "AI research de interes publico para Peru y LATAM.",
		heroBody:
			"Convertimos data publica, corpora legales y civicos, y evaluaciones de modelos en artefactos reproducibles, datasets, registros y tools de accountability.",
		primaryCta: "Leer registro",
		secondaryCta: "GitHub",
		instrumentLabel: "Overview del team",
		instrumentTitle: "El research deberia producir artefactos inspeccionables.",
		instrumentBody:
			"Trabajamos en datasets source-backed, scorecards, registros, artefactos de evaluacion y tools pequenas atadas a preguntas de interes publico.",
		chainLabel: "Modelo operativo",
		chainTitle: "De fuente publica a artefactos reutilizables.",
		chainBody: "Pregunta, fuentes, artefacto, review, documentacion, release.",
		ledgerLabel: "Superficies de trabajo",
		ledgerTitle: "El lab se organiza alrededor de cuatro tipos de artefacto.",
		ledgerBody:
			"Los proyectos pueden moverse a distintos ritmos, pero el output debe seguir siendo inspeccionable y reusable.",
		logLabel: "Notas del lab",
		logTitle: "Research logs con artefactos.",
		logCta: "Leer todas las notas",
		emptyNoteMeta: "Slot reservado",
		emptyNoteTitle: "Siguiente artefacto de research",
		emptyNoteBody:
			"Este espacio queda abierto hasta que una nota tenga fuentes, metodo y output reutilizable.",
		stanceLabel: "Postura operativa",
		stanceTitle: "Pequeno, practico y evidence-first.",
		footerMade: "Hecho por",
		footerAnd: "y",
		footerStation: "Crafter Station",
	},
} as const;

export const heroPathByLang = {
	en: ["public source", "dataset", "eval", "registry", "tool", "docs"],
	es: ["fuente publica", "dataset", "eval", "registro", "tool", "docs"],
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
			"Data publica",
			"Fuentes civicas y gubernamentales desordenadas se vuelven datasets reusables, versionados e inspeccionables.",
		],
		[
			"corpora",
			"Corpora legales y civicos",
			"Material publico fragmentado se vuelve source trails, corpus cards e inputs de research.",
		],
		[
			"evals",
			"Evaluaciones de modelos",
			"El trabajo de eval separa correctitud, abstencion, alucinacion y calidad de evidencia.",
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
			"Una pregunta de interes publico atada a una fuente, corpus o comportamiento de modelo.",
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
			"Documentacion",
			"Notas shareables que no requieren acceso al vault privado para entender el trabajo.",
		],
		[
			"06",
			"Siguiente gate",
			"Promover, pausar o reformular el proyecto segun evidencia, no entusiasmo.",
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
			"Data publica",
			"Datasets y manifests",
			"Fuentes publicas mas faciles de citar, refrescar, verificar y reutilizar.",
			"Source trails, hashes, logs",
		],
		[
			"Corpora legales y civicos",
			"Material fuente estructurado",
			"Ley, records y texto civico fragmentado convertidos en inputs reusables de research.",
			"Corpus cards, coverage notes",
		],
		[
			"Evaluaciones de modelos",
			"Evals y scorecards",
			"Artefactos de evaluacion que hacen mas inspeccionable el comportamiento de modelos y la calidad de evidencia.",
			"Rubricas, runs, agreement checks",
		],
		[
			"Tools de accountability",
			"Registros e interfaces pequenas",
			"Tools enfocadas para inspeccionar sistemas publicos sin esconder el rastro de fuentes.",
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
			"Cada claim serio debe apuntar a dataset, eval, source cards, registro, run o metodo publico.",
		],
		[
			"Evidencia antes que claims",
			"El trabajo publico debe tener fuentes, limitaciones explicitas y reproducibilidad suficiente para inspeccionarlo.",
		],
		[
			"Docs shareables",
			"El contexto de cada proyecto debe entenderse sin acceso a notas privadas de planning.",
		],
	],
} as const;
