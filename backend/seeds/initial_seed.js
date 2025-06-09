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
    { id: 1, tenant_id: 1, table_number: 'Table 1' },
    { id: 2, tenant_id: 1, table_number: 'Table 2' }
  ]);

  // Menu_items
  await knex('menu_items').insert([
    { id: 1, tenant_id: 1, name: 'Pizza', price: 12.5 },
    { id: 2, tenant_id: 1, name: 'Salad', price: 7.0 },
    { id: 3, tenant_id: 1, name: 'Drink', price: 3.0 }
  ]);
};