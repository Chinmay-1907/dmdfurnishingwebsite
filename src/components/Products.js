import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Products.css';
import styles from '../styles/AboutUs.module.css';

function Products() {
  // State for tracking catalog and UI
  const [catalog, setCatalog] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPlaceIndex, setSelectedPlaceIndex] = useState(null);
  const [selectedFurnitureTypeIndex, setSelectedFurnitureTypeIndex] = useState(null);
  const [selectedSubcategoryIndex, setSelectedSubcategoryIndex] = useState(null);

  useEffect(() => {
    const loadCatalog = async () => {
      try {
        const url = '/DMD_Website.xml';
        console.log('[Products] Fetch', url);
        
        const response = await fetch(url);
        console.log('[Products] Fetch', url, response.status);
        
        if (!response.ok) {
          throw new Error(`Failed to load /DMD_Website.xml (${response.status} ${response.statusText})`);
        }
        
        const text = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(text, 'text/xml');
        
        // Validate XML structure
        const placesRoot = xmlDoc.getElementsByTagName('places')[0];
        if (!placesRoot) {
          throw new Error('Invalid XML: missing <places> root');
        }
        
        const placeElements = xmlDoc.getElementsByTagName('place');
        if (placeElements.length === 0) {
          throw new Error('No <place> elements found');
        }
        
        // Parse XML into JavaScript structure
        const parsedCatalog = [];
        
        for (let i = 0; i < placeElements.length; i++) {
          const placeEl = placeElements[i];
          const place = {
            id: placeEl.getAttribute('id') || undefined,
            name: placeEl.getAttribute('name') || 'Unnamed',
            description: placeEl.getAttribute('description') || '',
            image: placeEl.getAttribute('image') ? `/Images-Drive${placeEl.getAttribute('image').replace(/\\/g, '/')}` : '/placeholder.png',
            furnitureTypes: []
          };
          
          const furnitureTypeElements = placeEl.getElementsByTagName('furnitureType');
          
          for (let j = 0; j < furnitureTypeElements.length; j++) {
            const furnitureTypeEl = furnitureTypeElements[j];
            const furnitureType = {
              id: furnitureTypeEl.getAttribute('id') || undefined,
              name: furnitureTypeEl.getAttribute('name') || 'Unnamed',
              image: furnitureTypeEl.getAttribute('image') ? `/Images-Drive${furnitureTypeEl.getAttribute('image').replace(/\\/g, '/')}` : '/placeholder.png',
              description: furnitureTypeEl.getAttribute('description') || '',
              subcategories: []
            };
            
            const subcategoryElements = furnitureTypeEl.getElementsByTagName('subcategory');
            
            for (let k = 0; k < subcategoryElements.length; k++) {
              const subcategoryEl = subcategoryElements[k];
              const subcategoryObj = {
                  id: subcategoryEl.getAttribute('id') || '',
                  name: subcategoryEl.getAttribute('name') || 'Unnamed',
                  description: subcategoryEl.getAttribute('description') || '',
                  image: subcategoryEl.getAttribute('image') ? `/Images-Drive${subcategoryEl.getAttribute('image').replace(/\\/g, '/')}` : '/placeholder.png',
                  products: []
                };
              
              const productElements = subcategoryEl.getElementsByTagName('product');
              
              for (let l = 0; l < productElements.length; l++) {
                const productEl = productElements[l];
                const product = {
                  id: productEl.getAttribute('id') || `product-${l}`,
                  name: productEl.getAttribute('name') || 'Unnamed',
                  description: productEl.getAttribute('description') || '',
                  image: productEl.getAttribute('image') ? `/Images-Drive${productEl.getAttribute('image').replace(/\\/g, '/')}` : '/placeholder.png',
                  images: []
                };
                
                // Process images
                const imageElements = productEl.getElementsByTagName('image');
                for (let m = 0; m < imageElements.length; m++) {
                  const imageEl = imageElements[m];
                  product.images.push({
                    src: imageEl.getAttribute('src') ? `/Images-Drive${imageEl.getAttribute('src').replace(/\\/g, '/')}` : '/placeholder.png',
                    alt: imageEl.getAttribute('alt') || ''
                  });
                }
                
                // Optional fields
                const price = productEl.getAttribute('price');
                if (price) {
                  product.price = price;
                }
                
                const tagsAttr = productEl.getAttribute('tags');
                if (tagsAttr) {
                  product.tags = tagsAttr.split(',').map(tag => tag.trim());
                }
                
                subcategoryObj.products.push(product);
              }
              
              furnitureType.subcategories.push(subcategoryObj);
            }
            
            place.furnitureTypes.push(furnitureType);
          }
          
          parsedCatalog.push(place);
        }
        
        console.log('[Products] Parsed catalog:', parsedCatalog);
        setCatalog(parsedCatalog);
        setLoading(false);
        
      } catch (e) {
        console.error('[Products] Load/parse error:', e);
        setError(e.message || 'Unknown error');
        setLoading(false);
      }
    };
    
    loadCatalog();
  }, []);

  // Reset selections if indexes go out of range
  useEffect(() => {
    if (selectedPlaceIndex !== null && selectedPlaceIndex >= catalog.length) {
      setSelectedPlaceIndex(null);
      setSelectedFurnitureTypeIndex(null);
      setSelectedSubcategoryIndex(null);
    }
    if (selectedFurnitureTypeIndex !== null && selectedPlaceIndex !== null) {
      const place = catalog[selectedPlaceIndex];
      if (place && selectedFurnitureTypeIndex >= place.furnitureTypes.length) {
        setSelectedFurnitureTypeIndex(null);
        setSelectedSubcategoryIndex(null);
      }
    }
    if (selectedSubcategoryIndex !== null && selectedFurnitureTypeIndex !== null && selectedPlaceIndex !== null) {
      const place = catalog[selectedPlaceIndex];
      if (place && place.furnitureTypes[selectedFurnitureTypeIndex]) {
        const furnitureType = place.furnitureTypes[selectedFurnitureTypeIndex];
        if (selectedSubcategoryIndex >= furnitureType.subcategories.length) {
          setSelectedSubcategoryIndex(null);
        }
      }
    }
  }, [catalog, selectedPlaceIndex, selectedFurnitureTypeIndex, selectedSubcategoryIndex]);

  // Handle place selection
  const handlePlaceSelect = (index) => {
    setSelectedPlaceIndex(index);
    setSelectedFurnitureTypeIndex(null);
    setSelectedSubcategoryIndex(null);
  };

  // Handle furniture type selection
  const handleFurnitureTypeSelect = (index) => {
    setSelectedFurnitureTypeIndex(index);
    setSelectedSubcategoryIndex(null);
  };

  // Handle subcategory selection
  const handleSubcategorySelect = (index) => {
    setSelectedSubcategoryIndex(index);
  };

  // Go back to places
  const handleBackToPlaces = () => {
    setSelectedPlaceIndex(null);
    setSelectedFurnitureTypeIndex(null);
    setSelectedSubcategoryIndex(null);
  };

  // Go back to furniture types
  const handleBackToFurnitureTypes = () => {
    setSelectedFurnitureTypeIndex(null);
    setSelectedSubcategoryIndex(null);
  };

  // Go back to subcategories
  const handleBackToSubcategories = () => {
    setSelectedSubcategoryIndex(null);
  };

  // Render content based on state
  const renderContent = () => {
    // Show places list
    if (selectedPlaceIndex === null) {
      return (
        <section className="product-categories">
          <h2>Browse by Space</h2>
          <div className="category-grid">
            {catalog.map((place, index) => (
              <div 
                key={place.id || index} 
                className="category-item"
                onClick={() => handlePlaceSelect(index)}
              >
                <div 
                  className="category-image"
                  style={{ backgroundImage: `url(${place.image || '/placeholder.png'})` }}
                ></div>
                <h3>{place.name}</h3>
                <p>{place.description}</p>
                <button className="view-button">View Collection</button>
              </div>
            ))}
          </div>
        </section>
      );
    }

    const selectedPlace = catalog[selectedPlaceIndex];
    if (!selectedPlace) return null;

    // Show furniture types for selected place
    if (selectedFurnitureTypeIndex === null) {
      return (
        <section className="product-subcategories">
          <div className="breadcrumb">
            <button onClick={handleBackToPlaces}>All Spaces</button>
            <span> &gt; </span>
            <span>{selectedPlace.name}</span>
          </div>
          <h2>Browse {selectedPlace.name} Furniture</h2>
          <div className="category-grid">
            {selectedPlace.furnitureTypes.map((furnitureType, index) => (
              <div 
                key={furnitureType.id || index} 
                className="category-item"
                onClick={() => handleFurnitureTypeSelect(index)}
              >
                <div 
                  className="category-image"
                  style={{ backgroundImage: `url(${furnitureType.image || '/placeholder.png'})` }}
                ></div>
                <h3>{furnitureType.name}</h3>
                <p>{furnitureType.description}</p>
                <button className="view-button">View Products</button>
              </div>
            ))}
          </div>
        </section>
      );
    }

    const selectedFurnitureType = selectedPlace.furnitureTypes[selectedFurnitureTypeIndex];
    if (!selectedFurnitureType) return null;

    // Show subcategories for selected furniture type
    if (selectedSubcategoryIndex === null) {
      return (
        <section className="product-subcategories">
          <div className="breadcrumb">
            <button onClick={handleBackToPlaces}>All Spaces</button>
            <span> &gt; </span>
            <button onClick={handleBackToFurnitureTypes}>{selectedPlace.name}</button>
            <span> &gt; </span>
            <span>{selectedFurnitureType.name}</span>
          </div>
          <h2>Browse {selectedFurnitureType.name} Categories</h2>
          <div className="category-grid">
            {selectedFurnitureType.subcategories.map((subcategory, index) => (
              <div 
                key={subcategory.id || index} 
                className="category-item"
                onClick={() => handleSubcategorySelect(index)}
              >
                <div 
                  className="category-image"
                  style={{ backgroundImage: `url(${subcategory.image || '/placeholder.png'})` }}
                ></div>
                <h3>{subcategory.name}</h3>
                <p>{subcategory.description}</p>
                <button className="view-button">View Products</button>
              </div>
            ))}
          </div>
        </section>
      );
    }

    const selectedSubcategory = selectedFurnitureType.subcategories[selectedSubcategoryIndex];
    if (!selectedSubcategory) return null;

    // Show products for selected subcategory
    return (
      <section className="product-listing">
        <div className="breadcrumb">
          <button onClick={handleBackToPlaces}>All Spaces</button>
          <span> &gt; </span>
          <button onClick={handleBackToFurnitureTypes}>{selectedPlace.name}</button>
          <span> &gt; </span>
          <button onClick={handleBackToSubcategories}>{selectedFurnitureType.name}</button>
          <span> &gt; </span>
          <span>{selectedSubcategory.name}</span>
        </div>
        
        <h2>{selectedSubcategory.name}</h2>
        
        <div className="products-grid">
          {selectedSubcategory.products.map((product, index) => (
            <div key={product.id || index} className="product-item">
              <div 
                className="product-image" 
                style={{ backgroundImage: `url(${product.image})` }}
              ></div>
              <h3>{product.name}</h3>
              {product.price && <p className="product-price">{product.price}</p>}
              <p>{product.description}</p>
              {product.tags && (
                <div className="product-tags">
                  {product.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="product-tag">{tag}</span>
                  ))}
                </div>
              )}
              <Link to={`/products/${selectedPlace.id}/${selectedFurnitureType.id}/${selectedSubcategory.id}/${product.id}`} className="details-button">View Details</Link>
            </div>
          ))}
        </div>
      </section>
    );
  };

  // Loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  // No catalog data
  if (!catalog.length) {
    return <div>No catalog data loaded. Check XML and parser.</div>;
  }

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
        <Link to="/contact" aria-label="Contact us">
          <button className="cta-button">Request Custom Quote</button>
        </Link>
      </section>
    </div>
  );
}

export default Products;