/**
 * app/sitemap.js
 * Next.js App Router dynamic sitemap generation.
 *
 * Post-2026-04-10 flat catalog refactor:
 *   - Product detail URLs are now /products/{slug} (one per unique product)
 *   - Intermediate 2-3 segment category URLs are no longer valid routes — removed
 *   - Legacy 4-segment URLs (/products/{place}/{ft}/{sub}/{slug}) 301-redirect
 *     via netlify.toml to the new flat URL
 */

import { getAllPlaces, getAllProductsFlat } from '../lib/catalog';
import { getAllProjects } from '../lib/projects';
import { getAllInspirations } from '../lib/inspirations';
import { getAllBlogPosts } from '../lib/blog-posts';
import { siteUrl } from '../lib/metadata';

const baseUrl = siteUrl;

// Fallback lastModified for pages without a real source date.
const LAST_BUILD = '2026-06-10';

function abs(imagePath) {
  if (!imagePath) return undefined;
  return imagePath.startsWith('http') ? imagePath : `${baseUrl}${imagePath}`;
}

export default function sitemap() {
  const places = getAllPlaces();
  const products = getAllProductsFlat();
  const projects = getAllProjects();
  const inspirations = getAllInspirations();
  const blogPosts = getAllBlogPosts();

  const entries = [];

  // --- Static pages ---
  entries.push({
    url: `${baseUrl}/`,
    lastModified: LAST_BUILD,
    images: [`${baseUrl}/Images/Tailored_Guestroom_Collections.jpg`],
  });
  entries.push({
    url: `${baseUrl}/products`,
    lastModified: LAST_BUILD,
    images: [`${baseUrl}/Images/Our_Products.jpg`],
  });
  entries.push({ url: `${baseUrl}/projects`, lastModified: LAST_BUILD });
  entries.push({ url: `${baseUrl}/about`, lastModified: LAST_BUILD, images: [`${baseUrl}/Images/About_DMD_Furnishing_Page.jpg`] });
  entries.push({
    url: `${baseUrl}/services`,
    lastModified: LAST_BUILD,
    images: [`${baseUrl}/Images/Our Services.jpg`],
  });
  entries.push({ url: `${baseUrl}/contact`, lastModified: LAST_BUILD });
  entries.push({ url: `${baseUrl}/inspirations`, lastModified: LAST_BUILD });
  entries.push({ url: `${baseUrl}/website-policies`, lastModified: LAST_BUILD });
  entries.push({ url: `${baseUrl}/author/dmd-furnishing-editorial`, lastModified: LAST_BUILD });

  // --- Pillar guides (topical cluster heads) ---
  entries.push({
    url: `${baseUrl}/guides`,
    lastModified: LAST_BUILD,
  });
  entries.push({
    url: `${baseUrl}/guides/commercial-furniture-manufacturing`,
    lastModified: LAST_BUILD,
    images: [`${baseUrl}/Images/Our_Products.jpg`],
  });
  entries.push({
    url: `${baseUrl}/guides/hospitality-ffe`,
    lastModified: LAST_BUILD,
    images: [`${baseUrl}/Images/Tailored_Guestroom_Collections.jpg`],
  });

  // --- Blog ---
  entries.push({ url: `${baseUrl}/blog`, lastModified: LAST_BUILD });
  for (const post of blogPosts) {
    entries.push({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.isoDate,
    });
  }

  // --- Inspiration detail pages ---
  for (const insp of inspirations) {
    entries.push({ url: `${baseUrl}/inspirations/${insp.slug}`, lastModified: LAST_BUILD });
  }

  // --- Place listing pages (1 per place) ---
  for (const place of places) {
    entries.push({
      url: `${baseUrl}/products/${place.slug}`,
      lastModified: LAST_BUILD,
      images: place.image ? [abs(place.image)] : undefined,
    });
  }

  // --- Furniture-type mid-tier pages (only pairs with >= 3 products) ---
  for (const place of places) {
    for (const ft of place.furnitureTypes) {
      const count = ft.subcategories.reduce((n, s) => n + s.products.length, 0);
      if (count >= 3) {
        entries.push({
          url: `${baseUrl}/products/${place.slug}/${ft.slug}`,
          lastModified: LAST_BUILD,
          images: ft.image ? [abs(ft.image)] : undefined,
        });
      }
    }
  }

  // --- Flat product detail pages (1 per unique product) ---
  for (const product of products) {
    entries.push({
      url: `${baseUrl}/products/${product.slug}`,
      lastModified: LAST_BUILD,
      images: product.image ? [abs(product.image)] : undefined,
    });
  }

  // --- Project detail pages ---
  for (const project of projects) {
    entries.push({ url: `${baseUrl}/projects/${project.slug}`, lastModified: LAST_BUILD });
  }

  return entries;
}
