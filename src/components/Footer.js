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
                <li><Link to="/services#design-consultation">Design Consultation (Hospitality)</Link></li>
                <li><Link to="/services#custom-manufacturing">Custom Furniture Manufacturing</Link></li>
                <li><Link to="/services#ffe-project-management">FF&E (Furniture & Fixtures) Project Management</Link></li>
                <li><Link to="/services#installation-setup">Installation & Setup</Link></li>
              </ul>
            </div>
            <div className="footer-column">
              <h3>Contact</h3>
              <ul>
                <li>56 Leonard St Unit 5, Foxboro, MA 02035</li>
                <li>+1 (617) 223-7781</li>
              <li>Sales@DMDFurnishing.com</li>
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

export default Footer;