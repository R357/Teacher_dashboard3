"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

interface ScrollAnimatorProps {
  children: React.ReactNode;
  className?: string;
}

export const ScrollAnimator: React.FC<ScrollAnimatorProps> = ({ children, className }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  // Track scroll progress of this specific element
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.1"], // Starts animation earlier, more visible range
  });

  // Create smooth spring animations with more bounce
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
    restDelta: 0.001
  });

  // More dramatic transformations
  const y = useTransform(smoothProgress, [0, 1], [150, 0]); // Starts 150px below
  const opacity = useTransform(smoothProgress, [0, 0.3, 1], [0, 0.5, 1]); // Gradual fade
  const scale = useTransform(smoothProgress, [0, 1], [0.85, 1]); // More noticeable scale
  const rotateX = useTransform(smoothProgress, [0, 1], [15, 0]); // 3D tilt effect

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        y,
        opacity,
        scale,
        rotateX,
        transformPerspective: 1200, // Adds 3D depth
      }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollAnimator;