'use client';

import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  emoji: string;
  rotation: number;
  size: number;
}

export default function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Student-related emojis
    const studentEmojis = ['📚', '✏️', '🧮', '✒️', '📄', '📓', '📐', '📝'];
    
    // Particle configuration
    const particleCount = 50;
    const minSize = 20;
    const maxSize = 35;
    const minSpeed = 0;
    const maxSpeed = 5;

    // Create particles
    const createParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < particleCount; i++) {
        const initialVx = (Math.random() - 0.5) * (minSpeed + Math.random() * (maxSpeed - minSpeed));
        const initialVy = (Math.random() - 0.5) * (minSpeed + Math.random() * (maxSpeed - minSpeed));
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: initialVx,
          vy: initialVy,
          emoji: studentEmojis[Math.floor(Math.random() * studentEmojis.length)],
          rotation: Math.atan2(initialVy, initialVx),
          size: minSize + Math.random() * (maxSize - minSize),
        });
      }
    };

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createParticles(); // Recreate particles on resize
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges with some randomness
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.vx = -particle.vx + (Math.random() - 0.5) * 0.5;
          particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.vy = -particle.vy + (Math.random() - 0.5) * 0.5;
          particle.y = Math.max(0, Math.min(canvas.height, particle.y));
        }

        // Occasionally change direction randomly for more organic movement
        if (Math.random() < 0.01) {
          particle.vx += (Math.random() - 0.5) * 0.3;
          particle.vy += (Math.random() - 0.5) * 0.3;
          // Limit speed
          const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
          if (speed > maxSpeed) {
            particle.vx = (particle.vx / speed) * maxSpeed;
            particle.vy = (particle.vy / speed) * maxSpeed;
          }
        }

        // Update rotation based on movement direction
        particle.rotation = Math.atan2(particle.vy, particle.vx);

        // Draw rotated emoji
        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate(particle.rotation);
        ctx.font = `${particle.size}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(particle.emoji, 0, 0);
        ctx.restore();

        // Draw connections between nearby particles
        particlesRef.current.forEach((otherParticle) => {
          if (particle !== otherParticle) {
            const dx = otherParticle.x - particle.x;
            const dy = otherParticle.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
              const opacity = (1 - distance / 150) * 0.2;
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
        });
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 w-full h-full"
      style={{ pointerEvents: 'none' }}
    />
  );
}


