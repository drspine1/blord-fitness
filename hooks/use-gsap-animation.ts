'use client';

import { useEffect, useRef } from 'react';

// This hook will use GSAP when it's installed
// For now, it's a placeholder that you can enhance after installing GSAP

export function useGsapFadeIn(delay: number = 0) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && ref.current) {
      const gsap = (window as any).gsap;
      
      if (gsap) {
        gsap.fromTo(
          ref.current,
          { opacity: 0, y: 30 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.8, 
            delay,
            ease: 'power3.out',
            once: true
          }
        );
      }
    }
  }, [delay]);

  return ref;
}

export function useGsapSlideIn(direction: 'left' | 'right' | 'up' | 'down' = 'up', delay: number = 0) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && ref.current) {
      const gsap = (window as any).gsap;
      
      if (gsap) {
        const directions = {
          left: { x: -50, y: 0 },
          right: { x: 50, y: 0 },
          up: { x: 0, y: 30 },
          down: { x: 0, y: -30 },
        };

        const from = directions[direction];

        gsap.fromTo(
          ref.current,
          { opacity: 0, ...from },
          { 
            opacity: 1, 
            x: 0, 
            y: 0, 
            duration: 1, 
            delay,
            ease: 'power3.out',
            once: true
          }
        );
      }
    }
  }, [direction, delay]);

  return ref;
}

export function useGsapStagger(delay: number = 0) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && ref.current) {
      const gsap = (window as any).gsap;
      
      if (gsap) {
        const children = ref.current.children;
        
        gsap.fromTo(
          children,
          { opacity: 0, y: 20 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.6, 
            delay,
            stagger: 0.1,
            ease: 'power2.out',
            once: true
          }
        );
      }
    }
  }, [delay]);

  return ref;
}

export function useGsapScale(delay: number = 0) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && ref.current) {
      const gsap = (window as any).gsap;
      
      if (gsap) {
        gsap.fromTo(
          ref.current,
          { opacity: 0, scale: 0.8 },
          { 
            opacity: 1, 
            scale: 1, 
            duration: 0.8, 
            delay,
            ease: 'back.out(1.7)',
            once: true
          }
        );
      }
    }
  }, [delay]);

  return ref;
}

export function useGsapRotateIn(delay: number = 0) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && ref.current) {
      const gsap = (window as any).gsap;
      
      if (gsap) {
        gsap.fromTo(
          ref.current,
          { opacity: 0, rotation: -10, scale: 0.9 },
          { 
            opacity: 1, 
            rotation: 0, 
            scale: 1, 
            duration: 1, 
            delay,
            ease: 'elastic.out(1, 0.5)',
            once: true
          }
        );
      }
    }
  }, [delay]);

  return ref;
}
