const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const xmlPath = path.join(publicDir, 'DMD_Website.xml');

const xml = fs.readFileSync(xmlPath, 'utf8');

const attrRegex = /(image|src)="([^"]+)"/g;
const missing = new Set();

function sortDirents(dirents) {
  return dirents.slice().sort((a, b) => a.name.localeCompare(b.name));
}

function findFirstImageRecursively(startDir) {
  let dirents;
  try {
    dirents = sortDirents(fs.readdirSync(startDir, { withFileTypes: true }));
  } catch (error) {
    return null;
  }

  const files = dirents.filter((entry) => entry.isFile());
  if (files.length > 0) {
    const imageEntry =
      files.find((entry) => /\.(png|jpe?g|webp|gif)$/i.test(entry.name)) || files[0];
    if (imageEntry) {
      return path.join(startDir, imageEntry.name);
    }
  }

  for (const entry of dirents) {
    if (entry.isDirectory()) {
      const result = findFirstImageRecursively(path.join(startDir, entry.name));
      if (result) {
        return result;
      }
    }
  }

  return null;
}

function normalizePath(input) {
  if (!input) {
    return input;
  }

  let normalized = input.trim().replace(/\\/g, '/').replace(/\/{2,}/g, '/');

  if (!normalized.startsWith('/')) {
    if (normalized.startsWith('./')) {
      normalized = normalized.slice(1);
    }

    if (!normalized.startsWith('/')) {
      normalized = '/' + normalized;
    }
  }

  return normalized;
}

function resolveExistingFile(relativePath, originalName) {
  const absolutePath = path.join(publicDir, ...relativePath.split('/'));

  if (fs.existsSync(absolutePath)) {
    return relativePath;
  }

  const dir = path.dirname(absolutePath);
  const targetFile = path.basename(absolutePath);
  const targetBase = path.parse(targetFile).name.toLowerCase();

  try {
    const dirents = sortDirents(fs.readdirSync(dir, { withFileTypes: true }));
    const files = dirents.filter((entry) => entry.isFile()).map((entry) => entry.name);

    const exactMatch = files.find((entry) => entry.toLowerCase() === targetFile.toLowerCase());
    if (exactMatch) {
      return path.join(path.relative(publicDir, dir), exactMatch).split(path.sep).join('/');
    }

    const baseMatch = files.find((entry) => path.parse(entry).name.toLowerCase() === targetBase);
    if (baseMatch) {
      return path.join(path.relative(publicDir, dir), baseMatch).split(path.sep).join('/');
    }

    const imageMatch = files.find((entry) => /\.(png|jpe?g|webp|gif)$/i.test(entry));
    if (imageMatch) {
      return path.join(path.relative(publicDir, dir), imageMatch).split(path.sep).join('/');
    }

    const firstImage = findFirstImageRecursively(dir);
    if (firstImage) {
      return path.relative(publicDir, firstImage).split(path.sep).join('/');
    }
  } catch (error) {
    // Directory missing; fall through to mark missing.
  }

  missing.add(originalName);
  return relativePath;
}

const updatedXml = xml.replace(attrRegex, (_match, attribute, rawValue) => {
  const normalized = normalizePath(rawValue);

  if (!normalized) {
    missing.add(rawValue);
    return `${attribute}="${rawValue}"`;
  }

  const relativePart = normalized.replace(/^\/+/, '');
  const resolved = resolveExistingFile(relativePart, rawValue);
  const resolvedNormalized = '/' + resolved.replace(/^\/+/, '');

  const resolvedAbsolute = path.join(publicDir, ...resolvedNormalized.slice(1).split('/'));
  if (!fs.existsSync(resolvedAbsolute)) {
    missing.add(rawValue);
  }

  return `${attribute}="${resolvedNormalized}"`;
});

fs.writeFileSync(xmlPath, updatedXml, 'utf8');

if (missing.size > 0) {
  console.log('Paths that still need attention:');
  for (const item of missing) {
    console.log(`  ${item}`);
  }
} else {
  console.log('All image paths resolved successfully.');
}
