'use client';

import React, { useEffect, useRef } from 'react';

type AuthParticlesBackgroundProps = {
  particleCount?: number;
  connectRadius?: number;
  maxSpeed?: number;
  dotColor?: string;
  lineColor?: string;
  dotRadius?: number; // logical pixels (pre-DPR)
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
};

export default function AuthParticlesBackground({
  particleCount = 80,
  connectRadius = 100,
  maxSpeed = 0.5,
  dotColor = 'rgba(0,0,0,0.7)',
  lineColor = 'rgba(0,0,0,', // alpha appended dynamically
  dotRadius = 2.5,
}: AuthParticlesBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>();
  const lastTimeRef = useRef<number>(0);
  const dprRef = useRef<number>(1);
  const widthRef = useRef<number>(0);
  const heightRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const effectiveCount = prefersReducedMotion ? Math.ceil(particleCount / 2) : particleCount;
    const effectiveRadius = prefersReducedMotion ? Math.max(1.8, dotRadius - 0.4) : dotRadius;
    const effectiveMaxSpeed = prefersReducedMotion ? Math.max(0.12, maxSpeed * 0.6) : maxSpeed;
    const effectiveConnect = prefersReducedMotion ? Math.max(70, connectRadius * 0.75) : connectRadius;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      dprRef.current = dpr;
      const cssW = window.innerWidth;
      const cssH = window.innerHeight;
      widthRef.current = cssW;
      heightRef.current = cssH;
      canvas.style.width = `${cssW}px`;
      canvas.style.height = `${cssH}px`;
      canvas.width = Math.floor(cssW * dpr);
      canvas.height = Math.floor(cssH * dpr);
      const c2d = canvas.getContext('2d');
      if (c2d) c2d.setTransform(dpr, 0, 0, dpr, 0, 0);

      const particles: Particle[] = [];
      for (let i = 0; i < effectiveCount; i++) {
        const vx = (Math.random() - 0.5) * effectiveMaxSpeed;
        const vy = (Math.random() - 0.5) * effectiveMaxSpeed;
        particles.push({
          x: Math.random() * cssW,
          y: Math.random() * cssH,
          vx,
          vy,
        });
      }
      particlesRef.current = particles;
    };

    resize();
    window.addEventListener('resize', resize);

    const animate = (t = 0) => {
      const dt = Math.min(2, (t - (lastTimeRef.current || 0)) / (1000 / 60)) || 1;
      lastTimeRef.current = t;

      ctx.clearRect(0, 0, widthRef.current, heightRef.current);

      ctx.fillStyle = dotColor;
      for (const p of particlesRef.current) {
        p.x += p.vx * dt;
        p.y += p.vy * dt;

        if (p.x < 0 || p.x > widthRef.current) {
          p.vx = -p.vx + (Math.random() - 0.5) * 0.05;
          p.x = Math.max(0, Math.min(widthRef.current, p.x));
        }
        if (p.y < 0 || p.y > heightRef.current) {
          p.vy = -p.vy + (Math.random() - 0.5) * 0.05;
          p.y = Math.max(0, Math.min(heightRef.current, p.y));
        }

        if (!prefersReducedMotion && Math.random() < 0.005) {
          p.vx += (Math.random() - 0.5) * 0.05;
          p.vy += (Math.random() - 0.5) * 0.05;
          const speed = Math.hypot(p.vx, p.vy);
          if (speed > effectiveMaxSpeed) {
            p.vx = (p.vx / speed) * effectiveMaxSpeed;
            p.vy = (p.vy / speed) * effectiveMaxSpeed;
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, effectiveRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      if (effectiveConnect > 0) {
        const cell = effectiveConnect;
        const grid = new Map<string, number[]>();
        const keyFor = (x: number, y: number) => `${Math.floor(x / cell)}:${Math.floor(y / cell)}`;
        const arr = particlesRef.current;

        for (let i = 0; i < arr.length; i++) {
          const k = keyFor(arr[i].x, arr[i].y);
          const bucket = grid.get(k);
          if (bucket) bucket.push(i); else grid.set(k, [i]);
        }

        ctx.lineWidth = 1;
        for (let i = 0; i < arr.length; i++) {
          const a = arr[i];
          const cx = Math.floor(a.x / cell);
          const cy = Math.floor(a.y / cell);
          for (let gx = cx - 1; gx <= cx + 1; gx++) {
            for (let gy = cy - 1; gy <= cy + 1; gy++) {
              const bucket = grid.get(`${gx}:${gy}`);
              if (!bucket) continue;
              for (let k = 0; k < bucket.length; k++) {
                const j = bucket[k];
                if (j <= i) continue;
                const b = arr[j];
                const dx = b.x - a.x;
                const dy = b.y - a.y;
                const d = Math.hypot(dx, dy);
                if (d < effectiveConnect) {
                  const alpha = (1 - d / effectiveConnect) * 0.22;
                  ctx.strokeStyle = `${lineColor}${alpha})`;
                  ctx.beginPath();
                  ctx.moveTo(a.x, a.y);
                  ctx.lineTo(b.x, b.y);
                  ctx.stroke();
                }
              }
            }
          }
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [particleCount, connectRadius, maxSpeed, dotColor, lineColor, dotRadius]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 w-full h-full"
      style={{ pointerEvents: 'none' }}
    />
  );
}


