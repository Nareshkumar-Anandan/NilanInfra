import express from 'express';
import { loginAdmin, getAdminProfile, changePassword } from '../controllers/authController.js';
import { verifyAdminToken } from '../middleware/auth.js';

const router = express.Router();

// Public login
router.post('/login', loginAdmin);

// Protected admin profile & password update
router.get('/me', verifyAdminToken, getAdminProfile);
router.post('/change-password', verifyAdminToken, changePassword);

export default router;
