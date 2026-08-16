// Generates PWA/app icons + favicon from the sail logo. Run: npm run gen:icons
import sharp from "sharp";
import { writeFile } from "node:fs/promises";

// Sail artwork, parameterised by scale/offset so we can build a maskable safe-zone version.
const art = (s = 1, ox = 0, oy = 0) => `
  <g transform="translate(${32 + ox} ${32 + oy}) scale(${s}) translate(-32 -32)">
    <path d="M33 12 L33 42 L15 42 Z" fill="#DA3A2C"/>
    <path d="M36 20 L36 42 L50 42 Z" fill="#F3F1EA"/>
    <rect x="32" y="12" width="2" height="31" rx="1" fill="#F3F1EA"/>
    <path d="M13 45 H51 L46 52 Q44 54 41 54 H23 Q20 54 18 52 Z" fill="#F3F1EA"/>
    <rect x="10" y="57" width="44" height="2.4" rx="1.2" fill="#F3F1EA" opacity="0.5"/>
  </g>`;

const rounded = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#0B0B0C"/>${art()}</svg>`;

// Maskable: full-bleed navy, content in the ~72% safe zone.
const maskable = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" fill="#0B0B0C"/>${art(0.72)}</svg>`;

const out = "public";
const render = (svg, size) =>
  sharp(Buffer.from(svg)).resize(size, size).png().toBuffer();

const jobs = [
  ["icon-192.png", rounded, 192],
  ["icon-512.png", rounded, 512],
  ["icon-maskable-512.png", maskable, 512],
  ["apple-touch-icon.png", rounded, 180],
  ["favicon-32.png", rounded, 32],
];

for (const [name, svg, size] of jobs) {
  const buf = await render(svg, size);
  await writeFile(`${out}/${name}`, buf);
  console.log("wrote", name, size);
}
