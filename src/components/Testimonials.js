import React from 'react';
import '../styles/Testimonials.css';

function Testimonials() {
  return (
    <div className="testimonials-container">
      <section className="testimonials-hero">
        <h1>Customer Testimonials</h1>
        <p>What our clients say about our furniture and services</p>
      </section>

      <section className="testimonials-grid">
        <div className="testimonial-card">
          <div className="testimonial-content">
            <p>
              "DMD Furnishing transformed our hotel with their exceptional furniture. The quality and design 
              exceeded our expectations, and their team was professional throughout the entire process."
            </p>
          </div>
          <div className="testimonial-author">
            <div className="author-image"></div>
            <div className="author-info">
              <h3>James Wilson</h3>
              <p>General Manager, Grand Luxury Hotel</p>
            </div>
          </div>
        </div>

        <div className="testimonial-card">
          <div className="testimonial-content">
            <p>
              "We've worked with DMD Furnishing on multiple projects, and they consistently deliver 
              outstanding results. Their attention to detail and commitment to quality is unmatched."
            </p>
          </div>
          <div className="testimonial-author">
            <div className="author-image"></div>
            <div className="author-info">
              <h3>Sarah Chen</h3>
              <p>Interior Designer, Oceanview Resort & Spa</p>
            </div>
          </div>
        </div>

        <div className="testimonial-card">
          <div className="testimonial-content">
            <p>
              "The custom furniture solutions provided by DMD Furnishing for our corporate offices 
              have received countless compliments from both employees and clients. Highly recommended!"
            </p>
          </div>
          <div className="testimonial-author">
            <div className="author-image"></div>
            <div className="author-info">
              <h3>Robert Johnson</h3>
              <p>CEO, Executive Tower Offices</p>
            </div>
          </div>
        </div>

        <div className="testimonial-card">
          <div className="testimonial-content">
            <p>
              "DMD Furnishing's restaurant furniture has been a key factor in creating the perfect 
              ambiance for our diners. The durability and elegance of their pieces is remarkable."
            </p>
          </div>
          <div className="testimonial-author">
            <div className="author-image"></div>
            <div className="author-info">
              <h3>Maria Rodriguez</h3>
              <p>Owner, Skyline Restaurant</p>
            </div>
          </div>
        </div>
      </section>

      <section className="video-testimonials">
        <h2>Video Testimonials</h2>
        <div className="video-grid">
          <div className="video-item">
            <div className="video-placeholder">
              <div className="play-button"></div>
            </div>
            <h3>Grand Luxury Hotel Project</h3>
          </div>
          <div className="video-item">
            <div className="video-placeholder">
              <div className="play-button"></div>
            </div>
            <h3>Executive Office Transformation</h3>
          </div>
        </div>
      </section>

      <section className="testimonial-cta">
        <h2>Join Our Satisfied Clients</h2>
        <p>Experience the DMD Furnishing difference for your next project.</p>
        <button className="cta-button">Request a Consultation</button>
      </section>
    </div>
  );
}

export default Testimonials;