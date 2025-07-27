import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars

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
    <motion.div 
      className="min-h-screen bg-gray-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div 
        className="max-w-md w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div 
          className="card text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          {/* Header */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          >
            <motion.div 
              className="text-6xl mb-4"
              animate={{ rotate: [0, -5, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >🍽️</motion.div>
            <motion.h1 
              className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            >
              Hoş Geldiniz!
            </motion.h1>
            <motion.p 
              className="text-gray-600"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            >
              <span className="font-medium">{tenantCode}</span> restoranına hoş geldiniz
            </motion.p>
          </motion.div>

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

            <motion.button 
              type="submit"
              className="w-full btn-primary text-lg py-3"
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
              }}
              whileTap={{ 
                scale: 0.98,
                boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
              }}
              transition={{ 
                type: "spring", 
                stiffness: 400, 
                damping: 17 
              }}
            >
              Siparişe Başla
            </motion.button>
          </form>

          {/* Quick Table Selection */}
          <div className="mt-8">
            <p className="text-sm text-gray-500 mb-3">Hızlı Seçim:</p>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num, index) => (
                <motion.button
                  key={num}
                  onClick={() => setTableId(num.toString())}
                  className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-primary-500 transition-colors duration-200 text-lg font-medium"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    duration: 0.3, 
                    delay: 0.6 + index * 0.05,
                    ease: "easeOut"
                  }}
                  whileHover={{ 
                    scale: 1.1,
                    boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
                  }}
                  whileTap={{ 
                    scale: 0.95
                  }}
                >
                  {num}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Info */}
          <motion.div 
            className="mt-8 pt-6 border-t border-gray-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
          >
            <p className="text-xs text-gray-500">
              Masa numaranızı girin ve sipariş vermeye başlayın
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default TableInputPage;
