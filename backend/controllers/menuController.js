import db from '../db.js';

export async function getMenuItems(req, res) {
  const { tenant } = req.params;
  const tenant_id = 1; // geçici, ileride tenant eşleşmesi yapılabilir

  try {
    const items = await db('menu_items')
      .select('*')
      .where({ tenant_id });

    // Kategorilere göre grupla
    const grouped = items.reduce((acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    }, {});

    // Gruplanan objeyi frontend'e uygun forma sok
    const result = Object.entries(grouped).map(([category, items], index) => ({
      id: index + 1,
      name: category,
      items,
    }));

    res.json(result);
  } catch (err) {
    console.error('Menü alınırken hata:', err);
    res.status(500).json({ error: 'Menü alınamadı' });
  }
}
