import mongoose, { Schema, Document } from 'mongoose';

export interface ICompetition extends Document {
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  type: 'Art' | 'Tech' | 'Design' | 'Other';
  prizePool: string;
  participants: mongoose.Types.ObjectId[];
  createdAt: Date;
}

const CompetitionSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  type: { type: String, enum: ['Art', 'Tech', 'Design', 'Other'], default: 'Other' },
  prizePool: { type: String, required: true },
  participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<ICompetition>('Competition', CompetitionSchema);
