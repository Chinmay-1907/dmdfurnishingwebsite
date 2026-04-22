import { notFound } from 'next/navigation';
import {
  getAllPlaces,
  getPlaceBySlug,
  getAllProductsFlat,
  getAllProductSlugs,
  getFilterOptions,
  getProductBySlug,
  getRelatedProducts,
  isProductSlug,
} from '../../../lib/catalog';
import { generatePageMetadata, siteUrl } from '../../../lib/metadata';
import { placeContent } from '../../../lib/place-content';
import ProductCatalog from '../../../components/products/ProductCatalog';
import CategoryContentBlock from '../../../components/products/CategoryContentBlock';
import ProductDetailPage from '../../../components/products/ProductDetailPage';
import Breadcrumbs from '../../../components/Breadcrumbs';

/**
 * Single-segment dispatcher at /products/[slug].
 *
 * The param `placeSlug` is named that way for legacy reasons — the folder name is
 * still [placeSlug] to avoid a filesystem rename in this refactor. It now accepts
 * any slug and dispatches:
 *   1. If the slug matches a place -> render the category listing (as before)
 *   2. If the slug matches a flat product -> render the product detail page
 *   3. Otherwise -> 404
 *
 * The old 4-segment hierarchical product URLs (/products/hotel/seating/sofa/3-seater-sofa)
 * redirect to the new flat URL via netlify.toml.
 */

const allProducts = getAllProductsFlat();
const filterOptions = getFilterOptions();

export function generateStaticParams() {
  // Build both place pages and flat product pages from one dynamic route.
  const places = getAllPlaces().map((place) => ({ placeSlug: place.slug }));
  const products = getAllProductSlugs().map((slug) => ({ placeSlug: slug }));
  return [...places, ...products];
}

export const dynamicParams = false;

// --- Per-category metadata overrides (vertical-specific primary keywords) ---
const placeMetaOverrides = {
  hotel: {
    title: 'Hotel Furniture & Casegoods',
    description:
      'Contract-grade hotel guestroom casegoods, headboards, desks, and lobby seating. Custom manufacturer for boutique and branded hotels.',
  },
  restaurant: {
    title: 'Restaurant Furniture & Seating',
    description:
      'Custom restaurant banquettes, booths, dining chairs, and bar stools. Fire safety compliant. Built for U.S. restaurant operators.',
  },
  office: {
    title: 'Office Furniture & Workstations',
    description:
      'Commercial-grade task seating, height-adjustable workstations, conference tables, and collaboration lounge for corporate fit-outs and coworking.',
  },
  hospital: {
    title: 'Healthcare Furniture',
    description:
      'Bleach-cleanable healthcare furniture for hospitals, clinics, and medical offices. Bariatric seating, patient room casegoods, and performance upholstery.',
  },
  'educational-facilities': {
    title: 'Educational Facility Furniture',
    description:
      'Classroom seating, dormitory wardrobes, library carrels, and active-learning furniture for K-12 and higher education. Contract-grade.',
  },
  residential: {
    title: 'Multi-Family and Residential Furniture',
    description:
      'Multi-family and residential furniture for clubhouses, leasing offices, amenity lounges, and student housing. Contract-grade fabrics and construction.',
  },
  'lobby-area': {
    title: 'Lobby & Reception Furniture',
    description:
      'Custom reception desks, lounge seating, and feature tables for hotel, corporate, healthcare, and multi-family lobbies. ADA coordinated.',
  },
};

export async function generateMetadata({ params }) {
  const { placeSlug: slug } = await params;

  // Product detail path
  if (isProductSlug(slug)) {
    const product = getProductBySlug(slug);
    if (!product) {
      return generatePageMetadata({
        title: 'Product',
        description: 'Browse commercial furniture product details.',
        path: `/products/${slug}`,
      });
    }
    const primary = product.primary;
    return generatePageMetadata({
      title: product.name,
      description:
        product.description ||
        `${product.name}, commercial-grade ${primary?.subcategoryName?.toLowerCase() || 'furniture'} built for ${primary?.placeName?.toLowerCase() || 'commercial spaces'}.`,
      path: `/products/${slug}`,
      image: product.image,
    });
  }

  // Place listing path
  const place = getPlaceBySlug(slug);
  if (!place) {
    return generatePageMetadata({
      title: 'Products',
      description: 'Browse commercial furniture products by category.',
      path: `/products/${slug}`,
    });
  }

  const override = placeMetaOverrides[place.slug];
  return generatePageMetadata({
    title: override?.title || `${place.name} Furniture`,
    description:
      override?.description ||
      (place.description
        ? `${place.description} Browse all ${place.name.toLowerCase()} furniture products.`
        : `Browse all furniture products for ${place.name.toLowerCase()} environments.`),
    path: `/products/${place.slug}`,
    image: place.image,
  });
}

