'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Globe, Smartphone, Search, TrendingUp } from 'lucide-react';
import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TeamSlider from '@/components/TeamSlider';
import ChatBot from '@/components/ChatBot';
import ChatSection from '@/components/ChatSection';
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

function TrustedBrandLogo({ brand }: { brand: TrustedBrand }) {
  const [failed, setFailed] = useState(false);
  return (
    <a
      href={brand.website ?? '#'}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center h-12 w-28 md:w-32 grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300"
      title={brand.name}
    >
      {!failed ? (
        <img
          src={brand.logo}
          alt={brand.name}
          className="h-8 w-auto max-w-full object-contain"
          loading="lazy"
          onError={() => setFailed(true)}
        />
      ) : (
        <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 truncate max-w-[100px] text-center">
          {brand.name}
        </span>
      )}
    </a>
  );
}

// Lazy load heavy components
const HexagonBackground = dynamic(() => import('@/components/HexagonBackground'), {
  ssr: false,
});

const TYPING_DELAY_MS = 35;
const TYPING_DELAY_DESCRIPTION_MS = 10;
const DELAY_BETWEEN_LINES_MS = 400;

function useTypewriter(lines: string[]) {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const delayMs = lineIndex === 2 ? TYPING_DELAY_DESCRIPTION_MS : TYPING_DELAY_MS;

  useEffect(() => {
    if (lines.length === 0) return;
    const currentLine = lines[lineIndex] ?? '';
    if (charIndex < currentLine.length) {
      const t = setTimeout(() => setCharIndex((c) => c + 1), delayMs);
      return () => clearTimeout(t);
    }
    if (lineIndex < lines.length - 1) {
      const t = setTimeout(() => {
        setLineIndex((l) => l + 1);
        setCharIndex(0);
      }, DELAY_BETWEEN_LINES_MS);
      return () => clearTimeout(t);
    }
    setIsComplete(true);
  }, [lines, lineIndex, charIndex, delayMs]);

  const displayedLines = lines.map((line, i) => {
    if (i < lineIndex) return line;
    if (i === lineIndex) return (line ?? '').slice(0, charIndex);
    return '';
  });
  const showCursor = !isComplete;
  return { displayedLines, showCursor, isComplete, lineIndex };
}

