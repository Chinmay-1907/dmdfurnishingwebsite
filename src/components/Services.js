import React from 'react';
import '../styles/Services.css';

function Services() {
  return (
    <div className="services-container">
      <section className="services-hero">
        <h1>Our Services</h1>
        <p>Comprehensive furniture solutions for your business</p>
      </section>

      <section className="services-overview">
        <h2>How We Can Help You</h2>
        <p>
          DMD Furnishing offers end-to-end furniture solutions for hospitality, corporate, and commercial spaces.
          From design consultation to manufacturing, delivery, and installation, we handle every aspect of your project.
        </p>
      </section>

      <section className="process-section">
        <h2>Our Process</h2>
        <div className="process-steps">
          <div className="process-step">
            <div className="step-number">1</div>
            <h3>Initial Consultation</h3>
            <p>We begin with a detailed discussion to understand your vision, requirements, and budget. Our experts will guide you through options and possibilities.</p>
          </div>
          <div className="process-step">
            <div className="step-number">2</div>
            <h3>Design</h3>
            <p>Our designers create custom concepts tailored to your needs, providing detailed renderings and material samples for your approval.</p>
          </div>
          <div className="process-step">
            <div className="step-number">3</div>
            <h3>Manufacture</h3>
            <p>Once designs are approved, our skilled craftsmen begin production using premium materials and meticulous attention to detail.</p>
          </div>
          <div className="process-step">
            <div className="step-number">4</div>
            <h3>Shipping</h3>
            <p>We carefully package and ship your furniture, coordinating logistics to ensure safe and timely delivery to your location.</p>
          </div>
          <div className="process-step">
            <div className="step-number">5</div>
            <h3>Installation</h3>
            <p>Our professional team handles the installation process, ensuring everything is perfectly placed and assembled according to plan.</p>
          </div>
          <div className="process-step">
            <div className="step-number">6</div>
            <h3>Follow-up</h3>
            <p>Ensuring your complete satisfaction</p>
          </div>
        </div>
      </section>

      <section className="services-cta">
        <h2>Ready to Transform Your Space?</h2>
        <p>Contact us today to discuss your furniture needs and schedule a consultation.</p>
        <button className="cta-button">Get in Touch</button>
      </section>
    </div>
  );
}

export default Services;