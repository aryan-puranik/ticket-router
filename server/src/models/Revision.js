import mongoose from 'mongoose';

const revisionSchema = new mongoose.Schema(
  {
    ticketId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ticket', required: true },
    version: { type: Number, required: true },
    previousRevisionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Revision', default: null },
    actor: { type: { type: String, enum: ['agent', 'customer', 'system'] }, id: String },
    changes: [{ field: String, from: mongoose.Schema.Types.Mixed, to: mongoose.Schema.Types.Mixed, _id: false }],
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

revisionSchema.index({ ticketId: 1, version: 1 }, { unique: true });

// append-only: block every update/delete path
for (const op of ['updateOne', 'updateMany', 'findOneAndUpdate', 'findOneAndReplace', 'deleteOne', 'deleteMany', 'findOneAndDelete']) {
  revisionSchema.pre(op, function () {
    throw new Error('Revisions are append-only');
  });
}

export default mongoose.model('Revision', revisionSchema);