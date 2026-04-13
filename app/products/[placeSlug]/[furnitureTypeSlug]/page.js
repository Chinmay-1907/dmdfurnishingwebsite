import { notFound } from 'next/navigation';
import {
  getAllPlaces,
  getFurnitureTypes,
  getPlaceBySlug,
  getAllProductsFlat,
  getFilterOptions,
} from '../../../../lib/catalog';
import { generatePageMetadata, siteUrl } from '../../../../lib/metadata';
import ProductCatalog from '../../../../components/products/ProductCatalog';

const allProducts = getAllProductsFlat();
const filterOptions = getFilterOptions();

export function generateStaticParams() {
  const params = [];
  for (const place of getAllPlaces()) {
    for (const furnitureType of getFurnitureTypes(place.slug)) {
      params.push({
        placeSlug: place.slug,
        furnitureTypeSlug: furnitureType.slug,
      });
    }
  }
  return params;
}

export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { placeSlug, furnitureTypeSlug } = await params;
  const place = getPlaceBySlug(placeSlug);
  const furnitureType = place?.furnitureTypes.find((item) => item.slug === furnitureTypeSlug);

  if (!place || !furnitureType) {
    return generatePageMetadata({
      title: 'Products',
      description: 'Browse commercial furniture products.',
      path: `/products/${placeSlug}/${furnitureTypeSlug}`,
    });
  }

  const fullTitle = `${furnitureType.name} for ${place.name}`;
  const rawTitle = fullTitle.length > 41 ? furnitureType.name : fullTitle;

  return generatePageMetadata({
    title: rawTitle,
    description: furnitureType.description
      ? `${furnitureType.description.slice(0, 120)} Browse ${furnitureType.name.toLowerCase()} for ${place.name.toLowerCase()}.`
      : `Browse ${furnitureType.name.toLowerCase()} products for ${place.name.toLowerCase()} environments.`,
    path: `/products/${place.slug}/${furnitureType.slug}`,
    image: furnitureType.image || place.image,
  });
}

export default async function FurnitureTypeProductsPage({ params }) {
  const { placeSlug, furnitureTypeSlug } = await params;
  const place = getPlaceBySlug(placeSlug);

  if (!place) notFound();

  const furnitureType = place.furnitureTypes.find((item) => item.slug === furnitureTypeSlug);
  if (!furnitureType) notFound();

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Products', item: `${siteUrl}/products` },
      { '@type': 'ListItem', position: 3, name: place.name, item: `${siteUrl}/products/${place.slug}` },
      { '@type': 'ListItem', position: 4, name: furnitureType.name, item: `${siteUrl}/products/${place.slug}/${furnitureType.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <ProductCatalog
        products={allProducts}
        filterOptions={filterOptions}
        initialFilters={{ space: place.slug, furnitureType: furnitureType.slug }}
        heroTitle={`${furnitureType.name} for ${place.name}`}
        heroDescription={furnitureType.description || `Browse all ${furnitureType.name.toLowerCase()} products available for ${place.name.toLowerCase()} environments.`}
      />
    </>
  );
}
