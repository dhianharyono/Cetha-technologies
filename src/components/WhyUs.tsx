'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Home, Share2, ShieldCheck, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const reasons = [
  {
    title: 'Rumah Digital',
    description:
      'Bayangkan media sosial sebagai ruko sewaan. Anda menumpang di lahan orang lain yang kapan saja bisa berubah peraturannya. Website adalah rumah digital milik Anda sepenuhnya.',
    icon: Home,
    color: 'text-cyan-400',
    bg: 'bg-cyan-400/10',
    borderColor: 'border-cyan-400/20',
  },
  {
    title: 'Kredibilitas',
    description:
      'Pelanggan lebih percaya kepada bisnis yang memiliki website resmi. Ini adalah bukti bahwa bisnis Anda serius, profesional, dan dapat diandalkan.',
    icon: ShieldCheck,
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
    borderColor: 'border-blue-400/20',
  },
  {
    title: 'Personal Branding',
    description:
      'Kendalikan secara penuh narasi dan citra diri Anda di dunia maya. Anda yang mengatur apa yang pertama kali orang lihat saat mencari nama Anda di internet.',
    icon: Share2,
    color: 'text-pink-400',
    bg: 'bg-pink-400/10',
    borderColor: 'border-pink-400/20',
  },
  {
    title: 'Aset Jangka Panjang',
    description:
      'Website adalah aset investasi. Berbeda dengan konten sosial media yang tenggelam dalam 24 jam, konten website Anda akan terus menghasilkan traffic selama bertahun-tahun.',
    icon: TrendingUp,
    color: 'text-emerald-400',
    bg: 'bg-emerald-400/10',
    borderColor: 'border-emerald-400/20',
  },
];

function TiltCard({ reason, index, colSpan }: { reason: any; index: number; colSpan: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Icon = reason.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={`h-full ${colSpan} perspective-1000`}
    >
      <Card className='h-full bg-[#131826]/40 backdrop-blur-xl border border-white/5 hover:bg-[#1A2235]/60 hover:border-cyan-500/30 hover:shadow-2xl hover:shadow-cyan-500/10 transition-colors duration-500 group overflow-hidden relative rounded-[2rem]'>
        <div
          className='absolute -right-12 -top-12 w-48 h-48 rounded-full blur-[80px] bg-white/5 group-hover:bg-cyan-500/15 transition-colors duration-500 pointer-events-none'
        ></div>

        <CardContent className='p-6 md:p-10 flex flex-col items-start gap-6 h-full relative z-10' style={{ transform: 'translateZ(50px)' }}>
          <div
            className={`p-4 rounded-2xl ${reason.bg} ${reason.borderColor} border group-hover:scale-110 transition-transform duration-500 shadow-lg`}
          >
            <Icon className={`w-6 h-6 md:w-8 md:h-8 ${reason.color}`} />
          </div>
          <div>
            <h3 className='text-lg md:text-2xl font-black text-white mb-4 tracking-tight group-hover:text-cyan-400 transition-colors'>
              {reason.title}
            </h3>
            <p className='text-slate-400 text-sm md:text-base leading-relaxed font-light'>
              {reason.description}
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function WhyUs() {
  return (
    <section id='why-us' className='py-24 md:py-32 relative z-10 px-4 overflow-hidden'>
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-cyan-500/[0.02] -z-10 blur-[120px] rounded-full" />

      <div className='container mx-auto px-4 md:px-6'>
        <motion.div
          className='text-center max-w-3xl mx-auto mb-20'
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-block px-4 py-1.5 mb-6 text-[10px] font-bold tracking-[0.2em] text-cyan-500 uppercase bg-cyan-500/10 border border-cyan-500/20 rounded-full">
            The Advantage
          </div>
          <h2 className='text-2xl md:text-4xl font-extrabold text-white mb-4 tracking-tight leading-tight'>
            Bukan Sekadar{" "}
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500'>
              Punya Website
            </span>
          </h2>
          <p className='text-sm md:text-base text-slate-400 font-normal max-w-2xl mx-auto'>
            Di era digital, sekadar eksis di media sosial tidaklah cukup. Website adalah rumah digital yang sepenuhnya Anda kendalikan.
          </p>
        </motion.div>

        <div className='grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 max-w-6xl mx-auto'>
          {reasons.map((reason, index) => {
            let colSpan = 'md:col-span-6';
            if (index === 0) colSpan = 'md:col-span-8';
            else if (index === 1) colSpan = 'md:col-span-4';
            else if (index === 2) colSpan = 'md:col-span-5';
            else if (index === 3) colSpan = 'md:col-span-7';

            return <TiltCard key={index} reason={reason} index={index} colSpan={colSpan} />;
          })}
        </div>
      </div>
    </section>
  );
}

