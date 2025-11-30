/*
 Generates modern, white-background product/category images for the Residential place
 using SVG rendered via sharp. It reads image paths from public/DMD_Website.xml for
 the <place id="residential"> block and creates files at the referenced paths.

 Usage: node scripts/generate-residential-images.js
*/

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ROOT = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.join(ROOT, 'public');
const XML_PATH = path.join(PUBLIC_DIR, 'DMD_Website.xml');

// Canvas sizes
const WIDTH = 1200;
const HEIGHT = 800;

// Map simple icon styles by keyword
const KEYWORD_STYLES = [
  { key: 'sofa', title: 'Sofa', icon: 'sofa' },
  { key: 'recliner', title: 'Recliner', icon: 'recliner' },
  { key: 'armchair', title: 'Armchair', icon: 'armchair' },
  { key: 'coffee table', title: 'Coffee Table', icon: 'table' },
  { key: 'glass coffee table', title: 'Glass Coffee Table', icon: 'table' },
  { key: 'media console', title: 'TV Unit', icon: 'console' },
  { key: 'bed', title: 'Bed', icon: 'bed' },
  { key: 'nightstand', title: 'Nightstand', icon: 'nightstand' },
  { key: 'dresser', title: 'Dresser', icon: 'dresser' },
  { key: 'wardrobe', title: 'Wardrobe', icon: 'wardrobe' },
  { key: 'headboard', title: 'Headboard', icon: 'headboard' },
  { key: 'dining table', title: 'Dining Table', icon: 'table' },
  { key: 'dining chair', title: 'Dining Chair', icon: 'chair' },
  { key: 'sideboard', title: 'Sideboard', icon: 'sideboard' },
  { key: 'bar stool', title: 'Bar Stool', icon: 'stool' },
  { key: 'desk', title: 'Desk', icon: 'desk' },
  { key: 'office chair', title: 'Office Chair', icon: 'chair' },
  { key: 'bookcase', title: 'Bookcase', icon: 'bookcase' },
  { key: 'bunk bed', title: 'Bunk Bed', icon: 'bed' },
  { key: 'study desk', title: 'Study Desk', icon: 'desk' },
  { key: 'toy storage', title: 'Toy Storage', icon: 'storage' },
  { key: 'outdoor sofa', title: 'Outdoor Sofa', icon: 'sofa' },
  { key: 'outdoor lounge chair', title: 'Outdoor Lounge Chair', icon: 'chair' },
  { key: 'outdoor dining set', title: 'Outdoor Dining Set', icon: 'table' },
  { key: 'outdoor side table', title: 'Outdoor Side Table', icon: 'table' },
];

function pickIconFromName(name) {
  const lower = name.toLowerCase();
  for (const entry of KEYWORD_STYLES) {
    if (lower.includes(entry.key)) return entry.icon;
  }
  return 'generic';
}

function escapeXML(str) {
  return str.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
}

