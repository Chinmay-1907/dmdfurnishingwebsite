import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import '../styles/Header.css';
import ProductSearch from './ProductSearch';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleMenuToggle = () => setMenuOpen((open) => !open);
  const closeMenu = () => setMenuOpen(false);


  useEffect(() => {
    const updateScrollState = () => {
      setIsScrolled(window.scrollY > 24);
    };

    updateScrollState();
    window.addEventListener('scroll', updateScrollState, { passive: true });
    return () => window.removeEventListener('scroll', updateScrollState);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add('body-no-scroll');
    } else {
      document.body.classList.remove('body-no-scroll');
    }
    return () => {
      document.body.classList.remove('body-no-scroll');
    };
  }, [menuOpen]);

  const headerStyle = {
    '--header-current-height': isScrolled ? 'var(--header-height-compact)' : 'var(--header-height)',
  };

  return (
    <header
      className={`site-header${isScrolled ? ' compact' : ''}${menuOpen ? ' menu-open' : ''}`}
      style={headerStyle}
    >
      <div className="header-container container">
        <div className="header-branding">
          <button
            type="button"
            className={`hamburger-menu${menuOpen ? ' open' : ''}`}
            onClick={handleMenuToggle}
            aria-label="Toggle navigation"
          >
            <span className="hamburger-icon"></span>
            <span className="hamburger-icon"></span>
            <span className="hamburger-icon"></span>
          </button>
          <Link to="/">
            <img src="/DMD_Furnishing_Logo_Embedded.svg" alt="DMD Furnishing Logo" className="logo-image" width="180" height="60" />
          </Link>
        </div>
        <nav className={`main-nav${menuOpen ? ' open' : ''}`}> 
          <ul className="nav-links">
            <li><NavLink to="/" end onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink></li>
            <li><NavLink to="/about" end onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>About Us</NavLink></li>
            <li><NavLink to="/products" onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>Products</NavLink></li>
            <li><NavLink to="/services" onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>Services</NavLink></li>
            <li><NavLink to="/projects" onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>Projects</NavLink></li>
            <li><NavLink to="/inspirations" onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>Inspirations</NavLink></li>
            {/* <li><NavLink to="/testimonials" onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>Testimonials</NavLink></li> */}
            <li className="nav-consultation-mobile"><Link to="/contact" className="btn" onClick={closeMenu}>Book Consultation</Link></li>
            <li className="nav-contact">
              <a href="tel:+16172237781" className="nav-contact-phone">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.58 3.41 2 2 0 0 1 3.55 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.51a16 16 0 0 0 6 6l.88-.88a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <span>+1 (617) 223-7781</span>
              </a>
            </li>
          </ul>
        </nav>
        <div className="header-actions">
          <ProductSearch />
          <Link to="/contact" className="consultation-button" onClick={closeMenu}>
            Book Consultation
          </Link>

        </div>
      </div>
    </header>
  );
}

export default Header;
