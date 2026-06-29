import type { Element, ElementContent } from "hast";
import type { Options } from "rehype-autolink-headings";

const hashSpan: Element = {
	type: "element",
	tagName: "span",
	properties: {
		ariaHidden: true,
		className: ["heading-anchor-hash"],
	},
	children: [{ type: "text", value: "#" }],
};

export const headingLinkOptions = {
	behavior: "wrap",
	content(node): ElementContent[] {
		return [hashSpan, ...node.children];
	},
	properties: {
		className: ["heading-anchor"],
	},
} satisfies Options;
