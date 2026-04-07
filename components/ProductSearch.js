'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiSearch, FiX } from 'react-icons/fi';

function toSlug(value) {
  if (!value && value !== 0) return '';
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

function normalizeImagePath(rawPath, fallback = '/placeholder.png') {
  if (!rawPath) return fallback;
  const trimmed = rawPath.trim().replace(/\\/g, '/').replace(/\/{2,}/g, '/');
  if (!trimmed) return fallback;
  return trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
}

export default function ProductSearch() {
  const router = useRouter();
  const inputRef = useRef(null);
  const catalogLoaded = useRef(false);
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [items, setItems] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchExpanded, setSearchExpanded] = useState(false);

  async function loadCatalogIndex() {
    let cancelled = false;

    try {
      setLoading(true);
      const response = await fetch('/DMD_Website.xml');
      if (!response.ok) throw new Error('Failed to load product catalog');

      const xmlText = await response.text();
      const parser = new DOMParser();
      const xml = parser.parseFromString(xmlText, 'text/xml');
      const places = Array.from(xml.querySelectorAll('places > place'));
      const results = [];

      places.forEach((place) => {
        const placeId = place.getAttribute('id') || '';
        const placeName = place.getAttribute('name') || placeId;
        const placeSlug = toSlug(placeId);

        results.push({
          type: 'space',
          title: placeName,
          meta: 'Browse space collection',
          path: `/products/${placeSlug}`,
          image: normalizeImagePath(place.getAttribute('image')),
        });

        Array.from(place.querySelectorAll('furnitureType')).forEach((furnitureType) => {
          const furnitureId = furnitureType.getAttribute('id') || '';
          const furnitureName = furnitureType.getAttribute('name') || furnitureId;
          const furnitureSlug = toSlug(furnitureId);

          results.push({
            type: 'category',
            title: `${placeName} - ${furnitureName}`,
            meta: placeName,
            path: `/products/${placeSlug}/${furnitureSlug}`,
            image: normalizeImagePath(furnitureType.getAttribute('image')),
          });

          Array.from(furnitureType.querySelectorAll('subcategory')).forEach((subcategory) => {
            const subcategoryId = subcategory.getAttribute('id') || '';
            const subcategoryName = subcategory.getAttribute('name') || subcategoryId;
            const subcategorySlug = toSlug(subcategoryId);

            results.push({
              type: 'subcategory',
              title: `${placeName} - ${furnitureName} - ${subcategoryName}`,
              meta: furnitureName,
              path: `/products/${placeSlug}/${furnitureSlug}/${subcategorySlug}`,
              image: normalizeImagePath(subcategory.getAttribute('image')),
            });

            Array.from(subcategory.querySelectorAll('product')).forEach((product) => {
              const productId = product.getAttribute('id') || '';
              const productName = product.getAttribute('name') || productId;
              const productSlug = toSlug(productName || productId);
              const tags = (product.getAttribute('tags') || '')
                .split(',')
                .map((tag) => tag.trim())
                .filter(Boolean)
                .join(' ');

              results.push({
                type: 'product',
                title: productName,
                meta: `${placeName} - ${furnitureName} - ${subcategoryName}`,
                path: `/products/${placeSlug}/${furnitureSlug}/${subcategorySlug}/${productSlug}`,
                image: normalizeImagePath(product.getAttribute('image')),
                tokens: `${placeName} ${furnitureName} ${subcategoryName} ${productName} ${productId} ${tags}`.toLowerCase(),
              });
            });
          });
        });
      });

      if (!cancelled) {
        setItems(results);
        setLoaded(true);
      }
    } catch {
      if (!cancelled) {
        setItems([]);
        setLoaded(true);
      }
    } finally {
      if (!cancelled) {
        setLoading(false);
      }
    }
  }

  const handleSearchFocus = () => {
    if (!catalogLoaded.current) {
      catalogLoaded.current = true;
      loadCatalogIndex();
    }
  };

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return [];

    return items
      .filter((item) => {
        const haystack = item.tokens || `${item.title} ${item.meta}`.toLowerCase();
        return haystack.includes(normalized);
      })
      .slice(0, 8);
  }, [items, query]);

  useEffect(() => {
    setActiveIndex(0);
  }, [filtered.length]);

  // Auto-focus input when search expands
  useEffect(() => {
    if (searchExpanded) {
      // Small delay to let the transition start before focusing
      const timer = window.setTimeout(() => {
        inputRef.current?.focus();
        handleSearchFocus();
      }, 50);
      return () => window.clearTimeout(timer);
    }
  }, [searchExpanded]);

  function collapseSearch() {
    setSearchExpanded(false);
    setQuery('');
    setOpen(false);
  }

  function goToItem(item) {
    if (!item) return;
    router.push(item.path);
    setQuery('');
    setOpen(false);
    collapseSearch();
    inputRef.current?.blur();
  }

  function handleSubmit(event) {
    event.preventDefault();
    goToItem(filtered[0]);
  }

  function handleKeyDown(event) {
    if (!open && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
      setOpen(true);
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((current) => Math.min(current + 1, Math.max(filtered.length - 1, 0)));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((current) => Math.max(current - 1, 0));
    } else if (event.key === 'Enter') {
      if (filtered[activeIndex]) {
        event.preventDefault();
        goToItem(filtered[activeIndex]);
      }
    } else if (event.key === 'Escape') {
      if (open) {
        setOpen(false);
      } else {
        collapseSearch();
      }
    }
  }

  return (
    <div className={`header-search${searchExpanded ? ' expanded' : ''}`} role="search">
      {/* Toggle button — visible when search is collapsed */}
      {!searchExpanded && (
        <button
          type="button"
          className="search-toggle"
          onClick={() => setSearchExpanded(true)}
          aria-label="Open search"
        >
          <FiSearch size={18} aria-hidden="true" />
        </button>
      )}

      {/* Search form — visible when search is expanded */}
      {searchExpanded && (
        <form className="search-form" onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="search"
            className="search-input"
            placeholder="Search products"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setOpen(true);
            }}
            onFocus={(event) => { handleSearchFocus(); setOpen(true); }}
            onBlur={() => {
              window.setTimeout(() => setOpen(false), 120);
            }}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            aria-label="Search products"
          />
          <button
            type="button"
            className="search-close"
            onClick={collapseSearch}
            aria-label="Close search"
          >
            <FiX size={16} aria-hidden="true" />
          </button>
        </form>
      )}

      {open && filtered.length > 0 ? (
        <ul className="search-results" role="listbox">
          {filtered.map((item, index) => (
            <li
              key={`${item.type}:${item.path}`}
              className={`search-result${activeIndex === index ? ' active' : ''}`}
              role="option"
              aria-selected={activeIndex === index}
              onMouseDown={() => goToItem(item)}
            >
              <div className="result-left">
                <img
                  src={item.image}
                  alt={item.title}
                  className="result-thumb"
                  width="48"
                  height="48"
                  loading="lazy"
                />
              </div>
              <div className="result-right">
                <div className="result-title">{item.title}</div>
                <div className="result-meta">{item.meta}</div>
              </div>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
