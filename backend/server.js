import dotenv from 'dotenv';
import app from './app.js';
import connectDB from './config/db.js';
import cors from 'cors';  // Import CORS

dotenv.config();

const PORT = process.env.PORT || 5001; // Use port 5001 for backend

// CORS configuration
const corsOptions = {
  origin: ['http://frontend:5000', 'http://localhost:5000'], // Use frontend container name
  methods: 'GET, POST', // You can add other methods like PUT, DELETE if needed
};

app.use(cors(corsOptions)); // Enable CORS with specified options

const startServer = async () => {
  try {
    await connectDB(); // Connect to MongoDB
    app.listen(PORT, () => {
      console.log(`Backend server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(`Failed to start server: ${error.message}`);
    process.exit(1);
  }
};

startServer();