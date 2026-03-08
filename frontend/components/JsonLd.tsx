import { getBaseUrl } from '@/lib/siteConfig';
import { contactInfo } from '@/lib/contactInfo';

/** Organization + WebSite JSON-LD - layout'ta tek sefer render edilir */
export default function JsonLd() {
  const baseUrl = getBaseUrl();

  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'GlobalDijital',
    alternateName: 'Global Dijital',
    url: baseUrl,
    logo: `${baseUrl}/logos/only-logo.png`,
    description:
      "KOBİ'lere web sitesi, mobil uygulama, SEO ve dijital pazarlama çözümleri sunan profesyonel firma.",
    email: contactInfo.email,
    telephone: contactInfo.phoneRaw,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'TR',
      addressRegion: contactInfo.address,
    },
    sameAs: [],
  };

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'GlobalDijital',
    url: baseUrl,
    description:
      "Web sitesi, mobil uygulama, SEO ve dijital pazarlama. Kurumsal site, e-ticaret, React, Next.js, React Native. Turn-Key Digital Solutions.",
    publisher: { '@type': 'Organization', name: 'GlobalDijital' },
    inLanguage: ['tr', 'en', 'de', 'ar'],
  };

  const combined = [organization, website];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(combined) }}
    />
  );
}
