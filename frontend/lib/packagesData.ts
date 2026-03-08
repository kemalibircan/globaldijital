export type PackageId =
  | 'bronze'
  | 'silver'
  | 'gold'
  | 'platinum'
  | 'diamond'
  | 'diamondMobil'
  | 'elite';

export interface PackageItem {
  id: PackageId;
  emoji: string;
  name: string;
  price: string;
  period: string;
  tagline: string;
  features: string[];
  suitableFor: string[];
  note?: string;
  popular?: boolean;
}

export const packagesData: PackageItem[] = [
  {
    id: 'bronze',
    emoji: '🟤',
    name: 'BRONZE',
    price: '10.000 TL',
    period: 'tek seferlik',
    tagline: 'Temel Tanıtım Web Sitesi',
    features: [
      'HTML / CSS / JavaScript ile modern tasarım',
      'Tek sayfa veya mini web sitesi (3–5 bölüm)',
      'Mobil, tablet ve masaüstü uyumluluk',
      'WhatsApp iletişim butonu',
      'Google Harita entegrasyonu',
      'İletişim bilgileri ve sosyal medya bağlantıları',
    ],
    suitableFor: ['Küçük işletmeler', 'Yeni açılan kafe, ofis ve şahıs firmaları'],
    note: 'Domain ve hosting dahil değildir (isteğe bağlı eklenebilir)',
  },
  {
    id: 'silver',
    emoji: '🟢',
    name: 'SILVER',
    price: '19.900 TL',
    period: 'tek seferlik',
    tagline: 'Kurumsal Web Sitesi + Temel SEO',
    features: [
      '5–7 sayfalı kurumsal web sitesi (Anasayfa, Hakkımızda, Hizmetler, Galeri, İletişim vb.)',
      'Modern ve kullanıcı dostu arayüz',
      'Mobil uyumlu tasarım',
      'Google Harita ve Google Business bağlantısı',
      'Temel SEO kurulumu (sayfa başlıkları, site haritası, Google indeks)',
      '2 revize hakkı',
    ],
    suitableFor: ['Küçük ve orta ölçekli işletmeler', 'Dijitalde güven vermek isteyen markalar'],
    popular: true,
  },
  {
    id: 'gold',
    emoji: '🔵',
    name: 'GOLD',
    price: '29.900 TL',
    period: 'tek seferlik',
    tagline: 'Web Site Yenileme + Dönüşüm Odaklı SEO',
    features: [
      'Mevcut web sitesinin tamamen yenilenmesi',
      '8–12 sayfa modern yapı',
      'Daha hızlı ve kullanıcı dostu altyapı',
      'Bölgesel (Local) SEO optimizasyonu',
      'WhatsApp, arama ve form dönüşüm alanları',
      'Blog veya duyuru alanı',
      'SEO içerik planı + örnek içerik girişi',
      '1 ay teknik SEO takip ve raporlama',
    ],
    suitableFor: ['"Sitem var ama müşteri getirmiyor" diyenler', 'Bölgesinde Google\'da öne çıkmak isteyenler'],
  },
  {
    id: 'platinum',
    emoji: '🟣',
    name: 'PLATINUM',
    price: '49.900 TL',
    period: 'tek seferlik',
    tagline: 'SEO Odaklı Büyüme Paketi',
    features: [
      '12–20 sayfalı gelişmiş web sitesi',
      'Teknik SEO analiz ve düzenlemeler',
      'Anahtar kelime ve rakip analizi',
      '3 ay SEO yönetimi (aylık çalışmalar, performans raporları)',
      'Blog ve kampanya sayfaları',
      'Google hız ve performans optimizasyonu',
      'Yapılandırılmış veri (Schema) kurulumu',
    ],
    suitableFor: ['Rekabetin yoğun olduğu sektörler', 'Uzun vadeli dijital büyüme hedefleyen firmalar'],
  },
  {
    id: 'diamond',
    emoji: '🔴',
    name: 'DIAMOND',
    price: '89.900 TL',
    period: 'tek seferlik',
    tagline: 'Şubeli İşletmeler için Web & SEO Paketi',
    features: [
      'Şube bazlı web sitesi altyapısı',
      'Her şube için ayrı sayfa ve Google Harita',
      'Şube özel çalışma saatleri ve galeri',
      'QR Menü / online menü entegrasyonu',
      'Gelişmiş Local SEO (şehir ve ilçe bazlı)',
      'Rezervasyon veya talep formları',
      '6 ay SEO yönetimi',
      'Aylık detaylı raporlama',
    ],
    suitableFor: ['Kafe & restoran zincirleri', 'Şubelerinden ayrı ayrı müşteri çekmek isteyen markalar'],
  },
  {
    id: 'diamondMobil',
    emoji: '📱',
    name: 'DIAMOND MOBİL',
    price: '100.000 TL',
    period: 'tek seferlik',
    tagline: 'Kafeler & Restoranlar için Mobil Uygulama Paketi',
    features: [
      'iOS & Android mobil uygulama',
      'Hızlı ve sade kullanıcı arayüzü',
      'QR Menü sistemi',
      'Gelmeden sipariş oluşturma alanı',
      'Kullanıcı girişi ve hesap yönetimi',
      'Sipariş geçmişi',
      'QR kod ile puan biriktirme sistemi',
      'Basit ödül ve kampanya yapısı',
      'Yönetim paneli (menü, ürün, kampanya)',
      'App Store & Google Play yayın desteği',
      '2 ay teknik destek',
    ],
    suitableFor: ['Kafeler & restoranlar', 'QR menü ve mobil uygulama isteyen işletmeler'],
  },
  {
    id: 'elite',
    emoji: '💎',
    name: 'ELITE',
    price: '249.900 TL\'den başlayan',
    period: 'fiyatlandırma',
    tagline: 'Enterprise Seviye Mobil Uygulama (Starbucks Benzeri)',
    features: [
      'iOS & Android gelişmiş mobil uygulama',
      'Premium kullanıcı arayüzü',
      'Dark Mode & Light Mode desteği',
      'Gelişmiş menü ve sipariş sistemi',
      'Ürün özelleştirme (boyut, ekstra, not vb.)',
      'Gelmeden sipariş ve saat seçimi',
      'Online ödeme entegrasyonları',
      'Gelişmiş sadakat sistemi (puan, yıldız, seviye)',
      'Kişiye özel kampanyalar',
      'Push bildirim sistemi',
      'Çoklu dil desteği (TR & EN)',
      'Gelişmiş kullanıcı hesabı ve cüzdan yapısı',
      'Şube bazlı gelişmiş yönetim paneli',
      'Analitik ve detaylı raporlama',
      'App Store & Google Play yönetimi',
      '6 ay bakım, destek ve geliştirme havuzu',
    ],
    suitableFor: ['Zincir kahve markaları', 'Franchise sistemleri', 'Starbucks benzeri kullanıcı deneyimi isteyen markalar'],
  },
];

