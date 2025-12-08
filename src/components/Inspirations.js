import React, { useEffect } from 'react';
import '../styles/Inspirations.css';
import { Link, useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import styles from '../styles/AboutUs.module.css';

function Inspirations() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true, mirror: false });
  }, []);

  const navigate = useNavigate();

  const categories = [
    {
      title: 'Hotel Interiors',
      subtitle: 'Guestrooms, Suites, Lobbies',
      image: '/Images/Hotel/Lobby Area/Lobby Area.jpg',
      to: '/products'
    },
    {
      title: 'Restaurant & Café Designs',
      subtitle: 'Dining, Bar tables, Booths',
      image: '/Images/Restaurant/Restaurant.jpg',
      to: '/products'
    },
    {
      title: 'Office Inspirations',
      subtitle: 'Conference rooms, workstations',
      image: '/Images/Office/Workstations/Office Workstations.jpg',
      to: '/products'
    },
    {
      title: 'Commercial & Retail Spaces',
      subtitle: 'Reception, waiting area, custom storage',
      image: '/Images/Premium Collections.jpg',
      to: '/products'
    }
  ];

  const moodBoards = [
    {
      title: 'Modern Hotel Room',
      palette: ['#2E2E2E', '#707070', '#D4AF37', '#F0F0F0'],
      materials: ['Matte black metal', 'Beige linen', 'Walnut veneer']
    },
    {
      title: 'Industrial Restaurant',
      palette: ['#1F2937', '#6B7280', '#B45309', '#F3F4F6'],
      materials: ['Raw steel', 'Leather', 'Reclaimed wood']
    },
    {
      title: 'Luxury Lobby',
      palette: ['#0F172A', '#334155', '#C69C6D', '#E5E7EB'],
      materials: ['Brass', 'Velvet', 'Marble']
    },
    {
      title: 'Minimalist Office',
      palette: ['#111827', '#9CA3AF', '#E5E7EB', '#FFFFFF'],
      materials: ['Birch plywood', 'Powder-coated steel', 'Grey fabric']
    },
    {
      title: 'Classic Guestroom',
      palette: ['#3F3F46', '#78716C', '#A78BFA', '#FAFAF9'],
      materials: ['Solid wood', 'Woven textiles', 'Antique brass']
    }
  ];

  const furnitureShowcase = [
    { title: 'Beds', image: '/Images/Hotel/Guest Room/Bed Frame/Bed Frame.jpg', description: 'Durable frames in MDF or metal, tailored sizes.' },
    { title: 'Headboards', image: '/Images/Hotel/Guest Room/Head Board/Head Board.jpg', description: 'Upholstered and MDF designs with elegant profiles.' },
    { title: 'Nightstands', image: '/Images/Hotel/Guest Room/Night Stand/Night Stand.jpg', description: 'Single or double drawer options with soft-close.' },
    { title: 'Desks', image: '/Images/Hotel/Guest Room/Desk/Desk.jpg', description: 'Executive and workstation desks for hospitality use.' },
    { title: 'Credenzas', image: '/Images/Office/Storage and Organization/DMD SoftClose Modular Cabinet.png', description: 'Modular storage solutions with premium finishes.' },
    { title: 'Booths', image: '/Images/Restaurant/Dining Area/Booths/double booth.png', description: 'Restaurant booth seating in custom configurations.' },
    { title: 'Wardrobes', image: '/Images/University/Dormitory/Wardrobes/2-Door Wardrobe/2-Door Wardrobe.png', description: 'Sturdy wardrobes with sliding or hinged doors.' }
  ];

  const inspirationGallery = [
    '/Images/Hotel/Lobby Area/Lobby Area.jpg',
    '/Images/Hotel/hotel-seating/hotel-seating.jpg',
    '/Images/Restaurant/Dining Area/Dinnig Area.jpg',
    '/Images/Restaurant/Restaurant.jpg',
    '/Images/Office/Workstations/Office Workstations.jpg',
    '/Images/Office/office.jpg',
    '/Images/Outdoor.jpg'
  ];

  return (
    <div className="inspirations-container">
      {/* Hero Section */}
      <section className={styles.heroSection} style={{
        background: `linear-gradient(to right, rgba(0,0,0,0.75), rgba(0,0,0,0.35)), url("${encodeURI('/Images/Our_Projects.jpg')}" )`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Design Inspirations</h1>
          <p className={styles.heroSubtitle}>Explore our curated collection of hospitality design inspirations.</p>
        </div>
      </section>

      {/* Category Image Cards */}
      <section className="inspirations-categories" data-aos="fade-up">
        <div className="category-grid">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              className="category-card"
              onClick={() => navigate(cat.to)}
              aria-label={`Explore ${cat.title}`}
            >
              <div
                className="category-image"
                style={{ backgroundImage: `url("${encodeURI(cat.image)}")` }}
              >
                <div className="category-overlay">
                  <h3>{cat.title}</h3>
                  <p>{cat.subtitle}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Mood Boards */}
      <section className="inspirations-moodboards" data-aos="fade-up">
        <h2>Inspiration Mood Boards</h2>
        <div className="moodboard-grid">
          {moodBoards.map((board, idx) => (
            <div className="moodboard-card" key={idx}>
              <h3>{board.title}</h3>
              <div className="moodboard-palettes">
                {board.palette.map((color, cIdx) => (
                  <span key={cIdx} className="palette-swatch" style={{ backgroundColor: color }} />
                ))}
              </div>
              <div className="moodboard-materials">
                {board.materials.map((m, mIdx) => (
                  <span key={mIdx} className="material-chip">{m}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DMD Custom Furniture Showcase */}
      <section className="inspirations-showcase" data-aos="fade-up">
        <h2>DMD Custom Furniture Showcase</h2>
        <div className="showcase-grid">
          {furnitureShowcase.map((item, idx) => (
            <div className="showcase-card" key={idx}>
              <div className="showcase-image" style={{ backgroundImage: `url("${encodeURI(item.image)}")` }} />
              <div className="showcase-content">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Inspiration Gallery */}
      <section className="inspirations-image-grid" data-aos="fade-up">
        <div className="image-grid">
          {inspirationGallery.map((img, idx) => (
            <div key={idx} className="image-item" style={{ backgroundImage: `url("${encodeURI(img)}")` }} />
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="inspirations-cta" data-aos="fade-up">
        <h2>Ready to bring your design vision to life?</h2>
        <div className="cta-actions">
          <Link to="/contact" className="cta-button primary">Request a Quote</Link>
          <Link to="/contact" className="cta-button">Contact Us</Link>
        </div>
      </section>
    </div>
  );
}

export default Inspirations;
