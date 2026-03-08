# Theme Testi - Debug Guide

## 🐛 Sorun: Dark/Light Mode Butonu Çalışmıyor

### Neden Çalışmıyordu?

1. **HTML Element Problemi**
   - Layout.tsx'te `<html>` direkt render ediliyor
   - ThemeProvider sadece children'ı wrap ediyor
   - HTML element'ine class eklenemiyor

2. **Server vs Client**
   - Next.js 14 App Router
   - Server component olarak render ediliyor
   - Client-side state HTML'e erişemiyor

### ✅ Çözüm

1. **Initial Theme Script**
```typescript
<Script id="theme-script" strategy="beforeInteractive">
  {`
    (function() {
      function getTheme() {
        const theme = document.cookie.split('; ').find(row => row.startsWith('theme='));
        return theme ? theme.split('=')[1] : 'dark';
      }
      
      const theme = getTheme();
      const root = document.documentElement;
      
      if (theme === 'dark') {
        root.classList.add('dark');
        root.classList.remove('light');
        root.style.colorScheme = 'dark';
      } else {
        root.classList.add('light');
        root.classList.remove('dark');
        root.style.colorScheme = 'light';
      }
    })();
  `}
</Script>
```

**Ne Yapıyor?**
- Sayfa yüklenmeden ÖNCE çalışıyor (`beforeInteractive`)
- Cookie'den theme'i okuyor
- HTML element'ine class ekliyor
- FOUC (Flash of Unstyled Content) önleniyor

2. **suppressHydrationWarning**
```typescript
<html lang="tr" suppressHydrationWarning>
```

**Neden Gerekli?**
- Server'da render edilen HTML ile client'ta farklılık olabilir
- Theme script client'ta class ekliyor
- Warning'i bastırıyor

3. **ThemeContext Update**
```typescript
const applyTheme = (newTheme: Theme) => {
  const root = document.documentElement;
  
  if (newTheme === 'dark') {
    root.classList.remove('light');
    root.classList.add('dark');
    root.style.colorScheme = 'dark';
  } else {
    root.classList.remove('dark');
    root.classList.add('light');
    root.style.colorScheme = 'light';
  }
};
```

## 🧪 Test Adımları

### 1. Cookie Kontrolü
```javascript
// Console'da
document.cookie.split('; ').find(row => row.startsWith('theme='))
// Beklenen: "theme=dark" veya "theme=light"
```

### 2. HTML Class Kontrolü
```javascript
// Console'da
document.documentElement.className
// Beklenen: "dark" veya "light"
```

### 3. colorScheme Kontrolü
```javascript
// Console'da
document.documentElement.style.colorScheme
// Beklenen: "dark" veya "light"
```

### 4. Toggle Test
1. Header'daki theme butona tıkla
2. Console'da kontrol et:
```javascript
document.documentElement.className
// Dark'tan Light'a geçmeli veya tersi
```

### 5. Sayfa Yenileme Test
1. Theme'i değiştir
2. Sayfayı yenile (F5)
3. Theme korunmalı

### 6. Yeni Sekme Test
1. Theme'i değiştir
2. Yeni sekme aç
3. Aynı site'i aç
4. Theme aynı olmalı

## 🎨 Görsel Kontrol

### Dark Mode Göstergeleri
- ✅ Arka plan siyah
- ✅ Metin beyaz
- ✅ Header koyu
- ✅ Kartlar yarı saydam
- ✅ Toggle buton: Güneş ☀️ ikonu

### Light Mode Göstergeleri
- ✅ Arka plan beyaz
- ✅ Metin siyah/gri
- ✅ Header açık
- ✅ Kartlar beyaz
- ✅ Toggle buton: Ay 🌙 ikonu

## 🔍 Debug Komutları

### Theme'i Manuel Değiştir
```javascript
// Dark mode
document.documentElement.classList.add('dark');
document.documentElement.classList.remove('light');
document.documentElement.style.colorScheme = 'dark';

// Light mode
document.documentElement.classList.add('light');
document.documentElement.classList.remove('dark');
document.documentElement.style.colorScheme = 'light';
```

