import { useCallback, useEffect, useState } from 'react';
import { projectService } from '../services/projectService';

const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await projectService.getProjects();
      console.log('Fetched projects:', data);  // Check the data in the console
      if (!Array.isArray(data)) {
        throw new Error('The fetched data is not an array.');
      }
      setProjects(data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load projects');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return { projects, loading, error, fetchProjects };
};

export default useProjects;