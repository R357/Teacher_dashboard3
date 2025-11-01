// app/(student-dashboard)/components/ScrollAnimator.tsx
"use client";

import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

interface ScrollAnimatorProps {
  children: React.ReactNode;
  className?: string;
}

export const ScrollAnimator: React.FC<ScrollAnimatorProps> = ({ children, className }) => {
  const controls = useAnimation();
  
  const [ref, inView] = useInView({
    threshold: 0.1, 
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden" 
      animate={controls}
      variants={{
        // ✅ CHANGED: Updated the hidden state
        hidden: { 
          opacity: 0, 
          scale: 0.30, // Starts at 50% size (very small)
          y: 200      // Starts 200px down (from the bottom)
        },
        // 'visible' state is unchanged
        visible: { 
          opacity: 1, 
          scale: 1,     
          y: 0,         
          transition: { 
            duration: 0.6, 
            ease: [0.25, 0.1, 0.25, 1.0] 
          } 
        },
      }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollAnimator;