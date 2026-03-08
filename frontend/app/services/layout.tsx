import type { Metadata } from 'next';
import { getBaseUrl } from '@/lib/siteConfig';

const baseUrl = getBaseUrl();

export const metadata: Metadata = {
  title: 'Hizmetler ve Paketler',
  description:
    "Web sitesi paketleri: Bronze 10.000 TL, Silver 19.900 TL, Gold 29.900 TL, Platinum 49.900 TL, Diamond 89.900 TL. Mobil uygulama: Diamond Mobil 100.000 TL, Elite 249.900 TL'dan. SEO, QR menü, kurumsal site.",
  keywords: ['web sitesi fiyat', 'mobil uygulama fiyat', 'SEO paketi', 'kurumsal site', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Elite'],
  openGraph: {
    title: 'Hizmetler ve Paketler | GlobalDijital',
    description: 'Web ve mobil paket fiyatları. Bronze\'dan Elite\'e kurumsal site, SEO ve uygulama çözümleri.',
    url: `${baseUrl}/services`,
  },
  alternates: { canonical: `${baseUrl}/services` },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
