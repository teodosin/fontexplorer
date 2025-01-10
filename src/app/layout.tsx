import type { Metadata } from "next";
import "./globals.css";

import dynamic from 'next/dynamic';

// Client components that are not server-side renderable
const ThemeProvider = dynamic(() => import('@/ThemeContext').then(mod => mod.ThemeProvider), { ssr: false });
const FontSaver = dynamic(() => import('@/components/FontSaver'), { ssr: false });
const Header = dynamic(() => import('@/components/Header'), { ssr: false });

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
