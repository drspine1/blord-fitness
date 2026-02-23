import mongoose from 'mongoose';

export enum UserRole {
  MEMBER = 'member',
  TRAINER = 'trainer',
  ADMIN = 'admin',
}

export interface IUser extends mongoose.Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  profileImage?: string;
  bio?: string;
  phone?: string;
  joinDate: Date;
  membershipStatus?: 'active' | 'inactive' | 'expired';
  membershipEndDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.MEMBER,
    },
    profileImage: {
      type: String,
    },
    bio: {
      type: String,
    },
    phone: {
      type: String,
    },
    joinDate: {
      type: Date,
      default: Date.now,
    },
    membershipStatus: {
      type: String,
      enum: ['active', 'inactive', 'expired'],
      default: 'inactive',
    },
    membershipEndDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);
