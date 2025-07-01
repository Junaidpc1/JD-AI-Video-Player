import React, { createContext, useState, useContext, ReactNode } from 'react';

interface Theme {
  mode: 'light' | 'dark';
  background: string;
  text: string;
}

const lightTheme: Theme = {
  mode: 'light',
  background: '#ffffff',
  text: '#000000',
};

const darkTheme: Theme = {
  mode: 'dark',
  background: '#000000',
  text: '#ffffff',
};

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: lightTheme,
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(darkTheme); // default: dark

  const toggleTheme = () => {
    setTheme((prev) => (prev.mode === 'dark' ? lightTheme : darkTheme));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
