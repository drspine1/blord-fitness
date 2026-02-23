'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Users, Dumbbell, Heart, Zap, Award } from 'lucide-react';
import { toast } from 'sonner';
import { useGsapFadeIn, useGsapSlideIn, useGsapStagger } from '@/hooks/use-gsap-animation';

interface ClassType {
  id: string;
  name: string;
  trainer: string;
  trainerId: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  duration: number;
  capacity: number;
  enrolled: number;
  schedule: {
    day: string;
    time: string;
  }[];
  price: number;
  icon: any;
}

const CLASSES: ClassType[] = [
  {
    id: '1',
    name: 'HIIT Training',
    trainer: 'Sarah Johnson',
    trainerId: 't1',
    description: 'High-intensity interval training to burn fat and build endurance. Perfect for those looking to maximize results in minimal time.',
    level: 'Advanced',
    category: 'Cardio',
    duration: 45,
    capacity: 25,
    enrolled: 18,
    schedule: [
      { day: 'Monday', time: '6:00 AM' },
      { day: 'Wednesday', time: '6:00 AM' },
      { day: 'Friday', time: '6:00 AM' },
    ],
    price: 0,
    icon: Zap,
  },
  {
    id: '2',
    name: 'Yoga & Flexibility',
    trainer: 'Michael Chen',
    trainerId: 't2',
    description: 'Improve flexibility, balance, and mental clarity through guided yoga sessions suitable for all levels.',
    level: 'Beginner',
    category: 'Wellness',
    duration: 60,
    capacity: 30,
    enrolled: 24,
    schedule: [
      { day: 'Tuesday', time: '7:00 AM' },
      { day: 'Thursday', time: '7:00 AM' },
      { day: 'Saturday', time: '9:00 AM' },
    ],
    price: 0,
    icon: Heart,
  },
  {
    id: '3',
    name: 'Strength & Power',
    trainer: 'Alex Rodriguez',
    trainerId: 't3',
    description: 'Build muscle and increase strength with compound movements and progressive overload techniques.',
    level: 'Intermediate',
    category: 'Strength',
    duration: 60,
    capacity: 20,
    enrolled: 15,
    schedule: [
      { day: 'Monday', time: '5:00 PM' },
      { day: 'Wednesday', time: '5:00 PM' },
      { day: 'Friday', time: '5:00 PM' },
    ],
    price: 0,
    icon: Dumbbell,
  },
  {
    id: '4',
    name: 'Boxing Fundamentals',
    trainer: 'Marcus Williams',
    trainerId: 't4',
    description: 'Learn proper boxing techniques while getting an incredible full-body workout.',
    level: 'Beginner',
    category: 'Combat',
    duration: 50,
    capacity: 15,
    enrolled: 12,
    schedule: [
      { day: 'Tuesday', time: '6:00 PM' },
      { day: 'Thursday', time: '6:00 PM' },
    ],
    price: 0,
    icon: Award,
  },
  {
    id: '5',
    name: 'Spin Class',
    trainer: 'Emma Davis',
    trainerId: 't5',
    description: 'High-energy cycling class with motivating music and challenging intervals.',
    level: 'Intermediate',
    category: 'Cardio',
    duration: 45,
    capacity: 25,
    enrolled: 22,
    schedule: [
      { day: 'Monday', time: '7:00 PM' },
      { day: 'Wednesday', time: '7:00 PM' },
      { day: 'Friday', time: '7:00 PM' },
    ],
    price: 0,
    icon: Zap,
  },
  {
    id: '6',
    name: 'Pilates Core',
    trainer: 'Lisa Anderson',
    trainerId: 't6',
    description: 'Strengthen your core and improve posture with controlled Pilates movements.',
    level: 'Beginner',
    category: 'Wellness',
    duration: 50,
    capacity: 20,
    enrolled: 16,
    schedule: [
      { day: 'Tuesday', time: '8:00 AM' },
      { day: 'Thursday', time: '8:00 AM' },
      { day: 'Saturday', time: '10:00 AM' },
    ],
    price: 0,
    icon: Heart,
  },
];

const categories = ['All', 'Cardio', 'Strength', 'Wellness', 'Combat'];
const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

