import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import '../styles/Products.css';
import { normalizeCatalogImagePath, toCatalogSlug, idsMatch } from '../utils/catalogPaths';

function Products() {
  const CUSTOM_FURNITURE_IMAGE_URL = '/Images/Tailored_Guestroom_Collections.jpg';
  // Get URL parameters and navigation
  const { institutionId, furnitureTypeId, subcategoryId } = useParams();
  const navigate = useNavigate();
  
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
            image: normalizeCatalogImagePath(placeEl.getAttribute('image')),
            furnitureTypes: []
          };
          
          const furnitureTypeElements = placeEl.getElementsByTagName('furnitureType');
          
          for (let j = 0; j < furnitureTypeElements.length; j++) {
            const furnitureTypeEl = furnitureTypeElements[j];
            const furnitureType = {
              id: furnitureTypeEl.getAttribute('id') || undefined,
              name: furnitureTypeEl.getAttribute('name') || 'Unnamed',
              image: normalizeCatalogImagePath(furnitureTypeEl.getAttribute('image')),
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
                  image: normalizeCatalogImagePath(subcategoryEl.getAttribute('image')),
                  products: []
                };
              
              const productElements = subcategoryEl.getElementsByTagName('product');
              
              for (let l = 0; l < productElements.length; l++) {
                const productEl = productElements[l];
                const product = {
                  id: productEl.getAttribute('id') || `product-${l}`,
                  name: productEl.getAttribute('name') || 'Unnamed',
                  description: productEl.getAttribute('description') || '',
                  image: normalizeCatalogImagePath(productEl.getAttribute('image')),
                  images: []
                };
                
                // Process images
                const imageElements = productEl.getElementsByTagName('image');
                for (let m = 0; m < imageElements.length; m++) {
                  const imageEl = imageElements[m];
                  product.images.push({
                    src: normalizeCatalogImagePath(imageEl.getAttribute('src')),
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
        if (e.name === 'AbortError') {
          // Ignore aborted requests triggered by route changes or cleanup in dev
          return;
        }
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

  // Effect to handle URL-based navigation after catalog loads
  useEffect(() => {
    if (catalog.length === 0) return;

    // No institution in URL => reset to All Spaces
    if (!institutionId) {
      setSelectedPlaceIndex(null);
      setSelectedFurnitureTypeIndex(null);
      setSelectedSubcategoryIndex(null);
      return;
    }
    
    // Find the place by institutionId
    const placeIndex = catalog.findIndex(place => idsMatch(place.id, institutionId));
    if (placeIndex === -1) return;
    
    setSelectedPlaceIndex(placeIndex);
    
    // If only institution in URL, clear deeper selections and normalize its slug
    if (!furnitureTypeId) {
      const place = catalog[placeIndex];
      setSelectedFurnitureTypeIndex(null);
      setSelectedSubcategoryIndex(null);
      const canonicalInstitution = toCatalogSlug(place.id);
      const currentInstitution = toCatalogSlug(institutionId || '');
      if (canonicalInstitution !== currentInstitution) {
        navigate(`/products/${canonicalInstitution}`, { replace: true });
      }
      return;
    }
    
    // Find the furniture type by furnitureTypeId
    const place = catalog[placeIndex];
    const furnitureTypeIndex = place.furnitureTypes.findIndex(
      (ft) => idsMatch(ft.id, furnitureTypeId) || idsMatch(ft.name, furnitureTypeId)
    );
    if (furnitureTypeIndex === -1) {
      setSelectedFurnitureTypeIndex(null);
      setSelectedSubcategoryIndex(null);
      return;
    }

    setSelectedFurnitureTypeIndex(furnitureTypeIndex);

    // If institution and furniture type in URL (no subcategory), clear subcategory and normalize slugs
    if (!subcategoryId) {
      setSelectedSubcategoryIndex(null);
      const canonicalInstitution = toCatalogSlug(place.id);
      const currentInstitution = toCatalogSlug(institutionId || '');
      const canonicalFurniture = toCatalogSlug(place.furnitureTypes[furnitureTypeIndex].id);
      const currentFurniture = toCatalogSlug(furnitureTypeId || '');
      const needsRedirect = (
        canonicalInstitution !== currentInstitution ||
        canonicalFurniture !== currentFurniture
      );
      if (needsRedirect) {
        navigate(`/products/${canonicalInstitution}/${canonicalFurniture}`, { replace: true });
      }
      return;
    }
    
    // Find the subcategory by subcategoryId
    const furnitureType = place.furnitureTypes[furnitureTypeIndex];
    const subcategoryIndex = furnitureType.subcategories.findIndex(
      (sub) => idsMatch(sub.id, subcategoryId) || idsMatch(sub.name, subcategoryId)
    );
    if (subcategoryIndex === -1) {
      setSelectedSubcategoryIndex(null);
      return;
    }
    
    setSelectedSubcategoryIndex(subcategoryIndex);
    
    // Normalize URL to canonical slug path if current params differ
    const canonicalInstitution = toCatalogSlug(place.id);
    const currentInstitution = toCatalogSlug(institutionId || '');
    const canonicalFurniture = toCatalogSlug(furnitureType.id);
    const currentFurniture = toCatalogSlug(furnitureTypeId || '');
    const canonicalSubcategory = toCatalogSlug(furnitureType.subcategories[subcategoryIndex].id);
    const currentSubcategory = toCatalogSlug(subcategoryId || '');
    const needsRedirect = (
      canonicalInstitution !== currentInstitution ||
      canonicalFurniture !== currentFurniture ||
      canonicalSubcategory !== currentSubcategory
    );
    if (needsRedirect) {
      navigate(`/products/${canonicalInstitution}/${canonicalFurniture}/${canonicalSubcategory}`, { replace: true });
    }
  }, [catalog, institutionId, furnitureTypeId, subcategoryId]);

  // Handle place selection
  const handlePlaceSelect = (index) => {
    const place = catalog[index];
    navigate(`/products/${toCatalogSlug(place.id)}`);
  };

  // Handle furniture type selection
  const handleFurnitureTypeSelect = (index) => {
    const place = catalog[selectedPlaceIndex];
    const furnitureType = place.furnitureTypes[index];
    navigate(`/products/${toCatalogSlug(place.id)}/${toCatalogSlug(furnitureType.id)}`);
  };

  // Handle subcategory selection
  const handleSubcategorySelect = (index) => {
    const place = catalog[selectedPlaceIndex];
    const furnitureType = place.furnitureTypes[selectedFurnitureTypeIndex];
    const subcategory = furnitureType.subcategories[index];
    navigate(`/products/${toCatalogSlug(place.id)}/${toCatalogSlug(furnitureType.id)}/${toCatalogSlug(subcategory.id)}`);
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
                  className={`category-image place-${toCatalogSlug(place.id || '')}`}
                  style={{ backgroundImage: `url("${encodeURI(place.image || '/placeholder.png')}")` }}
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
            <Link to="/products">All Spaces</Link>
            <span> &gt; </span>
            <Link to={`/products/${toCatalogSlug(selectedPlace.id)}`}>{selectedPlace.name}</Link>
          </div>
          <h2>Browse {selectedPlace.name} Furniture</h2>
          <div className="category-grid">
            {selectedPlace.furnitureTypes.map((furnitureType, index) => (
              <Link
                key={furnitureType.id || index}
                className="category-item"
                to={`/products/${toCatalogSlug(selectedPlace.id)}/${toCatalogSlug(furnitureType.id)}`}
                aria-label={`View ${furnitureType.name} products`}
              >
                <div 
                  className="category-image"
                  style={{ backgroundImage: `url("${encodeURI(furnitureType.image || '/placeholder.png')}")` }}
                ></div>
                <h3>{furnitureType.name}</h3>
                <p>{furnitureType.description}</p>
                <span className="view-button" role="button">View Products</span>
              </Link>
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
            <Link to="/products">All Spaces</Link>
            <span> &gt; </span>
            <Link to={`/products/${toCatalogSlug(selectedPlace.id)}`}>{selectedPlace.name}</Link>
            <span> &gt; </span>
            <Link to={`/products/${toCatalogSlug(selectedPlace.id)}/${toCatalogSlug(selectedFurnitureType.id)}`}>{selectedFurnitureType.name}</Link>
          </div>
          <h2>Browse {selectedFurnitureType.name} Categories</h2>
          <div className="category-grid">
            {selectedFurnitureType.subcategories.map((subcategory, index) => (
              <Link
                key={subcategory.id || index}
                className="category-item"
                to={`/products/${toCatalogSlug(selectedPlace.id)}/${toCatalogSlug(selectedFurnitureType.id)}/${toCatalogSlug(subcategory.id)}`}
                aria-label={`View ${subcategory.name} products`}
              >
                <div 
                  className="category-image"
                  style={{ backgroundImage: `url("${encodeURI(subcategory.image || '/placeholder.png')}")` }}
                ></div>
                <h3>{subcategory.name}</h3>
                <p>{subcategory.description}</p>
                <span className="view-button" role="button">View Products</span>
              </Link>
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
          <Link to="/products">All Spaces</Link>
          <span> &gt; </span>
          <Link to={`/products/${toCatalogSlug(selectedPlace.id)}`}>{selectedPlace.name}</Link>
          <span> &gt; </span>
          <Link to={`/products/${toCatalogSlug(selectedPlace.id)}/${toCatalogSlug(selectedFurnitureType.id)}`}>{selectedFurnitureType.name}</Link>
          <span> &gt; </span>
          <span>{selectedSubcategory.name}</span>
        </div>
        
        <h2>{selectedSubcategory.name}</h2>
        
        <div className="products-grid">
          {selectedSubcategory.products.map((product, index) => (
            <div key={`${toCatalogSlug(product.id || product.name)}-${index}`} className="product-item">
              <div 
                className="product-image" 
                style={{ backgroundImage: `url("${encodeURI(product.image)}")` }}
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
              <Link to={`/products/${toCatalogSlug(selectedPlace.id)}/${toCatalogSlug(selectedFurnitureType.id)}/${toCatalogSlug(selectedSubcategory.id)}/${toCatalogSlug(product.name || product.id)}`} className="details-button">View Details</Link>
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

      {renderContent()}

      <section 
        className="custom-solutions"
        style={{
          background: `linear-gradient(135deg, rgba(12, 14, 18, 0.88), rgba(12, 14, 18, 0.72)), url("${CUSTOM_FURNITURE_IMAGE_URL}")`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center'
        }}
      >
        <h2>Custom Furniture Solutions</h2>
        <p>We design and manufacture bespoke furniture sized precisely for your space, ensuring dimensions and proportions are tailored to your environment.</p>
        <Link to="/contact" aria-label="Contact us">
          <button className="cta-button">Request Custom Quote</button>
        </Link>
      </section>
    </div>
  );
}

export default Products;
