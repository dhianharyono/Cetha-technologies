'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  motion,
  Variants,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useMotionTemplate,
} from 'framer-motion';
import { useRef, useEffect } from 'react';
import { Code, Rocket, Zap, Globe } from 'lucide-react';

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const absoluteMouseX = useMotionValue(0);
  const absoluteMouseY = useMotionValue(0);

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  // Smooth mouse move for parallax
  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 400 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      // Relative for parallax
      mouseX.set(clientX / innerWidth - 0.5);
      mouseY.set(clientY / innerHeight - 0.5);

      // Absolute for spotlight effect
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        absoluteMouseX.set(clientX - rect.left);
        absoluteMouseY.set(clientY - rect.top);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, absoluteMouseX, absoluteMouseY]);

  // Spotlight mask for the grid
  const maskImage = useMotionTemplate`radial-gradient(450px circle at ${absoluteMouseX}px ${absoluteMouseY}px, white, transparent)`;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { type: 'spring', stiffness: 80, damping: 20 },
    },
  };

  const icons = [
    { icon: Code, top: '20%', left: '10%', delay: 0 },
    { icon: Globe, top: '65%', left: '15%', delay: 0.5 },
    { icon: Zap, top: '15%', right: '15%', delay: 1 },
    { icon: Rocket, top: '70%', right: '10%', delay: 1.5 },
  ];

  return (
    <section
      ref={containerRef}
      id='home'
      className='relative overflow-hidden bg-[#07090E] flex flex-col items-center justify-center min-h-screen pt-24 pb-8 lg:pt-28 lg:pb-12'
    >
      {/* Background Grid - Static */}
      <div
        className='absolute inset-0 z-0 opacity-[0.03]'
        style={{
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      ></div>

      {/* Interactive Spotlight Grid Mask */}
      <motion.div
        className='absolute inset-0 z-0 opacity-[0.15] pointer-events-none'
        style={{
          maskImage,
          WebkitMaskImage: maskImage,
          backgroundImage: `linear-gradient(rgba(6,182,212,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.5) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Visual Hook: Interactive Glows */}
      <motion.div
        style={{
          x: useTransform(smoothX, [-0.5, 0.5], [-50, 50]),
          y: useTransform(smoothY, [-0.5, 0.5], [-50, 50]),
        }}
        className='absolute top-[10%] left-[15%] w-[40rem] h-[40rem] bg-cyan-500/10 rounded-full blur-[120px] -z-10'
      />
      <motion.div
        style={{
          x: useTransform(smoothX, [-0.5, 0.5], [50, -50]),
          y: useTransform(smoothY, [-0.5, 0.5], [50, -50]),
        }}
        className='absolute bottom-[10%] right-[10%] w-[50rem] h-[50rem] bg-blue-500/10 rounded-full blur-[150px] -z-10'
      />

      {/* Floating Abstract Elements */}
      {icons.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.3, scale: 1 }}
          transition={{
            delay: 1 + item.delay,
            duration: 2,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className='absolute hidden lg:block text-cyan-500/40'
          style={{ top: item.top, left: item.left, right: (item as any).right }}
        >
          <item.icon size={40} strokeWidth={1} />
        </motion.div>
      ))}

      <div className='container mx-auto px-4 md:px-6 z-10 relative flex flex-col items-center justify-center my-auto'>
        <motion.div
          className='max-w-5xl mx-auto flex flex-col items-center text-center py-4 lg:py-6'
          variants={containerVariants}
          initial='hidden'
          animate='visible'
        >

          <motion.h1
            variants={itemVariants}
            className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 md:mb-8 leading-tight overflow-visible'
          >
            Tingkatkan Kredibilitas Bisnis & Dapatkan{' '}
            <span className='bg-clip-text bg-gradient-to-r from-cyan-400 text-blue-500 via-blue-500 to-indigo-600 relative inline-block'>
              Lebih Banyak Klien
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className='text-sm md:text-lg text-slate-300/80 mb-8 lg:mb-10 max-w-2xl leading-relaxed font-normal'
          >
            Kami membangun{' '}
            <span className='text-white font-medium'>website premium</span> yang
            memadukan desain modern dengan performa terbaik untuk
            meningkatkan profitabilitas bisnis Anda.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className='flex flex-col sm:flex-row gap-4 md:gap-6 mb-8 lg:mb-12 w-full sm:w-auto justify-center'
          >
            <Link href={'/pemesanan'} className='w-full sm:w-auto'>
              <Button
                size='lg'
                className='px-10 py-7 md:py-8 text-base bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-extrabold shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:shadow-[0_0_50px_rgba(6,182,212,0.6)] cursor-pointer w-full rounded-2xl transition-all hover:scale-[1.03] active:scale-[0.98] group/btn border-none'
              >
                Pesan Sekarang
              </Button>
            </Link>
            <Link href='#pricing' className='w-full sm:w-auto'>
              <Button
                size='lg'
                variant='outline'
                className='px-10 py-7 md:py-8 text-base w-full cursor-pointer border-white/10 text-white hover:text-white bg-white/5 hover:bg-white/10 hover:border-white/20 rounded-2xl transition-all backdrop-blur-md active:scale-[0.98] font-semibold'
              >
                Lihat Paket Layanan
              </Button>
            </Link>
          </motion.div>

          {/* Visual Hook: Scrolling Indicator */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 1 }}
            className='flex flex-col items-center gap-2 mt-2 lg:mt-4'
          >
            <span className='text-[10px] uppercase tracking-[0.3em] text-cyan-500/60 font-bold font-mono'>
              Scroll Explore
            </span>
            <div className='w-[1px] h-10 md:h-16 bg-gradient-to-b from-cyan-500 to-transparent' />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
