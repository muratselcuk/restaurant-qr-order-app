function Cart({ cartItems, onRemove }) {
  return (
    <div style={{ borderTop: '1px solid #ccc', marginTop: '1rem', paddingTop: '1rem' }}>
      <h3>Sepet</h3>
      {cartItems.length === 0 ? (
        <p>Sepet boş</p>
      ) : (
        <ul>
          {cartItems.map(item => (
            <li key={item.id}>
              {item.name} x {item.quantity} - ₺{(item.price * item.quantity).toFixed(2)}
              <button onClick={() => onRemove(item.id)} style={{ marginLeft: '10px' }}>Sil</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Cart;
