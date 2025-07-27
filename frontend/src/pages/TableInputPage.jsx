import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';

function TableInputPage() {
  const { tenantCode } = useParams();
  const [tableId, setTableId] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!tableId.trim()) {
      setError('Lütfen masa numarası girin');
      return;
    }
    
    if (isNaN(tableId) || parseInt(tableId) <= 0) {
      setError('Geçerli bir masa numarası girin');
      return;
    }
    
    navigate(`/order/${tenantCode}/${tableId}`);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="card text-center">
          {/* Header */}
          <div className="mb-8">
            <div className="text-6xl mb-4">🍽️</div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Hoş Geldiniz!
            </h1>
            <p className="text-gray-600">
              <span className="font-medium">{tenantCode}</span> restoranına hoş geldiniz
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="tableId" className="block text-sm font-medium text-gray-700 mb-2">
                Masa Numaranız
              </label>
              <input
                id="tableId"
                type="number"
                min="1"
                value={tableId}
                onChange={(e) => setTableId(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Örn: 1, 2, 3..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-lg text-center"
                autoFocus
              />
              {error && (
                <p className="mt-2 text-sm text-red-600">{error}</p>
              )}
            </div>

            <button 
              type="submit"
              className="w-full btn-primary text-lg py-3"
            >
              Siparişe Başla
            </button>
          </form>

          {/* Quick Table Selection */}
          <div className="mt-8">
            <p className="text-sm text-gray-500 mb-3">Hızlı Seçim:</p>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                <button
                  key={num}
                  onClick={() => setTableId(num.toString())}
                  className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-primary-500 transition-colors duration-200 text-lg font-medium"
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              Masa numaranızı girin ve sipariş vermeye başlayın
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TableInputPage;
