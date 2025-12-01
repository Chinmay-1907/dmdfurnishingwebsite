#!/usr/bin/env node
/**
 * Optimize Living Room images: resize, flatten to white background, and export JPG/WebP.
 *
 * - Reads public/DMD_Website.xml to locate all Residential → Living Room targets
 * - For each target file that exists, generates optimized outputs alongside:
 *   - .jpg (quality 80)
 *   - .webp (quality 82)
 * - Keeps original file if present; does not overwrite unless same extension chosen
 * - Ensures 1200x800 canvas with centered fit and white background
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ROOT = process.cwd();
const XML_PATH = path.join(ROOT, 'public', 'DMD_Website.xml');
const PUBLIC_IMAGES = path.join(ROOT, 'public', 'Images');

function readXml(xmlPath) {
  return fs.readFileSync(xmlPath, 'utf-8');
}

function extractLivingRoomTargets(xml) {
  // Find Residential → Living Room section and extract image="..." attributes
  const residentialBlockMatch = xml.match(/<place\s+id="Residential"[\s\S]*?<\/place>/i);
  if (!residentialBlockMatch) return [];
  const residentialBlock = residentialBlockMatch[0];
  const livingRoomBlockMatch = residentialBlock.match(/<furnitureType\s+id="Living Room"[\s\S]*?<\/furnitureType>/i);
  if (!livingRoomBlockMatch) return [];
  const livingRoomBlock = livingRoomBlockMatch[0];

  // Capture all image paths in Living Room section
  const imageRegex = /image="([^"]+)"/g;
  const targets = new Set();
  let m;
  while ((m = imageRegex.exec(livingRoomBlock)) !== null) {
    const rel = m[1].trim();
    if (rel) targets.add(rel);
  }

  return Array.from(targets);
}

async function optimizeImage(absPath) {
  const exists = fs.existsSync(absPath);
  if (!exists) {
    return { path: absPath, status: 'missing' };
  }
  const dir = path.dirname(absPath);
  const base = path.basename(absPath, path.extname(absPath));

  const input = sharp(absPath).resize(1200, 800, { fit: 'cover', position: 'centre' }).flatten({ background: { r: 255, g: 255, b: 255 } });

  const jpgOut = path.join(dir, `${base}.jpg`);
  const webpOut = path.join(dir, `${base}.webp`);

  await input.jpeg({ quality: 80, chromaSubsampling: '4:2:0' }).toFile(jpgOut);
  await input.webp({ quality: 82 }).toFile(webpOut);

  return { path: absPath, status: 'optimized', outputs: [jpgOut, webpOut] };
}

async function main() {
  console.log('Optimize Living Room images → reading XML:', XML_PATH);
  const xml = readXml(XML_PATH);
  const relTargets = extractLivingRoomTargets(xml);
  if (!relTargets.length) {
    console.log('No Living Room image targets found in XML.');
    process.exit(0);
  }
  const absTargets = relTargets.map((rel) => path.join(ROOT, 'public', rel.replace(/^\/?/, '')));
  console.log(`Found ${absTargets.length} Living Room targets.`);

  const results = [];
  for (const abs of absTargets) {
    try {
      const r = await optimizeImage(abs);
      results.push(r);
      if (r.status === 'missing') {
        console.warn('Missing file, skip:', path.relative(ROOT, abs));
      } else {
        console.log('Optimized:', path.relative(ROOT, abs), '→', r.outputs.map((o) => path.relative(ROOT, o)).join(', '));
      }
    } catch (err) {
      console.error('Error optimizing', abs, err.message);
      results.push({ path: abs, status: 'error', error: err.message });
    }
  }

  const counts = results.reduce((acc, r) => {
    acc[r.status] = (acc[r.status] || 0) + 1;
    return acc;
  }, {});
  console.log('Summary:', counts);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});