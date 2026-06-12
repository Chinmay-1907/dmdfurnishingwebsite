/**
 * scripts/check-content-leaks.js
 *
 * Pre-build gate: fail the build if production scaffolding ever leaks into
 * reader-facing content source (app/blog, app/guides). Patterns mirror the
 * seo-doc audit's leak set. Runs via the npm "prebuild" hook.
 */

const fs = require('fs');
const path = require('path');

const ROOTS = ['app/blog', 'app/guides'];
const LEAK_PATTERNS = [
  /\bTODO\b/,
  /\bFIXME\b/,
  /\blorem\b/i,
  /\bipsum\b/i,
  /placeholder text/i,
  /coming soon/i,
  /\bTBD\b/,
  /needs verification/i,
  /\bTKTK\b/,
];

let failures = [];

function scanDir(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanDir(full);
    } else if (/\.(js|jsx|md|mdx)$/.test(entry.name)) {
      const lines = fs.readFileSync(full, 'utf8').split('\n');
      lines.forEach((line, i) => {
        for (const pattern of LEAK_PATTERNS) {
          if (pattern.test(line)) {
            failures.push(`${full}:${i + 1} matches ${pattern}`);
          }
        }
      });
    }
  }
}

for (const root of ROOTS) {
  const abs = path.join(process.cwd(), root);
  if (fs.existsSync(abs)) scanDir(abs);
}

if (failures.length > 0) {
  console.error('Content leak gate FAILED:');
  for (const f of failures) console.error('  ' + f);
  process.exit(1);
}

console.log('Content leak gate passed (app/blog, app/guides clean).');
