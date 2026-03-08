import type { Metadata } from 'next';
import { getBaseUrl } from '@/lib/siteConfig';

const baseUrl = getBaseUrl();

export const metadata: Metadata = {
  title: 'İletişim',
  description:
    "GlobalDijital ile iletişime geçin. Web sitesi, mobil uygulama ve SEO teklifi için formu doldurun veya 0534 612 46 42 numaralı telefondan arayın. E-posta: alikemal.bircan@globaldijital.com",
  openGraph: {
    title: 'İletişim | GlobalDijital',
    description: 'Teklif ve bilgi için bize ulaşın. Form, e-posta ve telefon.',
    url: `${baseUrl}/contact`,
  },
  alternates: { canonical: `${baseUrl}/contact` },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
