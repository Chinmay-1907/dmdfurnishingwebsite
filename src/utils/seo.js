// SEO utility: manage document title, meta tags, canonical, Open Graph,
// Twitter cards, and JSON-LD. Centralizes logic so pages can set SEO easily.
// Future: in Next.js, move to head management via app/layout and route metadata.

function upsertTag(selector, createEl) {
  let el = document.querySelector(selector);
  if (!el) {
    el = createEl();
    el.setAttribute('data-managed', 'seo');
    document.head.appendChild(el);
  }
  return el;
}

export function setDocumentTitle(title) {
  if (typeof document === 'undefined') return;
  document.title = title || 'DMD Furnishing';
}

export function setMetaDescription(description) {
  if (typeof document === 'undefined') return;
  const el = upsertTag('meta[name="description"]', () => {
    const m = document.createElement('meta');
    m.setAttribute('name', 'description');
    return m;
  });
  el.setAttribute('content', description || '');
}

export function setCanonicalUrl(url) {
  if (typeof document === 'undefined') return;
  const el = upsertTag('link[rel="canonical"]', () => {
    const l = document.createElement('link');
    l.setAttribute('rel', 'canonical');
    return l;
  });
  el.setAttribute('href', url);
}

function setOgTag(property, content) {
  if (typeof document === 'undefined') return;
  const selector = `meta[property="${property}"]`;
  const el = upsertTag(selector, () => {
    const m = document.createElement('meta');
    m.setAttribute('property', property);
    return m;
  });
  el.setAttribute('content', content || '');
}

function setTwitterTag(name, content) {
  if (typeof document === 'undefined') return;
  const selector = `meta[name="${name}"]`;
  const el = upsertTag(selector, () => {
    const m = document.createElement('meta');
    m.setAttribute('name', name);
    return m;
  });
  el.setAttribute('content', content || '');
}

export function injectJsonLd(id, json) {
  if (typeof document === 'undefined') return;
  // Remove any previous script with same id
  const prev = document.getElementById(id);
  if (prev && prev.parentNode) {
    prev.parentNode.removeChild(prev);
  }
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.id = id;
  script.setAttribute('data-managed', 'seo');
  script.text = JSON.stringify(json);
  document.head.appendChild(script);
}

export function clearManagedSeo() {
  if (typeof document === 'undefined') return;
  const nodes = Array.from(document.head.querySelectorAll('[data-managed="seo"]'));
  nodes.forEach((n) => n.parentNode && n.parentNode.removeChild(n));
}

export function setPageSEO({
  title,
  description,
  canonicalPath,
  image,
  type = 'website',
  siteName = 'DMD Furnishing',
}) {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  const origin = window.location.origin;
  const url = canonicalPath ? origin + canonicalPath : origin + window.location.pathname;

  setDocumentTitle(title);
  setMetaDescription(description);
  setCanonicalUrl(url);

  // Open Graph
  setOgTag('og:type', type);
  setOgTag('og:title', title);
  setOgTag('og:description', description);
  setOgTag('og:url', url);
  setOgTag('og:site_name', siteName);
  if (image) setOgTag('og:image', image);

  // Twitter
  setTwitterTag('twitter:card', image ? 'summary_large_image' : 'summary');
  setTwitterTag('twitter:title', title);
  setTwitterTag('twitter:description', description);
  if (image) setTwitterTag('twitter:image', image);
}

export function setBreadcrumbJsonLd(items) {
  if (!Array.isArray(items) || items.length === 0) return;
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const json = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: origin + (item.path || '/')
    }))
  };
  injectJsonLd('seo-breadcrumbs', json);
}

export function setProductJsonLd({
  name,
  description,
  image,
  urlPath,
  brand = 'DMD Furnishing',
  sku,
  offers
}) {
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const json = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image: image ? [image] : undefined,
    url: origin + (urlPath || '/'),
    brand: {
      '@type': 'Brand',
      name: brand
    },
  };
  if (sku) json.sku = sku;
  if (offers) json.offers = offers;
  injectJsonLd('seo-product', json);
}

export function setProjectJsonLd({
  name,
  description,
  image,
  urlPath,
  dateCreated,
  category
}) {
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const json = {
    '@context': 'https://schema.org',
    '@type': 'Project',
    name,
    description,
    image: image ? [image] : undefined,
    url: origin + (urlPath || '/'),
  };
  if (dateCreated) json.dateCreated = dateCreated;
  if (category) json.category = category;
  injectJsonLd('seo-project', json);
}

// Note: In Next.js, use route metadata or next/head per page and SSR.
// In CRA, call setPageSEO inside useEffect after content is ready.

