import express from 'express';
import orderRoutes from './routes/order.js';
import kitchenRoutes from './routes/kitchen.js';

const app = express();
const port = 3001;

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
  console.log(`App listening at http://localhost:${port}`);
});
