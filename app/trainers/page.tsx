'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Star, Award, Calendar, DollarSign } from 'lucide-react';
import { toast } from 'sonner';
import { loadStripe } from '@stripe/stripe-js';
import { useGsapFadeIn, useGsapStagger } from '@/hooks/use-gsap-animation';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

interface Trainer {
  id: string;
  name: string;
  avatar: string;
  specialty: string;
  bio: string;
  experience: number;
  rating: number;
  reviews: number;
  certifications: string[];
  classes: string[];
  availability: string[];
  personalTrainingPrice: number;
}

const TRAINERS: Trainer[] = [
  {
    id: 't1',
    name: 'Sarah Johnson',
    avatar: 'SJ',
    specialty: 'HIIT & Cardio',
    bio: 'Certified personal trainer with 8+ years of experience specializing in high-intensity training and weight loss programs.',
    experience: 8,
    rating: 4.9,
    reviews: 156,
    certifications: ['NASM-CPT', 'HIIT Specialist', 'Nutrition Coach'],
    classes: ['HIIT Training', 'Cardio Blast', 'Fat Burn'],
    availability: ['Mon-Fri: 6AM-2PM', 'Sat: 8AM-12PM'],
    personalTrainingPrice: 75,
  },
  {
    id: 't2',
    name: 'Michael Chen',
    avatar: 'MC',
    specialty: 'Yoga & Flexibility',
    bio: 'Experienced yoga instructor focused on mindfulness, flexibility, and holistic wellness for all fitness levels.',
    experience: 10,
    rating: 4.8,
    reviews: 203,
    certifications: ['RYT-500', 'Meditation Teacher', 'Pilates Instructor'],
    classes: ['Yoga & Flexibility', 'Pilates Core', 'Meditation'],
    availability: ['Tue-Thu: 7AM-3PM', 'Sat-Sun: 9AM-1PM'],
    personalTrainingPrice: 70,
  },
  {
    id: 't3',
    name: 'Alex Rodriguez',
    avatar: 'AR',
    specialty: 'Strength Training',
    bio: 'Former competitive powerlifter specializing in strength building, muscle gain, and athletic performance.',
    experience: 12,
    rating: 4.9,
    reviews: 189,
    certifications: ['CSCS', 'Powerlifting Coach', 'Sports Nutrition'],
    classes: ['Strength & Power', 'Olympic Lifting', 'Bodybuilding'],
    availability: ['Mon-Fri: 3PM-9PM', 'Sat: 10AM-4PM'],
    personalTrainingPrice: 85,
  },
  {
    id: 't4',
    name: 'Marcus Williams',
    avatar: 'MW',
    specialty: 'Boxing & Combat',
    bio: 'Professional boxing coach with competitive fighting background. Teaches technique, conditioning, and self-defense.',
    experience: 15,
    rating: 4.7,
    reviews: 142,
    certifications: ['USA Boxing Coach', 'Self-Defense Instructor', 'Conditioning Specialist'],
    classes: ['Boxing Fundamentals', 'Combat Conditioning', 'Self-Defense'],
    availability: ['Tue-Sat: 4PM-10PM'],
    personalTrainingPrice: 80,
  },
  {
    id: 't5',
    name: 'Emma Davis',
    avatar: 'ED',
    specialty: 'Cycling & Endurance',
    bio: 'Certified spin instructor and endurance athlete passionate about cardiovascular fitness and mental toughness.',
    experience: 6,
    rating: 4.8,
    reviews: 167,
    certifications: ['Spinning Instructor', 'Endurance Coach', 'CPR/AED'],
    classes: ['Spin Class', 'Endurance Training', 'Cardio Intervals'],
    availability: ['Mon-Fri: 5AM-1PM', 'Sun: 8AM-12PM'],
    personalTrainingPrice: 65,
  },
  {
    id: 't6',
    name: 'Lisa Anderson',
    avatar: 'LA',
    specialty: 'Pilates & Core',
    bio: 'Pilates expert focused on core strength, posture correction, and injury rehabilitation through controlled movements.',
    experience: 9,
    rating: 4.9,
    reviews: 178,
    certifications: ['PMA-CPT', 'Rehabilitation Specialist', 'Prenatal Fitness'],
    classes: ['Pilates Core', 'Mat Pilates', 'Reformer Pilates'],
    availability: ['Tue-Sat: 8AM-4PM'],
    personalTrainingPrice: 70,
  },
];

