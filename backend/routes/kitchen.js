import express from 'express';
import { getOpenOrders } from '../controllers/kitchenController.js';

const router = express.Router();

router.get('/:tenant/orders', getOpenOrders);

export default router;
