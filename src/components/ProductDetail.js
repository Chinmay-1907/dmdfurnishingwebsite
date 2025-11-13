import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import '../styles/ProductDetail.css';
import { normalizeCatalogImagePath, idsMatch, toCatalogSlug } from '../utils/catalogPaths';

function ProductDetail() {
  const { institutionId, furnitureTypeId, subcategoryId, productId } = useParams();
  const navigate = useNavigate();
  
  // State management
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [detail, setDetail] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const thumbRailRef = useRef(null);
  const thumbRefs = useRef([]);
  
  useEffect(() => {
    console.log('[ProductDetail] useEffect called');
    // If any segment is missing, do not run product-detail fetch/redirect logic
    if (!institutionId || !furnitureTypeId || !subcategoryId || !productId) {
      console.log('[ProductDetail] Missing parameters, returning.');
      return;
    }

    let isActive = true;
    const controller = new AbortController();

    const fetchProductDetail = async () => {
      try {
        console.log(`[ProductDetail] Fetching details for: ${institutionId}/${furnitureTypeId}/${subcategoryId}/${productId}`);
        
        // Fetch XML catalog
        const response = await fetch('/DMD_Website.xml', { signal: controller.signal });
        console.log('[ProductDetail] Fetch URL:', response.url, 'Status:', response.status);
        
        if (!response.ok) {
          throw new Error(`Failed to load /DMD_Website.xml (${response.status} ${response.statusText})`);
        }
        
        const xmlText = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
        
        // Validate root element
        const root = xmlDoc.querySelector('places');
        if (!root) {
          throw new Error('Invalid XML: Missing <places> root element');
        }
        
        // Validate at least one place
        const places = root.querySelectorAll('place');
        if (places.length === 0) {
          throw new Error('Invalid XML: No <place> elements found');
        }
        
        console.log('[ProductDetail] XML loaded successfully, places found:', places.length);
        
        // Find place (institution)
        let foundPlace = null;
        for (const place of places) {
          if (idsMatch(place.getAttribute('id'), institutionId)) {
            foundPlace = place;
            break;
          }
        }
        
        if (!foundPlace) {
          throw new Error(`Institution not found: ${institutionId}`);
        }
        
        console.log('[ProductDetail] Found institution:', foundPlace.getAttribute('name'));
        
        // Find furniture type
        const furnitureTypes = foundPlace.querySelectorAll('furnitureType');
        let foundFurnitureType = null;
        for (const furnitureType of furnitureTypes) {
          if (idsMatch(furnitureType.getAttribute('id'), furnitureTypeId)) {
            foundFurnitureType = furnitureType;
            break;
          }
        }
        
        if (!foundFurnitureType) {
          throw new Error(`Furniture type not found: ${furnitureTypeId}`);
        }
        
        console.log('[ProductDetail] Found furniture type:', foundFurnitureType.getAttribute('name'));
        
        // Find subcategory
        const subcategories = foundFurnitureType.querySelectorAll('subcategory');
        let foundSubcategory = null;
        for (const subcategory of subcategories) {
          if (idsMatch(subcategory.getAttribute('id'), subcategoryId)) {
            foundSubcategory = subcategory;
            break;
          }
        }
        
        if (!foundSubcategory) {
          throw new Error(`Subcategory not found: ${subcategoryId}`);
        }
        
        console.log('[ProductDetail] Found subcategory:', foundSubcategory.getAttribute('name'));
        
        // Find product within subcategory
        const products = foundSubcategory.querySelectorAll('product');
        let foundProduct = null;
        for (const product of products) {
          if (idsMatch(product.getAttribute('id'), productId)) {
            foundProduct = product;
            break;
          }
        }
        
        if (!foundProduct) {
          throw new Error(`Product not found: ${productId}`);
        }
        
        console.log('[ProductDetail] Found product:', foundProduct.getAttribute('name'));
        
        // Build detail object
        const institutionObj = {
          id: foundPlace.getAttribute('id'),
          name: foundPlace.getAttribute('name') || 'Unnamed',
          description: foundPlace.getAttribute('description') || '',
          image: normalizeCatalogImagePath(foundPlace.getAttribute('image'))
        };
        
        const furnitureTypeObj = {
          id: foundFurnitureType.getAttribute('id'),
          name: foundFurnitureType.getAttribute('name') || 'Unnamed',
          description: foundFurnitureType.getAttribute('description') || '',
          image: normalizeCatalogImagePath(foundFurnitureType.getAttribute('image'))
        };
        
        const subcategoryObj = {
          id: foundSubcategory.getAttribute('id'),
          name: foundSubcategory.getAttribute('name') || 'Unnamed',
          description: foundSubcategory.getAttribute('description') || '',
          image: normalizeCatalogImagePath(foundSubcategory.getAttribute('image'))
        };
        
        // Parse product images
        const imagesNode = foundProduct.querySelector('images');
        const images = [];
        if (imagesNode) {
          const imageElements = imagesNode.querySelectorAll('image');
          imageElements.forEach(img => {
            images.push({
              src: normalizeCatalogImagePath(img.getAttribute('src')),
              alt: img.getAttribute('alt') || 'Product image'
            });
          });
        }
        
        // Parse specifications
        const specificationsNode = foundProduct.querySelector('specifications');
        const specifications = [];
        if (specificationsNode) {
          const specElements = specificationsNode.querySelectorAll('spec');
          specElements.forEach(spec => {
            specifications.push({
              name: spec.getAttribute('name') || 'Unknown',
              value: spec.getAttribute('value') || 'Unknown'
            });
          });
        }
        
        // Parse tags
        const tagsAttr = foundProduct.getAttribute('tags');
        const tags = tagsAttr ? tagsAttr.split(',').map(tag => tag.trim()) : [];
        
        const productObj = {
          id: foundProduct.getAttribute('id'),
          name: foundProduct.getAttribute('name') || 'Unnamed',
          description: foundProduct.getAttribute('description') || '',
          image: normalizeCatalogImagePath(foundProduct.getAttribute('image')),
          price: foundProduct.getAttribute('price') || null,
          tags: tags,
          images: images,
          specifications: specifications
        };
        
        const detailObj = {
          institution: institutionObj,
          furnitureType: furnitureTypeObj,
          subcategory: subcategoryObj,
          product: productObj
        };
        
        console.log('[ProductDetail] Loaded', detailObj);
        
        // Normalize URL to canonical slug path to avoid casing/spacing mismatches
        const canonicalInstitution = toCatalogSlug(detailObj.institution.id);
        const canonicalFurniture = toCatalogSlug(detailObj.furnitureType.id);
        const canonicalSubcategory = toCatalogSlug(detailObj.subcategory.id);
        const canonicalProduct = toCatalogSlug(detailObj.product.id);
        const currentInstitution = toCatalogSlug(institutionId || '');
        const currentFurniture = toCatalogSlug(furnitureTypeId || '');
        const currentSubcategory = toCatalogSlug(subcategoryId || '');
        const currentProduct = toCatalogSlug(productId || '');
        const needsRedirect = (
          canonicalInstitution !== currentInstitution ||
          canonicalFurniture !== currentFurniture ||
          canonicalSubcategory !== currentSubcategory ||
          canonicalProduct !== currentProduct
        );
        if (needsRedirect) {
          navigate(`/products/${canonicalInstitution}/${canonicalFurniture}/${canonicalSubcategory}/${canonicalProduct}`, { replace: true });
        }
        
        if (!isActive) return;
        setDetail(detailObj);
        setLoading(false);
        
      } catch (e) {
        if (e.name === 'AbortError') {
          // Silently ignore aborted requests triggered by cleanup or route changes
          return;
        }
        console.error('[ProductDetail] Error', e);
        if (!isActive) return;
        setError(e.message || 'Unknown error');
        setLoading(false);
      }
    };
    
    fetchProductDetail();
    return () => {
      console.log('[ProductDetail] Cleanup function called');
      isActive = false;
      controller.abort();
    };
  }, [institutionId, furnitureTypeId, subcategoryId, productId, navigate]);

  // Reset active image when navigating to a new product
  useEffect(() => {
    setActiveIndex(0);
  }, [detail?.product?.id]);

  // Ensure active thumbnail stays in view
  useEffect(() => {
    const el = thumbRefs.current[activeIndex];
    if (el && typeof el.scrollIntoView === 'function') {
      el.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, [activeIndex]);

  const imagesArr = useMemo(() => {
    if (!detail) return [];
    return (detail.product.images && detail.product.images.length > 0)
      ? detail.product.images
      : [{ src: detail.product.image, alt: detail.product.name }];
  }, [detail]);

  const handleKeyDown = (e) => {
    if (imagesArr.length <= 1) return;
    if (e.key === 'ArrowLeft') {
      setActiveIndex((prev) => (prev - 1 + imagesArr.length) % imagesArr.length);
    } else if (e.key === 'ArrowRight') {
      setActiveIndex((prev) => (prev + 1) % imagesArr.length);
    }
  };

  const prevImage = () => {
    if (imagesArr.length <= 1) return;
    setActiveIndex((prev) => (prev - 1 + imagesArr.length) % imagesArr.length);
  };
  const nextImage = () => {
    if (imagesArr.length <= 1) return;
    setActiveIndex((prev) => (prev + 1) % imagesArr.length);
  };
  
  // Render loading state
  if (loading) {
    return (
      <div className="product-detail-container">
        <div className="loading">Loading product details...</div>
      </div>
    );
  }
  
  // Render error state
  if (error) {
    return (
      <div className="product-detail-container">
        <div>Error: {error}</div>
      </div>
    );
  }
  
  // Render not found state
  if (!detail) {
    return (
      <div className="product-detail-container">
        <div>Product not found.</div>
      </div>
    );
  }
  
  return (
    <div className="product-detail-container">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <Link to="/products">All Spaces</Link>
        <span> &gt; </span>
        <Link to={`/products/${toCatalogSlug(detail.institution.id)}`}>{detail.institution.name}</Link>
        <span> &gt; </span>
        <Link to={`/products/${toCatalogSlug(detail.institution.id)}/${toCatalogSlug(detail.furnitureType.id)}`}>{detail.furnitureType.name}</Link>
        <span> &gt; </span>
        <Link to={`/products/${toCatalogSlug(detail.institution.id)}/${toCatalogSlug(detail.furnitureType.id)}/${toCatalogSlug(detail.subcategory.id)}`}>{detail.subcategory.name}</Link>
        <span> &gt; </span>
        <span>{detail.product.name}</span>
      </div>

      <div className="product-detail-content">
        {/* Gallery */}
        <div className="product-gallery-container" role="region" aria-label="Product image gallery">
          <div
            className="mainImageFrame"
            tabIndex={0}
            onKeyDown={(e) => handleKeyDown(e)}
            aria-live="polite"
          >
            <img
              src={imagesArr[activeIndex]?.src}
              alt={imagesArr[activeIndex]?.alt || detail.product.name}
              loading="lazy"
            />
            {imagesArr.length > 1 && (
              <div className="gallery-nav" aria-hidden="false">
                <button className="gallery-arrow prev" onClick={prevImage} aria-label="Previous image">‹</button>
                <button className="gallery-arrow next" onClick={nextImage} aria-label="Next image">›</button>
              </div>
            )}
          </div>

          {imagesArr.length > 1 && (
            <div
              className="thumbnailRail"
              ref={thumbRailRef}
              role="tablist"
              aria-label="Product image thumbnails"
            >
              {imagesArr.map((img, idx) => (
                <button
                  key={idx}
                  ref={(el) => (thumbRefs.current[idx] = el)}
                  className={`thumbnail-button ${activeIndex === idx ? 'active' : ''}`}
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`View image ${idx + 1}`}
                >
                  <img src={img.src} alt={img.alt || detail.product.name} loading="lazy" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="product-info">
          <h1>{detail.product.name}</h1>
          
          {/* Tags */}
          {detail.product.tags.length > 0 && (
            <div className="product-tags">
              {detail.product.tags.map((tag, index) => (
                <span key={index} className="product-tag">{tag}</span>
              ))}
            </div>
          )}

          {/* Specifications */}
          {detail.product.specifications.length > 0 && (
            <div className="product-specifications">
              <h2>Specifications</h2>
              <div className="specifications-grid">
                {detail.product.specifications.map((spec, index) => (
                  <div key={index} className="specification-item">
                    <span className="specification-name">{spec.name}:</span>
                    <span className="specification-value">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          <div className="product-description">
            <h2>Description</h2>
            <p>{detail.product.description}</p>
          </div>

          {/* Price */}
          {detail.product.price && (
            <div className="product-price-section">
              <span className="product-price">{detail.product.price}</span>
            </div>
          )}

          <button className="contact-button" onClick={() => navigate('/contact')}>Contact Us About This Product</button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
