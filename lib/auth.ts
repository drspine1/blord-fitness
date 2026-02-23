import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from './models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRE = '7d';

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export function generateToken(userId: string, email: string, role: string) {
  return jwt.sign(
    { userId, email, role },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRE }
  );
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

export async function getUserFromEmail(email: string) {
  return User.findOne({ email });
}

export async function createUser(data: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: string;
}) {
  const hashedPassword = await hashPassword(data.password);
  return User.create({
    ...data,
    password: hashedPassword,
  });
}
