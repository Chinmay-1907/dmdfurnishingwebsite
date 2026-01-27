import React, { useEffect, useState } from 'react';
import '../styles/Inspirations.css';
import { FiZoomIn, FiX } from 'react-icons/fi';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Inspirations() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 800, once: true, mirror: false });
  }, []);

  // Consolidated Gallery Data
  const galleryItems = [
    { id: 1, category: 'Hotel', src: '/Images/Hotel/Lobby Area/Lobby Area.jpg', title: 'Grand Lobby Entrance', desc: 'Luxury arrival experience' },
    { id: 2, category: 'Restaurant', src: '/Images/Restaurant/Restaurant.jpg', title: 'Fine Dining Ambience', desc: 'Warm lighting and plush seating' },
    { id: 3, category: 'Office', src: '/Images/Office/Workstations/Office Workstations.jpg', title: 'Modern Workstations', desc: 'Collaborative open-plan design' },
    { id: 4, category: 'Hotel', src: '/Images/Hotel/hotel-seating/hotel-seating.jpg', title: 'Lounge Seating', desc: 'Comfortable waiting areas' },
    { id: 5, category: 'Restaurant', src: '/Images/Restaurant/Dining Area/Dinnig Area.jpg', title: 'Bistro Setting', desc: 'Casual dining arrangement' },
    { id: 6, category: 'Office', src: '/Images/Office/office.jpg', title: 'Executive Suite', desc: 'Premium office furniture' },
    { id: 7, category: 'Outdoor', src: '/Images/Outdoor.jpg', title: 'Al Fresco Dining', desc: 'Durable outdoor solutions' },
    { id: 8, category: 'Hotel', src: '/Images/Hotel/Guest Room/Bed Frame/Bed Frame.jpg', title: 'Guest Room Suite', desc: 'Custom bed frame design' },
    { id: 9, category: 'Hotel', src: '/Images/Hotel/Guest Room/Head Board/Head Board.jpg', title: 'Upholstered Headboard', desc: 'Detail-oriented craftsmanship' },
    { id: 10, category: 'Restaurant', src: '/Images/Restaurant/Dining Area/Booths/double booth.png', title: 'Private Booths', desc: 'Intimate dining experience' },
    { id: 11, category: 'Office', src: '/Images/Office/Storage and Organization/DMD SoftClose Modular Cabinet.png', title: 'Modular Storage', desc: 'Functional office organization' }
  ];

  // Mood Boards Data
  const moodBoards = [
    {
      title: 'Modern Hotel Room',
      palette: ['#2E2E2E', '#707070', '#D4AF37', '#F0F0F0'],
      materials: 'Matte black metal, Beige linen, Walnut veneer'
    },
    {
      title: 'Industrial Restaurant',
      palette: ['#1F2937', '#6B7280', '#B45309', '#F3F4F6'],
      materials: 'Raw steel, Leather, Reclaimed wood'
    },
    {
      title: 'Luxury Lobby',
      palette: ['#0F172A', '#334155', '#C69C6D', '#E5E7EB'],
      materials: 'Brass, Velvet, Marble'
    }
  ];

  const filteredItems = activeFilter === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeFilter);

  const filters = ['All', 'Hotel', 'Restaurant', 'Office', 'Outdoor'];

  return (
    <div className="inspirations-page">
      {/* Hero Section */}
      <section className="inspirations-hero" style={{ backgroundImage: "url('/Images/Our_Projects.jpg')" }}>
        <div className="hero-overlay"></div>
        <div className="hero-content" data-aos="fade-up">
          <h1>Curated Inspirations</h1>
          <p>Explore our portfolio of design-driven furniture solutions for hospitality, commercial, and retail spaces.</p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="gallery-section container">
        <div className="filter-bar" data-aos="fade-up" data-aos-delay="100">
          {filters.map(filter => (
            <button
              key={filter}
              className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="masonry-grid">
          {filteredItems.map((item, index) => (
            <div 
              key={item.id} 
              className="grid-item"
              data-aos="fade-up"
              data-aos-delay={index * 50}
              onClick={() => setSelectedImage(item)}
            >
              <div className="image-wrapper">
                <img src={item.src} alt={item.title} loading="lazy" />
                <div className="hover-overlay">
                  <div className="hover-content">
                    <span className="category-tag">{item.category}</span>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                    <button className="view-btn"><FiZoomIn /> View</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mood Boards Section */}
      <section className="mood-boards-section">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <h2>Design Palettes</h2>
            <p>Material and color concepts that define our collections.</p>
          </div>
          <div className="mood-boards-grid">
            {moodBoards.map((board, index) => (
              <div key={index} className="mood-card" data-aos="fade-up" data-aos-delay={index * 100}>
                <h3>{board.title}</h3>
                <div className="palette-strip">
                  {board.palette.map((color, i) => (
                    <div key={i} className="color-swatch" style={{ backgroundColor: color }} title={color}></div>
                  ))}
                </div>
                <p className="materials-text"><strong>Materials:</strong> {board.materials}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="lightbox-overlay" onClick={() => setSelectedImage(null)}>
          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedImage(null)}><FiX /></button>
            <img src={selectedImage.src} alt={selectedImage.title} />
            <div className="lightbox-details">
              <h3>{selectedImage.title}</h3>
              <p>{selectedImage.desc}</p>
              <span className="lightbox-category">{selectedImage.category}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Inspirations;
