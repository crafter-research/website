// Custom Shiki themes tuned to Crafter Research's green-tinted palette.
// TextMate-format theme objects passed straight to shikiConfig.themes.

import type { ThemeRegistration } from "shiki";

export const crafterDark: ThemeRegistration = {
	name: "crafter-dark",
	type: "dark",
	colors: {
		"editor.background": "#0c1813",
		"editor.foreground": "#d6e4d8",
	},
	settings: [
		{ scope: ["comment", "punctuation.definition.comment"], settings: { foreground: "#5d7468", fontStyle: "italic" } },
		{ scope: ["keyword", "storage.type", "storage.modifier", "keyword.control"], settings: { foreground: "#7fd1a8" } },
		{ scope: ["string", "string.quoted", "punctuation.definition.string"], settings: { foreground: "#c9bd7a" } },
		{ scope: ["constant.numeric", "constant.language", "constant.character"], settings: { foreground: "#e0a06a" } },
		{ scope: ["entity.name.function", "support.function", "meta.function-call"], settings: { foreground: "#62c2c8" } },
		{ scope: ["variable", "variable.other", "meta.definition.variable"], settings: { foreground: "#d6e4d8" } },
		{ scope: ["variable.parameter"], settings: { foreground: "#b8d4be", fontStyle: "italic" } },
		{ scope: ["entity.name.type", "support.type", "support.class", "entity.name.class"], settings: { foreground: "#9bd9b3" } },
		{ scope: ["keyword.operator"], settings: { foreground: "#89a896" } },
		{ scope: ["punctuation", "meta.brace"], settings: { foreground: "#7a9587" } },
		{ scope: ["entity.name.tag"], settings: { foreground: "#7fd1a8" } },
		{ scope: ["entity.other.attribute-name"], settings: { foreground: "#e0a06a" } },
		{ scope: ["support.type.property-name", "meta.object-literal.key"], settings: { foreground: "#62c2c8" } },
		{ scope: ["constant.language.boolean", "constant.language.null"], settings: { foreground: "#e0a06a" } },
	],
};

export const crafterLight: ThemeRegistration = {
	name: "crafter-light",
	type: "light",
	colors: {
		"editor.background": "#f1f7f2",
		"editor.foreground": "#1e3329",
	},
	settings: [
		{ scope: ["comment", "punctuation.definition.comment"], settings: { foreground: "#7e9285", fontStyle: "italic" } },
		{ scope: ["keyword", "storage.type", "storage.modifier", "keyword.control"], settings: { foreground: "#1f7a52" } },
		{ scope: ["string", "string.quoted", "punctuation.definition.string"], settings: { foreground: "#8a6d1a" } },
		{ scope: ["constant.numeric", "constant.language", "constant.character"], settings: { foreground: "#b35c19" } },
		{ scope: ["entity.name.function", "support.function", "meta.function-call"], settings: { foreground: "#1d7d83" } },
		{ scope: ["variable", "variable.other", "meta.definition.variable"], settings: { foreground: "#1e3329" } },
		{ scope: ["variable.parameter"], settings: { foreground: "#3a5547", fontStyle: "italic" } },
		{ scope: ["entity.name.type", "support.type", "support.class", "entity.name.class"], settings: { foreground: "#2a8159" } },
		{ scope: ["keyword.operator"], settings: { foreground: "#5a7567" } },
		{ scope: ["punctuation", "meta.brace"], settings: { foreground: "#6a8577" } },
		{ scope: ["entity.name.tag"], settings: { foreground: "#1f7a52" } },
		{ scope: ["entity.other.attribute-name"], settings: { foreground: "#b35c19" } },
		{ scope: ["support.type.property-name", "meta.object-literal.key"], settings: { foreground: "#1d7d83" } },
		{ scope: ["constant.language.boolean", "constant.language.null"], settings: { foreground: "#b35c19" } },
	],
};
