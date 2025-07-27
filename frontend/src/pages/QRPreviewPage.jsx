import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'

const QRPreviewPage = () => {
  const { tenantCode, tableId } = useParams()
  const [qrDataURL, setQrDataURL] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!tenantCode || !tableId) return

    const fetchQR = async () => {
      try {
        const res = await fetch(`/api/qr/${tenantCode}/${tableId}`)
        const data = await res.json()
        if (res.ok) {
          setQrDataURL(data.qrDataURL)
        } else {
          throw new Error(data.error || 'QR kod alınamadı')
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchQR()
  }, [tenantCode, tableId])

  if (loading) return (
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
        <p className="text-lg text-gray-600">QR kod yükleniyor...</p>
      </div>
    </motion.div>
  );
  
  if (error) return (
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
          <motion.h1 
            className="text-xl sm:text-2xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          >
            QR Kodu
          </motion.h1>
          
          <div className="mb-4 text-sm text-gray-600">
            <p><span className="font-medium">Restoran:</span> {tenantCode}</p>
            <p><span className="font-medium">Masa:</span> {tableId}</p>
          </div>
          
          {qrDataURL && (
            <motion.div 
              className="flex justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              <motion.img 
                src={qrDataURL} 
                alt="QR Kod" 
                className="w-48 h-48 sm:w-64 sm:h-64 border-2 border-gray-200 rounded-lg shadow-lg"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 20 
                }}
              />
            </motion.div>
          )}
          
          <p className="mt-6 text-sm text-gray-500">
            Bu QR kodu ile sipariş verebilirsiniz
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default QRPreviewPage
