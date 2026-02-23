'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { LogOut, Users, Calendar, TrendingUp } from 'lucide-react';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

export default function TrainerDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      if (userData.role !== 'trainer') {
        router.push('/dashboard');
      }
      setUser(userData);
    } else {
      router.push('/login');
    }
    setIsLoading(false);
  }, [router]);

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
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            Dimah<span className="text-secondary">.</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Trainer: <span className="text-foreground font-semibold">{user.firstName} {user.lastName}</span>
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="border-border text-foreground hover:bg-background"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-4xl font-bold mb-2">Trainer Dashboard</h1>
            <p className="text-muted-foreground">Manage your classes and track member progress</p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { label: 'Active Classes', value: '8', icon: Calendar, color: 'text-secondary' },
              { label: 'Total Members', value: '156', icon: Users, color: 'text-secondary' },
              { label: 'Monthly Revenue', value: '$4,200', icon: TrendingUp, color: 'text-secondary' },
              { label: 'Avg Rating', value: '4.8/5', icon: TrendingUp, color: 'text-secondary' },
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

          {/* Your Classes */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Your Classes</h2>
              <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                + Create Class
              </Button>
            </div>
            <div className="grid gap-4">
              {[
                { name: 'HIIT Training', level: 'Advanced', members: 24, time: 'Mon, Wed, Fri - 4:30 PM' },
                { name: 'Strength & Power', level: 'Intermediate', members: 18, time: 'Tue, Thu - 5:00 PM' },
                { name: 'Yoga & Flexibility', level: 'Beginner', members: 32, time: 'Daily - 6:00 AM & 6:00 PM' },
                { name: 'Boxing Basics', level: 'Beginner', members: 16, time: 'Sat - 10:00 AM' },
              ].map((cls, i) => (
                <Card key={i} className="bg-card border-border p-6 hover:border-secondary/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{cls.name}</h3>
                      <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                        <span>Level: {cls.level}</span>
                        <span>•</span>
                        <span>{cls.members} members</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">{cls.time}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="border-border text-foreground hover:bg-background">
                        Edit
                      </Button>
                      <Button size="sm" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                        View Members
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Upcoming Sessions */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Today's Sessions</h2>
            <div className="grid gap-4">
              {[
                { class: 'HIIT Training', members: '22/24', time: '4:30 PM - 5:30 PM' },
                { class: 'Strength & Power', members: '18/20', time: '5:00 PM - 6:00 PM' },
              ].map((session, i) => (
                <Card key={i} className="bg-card border-border p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{session.class}</h3>
                      <p className="text-muted-foreground text-sm mt-1">{session.time}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-secondary">{session.members}</p>
                      <p className="text-muted-foreground text-sm">Members Confirmed</p>
                      <Button size="sm" className="mt-2 bg-secondary text-secondary-foreground hover:bg-secondary/90">
                        Start Session
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Member Requests */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Training Requests</h2>
            <div className="grid gap-4">
              {[
                { member: 'John Smith', type: 'Personal Training', date: 'Jan 26' },
                { member: 'Sarah Williams', type: 'Nutrition Consultation', date: 'Jan 27' },
              ].map((req, i) => (
                <Card key={i} className="bg-card border-border p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{req.member}</h3>
                      <p className="text-muted-foreground text-sm">{req.type}</p>
                      <p className="text-muted-foreground text-sm mt-1">Requested: {req.date}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                        Accept
                      </Button>
                      <Button size="sm" variant="outline" className="border-border text-foreground hover:bg-background">
                        Decline
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
