import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/ProjectDetail.css';
import { loadProjectById } from '../data/projects';
// SEO: centralized helpers
import { setPageSEO, setBreadcrumbJsonLd, setProjectJsonLd } from '../utils/seo';

// This component displays detailed information about a specific project
// It shows multiple images from different angles in a scrollable container,
// specifications, project description, client testimonial, and highlights

function ProjectDetail() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const heroRef = useRef(null);
  const heroTitleRef = useRef(null);
  const projectContentRef = useRef(null);

  useEffect(() => {
    let isActive = true;

    setLoading(true);
    setError(null);
    setProject(null);

    loadProjectById(projectId)
      .then((data) => {
        if (!isActive) {
          return;
        }

        if (!data) {
          setError('Project not found.');
          setProject(null);
        } else {
          setProject(data);
        }
      })
      .catch((err) => {
        if (!isActive) {
          return;
        }
        setError(err.message || 'Unable to load project details.');
      })
      .finally(() => {
        if (isActive) {
          setLoading(false);
        }
      });

    return () => {
      isActive = false;
    };
  }, [projectId]);

  useEffect(() => {
    if (!project) {
      return undefined;
    }

    if (projectContentRef.current) {
      projectContentRef.current.style.opacity = '0';
      projectContentRef.current.style.transform = 'translateY(30px)';
    }

    const handleScroll = () => {
      if (heroTitleRef.current && projectContentRef.current && heroRef.current) {
        const scrollPosition = window.scrollY;
        const heroHeight = heroRef.current.offsetHeight || 0;

        // Animate hero title on scroll
        if (scrollPosition < heroHeight) {
          const translateY = scrollPosition * 0.5;
          const opacity = 1 - (scrollPosition / heroHeight) * 1.5;
          heroTitleRef.current.style.transform = `translateY(${translateY}px)`;
          heroTitleRef.current.style.opacity = Math.max(opacity, 0);
        }

        // Fade in content on scroll
        if (scrollPosition > heroHeight * 0.3) {
          projectContentRef.current.style.opacity = '1';
          projectContentRef.current.style.transform = 'translateY(0)';
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [project]);

  // SEO: Project detail page metadata and JSON-LD
  useEffect(() => {
    if (!project) return;
    const originTitle = 'DMD Furnishing';
    const title = `${project.name} | Projects | ${originTitle}`;
    const description = project.shortDescription || project.fullDescription || 'Project details';
    const canonicalPath = `/projects/${project.id}`;
    const image = project.mainImage || (project.images && project.images[0] && project.images[0].url) || undefined;

    setPageSEO({
      title,
      description,
      canonicalPath,
      image,
      type: 'article'
    });

    setBreadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'Projects', path: '/projects' },
      { name: project.name, path: canonicalPath }
    ]);

    setProjectJsonLd({
      name: project.name,
      description,
      image,
      urlPath: canonicalPath,
      dateCreated: project.completionDate,
      category: project.category
    });
  }, [project]);

  // Navigate back function
  const handleBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/projects');
    }
  };

  if (loading) {
    return (
      <div className="project-detail-container">
        <div className="loading">Loading project details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="project-detail-container">
        <div className="loading">{error}</div>
        <div className="back-to-projects-container">
          <button className="back-to-projects-button" onClick={handleBack}>
            Back
          </button>
        </div>
      </div>
    );
  }

  if (!project) {
    return null;
  }

  return (
    <div className="project-detail-container">
      {/* Full-width hero section with background image */}
      <div
        className="project-hero"
        ref={heroRef}
        style={project.mainImage ? { backgroundImage: `url(${project.mainImage})` } : undefined}
      >
        <div className="hero-overlay">
          <h1 className="hero-title" ref={heroTitleRef}>{project.name}</h1>
        </div>
      </div>
      
      <div className="breadcrumb">
        <button onClick={() => navigate('/projects')}>All Projects</button>
        <span> &gt; </span>
        <span>{project.name}</span>
      </div>

      <div className="project-detail-content" ref={projectContentRef}>

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
            <h2>DMD Commitment</h2>
            <blockquote>
              <p>"{project.clientTestimonial}"</p>
              <footer>
                <cite>- {project.clientName}{project.clientPosition ? `, ${project.clientPosition}` : ''}</cite>
              </footer>
            </blockquote>
          </div>
          
          {/* Horizontal image gallery without scrollbar */}
          <div className="project-gallery">
            <h2 className="gallery-title">Project Gallery</h2>
            <div className="gallery-container">
              {(project.images || []).map((image) => (
                <div key={image.id} className="gallery-item">
                  <img src={image.url} alt={image.alt || project.name} className="gallery-image" />
                  <p className="image-caption">{image.alt || project.name}</p>
                </div>
              ))}
            </div>
          </div>

          {Array.isArray(project.beforeImages) && project.beforeImages.length > 0 && (
            <div className="project-gallery">
              <h2 className="gallery-title">Before Gallery</h2>
              <div className="gallery-container">
                {project.beforeImages.map((image) => (
                  <div key={image.id} className="gallery-item">
                    <img src={image.url} alt={image.alt || `${project.name} (Before)`} className="gallery-image" />
                    <p className="image-caption">{image.alt || `${project.name} (Before)`}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Back to Projects button */}
          <div className="back-to-projects-container">
            <button className="back-to-projects-button" onClick={() => navigate('/projects')}>
              Back to Projects
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetail;
