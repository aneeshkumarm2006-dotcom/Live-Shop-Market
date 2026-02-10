import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

/**
 * ScrollReveal — fade-in + slide-up when the element enters the viewport.
 *
 * Props:
 *   - delay     : seconds before animation starts (default 0)
 *   - duration  : animation duration in seconds (default 0.5)
 *   - y         : initial offset in pixels (default 30)
 *   - once      : animate only once (default true)
 *   - className : passthrough
 *   - children
 *   - stagger   : if true, staggers children (used with staggerIndex)
 *   - staggerIndex : index for stagger delay calculation
 */
export default function ScrollReveal({
  children,
  delay = 0,
  duration = 0.5,
  y = 30,
  once = true,
  className,
  staggerIndex = 0,
  stagger = false,
}) {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const isInView = useInView(ref, {
    once,
    margin: '-60px 0px',
  });

  const computedDelay = stagger ? delay + staggerIndex * 0.08 : delay;

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{
        duration,
        delay: computedDelay,
        ease: 'easeOut',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
