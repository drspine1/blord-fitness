'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

const MEMBERSHIP_DETAILS = {
  monthly: { name: 'Monthly Plan', price: '$99/month', description: 'Unlimited classes and gym access' },
  quarterly: { name: 'Quarterly Plan', price: '$249/quarter', description: 'Unlimited classes, priority booking' },
  annual: { name: 'Annual Plan', price: '$899/year', description: 'Everything + nutrition consultation' },
};

function CheckoutForm({ membershipType }: { membershipType: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!stripe || !elements) {
      setError('Stripe not loaded');
      return;
    }

    setIsLoading(true);

    try {
      // Get user from localStorage
      const user = localStorage.getItem('user');
      if (!user) {
        router.push('/login');
        return;
      }

      const userData = JSON.parse(user);

      // Create payment intent
      const intentResponse = await fetch('/api/payments/create-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: userData.id,
          membershipType,
        }),
      });

      if (!intentResponse.ok) {
        throw new Error('Failed to create payment intent');
      }

      const { clientSecret } = await intentResponse.json();

      // Confirm payment with card element
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        throw new Error('Card element not found');
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: `${userData.firstName} ${userData.lastName}`,
            email: userData.email,
          },
        },
      });

      if (result.error) {
        setError(result.error.message || 'Payment failed');
      } else if (result.paymentIntent?.status === 'succeeded') {
        // Show success message and redirect to dashboard
        router.push('/dashboard?payment=success&type=membership');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Payment failed');
    } finally {
      setIsLoading(false);
    }
  };

  const membershipInfo = MEMBERSHIP_DETAILS[membershipType as keyof typeof MEMBERSHIP_DETAILS];

  return (
    <Card className="bg-card border-border p-8 w-full max-w-md">
      <div className="mb-6">
        <h3 className="text-2xl font-bold">{membershipInfo?.name}</h3>
        <p className="text-secondary text-2xl font-bold mt-2">{membershipInfo?.price}</p>
        <p className="text-muted-foreground text-sm mt-2">{membershipInfo?.description}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Test Card Info Notice */}
        <div className="bg-secondary/10 border border-secondary rounded-lg p-4 space-y-2">
          <p className="text-sm font-semibold text-secondary">🧪 Test Mode - Use Test Card</p>
          <div className="text-xs text-muted-foreground space-y-1">
            <p><span className="font-medium">Card Number:</span> 4242 4242 4242 4242</p>
            <p><span className="font-medium">Expiry:</span> Any future date (e.g., 12/34)</p>
            <p><span className="font-medium">CVC:</span> Any 3 digits (e.g., 123)</p>
            <p><span className="font-medium">ZIP:</span> Any 5 digits (e.g., 12345)</p>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Card Details</label>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#f5f1e6',
                  '::placeholder': {
                    color: '#6b7280',
                  },
                },
                invalid: {
                  color: '#ef4444',
                },
              },
              hidePostalCode: true,
            }}
            className="p-3 border border-border rounded bg-background"
          />
        </div>

        {error && (
          <div className="bg-destructive/10 border border-destructive rounded p-3">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        <div className="border-t border-border pt-4 space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Amount</span>
            <span className="font-semibold">{membershipInfo?.price.split('/')[0]}</span>
          </div>
        </div>

        <Button
          type="submit"
          disabled={isLoading || !stripe}
          className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
        >
          {isLoading ? 'Processing...' : `Subscribe Now`}
        </Button>

        <Link href="/dashboard">
          <Button variant="outline" className="w-full border-border text-foreground hover:bg-background">
            Back to Dashboard
          </Button>
        </Link>
      </form>

      <div className="mt-6 p-4 bg-background rounded border border-border">
        <p className="text-xs text-muted-foreground">
          Your payment is securely processed by Stripe. We never store your card information.
        </p>
      </div>
    </Card>
  );
}

function CheckoutPageContent() {
  const searchParams = useSearchParams();
  const membershipType = searchParams.get('type') || 'monthly';
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/login');
    } else {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, [router]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-secondary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link href="/" className="text-2xl font-bold">
            Dimah<span className="text-secondary">.</span>
          </Link>
        </div>
      </nav>

      {/* Content */}
      <main className="flex items-center justify-center min-h-[calc(100vh-73px)] px-6 py-12">
        <Elements stripe={stripePromise}>
          <CheckoutForm membershipType={membershipType} />
        </Elements>
      </main>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-secondary"></div>
        </div>
      </div>
    }>
      <CheckoutPageContent />
    </Suspense>
  );
}
