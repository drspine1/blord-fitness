import { connectDB } from '@/lib/db';
import { Membership } from '@/lib/models/Membership';
import { User } from '@/lib/models/User';
import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature || '', webhookSecret);
  } catch (error) {
    console.error('Webhook signature verification failed:', error);
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    );
  }

  try {
    await connectDB();

    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        
        const userId = paymentIntent.metadata?.userId;
        const membershipType = paymentIntent.metadata?.membershipType as 'monthly' | 'quarterly' | 'annual';

        if (!userId || !membershipType) {
          console.error('Missing metadata in payment intent');
          break;
        }

        // Calculate membership duration
        const durations: Record<string, number> = {
          monthly: 30,
          quarterly: 90,
          annual: 365,
        };

        const endDate = new Date();
        endDate.setDate(endDate.getDate() + durations[membershipType]);

        // Create or update membership
        await Membership.updateOne(
          { memberId: userId },
          {
            memberId: userId,
            type: membershipType,
            price: paymentIntent.amount / 100,
            startDate: new Date(),
            endDate,
            stripePaymentIntentId: paymentIntent.id,
            status: 'active',
            autoRenew: true,
            classesUsed: 0,
          },
          { upsert: true }
        );

        // Update user membership status
        await User.findByIdAndUpdate(userId, {
          membershipStatus: 'active',
          membershipEndDate: endDate,
        });

        console.log(`Membership created for user ${userId}`);
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        const userId = paymentIntent.metadata?.userId;

        if (userId) {
          await User.findByIdAndUpdate(userId, {
            membershipStatus: 'inactive',
          });
        }

        console.log(`Payment failed for user ${userId}`);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
