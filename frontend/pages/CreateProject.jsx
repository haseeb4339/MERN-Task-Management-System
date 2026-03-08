import { useNavigate } from 'react-router-dom';
import ProjectForm from '../components/ProjectForm';
import { projectService } from '../services/projectService';

const CreateProject = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    await projectService.createProject(values);
    navigate('/projects');
  };

  return (
    <main className="container">
      <h2>Create Project</h2>
      <ProjectForm onSubmit={handleSubmit} />
    </main>
  );
};

export default CreateProject;
