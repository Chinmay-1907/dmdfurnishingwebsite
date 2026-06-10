// Verifies every Images/ reference in code+XML resolves to a real file with EXACT case.
// Catches Windows-dev-works / Linux-prod-404 path bugs. Run: node scripts/check-image-refs.js
const fs = require('fs');
const path = require('path');

const root = process.cwd();
const real = new Set();
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else real.add(path.relative(root, p).split(path.sep).join('/'));
  }
})(path.join(root, 'public'));

const refs = new Map();
const rx = /\/?Images\/[^"'\s>)`]+?\.(?:png|jpe?g|webp|svg|gif|avif)/gi;
function scan(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) {
      if (e.name === 'node_modules' || e.name === '.next') continue;
      scan(p);
    } else if (/\.(js|jsx|xml|json|txt)$/.test(e.name)) {
      const c = fs.readFileSync(p, 'utf8');
      let m;
      while ((m = rx.exec(c))) {
        let ref = m[0].replace(/^\//, '');
        try { ref = decodeURIComponent(ref); } catch {}
        refs.set(ref, p.replace(root + path.sep, ''));
      }
      if (e.name.endsWith('.xml')) {
        // XML src/image attrs can contain spaces the generic regex misses
        const ax = /(?:src|image)="([^"]+?\.(?:png|jpe?g|webp|svg|gif|avif))"/gi;
        while ((m = ax.exec(c))) {
          let ref = m[1].replace(/\\/g, '/').replace(/^\//, '');
          try { ref = decodeURIComponent(ref); } catch {}
          refs.set(ref, p.replace(root + path.sep, ''));
        }
      }
    }
  }
}
['app', 'components', 'lib', 'public'].forEach((d) => scan(path.join(root, d)));

let miss = 0;
for (const [ref, src] of refs) {
  if (!real.has('public/' + ref)) {
    miss++;
    console.log('MISS|' + ref + '|' + src);
  }
}
console.log('total unique refs:', refs.size, 'missing:', miss);
process.exit(miss ? 1 : 0);
