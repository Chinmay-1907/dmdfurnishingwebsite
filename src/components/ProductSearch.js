import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ProductSearch.css';
import { toCatalogSlug, normalizeCatalogImagePath } from '../utils/catalogPaths';

function ProductSearch() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetch('/DMD_Website.xml');
        if (!res.ok) throw new Error('Failed to load catalog');
        const text = await res.text();
        const parser = new DOMParser();
        const xml = parser.parseFromString(text, 'text/xml');
        const places = Array.from(xml.querySelectorAll('places > place'));
        const results = [];
        places.forEach(place => {
          const institutionId = place.getAttribute('id') || '';
          const institutionName = place.getAttribute('name') || institutionId;
          const instSlug = toCatalogSlug(institutionId);
          results.push({
            type: 'institution',
            name: institutionName,
            path: `/products/${instSlug}`,
            image: normalizeCatalogImagePath(place.getAttribute('image')),
          });
          const furnitureTypes = Array.from(place.querySelectorAll('furnitureType'));
          furnitureTypes.forEach(ft => {
            const ftId = ft.getAttribute('id') || '';
            const ftName = ft.getAttribute('name') || ftId;
            const ftSlug = toCatalogSlug(ftId);
            results.push({
              type: 'furniture',
              name: `${institutionName} • ${ftName}`,
              path: `/products/${instSlug}/${ftSlug}`,
              image: normalizeCatalogImagePath(ft.getAttribute('image')),
            });
            const subcategories = Array.from(ft.querySelectorAll('subcategory'));
            subcategories.forEach(sc => {
              const scId = sc.getAttribute('id') || '';
              const scName = sc.getAttribute('name') || scId;
              const scSlug = toCatalogSlug(scId);
              results.push({
                type: 'subcategory',
                name: `${institutionName} • ${ftName} • ${scName}`,
                path: `/products/${instSlug}/${ftSlug}/${scSlug}`,
                image: normalizeCatalogImagePath(sc.getAttribute('image')),
              });
              const products = Array.from(sc.querySelectorAll('product'));
              products.forEach(p => {
                const pId = p.getAttribute('id') || '';
                const pName = p.getAttribute('name') || pId;
                const pSlug = toCatalogSlug(pName || pId);
                const tagsAttr = p.getAttribute('tags') || '';
                const tags = tagsAttr.split(',').map(s => s.trim()).filter(Boolean);
                results.push({
                  type: 'product',
                  name: pName,
                  breadcrumbs: `${institutionName} • ${ftName} • ${scName}`,
                  path: `/products/${instSlug}/${ftSlug}/${toCatalogSlug(scId)}/${pSlug}`,
                  image: normalizeCatalogImagePath(p.getAttribute('image')),
                  tokens: [institutionName, ftName, scName, pName, pId, ...tags].join(' ').toLowerCase(),
                });
              });
            });
          });
        });
        if (!cancelled) {
          setItems(results);
          setLoaded(true);
        }
      } catch (e) {
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const base = items.filter(it => {
      if (it.type === 'product') return it.tokens?.includes(q) || it.name.toLowerCase().includes(q);
      return it.name.toLowerCase().includes(q);
    });
    const seen = new Set();
    const deduped = [];
    for (const it of base) {
      const key = `${it.type}:${it.path}`;
      if (!seen.has(key)) {
        seen.add(key);
        deduped.push(it);
      }
    }
    return deduped.slice(0, 8);
  }, [items, query]);

  useEffect(() => {
    setActive(0);
  }, [filtered.length]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (filtered.length > 0) {
      navigate(filtered[0].path);
      setOpen(false);
      setQuery('');
    }
  };

  const handleKeyDown = (e) => {
    if (!open && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
      setOpen(true);
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, Math.max(filtered.length - 1, 0)));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const choice = filtered[active];
      if (choice) {
        navigate(choice.path);
        setOpen(false);
        setQuery('');
      }
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
    setOpen(true);
  };

  const handleBlur = (e) => {
    setTimeout(() => setOpen(false), 120);
  };

  return (
    <div className="header-search" role="search">
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="search"
          className="search-input"
          placeholder="Search products"
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setOpen(true)}
          onBlur={handleBlur}
          aria-label="Search products"
          autoComplete="off"
        />
        <button type="submit" className="search-submit" disabled={loading || !loaded}>
          Search
        </button>
      </form>
      {open && filtered.length > 0 && (
        <ul className="search-results" ref={listRef} role="listbox">
          {filtered.map((it, idx) => (
            <li
              key={`${it.type}:${it.path}`}
              className={`search-result ${active === idx ? 'active' : ''}`}
              role="option"
              aria-selected={active === idx}
              onMouseDown={() => {
                navigate(it.path);
                setOpen(false);
                setQuery('');
              }}
            >
              <div className="result-left">
                {it.image ? <img src={it.image} alt="" className="result-thumb" /> : <div className="result-thumb placeholder" />}
              </div>
              <div className="result-right">
                <div className="result-title">{it.name}</div>
                <div className="result-meta">
                  {it.type === 'product' ? it.breadcrumbs : it.type}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProductSearch;

