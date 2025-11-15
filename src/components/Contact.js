import React from 'react';
import '../styles/Contact.css';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';
import styles from '../styles/AboutUs.module.css';

function Contact() {

  return (
    <div className="contact-container">
      <section className={styles.heroSection} style={{
        background: 'linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.4)), url("/Images/Contact_Page.jpg")',
		backgroundSize: 'cover',
		backgroundPosition: 'bottom center',
		backgroundRepeat: 'no-repeat',
		backgroundAttachment: 'fixed'
      }}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Contact Us</h1>
          <p className={styles.heroSubtitle}>Get in touch for a personalized furniture consultation</p>
        </div>
      </section>

      <section className="contact-content">
        <div className="contact-info">
          <h2>Reach Out to Us</h2>
          <div className="info-item">
            <div className="info-icon">
              <FaMapMarkerAlt />
            </div>
            <div className="info-text">
            <h3>Address</h3>
            <p>56 Leonard St Unit 5</p>
            <p>Foxboro, MA 02035</p>
            </div>
          </div>
          <div className="info-item">
            <div className="info-icon">
              <FaPhone />
            </div>
            <div className="info-text">
              <h3>Phone</h3>
              <p>+1 (617) 223-7781</p>
            </div>
          </div>
          <div className="info-item">
            <div className="info-icon">
              <FaEnvelope />
            </div>
            <div className="info-text">
              <h3>Email</h3>
              <p>Sales@DMDFurnishing.com</p>
            </div>
          </div>
          <div className="info-item">
            <div className="info-icon">
              <FaClock />
            </div>
            <div className="info-text">
              <h3>Showroom Hours (By Appointment Only)</h3>
              <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p>Saturday: 10:00 AM - 4:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
          </div>
        </div>

        <div className="contact-form">
          <h2>Request a Consultation</h2>
          <form>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className="form-group">
              <label htmlFor="company">Company Name</label>
              <input type="text" id="company" name="company" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input type="tel" id="phone" name="phone" required />
            </div>
            <div className="form-group">
              <label htmlFor="project">Project Type</label>
              <select id="project" name="project" required>
                <option value="">Select Project Type</option>
                <option value="hotel">Hotel/Resort Furnishing</option>
                <option value="restaurant">Restaurant Furnishing</option>
                <option value="office">Office Furnishing</option>
                <option value="custom">Custom Project</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="5" required></textarea>
            </div>
            <button type="submit" className="submit-button">Submit Request</button>
          </form>
        </div>
      </section>

      <section className="map-section">
        <h2>Visit Our Showroom</h2>
        <div className="map-container">
          <div className="map-placeholder">
            <div className="placeholder-content">
              <FaMapMarkerAlt className="placeholder-icon" />
        <p>56 Leonard St Unit 5, Foxboro, MA 02035</p>
              <p className="placeholder-note">Showroom visits are available by appointment only—call to arrange a personalized viewing and experience our craftsmanship firsthand.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="consultation-cta">
        <h2>Prefer a Phone Consultation?</h2>
        <p>Schedule a call with one of our furniture specialists at your convenience.</p>
        <button className="cta-button" onClick={() => window.location.href = 'tel:+16172237781'}>
          Schedule a Call
        </button>
      </section>
    </div>
  );
}

export default Contact;