'use client';

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

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
  return (
    <section id='portfolio' className='py-20 bg-slate-50'>
      <div className='container mx-auto px-4 md:px-6'>
        <div className='text-center max-w-2xl mx-auto mb-16'>
          <h2 className='text-3xl md:text-4xl font-bold text-slate-900 mb-4'>
            Portofolio Terpilih
          </h2>
          <p className='text-lg text-slate-600'>
            Bukti nyata dari dedikasi kami terhadap kecepatan dan estetika.
          </p>
        </div>

        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className='overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 group'>
                <div className='relative h-48 w-full overflow-hidden'>
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className='object-cover transition-transform duration-500 group-hover:scale-105'
                  />
                </div>
                <CardContent className='p-6'>
                  <h3 className='text-xl font-bold text-slate-900 mb-2'>
                    {project.title}
                  </h3>
                  <p className='text-slate-600 text-sm mb-4'>
                    {project.description}
                  </p>

                  <div className='flex flex-wrap gap-2 mb-4'>
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className='px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md font-medium'
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className='pt-4 border-t border-slate-100 flex items-center justify-between'>
                    {/* <span className="text-sm text-slate-500">Hasil:</span> */}
                    <span className='text-sm font-bold text-green-600 bg-green-50 px-2 py-1 rounded'>
                      {project.result}
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
