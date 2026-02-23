'use client';

import { useState } from 'react';
import { Navbar } from '@/components/navbar';
import { ScrollAnimation } from '@/components/scroll-animation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { useGsapFadeIn, useGsapSlideIn, useGsapStagger, useGsapScale } from '@/hooks/use-gsap-animation';

const blogPosts = [
  {
    id: 1,
    title: '7 Must-Eat Foods for Muscle Growth',
    excerpt: 'Discover the best protein-rich foods that will accelerate your muscle building journey and maximize your gym results.',
    content: `Building muscle requires more than just hitting the gym hard. Your nutrition plays a crucial role in recovery and growth. Here are the top 7 foods you should incorporate into your diet:

1. **Salmon** - Rich in omega-3 fatty acids and high-quality protein, salmon supports muscle recovery and reduces inflammation.

2. **Eggs** - Complete protein source with all amino acids needed for muscle synthesis. Eat the whole egg for maximum benefits.

3. **Greek Yogurt** - High in casein protein, which releases slowly, providing sustained amino acids throughout the day.

4. **Lean Beef** - Packed with iron, B vitamins, and creatine for enhanced strength and muscle mass.

5. **Chicken Breast** - Lean protein without excess fat, perfect for clean muscle gain.

6. **Chickpeas** - Plant-based protein option rich in fiber and micronutrients.

7. **Almonds** - Provide healthy fats, protein, and vitamin E for recovery and hormonal balance.

Remember, consistency in nutrition is just as important as your training. Aim for 0.8-1g of protein per pound of body weight daily.`,
    author: 'Dr. James Wilson',
    date: '2024-02-10',
    category: 'Nutrition',
    readTime: '5 min read',
  },
  {
    id: 2,
    title: '10 Foods to Avoid for Maximum Fitness',
    excerpt: 'Learn which foods can sabotage your fitness goals and what to replace them with for optimal results.',
    content: `While having a balanced diet is important, some foods can significantly hinder your fitness progress. Here are 10 foods you should minimize or avoid:

1. **Sugary Drinks** - Soda and energy drinks are packed with empty calories and can cause energy crashes.

2. **Fast Food** - High in calories, unhealthy fats, and sodium with minimal nutritional value.

3. **Refined White Bread** - Causes blood sugar spikes and lacks essential nutrients. Choose whole grain alternatives.

4. **Processed Snacks** - Chips, cookies, and crackers are calorie-dense but nutrient-poor.

5. **Trans Fats** - Found in fried foods and baked goods, these increase inflammation.

6. **High-Sugar Cereals** - Even "healthy" cereals often contain excessive sugar.

7. **Alcohol** - Adds empty calories and interferes with recovery and muscle growth.

8. **Excess Salt** - Can cause water retention and increase blood pressure.

9. **Artificial Sweeteners** - May cause metabolic changes and increase cravings.

10. **Delayed Digestion Junk Foods** - Slows metabolism and causes discomfort during workouts.

Instead, focus on whole foods: lean proteins, fresh vegetables, fruits, whole grains, and healthy fats.`,
    author: 'Sarah Mitchell',
    date: '2024-02-08',
    category: 'Nutrition',
    readTime: '6 min read',
  },
  {
    id: 3,
    title: 'The Science Behind HIIT Training',
    excerpt: 'Understand why High-Intensity Interval Training is one of the most effective workout methods available.',
    content: `High-Intensity Interval Training (HIIT) has become increasingly popular, and for good reason. Let's explore the science behind why it works so effectively:

**What is HIIT?**
HIIT involves alternating between short bursts of intense exercise and periods of lower intensity or rest. For example, 30 seconds of maximum effort followed by 60 seconds of recovery.

**Why HIIT is Effective:**

1. **Afterburn Effect (EPOC)** - Your body continues burning calories for hours after HIIT, even at rest.

2. **Muscle Preservation** - Unlike steady cardio, HIIT preserves lean muscle mass while burning fat.

3. **Time Efficient** - A 20-30 minute HIIT session can be as effective as 60 minutes of steady-state cardio.

4. **Metabolic Boost** - HIIT improves insulin sensitivity and increases growth hormone production.

5. **Cardiovascular Improvements** - Strengthens both aerobic and anaerobic systems.

**Getting Started:**
Begin with a 1:2 work-to-rest ratio if you're new to HIIT. As your fitness improves, gradually increase the intensity or decrease the rest period.

Remember to warm up properly and consult with a trainer to ensure proper form and prevent injury.`,
    author: 'Coach Marcus Lee',
    date: '2024-02-05',
    category: 'Training',
    readTime: '7 min read',
  },
  {
    id: 4,
    title: 'Recovery: The Secret to Consistent Progress',
    excerpt: 'Discover why proper recovery is as important as your workouts for achieving fitness goals.',
    content: `Many people underestimate the importance of recovery in their fitness journey. Your muscles don't grow in the gym—they grow during recovery. Here's what you need to know:

**Why Recovery Matters:**
- Muscle fiber repair and growth occurs during rest
- Nervous system recovery improves performance
- Reduced injury risk
- Mental health benefits and stress reduction

**Recovery Methods:**

1. **Sleep** - Aim for 7-9 hours nightly for optimal recovery and hormone balance.

2. **Nutrition** - Consume protein and carbs within 1-2 hours post-workout.

3. **Hydration** - Drink water consistently throughout the day, not just during workouts.

4. **Active Recovery** - Light activities like walking, yoga, or swimming promote blood flow.

5. **Massage & Foam Rolling** - Reduces muscle tension and improves flexibility.

6. **Stretching** - Prevents injury and maintains mobility.

7. **Ice Baths** - Can reduce inflammation (though debate continues on effectiveness).

**Recovery Timeline:**
- Muscle soreness: 24-72 hours (DOMS)
- Full muscle recovery: 48-72 hours
- CNS recovery: 4-6 days for intense training

Incorporate at least one full rest day per week where you do minimal activity.`,
    author: 'Dr. Elena Rodriguez',
    date: '2024-02-03',
    category: 'Recovery',
    readTime: '6 min read',
  },
  {
    id: 5,
    title: 'Strength Training for Beginners: A Complete Guide',
    excerpt: 'Start your strength training journey with this comprehensive beginner\'s guide to building a solid foundation.',
    content: `Starting strength training can seem intimidating, but with the right approach, anyone can build a strong foundation. Here's your complete beginner's guide:

**Essential Principles:**

1. **Form Over Weight** - Always prioritize correct technique over heavier weights. Bad form leads to injury.

2. **Progressive Overload** - Gradually increase weight, reps, or sets to continue making progress.

3. **Compound Movements** - Focus on exercises that work multiple muscle groups: squats, deadlifts, bench press, rows.

4. **Frequency** - Train each muscle group 2-3 times per week for optimal growth.

**Beginner Workout Split (3 Days/Week):**

Day 1 - Upper Body:
- Bench Press: 3x8
- Rows: 3x8
- Overhead Press: 3x6

Day 2 - Lower Body:
- Squats: 4x6
- Deadlifts: 3x5
- Leg Press: 3x8

Day 3 - Full Body:
- Compound movements at 60% intensity

**Common Beginner Mistakes to Avoid:**
- Lifting too heavy too fast
- Inconsistent training schedule
- Neglecting warm-ups
- Poor nutrition
- Comparing yourself to others

**Progression Timeline:**
- Weeks 1-4: Adaptation phase, focus on form
- Weeks 5-8: Increase weight by 5-10%
- Weeks 9-12: Reassess and plan next cycle

Remember, consistency beats perfection. Start light, master the form, then progressively challenge yourself.`,
    author: 'Mike Thompson',
    date: '2024-02-01',
    category: 'Training',
    readTime: '8 min read',
  },
  {
    id: 6,
    title: 'Mental Health & Fitness: The Mind-Body Connection',
    excerpt: 'Explore how exercise benefits your mental health and why the gym is as much therapy as training.',
    content: `Physical fitness and mental health are deeply interconnected. Regular exercise is one of the most effective treatments for anxiety and depression. Here's why:

**The Science:**
Exercise releases endorphins, often called "feel-good" chemicals. It also reduces cortisol (stress hormone) and improves sleep quality.

**Benefits for Mental Health:**

1. **Reduced Anxiety** - Physical activity calms the nervous system and provides a healthy outlet for stress.

2. **Depression Management** - Exercise is as effective as some medications for mild to moderate depression.

3. **Improved Sleep** - Regular activity helps regulate circadian rhythms.

4. **Increased Confidence** - Achieving fitness goals builds self-esteem and body image.

5. **Stress Relief** - The gym provides a space to disconnect and focus on yourself.

6. **Social Connection** - Group classes create community and reduce isolation.

7. **Better Focus** - Exercise improves cognitive function and memory.

**Making Fitness Part of Your Mental Health Routine:**
- Choose activities you enjoy, not just trendy workouts
- Find a supportive community (like Dimah-Fitness)
- Set realistic goals and celebrate small wins
- Use fitness as a form of meditation
- Be patient with yourself during difficult times

Remember, fitness is a journey, not a destination. Celebrate progress over perfection.`,
    author: 'Dr. Lisa Chen',
    date: '2024-01-30',
    category: 'Wellness',
    readTime: '5 min read',
  },
];

