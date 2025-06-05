# Restaurant SaaS

A SaaS restaurant system that enables QR code-based customer ordering and kitchen screen management.

## Project Structure

- `frontend/` — React-based UI for customers and kitchen
- `backend/` — Express + SQLite API service

## Setup

```bash
git clone <repo-url>
cd restaurant-saas
npm install
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