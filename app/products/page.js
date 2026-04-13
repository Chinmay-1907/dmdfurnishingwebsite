import { getAllProductsFlat, getFilterOptions } from '../../lib/catalog';
import { generatePageMetadata, siteUrl } from '../../lib/metadata';
import ProductCatalog from '../../components/products/ProductCatalog';

const products = getAllProductsFlat();
const filterOptions = getFilterOptions();

export const metadata = generatePageMetadata({
  title: 'Commercial Furniture Catalog',
  description:
    `Browse ${products.length}+ commercial furniture products for hotels, restaurants, offices, and healthcare. Contract-grade FF&E. Request custom specs.`,
  path: '/products',
  image: '/Images/Our_Products.jpg',
});

const faqs = [
  {
    question: 'What types of commercial furniture does DMD Furnishing manufacture?',
    answer:
      'DMD Furnishing manufactures a full range of commercial FF&E: casegoods, lounge and dining seating, banquettes, occasional and dining tables, headboards, built-in millwork and custom cabinetry. We produce these categories for hospitality, restaurant, corporate office, healthcare, education and multi-family projects, supplying both guestroom and public-area furniture packages.',
  },
  {
    question: 'Can DMD produce custom furniture to match our design specs?',
    answer:
      'Yes. Custom manufacturing is our core capability. We work directly from designer BOQs, construction drawings, finish schedules and brand standards to build furniture to your exact specifications. Our team can prototype pieces, suggest value-engineering options where it helps budget or lead time, and match wood species, fabrics, laminates and metal finishes across an entire project.',
  },
  {
    question: 'How do I request a quote for a furniture project?',
    answer:
      'Send your drawings, BOQ or project brief through our contact page, or request a consultation through the schedule-a-call page. A project manager will review the scope, ask any clarifying questions about quantities, finishes and timeline, then return a detailed quote.',
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
      name: 'Commercial Furniture Products',
      description: `Browse ${products.length}+ commercial furniture products across hotel, restaurant, office, healthcare, educational, and residential environments.`,
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
