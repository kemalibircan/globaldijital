# Railway Deploy Rehberi — GlobalDijital

Bu rehber projeyi Railway'de adım adım yayınlamanızı sağlar.

---

## 1. Railway Hesabı ve Proje Oluşturma

1. [railway.app](https://railway.app) adresine gidin ve GitHub hesabınızla giriş yapın
2. **"New Project"** → **"Empty Project"** seçin
3. Proje adını `GlobalDijital` olarak girin

---

## 2. PostgreSQL Eklentisi Ekleyin

Railway Dashboard'da:
1. **"+ Add Service"** → **"Database"** → **"PostgreSQL"** seçin
2. Oluşturulduktan sonra sol panelden PostgreSQL servisine tıklayın
3. **"Variables"** sekmesinde `DATABASE_URL` değerini kopyalayın (backend'e manuel girmenize gerek yok — Railway bunu otomatik inject eder)

---

## 3. Backend Servisini Deploy Edin

1. **"+ Add Service"** → **"GitHub Repo"** seçin
2. `GlobalDijital` repository'nizi seçin
3. **"Root Directory"** alanına → `backend` yazın
4. Servis adını `backend` yapın

### Backend Environment Variables

Railway Dashboard → `backend` servisi → **"Variables"** sekmesine aşağıdaki değerleri girin:

| Variable | Değer |
|---|---|
| `PORT` | `5000` |
| `NODE_ENV` | `production` |
| `HOST` | `0.0.0.0` |
| `DATABASE_URL` | *(PostgreSQL servisinden "Add Reference" ile ekleyin)* |
| `JWT_SECRET` | *(güçlü rastgele bir string)* |
| `CORS_ORIGIN` | *(frontend deploy edilince Railway URL'ini buraya girin)* |
| `OPENAI_API_KEY` | `sk-proj-...` |
| `OPENAI_CHAT_MODEL` | `gpt-4o-mini` |

> **DATABASE_URL için:** Variables sayfasında **"Add Reference"** butonuna tıklayın → PostgreSQL servisini seçin → `DATABASE_URL` değişkenini seçin. Bu şekilde Railway otomatik bağlantı sağlar.

5. Deploy başladıktan sonra `https://<backend-url>.up.railway.app/health` adresini açın — `{"status":"ok","database":"connected"}` görmelisiniz.

---

## 4. Frontend Servisini Deploy Edin

1. **"+ Add Service"** → **"GitHub Repo"** seçin
2. Aynı repository'yi seçin
3. **"Root Directory"** alanına → `frontend` yazın
4. Servis adını `frontend` yapın

### Frontend Environment Variables

| Variable | Değer |
|---|---|
| `NEXT_PUBLIC_API_URL` | `https://<backend-url>.up.railway.app` |
| `NODE_ENV` | `production` |

> **NEXT_PUBLIC_API_URL:** Backend servisinin Railway'deki public domain adresini girin. Örnek: `https://globaldijital-backend.up.railway.app`

---

## 5. CORS Güncellemesi

Frontend deploy olduktan sonra, frontend'in Railway URL'ini backend servisinin `CORS_ORIGIN` değişkenine (virgülle ayırarak birden fazla origin ekleyebilirsiniz):

```
CORS_ORIGIN=https://globaldijital-frontend.up.railway.app
```

Backend servisi bu değişiklikten sonra otomatik yeniden başlar.

---

## 6. Özel Domain (Opsiyonel)

Her iki servis için de Railway Dashboard → Servis → **"Settings"** → **"Domains"** bölümünden özel domain ekleyebilirsiniz.

---

## Sorun Giderme

| Sorun | Çözüm |
|---|---|
| Backend `/health` 500 döndürüyor | `DATABASE_URL` değişkenini kontrol edin |
| Frontend API çağrıları başarısız | `NEXT_PUBLIC_API_URL` ve `CORS_ORIGIN` değerlerini kontrol edin |
| Build başarısız | Railway Dashboard → Servis → **"Deployments"** → log'lara bakın |
| i18n sayfaları çalışmıyor | `NODE_ENV=production` olduğundan emin olun |

---

## Dosya Yapısı (Eklenen/Değiştirilen Dosyalar)

```
GlobalDijital/
├── backend/
│   ├── nixpacks.toml       ← Railway build config (YENİ)
│   ├── railway.json        ← Railway service config (YENİ)
│   └── .env.example        ← Env variable şablonu (YENİ)
├── frontend/
│   ├── nixpacks.toml       ← Railway build config (YENİ)
│   ├── railway.json        ← Railway service config (YENİ)
│   ├── .env.example        ← Env variable şablonu (YENİ)
│   └── next.config.js      ← output:'standalone' eklendi (DEĞİŞTİ)
└── RAILWAY_DEPLOY.md       ← Bu rehber (YENİ)
```
