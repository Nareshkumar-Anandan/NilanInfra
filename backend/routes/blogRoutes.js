import express from 'express';
import {
  getAllBlogs,
  getBlogByIdOrSlug,
  createBlog,
  updateBlog,
  deleteBlog
} from '../controllers/blogController.js';
import { verifyAdminToken } from '../middleware/auth.js';

const router = express.Router();

// Public: View articles
router.get('/', getAllBlogs);
router.get('/:identifier', getBlogByIdOrSlug);

// Protected: Admin editorial publishing
router.post('/', verifyAdminToken, createBlog);
router.put('/:id', verifyAdminToken, updateBlog);
router.delete('/:id', verifyAdminToken, deleteBlog);

export default router;
