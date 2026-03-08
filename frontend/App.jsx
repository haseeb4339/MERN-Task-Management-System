import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import CreateProject from './pages/CreateProject';
import CreateTask from './pages/CreateTask';
import Dashboard from './pages/Dashboard';
import EditTask from './pages/EditTask';
import ProjectDetails from './pages/ProjectDetails';
import ProjectsList from './pages/ProjectsList';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/projects" element={<ProjectsList />} />
        <Route path="/projects/new" element={<CreateProject />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />
        <Route path="/projects/:projectId/tasks/new" element={<CreateTask />} />
        <Route path="/tasks/:taskId/edit" element={<EditTask />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;
