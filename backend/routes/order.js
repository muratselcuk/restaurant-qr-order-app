import express from 'express';
import { getOrder, createOrder, getOrderStatus } from '../controllers/orderController.js';

const router = express.Router();

router.get('/:tenant/:table_id', getOrder);
router.post('/:tenant/:table_id', createOrder);
router.get('/:tenant/:table_id/:order_id/status', getOrderStatus);

export default router;
