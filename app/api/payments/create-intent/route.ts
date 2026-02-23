import { connectDB } from '@/lib/db';
import { Membership } from '@/lib/models/Membership';
import { User } from '@/lib/models/User';
import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

const MEMBERSHIP_PRICES: Record<string, { amount: number; duration: number }> = {
  monthly: { amount: 9900, duration: 30 }, // $99/month
  quarterly: { amount: 24900, duration: 90 }, // $249/quarter
  annual: { amount: 89900, duration: 365 }, // $899/year
};

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const { userId, membershipType, type, trainerId, amount } = await request.json();

    // Get user info
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    let paymentAmount: number;
    let metadata: any = {
      userId: userId.toString(),
      userEmail: user.email,
    };

    // Handle personal training payments
    if (type === 'personal-training') {
      if (!trainerId || !amount) {
        return NextResponse.json(
          { error: 'Trainer ID and amount required for personal training' },
          { status: 400 }
        );
      }
      paymentAmount = amount;
      metadata.type = 'personal-training';
      metadata.trainerId = trainerId;
    } 
    // Handle membership payments
    else {
      if (!membershipType || !MEMBERSHIP_PRICES[membershipType]) {
        return NextResponse.json(
          { error: 'Invalid membership type' },
          { status: 400 }
        );
      }
      const priceInfo = MEMBERSHIP_PRICES[membershipType];
      paymentAmount = priceInfo.amount;
      metadata.membershipType = membershipType;
      metadata.type = 'membership';
    }

    // Create Stripe payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: paymentAmount,
      currency: 'usd',
      metadata,
    });

    return NextResponse.json(
      {
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Payment intent error:', error);
    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    );
  }
}
