import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars

function TenantSelectionPage() {
  const [tenants, setTenants] = useState([]);
  const [selectedTenant, setSelectedTenant] = useState('');
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Tenant'ları yükle
  useEffect(() => {
    const fetchTenants = async () => {
      try {
        const response = await fetch('/api/tenant');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setTenants(data);
        setError(null);
      } catch (error) {
        setError(error.message);
        setTenants([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTenants();
  }, []);

  // Seçilen tenant'ın masalarını yükle
  useEffect(() => {
    if (!selectedTenant) {
      setTables([]);
      return;
    }

    const fetchTables = async () => {
      try {
        const response = await fetch(`/api/tenant/${selectedTenant}/tables`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setTables(data);
      } catch (error) {
        console.error('Masalar yüklenirken hata:', error);
        setTables([]);
      }
    };

    fetchTables();
  }, [selectedTenant]);

  const handleTableSelect = (tableId) => {
    navigate(`/order/${selectedTenant}/${tableId}`);
  };

  if (loading) {
    return (
      <motion.div 
        className="flex items-center justify-center min-h-screen bg-gray-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center">
          <motion.div 
            className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          ></motion.div>
          <p className="text-lg text-gray-600">Restoranlar yükleniyor...</p>
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div 
        className="flex items-center justify-center min-h-screen bg-gray-50"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center">
          <motion.div 
            className="text-red-500 text-6xl mb-4"
            animate={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 0.5, repeat: 2 }}
          >⚠️</motion.div>
          <p className="text-lg text-red-600 mb-2">Hata oluştu</p>
          <p className="text-gray-600">{error}</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="min-h-screen bg-gray-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div 
        className="max-w-2xl w-full"
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
              Restoran Seçimi
            </motion.h1>
            <motion.p 
              className="text-gray-600"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            >
              Restoranınızı seçin ve masa numaranızı belirleyin
            </motion.p>
          </motion.div>

          {/* Tenant Selection */}
          <div className="mb-8">
            <label htmlFor="tenantSelect" className="block text-sm font-medium text-gray-700 mb-2">
              Restoran Seçin
            </label>
            <select
              id="tenantSelect"
              value={selectedTenant}
              onChange={(e) => setSelectedTenant(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-lg"
            >
              <option value="">Restoran seçin...</option>
              {tenants.map((tenant) => (
                <option key={tenant.id} value={tenant.name}>
                  {tenant.name}
                </option>
              ))}
            </select>
          </div>

          {/* Table Selection */}
          {selectedTenant && (
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {selectedTenant} - Masa Seçimi
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {tables.map((table, index) => (
                  <motion.button
                    key={table.id}
                    onClick={() => handleTableSelect(table.id)}
                    className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-primary-500 transition-colors duration-200 text-lg font-medium"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      duration: 0.3, 
                      delay: index * 0.1,
                      ease: "easeOut"
                    }}
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
                    }}
                    whileTap={{ 
                      scale: 0.95
                    }}
                  >
                    {table.name}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Info */}
          <motion.div 
            className="mt-8 pt-6 border-t border-gray-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
          >
            <p className="text-xs text-gray-500">
              Restoranınızı seçin ve masa numaranızı belirleyin
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default TenantSelectionPage; 