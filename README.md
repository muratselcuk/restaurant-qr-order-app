# Restaurant SaaS

A SaaS restaurant system that enables QR code-based customer ordering and kitchen screen management.

## Project Structure

- `frontend/` — React-based UI for customers and kitchen
- `backend/` — Express + SQLite API service

## Setup

```bash
git clone https://github.com/muratselcuk/restaurant-qr-order-app.git
cd restaurant-qr-order-app
```

#Database
```bash
npx knex migrate:latest --knexfile knexfile.js
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
