/**
 * lib/catalog.js
 * Server-side XML parser for DMD product catalog.
 *
 * DATA MODEL — 2026-04-10 refactor
 * --------------------------------
 * Products live in the XML under their CANONICAL subcategory (place → furnitureType → subcategory).
 * A product can OPTIONALLY declare additional memberships via a <memberships> child:
 *
 *   <product id="3-Seater Sofa" name="3-Seater Sofa">
 *     <memberships>
 *       <member place="hotel" furnitureType="hotel-seating" subcategory="sofa" />
 *     </memberships>
 *     <images>...</images>
 *     <specifications>...</specifications>
 *   </product>
 *
 * The catalog exposes:
 *   - A hierarchical tree (places → furnitureTypes → subcategories → products) — for category pages
 *   - A flat product list — each product appears ONCE, keyed by slug, with placeSlugs[] membership
 *   - A canonical product URL: /products/{slug}
 *
 * Category filter pages use membership arrays (placeSlugs, furnitureTypeSlugs, subcategoryKeys) so a
 * product shows up in every category it belongs to — but the product detail URL is always flat.
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
// Image path normalizer
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
// Low-level XML helpers
// ---------------------------------------------------------------------------
function getAttr(attrsString, name) {
  const m = new RegExp(`${name}="([^"]*)"`, 'i').exec(attrsString);
  return m ? m[1] : '';
}

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
// Place name mapping (display names for vertical pages)
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
// Core XML parser — builds hierarchical tree + flat product list
// ---------------------------------------------------------------------------
function parseXml() {
  const xmlPath = path.join(process.cwd(), 'public', 'DMD_Website.xml');
  const xml = fs.readFileSync(xmlPath, 'utf-8');

  const places = [];
  // Flat product lookup by slug — one entry per canonical product
  const productBySlug = new Map();
  // Track every (place, furnitureType, subcategory) a given product slug is a member of
  const productMemberships = new Map(); // slug -> [{ placeSlug, furnitureTypeSlug, subcategorySlug }, ...]

  let currentPlace = null;
  let currentFurnitureType = null;
  let currentSubcategory = null;
  let currentProduct = null;
  let imagesContext = null;
  let specsContext = null;
  let membershipsContext = false;

  const tagRegex = /<\/?([a-zA-Z0-9:_-]+)([^>]*)>/g;
  let match;

  while ((match = tagRegex.exec(xml)) !== null) {
    const full = match[0];
    const tag = match[1];
    const attrs = match[2] || '';
    const isClosing = full.startsWith('</');
    const isSelfClosing = full.endsWith('/>');

    // Skip XML comments entirely — regex above doesn't match <!-- ... -->
    // which is fine, but defensive: ignore tags that start with !
    if (tag.startsWith('!')) continue;

    if (isClosing) {
      if (tag === 'product') {
        if (currentSubcategory && currentProduct) {
          currentSubcategory.products.push(currentProduct);
        }
        currentProduct = null;
        imagesContext = null;
        specsContext = null;
        membershipsContext = false;
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
      } else if (tag === 'memberships') {
        membershipsContext = false;
      }
      continue;
    }

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
        const slug = toSlug(name || id);
        currentProduct = {
          id,
          name,
          description: decodeEntities(getAttr(attrs, 'description')),
          image: normalizeImagePath(decodeEntities(getAttr(attrs, 'image'))),
          tags: tagsAttr ? tagsAttr.split(',').map((t) => t.trim()).filter(Boolean) : [],
          images: [],
          specifications: [],
          slug,
        };
        imagesContext = null;
        specsContext = null;
        membershipsContext = false;

        // Register the PRIMARY membership (the XML nesting where the product is declared)
        if (currentPlace) {
          const membership = {
            placeSlug: currentPlace.slug,
            furnitureTypeSlug: currentFurnitureType.slug,
            subcategorySlug: currentSubcategory.slug,
            placeName: currentPlace.name,
            furnitureTypeName: currentFurnitureType.name,
            subcategoryName: currentSubcategory.name,
            isPrimary: true,
          };
          if (!productMemberships.has(slug)) {
            productMemberships.set(slug, []);
          }
          productMemberships.get(slug).push(membership);
        }
        break;
      }

      case 'memberships': {
        if (currentProduct) membershipsContext = true;
        break;
      }

      case 'member': {
        if (!isSelfClosing || !membershipsContext || !currentProduct) break;
        const placeSlug = decodeEntities(getAttr(attrs, 'place'));
        const furnitureTypeSlug = decodeEntities(getAttr(attrs, 'furnitureType'));
        const subcategorySlug = decodeEntities(getAttr(attrs, 'subcategory'));
        if (!placeSlug) break;
        const slug = currentProduct.slug;
        if (!productMemberships.has(slug)) {
          productMemberships.set(slug, []);
        }
        productMemberships.get(slug).push({
          placeSlug,
          furnitureTypeSlug,
          subcategorySlug,
          // Names resolved in a post-pass below once all places are known
          placeName: null,
          furnitureTypeName: null,
          subcategoryName: null,
          isPrimary: false,
        });
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
  // Apply school/university → educational-facilities merge
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

  // ---------------------------------------------------------------------------
  // Post-pass: rewrite school/university memberships → educational-facilities,
  // resolve names on additional memberships, build flat product list.
  // ---------------------------------------------------------------------------
  for (const [slug, mships] of productMemberships.entries()) {
    for (const m of mships) {
      // Rewrite school/university → educational-facilities
      if (m.placeSlug === 'school' || m.placeSlug === 'university') {
        m.placeSlug = 'educational-facilities';
        m.placeName = 'Educational Facilities';
      }

      // If name not set (additional memberships from <member> tag), resolve from place tree
      if (!m.placeName) {
        const place = transformed.find((p) => p.slug === m.placeSlug);
        if (place) {
          m.placeName = place.name;
          const ft = place.furnitureTypes.find((f) => f.slug === m.furnitureTypeSlug);
          if (ft) {
            m.furnitureTypeName = ft.name;
            const sub = ft.subcategories.find((s) => s.slug === m.subcategorySlug);
            if (sub) {
              m.subcategoryName = sub.name;
            }
          }
        }
      }
    }
  }

  // Build flat product list — one entry per unique slug, walking the hierarchical tree.
  // Products are declared in exactly one place in the tree (their primary membership).
  for (const place of transformed) {
    for (const ft of place.furnitureTypes) {
      for (const sub of ft.subcategories) {
        for (const product of sub.products) {
          if (!productBySlug.has(product.slug)) {
            productBySlug.set(product.slug, product);
          }
        }
      }
    }
  }

  return { places: transformed, productBySlug, productMemberships };
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

// ===========================================================================
// Public API
// ===========================================================================

/**
 * Returns all places (top-level catalog segments).
 */
