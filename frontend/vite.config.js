import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5000,        // Port 5000 (as per your Docker setup)
    host: '0.0.0.0',   // Make it accessible from outside the container
  },
});