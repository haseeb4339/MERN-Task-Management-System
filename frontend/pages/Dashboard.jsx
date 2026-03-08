import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import useProjects from '../hooks/useProjects';
import { taskService } from '../services/taskService';

const Dashboard = () => {
  const { projects, loading: projectLoading, error: projectError } = useProjects();
  const [tasks, setTasks] = useState([]);
  const [taskError, setTaskError] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await taskService.getTasks();
        setTasks(data);
      } catch (error) {
        setTaskError(error.response?.data?.message || 'Failed to load tasks');
      }
    };

    fetchTasks();
  }, []);

  const groupedTasks = useMemo(() => {
    return projects.map((project) => ({
      ...project,
      tasks: tasks.filter((task) => task.project?._id === project._id || task.project === project._id)
    }));
  }, [projects, tasks]);

  return (
    <main className="container">
      <h2>Dashboard</h2>
      {projectLoading ? <p>Loading...</p> : null}
      {projectError ? <p>{projectError}</p> : null}
      {taskError ? <p>{taskError}</p> : null}

      <section className="grid">
        {groupedTasks.map((project) => (
          <article key={project._id} className="card">
            <h3>{project.name}</h3>
            <p>{project.description || 'No description'}</p>
            <p>
              <strong>Total Tasks:</strong> {project.tasks.length}
            </p>
            <Link to={`/projects/${project._id}`}>View Project Details</Link>
          </article>
        ))}
      </section>
    </main>
  );
};

export default Dashboard;
