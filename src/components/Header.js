import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMoon, FiSun } from 'react-icons/fi';
import '../styles/Header.css';

function Header({ theme = 'light', onToggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isDarkMode = theme === 'dark';

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
            <li><Link to="/" onClick={closeMenu}>Home</Link></li>
            <li><Link to="/about" onClick={closeMenu}>About Us</Link></li>
            <li><Link to="/products" onClick={closeMenu}>Products</Link></li>
            <li><Link to="/projects" onClick={closeMenu}>Projects</Link></li>
            <li><Link to="/inspirations" onClick={closeMenu}>Inspirations</Link></li>
            <li><Link to="/testimonials" onClick={closeMenu}>Testimonials</Link></li>
            <li><Link to="/services" onClick={closeMenu}>Services</Link></li>
            <li className="nav-contact">
              <Link to="/contact" onClick={closeMenu}>
                <span className="nav-contact-label">Contact</span>
                <span className="nav-contact-meta">(617) 223-7781</span>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="header-actions">
          <Link to="/contact" className="consultation-button" onClick={closeMenu}>
            Book Consultation
          </Link>
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
      </div>
    </header>
  );
}

export default Header;
