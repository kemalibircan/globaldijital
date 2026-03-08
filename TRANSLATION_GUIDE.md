# Çeviri Kılavuzu (Translation Guide)

## Dil Desteği

GlobalDijital platformu şu dilleri desteklemektedir:
- 🇹🇷 Türkçe (tr) - Varsayılan
- 🇩🇪 Almanca (de)
- 🇸🇦 Arapça (ar)

## Çeviri Dosyası Yapısı

Tüm çeviriler `frontend/lib/translations.ts` dosyasında bulunur.

### Temel Yapı

```typescript
export const translations = {
  tr: { /* Türkçe çeviriler */ },
  de: { /* Almanca çeviriler */ },
  ar: { /* Arapça çeviriler */ },
};
```

## Bölümler

### 1. Navigation (nav)
```typescript
nav: {
  home: 'Ana Sayfa',
  services: 'Hizmetler',
  about: 'Hakkımızda',
  contact: 'İletişim',
  login: 'Giriş Yap',
}
```

### 2. Hero Section (hero)
```typescript
hero: {
  title: 'Dijital Çözümler',
  subtitle: 'İşiniz İçin',
  description: '...',
  viewServices: 'Hizmetleri Görüntüle',
  getStarted: 'Başlayın',
  dreamStep: '🚀 Hayalinize Bir Adım Yakınsınız',
  dreamDescription: '...',
}
```

### 3. Services (services)
```typescript
services: {
  title: 'Hizmetlerimiz',
  website: {
    title: 'Web Sitesi Geliştirme',
    description: '...',
  },
  mobile: { /* ... */ },
  seo: { /* ... */ },
  marketing: { /* ... */ },
}
```

### 4. Features (features)
```typescript
features: {
  multilingual: {
    title: 'Çok Dilli Destek',
    description: '...',
  },
  secure: { /* ... */ },
  payment: { /* ... */ },
}
```

### 5. How We Work (howWeWork) ⭐ YENİ
```typescript
howWeWork: {
  title: 'Nasıl Çalışırız?',
  subtitle: 'Başarıya giden yolculuğunuzda adım adım yanınızdayız',
  step1: {
    title: 'Keşif & Planlama',
    description: '...',
  },
  step2: { /* ... */ },
  step3: { /* ... */ },
  step4: { /* ... */ },
}
```

### 6. Timeline (timeline) ⭐ YENİ
```typescript
timeline: {
  title: 'Projeler Ne Kadar Sürer?',
  subtitle: 'Her proje özeldir, işte ortalama süreler',
  website: {
    title: 'Web Sitesi',
    duration: '2-4 Hafta',
    description: '...',
  },
  mobile: { /* ... */ },
  seo: { /* ... */ },
  marketing: { /* ... */ },
}
```

### 7. Packages (packages) ⭐ YENİ
```typescript
packages: {
  title: 'Paketlerimiz',
  subtitle: 'İşletmeniz için en uygun paketi seçin',
  basic: {
    name: 'Başlangıç',
    price: '999₺',
    period: 'tek seferlik',
    features: [
      '5 Sayfalık Web Sitesi',
      'Responsive Tasarım',
      // ...
    ],
  },
  professional: {
    name: 'Profesyonel',
    price: '2.999₺',
    period: 'tek seferlik',
    features: [ /* ... */ ],
    popular: true,
  },
  enterprise: { /* ... */ },
}
```

### 8. FAQ (faq) ⭐ YENİ
```typescript
faq: {
  title: 'Sıkça Sorulan Sorular',
  subtitle: 'Merak ettiklerinizin cevapları',
  q1: {
    question: 'Projeler ne kadar sürede teslim edilir?',
    answer: '...',
  },
  q2: { /* ... */ },
  // q3 - q6
}
```

### 9. Footer (footer)
```typescript
footer: {
  description: 'İşiniz için anahtar teslimi dijital çözümler.',
  company: 'Şirket',
  aboutUs: 'Hakkımızda',
  contact: 'İletişim',
  privacy: 'Gizlilik Politikası',
  terms: 'Kullanım Koşulları',
  languages: 'Diller',
  rights: 'Tüm hakları saklıdır.',
}
```

## Kullanım

### Component İçinde
```typescript
import { translations, Language } from '@/lib/translations';
import Cookies from 'js-cookie';

const [lang, setLang] = useState<Language>('tr');

useEffect(() => {
  const savedLang = (Cookies.get('locale') || 'tr') as Language;
  setLang(savedLang);
}, []);

const t = translations[lang];

// Kullanım
<h1>{t.hero.title}</h1>
<p>{t.hero.description}</p>
```

