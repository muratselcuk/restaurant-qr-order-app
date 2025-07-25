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

// Tenants
await knex('tenants').insert([{ id: 1, name: 'Restaurant A' }]);

// Tables (id'leri al)
const tableRows = await knex('tables').insert([
  { id: 1, tenant_id: 1, name: 'Table 1', created_at: knex.fn.now() },
  { id: 2, tenant_id: 1, name: 'Table 2', created_at: knex.fn.now() }
]).returning(['id', 'name']);

// Menu Items
const menuItemRows = await knex('menu_items').insert([
  { tenant_id: 1, name: 'Bruschetta', price: 6.5, created_at: knex.fn.now(), category: 'Starters' },
  { tenant_id: 1, name: 'Garlic Bread', price: 5.0, created_at: knex.fn.now(), category: 'Starters' },
  { tenant_id: 1, name: 'Pizza', price: 12.5, created_at: knex.fn.now(), category: 'Main Courses' },
  { tenant_id: 1, name: 'Pasta', price: 11.0, created_at: knex.fn.now(), category: 'Main Courses' },
  { tenant_id: 1, name: 'Limonata', price: 4.5, created_at: knex.fn.now(), category: 'Drinks' }
]).returning(['id', 'name']);

// Orders (table_id'leri yukarıdan al)
const orderRows = await knex('orders').insert([
  { tenant_id: 1, table_id: tableRows[0].id, status: 'open', created_at: knex.fn.now() },
  { tenant_id: 1, table_id: tableRows[1].id, status: 'in_progress', created_at: knex.fn.now() },
  { tenant_id: 1, table_id: tableRows[0].id, status: 'served', created_at: knex.fn.now() }
]).returning('id');

// Order Items (order_id'leri ve menu_item_id'leri yukarıdan al)
await knex('order_items').insert([
  // Order 1 (open)
  { order_id: orderRows[0].id, menu_item_id: menuItemRows[0].id, quantity: 2, created_at: knex.fn.now() },
  { order_id: orderRows[0].id, menu_item_id: menuItemRows[2].id, quantity: 1, created_at: knex.fn.now() },

  // Order 2 (in_progress)
  { order_id: orderRows[1].id, menu_item_id: menuItemRows[3].id, quantity: 1, created_at: knex.fn.now() },
  { order_id: orderRows[1].id, menu_item_id: menuItemRows[1].id, quantity: 2, created_at: knex.fn.now() },

  // Order 3 (served)
  { order_id: orderRows[2].id, menu_item_id: menuItemRows[4].id, quantity: 1, created_at: knex.fn.now() },
  { order_id: orderRows[2].id, menu_item_id: menuItemRows[0].id, quantity: 1, created_at: knex.fn.now() }
]);

};