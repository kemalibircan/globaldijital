'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';
import { translations, Language } from '@/lib/translations';
import Cookies from 'js-cookie';

interface HeaderProps {
  /** Dashboard vb. sayfalarda sağ tarafta kullanıcı menüsü göstermek için */
  rightContent?: React.ReactNode;
}

export default function Header({ rightContent }: HeaderProps) {
  const [mounted, setMounted] = useState(false);
  const [lang, setLang] = useState<Language>('tr');
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
    setLang((Cookies.get('locale') || 'tr') as Language);
  }, []);

  const logoSrc = !mounted
    ? '/logos/only-logo.png'
    : theme === 'dark'
      ? '/logos/only-logo-dark-mode.png'
      : '/logos/only-logo.png';

  const t = translations[lang];

  return (
    <header className="relative z-30 bg-white/90 dark:bg-black/50 backdrop-blur-lg border-b border-gray-200 dark:border-white/10">
      <nav className="container mx-auto px-4 py-4 flex flex-wrap gap-4 justify-between items-center">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src={logoSrc}
            alt=""
            width={40}
            height={40}
            className="h-10 w-10 object-contain flex-shrink-0"
            priority
          />
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            GlobalDijital
          </span>
        </Link>
        {rightContent !== undefined ? (
          rightContent
        ) : (
          <div className="flex flex-wrap justify-end gap-x-4 gap-y-2 items-center">
            <Link
              href="/"
              className="text-gray-700 dark:text-white hover:text-trustworthy-blue dark:hover:text-blue-300 transition-colors"
            >
              {t.nav.home}
            </Link>
            <Link
              href="/services"
              className="text-gray-700 dark:text-white hover:text-trustworthy-blue dark:hover:text-blue-300 transition-colors"
            >
              {t.nav.services}
            </Link>
            <Link
              href="/projects"
              className="text-gray-700 dark:text-white hover:text-trustworthy-blue dark:hover:text-blue-300 transition-colors"
            >
              {t.nav.projects}
            </Link>
            <Link
              href="/blog"
              className="text-gray-700 dark:text-white hover:text-trustworthy-blue dark:hover:text-blue-300 transition-colors"
            >
              {t.nav.blog}
            </Link>
            <Link
              href="/about"
              className="text-gray-700 dark:text-white hover:text-trustworthy-blue dark:hover:text-blue-300 transition-colors"
            >
              {t.nav.about}
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 dark:text-white hover:text-trustworthy-blue dark:hover:text-blue-300 transition-colors"
            >
              {t.nav.contact}
            </Link>
            <ThemeToggle />
            <LanguageSwitcher />
          </div>
        )}
      </nav>
    </header>
  );
}
