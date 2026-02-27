'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Zap, Smartphone, Search, Puzzle } from 'lucide-react';
import { motion } from 'framer-motion';

const services = [
  {
    title: 'High Performance',
    description:
      'Skor Lighthouse 90+ menjamin website Anda dimuat instan. Pengunjung tidak akan kabur karena loading lama.',
    icon: Zap,
    color: 'text-amber-500',
    bg: 'bg-amber-50',
  },
  {
    title: 'Responsive Design',
    description:
      'Tampilan sempurna di setiap perangkat, mulai dari HP Android murah hingga Desktop layar lebar 4K.',
    icon: Smartphone,
    color: 'text-blue-500',
    bg: 'bg-blue-50',
  },
  {
    title: 'SEO Optimized',
    description:
      'Struktur HTML semantik dan metadata yang tepat agar website Anda mudah ditemukan di halaman pertama Google.',
    icon: Search,
    color: 'text-green-500',
    bg: 'bg-green-50',
  },
  {
    title: 'Custom Features',
    description:
      'Butuh integrasi WhatsApp, Form Email, atau Dashboard Admin? Kami bangun sesuai kebutuhan spesifik Anda.',
    icon: Puzzle,
    color: 'text-purple-500',
    bg: 'bg-purple-50',
  },
];

export default function Services() {
  return (
    <section id='services' className='py-16 md:py-24 relative z-10'>
      <div className='container mx-auto px-4 md:px-6'>
        <div className='text-center max-w-2xl mx-auto mb-16'>
          <h2 className='text-xl sm:text-2xl md:text-3xl font-extrabold text-white mb-4'>
            Layanan Spesialis Kami
          </h2>
          <p className='text-sm md:text-lg text-slate-400'>
            Fokus pada kualitas teknis dan hasil bisnis. Kami tidak sekadar
            membuat website cantik, tapi website yang bekerja optimal untuk
            Anda.
          </p>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8'>
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className='h-full border border-white/5 bg-[#131826]/80 backdrop-blur-md shadow-sm shadow-white/5 transition-all duration-300 group relative overflow-hidden'>
                {/* Glow effect on hover */}
                <div className='absolute inset-0 bg-linear-to-br from-cyan-500/0 via-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/10 group-hover:to-blue-500/10 transition-colors duration-500'></div>

                <CardHeader className='relative z-10 p-4 md:p-6 pb-2 md:pb-6'>
                  <div className='place-items-center'>
                    <div
                      className={`w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl ${service.bg} bg-opacity-20 flex items-center justify-center mb-3 md:mb-5 shadow-inner border border-white/5`}
                    >
                      <service.icon className={`w-5 h-5 md:w-6 md:h-6 ${service.color}`} />
                    </div>
                    <CardTitle className='text-white text-sm md:text-xl text-center leading-tight'>
                      {service.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className='relative z-10 p-4 pt-0 md:p-6 md:pt-0'>
                  <p className='text-slate-400 leading-relaxed text-center text-xs md:text-base'>
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
