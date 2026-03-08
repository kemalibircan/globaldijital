'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { trustedBrands, type TrustedBrand } from '@/lib/trustedBrands';
import { translations, Language } from '@/lib/translations';
import { contactInfo } from '@/lib/contactInfo';
import Cookies from 'js-cookie';

/** Footer koyu arka planda logo görünsün diye Simple Icons URL'ini beyaz yapar */
function footerLogoUrl(url: string): string {
  if (!url.includes('cdn.simpleicons.org')) return url;
  if (url.match(/\/[0-9A-Fa-f]{6}$/)) return url.replace(/\/[0-9A-Fa-f]{6}$/, '/FFFFFF');
  return url + '/FFFFFF';
}

function FooterLogoItem({ brand, whiteUrl }: { brand: TrustedBrand; whiteUrl: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <a
      href={brand.website ?? '#'}
      target="_blank"
      rel="noopener noreferrer"
      className="opacity-70 hover:opacity-100 transition-opacity h-6 w-20 flex items-center justify-center flex-shrink-0"
      title={brand.name}
    >
      {!failed ? (
        <img
          src={whiteUrl}
          alt={brand.name}
          width={80}
          height={24}
          className="h-5 w-auto max-w-full object-contain"
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
        />
      ) : (
        <span className="text-xs text-gray-500 truncate max-w-[80px] text-center">{brand.name}</span>
      )}
    </a>
  );
}

export default function Footer() {
  const [mounted, setMounted] = useState(false);
  const [lang, setLang] = useState<Language>('tr');

  useEffect(() => {
    setMounted(true);
    setLang((Cookies.get('locale') || 'tr') as Language);
  }, []);

  if (!mounted) return null;

  const t = translations[lang];

  return (
    <footer className="relative bg-gray-900 dark:bg-black/80 backdrop-blur-xl border-t border-gray-300 dark:border-white/10 py-12 mt-20 z-20">
      <div className="container mx-auto px-4">
        {/* Logo strip - footer'da beyaz logolar */}
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10 pb-8 mb-8 border-b border-gray-700 dark:border-gray-800">
          <p className="text-xs text-gray-500 dark:text-gray-500 w-full text-center mb-4">
            {t.trusted?.subtitle ?? 'Güvenilir teknoloji ekosistemleri'}
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
            {trustedBrands.slice(0, 10).map((brand) => (
              <FooterLogoItem
                key={brand.name}
                brand={brand}
                whiteUrl={footerLogoUrl(brand.logo)}
              />
            ))}
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div>
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/logos/dark-mode-logo.png"
                alt="GlobalDijital"
                width={140}
                height={40}
                className="h-9 w-auto object-contain"
              />
            </Link>
            <p className="text-gray-300 dark:text-gray-400">{t.footer.description}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-gray-200 dark:text-white">{t.nav.services}</h4>
            <ul className="space-y-2 text-gray-300 dark:text-gray-400">
              <li>
                <Link href="/services" className="hover:text-trustworthy-blue transition-colors">
                  {t.services.website.title}
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-trustworthy-blue transition-colors">
                  {t.services.mobile.title}
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-trustworthy-blue transition-colors">
                  {t.services.seo.title}
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-trustworthy-blue transition-colors">
                  {t.services.marketing.title}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-gray-200 dark:text-white">{t.footer.contact}</h4>
            <ul className="space-y-2 text-gray-300 dark:text-gray-400">
              <li>
                <a href={`mailto:${contactInfo.email}`} className="hover:text-trustworthy-blue transition-colors">
                  {contactInfo.email}
                </a>
              </li>
              <li>
                <a href={`tel:${contactInfo.phoneRaw}`} className="hover:text-trustworthy-blue transition-colors">
                  {contactInfo.phone}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-gray-200 dark:text-white">{t.footer.company}</h4>
            <ul className="space-y-2 text-gray-300 dark:text-gray-400">
              <li>
                <Link href="/about" className="hover:text-trustworthy-blue transition-colors">
                  {t.footer.aboutUs}
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-trustworthy-blue transition-colors">
                  {t.nav.projects}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-trustworthy-blue transition-colors">
                  {t.nav.blog}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-trustworthy-blue transition-colors">
                  {t.footer.contact}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-trustworthy-blue transition-colors">
                  {t.footer.privacy}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-trustworthy-blue transition-colors">
                  {t.footer.terms}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-gray-200 dark:text-white">{t.footer.languages}</h4>
            <ul className="space-y-2 text-gray-300 dark:text-gray-400">
              {[
                { code: 'tr' as Language, label: 'Türkçe 🇹🇷' },
                { code: 'de' as Language, label: 'Deutsch 🇩🇪' },
                { code: 'ar' as Language, label: 'العربية 🇸🇦' },
              ].map(({ code, label }) => (
                <li key={code}>
                  <button
                    type="button"
                    onClick={() => {
                      Cookies.set('locale', code, { expires: 365 });
                      window.location.reload();
                    }}
                    className={`hover:text-trustworthy-blue cursor-pointer transition-colors text-left ${
                      lang === code ? 'text-trustworthy-blue font-medium' : ''
                    }`}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 dark:border-gray-800 mt-8 pt-8 text-center text-gray-300 dark:text-gray-400">
          <p>&copy; 2024 GlobalDijital. {t.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}
