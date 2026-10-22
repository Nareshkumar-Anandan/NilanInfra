import express from 'express';
import { getDashboardStats } from '../controllers/dashboardController.js';
import { verifyAdminToken } from '../middleware/auth.js';

const router = express.Router();

// Protected: Admin executive dashboard stats & live metrics
router.get('/stats', verifyAdminToken, getDashboardStats);

export default router;
