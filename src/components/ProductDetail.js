import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/ProductDetail.css';
import productData from '../data/products';
import ProductGallery from './ProductGallery';

// This component displays detailed information about a specific product
// It shows multiple images from different angles in a scrollable container,
// specifications with dimensions, product description, and a contact button

function ProductDetail() {
  const { institutionId, furnitureTypeId, productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [institution, setInstitution] = useState(null);
  const [furnitureType, setFurnitureType] = useState(null);
  
  // Sample multiple images for the product (in a real app, these would come from the database)
  const productImages = [
    { id: 1, url: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', alt: 'Front view' },
    { id: 2, url: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', alt: 'Side view' },
    { id: 3, url: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', alt: 'Back view' },
    { id: 4, url: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', alt: 'Detail view' },
    { id: 5, url: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', alt: 'Material detail' },
    { id: 6, url: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', alt: 'Texture detail' }
  ];

  // Sample specifications for the product (in a real app, these would come from the database)
  const specifications = [
    { name: 'Width', value: '21"' },
    { name: 'Depth', value: '21.5"' },
    { name: 'Height', value: '38.5"' },
    { name: 'Seat Depth', value: '16.5"' },
    { name: 'Seat Height', value: '18"' },
    { name: 'Material', value: 'Solid Oak, Premium Leather' },
    { name: 'Finish', value: 'Natural Wood with Matte Black Metal Accents' },
    { name: 'Weight Capacity', value: '300 lbs' }
  ];

  useEffect(() => {
    // Find the product based on the URL parameters
    const foundInstitution = productData.institutions.find(inst => inst.id === institutionId);
    
    if (foundInstitution) {
      setInstitution(foundInstitution);
      
      const foundFurnitureType = foundInstitution.furnitureTypes.find(type => type.id === furnitureTypeId);
      
      if (foundFurnitureType) {
        setFurnitureType(foundFurnitureType);
        
        const foundProduct = foundFurnitureType.products.find(prod => prod.id === productId);
        
        if (foundProduct) {
          setProduct(foundProduct);
        }
      }
    }
  }, [institutionId, furnitureTypeId, productId]);

  // Navigate back function
  const handleBack = () => {
    navigate(-1);
  };

  if (!product || !institution || !furnitureType) {
    return (
      <div className="product-detail-container">
        <div className="loading">Loading product details...</div>
      </div>
    );
  }

  return (
    <div className="product-detail-container">
      <div className="breadcrumb">
        <button onClick={() => navigate('/products')}>All Spaces</button>
        <span> &gt; </span>
        <button onClick={() => navigate(`/products/${institutionId}`)}>{institution.name}</button>
        <span> &gt; </span>
        <button onClick={() => navigate(`/products/${institutionId}/${furnitureTypeId}`)}>{furnitureType.name}</button>
        <span> &gt; </span>
        <span>{product.name}</span>
      </div>

      <div className="product-detail-content">
        <ProductGallery images={productImages} />

        <div className="product-info">
          <h1>{product.name}</h1>
          <div className="product-tags">
            {product.tags.map(tag => (
              <span key={tag} className="product-tag">{tag}</span>
            ))}
          </div>

          <div className="product-specifications">
            <h2>Specifications</h2>
            <div className="specifications-grid">
              {specifications.map((spec, index) => (
                <div key={index} className="specification-item">
                  <span className="specification-name">{spec.name}:</span>
                  <span className="specification-value">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="product-description">
            <h2>Description</h2>
            <p>{product.description}</p>
            <p>This premium furniture piece exemplifies our commitment to quality craftsmanship and timeless design. Each piece is meticulously crafted using the finest materials to ensure durability and aesthetic appeal that will enhance any space.</p>
          </div>

          <button className="contact-button" onClick={() => window.location.href = '/contact'}>Contact Us About This Product</button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;