function MenuItemCard({ item, onAddToCart }) {
  return (
    <li>
      {item.name} - {Number(item.price).toFixed(2)} TL
      <button
        style={{ marginLeft: '10px' }}
        onClick={() => onAddToCart(item)}
      >
        Sepete Ekle
      </button>
    </li>
  );
}

export default MenuItemCard;
