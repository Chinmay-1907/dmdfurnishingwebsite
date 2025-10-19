import { normalizeCatalogImagePath } from '../utils/catalogPaths';

const PROJECTS_XML_URL = '/projects.xml';

let cachedProjects = null;
let pendingPromise = null;

function resolveImagePath(rawPath) {
  if (!rawPath) {
    return '';
  }

  if (/^https?:\/\//i.test(rawPath)) {
    return rawPath.trim();
  }

  return normalizeCatalogImagePath(rawPath);
}

function textFromElement(parent, tagName) {
  const el = parent.getElementsByTagName(tagName)[0];
  return el ? el.textContent.trim() : '';
}

function parseProjectsXml(xmlText) {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlText, 'text/xml');

  const parserError = xmlDoc.querySelector('parsererror');
  if (parserError) {
    throw new Error('Invalid projects.xml format.');
  }

  const projectNodes = Array.from(xmlDoc.getElementsByTagName('project'));

  return projectNodes.map((projectEl) => {
    const id = projectEl.getAttribute('id') || '';
    const name = projectEl.getAttribute('name') || 'Untitled Project';
    const category = projectEl.getAttribute('category') || textFromElement(projectEl, 'category') || 'Project';

    const mainImageEl = projectEl.getElementsByTagName('mainImage')[0];
    const mainImage = mainImageEl ? resolveImagePath(mainImageEl.getAttribute('src')) : '';
    const mainImageAlt = mainImageEl ? (mainImageEl.getAttribute('alt') || '') : '';

    const imagesParent = projectEl.getElementsByTagName('images')[0];
    const images = imagesParent
      ? Array.from(imagesParent.getElementsByTagName('image')).map((imgEl, index) => ({
          id: imgEl.getAttribute('id') || String(index + 1),
          url: resolveImagePath(imgEl.getAttribute('src')),
          alt: imgEl.getAttribute('alt') || ''
        }))
      : [];

    const specsParent = projectEl.getElementsByTagName('specifications')[0];
    const specifications = specsParent
      ? Array.from(specsParent.getElementsByTagName('spec')).map((specEl) => ({
          name: specEl.getAttribute('name') || '',
          value: specEl.getAttribute('value') || specEl.textContent.trim()
        }))
      : [];

    const highlightsParent = projectEl.getElementsByTagName('highlights')[0];
    const highlights = highlightsParent
      ? Array.from(highlightsParent.getElementsByTagName('highlight'))
          .map((highlightEl) => highlightEl.textContent.trim())
          .filter(Boolean)
      : [];

    return {
      id,
      name,
      category,
      shortDescription: textFromElement(projectEl, 'shortDescription'),
      fullDescription: textFromElement(projectEl, 'fullDescription'),
      completionDate: textFromElement(projectEl, 'completionDate'),
      clientTestimonial: textFromElement(projectEl, 'clientTestimonial'),
      clientName: textFromElement(projectEl, 'clientName'),
      clientPosition: textFromElement(projectEl, 'clientPosition'),
      mainImage,
      mainImageAlt,
      images,
      specifications,
      highlights
    };
  });
}

export async function loadProjectsData(forceRefresh = false) {
  if (!forceRefresh && cachedProjects) {
    return cachedProjects;
  }

  if (!pendingPromise || forceRefresh) {
    pendingPromise = fetch(PROJECTS_XML_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load ${PROJECTS_XML_URL} (${response.status} ${response.statusText})`);
        }
        return response.text();
      })
      .then((xmlText) => {
        const projects = parseProjectsXml(xmlText);
        cachedProjects = projects;
        return projects;
      })
      .finally(() => {
        pendingPromise = null;
      });
  }

  return pendingPromise;
}

export async function loadProjectById(projectId) {
  if (!projectId) {
    return null;
  }

  const projects = await loadProjectsData();
  return projects.find((project) => project.id === projectId) || null;
}
