import { notFound } from 'next/navigation';
import {
  getAllPlaces,
  getFurnitureTypes,
  getPlaceBySlug,
  getProducts,
  getSubcategories,
} from '../../../../../lib/catalog';
import { generatePageMetadata, siteUrl } from '../../../../../lib/metadata';
import { CatalogPageLayout, CatalogSection } from '../../../../../components/products/CatalogPage';

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
  const place = getPlaceBySlug(params.placeSlug);
  const furnitureType = place?.furnitureTypes.find((item) => item.slug === params.furnitureTypeSlug);
  const subcategory = furnitureType?.subcategories.find((item) => item.slug === params.subcategorySlug);

  if (!place || !furnitureType || !subcategory) {
    return generatePageMetadata({
      title: 'Products',
      description: 'Browse commercial furniture products by subcategory.',
      path: `/products/${params.placeSlug}/${params.furnitureTypeSlug}/${params.subcategorySlug}`,
    });
  }

  return generatePageMetadata({
    title: `${subcategory.name} in ${furnitureType.name}`,
    description: subcategory.description
      ? `${subcategory.description} Browse the products inside ${subcategory.name} for ${place.name}.`
      : `Browse the products inside ${subcategory.name} for ${place.name}.`,
    path: `/products/${place.slug}/${furnitureType.slug}/${subcategory.slug}`,
    image: subcategory.image || furnitureType.image || place.image,
  });
}

export default function SubcategoryProductsPage({ params }) {
  const place = getPlaceBySlug(params.placeSlug);

  if (!place) {
    notFound();
  }

  const furnitureType = place.furnitureTypes.find((item) => item.slug === params.furnitureTypeSlug);

  if (!furnitureType) {
    notFound();
  }

  const subcategory = furnitureType.subcategories.find((item) => item.slug === params.subcategorySlug);

  if (!subcategory) {
    notFound();
  }

  const products = getProducts(place.slug, furnitureType.slug, subcategory.slug);

  const items = products.map((product) => ({
    key: product.slug,
    title: product.name,
    description: product.description || 'Commercial product detail summary available in the catalog.',
    href: `/products/${place.slug}/${furnitureType.slug}/${subcategory.slug}/${product.slug}`,
    image: product.image || subcategory.image || furnitureType.image || place.image,
    imageAlt: `${product.name} product`,
    meta: product.specifications.length
      ? `${product.specifications.length} specifications`
      : 'Catalog product',
    tags: product.tags,
  }));

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
      <CatalogPageLayout
        breadcrumbs={[
          { label: 'Products', href: '/products' },
          { label: place.name, href: `/products/${place.slug}` },
          { label: furnitureType.name, href: `/products/${place.slug}/${furnitureType.slug}` },
          { label: subcategory.name },
        ]}
      eyebrow="Subcategory"
      title={subcategory.name}
      description={
        subcategory.description ||
        `Browse the products available within ${subcategory.name} for ${place.name}.`
      }
      image={subcategory.image || furnitureType.image || place.image}
      imageAlt={`${subcategory.name} catalog`}
      stats={[
        { label: 'Products', value: products.length },
        { label: 'Furniture type', value: furnitureType.name },
        { label: 'Place', value: place.name },
      ]}
    >
      <CatalogSection
        title="Browse products"
        description="Review the products in this subcategory, then open a detail page for imagery, specifications, and the full catalog context."
        items={items}
        emptyTitle="No products found"
        emptyDescription="This subcategory exists in the catalog, but no products were returned for it."
      />
      </CatalogPageLayout>
    </>
  );
}
