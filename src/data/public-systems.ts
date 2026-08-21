export type SystemLocale = "en" | "es";
export type EvidenceCoverage = 0 | 1 | 2;

type LocalizedText = Record<SystemLocale, string>;

export interface PublicSystemSource {
	label: LocalizedText;
	type: LocalizedText;
	url: string;
}

export interface PublicSystemRecord {
	slug: string;
	name: string;
	agency: string;
	sector: "electoral" | "identity" | "justice" | "environment" | "health";
	lastReviewed: string;
	reviewState: "first-pass";
	agencyResponseState: "not-contacted";
	purpose: LocalizedText;
	decisionContext: LocalizedText;
	dataInputs: LocalizedText;
	outputs: LocalizedText;
	humanOversight: LocalizedText;
	publicEvaluation: LocalizedText;
	publicGovernance: LocalizedText;
	boundary: LocalizedText;
	confirmed: LocalizedText[];
	missingPublicEvidence: LocalizedText[];
	nextEvidenceRequest: LocalizedText;
	coverage: Record<
		| "existence"
		| "purpose"
		| "owner"
		| "inputs"
		| "output"
		| "oversight"
		| "evaluation"
		| "privacy"
		| "audit"
		| "correction"
		| "updates"
		| "contact",
		EvidenceCoverage
	>;
	sources: PublicSystemSource[];
}

const catalog = {
	label: {
		en: "Official catalog of AI applications in the Peruvian state",
		es: "Catálogo oficial de aplicaciones de IA en el Estado peruano",
	},
	type: { en: "Government catalog", es: "Catálogo gubernamental" },
	url: "https://www.gob.pe/institucion/pcm/informes-publicaciones/6879780-catalogo-de-aplicaciones-con-inteligencia-artificial-en-el-estado-peruano",
} satisfies PublicSystemSource;

