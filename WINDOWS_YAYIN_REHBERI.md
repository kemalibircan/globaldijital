# Windows PC'de Projeyi Yayına Alma (IP ile Erişim)

Bu rehber, projeyi Windows bilgisayarında çalıştırıp **IP adresi** ile (domain olmadan) erişmeniz için adım adım yazılmıştır.

---

## Gereksinimler

- **Node.js** 18 veya üzeri ([nodejs.org](https://nodejs.org) – LTS sürümünü indirin)
- **PostgreSQL** (zaten indirdiğinizi varsayıyoruz)
- **npm** (Node.js ile birlikte gelir)

---

## Adım 1: Node.js Kurulumu

1. [https://nodejs.org](https://nodejs.org) adresinden **LTS** sürümünü indirin.
2. Kurulumu çalıştırın, varsayılan seçeneklerle devam edin.
3. Kurulumdan sonra **yeni bir CMD veya PowerShell** açın ve kontrol edin:

```bash
node -v
npm -v
```

Her ikisi de sürüm numarası göstermeli (örn. `v20.x.x` ve `10.x.x`).

---

## Adım 2: PostgreSQL Veritabanı Oluşturma

1. **pgAdmin** veya **psql** ile PostgreSQL’e bağlanın.
2. Yeni bir veritabanı oluşturun. İsim örneğin: `globaldijital`.

**pgAdmin ile:**
- Sol tarafta “Databases”e sağ tıklayın → Create → Database.
- Name: `globaldijital` → Save.

**Komut satırı (psql) ile:**

```bash
psql -U postgres
```

Sonra:

```sql
CREATE DATABASE globaldijital;
\q
```

3. Şemayı (tabloları) yükleyin. Proje klasöründe **CMD veya PowerShell** açın:

```bash
cd C:\...\ThreePhase
psql -U postgres -d globaldijital -f database\schema.sql
```

(Projenin tam yolunu kendi klasörünüze göre yazın. `postgres` yerine kendi kullanıcı adınızı kullanabilirsiniz.)

Şifre sorulursa PostgreSQL kurulumunda belirlediğiniz şifreyi girin.

---

## Adım 3: Ortam Dosyalarını Oluşturma

### 3.1 Backend `.env`

`ThreePhase\backend` klasöründe `.env` adında bir dosya oluşturun (Not Defteri veya VS Code ile). İçeriği:

```env
PORT=5000
NODE_ENV=production
DATABASE_URL=postgresql://postgres:SIFRENIZ@localhost:5432/globaldijital
JWT_SECRET=guclu-rastgele-bir-metin-buraya-yazin-en-az-32-karakter
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:3000,http://BILGISAYAR_IP:3000
```

- **SIFRENIZ**: PostgreSQL kullanıcı şifreniz.
- **BILGISAYAR_IP**: Adım 3.2’de not ettiğiniz IP (örn. `141.11.109.224`). Virgülle ayırarak birden fazla origin yazabilirsiniz; hem localhost hem IP ile erişim için yukarıdaki gibi kullanın.
- **postgres**: Kullanıcı adınız farklıysa onu yazın.
- **JWT_SECRET**: Güçlü, rastgele bir metin (en az 32 karakter). Örnek: `benim-cok-gizli-jwt-anahtarim-2024`.

### 3.2 Bilgisayarın IP’sini Bulma

CMD’de:

```bash
ipconfig
```

“IPv4 Address” satırındaki değer sizin IP’niz (örn. `192.168.1.100`). Bunu not alın; aşağıda `BILGISAYAR_IP` yerine yazacaksınız.

### 3.3 Frontend `.env.local`

`ThreePhase\frontend` klasöründe `.env.local` adında bir dosya oluşturun:

```env
NEXT_PUBLIC_API_URL=http://BILGISAYAR_IP:5000/api
NEXT_PUBLIC_APP_URL=http://BILGISAYAR_IP:3000
```

**Örnek** (IP `192.168.1.100` ise):

```env
NEXT_PUBLIC_API_URL=http://192.168.1.100:5000/api
NEXT_PUBLIC_APP_URL=http://192.168.1.100:3000
```

- Sadece kendi bilgisayarınızdan erişecekseniz `localhost` da kullanılabilir; aynı ağdaki başka cihazlardan (telefon, başka PC) erişmek için mutlaka **gerçek IP** yazın.

---

## Adım 4: Bağımlılıkları Yükleme ve Derleme

Proje kök klasöründe (`ThreePhase`) CMD veya PowerShell açın:

```bash
cd C:\...\ThreePhase
npm run install:all
```

Ardından backend ve frontend’i **production** için derleyin:

```bash
npm run build
```

Hata alırsanız:

```bash
cd backend
npm run build
cd ..\frontend
npm run build
cd ..
```

---

## Adım 5: Uygulamayı Çalıştırma (IP’den Erişim İçin)

İki ayrı terminal penceresi kullanın.

### Terminal 1 – Backend

```bash
cd C:\...\ThreePhase\backend
npm run start
```

“Server running on port 5000” ve “Database connected successfully” benzeri mesajları görmelisiniz.

### Terminal 2 – Frontend (Ağdan erişim için)

```bash
cd C:\...\ThreePhase\frontend
npm run start:host
```

`start:host` komutu Next.js’i **0.0.0.0** üzerinden başlatır; böylece sadece localhost değil, IP ile de erişilir.

(Eğer `start:host` tanımlı değilse: `npx next start -H 0.0.0.0` kullanın.)

---

## Adım 6: Windows Güvenlik Duvarı (Firewall)

Başka cihazlardan veya dış ağdan erişim istiyorsanız 3000 ve 5000 portlarını açın:

1. **Windows Güvenlik Duvarı** → Gelişmiş ayarlar.
2. “Gelen Kuralları” → “Yeni Kural” → Bağlantı Noktası.
3. TCP, Özel bağlantı noktaları: **3000** → İzin ver → İsim: “GlobalDijital Frontend”.
4. Aynı şekilde **5000** için tekrarlayın, isim: “GlobalDijital Backend”.

Sadece kendi bilgisayarınızdan `http://localhost:3000` ile erişecekseniz firewall’da bir şey açmanız gerekmez.

---

## Adım 7: Erişim Adresleri

- **Kendi bilgisayarınızda:**  
  [http://localhost:3000](http://localhost:3000)
- **Aynı ağdaki başka cihazdan (telefon, başka PC):**  
  [http://BILGISAYAR_IP:3000](http://BILGISAYAR_IP:3000)  
  Örnek: `http://192.168.1.100:3000`

API adresi: `http://BILGISAYAR_IP:5000` (ör. health: `http://192.168.1.100:5000/health`).

---

## Sık Karşılaşılan Sorunlar

| Sorun | Çözüm |
|--------|--------|
| `psql` bulunamıyor | PostgreSQL’in “bin” klasörünü sistem PATH’ine ekleyin (örn. `C:\Program Files\PostgreSQL\16\bin`). |
| Veritabanı bağlantı hatası | `.env` içindeki `DATABASE_URL` kullanıcı adı, şifre ve veritabanı adını kontrol edin. PostgreSQL servisinin çalıştığından emin olun (Hizmetler: “postgresql-x64-16”). |
| Sayfa açılıyor ama API çalışmıyor | Frontend `.env.local` içinde `NEXT_PUBLIC_API_URL` değerinin **http://BILGISAYAR_IP:5000/api** olduğundan emin olun. Değiştirdikten sonra frontend’i yeniden build edin: `cd frontend` → `npm run build` → `npm run start:host`. |
| **CORS / "loopback" / "more-private address space"** hatası (IP ile açınca sohbet veya iletişim formu çalışmıyor) | Tarayıcı, sayfayı `http://141.11.109.224:3000` gibi IP’den açtığınızda API’ye `localhost:5000` ile istek atmayı engeller. Çözüm: (1) Frontend’i **mutlaka yeniden build edin**: `cd frontend` → `npm run build` → `npm run start:host`. (2) Backend’in `CORS_ORIGIN` değerinde `http://BILGISAYAR_IP:3000` (örn. `http://141.11.109.224:3000`) olduğundan emin olun. (3) Sayfayı **IP ile** açın (`http://141.11.109.224:3000`), localhost ile değil; böylece API istekleri de aynı IP’ye gider. |
| Başka cihazdan erişemiyorum | Backend ve frontend’i `0.0.0.0`/host üzerinden çalıştırdığınızdan ve firewall’da 3000 ile 5000 portlarının açık olduğundan emin olun. |

---

## Özet Komut Listesi (Tekrar)

```bash
# 1) Proje klasörüne git
cd C:\...\ThreePhase

# 2) Bağımlılıkları yükle
npm run install:all

# 3) Derle
npm run build

# 4) Backend (Terminal 1)
cd backend
npm run start

# 5) Frontend – IP’den erişim (Terminal 2)
cd frontend
npm run start:host
```

Domain aldığınızda, `.env` ve `.env.local` içindeki `localhost` / IP adreslerini domain ile değiştirmeniz yeterli (örn. `https://siteniz.com`).
