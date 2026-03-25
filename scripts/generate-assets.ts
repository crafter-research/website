import sharp from "sharp";
import { writeFileSync } from "fs";
import { join } from "path";

const OUT = join(import.meta.dir, "..", "public");

const BG = "#09090b";
const SURFACE = "#18181b";
const BORDER = "#27272a";
const MUTED = "#71717a";
const TEXT = "#fafafa";
const ACCENT = "#a1a1aa";

function ogSvg(width: number, height: number): Buffer {
	const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${width}" height="${height}" fill="${BG}"/>

    <!-- Subtle dot grid -->
    ${Array.from({ length: 20 }, (_, i) =>
			Array.from(
				{ length: 10 },
				(_, j) =>
					`<circle cx="${60 + i * 60}" cy="${60 + j * 60}" r="1" fill="${BORDER}"/>`
			).join("")
		).join("")}

    <!-- Abstract research nodes -->
    <circle cx="300" cy="250" r="40" fill="none" stroke="${ACCENT}" stroke-width="1" opacity="0.2"/>
    <circle cx="500" cy="200" r="25" fill="none" stroke="${ACCENT}" stroke-width="1" opacity="0.15"/>
    <circle cx="700" cy="280" r="35" fill="none" stroke="${ACCENT}" stroke-width="1" opacity="0.2"/>
    <circle cx="900" cy="220" r="20" fill="none" stroke="${ACCENT}" stroke-width="1" opacity="0.15"/>

    <!-- Connection lines -->
    <line x1="340" y1="250" x2="475" y2="200" stroke="${BORDER}" stroke-width="1"/>
    <line x1="525" y1="200" x2="665" y2="280" stroke="${BORDER}" stroke-width="1"/>
    <line x1="735" y1="280" x2="880" y2="220" stroke="${BORDER}" stroke-width="1"/>

    <!-- Small dots at intersections -->
    <circle cx="300" cy="250" r="3" fill="${ACCENT}" opacity="0.4"/>
    <circle cx="500" cy="200" r="3" fill="${ACCENT}" opacity="0.3"/>
    <circle cx="700" cy="280" r="3" fill="${ACCENT}" opacity="0.4"/>
    <circle cx="900" cy="220" r="3" fill="${ACCENT}" opacity="0.3"/>

    <!-- Title -->
    <text x="${width / 2}" y="${height - 150}" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="400" letter-spacing="6" fill="${MUTED}">
      CRAFTER RESEARCH
    </text>
    <text x="${width / 2}" y="${height - 100}" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="44" font-weight="700" fill="${TEXT}">
      Testing Hypotheses
    </text>
    <text x="${width / 2}" y="${height - 60}" text-anchor="middle" font-family="ui-monospace, monospace" font-size="14" fill="${MUTED}">
      A research lab where every paper has a working prototype
    </text>
  </svg>`;
	return Buffer.from(svg);
}

function faviconSvg(size: number): Buffer {
	const svg = `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${size}" height="${size}" rx="${size * 0.15}" fill="${BG}"/>
    <text x="${size / 2}" y="${size * 0.72}" text-anchor="middle" font-family="system-ui, sans-serif" font-size="${size * 0.55}" font-weight="800" fill="${ACCENT}">R</text>
  </svg>`;
	return Buffer.from(svg);
}

console.log("Generating OG image (1200x630)...");
await sharp(ogSvg(1200, 630)).png({ quality: 90 }).toFile(join(OUT, "og.png"));

console.log("Generating favicon.ico...");
const sizes = [16, 32, 48];
const pngs = await Promise.all(
	sizes.map((s) => sharp(faviconSvg(s)).resize(s, s).png().toBuffer())
);
writeFileSync(join(OUT, "favicon.ico"), buildIco(pngs, sizes));

console.log("Done.");

function buildIco(images: Buffer[], dims: number[]): Buffer {
	const header = Buffer.alloc(6);
	header.writeUInt16LE(0, 0);
	header.writeUInt16LE(1, 2);
	header.writeUInt16LE(images.length, 4);
	const dirSize = 16 * images.length;
	let offset = 6 + dirSize;
	const dirs: Buffer[] = [];
	for (let i = 0; i < images.length; i++) {
		const dir = Buffer.alloc(16);
		dir.writeUInt8(dims[i] < 256 ? dims[i] : 0, 0);
		dir.writeUInt8(dims[i] < 256 ? dims[i] : 0, 1);
		dir.writeUInt8(0, 2);
		dir.writeUInt8(0, 3);
		dir.writeUInt16LE(1, 4);
		dir.writeUInt16LE(32, 6);
		dir.writeUInt32LE(images[i].length, 8);
		dir.writeUInt32LE(offset, 12);
		dirs.push(dir);
		offset += images[i].length;
	}
	return Buffer.concat([header, ...dirs, ...images]);
}
