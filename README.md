# 🍽️ Restaurant QR Order App

Bu proje, restoran müşterilerinin QR kod okuyarak kendi telefonları üzerinden sipariş vermelerini sağlar. Aynı zamanda mutfak çalışanları için siparişleri görüntüleyebilecekleri bir panel içerir. Çoklu tenant (restoran) desteğiyle her restoran izole çalışır.

---

## 📂 Klasör Yapısı

```
restaurant-qr-order-app/
├── backend/       → Node.js + Express + Knex
├── frontend/      → React + Vite
├── DEMO.md        → Uçtan uca demo ve kullanım kılavuzu
└── README.md      → Genel proje açıklaması
```

---

## 🚀 Hızlı Başlangıç

```bash
git clone https://github.com/muratselcuk/restaurant-qr-order-app.git
cd restaurant-qr-order-app
docker-compose up
```
- Tüm servisler (backend, frontend, veritabanı) otomatik başlar.
- Backend: http://localhost:3001
- Frontend: http://localhost:3000

> Detaylı demo ve test akışı için [DEMO.md](./DEMO.md) dosyasına bakınız.

---

## 🧑‍💻 Geliştirme Ortamı

Her klasör bağımsız geliştirilir:

```bash
cd backend
npm install
npm run dev

cd ../frontend
npm install
npm run dev
```

Veritabanı migrasyon ve seed işlemleri için:
```bash
cd backend
npx knex migrate:latest --knexfile knexfile.js
npx knex seed:run --knexfile knexfile.js
```

---

## 🧪 Temel Kullanım Akışı

- Müşteri, QR kod ile masa seçer ve menüden sipariş verir.
- Siparişler mutfak panelinde anlık görüntülenir.
- Çoklu tenant desteğiyle farklı restoranlar izole çalışır.
- Tüm demo ve test adımları için [DEMO.md](./DEMO.md) dosyasını inceleyin.

---

## 🔗 Önemli URL ve API Uçları

- Müşteri giriş: `http://localhost:3000/start/Restaurant%20A`
- Mutfak paneli: `http://localhost:3000/kitchen/Restaurant%20A`
- Menü: `GET /api/menu/:tenant`
- Sipariş: `POST /api/order/:tenant/:table_id`
- Mutfak siparişleri: `GET /api/kitchen/orders/:tenant`

---

## 📝 Loglama Middleware'i

Tüm API istekleri için method, URL, status code ve yanıt süresi backend konsoluna loglanır:
```
[2025-07-31T08:55:56.589Z] POST /api/order/Restaurant%20A/1 200 - Yanıt süresi: 104.13 ms
```

---

## 👥 Katkı Süreci

- Issue’lar üzerinden görev takibi yapılır
- Geliştirme branch’leri: feature/{issueId}-{ozellik} veya docs/{issueId}-...
- PR mesajlarına: Closes #{issueNumber} eklenir
- Katkı ve kod standartları için lütfen ilgili testleri çalıştırın

---

## 📌 Notlar

- Proje MVP aşamasındadır
- Ek özellikler (QR tarayıcı, durum güncellemeleri, CI/CD) ileriki milestone’larda ele alınacaktır
- Daha fazla bilgi için [restaurant-saas-spec.md](./restaurant-saas-spec.md) dosyasına bakınız

