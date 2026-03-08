'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { translations, Language } from '@/lib/translations';
import Cookies from 'js-cookie';

const HexagonBackground = dynamic(() => import('@/components/HexagonBackground'), {
  ssr: false,
});

const GALLERY_IMAGES = [
  { src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80', alt: 'Ekip çalışması' },
  { src: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80', alt: 'Toplantı' },
  { src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80', alt: 'Ofis' },
  { src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80', alt: 'İş birliği' },
  { src: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80', alt: 'Proje' },
  { src: 'https://images.unsplash.com/photo-1552581234-26160f608093?w=800&q=80', alt: 'Ekip' },
];

export default function AboutPage() {
  const [lang, setLang] = useState<Language>('tr');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setLang((Cookies.get('locale') || 'tr') as Language);
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const t = translations[lang];

  return (
    <main className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white transition-colors duration-300">
      <HexagonBackground />
      <Header />

      <section className="relative container mx-auto px-4 py-20 z-20">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            {t.aboutPage?.title ?? (lang === 'tr' ? 'Hakkımızda' : lang === 'de' ? 'Über uns' : 'من نحن')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
            {t.aboutPage?.intro}
          </p>
        </div>

        {/* Hikayemiz / 2020'den beri, dinamik ekip, teknolojiler */}
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center md:text-left">
            {lang === 'tr' && 'Hikayemiz'}
            {lang === 'de' && 'Unsere Geschichte'}
            {lang === 'ar' && 'قصتنا'}
          </h2>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line">
              {t.aboutPage?.story}
            </p>
          </div>
        </div>

        {/* Misyon & Neden biz */}
        <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white dark:bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-gray-200 dark:border-white/10">
            <h3 className="text-xl font-bold text-trustworthy-blue mb-4">
              {lang === 'tr' && 'Misyonumuz'}
              {lang === 'de' && 'Unsere Mission'}
              {lang === 'ar' && 'مهمتنا'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {t.aboutPage?.mission}
            </p>
          </div>
          <div className="bg-white dark:bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-gray-200 dark:border-white/10">
            <h3 className="text-xl font-bold text-trustworthy-blue mb-4">
              {lang === 'tr' && 'Neden Biz?'}
              {lang === 'de' && 'Warum wir?'}
              {lang === 'ar' && 'لماذا نحن؟'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {t.aboutPage?.whyUs}
            </p>
          </div>
        </div>

        {/* Foto galerisi */}
        <div className="max-w-5xl mx-auto mb-16">
          <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
            {t.aboutPage?.galleryTitle ?? (lang === 'tr' ? 'Galeri' : lang === 'de' ? 'Galerie' : 'معرض الصور')}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {GALLERY_IMAGES.map((img, i) => (
              <div
                key={i}
                className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-white/5 shadow-lg group"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>

        {/* Neden bizi seçmelisiniz – kartlar */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {[
            t.packages.whyUs1,
            t.packages.whyUs2,
            t.packages.whyUs3,
            t.packages.whyUs4,
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-gray-200 dark:border-white/10 text-center hover:border-trustworthy-blue/50 transition-colors"
            >
              <span className="text-2xl text-trustworthy-blue mb-2 block">✓</span>
              <p className="text-gray-700 dark:text-gray-300 font-medium text-sm">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
