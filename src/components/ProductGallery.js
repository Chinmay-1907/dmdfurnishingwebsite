import React, { useState, useRef, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/ProductGallery.css';

const ProductGallery = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const heroSlider = useRef(null);
  const thumbnailSlider = useRef(null);
  
  // Initialize sliders after component mount to avoid findDOMNode issues
  useEffect(() => {
    setInitialized(true);
  }, []);

  // Settings for the hero slider
  const heroSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    arrows: false,
    beforeChange: (current, next) => setCurrentSlide(next),
  };

  // Settings for the thumbnail slider
  const thumbnailSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    focusOnSelect: true,
    arrows: true,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        }
      }
    ]
  };

  // Function to go to a specific slide
  const goToSlide = (index) => {
    if (heroSlider.current && initialized) {
      heroSlider.current.slickGoTo(index);
    }
  };

  // TODO: Implement full lightbox component
  // This is a stub for the lightbox functionality
  const Lightbox = () => {
    // Handle keyboard events for the lightbox
    React.useEffect(() => {
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          setShowLightbox(false);
        } else if (e.key === 'ArrowLeft') {
          heroSlider.current && initialized && heroSlider.current.slickPrev();
        } else if (e.key === 'ArrowRight') {
          heroSlider.current && initialized && heroSlider.current.slickNext();
        }
      };
      
      if (showLightbox) {
        window.addEventListener('keydown', handleKeyDown);
      }
      
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }, [showLightbox]);
    
    if (!showLightbox) return null;
    
    return (
      <div 
        className="product-lightbox-overlay" 
        onClick={() => setShowLightbox(false)}
        role="dialog"
        aria-modal="true"
        aria-label="Product image lightbox"
      >
        <div className="product-lightbox-content" onClick={(e) => e.stopPropagation()}>
          <button 
            className="lightbox-close" 
            onClick={() => setShowLightbox(false)}
            aria-label="Close lightbox"
          >
            ×
          </button>
          <img 
            src={images[currentSlide].url} 
            alt={images[currentSlide].alt} 
            className="lightbox-image" 
          />
          <div className="lightbox-navigation">
            <button 
              className="lightbox-prev" 
              onClick={() => heroSlider.current && initialized && heroSlider.current.slickPrev()}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  heroSlider.current && initialized && heroSlider.current.slickPrev();
                }
              }}
              aria-label="Previous image"
              tabIndex="0"
            >
              ‹
            </button>
            <button 
              className="lightbox-next" 
              onClick={() => heroSlider.current && initialized && heroSlider.current.slickNext()}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  heroSlider.current && initialized && heroSlider.current.slickNext();
                }
              }}
              aria-label="Next image"
              tabIndex="0"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="product-gallery-container">
      {/* Hero Image */}
      <div className="product-hero-container">
        {initialized ? (
          <Slider ref={heroSlider} {...heroSettings}>
            {images.map((image, index) => (
              <div key={image.id} className="hero-slide">
                <img 
                  src={image.url} 
                  alt={image.alt} 
                  className="hero-image" 
                  onClick={() => setShowLightbox(true)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setShowLightbox(true);
                    }
                  }}
                  tabIndex="0"
                />
              </div>
            ))}
          </Slider>
        ) : (
          <div className="loading-slider">
            <img 
              src={images[0]?.url} 
              alt={images[0]?.alt || 'Product image'} 
              className="hero-image" 
            />
          </div>
        )}
      </div>

      {/* Thumbnail Rail */}
      <div className="product-thumbnails-container">
        {initialized ? (
          <Slider ref={thumbnailSlider} {...thumbnailSettings}>
            {images.map((image, index) => (
              <div 
                key={image.id} 
                className={`thumbnail-slide ${currentSlide === index ? 'active' : ''}`}
              >
                <button 
                  className="thumbnail-button" 
                  onClick={() => goToSlide(index)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      goToSlide(index);
                    }
                  }}
                  aria-label={`View image ${index + 1} of ${images.length}`}
                  role="button"
                  tabIndex="0"
                >
                  <img 
                    src={image.url} 
                    alt={`Thumbnail for ${image.alt}`} 
                    className="thumbnail-image" 
                  />
                </button>
              </div>
            ))}
          </Slider>
        ) : (
          <div className="loading-thumbnails">
            {images.slice(0, 5).map((image, index) => (
              <div key={image.id} className="thumbnail-slide">
                <div className="thumbnail-button">
                  <img 
                    src={image.url} 
                    alt={`Thumbnail for ${image.alt}`} 
                    className="thumbnail-image" 
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Component */}
      <Lightbox />
    </div>
  );
};

export default ProductGallery;