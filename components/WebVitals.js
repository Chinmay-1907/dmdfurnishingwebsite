'use client';

/**
 * WebVitals.js
 *
 * Reports Core Web Vitals (LCP, INP, CLS, FCP, TTFB) via Next.js's built-in
 * useReportWebVitals hook. Zero runtime dependency — Next ships the collector.
 *
 * In development: logs to the browser console for debugging.
 * In production: sends to /api/vitals (no-op until the endpoint is added) using
 * sendBeacon so reports don't block navigation. Silently swallows errors so a
 * missing endpoint never breaks the page.
 *
 * Mount once at the root (app/layout.js) — the hook de-dupes itself.
 */
import { useReportWebVitals } from 'next/web-vitals';

export default function WebVitals() {
  useReportWebVitals((metric) => {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.log(`[web-vitals] ${metric.name} = ${Math.round(metric.value * 100) / 100}`, metric);
      return;
    }

    // Production: fire-and-forget beacon. Endpoint is optional.
    try {
      const body = JSON.stringify({
        name: metric.name,
        value: metric.value,
        rating: metric.rating,
        delta: metric.delta,
        id: metric.id,
        navigationType: metric.navigationType,
        path: typeof window !== 'undefined' ? window.location.pathname : undefined,
      });

      if (navigator.sendBeacon) {
        navigator.sendBeacon('/api/vitals', body);
      } else {
        fetch('/api/vitals', { body, method: 'POST', keepalive: true }).catch(() => {});
      }
    } catch {
      // swallow — reporting is best-effort
    }
  });

  return null;
}
