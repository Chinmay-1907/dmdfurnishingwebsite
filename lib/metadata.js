/**
 * lib/metadata.js
 * Shared SEO metadata helpers for Next.js App Router.
 * Schema objects are ported from src/components/SEO.js and public/index.html.
 */

export const siteUrl = 'https://dmdfurnishing.com';
export const siteName = 'DMD Furnishing';

// ---------------------------------------------------------------------------
// Page-level metadata generator
// ---------------------------------------------------------------------------

/**
 * Generates a Next.js `metadata` object for a given page.
 *
 * @param {object} options
 * @param {string} options.title        - Page title (without site suffix)
 * @param {string} options.description  - Meta description
 * @param {string} options.path         - URL path, e.g. "/products/hotel"
 * @param {string} [options.image]      - Image URL (absolute or root-relative)
 * @param {string} [options.type]       - OG type, defaults to "website"
 * @returns {import('next').Metadata}
 */
export function generatePageMetadata({
  title,
  description,
  path,
  image,
  type = 'website',
}) {
  const canonicalUrl = `${siteUrl}${path}`;
  const resolvedImage = image
    ? image.startsWith('http')
      ? image
      : `${siteUrl}${image}`
    : `${siteUrl}/DMD_Furnishing_Logo_Embedded.svg`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${title} | ${siteName}`,
      description,
      url: canonicalUrl,
      siteName,
      type,
      images: [{ url: resolvedImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${siteName}`,
      description,
      images: [resolvedImage],
    },
  };
}

// ---------------------------------------------------------------------------
// JSON-LD Schema objects (ported from src/components/SEO.js)
// ---------------------------------------------------------------------------

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${siteUrl}/#organization`,
  name: 'DMD Furnishing',
  url: siteUrl,
  email: 'Sales@DMDFurnishing.com',
  logo: {
    '@type': 'ImageObject',
    url: `${siteUrl}/DMD_Furnishing_Logo_Embedded.svg`,
    width: 300,
    height: 100,
  },
  description:
    'Custom commercial furniture manufacturer specializing in hospitality FF&E. Design, manufacturing, and installation for hotels, restaurants, offices, and institutional spaces.',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+1-617-223-7781',
    contactType: 'sales',
    areaServed: 'US',
    availableLanguage: 'en',
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: '56 Leonard St Unit 5',
    addressLocality: 'Foxboro',
    addressRegion: 'MA',
    postalCode: '02035',
    addressCountry: 'US',
  },
  sameAs: [
    'https://facebook.com/dmdfurnishing',
    'https://instagram.com/dmdfurnishing',
    'https://linkedin.com/company/dmdfurnishing',
    'https://pinterest.com/dmdfurnishing',
  ],
};

export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'DMD Furnishing',
  image: `${siteUrl}/DMD_Furnishing_Logo_Embedded.svg`,
  '@id': `${siteUrl}/#localbusiness`,
  url: siteUrl,
  telephone: '+1-617-223-7781',
  priceRange: '$$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '56 Leonard St Unit 5',
    addressLocality: 'Foxboro',
    addressRegion: 'MA',
    postalCode: '02035',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 42.0654,
    longitude: -71.2478,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday', 'Sunday'],
      opens: '10:00',
      closes: '16:00',
    },
  ],
  description:
    'Custom commercial furniture manufacturer specializing in hospitality FF&E. Design, manufacturing, and installation for hotels, restaurants, offices, and institutional spaces.',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Commercial Furniture Collections',
    url: `${siteUrl}/products`,
  },
  sameAs: [
    'https://facebook.com/dmdfurnishing',
    'https://instagram.com/dmdfurnishing',
    'https://linkedin.com/company/dmdfurnishing',
    'https://pinterest.com/dmdfurnishing',
  ],
};

// WebSite schema with SearchAction (from public/index.html)
export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${siteUrl}/#website`,
  name: siteName,
  url: siteUrl,
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${siteUrl}/products?search={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};
