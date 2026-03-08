# GlobalDijital SEO Rehberi – Google’da Üste Çıkmak İçin

Bu rehber, sitede **yapılmış teknik SEO** işlemlerini özetler ve **senin yapman gereken adımları** (Google araçları, içerik, takip) adım adım listeler.

---

## Sitede Zaten Yapılanlar (Kod Tarafı)

- **Meta etiketleri:** Her sayfada `title`, `description`, `keywords` (uygun sayfalarda). Ana sayfa ve her sayfa için ayrı açıklama.
- **Open Graph & Twitter Kartları:** Paylaşımda doğru başlık, açıklama ve görsel (logo) çıkması için.
- **Canonical URL:** Her sayfada `alternates.canonical` ile tek doğru adres gösteriliyor; duplicate content azaltıldı.
- **robots.txt:** `/robots.txt` otomatik üretiliyor. İndekslenmesi gereken sayfalar açık, `/dashboard` kapalı. Sitemap adresi robots’ta belirtildi.
- **Sitemap:** `/sitemap.xml` otomatik; tüm önemli sayfalar (anasayfa, hizmetler, projeler, about, contact, her proje detayı) listeleniyor. `lastModified`, `changeFrequency`, `priority` alanları dolduruldu.
- **JSON-LD (yapısal veri):** Organization ve WebSite şemaları eklendi. Google’ın sitenizi “şirket + web sitesi” olarak anlaması ve zengin sonuç (rich results) ihtimali artar.
- **Semantik HTML:** Sayfalarda `<main>`, `<section>`, başlık hiyerarşisi (h1, h2) kullanılıyor.
- **Site URL yapılandırması:** Production’da doğru domain’in kullanılması için `NEXT_PUBLIC_SITE_URL` kullanılıyor (aşağıda).
<S>
---



## Senin Yapman Gerekenler – Adım Adım

### 1. Ortam değişkeni (production)

Sunucuda veya Vercel/hosting’de **site adresi** tanımlı olsun:

```env
NEXT_PUBLIC_SITE_URL=https://globaldijital.com
```

Böylece sitemap, canonical ve Open Graph linkleri `https://globaldijital.com` üzerinden üretilir. Yoksa kod varsayılan olarak `https://globaldijital.com` kullanıyor; domain farklıysa bu değişkeni kendi domain’inle güncelle.

---

### 2. Google Search Console’a site ekleme

