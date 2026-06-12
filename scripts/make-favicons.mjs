/**
 * One-shot: extract the embedded PNG from DMD_Furnishing_Logo_Embedded.svg and
 * emit the full favicon set. Replaces the leftover create-react-app favicon.ico
 * (the React logo Google was showing in search results).
 *
 * Outputs:
 *   app/icon.png        512x512  (Next App Router file convention -> <link rel="icon">)
 *   app/apple-icon.png  180x180  (-> <link rel="apple-touch-icon">)
 *   public/logo-512.png 512x512  (manifest + Organization schema logo)
 *   public/logo-192.png 192x192  (manifest)
 *   public/favicon.ico  256x256 PNG-compressed ICO (overwrites React logo)
 */
import { readFileSync, writeFileSync } from 'node:fs';
import sharp from 'sharp';

const svg = readFileSync('public/DMD_Furnishing_Logo_Embedded.svg', 'utf8');
const m = svg.match(/data:image\/png;base64,([A-Za-z0-9+/=]+)/);
if (!m) throw new Error('No embedded PNG found in logo SVG');
const source = Buffer.from(m[1], 'base64');

const meta = await sharp(source).metadata();
console.log(`source PNG: ${meta.width}x${meta.height}`);

async function out(size, file) {
  const buf = await sharp(source)
    .resize(size, size, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .flatten({ background: '#ffffff' }) // Google favicons render poorly with transparency
    .png()
    .toBuffer();
  writeFileSync(file, buf);
  console.log(`wrote ${file} (${buf.length} bytes)`);
  return buf;
}

await out(512, 'app/icon.png');
await out(180, 'app/apple-icon.png');
await out(512, 'public/logo-512.png');
await out(192, 'public/logo-192.png');

// ICO container with a single PNG-compressed 256px image (valid per ICO spec,
// supported by every modern browser and Google's favicon crawler).
const png256 = await sharp(source)
  .resize(256, 256, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
  .flatten({ background: '#ffffff' })
  .png()
  .toBuffer();
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(1, 4); // image count
const entry = Buffer.alloc(16);
entry.writeUInt8(0, 0);  // width 0 = 256
entry.writeUInt8(0, 1);  // height 0 = 256
entry.writeUInt8(0, 2);  // palette
entry.writeUInt8(0, 3);  // reserved
entry.writeUInt16LE(1, 4);  // planes
entry.writeUInt16LE(32, 6); // bpp
entry.writeUInt32LE(png256.length, 8);
entry.writeUInt32LE(22, 12); // data offset = 6 + 16
writeFileSync('public/favicon.ico', Buffer.concat([header, entry, png256]));
console.log(`wrote public/favicon.ico (${22 + png256.length} bytes, replaces React logo)`);
