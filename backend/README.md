# QR Order Backend API

## Test Data (Seed Data)

- Tenant name: **Restaurant A**
- Tables:
  - Table 1 (ID: 1)
  - Table 2 (ID: 2)
- Menu Items:
  - Pizza (ID: 1)
  - Salad (ID: 2)
  - Drink (ID: 3)

## Endpoints

### GET /

Returns basic API status:

```json
{
  "message": "Backend is running.",
  "version": "1.0.0",
  "timestamp": "..."
}

### GET /order/:tenant/:table_id
- Returns table info and menu.

### POST /order/:tenant/:table_id
- Creates new order for given tenant and table_id.

```json
{
  "items": [
    { "menu_item_id": 1, "quantity": 2 },
    { "menu_item_id": 3, "quantity": 1 }
  ]
}
