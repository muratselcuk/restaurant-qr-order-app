function MenuItemCard({ item, onAddToCart }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h4 className="font-medium text-gray-900 text-sm sm:text-base">
            {item.name}
          </h4>
          <p className="text-primary-600 font-semibold text-lg">
            ₺{Number(item.price).toFixed(2)}
          </p>
        </div>
      </div>
      <button
        onClick={() => onAddToCart(item)}
        className="w-full btn-primary text-sm py-2"
      >
        Sepete Ekle
      </button>
    </div>
  );
}

export default MenuItemCard;
