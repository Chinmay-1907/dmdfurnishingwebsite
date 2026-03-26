import React, { useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Eagerly loaded — used on every page or needed immediately
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import ScrollToTop from './components/ScrollToTop';
import ScrollProgress from './components/ScrollProgress';
import BackButton from './components/BackButton';

// Lazily loaded route-level components
const AboutUs = React.lazy(() => import('./components/AboutUs'));
const Products = React.lazy(() => import('./components/Products'));
const ProductDetail = React.lazy(() => import('./components/ProductDetail'));
const Projects = React.lazy(() => import('./components/Projects'));
const ProjectDetail = React.lazy(() => import('./components/ProjectDetail'));
// const Testimonials = React.lazy(() => import('./components/Testimonials'));
const Services = React.lazy(() => import('./components/Services'));
const Contact = React.lazy(() => import('./components/Contact'));
const ScheduleCall = React.lazy(() => import('./components/ScheduleCall'));
const WebsitePolicies = React.lazy(() => import('./components/WebsitePolicies'));
const Inspirations = React.lazy(() => import('./components/Inspirations'));
const InspirationDetail = React.lazy(() => import('./components/InspirationDetail'));
const NotFound = React.lazy(() => import('./components/NotFound'));

function App() {
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
    document.documentElement.classList.add('dark-mode');
    document.body.classList.add('dark-mode');
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <ScrollProgress position="bottom" variant="circle" brandText="DMD" showPercent />
        <Header />
        <main className="main-content">
          <BackButton />
          <Suspense fallback={<div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:institutionId" element={<Products />} />
              <Route path="/products/:institutionId/:furnitureTypeId" element={<Products />} />
              <Route path="/products/:institutionId/:furnitureTypeId/:subcategoryId" element={<Products />} />
              <Route path="/products/:institutionId/:furnitureTypeId/:subcategoryId/:productId" element={<ProductDetail />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:projectId" element={<ProjectDetail />} />
              {/* <Route path="/testimonials" element={<Testimonials />} /> */}
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/schedule-call" element={<ScheduleCall />} />
              <Route path="/inspirations" element={<Inspirations />} />
              <Route path="/inspirations/:id" element={<InspirationDetail />} />
              <Route path="/website-policies" element={<WebsitePolicies />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
