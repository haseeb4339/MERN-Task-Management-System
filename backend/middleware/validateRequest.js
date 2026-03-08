const validateProjectPayload = (req, res, next) => {
  const { name, description } = req.body;

  if (!name || typeof name !== 'string' || !name.trim()) {
    return res.status(400).json({ message: 'Project name is required' });
  }

  if (description && typeof description !== 'string') {
    return res.status(400).json({ message: 'Project description must be a string' });
  }

  next();
};

const validateTaskPayload = (req, res, next) => {
  const { title, status, priority, project, dueDate } = req.body;

  if (!title || typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({ message: 'Task title is required' });
  }

  if (!project || typeof project !== 'string') {
    return res.status(400).json({ message: 'Task project is required' });
  }

  if (status && !['pending', 'in-progress', 'completed'].includes(status)) {
    return res.status(400).json({ message: 'Invalid task status' });
  }

  if (priority && !['low', 'medium', 'high'].includes(priority)) {
    return res.status(400).json({ message: 'Invalid task priority' });
  }

  if (dueDate && Number.isNaN(Date.parse(dueDate))) {
    return res.status(400).json({ message: 'Invalid due date format' });
  }

  next();
};

export { validateProjectPayload, validateTaskPayload };
