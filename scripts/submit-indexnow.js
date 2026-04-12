/**
 * scripts/submit-indexnow.js
 *
 * Notifies IndexNow-compatible search engines (Bing, Yandex, Seznam, Naver) of
 * content updates by POSTing the sitemap URLs to api.indexnow.org.
 *
 * The verification key is read from public/indexnow-key.txt so rotating the
 * key only requires replacing two files (the key file named `<KEY>.txt` and
 * `indexnow-key.txt`) — no code change.
 *
 * URL source: fetches the live /sitemap.xml from the deployed site (works with
 * Next.js App Router dynamic sitemap at app/sitemap.js).
 *
 * Run manually:  node scripts/submit-indexnow.js
 * Post-deploy:   wire into Netlify deploy-succeeded webhook or build plugin.
 */
const fs = require('fs');
const https = require('https');
const path = require('path');

const KEY = fs.readFileSync(path.join(__dirname, '..', 'public', 'indexnow-key.txt'), 'utf-8').trim();
const HOST = 'dmdfurnishing.com';
const SITEMAP_URL = `https://${HOST}/sitemap.xml`;

function fetchSitemap() {
  return new Promise((resolve, reject) => {
    https.get(SITEMAP_URL, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        // Follow one redirect
        https.get(res.headers.location, (res2) => {
          let data = '';
          res2.on('data', (chunk) => (data += chunk));
          res2.on('end', () => resolve(data));
        }).on('error', reject);
        return;
      }
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function submitToIndexNow() {
  console.log(`[IndexNow] Fetching sitemap from ${SITEMAP_URL}...`);

  let sitemap;
  try {
    sitemap = await fetchSitemap();
  } catch (err) {
    console.error(`[IndexNow] Failed to fetch sitemap: ${err.message}`);
    process.exit(1);
  }

  // Extract URLs from sitemap XML
  const urls = [];
  const locRegex = /<loc>(.*?)<\/loc>/g;
  let match;
  while ((match = locRegex.exec(sitemap)) !== null) {
    urls.push(match[1]);
  }

  if (urls.length === 0) {
    console.error('[IndexNow] No URLs found in sitemap. Is the site deployed?');
    process.exit(1);
  }

  console.log(`[IndexNow] Found ${urls.length} URLs to submit`);

  const payload = JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: `https://${HOST}/${KEY}.txt`,
    urlList: urls.slice(0, 10000), // IndexNow max 10k per request
  });

  const options = {
    hostname: 'api.indexnow.org',
    path: '/indexnow',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(payload),
    },
  };

  const req = https.request(options, (res) => {
    console.log(`[IndexNow] Response: ${res.statusCode}`);
    res.on('data', (d) => process.stdout.write(d));
    res.on('end', () => {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        console.log(`\n[IndexNow] Successfully submitted ${urls.length} URLs`);
      } else {
        console.error(`\n[IndexNow] Submission returned status ${res.statusCode}`);
      }
    });
  });

  req.on('error', (e) => {
    console.error(`[IndexNow] Error: ${e.message}`);
  });

  req.write(payload);
  req.end();
}

submitToIndexNow();
