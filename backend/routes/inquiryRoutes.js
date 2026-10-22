import express from 'express';
import {
  createInquiry,
  getAllInquiries,
  getInquiryById,
  updateInquiryStatus,
  deleteInquiry
} from '../controllers/inquiryController.js';
import { verifyAdminToken } from '../middleware/auth.js';

const router = express.Router();

// Public: Website visitors submitting contact/quote forms
router.post('/', createInquiry);

// Protected: Admin viewing & managing CRM leads
router.get('/', verifyAdminToken, getAllInquiries);
router.get('/:id', verifyAdminToken, getInquiryById);
router.patch('/:id/status', verifyAdminToken, updateInquiryStatus);
router.delete('/:id', verifyAdminToken, deleteInquiry);

export default router;
