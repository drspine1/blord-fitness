import mongoose from 'mongoose';

export interface IBooking extends mongoose.Document {
  memberId: mongoose.Schema.Types.ObjectId;
  classId: mongoose.Schema.Types.ObjectId;
  className: string;
  trainerName: string;
  bookingDate: Date;
  status: 'confirmed' | 'cancelled' | 'completed';
  cancellationReason?: string;
  createdAt: Date;
  updatedAt: Date;
}

const bookingSchema = new mongoose.Schema<IBooking>(
  {
    memberId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Class',
      required: true,
    },
    className: {
      type: String,
      required: true,
    },
    trainerName: {
      type: String,
      required: true,
    },
    bookingDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['confirmed', 'cancelled', 'completed'],
      default: 'confirmed',
    },
    cancellationReason: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Booking = mongoose.models.Booking || mongoose.model<IBooking>('Booking', bookingSchema);
