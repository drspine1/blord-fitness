'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ChevronRight, Dumbbell, Users, Calendar, Award } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { useGsapFadeIn, useGsapSlideIn, useGsapStagger, useGsapScale } from '@/hooks/use-gsap-animation';

export default function Home() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // GSAP animation refs
  const heroTitleRef = useGsapFadeIn(0.2);
  const heroSubtitleRef = useGsapSlideIn('up', 0.4);
  const heroButtonsRef = useGsapScale(0.6);
  const featuresRef = useGsapStagger(0.8);
  const membershipRef = useGsapFadeIn(1);

  useEffect(() => {
    setMounted(true);
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);

    const observer = new MutationObserver(() => {
      const dark = document.documentElement.classList.contains('dark');
      setIsDark(dark);
    });

    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 py-20">
        {/* Background Images */}
        {mounted && (
          <div className="absolute inset-0 z-0">
            <Image
              src="/hero-gym.jpg"
              alt="Luxury gym interior"
              fill
              className="object-cover"
              priority
            />
            <div className={`absolute inset-0 ${isDark ? 'bg-black/60' : 'bg-white/40'}`}></div>
          </div>
        )}

        <div className="absolute inset-0 opacity-20 z-1">
          <div className="absolute top-20 right-20 w-72 h-72 bg-secondary/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-8">
          <div className="inline-block bg-[#ffffff] rounded-full px-4 py-2">
            <span className="text-secondary font-mono text-xs ">PREMIUM FITNESS EXPERIENCE</span>
          </div>
          
          <div ref={heroTitleRef}>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
              Transform Your Body,<br />
              <span className="text-secondary">Elevate Your Mind</span>
            </h1>
          </div>
          
          <div ref={heroSubtitleRef}>
            <p className="text-lg text-foreground max-w-2xl mx-auto leading-relaxed">
              Experience luxury fitness with expert trainers, state-of-the-art facilities, and personalized training programs designed for your success.
            </p>
          </div>

          <div ref={heroButtonsRef} className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link href="/signup">
              <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 w-full sm:w-auto">
                Start Your Journey <ChevronRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="lg" variant="outline" className="border-secondary text-secondary hover:bg-secondary/10 w-full sm:w-auto">
                Explore Classes
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 border-t border-border">
        <div ref={featuresRef} className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
          {[
            { icon: Dumbbell, label: 'State-of-the-Art Equipment', desc: 'Premium facilities and latest technology' },
            { icon: Users, label: 'Expert Trainers', desc: 'Certified professionals with years of experience' },
            { icon: Calendar, label: 'Flexible Schedules', desc: 'Classes at times that work for you' },
            { icon: Award, label: 'Proven Results', desc: 'Join hundreds of successful members' },
          ].map((feature, i) => (
            <div key={i} className="space-y-4 text-center">
              <feature.icon className="w-12 h-12 text-secondary mx-auto" />
              <h3 className="font-semibold">{feature.label}</h3>
              <p className="text-sm text-muted-foreground">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Membership Plans */}
      <section id="membership" className="py-20 px-6 bg-card/50 border-y border-border">
        <div ref={membershipRef} className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">Membership Plans</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Choose the perfect plan for your fitness goals</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Starter', price: '$99', period: '/month', features: ['Gym Access', '8 Classes/month', 'Basic Support'], id: 'monthly' },
              { name: 'Premium', price: '$199', period: '/month', features: ['Unlimited Classes', 'Personal Training', 'Priority Booking', 'Nutrition Guidance'], highlighted: true, id: 'quarterly' },
              { name: 'Elite', price: '$299', period: '/month', features: ['All Premium Features', '1-on-1 Coaching', 'Recovery Programs', 'VIP Facilities'], id: 'annual' },
            ].map((plan, i) => (
              <div
                key={i}
                className={`rounded-lg p-8 border transition-all ${
                  plan.highlighted
                    ? 'border-secondary bg-card ring-1 ring-secondary/50 scale-105'
                    : 'border-border bg-card hover:border-secondary/50'
                }`}
              >
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <div className="my-4 flex items-baseline gap-1">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="text-sm text-muted-foreground flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-secondary rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href={`/membership?plan=${plan.id}`}>
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-4xl font-bold">Ready to Start?</h2>
          <p className="text-lg text-muted-foreground">
            Join Dimah-Fitness today and become part of an elite community of fitness enthusiasts.
          </p>
          <Link href="/signup">
            <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
              Create Free Account <ChevronRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">Dimah</h4>
              <p className="text-sm text-muted-foreground">Premium fitness experiences for ambitious individuals.</p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/services" className="hover:text-foreground">Our Services</Link></li>
                <li><Link href="/gallery" className="hover:text-foreground">Gallery</Link></li>
                <li><Link href="/blog" className="hover:text-foreground">Blog & Education</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/about" className="hover:text-foreground">About Us</Link></li>
                <li><Link href="/reviews" className="hover:text-foreground">Reviews</Link></li>
                <li><Link href="/contact" className="hover:text-foreground">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/contact" className="hover:text-foreground transition-colors">Contact Us</Link></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>&copy; 2024 Dimah-Fitness. All rights reserved.</p>
            <div className="flex gap-6 mt-4 sm:mt-0">
              <a href="#" className="hover:text-foreground transition-colors">Twitter</a>
              <a href="#" className="hover:text-foreground transition-colors">Instagram</a>
              <a href="#" className="hover:text-foreground transition-colors">LinkedIn</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
