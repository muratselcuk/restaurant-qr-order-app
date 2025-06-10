import express from 'express';
import { 
    getOpenOrders,
    getOrderDetails  
} from '../controllers/kitchenController.js';

const router = express.Router();

router.get('/:tenant/orders', getOpenOrders);
router.get('/:tenant/orders/:order_id', getOrderDetails);


export default router;
