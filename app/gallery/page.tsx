'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Navbar } from '@/components/navbar';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useGsapFadeIn, useGsapSlideIn, useGsapStagger } from '@/hooks/use-gsap-animation';

const galleryImages = [
  {
    src: '/gallery-1.jpg',
    title: 'Personal Training',
    category: 'Coaching',
  },
  {
    src: '/gallery-2.jpg',
    title: 'One-on-One Coaching',
    category: 'Coaching',
  },
  {
    src: '/gallery-3.jpg',
    title: 'State-of-the-Art Equipment',
    category: 'Facilities',
  },
  {
    src: '/gallery-4.jpg',
    title: 'Premium Gym Facilities',
    category: 'Facilities',
  },
  {
    src: '/gallery-5.jpg',
    title: 'Strength Training Zone',
    category: 'Training',
  },
  {
    src: '/gallery-6.jpg',
    title: 'HIIT Training Sessions',
    category: 'Training',
  },
  {
    src: '/gallery-7.jpg',
    title: 'Yoga & Pilates Classes',
    category: 'Classes',
  },
  {
    src: '/gallery-8.jpg',
    title: 'Group Fitness Classes',
    category: 'Classes',
  },
  {
    src: '/gallery-9.jpg',
    title: 'Functional Training',
    category: 'Training',
  },
  {
    src: '/gallery-10.jpg',
    title: 'Athletic Performance',
    category: 'Training',
  },
];

const categories = ['All', 'Facilities', 'Classes', 'Training', 'Coaching'];

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  
  // GSAP animation refs
  const heroRef = useGsapFadeIn(0.2);
  const filtersRef = useGsapSlideIn('up', 0.4);
  const galleryGridRef = useGsapStagger(0.6);

  const filteredImages = activeCategory === 'All'
    ? galleryImages
    : galleryImages.filter((img) => img.category === activeCategory);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 px-6 bg-gradient-to-b from-card to-background">
        <div ref={heroRef} className="mx-auto max-w-5xl text-center space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            Gallery
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Take a tour of our luxurious facilities and see our members in action
          </p>
        </div>
      </section>

      {/* Filter Buttons */}
      <section className="py-8 px-6">
        <div ref={filtersRef} className="mx-auto max-w-6xl">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-secondary text-secondary-foreground'
                    : 'bg-card text-foreground hover:bg-card border border-border'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 px-6">
        <div className="mx-auto max-w-6xl">
          <div ref={galleryGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((image, index) => (
              <div
                key={index}
                onClick={() => setSelectedImage(image)}
                className="group relative overflow-hidden rounded-lg cursor-pointer h-80"
              >
                <Image
                  src={image.src}
                  alt={image.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end">
                  <div className="w-full p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-white font-semibold text-lg">{image.title}</h3>
                    <p className="text-white/70 text-sm">{image.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-4xl">
            <div className="relative w-full aspect-video">
              <Image
                src={selectedImage.src}
                alt={selectedImage.title}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="mt-4">
              <h2 className="text-2xl font-bold">{selectedImage.title}</h2>
              <p className="text-muted-foreground mt-2">{selectedImage.category}</p>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
