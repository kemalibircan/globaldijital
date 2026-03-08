'use client';

import { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';
import Cookies from 'js-cookie';

const languages = [
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
];

export default function LanguageSwitcher() {
  const [currentLang, setCurrentLang] = useState('tr');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const savedLang = Cookies.get('locale') || 'tr';
    setCurrentLang(savedLang);
  }, []);

  const handleLanguageChange = (langCode: string) => {
    setCurrentLang(langCode);
    Cookies.set('locale', langCode, { expires: 365 });
    setIsOpen(false);
    // Reload to apply language
    window.location.reload();
  };

  const currentLanguage = languages.find((lang) => lang.code === currentLang);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-white/10 backdrop-blur-md border border-gray-300 dark:border-white/20 rounded-lg hover:bg-gray-300 dark:hover:bg-white/20 transition-all"
      >
        <Globe className="w-5 h-5 text-gray-900 dark:text-white" />
        <span className="text-sm font-medium text-gray-900 dark:text-white">
          {currentLanguage?.flag} {currentLanguage?.name}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 backdrop-blur-lg rounded-lg shadow-xl border border-gray-200 dark:border-white/20 overflow-hidden z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-trustworthy-blue hover:text-white transition-colors ${
                currentLang === lang.code
                  ? 'bg-trustworthy-blue text-white'
                  : 'text-gray-900 dark:text-gray-200'
              }`}
            >
              <span className="text-2xl">{lang.flag}</span>
              <span className="font-medium">{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

