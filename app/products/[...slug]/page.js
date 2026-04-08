import { notFound } from 'next/navigation';
import ProductDetailPage from '../../../components/products/ProductDetailPage';
import { getAllProductPaths, getProductContext, getProducts } from '../../../lib/catalog';
import { generatePageMetadata, siteUrl } from '../../../lib/metadata';

function getContextFromSlug(slugParts) {
  if (!Array.isArray(slugParts) || slugParts.length !== 4) {
    return null;
  }

  const [placeSlug, furnitureTypeSlug, subcategorySlug, productSlug] = slugParts;
  return getProductContext(placeSlug, furnitureTypeSlug, subcategorySlug, productSlug);
}

function getCanonicalPath({ place, furnitureType, subcategory, product }) {
  return `/products/${place.slug}/${furnitureType.slug}/${subcategory.slug}/${product.slug}`;
}

function resolveAbsoluteImage(image) {
  if (!image) return `${siteUrl}/placeholder.png`;
  return image.startsWith('http') ? image : `${siteUrl}${image}`;
}

function buildStructuredData(context) {
  const { place, furnitureType, subcategory, product } = context;
  const canonicalPath = getCanonicalPath(context);
  const canonicalUrl = `${siteUrl}${canonicalPath}`;
  const productImages = (
    product.images?.length
      ? product.images
      : [{ src: product.image || '/placeholder.png', alt: product.name }]
  )
    .filter((image) => image?.src)
    .map((image) => resolveAbsoluteImage(image.src));

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
          { '@type': 'ListItem', position: 2, name: 'Products', item: `${siteUrl}/products` },
          { '@type': 'ListItem', position: 3, name: place.name, item: `${siteUrl}/products/${place.slug}` },
          {
            '@type': 'ListItem',
            position: 4,
            name: furnitureType.name,
            item: `${siteUrl}/products/${place.slug}/${furnitureType.slug}`,
          },
          {
            '@type': 'ListItem',
            position: 5,
            name: subcategory.name,
            item: `${siteUrl}/products/${place.slug}/${furnitureType.slug}/${subcategory.slug}`,
          },
          { '@type': 'ListItem', position: 6, name: product.name, item: canonicalUrl },
        ],
      },
      {
        '@type': 'Product',
        '@id': canonicalUrl,
        url: canonicalUrl,
        name: product.name,
        description:
          product.description ||
          `${product.name} for ${subcategory.name.toLowerCase()} applications in ${place.name.toLowerCase()} settings.`,
        image: productImages,
        sku: product.id,
        brand: {
          '@type': 'Organization',
          name: 'DMD Furnishing',
        },
        category: subcategory.name,
        manufacturer: {
          '@type': 'Organization',
          name: 'DMD Furnishing',
          '@id': `${siteUrl}/#organization`,
        },
        material:
          product.specifications?.find(
            (spec) => spec.name?.toLowerCase() === 'material'
          )?.value || undefined,
        offers: {
          '@type': 'Offer',
          url: canonicalUrl,
          price: '0',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          description: 'Quote required — contact for pricing',
          seller: {
            '@type': 'Organization',
            '@id': `${siteUrl}/#organization`,
          },
        },
        additionalProperty:
          product.specifications?.map((spec) => ({
            '@type': 'PropertyValue',
            name: spec.name,
            value: spec.value,
          })) || [],
      },
    ],
  };
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllProductPaths().map(({ placeSlug, furnitureTypeSlug, subcategorySlug, productSlug }) => ({
    slug: [placeSlug, furnitureTypeSlug, subcategorySlug, productSlug],
  }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const context = getContextFromSlug(resolvedParams.slug);

  if (!context) {
    return generatePageMetadata({
      title: 'Product',
      description: 'Browse commercial furniture product details.',
      path: `/products/${resolvedParams.slug?.join('/') || ''}`,
    });
  }

  const { place, furnitureType, subcategory, product } = context;

  return generatePageMetadata({
    title: product.name,
    description:
      product.description ||
      `${product.name} in ${subcategory.name} for ${place.name} commercial environments.`,
    path: `/products/${place.slug}/${furnitureType.slug}/${subcategory.slug}/${product.slug}`,
    image: product.image || subcategory.image || furnitureType.image || place.image,
  });
}

export default async function ProductCatchAllPage({ params }) {
  const resolvedParams = await params;
  const context = getContextFromSlug(resolvedParams.slug);

  if (!context) {
    notFound();
  }

  const { place, furnitureType, subcategory, product } = context;
  const siblingProducts = getProducts(place.slug, furnitureType.slug, subcategory.slug);
  const relatedProducts = siblingProducts
    .filter((p) => p.slug !== product.slug)
    .slice(0, 6);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildStructuredData(context)) }}
      />
      <ProductDetailPage
        place={place}
        furnitureType={furnitureType}
        subcategory={subcategory}
        product={product}
        relatedProducts={relatedProducts}
      />
    </>
  );
}
