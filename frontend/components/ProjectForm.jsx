import { useState } from 'react';

const ProjectForm = ({ onSubmit, initialValues = { name: '', description: '' }, submitText = 'Save Project' }) => {
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
        <label htmlFor="name">Project Name</label>
        <input id="name" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div style={{ marginBottom: '0.75rem' }}>
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" rows="4" value={formData.description} onChange={handleChange} />
      </div>
      <button type="submit">{submitText}</button>
    </form>
  );
};

export default ProjectForm;
