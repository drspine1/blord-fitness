'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { LogOut, Calendar, Zap, TrendingUp, X, MapPin, Clock, Users as UsersIcon } from 'lucide-react';
import { toast } from 'sonner';
import { useGsapFadeIn, useGsapStagger, useGsapScale } from '@/hooks/use-gsap-animation';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

interface ClassDetails {
  id: string;
  name: string;
  trainer: string;
  date: string;
  time: string;
  level: string;
  duration: string;
  location: string;
  description: string;
  capacity: number;
  enrolled: number;
}

const MOCK_CLASSES: ClassDetails[] = [
  {
    id: '1',
    name: 'HIIT Training',
    trainer: 'Sarah Johnson',
    date: 'Jan 25',
    time: '4:30 PM',
    level: 'Advanced',
    duration: '45 minutes',
    location: 'Studio A',
    description: 'High-intensity interval training to burn fat and build endurance.',
    capacity: 25,
    enrolled: 18,
  },
  {
    id: '2',
    name: 'Yoga & Flexibility',
    trainer: 'Michael Chen',
    date: 'Jan 26',
    time: '6:00 PM',
    level: 'Beginner',
    duration: '60 minutes',
    location: 'Yoga Studio',
    description: 'Improve flexibility and mental clarity through guided yoga.',
    capacity: 30,
    enrolled: 24,
  },
  {
    id: '3',
    name: 'Strength & Power',
    trainer: 'Alex Rodriguez',
    date: 'Jan 27',
    time: '5:00 PM',
    level: 'Intermediate',
    duration: '60 minutes',
    location: 'Weight Room',
    description: 'Build muscle and increase strength with compound movements.',
    capacity: 20,
    enrolled: 15,
  },
];

