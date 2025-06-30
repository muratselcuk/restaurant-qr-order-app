import db from '../db.js';

export const getOpenOrders = async (req, res) => {
  const { tenant } = req.params;

  try {
    // Find tenant id
    const tenantRow = await db('tenants').where('name', tenant).first();
    if (!tenantRow) {
      return res.status(404).json({ error: 'Tenant not found' });
    }

   // Fetch open orders
    const orders = await db('orders')
      .where({
        tenant_id: tenantRow.id,
        status: 'open'
      })
      .select('id', 'table_id', 'created_at');

    // Get order_items + menu_items information
    const ordersWithItems = await Promise.all(
      orders.map(async (order) => {
        const tableRow = await db('tables').where('id', order.table_id).first();

        const items = await db('order_items')
          .join('menu_items', 'order_items.menu_item_id', 'menu_items.id')
          .where('order_items.order_id', order.id)
          .select(
            'order_items.menu_item_id',
            'menu_items.name',
            'order_items.quantity'
          );

        return {
          order_id: order.id,
          table_id: order.table_id,
          name: tableRow ? tableRow.name : null,
          status: 'open',
          items,
          created_at: order.created_at
        };
      })
    );

    res.json(ordersWithItems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get order details
export const getOrderDetails = async (req, res) => {
  const { tenant, order_id } = req.params;

  try {
    // Tenant id'yi bul
    const tenantRow = await db('tenants').where('name', tenant).first();
    if (!tenantRow) {
      return res.status(404).json({ error: 'Tenant not found' });
    }

    // Order bilgisi
    const order = await db('orders')
      .where({
        id: order_id,
        tenant_id: tenantRow.id
      })
      .first();

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Table bilgisi
    const tableRow = await db('tables').where('id', order.table_id).first();

    // Items bilgisi
    const items = await db('order_items')
      .join('menu_items', 'order_items.menu_item_id', 'menu_items.id')
      .where('order_items.order_id', order.id)
      .select(
        'order_items.menu_item_id',
        'menu_items.name',
        'order_items.quantity'
      );

    // Response
    res.json({
      order_id: order.id,
      table_id: order.table_id,
      table_name: tableRow ? tableRow.name : null,
      status: order.status,
      items,
      created_at: order.created_at
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateOrderStatus = async (req, res) => {
  const { tenant, order_id } = req.params;
  const { status } = req.body;

  if (!["preparing", "done"].includes(status)) {
    return res.status(400).json({ error: "Invalid status value" });
  }

  try {
    const tenantRow = await db('tenants').where('name', tenant).first();
    if (!tenantRow) {
      return res.status(404).json({ error: 'Tenant not found' });
    }

    const order = await db('orders')
      .where({ id: order_id, tenant_id: tenantRow.id })
      .first();

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    await db('orders')
      .where({ id: order.id })
      .update({ status });

    res.status(200).json({ message: 'Order status updated', status });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

