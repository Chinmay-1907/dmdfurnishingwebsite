import React from 'react';
import Link from 'next/link';
import '../styles/Footer.css';

function NextFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-logo">
            <h2>DMD Furnishing</h2>
            <p>Luxury furniture solutions for discerning clients</p>
          </div>
          <div className="footer-links">
            <div className="footer-column">
              <h3>Quick Links</h3>
              <ul>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/products">Our Products</Link></li>
                <li><Link href="/projects">Recent Projects</Link></li>
              </ul>
            </div>
            <div className="footer-column">
              <h3>Services</h3>
              <ul>
                <li><Link href="/services">Design Consultation</Link></li>
                <li><Link href="/services">Custom Manufacturing</Link></li>
                <li><Link href="/services">Project Management</Link></li>
                <li><Link href="/services">Installation Services</Link></li>
              </ul>
            </div>
            <div className="footer-column">
              <h3>Contact</h3>
              <ul>
                <li>123 Luxury Avenue, Suite 500</li>
                <li>New York, NY 10001</li>
                <li>+1 (555) 123-4567</li>
                <li>info@dmdfurnishing.com</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="copyright">
            <p>&copy; {new Date().getFullYear()} DMD Furnishing. All Rights Reserved.</p>
          </div>
          <div className="social-links">
            <a href="https://facebook.com/dmdfurnishing" className="social-icon" aria-label="Visit our Facebook page">FB</a>
            <a href="https://instagram.com/dmdfurnishing" className="social-icon" aria-label="Visit our Instagram profile">IG</a>
            <a href="https://linkedin.com/company/dmdfurnishing" className="social-icon" aria-label="Visit our LinkedIn page">LI</a>
            <a href="https://pinterest.com/dmdfurnishing" className="social-icon" aria-label="Visit our Pinterest board">PT</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default NextFooter;