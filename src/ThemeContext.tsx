'use client'

const THEME_KEY = "teodosin-font-explorer-theme";


import { createContext, useContext, useEffect, useState } from 'react';
import { isClient } from './utils/utils';
import dynamic from 'next/dynamic';

const FontSaver = dynamic(() => import('@/components/FontSaver'), { ssr: false });

interface ThemeData {
    version: "0.0.1";
    theme: "light" | "dark";
}

export function saveTheme(data: ThemeData) {
    if (!isClient()) {
        return;
    }
    localStorage.setItem(THEME_KEY, JSON.stringify(data));
}

export function loadTheme(): ThemeData {
    if (!isClient()) {
        return {
            version: "0.0.1",
            theme: "dark"
        }
    }
    const data = localStorage.getItem(THEME_KEY);
    if (data) {
        return JSON.parse(data);
    }
    else {
        return  {
            version: "0.0.1",
            theme: "dark"
        }
    }
}   

interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    // Access localStorage or window inside useEffect to ensure it's only run on the client
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
