import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/ProductDetail.css';

function ProductDetail() {
  const { institutionId, furnitureTypeId, subcategoryId, productId } = useParams();
  const navigate = useNavigate();
  
  // State management
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [detail, setDetail] = useState(null);
  
  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        console.log(`[ProductDetail] Fetching details for: ${institutionId}/${furnitureTypeId}/${subcategoryId}/${productId}`);
        
        // Fetch XML catalog
        const response = await fetch('/DMD_Website.xml');
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
          if (place.getAttribute('id') === institutionId) {
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
          if (furnitureType.getAttribute('id') === furnitureTypeId) {
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
          if (subcategory.getAttribute('id') === subcategoryId) {
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
          if (product.getAttribute('id') === productId) {
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
          image: foundPlace.getAttribute('image') ? `/Images-Drive${foundPlace.getAttribute('image')}` : '/placeholder.png'
        };
        
        const furnitureTypeObj = {
          id: foundFurnitureType.getAttribute('id'),
          name: foundFurnitureType.getAttribute('name') || 'Unnamed',
          description: foundFurnitureType.getAttribute('description') || '',
          image: foundFurnitureType.getAttribute('image') ? `/Images-Drive${foundFurnitureType.getAttribute('image')}` : '/placeholder.png'
        };
        
        const subcategoryObj = {
          id: foundSubcategory.getAttribute('id'),
          name: foundSubcategory.getAttribute('name') || 'Unnamed',
          description: foundSubcategory.getAttribute('description') || '',
          image: foundSubcategory.getAttribute('image') ? `/Images-Drive${foundSubcategory.getAttribute('image')}` : '/placeholder.png'
        };
        
        // Parse product images
        const imagesNode = foundProduct.querySelector('images');
        const images = [];
        if (imagesNode) {
          const imageElements = imagesNode.querySelectorAll('image');
          imageElements.forEach(img => {
            images.push({
              src: img.getAttribute('src') ? `/Images-Drive${img.getAttribute('src')}` : '/placeholder.png',
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
          image: foundProduct.getAttribute('image') ? `/Images-Drive${foundProduct.getAttribute('image')}` : '/placeholder.png',
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
        
        setDetail(detailObj);
        setLoading(false);
        
      } catch (e) {
        console.error('[ProductDetail] Error', e);
        setError(e.message || 'Unknown error');
        setLoading(false);
      }
    };
    
    fetchProductDetail();
  }, [institutionId, furnitureTypeId, subcategoryId, productId]);
  
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
        <button onClick={() => navigate('/products')}>All Spaces</button>
        <span> &gt; </span>
        <button onClick={() => navigate(`/products/${detail.institution.id}`)}>{detail.institution.name}</button>
        <span> &gt; </span>
        <button onClick={() => navigate(`/products/${detail.institution.id}/${detail.furnitureType.id}`)}>{detail.furnitureType.name}</button>
        <span> &gt; </span>
        <button onClick={() => navigate(`/products/${detail.institution.id}/${detail.furnitureType.id}/${detail.subcategory.id}`)}>{detail.subcategory.name}</button>
        <span> &gt; </span>
        <span>{detail.product.name}</span>
      </div>

      <div className="product-detail-content">
        {/* Gallery */}
        {detail.product.images.length > 0 ? (
          <div className="product-gallery-container">
            <div className="product-gallery">
              <div className="images-scroll-container">
                {detail.product.images.map((image, index) => (
                  <div key={index} className="gallery-image">
                    <img src={image.src} alt={image.alt} loading="lazy" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="product-gallery-container">
            <div className="product-gallery">
              <div className="images-scroll-container">
                <div className="gallery-image">
                  <img src={detail.product.image} alt={detail.product.name} loading="lazy" />
                </div>
              </div>
            </div>
          </div>
        )}

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
            {detail.product.description && (
              <p>This premium furniture piece exemplifies our commitment to quality craftsmanship and timeless design. Each piece is meticulously crafted using the finest materials to ensure durability and aesthetic appeal that will enhance any space.</p>
            )}
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