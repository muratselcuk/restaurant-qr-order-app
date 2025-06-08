import express from 'express';
import { getOrder, createOrder } from '../controllers/orderController.js';

const router = express.Router();

router.get('/:tenant/:table_id', getOrder);
router.post('/:tenant/:table_id', createOrder);

export default router;
