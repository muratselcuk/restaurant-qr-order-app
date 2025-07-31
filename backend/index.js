import express from 'express';
import cors from 'cors';
import orderRoutes from './routes/order.js';
import kitchenRoutes from './routes/kitchen.js';
import menuRoutes from './routes/menu.js';
import qrRoutes from './routes/qr.js';
import tenantRoutes from './routes/tenant.js';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = process.env.PORT || 3001;
const baseUrl = process.env.BASE_URL || 'http://localhost';

app.use(cors()); // Tüm kaynaklara izin verir
app.use(express.json());

app.use((req, res, next) => {
  const startHrTime = process.hrtime();
  res.on('finish', () => {
    const elapsedHrTime = process.hrtime(startHrTime);
    const elapsedMs = (elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6).toFixed(2);
    const now = new Date().toISOString();
    console.log(`[${now}] ${req.method} ${req.originalUrl} ${res.statusCode} - Yanıt süresi: ${elapsedMs} ms`);
  });
  next();
});

app.get('/', (req, res) => {
  res.json({
    message: 'Backend is running.',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});


app.use('/api/menu', menuRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/kitchen', kitchenRoutes);
app.use('/api/qr', qrRoutes);
app.use('/api/tenant', tenantRoutes);

// SADECE test ortamı dışında dinle!
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`App listening at ${baseUrl}:${port}`);
  });
}

export default app;