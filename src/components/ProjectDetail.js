import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/ProjectDetail.css';
import projectData from '../data/projects';

// This component displays detailed information about a specific project
// It shows multiple images from different angles in a scrollable container,
// specifications, project description, client testimonial, and highlights

function ProjectDetail() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  
  useEffect(() => {
    // Find the project based on the URL parameter
    const foundProject = projectData.find(proj => proj.id === projectId);
    
    if (foundProject) {
      setProject(foundProject);
    }
  }, [projectId]);

  // Navigate back function
  const handleBack = () => {
    navigate(-1);
  };

  if (!project) {
    return (
      <div className="project-detail-container">
        <div className="loading">Loading project details...</div>
      </div>
    );
  }

  return (
    <div className="project-detail-container">
      <div className="breadcrumb">
        <button onClick={() => navigate('/projects')}>All Projects</button>
        <span> &gt; </span>
        <span>{project.name}</span>
      </div>

      <div className="project-detail-content">
        <div className="project-gallery">
          <h2 className="gallery-title">Project Gallery</h2>
          <div className="images-scroll-container">
            {project.images.map((image) => (
              <div key={image.id} className="gallery-image-container">
                <img src={image.url} alt={image.alt} className="gallery-image" />
                <p className="image-caption">{image.alt}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="project-info">
          <h1>{project.name}</h1>
          <div className="project-category">
            <span className="category-tag">{project.category}</span>
            <span className="completion-date">Completed: {project.completionDate}</span>
          </div>

          <div className="project-description">
            <h2>Project Overview</h2>
            <p>{project.fullDescription}</p>
          </div>

          <div className="project-specifications">
            <h2>Project Details</h2>
            <div className="specifications-grid">
              {project.specifications.map((spec, index) => (
                <div key={index} className="specification-item">
                  <span className="specification-name">{spec.name}:</span>
                  <span className="specification-value">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="project-highlights">
            <h2>Project Highlights</h2>
            <ul className="highlights-list">
              {project.highlights.map((highlight, index) => (
                <li key={index} className="highlight-item">{highlight}</li>
              ))}
            </ul>
          </div>

          <div className="client-testimonial">
            <h2>Client Testimonial</h2>
            <blockquote>
              <p>"{project.clientTestimonial}"</p>
              <footer>
                <cite>— {project.clientName}, {project.clientPosition}</cite>
              </footer>
            </blockquote>
          </div>

          <div className="project-actions">
            <button className="back-button" onClick={handleBack}>Back to Projects</button>
            <button className="contact-button" onClick={() => navigate('/contact')}>Discuss Your Project</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetail;