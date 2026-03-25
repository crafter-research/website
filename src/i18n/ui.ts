export const languages = {
	en: "English",
	es: "Español",
	pt: "Português",
	zh: "中文",
} as const;

export const defaultLang = "en";

export type Lang = keyof typeof languages;
export type UiKey = keyof (typeof ui)["en"];

export const ui = {
	en: {
		"site.label": "crafter research",
		"site.title": "Crafter Research",
		"site.description":
			"A research lab where every paper has a working prototype.",
		"hero.title": "Testing Hypotheses",
		"hero.description":
			"A research lab where every paper has a working prototype. We build open-source civic technology for Peru: tools that make political behavior transparent, legislation legible, and public data queryable.",
		"hero.started": "We're just getting started.",
		"section.active": "Active",
		"section.next": "What's next",
		"project.pf.name": "peru-financia",
		"project.pf.badge": "Live",
		"project.pf.description":
			"Open-source map of Peruvian political financing. Sankey diagrams, donors, parties. ONPE data 1995-2026.",
		"project.pg.name": "political-graph",
		"project.pg.badge": "In progress",
		"project.pg.description":
			"Interactive graph of relationships between Peruvian politicians and corruption cases. 69 nodes, 37 connections, 112 supporting documents.",
		"next.congreso":
			"Congreso Legible: translates congressional bills into plain language using AI, so any citizen can understand what's being legislated.",
		"next.score":
			"Congresista Score: public profiles of legislators based on attendance, voting record, and consistency between discourse and vote.",
		"next.listening":
			"Broad Listening AI: clusters citizen opinions by actual meaning, detects coordinated spam in public consultations, and surfaces genuine diverse views.",
		"footer.cs": "Crafter Station",
		"footer.github": "GitHub",
	},
	es: {
		"site.label": "crafter research",
		"site.title": "Crafter Research",
		"site.description":
			"Un laboratorio donde cada paper tiene un prototipo funcional.",
		"hero.title": "Testeando Hipótesis",
		"hero.description":
			"Un laboratorio donde cada paper tiene un prototipo funcional. Construimos tecnología cívica open-source para Perú: herramientas que hacen transparente el comportamiento político, legible la legislación y consultable la data pública.",
		"hero.started": "Recién estamos empezando.",
		"section.active": "Activos",
		"section.next": "Próximamente",
		"project.pf.name": "peru-financia",
		"project.pf.badge": "Live",
		"project.pf.description":
			"Mapa open-source de financiamiento político peruano. Diagramas Sankey, donantes, partidos. Datos ONPE 1995-2026.",
		"project.pg.name": "political-graph",
		"project.pg.badge": "En progreso",
		"project.pg.description":
			"Grafo interactivo de relaciones entre políticos peruanos y casos de corrupción. 69 nodos, 37 conexiones, 112 documentos de respaldo.",
		"next.congreso":
			"Congreso Legible: traduce los proyectos de ley del Congreso a lenguaje simple usando IA, para que cualquier ciudadano entienda qué se está legislando.",
		"next.score":
			"Congresista Score: perfiles públicos de legisladores basados en asistencia, historial de votaciones y coherencia entre discurso y voto.",
		"next.listening":
			"Broad Listening AI: agrupa opiniones ciudadanas por significado real, detecta spam coordinado en consultas públicas y visibiliza las voces genuinas.",
		"footer.cs": "Crafter Station",
		"footer.github": "GitHub",
	},
	pt: {
		"site.label": "crafter research",
		"site.title": "Crafter Research",
		"site.description":
			"Um laboratório onde cada paper tem um protótipo funcional.",
		"hero.title": "Testando Hipóteses",
		"hero.description":
			"Um laboratório onde cada paper tem um protótipo funcional. Construímos tecnologia cívica open-source para o Peru: ferramentas que tornam transparente o comportamento político, legível a legislação e consultável os dados públicos.",
		"hero.started": "Estamos apenas começando.",
		"section.active": "Ativos",
		"section.next": "Próximamente",
		"project.pf.name": "peru-financia",
		"project.pf.badge": "Live",
		"project.pf.description":
			"Mapa open-source do financiamento político peruano. Diagramas Sankey, doadores, partidos. Dados ONPE 1995-2026.",
		"project.pg.name": "political-graph",
		"project.pg.badge": "Em progresso",
		"project.pg.description":
			"Grafo interativo de relações entre políticos peruanos e casos de corrupção. 69 nós, 37 conexões, 112 documentos de apoio.",
		"next.congreso":
			"Congreso Legible: traduz projetos de lei do Congresso para linguagem simples usando IA, para que qualquer cidadão entenda o que está sendo legislado.",
		"next.score":
			"Congresista Score: perfis públicos de legisladores baseados em presença, histórico de votação e coerência entre discurso e voto.",
		"next.listening":
			"Broad Listening AI: agrupa opiniões cidadãs por significado real, detecta spam coordenado em consultas públicas e torna visíveis as vozes genuínas.",
		"footer.cs": "Crafter Station",
		"footer.github": "GitHub",
	},
	zh: {
		"site.label": "crafter research",
		"site.title": "Crafter Research",
		"site.description": "每篇论文都有可运行原型的研究实验室。",
		"hero.title": "验证假设",
		"hero.description":
			"每篇论文都有可运行原型的研究实验室。我们为秘鲁构建开源公民技术：让政治行为透明、立法可读、公共数据可查询的工具。",
		"hero.started": "我们才刚刚开始。",
		"section.active": "进行中",
		"section.next": "即将推出",
		"project.pf.name": "peru-financia",
		"project.pf.badge": "上线",
		"project.pf.description":
			"秘鲁政治资金开源地图。桑基图、捐赠者、政党。ONPE数据 1995-2026。",
		"project.pg.name": "political-graph",
		"project.pg.badge": "开发中",
		"project.pg.description":
			"秘鲁政治家与腐败案件关系的交互式图谱。69个节点、37个连接、112份支持文件。",
		"next.congreso":
			"Congreso Legible：使用AI将国会法案翻译成通俗语言，让任何公民都能理解正在立法的内容。",
		"next.score":
			"Congresista Score：基于出席率、投票记录和言行一致性的立法者公开档案。",
		"next.listening":
			"Broad Listening AI：按实际含义聚类公民意见，检测公众咨询中的协调垃圾信息，展现真实多元的声音。",
		"footer.cs": "Crafter Station",
		"footer.github": "GitHub",
	},
} as const;
