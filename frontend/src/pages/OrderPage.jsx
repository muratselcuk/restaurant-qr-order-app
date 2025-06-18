import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import CategoryList from '../components/CategoryList';
import Cart from '../components/Cart';


const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

function OrderPage() {
  const { tenantCode, tableId } = useParams();
  const [cart, setCart] = useState([]);
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
    const fetchMenu = async () => {
        try {
        const response = await fetch(`${apiBaseUrl}/api/menu/${tenantCode}`);
        const data = await response.json();
        setMenu(data);
        //setMenu(menuData); // hardcoded dummy data
        } catch (error) {
        console.error('Menü çekilirken hata oluştu:', error);
        } finally {
        setLoading(false);
        }
    };

    fetchMenu();
    }, [apiBaseUrl, tenantCode]);

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
    const response = await fetch(`${apiBaseUrl}/api/order/${tenantCode}/${tableId}`, {
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
      if (loading) return <p>Menü yükleniyor...</p>; // Menü yüklendiyse geri kalan ekran döndürülür

  return (
    <div>
      <h1>Order Page</h1>
      <p>Tenant: {tenantCode}</p>
      <p>Table: {tableId}</p>

      <h2>Menu</h2>
      {menu.map(category => (
        <CategoryList
          key={category.id}
          category={category}
          onAddToCart={handleAddToCart}
        />
      ))}

      <Cart cartItems={cart} onRemove={handleRemoveFromCart} />

      {cart.length > 0 && (
        <button onClick={handleSubmitOrder}>Siparişi Gönder</button>
      )}
      <button onClick={() => setCart([])}>Sepeti Temizle</button>

    </div>
  );
}

export default OrderPage;
