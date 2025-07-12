// components/AnimatedElement.tsx
"use client";

import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

type AnimationType =
  | "fadeIn"
  | "slideLeft"
  | "slideRight"
  | "slideUp"
  | "slideDown"
  | "scaleIn"
  | "rotateIn";

interface AnimatedElementProps {
  children: ReactNode;
  type?: AnimationType;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

const animationVariants: Record<AnimationType, Variants> = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
  },
  slideRight: {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
  },
  slideUp: {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  },
  slideDown: {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1 },
  },
  rotateIn: {
    hidden: { opacity: 0, rotate: -45 },
    visible: { opacity: 1, rotate: 0 },
  },
};

export const AnimatedElement = ({
  children,
  type = "fadeIn",
  delay = 0,
  duration = 0.5,
  className = "overflow-hidden !important",
  once = true,
}: AnimatedElementProps) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
      variants={animationVariants[type]}
      transition={{
        delay,
        duration,
        ease: [0.16, 1, 0.3, 1], // Smooth easing
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
