# SPEC-001: SaaS Restaurant Management System

## Background

Modern restoranlar için QR kod ile sipariş, mutfak ekranı ve çoklu tenant (her restoran izole) desteği sunan, mobil uyumlu bir SaaS platformu.

---

## Requirements (Gereksinimler)

### Must Have
- Müşteri, QR kod ile masa seçip sipariş verebilmeli
- Menü yönetimi (kategori, ürün, fiyat)
- Mutfak ekranında sipariş takibi
- Çoklu tenant (her restoran izole)
- Tüm API istekleri için loglama (method, URL, status, yanıt süresi)

### Should Have
- Sipariş durum takibi (hazırlanıyor, hazır, vb.)
- Menüde not/çeşit desteği
- Mobil uyumlu arayüz

### Won't Have (initially)
- Rezervasyon
- Müşteri bilgisi saklama
- Ödeme ve faturalama
- 3. parti/POS entegrasyonu
- Garson ve admin paneli

---

## Method & Architecture

### Database Design (PostgreSQL)

| Table           | Description                                      |
|-----------------|--------------------------------------------------|
| tenants         | id, name, domain, created_at                     |
| tables          | id, tenant_id, name, qr_code, is_active          |
| menu_categories | id, tenant_id, name, display_order               |
| menu_items      | id, tenant_id, category_id, name, price, desc    |
| orders          | id, tenant_id, table_id, status, created_at      |
| order_items     | id, order_id, menu_item_id, quantity, note       |

### QR Code Order Flow

1. Müşteri QR kodu okur (`/start/:tenant`)
2. Masa numarası girer, menü listelenir
3. Sipariş verilir (API: `POST /api/order/:tenant/:table_id`)
4. Sipariş mutfak ekranında görünür (`/kitchen/:tenant`)

### Bileşenler

- **Frontend:**
  - Müşteri QR arayüzü
  - Mutfak paneli
- **Backend:**
  - REST API (Node.js + Express)
  - Loglama middleware’i
- **Veritabanı:**
  - PostgreSQL (veya SQLite dev için)

---

## Uçtan Uca Demo Akışı

1. `docker-compose up` ile tüm servisleri başlat
2. Müşteri: `http://localhost:3000/start/Restaurant%20A` → masa gir → menüden sipariş ver
3. Mutfak: `http://localhost:3000/kitchen/Restaurant%20A` → siparişi gör
4. Sipariş verildiğinde backend konsolunda log oluşur:
   ```
   [2025-07-31T08:55:56.589Z] POST /api/order/Restaurant%20A/1 200 - Yanıt süresi: 104.13 ms
   ```
5. Çoklu tenant için farklı tenant kodları ile aynı akış tekrar edilebilir

---

## Geliştirme ve Test

- Her klasör bağımsız geliştirilir (backend, frontend)
- Testler: `npm test` (her klasörde)
- Demo ve test akışı için [DEMO.md](./DEMO.md) dosyasına bakınız

---

## Milestones
- M1: Sistem iskeleti ve temel veri modeli
- M2: QR tabanlı müşteri siparişi ve mutfak paneli
- M3: Ek modüller (admin, garson, durum yönetimi)
- M4: İlk deploy ve pilot test

---

## Notlar
- Proje MVP olarak tamamlanmıştır
- Ek özellikler ve entegrasyonlar için issue/pull request açılabilir
