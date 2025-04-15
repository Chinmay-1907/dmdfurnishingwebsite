import React from 'react';
import '../styles/AboutUs.css';
import { FaLinkedin, FaEnvelope, FaAward, FaLeaf, FaHandshake, FaStar } from 'react-icons/fa';

function AboutUs() {
  return (
    <div className="about-container">
      <section className="about-hero">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>Your Vision | Our Craft</h1>
            <p>Crafting luxury furniture solutions</p>
            <button className="cta-button">Our Portfolio</button>
          </div>
        </div>
      </section>

      <section className="about-story">
        <div className="about-content">
          <span className="section-tag">Our Story</span>
          <h2>Fresh Perspectives in Furniture Design</h2>
          <p>
            DMD Furnishing was founded with a bold vision to disrupt the furniture industry by combining
            innovative design, exceptional craftsmanship, and sustainable practices. As a young company, we bring
            fresh perspectives and cutting-edge approaches to every project we undertake.
          </p>
          <p>
            We don't just sell furniture - we create custom solutions tailored to your specific needs.
            Our unique approach combines expert design, superior craftsmanship, and convenient delivery
            to provide a seamless experience from concept to installation.
          </p>
          <div className="story-stats">
            <div className="stat-item">
              <span className="stat-number">50+</span>
              <span className="stat-label">Innovative Designs</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">30+</span>
              <span className="stat-label">Projects Completed</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">25+</span>
              <span className="stat-label">Happy Clients</span>
            </div>
          </div>
        </div>
        <div className="about-image">
          {/* Image is set in CSS */}
        </div>
      </section>

      <section className="about-mission">
        <div className="mission-content">
          <span className="section-tag">Our Mission</span>
          <h2>Transforming Spaces Into Extraordinary Environments</h2>
          <p>
            To transform spaces into extraordinary environments through innovative design,
            exceptional craftsmanship, and personalized service that exceeds our clients' expectations.
          </p>
        </div>
      </section>

      <section className="about-timeline">
        <span className="section-tag">Our Journey</span>
        <h2>The DMD Furnishing Story</h2>
        <div className="timeline">
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <h3>Inception</h3>
              <h4>The Spark</h4>
              <p>DMD Furnishing was born from a passion for design and a vision to create furniture that makes a statement.</p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <h3>First Project</h3>
              <h4>Breaking Ground</h4>
              <p>Completed our first commercial project, setting the foundation for our design philosophy.</p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <h3>Team Growth</h3>
              <h4>Building Talent</h4>
              <p>Assembled a team of young, talented designers and craftspeople passionate about pushing boundaries.</p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <h3>Innovation</h3>
              <h4>Sustainable Practices</h4>
              <p>Implemented eco-friendly materials and processes, setting new standards in sustainable furniture design.</p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <h3>Today</h3>
              <h4>Rising Star</h4>
              <p>Rapidly growing as an emerging leader in innovative, sustainable furniture design for commercial spaces.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-approach">
        <span className="section-tag">Our Approach</span>
        <h2>The DMD Approach</h2>
        <div className="approach-grid">
          <div className="approach-item">
            <div className="approach-icon">D</div>
            <h3>Design</h3>
            <p>Our expert designers work closely with you to understand your vision and requirements, creating custom solutions that perfectly match your aesthetic and functional needs.</p>
          </div>
          <div className="approach-item">
            <div className="approach-icon">M</div>
            <h3>Craftsmanship</h3>
            <p>Every piece is meticulously crafted by skilled artisans using premium materials, ensuring exceptional quality and durability that stands the test of time.</p>
          </div>
          <div className="approach-item">
            <div className="approach-icon">D</div>
            <h3>Delivery</h3>
            <p>We handle everything from design to delivery and installation, providing a seamless, stress-free experience that saves you time and resources.</p>
          </div>
        </div>
      </section>

      <section className="about-values">
        <span className="section-tag">Our Core Values</span>
        <h2>What Drives Us</h2>
        <div className="values-grid">
          <div className="value-item">
            <div className="value-icon"><FaStar /></div>
            <h3>Excellence</h3>
            <p>We strive for excellence in every piece we create, ensuring the highest quality in all our products and services.</p>
          </div>
          <div className="value-item">
            <div className="value-icon"><FaAward /></div>
            <h3>Innovation</h3>
            <p>We embrace innovative designs and solutions, constantly pushing the boundaries of what's possible in furniture design.</p>
          </div>
          <div className="value-item">
            <div className="value-icon"><FaHandshake /></div>
            <h3>Integrity</h3>
            <p>We conduct business with honesty and transparency, building trust with our clients through every interaction.</p>
          </div>
          <div className="value-item">
            <div className="value-icon"><FaLeaf /></div>
            <h3>Sustainability</h3>
            <p>We are committed to sustainable practices, sourcing eco-friendly materials and minimizing our environmental impact.</p>
          </div>
        </div>
      </section>

      <section className="about-testimonials">
        <span className="section-tag">Client Testimonials</span>
        <h2>What Our Clients Say</h2>
        <div className="testimonials-grid">
          <div className="testimonial-item">
            <div className="testimonial-quote">
              <p>"DMD Furnishing transformed our hotel lobby with stunning custom furniture that perfectly captures our brand essence. Their attention to detail and quality craftsmanship exceeded our expectations."</p>
            </div>
            <div className="testimonial-author">
              <div className="author-image" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80)'}}></div>
              <div className="author-info">
                <h4>James Wilson</h4>
                <p>Luxury Hotel Group, CEO</p>
              </div>
            </div>
          </div>
          <div className="testimonial-item">
            <div className="testimonial-quote">
              <p>"Working with DMD Furnishing was a pleasure from start to finish. Their team understood our vision and delivered beautiful, functional pieces that our customers love."</p>
            </div>
            <div className="testimonial-author">
              <div className="author-image" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80)'}}></div>
              <div className="author-info">
                <h4>Emily Rodriguez</h4>
                <p>Interior Designer</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-team">
        <span className="section-tag">Our Team</span>
        <h2>Meet The Innovators</h2>
        <div className="team-grid">
          <div className="team-member">
            <div className="member-image">
              {/* Image is set in CSS */}
            </div>
            <h3>Alex Rivera</h3>
            <p className="member-title">Founder & Creative Director</p>
            <p className="member-bio">With a background in industrial design and architecture, Alex brings a fresh perspective to furniture design.</p>
            <div className="member-social">
              <button type="button" className="social-icon" aria-label="LinkedIn Profile"><FaLinkedin /></button>
              <button type="button" className="social-icon" aria-label="Email Contact"><FaEnvelope /></button>
            </div>
          </div>
          <div className="team-member">
            <div className="member-image">
              {/* Image is set in CSS */}
            </div>
            <h3>Maya Patel</h3>
            <p className="member-title">Head of Sustainability</p>
            <p className="member-bio">Maya leads our eco-friendly initiatives, ensuring our designs are as sustainable as they are beautiful.</p>
            <div className="member-social">
              <button type="button" className="social-icon" aria-label="LinkedIn Profile"><FaLinkedin /></button>
              <button type="button" className="social-icon" aria-label="Email Contact"><FaEnvelope /></button>
            </div>
          </div>
          <div className="team-member">
            <div className="member-image">
              {/* Image is set in CSS */}
            </div>
            <h3>Jamal Washington</h3>
            <p className="member-title">Digital Experience Lead</p>
            <p className="member-bio">Jamal bridges the gap between physical design and digital experience, creating innovative customer journeys.</p>
            <div className="member-social">
              <button type="button" className="social-icon" aria-label="LinkedIn Profile"><FaLinkedin /></button>
              <button type="button" className="social-icon" aria-label="Email Contact"><FaEnvelope /></button>
            </div>
          </div>
        </div>
      </section>

      <section className="about-cta">
        <h2>Ready to Transform Your Space?</h2>
        <p>Contact us today to discuss your project and discover how DMD Furnishing can bring your vision to life.</p>
        <button className="cta-button">Contact Us</button>
      </section>
    </div>
  );
}


export default AboutUs;