function buildProductStructuredData(product) {
  const primary = product.primary;
  const canonicalPath = `/products/${product.slug}`;
  const canonicalUrl = `${siteUrl}${canonicalPath}`;
  const productImages = (
    product.images?.length
      ? product.images
      : [{ src: product.image || '/placeholder.png', alt: product.name }]
  )
    .filter((image) => image?.src)
    .map((image) => (image.src.startsWith('http') ? image.src : `${siteUrl}${image.src}`));

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
          { '@type': 'ListItem', position: 2, name: 'Products', item: `${siteUrl}/products` },
          ...(primary?.placeSlug
            ? [
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: primary.placeName,
                  item: `${siteUrl}/products/${primary.placeSlug}`,
                },
                { '@type': 'ListItem', position: 4, name: product.name, item: canonicalUrl },
              ]
            : [{ '@type': 'ListItem', position: 3, name: product.name, item: canonicalUrl }]),
        ],
      },
      {
        '@type': 'Product',
        '@id': canonicalUrl,
        url: canonicalUrl,
        name: product.name,
        description:
          product.description ||
          `${product.name}, commercial-grade furniture for ${primary?.placeName?.toLowerCase() || 'commercial'} environments.`,
        image: productImages,
        sku: product.id || product.slug,
        brand: { '@type': 'Organization', name: 'DMD Furnishing' },
        category: primary?.subcategoryName || 'Commercial Furniture',
        manufacturer: {
          '@type': 'Organization',
          name: 'DMD Furnishing',
          '@id': `${siteUrl}/#organization`,
        },
        material:
          product.specifications?.find((spec) => spec.name?.toLowerCase() === 'material')?.value ||
          undefined,
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

function buildPlaceStructuredData(place, content, placeProducts) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
          { '@type': 'ListItem', position: 2, name: 'Products', item: `${siteUrl}/products` },
          { '@type': 'ListItem', position: 3, name: place.name, item: `${siteUrl}/products/${place.slug}` },
        ],
      },
      {
        '@type': 'CollectionPage',
        '@id': `${siteUrl}/products/${place.slug}#collection`,
        url: `${siteUrl}/products/${place.slug}`,
        name: `${place.name} Furniture: Commercial FF&E Collection`,
        description:
          content?.intro ||
          place.description ||
          `Commercial furniture collection for ${place.name.toLowerCase()} environments.`,
        isPartOf: { '@id': `${siteUrl}/#website` },
        about: { '@id': `${siteUrl}/#organization` },
        mainEntity: {
          '@type': 'ItemList',
          numberOfItems: placeProducts.length,
          itemListElement: placeProducts.slice(0, 20).map((product, idx) => ({
            '@type': 'ListItem',
            position: idx + 1,
            url: `${siteUrl}/products/${product.slug}`,
            name: product.name,
          })),
        },
      },
      ...(content?.faqs
        ? [
            {
              '@type': 'FAQPage',
              '@id': `${siteUrl}/products/${place.slug}#faq`,
              mainEntity: content.faqs.map((faq) => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: { '@type': 'Answer', text: faq.answer },
              })),
            },
          ]
        : []),
    ],
  };
}

export default async function ProductsDispatchPage({ params }) {
  const { placeSlug: slug } = await params;

  // ----- Product detail branch -----
  if (isProductSlug(slug)) {
    const product = getProductBySlug(slug);
    if (!product) notFound();

    const related = getRelatedProducts(slug, 6);
    const schema = buildProductStructuredData(product);

    const primary = product.primary;
    const productCrumbs = [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      ...(primary?.placeSlug
        ? [{ label: primary.placeName, href: `/products/${primary.placeSlug}` }]
        : []),
      { label: product.name },
    ];

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <Breadcrumbs items={productCrumbs} />
        <ProductDetailPage product={product} relatedProducts={related} />
      </>
    );
  }

  // ----- Place listing branch -----
  const place = getPlaceBySlug(slug);
  if (!place) notFound();

  const placeProducts = allProducts.filter((p) => p.placeSlugs.includes(place.slug));
  const content = placeContent[place.slug];
  const schema = buildPlaceStructuredData(place, content, placeProducts);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Products', href: '/products' },
          { label: place.name },
        ]}
      />
      <ProductCatalog
        products={allProducts}
        filterOptions={filterOptions}
        initialFilters={{ space: place.slug }}
        heroTitle={`${place.name} Furniture`}
        heroDescription={
          place.description ||
          `Browse all ${placeProducts.length} furniture products designed for ${place.name.toLowerCase()} environments.`
        }
      />
      <CategoryContentBlock placeName={place.name} content={content} />
    </>
  );
}