function buildSVG({ title, subtitle, icon }) {
  const safeTitle = escapeXML(title || '');
  const safeSubtitle = escapeXML(subtitle || '');

  // Simple icons built from shapes, modern minimal style
  let iconShapes = '';
  switch (icon) {
    case 'sofa':
      iconShapes = `
        <rect x="250" y="360" width="700" height="170" rx="24" fill="#4b5563"/>
        <rect x="270" y="320" width="320" height="70" rx="18" fill="#6b7280"/>
        <rect x="610" y="320" width="320" height="70" rx="18" fill="#6b7280"/>
        <rect x="260" y="530" width="60" height="110" rx="12" fill="#9ca3af"/>
        <rect x="880" y="530" width="60" height="110" rx="12" fill="#9ca3af"/>
      `;
      break;
    case 'recliner':
      iconShapes = `
        <rect x="340" y="360" width="520" height="160" rx="24" fill="#4b5563"/>
        <rect x="340" y="290" width="280" height="90" rx="18" fill="#6b7280"/>
        <rect x="800" y="420" width="160" height="30" rx="10" fill="#9ca3af"/>
      `;
      break;
    case 'armchair':
    case 'chair':
      iconShapes = `
        <rect x="420" y="380" width="360" height="160" rx="22" fill="#4b5563"/>
        <rect x="420" y="320" width="220" height="70" rx="18" fill="#6b7280"/>
        <rect x="420" y="540" width="50" height="110" rx="10" fill="#9ca3af"/>
        <rect x="730" y="540" width="50" height="110" rx="10" fill="#9ca3af"/>
      `;
      break;
    case 'table':
      iconShapes = `
        <rect x="280" y="420" width="640" height="80" rx="16" fill="#4b5563"/>
        <rect x="320" y="500" width="60" height="160" rx="12" fill="#6b7280"/>
        <rect x="820" y="500" width="60" height="160" rx="12" fill="#6b7280"/>
      `;
      break;
    case 'console':
    case 'sideboard':
      iconShapes = `
        <rect x="300" y="380" width="600" height="160" rx="20" fill="#4b5563"/>
        <rect x="320" y="410" width="120" height="90" rx="10" fill="#9ca3af"/>
        <rect x="460" y="410" width="120" height="90" rx="10" fill="#9ca3af"/>
        <rect x="600" y="410" width="120" height="90" rx="10" fill="#9ca3af"/>
        <rect x="740" y="410" width="120" height="90" rx="10" fill="#9ca3af"/>
      `;
      break;
    case 'bed':
      iconShapes = `
        <rect x="280" y="420" width="640" height="160" rx="22" fill="#4b5563"/>
        <rect x="280" y="360" width="300" height="70" rx="18" fill="#6b7280"/>
        <rect x="620" y="360" width="300" height="70" rx="18" fill="#6b7280"/>
      `;
      break;
    case 'nightstand':
    case 'dresser':
    case 'wardrobe':
    case 'bookcase':
    case 'storage':
      iconShapes = `
        <rect x="360" y="360" width="480" height="220" rx="18" fill="#4b5563"/>
        <rect x="380" y="380" width="200" height="70" rx="10" fill="#9ca3af"/>
        <rect x="640" y="380" width="200" height="70" rx="10" fill="#9ca3af"/>
      `;
      break;
    case 'desk':
      iconShapes = `
        <rect x="280" y="420" width="640" height="80" rx="12" fill="#4b5563"/>
        <rect x="320" y="500" width="80" height="160" rx="12" fill="#6b7280"/>
        <rect x="820" y="500" width="80" height="160" rx="12" fill="#6b7280"/>
      `;
      break;
    case 'stool':
      iconShapes = `
        <rect x="480" y="420" width="240" height="60" rx="12" fill="#4b5563"/>
        <rect x="540" y="480" width="60" height="180" rx="12" fill="#6b7280"/>
      `;
      break;
    case 'headboard':
      iconShapes = `
        <rect x="300" y="360" width="600" height="160" rx="30" fill="#4b5563"/>
      `;
      break;
    default:
      iconShapes = `
        <rect x="360" y="380" width="480" height="180" rx="20" fill="#4b5563"/>
      `;
  }

  // SVG with white background, subtle shadow, neutral icon, and text
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
  <svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
    <rect x="0" y="0" width="${WIDTH}" height="${HEIGHT}" fill="#ffffff"/>
    <rect x="36" y="36" width="${WIDTH - 72}" height="${HEIGHT - 72}" rx="28" fill="#ffffff" stroke="#e5e7eb" stroke-width="2"/>
    <g opacity="0.12">
      <ellipse cx="600" cy="620" rx="420" ry="40" fill="#000000"/>
    </g>
    <g>
      ${iconShapes}
    </g>
    <text x="50%" y="140" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="42" fill="#111827">${safeTitle}</text>
    ${safeSubtitle ? `<text x="50%" y="190" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="26" fill="#6b7280">${safeSubtitle}</text>` : ''}
  </svg>`;
  return svg;
}

function ensureDir(p) {
  fs.mkdirSync(path.dirname(p), { recursive: true });
}

function extFromPath(p) {
  return path.extname(p).toLowerCase();
}

async function renderImage(filePath, title, subtitle) {
  const icon = pickIconFromName(`${title} ${subtitle || ''}`);
  const svg = buildSVG({ title, subtitle, icon });
  const outAbs = path.join(PUBLIC_DIR, filePath.replace(/^\//, ''));
  ensureDir(outAbs);
  const ext = extFromPath(outAbs);
  const base = sharp(Buffer.from(svg)).resize(WIDTH, HEIGHT);
  if (ext === '.jpg' || ext === '.jpeg') {
    await base.jpeg({ quality: 86, chromaSubsampling: '4:4:4' }).toFile(outAbs);
  } else if (ext === '.webp') {
    await base.webp({ quality: 82 }).toFile(outAbs);
  } else {
    await base.png({ compressionLevel: 9 }).toFile(outAbs);
  }
}

function parseResidentialBlock(xml) {
  const start = xml.indexOf('<place id="residential');
  if (start === -1) return '';
  const end = xml.indexOf('</place>', start);
  if (end === -1) return '';
  return xml.slice(start, end + '</place>'.length);
}

function collectTargets(block) {
  const targets = new Map(); // key: path -> meta { title, subtitle }

  // product image attributes
  const prodRegex = /<product[^>]*name="([^"]+)"[^>]*image="([^"]+)"/g;
  let m;
  while ((m = prodRegex.exec(block)) !== null) {
    const name = m[1];
    const img = m[2];
    if (!targets.has(img)) targets.set(img, { title: name, subtitle: '' });
  }

  // subcategory image attributes
  const subcatRegex = /<subcategory[^>]*name="([^"]+)"[^>]*image="([^"]+)"/g;
  while ((m = subcatRegex.exec(block)) !== null) {
    const name = m[1];
    const img = m[2];
    if (!targets.has(img)) targets.set(img, { title: name, subtitle: 'Subcategory' });
  }

  // furnitureType images
  const ftRegex = /<furnitureType[^>]*name="([^"]+)"[^>]*image="([^"]+)"/g;
  while ((m = ftRegex.exec(block)) !== null) {
    const name = m[1];
    const img = m[2];
    if (!targets.has(img)) targets.set(img, { title: name, subtitle: 'Category' });
  }

  // place image
  const placeRegex = /<place[^>]*name="([^"]+)"[^>]*image="([^"]+)"/;
  const placeMatch = placeRegex.exec(block);
  if (placeMatch) {
    const name = placeMatch[1];
    const img = placeMatch[2];
    if (!targets.has(img)) targets.set(img, { title: name, subtitle: 'Collection' });
  }

  // explicit <image src="..." alt="..." /> entries
  const imgTagRegex = /<image[^>]*src="([^"]+)"[^>]*alt="([^"]*)"/g;
  while ((m = imgTagRegex.exec(block)) !== null) {
    const img = m[1];
    const alt = m[2] || '';
    if (!targets.has(img)) targets.set(img, { title: alt || 'Product Image', subtitle: '' });
  }

  return targets;
}

async function main() {
  const xml = fs.readFileSync(XML_PATH, 'utf-8');
  const block = parseResidentialBlock(xml);
  if (!block) {
    console.error('Residential block not found in DMD_Website.xml');
    process.exit(1);
  }
  const targets = collectTargets(block);
  console.log(`Found ${targets.size} image targets under Residential.`);

  let count = 0;
  for (const [imgPath, meta] of targets.entries()) {
    try {
      await renderImage(imgPath, meta.title, meta.subtitle);
      count++;
      console.log(`Rendered: ${imgPath}`);
    } catch (err) {
      console.error(`Failed to render ${imgPath}:`, err.message);
    }
  }
  console.log(`Completed rendering ${count} images.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});