import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { createContext, useEffect, useState } from "react";
import Button from "@/components/Button";
import { ThemeProvider, useTheme } from "@/ThemeContext";
import { getFontsList } from "@/fonts_server";
import FontSaver from "@/components/FontSaver";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Font Explorer",
  description: "Explore fonts by making comparisons",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  let fonts = await getFontsList();

  return (
    <html lang="en">
      <body
        className={`antialiased bg-slate-200 dark:bg-black dark:text-gray-100`}
      >
        <ThemeProvider>
          
          <FontSaver fonts={fonts} />

          <Header />

          {children}

          <footer className="fixed bottom-0 items-center justify-center">
          </footer>

        </ThemeProvider>
      </body>
    </html>
  );
}
