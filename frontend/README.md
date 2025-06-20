# 🧩 Frontend - Restaurant QR Order App

React + Vite tabanlı frontend uygulamasıdır. Kullanıcıların menüleri görüntülemesi, ürünleri sepete eklemesi ve sipariş vermesi sağlanır.

---

## 🚀 Kurulum

```bash
cd frontend
npm install
npm run dev
```

---

## 📁 Önemli Dosyalar

- `src/pages/OrderPage.jsx` → Menü ve sipariş ekranı
- `src/pages/TableInputPage.jsx` → Masa numarası giriş ekranı
- `src/pages/KitchenPage.jsx` → Mutfak sipariş ekranı
- `src/components/Cart.jsx` → Sepet bileşeni
- `src/components/CategoryList.jsx` → Menü kategorileri

---

## 🧪 Test

Manuel olarak test edilir:

- `http://localhost:3000/start/RestaurantA` → müşteri girişi
- `http://localhost:3000/kitchen/RestaurantA` → mutfak ekranı

---

## 🔧 Notlar

- Vite kullanıldığından `import.meta.env` ile ortam değişkenleri okunur.
- Her sayfa `react-router-dom` ile yönlendirilmiştir.
- Tailwind veya özel CSS henüz eklenmemiştir (isteğe bağlıdır).

---

## 📌 Katkı

- Geliştirme branch: `feature/{issueId}-{özellik}`
- Kod değişiklikleri PR ile ana dala (main) merge edilir

