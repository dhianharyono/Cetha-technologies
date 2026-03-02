'use client';

import { motion } from 'framer-motion';
import { Home, Share2, ShieldCheck, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const reasons = [
    {
        title: 'Rumah Digital',
        description: 'Bayangkan media sosial sebagai ruko sewaan. Anda menumpang di lahan orang lain yang kapan saja bisa berubah peraturannya. Website adalah rumah digital milik Anda sepenuhnya.',
        icon: Home,
        color: 'text-cyan-400',
        bg: 'bg-cyan-400/10',
        borderColor: 'border-cyan-400/20',
    },
    {
        title: 'Kredibilitas',
        description: 'Pelanggan lebih percaya kepada bisnis yang memiliki website resmi. Ini adalah bukti bahwa bisnis Anda serius, profesional, dan dapat diandalkan.',
        icon: ShieldCheck,
        color: 'text-blue-400',
        bg: 'bg-blue-400/10',
        borderColor: 'border-blue-400/20',
    },
    {
        title: 'Personal Branding',
        description: 'Kendalikan secara penuh narasi dan citra diri Anda di dunia maya. Anda yang mengatur apa yang pertama kali orang lihat saat mencari nama Anda di internet.',
        icon: Share2,
        color: 'text-pink-400',
        bg: 'bg-pink-400/10',
        borderColor: 'border-pink-400/20',
    },
    {
        title: 'Aset Jangka Panjang',
        description: 'Website adalah aset investasi. Berbeda dengan konten sosial media yang tenggelam dalam 24 jam, konten website Anda akan terus menghasilkan traffic selama bertahun-tahun.',
        icon: TrendingUp,
        color: 'text-emerald-400',
        bg: 'bg-emerald-400/10',
        borderColor: 'border-emerald-400/20',
    }
];

export default function WhyUs() {
    return (
        <section id='why-us' className='py-16 md:py-24 relative z-10 p-4'>
            <div className='absolute inset-0 bg-[#07090E] -z-10'></div>
            <div className='container mx-auto px-4 md:px-6'>
                <motion.div
                    className='text-center max-w-3xl mx-auto mb-16'
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    <h2 className='text-xl md:text-4xl font-extrabold text-white mb-4'>
                        Mengapa Anda <span className="text-cyan-400">Harus Punya</span> Website?
                    </h2>
                    <p className='text-sm md:text-lg text-slate-400'>
                        Di era digital, sekadar eksis di media sosial seringkali tidak cukup. Media sosial seperti menyewa ruko, sedangkan website adalah rumah Anda sendiri.
                    </p>
                </motion.div>

                <div className='grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6 max-w-5xl mx-auto'>
                    {reasons.map((reason, index) => {
                        const Icon = reason.icon;

                        // Konfigurasi bento grid (Asimetris)
                        let colSpan = 'md:col-span-6';
                        if (index === 0) colSpan = 'md:col-span-8';     // Sangat lebar
                        else if (index === 1) colSpan = 'md:col-span-4';// Kotak kecil
                        else if (index === 2) colSpan = 'md:col-span-5';// Kotak kecil
                        else if (index === 3) colSpan = 'md:col-span-7';// Sangat lebar

                        return (
                            <motion.div
                                key={reason.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.15 }}
                                viewport={{ once: true }}
                                className={`h-full ${colSpan}`}
                            >
                                <Card className='h-full bg-[#131826]/60 backdrop-blur-xl border border-white/5 shadow-sm shadow-white/5 hover:bg-[#1A2235]/80 hover:border-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-500 group overflow-hidden relative'>
                                    {/* Aksen background dekoratif */}
                                    <div className={`absolute -right-12 -top-12 w-48 h-48 rounded-full blur-[80px] bg-white/5 group-hover:bg-cyan-500/10 transition-colors duration-500 pointer-events-none`}></div>

                                    <CardContent className='p-6 md:p-8 flex flex-col items-start text-left gap-5 h-full relative z-10'>
                                        <div className={`p-4 rounded-2xl ${reason.bg} ${reason.borderColor} border group-hover:scale-110 transition-transform duration-500`}>
                                            <Icon className={`w-7 h-7 ${reason.color}`} />
                                        </div>
                                        <div className="mt-2">
                                            <h3 className='text-lg md:text-2xl font-bold text-white mb-3 tracking-tight'>
                                                {reason.title}
                                            </h3>
                                            <p className='text-slate-400 text-sm md:text-base leading-relaxed'>
                                                {reason.description}
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
