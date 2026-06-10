import Link from 'next/link';
import { getAllProductsFlat, getFilterOptions } from '../../lib/catalog';
import { generatePageMetadata, siteUrl } from '../../lib/metadata';
import ProductCatalog from '../../components/products/ProductCatalog';
import styles from '../../components/products/catalog-new.module.css';

const products = getAllProductsFlat();
const filterOptions = getFilterOptions();

export const metadata = generatePageMetadata({
  title: 'Commercial Furniture Catalog',
  description:
    `Browse ${products.length}+ contract-grade hospitality casegoods, seating, tables, and custom hotel furniture. Request specs, finishes, and a project quote.`,
  path: '/products',
  image: '/Images/Our_Products.jpg',
});

const faqs = [
  {
    question: 'Does DMD sell individual pieces or only full FF&E packages?',
    answer:
      'Both. DMD Furnishing supplies complete Furniture, Fixtures & Equipment (FF&E) packages for hotels, restaurants, offices, and healthcare spaces. We also quote single categories when a buyer only needs casegoods, seating, tables, headboards, banquettes, or custom millwork for a specific scope.',
  },
  {
    question: 'Are products in the catalog customizable?',
    answer:
      'Yes. Every item in the catalog is a starting point. We build to your drawings, finish schedules, and brand standards. That means custom dimensions, wood species, fabrics, laminates, metal finishes, and hardware, with prototypes available before a full production run.',
  },
  {
    question: 'What are the minimum order quantities?',
    answer:
      'There is no fixed minimum. Pricing and lead time scale with volume, finish complexity, and whether a piece is built in our Foxboro shop or through a partner factory. For a single guestroom mockup or a multi property rollout, send the scope and we will return a realistic quote.',
  },
];

// Group every product by primary place → furniture type for the server-rendered
// A–Z index, so each product page has a crawlable inbound link in static HTML.
const catalogIndex = (() => {
  const placeMap = new Map();
  for (const product of [...products].sort((a, b) => a.name.localeCompare(b.name))) {
    const placeName = product.placeName || 'Other Spaces';
    if (!placeMap.has(placeName)) placeMap.set(placeName, new Map());
    const typeMap = placeMap.get(placeName);
    const typeName = product.furnitureTypeName || 'General';
    if (!typeMap.has(typeName)) typeMap.set(typeName, []);
    typeMap.get(typeName).push(product);
  }
  return [...placeMap.entries()].map(([placeName, typeMap]) => ({
    placeName,
    types: [...typeMap.entries()].map(([typeName, items]) => ({ typeName, items })),
  }));
})();

const productsSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
        { '@type': 'ListItem', position: 2, name: 'Products', item: `${siteUrl}/products` },
      ],
    },
    {
      '@type': 'CollectionPage',
      '@id': `${siteUrl}/products`,
      url: `${siteUrl}/products`,
      name: 'Commercial Furniture Catalog',
      description: `Browse ${products.length}+ hospitality casegoods, seating, tables, and custom hotel furniture across hotel, restaurant, office, healthcare, education, and residential scopes.`,
      isPartOf: { '@id': `${siteUrl}/#website` },
      provider: { '@id': `${siteUrl}/#organization` },
    },
    {
      '@type': 'FAQPage',
      '@id': `${siteUrl}/products#faq`,
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    },
  ],
};

export default function ProductsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productsSchema) }} />
      <ProductCatalog
        products={products}
        filterOptions={filterOptions}
      />

      {/* Server-rendered A–Z index. Every product link lives in static HTML so
          crawlers reach all product pages without running the client catalog. */}
      <section className={styles.crawlIndex} aria-label="Full product catalog index">
        <div className={styles.crawlIndexInner}>
          <h2>Browse the full catalog A&ndash;Z</h2>
          <p className={styles.crawlIndexLede}>
            Every product in the catalog, grouped by space and furniture type.
          </p>
          {catalogIndex.map((group) => (
            <details key={group.placeName} className={styles.crawlGroup}>
              <summary>{group.placeName}</summary>
              {group.types.map((type) => (
                <div key={type.typeName} className={styles.crawlType}>
                  <h3>{type.typeName}</h3>
                  <ul className={styles.crawlLinks}>
                    {type.items.map((product) => (
                      <li key={product.slug}>
                        <Link href={product.href}>{product.name}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </details>
          ))}
        </div>
      </section>

      {/* Visible FAQ section matching the FAQPage JSON-LD above */}
      <section className={styles.catalogFaq} aria-label="Catalog frequently asked questions">
        <div className={styles.catalogFaqInner}>
          <h2>Catalog Questions</h2>
          {faqs.map((faq) => (
            <details key={faq.question} className={styles.catalogFaqItem}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
