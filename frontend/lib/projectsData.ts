/**
 * Projelerimiz sayfası ve detay sayfası için proje verisi.
 * Görseller: public/projects/web/ (yatay) ve public/projects/mobile/ (dikey) klasörlerine ekleyin.
 */

export type ProjectType = 'web' | 'mobile';

export interface Project {
  id: string;
  slug: string;
  type: ProjectType;
  title: string;
  titleEn?: string;
  shortDescription: string;
  description: string;
  /** Görsel yolları (public altından): /projects/web/xxx.jpg */
  images: string[];
  /** Teknolojiler: React, Next.js, Node.js vb. */
  tech?: string[];
  /** Müşteri / sektör */
  client?: string;
  /** Yıl */
  year?: string;
  /** Sadece mobil: App Store URL */
  appStoreUrl?: string;
  /** Sadece mobil: Google Play URL */
  playStoreUrl?: string;
  /** Web: canlı site URL */
  liveUrl?: string;
  /** GitHub / kaynak kodu URL */
  githubUrl?: string;
}

/** Web projeleri: yatay (16:9) görseller. Görselleri public/projects/web/ içine koyun. */
export const webProjects: Project[] = [
  {
    id: 'web-1',
    slug: 'pink-tour',
    type: 'web',
    title: 'Pink Tour Travel Agency',
    shortDescription: 'Seyahat acentesi kurumsal web sitesi – IATA sertifikalı uluslararası acenta.',
    description:
      'Pink Tour Seyahat Acentesi için kurumsal web sitesi geliştirdik. Seyahat acentemiz Adana\'da 3, İstanbul\'da 1 olmak üzere toplam 4 şubesi ile 1995 yılından bu yana faaliyet gösteren IATA sertifikalı uluslararası acentadır.\n\nBaşta THY olmak üzere tüm havayolları iç ve dış hat uçak biletleri düzenlenmektedir. Seyahat organizasyonlarının başında bayi toplantı organizasyonları, Uzak Doğu\'dan Avrupa\'ya, Amerika\'dan Afrika\'ya geziler; yurt içinde Kapadokya, Karadeniz, Abant, Gaziantep ve Doğu Anadolu gezileri; Umre-Hac organizasyonları ile Adana şubeleri organizesiyle Halep, Şam, Ürdün, Beyrut gezileri sunulmaktadır.\n\nVize ihtiyaçlarında Avrupa Schengen, Rusya ve Ukrayna vizeleri için danışmanlık ve hızlı işlem imkânı sağlanmaktadır. Site üzerinden kurumsal bilgiler, tatil bölgeleri, haftanın fırsatları ve iletişim sayfaları yer alır.',
    images: [
      '/projects/web/pink1.png',
      '/projects/web/pink2.png',
      '/projects/web/pink3.png',
      '/projects/web/pink4.png',
    ],
    tech: ['Web', 'Kurumsal Site', 'Responsive'],
    client: 'Pink Tour Travel Agency',
    year: '2024',
    liveUrl: 'https://www.pinktour.com.tr/sayfa/1/kurumsal',
  },
  {
    id: 'web-2',
    slug: 'cukurova-profil-pvc',
    type: 'web',
    title: 'Çukurova Profil PVC',
    shortDescription: 'Yapı sektöründe PVC profil üreticisi kurumsal web sitesi.',
    description:
      'Çukurova Profil PVC için kurumsal web sitesi geliştirdik. Firma 1996 yılında İbo Osman Caddesinde bir PVC atölyesi olarak mütevazı bir başlangıç yaptı. O günden bu yana kaliteyi ve müşteri memnuniyetini ön planda tutarak büyümeyi hedefledi. 2015 yılında modern ve geniş kapsamlı yeni fabrikaya taşınan tesis, daha verimli üretim ve geniş ürün yelpazesi sunmaktadır.\n\nKaliteli ve dayanıklı ürünler, müşteri memnuniyeti odaklı hizmet ve estetik-ekonomik çözümler sunulmaktadır. Akdeniz Bölgesi\'nde 60\'tan fazla bayi ile geniş ağa sahip firma; Highline, Klasline, Vizyonline, Sunline gibi PVC sistem katalogları, üretim, kalite belgeleri ve iletişim sayfaları ile kurumsal kimliğini web üzerinden yansıtmaktadır.',
    images: [
      '/projects/web/pvc1.png',
      '/projects/web/pvc2.png',
      '/projects/web/pvc3.png',
    ],
    tech: ['Web', 'Kurumsal Site', 'Responsive'],
    client: 'Çukurova Profil PVC',
    year: '2024',
    liveUrl: 'https://www.cukurovaprofilpvc.com.tr/about',
  },
];

