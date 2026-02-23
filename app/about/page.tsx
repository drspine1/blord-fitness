'use client';

import { Navbar } from '@/components/navbar';
import { ScrollAnimation } from '@/components/scroll-animation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Award, Users, Zap, Heart } from 'lucide-react';
import Link from 'next/link';
import { useGsapFadeIn, useGsapSlideIn, useGsapStagger, useGsapScale } from '@/hooks/use-gsap-animation';

export default function AboutPage() {
  // GSAP animation refs
  const heroRef = useGsapFadeIn(0.2);
  const missionRef = useGsapSlideIn('left', 0.4);
  const visionRef = useGsapSlideIn('right', 0.4);
  const storyRef = useGsapFadeIn(0.6);
  const valuesRef = useGsapStagger(0.8);
  const statsRef = useGsapScale(1);
  const ctaRef = useGsapFadeIn(1.2);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center px-6 py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-72 h-72 bg-secondary/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
        </div>

        <div ref={heroRef} className="relative z-10 max-w-3xl mx-auto text-center space-y-8">
          <ScrollAnimation animationType="fadeIn">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              About <span className="text-secondary">Dimah-Fitness</span>
            </h1>
          </ScrollAnimation>

          <ScrollAnimation animationType="slideUp" delay={0.2}>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Founded on the principle that luxury fitness should be accessible to everyone, Dimah-Fitness combines world-class facilities with expert coaching to transform lives.
            </p>
          </ScrollAnimation>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-12 items-center">
          <div ref={missionRef}>
            <ScrollAnimation animationType="slideInLeft">
              <div className="space-y-6">
                <h2 className="text-4xl font-bold">Our Mission</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  To empower individuals to achieve their fitness goals through premium facilities, expert guidance, and a supportive community. We believe that everyone deserves access to luxury fitness experiences that inspire transformation.
                </p>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <Zap className="w-6 h-6 text-secondary mt-1" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Energy & Passion</h3>
                      <p className="text-muted-foreground text-sm">We bring passion to every aspect of our service</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <Heart className="w-6 h-6 text-secondary mt-1" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Community First</h3>
                      <p className="text-muted-foreground text-sm">Building a supportive fitness family</p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </div>

          <div ref={visionRef}>
            <ScrollAnimation animationType="slideInRight">
              <div className="space-y-6">
                <h2 className="text-4xl font-bold">Our Vision</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  To become the premier luxury fitness destination where members achieve extraordinary results while enjoying a premium experience. We envision a world where fitness is not just a goal but a lifestyle.
                </p>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <Award className="w-6 h-6 text-secondary mt-1" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Excellence</h3>
                      <p className="text-muted-foreground text-sm">Striving for excellence in everything we do</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <Users className="w-6 h-6 text-secondary mt-1" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Inclusivity</h3>
                      <p className="text-muted-foreground text-sm">Welcoming all fitness levels and goals</p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 px-6 bg-card/50">
        <div ref={storyRef} className="mx-auto max-w-4xl">
          <ScrollAnimation animationType="fadeIn">
            <h2 className="text-4xl font-bold mb-12 text-center">Our Story</h2>
          </ScrollAnimation>

          <div className="space-y-8">
            <ScrollAnimation animationType="slideUp" delay={0.2}>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Dimah-Fitness was born from a simple yet powerful vision: to create a gym where luxury meets accessibility. In 2018, our founder noticed a gap in the market for high-end fitness facilities that didn't compromise on experience or community.
              </p>
            </ScrollAnimation>

            <ScrollAnimation animationType="slideUp" delay={0.4}>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Starting with a single studio and a team of 5 dedicated trainers, Dimah-Fitness has grown into a thriving fitness community with state-of-the-art facilities and over 2,000 active members. Our commitment to excellence has remained unchanged throughout our journey.
              </p>
            </ScrollAnimation>

            <ScrollAnimation animationType="slideUp" delay={0.6}>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Today, we're proud to offer comprehensive fitness programs, expert personal training, group classes, and premium amenities that create an unparalleled fitness experience. Our success is measured not by the size of our gym, but by the transformations we witness every day.
              </p>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-6xl">
          <ScrollAnimation animationType="fadeIn">
            <h2 className="text-4xl font-bold mb-12 text-center">Our Core Values</h2>
          </ScrollAnimation>

          <div ref={valuesRef} className="grid md:grid-cols-4 gap-6">
            {[
              {
                icon: Award,
                title: 'Excellence',
                description: 'We pursue excellence in facilities, training, and member experience',
              },
              {
                icon: Users,
                title: 'Community',
                description: 'We build a supportive environment where members inspire each other',
              },
              {
                icon: Zap,
                title: 'Integrity',
                description: 'We act with honesty and transparency in all our dealings',
              },
              {
                icon: Heart,
                title: 'Health First',
                description: 'We prioritize the wellbeing of our members above all else',
              },
            ].map((value, idx) => (
              <ScrollAnimation
                key={idx}
                animationType="scaleIn"
                delay={idx * 0.1}
              >
                <Card className="p-6 text-center space-y-4 hover:shadow-lg transition-shadow">
                  <div className="flex justify-center">
                    <value.icon className="w-12 h-12 text-secondary" />
                  </div>
                  <h3 className="text-xl font-semibold">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </Card>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Team Stats */}
      <section className="py-20 px-6 bg-card/50">
        <div ref={statsRef} className="mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { number: '2,000+', label: 'Active Members' },
              { number: '50+', label: 'Expert Trainers' },
              { number: '15+', label: 'Years of Excellence' },
            ].map((stat, idx) => (
              <ScrollAnimation key={idx} animationType="scaleIn" delay={idx * 0.15}>
                <div className="text-center space-y-2">
                  <p className="text-5xl font-bold text-secondary">{stat.number}</p>
                  <p className="text-lg text-muted-foreground">{stat.label}</p>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div ref={ctaRef} className="mx-auto max-w-2xl text-center space-y-8">
          <ScrollAnimation animationType="fadeIn">
            <h2 className="text-4xl font-bold">Join Our Community</h2>
            <p className="text-lg text-muted-foreground">
              Experience luxury fitness and discover what you're truly capable of achieving.
            </p>
          </ScrollAnimation>

          <ScrollAnimation animationType="slideUp" delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 w-full sm:w-auto">
                  Start Your Journey
                </Button>
              </Link>
              <Link href="/membership">
                <Button size="lg" variant="outline" className="border-secondary text-secondary hover:bg-secondary/10 w-full sm:w-auto">
                  Explore Memberships
                </Button>
              </Link>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-semibold mb-4">Dimah-Fitness</h3>
              <p className="text-sm text-muted-foreground">Your premium fitness destination</p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/services" className="hover:text-foreground">Our Services</Link></li>
                <li><Link href="/gallery" className="hover:text-foreground">Gallery</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-4">Info</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/about" className="hover:text-foreground">About</Link></li>
                <li><Link href="/contact" className="hover:text-foreground">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Privacy</a></li>
                <li><a href="#" className="hover:text-foreground">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Dimah-Fitness. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
