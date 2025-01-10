'use client';

import React from 'react';
import { ThemeProvider } from '@/ThemeContext';
import FontSaver from '@/components/FontSaver';
import Header from '@/components/Header';

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
