import type { Metadata } from 'next';
import { getBaseUrl } from '@/lib/siteConfig';

const baseUrl = getBaseUrl();

export const metadata: Metadata = {
  title: 'Hakkımızda',
  description:
    "GlobalDijital ekibi ve hikayemiz. 2020'den beri KOBİ'lerin web ve mobil dijital dönüşümünde yanınızdayız. React, Next.js, React Native ile profesyonel çözümler.",
  openGraph: {
    title: 'Hakkımızda | GlobalDijital',
    description: "GlobalDijital ekibi ve hikayemiz. Web, mobil, SEO ve dijital pazarlama çözümleri.",
    url: `${baseUrl}/about`,
  },
  alternates: { canonical: `${baseUrl}/about` },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
