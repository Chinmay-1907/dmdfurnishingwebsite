const fs = require('fs');
const https = require('https');
const path = require('path');

const KEY = 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6';
const HOST = 'dmdfurnishing.com';

function submitToIndexNow() {
  const sitemapPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
  const sitemap = fs.readFileSync(sitemapPath, 'utf-8');

  // Extract URLs from sitemap
  const urls = [];
  const locRegex = /<loc>(.*?)<\/loc>/g;
  let match;
  while ((match = locRegex.exec(sitemap)) !== null) {
    urls.push(match[1]);
  }

  console.log(`[IndexNow] Found ${urls.length} URLs to submit`);

  const payload = JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: `https://${HOST}/${KEY}.txt`,
    urlList: urls.slice(0, 10000) // IndexNow max 10k per request
  });

  const options = {
    hostname: 'api.indexnow.org',
    path: '/indexnow',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(payload)
    }
  };

  const req = https.request(options, (res) => {
    console.log(`[IndexNow] Response: ${res.statusCode}`);
    res.on('data', (d) => process.stdout.write(d));
  });

  req.on('error', (e) => {
    console.error(`[IndexNow] Error: ${e.message}`);
  });

  req.write(payload);
  req.end();
}

submitToIndexNow();
