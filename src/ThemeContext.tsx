'use client'

const THEME_KEY = "teodosin-font-explorer-theme";


import { createContext, useContext, useEffect, useState } from 'react';
import { isClient } from './utils';
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
    theme: "light" | "dark";
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children, fonts }: { children: React.ReactNode, fonts: any[] }) {
    const [theme, setTheme] = useState<"light" | "dark">("dark")

    useEffect(() => {
        const savedTheme = loadTheme();
        setTheme(savedTheme.theme);
    }, []);

    useEffect(() => {
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(theme);

        saveTheme({
            version: "0.0.1",
            theme: theme
        })
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === "light" ? "dark" : "light");
    };

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}