// Renders every OG image into public/og/. Run with `bun scripts/generate-og.ts`.
// Needs agent-browser on PATH (or AGENT_BROWSER=/path/to/bin) and a WebGPU-capable machine (`vgpu doctor`).
import { spawnSync } from "node:child_process";
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { prepareShader } from "@vgpu/wgsl/prepare";
import sharp from "sharp";
import { effect, init, target } from "vgpu/node";
import { fields, problems } from "../src/data/frontier";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const OUT = join(ROOT, "public/og");
const TMP = join(ROOT, ".og-tmp");
mkdirSync(join(OUT, "research"), { recursive: true });
mkdirSync(TMP, { recursive: true });

async function renderKnot(): Promise<string> {
	const size = 900;
	const gpu = await init();
	const t = target(gpu, { size: [size, size] });
	const fx = effect(gpu, prepareShader(readFileSync(join(ROOT, "src/shaders/knot.wgsl"), "utf8")), {
		set: {
			params: {
				res: [size, size],
				mouse: [0.15, -0.1],
				time: 4.2,
				ink: [0.81, 0.91, 0.82, 1],
				glow: [0.81, 0.91, 0.82, 1],
			},
		},
	});
	fx.draw(t);
	const px = await t.color.read({ mipLevel: 0, region: "all" });
	gpu.dispose();
	const png = await sharp(Buffer.from(px), { raw: { width: size, height: size, channels: 4 } })
		.png()
		.toBuffer();
	return `data:image/png;base64,${png.toString("base64")}`;
}

type Card = { file: string; kicker: string; title: string; sub: string };

const glyph = readFileSync(join(ROOT, "brand/mark-dark.svg"), "utf8").replace(
	"<svg ",
	'<svg class="glyph" ',
);
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

function html(card: Card, knot: string, post: boolean) {
	const len = card.title.length;
	const size = len > 60 ? 54 : len > 40 ? 62 : 72;
	return `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;600&family=Geist+Mono:wght@400&display=block" rel="stylesheet">
<style>
*{margin:0;box-sizing:border-box}
body{width:1200px;height:630px;overflow:hidden;background:#07100d;color:#eef4ec;font-family:Geist,sans-serif;position:relative}
body::before{content:"";position:absolute;inset:0;background:radial-gradient(60% 80% at 82% 45%,rgba(207,231,210,.08),transparent 70%)}
.knot{position:absolute;right:${post ? -150 : -90}px;top:50%;width:${post ? 560 : 660}px;transform:translateY(-50%);opacity:${post ? 0.55 : 1}}
.wrap{position:absolute;inset:64px 64px 56px;display:flex;flex-direction:column}
.kicker{font-family:"Geist Mono",monospace;font-size:18px;letter-spacing:.14em;color:#8da093;text-transform:uppercase}
h1{font-weight:600;font-size:${size}px;line-height:1.04;letter-spacing:-.035em;margin-top:28px;max-width:${post ? 820 : 640}px}
p{font-size:24px;line-height:1.45;color:#bac9bd;margin-top:24px;max-width:${post ? 760 : 600}px}
.foot{margin-top:auto;display:flex;align-items:center;gap:14px;font-family:"Geist Mono",monospace;font-size:20px;color:#cfe7d2}
.glyph{width:30px;height:30px}
</style></head><body>
<img class="knot" src="${knot}">
<div class="wrap"><div class="kicker">${esc(card.kicker)}</div><h1>${esc(card.title)}</h1><p>${esc(card.sub)}</p>
<div class="foot">${glyph}crafter.ing</div></div></body></html>`;
}

const n = problems.length;
const nf = Object.keys(fields).length;
const pages: Card[] = [
	{ file: "home-en", kicker: "Crafter Research · Lima, Peru", title: "Autonomous research you can check.", sub: "Agent fleets on open problems. Every claim ships with its oracle." },
	{ file: "home-es", kicker: "Crafter Research · Lima, Perú", title: "Investigación autónoma que puedes verificar.", sub: "Flotas de agentes sobre problemas abiertos. Cada claim sale con su oráculo." },
	{ file: "frontier-en", kicker: "Frontier map", title: "The frontier, classified.", sub: `${n} open problems in ${nf} fields, rated by oracle, tier, compute, and edge.` },
	{ file: "frontier-es", kicker: "Mapa del frontier", title: "El frontier, clasificado.", sub: `${n} problemas abiertos en ${nf} áreas, por oráculo, tier, compute y ventaja.` },
	{ file: "support-en", kicker: "Support", title: "Help us run the next experiment.", sub: "Compute, data access, and domain experts. Every result comes back public." },
	{ file: "support-es", kicker: "Apoyar", title: "Ayúdanos a correr el próximo experimento.", sub: "Cómputo, acceso a datos y expertos. Cada resultado vuelve público." },
	{ file: "research-en", kicker: "Research log", title: "Notes with artifacts.", sub: "Every note points to a dataset, eval, corpus, or run." },
	{ file: "research-es", kicker: "Registro", title: "Notas con artefactos.", sub: "Cada nota apunta a un dataset, eval, corpus o corrida." },
];

const field = (fm: string, key: string) =>
	fm.match(new RegExp(`^${key}:\\s*"?(.*?)"?\\s*$`, "m"))?.[1] ?? "";
const posts: Card[] = [];
for (const lang of readdirSync(join(ROOT, "src/content/research"))) {
	for (const file of readdirSync(join(ROOT, "src/content/research", lang))) {
		const fm = readFileSync(join(ROOT, "src/content/research", lang, file), "utf8").split("---")[1] ?? "";
		const date = new Date(`${field(fm, "date")}T00:00:00Z`).toLocaleDateString(lang === "en" ? "en-US" : lang, {
			day: "numeric",
			month: "short",
			timeZone: "UTC",
			year: "numeric",
		});
		const sub = field(fm, "description");
		posts.push({
			file: `research/${lang}-${field(fm, "urlSlug")}`,
			kicker: `${{ es: "Registro", pt: "Pesquisa", zh: "研究日志" }[lang] ?? "Research log"} · ${date} · ${field(fm, "project")}`,
			title: field(fm, "title"),
			sub: sub.length > 150 ? `${sub.slice(0, 147).trimEnd()}...` : sub,
		});
	}
}

const knot = await renderKnot();
const ab = (...args: string[]) => {
	const r = spawnSync(process.env.AGENT_BROWSER ?? "agent-browser", args, { encoding: "utf8" });
	if (r.status !== 0) throw new Error(`agent-browser ${args.join(" ")}: ${r.stderr}`);
};
ab("open", "about:blank");
ab("set", "viewport", "1200", "630");
for (const card of [...pages, ...posts]) {
	const page = join(TMP, `${card.file.replace("/", "_")}.html`);
	writeFileSync(page, html(card, knot, card.file.startsWith("research/")));
	ab("open", `file://${page}`);
	ab("wait", "900");
	ab("screenshot", join(OUT, `${card.file}.png`));
	console.log(`og/${card.file}.png`);
}
ab("close");
spawnSync("rm", ["-rf", TMP]);
