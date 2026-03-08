/**
 * SEO ve paylaşım için site kök URL ve sabitler.
 * .env.local'da NEXT_PUBLIC_SITE_URL=https://globaldijital.com tanımlayın.
 */

export const siteName = 'GlobalDijital';
export const siteTagline = 'Turn-Key Digital Solutions';
export const defaultDescription =
  'KOBİ\'lere web sitesi, mobil uygulama, SEO ve dijital pazarlama çözümleri. Kurumsal site, e-ticaret, React, Next.js, React Native. İletişim: 0534 612 46 42.';

/** Sunucu/build ortamında kullanın. Tarayıcıda window.location.origin döner. */
export function getBaseUrl(): string {
  if (typeof window !== 'undefined') return window.location.origin;
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://globaldijital.com')
  );
}

/** Tam URL üret (path / ile başlamalı) */
export function absoluteUrl(path: string): string {
  const base = getBaseUrl();
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${base.replace(/\/$/, '')}${p}`;
}

/** Varsayılan OG/Twitter görseli (logo veya özel görsel) */
export const defaultOgImagePath = '/logos/light-mode-logo.png';
