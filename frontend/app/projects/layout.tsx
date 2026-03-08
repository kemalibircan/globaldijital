import type { Metadata } from 'next';
import { getBaseUrl } from '@/lib/siteConfig';

const baseUrl = getBaseUrl();

export const metadata: Metadata = {
  title: 'Projelerimiz',
  description:
    "GlobalDijital referans projeleri: Pink Tour, Çukurova Profil PVC, HukukChat, LLMWizard, Cargo, Otostop. Web ve mobil uygulama portfolyosu.",
  openGraph: {
    title: 'Projelerimiz | GlobalDijital',
    description: 'Web ve mobil uygulama referanslarımız. Kurumsal site ve React Native projeleri.',
    url: `${baseUrl}/projects`,
  },
  alternates: { canonical: `${baseUrl}/projects` },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