export default function Home() {
  const [lang, setLang] = useState<Language>('tr');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedLang = (Cookies.get('locale') || 'tr') as Language;
    setLang(savedLang);
    setMounted(true);
  }, []);

  const t = translations[lang];
  const heroLines = [t.hero.title, t.hero.subtitle, t.hero.description];
  const { displayedLines, showCursor, lineIndex } = useTypewriter(heroLines);

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white overflow-hidden transition-colors duration-300">
      {/* Hexagon Background */}
      <HexagonBackground />

      <Header />

      {/* Hero Section */}
      <section className="relative container mx-auto px-4 py-32 text-center z-20">
        <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight min-h-[4.5rem] md:min-h-[5rem]">
          <span className="text-trustworthy-blue">
            {displayedLines[0]}
            {showCursor && lineIndex === 0 && <span className="animate-pulse">|</span>}
          </span>
          <br />
          <span className="text-gray-900 dark:text-white">
            {displayedLines[1]}
            {showCursor && lineIndex === 1 && <span className="animate-pulse">|</span>}
          </span>
        </h1>

        <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed min-h-[6rem]">
          {displayedLines[2]}
          {showCursor && lineIndex === 2 && <span className="animate-pulse">|</span>}
        </p>

        <div className="flex gap-6 justify-center flex-wrap">
          <Link
            href="/services"
            className="group px-10 py-4 bg-trustworthy-blue rounded-xl hover:bg-blue-700 transition-all shadow-2xl hover:shadow-blue-500/50 flex items-center gap-3 font-semibold text-lg text-white"
          >
            {t.hero.viewServices}
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/contact"
            className="px-10 py-4 bg-gray-200 dark:bg-white text-gray-900 dark:text-black rounded-xl hover:bg-gray-300 dark:hover:bg-gray-100 transition-all font-semibold text-lg"
          >
            {t.hero.getStarted}
          </Link>
        </div>
      </section>

      {/* Trusted Brands / Güvenilirlik */}
      <section className="relative py-16 z-20 border-y border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-white/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
              {t.trusted?.title ?? 'Dünya devleriyle aynı teknolojiler'}
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm max-w-xl mx-auto">
              {t.trusted?.subtitle ?? 'Güvenilir altyapı ve ekosistemlerle çalışıyoruz'}
            </p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16">
            {trustedBrands.map((brand) => (
              <TrustedBrandLogo key={brand.name} brand={brand} />
            ))}
          </div>
        </div>
      </section>

      {/* AI Chat Section */}
      <ChatSection />

      {/* Floating Services Cards */}
      <section className="relative py-20 z-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">
            {t.services.title}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Globe, title: t.services.website.title, description: t.services.website.description },
              { icon: Smartphone, title: t.services.mobile.title, description: t.services.mobile.description },
              { icon: Search, title: t.services.seo.title, description: t.services.seo.description },
              { icon: TrendingUp, title: t.services.marketing.title, description: t.services.marketing.description },
            ].map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="group relative bg-gray-50 dark:bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-gray-200 dark:border-white/10 hover:border-trustworthy-blue hover:bg-gray-100 dark:hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20"
                >
                  <div className="w-16 h-16 bg-trustworthy-blue rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{service.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{service.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How We Work Section */}
      <section className="relative py-20 z-20 bg-gray-50 dark:bg-transparent">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              {t.howWeWork.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              {t.howWeWork.subtitle}
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { num: '01', title: t.howWeWork.step1.title, desc: t.howWeWork.step1.description },
              { num: '02', title: t.howWeWork.step2.title, desc: t.howWeWork.step2.description },
              { num: '03', title: t.howWeWork.step3.title, desc: t.howWeWork.step3.description },
              { num: '04', title: t.howWeWork.step4.title, desc: t.howWeWork.step4.description },
            ].map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white dark:bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-gray-200 dark:border-white/10 hover:border-trustworthy-blue transition-all h-full">
                  <div className="text-6xl font-bold text-trustworthy-blue opacity-20 mb-4">
                    {step.num}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {step.desc}
                  </p>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-trustworthy-blue"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team / Kurumsal Ekip Slider */}
      <section className="relative py-20 z-20" id="ekibimiz">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              {t.team?.title ?? 'Ekibimiz'}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              {t.team?.subtitle ?? 'Profesyonel ekibimizle tanışın'}
            </p>
          </div>
          <TeamSlider />
          <div className="max-w-2xl mx-auto mt-8 text-center">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              {t.team?.description ?? 'Deneyimli kadromuzla işletmenizin dijital dönüşümünde yanınızdayız.'}
            </p>
          </div>
        </div>
      </section>

      {/* Project Timeline Section */}
      <section className="relative py-20 z-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              {t.timeline.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              {t.timeline.subtitle}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: t.timeline.website.title, duration: t.timeline.website.duration, desc: t.timeline.website.description },
              { title: t.timeline.mobile.title, duration: t.timeline.mobile.duration, desc: t.timeline.mobile.description },
              { title: t.timeline.seo.title, duration: t.timeline.seo.duration, desc: t.timeline.seo.description },
              { title: t.timeline.marketing.title, duration: t.timeline.marketing.duration, desc: t.timeline.marketing.description },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white dark:bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-gray-200 dark:border-white/10 hover:scale-105 transition-all"
              >
                <div className="text-trustworthy-blue font-bold text-3xl mb-2">
                  {item.duration}
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Packages Section */}
      <section className="relative py-20 z-20 bg-gray-50 dark:bg-transparent" id="paketler">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              {t.packages.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              {t.packages.subtitle}
            </p>
          </div>
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
                    En Popüler
                  </div>
                )}
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl" aria-hidden>{pkg.emoji}</span>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {pkg.name}
                  </h3>
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
                  {pkg.features.slice(0, 5).map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-trustworthy-blue mt-0.5">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                  {pkg.features.length > 5 && (
                    <li>
                      <Link
                        href="/services#paketler"
                        className="text-trustworthy-blue dark:text-blue-300 hover:underline font-medium"
                      >
                        +{pkg.features.length - 5} madde daha →
                      </Link>
                    </li>
                  )}
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
                  Teklif Al
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
        </div>
      </section>

      {/* Package Comparison Table */}
      <section className="relative py-20 z-20">
        <div className="container mx-auto px-4 overflow-x-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              {t.packages.compareTitle}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              {t.packages.compareSubtitle}
            </p>
          </div>
          <div className="rounded-2xl border border-gray-200 dark:border-white/10 overflow-hidden bg-white dark:bg-white/5 backdrop-blur-xl">
            <table className="w-full min-w-[800px] text-left">
              <thead>
                <tr className="border-b border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5">
                  <th className="px-4 py-4 font-semibold text-gray-900 dark:text-white w-48">Özellik</th>
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
        </div>
      </section>

      {/* Hangi Paket Bana Uygun? */}
      <section className="relative py-20 z-20 bg-gray-50 dark:bg-transparent" id="hangi-paket">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              {t.packages.whichPackageTitle}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              {t.packages.whichPackageSubtitle}
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
              {[
                { id: 'bronze' as PackageId, label: 'Küçük işletme / Yeni açılan kafe, ofis' },
                { id: 'silver' as PackageId, label: 'Kurumsal görünmek, güven vermek istiyorum' },
                { id: 'gold' as PackageId, label: 'Sitem var ama müşteri getirmiyor' },
                { id: 'platinum' as PackageId, label: 'Rekabetçi sektör, uzun vadeli büyüme' },
                { id: 'diamond' as PackageId, label: 'Şubeli işletme (10+ şube)' },
                { id: 'diamondMobil' as PackageId, label: 'Kafe & restoran – QR menü / mobil uygulama' },
                { id: 'elite' as PackageId, label: 'Zincir / Enterprise (Starbucks benzeri)' },
              ].map((opt) => (
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
            <p className="text-center text-gray-500 dark:text-gray-500 text-sm">
              Önerilen paket kartına tıklayın, sayfada ilgili pakete kaydırılacaksınız.
            </p>
          </div>
        </div>
      </section>

      {/* Neden Ben? / Why Us */}
      <section className="relative py-20 z-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            {t.packages.whyUsTitle}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              t.packages.whyUs1,
              t.packages.whyUs2,
              t.packages.whyUs3,
              t.packages.whyUs4,
            ].map((text, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-gray-200 dark:border-white/10 text-center"
              >
                <span className="text-2xl text-trustworthy-blue mb-2 block">✓</span>
                <p className="text-gray-700 dark:text-gray-300 font-medium">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-20 z-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              {t.faq.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              {t.faq.subtitle}
            </p>
          </div>
          <div className="max-w-4xl mx-auto space-y-4">
            {[t.faq.q1, t.faq.q2, t.faq.q3, t.faq.q4, t.faq.q5, t.faq.q6].map((faq, index) => (
              <details
                key={index}
                className="group bg-white dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-white/10 overflow-hidden"
              >
                <summary className="cursor-pointer p-6 font-semibold text-lg text-gray-900 dark:text-white hover:text-trustworthy-blue transition-colors flex justify-between items-center">
                  {faq.question}
                  <svg
                    className="w-6 h-6 transform group-open:rotate-180 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-gray-600 dark:text-gray-400 leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative container mx-auto px-4 py-20 z-20">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: t.features.multilingual.title, description: t.features.multilingual.description },
            { title: t.features.secure.title, description: t.features.secure.description },
            { title: t.features.payment.title, description: t.features.payment.description },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white dark:bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-gray-200 dark:border-white/10 hover:border-trustworthy-blue transition-all"
            >
              <h3 className="text-2xl font-bold mb-4 text-trustworthy-blue">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Ödeme şirketleri / Payment partners */}
      <PaymentPartnersSection lang={lang} variant="strip" />

      <Footer />

      {/* ChatBot */}
      <ChatBot />
    </main>
  );
}
