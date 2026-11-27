import { motion, type Variants } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";

export const EASE = [0.22, 1, 0.36, 1] as const;

interface RevealProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  /** Distance to travel in px; negative values come from above. */
  y?: number;
  x?: number;
}

/** Fades and slides its content in the first time it scrolls into view. */
export function Reveal({ children, className, style, delay = 0, y = 40, x = 0 }: RevealProps) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

const staggerParent: Variants = {
  hidden: {},
  visible: (stagger: number = 0.08) => ({ transition: { staggerChildren: stagger } }),
};

const staggerChild: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

interface StaggerProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
}

/** Reveals each <StaggerItem> inside it one after another. */
export function Stagger({ children, className, stagger = 0.08 }: StaggerProps) {
  return (
    <motion.div
      className={className}
      variants={staggerParent}
      custom={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={staggerChild}>
      {children}
    </motion.div>
  );
}

const maskInner: Variants = {
  hidden: { clipPath: "inset(0 0 100% 0)" },
  visible: { clipPath: "inset(0 0 0% 0)", transition: { duration: 1.2, ease: EASE } },
};

/**
 * Image that is uncovered from top to bottom as it scrolls into view.
 * The outer element is what gets observed: a fully clipped element counts as
 * invisible, so observing the clipped layer itself would never trigger.
 */
export function MaskReveal({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
    >
      <motion.div variants={maskInner} style={{ height: "100%", overflow: "hidden", borderRadius: "inherit" }}>
        {children}
      </motion.div>
    </motion.div>
  );
}
