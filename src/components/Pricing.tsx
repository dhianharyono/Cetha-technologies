'use client';

import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
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
  const getWhatsappUrl = (planName: string) => {
    const text = `Halo, saya tertarik dengan paket ${planName} untuk pembuatan website.`;
    return `https://wa.me/6281320005405?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id='pricing' className='py-20 bg-white'>
      <div className='container mx-auto px-4 md:px-6'>
        <div className='text-center max-w-2xl mx-auto mb-16'>
          <h2 className='text-3xl md:text-4xl font-bold text-slate-900 mb-4'>
            Investasi Transparan
          </h2>
          <p className='text-lg text-slate-600'>
            Pilih paket yang sesuai dengan tahap bisnis Anda saat ini.
          </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto'>
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative flex flex-col ${plan.popular
                ? 'border-blue-600 shadow-xl scale-105 z-10'
                : 'border-slate-200 shadow-sm hover:shadow-md'
                }`}
            >
              {plan.popular && (
                <div className='absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium shadow-md'>
                  Most Popular
                </div>
              )}
              <CardHeader>
                <CardTitle className='text-xl mb-2'>{plan.name}</CardTitle>
                <div className='text-3xl font-bold text-slate-900 mb-2'>
                  {plan.price}
                </div>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className='flex-1'>
                <ul className='space-y-4'>
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className='flex items-start gap-3 text-sm text-slate-600'
                    >
                      <Check className='w-5 h-5 text-blue-600 shrink-0' />
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
                    className='w-full cursor-pointer'
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
      </div>
    </section>
  );
}
