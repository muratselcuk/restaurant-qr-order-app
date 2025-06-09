/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTable('tenants', function(table) {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })
    .createTable('tables', function(table) {
      table.increments('id').primary();
      table.integer('tenant_id').references('id').inTable('tenants');
      table.string('name');
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })
    .createTable('menu_items', function(table) {
      table.increments('id').primary();
      table.integer('tenant_id').references('id').inTable('tenants');
      table.string('name').notNullable();
      table.decimal('price').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })
    .createTable('orders', function(table) {
      table.increments('id').primary();
      table.integer('tenant_id').references('id').inTable('tenants');
      table.integer('table_id').references('id').inTable('tables');
      table.string('status');
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })
    .createTable('order_items', function(table) {
      table.increments('id').primary();
      table.integer('order_id').references('id').inTable('orders');
      table.integer('menu_item_id').references('id').inTable('menu_items');
      table.integer('quantity').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('order_items')
    .dropTableIfExists('orders')
    .dropTableIfExists('menu_items')
    .dropTableIfExists('tables')
    .dropTableIfExists('tenants');
};

