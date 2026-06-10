import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getAllPlaces,
  getPlaceBySlug,
  getAllProductsFlat,
} from '../../../../lib/catalog';
import { generatePageMetadata, siteUrl } from '../../../../lib/metadata';
import ProductCard from '../../../../components/products/ProductCard';
import Breadcrumbs from '../../../../components/Breadcrumbs';
import styles from '../../../../components/products/catalog-new.module.css';

/**
 * Mid-tier landing pages: /products/{place}/{furnitureType}
 * Targets mid-tail queries (hotel guest room furniture, office workstations...)
 * that previously had no landing page. Only (place, type) pairs with >= 3
 * products are generated — thin-content gate.
 */

const MIN_PRODUCTS = 3;
const allProducts = getAllProductsFlat();

function titleize(slug) {
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

// Some XML type names are raw slugs (e.g. "hotel-seating") — normalize for display.
function typeDisplayName(ft) {
  return /-/.test(ft.name) ? titleize(ft.slug) : ft.name;
}

// Keyword-form place names for titles ("Hotels & Motels" -> "Hotel").
const SHORT_PLACE = {
  hotel: 'Hotel',
  hospital: 'Hospital',
  restaurant: 'Restaurant',
  office: 'Office',
  residential: 'Residential',
  'lobby-area': 'Lobby',
  'educational-facilities': 'School',
};

function shortPlaceName(place) {
  return SHORT_PLACE[place.slug] || place.name;
}

// "Hotel" + "Hotel Seating" -> "Hotel Seating"; "Lobby" + "Lobby Furniture"
// -> "Lobby Furniture"; appends "Furniture" unless the name already implies it.
function pageTitle(place, ft) {
  const placeTokens = shortPlaceName(place).split(/\s+/);
  const typeTokens = typeDisplayName(ft)
    .split(/\s+/)
    .filter((t) => !placeTokens.some((p) => p.toLowerCase() === t.toLowerCase()));
  let title = [...placeTokens, ...typeTokens].join(' ');
  if (!/seating|workstations|furniture/i.test(title)) title += ' Furniture';
  return title;
}

function productsFor(placeSlug, typeSlug) {
  return allProducts.filter((p) =>
    p.memberships?.some((m) => m.placeSlug === placeSlug && m.furnitureTypeSlug === typeSlug)
  );
}

function eligiblePairs() {
  const pairs = [];
  for (const place of getAllPlaces()) {
    for (const ft of place.furnitureTypes) {
      if (productsFor(place.slug, ft.slug).length >= MIN_PRODUCTS) {
        pairs.push({ place, ft });
      }
    }
  }
  return pairs;
}

export function generateStaticParams() {
  return eligiblePairs().map(({ place, ft }) => ({
    placeSlug: place.slug,
    typeSlug: ft.slug,
  }));
}

export const dynamicParams = false;

function pageDescription(place, ft, products) {
  const subs = [...new Set(products.map((p) => {
    const m = p.memberships.find(
      (x) => x.placeSlug === place.slug && x.furnitureTypeSlug === ft.slug
    );
    return m?.subcategoryName;
  }).filter(Boolean))];
  const subList = subs.slice(0, 4).join(', ').toLowerCase();
  return `${products.length} contract-grade ${typeDisplayName(ft).toLowerCase()} products for ${place.name.toLowerCase()} projects — ${subList}. Custom sizes, finishes, and volume pricing from DMD Furnishing.`;
}

export async function generateMetadata({ params }) {
  const { placeSlug, typeSlug } = await params;
  const place = getPlaceBySlug(placeSlug);
  const ft = place?.furnitureTypes.find((f) => f.slug === typeSlug);
  if (!place || !ft) return {};
  const products = productsFor(placeSlug, typeSlug);
  return generatePageMetadata({
    title: pageTitle(place, ft),
    description: pageDescription(place, ft, products),
    path: `/products/${placeSlug}/${typeSlug}`,
    image: ft.image || place.image,
  });
}

function buildSchema(place, ft, products) {
  const url = `${siteUrl}/products/${place.slug}/${ft.slug}`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
          { '@type': 'ListItem', position: 2, name: 'Products', item: `${siteUrl}/products` },
          { '@type': 'ListItem', position: 3, name: place.name, item: `${siteUrl}/products/${place.slug}` },
          { '@type': 'ListItem', position: 4, name: pageTitle(place, ft), item: url },
        ],
      },
      {
        '@type': 'CollectionPage',
        '@id': `${url}#collection`,
        url,
        name: pageTitle(place, ft),
        description: pageDescription(place, ft, products),
        isPartOf: { '@id': `${siteUrl}/#website` },
        about: { '@id': `${siteUrl}/#organization` },
        mainEntity: {
          '@type': 'ItemList',
          numberOfItems: products.length,
          itemListElement: products.map((product, idx) => ({
            '@type': 'ListItem',
            position: idx + 1,
            url: `${siteUrl}${product.href}`,
            name: product.name,
          })),
        },
      },
    ],
  };
}

