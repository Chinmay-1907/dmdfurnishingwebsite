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
import { siteUrl } from '../lib/metadata';

const baseUrl = siteUrl;

function abs(imagePath) {
  if (!imagePath) return undefined;
  return imagePath.startsWith('http') ? imagePath : `${baseUrl}${imagePath}`;
}

export default function sitemap() {
  const places = getAllPlaces();
  const products = getAllProductsFlat();
  const projects = getAllProjects();
  const inspirations = getAllInspirations();

  const entries = [];

  // --- Static pages ---
  entries.push({
    url: `${baseUrl}/`,
    lastModified: '2026-04-10',
    changeFrequency: 'weekly',
    priority: 1.0,
    images: [`${baseUrl}/Images/Tailored_Guestroom_Collections.jpg`],
  });
  entries.push({
    url: `${baseUrl}/products`,
    lastModified: '2026-04-10',
    changeFrequency: 'weekly',
    priority: 0.95,
    images: [`${baseUrl}/Images/Our_Products.jpg`],
  });
  entries.push({ url: `${baseUrl}/projects`, lastModified: '2026-04-10', changeFrequency: 'monthly', priority: 0.8 });
  entries.push({ url: `${baseUrl}/about`, lastModified: '2026-04-10', changeFrequency: 'monthly', priority: 0.75, images: [`${baseUrl}/Images/About_DMD_Furnishing_Page.jpg`] });
  entries.push({
    url: `${baseUrl}/services`,
    lastModified: '2026-04-10',
    changeFrequency: 'monthly',
    priority: 0.8,
    images: [`${baseUrl}/Images/Our Services.jpg`],
  });
  entries.push({ url: `${baseUrl}/contact`, lastModified: '2026-04-12', changeFrequency: 'monthly', priority: 0.7 });
  entries.push({ url: `${baseUrl}/inspirations`, lastModified: '2026-04-10', changeFrequency: 'monthly', priority: 0.5 });
  entries.push({ url: `${baseUrl}/website-policies`, lastModified: '2026-04-10', changeFrequency: 'yearly', priority: 0.3 });
  entries.push({ url: `${baseUrl}/author/dmd-furnishing-editorial`, lastModified: '2026-04-10', changeFrequency: 'monthly', priority: 0.6 });

  // --- Pillar guides (topical cluster heads) ---
  entries.push({
    url: `${baseUrl}/guides`,
    lastModified: '2026-04-10',
    changeFrequency: 'monthly',
    priority: 0.8,
  });
  entries.push({
    url: `${baseUrl}/guides/commercial-furniture-manufacturing`,
    lastModified: '2026-04-10',
    changeFrequency: 'monthly',
    priority: 0.85,
    images: [`${baseUrl}/Images/Our_Products.jpg`],
  });
  entries.push({
    url: `${baseUrl}/guides/hospitality-ffe`,
    lastModified: '2026-04-10',
    changeFrequency: 'monthly',
    priority: 0.85,
    images: [`${baseUrl}/Images/Tailored_Guestroom_Collections.jpg`],
  });

  // --- Blog ---
  entries.push({ url: `${baseUrl}/blog`, lastModified: '2026-04-10', changeFrequency: 'weekly', priority: 0.85 });
  const blogPosts = [
    { slug: 'what-is-ffe-hospitality', lastModified: '2026-04-01' },
    { slug: 'hotel-guestroom-furniture-checklist', lastModified: '2026-03-29' },
    { slug: 'value-engineering-commercial-furniture', lastModified: '2026-03-26' },
    { slug: 'hpl-veneer-solid-wood-hotel-casegoods', lastModified: '2026-03-22' },
    { slug: 'restaurant-seating-guide', lastModified: '2026-03-31' },
    { slug: 'ffe-procurement-timeline', lastModified: '2026-04-02' },
  ];
  for (const post of blogPosts) {
    entries.push({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.lastModified,
      changeFrequency: 'monthly',
      priority: 0.75,
    });
  }

  // --- Inspiration detail pages ---
  for (const insp of inspirations) {
    entries.push({ url: `${baseUrl}/inspirations/${insp.id}`, lastModified: '2026-04-10', changeFrequency: 'monthly', priority: 0.5 });
  }

  // --- Place listing pages (1 per place) ---
  for (const place of places) {
    entries.push({
      url: `${baseUrl}/products/${place.slug}`,
      lastModified: '2026-04-10',
      changeFrequency: 'monthly',
      priority: 0.85,
      images: place.image ? [abs(place.image)] : undefined,
    });
  }

  // --- Flat product detail pages (1 per unique product) ---
  for (const product of products) {
    entries.push({
      url: `${baseUrl}/products/${product.slug}`,
      lastModified: '2026-04-10',
      changeFrequency: 'monthly',
      priority: 0.6,
      images: product.image ? [abs(product.image)] : undefined,
    });
  }

  // --- Project detail pages ---
  for (const project of projects) {
    entries.push({ url: `${baseUrl}/projects/${project.slug}`, lastModified: '2026-04-10', changeFrequency: 'monthly', priority: 0.7 });
  }

  return entries;
}
