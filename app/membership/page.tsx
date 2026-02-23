'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { useGsapFadeIn, useGsapStagger, useGsapScale } from '@/hooks/use-gsap-animation';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

function MembershipContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const selectedPlan = searchParams.get('plan');
  
  // GSAP animation refs
  const heroRef = useGsapFadeIn(0.2);
  const plansGridRef = useGsapStagger(0.4);
  const faqRef = useGsapFadeIn(0.6);
  const ctaRef = useGsapScale(0.8);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      // Redirect to login with return URL
      router.push(`/login?redirect=/membership${selectedPlan ? `?plan=${selectedPlan}` : ''}`);
    } else {
      setUser(JSON.parse(storedUser));
      
      // If plan is selected, redirect directly to checkout
      if (selectedPlan) {
        router.push(`/membership/checkout?type=${selectedPlan}`);
      }
    }
    setIsLoading(false);
  }, [router, selectedPlan]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-background text-foreground dark flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-secondary"></div>
        </div>
      </div>
    );
  }

  const plans = [
    {
      id: 'monthly',
      name: 'Starter',
      price: '$99',
      period: '/month',
      description: 'Perfect for getting started',
      features: [
        'Gym access 24/7',
        '8 classes per month',
        'Basic support',
        'Mobile app access',
        'Locker facility',
      ],
    },
    {
      id: 'quarterly',
      name: 'Premium',
      price: '$249',
      period: '/quarter',
      description: 'Most popular choice',
      features: [
        'Everything in Starter',
        'Unlimited classes',
        'Personal training (2 sessions)',
        'Priority class booking',
        'Nutrition consultation',
        'Advanced analytics',
      ],
      highlighted: true,
    },
    {
      id: 'annual',
      name: 'Elite',
      price: '$899',
      period: '/year',
      description: 'Best value',
      features: [
        'Everything in Premium',
        '1-on-1 personal coaching',
        'Recovery programs',
        'VIP facilities access',
        'Guest passes (12)',
        'Merchandise discount',
        'Priority support',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground dark">
      {/* Navigation */}
      <nav className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            Dimah<span className="text-secondary">.</span>
          </Link>
          <Link href="/dashboard">
            <Button variant="outline" className="border-border text-foreground hover:bg-background">
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="space-y-12">
          {/* Header */}
          <div ref={heroRef} className="text-center space-y-4">
            <h1 className="text-5xl font-bold">Choose Your Plan</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Select the perfect membership plan for your fitness goals. All plans include access to our world-class facilities and expert trainers.
            </p>
          </div>

          {/* Plans Grid */}
          <div ref={plansGridRef} className="grid md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className={`relative border p-8 transition-all duration-300 flex flex-col ${
                  plan.highlighted
                    ? 'border-secondary bg-card ring-1 ring-secondary/50 md:scale-105 md:z-10'
                    : 'border-border bg-card hover:border-secondary/50'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-secondary text-secondary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                      RECOMMENDED
                    </span>
                  </div>
                )}

                <div className="space-y-2 mb-6">
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                  <p className="text-muted-foreground text-sm">{plan.description}</p>
                </div>

                <div className="mb-8">
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8 flex-1">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href={`/membership/checkout?type=${plan.id}`}>
                  <Button
                    className={`w-full ${
                      plan.highlighted
                        ? 'bg-secondary text-secondary-foreground hover:bg-secondary/90'
                        : 'border border-secondary text-secondary hover:bg-secondary/10'
                    }`}
                    variant={plan.highlighted ? 'default' : 'outline'}
                  >
                    Get Started
                  </Button>
                </Link>
              </Card>
            ))}
          </div>

          {/* FAQ Section */}
          <div ref={faqRef} className="mt-20 space-y-8">
            <h2 className="text-3xl font-bold text-center">Frequently Asked Questions</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  q: 'Can I change my plan anytime?',
                  a: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect at your next billing cycle.',
                },
                {
                  q: 'What payment methods do you accept?',
                  a: 'We accept all major credit and debit cards through our secure Stripe payment system.',
                },
                {
                  q: 'Is there a cancellation fee?',
                  a: 'No, you can cancel your membership anytime with no penalties or hidden fees.',
                },
                {
                  q: 'Do you offer a free trial?',
                  a: 'We offer a 7-day free trial for new members. You can cancel anytime during the trial period.',
                },
              ].map((item, i) => (
                <Card key={i} className="bg-card border-border p-6">
                  <h4 className="font-semibold mb-2">{item.q}</h4>
                  <p className="text-muted-foreground text-sm">{item.a}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <Card ref={ctaRef} className="bg-gradient-to-r from-secondary/20 to-secondary/10 border-secondary p-12 text-center">
            <h3 className="text-2xl font-bold mb-4">Need help choosing a plan?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Contact our team for personalized recommendations based on your fitness goals.
            </p>
            <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
              Contact Support
            </Button>
          </Card>
        </div>
      </main>
    </div>
  );
}

export default function MembershipPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background text-foreground dark flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-secondary"></div>
        </div>
      </div>
    }>
      <MembershipContent />
    </Suspense>
  );
}
