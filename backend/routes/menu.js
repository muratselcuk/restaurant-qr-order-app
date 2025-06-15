// backend/routes/menu.js
import express from 'express';
import { getMenuItems } from '../controllers/menuController.js';

const router = express.Router();

router.get('/', getMenuItems);

export default router;
