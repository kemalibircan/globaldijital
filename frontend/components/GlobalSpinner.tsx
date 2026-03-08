'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { getLoading, subscribe, setNavLoading } from '@/lib/loadingStore';

export default function GlobalSpinner() {
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setLoading(getLoading());
    return subscribe(() => setLoading(getLoading()));
  }, []);

  useEffect(() => {
    setNavLoading(false);
  }, [pathname]);

  useEffect(() => {
    if (!mounted || typeof document === 'undefined') return;
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (!anchor || !anchor.href) return;
      try {
        const url = new URL(anchor.href);
        if (url.origin === window.location.origin && url.pathname !== window.location.pathname) {
          setNavLoading(true);
        }
      } catch {
        // ignore
      }
    };
    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, [mounted]);

  const logoSrc = !mounted
    ? '/logos/only-logo.png'
    : theme === 'dark'
      ? '/logos/only-logo-dark-mode.png'
      : '/logos/only-logo.png';

  if (!loading) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/80 dark:bg-black/80 backdrop-blur-sm"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          <Image
            src={logoSrc}
            alt=""
            width={72}
            height={72}
            className="h-[72px] w-[72px] object-contain opacity-90"
          />
          <div
            className="absolute -inset-3 rounded-full border-4 border-trustworthy-blue/30 border-t-transparent animate-spin"
            style={{ animationDuration: '1s' }}
          />
        </div>
        <div className="h-1.5 w-28 rounded-full bg-gray-200 dark:bg-white/20 overflow-hidden">
          <div className="h-full w-full rounded-full bg-trustworthy-blue animate-loading-bar origin-left" />
        </div>
      </div>
    </div>
  );
}
