/**
 * SEO related changes: Generate sitemap.xml from XML catalog for better crawling.
 * Next expand: include <lastmod>, <changefreq>, absolute production domain,
 *              and support projects.xml; move to Next.js build-time generation.
 */

const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Import inspirations data to get dynamic count
const inspirationsModule = require('../lib/inspirations.js');
const inspirations = inspirationsModule.default?.INSPIRATIONS ||
                     (typeof inspirationsModule.getAllInspirations === 'function'
                       ? { length: 6 } // Fallback to 6 if import fails
                       : inspirationsModule);

// Slugify similar to src/utils/catalogPaths.js
function toSlug(str) {
  if (!str && str !== 0) return '';
  return String(str)
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-]/g, '');
}

function getAttr(attrs, name) {
  const m = new RegExp(name + '="([^"]*)"').exec(attrs);
  return m ? m[1] : '';
}

function generate() {
  const lastmod = new Date().toISOString().split('T')[0];
  const rootDir = process.cwd();
  const publicDir = path.join(rootDir, 'public');
  const xmlPath = path.join(publicDir, 'DMD_Website.xml');
  const projectsXmlPath = path.join(publicDir, 'projects.xml');
  const sitemapPath = path.join(publicDir, 'sitemap.xml');

  const port = process.env.PORT || 3000;
  // Use production domain for sitemap generation
  const baseUrl = 'https://dmdfurnishing.com';

  const xml = fs.readFileSync(xmlPath, 'utf-8');
  const projectsXml = fs.existsSync(projectsXmlPath) ? fs.readFileSync(projectsXmlPath, 'utf-8') : '';

  // Stack-based light XML walk: track context for place → furnitureType → subcategory → product
  let currentPlace = '';
  let currentFurniture = '';
  let currentSubcategory = '';

  const institutionPaths = new Set();
  const furnitureTypePaths = new Set();
  const categoryPaths = new Set();
  const productPaths = new Set();
  const projectPaths = new Set();

  const tagRegex = /<\/?([a-zA-Z0-9:_-]+)([^>]*)>/g;
  let match;
  while ((match = tagRegex.exec(xml)) !== null) {
    const full = match[0];
    const tag = match[1];
    const attrs = match[2] || '';
    const isClosing = full.startsWith('</');
    const isSelfClosing = full.endsWith('/>');

    if (!isClosing) {
      if (tag === 'place') {
        currentPlace = getAttr(attrs, 'id') || getAttr(attrs, 'name');
        if (currentPlace) {
          institutionPaths.add(`/products/${toSlug(currentPlace)}`);
        }
      } else if (tag === 'furnitureType') {
        currentFurniture = getAttr(attrs, 'id') || getAttr(attrs, 'name');
        if (currentPlace && currentFurniture) {
          furnitureTypePaths.add(`/products/${toSlug(currentPlace)}/${toSlug(currentFurniture)}`);
        }
      } else if (tag === 'subcategory') {
        currentSubcategory = getAttr(attrs, 'id') || getAttr(attrs, 'name');
        // Record category path once per open
        if (currentPlace && currentFurniture && currentSubcategory) {
          const p = `/products/${toSlug(currentPlace)}/${toSlug(currentFurniture)}/${toSlug(currentSubcategory)}`;
          categoryPaths.add(p);
        }
      } else if (tag === 'product') {
        const pid = getAttr(attrs, 'id');
        const pname = getAttr(attrs, 'name');
        const productSlug = toSlug(pname || pid);
        if (currentPlace && currentFurniture && currentSubcategory && productSlug) {
          const p = `/products/${toSlug(currentPlace)}/${toSlug(currentFurniture)}/${toSlug(currentSubcategory)}/${productSlug}`;
          productPaths.add(p);
        }
      }
    } else {
      // Closing tags reset context appropriately
      if (tag === 'subcategory') {
        currentSubcategory = '';
      } else if (tag === 'furnitureType') {
        currentFurniture = '';
      } else if (tag === 'place') {
        currentPlace = '';
      }
    }
  }

  // Parse projects.xml for project detail pages
  if (projectsXml) {
    const projRegex = /<project\s+([^>]*)>/g;
    let pm;
    while ((pm = projRegex.exec(projectsXml)) !== null) {
      const attrs = pm[1] || '';
      const pid = getAttr(attrs, 'id');
      if (pid) {
        projectPaths.add(`/projects/${toSlug(pid)}`);
      }
    }
  }

  const urls = [];
  // Core pages
  urls.push(`${baseUrl}/`);
  urls.push(`${baseUrl}/products`);
  urls.push(`${baseUrl}/projects`);
  urls.push(`${baseUrl}/about`);
  urls.push(`${baseUrl}/services`);
  urls.push(`${baseUrl}/contact`);
  urls.push(`${baseUrl}/schedule-call`);
  urls.push(`${baseUrl}/inspirations`);
  urls.push(`${baseUrl}/website-policies`);

  // Blog pages
  urls.push(`${baseUrl}/blog`);
  urls.push(`${baseUrl}/blog/what-is-ffe-hospitality`);
  urls.push(`${baseUrl}/blog/hotel-guestroom-furniture-checklist`);
  urls.push(`${baseUrl}/blog/value-engineering-commercial-furniture`);
  urls.push(`${baseUrl}/blog/hpl-veneer-solid-wood-hotel-casegoods`);
  urls.push(`${baseUrl}/blog/restaurant-seating-guide`);
  urls.push(`${baseUrl}/blog/ffe-procurement-timeline`);

  // Inspiration detail pages - dynamically count from inspirations data
  const inspirationCount = Array.isArray(inspirations) ? inspirations.length : 6;
  for (let i = 1; i <= inspirationCount; i++) {
    urls.push(`${baseUrl}/inspirations/${i}`);
  }

  // Institution-level routes (tier-1)
  for (const p of institutionPaths) {
    urls.push(baseUrl + p);
  }
  // Furniture type routes (tier-2)
  for (const p of furnitureTypePaths) {
    urls.push(baseUrl + p);
  }
  // Category routes
  for (const p of categoryPaths) {
    urls.push(baseUrl + p);
  }
  // Product routes
  for (const p of productPaths) {
    urls.push(baseUrl + p);
  }
  // Project routes
  for (const p of projectPaths) {
    urls.push(baseUrl + p);
  }

  const body = urls
    .map((u) => {
      let pri = '0.5';
      let freq = 'monthly';
      if (u === baseUrl + '/') { pri = '1.0'; freq = 'weekly'; }
      else if (u === baseUrl + '/products') { pri = '0.9'; freq = 'weekly'; }
      else if (u === baseUrl + '/projects') { pri = '0.8'; freq = 'monthly'; }
      else if (u === baseUrl + '/about' || u === baseUrl + '/services') { pri = '0.7'; freq = 'monthly'; }
      else if (u === baseUrl + '/contact' || u === baseUrl + '/schedule-call') { pri = '0.7'; freq = 'monthly'; }
      else if (u.includes('/inspirations')) { pri = '0.5'; freq = 'monthly'; }
      else if (u === baseUrl + '/website-policies') { pri = '0.3'; freq = 'yearly'; }
      else if (u === baseUrl + '/blog') { pri = '0.8'; freq = 'weekly'; }
      else if (u.includes('/blog/')) { pri = '0.6'; freq = 'monthly'; }
      else if (u.includes('/products/')) {
        const depth = u.replace(baseUrl, '').split('/').filter(Boolean).length;
        if (depth === 2) pri = '0.8'; // institution level
        else if (depth === 3) pri = '0.7'; // furniture type level
        else if (depth === 4) pri = '0.6'; // subcategory level
        else pri = '0.5'; // product detail
        freq = 'monthly';
      }
      else if (u.includes('/projects/')) { pri = '0.7'; freq = 'monthly'; }
      return `  <url>\n    <loc>${u}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${freq}</changefreq>\n    <priority>${pri}</priority>\n  </url>`;
    })
    .join('\n');

  const xmlOut = `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<!-- SEO related changes: auto-generated sitemap.\n     Next expand: add <lastmod>, <changefreq>, and production domain config. -->\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;

  fs.writeFileSync(sitemapPath, xmlOut, 'utf-8');
  console.log(`[sitemap] Wrote ${urls.length} URLs to ${path.relative(rootDir, sitemapPath)}`);
}

try {
  generate();
} catch (err) {
  console.error('[sitemap] Failed to generate sitemap:', err);
  process.exitCode = 1;
}
