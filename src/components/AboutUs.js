import React from 'react';
import '../styles/AboutUs.css';

function AboutUs() {
  return (
    <div className="about-container">
      <section className="about-hero">
        <h1>About DMD Furnishing</h1>
        <p>Crafting luxury furniture solutions since 1995</p>
      </section>

      <section className="about-story">
        <div className="about-content">
          <h2>Our Story</h2>
          <p>
            DMD Furnishing was founded with a vision to create exceptional furniture that combines
            aesthetics, functionality, and durability. For over 25 years, we have been dedicated to
            crafting premium furniture solutions for hotels, resorts, and high-end businesses.
          </p>
          <p>
            Our commitment to quality and attention to detail has made us a trusted partner for
            clients seeking to create impressive and comfortable spaces that leave lasting impressions.
          </p>
        </div>
        <div className="about-image">
          {/* Placeholder for company image */}
        </div>
      </section>

      <section className="about-mission">
        <h2>Our Mission</h2>
        <p>
          To transform spaces into extraordinary environments through innovative design,
          exceptional craftsmanship, and personalized service that exceeds our clients' expectations.
        </p>
      </section>

      <section className="about-values">
        <h2>Our Values</h2>
        <div className="values-grid">
          <div className="value-item">
            <h3>Excellence</h3>
            <p>We strive for excellence in every piece we create</p>
          </div>
          <div className="value-item">
            <h3>Innovation</h3>
            <p>We embrace innovative designs and solutions</p>
          </div>
          <div className="value-item">
            <h3>Integrity</h3>
            <p>We conduct business with honesty and transparency</p>
          </div>
          <div className="value-item">
            <h3>Sustainability</h3>
            <p>We are committed to sustainable practices</p>
          </div>
        </div>
      </section>

      <section className="about-team">
        <h2>Our Leadership Team</h2>
        <div className="team-grid">
          <div className="team-member">
            <div className="member-image">
              {/* Placeholder for team member image */}
            </div>
            <h3>John Smith</h3>
            <p>Founder & CEO</p>
          </div>
          <div className="team-member">
            <div className="member-image">
              {/* Placeholder for team member image */}
            </div>
            <h3>Sarah Johnson</h3>
            <p>Design Director</p>
          </div>
          <div className="team-member">
            <div className="member-image">
              {/* Placeholder for team member image */}
            </div>
            <h3>Michael Chen</h3>
            <p>Production Manager</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;