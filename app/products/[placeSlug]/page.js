import { notFound } from 'next/navigation';
import { getAllPlaces, getPlaceBySlug } from '../../../lib/catalog';
import { generatePageMetadata, siteUrl } from '../../../lib/metadata';
import { CatalogPageLayout, CatalogSection } from '../../../components/products/CatalogPage';

export function generateStaticParams() {
  return getAllPlaces().map((place) => ({
    placeSlug: place.slug,
  }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const place = getPlaceBySlug(params.placeSlug);

  if (!place) {
    return generatePageMetadata({
      title: 'Products',
      description: 'Browse commercial furniture products by place.',
      path: `/products/${params.placeSlug}`,
    });
  }

  return generatePageMetadata({
    title: `${place.name} Furniture`,
    description: place.description
      ? `${place.description} Browse furniture types for ${place.name}.`
      : `Browse furniture types for ${place.name}.`,
    path: `/products/${place.slug}`,
    image: place.image,
  });
}

export default function PlaceProductsPage({ params }) {
  const place = getPlaceBySlug(params.placeSlug);

  if (!place) {
    notFound();
  }

  const itemCount = place.furnitureTypes.reduce(
    (total, furnitureType) =>
      total +
      furnitureType.subcategories.reduce(
        (subTotal, subcategory) => subTotal + subcategory.products.length,
        0,
      ),
    0,
  );

  const items = place.furnitureTypes.map((furnitureType) => ({
    key: furnitureType.slug,
    title: furnitureType.name,
    description:
      furnitureType.description ||
      `See the subcategories that make up ${furnitureType.name.toLowerCase()}.`,
    href: `/products/${place.slug}/${furnitureType.slug}`,
    image: furnitureType.image,
    imageAlt: `${furnitureType.name} in ${place.name}`,
    meta: `${furnitureType.subcategories.length} subcategories`,
  }));

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Products', item: `${siteUrl}/products` },
      { '@type': 'ListItem', position: 3, name: place.name, item: `${siteUrl}/products/${place.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <CatalogPageLayout
        breadcrumbs={[
          { label: 'Products', href: '/products' },
          { label: place.name },
        ]}
      eyebrow="Place Category"
      title={place.name}
      description={
        place.description ||
        'Browse the furniture families and subcategories built for this catalog segment.'
      }
      image={place.image}
      imageAlt={`${place.name} catalog`}
      stats={[
        { label: 'Furniture types', value: place.furnitureTypes.length },
        { label: 'Subcategories', value: place.furnitureTypes.reduce((total, furnitureType) => total + furnitureType.subcategories.length, 0) },
        { label: 'Products', value: itemCount },
      ]}
    >
      <CatalogSection
        title="Browse furniture types"
        description="Use this level to narrow the catalog to the furniture families available in this place."
        items={items}
        emptyTitle="No furniture types found"
        emptyDescription="This place exists in the catalog, but no furniture types were returned for it."
      />
      </CatalogPageLayout>
    </>
  );
}
