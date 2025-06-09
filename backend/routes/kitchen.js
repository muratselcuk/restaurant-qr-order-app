import express from 'express';
import { getPendingOrders } from '../controllers/kitchenController.js';

const router = express.Router();

router.get('/:tenant/orders', getPendingOrders);

export default router;
