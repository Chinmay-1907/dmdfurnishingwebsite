'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    // setTimeout lets the new route paint before we query .fade-in-up nodes
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
      );

      document.querySelectorAll('.fade-in-up').forEach((el) => {
        // Reset visibility so elements re-animate on route change
        el.classList.remove('visible');
        observer.observe(el);
      });

      return () => observer.disconnect();
    }, 0);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
