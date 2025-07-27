function Cart({ cartItems, onRemove }) {
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Sepet</h3>
      
      {cartItems.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-gray-400 text-6xl mb-4">🛒</div>
          <p className="text-gray-500">Sepet boş</p>
        </div>
      ) : (
        <div className="space-y-3">
          {cartItems.map(item => (
            <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 text-sm">{item.name}</h4>
                <p className="text-gray-600 text-sm">
                  {item.quantity} x ₺{Number(item.price).toFixed(2)}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <span className="font-semibold text-primary-600">
                  ₺{(item.price * item.quantity).toFixed(2)}
                </span>
                <button 
                  onClick={() => onRemove(item.id)}
                  className="text-red-500 hover:text-red-700 p-1"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
          
          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between items-center text-lg font-semibold">
              <span>Toplam:</span>
              <span className="text-primary-600">₺{total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
