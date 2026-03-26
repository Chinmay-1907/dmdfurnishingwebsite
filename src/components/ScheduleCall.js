import React from 'react';
import '../styles/ScheduleCall.css';
import SEO from './SEO';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is the consultation free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, the initial 30-minute consultation is completely free with no obligation."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need finalized drawings?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No, we can start with rough concepts or floor plans. If you have them, great! If not, we can help guide the design process."
      }
    },
    {
      "@type": "Question",
      "name": "Can you work with my designer or architect?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely. We often collaborate with design teams to ensure manufacturability and budget alignment."
      }
    },
    {
      "@type": "Question",
      "name": "Do you handle small renovations?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, we assist with renovations of all sizes. Whether you are refreshing a lobby, updating a restaurant, or renovating a block of rooms, our team provides custom solutions to match your needs and budget."
      }
    },
    {
      "@type": "Question",
      "name": "Do you offer value engineering?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, value engineering is a core part of our service to help you achieve your design vision within budget."
      }
    },
    {
      "@type": "Question",
      "name": "Can this lead to an in-person meeting?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, depending on the project scope and location, a site visit or showroom meeting can be the next step."
      }
    }
  ]
};

function ScheduleCall() {
  return (
    <div className="schedule-call-page">
      <SEO
        title="Schedule a Free Consultation | Hospitality Furniture Specialist"
        description="Book a free 30-minute consultation with DMD Furnishing. Discuss custom FF&E, materials, timelines, and budgets for your hospitality or commercial project."
        canonical="https://dmdfurnishing.com/schedule-call"
        schema={faqSchema}
      />
      {/* 1. Hero Section */}
      <section
        className="schedule-hero"
        role="img"
        aria-label="Schedule a free hospitality furniture consultation with DMD Furnishing"
        style={{
          background: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/Images/Contact_Page.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="schedule-hero-content">
          <h1>Speak with a Hospitality Furniture Specialist</h1>
          <p className="schedule-hero-subtitle">
            Get expert guidance on custom FF&E, materials, timelines, and budgets - no obligation.
          </p>
          <div className="hero-cta-group">
            <a href="#scheduling-section" className="btn-primary">Schedule a Call</a>
            <a href="mailto:sales@dmdfurnishing.com" className="btn-secondary">Request a Video Meeting</a>
          </div>
        </div>
      </section>

      <div className="schedule-content-wrapper">
        {/* 2. What We'll Cover on the Call */}
        <section className="schedule-section">
          <h2>What We’ll Cover on the Call</h2>
          <ul className="schedule-list">
            <li>Project type (hotel, motel, restaurant, corporate, renovation or new build)</li>
            <li>Furniture scope (casegoods, seating, wardrobes, vanities, cubicles, millwork)</li>
            <li>Material options (HPL, scratch-free laminates, veneer, solid wood, metal)</li>
            <li>Budget alignment & value engineering</li>
            <li>Manufacturing approach (domestic vs overseas)</li>
            <li>Lead times, logistics, and installation considerations</li>
            <li>Clear next steps after the call</li>
          </ul>
        </section>

        {/* 3. Who This Consultation Is For */}
        <section className="schedule-section">
          <h2>Who This Consultation Is For</h2>
          <p className="section-intro">
            We specialize in hospitality and commercial projects. This consultation is designed for:
          </p>
          <ul className="schedule-list">
            <li>Hotel owners & operators</li>
            <li>Hospitality project managers</li>
            <li>Interior designers & architects</li>
            <li>Franchise renovation teams</li>
            <li>Commercial property owners</li>
            <li>Procurement & sourcing managers</li>
          </ul>
          <p className="schedule-note">
            <strong>Note:</strong> Ideal for projects starting within the next 3–12 months.
          </p>
        </section>

        {/* 4. What You'll Get After the Call */}
        <section className="schedule-section">
          <h2>What You’ll Get After the Call</h2>
          <ul className="schedule-list check-list">
            <li>Clear project direction</li>
            <li>Material and finish recommendations</li>
            <li>Rough budget guidance</li>
            <li>Manufacturing feasibility insights</li>
            <li>Timeline clarity</li>
            <li>Option to proceed with drawings, BOQ, samples, or site visit</li>
          </ul>
        </section>

        {/* 5. Scheduling Section */}
        <section id="scheduling-section" className="schedule-section booking-section">
          <h2>Schedule Your 30-Minute Consultation</h2>
          <p className="booking-intro">
            Choose a time that works for you. Calls typically last 30 minutes. 
            We support Phone, Zoom, and Microsoft Teams.
          </p>
          
          {/* Calendar Embed Placeholder */}
          <div className="calendar-embed-container">
            {/* In a real implementation, this would be a Calendly or similar iframe */}
            <div className="calendar-placeholder">
              <p>Calendar Booking System Loading...</p>
              <p className="calendar-fallback">
                (Integration Placeholder: Calendly or similar widget would appear here)
                <br /><br />
                For now, please call us directly at <strong>+1 (617) 223-7781</strong> or email <strong>sales@dmdfurnishing.com</strong> to book your slot.
              </p>
            </div>
          </div>
        </section>

        {/* 6. Trust & Credibility Section */}
        <section className="schedule-section trust-section">
          <h2>Why Partner with DMD Furnishing?</h2>
          <div className="trust-grid">
            <div className="trust-item">
              <h3>End-to-End Service</h3>
              <p>Design → Manufacturing → Delivery → Installation</p>
            </div>
            <div className="trust-item">
              <h3>Proven Expertise</h3>
              <p>Experience with branded and independent hospitality projects</p>
            </div>
            <div className="trust-item">
              <h3>Nationwide Reach</h3>
              <p>Nationwide service with local project oversight</p>
            </div>
            <div className="trust-item">
              <h3>Quality Assured</h3>
              <p>High-quality materials meeting brand and regulatory standards</p>
            </div>
          </div>
        </section>

        {/* 7. FAQ Section */}
        <section className="schedule-section faq-section">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h3>Is the consultation free?</h3>
              <p>Yes, the initial 30-minute consultation is completely free with no obligation.</p>
            </div>
            <div className="faq-item">
              <h3>Do I need finalized drawings?</h3>
              <p>No, we can start with rough concepts or floor plans. If you have them, great! If not, we can help guide the design process.</p>
            </div>
            <div className="faq-item">
              <h3>Can you work with my designer or architect?</h3>
              <p>Absolutely. We often collaborate with design teams to ensure manufacturability and budget alignment.</p>
            </div>
            <div className="faq-item">
              <h3>Do you handle small renovations?</h3>
              <p>Yes, we assist with renovations of all sizes. Whether you are refreshing a lobby, updating a restaurant, or renovating a block of rooms, our team provides custom solutions to match your needs and budget.</p>
            </div>
            <div className="faq-item">
              <h3>Do you offer value engineering?</h3>
              <p>Yes, value engineering is a core part of our service to help you achieve your design vision within budget.</p>
            </div>
            <div className="faq-item">
              <h3>Can this lead to an in-person meeting?</h3>
              <p>Yes, depending on the project scope and location, a site visit or showroom meeting can be the next step.</p>
            </div>
          </div>
        </section>

        {/* 8. Final Call-to-Action */}
        <section className="schedule-final-cta">
          <h2>Ready to Discuss Your Project?</h2>
          <p>No obligation • Expert guidance • Hospitality-focused</p>
          <a href="#scheduling-section" className="btn-primary large">Book Your Free Consultation</a>
        </section>
      </div>
    </div>
  );
}

export default ScheduleCall;
