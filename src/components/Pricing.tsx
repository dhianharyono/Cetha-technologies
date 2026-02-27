'use client';

import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { pricingPlans as plans } from '@/utils/data';

export default function Pricing() {
  const getWhatsappUrl = (planName: string) => {
    const text = `Halo, saya tertarik dengan paket ${planName} untuk pembuatan website.`;
    return `https://wa.me/6281320005405?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id='pricing' className='py-16 md:py-24 relative z-10'>
      <div className='container mx-auto px-4 md:px-6'>
        <motion.div
          className='text-center max-w-2xl mx-auto mb-10 md:mb-16'
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className='text-xl md:text-4xl font-extrabold text-white mb-4'>
            Paket Layanan
          </h2>
          <p className='text-sm md:text-lg text-slate-400'>
            Pilih paket yang sesuai dengan kebutuhan bisnis Anda
          </p>
        </motion.div>

        {/* Desktop View */}
        <div className='hidden lg:grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto'>
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
            >
              <Card
                className={`h-full relative flex flex-col transition-all duration-300 ${plan.popular
                  ? 'bg-[#182136] border border-cyan-500/30 shadow-md shadow-white/10 lg:scale-105 z-10'
                  : 'bg-[#131826]/80 backdrop-blur-md border border-white/5 shadow-sm shadow-white/5 hover:border-white/10 hover:shadow-md hover:shadow-white/10 hover:-translate-y-2'
                  }`}
              >
                {plan.popular && (
                  <div className='absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-1.5 rounded-full text-sm font-bold shadow-[0_5px_15px_rgba(6,182,212,0.4)] whitespace-nowrap'>
                    Most Popular
                  </div>
                )}
                <CardHeader className='pt-8'>
                  <CardTitle className='text-xl mb-2 text-white'>
                    {plan.name}
                  </CardTitle>
                  <div className="flex flex-col mb-2 md:mb-3">
                    {plan.originalPrice && (
                      <div className='text-slate-500 line-through text-xs md:text-sm font-medium mb-1'>
                        {plan.originalPrice}
                      </div>
                    )}
                    <div
                      className={`text-3xl md:text-4xl font-extrabold ${plan.popular ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400' : 'text-white'}`}
                    >
                      {plan.price}
                    </div>
                  </div>
                  <CardDescription className='text-slate-400'>
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className='flex-1'>
                  <ul className='space-y-4'>
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className='flex items-start gap-3 text-sm text-slate-300'
                      >
                        <Check className='w-5 h-5 text-cyan-400 shrink-0' />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link
                    href={getWhatsappUrl(plan.name)}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='w-full'
                  >
                    <Button
                      className={`w-full cursor-pointer rounded-xl font-bold py-6 ${plan.popular ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-900 shadow-[0_0_15px_rgba(6,182,212,0.5)]' : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'}`}
                      variant={plan.popular ? 'default' : 'outline'}
                      size='lg'
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Mobile View (Horizontal Swipeable) */}
        <div className='flex lg:hidden gap-4 overflow-x-auto snap-x snap-mandatory pb-8 pt-6 px-4 -mx-4 scrollbar-hide'>
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className='min-w-[85vw] sm:min-w-[60vw] snap-center shrink-0'
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              viewport={{ once: true }}
            >
              <Card
                className={`h-full relative flex flex-col transition-all duration-300 ${plan.popular
                  ? 'bg-[#182136] border border-cyan-500/30'
                  : 'bg-[#131826]/80 backdrop-blur-md border border-white/5'
                  }`}
              >
                {plan.popular && (
                  <div className='absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-1.5 rounded-full text-sm font-bold shadow-[0_5px_15px_rgba(6,182,212,0.4)] whitespace-nowrap z-20'>
                    Most Popular
                  </div>
                )}
                <CardHeader className='pt-8'>
                  <CardTitle className='text-xl mb-2 text-white'>
                    {plan.name}
                  </CardTitle>
                  <div className="flex flex-col mb-2 md:mb-3">
                    {plan.originalPrice && (
                      <div className='text-slate-500 line-through text-xs md:text-sm font-medium mb-1'>
                        {plan.originalPrice}
                      </div>
                    )}
                    <div
                      className={`text-3xl font-extrabold ${plan.popular ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400' : 'text-white'}`}
                    >
                      {plan.price}
                    </div>
                  </div>
                  <CardDescription className='text-slate-400 text-sm'>
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className='flex-1 pb-2'>
                  <ul className='space-y-3'>
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className='flex items-start gap-3 text-sm text-slate-300'
                      >
                        <Check className='w-5 h-5 text-cyan-400 shrink-0' />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className='pt-4'>
                  <Link
                    href={getWhatsappUrl(plan.name)}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='w-full'
                  >
                    <Button
                      className={`w-full cursor-pointer rounded-xl font-bold py-6 ${plan.popular ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-900 shadow-[0_0_15px_rgba(6,182,212,0.5)]' : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'}`}
                      variant={plan.popular ? 'default' : 'outline'}
                      size='lg'
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