export default function ClassesPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [bookedClasses, setBookedClasses] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // GSAP animation refs
  const heroRef = useGsapFadeIn(0.2);
  const filtersRef = useGsapSlideIn('up', 0.4);
  const classesGridRef = useGsapStagger(0.6);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/login?redirect=/classes');
      return;
    }
    
    setUser(JSON.parse(storedUser));

    // Load booked classes from localStorage
    const stored = localStorage.getItem('bookedClasses');
    if (stored) {
      setBookedClasses(JSON.parse(stored));
    }
    
    setIsLoading(false);
  }, [router]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-secondary"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  const filteredClasses = CLASSES.filter((cls) => {
    const categoryMatch = selectedCategory === 'All' || cls.category === selectedCategory;
    const levelMatch = selectedLevel === 'All' || cls.level === selectedLevel;
    return categoryMatch && levelMatch;
  });

  const handleBookClass = (classId: string, className: string) => {
    if (bookedClasses.includes(classId)) {
      toast.info('You have already booked this class');
      return;
    }

    // Add to booked classes
    const updated = [...bookedClasses, classId];
    setBookedClasses(updated);
    localStorage.setItem('bookedClasses', JSON.stringify(updated));
    
    toast.success(`Successfully booked ${className}!`);
  };

  const isClassBooked = (classId: string) => bookedClasses.includes(classId);

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
            Browse Classes
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our diverse range of fitness classes led by expert trainers
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 px-6 border-b border-border">
        <div ref={filtersRef} className="mx-auto max-w-6xl space-y-6">
          {/* Category Filter */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Category</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-secondary text-secondary-foreground'
                      : 'bg-card border border-border hover:border-secondary'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Level Filter */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Difficulty Level</h3>
            <div className="flex flex-wrap gap-2">
              {levels.map((level) => (
                <button
                  key={level}
                  onClick={() => setSelectedLevel(level)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedLevel === level
                      ? 'bg-secondary text-secondary-foreground'
                      : 'bg-card border border-border hover:border-secondary'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Classes Grid */}
      <section className="py-12 px-6">
        <div className="mx-auto max-w-6xl">
          <div ref={classesGridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClasses.map((cls) => {
              const Icon = cls.icon;
              const spotsLeft = cls.capacity - cls.enrolled;
              const isBooked = isClassBooked(cls.id);

              return (
                <Card key={cls.id} className="bg-card border-border overflow-hidden hover:border-secondary/50 transition-all">
                  <div className="p-6 space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center">
                          <Icon className="w-6 h-6 text-secondary" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">{cls.name}</h3>
                          <p className="text-sm text-muted-foreground">{cls.trainer}</p>
                        </div>
                      </div>
                    </div>

                    {/* Badges */}
                    <div className="flex gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {cls.level}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {cls.category}
                      </Badge>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {cls.description}
                    </p>

                    {/* Details */}
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{cls.duration} minutes</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="w-4 h-4" />
                        <span>{cls.enrolled}/{cls.capacity} enrolled</span>
                        {spotsLeft <= 5 && (
                          <span className="text-secondary text-xs font-semibold">
                            ({spotsLeft} spots left!)
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Schedule */}
                    <div className="border-t border-border pt-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-semibold">Schedule</span>
                      </div>
                      <div className="space-y-1">
                        {cls.schedule.map((sch, idx) => (
                          <p key={idx} className="text-xs text-muted-foreground">
                            {sch.day} at {sch.time}
                          </p>
                        ))}
                      </div>
                    </div>

                    {/* Book Button */}
                    <Button
                      onClick={() => handleBookClass(cls.id, cls.name)}
                      disabled={isBooked || cls.enrolled >= cls.capacity}
                      className={`w-full ${
                        isBooked
                          ? 'bg-muted text-muted-foreground cursor-not-allowed'
                          : 'bg-secondary text-secondary-foreground hover:bg-secondary/90'
                      }`}
                    >
                      {isBooked ? 'Already Booked' : cls.enrolled >= cls.capacity ? 'Class Full' : 'Book Class'}
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>

          {filteredClasses.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No classes found matching your filters.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
