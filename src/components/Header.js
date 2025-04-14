import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

function Header() {
  return (
    <header className="site-header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">DMD Furnishing</Link>
        </div>
        <nav className="main-nav">
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/products">Our Products</Link></li>
            <li><Link to="/projects">Recent Projects</Link></li>
            <li><Link to="/inspirations">Inspirations</Link></li>
            <li><Link to="/testimonials">Testimonials</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </nav>
        <div className="contact-number">
          <a href="tel:+16172237781">+1 (617) 223-7781</a>
        </div>
        <div className="nav-cta">
          <button className="consultation-button">Book Consultation</button>
        </div>
      </div>
    </header>
  );
}

export default Header;