export default function TrainersPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // GSAP animation refs
  const heroRef = useGsapFadeIn(0.2);
  const trainersGridRef = useGsapStagger(0.4);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/login?redirect=/trainers');
      return;
    }
    
    setUser(JSON.parse(storedUser));
    setIsLoading(false);
  }, [router]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-background text-foreground dark flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-secondary"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  const handleBookSession = async (trainer: Trainer) => {
    setSelectedTrainer(trainer);
    setIsBookingModalOpen(true);
  };

  const handleConfirmBooking = async () => {
    if (!selectedTrainer) return;

    setIsProcessing(true);

    try {
      // Create payment intent for personal training
      const response = await fetch('/api/payments/create-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          type: 'personal-training',
          trainerId: selectedTrainer.id,
          amount: selectedTrainer.personalTrainingPrice * 100, // Convert to cents
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create payment intent');
      }

      const { clientSecret } = await response.json();

      // Redirect to checkout with session info
      router.push(`/trainers/checkout?trainer=${selectedTrainer.id}&session=${clientSecret}`);
    } catch (error) {
      toast.error('Failed to process booking. Please try again.');
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative py-20 px-6 bg-gradient-to-b from-card to-background">
        <div ref={heroRef} className="mx-auto max-w-5xl text-center space-y-4">
          <Link href="/dashboard" className="inline-block mb-4">
            <Button variant="outline" className="border-border text-foreground hover:bg-card/50">
              ← Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            Meet Our Trainers
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Expert coaches dedicated to helping you achieve your fitness goals
          </p>
        </div>
      </section>

      {/* Trainers Grid */}
      <section className="py-12 px-6">
        <div className="mx-auto max-w-6xl">
          <div ref={trainersGridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TRAINERS.map((trainer) => (
              <Card key={trainer.id} className="bg-card border-border overflow-hidden hover:border-secondary/50 transition-all">
                <div className="p-6 space-y-4">
                  {/* Avatar & Name */}
                  <div className="flex items-center gap-4">
                    <Avatar className="w-16 h-16 border-2 border-secondary/20">
                      <AvatarFallback className="bg-gradient-to-br from-secondary/30 to-secondary/10 text-secondary text-lg font-bold">
                        {trainer.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-bold text-lg">{trainer.name}</h3>
                      <p className="text-sm text-secondary">{trainer.specialty}</p>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(trainer.rating)
                              ? 'fill-secondary text-secondary'
                              : 'text-muted-foreground'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {trainer.rating} ({trainer.reviews} reviews)
                    </span>
                  </div>

                  {/* Bio */}
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {trainer.bio}
                  </p>

                  {/* Experience */}
                  <div className="flex items-center gap-2 text-sm">
                    <Award className="w-4 h-4 text-secondary" />
                    <span className="text-muted-foreground">{trainer.experience} years experience</span>
                  </div>

                  {/* Certifications */}
                  <div className="flex flex-wrap gap-2">
                    {trainer.certifications.slice(0, 2).map((cert, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {cert}
                      </Badge>
                    ))}
                    {trainer.certifications.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{trainer.certifications.length - 2} more
                      </Badge>
                    )}
                  </div>

                  {/* Classes */}
                  <div className="border-t border-border pt-4">
                    <p className="text-xs font-semibold mb-2">Teaches:</p>
                    <div className="flex flex-wrap gap-1">
                      {trainer.classes.map((cls, idx) => (
                        <span key={idx} className="text-xs text-muted-foreground">
                          {cls}{idx < trainer.classes.length - 1 ? ',' : ''}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Personal Training Price */}
                  <div className="border-t border-border pt-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-secondary" />
                        <span className="text-sm font-semibold">Personal Training</span>
                      </div>
                      <span className="text-lg font-bold text-secondary">
                        ${trainer.personalTrainingPrice}/session
                      </span>
                    </div>
                    <Button
                      onClick={() => handleBookSession(trainer)}
                      className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
                    >
                      Book 1-on-1 Session
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      <Dialog open={isBookingModalOpen} onOpenChange={setIsBookingModalOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Book Personal Training Session</DialogTitle>
          </DialogHeader>
          {selectedTrainer && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="w-12 h-12">
                  <AvatarFallback className="bg-secondary/20 text-secondary">
                    {selectedTrainer.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{selectedTrainer.name}</p>
                  <p className="text-sm text-muted-foreground">{selectedTrainer.specialty}</p>
                </div>
              </div>

              <div className="border-t border-border pt-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Session Duration</span>
                  <span className="font-semibold">60 minutes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Price</span>
                  <span className="font-semibold text-secondary">
                    ${selectedTrainer.personalTrainingPrice}
                  </span>
                </div>
              </div>

              <div className="bg-secondary/10 border border-secondary rounded-lg p-3">
                <p className="text-xs text-muted-foreground">
                  <Calendar className="w-3 h-3 inline mr-1" />
                  After payment, our team will contact you to schedule your session
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="outline"
                  onClick={() => setIsBookingModalOpen(false)}
                  className="flex-1"
                  disabled={isProcessing}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleConfirmBooking}
                  className="flex-1 bg-secondary text-secondary-foreground hover:bg-secondary/90"
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing...' : 'Proceed to Payment'}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
