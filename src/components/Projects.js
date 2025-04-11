import React from 'react';
import '../styles/Projects.css';

function Projects() {
  return (
    <div className="projects-container">
      <section className="projects-hero">
        <h1>Recent Projects</h1>
        <p>Explore our latest furniture installations and designs</p>
      </section>

      <section className="project-gallery">
        <div className="project-item">
          <div className="project-image"></div>
          <div className="project-info">
            <h3>Grand Luxury Hotel</h3>
            <p className="project-location">Dubai, UAE</p>
            <p className="project-description">
              Complete furnishing solution for a 5-star luxury hotel, including 200 guest rooms, 
              lobby, restaurants, and conference facilities.
            </p>
            <button className="view-project">View Project Details</button>
          </div>
        </div>

        <div className="project-item">
          <div className="project-image"></div>
          <div className="project-info">
            <h3>Oceanview Resort & Spa</h3>
            <p className="project-location">Bali, Indonesia</p>
            <p className="project-description">
              Custom-designed furniture for beachfront villas and spa facilities, 
              blending luxury with natural elements.
            </p>
            <button className="view-project">View Project Details</button>
          </div>
        </div>

        <div className="project-item">
          <div className="project-image"></div>
          <div className="project-info">
            <h3>Executive Tower Offices</h3>
            <p className="project-location">London, UK</p>
            <p className="project-description">
              Modern office furniture solutions for a corporate headquarters, 
              including executive suites, open workspaces, and meeting rooms.
            </p>
            <button className="view-project">View Project Details</button>
          </div>
        </div>

        <div className="project-item">
          <div className="project-image"></div>
          <div className="project-info">
            <h3>Skyline Restaurant</h3>
            <p className="project-location">New York, USA</p>
            <p className="project-description">
              Elegant dining furniture for a high-end restaurant, featuring custom tables, 
              chairs, and bar furnishings.
            </p>
            <button className="view-project">View Project Details</button>
          </div>
        </div>
      </section>

      <section className="project-categories">
        <h2>Browse Projects by Category</h2>
        <div className="category-buttons">
          <button className="category-button active">All Projects</button>
          <button className="category-button">Hotels & Resorts</button>
          <button className="category-button">Restaurants</button>
          <button className="category-button">Corporate Offices</button>
          <button className="category-button">Retail Spaces</button>
        </div>
      </section>

      <section className="project-cta">
        <h2>Ready to Start Your Project?</h2>
        <p>Let us help you create exceptional spaces with our premium furniture solutions.</p>
        <button className="cta-button">Schedule a Consultation</button>
      </section>
    </div>
  );
}

export default Projects;