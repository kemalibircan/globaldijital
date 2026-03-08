/**
 * Güvenilirlik için gösterilen marka / teknoloji logoları.
 * Logo kaynağı: Simple Icons CDN (cdn.simpleicons.org) – açık kaynak marka ikonları.
 * Kendi logolarınızı public/partners/ klasörüne ekleyip logo alanında /partners/xxx.png kullanabilirsiniz.
 */

export interface TrustedBrand {
  name: string;
  /** Harici URL (Simple Icons CDN) veya yerel path: /partners/xxx.png */
  logo: string;
  website?: string;
}

export const trustedBrands: TrustedBrand[] = [
  { name: 'Google', logo: 'https://cdn.simpleicons.org/google/4285F4', website: 'https://google.com' },
  { name: 'NVIDIA', logo: 'https://cdn.simpleicons.org/nvidia/76B900', website: 'https://nvidia.com' },
  { name: 'Meta', logo: 'https://cdn.simpleicons.org/meta/0668E1', website: 'https://meta.com' },
  { name: 'Stack Overflow', logo: 'https://cdn.simpleicons.org/stackoverflow/F58025', website: 'https://stackoverflow.com' },
  { name: 'Microsoft', logo: 'https://cdn.simpleicons.org/microsoft/5E5E5E', website: 'https://microsoft.com' },
  { name: 'Amazon', logo: 'https://cdn.simpleicons.org/amazon/FF9900', website: 'https://amazon.com' },
  { name: 'Vercel', logo: 'https://cdn.simpleicons.org/vercel/000000', website: 'https://vercel.com' },
  { name: 'Stripe', logo: 'https://cdn.simpleicons.org/stripe/635BFF', website: 'https://stripe.com' },
  { name: 'Slack', logo: 'https://cdn.simpleicons.org/slack/4A154B', website: 'https://slack.com' },
  { name: 'Spotify', logo: 'https://cdn.simpleicons.org/spotify/1DB954', website: 'https://spotify.com' },
  { name: 'GitHub', logo: 'https://cdn.simpleicons.org/github/181717', website: 'https://github.com' },
  { name: 'React', logo: 'https://cdn.simpleicons.org/react/61DAFB', website: 'https://react.dev' },
];
