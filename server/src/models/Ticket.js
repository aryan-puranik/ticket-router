import mongoose from 'mongoose';

export const STATUSES = ['NEW', 'ASSIGNED', 'IN_PROGRESS', 'PENDING_CUSTOMER', 'RESOLVED', 'CLOSED'];

const ticketSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    status: { type: String, enum: STATUSES, default: 'NEW' },
    priority: { type: Number, min: 1, max: 4, default: 1 },
    customer: { name: { type: String, required: true }, email: { type: String, required: true } },
    assignedAgentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent', default: null },
    headRevisionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Revision', default: null },
  },
  { timestamps: true }
);

ticketSchema.index({ status: 1, priority: -1, createdAt: 1 });
ticketSchema.index({ assignedAgentId: 1, status: 1 });

export default mongoose.model('Ticket', ticketSchema);