export const ekHizmetler = [
  { label: 'Aylık bakım & güvenlik', price: '2.000 – 7.500 TL' },
  { label: 'Sürekli SEO çalışması', price: '7.500 – 30.000 TL / ay' },
  { label: 'Google Ads yönetimi', price: '' },
  { label: 'Online sipariş & ödeme sistemleri', price: '' },
  { label: 'Çoklu dil ve özel entegrasyonlar', price: '' },
  { label: 'Özel yazılım geliştirme', price: '' },
];

// Karşılaştırma tablosu için: hangi pakette hangi özellik var
export const comparisonFeatures = [
  { key: 'sayfa', label: 'Sayfa sayısı / Yapı' },
  { key: 'seo', label: 'SEO' },
  { key: 'mobil', label: 'Mobil uyum' },
  { key: 'revize', label: 'Revize hakkı' },
  { key: 'blog', label: 'Blog / Duyuru' },
  { key: 'rapor', label: 'SEO raporlama' },
  { key: 'qrMenu', label: 'QR Menü' },
  { key: 'uygulama', label: 'Mobil uygulama' },
  { key: 'siparis', label: 'Sipariş / Form' },
  { key: 'destek', label: 'Teknik destek' },
];

export const comparisonMatrix: Record<PackageId, Record<string, string>> = {
  bronze: {
    sayfa: '3–5 bölüm',
    seo: '—',
    mobil: '✓',
    revize: '—',
    blog: '—',
    rapor: '—',
    qrMenu: '—',
    uygulama: '—',
    siparis: 'İletişim',
    destek: 'İsteğe bağlı',
  },
  silver: {
    sayfa: '5–7 sayfa',
    seo: 'Temel',
    mobil: '✓',
    revize: '2',
    blog: '—',
    rapor: '—',
    qrMenu: '—',
    uygulama: '—',
    siparis: 'Form',
    destek: 'Teslim sonrası',
  },
  gold: {
    sayfa: '8–12 sayfa',
    seo: 'Local SEO',
    mobil: '✓',
    revize: 'Dahil',
    blog: '✓',
    rapor: '1 ay',
    qrMenu: '—',
    uygulama: '—',
    siparis: 'Form + WhatsApp',
    destek: '1 ay SEO takip',
  },
  platinum: {
    sayfa: '12–20 sayfa',
    seo: '3 ay yönetim',
    mobil: '✓',
    revize: 'Dahil',
    blog: '✓',
    rapor: '3 ay',
    qrMenu: '—',
    uygulama: '—',
    siparis: 'Form',
    destek: '3 ay',
  },
  diamond: {
    sayfa: 'Şube bazlı',
    seo: '6 ay yönetim',
    mobil: '✓',
    revize: 'Dahil',
    blog: '—',
    rapor: '6 ay',
    qrMenu: '✓',
    uygulama: '—',
    siparis: 'Rezervasyon',
    destek: '6 ay',
  },
  diamondMobil: {
    sayfa: '—',
    seo: '—',
    mobil: 'App',
    revize: 'Dahil',
    blog: '—',
    rapor: '—',
    qrMenu: '✓',
    uygulama: 'iOS & Android',
    siparis: 'Sipariş',
    destek: '2 ay',
  },
  elite: {
    sayfa: '—',
    seo: '—',
    mobil: 'App',
    revize: 'Dahil',
    blog: '—',
    rapor: 'Detaylı',
    qrMenu: '✓',
    uygulama: 'Gelişmiş',
    siparis: 'Tam entegre',
    destek: '6 ay',
  },
};
