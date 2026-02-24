/*
 Photorealistic image generator for Residential items using Replicate models.

 - Reads Residential image paths from public/DMD_Website.xml.
 - Builds product-style prompts for white background, studio lighting.
 - Calls Replicate with a configurable model version.
 - Downloads, optimizes, and saves images to existing file paths.

 Requirements:
 - Set REPLICATE_API_TOKEN in .env.
 - Set REPLICATE_MODEL_VERSION to a valid model version string, e.g.:
   "stability-ai/sdxl:xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" or a Flux photoreal model.

 Usage:
   npm run generate:residential:ai
*/

const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const sharp = require('sharp');
require('dotenv').config();

const ROOT = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.join(ROOT, 'public');
const XML_PATH = path.join(PUBLIC_DIR, 'DMD_Website.xml');

const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN || '';
const REPLICATE_MODEL_VERSION = process.env.REPLICATE_MODEL_VERSION || '';
const DRY_RUN = process.env.DRY_RUN === 'true';

const WIDTH = 1200;
const HEIGHT = 800;

function ensureDir(p) {
  fs.mkdirSync(path.dirname(p), { recursive: true });
}

function parseResidentialBlock(xml) {
  const start = xml.indexOf('<place id="residential');
  if (start === -1) return '';
  const end = xml.indexOf('</place>', start);
  if (end === -1) return '';
  return xml.slice(start, end + '</place>'.length);
}

function collectTargets(block) {
  const targets = new Map();
  // Product images first priority
  const prodRegex = /<product[^>]*name="([^"]+)"[^>]*image="([^"]+)"/g;
  let m;
  while ((m = prodRegex.exec(block)) !== null) {
    const name = m[1];
    const img = m[2];
    targets.set(img, { title: name, type: 'product' });
  }
  // Subcategory images
  const subcatRegex = /<subcategory[^>]*name="([^"]+)"[^>]*image="([^"]+)"/g;
  while ((m = subcatRegex.exec(block)) !== null) {
    const name = m[1];
    const img = m[2];
    if (!targets.has(img)) targets.set(img, { title: name, type: 'subcategory' });
  }
  // FurnitureType images
  const ftRegex = /<furnitureType[^>]*name="([^"]+)"[^>]*image="([^"]+)"/g;
  while ((m = ftRegex.exec(block)) !== null) {
    const name = m[1];
    const img = m[2];
    if (!targets.has(img)) targets.set(img, { title: name, type: 'category' });
  }
  // Place image
  const placeRegex = /<place[^>]*name="([^"]+)"[^>]*image="([^"]+)"/;
  const placeMatch = placeRegex.exec(block);
  if (placeMatch) {
    const name = placeMatch[1];
    const img = placeMatch[2];
    if (!targets.has(img)) targets.set(img, { title: name, type: 'collection' });
  }
  return targets;
}

function promptFor({ title, type }) {
  const base = `Professional, photorealistic image of a high-end ${title.toLowerCase()}. The scene should be bright, well-lit, and professionally staged to highlight the furniture's quality and design. The style should be modern and luxurious, suitable for an architectural digest-style magazine. Ensure the image is clean, sharp, and focuses on the product against a tastefully decorated, generic luxury interior background. Avoid any text, logos, or distracting elements. The final output must be a high-resolution, photorealistic image that looks like a professional photograph, not a computer rendering. No people or animals in the scene. Emphasize realism and high-end materials.`;
  if (type === 'category' || type === 'subcategory' || type === 'collection') {
    return `Professional, photorealistic image representing the concept of "${title}" in a luxury residential setting. The style should be modern and luxurious, suitable for an architectural digest-style magazine. The image should be a clean, sharp, tastefully decorated, generic luxury interior scene that evokes the essence of "${title}". Avoid any text, logos, or distracting elements. No people or animals in the scene.`;
  }
  return base;
}

async function createPrediction({ prompt }) {
  if (!REPLICATE_API_TOKEN) throw new Error('Missing REPLICATE_API_TOKEN');
  if (!REPLICATE_MODEL_VERSION) throw new Error('Missing REPLICATE_MODEL_VERSION');
  const url = 'https://api.replicate.com/v1/predictions';
  const body = {
    version: REPLICATE_MODEL_VERSION,
    input: {
      prompt,
      // Common inputs for many SDXL/Flux models; may be ignored if unsupported
      image_dimensions: '1024x768',
      output_format: 'png',
      num_outputs: 1,
      guidance_scale: 7,
      // Some models accept negative_prompt; if not, it's ignored
      negative_prompt: 'text, watermark, logo, people, clutter, dirty background, low quality',
    },
  };
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Token ${REPLICATE_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(`Replicate prediction error: ${res.status} ${msg}`);
  }
  const prediction = await res.json();
  // Poll until completed
  let status = prediction.status;
  let id = prediction.id;
  const getUrl = `https://api.replicate.com/v1/predictions/${id}`;
  while (status === 'starting' || status === 'processing') {
    await new Promise((r) => setTimeout(r, 2500));
    const r2 = await fetch(getUrl, { headers: { 'Authorization': `Token ${REPLICATE_API_TOKEN}` } });
    if (!r2.ok) throw new Error(`Replicate poll error: ${r2.status}`);
    const p2 = await r2.json();
    status = p2.status;
    if (status === 'failed' || status === 'canceled') {
      throw new Error(`Replicate prediction ${status}`);
    }
    prediction = p2;
  }
  if (status !== 'succeeded') throw new Error(`Replicate status ${status}`);
  const output = prediction.output;
  // Output may be array of URLs or single URL
  const urlOut = Array.isArray(output) ? output[0] : output;
  if (!urlOut) throw new Error('No output URL');
  return urlOut;
}

async function downloadToBuffer(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download failed: ${res.status}`);
  const ab = await res.arrayBuffer();
  return Buffer.from(ab);
}

async function saveOptimized(buffer, outAbs) {
  ensureDir(outAbs);
  const ext = path.extname(outAbs).toLowerCase();
  const img = sharp(buffer).resize(WIDTH, HEIGHT, { fit: 'cover', position: 'center' }).flatten({ background: '#ffffff' });
  if (ext === '.jpg' || ext === '.jpeg') {
    await img.jpeg({ quality: 85, chromaSubsampling: '4:4:4' }).toFile(outAbs);
  } else if (ext === '.webp') {
    await img.webp({ quality: 82 }).toFile(outAbs);
  } else {
    await img.png({ compressionLevel: 9 }).toFile(outAbs);
  }
}

async function main() {
  const xml = fs.readFileSync(XML_PATH, 'utf-8');
  const block = parseResidentialBlock(xml);
  if (!block) {
    console.error('Residential block not found in DMD_Website.xml');
    process.exit(1);
  }
  const targets = collectTargets(block);
  console.log(`Found ${targets.size} Residential image targets.`);

  if (DRY_RUN) {
    for (const [imgPath, meta] of targets.entries()) {
      console.log(`[DRY_RUN] Would generate: ${imgPath} ← ${meta.title} (${meta.type})`);
    }
    return;
  }

  let success = 0;
  for (const [imgPath, meta] of targets.entries()) {
    const prompt = promptFor(meta);
    const outAbs = path.join(PUBLIC_DIR, imgPath.replace(/^\//, ''));
    try {
      const url = await createPrediction({ prompt });
      const buf = await downloadToBuffer(url);
      await saveOptimized(buf, outAbs);
      success++;
      console.log(`Generated: ${imgPath}`);
    } catch (e) {
      console.error(`Failed: ${imgPath} — ${e.message}`);
    }
  }
  console.log(`Completed ${success}/${targets.size} images.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});