# Skill: seo-programmatic — dmdredesign.netlify.app
**Date:** 2026-04-09 | **Status:** COMPLETE

## Summary
Programmatic SEO audit of DMD Furnishing's auto-generated product pages. Over 180 product pages are generated from XML data, creating significant thin content risk. A slug mismatch bug causes 53 dead URLs in the sitemap, and while the page template structure is decent, auto-generated descriptions are generic and lack differentiation.

## Key Findings
- **180+ product pages** generated programmatically from XML product data source
- **Thin content risk:** Most product pages contain fewer than 150 words of unique content — well below the 300-word minimum recommended for indexable pages
- **Slug mismatch bug:** Product URL slugs in the sitemap do not match the actual generated routes for 53 products in the /products/school/* and /products/university/* paths, resulting in 404 errors
- **Template quality:** The product page template includes proper H1, product image, description, specs table, and category breadcrumbs — structurally sound
- **Duplicate descriptions:** Many products in the same category share nearly identical auto-generated descriptions with only the product name swapped
- **No internal cross-linking:** Product pages do not link to related products, reducing crawl efficiency and user engagement
- **Missing product schema:** Some auto-generated pages lack complete Product structured data (missing price, availability, brand fields)

## Recommendations
- Fix the slug generation logic to eliminate the 53 dead URLs — ensure XML source slugs match Next.js dynamic route params
- Enrich product descriptions to 300+ words with unique content per product — include materials, dimensions, use cases, and care instructions
- Add "Related Products" and "Also in this Collection" sections to each product page for internal linking
- Implement complete Product schema (JSON-LD) on every product page with brand, description, image, and category
- Add unique meta descriptions per product — do not rely on truncated auto-generated descriptions
- Consider adding customer/designer testimonials or project photos to product pages for unique content signals
