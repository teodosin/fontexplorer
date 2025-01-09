'use client'

const THEME_KEY = "teodosin-font-explorer-theme";

import { createContext, useContext, useEffect, useState } from 'react';

interface ThemeData {
    version: "0.0.1";
    theme: "light" | "dark";
}

export function saveTheme(data: ThemeData) {
    localStorage.setItem(THEME_KEY, JSON.stringify(data));
}

export function loadTheme(): ThemeData {
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

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<"light" | "dark">("dark")

}