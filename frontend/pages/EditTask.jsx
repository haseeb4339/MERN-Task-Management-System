import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TaskForm from '../components/TaskForm';
import { taskService } from '../services/taskService';

const formatDateInput = (dateValue) => {
  if (!dateValue) return '';
  const date = new Date(dateValue);
  return date.toISOString().split('T')[0];
};

const EditTask = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      const { data } = await taskService.getTasks();
      const selectedTask = data.find((item) => item._id === taskId);
      setTask(selectedTask || null);
    };

    fetchTask();
  }, [taskId]);

  const handleSubmit = async (values) => {
    await taskService.updateTask(taskId, {
      ...values,
      project: task.project?._id || task.project
    });
    navigate(`/projects/${task.project?._id || task.project}`);
  };

  if (!task) {
    return (
      <main className="container">
        <p>Loading task...</p>
      </main>
    );
  }

  return (
    <main className="container">
      <h2>Edit Task</h2>
      <TaskForm
        onSubmit={handleSubmit}
        submitText="Update Task"
        initialValues={{
          title: task.title,
          description: task.description || '',
          status: task.status,
          priority: task.priority,
          dueDate: formatDateInput(task.dueDate)
        }}
      />
    </main>
  );
};

export default EditTask;
