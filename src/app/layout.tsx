import type { Metadata } from "next";
import "./globals.css";

// src/app/layout.tsx
import dynamic from 'next/dynamic';

import { ThemeProvider } from "@/ThemeContext";
import Header from "@/components/Header";

import { getFontsList } from "@/fonts_server";

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
        <ThemeProvider fonts={fonts}>

          <Header />

          {children}

          <footer className="fixed bottom-0 items-center justify-center">
          </footer>

        </ThemeProvider>
      </body>
    </html>
  );
}
