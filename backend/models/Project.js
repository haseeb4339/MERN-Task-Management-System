import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Project name is required'],
      trim: true,
      maxlength: [100, 'Project name must be less than 100 characters']
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description must be less than 500 characters']
    }
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

const Project = mongoose.model('Project', projectSchema);

export default Project;
