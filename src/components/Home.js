import React, { useEffect, useRef } from 'react';
import '../styles/Home.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Home() {
  // Create ref for the inspirations slider
  const sliderRef = useRef(null);
  
  // Scroll functions for inspiration slider navigation
  const scrollLeft = () => {
    if (sliderRef.current) {
      const scrollAmount = sliderRef.current.offsetWidth;
      sliderRef.current.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      });
    }
  };
  
  const scrollRight = () => {
    if (sliderRef.current) {
      const scrollAmount = sliderRef.current.offsetWidth;
      sliderRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  
  // Initialize AOS animation library
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      mirror: false,
      disableMutationObserver: false
    });
  }, []);

  // Slideshow settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    cssEase: 'linear',
    pauseOnHover: false
  };

  // Slideshow images with furniture-specific photos
  const slideImages = [
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', // Modern sofa
    'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', // Luxury bedroom
    'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', // Hotel lobby furniture
    'https://images.unsplash.com/photo-1540574163026-643ea20ade25?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' // Dining set
  ];

  return (
    <div className="home-container">
      {/* Hero Section with Slider */}
      <section className="hero-section">
        <Slider {...sliderSettings} className="hero-slider">
          {slideImages.map((image, index) => (
            <div key={index} className="hero-slide">
              <img src={image} alt={`Furniture slide ${index + 1}`} className="slide-image" />
              <div className="hero-overlay">
                <div className="hero-content">
                  <h1>Luxury Hospitality Furniture</h1>
                  <p>Elevate your space with our premium collections</p>
                  <Link to="/products">
                    <button className="cta-button">Explore Our Products</button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      {/* Navigation Sections */}
      <section className="page-navigation-section">
        <h2 className="section-title" data-aos="fade-up">Discover Our World</h2>
        <p className="section-subtitle" data-aos="fade-up" data-aos-delay="100">Navigate through our complete offerings</p>
        
        <div className="nav-grid">
          {/* About Us Section */}
          <div className="nav-item" data-aos="fade-up" data-aos-delay="150">
            <div className="nav-image" style={{backgroundImage: `url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')`}}>
              <div className="nav-overlay">
                <h3>About Us</h3>
              </div>
            </div>
            <div className="nav-content">
              <p>Learn about our history, values, and commitment to excellence in hospitality furniture.</p>
              <Link to="/about">
                <button className="nav-button">Our Story</button>
              </Link>
            </div>
          </div>

          {/* Products Section */}
          <div className="nav-item" data-aos="fade-up" data-aos-delay="200">
            <div className="nav-image" style={{backgroundImage: `url('https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')`}}>
              <div className="nav-overlay">
                <h3>Our Products</h3>
              </div>
            </div>
            <div className="nav-content">
              <p>Explore our exclusive range of luxury furniture designed for hospitality spaces.</p>
              <Link to="/products">
                <button className="nav-button">Browse Collection</button>
              </Link>
            </div>
          </div>

          {/* Projects Section */}
          <div className="nav-item" data-aos="fade-up" data-aos-delay="250">
            <div className="nav-image" style={{backgroundImage: `url('https://images.unsplash.com/photo-1540638349517-3abd5afc5847?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')`}}>
              <div className="nav-overlay">
                <h3>Our Projects</h3>
              </div>
            </div>
            <div className="nav-content">
              <p>View our portfolio of completed projects and successful collaborations.</p>
              <Link to="/projects">
                <button className="nav-button">See Our Work</button>
              </Link>
            </div>
          </div>

          {/* Services Section */}
          <div className="nav-item" data-aos="fade-up" data-aos-delay="300">
            <div className="nav-image" style={{backgroundImage: `url('https://images.unsplash.com/photo-1533090161767-e6ffed986c88?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')`}}>
              <div className="nav-overlay">
                <h3>Our Services</h3>
              </div>
            </div>
            <div className="nav-content">
              <p>Custom solutions tailored to meet the unique needs of your hospitality business.</p>
              <Link to="/services">
                <button className="nav-button">Our Offerings</button>
              </Link>
            </div>
          </div>

          {/* Testimonials Section */}
          <div className="nav-item" data-aos="fade-up" data-aos-delay="350">
            <div className="nav-image" style={{backgroundImage: `url('https://images.unsplash.com/photo-1538688525198-9b88f6f53126?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')`}}>
              <div className="nav-overlay">
                <h3>Customer Testimonials</h3>
              </div>
            </div>
            <div className="nav-content">
              <p>Hear what our clients have to say about their experience working with us.</p>
              <Link to="/testimonials">
                <button className="nav-button">Client Stories</button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Our Premium Collections / Inspirations Gallery Section */}
      <section className="inspirations-section" data-aos="fade-up">
        <h2>Our Premium Collections</h2>
        <p className="section-subtitle">Browse our curated collection of design inspirations</p>
        
        <div className="inspirations-slider-container">
          <div className="inspirations-slider" ref={sliderRef}>
            {/* Horizontal row of 3 inspirations */}
            <div className="inspiration-slide">
              <div className="inspiration-item">
                <div className="inspiration-image" style={{backgroundImage: `url('https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')`}}>
                  <div className="inspiration-overlay">
                    <span className="inspiration-category">Hotel</span>
                  </div>
                </div>
                <div className="inspiration-content">
                  <h3>Modern Minimalist Hotel Lobby</h3>
                  <p>Clean lines and neutral tones create a welcoming atmosphere in this contemporary hotel lobby design.</p>
                  <Link to="/inspirations/1" className="inspiration-link">View Details</Link>
                </div>
              </div>
            </div>
            
            <div className="inspiration-slide">
              <div className="inspiration-item">
                <div className="inspiration-image" style={{backgroundImage: `url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')`}}>
                  <div className="inspiration-overlay">
                    <span className="inspiration-category">Restaurant</span>
                  </div>
                </div>
                <div className="inspiration-content">
                  <h3>Luxury Restaurant Seating</h3>
                  <p>Plush velvet seating and rich wood tones elevate this fine dining experience with sophistication and comfort.</p>
                  <Link to="/inspirations/2" className="inspiration-link">View Details</Link>
                </div>
              </div>
            </div>
            
            <div className="inspiration-slide">
              <div className="inspiration-item">
                <div className="inspiration-image" style={{backgroundImage: `url('https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')`}}>
                  <div className="inspiration-overlay">
                    <span className="inspiration-category">Hotel</span>
                  </div>
                </div>
                <div className="inspiration-content">
                  <h3>Boutique Hotel Suite</h3>
                  <p>A perfect blend of luxury and comfort in this boutique hotel suite featuring custom-designed furniture.</p>
                  <Link to="/inspirations/3" className="inspiration-link">View Details</Link>
                </div>
              </div>
            </div>

            <div className="inspiration-slide">
              <div className="inspiration-item">
                <div className="inspiration-image" style={{backgroundImage: `url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')`}}>
                  <div className="inspiration-overlay">
                    <span className="inspiration-category">Corporate</span>
                  </div>
                </div>
                <div className="inspiration-content">
                  <h3>Executive Lounge Design</h3>
                  <p>Sophisticated and functional furniture creates an ideal environment for business travelers.</p>
                  <Link to="/inspirations/4" className="inspiration-link">View Details</Link>
                </div>
              </div>
            </div>

            <div className="inspiration-slide">
              <div className="inspiration-item">
                <div className="inspiration-image" style={{backgroundImage: `url('https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')`}}>
                  <div className="inspiration-overlay">
                    <span className="inspiration-category">Resort</span>
                  </div>
                </div>
                <div className="inspiration-content">
                  <h3>Coastal Resort Aesthetic</h3>
                  <p>Light, airy furniture with natural materials perfectly complement this beachfront property.</p>
                  <Link to="/inspirations/5" className="inspiration-link">View Details</Link>
                </div>
              </div>
            </div>

            <div className="inspiration-slide">
              <div className="inspiration-item">
                <div className="inspiration-image" style={{backgroundImage: `url('https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')`}}>
                  <div className="inspiration-overlay">
                    <span className="inspiration-category">Cafe</span>
                  </div>
                </div>
                <div className="inspiration-content">
                  <h3>Urban Cafe Concept</h3>
                  <p>Industrial-inspired furniture with warm accents creates a welcoming space for this city cafe.</p>
                  <Link to="/inspirations/6" className="inspiration-link">View Details</Link>
                </div>
              </div>
            </div>
          </div>
          
          <div className="inspiration-nav">
            <button className="inspiration-nav-btn prev" onClick={scrollLeft} aria-label="Previous inspirations">←</button>
            <Link to="/inspirations" className="view-all-btn">View All Inspirations</Link>
            <button className="inspiration-nav-btn next" onClick={scrollRight} aria-label="Next inspirations">→</button>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="contact-section" style={{padding: '80px 20px', backgroundColor: '#1a1a1a', color: 'white', textAlign: 'center'}} data-aos="fade-up">
        <h2 style={{fontSize: '2.2rem', marginBottom: '20px', fontWeight: '300'}}>Ready to Transform Your Space?</h2>
        <p style={{fontSize: '1.1rem', maxWidth: '800px', margin: '0 auto 30px', lineHeight: '1.8'}}>
          For over 30 years, DMD Furnishing has set the bar for high-end hospitality furniture. We work with select owners, brands and designers to create unforgettable hotel interiors.
        </p>
        <Link to="/contact">
          <button className="cta-button">Contact Us</button>
        </Link>
      </section>
    </div>
  );
}

export default Home;