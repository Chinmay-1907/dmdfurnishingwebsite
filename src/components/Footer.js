import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

function Footer() {
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
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/products">Our Products</Link></li>
                <li><Link to="/projects">Recent Projects</Link></li>
              </ul>
            </div>
            <div className="footer-column">
              <h3>Services</h3>
              <ul>
                <li><Link to="/services">Design Consultation</Link></li>
                <li><Link to="/services">Custom Manufacturing</Link></li>
                <li><Link to="/services">Project Management</Link></li>
                <li><Link to="/services">Installation Services</Link></li>
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
            <a href="#" className="social-icon">FB</a>
            <a href="#" className="social-icon">IG</a>
            <a href="#" className="social-icon">LI</a>
            <a href="#" className="social-icon">PT</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;