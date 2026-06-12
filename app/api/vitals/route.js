/**
 * app/api/vitals/route.js
 *
 * Sink endpoint for the Web Vitals beacons sent by components/WebVitals.js.
 * Before this route existed every production pageview 404'd on POST /api/vitals.
 * No database yet — metrics are written to the function log as one structured
 * JSON line per beacon, so hosting log search (Netlify/Vercel) can aggregate
 * them. Only whitelisted fields are logged to keep lines parseable and safe.
 */

export async function POST(request) {
  let metric = null;
  try {
    metric = await request.json();
  } catch {
    // sendBeacon can deliver an empty or malformed body — still ack it.
  }

  if (metric && typeof metric === 'object') {
    const line = {
      src: 'web-vitals',
      name: typeof metric.name === 'string' ? metric.name.slice(0, 32) : undefined,
      value: typeof metric.value === 'number' ? metric.value : undefined,
      rating: typeof metric.rating === 'string' ? metric.rating.slice(0, 32) : undefined,
      id: typeof metric.id === 'string' ? metric.id.slice(0, 64) : undefined,
      path: typeof metric.path === 'string' ? metric.path.slice(0, 256) : undefined,
      navigationType: typeof metric.navigationType === 'string' ? metric.navigationType.slice(0, 32) : undefined,
    };
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(line));
  }

  return new Response(null, { status: 204 });
}
