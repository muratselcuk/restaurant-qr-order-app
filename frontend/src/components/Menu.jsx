import { useEffect, useState } from 'react';
// frontend/src/components/Menu.jsx

function Menu() {
  const [items, setItems] = useState([]);


useEffect(() => {
  fetch(`/api/menu`)
    .then((res) => res.json())
    .then((data) => setItems(data))
    .catch((err) => console.error('Menü alınamadı:', err));
}, []);


  return (
    <div>
      <h2>Menü</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <strong>{item.name}</strong> - ₺{item.price.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Menu;
