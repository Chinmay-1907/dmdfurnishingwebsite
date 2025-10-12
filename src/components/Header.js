import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMoon, FiSun } from 'react-icons/fi';
import '../styles/Header.css';

function Header({ theme = 'light', onToggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const isDarkMode = theme === 'dark';

  const handleMenuToggle = () => setMenuOpen((open) => !open);
  const handleThemeToggle = () => {
    if (onToggleTheme) {
      onToggleTheme();
    }
  };

  return (
    <header className="site-header">
      <div className="header-container">
        <div className={`hamburger-menu${menuOpen ? ' open' : ''}`} onClick={handleMenuToggle} aria-label="Toggle navigation" tabIndex={0} role="button" onKeyPress={e => { if (e.key === 'Enter' || e.key === ' ') handleMenuToggle(); }}>
          <span className="hamburger-icon"></span>
          <span className="hamburger-icon"></span>
          <span className="hamburger-icon"></span>
        </div>
        <div className="logo">
          <Link to="/">
            <img src="/DMD_Furnishing_Logo_Embedded.svg" alt="DMD Furnishing Logo" className="logo-image" />
          </Link>
        </div>
        <nav className={`main-nav${menuOpen ? ' open' : ''}`}> 
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/projects">Projects</Link></li>
            <li><Link to="/inspirations">Inspirations</Link></li>
            <li><Link to="/testimonials">Testimonials</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </nav>
        <div className="contact-number">
          <a href="tel:+16172237781">(617) 223-7781</a>
        </div>
        <div className="nav-cta">
          <button className="consultation-button">Book Consultation</button>
        </div>
        <button
          type="button"
          className="theme-toggle"
          onClick={handleThemeToggle}
          aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
          aria-pressed={isDarkMode}
          title={`${isDarkMode ? 'Light' : 'Dark'} mode`}
        >
          <span className="visually-hidden">{`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}</span>
          {isDarkMode ? <FiSun aria-hidden="true" focusable="false" /> : <FiMoon aria-hidden="true" focusable="false" />}
        </button>
      </div>
    </header>
  );
}

export default Header;
