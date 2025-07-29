import db from '../db.js';

export const getOrder = async (req, res) => {
  const { tenant, table_id } = req.params;

  try {
    const tenantRow = await db('tenants').where('name', tenant).first();
    if (!tenantRow) {
      return res.status(404).json({ error: 'Tenant not found' });
    }

    const table = await db('tables')
      .where({ id: table_id, tenant_id: tenantRow.id })
      .first();

    if (!table) {
      return res.status(404).json({ error: 'Table not found' });
    }

    const menuItems = await db('menu_items')
      .where({ tenant_id: tenantRow.id })
      .select('id', 'name', 'price');

    res.json({
      table: {
        id: table.id,
        name: table.name
      },
      menu: menuItems
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createOrder = async (req, res) => {
  const { tenant, table_id } = req.params;
  const { items } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Invalid items payload' });
  }

  try {
    const tenantRow = await db('tenants').where('name', tenant).first();
    if (!tenantRow) {
      return res.status(404).json({ error: 'Tenant not found' });
    }

    const table = await db('tables')
      .where({ id: table_id, tenant_id: tenantRow.id })
      .first();

    if (!table) {
      return res.status(404).json({ error: 'Table not found' });
    }

    // DÜZELTME: .returning('id') ekle
    const [orderIdObj] = await db('orders').insert({
      tenant_id: tenantRow.id,
      table_id: table.id,
      status: 'open'
    }).returning('id');
    const orderId = orderIdObj.id;

    const orderItemsData = items.map(item => ({
      order_id: orderId,
      menu_item_id: item.menu_item_id,
      quantity: item.quantity
    }));

    await db('order_items').insert(orderItemsData);

    res.status(201).json({
      message: 'Order created successfully',
      order_id: orderId
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Sipariş durumu kontrolü için yeni fonksiyon
export const getOrderStatus = async (req, res) => {
  const { tenant, table_id, order_id } = req.params;

  try {
    const tenantRow = await db('tenants').where('name', tenant).first();
    if (!tenantRow) {
      return res.status(404).json({ error: 'Tenant not found' });
    }

    const table = await db('tables')
      .where({ id: table_id, tenant_id: tenantRow.id })
      .first();

    if (!table) {
      return res.status(404).json({ error: 'Table not found' });
    }

    const order = await db('orders')
      .where({ 
        id: order_id, 
        tenant_id: tenantRow.id,
        table_id: table_id 
      })
      .first();

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json({
      order_id: order.id,
      status: order.status,
      created_at: order.created_at
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
