import express from 'express';
import {
  createProject,
  deleteProject,
  getProjectById,
  getProjects,
  updateProject
} from '../controllers/projectController.js';
import { validateProjectPayload } from '../middleware/validateRequest.js';

const router = express.Router();

router.route('/').post(validateProjectPayload, createProject).get(getProjects);
router
  .route('/:id')
  .get(getProjectById)
  .put(validateProjectPayload, updateProject)
  .delete(deleteProject);

export default router;
