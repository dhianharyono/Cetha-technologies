'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Layout } from 'lucide-react';
import { getPublicPortfolios } from '@/app/actions/userActions';
import { projects as fallbackProjects } from '@/utils/data';
import { Skeleton } from '@/components/ui/skeleton';
import { IPortfolio } from '@/types';

const PortfolioSkeleton = () => (
  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
    {[1, 2, 3].map((i) => (
      <Card
        key={i}
        className='overflow-hidden border border-white/5 bg-[#131826]/40 backdrop-blur-sm'
      >
        <Skeleton className='h-48 w-full rounded-none' />
        <CardContent className='p-6'>
          <Skeleton className='h-6 w-3/4 mb-4' />
          <Skeleton className='h-4 w-full mb-2' />
          <Skeleton className='h-4 w-5/6 mb-6' />
          <div className='flex gap-2 mb-6'>
            <Skeleton className='h-6 w-16 rounded-full' />
            <Skeleton className='h-6 w-16 rounded-full' />
          </div>
          <div className='flex justify-between items-center'>
            <Skeleton className='h-8 w-24 rounded-full' />
            <Skeleton className='h-8 w-16 rounded-full' />
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
);

export default function Portfolio() {
  const [projects, setProjects] = useState<IPortfolio[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getPublicPortfolios();
        if (data && data.length > 0) {
          setProjects(data);
        } else {
          setProjects(fallbackProjects);
        }
      } catch (error) {
        console.error('Failed to fetch portfolios', error);
        setProjects(fallbackProjects);
      } finally {
        // Add a slight delay for better UX transition
        setTimeout(() => setIsLoading(false), 800);
      }
    }
    loadData();
  }, []);

  return (
    <section id='portfolio' className='py-20 md:py-32 relative overflow-hidden'>
      {/* Background decoration */}
      <div className='absolute top-0 left-0 w-full h-full -z-10 bg-[#07090E]'>
        <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]'></div>
        <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]'></div>
      </div>

      <div className='container mx-auto px-4 md:px-6 relative z-10'>
        <div className='text-center max-w-3xl mx-auto mb-16 md:mb-24'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className='text-xl md:text-5xl font-extrabold text-white mb-2 md:mb-6 tracking-tight'>
              Karya{' '}
              <span className='text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500'>
                Kami
              </span>
            </h2>
            <p className='text-sm md:text-lg text-slate-400 leading-relaxed'>
              Jelajahi karya website terbaik kami yang modern dan responsif.
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
              <PortfolioSkeleton />
            </motion.div>
          ) : (
            <>
              {/* Desktop Grid View */}
              <motion.div
                key='content-desktop'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className='hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8'
              >
                {projects.map((project, index) => (
                  <PortfolioCard key={index} project={project} index={index} />
                ))}
              </motion.div>

              {/* Mobile Swipeable View */}
              <motion.div
                key='content-mobile'
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className='md:hidden flex gap-5 overflow-x-auto snap-x snap-mandatory pb-10 -mx-4 px-4 scrollbar-hide'
              >
                {projects.map((project, index) => (
                  <div key={index} className='w-[85vw] shrink-0 snap-center'>
                    <PortfolioCard project={project} index={index} isMobile />
                  </div>
                ))}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function PortfolioCard({
  project,
  index,
  isMobile = false,
}: {
  project: IPortfolio;
  index: number;
  isMobile?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: isMobile ? 0 : index * 0.1 }}
      viewport={{ once: true }}
      className='h-full'
    >
      <Card className='h-full bg-[#131826]/60 backdrop-blur-xl border border-white/5 hover:bg-[#1A2235]/80 hover:border-cyan-500/30 transition-all duration-500 group overflow-hidden relative flex flex-col rounded-3xl'>
        <div className='relative h-56 w-full overflow-hidden shrink-0'>
          <div className='absolute inset-0 bg-linear-to-r from-[#131826] to-transparent z-10 opacity-60'></div>

          {/* Hover Overlay */}
          <div className='absolute inset-0 bg-cyan-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 flex items-center justify-center backdrop-blur-sm'>
            {project.website && (
              <a
                href={
                  project.website.startsWith('http')
                    ? project.website
                    : `https://${project.website}`
                }
                target='_blank'
                rel='noopener noreferrer'
                className='p-4 bg-white text-slate-900 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 hover:scale-110 shadow-xl'
              >
                <ExternalLink size={24} />
              </a>
            )}
          </div>

          <Image
            src={project.image}
            alt={project.title}
            fill
            className='object-cover transition-transform duration-1000 group-hover:scale-110'
          />
        </div>

        <CardContent className='p-6 relative flex flex-col flex-1'>
          <h3 className='text-lg md:text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300'>
            {project.title}
          </h3>
          <p className='text-slate-400 text-xs md:text-sm mb-6 line-clamp-3 leading-relaxed h-10'>
            {project.description}
          </p>

          <div className='flex flex-wrap gap-2 mb-6'>
            {project.fitur?.slice(0, 3).map((t: string) => (
              <span
                key={t}
                className='px-3 py-1 bg-white/5 border border-white/5 text-slate-300 text-[10px] uppercase tracking-wider rounded-lg font-semibold flex items-center gap-1.5'
              >
                <div className='w-1 h-1 bg-cyan-500 rounded-full animate-pulse'></div>
                {t}
              </span>
            ))}
            {project.fitur?.length > 3 && (
              <span className='px-3 py-1 bg-white/5 border border-white/5 text-slate-400 text-[10px] uppercase tracking-wider rounded-lg font-semibold'>
                +{project.fitur.length - 3}
              </span>
            )}
          </div>

          <div className='mt-auto pt-6 border-t border-white/5 flex items-center justify-between'>
            <div className='flex items-center gap-2 text-cyan-500/80'>
              <Layout size={16} />
              <span className='text-[10px] font-bold uppercase tracking-widest'>
                Paket {project.paket || 'Custom'}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
