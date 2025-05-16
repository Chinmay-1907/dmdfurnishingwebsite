import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop component that scrolls the window to the top when the route changes
 * This component doesn't render anything visible, it just performs the scrolling side effect
 */
function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    // Scroll to top when the route changes - runs synchronously before browser paints
    window.scrollTo(0, 0); // instant jump, no animation
  }, [pathname]); // Re-run the effect when pathname changes

  return null; // This component doesn't render anything
}

export default ScrollToTop;