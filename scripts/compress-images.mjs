import sharp from 'sharp';
import { readdir, stat, writeFile, rename } from 'fs/promises';
import { join, extname } from 'path';

const ROOT = 'public/Images';
const MAX_WIDTH = 2000;
const JPEG_QUALITY = 82;
const PNG_QUALITY = 85;
const MIN_BYTES_TO_COMPRESS = 200 * 1024; // skip files under 200KB

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else out.push(full);
  }
  return out;
}

function fmt(bytes) {
  if (bytes > 1024 * 1024) return (bytes / 1024 / 1024).toFixed(1) + 'M';
  return (bytes / 1024).toFixed(0) + 'K';
}

const files = await walk(ROOT);
const targets = [];
for (const f of files) {
  const ext = extname(f).toLowerCase();
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) continue;
  const s = await stat(f);
  if (s.size < MIN_BYTES_TO_COMPRESS) continue;
  targets.push({ path: f, ext, size: s.size });
}

console.log(`Found ${targets.length} images >200KB to process`);
let savedTotal = 0;
let processed = 0;
let skipped = 0;

for (const { path, ext, size } of targets) {
  try {
    const img = sharp(path);
    const meta = await img.metadata();
    let pipeline = img;
    if (meta.width && meta.width > MAX_WIDTH) {
      pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
    }
    if (ext === '.png') {
      pipeline = pipeline.png({ quality: PNG_QUALITY, compressionLevel: 9 });
    } else {
      pipeline = pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true });
    }
    const buf = await pipeline.toBuffer();
    if (buf.length >= size * 0.95) {
      skipped++;
      continue;
    }
    await writeFile(path, buf);
    savedTotal += size - buf.length;
    processed++;
    if (processed % 25 === 0) {
      console.log(`  ${processed}/${targets.length} done, saved ${fmt(savedTotal)} so far`);
    }
  } catch (err) {
    console.error(`FAIL ${path}: ${err.message}`);
  }
}

console.log(`\nDone. Processed ${processed}, skipped ${skipped} (not worth compressing)`);
console.log(`Total saved: ${fmt(savedTotal)}`);
