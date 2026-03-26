'use client';

import { useState, useEffect } from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getPublicPackages } from '@/app/actions/userActions';
import { pricingPlans as fallbackPlans } from '@/utils/data';
import { Skeleton } from '@/components/ui/skeleton';
import { IPackage } from '@/types';

const PricingSkeletonContent = () => (
  <Card className='h-125 border border-white/5 bg-[#131826]/40 p-8 flex flex-col'>
    <Skeleton className='h-8 w-1/2 mb-6' />
    <Skeleton className='h-12 w-3/4 mb-4' />
    <Skeleton className='h-4 w-full mb-10' />
    <div className='space-y-4 mb-10'>
      <Skeleton className='h-4 w-full' />
      <Skeleton className='h-4 w-full' />
      <Skeleton className='h-4 w-full' />
    </div>
    <Skeleton className='h-12 w-full mt-auto rounded-xl' />
  </Card>
);

const PricingSkeleton = () => (
  <>
    {/* Desktop Skeleton */}
    <div className='hidden lg:grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto'>
      {[1, 2, 3].map((i) => (
        <PricingSkeletonContent key={i} />
      ))}
    </div>

    {/* Mobile Skeleton */}
    <div className='lg:hidden flex gap-5 overflow-x-auto pb-10 -mx-4 px-4 scrollbar-hide'>
      {[1, 2, 3].map((i) => (
        <div key={i} className='w-[85vw] shrink-0'>
          <PricingSkeletonContent />
        </div>
      ))}
    </div>
  </>
);

export default function Pricing() {
  const [plans, setPlans] = useState<IPackage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getPublicPackages();
        if (data && data.length > 0) {
          setPlans(data);
        } else {
          setPlans(fallbackPlans);
        }
      } catch (error) {
        console.error('Failed to fetch packages', error);
        setPlans(fallbackPlans);
      } finally {
        setTimeout(() => setIsLoading(false), 700);
      }
    }
    loadData();
  }, []);

  return (
    <section id='pricing' className='py-20 md:py-32 relative overflow-hidden'>
      {/* Background decoration */}
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-cyan-600/5 rounded-full blur-[160px] -z-10'></div>

      <div className='container mx-auto px-4 md:px-6 relative z-10'>
        <div className='text-center max-w-3xl mx-auto mb-16 md:mb-24'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className='text-xl md:text-5xl font-extrabold text-white mb-2 md:mb-6 tracking-tight'>
              Paket{' '}
              <span className='text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-400'>
                Investasi Digital
              </span>
            </h2>
            <p className='text-sm md:text-lg text-slate-400 leading-relaxed'>
              Pilih paket yang paling sesuai dengan skala bisnis dan kebutuhan
              fitur Anda.
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
              <PricingSkeleton />
            </motion.div>
          ) : (
            <>
              {/* Desktop Grid View */}
              <motion.div
                key='content-desktop'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className='hidden lg:grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto'
              >
                {plans.map((plan, index) => (
                  <PricingCard key={plan.name} plan={plan} index={index} />
                ))}
              </motion.div>

              {/* Mobile Swipeable View */}
              <motion.div
                key='content-mobile'
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className='lg:hidden flex gap-5 overflow-x-auto snap-x snap-mandatory pb-10 -mx-4 px-4 scrollbar-hide'
              >
                {plans.map((plan, index) => (
                  <div
                    key={plan.name}
                    className='w-[85vw] shrink-0 snap-center'
                  >
                    <PricingCard plan={plan} index={index} isMobile />
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

function PricingCard({
  plan,
  index,
  isMobile = false,
}: {
  plan: IPackage;
  index: number;
  isMobile?: boolean;
}) {
  const getFormUrl = (planName: string) => {
    return `/pemesanan?paket=${encodeURIComponent(planName)}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: isMobile ? 0 : index * 0.1 }}
      viewport={{ once: true }}
      className='h-full'
    >
      <Card
        className={`h-full relative flex flex-col transition-all duration-500 rounded-3xl overflow-hidden group ${
          plan.popular
            ? 'bg-linear-to-b from-[#182136] to-[#0B101C] border-cyan-500/40 shadow-2xl shadow-cyan-500/10 scale-100 lg:scale-105 z-10'
            : 'bg-[#131826]/60 backdrop-blur-xl border-white/5 hover:border-white/10 hover:-translate-y-2'
        }`}
      >
        {plan.popular && (
          <div className='absolute top-0 right-0'>
            <div className='bg-linear-to-r from-cyan-500 to-blue-500 text-white px-4 py-1.5 rounded-bl-2xl text-[10px] uppercase font-black tracking-widest shadow-lg'>
              Paling Populer
            </div>
          </div>
        )}

        <CardHeader className='pt-10 pb-8 px-8'>
          <CardTitle
            className={`text-xl font-bold mb-2 ${plan.popular ? 'text-cyan-400' : 'text-white'}`}
          >
            {plan.name}
          </CardTitle>
          <div className='flex flex-col mb-4'>
            {plan.originalPrice && (
              <div className='text-slate-500 line-through text-sm font-medium mb-1'>
                {plan.originalPrice}
              </div>
            )}
            <div className='flex items-baseline gap-1'>
              <div
                className={`text-3xl md:text-5xl font-black tracking-tight ${plan.popular ? 'text-white' : 'text-white'}`}
              >
                {plan.price}
              </div>
            </div>
          </div>
          <CardDescription className='text-slate-400 text-xs md:text-sm leading-relaxed'>
            {plan.description}
          </CardDescription>
        </CardHeader>

        <CardContent className='flex-1 px-8 pb-10'>
          <ul className='space-y-4'>
            {plan.features?.map((feature: string) => (
              <li
                key={feature}
                className='flex gap-3 text-xs md:text-sm text-slate-300 items-center'
              >
                <div
                  className={`rounded-full p-0.5 ${plan.popular ? 'bg-cyan-500/20' : 'bg-white/5'}`}
                >
                  <Check
                    className={`w-3.5 h-3.5 ${plan.popular ? 'text-cyan-400' : 'text-slate-400'}`}
                  />
                </div>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>

        <CardFooter className='p-8 pt-0 mt-auto'>
          <Link
            href={getFormUrl(plan.name)}
            target='_blank'
            rel='noopener noreferrer'
            className='w-full'
          >
            <Button
              className={`w-full group/btn relative overflow-hidden h-14 rounded-2xl font-bold transition-all duration-300 ${
                plan.popular
                  ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.3)]'
                  : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
              }`}
            >
              <span className='relative z-10 flex items-center justify-center gap-2 text-xs md:text-sm'>
                {plan.cta}
                <ArrowRight className='w-4 h-4 group-hover/btn:translate-x-1 transition-transform' />
              </span>
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
