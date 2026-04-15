import { getAllProductsFlat, getFilterOptions } from '../../lib/catalog';
import { generatePageMetadata, siteUrl } from '../../lib/metadata';
import ProductCatalog from '../../components/products/ProductCatalog';

const products = getAllProductsFlat();
const filterOptions = getFilterOptions();

export const metadata = generatePageMetadata({
  title: 'Commercial Furniture Catalog for Hotels & Restaurants',
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
    </>
  );
}
