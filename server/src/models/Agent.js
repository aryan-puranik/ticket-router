import mongoose from 'mongoose';

const agentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    skills: [String],
    status: { type: String, enum: ['ONLINE', 'BUSY', 'OFFLINE'], default: 'OFFLINE' },
    maxLoad: { type: Number, default: 5 },
    currentLoad: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model('Agent', agentSchema);