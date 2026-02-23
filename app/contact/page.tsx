'use client';

import { useState } from 'react';
import { Navbar } from '@/components/navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { useGsapFadeIn, useGsapSlideIn, useGsapStagger } from '@/hooks/use-gsap-animation';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  
  // GSAP animation refs
  const heroRef = useGsapFadeIn(0.2);
  const contactCardsRef = useGsapStagger(0.4);
  const formRef = useGsapSlideIn('up', 0.6);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate form
      if (!formData.name || !formData.email || !formData.message) {
        toast.error('Please fill in all required fields');
        setIsLoading(false);
        return;
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast.success('Message sent successfully! We will contact you soon.');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Location',
      content: '123 Fitness Avenue, Premium City, PC 12345',
    },
    {
      icon: Phone,
      title: 'Phone',
      content: '+1 (555) 123-4567',
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'info@dimahs-fitness.com',
    },
    {
      icon: Clock,
      title: 'Hours',
      content: 'Mon-Fri: 6am-10pm\nSat-Sun: 8am-8pm',
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 px-6 bg-gradient-to-b from-card to-background">
        <div ref={heroRef} className="mx-auto max-w-5xl text-center space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            Get In Touch
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Get in touch with our team.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 px-6">
        <div className="mx-auto max-w-6xl">
          <div ref={contactCardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-secondary" />
                    </div>
                    <CardTitle className="text-lg">{info.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground whitespace-pre-line">{info.content}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 px-6 bg-card">
        <div ref={formRef} className="mx-auto max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Send us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name *</label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                      className="border border-secondary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email *</label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                      className="border border-secondary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone</label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(555) 123-4567"
                      className="border border-secondary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Subject *</label>
                    <Input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Subject of inquiry"
                      required
                      className="border border-secondary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Message *</label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message..."
                    rows={6}
                    required
                    className="border border-secondary"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
                >
                  {isLoading ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
