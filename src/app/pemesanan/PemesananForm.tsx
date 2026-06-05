'use client';

import { useState, FormEvent, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import SuccessModal from '@/components/SuccessModal';

function PemesananFormContent() {
  const searchParams = useSearchParams();
  const initialPaket = searchParams.get('paket') || 'Starter';

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submittedOrderId, setSubmittedOrderId] = useState('');
  const [formData, setFormData] = useState(() => {
    let kategori = '';
    let pilihan = '';
    if (
      initialPaket === 'Starter' ||
      initialPaket === 'Portofolio Standar' ||
      initialPaket === 'Portofolio Lengkap'
    ) {
      kategori = 'Portofolio';
      pilihan =
        initialPaket === 'Starter' || initialPaket === 'Portofolio Standar'
          ? 'Paket Standar: Beranda, Tentang Saya, Galeri/Karya, Kontak'
          : 'Paket Lengkap: Beranda, Showreel, Layanan, Karya, Testimoni, Kontak';
    } else if (
      initialPaket === 'Pro Business' ||
      initialPaket === 'Company Profile' ||
      initialPaket === 'Katalog Produk'
    ) {
      kategori = 'Website Usaha';
      pilihan =
        initialPaket === 'Katalog Produk'
          ? 'Katalog Layanan/Produk + Dashboard Penjualan'
          : 'Company Profile + Dashboard Admin';
    } else if (initialPaket === 'Enterprise' || initialPaket === 'Custom') {
      kategori = 'Custom';
      pilihan = '';
    }

    return {
      namaUsaha: '',
      slogan: '',
      deskripsiSingkat: '',
      kategoriKebutuhan: kategori,
      pilihanKebutuhan: pilihan,
      deskripsiFitur: '',
      sudahDomain: 'Belum',
      namaDomain: '',
      referensiDesain: '',
      nomorWa: '',
      email: '',
      linkIg: '',
      alamatFisik: '',
      linkMateriVisual: '',
    };
  });

  const getCurrentPaket = () => {
    if (formData.kategoriKebutuhan === 'Portofolio') {
      if (formData.pilihanKebutuhan.includes('Paket Lengkap'))
        return 'Portofolio Lengkap';
      if (formData.pilihanKebutuhan.includes('Paket Standar'))
        return 'Portofolio Standar';
      return 'Portofolio';
    }
    if (formData.kategoriKebutuhan === 'Website Usaha') {
      if (formData.pilihanKebutuhan.includes('Katalog Layanan/Produk'))
        return 'Katalog Produk';
      if (formData.pilihanKebutuhan.includes('Company Profile'))
        return 'Company Profile';
      return 'Website Usaha';
    }
    return 'Custom';
  };

  const paket = getCurrentPaket();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, paket }),
      });

      if (res.ok) {
        const result = await res.json();
        const orderId = result.data?._id || '';
        setSubmittedOrderId(orderId);
        setSuccessMsg(true);
        setShowSuccessModal(true);
      } else {
        alert('Gagal mengirim form. Silakan coba lagi.');
        setIsSubmitting(false);
      }
    } catch (error) {
      alert('Terjadi kesalahan jaringan.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className='container mx-auto px-4 sm:px-6 max-w-4xl'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className='text-center mb-10'>
          <h1 className='text-2xl md:text-5xl font-extrabold text-white mb-2 md:mb-4'>
            Form Kebutuhan Website
          </h1>
          <p className='text-slate-400 text-xs md:text-sm mb-4'>
            Agar proses pengerjaan website bisa segera dimulai, mohon siapkan
            dan lengkapi data-data berikut ya.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* 1. Basic Info */}
          <Card className='mb-8 border border-white/5 bg-[#131826]/80 backdrop-blur-md shadow-sm shadow-white/5'>
            <CardHeader>
              <CardTitle className='text-xl text-white flex items-center gap-2 justify-center'>
                Informasi Dasar
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div>
                <label className='block text-sm font-medium text-slate-300 mb-2'>
                  Nama Usaha <span className='text-red-400'>*</span>
                </label>
                <input
                  required
                  type='text'
                  name='namaUsaha'
                  value={formData.namaUsaha}
                  onChange={handleChange}
                  placeholder='Nama yang ingin ditampilkan di website'
                  className='text-xs w-full px-4 py-3 bg-[#0B101C]/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-slate-300 mb-2'>
                  Slogan / Tagline <span className='text-red-400'>*</span>
                </label>
                <input
                  required
                  type='text'
                  name='slogan'
                  value={formData.slogan}
                  onChange={handleChange}
                  placeholder='Contoh: "Kopi Terbaik Harga Bersahabat"'
                  className='text-xs w-full px-4 py-3 bg-[#0B101C]/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-slate-300 mb-2'>
                  Deskripsi Singkat <span className='text-red-400'>*</span>
                </label>
                <textarea
                  required
                  name='deskripsiSingkat'
                  value={formData.deskripsiSingkat}
                  onChange={handleChange}
                  rows={3}
                  placeholder='Penjelasan singkat tentang apa usaha ini dan apa keunggulannya'
                  className='text-xs w-full px-4 py-3 bg-[#0B101C]/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors resize-none'
                />
              </div>
            </CardContent>
          </Card>

          {/* 2. Detail Halaman Content */}
          <Card className='mb-8 border border-white/5 bg-[#131826]/80 backdrop-blur-md shadow-sm shadow-white/5'>
            <CardHeader>
              <CardTitle className='text-xl text-white flex items-center gap-2 justify-center'>
                Kebutuhan Fitur
              </CardTitle>
              <CardDescription className='flex text-slate-400 text-sm items-center justify-center'>
                Pilih atau tuliskan kebutuhan sistem sesuai paket{' '}
                <strong className='mx-1'>{paket}</strong> Anda.
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
              {/* Kategori Pilihan */}
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <div
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      kategoriKebutuhan: 'Portofolio',
                      pilihanKebutuhan: '',
                      deskripsiFitur: '',
                    }))
                  }
                  className={`cursor-pointer p-4 rounded-xl border transition-all relative overflow-hidden group ${
                    formData.kategoriKebutuhan === 'Portofolio'
                      ? 'border-cyan-500 bg-cyan-500/10'
                      : 'border-white/10 bg-[#0B101C]/50 hover:border-cyan-500/50'
                  }`}
                >
                  <h3 className='font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors'>
                    Portofolio
                  </h3>
                  <p className='text-xs text-slate-400 mb-4'>
                    Memamerkan karya dan pengalaman Anda secara profesional.
                  </p>

                  {/* Wireframe Ilustrasi Portofolio */}
                  <div className='w-full h-28 bg-[#0B101C] border border-white/10 rounded-lg p-2 flex flex-col gap-2'>
                    {/* Header */}
                    <div className='w-full h-3 bg-white/10 rounded flex items-center justify-between px-2'>
                      <div className='w-8 h-1.5 bg-white/30 rounded'></div>
                      <div className='flex gap-1'>
                        <div className='w-3 h-1.5 bg-white/20 rounded'></div>
                        <div className='w-3 h-1.5 bg-white/20 rounded'></div>
                      </div>
                    </div>
                    {/* Hero Image Block */}
                    <div className='w-full h-8 bg-cyan-500/20 rounded-md border border-cyan-500/30 flex items-center justify-center'>
                      <div className='w-1/2 h-2 bg-cyan-500/50 rounded'></div>
                    </div>
                    {/* Gallery Grid */}
                    <div className='grid grid-cols-3 gap-1.5 flex-1 relative'>
                      <div className='bg-white/10 rounded h-full'></div>
                      <div className='bg-white/10 rounded h-full'></div>
                      <div className='bg-white/10 rounded h-full'></div>
                    </div>
                  </div>
                </div>

                <div
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      kategoriKebutuhan: 'Website Usaha',
                      pilihanKebutuhan: '',
                      deskripsiFitur: '',
                    }))
                  }
                  className={`cursor-pointer p-4 rounded-xl border transition-all relative overflow-hidden group ${
                    formData.kategoriKebutuhan === 'Website Usaha'
                      ? 'border-cyan-500 bg-cyan-500/10'
                      : 'border-white/10 bg-[#0B101C]/50 hover:border-cyan-500/50'
                  }`}
                >
                  <h3 className='font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors'>
                    Website Usaha
                  </h3>
                  <p className='text-xs text-slate-400 mb-4'>
                    Menghubungkan layanan bisnis dengan pelanggan (termasuk
                    dashboard).
                  </p>

                  {/* Wireframe Ilustrasi Website Usaha */}
                  <div className='w-full h-28 bg-[#0B101C] border border-white/10 rounded-lg p-2 flex flex-col gap-2 relative'>
                    {/* Sidebar / Dashboard feel */}
                    <div className='absolute left-2 top-2 bottom-2 w-6 bg-white/5 rounded-md flex flex-col items-center py-2 gap-1.5 border border-white/5'>
                      <div className='w-3 h-3 bg-cyan-500/50 rounded-full mb-1'></div>
                      <div className='w-3 h-1 bg-white/20 rounded'></div>
                      <div className='w-3 h-1 bg-white/20 rounded'></div>
                    </div>

                    <div className='ml-8 flex flex-col gap-2 h-full'>
                      {/* Header Dashboard */}
                      <div className='w-full h-3 bg-white/10 rounded flex items-center px-2'>
                        <div className='w-1/3 h-1.5 bg-white/30 rounded'></div>
                      </div>
                      {/* Summary Cards */}
                      <div className='flex gap-1.5 h-6'>
                        <div className='flex-1 bg-cyan-500/20 border border-cyan-500/20 rounded-md'></div>
                        <div className='flex-1 bg-white/10 rounded-md'></div>
                      </div>
                      {/* Content block */}
                      <div className='flex-1 bg-white/5 rounded-md'></div>
                    </div>
                  </div>
                </div>

                <div
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      kategoriKebutuhan: 'Custom',
                      pilihanKebutuhan: '',
                      deskripsiFitur: '',
                    }))
                  }
                  className={`cursor-pointer p-4 rounded-xl border transition-all relative overflow-hidden group ${
                    formData.kategoriKebutuhan === 'Custom'
                      ? 'border-cyan-500 bg-cyan-500/10'
                      : 'border-white/10 bg-[#0B101C]/50 hover:border-cyan-500/50'
                  }`}
                >
                  <h3 className='font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors'>
                    Custom
                  </h3>
                  <p className='text-xs text-slate-400 mb-4'>
                    Kebutuhan fitur spesifik yang bisa ditulis langsung secara
                    bebas.
                  </p>

                  {/* Wireframe Ilustrasi Custom */}
                  <div className='w-full h-28 bg-[#0B101C] border border-white/10 border-dashed rounded-lg p-2 flex flex-col items-center justify-center relative bg-[url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScxMicgaGVpZ2h0PScxMic+CjxyZWN0IHdpZHRoPScxMicgaGVpZ2h0PScxMicgZmlsbD0nI2ZmZicgZmlsbC1vcGFjaXR5PScwLjAyJy8+Cjwvc3ZnPg==")]'>
                    <div className='w-12 h-12 rounded-full border border-dashed border-cyan-500/40 bg-cyan-500/5 flex items-center justify-center group-hover:scale-110 transition-transform'>
                      <span className='text-cyan-500/50 text-xl font-bold'>
                        ?
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sub-Pilihan */}
              {formData.kategoriKebutuhan === 'Portofolio' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className='mt-6'
                >
                  <label className='block text-sm font-medium text-slate-300 mb-3'>
                    Pilih Struktur Menu Portofolio Anda{' '}
                    <span className='text-red-400'>*</span>
                  </label>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                    <label className='flex items-start gap-3 p-3 border border-white/10 rounded-xl bg-[#0B101C]/50 cursor-pointer hover:border-cyan-500/50 transition-colors group'>
                      <input
                        required
                        type='radio'
                        name='pilihanKebutuhan'
                        value='Paket Standar: Beranda, Tentang Saya, Galeri/Karya, Kontak'
                        checked={
                          formData.pilihanKebutuhan ===
                          'Paket Standar: Beranda, Tentang Saya, Galeri/Karya, Kontak'
                        }
                        onChange={handleChange}
                        className='mt-1 text-cyan-500 focus:ring-cyan-500 w-4 h-4 accent-cyan-500 bg-transparent border-white/20'
                      />
                      <div>
                        <span className='text-sm text-white font-semibold group-hover:text-cyan-400 transition-colors'>
                          Portofolio Standar{' '}
                          <span className='text-cyan-400 bg-cyan-400/10 px-1 py-0.5 rounded text-xs ml-1'>
                            (1,5 rb)
                          </span>
                        </span>
                        <p className='text-xs text-slate-400 mt-1 leading-relaxed'>
                          (Beranda, Tentang Saya, Galeri/Karya, Kontak)
                        </p>
                      </div>
                    </label>
                    <label className='flex items-start gap-3 p-3 border border-white/10 rounded-xl bg-[#0B101C]/50 cursor-pointer hover:border-cyan-500/50 transition-colors group'>
                      <input
                        required
                        type='radio'
                        name='pilihanKebutuhan'
                        value='Paket Lengkap: Beranda, Showreel, Layanan, Karya, Testimoni, Kontak'
                        checked={
                          formData.pilihanKebutuhan ===
                          'Paket Lengkap: Beranda, Showreel, Layanan, Karya, Testimoni, Kontak'
                        }
                        onChange={handleChange}
                        className='mt-1 text-cyan-500 focus:ring-cyan-500 w-4 h-4 accent-cyan-500 bg-transparent border-white/20'
                      />
                      <div>
                        <span className='text-sm text-white font-semibold group-hover:text-cyan-400 transition-colors'>
                          Portofolio Lengkap{' '}
                          <span className='text-cyan-400 bg-cyan-400/10 px-1 py-0.5 rounded text-xs ml-1'>
                            (2 Jt)
                          </span>
                        </span>
                        <p className='text-xs text-slate-400 mt-1 leading-relaxed'>
                          (Beranda, Layanan, Katalog Karya, Testimoni, Kontak)
                        </p>
                      </div>
                    </label>
                  </div>
                  {formData.pilihanKebutuhan && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className='mt-6'
                    >
                      <label className='block text-sm font-medium text-slate-300 mb-2'>
                        Deskripsi Fitur yang Diinginkan{' '}
                        <span className='text-red-400'>*</span>
                      </label>
                      <textarea
                        required
                        name='deskripsiFitur'
                        value={formData.deskripsiFitur}
                        onChange={handleChange}
                        rows={3}
                        placeholder='Tuliskan detail fitur spesifik yang Anda inginkan (misal: "Saya ingin galeri karya saya memiliki efek zoom", dsb.)'
                        className='text-xs w-full px-4 py-3 bg-[#0B101C]/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors resize-none shadow-inner'
                      />
                    </motion.div>
                  )}
                </motion.div>
              )}

              {formData.kategoriKebutuhan === 'Website Usaha' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className='mt-6'
                >
                  <label className='block text-sm font-medium text-slate-300 mb-3'>
                    Pilih Konsep Website Usaha{' '}
                    <span className='text-red-400'>*</span>
                  </label>
                  <div className='flex flex-col gap-3'>
                    <label className='flex items-start gap-3 p-3 border border-white/10 rounded-xl bg-[#0B101C]/50 cursor-pointer hover:border-cyan-500/50 transition-colors group'>
                      <input
                        required
                        type='radio'
                        name='pilihanKebutuhan'
                        value='Company Profile + Dashboard Admin'
                        checked={
                          formData.pilihanKebutuhan ===
                          'Company Profile + Dashboard Admin'
                        }
                        onChange={handleChange}
                        className='mt-1 text-cyan-500 focus:ring-cyan-500 w-4 h-4 accent-cyan-500 bg-transparent border-white/20'
                      />
                      <div>
                        <span className='text-sm text-white font-semibold group-hover:text-cyan-400 transition-colors'>
                          Company Profile Modern + Dashboard Admin{' '}
                          <span className='text-cyan-400 bg-cyan-400/10 px-1 py-0.5 rounded text-xs ml-1'>
                            (2,5 Jt)
                          </span>
                        </span>
                        <p className='text-xs text-slate-400 mt-1 leading-relaxed'>
                          Menampilkan informasi perusahaan ditambah akses
                          Dashboard Admin untuk mengelola data dasar website
                          Anda.
                        </p>
                      </div>
                    </label>
                    <label className='flex items-start gap-3 p-3 border border-white/10 rounded-xl bg-[#0B101C]/50 cursor-pointer hover:border-cyan-500/50 transition-colors group'>
                      <input
                        required
                        type='radio'
                        name='pilihanKebutuhan'
                        value='Katalog Layanan/Produk + Pantau Pesanan + Dashboard Admin'
                        checked={
                          formData.pilihanKebutuhan ===
                          'Katalog Layanan/Produk + Pantau Pesanan + Dashboard Admin'
                        }
                        onChange={handleChange}
                        className='mt-1 text-cyan-500 focus:ring-cyan-500 w-4 h-4 accent-cyan-500 bg-transparent border-white/20'
                      />
                      <div>
                        <span className='text-sm text-white font-semibold group-hover:text-cyan-400 transition-colors'>
                          Katalog Produk/Layanan + Kelola Pesanan + Dashboard
                          Admin{' '}
                          <span className='text-cyan-400 bg-cyan-400/10 px-1 py-0.5 rounded text-xs ml-1'>
                            (3 Jt)
                          </span>
                        </span>
                        <p className='text-xs text-slate-400 mt-1 leading-relaxed'>
                          Fokus pada penawaran produk/jasa, dilengkapi dashboard
                          khusus memantau pesanan/interaksi pelanggan.
                        </p>
                      </div>
                    </label>
                  </div>
                  {formData.pilihanKebutuhan && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className='mt-6'
                    >
                      <label className='block text-sm font-medium text-slate-300 mb-2'>
                        Deskripsi Fitur yang Diinginkan{' '}
                        <span className='text-red-400'>*</span>
                      </label>
                      <textarea
                        required
                        name='deskripsiFitur'
                        value={formData.deskripsiFitur}
                        onChange={handleChange}
                        rows={3}
                        placeholder='Tuliskan detail fitur spesifik yang Anda inginkan (misal: "Saya ingin ada fitur pesanan, dashboard admin, cek status pesanan", dsb.)'
                        className='text-xs w-full px-4 py-3 bg-[#0B101C]/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors resize-none shadow-inner'
                      />
                    </motion.div>
                  )}
                </motion.div>
              )}

              {formData.kategoriKebutuhan === 'Custom' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className='mt-6'
                >
                  <label className='block text-sm font-medium text-slate-300 mb-3'>
                    Tuliskan Fitur Spesifik yang Anda Butuhkan{' '}
                    <span className='text-cyan-400 bg-cyan-400/10 px-1 py-0.5 rounded text-xs ml-1'>
                      (Up to 5 Jt)
                    </span>{' '}
                    <span className='text-red-400'>*</span>
                  </label>
                  <textarea
                    required
                    name='pilihanKebutuhan'
                    value={formData.pilihanKebutuhan}
                    onChange={handleChange}
                    rows={4}
                    placeholder='Contoh: Saya ingin website yang memiliki fitur login pelanggan, sistem booking / penjadwalan, lalu terhubung dengan integrasi payment gateway Midtrans...'
                    className='text-xs w-full px-4 py-3 bg-[#0B101C]/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors resize-none shadow-inner'
                  />
                </motion.div>
              )}
            </CardContent>
          </Card>

          {/* 3. Domain & Referensi */}
          <Card className='mb-8 border border-white/5 bg-[#131826]/80 backdrop-blur-md shadow-sm shadow-white/5'>
            <CardHeader>
              <CardTitle className='text-xl text-white flex items-center gap-2 justify-center'>
                Domain & Desain
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div>
                <label className='block text-sm font-medium text-slate-300 mb-2'>
                  Sudah memiliki Domain? <span className='text-red-400'>*</span>
                </label>
                <select
                  name='sudahDomain'
                  value={formData.sudahDomain}
                  onChange={handleChange}
                  className='text-xs w-full px-4 py-3 bg-[#0B101C]/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors appearance-none'
                >
                  <option value='Belum'>Belum / Minta dicarikan</option>
                  <option value='Sudah'>Sudah punya (domain sendiri)</option>
                </select>
              </div>
              <div>
                <label className='block text-sm font-medium text-slate-300 mb-2'>
                  Tuliskan domain yang Anda inginkan (seperti .com / .id){' '}
                  <span className='text-red-400'>*</span>
                </label>
                <input
                  required
                  type='text'
                  name='namaDomain'
                  value={formData.namaDomain}
                  onChange={handleChange}
                  placeholder='Contoh: www.namausaha.com'
                  className='text-xs w-full px-4 py-3 bg-[#0B101C]/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors'
                />
              </div>
              <div className='pt-2'>
                <label className='block text-sm font-medium text-slate-300 mb-2'>
                  Referensi Design / Website (Minimal 2-3 untuk benchmark
                  desain) <span className='text-red-400'>*</span>
                </label>
                <textarea
                  required
                  name='referensiDesain'
                  value={formData.referensiDesain}
                  onChange={handleChange}
                  rows={2}
                  placeholder='Sertakan link referensi website / ide design yang kamu inginkan, bisa dicari dari Pinterest/Google'
                  className='text-xs w-full px-4 py-3 bg-[#0B101C]/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors resize-none'
                />
              </div>
            </CardContent>
          </Card>

          {/* 4. Social & Contact */}
          <Card className='mb-8 border border-white/5 bg-[#131826]/80 backdrop-blur-md shadow-sm shadow-white/5'>
            <CardHeader>
              <CardTitle className='text-xl text-white flex items-center gap-2 justify-center'>
                Kontak & Media Sosial
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div>
                <label className='text-sm font-medium text-slate-300 mb-2 flex items-center gap-1.5'>
                  Nomor WhatsApp <span className='text-red-400'>*</span>
                </label>
                <input
                  required
                  type='text'
                  name='nomorWa'
                  value={formData.nomorWa}
                  onChange={handleChange}
                  placeholder='Contoh: 081234567890'
                  className='text-xs w-full px-4 py-3 bg-[#0B101C]/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors'
                />
              </div>
              <div>
                <label className='text-sm font-medium text-slate-300 mb-2 flex items-center gap-1.5'>
                  Email <span className='text-red-400'>*</span>
                </label>
                <input
                  required
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  placeholder='Contoh: nama@usaha.com'
                  className='text-xs w-full px-4 py-3 bg-[#0B101C]/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors'
                />
              </div>
              <div>
                <label className='text-sm font-medium text-slate-300 mb-2 flex items-center gap-1.5'>
                  Link Instagram <span className='text-red-400'>*</span>
                </label>
                <input
                  required
                  type='text'
                  name='linkIg'
                  value={formData.linkIg}
                  onChange={handleChange}
                  placeholder='Link lengkap IG'
                  className='text-xs w-full px-4 py-3 bg-[#0B101C]/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors'
                />
              </div>
              <div>
                <label className='text-sm font-medium text-slate-300 mb-2 flex items-center gap-1.5'>
                  Alamat Fisik Lengkap <span className='text-red-400'>*</span>
                </label>
                <textarea
                  required
                  name='alamatFisik'
                  value={formData.alamatFisik}
                  onChange={handleChange}
                  rows={2}
                  placeholder='Jika ingin alamat ditampilkan di Peta/Google Maps embed di web'
                  className='text-xs w-full px-4 py-3 bg-[#0B101C]/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors resize-none'
                />
              </div>
            </CardContent>
          </Card>

          {/* 5. Assets */}
          <Card className='mb-8 border border-white/5 bg-[#131826]/80 backdrop-blur-md shadow-sm shadow-white/5'>
            <CardHeader>
              <CardTitle className='text-xl text-white flex items-center gap-2 justify-center'>
                Materi Visual Pendukung
              </CardTitle>
            </CardHeader>
            <CardContent>
              <label className='block text-xs md:text-sm font-medium text-slate-300 mb-2'>
                Tautan / URL Folder GDrive (Logo PNG, Foto Produk/Tim, dsb){' '}
                <span className='text-red-400'>*</span>
              </label>
              <input
                required
                type='url'
                name='linkMateriVisual'
                value={formData.linkMateriVisual}
                onChange={handleChange}
                placeholder='Contoh: https://drive.google.com/drive/folders/...'
                className='text-xs w-full px-4 py-3 bg-[#0B101C]/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors'
              />
              <p className='text-[10px] md:text-xs text-slate-500 mt-3'>
                * Catatan: Anda juga bisa menyusulkan / mengirimkan foto
                langsung via WhatsApp setelah formulir ini dikirimkan.
              </p>
            </CardContent>
          </Card>

          {successMsg && (
            <div className='p-4 mb-4 text-sm text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-center font-medium'>
              Pesanan berhasil dikirim! Silakan salin ID Pelacakan Anda pada
              popup yang muncul.
            </div>
          )}

          <Button
            type='submit'
            disabled={isSubmitting || successMsg}
            className={`w-full py-6 rounded-2xl font-bold flex items-center justify-center gap-2 text-xs md:text-md transition-all ${
              isSubmitting || successMsg
                ? 'bg-cyan-500/50 cursor-not-allowed'
                : 'bg-cyan-500 hover:bg-cyan-400 text-slate-900 shadow-[0_0_20px_rgba(6,182,212,0.4)] cursor-pointer hover:scale-[1.02]'
            }`}
          >
            {isSubmitting
              ? 'Mengirim Data...'
              : successMsg
                ? 'Terkirim!'
                : 'Submit Order'}{' '}
            <Send className='w-4 h-4' />
          </Button>
        </form>
      </motion.div>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        orderId={submittedOrderId}
      />
    </div>
  );
}

export default function PemesananForm() {
  return (
    <Suspense
      fallback={
        <div className='container mx-auto p-8 text-center text-white/50'>
          Memuat form...
        </div>
      }
    >
      <PemesananFormContent />
    </Suspense>
  );
}
