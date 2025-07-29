import express from 'express';
import { getAllTenants, getTenantTables } from '../controllers/tenantController.js';

const router = express.Router();

// Tüm tenant'ları getir
router.get('/', getAllTenants);

// Belirli bir tenant'ın masalarını getir
router.get('/:tenant/tables', getTenantTables);

export default router; 