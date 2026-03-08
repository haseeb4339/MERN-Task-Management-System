import { useState } from 'react';

const defaultTask = {
  title: '',
  description: '',
  status: 'pending',
  priority: 'medium',
  dueDate: ''
};

const TaskForm = ({ onSubmit, initialValues = defaultTask, submitText = 'Save Task' }) => {
  const [formData, setFormData] = useState(initialValues);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <div style={{ marginBottom: '0.75rem' }}>
        <label htmlFor="title">Task Title</label>
        <input id="title" name="title" value={formData.title} onChange={handleChange} required />
      </div>
      <div style={{ marginBottom: '0.75rem' }}>
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" rows="3" value={formData.description} onChange={handleChange} />
      </div>
      <div className="grid grid-2" style={{ marginBottom: '0.75rem' }}>
        <div>
          <label htmlFor="status">Status</label>
          <select id="status" name="status" value={formData.status} onChange={handleChange}>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div>
          <label htmlFor="priority">Priority</label>
          <select id="priority" name="priority" value={formData.priority} onChange={handleChange}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>
      <div style={{ marginBottom: '0.75rem' }}>
        <label htmlFor="dueDate">Due Date</label>
        <input id="dueDate" name="dueDate" type="date" value={formData.dueDate} onChange={handleChange} />
      </div>
      <button type="submit">{submitText}</button>
    </form>
  );
};

export default TaskForm;