/** Mobil projeleri: dikey (9:16) görseller. Görselleri public/projects/mobile/ içine koyun. */
export const mobileProjects: Project[] = [
  {
    id: 'mobile-6',
    slug: 'hukuk-chat',
    type: 'mobile',
    title: 'HukukChat',
    shortDescription: 'Hukuki konularda yapay zeka destekli sohbet ve bilgi erişimi sunan uygulama.',
    description:
      'HukukChat, EvolveChat bünyesinde geliştirilen; kullanıcıların hukuki konularda bilgi alabildiği ve yapay zeka destekli sohbet yapabildiği çapraz platform bir mobil ve web uygulamasıdır. Hukuki terimler, süreçler ve genel hukuk soruları için kullanıcı dostu bir arayüz sunar.\n\nReact Native ile mobil uygulama, ReactJS ve Tailwind CSS ile responsive web arayüzü geliştirilmiştir. Redux, AsyncStorage ve REST API (Axios / Fetch) entegrasyonu ile veri yönetimi ve backend bağlantısı sağlanır. UI/UX geliştirmesi kullanıcı odaklı ve sezgisel olacak şekilde yapılmıştır.',
    images: [
      '/projects/mobile/hukuk1.png',
      '/projects/mobile/hukuk2.png',
      '/projects/mobile/hukuk3.png',
      '/projects/mobile/hukuk4.png',
      '/projects/mobile/hukuk5.png',
      '/projects/mobile/hukuk6.png',
      '/projects/mobile/hukuk7.png',
      '/projects/mobile/hukuk8.png',
      '/projects/mobile/hukuk9.png',
    ],
    tech: ['React Native', 'React', 'Redux', 'Tailwind CSS', 'AsyncStorage', 'Axios', 'Fetch API'],
    client: 'EvolveChat',
    year: '2024',
    appStoreUrl: 'https://apps.apple.com/tr/app/hukukchat/id6553963145?l=tr',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.hukukchat',
  },
  {
    id: 'mobile-1',
    slug: 'cargo-uygulamasi',
    type: 'mobile',
    title: 'Cargo (Cargom)',
    shortDescription: 'Kullanıcıların kargo göndermek için şoförlerle eşleştiği platform.',
    description:
      'Cargo, kullanıcıların kargo göndermek istedikleri yükü platforma girip kamyon şoförleriyle eşleşmesini sağlayan çapraz platform bir mobil uygulamadır. Uygulama, kullanıcıların yük detaylarını girebilmesine, şoförlerin en uygun rota ile teslimat yapabilmesine ve tarafların canlı mesajlaşma ile iletişim kurmasına olanak tanır.\n\nGoogle Maps ve Google API\'lerinden alınan verilerle geliştirilen bir algoritma sayesinde şoförler kargo takibi için en iyi rotayı bulabilir. Kullanıcı kaydından itibaren SMTP tabanlı otomatik e-posta sistemi ile doğrulama, hoş geldin ve bilgilendirme e-postaları gönderilerek kullanıcı etkileşimi artırılır. Canlı sohbet için Firebase kullanılmaktadır.',
    images: [
      '/projects/mobile/cargo1.png',
      '/projects/mobile/cargo2.png',
      '/projects/mobile/cargo3.png',
      '/projects/mobile/cargo4.png',
      '/projects/mobile/cargo5.png',
      '/projects/mobile/cargo6.png',
      '/projects/mobile/cargo7.png',
      '/projects/mobile/cargo8.png',
      '/projects/mobile/cargo9.png',
    ],
    tech: ['React Native', 'Node.js', 'Express.js', 'PostgreSQL', 'Firebase', 'Google Maps API', 'react-native-reanimated', 'Redux'],
    client: 'Kişisel Proje',
    year: '2024',
    githubUrl: 'https://github.com/kemalibircan/cargom',
  },
  {
    id: 'mobile-2',
    slug: 'otostop-uygulamasi',
    type: 'mobile',
    title: 'Otostop (Araç Paylaşımı)',
    shortDescription: 'İnsanların kendi araçlarını paylaşımlı kullanabildiği araç paylaşım uygulaması.',
    description:
      'Otostop, araç sahiplerinin araçlarını paylaşımlı kullanım için sunabildiği ve diğer kullanıcıların bu araçlara katılabildiği bir mobil uygulamadır. Uygulama sayesinde yolculuk paylaşımı ve ortak ulaşım imkânı sağlanır.\n\nRota ve konum takibi için Google Maps ve Google Location API kullanılır. Gerçek zamanlı güncellemeler ve bildirimler için WebSocket entegrasyonu vardır. Dosya ve medya depolama için AWS Bucket yapılandırması kullanılmaktadır. State yönetimi Redux ile yapılır.',
    images: [
      '/projects/mobile/ride1.png',
      '/projects/mobile/ride2.png',
      '/projects/mobile/ride3.png',
      '/projects/mobile/ride4.png',
      '/projects/mobile/ride5.png',
      '/projects/mobile/ride6.png',
      '/projects/mobile/ride7.png',
      '/projects/mobile/ride8.png',
      '/projects/mobile/ride9.png',
    ],
    tech: ['React Native', 'Node.js', 'Express.js', 'PostgreSQL', 'Redux', 'Google Maps API', 'WebSocket', 'AWS'],
    client: 'Kişisel Proje',
    year: '2023',
    liveUrl: 'https://kemalibircan.github.io/SubPages/Otostop.html',
    githubUrl: 'https://github.com/kemalibircan',
  },
  
  {
    id: 'mobile-4',
    slug: 'chat-uygulamasi',
    type: 'mobile',
    title: 'Chat Uygulaması (ChatGuys)',
    shortDescription: 'Kullanıcıların birbirleriyle anlık mesajlaşabildiği mobil sohbet uygulaması.',
    description:
      'ChatGuys, kullanıcıların birbirleriyle anlık mesajlaşabildiği bir mobil sohbet uygulamasıdır. Uygulama, kayıt ve giriş sonrası kullanıcıların sohbet odaları oluşturmasına, gruplara katılmasına ve bire bir veya grup halinde mesaj alışverişi yapmasına olanak tanır.\n\nMesajlar ve kullanıcı verileri Google Firebase Cloud Database üzerinde tutulur; böylece gerçek zamanlı senkronizasyon ve ölçeklenebilir altyapı sağlanır. React Native ile geliştirilmiş olup hem iOS hem Android\'de çalışır.',
    images: [
      '/projects/mobile/chat1.png',
      '/projects/mobile/chat2.png',
      '/projects/mobile/chat3.png',
    ],
    tech: ['React Native', 'Google Firebase'],
    client: 'Kişisel Proje',
    year: '2022',
    githubUrl: 'https://github.com/kemalibircan/ChatGuys',
  },
  {
    id: 'mobile-5',
    slug: 'llmwizard',
    type: 'mobile',
    title: 'LLMWizard',
    shortDescription: 'Büyük dil modelleri ile etkileşim için cross-platform mobil ve web arayüzü.',
    description:
      'LLMWizard, EvolveChat bünyesinde geliştirilen; kullanıcıların büyük dil modelleri (LLM) ile mobil ve web üzerinden etkileşim kurabildiği çapraz platform bir uygulamadır. Hem React Native mobil uygulaması hem de ReactJS ile geliştirilmiş responsive web arayüzü sunulur.\n\nRedux ile state yönetimi, Tailwind CSS ile stil yönetimi ve React Native Animation ile akıcı kullanıcı deneyimi sağlanmıştır. Veriler AsyncStorage ile yerel olarak cache\'lenir. REST API entegrasyonu Axios ve Fetch API ile yapılır; backend bağlantısı ve performans iyileştirilmiştir.',
    images: [
      '/projects/mobile/llm1.png',
      '/projects/mobile/llm2.png',
      '/projects/mobile/llm3.png',
      '/projects/mobile/llm4.png',
      '/projects/mobile/llm5.png',
      '/projects/mobile/llm6.png',
      '/projects/mobile/llm7.png',
      '/projects/mobile/llm8.png',
      '/projects/mobile/llm9.png',
    ],
    tech: ['React Native', 'React', 'Redux', 'Tailwind CSS', 'React Native Animation', 'AsyncStorage', 'Axios', 'Fetch API'],
    client: 'EvolveChat',
    year: '2024',
    appStoreUrl: 'https://apps.apple.com/tr/app/llmwizard/id6739453279?l=tr',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.llmwizard&hl=tr',
  },
 
];

export const allProjects: Project[] = [...webProjects, ...mobileProjects];

export function getProjectBySlug(slug: string): Project | undefined {
  return allProjects.find((p) => p.slug === slug);
}
