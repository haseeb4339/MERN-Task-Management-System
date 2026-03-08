import express from 'express';
import {
  createTask,
  deleteTask,
  getTasks,
  getTasksByProject,
  updateTask
} from '../controllers/taskController.js';
import { validateTaskPayload } from '../middleware/validateRequest.js';

const router = express.Router();

router.route('/').post(validateTaskPayload, createTask).get(getTasks);
router.get('/project/:projectId', getTasksByProject);
router.route('/:id').put(updateTask).delete(deleteTask);

export default router;
