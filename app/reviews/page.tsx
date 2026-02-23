'use client';

import { useState } from 'react';
import { Navbar } from '@/components/navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Star, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { useGsapFadeIn, useGsapSlideIn, useGsapStagger, useGsapScale } from '@/hooks/use-gsap-animation';

interface Review {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  title: string;
  content: string;
  date: string;
}

const initialReviews: Review[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    avatar: 'SJ',
    rating: 5,
    title: 'Life-Changing Experience',
    content: 'Dimah-Fitness has transformed my life. The trainers are incredibly knowledgeable and supportive. The facilities are top-notch and the community is amazing!',
    date: '2 weeks ago',
  },
  {
    id: 2,
    name: 'Michael Chen',
    avatar: 'MC',
    rating: 5,
    title: 'Best Gym Experience Ever',
    content: 'I\'ve been to many gyms, but Dimah-Fitness stands out. The equipment is premium, the classes are diverse, and the staff genuinely cares about your progress.',
    date: '1 month ago',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    avatar: 'ER',
    rating: 5,
    title: 'Exceeded All Expectations',
    content: 'From the moment I walked in, I knew this was different. The luxury amenities, personal attention, and results speak for themselves. Highly recommended!',
    date: '1 month ago',
  },
  {
    id: 4,
    name: 'David Smith',
    avatar: 'DS',
    rating: 5,
    title: 'Professional & Motivating',
    content: 'The trainers at Dimah-Fitness are true professionals. They push me to my limits while keeping me safe. My fitness goals have never been closer.',
    date: '6 weeks ago',
  },
  {
    id: 5,
    name: 'Jessica Lee',
    avatar: 'JL',
    rating: 5,
    title: 'Worth Every Penny',
    content: 'Premium quality at a fair price. The environment is inspiring, the equipment is modern, and the results are incredible. This is my second home!',
    date: '2 months ago',
  },
  {
    id: 6,
    name: 'Robert Thompson',
    avatar: 'RT',
    rating: 5,
    title: 'Exceptional Service',
    content: 'Every aspect of Dimah-Fitness is exceptional. From customer service to training quality, everything is done with excellence and passion.',
    date: '2 months ago',
  },
];

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [newReview, setNewReview] = useState({
    name: '',
    title: '',
    content: '',
    rating: 5,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // GSAP animation refs
  const heroRef = useGsapFadeIn(0.2);
  const ratingSummaryRef = useGsapScale(0.4);
  const formRef = useGsapSlideIn('up', 0.6);
  const reviewsGridRef = useGsapStagger(0.8);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newReview.name || !newReview.title || !newReview.content) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const review: Review = {
        id: reviews.length + 1,
        name: newReview.name,
        avatar: newReview.name.split(' ').map((n) => n[0]).join(''),
        rating: newReview.rating,
        title: newReview.title,
        content: newReview.content,
        date: 'Just now',
      };

      setReviews([review, ...reviews]);
      setNewReview({ name: '', title: '', content: '', rating: 5 });
      toast.success('Thank you for your review!');
    } catch (error) {
      toast.error('Failed to submit review');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteReview = (reviewId: number, reviewName: string) => {
    setReviews(reviews.filter(review => review.id !== reviewId));
    toast.success(`Review by ${reviewName} has been deleted`);
  };

  const averageRating = (
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
  ).toFixed(1);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 px-6 bg-gradient-to-b from-card to-background">
        <div ref={heroRef} className="mx-auto max-w-5xl text-center space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            Member Reviews
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See what our members are saying about their Dimah-Fitness experience
          </p>
        </div>
      </section>

      {/* Rating Summary */}
      <section className="py-12 px-6 bg-card">
        <div ref={ratingSummaryRef} className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-8 h-8 fill-secondary text-secondary"
              />
            ))}
          </div>
          <p className="text-5xl font-bold mb-2">{averageRating}</p>
          <p className="text-muted-foreground text-lg">Based on {reviews.length} reviews</p>
        </div>
      </section>

      {/* Submit Review Form */}
      <section className="py-16 px-6">
        <div ref={formRef} className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold mb-8">Share Your Experience</h2>
          <Card>
            <CardHeader className="pb-4">
              <h3 className="text-xl font-semibold">Write a Review</h3>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitReview} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name *</label>
                    <Input
                      type="text"
                      value={newReview.name}
                      onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Rating *</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          type="button"
                          onClick={() => setNewReview({ ...newReview, rating })}
                          className="transition-transform hover:scale-110"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              rating <= newReview.rating
                                ? 'fill-secondary text-secondary'
                                : 'text-muted-foreground'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Review Title *</label>
                  <Input
                    type="text"
                    value={newReview.title}
                    onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                    placeholder="Summarize your experience"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Your Review *</label>
                  <Textarea
                    value={newReview.content}
                    onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
                    placeholder="Share your detailed experience..."
                    rows={5}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Review'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="py-16 px-6 bg-card">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-12">What Members Say</h2>
          <div ref={reviewsGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <Card key={review.id} className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteReview(review.id, review.name)}
                  className="absolute top-2 right-2 h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
                  title="Delete review"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>{review.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-sm">{review.name}</p>
                        <p className="text-xs text-muted-foreground">{review.date}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1 mb-3">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
                    ))}
                  </div>
                  <h3 className="font-semibold text-lg">{review.title}</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed">{review.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
