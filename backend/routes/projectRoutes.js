import express from 'express';
import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
} from '../controllers/projectController.js';
import { verifyAdminToken } from '../middleware/auth.js';

const router = express.Router();

// Publicly viewable
router.get('/', getAllProjects);
router.get('/:id', getProjectById);

// Protected admin modifications
router.post('/', verifyAdminToken, createProject);
router.put('/:id', verifyAdminToken, updateProject);
router.delete('/:id', verifyAdminToken, deleteProject);

export default router;
