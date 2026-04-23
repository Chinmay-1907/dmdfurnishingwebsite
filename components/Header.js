'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import ThemeToggle from './ThemeToggle';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

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

  // Helper to determine active nav link class
  const navLinkClass = (href, exact = false) => {
    const isActive = exact ? pathname === href : pathname.startsWith(href);
    return isActive ? 'active' : '';
  };

  // Pages where the hero is light-colored (or the light theme overrides the page bg to cream)
  // Force dark header text so it's readable before scrolling.
  // Project detail pages (/projects/[id]) use hotel interior photos with a thin overlay,
  // so white nav text is unreadable there. The listing (/projects exactly) has a dark hero.
  // Blog and guides pages use hardcoded dark CSS but the light theme overrides the root
  // background to cream, making white nav text invisible. Both the listing pages and all
  // sub-routes (individual posts and guide slugs) need the same treatment.
  const isLightHeroPage =
    pathname === '/contact' ||
    pathname === '/inspirations' ||
    pathname.startsWith('/blog') ||
    pathname.startsWith('/guides') ||
    pathname.startsWith('/products') || // product pages flip to light in light mode. Nav text must go dark at top too
    (pathname.startsWith('/projects/') && pathname.length > '/projects/'.length);

  return (
    <header
      className={`site-header${isScrolled ? ' compact' : ''}${menuOpen ? ' menu-open' : ''}${isLightHeroPage ? ' light-hero-page' : ''}`}
      style={headerStyle}
    >
      {/* Mobile nav backdrop overlay */}
      <div
        className="mobile-nav-backdrop"
        aria-hidden="true"
        onClick={closeMenu}
      />
      <div className="header-container container">
        <div className="header-branding">
          <button
            type="button"
            className={`hamburger-menu${menuOpen ? ' open' : ''}`}
            onClick={handleMenuToggle}
            aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={menuOpen}
            aria-controls="site-navigation"
          >
            <span className="hamburger-icon"></span>
            <span className="hamburger-icon"></span>
            <span className="hamburger-icon"></span>
          </button>
          <Link href="/">
            <Image
              src="/DMD_Furnishing_Logo_Embedded.svg"
              alt="DMD Furnishing Logo"
              className="logo-image"
              width={180}
              height={60}
              priority
            />
          </Link>
        </div>
        <nav id="site-navigation" className={`main-nav${menuOpen ? ' open' : ''}`}>
          <ul className="nav-links">
            <li><Link href="/" onClick={closeMenu} className={navLinkClass('/', true)}>Home</Link></li>
            <li><Link href="/about" prefetch={false} onClick={closeMenu} className={navLinkClass('/about', true)}>About Us</Link></li>
            <li><Link href="/products" onClick={closeMenu} className={navLinkClass('/products')}>Products</Link></li>
            <li><Link href="/services" onClick={closeMenu} className={navLinkClass('/services')}>Services</Link></li>
            <li><Link href="/projects" prefetch={false} onClick={closeMenu} className={navLinkClass('/projects')}>Projects</Link></li>
            <li><Link href="/inspirations" prefetch={false} onClick={closeMenu} className={navLinkClass('/inspirations')}>Inspirations</Link></li>
            <li><Link href="/guides" prefetch={false} onClick={closeMenu} className={navLinkClass('/guides')}>Guides</Link></li>
            <li><Link href="/blog" prefetch={false} onClick={closeMenu} className={navLinkClass('/blog')}>Blog</Link></li>
            {/* <li><Link href="/testimonials" onClick={closeMenu} className={navLinkClass('/testimonials')}>Testimonials</Link></li> */}
            <li className="nav-consultation-mobile"><Link href="/contact" className="btn" onClick={closeMenu}>Book Consultation</Link></li>
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
          <ThemeToggle />
          <Link href="/contact" className="consultation-button" onClick={closeMenu}>
            Book Consultation
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
