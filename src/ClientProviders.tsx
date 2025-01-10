'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const ThemeProvider = dynamic(() => import('@/ThemeContext').then(mod => mod.ThemeProvider), { ssr: false });
const FontSaver = dynamic(() => import('@/components/FontSaver'), { ssr: false });
const Header = dynamic(() => import('@/components/Header'), { ssr: false });

interface ClientProvidersProps {
  children: React.ReactNode;
  fonts: any[];
}

export default function ClientProviders({ children, fonts }: ClientProvidersProps) {
  return (
    <ThemeProvider>
      <Header />
      <FontSaver fonts={fonts} />
      {children}
    </ThemeProvider>
  );
}
