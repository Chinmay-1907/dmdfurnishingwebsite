import React, { useEffect, useState } from 'react';
import '../styles/ScrollProgress.css';

function ScrollProgress({ showPercent = true, position = 'top' }) {
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

