import { getAllProductsFlat, getFilterOptions } from '../../lib/catalog';
import { generatePageMetadata, siteUrl } from '../../lib/metadata';
import ProductCatalog from '../../components/products/ProductCatalog';

const products = getAllProductsFlat();
const filterOptions = getFilterOptions();

export const metadata = generatePageMetadata({
  title: 'Commercial Furniture Products | Hotel & Office FF&E',
  description:
    `Browse ${products.length}+ commercial furniture products by environment: hotel, restaurant, office, healthcare, educational, and residential. Custom FF&E solutions from DMD Furnishing, Foxboro MA.`,
  path: '/products',
  image: '/Images/Our_Products.jpg',
});

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
