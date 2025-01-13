'use client'

import { useTheme } from "@/ThemeContext";
import Button from "./Button";
import { useEffect, useState } from "react";


export default function Header() {
  const { theme, toggleTheme } = useTheme();

  const [label, setLabel] = useState("dark");

  useEffect(() => {
    setLabel(theme === "light" ? "🌞" : "🌕");
  }, [theme]);

  return (
    <header className="pointer-events-none flex items-center justify-between p-4 top-0 sticky">
      <Button
        opaque={true}
        onClick={() => {
          toggleTheme();
        }}
      >
        <span className="text-3xl">{label}</span>
      </Button>
    </header>
  )
}