import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import JsonLd from '@/components/JsonLd';
import { getBaseUrl } from '@/lib/siteConfig';

const inter = Inter({ subsets: ['latin'] });

const baseUrl = getBaseUrl();
const siteName = 'GlobalDijital';
const titleDefault = `${siteName} - Turn-Key Digital Solutions`;
const descriptionDefault =
  "KOBİ'lere web sitesi, mobil uygulama, SEO ve dijital pazarlama çözümleri. Kurumsal site, e-ticaret, React, Next.js, React Native. 0534 612 46 42.";

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: titleDefault,
    template: `%s | ${siteName}`,
  },
  description: descriptionDefault,
  keywords: [
    'web sitesi',
    'mobil uygulama',
    'SEO',
    'dijital pazarlama',
    'kurumsal site',
    'e-ticaret',
    'React',
    'Next.js',
    'React Native',
    'KOBİ',
    'globaldijital',
    'Adana',
    'Türkiye',
  ],
  authors: [{ name: siteName, url: baseUrl }],
  creator: siteName,
  publisher: siteName,
  formatDetection: { email: false, telephone: false },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: baseUrl,
    siteName,
    title: titleDefault,
    description: descriptionDefault,
    images: [
      {
        url: '/logos/light-mode-logo.png',
        width: 1200,
        height: 630,
        alt: siteName,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: titleDefault,
    description: descriptionDefault,
    images: ['/logos/light-mode-logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: '/logos/only-logo.png',
    apple: '/logos/only-logo.png',
  },
  alternates: {
    canonical: baseUrl,
  },
  // Google Search Console doğrulama: verilen kodu buraya yapıştırın, doğruladıktan sonra kaldırabilirsiniz
  // verification: { google: 'BURAYA_GOOGLE_VERIFICATION_KODU' },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <JsonLd />
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
