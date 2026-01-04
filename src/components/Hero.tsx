'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export default function Hero() {
  return (
    <section className='relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-slate-50'>
      <div className='container mx-auto px-4 md:px-6'>
        <div className='grid lg:grid-cols-2 gap-12 items-center'>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6'>
              <span className='relative flex h-2 w-2'>
                <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75'></span>
                <span className='relative inline-flex rounded-full h-2 w-2 bg-blue-500'></span>
              </span>
              Available for New Projects
            </div>

            <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-6 leading-tight'>
              Landing Page Modern & Cepat untuk{' '}
              <span className='text-blue-600'>Bisnis</span> Anda
            </h1>

            <p className='text-lg text-slate-600 mb-8 max-w-lg leading-relaxed'>
              Dibangun dengan teknologi terkini untuk performa maksimal dan SEO
              yang ramah mesin pencari. Jangan biarkan loading lambat membunuh
              bisnis Anda.
            </p>

            <div className='flex flex-col sm:flex-row gap-4 mb-10'>
              <Button
                size='lg'
                className='px-8 text-base shadow-lg shadow-blue-600/20'
              >
                Konsultasi Gratis
              </Button>
              <Button size='lg' variant='outline' className='px-8 text-base'>
                Lihat Paket Harga
              </Button>
            </div>

            <div className='flex flex-col sm:flex-row gap-6 text-sm text-slate-500 font-medium'>
              <div className='flex items-center gap-2'>
                <CheckCircle2 className='w-5 h-5 text-green-500' />
                <span>Google Lighthouse 90+</span>
              </div>
              <div className='flex items-center gap-2'>
                <CheckCircle2 className='w-5 h-5 text-green-500' />
                <span>SEO Optimized Structure</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className='relative'
          >
            <div className='relative z-10 rounded-2xl overflow-hidden shadow-2xl bg-white p-2 border border-slate-100'>
              {/* Use the generated hero image */}
              <Image
                src='/illustration.jpg'
                alt='High Performance Web Development'
                width={800}
                height={600}
                priority
                className='w-full h-auto rounded-xl object-cover'
              />
            </div>

            {/* Decorative background elements */}
            <div className='absolute -top-10 -right-10 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-60 -z-10'></div>
            <div className='absolute -bottom-10 -left-10 w-64 h-64 bg-purple-100 rounded-full blur-3xl opacity-60 -z-10'></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
