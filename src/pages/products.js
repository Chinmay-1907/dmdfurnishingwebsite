import { useEffect, useState } from 'react';
import Head from 'next/head';
import NextHeader from '../components/NextHeader';
import NextFooter from '../components/NextFooter';

export default function Products() {
  const [catalog, setCatalog] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [selectedType, setSelectedType] = useState(null);

  // Fetch and parse XML on first render
  useEffect(() => {
    fetch('/products.xml')
      .then(res => res.text())
      .then(str => new window.DOMParser().parseFromString(str, 'text/xml'))
      .then(data => {
        const places = Array.from(data.getElementsByTagName('place')).map(place => ({
          name: place.getAttribute('name'),
          furnitureTypes: Array.from(place.getElementsByTagName('furnitureType')).map(ft => ({
            name: ft.getAttribute('name'),
            products: Array.from(ft.getElementsByTagName('product')).map(prod => ({
              id: prod.getElementsByTagName('id')[0].textContent,
              name: prod.getElementsByTagName('name')[0].textContent,
              price: prod.getElementsByTagName('price')[0].textContent,
              description: prod.getElementsByTagName('description')[0]?.textContent || '',
              image: prod.getElementsByTagName('image')[0]?.textContent || ''
            }))
          }))
        }));
        setCatalog(places);
      });
  }, []);

  const resetToPlaces = () => {
    setSelectedPlace(null);
    setSelectedType(null);
  };

  let content;

  if (!selectedPlace) {
    // Top level: show places
    content = (
      <div className="place-list">
        {catalog.map(place => (
          <button key={place.name} onClick={() => setSelectedPlace(place.name)}>
            {place.name}
          </button>
        ))}
      </div>
    );
  } else if (selectedPlace && !selectedType) {
    // Second level: furniture types inside selected place
    const place = catalog.find(p => p.name === selectedPlace);
    content = (
      <div className="type-list">
        <button onClick={resetToPlaces}>Back</button>
        <h2>{selectedPlace}</h2>
        {place.furnitureTypes.map(ft => (
          <button key={ft.name} onClick={() => setSelectedType(ft.name)}>
            {ft.name}
          </button>
        ))}
      </div>
    );
  } else {
    // Third level: products inside selected place and type
    const place = catalog.find(p => p.name === selectedPlace);
    const type = place.furnitureTypes.find(ft => ft.name === selectedType);
    content = (
      <div className="product-list">
        <button onClick={() => setSelectedType(null)}>Back</button>
        <h2>
          {selectedPlace} &raquo; {selectedType}
        </h2>
        {type.products.map(prod => (
          <div key={prod.id} className="product-item">
            {prod.image && <img src={prod.image} alt={prod.name} />}
            <h3>{prod.name}</h3>
            <p>{prod.description}</p>
            <p>Price: {prod.price}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Our Products - DMD Furnishing</title>
        <meta name="description" content="Discover our premium furniture collections for hospitality and commercial spaces" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <NextHeader />
      <div className="products-container">
        <h1>Product Catalog</h1>
        {content}
      </div>
      <NextFooter />
    </>
  );
}
