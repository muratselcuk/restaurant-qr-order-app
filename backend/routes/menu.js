// backend/routes/menu.js
import express from 'express';
import { getMenuItems } from '../controllers/menuController.js';

const router = express.Router();

// DOĞRU: /api/menu/:tenant
router.get('/:tenant', getMenuItems);

export default router;
