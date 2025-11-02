'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';

interface SlideInProps {
  children: ReactNode;
  direction?: 'left' | 'right';
  delay?: number;
}

export default function SlideIn({ children, direction = 'left', delay = 0 }: SlideInProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay]);

  const slideStyle = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible 
      ? 'translateX(0)' 
      : direction === 'left' 
        ? 'translateX(-100px)' 
        : 'translateX(100px)',
    transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
  };

  return (
    <div ref={ref} style={slideStyle}>
      {children}
    </div>
  );
}