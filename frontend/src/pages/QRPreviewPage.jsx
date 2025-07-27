import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

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
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
        <p className="text-lg text-gray-600">QR kod yükleniyor...</p>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <div className="text-red-500 text-6xl mb-4">⚠️</div>
        <p className="text-lg text-red-600 mb-2">Hata oluştu</p>
        <p className="text-gray-600">{error}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="card text-center">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
            QR Kodu
          </h1>
          
          <div className="mb-4 text-sm text-gray-600">
            <p><span className="font-medium">Restoran:</span> {tenantCode}</p>
            <p><span className="font-medium">Masa:</span> {tableId}</p>
          </div>
          
          {qrDataURL && (
            <div className="flex justify-center">
              <img 
                src={qrDataURL} 
                alt="QR Kod" 
                className="w-48 h-48 sm:w-64 sm:h-64 border-2 border-gray-200 rounded-lg shadow-lg"
              />
            </div>
          )}
          
          <p className="mt-6 text-sm text-gray-500">
            Bu QR kodu ile sipariş verebilirsiniz
          </p>
        </div>
      </div>
    </div>
  )
}

export default QRPreviewPage