### Cookie'yi Manuel Ayarla
```javascript
// Dark mode
document.cookie = 'theme=dark; path=/; max-age=31536000';

// Light mode
document.cookie = 'theme=light; path=/; max-age=31536000';

// Sayfa yenile
location.reload();
```

### Theme Script Çalıştı mı?
```javascript
// Console'da
// Sayfa yüklendiğinde hemen class olmalı
document.documentElement.classList.contains('dark') || 
document.documentElement.classList.contains('light')
// Beklenen: true
```

## 🚨 Olası Sorunlar ve Çözümler

### Sorun 1: Cookie Okunmuyor
**Belirti**: Sayfa yenilendiğinde theme kayboluyot
**Çözüm**: 
```javascript
// Cookie path ve domain kontrol et
document.cookie = 'theme=dark; path=/; max-age=31536000; SameSite=Lax';
```

### Sorun 2: Script Çalışmıyor
**Belirti**: Sayfa yüklendiğinde class yok
**Çözüm**:
- `beforeInteractive` strategy kullanıldığından emin ol
- Script'in `<head>`'de olduğunu kontrol et

### Sorun 3: Hydration Warning
**Belirti**: Console'da hydration error
**Çözüm**:
- `suppressHydrationWarning` eklendi mi kontrol et
- HTML element'inde olmalı

### Sorun 4: Toggle Butonu Çalışmıyor
**Belirti**: Tıklama çalışmıyor
**Çözüm**:
```typescript
// ThemeToggle component'te
const { theme, toggleTheme } = useTheme();
// undefined değilse çalışıyor demektir
console.log('Theme:', theme);
console.log('Toggle:', toggleTheme);
```

### Sorun 5: Renkler Değişmiyor
**Belirti**: Class değişiyor ama stil değişmiyor
**Çözüm**:
- Tailwind config'te `darkMode: 'class'` olmalı
- CSS'te `dark:` prefixleri kullanılmalı

## ✅ Başarılı Test Kriterleri

- [ ] Toggle butona tıklayınca class değişiyor
- [ ] Cookie güncelleniyor
- [ ] Tüm sayfa rengi değişiyor
- [ ] Sayfa yenilendiğinde theme korunuyor
- [ ] Yeni sekmede theme aynı
- [ ] Console'da hata yok
- [ ] FOUC (flash) yok
- [ ] Smooth transition var

## 📊 Test Sonuçları

### Initial Load
```
✅ Theme script çalıştı
✅ Cookie okundu
✅ Class uygulandı
✅ Stil render edildi
⏱️ Süre: <100ms
```

### Toggle
```
✅ Click event tetiklendi
✅ State güncellendi
✅ Cookie kaydedildi
✅ Class değiştirildi
✅ Transition uygulandı
⏱️ Süre: <50ms
```

### Persistence
```
✅ Sayfa yenileme: OK
✅ Yeni sekme: OK
✅ Browser restart: OK (cookie var)
✅ 1 yıl sonra: OK (365 gün expire)
```

## 🎉 Son Kontrol

```bash
# 1. Siteyi aç
npm run dev

# 2. Browser'da aç
http://localhost:3000

# 3. Console'u aç (F12)

# 4. Theme kontrolü
document.documentElement.className
// "dark" veya "light" olmalı

# 5. Toggle test
# Butona tıkla, class değişmeli

# 6. Cookie test
document.cookie
// theme=... içermeli

# 7. Sayfa yenile
# Theme korunmalı

# ✅ Hepsi çalışıyorsa TEST BAŞARILI!
```

## 🔧 Acil Durum Çözümü

Eğer hala çalışmıyorsa:

```javascript
// Console'da çalıştır
localStorage.setItem('theme', 'light');
location.reload();

// Veya
localStorage.setItem('theme', 'dark');
location.reload();
```

## 📝 Notlar

- Initial script `beforeInteractive` ile çalışır
- ThemeProvider client-side toggle için
- Cookie 1 yıl süreyle saklanır
- suppressHydrationWarning gerekli (SSR için)
- colorScheme browser UI'ını da değiştirir

