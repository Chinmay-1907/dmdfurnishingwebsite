import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

// Import components
import NextHeader from '../components/NextHeader';
import NextFooter from '../components/NextFooter';

// Import styles
import '../styles/Products.css';

export default function Products() {
  return (
    <>
      <Head>
        <title>Our Products - DMD Furnishing</title>
        <meta name="description" content="Discover our premium furniture collections for hospitality and commercial spaces" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <NextHeader />
      
      <div className="products-container">
        <section className="products-hero">
          <h1>Our Products</h1>
          <p>Discover our premium furniture collections</p>
        </section>

        <section className="product-categories">
          <h2>Product Categories</h2>
          <div className="category-grid">
            <div className="category-item">
              <div className="category-image"></div>
              <h3>Hotel Suites</h3>
              <p>Luxury furniture for premium hotel rooms</p>
              <button className="view-button">View Collection</button>
            </div>
            <div className="category-item">
              <div className="category-image"></div>
              <h3>Lobby & Reception</h3>
              <p>Create stunning first impressions</p>
              <button className="view-button">View Collection</button>
            </div>
            <div className="category-item">
              <div className="category-image"></div>
              <h3>Restaurant & Dining</h3>
              <p>Elegant dining furniture solutions</p>
              <button className="view-button">View Collection</button>
            </div>
            <div className="category-item">
              <div className="category-image"></div>
              <h3>Executive Offices</h3>
              <p>Professional workspace furniture</p>
              <button className="view-button">View Collection</button>
            </div>
            <div className="category-item">
              <div className="category-image"></div>
              <h3>Conference Rooms</h3>
              <p>Sophisticated meeting spaces</p>
              <button className="view-button">View Collection</button>
            </div>
            <div className="category-item">
              <div className="category-image"></div>
              <h3>Outdoor & Patio</h3>
              <p>Weather-resistant luxury furniture</p>
              <button className="view-button">View Collection</button>
            </div>
          </div>
        </section>

        <section className="featured-products">
          <h2>Featured Products</h2>
          <div className="products-grid">
            <div className="product-item">
              <div className="product-image"></div>
              <h3>Luxe Executive Chair</h3>
              <p>Premium ergonomic office chair</p>
              <button className="details-button">View Details</button>
            </div>
            <div className="product-item">
              <div className="product-image"></div>
              <h3>Elegance Dining Set</h3>
              <p>Sophisticated dining table and chairs</p>
              <button className="details-button">View Details</button>
            </div>
            <div className="product-item">
              <div className="product-image"></div>
              <h3>Royal Suite Bed</h3>
              <p>Luxury hotel bed with headboard</p>
              <button className="details-button">View Details</button>
            </div>
            <div className="product-item">
              <div className="product-image"></div>
              <h3>Modern Reception Desk</h3>
              <p>Contemporary front desk solution</p>
              <button className="details-button">View Details</button>
            </div>
          </div>
        </section>

        <section className="custom-solutions">
          <h2>Custom Furniture Solutions</h2>
          <p>We offer bespoke furniture design and manufacturing services tailored to your specific requirements.</p>
          <button className="cta-button">Request Custom Quote</button>
        </section>
      </div>
      
      <NextFooter />
    </>
  );
}