const categories = ['All', ...Array.from(new Set(blogPosts.map(p => p.category)))];

export default function BlogPage() {
  const [expandedPost, setExpandedPost] = useState<number | null>(null);
  
  // GSAP animation refs
  const heroRef = useGsapFadeIn(0.2);
  const categoriesRef = useGsapSlideIn('up', 0.4);
  const postsGridRef = useGsapStagger(0.6);
  const newsletterRef = useGsapScale(0.8);

  const filteredPosts = blogPosts;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center px-6 py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-72 h-72 bg-secondary/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
        </div>

        <div ref={heroRef} className="relative z-10 max-w-3xl mx-auto text-center space-y-8">
          <ScrollAnimation animationType="fadeIn">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              Fitness <span className="text-secondary">Education Hub</span>
            </h1>
          </ScrollAnimation>

          <ScrollAnimation animationType="slideUp" delay={0.2}>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Expert tips, nutrition guides, training strategies, and wellness advice to optimize your fitness journey.
            </p>
          </ScrollAnimation>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-6xl">
          <div ref={postsGridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, idx) => (
              <ScrollAnimation
                key={post.id}
                animationType="slideUp"
                delay={idx * 0.1}
              >
                <Card
                  className="flex flex-col overflow-hidden hover:shadow-xl transition-shadow cursor-pointer h-full"
                  onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}
                >
                  <div className="p-6 flex flex-col flex-1 space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="inline-block px-3 py-1 rounded-full bg-secondary/20 text-secondary text-xs font-semibold">
                          {post.category}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold line-clamp-2 text-balance">
                        {post.title}
                      </h3>
                    </div>

                    <p className="text-muted-foreground text-sm flex-1 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex flex-col gap-3 pt-4 border-t border-border">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {post.author}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(post.date).toLocaleDateString()}
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">{post.readTime}</p>
                    </div>

                    {expandedPost === post.id && (
                      <div className="pt-4 border-t border-border space-y-4">
                        <div className="prose prose-invert max-w-none text-sm text-muted-foreground whitespace-pre-wrap">
                          {post.content}
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 px-6 bg-card/50">
        <div ref={newsletterRef} className="mx-auto max-w-2xl text-center space-y-8">
          <ScrollAnimation animationType="fadeIn">
            <h2 className="text-3xl font-bold">Stay Updated</h2>
            <p className="text-muted-foreground">
              Subscribe to our newsletter for weekly fitness tips and nutrition advice.
            </p>
          </ScrollAnimation>

          <ScrollAnimation animationType="slideUp" delay={0.2}>
            <div className="flex gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg bg-background border border-border focus:outline-none focus:border-secondary"
              />
              <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                Subscribe
              </Button>
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
              <h4 className="font-semibold text-sm mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/services" className="hover:text-foreground">Services</Link></li>
                <li><Link href="/gallery" className="hover:text-foreground">Gallery</Link></li>
                <li><Link href="/about" className="hover:text-foreground">About Us</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/contact" className="hover:text-foreground">Contact</Link></li>
                <li><Link href="/reviews" className="hover:text-foreground">Reviews</Link></li>
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
