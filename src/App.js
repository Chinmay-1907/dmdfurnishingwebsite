import React, { useEffect, useCallback, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Import components
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import ScrollToTop from './components/ScrollToTop';
import AboutUs from './components/AboutUs';
import Products from './components/Products';
import ProductDetail from './components/ProductDetail';
import Projects from './components/Projects';
import ProjectDetail from './components/ProjectDetail';
import Testimonials from './components/Testimonials';
import Services from './components/Services';
import Contact from './components/Contact';
import ScheduleCall from './components/ScheduleCall';
import Inspirations from './components/Inspirations';
import InspirationDetail from './components/InspirationDetail';
import ScrollProgress from './components/ScrollProgress';
import BackButton from './components/BackButton';

function App() {
  const getInitialTheme = () => {
    if (typeof window === 'undefined') {
      return 'light';
    }
    try {
      const storedTheme = window.localStorage.getItem('dmd-theme-preference');
      if (storedTheme === 'dark' || storedTheme === 'light') {
        return storedTheme;
      }
    } catch (error) {
      /* Ignore storage read issues */
    }
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  };

  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      root.setAttribute('data-theme', theme);
      if (theme === 'dark') {
        root.classList.add('dark-mode');
        document.body.classList.add('dark-mode');
      } else {
        root.classList.remove('dark-mode');
        document.body.classList.remove('dark-mode');
      }
    }
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem('dmd-theme-preference', theme);
      } catch (error) {
        /* Ignore storage write issues */
      }
    }
  }, [theme]);

  const handleToggleTheme = useCallback(() => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <ScrollProgress position="bottom" variant="circle" brandText="DMD" showPercent />
        <Header theme={theme} onToggleTheme={handleToggleTheme} />
        <main className="main-content">
          <BackButton />
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
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/schedule-call" element={<ScheduleCall />} />
            <Route path="/inspirations" element={<Inspirations />} />
            <Route path="/inspirations/:id" element={<InspirationDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
