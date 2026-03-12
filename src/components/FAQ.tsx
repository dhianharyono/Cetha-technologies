'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'Berapa lama proses pengerjaannya?',
    answer:
      'Untuk paket Starter (Portofolio Website), estimasi pengerjaan adalah 3-5 hari kerja setelah semua materi (teks/gambar) kami terima. Untuk proyek website kompleks, waktu disesuaikan dengan fitur yang diminta.',
  },
  {
    question: 'Apakah saya dapat file sumbernya (source code)?',
    answer:
      'Ya, 100%. Anda adalah pemilik sah dari website tersebut. Kami akan menyerahkan repo GitHub atau zip file source code setelah proyek selesai dan lunas.',
  },
  {
    question: 'Bagaimana jika saya ingin revisi?',
    answer:
      'Kami memberikan kesempatan revisi minor sebanyak 2x (gratis) untuk setiap paket. Revisi minor mencakup perubahan teks, warna, atau penggantian gambar. Perubahan layout atau penambahan fitur baru akan dikenakan biaya tambahan.',
  },
  {
    question: 'Apakah website sudah include domain & hosting?',
    answer:
      'Harga paket adalah biaya jasa development. Biaya domain & hosting/deployment (Vercel/Netlify/AWS) dibayar terpisah oleh klien, namun kami akan membantu proses setup-nya secara GRATIS sampai website live.',
  },
  {
    question: 'Apakah bisa maintenance bulanan?',
    answer:
      'Tentu! Kami menawarkan paket maintenance terpisah untuk update konten rutin, backup, dan monitoring keamanan.',
  },
];

export default function FAQ() {
  return (
    <section id='faq' className='py-16 md:py-24 relative z-10 p-5'>
      <div className='container mx-auto px-4 md:px-6'>
        <div className='text-center max-w-2xl mx-auto mb-16'>
          <h2 className='text-xl sm:text-2xl md:text-3xl font-extrabold text-white mb-4'>
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className='text-sm md:text-lg text-slate-400'>
            Kami menjawab segala keraguan Anda
          </p>
        </div>

        <div className='max-w-3xl mx-auto'>
          <Accordion type='single' collapsible className='w-full'>
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className='border-b border-white/10'
              >
                <AccordionTrigger className='text-left text-white font-medium hover:text-cyan-400 hover:no-underline cursor-pointer py-4 transition-colors text-xs md:text-xl'>
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className='text-slate-400 leading-relaxed pb-4 text-xs md:text-lg'>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
