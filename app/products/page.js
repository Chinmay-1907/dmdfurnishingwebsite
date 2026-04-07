import Link from 'next/link';
import { getAllPlaces } from '../../lib/catalog';
import { generatePageMetadata, siteUrl } from '../../lib/metadata';
import { CatalogPageLayout, CatalogSection, CatalogCallout } from '../../components/products/CatalogPage';

const places = getAllPlaces();
const totalProducts = places.reduce((total, place) => total + countProducts(place), 0);

export const metadata = generatePageMetadata({
  title: 'Commercial Furniture Products | Hotel & Office FF&E',
  description:
    'Browse 475+ commercial furniture products by environment: hotel, restaurant, office, healthcare, educational, and residential. Custom FF&E solutions from DMD Furnishing, Foxboro MA.',
  path: '/products',
  image: places[0]?.image,
});

function countProducts(place) {
  return place.furnitureTypes.reduce(
    (total, furnitureType) =>
      total +
      furnitureType.subcategories.reduce(
        (subTotal, subcategory) => subTotal + subcategory.products.length,
        0,
      ),
    0,
  );
}

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
      description: 'Browse 475+ commercial furniture products across hotel, restaurant, office, healthcare, educational, and residential environments.',
      isPartOf: { '@id': `${siteUrl}/#website` },
      provider: { '@id': `${siteUrl}/#organization` },
    },
  ],
};

export default function ProductsPage() {
  const items = places.map((place) => ({
    key: place.slug,
    title: place.name,
    description:
      place.description ||
      'Browse furniture families and subcategories built for this environment.',
    href: `/products/${place.slug}`,
    image: place.image,
    imageAlt: `${place.name} products`,
    meta: `${place.furnitureTypes.length} furniture types`,
  }));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productsSchema) }} />
      <CatalogPageLayout
      breadcrumbs={[{ label: 'Products' }]}
      eyebrow="Catalog Overview"
      title="Commercial Furniture Products"
      description="Start with a place category, then drill into furniture types and subcategories to compare the full commercial catalog. For buying guides and specification tips, visit our blog."
      image={places[0]?.image || '/placeholder.png'}
      imageAlt="Commercial furniture collection preview"
      stats={[
        { label: 'Places', value: places.length },
        { label: 'Furniture types', value: places.reduce((total, place) => total + place.furnitureTypes.length, 0) },
        { label: 'Products', value: totalProducts },
      ]}
    >
      <CatalogSection
        title="Browse by place"
        description="Each place groups the furniture catalog into the environments and use cases that fit the space."
        items={items}
        emptyTitle="No catalog entries found"
        emptyDescription="The XML catalog did not return any places for the current build."
      />
      <CatalogCallout
        title="Need help selecting the right products?"
        description="Our FF&E project management team can guide your selection from specification through delivery."
        href="/services"
        label="Explore our services"
      />
      </CatalogPageLayout>
    </>
  );
}
