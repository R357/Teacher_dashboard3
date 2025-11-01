"use client";

import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

interface ScrollAnimatorProps {
  children: React.ReactNode;
  className?: string;
  animation?: "fadeUp" | "fadeIn" | "scale" | "slideRight";
}

export const ScrollAnimator: React.FC<ScrollAnimatorProps> = ({ 
  children, 
  className,
  animation = "fadeUp" 
}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const variants = {
    fadeUp: {
      hidden: { 
        opacity: 0, 
        y: 50
      },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: { 
          duration: 0.6, 
          ease: [0.25, 0.1, 0.25, 1.0] 
        } 
      }
    },
    fadeIn: {
      hidden: { 
        opacity: 0
      },
      visible: { 
        opacity: 1,
        transition: { 
          duration: 0.6
        } 
      }
    },
    scale: {
      hidden: { 
        opacity: 0, 
        scale: 0.3
      },
      visible: { 
        opacity: 1, 
        scale: 1,
        transition: { 
          duration: 0.5,
          ease: [0.25, 0.1, 0.25, 1.0] 
        } 
      }
    },
    slideRight: {
      hidden: { 
        opacity: 0, 
        x: -50
      },
      visible: { 
        opacity: 1, 
        x: 0,
        transition: { 
          duration: 0.6,
          ease: [0.25, 0.1, 0.25, 1.0] 
        } 
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={controls}
      variants={variants[animation]}
    >
      {children}
    </motion.div>
  );
};