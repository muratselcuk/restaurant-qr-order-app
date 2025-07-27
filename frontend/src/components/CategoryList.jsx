import MenuItemCard from './MenuItemCard';

function CategoryList({ category, onAddToCart }) {
  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">
        {category.name}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
        {category.items.map(item => (
          <MenuItemCard
            key={item.id}
            item={item}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </div>
  );
}

export default CategoryList;
