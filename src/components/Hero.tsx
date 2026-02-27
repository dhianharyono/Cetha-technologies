'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export default function Hero() {
  const whatsappUrl =
    'https://wa.me/6281320005405?text=Halo%2C%20saya%20ingin%20konsultasi%20gratis%20pembuatan%20website';

  return (
    <section className='relative pt-24 pb-16 lg:pt-40 lg:pb-28 overflow-hidden bg-[#07090E]'>
      {/* Decorative Spheres/Glows */}
      <div className='absolute top-20 left-1/4 w-72 h-72 bg-blue-500/20 rounded-full blur-[100px] -z-10 animate-pulse'></div>
      <div
        className='absolute bottom-20 right-1/4 w-96 h-96 bg-cyan-400/10 rounded-full blur-[120px] -z-10 animate-pulse'
        style={{ animationDelay: '1s' }}
      ></div>
      <div className='absolute top-40 right-[10%] w-32 h-32 bg-purple-500/20 rounded-full blur-[80px] -z-10'></div>

      <div className='container mx-auto px-4 md:px-6 z-10 relative'>
        <div className='grid lg:grid-cols-2 gap-12 items-center'>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-xs md:text-sm font-medium mb-6 backdrop-blur-md'>
              <span className='relative flex h-2 w-2'>
                <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75'></span>
                <span className='relative inline-flex rounded-full h-2 w-2 bg-cyan-500'></span>
              </span>
              Available for New Projects
            </div>

            <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4 md:mb-6 leading-[1.1]'>
              Landing Page Modern & Cepat untuk <br />
              <span className='text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500 mr-2'>
                Bisnis
              </span>
              Anda
            </h1>

            <p className='text-xs md:text-lg text-slate-400 mb-8 max-w-lg leading-relaxed'>
              Dibangun dengan teknologi terkini untuk performa maksimal dan SEO
              yang ramah mesin pencari. Jangan biarkan loading lambat membunuh
              bisnis Anda.
            </p>

            <div className='flex flex-row gap-2 sm:gap-4 mb-12 w-full'>
              <Link
                href={whatsappUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='flex-1'
              >
                <Button
                  size='lg'
                  className='px-2 sm:px-8 text-xs sm:text-base bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold shadow-[0_0_20px_rgba(6,182,212,0.4)] cursor-pointer w-full rounded-xl transition-all hover:scale-105 h-full min-h-[44px]'
                >
                  Konsultasi Gratis
                </Button>
              </Link>
              <Link href='#pricing' className='flex-1'>
                <Button
                  size='lg'
                  variant='outline'
                  className='px-2 sm:px-8 text-xs sm:text-base w-full cursor-pointer border-white/20 text-white bg-white/10 hover:bg-white/20 rounded-xl transition-all h-full min-h-[44px]'
                >
                  Lihat Paket Harga
                </Button>
              </Link>
            </div>

            <div className='flex flex-col sm:flex-row gap-8 text-sm text-slate-300 font-medium'>
              <div className='flex items-center gap-2'>
                <div className='w-1 bg-cyan-500 h-10 rounded shadow-[0_0_10px_rgba(6,182,212,0.8)]'></div>
                <div>
                  <div className='text-xl md:text-2xl font-bold text-white'>
                    90+
                  </div>
                  <div className='text-xs text-slate-400'>
                    Google Lighthouse
                  </div>
                </div>
              </div>
              <div className='flex items-center gap-2'>
                <div className='w-1 bg-blue-500 h-10 rounded shadow-[0_0_10px_rgba(59,130,246,0.8)]'></div>
                <div>
                  <div className='text-xl md:text-2xl font-bold text-white'>
                    100%
                  </div>
                  <div className='text-xs text-slate-400'>SEO Optimized</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className='relative lg:ml-auto'
          >
            <div className='relative z-10 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 bg-white/5 backdrop-blur-xl p-4 transform rotate-1 hover:rotate-0 transition-transform duration-500'>
              <Image
                src='/illustration.jpg'
                alt='High Performance Web Development'
                width={700}
                height={500}
                priority
                className='w-full h-auto rounded-2xl object-cover opacity-90'
              />
            </div>

            {/* Small glowing orbs matching reference image */}
            <div className='absolute -top-10 right-20 w-12 h-12 rounded-full bg-cyan-300 shadow-[0_0_30px_rgba(103,232,249,0.8)] z-20 animate-pulse'></div>
            <div
              className='absolute bottom-10 -left-10 w-8 h-8 rounded-full bg-blue-400 shadow-[0_0_20px_rgba(96,165,250,0.8)] z-20 animate-bounce'
              style={{ animationDuration: '4s' }}
            ></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
