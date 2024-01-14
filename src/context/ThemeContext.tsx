import { createContext } from 'react';

export const ThemeContext = createContext({ selectedTheme: 'light', switchTheme: () => {} });
