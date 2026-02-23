'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollAnimationProps {
  children: React.ReactNode;
  animationType?: 'fadeIn' | 'slideUp' | 'slideInLeft' | 'slideInRight' | 'scaleIn';
  delay?: number;
  duration?: number;
  triggerStart?: string;
}

export function ScrollAnimation({
  children,
  animationType = 'fadeIn',
  delay = 0,
  duration = 0.8,
  triggerStart = 'top 80%',
}: ScrollAnimationProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const getAnimation = () => {
      const obj = { opacity: 0 };

      switch (animationType) {
        case 'fadeIn':
          return obj;
        case 'slideUp':
          return { ...obj, y: 60 };
        case 'slideInLeft':
          return { ...obj, x: -60 };
        case 'slideInRight':
          return { ...obj, x: 60 };
        case 'scaleIn':
          return { ...obj, scale: 0.8 };
        default:
          return obj;
      }
    };

    gsap.fromTo(
      ref.current,
      getAnimation(),
      {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        duration,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: triggerStart,
          end: 'top 60%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [animationType, delay, duration, triggerStart]);

  return <div ref={ref}>{children}</div>;
}
