/**
 * lib/catalog.js
 * Server-side XML parser for DMD product catalog.
 * Uses fs.readFileSync + regex-based parsing (no DOMParser — server environment).
 * All functions are synchronous and safe to call from Next.js Server Components,
 * generateStaticParams, and generateMetadata.
 */

import fs from 'fs';
import path from 'path';

// ---------------------------------------------------------------------------
// Slug utility (mirrors src/utils/catalogPaths.js toCatalogSlug)
// ---------------------------------------------------------------------------
export function toSlug(str) {
  if (!str && str !== 0) return '';
  return String(str)
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

// ---------------------------------------------------------------------------
// Image path normalizer (mirrors src/utils/catalogPaths.js normalizeCatalogImagePath)
// ---------------------------------------------------------------------------
function normalizeImagePath(rawPath, fallback = '/placeholder.png') {
  if (!rawPath) return fallback;
  let normalized = rawPath.replace(/\\/g, '/').trim();
  if (!normalized) return fallback;
  normalized = normalized.replace(/\/{2,}/g, '/');
  if (!normalized.startsWith('/')) normalized = `/${normalized}`;
  return normalized;
}

// ---------------------------------------------------------------------------
// Low-level XML attribute extractor
// ---------------------------------------------------------------------------
function getAttr(attrsString, name) {
  const m = new RegExp(`${name}="([^"]*)"`, 'i').exec(attrsString);
  return m ? m[1] : '';
}

// ---------------------------------------------------------------------------
// Decode XML entities that appear in attribute values / text content
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
// Module-level cache
// ---------------------------------------------------------------------------
let _catalogCache = null;

// ---------------------------------------------------------------------------
// Name-mapping identical to Products.js transform
// ---------------------------------------------------------------------------
const PLACE_NAME_MAP = {
  hotel: 'Hotels & Motels',
  restaurant: 'Restaurants & Cafés',
  office: 'Office & Corporate Spaces',
  residential: 'Multi-Family & Residential Projects',
  hospital: 'Healthcare & Care Facilities',
  'lobby area': 'Public & Common Areas',
};

// ---------------------------------------------------------------------------
// Core XML parser — builds full in-memory catalog tree
// ---------------------------------------------------------------------------
function parseXml() {
  const xmlPath = path.join(process.cwd(), 'public', 'DMD_Website.xml');
  const xml = fs.readFileSync(xmlPath, 'utf-8');

  /**
   * Stack-based tag walk.
   * Each entry on the stack: { tag, attrs, children[] }
   * We accumulate the tree level-by-level then pull it apart.
   */

  const places = [];

  let currentPlace = null;
  let currentFurnitureType = null;
  let currentSubcategory = null;
  let currentProduct = null;
  // Nested <images> within a product vs furnitureType
  let imagesContext = null; // 'product' | 'furnitureType' | null
  let specsContext = null;  // 'product' | null

  const tagRegex = /<\/?([a-zA-Z0-9:_-]+)([^>]*)>/g;
  let match;

  while ((match = tagRegex.exec(xml)) !== null) {
    const full = match[0];
    const tag = match[1];
    const attrs = match[2] || '';
    const isClosing = full.startsWith('</');
    const isSelfClosing = full.endsWith('/>');

    if (isClosing) {
      // Reset context on closing tags
      if (tag === 'product') {
        if (currentSubcategory && currentProduct) {
          currentSubcategory.products.push(currentProduct);
        }
        currentProduct = null;
        imagesContext = null;
        specsContext = null;
      } else if (tag === 'subcategory') {
        if (currentFurnitureType && currentSubcategory) {
          currentFurnitureType.subcategories.push(currentSubcategory);
        }
        currentSubcategory = null;
      } else if (tag === 'furnitureType') {
        if (currentPlace && currentFurnitureType) {
          currentPlace.furnitureTypes.push(currentFurnitureType);
        }
        currentFurnitureType = null;
      } else if (tag === 'place') {
        if (currentPlace) {
          places.push(currentPlace);
        }
        currentPlace = null;
      } else if (tag === 'images') {
        imagesContext = null;
      } else if (tag === 'specifications') {
        specsContext = null;
      }
      continue;
    }

    // Opening or self-closing tag
    switch (tag) {
      case 'place': {
        const id = decodeEntities(getAttr(attrs, 'id'));
        const name = decodeEntities(getAttr(attrs, 'name')) || 'Unnamed';
        currentPlace = {
          id,
          name,
          description: decodeEntities(getAttr(attrs, 'description')),
          image: normalizeImagePath(decodeEntities(getAttr(attrs, 'image'))),
          furnitureTypes: [],
          slug: toSlug(id || name),
        };
        break;
      }

      case 'furnitureType': {
        if (!currentPlace) break;
        const id = decodeEntities(getAttr(attrs, 'id'));
        const name = decodeEntities(getAttr(attrs, 'name')) || 'Unnamed';
        currentFurnitureType = {
          id,
          name,
          description: decodeEntities(getAttr(attrs, 'description')),
          image: normalizeImagePath(decodeEntities(getAttr(attrs, 'image'))),
          subcategories: [],
          slug: toSlug(id || name),
        };
        break;
      }

      case 'subcategory': {
        if (!currentFurnitureType) break;
        const id = decodeEntities(getAttr(attrs, 'id'));
        const name = decodeEntities(getAttr(attrs, 'name')) || 'Unnamed';
        currentSubcategory = {
          id,
          name,
          description: decodeEntities(getAttr(attrs, 'description')),
          image: normalizeImagePath(decodeEntities(getAttr(attrs, 'image'))),
          products: [],
          slug: toSlug(id || name),
        };
        break;
      }

      case 'product': {
        if (!currentSubcategory) break;
        const id = decodeEntities(getAttr(attrs, 'id'));
        const name = decodeEntities(getAttr(attrs, 'name')) || 'Unnamed';
        const tagsAttr = decodeEntities(getAttr(attrs, 'tags'));
        currentProduct = {
          id,
          name,
          description: decodeEntities(getAttr(attrs, 'description')),
          image: normalizeImagePath(decodeEntities(getAttr(attrs, 'image'))),
          tags: tagsAttr ? tagsAttr.split(',').map((t) => t.trim()).filter(Boolean) : [],
          images: [],
          specifications: [],
          slug: toSlug(name || id),
        };
        imagesContext = null;
        specsContext = null;
        break;
      }

      case 'images': {
        if (currentProduct) {
          imagesContext = 'product';
        } else if (currentFurnitureType && !currentSubcategory) {
          imagesContext = 'furnitureType';
        }
        break;
      }

      case 'specifications': {
        if (currentProduct) specsContext = 'product';
        break;
      }

      case 'image': {
        if (isSelfClosing && imagesContext === 'product' && currentProduct) {
          currentProduct.images.push({
            src: normalizeImagePath(decodeEntities(getAttr(attrs, 'src'))),
            alt: decodeEntities(getAttr(attrs, 'alt')),
          });
        }
        break;
      }

      case 'spec': {
        if (isSelfClosing && specsContext === 'product' && currentProduct) {
          currentProduct.specifications.push({
            name: decodeEntities(getAttr(attrs, 'name')),
            value: decodeEntities(getAttr(attrs, 'value')),
          });
        }
        break;
      }

      default:
        break;
    }
  }

  // ---------------------------------------------------------------------------
  // Apply the same place-name transforms that Products.js applies at runtime
  // ---------------------------------------------------------------------------
  const schoolIndex = places.findIndex((p) => toSlug(p.id) === 'school');
  const universityIndex = places.findIndex((p) => toSlug(p.id) === 'university');

  let educationalFacilities = null;
  if (schoolIndex !== -1 || universityIndex !== -1) {
    educationalFacilities = {
      id: 'educational-facilities',
      name: 'Educational Facilities',
      description:
        'Support learning and collaboration with flexible, durable furniture for classrooms, libraries, and common areas.',
      image: '/Images/University/University.png',
      furnitureTypes: [],
      slug: 'educational-facilities',
    };
    if (schoolIndex !== -1) {
      educationalFacilities.furnitureTypes.push(...places[schoolIndex].furnitureTypes);
    }
    if (universityIndex !== -1) {
      educationalFacilities.furnitureTypes.push(...places[universityIndex].furnitureTypes);
    }
  }

  const transformed = places.filter((p) => {
    const s = toSlug(p.id);
    if (s === 'school' || s === 'university') return false;
    const mappedName = PLACE_NAME_MAP[p.id.toLowerCase()];
    if (mappedName) p.name = mappedName;
    return true;
  });

  if (educationalFacilities) {
    transformed.push(educationalFacilities);
  }

  return transformed;
}

// ---------------------------------------------------------------------------
// Lazy-load + cache
// ---------------------------------------------------------------------------
function getCatalog() {
  if (!_catalogCache) {
    _catalogCache = parseXml();
  }
  return _catalogCache;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Returns all places (top-level catalog segments).
 */
export function getAllPlaces() {
  return getCatalog();
}

/**
 * Returns a single place by its slug.
 */
export function getPlaceBySlug(slug) {
  return getCatalog().find((p) => p.slug === slug) || null;
}

/**
 * Returns all furniture types within a place.
 */
export function getFurnitureTypes(placeSlug) {
  const place = getPlaceBySlug(placeSlug);
  return place ? place.furnitureTypes : [];
}

/**
 * Returns all subcategories within a place > furnitureType.
 */
export function getSubcategories(placeSlug, furnitureTypeSlug) {
  const place = getPlaceBySlug(placeSlug);
  if (!place) return [];
  const ft = place.furnitureTypes.find((f) => f.slug === furnitureTypeSlug);
  return ft ? ft.subcategories : [];
}

/**
 * Returns all products within a place > furnitureType > subcategory.
 */
export function getProducts(placeSlug, furnitureTypeSlug, subcategorySlug) {
  const subs = getSubcategories(placeSlug, furnitureTypeSlug);
  const sub = subs.find((s) => s.slug === subcategorySlug);
  return sub ? sub.products : [];
}

/**
 * Returns a single product with full data.
 */
export function getProductBySlug(placeSlug, furnitureTypeSlug, subcategorySlug, productSlug) {
  const products = getProducts(placeSlug, furnitureTypeSlug, subcategorySlug);
  return products.find((p) => p.slug === productSlug) || null;
}

/**
 * Returns the full catalog context for a product path.
 */
export function getProductContext(placeSlug, furnitureTypeSlug, subcategorySlug, productSlug) {
  const place = getPlaceBySlug(placeSlug);
  if (!place) return null;

  const furnitureType = place.furnitureTypes.find((item) => item.slug === furnitureTypeSlug);
  if (!furnitureType) return null;

  const subcategory = furnitureType.subcategories.find((item) => item.slug === subcategorySlug);
  if (!subcategory) return null;

  const product = subcategory.products.find((item) => item.slug === productSlug);
  if (!product) return null;

  return { place, furnitureType, subcategory, product };
}

/**
 * Returns all product URL path segments for generateStaticParams.
 * Each entry: { placeSlug, furnitureTypeSlug, subcategorySlug, productSlug }
 */
export function getAllProductPaths() {
  const catalog = getCatalog();
  const paths = [];

  for (const place of catalog) {
    for (const ft of place.furnitureTypes) {
      for (const sub of ft.subcategories) {
        for (const product of sub.products) {
          paths.push({
            placeSlug: place.slug,
            furnitureTypeSlug: ft.slug,
            subcategorySlug: sub.slug,
            productSlug: product.slug,
          });
        }
      }
    }
  }

  return paths;
}
