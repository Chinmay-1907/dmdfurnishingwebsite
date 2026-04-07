import { notFound } from 'next/navigation';
import { siteUrl } from '../../../../lib/metadata';
import {
  getAllPlaces,
  getFurnitureTypes,
  getPlaceBySlug,
  getSubcategories,
} from '../../../../lib/catalog';
import { generatePageMetadata } from '../../../../lib/metadata';
import { CatalogPageLayout, CatalogSection } from '../../../../components/products/CatalogPage';

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
  const place = getPlaceBySlug(params.placeSlug);
  const furnitureType = place?.furnitureTypes.find((item) => item.slug === params.furnitureTypeSlug);

  if (!place || !furnitureType) {
    return generatePageMetadata({
      title: 'Products',
      description: 'Browse commercial furniture products by place and furniture type.',
      path: `/products/${params.placeSlug}/${params.furnitureTypeSlug}`,
    });
  }

  return generatePageMetadata({
    title: `${furnitureType.name} in ${place.name}`,
    description: furnitureType.description
      ? `${furnitureType.description} Browse subcategories within ${furnitureType.name} for ${place.name}.`
      : `Browse subcategories within ${furnitureType.name} for ${place.name}.`,
    path: `/products/${place.slug}/${furnitureType.slug}`,
    image: furnitureType.image || place.image,
  });
}

export default function FurnitureTypeProductsPage({ params }) {
  const place = getPlaceBySlug(params.placeSlug);

  if (!place) {
    notFound();
  }

  const furnitureType = place.furnitureTypes.find((item) => item.slug === params.furnitureTypeSlug);

  if (!furnitureType) {
    notFound();
  }

  const subcategories = getSubcategories(place.slug, furnitureType.slug);
  const productCount = subcategories.reduce((total, subcategory) => total + subcategory.products.length, 0);

  const items = subcategories.map((subcategory) => ({
    key: subcategory.slug,
    title: subcategory.name,
    description:
      subcategory.description ||
      `Browse the products available in ${subcategory.name.toLowerCase()}.`,
    href: `/products/${place.slug}/${furnitureType.slug}/${subcategory.slug}`,
    image: subcategory.image || furnitureType.image || place.image,
    imageAlt: `${subcategory.name} in ${furnitureType.name}`,
    meta: `${subcategory.products.length} products`,
  }));

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
      <CatalogPageLayout
        breadcrumbs={[
          { label: 'Products', href: '/products' },
          { label: place.name, href: `/products/${place.slug}` },
          { label: furnitureType.name },
        ]}
      eyebrow="Furniture Type"
      title={furnitureType.name}
      description={
        furnitureType.description ||
        `Browse the subcategories available within ${furnitureType.name} for ${place.name}.`
      }
      image={furnitureType.image || place.image}
      imageAlt={`${furnitureType.name} catalog`}
      stats={[
        { label: 'Subcategories', value: subcategories.length },
        { label: 'Products', value: productCount },
        { label: 'Place', value: place.name },
      ]}
    >
      <CatalogSection
        title="Browse subcategories"
        description="Each subcategory narrows the catalog to a more specific furniture application."
        items={items}
        emptyTitle="No subcategories found"
        emptyDescription="This furniture type exists in the catalog, but no subcategories were returned for it."
      />
      </CatalogPageLayout>
    </>
  );
}
