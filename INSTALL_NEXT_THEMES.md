# 🔧 next-themes Manuel Kurulum

## ⚠️ Sorun
`next-themes` paketi package.json'da var ama `node_modules`'e kurulmamış.

## ✅ Çözüm

### Terminal'de Şu Komutu Çalıştır:

**Windows PowerShell:**
```powershell
cd "C:\Users\stajy\OneDrive\Masaüstü\ThreePhase\frontend"
npm install next-themes --save
```

### Veya Tüm Paketleri Yeniden Yükle:
```powershell
cd "C:\Users\stajy\OneDrive\Masaüstü\ThreePhase\frontend"
rm -r node_modules
rm package-lock.json
npm install
```

### Sonra Dev Server'ı Başlat:
```powershell
npm run dev
```

## 📝 Adım Adım

1. **Terminal aç** (PowerShell veya CMD)

2. **Frontend klasörüne git:**
   ```powershell
   cd "C:\Users\stajy\OneDrive\Masaüstü\ThreePhase\frontend"
   ```

3. **next-themes'i kur:**
   ```powershell
   npm install next-themes
   ```

4. **Kurulum kontrolü:**
   ```powershell
   dir node_modules\next-themes
   ```
   Bu klasör görünmeli!

5. **Server'ı başlat:**
   ```powershell
   npm run dev
   ```

6. **Browser'da test et:**
   - http://localhost:3000
   - Header'daki güneş/ay butonuna tıkla
   - Dark/Light mode ANINDA değişmeli!

## 🚨 Eğer Hala Çalışmazsa

### Option 1: Node Modules Temizle
```powershell
cd "C:\Users\stajy\OneDrive\Masaüstü\ThreePhase\frontend"
Remove-Item -Path node_modules -Recurse -Force
Remove-Item -Path package-lock.json -Force
npm cache clean --force
npm install
```

### Option 2: NPM Cache Temizle
```powershell
npm cache clean --force
npm install next-themes --save
```

### Option 3: Farklı Yöntem
```powershell
cd "C:\Users\stajy\OneDrive\Masaüstü\ThreePhase\frontend"
npm install --legacy-peer-deps
```

## 🎯 Beklenen Sonuç

Kurulum başarılı olduğunda:
```
added 4 packages in 3s
```

Ve şu dosya mevcut olmalı:
```
C:\Users\stajy\OneDrive\Masaüstü\ThreePhase\frontend\node_modules\next-themes\package.json
```

## 📞 Debug

### Kurulum kontrol:
```powershell
npm list next-themes
```

Çıktı:
```
globaldijital-frontend@1.0.0
└── next-themes@0.2.1
```

### Package.json kontrol:
```powershell
type package.json | findstr next-themes
```

Çıktı:
```
"next-themes": "^0.2.1"
```

---

**Şimdi terminal'de bu komutları çalıştır!** 🚀

