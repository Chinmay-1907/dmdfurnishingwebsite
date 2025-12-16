import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FiMoon, FiSun } from 'react-icons/fi';
import '../styles/Header.css';
import ProductSearch from './ProductSearch';

function Header({ theme = 'light', onToggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isDarkMode = theme === 'dark';
  const location = useLocation();

  const handleMenuToggle = () => setMenuOpen((open) => !open);

  const closeMenu = () => setMenuOpen(false);
  const handleThemeToggle = () => {
    if (onToggleTheme) {
      onToggleTheme();
    }
  };

  useEffect(() => {
    const updateScrollState = () => {
      setIsScrolled(window.scrollY > 24);
    };

    updateScrollState();
    window.addEventListener('scroll', updateScrollState, { passive: true });
    return () => window.removeEventListener('scroll', updateScrollState);
  }, []);

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
            <img src="/DMD_Furnishing_Logo_Embedded.svg" alt="DMD Furnishing Logo" className="logo-image" />
          </Link>
        </div>
        <nav className={`main-nav${menuOpen ? ' open' : ''}`}> 
          <ul className="nav-links">
            <li><NavLink to="/" end onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink></li>
            <li><NavLink to="/about" end onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>About Us</NavLink></li>
            <li><NavLink to="/products" onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>Products</NavLink></li>
            <li><NavLink to="/projects" onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>Projects</NavLink></li>
            <li><NavLink to="/inspirations" onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>Inspirations</NavLink></li>
            <li><NavLink to="/testimonials" onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>Testimonials</NavLink></li>
            <li><NavLink to="/services" onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>Services</NavLink></li>
            <li className="nav-contact">
              <Link to="/contact" onClick={closeMenu}>
                <span className="nav-contact-label">Contact</span>
                <span className="nav-contact-meta">+1 (617) 223-7781</span>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="header-actions">
          <ProductSearch />
          <Link to="/contact" className="consultation-button" onClick={closeMenu}>
            Book Consultation
          </Link>
          <button
            type="button"
            className="theme-toggle"
            onClick={handleThemeToggle}
            aria-label={`${isDarkMode ? 'light' : 'dark'} mode`}
            aria-pressed={isDarkMode}
            title={`${isDarkMode ? 'Light' : 'Dark'} mode`}
          >
            <span className="visually-hidden">{`${isDarkMode ? 'light' : 'dark'} mode`}</span>
            {isDarkMode ? <FiSun aria-hidden="true" focusable="false" /> : <FiMoon aria-hidden="true" focusable="false" />}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
