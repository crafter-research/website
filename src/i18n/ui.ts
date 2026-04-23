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
		"section.platform": "Platform",
		"project.pf.name": "peru-financia",
		"project.pf.badge": "Live",
		"project.pf.description":
			"Open-source map of Peruvian political financing. Sankey diagrams, donors, parties. ONPE data 1995-2026.",
		"project.pg.name": "political-graph",
		"project.pg.badge": "Live",
		"project.pg.description":
			"Interactive graph of relationships between Peruvian politicians and corruption cases. 69 nodes, 37 connections, 112 supporting documents.",
		"section.tools": "Tools",
		"project.andenar.name": "andenar",
		"project.andenar.badge": "Live",
		"project.andenar.description":
			"Platform for LATAM government compliance. Orchestrates agent-first CLI adapters per entity (SUNAT, BCRP, JNE, SUNARP, OSCE, SUNEDU, MTC). Dashboard + advisor + npm adapters.",
		"project.andenar.url": "https://andenar.crafter.ing",
		"project.sc.name": "sunat-cli",
		"project.sc.badge": "Live",
		"project.sc.description":
			"Agent-first CLI for SUNAT tax automation. Reverse-engineered 3 government portals, cracked cross-origin iframe input masks via CDP, bypassed reCAPTCHA through OAuth state exploitation.",
		"project.sc.url": "https://sunat-cli.crafter.ing",
		"project.bc.name": "bcrp-cli",
		"project.bc.badge": "Beta",
		"project.bc.description":
			"Agent-first CLI for BCRPData. Macro series, exchange rates, inflation.",
		"project.bc.url": "https://github.com/crafter-research/bcrp-cli",
		"project.jn.name": "jne-cli",
		"project.jn.badge": "Dogfood",
		"project.jn.description":
			"Agent-first CLI for JNE electoral data. Candidates, processes, authorities.",
		"project.jn.url": "https://github.com/crafter-research/jne-cli",
		"project.os.name": "osce-seace-cli",
		"project.os.badge": "Dogfood",
		"project.os.description":
			"Agent-first CLI for public procurement (OSCE/SEACE). Sanctions, providers, open data.",
		"project.os.url": "https://github.com/crafter-research/osce-seace-cli",
		"project.sn.name": "sunarp-cli",
		"project.sn.badge": "Recon",
		"project.sn.description":
			"Agent-first CLI for SUNARP registry. Vehicle, partida, powers (CAPTCHA-blocked on live queries).",
		"project.sn.url": "https://github.com/crafter-research/sunarp-cli",
		"project.sd.name": "sunedu-cli",
		"project.sd.badge": "Recon",
		"project.sd.description":
			"Agent-first CLI for SUNEDU credential verification. Titles and diplomas (Turnstile-blocked on live queries).",
		"project.sd.url": "https://github.com/crafter-research/sunedu-cli",
		"project.mt.name": "mtc-sutran-cli",
		"project.mt.badge": "Recon",
		"project.mt.description":
			"Agent-first CLI for MTC/SUTRAN mobility. Licenses, infractions, fleet compliance.",
		"project.mt.url": "https://github.com/crafter-research/mtc-sutran-cli",
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
		"section.platform": "Plataforma",
		"project.pf.name": "peru-financia",
		"project.pf.badge": "Live",
		"project.pf.description":
			"Mapa open-source de financiamiento político peruano. Diagramas Sankey, donantes, partidos. Datos ONPE 1995-2026.",
		"project.pg.name": "political-graph",
		"project.pg.badge": "Live",
		"project.pg.description":
			"Grafo interactivo de relaciones entre políticos peruanos y casos de corrupción. 69 nodos, 37 conexiones, 112 documentos de respaldo.",
		"section.tools": "Herramientas",
		"project.andenar.name": "andenar",
		"project.andenar.badge": "Live",
		"project.andenar.description":
			"Plataforma de cumplimiento gubernamental para LATAM. Orquesta adaptadores CLI agent-first por entidad (SUNAT, BCRP, JNE, SUNARP, OSCE, SUNEDU, MTC). Dashboard + advisor + adaptadores npm.",
		"project.andenar.url": "https://andenar.crafter.ing",
		"project.sc.name": "sunat-cli",
		"project.sc.badge": "Live",
		"project.sc.description":
			"CLI agent-first para automatizar SUNAT. Ingeniería inversa de 3 portales gubernamentales, cracking de input masks en iframes cross-origin via CDP, bypass de reCAPTCHA mediante explotación del parámetro OAuth state.",
		"project.sc.url": "https://sunat-cli.crafter.ing",
		"project.bc.name": "bcrp-cli",
		"project.bc.badge": "Beta",
		"project.bc.description":
			"CLI agent-first para BCRPData. Series macro, tipos de cambio, inflación.",
		"project.bc.url": "https://github.com/crafter-research/bcrp-cli",
		"project.jn.name": "jne-cli",
		"project.jn.badge": "Dogfood",
		"project.jn.description":
			"CLI agent-first para datos electorales del JNE. Candidatos, procesos, autoridades.",
		"project.jn.url": "https://github.com/crafter-research/jne-cli",
		"project.os.name": "osce-seace-cli",
		"project.os.badge": "Dogfood",
		"project.os.description":
			"CLI agent-first para contratación pública (OSCE/SEACE). Sanciones, proveedores, datos abiertos.",
		"project.os.url": "https://github.com/crafter-research/osce-seace-cli",
		"project.sn.name": "sunarp-cli",
		"project.sn.badge": "Recon",
		"project.sn.description":
			"CLI agent-first para registros SUNARP. Vehículos, partidas, poderes (consultas live bloqueadas por CAPTCHA).",
		"project.sn.url": "https://github.com/crafter-research/sunarp-cli",
		"project.sd.name": "sunedu-cli",
		"project.sd.badge": "Recon",
		"project.sd.description":
			"CLI agent-first para verificar credenciales SUNEDU. Títulos y diplomas (consultas live bloqueadas por Turnstile).",
		"project.sd.url": "https://github.com/crafter-research/sunedu-cli",
		"project.mt.name": "mtc-sutran-cli",
		"project.mt.badge": "Recon",
		"project.mt.description":
			"CLI agent-first para movilidad MTC/SUTRAN. Licencias, infracciones, cumplimiento de flotas.",
		"project.mt.url": "https://github.com/crafter-research/mtc-sutran-cli",
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
		"section.platform": "Plataforma",
		"project.pf.name": "peru-financia",
		"project.pf.badge": "Live",
		"project.pf.description":
			"Mapa open-source do financiamento político peruano. Diagramas Sankey, doadores, partidos. Dados ONPE 1995-2026.",
		"project.pg.name": "political-graph",
		"project.pg.badge": "Live",
		"project.pg.description":
			"Grafo interativo de relações entre políticos peruanos e casos de corrupção. 69 nós, 37 conexões, 112 documentos de apoio.",
		"section.tools": "Ferramentas",
		"project.andenar.name": "andenar",
		"project.andenar.badge": "Live",
		"project.andenar.description":
			"Plataforma de compliance governamental para a LATAM. Orquestra adaptadores CLI agent-first por entidade (SUNAT, BCRP, JNE, SUNARP, OSCE, SUNEDU, MTC). Dashboard + advisor + adaptadores npm.",
		"project.andenar.url": "https://andenar.crafter.ing",
		"project.sc.name": "sunat-cli",
		"project.sc.badge": "Live",
		"project.sc.description":
			"CLI agent-first para automação fiscal SUNAT. Engenharia reversa de 3 portais governamentais, cracking de input masks em iframes cross-origin via CDP, bypass de reCAPTCHA por exploração de parâmetro OAuth state.",
		"project.sc.url": "https://sunat-cli.crafter.ing",
		"project.bc.name": "bcrp-cli",
		"project.bc.badge": "Beta",
		"project.bc.description":
			"CLI agent-first para BCRPData. Séries macro, taxas de câmbio, inflação.",
		"project.bc.url": "https://github.com/crafter-research/bcrp-cli",
		"project.jn.name": "jne-cli",
		"project.jn.badge": "Dogfood",
		"project.jn.description":
			"CLI agent-first para dados eleitorais do JNE. Candidatos, processos, autoridades.",
		"project.jn.url": "https://github.com/crafter-research/jne-cli",
		"project.os.name": "osce-seace-cli",
		"project.os.badge": "Dogfood",
		"project.os.description":
			"CLI agent-first para compras públicas (OSCE/SEACE). Sanções, fornecedores, dados abertos.",
		"project.os.url": "https://github.com/crafter-research/osce-seace-cli",
		"project.sn.name": "sunarp-cli",
		"project.sn.badge": "Recon",
		"project.sn.description":
			"CLI agent-first para registros SUNARP. Veículos, partidas, poderes (consultas live bloqueadas por CAPTCHA).",
		"project.sn.url": "https://github.com/crafter-research/sunarp-cli",
		"project.sd.name": "sunedu-cli",
		"project.sd.badge": "Recon",
		"project.sd.description":
			"CLI agent-first para verificação de credenciais SUNEDU. Títulos e diplomas (consultas live bloqueadas por Turnstile).",
		"project.sd.url": "https://github.com/crafter-research/sunedu-cli",
		"project.mt.name": "mtc-sutran-cli",
		"project.mt.badge": "Recon",
		"project.mt.description":
			"CLI agent-first para mobilidade MTC/SUTRAN. Licenças, infrações, compliance de frotas.",
		"project.mt.url": "https://github.com/crafter-research/mtc-sutran-cli",
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
		"section.platform": "平台",
		"project.pf.name": "peru-financia",
		"project.pf.badge": "上线",
		"project.pf.description":
			"秘鲁政治资金开源地图。桑基图、捐赠者、政党。ONPE数据 1995-2026。",
		"project.pg.name": "political-graph",
		"project.pg.badge": "Live",
		"project.pg.description":
			"秘鲁政治家与腐败案件关系的交互式图谱。69个节点、37个连接、112份支持文件。",
		"section.tools": "工具",
		"project.andenar.name": "andenar",
		"project.andenar.badge": "Live",
		"project.andenar.description":
			"面向LATAM政府合规的平台。按实体编排面向AI代理的CLI适配器（SUNAT、BCRP、JNE、SUNARP、OSCE、SUNEDU、MTC）。仪表盘 + advisor + npm适配器。",
		"project.andenar.url": "https://andenar.crafter.ing",
		"project.sc.name": "sunat-cli",
		"project.sc.badge": "上线",
		"project.sc.description":
			"面向AI代理的SUNAT税务自动化CLI。逆向工程3个政府门户，通过CDP破解跨域iframe输入掩码，利用OAuth state参数绕过reCAPTCHA。",
		"project.sc.url": "https://sunat-cli.crafter.ing",
		"project.bc.name": "bcrp-cli",
		"project.bc.badge": "Beta",
		"project.bc.description":
			"面向AI代理的BCRPData CLI。宏观序列、汇率、通胀。",
		"project.bc.url": "https://github.com/crafter-research/bcrp-cli",
		"project.jn.name": "jne-cli",
		"project.jn.badge": "Dogfood",
		"project.jn.description":
			"面向AI代理的JNE选举数据CLI。候选人、流程、主管机关。",
		"project.jn.url": "https://github.com/crafter-research/jne-cli",
		"project.os.name": "osce-seace-cli",
		"project.os.badge": "Dogfood",
		"project.os.description":
			"面向AI代理的公共采购CLI（OSCE/SEACE）。制裁、供应商、开放数据。",
		"project.os.url": "https://github.com/crafter-research/osce-seace-cli",
		"project.sn.name": "sunarp-cli",
		"project.sn.badge": "Recon",
		"project.sn.description":
			"面向AI代理的SUNARP登记CLI。车辆、登记档案、授权书（实时查询受CAPTCHA阻挡）。",
		"project.sn.url": "https://github.com/crafter-research/sunarp-cli",
		"project.sd.name": "sunedu-cli",
		"project.sd.badge": "Recon",
		"project.sd.description":
			"面向AI代理的SUNEDU证书验证CLI。学位和文凭（实时查询受Turnstile阻挡）。",
		"project.sd.url": "https://github.com/crafter-research/sunedu-cli",
		"project.mt.name": "mtc-sutran-cli",
		"project.mt.badge": "Recon",
		"project.mt.description":
			"面向AI代理的MTC/SUTRAN出行CLI。驾照、违规、车队合规。",
		"project.mt.url": "https://github.com/crafter-research/mtc-sutran-cli",
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
