import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop component that scrolls the window to the top when the route changes
 * Also handles scrolling to specific hash elements
 */
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    if (hash) {
      // If there is a hash, try to find the element and scroll to it
      const element = document.getElementById(hash.substring(1));
      if (element) {
        // Use setTimeout to allow for layout shifts or ensuring element is ready
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    } else {
      // Disable smooth scrolling temporarily for instant jump to top
      document.documentElement.style.scrollBehavior = 'auto';
      window.scrollTo(0, 0); 
      document.documentElement.style.scrollBehavior = '';
    }
  }, [pathname, hash]);

  return null;
}

export default ScrollToTop;