function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState<ClassDetails | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // GSAP animation refs
  const statsRef = useGsapStagger(0.2);
  const membershipRef = useGsapFadeIn(0.4);
  const classesRef = useGsapStagger(0.6);
  const actionsRef = useGsapScale(0.8);

  useEffect(() => {
    // Simple check - if no user, redirect immediately
    const storedUser = localStorage.getItem('user');
    
    if (!storedUser) {
      // Clear everything and go to login
      localStorage.clear();
      document.cookie = 'auth-token=; path=/; max-age=0';
      window.location.replace('/login');
      return;
    }
    
    // User exists, set it and stop loading
    try {
      setUser(JSON.parse(storedUser));
      setIsLoading(false);
    } catch (error) {
      // If parsing fails, clear and redirect
      localStorage.clear();
      window.location.replace('/login');
    }
  }, []);

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    localStorage.removeItem('bookedClasses');
    
    // Clear cookie
    document.cookie = 'auth-token=; path=/; max-age=0; SameSite=Lax';
    
    // Force redirect to homepage
    window.location.href = '/';
  };

  const handleViewClass = (classData: ClassDetails) => {
    setSelectedClass(classData);
    setIsModalOpen(true);
  };

  const handleCancelBooking = (classId: string, className: string) => {
    // Remove from booked classes
    const bookedClasses = JSON.parse(localStorage.getItem('bookedClasses') || '[]');
    const updated = bookedClasses.filter((id: string) => id !== classId);
    localStorage.setItem('bookedClasses', JSON.stringify(updated));
    
    toast.success(`Cancelled booking for ${className}`);
    setIsModalOpen(false);
  };

  const handleAddToCalendar = (classData: ClassDetails) => {
    // Create calendar event (simplified)
    const event = {
      title: classData.name,
      description: `${classData.description}\nTrainer: ${classData.trainer}`,
      location: classData.location,
      start: classData.date + ' ' + classData.time,
    };
    
    toast.success('Calendar event created! (Demo mode)');
  };

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

  return (
    <div className="min-h-screen bg-background text-foreground dark">
      {/* Navigation */}
      <nav className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="text-xl sm:text-2xl font-bold">
            Dimah<span className="text-secondary">.</span>
          </Link>
          
          <div className="flex items-center gap-2 sm:gap-4">
            <span className="hidden sm:inline text-sm text-muted-foreground">
              Welcome, <span className="text-foreground font-semibold">{user.firstName}</span>
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="border-border text-foreground hover:bg-background"
            >
              <LogOut className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-4xl font-bold mb-2">Your Fitness Journey</h1>
            <p className="text-muted-foreground">Track your progress and manage your membership</p>
          </div>

          {/* Stats Grid */}
          <div ref={statsRef} className="grid md:grid-cols-4 gap-6">
            {[
              { label: 'Classes Booked', value: '12', icon: Calendar, color: 'text-secondary' },
              { label: 'Streak Days', value: '8', icon: Zap, color: 'text-secondary' },
              { label: 'Body Weight', value: '82kg', icon: TrendingUp, color: 'text-secondary' },
              { label: 'Calories Burned', value: '2,450', icon: Zap, color: 'text-secondary' },
            ].map((stat, i) => (
              <Card key={i} className="bg-card border-border p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">{stat.label}</p>
                    <p className="text-3xl font-bold mt-2">{stat.value}</p>
                  </div>
                  <stat.icon className={`w-10 h-10 ${stat.color} opacity-20`} />
                </div>
              </Card>
            ))}
          </div>

          {/* Membership Status */}
          <Card ref={membershipRef} className="bg-card border-border overflow-hidden">
            <div className="bg-gradient-to-r from-secondary/20 to-secondary/10 border-b border-border p-6">
              <h2 className="text-2xl font-bold mb-2">Your Membership</h2>
              <p className="text-muted-foreground">Premium Plan - Expires in 45 days</p>
            </div>
            <div className="p-6">
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                {[
                  { label: 'Plan Type', value: 'Premium' },
                  { label: 'Classes/Month', value: '16/Unlimited' },
                  { label: 'Active Since', value: 'Jan 15, 2024' },
                ].map((item, i) => (
                  <div key={i}>
                    <p className="text-muted-foreground text-sm mb-1">{item.label}</p>
                    <p className="font-semibold">{item.value}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                <div className="w-full bg-background rounded-full h-2">
                  <div className="bg-secondary h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>45 days remaining</span>
                  <span>Renews March 15, 2024</span>
                </div>
              </div>
              <Button className="mt-6 bg-secondary text-secondary-foreground hover:bg-secondary/90">
                Renew Membership
              </Button>
            </div>
          </Card>

          {/* Upcoming Classes */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Your Upcoming Classes</h2>
            <div ref={classesRef} className="grid gap-4">
              {MOCK_CLASSES.map((cls, i) => (
                <Card key={i} className="bg-card border-border p-6 hover:border-secondary/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{cls.name}</h3>
                      <p className="text-muted-foreground text-sm mt-1">with {cls.trainer}</p>
                      <p className="text-muted-foreground text-sm mt-2">{cls.date}, {cls.time}</p>
                    </div>
                    <div className="text-right">
                      <span className="inline-block px-3 py-1 bg-secondary/20 text-secondary rounded-full text-xs font-semibold mb-3">
                        {cls.level}
                      </span>
                      <Button 
                        size="sm" 
                        onClick={() => handleViewClass(cls)}
                        className="bg-secondary text-secondary-foreground hover:bg-secondary/90 block ml-auto"
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            <Link href="/classes">
              <Button variant="outline" className="w-full border-secondary text-secondary hover:bg-secondary/10">
                Browse All Classes
              </Button>
            </Link>
          </div>

          {/* Quick Actions */}
          <div ref={actionsRef} className="grid md:grid-cols-3 gap-4">
            {[
              { title: 'Book a Class', desc: 'Explore and book upcoming classes', href: '/classes' },
              { title: 'View Trainers', desc: 'Meet our expert fitness trainers', href: '/trainers' },
              { title: 'Membership', desc: 'Manage your membership plan', href: '/membership' },
            ].map((action, i) => (
              <Link key={i} href={action.href}>
                <Card className="bg-card border-border p-6 hover:border-secondary/50 transition-colors cursor-pointer h-full">
                  <h3 className="font-semibold mb-2">{action.title}</h3>
                  <p className="text-muted-foreground text-sm">{action.desc}</p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>

      {/* Class Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Class Details</DialogTitle>
          </DialogHeader>
          {selectedClass && (
            <div className="space-y-4">
              <div>
                <h3 className="text-2xl font-bold mb-2">{selectedClass.name}</h3>
                <p className="text-muted-foreground">{selectedClass.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 py-4 border-y border-border">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-secondary" />
                    <span>{selectedClass.date} at {selectedClass.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-secondary" />
                    <span>{selectedClass.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-secondary" />
                    <span>{selectedClass.location}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <UsersIcon className="w-4 h-4 text-secondary" />
                    <span>{selectedClass.enrolled}/{selectedClass.capacity} enrolled</span>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Trainer</p>
                    <p className="font-semibold">{selectedClass.trainer}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Level</p>
                    <span className="inline-block px-2 py-1 bg-secondary/20 text-secondary rounded text-xs font-semibold">
                      {selectedClass.level}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => handleAddToCalendar(selectedClass)}
                  className="flex-1"
                >
                  Add to Calendar
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleCancelBooking(selectedClass.id, selectedClass.name)}
                  className="flex-1"
                >
                  Cancel Booking
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function Dashboard() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background text-foreground dark flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-secondary"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    }>
      <DashboardContent />
    </Suspense>
  );
}
