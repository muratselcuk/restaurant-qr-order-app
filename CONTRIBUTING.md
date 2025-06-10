# Contributing Guide: SaaS Restaurant Management System

Merhaba! Bu belge, bu projeye katkıda bulunmak isteyen geliştiriciler için temel Git ve GitHub adımlarını içermektedir.  
Kod yazma sürecini standartlaştırmak ve takım içi iletişimi kolaylaştırmak amacıyla hazırlanmıştır.  
Kendi işlerimizi hatırlamak ve yeni geliştiricilere rehberlik etmek için bir başvuru kaynağıdır.

---

## Branch Stratejisi

### Ana Dal

- `main` → Yayınlanan, kararlı (production) sürüm.  
  Sadece test edilmiş ve onaylanmış kod buraya birleştirilir.

### Geçici / Çalışma Dalları

- `feature/xxx` → Yeni özellik geliştirme.
    - Eğer ilgili bir GitHub issue varsa, şu format kullanılır:  
      `feature/123-menu-management` (123 → issue numarası)
- `hotfix/xxx` → Acil, üretimdeki (main) hataları düzeltmek için.
- `cleanup/xxx` → Kod temizliği, refactoring.
- `bugfix/xxx` → Planlı hata düzeltmeleri için (acil olmayan).
- `chore/xxx` → Bağımlılık güncellemeleri, yapılandırma, build ayarları vb.
- `docs/xxx` → Sadece dokümantasyon değişiklikleri.

### Kurallar

- Her yeni dal, **güncel `main` dalı üzerinden** açılır.
    ```bash
    git checkout main
    git pull origin main
    git checkout -b feature/123-menu-management
    ```
- Dal adları kısa, açıklayıcı ve konuyla ilişkili olmalıdır.
- PR (Pull Request) başlığı dalı yansıtmalı, açıklama kısmında varsa ilgili issue numarası referans verilmelidir.

---

## Git Kullanım Adımları

### 1️⃣ Repository'yi Klonlama

```bash

git clone https://github.com/muratselcuk/restaurant-qr-order-app.git
cd restaurant-qr-order
```

### 2️⃣ Yeni Branch Açma

```bash

git checkout main
git pull origin main
git checkout -b feature/123-ozellik-adi
```

### 3️⃣ Değişiklikleri Commit Etme

```bash

git add .
git commit -m "feat: Menü yönetimi eklendi #123"
```

### 4️⃣ Branch Push Etme

```bash

git push origin feature/123-ozellik-adi
```

### 5️⃣ Pull Request (PR) Açma

- GitHub üzerinden PR açılır
- Hedef dal: main
- Açıklamada ilgili issue numarası: Closes #123

## Pull Request Checklist

 - [ ] PR hedef dalı doğru mu? → main olmalı.
 - [ ] PR başlığı anlamlı ve açıklayıcı mı?
 - [ ] PR açıklamasında ilgili issue numarası (varsa) yazılmış mı?
 - [ ] Branch, güncel main ile güncellenmiş mi?
 - [ ] Kod çalışıyor ve uygulama hatasız mı?
 - [ ] Gereksiz dosyalar commit edilmemiş mi?
 - [ ] Sadece gerekli dosyalar değişmiş mi?
 - [ ] Kod elle test edilmiş mi?
 - [ ] Kod stiline uygun mu? (lint, prettier vs.)

## Kullanışlı Git Komutları

### Branch Yönetimi

```bash

git branch             # mevcut branch'leri göster
git branch -r          # uzak branch'leri göster
```

### Branch Güncelleme

```bash

git checkout main
git pull origin main
```

### Branch Rebasing

```bash

git checkout feature/123-ozellik-adi
git fetch origin
git rebase origin/main
```

### Commit'leri Görüntüleme

```bash

git log --oneline --graph --all
```

### Değişiklikleri İptal Etme

```bash

git restore .
```

### Remote Branch Silme

```bash

git push origin --delete feature/123-ozellik-adi
```

### Local Branch Silme

```bash

git branch -d feature/123-ozellik-adi
```

## Genel Notlar ve İpuçları

- Commit mesajlarında şu etiketleri kullan:
    - feat: → Yeni özellik
    - fix: → Hata düzeltme
    - chore: → Teknik işler / bağımlılık güncelleme
    - docs: → Dokümantasyon değişiklikleri
    - refactor: → Kod yeniden düzenleme
    - style: → Biçim düzenleme (boşluk, ; vs.)
    - test: → Test dosyaları
- PR açıklamasında varsa ilgili issue referansı yaz: Closes #123
- PR'ları küçük ve odaklı tut. Tek PR'da fazla iş yükü olmamalı.
- PR öncesi branch'ini güncel main ile senkronize et.
- .gitignore dosyasına gereksiz dosyaları eklemeyi unutma.
- Kod stiline sadık kal. (Varsa prettier/eslint kullan.)
- Sık ve anlamlı commitler yap.