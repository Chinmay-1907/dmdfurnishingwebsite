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

      <section className="services-grid">
        <div className="service-card">
          <div className="service-icon"></div>
          <h3>Design Consultation</h3>
          <p>
            Our expert designers work closely with you to understand your vision, requirements, and budget.
            We provide personalized recommendations and create detailed design concepts for your space.
          </p>
          <button className="learn-more">Learn More</button>
        </div>

        <div className="service-card">
          <div className="service-icon"></div>
          <h3>Custom Manufacturing</h3>
          <p>
            We specialize in creating bespoke furniture pieces tailored to your specific needs.
            Our skilled craftsmen use premium materials to bring your vision to life with exceptional quality.
          </p>
          <button className="learn-more">Learn More</button>
        </div>

        <div className="service-card">
          <div className="service-icon"></div>
          <h3>Project Management</h3>
          <p>
            Our dedicated project managers oversee every detail from concept to completion,
            ensuring your project stays on schedule and within budget while meeting all requirements.
          </p>
          <button className="learn-more">Learn More</button>
        </div>

        <div className="service-card">
          <div className="service-icon"></div>
          <h3>Delivery & Installation</h3>
          <p>
            We handle the logistics of delivering and installing your furniture with care and precision,
            minimizing disruption to your business operations.
          </p>
          <button className="learn-more">Learn More</button>
        </div>

        <div className="service-card">
          <div className="service-icon"></div>
          <h3>After-Sales Support</h3>
          <p>
            Our commitment to your satisfaction extends beyond installation. We provide comprehensive
            after-sales support, including maintenance advice and prompt assistance when needed.
          </p>
          <button className="learn-more">Learn More</button>
        </div>

        <div className="service-card">
          <div className="service-icon"></div>
          <h3>Refurbishment Services</h3>
          <p>
            Breathe new life into your existing furniture with our refurbishment services.
            We can restore, reupholster, and modernize your pieces to extend their lifespan.
          </p>
          <button className="learn-more">Learn More</button>
        </div>
      </section>

      <section className="process-section">
        <h2>Our Process</h2>
        <div className="process-steps">
          <div className="process-step">
            <div className="step-number">1</div>
            <h3>Consultation</h3>
            <p>Initial meeting to discuss your needs and vision</p>
          </div>
          <div className="process-step">
            <div className="step-number">2</div>
            <h3>Design</h3>
            <p>Creating detailed designs and proposals</p>
          </div>
          <div className="process-step">
            <div className="step-number">3</div>
            <h3>Manufacturing</h3>
            <p>Crafting your furniture with precision</p>
          </div>
          <div className="process-step">
            <div className="step-number">4</div>
            <h3>Delivery</h3>
            <p>Careful transportation to your location</p>
          </div>
          <div className="process-step">
            <div className="step-number">5</div>
            <h3>Installation</h3>
            <p>Professional setup in your space</p>
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