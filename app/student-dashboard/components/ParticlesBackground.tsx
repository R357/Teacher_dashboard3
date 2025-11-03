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
  const lastTimeRef = useRef<number>(0);
  const dprRef = useRef<number>(1);
  const logicalWidthRef = useRef<number>(0);
  const logicalHeightRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Student-related emojis
    const studentEmojis = ['📚', '✏️', '🧮', '✒️', '📄', '📓', '📐', '📝'];

    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Particle configuration (edit here)
    const CONFIG = prefersReducedMotion
      ? {
          particleCount: 16,
          minSize: 20,
          maxSize: 35,
          minSpeed: 0,
          maxSpeed: .5,
          CONNECT_RADIUS: 80,
          MAX_LINKS: 1,
        }
      : {
          particleCount: 30,
          minSize: 20,
          maxSize: 35,
          minSpeed: 0,
          maxSpeed: .5,
          CONNECT_RADIUS: 110,
          MAX_LINKS: 5,
        };
    const { particleCount, minSize, maxSize, minSpeed, maxSpeed, CONNECT_RADIUS, MAX_LINKS } = CONFIG;
    const particleSize = 30; // standard, non-randomized size

    // Create particles
    const createParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < particleCount; i++) {
        const initialVx = (Math.random() - 0.5) * (Math.random() * (maxSpeed - minSpeed));
        const initialVy = (Math.random() - 0.5) * (Math.random() * (maxSpeed - minSpeed));
        const halfSize = particleSize / 2;
        particlesRef.current.push({
          x: halfSize + Math.random() * Math.max(1, logicalWidthRef.current - particleSize),
          y: halfSize + Math.random() * Math.max(1, logicalHeightRef.current - particleSize),
          vx: initialVx,
          vy: initialVy,
          emoji: studentEmojis[Math.floor(Math.random() * studentEmojis.length)],
          rotation: Math.atan2(initialVy, initialVx),
          size: particleSize,
        });
      }
    };

    // Set canvas size with capped DPR for performance
    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
      dprRef.current = dpr;
      const cssWidth = window.innerWidth;
      const cssHeight = window.innerHeight;
      logicalWidthRef.current = cssWidth;
      logicalHeightRef.current = cssHeight;
      canvas.style.width = `${cssWidth}px`;
      canvas.style.height = `${cssHeight}px`;
      canvas.width = Math.floor(cssWidth * dpr);
      canvas.height = Math.floor(cssHeight * dpr);
      const ctx2d = canvas.getContext('2d');
      if (ctx2d) {
        ctx2d.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
      createParticles(); // Recreate particles on resize
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Animation loop (dt-based + spatial hashing for connections)
    const animate = (t = 0) => {
      const dt = Math.min(2, (t - (lastTimeRef.current || 0)) / (1000 / 60)) || 1;
      lastTimeRef.current = t;

      ctx.clearRect(0, 0, logicalWidthRef.current, logicalHeightRef.current);

      // Update positions and draw particles (skip rotation for perf)
      for (const particle of particlesRef.current) {
        particle.x += particle.vx * dt;
        particle.y += particle.vy * dt;

        // Bounce off edges considering particle size
        {
          const halfSize = particle.size / 2;
          const minX = halfSize;
          const maxX = logicalWidthRef.current - halfSize;
          const minY = halfSize;
          const maxY = logicalHeightRef.current - halfSize;
          if (particle.x < minX || particle.x > maxX) {
            particle.vx = -particle.vx + (Math.random() - 0.5) * 0.5;
            particle.x = Math.max(minX, Math.min(maxX, particle.x));
          }
          if (particle.y < minY || particle.y > maxY) {
            particle.vy = -particle.vy + (Math.random() - 0.5) * 0.5;
            particle.y = Math.max(minY, Math.min(maxY, particle.y));
          }
        }

        // Occasionally change direction randomly for more organic movement
        if (!prefersReducedMotion && Math.random() < 0.01) {
          particle.vx += (Math.random() - 0.5) * 0.3;
          particle.vy += (Math.random() - 0.5) * 0.3;
          const speed = Math.hypot(particle.vx, particle.vy);
          if (speed > maxSpeed) {
            particle.vx = (particle.vx / speed) * maxSpeed;
            particle.vy = (particle.vy / speed) * maxSpeed;
          }
        }

        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.font = `${particle.size}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(particle.emoji, 0, 0);
        ctx.restore();
      }

      // Build spatial grid and draw limited connections
      if (CONNECT_RADIUS > 0 && MAX_LINKS > 0) {
        const cellSize = CONNECT_RADIUS;
        const grid = new Map<string, number[]>();
        const keyFor = (x: number, y: number) => `${Math.floor(x / cellSize)}:${Math.floor(y / cellSize)}`;
        const particles = particlesRef.current;

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          const key = keyFor(p.x, p.y);
          const arr = grid.get(key);
          if (arr) arr.push(i); else grid.set(key, [i]);
        }

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          let links = 0;
          const cx = Math.floor(p.x / cellSize);
          const cy = Math.floor(p.y / cellSize);
          for (let gx = cx - 1; gx <= cx + 1 && links < MAX_LINKS; gx++) {
            for (let gy = cy - 1; gy <= cy + 1 && links < MAX_LINKS; gy++) {
              const arr = grid.get(`${gx}:${gy}`);
              if (!arr) continue;
              for (let k = 0; k < arr.length && links < MAX_LINKS; k++) {
                const j = arr[k];
                if (j === i) continue;
                const o = particles[j];
                const dx = o.x - p.x;
                const dy = o.y - p.y;
                const dist = Math.hypot(dx, dy);
                if (dist < CONNECT_RADIUS) {
                  const opacity = (1 - dist / CONNECT_RADIUS) * 0.2;
                  ctx.beginPath();
                  ctx.moveTo(p.x, p.y);
                  ctx.lineTo(o.x, o.y);
                  ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
                  ctx.lineWidth = 1;
                  ctx.stroke();
                  links++;
                }
              }
            }
          }
        }
      }

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


