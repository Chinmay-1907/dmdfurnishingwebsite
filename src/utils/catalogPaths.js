export function normalizeCatalogImagePath(rawPath, fallback = '/placeholder.png') {
  if (!rawPath) {
    return fallback;
  }

  let normalized = rawPath.replace(/\\/g, '/').trim();

  if (!normalized) {
    return fallback;
  }

  normalized = normalized.replace(/\/{2,}/g, '/');

  if (!normalized.startsWith('/')) {
    normalized = `/${normalized}`;
  }

  return normalized;
}

// Convert catalog IDs/names to a canonical slug for URLs and matching
export function toCatalogSlug(str) {
  if (!str && str !== 0) return '';
  return String(str)
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-]/g, '');
}

// Compare an XML id/name to a URL param, normalizing both via slug rules
export function idsMatch(xmlIdOrName, urlParam) {
  if (!xmlIdOrName || !urlParam) return false;
  try {
    const a = toCatalogSlug(xmlIdOrName);
    const b = toCatalogSlug(decodeURIComponent(urlParam));
    return a === b;
  } catch {
    return toCatalogSlug(xmlIdOrName) === toCatalogSlug(urlParam);
  }
}
