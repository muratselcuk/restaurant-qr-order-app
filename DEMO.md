# DEMO: Restaurant QR Order App

Bu kılavuz, projenin uçtan uca demo akışını ve temel kullanım senaryolarını adım adım açıklar.

---

## 1. Projeyi Başlatma

```bash
docker-compose up
```
- Tüm servisler (backend, frontend, veritabanı) otomatik olarak başlatılır.
- Backend: http://localhost:3001
- Frontend: http://localhost:3000

---

## 2. Müşteri Akışı: QR Kod ile Sipariş

### 2.1. QR Kod Simülasyonu ve Masa Girişi
- Tarayıcıda şu URL’yi açın:
  ```
  http://localhost:3000/start/Restaurant%20A
  ```
- Açılan ekranda masa numarasını girin (ör: `1`).
- Menü ekranına yönlendirilirsiniz.

### 2.2. Menüden Ürün Seçimi ve Sipariş
- Menüden ürün(ler) seçin, sepete ekleyin.
- "Siparişi Gönder" butonuna tıklayın.
- Başarılı sipariş sonrası onay mesajı görünür.

#### Beklenen API Çağrısı:
```
POST /api/order/Restaurant%20A/1
```
- Body: Seçilen ürünler ve adetleri
- Response: Sipariş başarıyla oluşturuldu mesajı

---

## 3. Mutfak Paneli: Siparişleri Görüntüleme

- Tarayıcıda şu URL’yi açın:
  ```
  http://localhost:3000/kitchen/Restaurant%20A
  ```
- Açık siparişler burada listelenir.
- Sipariş detayları ve masa numarası görüntülenir.

#### Beklenen API Çağrısı:
```
GET /api/kitchen/orders/Restaurant%20A
```
- Response: Açık siparişlerin listesi (JSON)

---

## 4. Çoklu Tenant (Restoran) Desteği
- Her restoran için ayrı bir tenant kodu kullanılır (örn. `Restaurant A`, `Restaurant B`).
- Demo için farklı tenant’lar ile yukarıdaki adımlar tekrar edilebilir:
  - `http://localhost:3000/start/Restaurant%20B`
  - `http://localhost:3000/kitchen/Restaurant%20B`

---

## 5. Ek Notlar ve Beklenen Çıktılar
- Sipariş verildiğinde backend konsolunda log kaydı oluşur:
  ```
  [2025-07-31T08:55:56.589Z] POST /api/order/RestaurantA/12 200 - Yanıt süresi: 104.13 ms
  ```
- Menü, sipariş ve mutfak API uçları:
  - `GET /api/menu/:tenant`
  - `POST /api/order/:tenant/:table_id`
  - `GET /api/kitchen/orders/:tenant`
- Demo sırasında oluşan örnek JSON response’ları için Postman veya tarayıcı kullanılabilir.

---

## 6. Test ve Kapanış
- Demo sonunda tüm servisler `docker-compose down` ile durdurulabilir.
- Geliştirici/tester, yukarıdaki adımları izleyerek sistemin temel işlevlerini kolayca gösterebilir.

---

> Daha fazla bilgi için README.md ve restaurant-saas-spec.md dosyalarına bakınız.