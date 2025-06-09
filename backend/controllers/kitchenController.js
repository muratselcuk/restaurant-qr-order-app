import db from '../db.js';

export const getPendingOrders = async (req, res) => {
  const { tenant } = req.params;

  try {
    // Tenant id'yi bul
    const tenantRow = await db('tenants').where('name', tenant).first();
    if (!tenantRow) {
      return res.status(404).json({ error: 'Tenant not found' });
    }

    // Pending orders'ı çek
    const orders = await db('orders')
      .where({
        tenant_id: tenantRow.id,
        status: 'pending'
      })
      .select('id', 'table_id', 'created_at');

    // Her order için order_items + menu_items bilgilerini çekelim
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
          table_number: tableRow ? tableRow.table_number : null,
          status: 'pending',
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
