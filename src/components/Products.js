import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Products.css';
import productData from '../data/products';
import styles from '../styles/AboutUs.module.css';


function Products() {
  // State for tracking selected institution and furniture type
  const [selectedInstitution, setSelectedInstitution] = useState(null);
  const [selectedFurnitureType, setSelectedFurnitureType] = useState(null);
  const [activeFilters, setActiveFilters] = useState([]);

  // Handle institution selection
  const handleInstitutionSelect = (institution) => {
    setSelectedInstitution(institution);
    setSelectedFurnitureType(null);
  };

  // Handle furniture type selection
  const handleFurnitureTypeSelect = (furnitureType) => {
    setSelectedFurnitureType(furnitureType);
  };

  // Go back to institution selection
  const handleBackToInstitutions = () => {
    setSelectedInstitution(null);
    setSelectedFurnitureType(null);
    setActiveFilters([]);
  };

  // Go back to furniture type selection
  const handleBackToFurnitureTypes = () => {
    setSelectedFurnitureType(null);
  };

  // Toggle filter tag
  const toggleFilter = (tag) => {
    if (activeFilters.includes(tag)) {
      setActiveFilters(activeFilters.filter(filter => filter !== tag));
    } else {
      setActiveFilters([...activeFilters, tag]);
    }
  };

  // Filter products by active tags
  const filterProducts = (products) => {
    if (activeFilters.length === 0) return products;
    return products.filter(product => {
      return activeFilters.some(filter => product.tags.includes(filter));
    });
  };

  // Get all unique tags from current products
  const getAllTags = (products) => {
    const tags = new Set();
    products.forEach(product => {
      product.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags);
  };

  // Render the main content based on selection state
  const renderContent = () => {
    // If no institution is selected, show all institutions
    if (!selectedInstitution) {
      return (
        <section className="product-categories">
          <h2>Browse by Space</h2>
          <div className="category-grid">
            {productData.institutions.map(institution => (
              <div 
                key={institution.id} 
                className="category-item"
                onClick={() => handleInstitutionSelect(institution)}
              >
                <div 
                  className="category-image" 
                  style={{ backgroundImage: `url(${institution.image})` }}
                ></div>
                <h3>{institution.name}</h3>
                <p>{institution.description}</p>
                <button className="view-button">View Collection</button>
              </div>
            ))}
          </div>
        </section>
      );
    }
    
    // If institution is selected but no furniture type, show furniture types
    if (selectedInstitution && !selectedFurnitureType) {
      return (
        <section className="product-subcategories">
          <div className="breadcrumb">
            <button onClick={handleBackToInstitutions}>All Spaces</button>
            <span> &gt; </span>
            <span>{selectedInstitution.name}</span>
          </div>
          <h2>Browse {selectedInstitution.name} Furniture</h2>
          <div className="category-grid">
            {selectedInstitution.furnitureTypes.map(furnitureType => (
              <div 
                key={furnitureType.id} 
                className="category-item"
                onClick={() => handleFurnitureTypeSelect(furnitureType)}
              >
                <div className="category-image"></div>
                <h3>{furnitureType.name}</h3>
                <p>{furnitureType.description}</p>
                <button className="view-button">View Products</button>
              </div>
            ))}
          </div>
        </section>
      );
    }
    
    // If both institution and furniture type are selected, show products
    if (selectedInstitution && selectedFurnitureType) {
      const products = selectedFurnitureType.products;
      const filteredProducts = filterProducts(products);
      const allTags = getAllTags(products);
      
      return (
        <section className="product-listing">
          <div className="breadcrumb">
            <button onClick={handleBackToInstitutions}>All Spaces</button>
            <span> &gt; </span>
            <button onClick={handleBackToFurnitureTypes}>{selectedInstitution.name}</button>
            <span> &gt; </span>
            <span>{selectedFurnitureType.name}</span>
          </div>
          
          <h2>{selectedFurnitureType.name} for {selectedInstitution.name}</h2>
          
          <div className="filter-section">
            <h3>Filter by:</h3>
            <div className="filter-tags">
              {allTags.map(tag => (
                <button 
                  key={tag} 
                  className={`filter-tag ${activeFilters.includes(tag) ? 'active' : ''}`}
                  onClick={() => toggleFilter(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
          
          <div className="products-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <div key={product.id} className="product-item">
                  <div 
                    className="product-image" 
                    style={{ backgroundImage: `url(${product.image})` }}
                  ></div>
                  <h3>{product.name}</h3>
                  <p className="product-price">{product.price}</p>
                  <p>{product.description}</p>
                  <div className="product-tags">
                    {product.tags.map(tag => (
                      <span key={tag} className="product-tag">{tag}</span>
                    ))}
                  </div>
                  <Link to={`/products/${selectedInstitution.id}/${selectedFurnitureType.id}/${product.id}`} className="details-button">View Details</Link>
                </div>
              ))
            ) : (
              <div className="no-products">
                <p>No products match your selected filters. Please try different filters.</p>
              </div>
            )}
          </div>
        </section>
      );
    }
  };

  return (
    <div className="products-container">
      <section className={styles.heroSection} style={{
        background: 'linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.4)), url("https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Our Products</h1>
          <p className={styles.heroSubtitle}>Discover our premium furniture collections</p>
        </div>
      </section>

      {renderContent()}

      <section className="custom-solutions">
        <h2>Custom Furniture Solutions</h2>
        <p>We offer bespoke furniture design and manufacturing services tailored to your specific requirements.</p>
        <button className="cta-button">Request Custom Quote</button>
      </section>
    </div>
  );
}

export default Products;