'use client';

import Image from 'next/image';
import { useCallback, useRef, useState } from 'react';

export default function BeforeAfterSlider({ beforeSrc, afterSrc, beforeAlt, afterAlt }) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef(null);
  const isDragging = useRef(false);

  const updatePosition = useCallback((clientX) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = clientX - rect.left;
    const pct = Math.max(2, Math.min(98, (x / rect.width) * 100));
    setPosition(pct);
  }, []);

  const handlePointerDown = useCallback((e) => {
    isDragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  }, [updatePosition]);

  const handlePointerMove = useCallback((e) => {
    if (!isDragging.current) return;
    updatePosition(e.clientX);
  }, [updatePosition]);

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  return (
    <div
      ref={containerRef}
      className="ba-slider"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      style={{ position: 'relative', overflow: 'hidden', borderRadius: 24, cursor: 'ew-resize', touchAction: 'none' }}
    >
      {/* After image (full width, behind) */}
      <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9' }}>
        <Image src={afterSrc} alt={afterAlt} fill sizes="(max-width: 800px) 100vw, 80vw" style={{ objectFit: 'cover' }} />
      </div>

      {/* Before image (clipped) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          clipPath: `inset(0 ${100 - position}% 0 0)`,
        }}
      >
        <Image src={beforeSrc} alt={beforeAlt} fill sizes="(max-width: 800px) 100vw, 80vw" style={{ objectFit: 'cover' }} />
      </div>

      {/* Labels */}
      <span className="ba-label ba-label-before" style={{ position: 'absolute', top: 20, left: 20, zIndex: 3 }}>Before</span>
      <span className="ba-label ba-label-after" style={{ position: 'absolute', top: 20, right: 20, zIndex: 3 }}>After</span>

      {/* Divider line + handle */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: `${position}%`,
          transform: 'translateX(-50%)',
          width: 3,
          background: '#c9a96e',
          zIndex: 4,
          pointerEvents: 'none',
        }}
      >
        {/* Handle circle */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 44,
            height: 44,
            borderRadius: '50%',
            background: 'rgba(13, 13, 16, 0.85)',
            border: '2.5px solid #c9a96e',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(4px)',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M6 10L2 10M2 10L5 7M2 10L5 13" stroke="#c9a96e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M14 10L18 10M18 10L15 7M18 10L15 13" stroke="#c9a96e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}
