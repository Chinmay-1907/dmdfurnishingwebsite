// One-off: image files with en-dash names were renamed to plain hyphens
// (Next's image optimizer 400s on the en-dash URLs). Rewrite src/image
// attribute paths in the catalog XML to match. Alt text keeps its en-dashes.
const fs = require('fs');

const files = ['public/DMD_Website.xml', 'public/projects.xml'];
for (const file of files) {
  if (!fs.existsSync(file)) continue;
  const before = fs.readFileSync(file, 'utf8');
  const after = before.replace(/(src|image)="([^"]*–[^"]*)"/g, (m, attr, val) => {
    return `${attr}="${val.replace(/–/g, '-')}"`;
  });
  if (after !== before) {
    fs.writeFileSync(file, after, 'utf8');
    const n = (before.match(/(src|image)="[^"]*–[^"]*"/g) || []).length;
    console.log(`${file}: rewrote ${n} attribute(s)`);
  } else {
    console.log(`${file}: no en-dash paths`);
  }
}
