'use client';

import { ThemeProvider } from 'next-themes';
import GlobalSpinner from '@/components/GlobalSpinner';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem={true}>
      {children}
      <GlobalSpinner />
    </ThemeProvider>
  );
}

