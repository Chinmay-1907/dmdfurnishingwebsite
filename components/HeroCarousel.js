'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

/**
 * Deferred-mount hero carousel.
 *
 * findings-performance.md P1: all 4 slides were stacked absolute + opacity-
 * animated from first paint. Native `loading="lazy"` on slides 2-4 did NOT
 * help — they are geometrically always "in viewport" (stacked directly on
 * top of the LCP slide), so browsers fetched all ~290KB of them immediately
 * regardless of the lazy attribute. Fix: only slide 1 (the real LCP element)
 * mounts on first render; slides 2-4 mount after a short delay, well after
 * first paint, so they never compete with the LCP image or JS/CSS bundle on
 * the initial network waterfall. The CSS crossfade (animation-delay per
 * index) keeps working once each slide is in the DOM.
 */
export default function HeroCarousel({ images, imageClassName, sizes }) {
  const [mountedCount, setMountedCount] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => setMountedCount(images.length), 2000);
    return () => clearTimeout(timer);
  }, [images.length]);

  return (
    <>
      {images.slice(0, mountedCount).map((img, index) => (
        <Image
          key={img.src}
          src={img.src}
          alt={img.alt}
          fill
          sizes={sizes}
          priority={index === 0}
          loading={index === 0 ? undefined : 'lazy'}
          style={{ animationDelay: `${index * 7}s` }}
          className={imageClassName}
        />
      ))}
    </>
  );
}
