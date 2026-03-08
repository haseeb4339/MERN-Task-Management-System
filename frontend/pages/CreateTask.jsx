import { useNavigate, useParams } from 'react-router-dom';
import TaskForm from '../components/TaskForm';
import { taskService } from '../services/taskService';

const CreateTask = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    await taskService.createTask({ ...values, project: projectId });
    navigate(`/projects/${projectId}`);
  };

  return (
    <main className="container">
      <h2>Create Task</h2>
      <TaskForm onSubmit={handleSubmit} submitText="Create Task" />
    </main>
  );
};

export default CreateTask;
