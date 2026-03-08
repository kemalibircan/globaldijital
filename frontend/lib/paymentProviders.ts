/**
 * Ödeme altyapısı / sanal POS sağlayıcıları.
 * E-ticaret ve web projelerinde entegre edebildiğimiz ödeme çözümleri.
 */

export interface PaymentProvider {
  name: string;
  /** Logo URL (CDN veya resmi site) veya yerel path: /payment-logos/xxx.png */
  logo: string;
  website?: string;
}

export const paymentProviders: PaymentProvider[] = [
  {
    name: 'PayTR',
    logo: 'https://logo.clearbit.com/paytr.com',
    website: 'https://www.paytr.com',
  },
  {
    name: 'iyzico',
    logo: 'https://logo.clearbit.com/iyzico.com',
    website: 'https://www.iyzico.com',
  },
  {
    name: 'Stripe',
    logo: 'https://cdn.simpleicons.org/stripe/635BFF',
    website: 'https://stripe.com',
  },
  {
    name: 'Param',
    logo: 'https://logo.clearbit.com/param.com.tr',
    website: 'https://www.param.com.tr',
  },
  {
    name: 'Paymes',
    logo: 'https://logo.clearbit.com/paymes.com',
    website: 'https://paymes.com',
  },
];
