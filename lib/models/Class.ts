import mongoose from 'mongoose';

export interface IClass extends mongoose.Document {
  name: string;
  description: string;
  duration: number; // minutes
  capacity: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  trainerId: mongoose.Schema.Types.ObjectId;
  trainerName: string;
  schedule: {
    day: string; // Monday, Tuesday, etc.
    startTime: string; // HH:mm format
    endTime: string; // HH:mm format
  }[];
  image?: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

const classSchema = new mongoose.Schema<IClass>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
      default: 60,
    },
    capacity: {
      type: Number,
      required: true,
    },
    level: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'intermediate',
    },
    trainerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    trainerName: {
      type: String,
      required: true,
    },
    schedule: [
      {
        day: String,
        startTime: String,
        endTime: String,
      },
    ],
    image: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

export const Class = mongoose.models.Class || mongoose.model<IClass>('Class', classSchema);
