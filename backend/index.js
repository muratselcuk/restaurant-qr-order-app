import express from 'express';
import cors from 'cors';
import orderRoutes from './routes/order.js';
import kitchenRoutes from './routes/kitchen.js';
import menuRoutes from './routes/menu.js';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = process.env.PORT || 3001;
const baseUrl = process.env.BASE_URL || 'http://localhost';

app.use(cors()); // Tüm kaynaklara izin verir
app.use(express.json());

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

app.listen(port, () => {
  console.log(`App listening at ${baseUrl}:${port}`);
});
