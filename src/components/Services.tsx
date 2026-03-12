'use client';

import { useState, useEffect } from 'react';
import { Card, CardTitle } from '@/components/ui/card';
import { Zap, Smartphone, Search, Puzzle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';

const services = [
  {
    title: 'High Performance',
    description:
      'Skor Lighthouse 90+ menjamin website Anda dimuat instan. Pengunjung tidak akan kabur karena loading lama.',
    icon: Zap,
    color: 'text-amber-400',
    bg: 'bg-amber-400/10',
    borderColor: 'group-hover:border-amber-400/30',
  },
  {
    title: 'Responsive Design',
    description:
      'Tampilan sempurna di setiap perangkat, mulai dari HP Android hingga Desktop layar lebar.',
    icon: Smartphone,
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
    borderColor: 'group-hover:border-blue-400/30',
  },
  {
    title: 'SEO Optimized',
    description:
      'Struktur HTML semantik dan metadata yang tepat agar website Anda mudah ditemukan di halaman pertama Google.',
    icon: Search,
    color: 'text-emerald-400',
    bg: 'bg-emerald-400/10',
    borderColor: 'group-hover:border-emerald-400/30',
  },
  {
    title: 'Custom Features',
    description:
      'Butuh integrasi WhatsApp, Form Email, atau Dashboard Admin? Kami bangun sesuai kebutuhan spesifik Anda.',
    icon: Puzzle,
    color: 'text-purple-400',
    bg: 'bg-purple-400/10',
    borderColor: 'group-hover:border-purple-400/30',
  },
];

export default function Services() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for better UX consistency
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const ServiceSkeleton = () => (
    <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8'>
      {[1, 2, 3, 4].map((i) => (
        <Card
          key={i}
          className='h-64 border border-white/5 bg-[#131826]/40 backdrop-blur-sm p-6'
        >
          <Skeleton className='w-12 h-12 rounded-2xl mb-6' />
          <Skeleton className='h-6 w-3/4 mb-4' />
          <Skeleton className='h-4 w-full mb-2' />
          <Skeleton className='h-4 w-5/6' />
        </Card>
      ))}
    </div>
  );

  return (
    <section id='services' className='py-20 md:py-32 relative overflow-hidden'>
      {/* Background Glow */}
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px] -z-10'></div>

      <div className='container mx-auto px-4 md:px-6 relative z-10'>
        <div className='text-center max-w-3xl mx-auto mb-16 md:mb-24'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className='text-lg md:text-5xl font-extrabold text-white mb-6 tracking-tight'>
              Layanan{' '}
              <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400'>
                Unggulan
              </span>
            </h2>
            <p className='text-sm md:text-lg text-slate-400 leading-relaxed'>
              Solusi digital komprehensif untuk membantu bisnis Anda tumbuh
              lebih cepat di era modern.
            </p>
          </motion.div>
        </div>

        <AnimatePresence mode='wait'>
          {isLoading ? (
            <motion.div
              key='skeleton'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ServiceSkeleton />
            </motion.div>
          ) : (
            <motion.div
              key='content'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className='grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8'
            >
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className='group'
                >
                  <Card
                    className={`h-full border border-white/5 bg-[#131826]/60 backdrop-blur-xl transition-all duration-500 relative overflow-hidden flex flex-col p-6 rounded-2xl ${service.borderColor} hover:shadow-2xl hover:shadow-cyan-950/20`}
                  >
                    {/* Floating Glow */}
                    <div
                      className={`absolute -right-8 -top-8 w-24 h-24 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 ${service.bg}`}
                    ></div>

                    <div
                      className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl ${service.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 border border-white/5`}
                    >
                      <service.icon
                        className={`w-6 h-6 md:w-7 md:h-7 ${service.color}`}
                      />
                    </div>

                    <CardTitle className='text-white text-lg md:text-xl font-bold mb-4 group-hover:text-cyan-400 transition-colors duration-300'>
                      {service.title}
                    </CardTitle>

                    <p className='text-slate-400 leading-relaxed text-xs md:text-sm mb-6 grow'>
                      {service.description}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
