'use client';

import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Spotlight() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    function handleMouseMove(event: MouseEvent) {
      if (!isVisible) setIsVisible(true);
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
    }

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, isVisible]);

  const background = useMotionTemplate`
        radial-gradient(
            600px circle at ${mouseX}px ${mouseY}px,
            rgba(6, 182, 212, 0.08),
            transparent 80%
        )
    `;

  if (!isVisible) return null;

  return (
    <motion.div
      className='pointer-events-none fixed inset-0 z-100'
      style={{ background }}
    />
  );
}
