import { getBaseUrl } from '@/lib/siteConfig';

export default function robots() {
  const baseUrl = getBaseUrl();
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/dashboard', '/api'] },
      { userAgent: 'Googlebot', allow: '/', disallow: ['/dashboard', '/api'] },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
