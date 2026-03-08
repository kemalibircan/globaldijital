'use client';

import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-white/10 backdrop-blur-md border border-gray-300 dark:border-white/20 rounded-lg">
        <div className="w-5 h-5" />
        <span className="text-sm font-medium text-gray-900 dark:text-white">...</span>
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-white/10 backdrop-blur-md border border-gray-300 dark:border-white/20 rounded-lg hover:bg-gray-300 dark:hover:bg-white/20 transition-all"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <>
          <Sun className="w-5 h-5 text-yellow-400" />
          <span className="text-sm font-medium text-white">Light</span>
        </>
      ) : (
        <>
          <Moon className="w-5 h-5 text-trustworthy-blue" />
          <span className="text-sm font-medium text-gray-900">Dark</span>
        </>
      )}
    </button>
  );
}

