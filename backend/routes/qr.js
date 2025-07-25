import { Router } from 'express'
import QRCode from 'qrcode'

const router = Router()

router.get('/:tenant/:tableId', async (req, res) => {
  const { tenant, tableId } = req.params
  const baseUrl = process.env.FRONTEND_BASE_URL || 'http://localhost:3000'
  const url = `${baseUrl}/order/${tenant}/${tableId}`

  try {
    const qrDataURL = await QRCode.toDataURL(url)
    res.status(200).json({ qrDataURL })
  } catch (error) {
    console.error('QR kod üretilemedi:', error)
    res.status(500).json({ error: 'QR kod üretilemedi' })
  }
})

export default router
