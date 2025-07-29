import { useParams } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars

import CategoryList from '../components/CategoryList';
import Cart from '../components/Cart';

function OrderPage() {
  const { tenantCode, tableId } = useParams();
  const [cart, setCart] = useState([]);
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Sipariş durumu takibi için yeni state'ler
  const [currentOrder, setCurrentOrder] = useState(null);
  const [orderStatus, setOrderStatus] = useState(null);
  const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);
  const [statusPolling, setStatusPolling] = useState(false);

  // Sipariş durumunu kontrol eden fonksiyon
  const checkOrderStatus = useCallback(async (orderId) => {
    try {
      const response = await fetch(`/api/order/${tenantCode}/${tableId}/${orderId}/status`);
      if (response.ok) {
        const data = await response.json();
        setOrderStatus(data.status);
        
        // Eğer sipariş tamamlandıysa polling'i durdur
        if (data.status === 'done') {
          setStatusPolling(false);
        }
      }
    } catch (error) {
      console.error('Sipariş durumu kontrol edilemedi:', error);
    }
  }, [tenantCode, tableId]);

  // Polling effect'i
  useEffect(() => {
    let interval;
    if (statusPolling && currentOrder) {
      interval = setInterval(() => {
        checkOrderStatus(currentOrder.order_id);
      }, 5000); // 5 saniyede bir kontrol et
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [statusPolling, currentOrder, checkOrderStatus]);

    useEffect(() => {
    const fetchMenu = async () => {
        try {
        const response = await fetch(`/api/menu/${tenantCode}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setMenu(data);
        setError(null);
        } catch (error) {
        setError(error.message);
        setMenu([]); // Hata durumunda boş array set et
        } finally {
        setLoading(false);
        }
    };

    fetchMenu();
    }, [tenantCode]);

const handleAddToCart = (item) => {
  setCart(prevCart => {
    const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      // Eğer ürün zaten sepette varsa → adeti arttır
      return prevCart.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
    } else {
      // Ürün ilk kez sepete ekleniyorsa → quantity 1 ile ekle
      return [...prevCart, { ...item, quantity: 1 }];
    }
  });
};

const handleSubmitOrder = async () => {
  if (cart.length === 0) {
    alert('Sepet boş!');
    return;
  }

  const orderPayload = {
    items: cart.map(item => ({
      menu_item_id: item.id,
      quantity: item.quantity,
      note: '' // ileride not ekleme yapılabilir
    }))
  };

  try {
    const response = await fetch(`/api/order/${tenantCode}/${tableId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderPayload)
    });

    if (response.ok) {
      const orderData = await response.json();
      
      // Sipariş onay banner'ını göster
      setShowOrderConfirmation(true);
      setCurrentOrder(orderData);
      setOrderStatus('open');
      setStatusPolling(true);
      
      // Sepeti temizle
      setCart([]);
      
      // 5 saniye sonra banner'ı gizle
      setTimeout(() => {
        setShowOrderConfirmation(false);
      }, 5000);
      
    } else {
      alert('Sipariş gönderilirken hata oluştu.');
    }
  } catch (error) {
    console.error('Hata:', error);
    alert('Sipariş gönderilirken bir hata oluştu.');
  }
};

const handleRemoveFromCart = (itemId) => {
  setCart(prevCart => prevCart.filter(item => item.id !== itemId));
};
      if (loading) return (
        <motion.div 
          className="flex items-center justify-center min-h-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center">
            <motion.div 
              className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            ></motion.div>
            <p className="text-lg text-gray-600">Menü yükleniyor...</p>
          </div>
        </motion.div>
      );
      
      if (error) return (
        <motion.div 
          className="flex items-center justify-center min-h-screen"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center">
            <motion.div 
              className="text-red-500 text-6xl mb-4"
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.5, repeat: 2 }}
            >⚠️</motion.div>
            <p className="text-lg text-red-600 mb-2">Hata oluştu</p>
            <p className="text-gray-600">{error}</p>
          </div>
        </motion.div>
      );

  // Sipariş durumu metni
  const getStatusText = (status) => {
    switch (status) {
      case 'open':
        return 'Siparişiniz alındı';
      case 'preparing':
        return 'Siparişiniz hazırlanıyor';
      case 'done':
        return 'Siparişiniz hazır!';
      default:
        return 'Sipariş durumu kontrol ediliyor';
    }
  };



  return (
    <motion.div 
      className="min-h-screen bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Sipariş Onay Banner'ı */}
      {showOrderConfirmation && (
        <motion.div
          className="fixed top-0 left-0 right-0 z-50 bg-green-500 text-white p-4 text-center"
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center space-x-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="font-semibold">Siparişiniz başarıyla alındı!</span>
          </div>
        </motion.div>
      )}

      {/* Sipariş Durumu Göstergesi */}
      {currentOrder && orderStatus && (
        <motion.div
          className="fixed top-4 right-4 z-40 bg-white rounded-lg shadow-lg p-4 max-w-sm border-l-4 border-l-blue-500"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center space-x-3">
            <div className={`w-3 h-3 rounded-full ${
              orderStatus === 'open' ? 'bg-blue-500' :
              orderStatus === 'preparing' ? 'bg-yellow-500' :
              orderStatus === 'done' ? 'bg-green-500' : 'bg-gray-500'
            } animate-pulse`}></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">
                {getStatusText(orderStatus)}
              </p>
              <p className="text-xs text-gray-500">
                Sipariş #{currentOrder.order_id}
              </p>
              {orderStatus === 'done' && (
                <p className="text-xs text-green-600 font-medium mt-1">
                  ✅ Siparişiniz hazır!
                </p>
              )}
            </div>
            {statusPolling && orderStatus !== 'done' && (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-400"></div>
            )}
            {orderStatus === 'done' && (
              <button 
                onClick={() => {
                  setCurrentOrder(null);
                  setOrderStatus(null);
                  setStatusPolling(false);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </motion.div>
      )}

      {/* Header */}
      <motion.div 
        className="bg-white shadow-sm border-b"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <motion.h1 
            className="text-2xl md:text-3xl font-bold text-gray-900"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            Sipariş Sayfası
          </motion.h1>
          <motion.div 
            className="mt-2 text-sm text-gray-600"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          >
            <span className="font-medium">Restoran:</span> {tenantCode} | 
            <span className="font-medium ml-2">Masa:</span> {tableId}
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Menu Section */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Menü</h2>
            <div className="space-y-6">
              {menu.map(category => (
                <CategoryList
                  key={category.id}
                  category={category}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          </div>

          {/* Cart Section */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <Cart cartItems={cart} onRemove={handleRemoveFromCart} />
              
              <div className="mt-4 space-y-3">
                {cart.length > 0 && (
                  <motion.button 
                    onClick={handleSubmitOrder}
                    className="w-full btn-primary text-lg py-3"
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
                    Siparişi Gönder
                  </motion.button>
                )}
                <motion.button 
                  onClick={() => setCart([])}
                  className="w-full btn-secondary"
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
                  Sepeti Temizle
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default OrderPage;
