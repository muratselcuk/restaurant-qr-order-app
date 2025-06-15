function MenuItemCard({ item, onAddToCart }) {
  return (
    <li>
      {item.name} - ${item.price.toFixed(2)}
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
