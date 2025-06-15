import MenuItemCard from './MenuItemCard';

function CategoryList({ category, onAddToCart }) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <h3>{category.name}</h3>
      <ul>
        {category.items.map(item => (
          <MenuItemCard
            key={item.id}
            item={item}
            onAddToCart={onAddToCart}
          />
        ))}
      </ul>
    </div>
  );
}

export default CategoryList;
