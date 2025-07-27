import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars

function KitchenPage() {
  const { tenantCode } = useParams();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/kitchen/${tenantCode}/orders`);
      if (!res.ok) throw new Error('Siparişler alınamadı');
      const data = await res.json();
      setOrders(data);
      setError(null);
    } catch (err) {
      console.error("Siparişler alınamadı:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [tenantCode]);

  useEffect(() => {
    fetchOrders();
    // Her 30 saniyede bir siparişleri güncelle
    const interval = setInterval(fetchOrders, 30000);
    return () => clearInterval(interval);
  }, [tenantCode, fetchOrders]);

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
      fetchOrders();
    } catch (err) {
      console.error(err);
      alert('Durum güncellenemedi');
    }
  };

  const getStatusColor = (status) => {
    return status === 'done' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';
  };

  const getStatusText = (status) => {
    return status === 'done' ? 'Hazır' : 'Hazırlanıyor';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Siparişler yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <p className="text-lg text-red-600 mb-2">Hata oluştu</p>
          <p className="text-gray-600 mb-4">{error}</p>
          <button onClick={fetchOrders} className="btn-primary">
            Tekrar Dene
          </button>
        </div>
      </div>
    );
  }

  const pendingOrders = orders.filter(order => order.status !== 'done');
  const completedOrders = orders.filter(order => order.status === 'done');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.div 
        className="bg-white shadow-sm border-b"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Mutfak Ekranı</h1>
              <p className="text-gray-600 mt-1">{tenantCode}</p>
            </motion.div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={fetchOrders}
                className="btn-secondary flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>Yenile</span>
              </button>
              <div className="text-right">
                <div className="text-sm text-gray-500">Toplam Sipariş</div>
                <div className="text-2xl font-bold text-gray-900">{orders.length}</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pending Orders */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
              Bekleyen Siparişler ({pendingOrders.length})
            </h2>
            <div className="space-y-4">
              {pendingOrders.length === 0 ? (
                <div className="text-center py-8 bg-white rounded-lg border-2 border-dashed border-gray-300">
                  <div className="text-gray-400 text-6xl mb-4">🍽️</div>
                  <p className="text-gray-500">Bekleyen sipariş yok</p>
                </div>
              ) : (
                pendingOrders.map((order, index) => (
                  <motion.div 
                    key={order.order_id} 
                    className="card border-l-4 border-l-yellow-500"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: index * 0.1,
                      ease: "easeOut"
                    }}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Masa {order.name || order.table_id}
                        </h3>
                        <p className="text-sm text-gray-600">Sipariş #{order.order_id}</p>
                      </div>
                      <div className="text-right">
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {getStatusText(order.status)}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(order.created_at).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 mb-2">Sipariş Detayı:</h4>
                      <div className="space-y-2">
                        {order.items.map(item => (
                          <div key={item.menu_item_id} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                            <span className="font-medium">{item.name}</span>
                            <span className="bg-primary-500 text-white px-2 py-1 rounded-full text-sm font-medium">
                              {item.quantity}x
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <motion.button 
                      onClick={() => markAsReady(order.order_id)}
                      className="w-full btn-primary"
                      whileHover={{ 
                        scale: 1.02,
                        boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
                      }}
                      whileTap={{ 
                        scale: 0.98,
                        boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
                      }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 400, 
                        damping: 17 
                      }}
                    >
                      Hazırlandı Olarak İşaretle
                    </motion.button>
                  </motion.div>
                ))
              )}
            </div>
          </div>

          {/* Completed Orders */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
              Tamamlanan Siparişler ({completedOrders.length})
            </h2>
            <div className="space-y-4">
              {completedOrders.length === 0 ? (
                <div className="text-center py-8 bg-white rounded-lg border-2 border-dashed border-gray-300">
                  <div className="text-gray-400 text-6xl mb-4">✅</div>
                  <p className="text-gray-500">Tamamlanan sipariş yok</p>
                </div>
              ) : (
                completedOrders.slice(-5).map((order, index) => (
                  <motion.div 
                    key={order.order_id} 
                    className="card border-l-4 border-l-green-500 opacity-75"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 0.75, x: 0 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: index * 0.1,
                      ease: "easeOut"
                    }}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Masa {order.name || order.table_id}
                        </h3>
                        <p className="text-sm text-gray-600">Sipariş #{order.order_id}</p>
                      </div>
                      <div className="text-right">
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {getStatusText(order.status)}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(order.created_at).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      {order.items.map(item => (
                        <div key={item.menu_item_id} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                          <span className="font-medium">{item.name}</span>
                          <span className="bg-green-500 text-white px-2 py-1 rounded-full text-sm font-medium">
                            {item.quantity}x
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default KitchenPage;