export function getAllPlaces() {
  return getCatalog().places;
}

/**
 * Returns a single place by its slug.
 */
export function getPlaceBySlug(slug) {
  return getCatalog().places.find((p) => p.slug === slug) || null;
}

/**
 * Returns all furniture types within a place.
 */
export function getFurnitureTypes(placeSlug) {
  const place = getPlaceBySlug(placeSlug);
  return place ? place.furnitureTypes : [];
}

/**
 * Returns a product by its canonical slug (the new flat URL key).
 * Attaches full membership context so the detail page can render breadcrumbs.
 */
export function getProductBySlug(productSlug) {
  const { productBySlug, productMemberships } = getCatalog();
  const product = productBySlug.get(productSlug);
  if (!product) return null;

  const memberships = productMemberships.get(productSlug) || [];
  const primary = memberships.find((m) => m.isPrimary) || memberships[0] || null;

  return {
    ...product,
    memberships,
    primary,
  };
}

/**
 * Returns true if the given slug resolves to a product (not a place).
 */
export function isProductSlug(slug) {
  return getCatalog().productBySlug.has(slug);
}

/**
 * Returns every product in the catalog as a flat array, one entry per unique product.
 * Each entry carries ALL its memberships so filter views can match across categories,
 * plus a `primary` convenience pointer for breadcrumbs and card badges.
 * The `href` is the flat canonical URL `/products/{slug}`.
 */
