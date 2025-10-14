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
