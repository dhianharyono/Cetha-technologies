'use client';

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { projects } from '@/utils/data';

export default function Portfolio() {
  return (
    <section id='portfolio' className='py-16 md:py-24 relative z-10 p-4'>
      {/* Decorative gradient */}
      <div className='absolute inset-0 bg-linear-to-b from-[#07090E] via-[#0B101C] to-[#07090E] -z-10'></div>

      <div className='container mx-auto px-4 md:px-6'>
        <div className='text-center max-w-2xl mx-auto mb-10 md:mb-16'>
          <h2 className='text-xl md:text-4xl font-extrabold text-white mb-4'>
            Portofolio
          </h2>
          <p className='text-sm md:text-lg text-slate-400'>
            Beberapa proyek yang telah kami kerjakan
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
                    {project.fitur?.map((t) => (
                      <span
                        key={t}
                        className='px-2.5 py-1 bg-white/5 border border-white/10 text-cyan-300 text-xs rounded-full font-medium'
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className='pt-4 border-t border-white/10 flex items-center justify-between'>
                    <span className='text-sm font-bold text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 px-3 py-1.5 rounded-full'>
                      Paket {project.paket}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Mobile View (Horizontal Swipeable) */}
        <div className='md:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory pb-6 pt-2 scrollbar-hide -mx-4 px-4'>
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className='w-[280px] sm:w-[320px] snap-center shrink-0'
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className='h-full overflow-hidden border border-white/5 bg-[#131826]/80 backdrop-blur-md shadow-sm shadow-white/5 group relative'>
                <div className='relative h-48 w-full overflow-hidden border-b border-white/10'>
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className='object-cover'
                  />
                </div>
                <CardContent className='p-6 relative'>
                  <h3 className='text-lg md:text-xl font-bold text-white mb-2 md:mb-3'>
                    {project.title}
                  </h3>
                  <p className='text-slate-400 text-sm mb-4 leading-relaxed'>
                    {project.description}
                  </p>

                  <div className='flex flex-wrap gap-2 mb-6'>
                    {project.fitur?.map((t) => (
                      <span
                        key={t}
                        className='px-2.5 py-1 bg-white/5 border border-white/10 text-cyan-300 text-xs rounded-full font-medium'
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className='pt-4 border-t border-white/10 flex items-center justify-between'>
                    <span className='text-sm font-bold text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 px-3 py-1.5 rounded-full'>
                      Paket {project.paket}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
