import React from 'react';
import Link from 'next/link';
import { FaLinkedinIn, FaInstagram, FaFacebookF, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import './Footer.css';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">

        {/* ── Brand block ── */}
        <div className="footer-brand">
          <span className="footer-eyebrow">Commercial FF&amp;E Manufacturer</span>
          <div className="footer-brand-title">DMD Furnishing</div>
          <p className="footer-brand-tagline">
            Custom hospitality &amp; commercial furniture, built to specification —
            from concept through installation.
          </p>
        </div>

        {/* ── Nav columns ── */}
        <div className="footer-top">
          <div className="footer-links">

            <div className="footer-column">
              <div className="footer-column-title">Quick Links</div>
              <ul>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/products">Our Products</Link></li>
                <li><Link href="/projects">Recent Projects</Link></li>
                <li><Link href="/blog">Blog</Link></li>
              </ul>
            </div>

            <div className="footer-column">
              <div className="footer-column-title">Services</div>
              <ul>
                <li><Link href="/services#process">Design Consultation</Link></li>
                <li><Link href="/services#process">Custom Manufacturing</Link></li>
                <li><Link href="/services#process">FF&amp;E Project Management</Link></li>
                <li><Link href="/services#process">Installation &amp; Setup</Link></li>
              </ul>
            </div>

            <div className="footer-column">
              <div className="footer-column-title">Contact</div>
              <address style={{ fontStyle: 'normal' }}>
                <ul>
                  <li className="footer-address-line">
                    56 Leonard St Unit 5<br />Foxboro, MA 02035
                  </li>
                  <li><a href="tel:+16172237781">+1 (617) 223-7781</a></li>
                  <li><a href="mailto:sales@dmdfurnishing.com">sales@dmdfurnishing.com</a></li>
                </ul>
              </address>
            </div>

          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="footer-bottom">
          <div className="footer-bottom-divider" aria-hidden="true" />
          <div className="footer-bottom-inner">
            <p className="copyright">
              &copy; {new Date().getFullYear()} DMD Furnishing. All Rights Reserved.
            </p>
            <div className="social-links">
              <a
                href="https://www.linkedin.com/company/dmd-usaa/"
                className="social-icon"
                aria-label="DMD Furnishing on LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedinIn size={16} />
              </a>
              <a
                href="#"
                className="social-icon"
                aria-label="DMD Furnishing on Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram size={16} />
              </a>
              <a
                href="#"
                className="social-icon"
                aria-label="DMD Furnishing on X"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaXTwitter size={15} />
              </a>
              <a
                href="#"
                className="social-icon"
                aria-label="DMD Furnishing on Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookF size={15} />
              </a>
              <a
                href="#"
                className="social-icon"
                aria-label="DMD Furnishing on YouTube"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaYoutube size={16} />
              </a>
            </div>
            <Link href="/website-policies" className="footer-policy-link">
              Website Policies
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
