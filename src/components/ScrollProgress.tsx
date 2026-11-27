import { motion, useScroll, useSpring } from "framer-motion";

/** Thin gold bar along the top of the page showing how far you've scrolled. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden
      style={{
        scaleX,
        transformOrigin: "0 0",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        background: "var(--uh-gold)",
        zIndex: 1001,
      }}
    />
  );
}
