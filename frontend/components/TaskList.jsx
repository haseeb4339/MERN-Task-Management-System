import { Link } from 'react-router-dom';

const TaskList = ({ tasks, onDelete, onStatusChange }) => {
  if (!tasks.length) {
    return <p>No tasks yet for this project.</p>;
  }

  return (
    <div className="grid">
      {tasks.map((task) => (
        <article key={task._id} className="card">
          <h3>{task.title}</h3>
          <p>{task.description || 'No description provided'}</p>
          <p>
            <strong>Priority:</strong> {task.priority}
          </p>
          <p>
            <strong>Due:</strong> {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'Not set'}
          </p>
          <p>
            <strong>Status:</strong>{' '}
            <span className={`status-badge status-${task.status}`}>{task.status}</span>
          </p>
          <div className="grid grid-2">
            <select value={task.status} onChange={(event) => onStatusChange(task, event.target.value)}>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Link to={`/tasks/${task._id}/edit`} style={{ flex: 1 }}>
                <button type="button" className="secondary">
                  Edit
                </button>
              </Link>
              <button type="button" className="danger" onClick={() => onDelete(task._id)}>
                Delete
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};

export default TaskList;
