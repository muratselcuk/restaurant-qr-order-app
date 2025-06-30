import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function KitchenPage() {
  const { tenantCode } = useParams();
  const [orders, setOrders] = useState([]);

  // fetchOrders fonksiyonunu en üste taşı
  const fetchOrders = async () => {
    try {
      const res = await fetch(`/api/kitchen/${tenantCode}/orders`);
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error("Siparişler alınamadı:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [tenantCode]);

  const markAsReady = async (orderId) => {
    try {
      const res = await fetch(
        `/api/kitchen/${tenantCode}/orders/${orderId}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: 'done' }),
        }
      );
      if (!res.ok) throw new Error('Durum güncelleme başarısız');
      fetchOrders(); // listeyi yenile
    } catch (err) {
      console.error(err);
      alert('Durum güncellenemedi');
    }
  };

  return (
    <div>
      <h2>Mutfak Ekranı</h2>
      {orders.map(order => (
        <div
          key={order.order_id}
          style={{ border: '1px solid #ccc', marginBottom: '10px', padding: '10px' }}
        >
          <h3>Masa: {order.name || order.table_id}</h3>
          <p><strong>Sipariş No:</strong> {order.order_id}</p>
          <p>
            <strong>Oluşturulma:</strong>{' '}
            {new Date(order.created_at).toLocaleTimeString()}
          </p>
          <ul>
            {order.items.map(item => (
              <li key={item.menu_item_id}>
                {item.name} x {item.quantity}
              </li>
            ))}
          </ul>
          {order.status !== 'done' && (
            <button onClick={() => markAsReady(order.order_id)}>
              Hazırlandı
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default KitchenPage;