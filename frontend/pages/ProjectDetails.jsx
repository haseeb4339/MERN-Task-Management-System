import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import TaskList from '../components/TaskList';
import { projectService } from '../services/projectService';
import { taskService } from '../services/taskService';

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');

  const fetchProjectAndTasks = async () => {
    try {
      const [projectResponse, tasksResponse] = await Promise.all([
        projectService.getProjectById(id),
        taskService.getTasksByProject(id)
      ]);

      setProject(projectResponse.data);
      setTasks(tasksResponse.data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load project details');
    }
  };

  useEffect(() => {
    fetchProjectAndTasks();
  }, [id]);

  const handleDelete = async (taskId) => {
    await taskService.deleteTask(taskId);
    fetchProjectAndTasks();
  };

  const handleStatusChange = async (task, status) => {
    await taskService.updateTask(task._id, {
      title: task.title,
      description: task.description,
      project: task.project?._id || task.project,
      status,
      priority: task.priority,
      dueDate: task.dueDate
    });
    fetchProjectAndTasks();
  };

  if (error) {
    return (
      <main className="container">
        <p>{error}</p>
      </main>
    );
  }

  if (!project) {
    return (
      <main className="container">
        <p>Loading project...</p>
      </main>
    );
  }

  return (
    <main className="container">
      <h2>{project.name}</h2>
      <p>{project.description}</p>
      <Link to={`/projects/${id}/tasks/new`}>
        <button type="button">Create Task</button>
      </Link>
      <div style={{ marginTop: '1rem' }}>
        <TaskList tasks={tasks} onDelete={handleDelete} onStatusChange={handleStatusChange} />
      </div>
    </main>
  );
};

export default ProjectDetails;
