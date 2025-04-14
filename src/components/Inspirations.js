import React, { useEffect } from 'react';
import '../styles/Inspirations.css';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Inspirations() {
  // Initialize AOS animation library
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      mirror: false
    });
  }, []);

  // Sample inspiration data
  const inspirations = [
    {
      id: 1,
      title: 'Modern Minimalist Hotel Lobby',
      description: 'Clean lines and neutral tones create a welcoming atmosphere in this contemporary hotel lobby design.',
      image: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      category: 'Hotel'
    },
    {
      id: 2,
      title: 'Luxury Restaurant Seating',
      description: 'Plush velvet seating and rich wood tones elevate this fine dining experience with sophistication and comfort.',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      category: 'Restaurant'
    },
    {
      id: 3,
      title: 'Boutique Hotel Suite',
      description: 'A perfect blend of luxury and comfort in this boutique hotel suite featuring custom-designed furniture.',
      image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      category: 'Hotel'
    },
    {
      id: 4,
      title: 'Executive Lounge Design',
      description: 'Sophisticated and functional furniture creates an ideal environment for business travelers.',
      image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      category: 'Corporate'
    },
    {
      id: 5,
      title: 'Coastal Resort Aesthetic',
      description: 'Light, airy furniture with natural materials perfectly complement this beachfront property.',
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      category: 'Resort'
    },
    {
      id: 6,
      title: 'Urban Cafe Concept',
      description: 'Industrial-inspired furniture with warm accents creates a welcoming space for this city cafe.',
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      category: 'Cafe'
    }
  ];

  return (
    <div className="inspirations-container">
      <section className="inspirations-hero">
        <div className="inspirations-hero-content" data-aos="fade-up">
          <h1>Design Inspirations</h1>
          <p>Explore our curated collection of hospitality design inspirations</p>
        </div>
      </section>

      <section className="inspirations-gallery">
        <div className="gallery-filters" data-aos="fade-up">
          <button className="filter-button active">All</button>
          <button className="filter-button">Hotel</button>
          <button className="filter-button">Restaurant</button>
          <button className="filter-button">Resort</button>
          <button className="filter-button">Corporate</button>
          <button className="filter-button">Cafe</button>
        </div>

        <div className="gallery-grid">
          {inspirations.map((inspiration) => (
            <div key={inspiration.id} className="inspiration-item" data-aos="fade-up">
              <div className="inspiration-image" style={{ backgroundImage: `url(${inspiration.image})` }}>
                <div className="inspiration-overlay">
                  <span className="inspiration-category">{inspiration.category}</span>
                </div>
              </div>
              <div className="inspiration-content">
                <h3>{inspiration.title}</h3>
                <p>{inspiration.description}</p>
                <Link to={`/inspirations/${inspiration.id}`} className="inspiration-link">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="inspiration-cta" data-aos="fade-up">
        <h2>Need Help With Your Project?</h2>
        <p>Our design consultants are ready to assist you in creating the perfect space</p>
        <Link to="/contact">
          <button className="cta-button">Contact Us</button>
        </Link>
      </section>
    </div>
  );
}

export default Inspirations;