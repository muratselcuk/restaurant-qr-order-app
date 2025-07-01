# 🛠️ Backend - Restaurant QR Order App

Node.js, Express ve Knex ile geliştirilen backend uygulamasıdır. Menü, sipariş ve mutfak işlemlerini REST API üzerinden sunar.

---

## 🚀 Kurulum

```bash
cd backend
npm install
npx knex migrate:latest
npx knex seed:run
npm run dev
```

---

## 🔐 .env Dosyası

```env
PORT=3001
DATABASE_URL=sqlite3://./dev.sqlite3
```

> `DATABASE_URL` SQLite, PostgreSQL veya başka bir veritabanına göre değiştirilebilir.

---

## 📁 Önemli Dosyalar

- `routes/` → Menü, sipariş, mutfak için API uçları
- `controllers/` → İş mantığı: orderController.js, menuController.js, kitchenController.js
- `db.js` → Knex veritabanı bağlantısı
- `knexfile.js` → Knex yapılandırması

---

## 🧪 Test

Postman veya tarayıcıdan manuel test edilebilir:

- `GET /api/menu/:tenant`
- `POST /api/order/:tenant/:table_id`
- `GET /api/kitchen/orders/:tenant`

---

## 🗃️ Veritabanı

### Tablolar

- `tenants` → Çok kiracılı yapı için restoran tanımı
- `tables` → Masa bilgileri
- `menu_items` → Menüdeki ürünler
- `orders` → Sipariş kayıtları
- `order_items` → Siparişteki ürün detayları

> Tablolar Knex migration ile oluşturulmuştur.

---

## 📌 Katkı

- Kod katkısı için PR açılmadan önce `main` branch güncellenmelidir
- API davranışı değiştiriliyorsa ilgili controller test edilmelidir

## 🧪 Testler

### Backend
```bash
cd backend
npm test
```