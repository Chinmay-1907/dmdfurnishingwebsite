/**
 * lib/projects.js
 * Server-side XML parser for DMD projects catalog.
 * Uses fs.readFileSync + regex-based parsing (no DOMParser. Server environment).
 * All functions are synchronous and safe to call from Next.js Server Components
 * and generateStaticParams.
 */

import fs from 'fs';
import path from 'path';

// ---------------------------------------------------------------------------
// Slug utility
// ---------------------------------------------------------------------------
function toSlug(str) {
  if (!str && str !== 0) return '';
  return String(str)
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

// ---------------------------------------------------------------------------
// Image path normalizer
// ---------------------------------------------------------------------------
function normalizeImagePath(rawPath, fallback = '/placeholder.png') {
  if (!rawPath) return fallback;
  const trimmed = rawPath.trim();
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  let normalized = trimmed.replace(/\\/g, '/');
  if (!normalized) return fallback;
  normalized = normalized.replace(/\/{2,}/g, '/');
  if (!normalized.startsWith('/')) normalized = `/${normalized}`;
  return normalized;
}

// ---------------------------------------------------------------------------
// Decode XML entities
// ---------------------------------------------------------------------------
function decodeEntities(str) {
  if (!str) return str;
  return str
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

// ---------------------------------------------------------------------------
// Extract text between opening and closing tags (non-greedy, single pass)
// ---------------------------------------------------------------------------
function extractTextBetween(xml, startTag, fromIndex) {
  const openIdx = xml.indexOf(`<${startTag}`, fromIndex);
  if (openIdx === -1) return '';
  const closeStart = xml.indexOf('>', openIdx);
  if (closeStart === -1) return '';
  const closeTag = `</${startTag}>`;
  const closeIdx = xml.indexOf(closeTag, closeStart);
  if (closeIdx === -1) return '';
  return xml.slice(closeStart + 1, closeIdx).trim();
}

// ---------------------------------------------------------------------------
// Extract attribute value from an attribute string
// ---------------------------------------------------------------------------
function getAttr(attrsString, name) {
  const m = new RegExp(`${name}="([^"]*)"`, 'i').exec(attrsString);
  return m ? decodeEntities(m[1]) : '';
}

// ---------------------------------------------------------------------------
// Module-level cache
// ---------------------------------------------------------------------------
let _cachedProjects = null;

// ---------------------------------------------------------------------------
// Core XML parser for projects.xml
// ---------------------------------------------------------------------------
function parseProjectsXml() {
  const xmlPath = path.join(process.cwd(), 'public', 'projects.xml');
  const xml = fs.readFileSync(xmlPath, 'utf-8');

  const projects = [];
  // Match each <project ...>...</project> block
  const projectBlockRegex = /<project\s([^>]*)>([\s\S]*?)<\/project>/g;
  let pm;

  while ((pm = projectBlockRegex.exec(xml)) !== null) {
    const attrStr = pm[1] || '';
    const body = pm[2] || '';

    const id = getAttr(attrStr, 'id');
    const name = getAttr(attrStr, 'name') || 'Untitled Project';
    const category = getAttr(attrStr, 'category') || 'Project';

    // Text content fields
    function extractText(tagName) {
      const openRe = new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, 'i');
      const m = openRe.exec(body);
      return m ? decodeEntities(m[1].trim()) : '';
    }

    // mainImage: self-closing tag
    const mainImageMatch = /<mainImage\s([^>]*)\/?>/.exec(body);
    const mainImage = mainImageMatch
      ? normalizeImagePath(getAttr(mainImageMatch[1], 'src'))
      : '';
    const mainImageAlt = mainImageMatch ? getAttr(mainImageMatch[1], 'alt') : '';

    // featuredAfter: manual override for before/after slider's "after" image.
    // Use when mainImage is an exterior shot but we want an interior furniture shot.
    const featuredAfterMatch = /<featuredAfter\s([^>]*)\/?>/.exec(body);
    const featuredAfter = featuredAfterMatch
      ? {
          url: normalizeImagePath(getAttr(featuredAfterMatch[1], 'src')),
          alt: getAttr(featuredAfterMatch[1], 'alt'),
        }
      : null;

    // images block
    const imagesBlockMatch = /<images>([\s\S]*?)<\/images>/.exec(body);
    const images = [];
    if (imagesBlockMatch) {
      const imagesBody = imagesBlockMatch[1];
      const imgRe = /<image\s([^>]*)\/?>(?:[\s\S]*?<\/image>)?/g;
      let im;
      let idx = 0;
      while ((im = imgRe.exec(imagesBody)) !== null) {
        images.push({
          id: getAttr(im[1], 'id') || String(idx + 1),
          url: normalizeImagePath(getAttr(im[1], 'src')),
          alt: getAttr(im[1], 'alt'),
        });
        idx++;
      }
    }

    // beforeImages block
    const beforeImagesBlockMatch = /<beforeImages>([\s\S]*?)<\/beforeImages>/.exec(body);
    const beforeImages = [];
    if (beforeImagesBlockMatch) {
      const beforeBody = beforeImagesBlockMatch[1];
      const imgRe = /<image\s([^>]*)\/?>(?:[\s\S]*?<\/image>)?/g;
      let im;
      let idx = 0;
      while ((im = imgRe.exec(beforeBody)) !== null) {
        beforeImages.push({
          id: getAttr(im[1], 'id') || `before-${idx + 1}`,
          url: normalizeImagePath(getAttr(im[1], 'src')),
          alt: getAttr(im[1], 'alt'),
        });
        idx++;
      }
    }

    // specifications block
    const specsBlockMatch = /<specifications>([\s\S]*?)<\/specifications>/.exec(body);
    const specifications = [];
    if (specsBlockMatch) {
      const specsBody = specsBlockMatch[1];
      const specRe = /<spec\s([^>]*)\/?>(?:[\s\S]*?<\/spec>)?/g;
      let sm;
      while ((sm = specRe.exec(specsBody)) !== null) {
        const specName = getAttr(sm[1], 'name');
        const specVal = getAttr(sm[1], 'value');
        if (specName || specVal) {
          specifications.push({ name: specName, value: specVal });
        }
      }
    }

    // highlights block
    const highlightsBlockMatch = /<highlights>([\s\S]*?)<\/highlights>/.exec(body);
    const highlights = [];
    if (highlightsBlockMatch) {
      const highlightsBody = highlightsBlockMatch[1];
      const hlRe = /<highlight[^>]*>([\s\S]*?)<\/highlight>/g;
      let hl;
      while ((hl = hlRe.exec(highlightsBody)) !== null) {
        const text = decodeEntities(hl[1].trim());
        if (text) highlights.push(text);
      }
    }

    projects.push({
      id,
      slug: toSlug(id),
      name,
      category,
      shortDescription: extractText('shortDescription'),
      fullDescription: extractText('fullDescription'),
      completionDate: extractText('completionDate'),
      clientTestimonial: extractText('clientTestimonial'),
      clientName: extractText('clientName'),
      clientPosition: extractText('clientPosition'),
      mainImage,
      mainImageAlt,
      featuredAfter,
      images,
      beforeImages,
      specifications,
      highlights,
    });
  }

  return projects;
}

// ---------------------------------------------------------------------------
// Lazy-load + cache
// ---------------------------------------------------------------------------
function getProjects() {
  if (!_cachedProjects) {
    _cachedProjects = parseProjectsXml();
  }
  return _cachedProjects;
}

// ---------------------------------------------------------------------------
// Image quality picker (file-size heuristic)
// ---------------------------------------------------------------------------
/**
 * Stats an image under /public and returns its file size in bytes.
 * Returns 0 if the file cannot be read (remote URL, missing file).
 */
function imageBytes(url) {
  if (!url || /^https?:\/\//i.test(url)) return 0;
  try {
    const abs = path.join(process.cwd(), 'public', url.replace(/^\//, ''));
    return fs.statSync(abs).size;
  } catch {
    return 0;
  }
}

/**
 * Sorts images by file size. Largest file ≈ highest-quality / most detailed shot.
 * Used as a rough "best image" heuristic when no manual curation exists.
 */
export function pickBestImage(images) {
  if (!Array.isArray(images) || images.length === 0) return null;
  if (images.length === 1) return images[0];
  const scored = images.map((img) => ({ img, bytes: imageBytes(img.url) }));
  scored.sort((a, b) => b.bytes - a.bytes);
  return scored[0].img;
}

/**
 * Picks the smallest file. Rough proxy for lower-quality / earlier snapshot.
 */
export function pickWorstImage(images) {
  if (!Array.isArray(images) || images.length === 0) return null;
  if (images.length === 1) return images[0];
  const scored = images.map((img) => ({ img, bytes: imageBytes(img.url) }));
  scored.sort((a, b) => a.bytes - b.bytes);
  return scored[0].img;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Returns all projects.
 */
export function getAllProjects() {
  return getProjects();
}

/**
 * Returns a single project by its original id (exact match) or slug.
 */
export function getProjectById(id) {
  if (!id) return null;
  const projects = getProjects();
  return (
    projects.find((p) => p.id === id) ||
    projects.find((p) => p.slug === toSlug(id)) ||
    null
  );
}

/**
 * Returns all project path slugs for generateStaticParams.
 * Each entry: { slug: string }
 */
export function getAllProjectPaths() {
  return getProjects().map((p) => ({ slug: p.slug }));
}
