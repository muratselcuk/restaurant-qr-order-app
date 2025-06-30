import express from 'express';
import { 
    getOpenOrders,
    getOrderDetails,
    updateOrderStatus  
} from '../controllers/kitchenController.js';

const router = express.Router();

router.get('/:tenant/orders', getOpenOrders);
router.get('/:tenant/orders/:order_id', getOrderDetails);
router.patch('/:tenant/orders/:order_id', updateOrderStatus);


export default router;
