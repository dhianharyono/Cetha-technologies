'use client';

import { useState } from 'react';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';
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

const plans = [
  {
    name: 'Starter',
    price: 'Top Secret',
    description: 'Cocok untuk UMKM atau Personal Branding yang baru mulai.',
    features: [
      'Landing Page 1 Halaman',
      'Responsive Mobile Design',
      'SEO Basic Setup',
      'Revisi 2x',
      'Pengerjaan 3-5 Hari',
    ],
    cta: 'Pilih Starter',
    popular: false,
  },
  {
    name: 'Pro Business',
    price: 'Best Value',
    description:
      'Solusi lengkap untuk bisnis yang ingin scale up dan terlihat profesional.',
    features: [
      'Multi-page Website (up to 5)',
      'CMS Integration',
      'Advanced SEO Optimization',
      'Integrasi WhatsApp/Email',
      'Google Analytics & Pixel',
      'Prioritas Support',
    ],
    cta: 'Pilih Pro',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'Sistem kompleks untuk kebutuhan spesifik perusahaan besar.',
    features: [
      'Custom Web Application',
      'Database Integration',
      'High-Scale Performance',
      'Keamanan Tingkat Lanjut',
      'Dedicated Server Setup',
      'Maintenance Bulanan',
    ],
    cta: 'Hubungi Kami',
    popular: false,
  },
];

export default function Pricing() {
  const [currentIndex, setCurrentIndex] = useState(1); // Default to middle plan (Pro) visually

  const prev = () => setCurrentIndex((prevIndex) => (prevIndex === 0 ? plans.length - 1 : prevIndex - 1));
  const next = () => setCurrentIndex((prevIndex) => (prevIndex === plans.length - 1 ? 0 : prevIndex + 1));

  const getWhatsappUrl = (planName: string) => {
    const text = `Halo, saya tertarik dengan paket ${planName} untuk pembuatan website.`;
    return `https://wa.me/6281320005405?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id='pricing' className='py-16 md:py-24 relative z-10'>
      <div className='container mx-auto px-4 md:px-6'>
        <div className='text-center max-w-2xl mx-auto mb-10 md:mb-16'>
          <h2 className='text-3xl md:text-4xl font-extrabold text-white mb-4'>
            Investasi Transparan
          </h2>
          <p className='text-sm md:text-lg text-slate-400'>
            Pilih paket yang sesuai dengan tahap bisnis Anda saat ini.
          </p>
        </div>

        {/* Desktop View */}
        <div className='hidden lg:grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto'>
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative flex flex-col transition-all duration-300 ${plan.popular
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
                <div
                  className={`text-3xl md:text-4xl font-extrabold mb-2 md:mb-3 ${plan.popular ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400' : 'text-white'}`}
                >
                  {plan.price}
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
          ))}
        </div>

        {/* Mobile View (Carousel) */}
        <div className='block lg:hidden relative max-w-[360px] mx-auto'>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <Card
                className={`relative flex flex-col transition-all duration-300 ${plans[currentIndex].popular
                  ? 'bg-[#182136] border border-cyan-500/30'
                  : 'bg-[#131826]/80 backdrop-blur-md border border-white/5'
                  }`}
              >
                {plans[currentIndex].popular && (
                  <div className='absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-1.5 rounded-full text-sm font-bold shadow-[0_5px_15px_rgba(6,182,212,0.4)] whitespace-nowrap'>
                    Most Popular
                  </div>
                )}
                <CardHeader className='pt-8'>
                  <CardTitle className='text-xl mb-2 text-white'>
                    {plans[currentIndex].name}
                  </CardTitle>
                  <div
                    className={`text-3xl font-extrabold mb-2 md:mb-3 ${plans[currentIndex].popular ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400' : 'text-white'}`}
                  >
                    {plans[currentIndex].price}
                  </div>
                  <CardDescription className='text-slate-400 text-sm'>
                    {plans[currentIndex].description}
                  </CardDescription>
                </CardHeader>
                <CardContent className='flex-1 pb-2'>
                  <ul className='space-y-3'>
                    {plans[currentIndex].features.map((feature) => (
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
                    href={getWhatsappUrl(plans[currentIndex].name)}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='w-full'
                  >
                    <Button
                      className={`w-full cursor-pointer rounded-xl font-bold py-6 ${plans[currentIndex].popular ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-900 shadow-[0_0_15px_rgba(6,182,212,0.5)]' : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'}`}
                      variant={plans[currentIndex].popular ? 'default' : 'outline'}
                      size='lg'
                    >
                      {plans[currentIndex].cta}
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className='flex items-center justify-between mt-8'>
            <button onClick={prev} className='p-2 rounded-full border border-white/10 bg-white/5 text-white active:bg-white/10 cursor-pointer'>
              <ChevronLeft className='w-5 h-5' />
            </button>
            <div className='flex gap-2 relative'>
              {plans.map((_, idx) => (
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
