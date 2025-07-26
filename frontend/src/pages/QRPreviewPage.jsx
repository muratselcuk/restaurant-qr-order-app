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

  if (loading) return <p className="text-center mt-8">Yükleniyor...</p>
  if (error) return <p className="text-red-500 text-center mt-8">{error}</p>

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">QR Kodu - {tenantCode} / Masa {tableId}</h1>
      {qrDataURL && <img src={qrDataURL} alt="QR Kod" className="w-64 h-64 border shadow" />}
    </div>
  )
}

export default QRPreviewPage
