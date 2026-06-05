'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, MessageSquare, ChevronLeft, ChevronRight } from 'lucide-react';
import { ITestimonial } from '@/types';

interface TestimonialsProps {
  testimonials: ITestimonial[];
}

const defaultTestimonials: ITestimonial[] = [
  {
    _id: 'default-1',
    orderId: 'default',
    namaKlien: 'Budi Hartono',
    namaUsaha: 'Klinik Gizi Dietisienmu',
    rating: 5,
    ulasan: 'Website yang dibuat oleh Cetha Technologies sangat cepat dan memiliki desain yang sangat premium. Klien kami sangat menyukai antarmukanya. Sangat direkomendasikan!',
    isVisible: true,
  },
  {
    _id: 'default-2',
    orderId: 'default',
    namaKlien: 'Siti Aminah',
    namaUsaha: 'Hijab Style Indonesia',
    rating: 5,
    ulasan: 'Pelayanan admin sangat ramah dan proses pelacakan pesanan sangat transparan. Hasil koding rapi dan responsive di semua perangkat smartphone maupun desktop.',
    isVisible: true,
  },
  {
    _id: 'default-3',
    orderId: 'default',
    namaKlien: 'Hendra Wijaya',
    namaUsaha: 'Kopi Nusantara',
    rating: 5,
    ulasan: 'Proses revisi berjalan lancar dan cepat. Website selesai tepat waktu dan langsung go-live tanpa kendala teknis. Terima kasih Cetha Technologies!',
    isVisible: true,
  }
];

export default function Testimonials({ testimonials }: TestimonialsProps) {
  // Use public testimonials if available, otherwise fallback to defaults
  const list = testimonials && testimonials.length > 0 ? testimonials : defaultTestimonials;
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-scroll effect every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % list.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [list.length]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + list.length) % list.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % list.length);
  };

  const activeTestimonial = list[activeIndex];

  return (
    <section id="testimonials" className="relative py-24 bg-[#07090E] overflow-hidden text-left">
      {/* Background Glow Elements */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 rounded-full text-xs font-bold uppercase tracking-wider">
            <MessageSquare className="w-3.5 h-3.5" />
            Testimoni Klien
          </div>
          <h2 className="text-3xl sm:text-5xl font-black bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            Apa Kata Mereka Tentang Kami
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Kepuasan klien adalah prioritas utama kami. Berikut adalah ulasan jujur dari bisnis yang telah mempercayakan websitenya kepada kami.
          </p>
        </div>

        {/* Carousel Slider */}
        <div className="relative bg-[#131826]/40 backdrop-blur-xl border border-white/5 rounded-3xl p-6 sm:p-12 shadow-2xl overflow-hidden min-h-[300px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              {/* Rating Star Indicator */}
              <div className="flex items-center gap-1">
                {Array.from({ length: activeTestimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                ))}
              </div>

              {/* Testimonial Quote */}
              <blockquote className="text-lg sm:text-2xl text-slate-100 font-medium leading-relaxed italic">
                "{activeTestimonial.ulasan}"
              </blockquote>

              {/* Client Profile */}
              <div className="flex items-center gap-4 pt-4">
                {activeTestimonial.avatarUrl ? (
                  <div className="w-14 h-14 rounded-2xl overflow-hidden border border-white/10 shrink-0">
                    <img
                      src={activeTestimonial.avatarUrl}
                      alt={activeTestimonial.namaKlien}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center font-black text-xl shrink-0">
                    {activeTestimonial.namaKlien.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <cite className="not-italic font-bold text-white text-base sm:text-lg block">
                    {activeTestimonial.namaKlien}
                  </cite>
                  <span className="text-xs sm:text-sm text-cyan-400 font-semibold block mt-0.5">
                    {activeTestimonial.namaUsaha}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Slider Controls */}
          <div className="flex justify-between items-center gap-4 pt-8 border-t border-white/5 mt-8">
            {/* Pagination Dots */}
            <div className="flex items-center gap-2">
              {list.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    index === activeIndex ? 'w-8 bg-cyan-400' : 'w-2.5 bg-slate-700 hover:bg-slate-500'
                  }`}
                  title={`Pergi ke slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Prev/Next Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="p-3 bg-[#07090E] hover:bg-white/5 border border-white/10 rounded-xl text-slate-400 hover:text-white transition-colors cursor-pointer"
                title="Slide Sebelumnya"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="p-3 bg-[#07090E] hover:bg-white/5 border border-white/10 rounded-xl text-slate-400 hover:text-white transition-colors cursor-pointer"
                title="Slide Berikutnya"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
