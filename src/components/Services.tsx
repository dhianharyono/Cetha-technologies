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

export default function Services() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for better UX consistency
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id='services' className='py-24 md:py-32 relative overflow-hidden'>
      {/* Background Glows & Grid */}
      <div className='absolute top-0 left-0 w-full h-full -z-10 bg-[#07090E]'>
        <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px]'></div>
        <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px]'></div>
      </div>
      
      {/* Subtle Grid Overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.02]" 
           style={{ 
             backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 2px, transparent 0)`,
             backgroundSize: '40px 40px' 
           }}>
      </div>

      <div className='container mx-auto px-4 md:px-6 relative z-10'>
        <div className='text-center max-w-3xl mx-auto mb-20 md:mb-28'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="inline-block px-4 py-1.5 mb-6 text-[10px] font-bold tracking-[0.2em] text-cyan-500 uppercase bg-cyan-500/10 border border-cyan-500/20 rounded-full">
              Built for Scale
            </div>
            <h2 className='text-3xl md:text-6xl font-black text-white mb-8 tracking-tighter'>
              Layanan{' '}
              <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400'>
                Unggulan
              </span>
            </h2>
            <p className='text-sm md:text-xl text-slate-400 font-light max-w-2xl mx-auto'>
              Solusi digital komprehensif untuk membantu bisnis Anda tumbuh lebih cepat dengan teknologi terkini.
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
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true, margin: '-100px' }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
              className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8'
            >
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { 
                      opacity: 1, 
                      y: 0,
                      transition: { duration: 0.5, type: 'spring', stiffness: 100, damping: 15 }
                    }
                  }}
                  className='group'
                >
                  <Card
                    className={`h-full border border-white/5 bg-[#131826]/40 backdrop-blur-xl transition-all duration-500 relative overflow-hidden flex flex-col p-8 rounded-[2rem] ${service.borderColor} hover:shadow-2xl hover:shadow-cyan-500/10 group-hover:scale-[1.02] hover:bg-[#1A2235]/60`}
                  >
                    {/* Floating Glow */}
                    <div
                      className={`absolute -right-8 -top-8 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 ${service.bg}`}
                    ></div>

                    <div
                      className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl ${service.bg} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 border border-white/5 shadow-lg relative z-10`}
                    >
                      <service.icon
                        className={`w-7 h-7 md:w-8 md:h-8 ${service.color}`}
                      />
                    </div>

                    <h3 className='text-white text-lg md:text-2xl font-black mb-4 group-hover:text-cyan-400 transition-colors duration-300 tracking-tight'>
                      {service.title}
                    </h3>

                    <p className='text-slate-400 leading-relaxed text-sm md:text-base mb-6 font-light'>
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
