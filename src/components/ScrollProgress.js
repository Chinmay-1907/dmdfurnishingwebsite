import React, { useEffect, useMemo, useState } from 'react';
import '../styles/ScrollProgress.css';

function ScrollProgress({ showPercent = true, position = 'top', variant = 'bar', brandText = 'DMD' }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop || window.pageYOffset || 0;
      const scrollHeight = doc.scrollHeight || 0;
      const viewport = window.innerHeight || 0;
      const denom = Math.max(scrollHeight - viewport, 1);
      const pct = Math.min(100, Math.max(0, (scrollTop / denom) * 100));
      setProgress(pct);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const barStyle = position === 'bottom' ? { bottom: 0, top: 'auto' } : {};

  const ringRotation = useMemo(() => progress * 3.6, [progress]);
  const circleText = useMemo(() => {
    const unit = `${brandText} • `;
    let s = '';
    while (s.length < 120) s += unit;
    return s;
  }, [brandText]);

  if (variant === 'circle') {
    const containerStyle = position === 'bottom' ? { bottom: 24, top: 'auto' } : { top: 24 };
    
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    };

    return (
      <div 
        className="scroll-circle-container" 
        style={containerStyle} 
        onClick={scrollToTop}
        title="Scroll to top"
        role="button"
        tabIndex={0}
      >
        <div className="scroll-circle-center">{showPercent ? `${Math.round(progress)}%` : ''}</div>
        <svg className="scroll-circle-svg" viewBox="0 0 100 100" aria-hidden="true">
          <defs>
            <path id="scroll-circle-path" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
          </defs>
          <circle className="scroll-circle-ring" cx="50" cy="50" r="42" />
          <g className="scroll-circle-text" style={{ transform: `rotate(${ringRotation}deg)` }}>
            <text>
              <textPath href="#scroll-circle-path" startOffset="0%">
                {circleText}
              </textPath>
            </text>
          </g>
        </svg>
      </div>
    );
  }

  return (
    <div className="scroll-progress-container" style={barStyle} aria-hidden="true">
      <div className="scroll-progress-bar" style={{ width: `${progress}%` }} />
      {showPercent && (
        <div className="scroll-progress-label">{Math.round(progress)}%</div>
      )}
    </div>
  );
}

export default ScrollProgress;
