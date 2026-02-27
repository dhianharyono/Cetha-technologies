'use client';

import { useState, FormEvent } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Send, Building, Link as LinkIcon, Edit3, Image as ImageIcon, MapPin, Phone, Instagram } from 'lucide-react';

export default function PemesananForm() {
    const searchParams = useSearchParams();
    const paket = searchParams.get('paket') || 'Starter';

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        namaUsaha: '',
        slogan: '',
        deskripsiSingkat: '',
        infoHalaman: '',
        sudahDomain: 'Belum',
        namaDomain: '',
        referensiDesain: '',
        nomorWa: '',
        linkIg: '',
        alamatFisik: '',
        linkMateriVisual: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const getDynamicInfoLabel = () => {
        switch (paket) {
            case 'Pro Business':
                return 'Informasi & Struktur Halaman (Sebutkan Info Tiap Hal. Maks 5 Halaman: Beranda, Tentang Kami, Kontak, dsb)';
            case 'Enterprise':
                return 'Informasi Halaman & Kebutuhan Fitur Custom (E-Commerce, Booking, API Terkait, dll)';
            default:
                return 'Informasi apa saja yang ingin Anda tampilkan di Landing Page? (Deskripsi, Tahap Layanan, Portfolio, dll)';
        }
    };

    const getDynamicInfoPlaceholder = () => {
        switch (paket) {
            case 'Pro Business':
                return 'Contoh: \n1. Beranda: Info Layanan\n2. Tentang Kami: ...\n3. Kontak: ...';
            case 'Enterprise':
                return 'Contoh: Ingin ada login pengguna, dashboard statistik penjualan, integrasi Midtrans, fitur chat real-time, dst...';
            default:
                return 'Contoh: Saya ingin menampilkan deskripsi produk unggulan, 3 tahap layanan kami, minimal 5 testimoni positif pelanggan...';
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const message = `*FORMULIR KEBUTUHAN KONTEN WEBSITE*
(Order Paket: *${paket}*)

*1. Informasi Dasar Brand*
- Nama Usaha: ${formData.namaUsaha || '-'}
- Slogan/Tagline: ${formData.slogan || '-'}
- Deskripsi Singkat: ${formData.deskripsiSingkat || '-'}

*2. Kebutuhan Detail Halaman*
- Info/Fitur Khusus: ${formData.infoHalaman || '-'}

*3. Domain & Referensi*
- Sudah memiliki domain?: ${formData.sudahDomain}
- Domain yang diinginkan: ${formData.namaDomain || '-'}
- Referensi Desain Website: ${formData.referensiDesain || '-'}

*4. Kontak & Media Sosial*
- Nomor WhatsApp: ${formData.nomorWa || '-'}
- Link Instagram: ${formData.linkIg || '-'}
- Alamat Fisik: ${formData.alamatFisik || '-'}

*5. Materi Visual (Gambar/Foto/Logo)*
- Link Google Drive Materi Visual: ${formData.linkMateriVisual || '-'}

Terima kasih.`;

        const waUrl = `https://wa.me/6281320005405?text=${encodeURIComponent(message)}`;

        setTimeout(() => {
            window.open(waUrl, '_blank');
            setIsSubmitting(false);
        }, 800);
    };

    return (
        <div className='container mx-auto px-4 sm:px-6 max-w-4xl'>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className='text-center mb-10'>
                    <h1 className='text-3xl md:text-5xl font-extrabold text-white mb-4'>
                        Form Kebutuhan Website
                    </h1>
                    <p className='text-cyan-400 font-semibold mb-2'>Paket Pilihan: {paket}</p>
                    <p className='text-slate-400 text-sm md:text-base'>
                        Agar proses pengerjaan website bisa segera dimulai, mohon siapkan dan lengkapi data-data berikut ya.
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    {/* 1. Basic Info */}
                    <Card className='mb-8 border border-white/5 bg-[#131826]/80 backdrop-blur-md shadow-sm shadow-white/5'>
                        <CardHeader>
                            <CardTitle className='text-xl text-white flex items-center gap-2'>
                                <Building className="w-5 h-5 text-cyan-400" /> Informasi Dasar Brand
                            </CardTitle>
                        </CardHeader>
                        <CardContent className='space-y-4'>
                            <div>
                                <label className='block text-sm font-medium text-slate-300 mb-2'>Nama Usaha / Nama Penawaran <span className="text-red-400">*</span></label>
                                <input
                                    required
                                    type='text'
                                    name='namaUsaha'
                                    value={formData.namaUsaha}
                                    onChange={handleChange}
                                    placeholder='Nama yang ingin ditampilkan di website'
                                    className='w-full px-4 py-3 bg-[#0B101C]/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors'
                                />
                            </div>
                            <div>
                                <label className='block text-sm font-medium text-slate-300 mb-2'>Slogan / Tagline (Jika ada)</label>
                                <input
                                    type='text'
                                    name='slogan'
                                    value={formData.slogan}
                                    onChange={handleChange}
                                    placeholder='Contoh: "Kopi Terbaik Harga Bersahabat"'
                                    className='w-full px-4 py-3 bg-[#0B101C]/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors'
                                />
                            </div>
                            <div>
                                <label className='block text-sm font-medium text-slate-300 mb-2'>Deskripsi Singkat <span className="text-red-400">*</span></label>
                                <textarea
                                    required
                                    name='deskripsiSingkat'
                                    value={formData.deskripsiSingkat}
                                    onChange={handleChange}
                                    rows={3}
                                    placeholder='Penjelasan singkat tentang apa usaha ini dan apa keunggulannya'
                                    className='w-full px-4 py-3 bg-[#0B101C]/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors resize-none'
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* 2. Detail Halaman Content */}
                    <Card className='mb-8 border border-white/5 bg-[#131826]/80 backdrop-blur-md shadow-sm shadow-white/5'>
                        <CardHeader>
                            <CardTitle className='text-xl text-white flex items-center gap-2'>
                                <Edit3 className="w-5 h-5 text-cyan-400" /> Kebutuhan Tampilan / Fitur
                            </CardTitle>
                            <CardDescription className='text-slate-400 text-sm'>
                                Eksklusif untuk menyesuaikan paket <strong>{paket}</strong> Anda.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div>
                                <label className='block text-sm font-medium text-slate-300 mb-2'>{getDynamicInfoLabel()} <span className="text-red-400">*</span></label>
                                <textarea
                                    required
                                    name='infoHalaman'
                                    value={formData.infoHalaman}
                                    onChange={handleChange}
                                    rows={5}
                                    placeholder={getDynamicInfoPlaceholder()}
                                    className='w-full px-4 py-3 bg-[#0B101C]/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors resize-none'
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* 3. Domain & Referensi */}
                    <Card className='mb-8 border border-white/5 bg-[#131826]/80 backdrop-blur-md shadow-sm shadow-white/5'>
                        <CardHeader>
                            <CardTitle className='text-xl text-white flex items-center gap-2'>
                                <LinkIcon className="w-5 h-5 text-cyan-400" />  Domain & Desain
                            </CardTitle>
                        </CardHeader>
                        <CardContent className='space-y-4'>
                            <div>
                                <label className='block text-sm font-medium text-slate-300 mb-2'>Sudah memiliki Domain? <span className="text-red-400">*</span></label>
                                <select
                                    name='sudahDomain'
                                    value={formData.sudahDomain}
                                    onChange={handleChange}
                                    className='w-full px-4 py-3 bg-[#0B101C]/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors appearance-none'
                                >
                                    <option value="Belum">Belum / Minta dicarikan</option>
                                    <option value="Sudah">Sudah punya (domain sendiri)</option>
                                </select>
                            </div>
                            <div>
                                <label className='block text-sm font-medium text-slate-300 mb-2'>Jika belum punya, Tuliskan domain yang Anda inginkan (seperti .com / .id)</label>
                                <input
                                    type='text'
                                    name='namaDomain'
                                    value={formData.namaDomain}
                                    onChange={handleChange}
                                    placeholder='Contoh: www.namausaha.com'
                                    className='w-full px-4 py-3 bg-[#0B101C]/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors'
                                />
                            </div>
                            <div className="pt-2">
                                <label className='block text-sm font-medium text-slate-300 mb-2'>Referensi Website (Minimal 2-3 untuk benchmark desain)</label>
                                <textarea
                                    name='referensiDesain'
                                    value={formData.referensiDesain}
                                    onChange={handleChange}
                                    rows={2}
                                    placeholder='Sertakan link referensi web saingan / web ide lain, bisa dicari dari Pinterest/Google'
                                    className='w-full px-4 py-3 bg-[#0B101C]/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors resize-none'
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* 4. Social & Contact */}
                    <Card className='mb-8 border border-white/5 bg-[#131826]/80 backdrop-blur-md shadow-sm shadow-white/5'>
                        <CardHeader>
                            <CardTitle className='text-xl text-white flex items-center gap-2'>
                                <Phone className="w-5 h-5 text-cyan-400" /> Kontak & Media Sosial
                            </CardTitle>
                        </CardHeader>
                        <CardContent className='space-y-4'>
                            <div>
                                <label className='block text-sm font-medium text-slate-300 mb-2 flex items-center gap-1.5'>Nomor WhatsApp Admin (Tombol Aksi Web) <span className="text-red-400">*</span></label>
                                <input
                                    required
                                    type='text'
                                    name='nomorWa'
                                    value={formData.nomorWa}
                                    onChange={handleChange}
                                    placeholder='Contoh: 081234567890'
                                    className='w-full px-4 py-3 bg-[#0B101C]/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors'
                                />
                            </div>
                            <div>
                                <label className='block text-sm font-medium text-slate-300 mb-2 flex items-center gap-1.5'>Link Instagram (Jika ada)</label>
                                <input
                                    type='text'
                                    name='linkIg'
                                    value={formData.linkIg}
                                    onChange={handleChange}
                                    placeholder='Link lengkap IG'
                                    className='w-full px-4 py-3 bg-[#0B101C]/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors'
                                />
                            </div>
                            <div>
                                <label className='block text-sm font-medium text-slate-300 mb-2 flex items-center gap-1.5'>Alamat Fisik Lengkap (opsional)</label>
                                <textarea
                                    name='alamatFisik'
                                    value={formData.alamatFisik}
                                    onChange={handleChange}
                                    rows={2}
                                    placeholder='Jika ingin alamat ditampilkan di Peta/Google Maps embed di web'
                                    className='w-full px-4 py-3 bg-[#0B101C]/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors resize-none'
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* 5. Assets */}
                    <Card className='mb-8 border border-white/5 bg-[#131826]/80 backdrop-blur-md shadow-sm shadow-white/5'>
                        <CardHeader>
                            <CardTitle className='text-xl text-white flex items-center gap-2'>
                                <ImageIcon className="w-5 h-5 text-cyan-400" /> Materi Visual Pendukung
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <label className='block text-sm font-medium text-slate-300 mb-2'>Tautan / URL Folder GDrive (Logo PNG, Foto Produk/Tim, dsb)</label>
                            <input
                                type='text'
                                name='linkMateriVisual'
                                value={formData.linkMateriVisual}
                                onChange={handleChange}
                                placeholder='Paste url / link Google Drive, pastikan akses Anyone With Context aktif'
                                className='w-full px-4 py-3 bg-[#0B101C]/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors'
                            />
                            <p className="text-xs text-slate-500 mt-3">* Catatan: Anda juga bisa menyusulkan / mengirimkan foto langsung via WhatsApp setelah formulir ini dikirimkan.</p>
                        </CardContent>
                    </Card>

                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-6 rounded-2xl font-bold flex items-center justify-center gap-2 text-md transition-all ${isSubmitting ? 'bg-cyan-500/50 cursor-not-allowed' : 'bg-cyan-500 hover:bg-cyan-400 text-slate-900 shadow-[0_0_20px_rgba(6,182,212,0.4)] cursor-pointer hover:scale-[1.02]'
                            }`}
                    >
                        {isSubmitting ? 'Menghasilkan pesan...' : 'Kirim via WhatsApp'} <Send className="w-4 h-4" />
                    </Button>

                </form>
            </motion.div>
        </div>
    );
}
