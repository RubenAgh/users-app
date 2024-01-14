import { useCallback, useEffect, useState } from 'react';


export const useTheme = () => {
  const [selectedTheme, setSelectedTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    if (!localStorage.getItem('theme')) {
      const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
      let theme = 'light';
      if (darkThemeMq.matches) {
        theme = 'dark';
        setSelectedTheme(theme);
      }
      localStorage.setItem('theme', theme);
    }
  }, []);

  const switchTheme = useCallback(() => {
    setSelectedTheme((currentTheme: string) => {
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  }, []);

  return {selectedTheme, switchTheme};
};