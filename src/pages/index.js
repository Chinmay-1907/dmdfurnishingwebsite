import React, { useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Import components
import NextFooter from '../components/NextFooter';

// Import styles
import '../styles/Home.css';

// Define metadata for better SEO
export const metadata = {
  title: 'DMD Furnishing - Luxury Hospitality Furniture',
  description: 'Luxury hospitality furniture solutions for hotels, restaurants, and commercial spaces. Discover our premium collections and elevate your space.',
  keywords: 'luxury furniture, hospitality furniture, hotel furniture, restaurant furniture, commercial furniture',
  openGraph: {
    title: 'DMD Furnishing - Luxury Hospitality Furniture',
    description: 'Luxury hospitality furniture solutions for hotels, restaurants, and commercial spaces',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc',
        width: 1200,
        height: 630,
        alt: 'DMD Furnishing Luxury Furniture'
      }
    ]
  }
};

export default function Home() {
  // Initialize AOS animation library
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
      offset: 100 // Offset (in px) from the original trigger point
    });
  }, []);

  // Slideshow settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    cssEase: 'linear',
    pauseOnHover: false
  };

  // Slideshow images with furniture-specific photos
  const slideImages = [
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', // Modern sofa
    'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', // Luxury bedroom
    'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', // Hotel lobby furniture
    'https://images.unsplash.com/photo-1540574163026-643ea20ade25?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' // Dining set
  ];

  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta property="og:title" content={metadata.openGraph.title} />
        <meta property="og:description" content={metadata.openGraph.description} />
        <meta property="og:image" content={metadata.openGraph.images[0].url} />
        <meta property="og:image:width" content={metadata.openGraph.images[0].width} />
        <meta property="og:image:height" content={metadata.openGraph.images[0].height} />
        <meta property="og:image:alt" content={metadata.openGraph.images[0].alt} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <div className="home-container">
        {/* Hero Section with Slider */}
        <section className="hero-section">
          <Slider {...sliderSettings} className="hero-slider">
            {slideImages.map((image, index) => (
              <div key={index} className="hero-slide">
                {/* Replace img with Next.js Image component for optimization */}
                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                  <Image 
                    src={image} 
                    alt={`Furniture slide ${index + 1}`} 
                    fill
                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                    priority={index === 0} // Prioritize loading the first image
                  />
                </div>
                <div className="hero-overlay">
                  <div className="hero-content" data-aos="fade-up">
                    <h1>Luxury Hospitality Furniture</h1>
                    <Link href="/products">
                      <button className="cta-button">Explore Our Products</button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </section>

        {/* Navigation Sections */}
        <section className="page-navigation-section">
          <h2 className="section-title" data-aos="fade-up">Discover Our World</h2>
          <p className="section-subtitle" data-aos="fade-up" data-aos-delay="100">Navigate through our complete offerings</p>
          
          <div className="nav-grid">
            {/* About Us Section */}
            <div className="nav-item" data-aos="fade-up" data-aos-anchor-placement="top-center">
              <div className="nav-image" style={{backgroundImage: `url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')`}}>
                <div className="nav-overlay">
                  <h3>About Us</h3>
                </div>
              </div>
              <div className="nav-content">
                <p>Learn about our history, values, and commitment to excellence in hospitality furniture.</p>
                <Link href="/about">
                  <button className="nav-button">Our Story</button>
                </Link>
              </div>
            </div>

            {/* Products Section */}
            <div className="nav-item" data-aos="fade-up" data-aos-anchor-placement="top-center">
              <div className="nav-image" style={{backgroundImage: `url('https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')`}}>
                <div className="nav-overlay">
                  <h3>Products</h3>
                </div>
              </div>
              <div className="nav-content">
                <p>Explore our exclusive range of luxury furniture designed for hospitality spaces.</p>
                <Link href="/products">
                  <button className="nav-button">Browse Collection</button>
                </Link>
              </div>
            </div>

            {/* Projects Section */}
            <div className="nav-item" data-aos="fade-up" data-aos-anchor-placement="top-center">
              <div className="nav-image" style={{backgroundImage: `url('https://images.unsplash.com/photo-1540638349517-3abd5afc5847?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')`}}>
                <div className="nav-overlay">
                  <h3>Projects</h3>
                </div>
              </div>
              <div className="nav-content">
                <p>View our portfolio of completed projects for luxury hotels and restaurants.</p>
                <Link href="/projects">
                  <button className="nav-button">View Portfolio</button>
                </Link>
              </div>
            </div>

            {/* Services Section */}
            <div className="nav-item" data-aos="fade-up" data-aos-anchor-placement="top-center">
              <div className="nav-image" style={{backgroundImage: `url('https://images.unsplash.com/photo-1533090161767-e6ffed986c88?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')`}}>
                <div className="nav-overlay">
                  <h3>Services</h3>
                </div>
              </div>
              <div className="nav-content">
                <p>Discover our comprehensive services from design consultation to installation.</p>
                <Link href="/services">
                  <button className="nav-button">Our Services</button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* About Preview Section */}
        <section className="about-preview">
          <h2 data-aos="fade-up">Crafting Luxury Experiences</h2>
          <p data-aos="fade-up" data-aos-delay="100">
            At DMD Furnishing, we believe that exceptional spaces require exceptional furniture. 
            For over two decades, we've been creating bespoke furniture solutions for the world's 
            finest hotels, restaurants, and commercial spaces.
          </p>
          <Link href="/about">
            <button className="secondary-button" data-aos="fade-up" data-aos-delay="200">Learn More About Us</button>
          </Link>
        </section>
      </div>
      
      <NextFooter />
    </>
  );
}