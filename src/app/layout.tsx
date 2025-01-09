import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { createContext, useEffect, useState } from "react";
import Button from "@/components/Button";
import { ThemeProvider, useTheme } from "@/ThemeContext";
import { getFontsList, loadAllFonts } from "@/fonts";
import FontLoader from "@/components/FontLoader";
import Header from "@/components/Header";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  let fonts = await getFontsList();
  let families = (fonts).map((font) => font.family);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark:bg-black dark:text-gray-100`}
      >
        <ThemeProvider>
          <FontLoader fontFamilies={families} />

          <Header />

          {children}

          <footer className="fixed bottom-0 items-center justify-center">
          </footer>

        </ThemeProvider>
      </body>
    </html>
  );
}
