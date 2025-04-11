import React from 'react';
import '../styles/Home.css';

function Home() {
  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Luxury Furniture for Discerning Clients</h1>
          <p>Elevate your space with our premium furniture collections</p>
          <button className="cta-button">Book a Consultation</button>
        </div>
      </section>

      <section className="featured-section">
        <h2>Featured Collections</h2>
        <div className="featured-items">
          <div className="featured-item">
            <div className="featured-image"></div>
            <h3>Luxury Suites</h3>
            <p>Premium furniture for hotel suites</p>
          </div>
          <div className="featured-item">
            <div className="featured-image"></div>
            <h3>Executive Offices</h3>
            <p>Sophisticated workspace solutions</p>
          </div>
          <div className="featured-item">
            <div className="featured-image"></div>
            <h3>Dining Collections</h3>
            <p>Elegant dining experiences</p>
          </div>
        </div>
      </section>

      <section className="about-preview">
        <h2>Crafting Excellence Since 1995</h2>
        <p>DMD Furnishing has been a trusted name in luxury furniture for over 25 years, serving hotels, resorts, and discerning business clients worldwide.</p>
        <button className="secondary-button">Learn More About Us</button>
      </section>
    </div>
  );
}

export default Home;