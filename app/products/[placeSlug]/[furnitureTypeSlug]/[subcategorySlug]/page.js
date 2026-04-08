import { notFound } from 'next/navigation';
import {
  getAllPlaces,
  getFurnitureTypes,
  getPlaceBySlug,
  getSubcategories,
  getAllProductsFlat,
  getFilterOptions,
} from '../../../../../lib/catalog';
import { generatePageMetadata, siteUrl } from '../../../../../lib/metadata';
import ProductCatalog from '../../../../../components/products/ProductCatalog';

const allProducts = getAllProductsFlat();
const filterOptions = getFilterOptions();

export function generateStaticParams() {
  const params = [];
  for (const place of getAllPlaces()) {
    for (const furnitureType of getFurnitureTypes(place.slug)) {
      for (const subcategory of getSubcategories(place.slug, furnitureType.slug)) {
        params.push({
          placeSlug: place.slug,
          furnitureTypeSlug: furnitureType.slug,
          subcategorySlug: subcategory.slug,
        });
      }
    }
  }
  return params;
}

export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { placeSlug, furnitureTypeSlug, subcategorySlug } = await params;
  const place = getPlaceBySlug(placeSlug);
  const furnitureType = place?.furnitureTypes.find((item) => item.slug === furnitureTypeSlug);
  const subcategory = furnitureType?.subcategories.find((item) => item.slug === subcategorySlug);

  if (!place || !furnitureType || !subcategory) {
    return generatePageMetadata({
      title: 'Products',
      description: 'Browse commercial furniture products.',
      path: `/products/${placeSlug}/${furnitureTypeSlug}/${subcategorySlug}`,
    });
  }

  return generatePageMetadata({
    title: `${subcategory.name} | ${furnitureType.name} for ${place.name}`,
    description: subcategory.description
      ? `${subcategory.description} Browse ${subcategory.name.toLowerCase()} products for ${place.name.toLowerCase()}.`
      : `Browse ${subcategory.name.toLowerCase()} products for ${place.name.toLowerCase()} environments.`,
    path: `/products/${place.slug}/${furnitureType.slug}/${subcategory.slug}`,
    image: subcategory.image || furnitureType.image || place.image,
  });
}

export default async function SubcategoryProductsPage({ params }) {
  const { placeSlug, furnitureTypeSlug, subcategorySlug } = await params;
  const place = getPlaceBySlug(placeSlug);

  if (!place) notFound();

  const furnitureType = place.furnitureTypes.find((item) => item.slug === furnitureTypeSlug);
  if (!furnitureType) notFound();

  const subcategory = furnitureType.subcategories.find((item) => item.slug === subcategorySlug);
  if (!subcategory) notFound();

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Products', item: `${siteUrl}/products` },
      { '@type': 'ListItem', position: 3, name: place.name, item: `${siteUrl}/products/${place.slug}` },
      { '@type': 'ListItem', position: 4, name: furnitureType.name, item: `${siteUrl}/products/${place.slug}/${furnitureType.slug}` },
      { '@type': 'ListItem', position: 5, name: subcategory.name, item: `${siteUrl}/products/${place.slug}/${furnitureType.slug}/${subcategory.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <ProductCatalog
        products={allProducts}
        filterOptions={filterOptions}
        initialFilters={{ space: place.slug, furnitureType: furnitureType.slug, subcategory: `${place.slug}/${furnitureType.slug}/${subcategory.slug}` }}
        heroTitle={`${subcategory.name} — ${furnitureType.name}`}
        heroDescription={subcategory.description || `Browse all ${subcategory.name.toLowerCase()} products within ${furnitureType.name.toLowerCase()} for ${place.name.toLowerCase()}.`}
      />
    </>
  );
}
