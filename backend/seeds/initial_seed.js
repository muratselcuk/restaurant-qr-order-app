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
await knex('tenants').insert([
  { id: 1, name: 'Restaurant A' }
]);

// Tables
await knex('tables').insert([
  { id: 1, tenant_id: 1, name: 'Table 1', created_at: knex.fn.now() },
  { id: 2, tenant_id: 1, name: 'Table 2', created_at: knex.fn.now() }
]);

// Menu Items
await knex('menu_items').insert([
  { id: 1, tenant_id: 1, name: 'Pizza', price: 12.5, created_at: knex.fn.now() },
  { id: 2, tenant_id: 1, name: 'Salad', price: 7.0, created_at: knex.fn.now() },
  { id: 3, tenant_id: 1, name: 'Drink', price: 3.0, created_at: knex.fn.now() },
  { id: 4, tenant_id: 1, name: 'Burger', price: 10.0, created_at: knex.fn.now() },
  { id: 5, tenant_id: 1, name: 'Pasta', price: 11.0, created_at: knex.fn.now() }
]);

// Orders
await knex('orders').insert([
  { id: 1, tenant_id: 1, table_id: 1, status: 'open', created_at: knex.fn.now() },
  { id: 2, tenant_id: 1, table_id: 2, status: 'in_progress', created_at: knex.fn.now() },
  { id: 3, tenant_id: 1, table_id: 1, status: 'served', created_at: knex.fn.now() }
]);

// Order Items
await knex('order_items').insert([
  // Order 1 (open)
  { id: 1, order_id: 1, menu_item_id: 1, quantity: 2, created_at: knex.fn.now() },
  { id: 2, order_id: 1, menu_item_id: 3, quantity: 1, created_at: knex.fn.now() },

  // Order 2 (in_progress)
  { id: 3, order_id: 2, menu_item_id: 4, quantity: 1, created_at: knex.fn.now() },
  { id: 4, order_id: 2, menu_item_id: 2, quantity: 2, created_at: knex.fn.now() },

  // Order 3 (served)
  { id: 5, order_id: 3, menu_item_id: 5, quantity: 1, created_at: knex.fn.now() },
  { id: 6, order_id: 3, menu_item_id: 1, quantity: 1, created_at: knex.fn.now() }
]);

};