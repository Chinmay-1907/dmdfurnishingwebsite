import React, { useEffect } from 'react';
import '../styles/Home.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Home() {
  useEffect(() => {
    AOS.init({
      offset: 2,
      duration: 600,
      delay: 0,
      easing: 'ease',
      once: true,
      mirror: false
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
                  <span className="hero-eyebrow">Luxury Hospitality Furniture</span>
                  <h1>Luxury Hospitality Furniture</h1>
                  <p>Elevate your space with our premium collections</p>
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

          {/* Premium Collections */}
          <div className="nav-item" data-aos="fade-up" data-aos-delay="400">
            <div className="nav-image" style={{backgroundImage: `url('https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')`}}>
              <div className="nav-overlay">
                <h3>Premium Collections</h3>
              </div>
            </div>
            <div className="nav-content">
              <p>Discover curated suites from our signature line featuring handcrafted hospitality statements.</p>
              <Link to="/inspirations">
                <button className="nav-button">Explore Collection</button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="contact-section">
        <div className="contact-overlay"></div>
        <div className="contact-content">
          <h2>Ready to Transform Your Space?</h2>
          <p>
            DMD Furnishing has set the bar for high-end hospitality furniture. We work with select owners, brands and designers to create unforgettable hotel interiors.
          </p>
          
          <div className="contact-info-container">
            <div className="contact-info-item">
              <i className="contact-icon">📞</i>
              <span>+1 (800) 555-1234</span>
            </div>
            <div className="contact-info-item">
              <i className="contact-icon">✉️</i>
              <span>info@dmdfurnishing.com</span>
            </div>
            <div className="contact-info-item">
              <i className="contact-icon">📅</i>
              <Link to="/contact">
                <button className="cta-button">Schedule a Free Call</button>
              </Link>
            </div>
          </div>
          
        </div>
      </section>
    </div>
  );
}



export default Home;

