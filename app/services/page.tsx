'use client';

import { Navbar } from '@/components/navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dumbbell, Users, Heart, Zap, TrendingUp, Award } from 'lucide-react';
import Link from 'next/link';
import { useGsapFadeIn, useGsapSlideIn, useGsapStagger, useGsapScale } from '@/hooks/use-gsap-animation';

const services = [
  {
    icon: Dumbbell,
    title: 'Personal Training',
    description: 'One-on-one sessions with certified trainers tailored to your goals and fitness level.',
    features: ['Customized workout plans', 'Form correction', 'Progress tracking', 'Nutritional guidance'],
  },
  {
    icon: Users,
    title: 'Group Classes',
    description: 'High-energy group fitness classes including yoga, HIIT, spin, and strength training.',
    features: ['Yoga & Pilates', 'Cardio classes', 'Strength training', 'Dance fitness'],
  },
  {
    icon: Heart,
    title: 'Wellness Programs',
    description: 'Comprehensive wellness packages including nutrition, recovery, and mental health support.',
    features: ['Nutrition counseling', 'Recovery sessions', 'Stress management', 'Health assessments'],
  },
  {
    icon: Zap,
    title: 'Performance Coaching',
    description: 'Advanced training for athletes looking to maximize their performance and results.',
    features: ['Sports-specific training', 'Performance testing', 'Recovery protocols', 'Competition prep'],
  },
  {
    icon: TrendingUp,
    title: 'Body Transformation',
    description: 'Intensive 12-week transformation programs designed to achieve dramatic results.',
    features: ['Meal planning', 'Workout programs', 'Weekly check-ins', 'Lifestyle coaching'],
  },
  {
    icon: Award,
    title: 'Certification Programs',
    description: 'Professional fitness certification courses for aspiring trainers and fitness enthusiasts.',
    features: ['Accredited courses', 'Expert instructors', 'Job placement', 'Continuing education'],
  },
];

const amenities = [
  { title: 'State-of-the-art Equipment', description: 'Premium fitness equipment from top brands' },
  { title: 'Luxury Changing Rooms', description: 'Private lockers, showers, and premium toiletries' },
  { title: 'Sauna & Steam Room', description: 'Recovery and relaxation facilities' },
  { title: 'Smoothie Bar', description: 'Fresh juices and protein shakes' },
  { title: 'WiFi Throughout', description: 'Stay connected while you train' },
  { title: '24/7 Access', description: 'Train whenever it suits your schedule' },
];

export default function ServicesPage() {
  // GSAP animation refs
  const heroRef = useGsapFadeIn(0.2);
  const servicesGridRef = useGsapStagger(0.4);
  const amenitiesRef = useGsapSlideIn('up', 0.6);
  const ctaRef = useGsapScale(0.8);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 px-6 bg-gradient-to-b from-card to-background">
        <div ref={heroRef} className="mx-auto max-w-5xl text-center space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            Our Premium Services
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive fitness and wellness services designed to help you achieve your goals
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-6xl">
          <div ref={servicesGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card key={index} className="group hover:border-secondary transition-all duration-300 hover:shadow-lg">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center mb-4 group-hover:bg-secondary/30 transition-colors">
                      <Icon className="w-6 h-6 text-secondary" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="py-20 px-6 bg-card">
        <div ref={amenitiesRef} className="mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-16">Premium Amenities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {amenities.map((amenity, index) => (
              <div key={index} className="space-y-2">
                <h3 className="text-lg font-semibold text-secondary">{amenity.title}</h3>
                <p className="text-muted-foreground">{amenity.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div ref={ctaRef} className="mx-auto max-w-4xl text-center space-y-8">
          <h2 className="text-4xl font-bold">Ready to Transform Your Fitness Journey?</h2>
          <p className="text-lg text-muted-foreground">
            Join Dimah-Fitness today and experience luxury fitness like never before
          </p>
          <Link href="/signup">
            <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
              Get Started Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
