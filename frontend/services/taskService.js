import api from './api';

export const taskService = {
  getTasks: () => api.get('/tasks'),
  getTasksByProject: (projectId) => api.get(`/tasks/project/${projectId}`),
  createTask: (payload) => api.post('/tasks', payload),
  updateTask: (id, payload) => api.put(`/tasks/${id}`, payload),
  deleteTask: (id) => api.delete(`/tasks/${id}`)
};
