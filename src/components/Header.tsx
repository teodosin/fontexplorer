'use client'

import { useTheme } from "@/ThemeContext";
import Button from "./Button";
import { useEffect, useState } from "react";


export default function Header() {
  const { theme, toggleTheme } = useTheme();

  const [label, setLabel] = useState("dark");

  useEffect(() => {
    setLabel(theme === "light" ? "light" : "dark");
  }, [theme]);

  return (
    <header className="flex items-center justify-between p-4 top-0 sticky">
      <Button
        onClick={() => {
          console.log("Changing theme to: ", theme);
          toggleTheme();
        }}
      >
        {label}
      </Button>
    </header>
  )
}