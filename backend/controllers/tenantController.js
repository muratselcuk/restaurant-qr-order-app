import db from '../db.js';

// Tüm tenant'ları getir
export const getAllTenants = async (req, res) => {
  try {
    const tenants = await db('tenants')
      .select('id', 'name')
      .orderBy('name');

    res.json(tenants);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Belirli bir tenant'ın masalarını getir
export const getTenantTables = async (req, res) => {
  const { tenant } = req.params;

  try {
    const tenantRow = await db('tenants').where('name', tenant).first();
    if (!tenantRow) {
      return res.status(404).json({ error: 'Tenant not found' });
    }

    const tables = await db('tables')
      .where({ tenant_id: tenantRow.id })
      .select('id', 'name')
      .orderBy('name');

    res.json(tables);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}; 