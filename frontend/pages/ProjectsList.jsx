import { Link } from 'react-router-dom';
import useProjects from '../hooks/useProjects';

const ProjectsList = () => {
  const { projects, loading, error } = useProjects();

  return (
    <main className="container">
      <h2>Projects</h2>
      {loading ? <p>Loading...</p> : null}
      {error ? <p>{error}</p> : null}
      <div className="grid">
        {projects.map((project) => (
          <article key={project._id} className="card">
            <h3>{project.name}</h3>
            <p>{project.description || 'No description provided'}</p>
            <p>
              <strong>Created:</strong> {new Date(project.createdAt).toLocaleString()}
            </p>
            <Link to={`/projects/${project._id}`}>Open</Link>
          </article>
        ))}
      </div>
    </main>
  );
};

export default ProjectsList;
