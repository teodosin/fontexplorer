'use client'

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { createContext, useState } from "react";
import Button from "@/components/Button";
import { ThemeProvider, useTheme } from "@/ThemeContext";

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
  const { toggleTheme } = useTheme();

  return (
    <header className="flex items-center justify-between p-4 top-0 sticky">
      <Button onclick={toggleTheme} label="dark mode" />
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>

          <Header />

          {children}

        </ThemeProvider>
      </body>
    </html>
  );
}
