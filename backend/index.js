import express from 'express';
import knex from 'knex';
import knexConfig from './knexfile.js';

const app = express();
const PORT = process.env.PORT || 3001;

const db = knex(knexConfig.development);


app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend is running.');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// QR Menü API
app.get('/order/:tenant/:table_id', async (req, res) => {
  const { tenant, table_id } = req.params;

  try {
    // Tenant id'yi bul
    const tenantRow = await db('tenants').where('name', tenant).first();
    if (!tenantRow) {
      return res.status(404).json({ error: 'Tenant not found' });
    }

    // Masa bilgisi
    const table = await db('tables')
      .where({ id: table_id, tenant_id: tenantRow.id })
      .first();

    if (!table) {
      return res.status(404).json({ error: 'Table not found' });
    }

    // Menu Items
    const menuItems = await db('menu_items')
      .where({ tenant_id: tenantRow.id })
      .select('id', 'name', 'price');

    // Response
    res.json({
      table: {
        id: table.id,
        table_number: table.table_number
      },
      menu: menuItems
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});