export function getAllProductsFlat() {
  const { places, productMemberships } = getCatalog();
  const rows = [];

  const seen = new Set();
  for (const place of places) {
    for (const ft of place.furnitureTypes) {
      for (const sub of ft.subcategories) {
        for (const product of sub.products) {
          if (seen.has(product.slug)) continue;
          seen.add(product.slug);

          const memberships = productMemberships.get(product.slug) || [];
          const primary = memberships.find((m) => m.isPrimary) || memberships[0];

          // Aggregate all memberships for filter matching
          const placeSlugs = [...new Set(memberships.map((m) => m.placeSlug).filter(Boolean))];
          const furnitureTypeSlugs = [
            ...new Set(memberships.map((m) => m.furnitureTypeSlug).filter(Boolean)),
          ];
          const subcategoryKeys = [
            ...new Set(
              memberships
                .filter((m) => m.placeSlug && m.furnitureTypeSlug && m.subcategorySlug)
                .map((m) => `${m.placeSlug}/${m.furnitureTypeSlug}/${m.subcategorySlug}`)
            ),
          ];

          rows.push({
            slug: product.slug,
            name: product.name,
            image: product.image,
            description: product.description,
            tags: product.tags || [],
            // Primary context (used for card badges and default breadcrumbs)
            placeName: primary?.placeName || '',
            placeSlug: primary?.placeSlug || '',
            furnitureTypeName: primary?.furnitureTypeName || '',
            furnitureTypeSlug: primary?.furnitureTypeSlug || '',
            subcategoryName: primary?.subcategoryName || '',
            subcategorySlug: primary?.subcategorySlug || '',
            subcategoryKey:
              primary && primary.placeSlug && primary.furnitureTypeSlug && primary.subcategorySlug
                ? `${primary.placeSlug}/${primary.furnitureTypeSlug}/${primary.subcategorySlug}`
                : '',
            // Multi-membership arrays (used for filter matching — a product can appear in many categories)
            placeSlugs,
            furnitureTypeSlugs,
            subcategoryKeys,
            memberships,
            href: `/products/${product.slug}`,
            hoverImage: product.images?.[1]?.src || product.images?.[0]?.src || null,
          });
        }
      }
    }
  }

  return rows;
}

/**
 * Returns all unique product slugs for generateStaticParams on the flat product route.
 */
export function getAllProductSlugs() {
  return Array.from(getCatalog().productBySlug.keys());
}

/**
 * Returns related products in the same primary subcategory as a given product,
 * excluding the product itself.
 */
export function getRelatedProducts(productSlug, limit = 6) {
  const all = getAllProductsFlat();
  const target = all.find((p) => p.slug === productSlug);
  if (!target) return [];

  return all
    .filter((p) => p.slug !== productSlug && p.subcategoryKey === target.subcategoryKey)
    .slice(0, limit);
}

/**
 * Returns structured filter options with counts for the catalog UI.
 * Counts are based on MEMBERSHIP — a product that appears in multiple places
 * counts in every place's tally.
 */
export function getFilterOptions() {
  const { places } = getCatalog();
  const products = getAllProductsFlat();

  const spaces = places.map((place) => ({
    slug: place.slug,
    name: place.name,
    image: place.image,
    count: products.filter((p) => p.placeSlugs.includes(place.slug)).length,
  }));

  // Furniture types: unique by (placeSlug, ftSlug) — counts by membership
  const furnitureTypes = [];
  const subcategories = [];
  const seenFt = new Set();
  const seenSub = new Set();

  for (const place of places) {
    for (const ft of place.furnitureTypes) {
      const ftKey = `${place.slug}/${ft.slug}`;
      if (!seenFt.has(ftKey)) {
        seenFt.add(ftKey);
        const count = products.filter(
          (p) => p.placeSlugs.includes(place.slug) && p.furnitureTypeSlugs.includes(ft.slug)
        ).length;
        furnitureTypes.push({
          slug: ft.slug,
          name: ft.name,
          count,
          placeSlug: place.slug,
        });
      }

      for (const sub of ft.subcategories) {
        const subKey = `${place.slug}/${ft.slug}/${sub.slug}`;
        if (!seenSub.has(subKey)) {
          seenSub.add(subKey);
          const count = products.filter((p) => p.subcategoryKeys.includes(subKey)).length;
          subcategories.push({
            slug: sub.slug,
            key: subKey,
            name: sub.name,
            count,
            furnitureTypeSlug: ft.slug,
            placeSlug: place.slug,
          });
        }
      }
    }
  }

  return { spaces, furnitureTypes, subcategories };
}

// ===========================================================================
// Legacy API — retained for any call sites still using the hierarchical
// lookup. New code should prefer getProductBySlug + getAllProductsFlat.
// ===========================================================================

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
