# Windows Sunucuda Nginx + globaldijital.com Kurulumu

**Sunucu:** Windows  
**Domain:** globaldijital.com  
**Sunucu IP:** 141.11.109.224  
**Cloudflare:** Flexible SSL (HTTPS ziyaretçi için, sunucuya HTTP 80 gelir)

Bu rehber, Windows sunucuda Nginx’i kurup globaldijital.com trafiğini Next.js (3000) ve Backend (5000) portlarına yönlendirmeniz içindir.

---

## 1. Nginx’i Windows’a Kurma

1. **İndir:** [nginx.org/download](http://nginx.org/en/download.html) → **Stable** → **nginx/Windows-1.x.x** (zip).
2. **Aç:** Zip’i açın (örn. `C:\nginx` klasörüne). İçinde `nginx.exe`, `conf\nginx.conf` olmalı.
3. **Yol:** Nginx’in kurulu olduğu klasör örnek: `C:\nginx`. Bu yolu aşağıda **NGINX_ROOT** olarak kullanacağız.

---

## 2. globaldijital.com Konfigürasyonunu Eklemek

İki yol var. **Yol A** tek dosyada her şeyi tutar, **Yol B** site ayarını ayrı dosyada tutar.

### Yol A: nginx.conf içine kopyala-yapıştır (en basit)

1. **Dosyayı aç:** `C:\nginx\conf\nginx.conf` (Not Defteri veya VS Code ile **Yönetici olarak** açın).
2. **http { } bloğunu bulun.** İçinde zaten `server { ... }` gibi bloklar olabilir.
3. **Projedeki `nginx/globaldijital-flexible.conf`** dosyasının **tüm içeriğini** (server { ... } dahil) kopyalayın.
4. **nginx.conf** içinde `http {` ile `}` arasında, en sona (ama `}` kapanışından önce) yapıştırın.

Örnek yapı:

```nginx
http {
    # ... mevcut ayarlar (include, default_type vb.) ...
    
    # En sona ekleyin: globaldijital.com
    server {
        listen 80;
        server_name globaldijital.com www.globaldijital.com;
        # ... (globaldijital-flexible.conf içeriğinin devamı)
    }
}
```

5. Kaydedin.

### Yol B: Ayrı dosya + include

1. **conf** altında **conf.d** klasörü yoksa oluşturun: `C:\nginx\conf\conf.d`
2. Projedeki **`nginx/globaldijital-flexible.conf`** dosyasını `C:\nginx\conf\conf.d\globaldijital.conf` olarak kopyalayın.
3. **C:\nginx\conf\nginx.conf** dosyasını açın. **http { }** bloğunun içine (uygun bir yere) şu satırı ekleyin:

```nginx
include conf.d/*.conf;
```

4. Kaydedin.

---

## 3. Nginx’i Çalıştırma / Yenileme

### İlk çalıştırma

- **CMD veya PowerShell’i Yönetici olarak** açın.
- Nginx klasörüne gidin ve çalıştırın:

```cmd
cd C:\nginx
nginx
```

- Hata yoksa Nginx arka planda çalışır. Tarayıcıdan `http://localhost` veya `http://globaldijital.com` (DNS ayarlıysa) deneyin.

### Konfigürasyon değiştirdikten sonra yenileme

```cmd
cd C:\nginx
nginx -s reload
```

### Durdurma

```cmd
cd C:\nginx
nginx -s stop
```

### Konfigürasyon testi (syntax kontrolü)

```cmd
cd C:\nginx
nginx -t
```

Hata varsa bu komut satırında gösterir.

---

## 4. Cloudflare + Namecheap (Kısa)

- **Namecheap:** Domain → Manage → Nameservers → **Custom DNS** → Cloudflare’den verilen 2 nameserver’ı yazın.
- **Cloudflare:** Site ekle → **DNS** → A kaydı: **@** ve **www** → **141.11.109.224** → Proxy: **Proxied** (turuncu).
- **Cloudflare SSL/TLS:** **Flexible** seçin (sunucuda SSL yok, Cloudflare HTTPS halleder).

---

## 5. Backend ve Frontend Ortam Değişkenleri (globaldijital.com)

### Backend `backend\.env`

```env
PORT=5000
NODE_ENV=production
DATABASE_URL=postgresql://KULLANICI:SIFRE@localhost:5432/globaldijital
JWT_SECRET=guclu-rastgele-en-az-32-karakter
JWT_EXPIRES_IN=7d
CORS_ORIGIN=https://globaldijital.com,https://www.globaldijital.com
HOST=0.0.0.0
```

### Frontend `frontend\.env.production` (veya build öncesi .env)

```env
NEXT_PUBLIC_API_URL=https://globaldijital.com/api
NEXT_PUBLIC_APP_URL=https://globaldijital.com
```

Sonra production build:

```cmd
cd frontend
npm run build
```

---

## 6. Backend ve Frontend’i Windows’ta Çalıştırma

- **Backend:** `C:\...\ThreePhase\backend` → `npm run build` → `npm start` (bir CMD penceresinde açık bırakın veya Windows Servisi / PM2 ile sürekli çalıştırın).
- **Frontend:** `C:\...\ThreePhase\frontend` → `npm run build` → `npm start` (aynı şekilde açık kalmalı veya servis/PM2).

Portlar:

- **3000** → Next.js (Nginx `location /` buraya gider).
- **5000** → Backend API (Nginx `location /api` ve `/health` buraya gider).

Windows Güvenlik Duvarı’nda **80** (ve gerekirse 443) portunu açın. 3000 ve 5000’i dışarıya açmak zorunda değilsiniz; Nginx sadece 127.0.0.1 üzerinden kullanır.

---

## 7. Özet Kontrol Listesi

| Adım | Açıklama |
|------|----------|
| 1 | Nginx Windows’a kuruldu (örn. C:\nginx). |
| 2 | globaldijital.com için server bloğu **nginx.conf** içine yapıştırıldı (Yol A) veya **conf.d\globaldijital.conf** olarak kondu ve include edildi (Yol B). |
| 3 | `nginx -t` hatasız, `nginx` veya `nginx -s reload` ile Nginx çalışıyor. |
| 4 | Namecheap nameserver → Cloudflare; Cloudflare DNS: @ ve www → 141.11.109.224, Proxied; SSL: Flexible. |
| 5 | Backend .env’de CORS_ORIGIN=https://globaldijital.com,https://www.globaldijital.com. |
| 6 | Frontend .env.production’da NEXT_PUBLIC_API_URL=https://globaldijital.com/api; build alındı. |
| 7 | Backend (5000) ve frontend (3000) çalışıyor. |
| 8 | https://globaldijital.com ve https://www.globaldijital.com açılıyor, sohbet ve iletişim formu çalışıyor. |

---

## Sık Sorunlar (Windows)

| Sorun | Çözüm |
|--------|--------|
| **"ali kullanıcısı için şifre doğrulaması başarısız"** (28P01) | `backend\.env` içindeki **DATABASE_URL** şifresi PostgreSQL’de "ali" kullanıcısına atadığınız şifreyle aynı olmalı. Şifrede `@`, `#`, `%` vb. varsa URL encode edin (örn. `@` → `%40`). Veya PostgreSQL’de şifreyi sıfırlayın: `ALTER USER ali PASSWORD 'yeni_sifre';` |
| 502 Bad Gateway | Backend (5000) veya frontend (3000) çalışmıyor. İki CMD’de `npm start` ile kontrol edin. |
| “bind() to 0.0.0.0:80 failed” | 80 portu başka bir programda (IIS, Skype vb.). IIS’i kapatın veya Nginx’e farklı port verin. |
| CORS hatası | Backend .env’de CORS_ORIGIN tam olarak `https://globaldijital.com,https://www.globaldijital.com` (https ile). |
| Sayfa açılıyor API yok | Tarayıcıda **https://globaldijital.com** ile açın; frontend’i NEXT_PUBLIC_API_URL ile yeniden build edin. |

Bu adımlarla Windows sunucuda Nginx, globaldijital.com ve Cloudflare SSL düzgün şekilde çalışır.
