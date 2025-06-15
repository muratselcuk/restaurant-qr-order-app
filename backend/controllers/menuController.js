import db from '../db.js';

export async function getMenuItems(req, res) {
  try {
    const items = await db('menu_items').select('*').where({ tenant_id: 1 });
    res.json(items);
  } catch (err) {
    console.error('Menü alınırken hata oluştu:', err);
    res.status(500).json({ error: 'Menü verisi alınamadı' });
  }
}
