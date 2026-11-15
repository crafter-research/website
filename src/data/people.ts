import type { ProjectLocale } from "./projects";

type LocalizedText = Record<ProjectLocale, string>;

export type Stream = "frontier" | "public-goods";

export interface Person {
	name: string;
	role: LocalizedText;
	stream: Stream;
	affiliation?: string;
	links: { label: string; url: string }[];
}

export const people: Person[] = [
	{
		name: "Railly Hugo",
		role: {
			en: "Founder. Leads the frontier stream and the agent fleet.",
			es: "Fundador. Lidera la corriente frontier y la flota de agentes.",
		},
		stream: "frontier",
		links: [
			{ label: "GitHub", url: "https://github.com/Railly" },
			{ label: "X", url: "https://x.com/raillyhugo" },
		],
	},
	{
		name: "Liz Riveros",
		role: {
			en: "Program lead. Runs cadence, partners, and publication.",
			es: "Lead de programa. Lleva la cadencia, los partners y la publicación.",
		},
		stream: "public-goods",
		links: [
			{ label: "GitHub", url: "https://github.com/LizethRiveros" },
			{ label: "LinkedIn", url: "https://www.linkedin.com/in/lizethriveros" },
		],
	},
	{
		name: "Cristian Correa",
		role: {
			en: "Statistics and data. Open mobility data and digital public goods.",
			es: "Estadística y datos. Datos abiertos de movilidad y bienes públicos digitales.",
		},
		stream: "public-goods",
		affiliation: "Croma Labs",
		links: [
			{ label: "GitHub", url: "https://github.com/camilocbarrera" },
			{ label: "X", url: "https://x.com/camilocbarrera" },
		],
	},
	{
		name: "Diego Jesus",
		role: {
			en: "Political scientist. Electoral data and information design.",
			es: "Politólogo. Datos electorales y diseño de información.",
		},
		stream: "public-goods",
		affiliation: "DATAdaf",
		links: [
			{ label: "X", url: "https://x.com/dieego_jesus" },
			{ label: "DATAdaf", url: "https://datadaf.com" },
		],
	},
	{
		name: "Antony Alvarez",
		role: {
			en: "Political scientist. Social science data and methods.",
			es: "Politólogo. Datos y métodos de ciencias sociales.",
		},
		stream: "public-goods",
		affiliation: "DATAdaf",
		links: [{ label: "DATAdaf", url: "https://datadaf.com" }],
	},
	{
		name: "Bruno Díaz",
		role: {
			en: "AI builder. Public tools on fuel prices in Peru.",
			es: "AI builder. Herramientas públicas sobre precios de combustible en Perú.",
		},
		stream: "public-goods",
		links: [{ label: "GitHub", url: "https://github.com/bdiazc90" }],
	},
];
