import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/ProductOverview.module.css';
import { toCatalogSlug } from '../utils/catalogPaths';

const CATEGORIES = [
  {
    id: 'hotel',
    title: 'Hotels & Motels',
    description: 'Elevate guest experiences with durable, design-forward furniture tailored for lobbies, guest rooms, and suites.',
    image: '/Images/Hotel/Hotel furniture collection.jpg'
  },
  {
    id: 'restaurant',
    title: 'Restaurants & Cafés',
    description: 'Create inviting dining atmospheres with commercial-grade seating and tables designed for high-traffic environments.',
    image: '/Images/Restaurant/Restaurant.png'
  },
  {
    id: 'office',
    title: 'Office & Corporate Spaces',
    description: 'Enhance productivity and comfort with ergonomic workstations, executive desks, and collaborative seating solutions.',
    image: '/Images/Office/Office.jpg'
  },
  {
    id: 'residential',
    title: 'Multi-Family & Residential Projects',
    description: 'Deliver style and longevity for apartments, condos, and housing developments with comprehensive furniture packages.',
    image: '/Images/Residential/Residential.png'
  },
  {
    id: 'university',
    title: 'Educational Facilities',
    description: 'Support learning and collaboration with flexible, durable furniture for classrooms, libraries, and common areas.',
    image: '/Images/University/University.png' 
  },
  {
    id: 'hospital',
    title: 'Healthcare & Care Facilities',
    description: 'Prioritize patient comfort and operational efficiency with specialized, easy-to-clean medical and waiting area furniture.',
    image: '/Images/Hospital/Hospital.png'
  },
  {
    id: 'Lobby Area',
    title: 'Public & Common Areas',
    description: 'Make a lasting first impression with stylish, welcoming furniture for lobbies, lounges, and reception zones.',
    image: '/Images/Lobby Area/Lobby Area.jpg'
  }
];

const ProductOverview = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Products by Market</h1>
        <p className={styles.subtitle}>
          Explore our specialized furniture collections designed for the unique requirements of commercial sectors.
        </p>
      </header>
      
      <div className={styles.grid}>
        {CATEGORIES.map((category) => {
          // Map category IDs to the requested anchor IDs
          let anchorId = category.id;
          if (category.id === 'university') anchorId = 'education';
          if (category.id === 'hospital') anchorId = 'healthcare';
          
          return (
            <Link 
              key={category.id} 
              id={anchorId}
              to={`/products/${toCatalogSlug(category.id)}`}
              className={styles.card}
              style={{ scrollMarginTop: '120px' }}
            >
              <div 
                className={styles.cardImage} 
                style={{ backgroundImage: `url("${encodeURI(category.image)}")` }}
              />
              <div className={styles.cardContent}>
                <h2 className={styles.cardTitle}>{category.title}</h2>
                <p className={styles.cardDescription}>{category.description}</p>
                <span className={styles.ctaButton}>View Collection</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ProductOverview;
