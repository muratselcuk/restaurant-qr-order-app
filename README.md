# 🍽️ Restaurant QR Order App (MVP)

Bu proje, restoran müşterilerinin QR kod okuyarak kendi telefonları üzerinden sipariş vermelerini sağlar. Aynı zamanda mutfak çalışanları için siparişleri görüntüleyebilecekleri bir panel içerir.

## 📂 Klasör Yapısı

```
restaurant-qr-order-app/
├── backend/       → Node.js + Express + Knex
├── frontend/      → React + Vite
└── README.md      → Genel proje açıklaması
```

## Setup

```bash
git clone https://github.com/muratselcuk/restaurant-qr-order-app.git
cd restaurant-qr-order-app
```

## Database
```bash
cd backend
npx knex migrate:latest --knexfile knexfile.js
npx knex seed:run --knexfile knexfile.js
```

## Development

Each folder is developed independently:

```bash
cd backend
npm install
npm run dev

cd ../frontend
npm install
npm run dev
```

## 🧪 Kullanım

### Müşteri Ekranı

QR kod simülasyonu için aşağıdaki URL’yi tarayıcıda aç:

``` http://localhost:3001/start/RestaurantA ```

- Masa numarası input ile girilir
- Sipariş ekranına yönlendirilir

### Mutfak Ekranı

Açık siparişleri görüntülemek için:
```
http://localhost:3001/kitchen/RestaurantA
```

## 📱 API Uçları

### Menü

```
GET /api/menu/:tenant
```

### Sipariş

```
POST /api/order/:tenant/:table_id
```

### Mutfak

```
GET /api/kitchen/orders/:tenant
```


## 👥 Katkı Süreci

- Issue’lar üzerinden görev takibi yapılır
- Geliştirme branch’leri: feature/{issueId}-{ozellik}
- PR mesajlarına: Closes #{issueNumber} eklenir

## 📌 Notlar

- Proje MVP aşamasındadır
- Ek özellikler (QR tarayıcı, durum güncellemeleri, CI/CD) ileriki milestone’larda ele alınacaktır

