import React from 'react';
import Link from 'next/link';
import '../styles/Header.css';

function NextHeader() {
  return (
    <header className="site-header">
      <div className="header-container">
        <div className="logo">
          <Link href="/">DMD Furnishing</Link>
        </div>
        <nav className="main-nav">
          <ul className="nav-links">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/products">Our Products</Link></li>
            <li><Link href="/projects">Recent Projects</Link></li>
            <li><Link href="/testimonials">Testimonials</Link></li>
            <li><Link href="/services">Services</Link></li>
            <li><Link href="/contact">Contact Us</Link></li>
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

export default NextHeader;