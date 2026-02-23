import mongoose from 'mongoose';

export interface IMembership extends mongoose.Document {
  memberId: mongoose.Schema.Types.ObjectId;
  type: 'monthly' | 'quarterly' | 'annual';
  price: number;
  startDate: Date;
  endDate: Date;
  stripePaymentIntentId?: string;
  status: 'active' | 'cancelled' | 'expired';
  autoRenew: boolean;
  classLimit?: number;
  classesUsed: number;
  createdAt: Date;
  updatedAt: Date;
}

const membershipSchema = new mongoose.Schema<IMembership>(
  {
    memberId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: ['monthly', 'quarterly', 'annual'],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date,
      required: true,
    },
    stripePaymentIntentId: {
      type: String,
    },
    status: {
      type: String,
      enum: ['active', 'cancelled', 'expired'],
      default: 'active',
    },
    autoRenew: {
      type: Boolean,
      default: true,
    },
    classLimit: {
      type: Number,
    },
    classesUsed: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const Membership = mongoose.models.Membership || mongoose.model<IMembership>('Membership', membershipSchema);
