import { createContext } from 'react';

interface ThemeContextType {
  selectedTheme: string;
  switchTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({ selectedTheme: 'light', switchTheme: () => {} });
