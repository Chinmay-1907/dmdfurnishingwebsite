import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const siteTitle = 'DMD Furnishing';
const siteUrl = 'https://dmdfurnishing.com';

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${siteUrl}/#organization`,
  'name': 'DMD Furnishing',
  'url': siteUrl,
  'email': 'Sales@DMDFurnishing.com',
  'logo': {
    '@type': 'ImageObject',
    'url': `${siteUrl}/DMD_Furnishing_Logo_Embedded.svg`,
    'width': 300,
    'height': 100
  },
  'description': 'Custom commercial furniture manufacturer specializing in hospitality FF&E. Design, manufacturing, and installation for hotels, restaurants, offices, and institutional spaces.',
  'contactPoint': {
    '@type': 'ContactPoint',
    'telephone': '+1-617-223-7781',
    'contactType': 'sales',
    'areaServed': 'US',
    'availableLanguage': 'en'
  },
  'address': {
    '@type': 'PostalAddress',
    'streetAddress': '56 Leonard St Unit 5',
    'addressLocality': 'Foxboro',
    'addressRegion': 'MA',
    'postalCode': '02035',
    'addressCountry': 'US'
  },
  'sameAs': [
    'https://facebook.com/dmdfurnishing',
    'https://instagram.com/dmdfurnishing',
    'https://linkedin.com/company/dmdfurnishing',
    'https://pinterest.com/dmdfurnishing'
  ]
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  'name': 'DMD Furnishing',
  'image': `${siteUrl}/DMD_Furnishing_Logo_Embedded.svg`,
  '@id': `${siteUrl}/#localbusiness`,
  'url': siteUrl,
  'telephone': '+1-617-223-7781',
  'priceRange': '$$$',
  'address': {
    '@type': 'PostalAddress',
    'streetAddress': '56 Leonard St Unit 5',
    'addressLocality': 'Foxboro',
    'addressRegion': 'MA',
    'postalCode': '02035',
    'addressCountry': 'US'
  },
  'geo': {
    '@type': 'GeoCoordinates',
    'latitude': 42.0654,
    'longitude': -71.2478
  },
  'openingHoursSpecification': {
    '@type': 'OpeningHoursSpecification',
    'dayOfWeek': [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday'
    ],
    'opens': '09:00',
    'closes': '18:00'
  },
  'description': 'Custom commercial furniture manufacturer specializing in hospitality FF&E. Design, manufacturing, and installation for hotels, restaurants, offices, and institutional spaces.',
  'hasOfferCatalog': {
    '@type': 'OfferCatalog',
    'name': 'Commercial Furniture Collections',
    'url': `${siteUrl}/products`
  },
  'sameAs': [
    'https://facebook.com/dmdfurnishing',
    'https://instagram.com/dmdfurnishing',
    'https://linkedin.com/company/dmdfurnishing',
    'https://pinterest.com/dmdfurnishing'
  ]
};

const SEO = ({ title, description, canonical, schema, type = 'website', image }) => {
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const location = useLocation();
  const currentUrl = canonical ? canonical : `${siteUrl}${location.pathname}`;
  const defaultImage = `${siteUrl}/DMD_Furnishing_Logo_Embedded.svg`; // Fallback image
  const metaImage = image ? (image.startsWith('http') ? image : `${siteUrl}${image}`) : defaultImage;

  useEffect(() => {
    if (fullTitle) {
      document.title = fullTitle;
    }

    function setTag(attrName, attrValue, content) {
      let el = document.head.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attrName, attrValue);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content || '');
    }

    function setLink(rel, href) {
      let link = document.head.querySelector(`link[rel="${rel}"]`);
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', rel);
        document.head.appendChild(link);
      }
      link.setAttribute('href', href);
    }

    // Basic meta
    if (description) setTag('name', 'description', description);
    if (currentUrl) setLink('canonical', currentUrl);

    // Open Graph
    setTag('property', 'og:type', type);
    setTag('property', 'og:title', fullTitle);
    if (description) setTag('property', 'og:description', description);
    setTag('property', 'og:url', currentUrl);
    setTag('property', 'og:site_name', siteTitle);
    setTag('property', 'og:image', metaImage);

    // Twitter
    setTag('name', 'twitter:card', 'summary_large_image');
    setTag('name', 'twitter:title', fullTitle);
    if (description) setTag('name', 'twitter:description', description);
    setTag('name', 'twitter:image', metaImage);

    // JSON-LD helper
    function upsertJsonLd(id, json) {
      let script = document.head.querySelector(`script[type="application/ld+json"][data-id="${id}"]`);
      if (!script) {
        script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-id', id);
        document.head.appendChild(script);
      }
      script.text = JSON.stringify(json);
    }

    // Organization schema (always)
    upsertJsonLd('organization', organizationSchema);
    upsertJsonLd('local-business', localBusinessSchema);
    // Page-specific schema (optional) - supports single object or array
    if (schema) {
      if (Array.isArray(schema)) {
        schema.forEach((s, i) => upsertJsonLd(`page-schema-${i}`, s));
        // Clean up any extra leftover page-schema tags beyond current array length
        let idx = schema.length;
        let extra;
        while ((extra = document.head.querySelector(`script[type="application/ld+json"][data-id="page-schema-${idx}"]`))) {
          extra.remove();
          idx++;
        }
        // Also remove singular page-schema if present from previous non-array usage
        const singular = document.head.querySelector(`script[type="application/ld+json"][data-id="page-schema"]`);
        if (singular) singular.remove();
      } else {
        upsertJsonLd('page-schema', schema);
      }
    } else {
      // Clean up any page-schema tags
      const existing = document.head.querySelector(`script[type="application/ld+json"][data-id="page-schema"]`);
      if (existing) existing.remove();
      let idx = 0;
      let extra;
      while ((extra = document.head.querySelector(`script[type="application/ld+json"][data-id="page-schema-${idx}"]`))) {
        extra.remove();
        idx++;
      }
    }

    // No cleanup: meta/link tags remain valid across navigation; JSON-LD is updated per call
  }, [fullTitle, description, currentUrl, type, metaImage, schema]);

  return null;
};

export default SEO;