1. [Google Search Console](https://search.google.com/search-console) → **Mülk ekle**.
2. **URL öneki** seçip `https://globaldijital.com` (ve varsa `https://www.globaldijital.com`) girin.
3. Sahipliği doğrulama:
   - **HTML etiketi:** Search Console’da verilen meta etiketini kopyalayın. Projede `app/layout.tsx` içinde `metadata` objesine geçici olarak şunu ekleyin (verilen içeriğe göre düzenleyin):
     ```ts
     verification: { google: 'BURAYA_VERILEN_KOD' }
     ```
     Build alıp yayına aldıktan sonra Search Console’da “Doğrula”ya tıklayın.
   - **Veya** DNS ile doğrulama (TXT kaydı): Domain yönetiminde (Namecheap/Cloudflare) verilen TXT kaydını ekleyin, kaydedin, Search Console’da doğrulayın.
4. Doğrulama tamamlandıktan sonra **Sitemap gönder:** Sol menüden **Sitemap’ler** → “Yeni site haritası ekle” → `https://globaldijital.com/sitemap.xml` yazıp gönder.
5. İsterseniz `https://www.globaldijital.com` ayrı bir mülkse, onun için de sitemap ekleyin.

---

### 3. Google Analytics (GA4) – isteğe bağlı ama önerilen

1. [Google Analytics](https://analytics.google.com) → **Admin** → **Mülk oluştur** (GA4).
2. Web akışı ekleyin; site URL’i `https://globaldijital.com` olsun.
3. **Ölçüm ID** (örn. `G-XXXXXXXXXX`) verilir. Bunu frontend’e eklemek için:
   - `app/layout.tsx` içinde `<head>` veya `<body>` başına Google’ın verdiği gtag script’ini ekleyebilirsiniz, **veya**
   - `next/script` ile Strategy `afterInteractive` kullanarak GA script’ini yükleyin.
4. Yayına aldıktan sonra Analytics’te “Gerçek zamanlı” bölümünden ziyaret geliyor mu kontrol edin.

---

### 4. Indexleme ve “URL’yi incele”

- Search Console’da **URL denetleme** (Üst kutu) kullanın: `https://globaldijital.com` ve önemli sayfaları (örn. `/services`, `/contact`) tek tek yazıp “Dizine ekleme iste” deyin. Bu, Google’ın sayfayı daha hızlı taramasına yardım eder.
- Yeni eklediğiniz veya güncellediğiniz sayfalar için de aynı işlemi yapabilirsiniz.

---

### 5. İçerik ve anahtar kelimeler

- **Hedef anahtar kelimeler (örnek):** “web sitesi fiyatları”, “kurumsal web sitesi”, “mobil uygulama yaptırma”, “SEO hizmeti”, “Adana web tasarım”, “KOBİ web sitesi”, “React Native uygulama” vb.
- Bu kelimeleri doğal biçimde şu yerlere serpiştirin:
  - Sayfa başlıkları (h1) ve alt başlıklar (h2, h3).
  - Meta description (zaten sayfa bazlı var; zamanla metinleri bu anahtar kelimelere göre güncelleyebilirsiniz).
  - Hizmetler sayfası, hakkımızda ve iletişim sayfası metinleri.
- **Blog / makale:** İleride “Blog” veya “Yazılar” sayfası açıp “Web sitesi neden önemli?”, “Mobil uygulama maliyeti” gibi konularda makaleler yazarsanız, uzun kuyruk aramalarda üst sıralara çıkmanız kolaylaşır.

---

### 6. Görseller (alt metin ve dosya adı)

- Tüm önemli görsellere **anlamlı `alt` metni** verin (zaten birçok yerde var; yeni eklediğiniz görsellerde de “Ne gösteriyor?” sorusuna cevap verin).
- Dosya adları Türkçe karakter yerine İngilizce veya slug kullanın (örn. `kurumsal-site-ornek.png`).

---

### 7. Hız ve mobil

- **Core Web Vitals:** Google Search Console’da “Sayfa deneyimi” / “Core Web Vitals” bölümünü periyodik kontrol edin. Kırmızı sayfalar varsa (LCP, FID, CLS) önce onları iyileştirin.
- Sunucu ve hosting’i hızlı tutun; gereksiz script’leri azaltın. Next.js zaten optimizasyon sağlıyor.
- Mobilde menü ve butonların rahat tıklanabilir olduğundan emin olun (mevcut yapı responsive).

---

### 8. Backlink ve sosyal sinyaller

- Sitenizi sosyal medya hesaplarında (LinkedIn, Twitter/X, Instagram) tanıtın; paylaşımlarda `https://globaldijital.com` linkini kullanın.
- Referans verdiğiniz müşterilerden (Pink Tour, Çukurova Profil PVC vb.) web sitelerinde “Web sitemizi GlobalDijital yaptı” gibi bir cümle + link isteyebilirsiniz (backlink).
- Yerel dizinlere (Google İşletmem, Yandex, yerel portallar) site adresinizi ekleyin.

---

### 9. Tekrarlı kontroller (ayda bir önerilir)

- Search Console: Tıklanma, gösterim, ortalama sıra, hata sayıları.
- “Tarama hataları” ve “Sayfa denetleme” ile 404 veya erişilemeyen sayfaları düzeltin.
- Sitemap’i güncellediyseniz (yeni sayfa eklediyseniz) genelde otomatik yenilenir; yine de Search Console’da sitemap’in başarıyla işlendiğini kontrol edin.

---

## Özet Kontrol Listesi

| # | Yapılacak | Durum |
|---|-----------|--------|
| 1 | `NEXT_PUBLIC_SITE_URL=https://globaldijital.com` (production) | ☐ |
| 2 | Google Search Console’da site ekle ve doğrula | ☐ |
| 3 | Sitemap gönder: `https://globaldijital.com/sitemap.xml` | ☐ |
| 4 | GA4 mülk oluştur ve siteye script ekle (isteğe bağlı) | ☐ |
| 5 | Önemli URL’ler için “URL’yi incele” / dizine ekleme iste | ☐ |
| 6 | İçerikleri hedef anahtar kelimelere göre gözden geçir | ☐ |
| 7 | Görsel alt metinleri ve dosya adlarını kontrol et | ☐ |
| 8 | Core Web Vitals ve mobil deneyimi takip et | ☐ |
| 9 | Backlink ve sosyal paylaşım için plan yap | ☐ |

Bu adımlar ve sitedeki teknik SEO altyapısı, Google’da daha iyi sıralanmanız için gerekli temeli oluşturur. Sabırlı ve düzenli takip önemlidir; sonuçlar birkaç hafta–birkaç ay içinde belirginleşir.