export const publicSystems = [
	{
		slug: "eleccia",
		name: "EleccIA",
		agency: "Jurado Nacional de Elecciones",
		sector: "electoral",
		lastReviewed: "2026-06-28",
		reviewState: "first-pass",
		agencyResponseState: "not-contacted",
		purpose: {
			en: "Support qualification and proposed pronouncement drafting for candidate-list registration files.",
			es: "Apoyar la calificación y proyección de pronunciamientos para expedientes de inscripción de listas de candidatos.",
		},
		decisionContext: {
			en: "Electoral legal-administrative workflow with consequences for candidates and political organizations.",
			es: "Flujo electoral jurídico-administrativo con consecuencias para candidatos y organizaciones políticas.",
		},
		dataInputs: {
			en: "Registration files, attached documents, signature validation, JNE databases, and electoral rules.",
			es: "Expedientes, documentos adjuntos, validación de firmas, bases del JNE y reglas electorales.",
		},
		outputs: {
			en: "Qualification summary and proposed resolution text.",
			es: "Resumen de calificación y propuesta de texto de resolución.",
		},
		humanOversight: {
			en: "Jurisdictional staff validate or modify the qualification; the JEE plenary reviews the proposed resolution.",
			es: "El personal jurisdiccional valida o modifica la calificación; el Pleno del JEE revisa la propuesta de resolución.",
		},
		publicEvaluation: {
			en: "The directive mentions tests and validation data. We found no public accuracy, correction, or disagreement metrics.",
			es: "La directiva menciona pruebas y datos de validación. No encontramos métricas públicas de precisión, corrección o desacuerdo.",
		},
		publicGovernance: {
			en: "The directive cites data-protection rules and documents audit traces with permanent retention.",
			es: "La directiva cita reglas de protección de datos y documenta trazas de auditoría con conservación permanente.",
		},
		boundary: {
			en: "This record does not evaluate electoral outcomes or claim that EleccIA makes final decisions. Provider and development provenance remain unresolved.",
			es: "Este registro no evalúa resultados electorales ni afirma que EleccIA tome decisiones finales. El proveedor y la procedencia del desarrollo siguen sin resolverse.",
		},
		confirmed: [
			{
				en: "A public directive defines purpose, scope, workflow, data access, and retention.",
				es: "Una directiva pública define propósito, alcance, flujo, acceso a datos y conservación.",
			},
			{
				en: "Human modification and plenary review are explicitly documented.",
				es: "La modificación humana y la revisión del Pleno están documentadas explícitamente.",
			},
		],
		missingPublicEvidence: [
			{
				en: "Performance and disagreement metrics",
				es: "Métricas de desempeño y desacuerdo",
			},
			{
				en: "Provider and development provenance",
				es: "Proveedor y procedencia del desarrollo",
			},
			{
				en: "AI-specific affected-party redress",
				es: "Vía de reclamo específica por IA",
			},
			{
				en: "Post-deployment audit plan",
				es: "Plan de auditoría posterior al despliegue",
			},
		],
		nextEvidenceRequest: {
			en: "Aggregate accuracy, correction, disagreement, and audit metrics after deployment.",
			es: "Métricas agregadas de precisión, corrección, desacuerdo y auditoría después del despliegue.",
		},
		coverage: {
			existence: 2,
			purpose: 2,
			owner: 2,
			inputs: 2,
			output: 2,
			oversight: 2,
			evaluation: 0,
			privacy: 2,
			audit: 2,
			correction: 1,
			updates: 1,
			contact: 1,
		},
		sources: [
			{
				label: { en: "EleccIA directive", es: "Directiva EleccIA" },
				type: { en: "Official directive", es: "Directiva oficial" },
				url: "https://portal.jne.gob.pe/portal_documentos/files/d19e2fc8-b554-4b70-a563-f9f9efd65101.pdf",
			},
			catalog,
		],
	},
	{
		slug: "dni-biofacial",
		name: "DNI BioFacial",
		agency: "RENIEC",
		sector: "identity",
		lastReviewed: "2026-06-28",
		reviewState: "first-pass",
		agencyResponseState: "not-contacted",
		purpose: {
			en: "Remote identity validation and photo capture for supported DNI services.",
			es: "Validación remota de identidad y captura de foto para trámites compatibles del DNI.",
		},
		decisionContext: {
			en: "Biometric verification can determine whether a citizen continues a remote identity-document procedure.",
			es: "La verificación biométrica puede determinar si una persona continúa un trámite remoto de documento de identidad.",
		},
		dataInputs: {
			en: "Facial image capture, identity data, and mobile workflow inputs.",
			es: "Captura de imagen facial, datos de identidad e inputs del flujo móvil.",
		},
		outputs: {
			en: "Identity-validation result used to continue the remote procedure.",
			es: "Resultado de validación de identidad usado para continuar el trámite remoto.",
		},
		humanOversight: {
			en: "The public sources reviewed do not describe a manual escalation or fallback protocol in enough detail.",
			es: "Las fuentes públicas revisadas no describen con suficiente detalle un protocolo de escalamiento o fallback manual.",
		},
		publicEvaluation: {
			en: "We found no public false-match, false-non-match, accessibility, or demographic performance metrics.",
			es: "No encontramos métricas públicas de falsos matches, falsos rechazos, accesibilidad o desempeño demográfico.",
		},
		publicGovernance: {
			en: "Official service pages establish the biometric context, but app-specific retention and audit evidence remain incomplete.",
			es: "Las páginas oficiales establecen el contexto biométrico, pero la evidencia específica de conservación y auditoría sigue incompleta.",
		},
		boundary: {
			en: "Internal development is confirmed by the evidence reviewed. This record does not assess biometric accuracy or infer harm from missing public metrics.",
			es: "El desarrollo interno está confirmado por la evidencia revisada. Este registro no evalúa precisión biométrica ni infiere daño por métricas públicas faltantes.",
		},
		confirmed: [
			{
				en: "Official pages document supported remote DNI workflows.",
				es: "Páginas oficiales documentan los trámites remotos compatibles.",
			},
			{
				en: "Facial capture and biometric validation are part of the service flow.",
				es: "La captura facial y validación biométrica forman parte del flujo.",
			},
		],
		missingPublicEvidence: [
			{
				en: "False-match and false-non-match rates",
				es: "Tasas de falsos matches y falsos rechazos",
			},
			{
				en: "Accessibility and demographic performance",
				es: "Accesibilidad y desempeño demográfico",
			},
			{
				en: "Manual fallback for failed validation",
				es: "Fallback manual ante validación fallida",
			},
			{
				en: "App-specific retention and audit trail",
				es: "Conservación y auditoría específicas de la app",
			},
		],
		nextEvidenceRequest: {
			en: "Aggregate biometric performance, accessibility, fallback, retention, and appeal data.",
			es: "Datos agregados de desempeño biométrico, accesibilidad, fallback, conservación y reclamos.",
		},
		coverage: {
			existence: 2,
			purpose: 2,
			owner: 2,
			inputs: 2,
			output: 2,
			oversight: 0,
			evaluation: 0,
			privacy: 2,
			audit: 0,
			correction: 0,
			updates: 1,
			contact: 1,
		},
		sources: [
			{
				label: {
					en: "DNI BioFacial service page",
					es: "Página del trámite DNI BioFacial",
				},
				type: { en: "Official service page", es: "Página oficial de servicio" },
				url: "https://www.gob.pe/67436-solicitar-duplicado-o-renovar-dni-desde-tu-telefono-a-traves-de-la-aplicacion-dni-biofacial",
			},
			{
				label: { en: "Photo-capture guide", es: "Guía para captura de foto" },
				type: { en: "Official guide", es: "Guía oficial" },
				url: "https://www.gob.pe/institucion/reniec/informes-publicaciones/7664737-guia-para-toma-de-foto-con-dni-biofacial",
			},
			catalog,
		],
	},
	{
		slug: "curia",
		name: "CURIA",
		agency: "Poder Judicial",
		sector: "justice",
		lastReviewed: "2026-06-28",
		reviewState: "first-pass",
		agencyResponseState: "not-contacted",
		purpose: {
			en: "Assist judicial work with legal-information search, analysis, systematization, and drafting support.",
			es: "Asistir el trabajo judicial con búsqueda jurídica, análisis, sistematización y apoyo de redacción.",
		},
		decisionContext: {
			en: "An internal legal assistant operating around high-stakes judicial workflows.",
			es: "Un asistente legal interno que opera alrededor de flujos judiciales de alto impacto.",
		},
		dataInputs: {
			en: "Judicial files, legal information, and jurisprudence are described at a high level.",
			es: "Expedientes, información jurídica y jurisprudencia están descritos a nivel general.",
		},
		outputs: {
			en: "Search, analysis, systematization, and draft support; exact operational boundaries remain unclear.",
			es: "Búsqueda, análisis, sistematización y apoyo de borradores; los límites operativos exactos no están claros.",
		},
		humanOversight: {
			en: "Assistant framing establishes a human user, but the review protocol and use restrictions are not public in the current evidence.",
			es: "El framing de asistente establece un usuario humano, pero el protocolo de revisión y restricciones no son públicos en la evidencia actual.",
		},
		publicEvaluation: {
			en: "We found no public benchmark, hallucination test, retrieval evaluation, or quality metrics.",
			es: "No encontramos benchmarks públicos, pruebas de alucinación, evaluación de retrieval ni métricas de calidad.",
		},
		publicGovernance: {
			en: "The reviewed public sources do not specify data retention, audit logging, incident handling, or matter-type restrictions.",
			es: "Las fuentes públicas revisadas no especifican conservación, auditoría, incidentes ni restricciones por materia.",
		},
		boundary: {
			en: "Internal development is confirmed. This record does not claim CURIA produces wrong outputs or makes judicial decisions.",
			es: "El desarrollo interno está confirmado. Este registro no afirma que CURIA produzca outputs erróneos ni que tome decisiones judiciales.",
		},
		confirmed: [
			{
				en: "Official Judiciary pages confirm launch and deployment updates.",
				es: "Páginas oficiales del Poder Judicial confirman el lanzamiento y actualizaciones de despliegue.",
			},
			{
				en: "The described use includes search, analysis, systematization, and drafting support.",
				es: "El uso descrito incluye búsqueda, análisis, sistematización y apoyo de redacción.",
			},
		],
		missingPublicEvidence: [
			{
				en: "Model and retrieval provenance",
				es: "Procedencia del modelo y retrieval",
			},
			{
				en: "Reliability and hallucination benchmarks",
				es: "Benchmarks de confiabilidad y alucinación",
			},
			{
				en: "Human review and matter-scope protocol",
				es: "Protocolo de revisión humana y alcance por materia",
			},
			{
				en: "Audit, retention, and incident controls",
				es: "Controles de auditoría, conservación e incidentes",
			},
		],
		nextEvidenceRequest: {
			en: "Deployment protocol, model and retrieval boundaries, evaluation results, review rules, and audit controls.",
			es: "Protocolo de despliegue, límites del modelo y retrieval, evaluaciones, reglas de revisión y controles de auditoría.",
		},
		coverage: {
			existence: 2,
			purpose: 2,
			owner: 2,
			inputs: 1,
			output: 2,
			oversight: 1,
			evaluation: 0,
			privacy: 0,
			audit: 0,
			correction: 0,
			updates: 0,
			contact: 1,
		},
		sources: [
			{
				label: { en: "CURIA launch", es: "Lanzamiento de CURIA" },
				type: { en: "Official news", es: "Noticia oficial" },
				url: "https://www.gob.pe/institucion/pj/noticias/1126720-poder-judicial-presenta-asistente-de-inteligencia-artificial-curia-que-optimizara-servicio-de-justicia",
			},
			{
				label: { en: "Deployment update", es: "Actualización de despliegue" },
				type: { en: "Official news", es: "Noticia oficial" },
				url: "https://www.gob.pe/institucion/pj/noticias/1371981-despliegue-de-dos-herramientas-tecnologicas-agiliza-procesos-judiciales-en-salas-de-corte-suprema",
			},
			catalog,
		],
	},
	{
		slug: "adetop-v2",
		name: "ADETOP v2",
		agency: "OSINFOR",
		sector: "environment",
		lastReviewed: "2026-06-28",
		reviewState: "first-pass",
		agencyResponseState: "not-contacted",
		purpose: {
			en: "Detect and monitor possible illegal logging using satellite and forest-oversight data.",
			es: "Detectar y monitorear posible tala ilegal usando datos satelitales y de supervisión forestal.",
		},
		decisionContext: {
			en: "Detection signals can influence field-work and environmental enforcement priorities.",
			es: "Las señales de detección pueden influir en trabajo de campo y prioridades de fiscalización ambiental.",
		},
		dataInputs: {
			en: "Satellite imagery and forest-monitoring data; exact datasets require confirmation.",
			es: "Imágenes satelitales y datos de monitoreo forestal; falta confirmar los datasets exactos.",
		},
		outputs: {
			en: "Detection or monitoring signal for possible illegal logging.",
			es: "Señal de detección o monitoreo de posible tala ilegal.",
		},
		humanOversight: {
			en: "Official material says it complements field work, but the public review protocol is incomplete.",
			es: "El material oficial indica que complementa el trabajo de campo, pero el protocolo público de revisión está incompleto.",
		},
		publicEvaluation: {
			en: "We found no public precision, recall, false-alarm, ground-truth, or regional performance metrics.",
			es: "No encontramos métricas públicas de precisión, recall, falsas alarmas, ground truth o desempeño regional.",
		},
		publicGovernance: {
			en: "Operational-use material is public; audit trails and affected-party correction pathways were not found in this evidence set.",
			es: "Hay material público de uso operativo; no encontramos trazas de auditoría ni vías de corrección para personas afectadas.",
		},
		boundary: {
			en: "This record does not verify individual detections or infer an enforcement action from an algorithmic signal.",
			es: "Este registro no verifica detecciones individuales ni infiere una acción fiscalizadora desde una señal algorítmica.",
		},
		confirmed: [
			{
				en: "Official sources describe satellite-supported illegal-logging detection.",
				es: "Fuentes oficiales describen detección de tala ilegal asistida por satélites.",
			},
			{
				en: "The tool is described as a complement to field work.",
				es: "La herramienta se describe como complemento al trabajo de campo.",
			},
		],
		missingPublicEvidence: [
			{
				en: "Validation and false-alarm metrics",
				es: "Métricas de validación y falsas alarmas",
			},
			{
				en: "Dataset and ground-truth definitions",
				es: "Definición de datasets y ground truth",
			},
			{ en: "Human review workflow", es: "Flujo de revisión humana" },
			{
				en: "Correction pathway for affected actors",
				es: "Vía de corrección para actores afectados",
			},
		],
		nextEvidenceRequest: {
			en: "Validation metrics, geospatial sources, review boundaries, correction process, and update history.",
			es: "Métricas de validación, fuentes geoespaciales, límites de revisión, corrección e historial de cambios.",
		},
		coverage: {
			existence: 2,
			purpose: 2,
			owner: 2,
			inputs: 2,
			output: 2,
			oversight: 1,
			evaluation: 0,
			privacy: 0,
			audit: 0,
			correction: 0,
			updates: 1,
			contact: 1,
		},
		sources: [
			{
				label: { en: "ADETOP v2 launch", es: "Lanzamiento de ADETOP v2" },
				type: { en: "Official news", es: "Noticia oficial" },
				url: "https://www.gob.pe/institucion/osinfor/noticias/1208816-osinfor-lanza-adetop-v2-el-algoritmo-que-detecta-tala-ilegal-desde-el-espacio",
			},
			{
				label: {
					en: "OSINFOR AI publication",
					es: "Publicación de IA de OSINFOR",
				},
				type: { en: "Official publication", es: "Publicación oficial" },
				url: "https://www.gob.pe/institucion/osinfor/informes-publicaciones/7345686-aplicacion-de-inteligencia-artificial-y-nuevas-herramientas-tecnologicas-por-el-osinfor-para-el-seguimiento-y-monitoreo-de-los-recursos-forestales-del-peru",
			},
			catalog,
		],
	},
	{
		slug: "inen-mri-ai",
		name: "INEN MRI AI",
		agency: "Instituto Nacional de Enfermedades Neoplásicas",
		sector: "health",
		lastReviewed: "2026-06-28",
		reviewState: "first-pass",
		agencyResponseState: "not-contacted",
		purpose: {
			en: "Optimize MRI examinations in cancer-detection workflows.",
			es: "Optimizar exámenes de resonancia magnética en flujos de detección de cáncer.",
		},
		decisionContext: {
			en: "AI-supported medical imaging operates around diagnostic care, but the exact clinical decision boundary is not public.",
			es: "La imagen médica asistida por IA opera alrededor del diagnóstico, pero el límite clínico exacto no es público.",
		},
		dataInputs: {
			en: "MRI imaging and clinical workflow inputs; modality details were not recovered.",
			es: "Imágenes de resonancia e inputs clínicos; no recuperamos detalles de modalidad.",
		},
		outputs: {
			en: "Imaging optimization or assistance output; exact clinical output remains unclear.",
			es: "Output de optimización o asistencia de imagen; el output clínico exacto sigue sin aclararse.",
		},
		humanOversight: {
			en: "Clinical review is expected in the surrounding workflow, but the AI-specific protocol is not public in the current evidence.",
			es: "Se espera revisión clínica en el flujo, pero el protocolo específico de IA no es público en la evidencia actual.",
		},
		publicEvaluation: {
			en: "We found no public sensitivity, specificity, reader-study, cohort, or local clinical validation metrics.",
			es: "No encontramos métricas públicas de sensibilidad, especificidad, reader study, cohorte o validación clínica local.",
		},
		publicGovernance: {
			en: "The health-data context is high stakes. AI-specific privacy, audit, and monitoring evidence remain incomplete.",
			es: "El contexto de datos de salud es de alto impacto. La evidencia de privacidad, auditoría y monitoreo específicos sigue incompleta.",
		},
		boundary: {
			en: "This record confirms a public deployment claim. It does not assess clinical safety, effectiveness, or diagnostic performance.",
			es: "Este registro confirma una afirmación pública de despliegue. No evalúa seguridad clínica, efectividad ni desempeño diagnóstico.",
		},
		confirmed: [
			{
				en: "An official INEN source announces the incorporation of AI for MRI exams.",
				es: "Una fuente oficial del INEN anuncia la incorporación de IA en resonancias.",
			},
			{
				en: "The stated purpose is optimization in a cancer-detection workflow.",
				es: "El propósito declarado es optimizar un flujo de detección de cáncer.",
			},
		],
		missingPublicEvidence: [
			{
				en: "Model and vendor identity",
				es: "Identidad del modelo y proveedor",
			},
			{
				en: "Clinical validation and local cohort",
				es: "Validación clínica y cohorte local",
			},
			{
				en: "AI-specific clinical oversight",
				es: "Supervisión clínica específica de IA",
			},
			{
				en: "Privacy, audit, and monitoring controls",
				es: "Controles de privacidad, auditoría y monitoreo",
			},
		],
		nextEvidenceRequest: {
			en: "Model identity, aggregate validation, clinical oversight, privacy controls, and post-deployment monitoring.",
			es: "Identidad del modelo, validación agregada, supervisión clínica, privacidad y monitoreo posterior al despliegue.",
		},
		coverage: {
			existence: 2,
			purpose: 2,
			owner: 2,
			inputs: 1,
			output: 2,
			oversight: 1,
			evaluation: 0,
			privacy: 0,
			audit: 0,
			correction: 0,
			updates: 0,
			contact: 1,
		},
		sources: [
			{
				label: {
					en: "INEN MRI announcement",
					es: "Anuncio de resonancia del INEN",
				},
				type: { en: "Official news", es: "Noticia oficial" },
				url: "https://www.gob.pe/institucion/inen/noticias/1137173-inen-incorpora-inteligencia-artificial-para-optimizar-examenes-de-resonancia-magnetica-en-la-deteccion-del-cancer",
			},
			catalog,
		],
	},
	{
		slug: "cadeye",
		name: "CadEye",
		agency: "Hospital Regional Lambayeque",
		sector: "health",
		lastReviewed: "2026-06-28",
		reviewState: "first-pass",
		agencyResponseState: "not-contacted",
		purpose: {
			en: "Assist gastroenterology staff during digestive endoscopy.",
			es: "Asistir al personal de gastroenterología durante endoscopías digestivas.",
		},
		decisionContext: {
			en: "AI-supported endoscopy operates inside a clinical imaging workflow.",
			es: "La endoscopía asistida por IA opera dentro de un flujo clínico de imagen.",
		},
		dataInputs: {
			en: "Endoscopy imagery or video stream; exact local data handling is not public.",
			es: "Imágenes o video de endoscopía; el manejo local exacto de datos no es público.",
		},
		outputs: {
			en: "Visual assistance during endoscopy; exact operational boundary needs confirmation.",
			es: "Asistencia visual durante la endoscopía; falta confirmar el límite operativo exacto.",
		},
		humanOversight: {
			en: "Clinicians operate the service, but the AI-specific review, training, and fallback protocol is not public.",
			es: "Profesionales clínicos operan el servicio, pero el protocolo de revisión, capacitación y fallback no es público.",
		},
		publicEvaluation: {
			en: "We found no public local sensitivity, specificity, detection, false-positive, or false-negative metrics.",
			es: "No encontramos métricas públicas locales de sensibilidad, especificidad, detección, falsos positivos o negativos.",
		},
		publicGovernance: {
			en: "The official page confirms equipment use. Local validation, patient disclosure, audit, and incident evidence remain incomplete.",
			es: "La página oficial confirma el uso del equipo. La validación local, información al paciente, auditoría e incidentes siguen incompletos.",
		},
		boundary: {
			en: "This record does not assess clinical safety, effectiveness, certification, or individual patient outcomes.",
			es: "Este registro no evalúa seguridad clínica, efectividad, certificación ni resultados de pacientes individuales.",
		},
		confirmed: [
			{
				en: "An official hospital page describes AI-assisted gastroenterology equipment.",
				es: "Una página oficial del hospital describe equipos de gastroenterología asistidos por IA.",
			},
			{
				en: "CadEye is identified in the public deployment context.",
				es: "CadEye está identificado en el contexto público de despliegue.",
			},
		],
		missingPublicEvidence: [
			{ en: "Local clinical validation", es: "Validación clínica local" },
			{
				en: "Clinical training and review protocol",
				es: "Capacitación y protocolo de revisión clínica",
			},
			{
				en: "Patient disclosure and data controls",
				es: "Información al paciente y controles de datos",
			},
			{
				en: "Maintenance, updates, and incidents",
				es: "Mantenimiento, actualizaciones e incidentes",
			},
		],
		nextEvidenceRequest: {
			en: "Aggregate local validation, staff protocol, patient disclosure, maintenance, privacy, and incident controls.",
			es: "Validación local agregada, protocolo de personal, información al paciente, mantenimiento, privacidad e incidentes.",
		},
		coverage: {
			existence: 2,
			purpose: 2,
			owner: 2,
			inputs: 1,
			output: 2,
			oversight: 1,
			evaluation: 0,
			privacy: 0,
			audit: 0,
			correction: 0,
			updates: 0,
			contact: 1,
		},
		sources: [
			{
				label: {
					en: "Hospital deployment page",
					es: "Página de despliegue del hospital",
				},
				type: { en: "Official news", es: "Noticia oficial" },
				url: "https://www.gob.pe/institucion/hrlambayeque/noticias/1206776-hospital-regional-lambayeque-refuerza-servicio-de-gastroenterologia-con-equipos-asistidos-por-inteligencia-artificial",
			},
			catalog,
		],
	},
] satisfies PublicSystemRecord[];
