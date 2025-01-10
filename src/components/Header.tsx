'use client'

import { useTheme } from "@/ThemeContext";
import Button from "./Button";


export default function Header() {
  const { theme, toggleTheme } = useTheme();

  let label = theme === "dark" ? "light" : "dark";

  return (
    <header className="flex items-center justify-between p-4 top-0 sticky">
      <Button
        onClick={() => {
          console.log("Changing theme to: ", theme);
          toggleTheme();
        }
        }
        label={label} />
    </header>
  )
}