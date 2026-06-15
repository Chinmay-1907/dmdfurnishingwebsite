'use client';

import { createContext, useContext, useEffect } from 'react';

const ThemeContext = createContext({
  theme: 'light',
  resolvedTheme: 'light',
  setTheme: () => {},
});

function applyTheme(resolved) {
  if (typeof document === 'undefined') return;
  document.documentElement.dataset.theme = resolved;
  document.documentElement.classList.remove('dark-mode', 'light-mode');
  document.documentElement.classList.add(`${resolved}-mode`);
  document.body?.classList.remove('dark-mode', 'light-mode');
  document.body?.classList.add(`${resolved}-mode`);
}

export function ThemeProvider({ children }) {
  useEffect(() => {
    applyTheme('light');
  }, []);

  return (
    <ThemeContext.Provider value={{ theme: 'light', resolvedTheme: 'light', setTheme: () => {} }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

// Anti-FOUC: runs synchronously in <head> during HTML parse, before first
// paint, so the page paints in light mode immediately. Static string only.
export const themeBootScript = `(function(){try{document.documentElement.dataset.theme='light';document.documentElement.classList.add('light-mode');}catch(e){}})();`;
