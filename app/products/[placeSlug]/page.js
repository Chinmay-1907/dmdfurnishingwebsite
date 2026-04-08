import { notFound } from 'next/navigation';
import { getAllPlaces, getPlaceBySlug, getAllProductsFlat, getFilterOptions } from '../../../lib/catalog';
import { generatePageMetadata, siteUrl } from '../../../lib/metadata';
import ProductCatalog from '../../../components/products/ProductCatalog';

const allProducts = getAllProductsFlat();
const filterOptions = getFilterOptions();

export function generateStaticParams() {
  return getAllPlaces().map((place) => ({
    placeSlug: place.slug,
  }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { placeSlug } = await params;
  const place = getPlaceBySlug(placeSlug);

  if (!place) {
    return generatePageMetadata({
      title: 'Products',
      description: 'Browse commercial furniture products by place.',
      path: `/products/${placeSlug}`,
    });
  }

  return generatePageMetadata({
    title: `${place.name} Furniture | Commercial FF&E Products`,
    description: place.description
      ? `${place.description} Browse all ${place.name.toLowerCase()} furniture products.`
      : `Browse all furniture products for ${place.name.toLowerCase()} environments.`,
    path: `/products/${place.slug}`,
    image: place.image,
  });
}

export default async function PlaceProductsPage({ params }) {
  const { placeSlug } = await params;
  const place = getPlaceBySlug(placeSlug);

  if (!place) {
    notFound();
  }

  const placeProducts = allProducts.filter((p) => p.placeSlug === place.slug);

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
      <ProductCatalog
        products={allProducts}
        filterOptions={filterOptions}
        initialFilters={{ space: place.slug }}
        heroTitle={`${place.name} Furniture`}
        heroDescription={place.description || `Browse all ${placeProducts.length} furniture products designed for ${place.name.toLowerCase()} environments.`}
      />
    </>
  );
}
