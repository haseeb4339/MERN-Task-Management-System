import { Link } from 'react-router-dom';

const Navbar = () => (
  <header className="navbar">
    <div className="container">
      <h1>Project & Task Management</h1>
      <nav className="nav-links">
        <Link to="/">Dashboard</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/projects/new">Create Project</Link>
      </nav>
    </div>
  </header>
);

export default Navbar;
