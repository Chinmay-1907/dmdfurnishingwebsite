import React, { useEffect } from 'react';
import '../styles/Home.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FiPhone, FiMail, FiCalendar } from 'react-icons/fi';

function Home() {
  const heroSlides = [
    {
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      eyebrow: 'Bespoke Hospitality Suites',
      title: 'Tailored Guestroom Collections',
      copy: 'Layer plush upholstery, bespoke case goods, and refined decor accents for signature guest experiences.'
    },
    {
      image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      eyebrow: 'Curated Dining Concepts',
      title: 'Elevated Restaurant Seating',
      copy: 'Craft dining environments that balance durability with sculptural silhouettes and luxe textures.'
    },
    {
      image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      eyebrow: 'Signature Lobby Moments',
      title: 'Modern Social Lounges',
      copy: 'Shape welcoming arrival experiences with statement lounges, accent lighting, and bespoke detailing.'
    },
    {
      image: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      eyebrow: 'Resort Serenity',
      title: 'Outdoor Retreat Vignettes',
      copy: 'Introduce weather-ready silhouettes and artisanal finishes that invite guests to linger outdoors.'
    }
  ];
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

  return (
    <div className="home-container">
      {/* Hero Section with Slider */}
      <section className="hero-section">
        <Slider {...sliderSettings} className="hero-slider">
          {heroSlides.map((slide, index) => (
            <div key={index} className="hero-slide">
              <img src={slide.image} alt={`Furniture slide ${index + 1}`} className="slide-image" />
              <div className="hero-overlay">
                <div className="hero-content">
                  <span className="hero-eyebrow">{slide.eyebrow}</span>
                  <h1>{slide.title}</h1>
                  <p>{slide.copy}</p>
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
          <div className="contact-copy">
            <h2>Ready to Transform Your Space?</h2>
            <p>
              DMD Furnishing sets the bar for high-end hospitality furniture. We partner with owners, brands, and designers to shape unforgettable interiors.
            </p>
          </div>
          <div className="contact-actions">
            <a className="contact-chip" href="tel:+18005551234">
              <FiPhone aria-hidden="true" focusable="false" />
              <span>+1 (800) 555-1234</span>
            </a>
            <a className="contact-chip" href="mailto:info@dmdfurnishing.com">
              <FiMail aria-hidden="true" focusable="false" />
              <span>info@dmdfurnishing.com</span>
            </a>
            <Link to="/contact" className="contact-chip contact-chip--cta">
              <FiCalendar aria-hidden="true" focusable="false" />
              <span>Schedule a Free Call</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}



export default Home;

