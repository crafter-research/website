// Favicon only. OG images: scripts/generate-og.ts
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const OUT = join(fileURLToPath(new URL("..", import.meta.url)), "public");


console.log("Generating favicon.ico...");
const sizes = [16, 32, 48];
const pngs = await Promise.all(
	sizes.map((s) => sharp(readFileSync(join(OUT, "favicon.svg"))).resize(s, s).png().toBuffer())
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
