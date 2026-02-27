'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion, Variants } from 'framer-motion';

export default function Hero() {
  const whatsappUrl =
    'https://wa.me/6281320005405?text=Halo%2C%20saya%20ingin%20konsultasi%20gratis%20pembuatan%20website';

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 12 },
    },
  };

  return (
    <section
      className='relative pt-32 lg:pt-48 overflow-hidden bg-[#07090E] flex flex-col items-center justify-center min-h-[90vh]'
    >
      {/* Decorative Spheres/Glows */}
      <div className='absolute top-20 left-1/4 w-72 h-72 bg-blue-500/20 rounded-full blur-[100px] -z-10 animate-pulse'></div>
      <div
        className='absolute bottom-20 right-1/4 w-96 h-96 bg-cyan-400/10 rounded-full blur-[120px] -z-10 animate-pulse'
        style={{ animationDelay: '1s' }}
      ></div>
      <div className='absolute top-40 right-[10%] w-32 h-32 bg-purple-500/20 rounded-full blur-[80px] -z-10'></div>
      <div className='absolute bottom-1/4 left-1/4 w-40 h-40 bg-pink-500/10 rounded-full blur-[90px] -z-10 animate-pulse' style={{ animationDelay: '2s' }}></div>

      <div className='container mx-auto px-4 md:px-6 z-10 relative'>
        <motion.div
          className='max-w-4xl mx-auto flex flex-col items-center text-center'
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-xs md:text-sm font-medium mb-8 backdrop-blur-md'>
              <span className='relative flex h-2 w-2'>
                <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75'></span>
                <span className='relative inline-flex rounded-full h-2 w-2 bg-cyan-500'></span>
              </span>
              Available for New Projects
            </div>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 md:mb-8 leading-[1.1]'
          >
            Landing Page Modern & Cepat untuk
            <span className='ml-5 text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500 relative inline-block'>
              Bisnis
              <motion.span
                className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
              />
            </span>{' '}
            Anda
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className='text-base md:text-xl text-slate-400 mb-10 max-w-2xl leading-relaxed'
          >
            Dibangun dengan teknologi terkini untuk performa maksimal dan SEO
            yang ramah mesin pencari. Jangan biarkan loading lambat membunuh
            bisnis Anda.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className='flex flex-row gap-3 md:gap-4 mb-16 w-full sm:w-auto justify-center'
          >
            <Link
              href={whatsappUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='flex-1 sm:w-auto'
            >
              <Button
                size='lg'
                className='px-3 sm:px-8 py-5 md:py-6 text-[12px] sm:text-base bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold shadow-[0_0_20px_rgba(6,182,212,0.4)] cursor-pointer w-full rounded-full transition-all hover:scale-105 group/btn border-none whitespace-nowrap'
              >
                Konsultasi Gratis
              </Button>
            </Link>
            <Link href='#pricing' className='flex-1 sm:w-auto'>
              <Button
                size='lg'
                variant='outline'
                className='px-3 sm:px-8 py-5 md:py-6 text-[12px] sm:text-base w-full cursor-pointer border-white/20 text-white bg-white/5 hover:bg-white/10 hover:text-white rounded-full transition-all backdrop-blur-sm whitespace-nowrap'
              >
                Lihat Paket Layanan
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
