'use client';

import { motion } from 'framer-motion';
import { MessageSquare, LayoutTemplate, Code2, Rocket } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const steps = [
  {
    title: 'Mengisi Form',
    description:
      'Isi form yang tersedia dan ceritakan kebutuhan dan tujuan bisnis Anda kepada kami.',
    icon: MessageSquare,
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
    borderColor: 'border-blue-400/20',
  },
  {
    title: 'Rencana & Desain',
    description: 'Kami membuat rancangan antarmuka (UI/UX) khusus untuk Anda.',
    icon: LayoutTemplate,
    color: 'text-pink-400',
    bg: 'bg-pink-400/10',
    borderColor: 'border-pink-400/20',
  },
  {
    title: 'Pengembangan',
    description:
      'Proses penulisan kode (coding) dengan teknologi modern super cepat.',
    icon: Code2,
    color: 'text-cyan-400',
    bg: 'bg-cyan-400/10',
    borderColor: 'border-cyan-400/20',
  },
  {
    title: 'Uji Coba & Perilisan',
    description: 'Website siap digunakan dan kami bantu perawatannya.',
    icon: Rocket,
    color: 'text-emerald-400',
    bg: 'bg-emerald-400/10',
    borderColor: 'border-emerald-400/20',
  },
];

export default function ServiceSteps() {
  return (
    <section id='process' className='py-16 md:py-24 relative z-10 p-4'>
      <div className='container mx-auto px-4 md:px-6'>
        <motion.div
          className='text-center max-w-2xl mx-auto mb-16'
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className='text-xl md:text-5xl font-extrabold text-white mb-2 md:mb-4'>
            Langkah{' '}
            <span className='text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-400'>
              Memulai Layanan
            </span>
          </h2>
          <p className='text-sm md:text-lg text-slate-400'>
            Proses kerja transparan dan sistematis untuk memastikan hasil
            terbaik.
          </p>
        </motion.div>

        <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-20 max-w-7xl mx-auto'>
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true }}
                className='relative'
              >
                {/* Arrow connecting steps (desktop only) */}
                {index < steps.length - 1 && (
                  <div className='hidden lg:block absolute top-18 left-full w-full h-0.5 -ml-8 px-4 z-0'>
                    <div className='w-full h-full bg-slate-800 rounded-full overflow-hidden'>
                      <motion.div
                        className='h-full bg-linear-to-r from-transparent via-cyan-500 to-transparent'
                        initial={{ x: '-100%' }}
                        whileInView={{ x: '100%' }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.2,
                        }}
                      />
                    </div>
                  </div>
                )}

                <Card className='h-full bg-[#131826]/80 backdrop-blur-md border border-white/5 hover:border-white/10 transition-all duration-300 group z-10 relative'>
                  <CardContent className='p-4 md:p-8 flex flex-row sm:flex-col items-center sm:text-center text-left gap-4 sm:gap-6'>
                    <div className='relative shrink-0'>
                      <div
                        className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl ${step.bg} ${step.borderColor} border group-hover:scale-110 transition-transform duration-300`}
                      >
                        <Icon
                          className={`w-6 h-6 sm:w-8 sm:h-8 ${step.color}`}
                        />
                      </div>
                    </div>
                    <div>
                      <h3 className='text-base sm:text-lg md:text-xl font-bold text-white mb-1 sm:mb-2'>
                        <span className='text-white/40 mr-2 sm:hidden text-sm'>
                          0{index + 1}.
                        </span>
                        {step.title}
                      </h3>
                      <p className='text-slate-400 text-xs sm:text-sm leading-relaxed'>
                        {step.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
