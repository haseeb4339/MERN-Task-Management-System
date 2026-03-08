import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Task title is required'],
      trim: true,
      maxlength: [150, 'Task title must be less than 150 characters']
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, 'Task description must be less than 1000 characters']
    },
    status: {
      type: String,
      enum: ['pending', 'in-progress', 'completed'],
      default: 'pending'
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium'
    },
    dueDate: {
      type: Date
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: [true, 'Project reference is required']
    }
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

const Task = mongoose.model('Task', taskSchema);

export default Task;
