import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Don't show on home page
  if (location.pathname === '/') {
    return null;
  }

  return (
    <div className="container" style={{ paddingTop: '20px', paddingBottom: '0' }}>
      <button 
        onClick={() => navigate(-1)} 
        className="back-button"
        aria-label="Go back to previous page"
      >
        <FaArrowLeft /> <span>Back</span>
      </button>
    </div>
  );
};

export default BackButton;
