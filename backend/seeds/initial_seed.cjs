/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('order_items').del();
await knex('orders').del();
await knex('menu_items').del();
await knex('tables').del();
await knex('tenants').del();

// Tenants - Çoklu tenant için
await knex('tenants').insert([
  { id: 1, name: 'Restaurant A' },
  { id: 2, name: 'Restaurant B' },
  { id: 3, name: 'Cafe Central' }
]);

// Tables - Her tenant için masalar
const tableRows = await knex('tables').insert([
  // Restaurant A masaları
  { id: 1, tenant_id: 1, name: 'Table 1', created_at: knex.fn.now() },
  { id: 2, tenant_id: 1, name: 'Table 2', created_at: knex.fn.now() },
  { id: 3, tenant_id: 1, name: 'Table 3', created_at: knex.fn.now() },
  
  // Restaurant B masaları
  { id: 4, tenant_id: 2, name: 'Table 1', created_at: knex.fn.now() },
  { id: 5, tenant_id: 2, name: 'Table 2', created_at: knex.fn.now() },
  { id: 6, tenant_id: 2, name: 'Table 3', created_at: knex.fn.now() },
  { id: 7, tenant_id: 2, name: 'Table 4', created_at: knex.fn.now() },
  
  // Cafe Central masaları
  { id: 8, tenant_id: 3, name: 'Table 1', created_at: knex.fn.now() },
  { id: 9, tenant_id: 3, name: 'Table 2', created_at: knex.fn.now() }
]).returning(['id', 'name']);

// Menu Items - Her tenant için menü öğeleri
const menuItemRows = await knex('menu_items').insert([
  // Restaurant A menüsü
  { tenant_id: 1, name: 'Bruschetta', price: 6.5, created_at: knex.fn.now(), category: 'Starters' },
  { tenant_id: 1, name: 'Garlic Bread', price: 5.0, created_at: knex.fn.now(), category: 'Starters' },
  { tenant_id: 1, name: 'Pizza', price: 12.5, created_at: knex.fn.now(), category: 'Main Courses' },
  { tenant_id: 1, name: 'Pasta', price: 11.0, created_at: knex.fn.now(), category: 'Main Courses' },
  { tenant_id: 1, name: 'Limonata', price: 4.5, created_at: knex.fn.now(), category: 'Drinks' },
  
  // Restaurant B menüsü
  { tenant_id: 2, name: 'Sushi Roll', price: 8.5, created_at: knex.fn.now(), category: 'Starters' },
  { tenant_id: 2, name: 'Miso Soup', price: 4.0, created_at: knex.fn.now(), category: 'Starters' },
  { tenant_id: 2, name: 'Ramen', price: 14.0, created_at: knex.fn.now(), category: 'Main Courses' },
  { tenant_id: 2, name: 'Sushi Set', price: 18.0, created_at: knex.fn.now(), category: 'Main Courses' },
  { tenant_id: 2, name: 'Green Tea', price: 3.0, created_at: knex.fn.now(), category: 'Drinks' },
  
  // Cafe Central menüsü
  { tenant_id: 3, name: 'Croissant', price: 3.5, created_at: knex.fn.now(), category: 'Breakfast' },
  { tenant_id: 3, name: 'Sandwich', price: 7.0, created_at: knex.fn.now(), category: 'Lunch' },
  { tenant_id: 3, name: 'Coffee', price: 4.0, created_at: knex.fn.now(), category: 'Drinks' },
  { tenant_id: 3, name: 'Cake', price: 5.5, created_at: knex.fn.now(), category: 'Desserts' }
]).returning(['id', 'name']);

// Orders (table_id'leri yukarıdan al)
const orderRows = await knex('orders').insert([
  { tenant_id: 1, table_id: tableRows[0].id, status: 'open', created_at: knex.fn.now() },
  { tenant_id: 1, table_id: tableRows[1].id, status: 'preparing', created_at: knex.fn.now() },
  { tenant_id: 2, table_id: tableRows[3].id, status: 'open', created_at: knex.fn.now() },
  { tenant_id: 3, table_id: tableRows[7].id, status: 'done', created_at: knex.fn.now() }
]).returning('id');

// Order Items (order_id'leri ve menu_item_id'leri yukarıdan al)
await knex('order_items').insert([
  // Restaurant A - Order 1 (open)
  { order_id: orderRows[0].id, menu_item_id: menuItemRows[0].id, quantity: 2, created_at: knex.fn.now() },
  { order_id: orderRows[0].id, menu_item_id: menuItemRows[2].id, quantity: 1, created_at: knex.fn.now() },

  // Restaurant A - Order 2 (preparing)
  { order_id: orderRows[1].id, menu_item_id: menuItemRows[3].id, quantity: 1, created_at: knex.fn.now() },
  { order_id: orderRows[1].id, menu_item_id: menuItemRows[1].id, quantity: 2, created_at: knex.fn.now() },

  // Restaurant B - Order 3 (open)
  { order_id: orderRows[2].id, menu_item_id: menuItemRows[5].id, quantity: 1, created_at: knex.fn.now() },
  { order_id: orderRows[2].id, menu_item_id: menuItemRows[8].id, quantity: 1, created_at: knex.fn.now() },

  // Cafe Central - Order 4 (done)
  { order_id: orderRows[3].id, menu_item_id: menuItemRows[10].id, quantity: 1, created_at: knex.fn.now() },
  { order_id: orderRows[3].id, menu_item_id: menuItemRows[12].id, quantity: 2, created_at: knex.fn.now() }
]);

};