export default async function FurnitureTypePage({ params }) {
  const { placeSlug, typeSlug } = await params;
  const place = getPlaceBySlug(placeSlug);
  const ft = place?.furnitureTypes.find((f) => f.slug === typeSlug);
  if (!place || !ft) notFound();

  const products = productsFor(placeSlug, typeSlug).sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  if (products.length < MIN_PRODUCTS) notFound();

  const subcategories = [...new Set(products.map((p) => {
    const m = p.memberships.find(
      (x) => x.placeSlug === placeSlug && x.furnitureTypeSlug === typeSlug
    );
    return m?.subcategoryName;
  }).filter(Boolean))];

  const siblings = eligiblePairs()
    .filter(({ place: pl, ft: f }) => pl.slug === placeSlug && f.slug !== typeSlug)
    .map(({ place: pl, ft: f }) => ({ place: pl, ft: f }));

  const title = pageTitle(place, ft);
  const schema = buildSchema(place, ft, products);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Products', href: '/products' },
          { label: place.name, href: `/products/${place.slug}` },
          { label: typeDisplayName(ft) },
        ]}
      />
      <main className={styles.catalogPage}>
        <section className={styles.catalogHero}>
          <div className={styles.heroInner}>
            <p className={styles.heroEyebrow}>
              {place.name} &rsaquo; {typeDisplayName(ft)}
            </p>
            <h1 className={styles.heroTitle}>{title}</h1>
            <p className={styles.heroDescription}>
              {products.length} contract-grade pieces for {shortPlaceName(place).toLowerCase()} projects
              {subcategories.length > 1
                ? ` across ${subcategories.slice(0, 5).join(', ').toLowerCase()}`
                : ''}
              . Every unit is built to commercial duty cycles and can be customized in size,
              finish, and upholstery to match your spec.
            </p>
            {subcategories.length > 1 && (
              <div className={styles.heroStats}>
                {subcategories.map((sub) => (
                  <div key={sub} className={styles.heroStat}>
                    <span>{sub}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Full-width grid — the catalogBody/gridArea pair is reserved for the
            filter-sidebar layout and would squeeze the grid into one column. */}
        <section style={{ width: 'min(1200px, 92vw)', margin: '0 auto', padding: '2.5rem 0 3rem' }}>
          <h2 className="sr-only">{title} products</h2>
          <div className={styles.productGrid}>
            {products.map((product, index) => (
              <ProductCard key={product.slug} product={product} priority={index < 3} />
            ))}
          </div>
        </section>

        <section className={styles.crawlIndex} aria-label={`More ${place.name} furniture categories`}>
          <div className={styles.crawlIndexInner}>
            <h2>More {shortPlaceName(place).toLowerCase()} furniture</h2>
            <ul className={styles.crawlLinks}>
              <li>
                <Link href={`/products/${place.slug}`}>All {place.name} furniture</Link>
              </li>
              {siblings.map(({ ft: f }) => (
                <li key={f.slug}>
                  <Link href={`/products/${place.slug}/${f.slug}`}>
                    {pageTitle(place, f)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className={styles.catalogCta}>
          <div className={styles.ctaInner}>
            <h2>Specifying {typeDisplayName(ft).toLowerCase()} for a {shortPlaceName(place).toLowerCase()} project?</h2>
            <p>
              Send your drawings or quantities and we&apos;ll quote materials, finishes, and
              lead times within two business days.
            </p>
            <div className={styles.ctaActions}>
              <Link href="/contact#message" className={styles.ctaPrimary}>
                Request a Quote
              </Link>
              <Link href="/contact" className={styles.ctaSecondary}>
                Talk to a Project Manager
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
