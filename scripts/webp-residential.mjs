// Convert the residential-catalog images to WebP (q80), in place, same basenames.
// img_1.jpg -> img_1.webp, then delete the original. Cuts repo size ~70%.
// next/image serves the .webp source directly. XML refs are rewritten separately.
import sharp from 'sharp';
import { readdir, stat, writeFile, unlink, access } from 'fs/promises';
import { join, extname } from 'path';

const ROOT = 'public/Images/residential-catalog';
const QUALITY = 80;

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const f = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(f)));
    else out.push(f);
  }
  return out;
}
const mb = (b) => (b / 1024 / 1024).toFixed(1) + 'M';
const exists = (p) => access(p).then(() => true).catch(() => false);

const files = await walk(ROOT);
const imgs = files.filter((f) => ['.jpg', '.jpeg', '.png'].includes(extname(f).toLowerCase()));
console.log(`Converting ${imgs.length} images to WebP q${QUALITY} ...`);

let before = 0, after = 0, done = 0, fail = 0, collide = 0;
for (const f of imgs) {
  try {
    const s = (await stat(f)).size;
    const out = f.replace(/\.(jpe?g|png)$/i, '.webp');
    if (out !== f && (await exists(out))) { collide++; console.error('COLLIDE (skip):', out); continue; }
    const buf = await sharp(f).webp({ quality: QUALITY }).toBuffer();
    await writeFile(out, buf);
    if (out !== f) await unlink(f);
    before += s; after += buf.length; done++;
    if (done % 200 === 0) console.log(`  ${done}/${imgs.length}  ${mb(before)} -> ${mb(after)}`);
  } catch (e) {
    fail++; console.error('FAIL', f, e.message);
  }
}
console.log(`\nDone. converted=${done} failed=${fail} collisions=${collide}`);
console.log(`Size of converted set: ${mb(before)} -> ${mb(after)}`);
