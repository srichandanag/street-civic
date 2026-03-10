import mongoose, { Schema, Document } from 'mongoose';

export interface IIssue extends Document {
  title: string;
  description: string;
  category: string;
  severity: 'low' | 'medium' | 'high';
  status: 'open' | 'in-progress' | 'resolved';
  location: {
    type: 'Point';
    coordinates: [number, number]; // [longitude, latitude]
    address: string;
  };
  upvotes: number;
  createdAt: Date;
  updatedAt: Date;
}

const issueSchema = new Schema<IIssue>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { 
      type: String, 
      required: true,
      enum: ['pothole', 'broken_light', 'broken_sign', 'damaged_curb', 'flooding', 'debris', 'graffiti', 'other']
    },
    severity: { 
      type: String, 
      required: true,
      enum: ['low', 'medium', 'high'],
      default: 'medium'
    },
    status: {
      type: String,
      enum: ['open', 'in-progress', 'resolved'],
      default: 'open'
    },
    location: {
      type: { type: String, enum: ['Point'], default: 'Point' },
      coordinates: {
        type: [Number],
        required: true
      },
      address: String
    },
    upvotes: { type: Number, default: 0 }
  },
  { timestamps: true }
);

// Create geospatial index
issueSchema.index({ 'location.coordinates': '2dsphere' });

export default mongoose.model<IIssue>('Issue', issueSchema);
