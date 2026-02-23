'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { LogOut, Users, TrendingUp, DollarSign, BarChart3 } from 'lucide-react';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      if (userData.role !== 'admin') {
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
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-secondary"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            Dimah<span className="text-secondary">.</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Admin: <span className="text-foreground font-semibold">{user.firstName} {user.lastName}</span>
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
            <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage gym operations, members, trainers, and revenue</p>
          </div>

          {/* KPI Grid */}
          <div className="grid md:grid-cols-5 gap-6">
            {[
              { label: 'Total Members', value: '1,245', icon: Users, trend: '+12%' },
              { label: 'Monthly Revenue', value: '$48,500', icon: DollarSign, trend: '+8%' },
              { label: 'Active Classes', value: '32', icon: BarChart3, trend: '+4' },
              { label: 'Trainers', value: '18', icon: Users, trend: '+2' },
              { label: 'Avg Rating', value: '4.7/5', icon: TrendingUp, trend: '+0.2' },
            ].map((stat, i) => (
              <Card key={i} className="bg-card border-border p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-muted-foreground text-xs uppercase tracking-wide">{stat.label}</p>
                    <p className="text-2xl font-bold mt-2">{stat.value}</p>
                    <p className="text-secondary text-xs mt-2">{stat.trend} from last month</p>
                  </div>
                  <stat.icon className="w-8 h-8 text-secondary opacity-20" />
                </div>
              </Card>
            ))}
          </div>

          {/* Management Sections */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Members Management */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Members</h2>
                <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                  + Add Member
                </Button>
              </div>
              <Card className="bg-card border-border p-6">
                <div className="space-y-4">
                  {[
                    { name: 'John Smith', email: 'john@example.com', status: 'Active', joined: 'Jan 10' },
                    { name: 'Sarah Johnson', email: 'sarah@example.com', status: 'Active', joined: 'Jan 5' },
                    { name: 'Mike Davis', email: 'mike@example.com', status: 'Inactive', joined: 'Dec 15' },
                  ].map((member, i) => (
                    <div key={i} className="flex items-center justify-between pb-4 border-b border-border last:border-0 last:pb-0">
                      <div className="flex-1">
                        <p className="font-semibold">{member.name}</p>
                        <p className="text-muted-foreground text-sm">{member.email}</p>
                      </div>
                      <div className="text-right">
                        <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                          member.status === 'Active' 
                            ? 'bg-secondary/20 text-secondary'
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          {member.status}
                        </span>
                        <Button size="sm" variant="ghost" className="ml-2 text-foreground hover:bg-background/50">
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
              <Link href="/admin/members">
                <Button variant="outline" className="w-full border-border text-foreground hover:bg-background">
                  View All Members
                </Button>
              </Link>
            </div>

            {/* Trainers Management */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Trainers</h2>
                <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                  + Add Trainer
                </Button>
              </div>
              <Card className="bg-card border-border p-6">
                <div className="space-y-4">
                  {[
                    { name: 'Sarah Johnson', speciality: 'HIIT Training', members: 28, rating: '4.9' },
                    { name: 'Alex Rodriguez', speciality: 'Strength Training', members: 24, rating: '4.8' },
                    { name: 'Michael Chen', speciality: 'Yoga & Flexibility', members: 36, rating: '4.7' },
                  ].map((trainer, i) => (
                    <div key={i} className="flex items-center justify-between pb-4 border-b border-border last:border-0 last:pb-0">
                      <div className="flex-1">
                        <p className="font-semibold">{trainer.name}</p>
                        <p className="text-muted-foreground text-sm">{trainer.speciality}</p>
                        <p className="text-muted-foreground text-xs mt-1">{trainer.members} members • ★ {trainer.rating}</p>
                      </div>
                      <Button size="sm" variant="ghost" className="text-foreground hover:bg-background/50">
                        Edit
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>
              <Link href="/admin/trainers">
                <Button variant="outline" className="w-full border-border text-foreground hover:bg-background">
                  View All Trainers
                </Button>
              </Link>
            </div>
          </div>

          {/* Classes Management */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Classes</h2>
              <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                + Create Class
              </Button>
            </div>
            <Card className="bg-card border-border overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-6 py-3 text-left text-sm font-semibold">Class Name</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Trainer</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Members</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Schedule</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'HIIT Training', trainer: 'Sarah Johnson', members: '24/25', schedule: 'MWF 4:30 PM' },
                    { name: 'Strength & Power', trainer: 'Alex Rodriguez', members: '18/20', schedule: 'TTh 5:00 PM' },
                    { name: 'Yoga & Flexibility', trainer: 'Michael Chen', members: '32/35', schedule: 'Daily 6:00 AM/PM' },
                  ].map((cls, i) => (
                    <tr key={i} className="border-b border-border hover:bg-background/50">
                      <td className="px-6 py-3">{cls.name}</td>
                      <td className="px-6 py-3 text-muted-foreground">{cls.trainer}</td>
                      <td className="px-6 py-3">{cls.members}</td>
                      <td className="px-6 py-3 text-muted-foreground text-sm">{cls.schedule}</td>
                      <td className="px-6 py-3">
                        <Button size="sm" variant="ghost" className="text-foreground hover:bg-background/50">
                          Edit
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </div>

          {/* Revenue Overview */}
          <Card className="bg-card border-border p-6">
            <h2 className="text-2xl font-bold mb-4">Revenue Overview</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <p className="text-muted-foreground text-sm mb-2">This Month</p>
                <p className="text-3xl font-bold">$48,500</p>
                <p className="text-secondary text-xs mt-2">+8% from last month</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm mb-2">Active Subscriptions</p>
                <p className="text-3xl font-bold">387</p>
                <p className="text-secondary text-xs mt-2">+24 new this month</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm mb-2">Avg Member Value</p>
                <p className="text-3xl font-bold">$125</p>
                <p className="text-secondary text-xs mt-2">+5% YoY growth</p>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
