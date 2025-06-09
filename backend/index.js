import express from 'express';
import orderRoutes from './routes/order.js';
import kitchenRoutes from './routes/kitchen.js';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = process.env.PORT || 3001;
const baseUrl = process.env.BASE_URL || 'http://localhost';

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Backend is running.',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

app.use('/order', orderRoutes);
app.use('/kitchen', kitchenRoutes);

app.listen(port, () => {
  console.log(`App listening at ${baseUrl}:${port}`);
});
