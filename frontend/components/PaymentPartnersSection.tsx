'use client';

import { useState } from 'react';
import { CreditCard, Shield } from 'lucide-react';
import { paymentProviders, type PaymentProvider } from '@/lib/paymentProviders';
import type { Language } from '@/lib/translations';
import { translations } from '@/lib/translations';

function PaymentLogo({ provider }: { provider: PaymentProvider }) {
  const [failed, setFailed] = useState(false);
  return (
    <a
      href={provider.website ?? '#'}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center h-14 w-28 md:w-32 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 p-3 grayscale hover:grayscale-0 opacity-80 hover:opacity-100 transition-all duration-300 hover:border-trustworthy-blue/50 hover:shadow-lg"
      title={provider.name}
    >
      {!failed ? (
        <img
          src={provider.logo}
          alt={provider.name}
          className="h-8 w-auto max-w-full object-contain"
          loading="lazy"
          onError={() => setFailed(true)}
        />
      ) : (
        <span className="text-sm font-semibold text-gray-600 dark:text-gray-400 truncate text-center">
          {provider.name}
        </span>
      )}
    </a>
  );
}

interface PaymentPartnersSectionProps {
  lang: Language;
  /** Hizmetler sayfasında açıklama ile tam blok göster */
  variant?: 'strip' | 'full';
}

export default function PaymentPartnersSection({ lang, variant = 'strip' }: PaymentPartnersSectionProps) {
  const t = translations[lang];
  const paymentT = t.paymentProviders;

  if (variant === 'full') {
    return (
      <section className="relative py-16 md:py-20 z-20 border-t border-gray-200 dark:border-white/10 bg-gradient-to-b from-gray-50/80 to-transparent dark:from-white/5 dark:to-transparent">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-trustworthy-blue/10 dark:bg-trustworthy-blue/20 mb-6">
              <CreditCard className="w-7 h-7 text-trustworthy-blue" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
              {paymentT.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-2">
              {paymentT.subtitle}
            </p>
            <p className="text-gray-500 dark:text-gray-500 text-base leading-relaxed">
              {paymentT.description}
            </p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
            {paymentProviders.map((provider) => (
              <PaymentLogo key={provider.name} provider={provider} />
            ))}
          </div>
          <div className="flex items-center justify-center gap-2 mt-6 text-sm text-gray-500 dark:text-gray-500">
            <Shield className="w-4 h-4 text-trustworthy-blue flex-shrink-0" />
            <span>SSL ve PCI DSS uyumlu güvenli ödeme altyapısı</span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-12 z-20 border-y border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-white/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
            {paymentT.title}
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm max-w-xl mx-auto">
            {paymentT.subtitle}
          </p>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8">
          {paymentProviders.map((provider) => (
            <PaymentLogo key={provider.name} provider={provider} />
          ))}
        </div>
      </div>
    </section>
  );
}
