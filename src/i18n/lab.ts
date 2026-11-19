export const labCopy = {
	en: {
		description:
			"Crafter Research is an autonomous research lab from Peru. Agent fleets work on open problems in math, computing, security, and the natural and social sciences, and every claim ships with its oracle.",
		kicker: "Crafter Research · Lima, Peru",
		heroTitle: "Autonomous research you can check.",
		heroBody:
			"We point fleets of AI agents at open problems in mathematics, computing, security, and the natural and social sciences. A problem gets in only if it has an oracle the agents cannot argue with. Every claim ships with its preregistration, its trace, its artifact, and a person who signs it.",
		ctaMap: "See the frontier map",
		ctaProtocol: "Read the protocol",
		knotLabel: "A rotating trefoil knot with bands moving along its cord",
		knotCaption:
			"Fig. 0 · trefoil, the simplest knot. Rendered live with vgpu.",
		statProblems: "problems catalogued",
		statFields: "fields",
		statBeliefs: "beliefs stated",
		statResults: "results so far",
		focusLabel: "Focus",
		focusTitle: "Our bets, and what became of them.",
		focusBody:
			"Each bet is a falsifiable sentence, the oracle that judges it, and what would kill it. Killed bets stay on this page.",
		beliefLabel: "Belief",
		oracleLabel: "Oracle",
		killLabel: "Killed if",
		mapLabel: "Frontier map",
		mapTitle: "Everything we would attack, classified.",
		mapBody:
			"Each problem is rated by oracle grade, tier, compute, edge, and how crowded it is. Problems where we have no edge are listed too.",
		mapCta: "Open the full map",
		protocolLabel: "Protocol",
		protocolTitle: "The way we work.",
		protocolBody:
			"Unlimited tokens without an oracle produce unlimited noise. The protocol is what turns agent output into evidence.",
		streamsLabel: "Researchers",
		streamsTitle: "Two streams, one protocol.",
		frontierStream: "Frontier",
		frontierStreamBody:
			"Open problems with machine-checkable oracles, run by one researcher and a fleet of agents.",
		publicStream: "Public goods",
		publicStreamBody:
			"Social science and public tools on Peruvian and Latin American data, with domain experts who sign the claims.",
		workLabel: "Published work",
		workTitle: "Instruments we already run.",
		workBody:
			"The public data systems below are the lab's instruments: corpora, benchmarks, and CLIs the agents build on.",
		logLabel: "Lab notes",
		logTitle: "Research log.",
		logCta: "Read all notes",
	},
	es: {
		description:
			"Crafter Research es un lab de investigación autónoma desde Perú. Flotas de agentes trabajan en problemas abiertos de matemática, computación, seguridad y ciencias naturales y sociales, y cada claim sale con su oráculo.",
		kicker: "Crafter Research · Lima, Perú",
		heroTitle: "Investigación autónoma que puedes verificar.",
		heroBody:
			"Ponemos flotas de agentes de IA sobre problemas abiertos de matemática, computación, seguridad y ciencias naturales y sociales. Un problema entra solo si tiene un oráculo con el que los agentes no pueden discutir. Cada claim sale con su preregistro, su trace, su artefacto y una persona que lo firma.",
		ctaMap: "Ver el mapa del frontier",
		ctaProtocol: "Leer el protocolo",
		knotLabel: "Un nudo trébol que gira, con bandas que avanzan por su cuerda",
		knotCaption:
			"Fig. 0 · trébol, el nudo más simple. Renderizado en vivo con vgpu.",
		statProblems: "problemas catalogados",
		statFields: "áreas",
		statBeliefs: "creencias escritas",
		statResults: "resultados hasta hoy",
		focusLabel: "Foco",
		focusTitle: "Nuestras apuestas y qué pasó con ellas.",
		focusBody:
			"Cada apuesta es una oración falsable, el oráculo que la juzga y lo que la mataría. Las apuestas descartadas se quedan en esta página.",
		beliefLabel: "Creencia",
		oracleLabel: "Oráculo",
		killLabel: "Se descarta si",
		mapLabel: "Mapa del frontier",
		mapTitle: "Todo lo que atacaríamos, clasificado.",
		mapBody:
			"Cada problema tiene grado de oráculo, tier, compute, ventaja y qué tan concurrido está. También listamos los problemas donde no tenemos ventaja.",
		mapCta: "Abrir el mapa completo",
		protocolLabel: "Protocolo",
		protocolTitle: "Cómo trabajamos.",
		protocolBody:
			"Tokens ilimitados sin oráculo producen ruido ilimitado. El protocolo es lo que convierte el output de un agente en evidencia.",
		streamsLabel: "Researchers",
		streamsTitle: "Dos corrientes, un protocolo.",
		frontierStream: "Frontier",
		frontierStreamBody:
			"Problemas abiertos con oráculos verificables por máquina, a cargo de un researcher y una flota de agentes.",
		publicStream: "Bienes públicos",
		publicStreamBody:
			"Ciencias sociales y herramientas públicas sobre datos de Perú y Latinoamérica, con expertos de dominio que firman los claims.",
		workLabel: "Trabajo publicado",
		workTitle: "Instrumentos que ya corren.",
		workBody:
			"Estos sistemas de datos públicos son los instrumentos del lab: corpora, benchmarks y CLIs sobre los que construyen los agentes.",
		logLabel: "Notas del lab",
		logTitle: "Registro de investigación.",
		logCta: "Leer todas las notas",
	},
} as const;

export const protocolByLang = {
	en: [
		["Question card", "The question, the source, and what would refute it."],
		[
			"Preregistration",
			"The analysis plan is committed before the harness unlocks outcome data.",
		],
		["Traced run", "Every agent run is logged end to end and can be replayed."],
		[
			"Claim ledger",
			"Each claim points to its artifact and carries a stated credence.",
		],
		["Adversarial check", "A different model tries to break every claim."],
		["Human take", "A domain expert signs, rejects, or asks for another run."],
		[
			"Release",
			"Graph, paper, and working prototype ship together. Killed claims stay public.",
		],
	],
	es: [
		["Question card", "La pregunta, la fuente y lo que la refutaría."],
		[
			"Preregistro",
			"El plan de análisis se commitea antes de que el harness libere los datos de resultado.",
		],
		[
			"Run con trace",
			"Cada corrida de agente queda registrada de punta a punta y se puede reproducir.",
		],
		[
			"Ledger de claims",
			"Cada claim apunta a su artefacto y lleva una credence explícita.",
		],
		["Chequeo adversarial", "Otro modelo intenta romper cada claim."],
		[
			"Take humano",
			"Un experto de dominio firma, rechaza o pide otra corrida.",
		],
		[
			"Release",
			"Grafo, paper y prototipo salen juntos. Los claims descartados quedan públicos.",
		],
	],
} as const;
