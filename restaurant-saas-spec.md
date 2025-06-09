# SPEC-001: SaaS Restaurant Management System

## Background

Many restaurants manage tables and orders using traditional methods. This increases inefficiency, confusion, and error rates. Modern restaurants want to manage order taking, table management, and kitchen coordination from a single platform. To meet this need, a SaaS-based, mobile-friendly restaurant management system is being developed.

## Requirements

### Must Have
- Customer order via QR code linked to the table
- Menu management (categories, items, prices)
- Kitchen screen order tracking
- Multi-tenant structure (each restaurant separated)

### Should Have
- Order status tracking (preparing, ready, etc.)
- Menu notes / variation support
- Mobile-friendly responsive UI

### Won't Have (initially)
- Table reservation
- Customer information storage
- Payment and invoicing system
- Third-party / POS integrations
- Waiter panel
- Admin panel

## Method

### Database Design (SQLite → PostgreSQL)

Initially using SQLite. Migration to PostgreSQL planned after initial development.

| Table | Description |
|--------|------------------------------------------------------------|
| tenants | id, name, domain, created_at |
| users | id, tenant_id, name, email, password_hash, role (admin/waiter/kitchen), created_at |
| tables | id, tenant_id, name, qr_code, is_active |
| menu_categories | id, tenant_id, name, display_order |
| menu_items | id, tenant_id, category_id, name, price, description |
| orders | id, tenant_id, table_id, status (open/in_progress/served), created_at |
| order_items | id, order_id, menu_item_id, quantity, note |

### QR Code Order Flow

QR code: `https://app.com/order/{tenant_code}/{table_id}`

1. Customer scans the QR code
2. System fetches table and restaurant info
3. Order screen opens, menu is listed
4. Customer places the order, which appears on the kitchen screen

### Components and Architecture

**Frontend:**  
- Kitchen Panel  
- Customer QR Interface  

**Backend (API):**  
- REST API  
- Tenant Orchestration  

**Database:**  
- SQLite (dev) / PostgreSQL (prod)  

**Connections:**  
- Kitchen Panel → REST API → Database  
- Customer QR Interface → REST API → Database  

## Implementation

1. **Project Setup**
   - Monorepo setup (e.g. Turborepo / Nx)
   - Backend (Node.js + Express) and frontend (React) project initiation

2. **Database Layer**
   - Start development with SQLite
   - Define data model and migrations using ORM (Knex)
   - Prepare migration plan to PostgreSQL

3. **QR Flow Development (Phase 1)**
   - Menu management (initial hardcoded data in backend)
   - QR link generation
   - Customer order flow via QR and order creation
   - Kitchen panel displays orders

4. **Advanced Modules (Phase 2)**
   - Admin panel (menu and table management)
   - Waiter panel (table selection, order taking)
   - Order status management and updates
   - Role-based authorization

5. **Deployment (Initial Version)**
   - Dockerized application
   - Staging deployment on domain-mapped Raspberry Pi
   - Running backend and database on Raspberry Pi with SQLite

## Milestones

- M1: System skeleton and basic data model (1 week)
- M2: QR-based customer order and kitchen panel (2 weeks)
- M3: Admin/waiter panels and order management (2 weeks)
- M4: Initial version deploy (1 week)

## Gathering Results

- Conduct pilot testing with test restaurants
- Collect feedback from waiters, kitchen staff, and customers
- Measure functionality, performance, and error rates
- Prioritize additional features post-MVP
