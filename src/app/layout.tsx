import type { Metadata } from "next";
import "./globals.css";

import { getFontsList } from "@/utils/fonts_server";
import ClientProviders from "@/ClientProviders";

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
        className={`antialiased bg-slate-200 dark:bg-black transition-colors duration-500 dark:text-gray-100`}
      >
        <ClientProviders fonts={fonts}>

          {children}

          <footer className="fixed bottom-0 items-center justify-center">
          </footer>

        </ClientProviders>
      </body>
    </html>
  );
}
