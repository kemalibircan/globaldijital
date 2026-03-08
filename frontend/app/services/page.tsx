'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PaymentPartnersSection from '@/components/PaymentPartnersSection';
import { translations, Language } from '@/lib/translations';
import {
  packagesData,
  ekHizmetler,
  comparisonFeatures,
  comparisonMatrix,
  type PackageId,
} from '@/lib/packagesData';
import { trustedBrands, type TrustedBrand } from '@/lib/trustedBrands';
import Cookies from 'js-cookie';

const HexagonBackground = dynamic(() => import('@/components/HexagonBackground'), {
  ssr: false,
});

function TrustedBrandLogo({ brand }: { brand: TrustedBrand }) {
  const [failed, setFailed] = useState(false);
  return (
    <a
      href={brand.website ?? '#'}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center h-10 w-24 grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300"
      title={brand.name}
    >
      {!failed ? (
        <img
          src={brand.logo}
          alt={brand.name}
          className="h-6 w-auto max-w-full object-contain"
          loading="lazy"
          onError={() => setFailed(true)}
        />
      ) : (
        <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 truncate max-w-[80px] text-center">
          {brand.name}
        </span>
      )}
    </a>
  );
}

export default function ServicesPage() {
  const [lang, setLang] = useState<Language>('tr');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedLang = (Cookies.get('locale') || 'tr') as Language;
    setLang(savedLang);
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const t = translations[lang];

  const whichPackageOptions: { id: PackageId; label: string }[] = [
    { id: 'bronze', label: t.packages.whichOptionBronze },
    { id: 'silver', label: t.packages.whichOptionSilver },
    { id: 'gold', label: t.packages.whichOptionGold },
    { id: 'platinum', label: t.packages.whichOptionPlatinum },
    { id: 'diamond', label: t.packages.whichOptionDiamond },
    { id: 'diamondMobil', label: t.packages.whichOptionDiamondMobil },
    { id: 'elite', label: t.packages.whichOptionElite },
  ];

  return (
    <main className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white overflow-hidden transition-colors duration-300">
      <HexagonBackground />
      <Header />

      {/* Hero */}
      <section className="relative container mx-auto px-4 py-20 z-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            {t.packages.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t.services.pageSubtitle}
          </p>
        </div>

        {/* Trusted brands strip */}
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8 py-8 border-y border-gray-200 dark:border-white/10 mb-16">
          <p className="text-xs text-gray-500 dark:text-gray-500 w-full text-center mb-4">
            {t.trusted?.title ?? 'Dünya devleriyle aynı teknolojiler'}
          </p>
          {trustedBrands.slice(0, 8).map((brand) => (
            <TrustedBrandLogo key={brand.name} brand={brand} />
          ))}
        </div>

        {/* Packages grid */}
        <section id="paketler" className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {packagesData.map((pkg) => (
              <div
                key={pkg.id}
                id={`paket-${pkg.id}`}
                className={`relative bg-white dark:bg-white/5 backdrop-blur-xl p-6 rounded-2xl border ${
                  pkg.popular
                    ? 'border-trustworthy-blue ring-2 ring-trustworthy-blue/30'
                    : 'border-gray-200 dark:border-white/10'
                } hover:border-trustworthy-blue/50 transition-all flex flex-col`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-trustworthy-blue text-white px-3 py-1 rounded-full text-xs font-bold">
                    {t.services.mostPopular}
                  </div>
                )}
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl" aria-hidden>{pkg.emoji}</span>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {pkg.name}
                  </h2>
                </div>
                <p className="text-sm text-trustworthy-blue dark:text-blue-300 font-medium mb-3">
                  {pkg.tagline}
                </p>
                <div className="mb-4">
                  <span className="text-2xl font-bold text-trustworthy-blue">
                    {pkg.price}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 text-sm ml-1">
                    {pkg.period}
                  </span>
                </div>
                <ul className="space-y-2 mb-6 flex-1 text-sm text-gray-600 dark:text-gray-400">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-trustworthy-blue mt-0.5 flex-shrink-0">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                {pkg.note && (
                  <p className="text-xs text-gray-500 dark:text-gray-500 mb-4 italic">{pkg.note}</p>
                )}
                <Link
                  href="/contact"
                  className={`block w-full text-center px-4 py-3 rounded-lg font-semibold text-sm transition-all ${
                    pkg.popular
                      ? 'bg-trustworthy-blue text-white hover:bg-blue-700'
                      : 'bg-gray-200 dark:bg-white/10 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-white/20'
                  }`}
                >
                  {t.services.getQuote}
                </Link>
              </div>
            ))}
          </div>

          {/* Ek Hizmetler */}
          <div className="mt-12 max-w-4xl mx-auto">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              {t.packages.ekHizmetlerTitle}
            </h3>
            <div className="flex flex-wrap gap-3">
              {ekHizmetler.map((item, idx) => (
                <div
                  key={idx}
                  className="px-4 py-2 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 text-sm"
                >
                  <span className="font-medium">{item.label}</span>
                  {item.price && <span className="text-trustworthy-blue ml-2">{item.price}</span>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison table */}
        <section className="py-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
              {t.packages.compareTitle}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {t.packages.compareSubtitle}
            </p>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 backdrop-blur-xl">
            <table className="w-full min-w-[800px] text-left">
              <thead>
                <tr className="border-b border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5">
                  <th className="px-4 py-4 font-semibold text-gray-900 dark:text-white w-48">
                    {t.packages.compareFeatureLabel}
                  </th>
                  {packagesData.map((pkg) => (
                    <th key={pkg.id} className="px-4 py-4 font-semibold text-gray-900 dark:text-white text-sm">
                      {pkg.emoji} {pkg.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((row) => (
                  <tr key={row.key} className="border-b border-gray-100 dark:border-white/5 hover:bg-gray-50/50 dark:hover:bg-white/5">
                    <td className="px-4 py-3 text-gray-700 dark:text-gray-300 font-medium">{row.label}</td>
                    {packagesData.map((pkg) => (
                      <td key={pkg.id} className="px-4 py-3 text-gray-600 dark:text-gray-400 text-sm">
                        {comparisonMatrix[pkg.id][row.key] || '—'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Hangi paket */}
        <section className="py-16 bg-gray-50 dark:bg-transparent rounded-2xl" id="hangi-paket">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
              {t.packages.whichPackageTitle}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
              {t.packages.whichPackageSubtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {whichPackageOptions.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => {
                  document.getElementById(`paket-${opt.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }}
                className="text-left px-5 py-4 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 hover:border-trustworthy-blue hover:bg-trustworthy-blue/5 transition-all"
              >
                <span className="font-medium text-gray-900 dark:text-white block mb-1">
                  {packagesData.find((p) => p.id === opt.id)?.emoji} {packagesData.find((p) => p.id === opt.id)?.name}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">{opt.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Why us */}
        <section className="py-16">
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-900 dark:text-white">
            {t.packages.whyUsTitle}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[t.packages.whyUs1, t.packages.whyUs2, t.packages.whyUs3, t.packages.whyUs4].map((text, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-gray-200 dark:border-white/10 text-center"
              >
                <span className="text-2xl text-trustworthy-blue mb-2 block">✓</span>
                <p className="text-gray-700 dark:text-gray-300 font-medium text-sm">{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Custom package CTA */}
        <div className="mt-16 bg-white dark:bg-white/5 backdrop-blur-xl rounded-2xl p-8 md:p-12 text-center border border-gray-200 dark:border-white/10">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            {t.services.customPackageTitle}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg max-w-xl mx-auto">
            {t.services.customPackageDesc}
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3 bg-trustworthy-blue text-white rounded-lg hover:bg-blue-700 transition-all font-semibold"
          >
            {t.services.contactCta}
          </Link>
        </div>
      </section>

      {/* Ödeme şirketleri – açıklama ile */}
      <PaymentPartnersSection lang={lang} variant="full" />

      <Footer />
    </main>
  );
}
