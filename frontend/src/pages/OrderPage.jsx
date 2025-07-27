import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import CategoryList from '../components/CategoryList';
import Cart from '../components/Cart';

function OrderPage() {
  const { tenantCode, tableId } = useParams();
  const [cart, setCart] = useState([]);
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      alert('Sipariş başarıyla gönderildi!');
      setCart([]); // Sepeti temizle
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
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
            <p className="text-lg text-gray-600">Menü yükleniyor...</p>
          </div>
        </div>
      );
      
      if (error) return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <p className="text-lg text-red-600 mb-2">Hata oluştu</p>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Sipariş Sayfası</h1>
          <div className="mt-2 text-sm text-gray-600">
            <span className="font-medium">Restoran:</span> {tenantCode} | 
            <span className="font-medium ml-2">Masa:</span> {tableId}
          </div>
        </div>
      </div>

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
                  <button 
                    onClick={handleSubmitOrder}
                    className="w-full btn-primary text-lg py-3"
                  >
                    Siparişi Gönder
                  </button>
                )}
                <button 
                  onClick={() => setCart([])}
                  className="w-full btn-secondary"
                >
                  Sepeti Temizle
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderPage;
