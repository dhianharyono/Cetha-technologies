'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const projects = [
  {
    title: 'E-Commerce Fashion Modern',
    description:
      'Redesain toko online dengan fokus pada kecepatan checkout dan mobile experience.',
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    tech: ['Next.js', 'Tailwind CSS', 'Shopify'],
    result: 'Conversion naik 40%',
  },
  {
    title: 'Portal Berita Daerah',
    description:
      'Platform berita high-traffic dengan optimasi Core Web Vitals untuk SEO maksimal.',
    image:
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    tech: ['Next.js', 'ISR', 'Vercel'],
    result: 'Load time < 0.8s',
  },
  {
    title: 'Company Profile BUMN',
    description:
      'Website korporat yang elegan, aman, dan mudah dikelola oleh tim admin.',
    image:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    tech: ['React', 'TypeScript', 'CMS'],
    result: 'Security Score A+',
  },
];

export default function Portfolio() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => setCurrentIndex((prevIndex) => (prevIndex === 0 ? projects.length - 1 : prevIndex - 1));
  const next = () => setCurrentIndex((prevIndex) => (prevIndex === projects.length - 1 ? 0 : prevIndex + 1));

  return (
    <section id='portfolio' className='py-16 md:py-24 relative z-10'>
      {/* Decorative gradient */}
      <div className='absolute inset-0 bg-linear-to-b from-[#07090E] via-[#0B101C] to-[#07090E] -z-10'></div>

      <div className='container mx-auto px-4 md:px-6'>
        <div className='text-center max-w-2xl mx-auto mb-10 md:mb-16'>
          <h2 className='text-3xl md:text-4xl font-extrabold text-white mb-4'>
            Portofolio Terpilih
          </h2>
          <p className='text-sm md:text-lg text-slate-400'>
            Bukti nyata dari dedikasi kami terhadap kecepatan dan estetika.
          </p>
        </div>

        {/* Desktop View */}
        <div className='hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className='h-full overflow-hidden border border-white/5 bg-[#131826]/80 backdrop-blur-md shadow-sm shadow-white/5 hover:shadow-md hover:shadow-white/10 hover:border-white/10 transition-all duration-300 group'>
                <div className='relative h-48 w-full overflow-hidden border-b border-white/10'>
                  <div className='absolute inset-0 bg-cyan-500/10 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className='object-cover transition-transform duration-700 group-hover:scale-110'
                  />
                </div>
                <CardContent className='p-6 relative'>
                  <h3 className='text-lg md:text-xl font-bold text-white mb-2 md:mb-3 group-hover:text-cyan-400 transition-colors'>
                    {project.title}
                  </h3>
                  <p className='text-slate-400 text-sm mb-4 leading-relaxed'>
                    {project.description}
                  </p>

                  <div className='flex flex-wrap gap-2 mb-6'>
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className='px-2.5 py-1 bg-white/5 border border-white/10 text-cyan-300 text-xs rounded-full font-medium'
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className='pt-4 border-t border-white/10 flex items-center justify-between'>
                    <span className='text-sm font-bold text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-3 py-1.5 rounded-full'>
                      {project.result}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Mobile View (Carousel) */}
        <div className='md:hidden block relative'>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <Card className='h-full overflow-hidden border border-white/5 bg-[#131826]/80 backdrop-blur-md shadow-sm shadow-white/5 group'>
                <div className='relative h-48 w-full overflow-hidden border-b border-white/10'>
                  <Image
                    src={projects[currentIndex].image}
                    alt={projects[currentIndex].title}
                    fill
                    className='object-cover'
                  />
                </div>
                <CardContent className='p-6 relative'>
                  <h3 className='text-lg md:text-xl font-bold text-white mb-2 md:mb-3'>
                    {projects[currentIndex].title}
                  </h3>
                  <p className='text-slate-400 text-sm mb-4 leading-relaxed'>
                    {projects[currentIndex].description}
                  </p>

                  <div className='flex flex-wrap gap-2 mb-6'>
                    {projects[currentIndex].tech.map((t) => (
                      <span
                        key={t}
                        className='px-2.5 py-1 bg-white/5 border border-white/10 text-cyan-300 text-xs rounded-full font-medium'
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className='pt-4 border-t border-white/10 flex items-center justify-between'>
                    <span className='text-sm font-bold text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-3 py-1.5 rounded-full'>
                      {projects[currentIndex].result}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className='flex items-center justify-between mt-6 px-2'>
            <button onClick={prev} className='p-2 rounded-full border border-white/10 bg-white/5 text-white active:bg-white/10 cursor-pointer'>
              <ChevronLeft className='w-5 h-5' />
            </button>
            <div className='flex gap-2 relative'>
              {projects.map((_, idx) => (
                <div key={idx} className={`h-2 rounded-full transition-all ${idx === currentIndex ? 'bg-cyan-500 w-6' : 'bg-white/20 w-2'}`} />
              ))}
            </div>
            <button onClick={next} className='p-2 rounded-full border border-white/10 bg-white/5 text-white active:bg-white/10 cursor-pointer'>
              <ChevronRight className='w-5 h-5' />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
