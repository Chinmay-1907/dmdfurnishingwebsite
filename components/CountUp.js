'use client';

import { useEffect, useRef, useState } from 'react';

export default function CountUp({ end, suffix = '', duration = 2000, className }) {
  // SSR renders the real end value so AI crawlers / no-JS clients see "285+", not "0+"
  const [count, setCount] = useState(end);
  const ref = useRef(null);
  const hasMounted = useRef(false);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // On first client mount, reset to 0 so the animation has somewhere to count from
    if (!hasMounted.current) {
      hasMounted.current = true;
      setCount(0);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const start = performance.now();
          const animate = (now) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * end));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref} className={className}>
      {count}{suffix}
    </span>
  );
}
