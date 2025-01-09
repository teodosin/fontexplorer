'use client'

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { createContext, useEffect, useState } from "react";
import Button from "@/components/Button";
import { ThemeProvider, useTheme } from "@/ThemeContext";
import { getFontsList } from "@/fonts";

// const darkModeContext = createContext(false);

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "Font Explorer",
//   description: "Explore fonts by making comparisons",
// };

function Header() {
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    getFontsList();
  }, [theme]);

  return (
    <header className="flex items-center justify-between p-4 top-0 sticky">
      <Button onClick={() => {
        console.log("Changing theme to: ", theme);
        toggleTheme();
      }
      } label="dark mode" />
    </header>
  )
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark:bg-black dark:text-gray-100`}
      >
        <ThemeProvider>

          <Header />

          {children}

          <footer className="fixed bottom-0 items-center justify-center">
          </footer>

        </ThemeProvider>
      </body>
    </html>
  );
}
