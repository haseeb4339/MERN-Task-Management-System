import Task from '../models/Task.js';
import Project from '../models/Project.js';
import validateObjectId from '../utils/validateObjectId.js';

const createTask = async (req, res, next) => {
  try {
    const { project } = req.body;

    if (!validateObjectId(project)) {
      return res.status(400).json({ message: 'Invalid project ID' });
    }

    const projectExists = await Project.findById(project);
    if (!projectExists) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

const getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find().populate('project', 'name').sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

const getTasksByProject = async (req, res, next) => {
  try {
    const { projectId } = req.params;

    if (!validateObjectId(projectId)) {
      return res.status(400).json({ message: 'Invalid project ID' });
    }

    const tasks = await Task.find({ project: projectId }).sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!validateObjectId(id)) {
      return res.status(400).json({ message: 'Invalid task ID' });
    }

    if (req.body.project) {
      if (!validateObjectId(req.body.project)) {
        return res.status(400).json({ message: 'Invalid project ID' });
      }

      const projectExists = await Project.findById(req.body.project);
      if (!projectExists) {
        return res.status(404).json({ message: 'Project not found' });
      }
    }

    const task = await Task.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    }).populate('project', 'name');

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!validateObjectId(id)) {
      return res.status(400).json({ message: 'Invalid task ID' });
    }

    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export { createTask, getTasks, getTasksByProject, updateTask, deleteTask };