### Örnekler

```typescript
// Basit metin
{t.nav.home}

// Nested obje
{t.services.website.title}

// Array içindeki item
{t.packages.basic.features[0]}

// Loop ile kullanım
{t.packages.basic.features.map((feature, idx) => (
  <li key={idx}>{feature}</li>
))}
```

## Yeni Çeviri Ekleme

### 1. Translations dosyasına ekle
```typescript
// frontend/lib/translations.ts
export const translations = {
  tr: {
    // ... mevcut çeviriler
    yeniAlan: {
      baslik: 'Yeni Başlık',
      aciklama: 'Açıklama metni',
    },
  },
  de: {
    // ... Almanca
    yeniAlan: {
      baslik: 'Neuer Titel',
      aciklama: 'Beschreibungstext',
    },
  },
  ar: {
    // ... Arapça
    yeniAlan: {
      baslik: 'عنوان جديد',
      aciklama: 'نص الوصف',
    },
  },
};
```

### 2. Component'te kullan
```typescript
const t = translations[lang];

return (
  <div>
    <h2>{t.yeniAlan.baslik}</h2>
    <p>{t.yeniAlan.aciklama}</p>
  </div>
);
```

## RTL (Right-to-Left) Desteği

Arapça için RTL desteği mevcuttur:

```css
/* globals.css */
[dir="rtl"] {
  direction: rtl;
}
```

Kullanım:
```typescript
<div dir={lang === 'ar' ? 'rtl' : 'ltr'}>
  {/* İçerik */}
</div>
```

## Best Practices

### 1. Tutarlı Anahtar İsimleri
```typescript
// ✅ İyi
services: {
  website: { title, description }
  mobile: { title, description }
}

// ❌ Kötü
services: {
  website: { baslik, aciklama }
  mobile: { title, description }
}
```

### 2. Anlamlı Gruplandırma
```typescript
// ✅ İyi - Bölümlere göre gruplanmış
nav: { /* navigation */ }
hero: { /* hero section */ }
services: { /* services */ }

// ❌ Kötü - Düz liste
homeTitle: '...',
aboutTitle: '...',
contactTitle: '...',
```

### 3. Çoğul Kullanımı
```typescript
// Array kullan
features: ['Özellik 1', 'Özellik 2', 'Özellik 3']

// Obje içinde array
package: {
  name: 'Paket Adı',
  features: ['Özellik 1', 'Özellik 2']
}
```

### 4. Varsayılan Dil
```typescript
// Her zaman fallback kullan
const savedLang = (Cookies.get('locale') || 'tr') as Language;
const t = translations[savedLang] || translations.tr;
```

## Dil Değiştirme

Kullanıcı dil değiştirdiğinde:

1. Cookie güncellenir
```typescript
Cookies.set('locale', langCode, { expires: 365 });
```

2. State güncellenir
```typescript
setCurrentLang(langCode);
```

3. Sayfa yenilenir (opsiyonel)
```typescript
window.location.reload();
```

## Test Etme

### Manuel Test
1. Dil değiştirici butonunu kullan
2. Her dilde tüm sayfaları kontrol et
3. RTL düzenini test et (Arapça)
4. Cookie'nin saklandığını doğrula

### Eksik Çeviri Kontrolü
```typescript
// TypeScript otomatik kontrol eder
const t = translations[lang];
console.log(t.yeniAlan.baslik); // Yoksa hata verir
```

## Sık Karşılaşılan Hatalar

### 1. Yanlış Anahtar
```typescript
// ❌ Hata
{t.services.webSite.title} // webSite değil, website

// ✅ Doğru
{t.services.website.title}
```

### 2. Eksik Çeviri
```typescript
// Her dil için ekle
tr: { title: 'Başlık' }
de: { title: 'Titel' }
ar: { title: 'عنوان' } // Unutma!
```

### 3. Tip Hatası
```typescript
// ✅ Type kullan
import { Language } from '@/lib/translations';
const [lang, setLang] = useState<Language>('tr');

// ❌ String kullanma
const [lang, setLang] = useState('tr'); // Tip güvenliği yok
```

## Yardımcı Araçlar

### Online Çeviri
- [DeepL](https://www.deepl.com/) - Yüksek kaliteli çeviri
- [Google Translate](https://translate.google.com/)

### RTL Test
- Chrome DevTools > Settings > Rendering > Emulate CSS media feature prefers-color-scheme

## Destek

Çeviri ile ilgili sorular için:
- `frontend/lib/translations.ts` dosyasına bakın
- TypeScript type definitions kullanın
- Mevcut çevirileri örnek alın

