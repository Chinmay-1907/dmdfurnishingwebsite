/**
 * app/api/vitals/route.js
 *
 * Sink endpoint for the Web Vitals beacons sent by components/WebVitals.js.
 * Before this route existed every production pageview 404'd on POST /api/vitals.
 * No storage yet — accept the payload and discard it. Metrics are logged via
 * console.log in development only; wire up real storage/analytics later.
 */

export async function POST(request) {
  let metric = null;
  try {
    metric = await request.json();
  } catch {
    // sendBeacon can deliver an empty or malformed body — still ack it.
  }

  if (process.env.NODE_ENV !== 'production' && metric) {
    // eslint-disable-next-line no-console
    console.log('[api/vitals]', metric);
  }

  return new Response(null, { status: 204 });
}
