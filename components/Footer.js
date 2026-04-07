import React from 'react';
import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaPinterestP } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-logo">
            <div className="footer-brand-title">DMD Furnishing</div>
            <p>Commercial furniture solutions for hospitality and corporate projects</p>
            <Link href="/website-policies" className="footer-policy-link">Website Policies</Link>
          </div>
          <div className="footer-links">
            <div className="footer-column">
              <div className="footer-column-title">Quick Links</div>
              <ul>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/products">Our Products</Link></li>
                <li><Link href="/projects">Recent Projects</Link></li>
              </ul>
            </div>
            <div className="footer-column">
              <div className="footer-column-title">Services</div>
              <ul>
                <li><Link href="/services#design-consultation">Design Consultation (Hospitality)</Link></li>
                <li><Link href="/services#custom-manufacturing">Custom Furniture Manufacturing</Link></li>
                <li><Link href="/services#ffe-project-management">FF&amp;E (Furniture &amp; Fixtures) Project Management</Link></li>
                <li><Link href="/services#installation-setup">Installation &amp; Setup</Link></li>
              </ul>
            </div>
            <div className="footer-column">
              <div className="footer-column-title">Contact</div>
              <address style={{ fontStyle: 'normal' }}>
                <ul>
                  <li>56 Leonard St Unit 5, Foxboro, MA 02035</li>
                  <li><a href="tel:+16172237781">+1 (617) 223-7781</a></li>
                  <li><a href="mailto:Sales@DMDFurnishing.com">Sales@DMDFurnishing.com</a></li>
                </ul>
              </address>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="copyright">
            <p>&copy; {new Date().getFullYear()} DMD Furnishing. All Rights Reserved.</p>
          </div>
          <div className="social-links">
            <a href="https://facebook.com/dmdfurnishing" className="social-icon" aria-label="Visit our Facebook page" target="_blank" rel="noopener noreferrer"><FaFacebookF size={16} /></a>
            <a href="https://instagram.com/dmdfurnishing" className="social-icon" aria-label="Visit our Instagram profile" target="_blank" rel="noopener noreferrer"><FaInstagram size={16} /></a>
            <a href="https://linkedin.com/company/dmdfurnishing" className="social-icon" aria-label="Visit our LinkedIn page" target="_blank" rel="noopener noreferrer"><FaLinkedinIn size={16} /></a>
            <a href="https://pinterest.com/dmdfurnishing" className="social-icon" aria-label="Visit our Pinterest board" target="_blank" rel="noopener noreferrer"><FaPinterestP size={16} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
