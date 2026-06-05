'use client';

import React, { useState, useEffect, FormEvent } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { 
  Search, Loader2, ArrowLeft, Check, Compass, Code2, Globe, 
  Copy, ClipboardCheck, MessageSquare, Phone, Calendar, 
  Package, LayoutGrid, HelpCircle, FileCheck, Ban, ArrowRight,
  RefreshCw
} from 'lucide-react';
import { format } from 'date-fns';
import { id as localeId } from 'date-fns/locale';
import { IOrder } from '@/types';

const getDpAmount = (paket: string) => {
  switch (paket) {
    case 'Portofolio Standar':
      return 'Rp 750.000 (50%)';
    case 'Portofolio Lengkap':
      return 'Rp 1.000.000 (50%)';
    case 'Company Profile':
      return 'Rp 1.250.000 (50%)';
    case 'Katalog Produk':
      return 'Rp 1.500.000 (50%)';
    case 'Portofolio':
      return 'Rp 1.000.000 (50%)';
    case 'Website Usaha':
      return 'Rp 1.500.000 (50%)';
    default:
      return 'Hubungi Admin untuk nominal DP';
  }
};

export default function LacakPesananContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [searchId, setSearchId] = useState('');
  const [order, setOrder] = useState<IOrder | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [copied, setCopied] = useState(false);
  const [copiedRekening, setCopiedRekening] = useState(false);

  // Payment proof uploads states
  const [paymentFileBase64, setPaymentFileBase64] = useState('');
  const [isUploadingPayment, setIsUploadingPayment] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const handlePaymentFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setUploadError('');
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setUploadError('Ukuran file maksimal adalah 5MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPaymentFileBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadPaymentSubmit = async () => {
    if (!order?._id || !paymentFileBase64) return;
    setIsUploadingPayment(true);
    setUploadError('');
    try {
      const res = await fetch('/api/orders/upload-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: order._id, buktiTransfer: paymentFileBase64 }),
      });
      const result = await res.json();
      if (res.ok && result.success) {
        fetchOrder(order._id);
        setPaymentFileBase64('');
      } else {
        setUploadError(result.error || 'Gagal mengunggah bukti pembayaran.');
      }
    } catch {
      setUploadError('Terjadi kesalahan jaringan.');
    } finally {
      setIsUploadingPayment(false);
    }
  };

  const queryId = searchParams.get('id') || '';

  // Trigger search if ID is in query params
  useEffect(() => {
    if (queryId) {
      setSearchId(queryId);
      fetchOrder(queryId);
    } else {
      setOrder(null);
      setErrorMsg('');
    }
  }, [queryId]);

  const fetchOrder = async (idToSearch: string) => {
    if (!idToSearch.trim()) return;
    setIsLoading(true);
    setErrorMsg('');
    setOrder(null);

    try {
      const res = await fetch(`/api/orders/track?id=${idToSearch.trim()}`);
      const result = await res.json();

      if (res.ok && result.success) {
        setOrder(result.data);
      } else {
        setErrorMsg(result.error || 'Pesanan tidak ditemukan. Periksa kembali ID Pelacakan Anda.');
      }
    } catch {
      setErrorMsg('Terjadi kesalahan koneksi sistem. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!searchId.trim()) return;
    
    // Update query params without full page reload
    const params = new URLSearchParams(window.location.search);
    params.set('id', searchId.trim());
    router.push(`/lacak-pesanan?${params.toString()}`);
  };

  const handleCopy = async () => {
    if (!order?._id) return;
    try {
      await navigator.clipboard.writeText(order._id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleCopyRekening = async () => {
    try {
      await navigator.clipboard.writeText('1380012792003');
      setCopiedRekening(true);
      setTimeout(() => setCopiedRekening(false), 2000);
    } catch (err) {
      console.error('Failed to copy account number: ', err);
    }
  };

  const getStepStatus = (stepIndex: number, currentStatus: string, currentStep: number = 1) => {
    if (currentStatus === 'Batal') return 'batal';
    if (currentStatus === 'Selesai') return 'completed';
    
    if (stepIndex < currentStep) return 'completed';
    if (stepIndex === currentStep) return 'active';
    return 'pending';
  };

  const steps = [
    {
      index: 1,
      title: 'Pesanan Diterima',
      desc: 'Pesanan Anda telah masuk ke sistem dan mengantre untuk diproses.',
      icon: FileCheck
    },
    {
      index: 2,
      title: 'Validasi & Konsep Desain',
      desc: 'Kami sedang mengkaji detail formulir, menyiapkan konsep layout, dan materi visual.',
      icon: Compass
    },
    {
      index: 3,
      title: 'Tahap Pengembangan',
      desc: 'Koding front-end, integrasi basis data, pengoptimalan performa, dan pengujian internal.',
      icon: Code2
    },
    ...(order?.currentStep && order.currentStep >= 4
      ? [
          {
            index: 4,
            title: 'Tahap Revisi',
            desc: 'Peninjauan hasil website, penyempurnaan fitur, dan penyesuaian berdasarkan masukan Anda.',
            icon: RefreshCw
          }
        ]
      : []),
    {
      index: 5,
      title: 'Selesai & Go Live',
      desc: 'Website Anda telah online, di-deploy ke server produksi, dan siap digunakan.',
      icon: Globe
    }
  ];

  return (
    <div className="min-h-screen bg-[#07090E] flex flex-col pt-24">
      <Navbar />

      <main className="flex-grow container mx-auto px-3 sm:px-4 py-12 max-w-4xl relative z-10">
        {/* Glow Effects */}
        <div className="absolute top-20 right-10 w-96 h-96 bg-cyan-500/5 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />

        {/* Back Link */}
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Kembali ke Beranda</span>
          </Link>
        </div>

        {/* Search Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-5xl font-black bg-gradient-to-br from-white to-slate-400 bg-clip-text text-transparent pb-2 mb-3">
            Lacak Progres Pesanan
          </h1>
          <p className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
            Pantau status pembuatan website Anda secara transparan dan real-time.
          </p>
        </div>

        {/* Search Bar Box */}
        <CardSearchBox 
          searchId={searchId} 
          setSearchId={setSearchId} 
          isLoading={isLoading} 
          handleSearchSubmit={handleSearchSubmit} 
        />

        {/* Loading Spinner */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="w-10 h-10 text-cyan-500 animate-spin mb-4" />
            <p className="text-slate-400 text-sm">Sedang mencari pesanan Anda...</p>
          </div>
        )}

        {/* Error Message */}
        {errorMsg && !isLoading && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 bg-red-500/10 border border-red-500/20 text-red-400 p-5 rounded-2xl flex items-start gap-3 shadow-md"
          >
            <HelpCircle className="w-5 h-5 mt-0.5 shrink-0" />
            <div>
              <h4 className="font-bold text-white mb-1">Pesanan Tidak Ditemukan</h4>
              <p className="text-sm text-slate-300 leading-relaxed">{errorMsg}</p>
            </div>
          </motion.div>
        )}

        {/* Tracking Results Area */}
        <AnimatePresence mode="wait">
          {order && !isLoading && (
            <motion.div
              key={order._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="mt-10 space-y-8"
            >
              {/* Status Header Block */}
              <div className="bg-[#131826]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-5 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-xl relative overflow-hidden">
                <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-cyan-500/5 blur-[40px] rounded-full pointer-events-none" />
                <div>
                  <span className="text-xs font-semibold text-slate-400 tracking-wider uppercase block mb-1">
                    Nama Usaha / Website
                  </span>
                  <h2 className="text-2xl font-extrabold text-white mb-2">{order.namaUsaha}</h2>
                  <div className="flex flex-wrap gap-2.5 items-center">
                    <span className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5">
                      <Package className="w-3.5 h-3.5" />
                      {order.paket}
                    </span>
                    {order.createdAt && (
                      <span className="text-xs text-slate-400 flex items-center gap-1.5 bg-white/2 border border-white/5 px-3 py-1 rounded-full">
                        <Calendar className="w-3.5 h-3.5" />
                        {format(new Date(order.createdAt), 'dd MMMM yyyy', { locale: localeId })}
                      </span>
                    )}
                  </div>
                </div>

                <div className="w-full md:w-auto flex flex-col gap-2.5 shrink-0">
                  <div className="bg-[#0B101C]/80 border border-white/10 rounded-2xl px-4 py-3 flex items-center justify-between gap-3 min-w-[240px]">
                    <div className="overflow-hidden">
                      <span className="text-[10px] text-slate-400 font-semibold block mb-0.5 uppercase tracking-wider">
                        ID Pelacakan
                      </span>
                      <span className="font-mono text-cyan-400 font-bold block truncate text-xs sm:text-sm">
                        {order._id}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="p-2 bg-white/5 hover:bg-white/10 hover:text-cyan-400 text-slate-400 rounded-lg transition-colors cursor-pointer"
                      title="Salin ID"
                    >
                      {copied ? (
                        <ClipboardCheck className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Banned / Cancelled Banner */}
              {order.status === 'Batal' && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-6 rounded-3xl flex items-start gap-4 shadow-lg">
                  <Ban className="w-6 h-6 mt-1 shrink-0 text-red-500" />
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">Pemesanan Dibatalkan</h3>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      Mohon maaf, pemesanan website Anda telah dibatalkan oleh admin. Silakan klik tombol hubungi admin di bawah ini untuk mengklarifikasi atau membuat pesanan ulang.
                    </p>
                  </div>
                </div>
              )}

              {/* Progress Stepper Timeline */}
              {order.status !== 'Batal' && (
                <div className="bg-[#131826]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-5 sm:p-8 shadow-xl">
                  <h3 className="text-lg font-bold text-white mb-8 flex items-center gap-2">
                    <LayoutGrid className="w-5 h-5 text-cyan-500" />
                    Progres Pengerjaan Website
                  </h3>

                  <div className="relative pl-6 md:pl-0 flex flex-col md:flex-row justify-between items-start gap-8 md:gap-4">
                    {/* Background Progress Bar (Desktop) */}
                    <div className="hidden md:block absolute top-[22px] left-[5%] right-[5%] h-0.5 bg-white/5 z-0" />
                    {/* Background Progress Bar (Mobile) */}
                    <div className="md:hidden absolute top-[22px] bottom-[22px] left-[48px] w-0.5 bg-white/5 z-0" />

                    {steps.map((step) => {
                      const stepStatus = getStepStatus(step.index, order.status, order.currentStep);
                      const StepIcon = step.icon;

                      return (
                        <div key={step.index} className="relative z-10 flex flex-row md:flex-col items-start md:items-center text-left md:text-center flex-1 gap-4 md:gap-0">
                          {/* Bullet Icon */}
                          <div className="mb-0 md:mb-4 shrink-0">
                            {stepStatus === 'completed' ? (
                              <motion.div 
                                initial={{ scale: 0.8 }} 
                                animate={{ scale: 1 }}
                                className="w-12 h-12 rounded-full bg-emerald-500/10 border-2 border-emerald-500 flex items-center justify-center text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                              >
                                <Check className="w-5 h-5" />
                              </motion.div>
                            ) : stepStatus === 'active' ? (
                              <div className="relative">
                                <span className="absolute inset-0 rounded-full bg-cyan-500/25 animate-ping" />
                                <div className="relative w-12 h-12 rounded-full bg-cyan-500/10 border-2 border-cyan-400 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                                  <StepIcon className="w-5 h-5 animate-pulse" />
                                </div>
                              </div>
                            ) : (
                              <div className="w-12 h-12 rounded-full bg-[#07090E] border-2 border-white/10 flex items-center justify-center text-slate-500">
                                <StepIcon className="w-5 h-5" />
                              </div>
                            )}
                          </div>

                          {/* Step Content */}
                          <div>
                            <h4 className={`font-bold text-sm md:text-base mb-1 ${
                              stepStatus === 'completed' ? 'text-emerald-400' :
                              stepStatus === 'active' ? 'text-cyan-400 font-extrabold' : 'text-slate-400'
                            }`}>
                              {step.title}
                            </h4>
                            <p className="text-slate-400 text-xs leading-relaxed max-w-[200px] mx-0 md:mx-auto">
                              {step.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Payment Proof / DP Card */}
              {order.status !== 'Batal' && (
                <div className="bg-[#131826]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-5 sm:p-8 shadow-xl relative overflow-hidden space-y-6">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <ClipboardCheck className="w-5 h-5 text-cyan-500" />
                    Status Pembayaran DP (Down Payment)
                  </h3>

                  {(!order.statusPembayaran || order.statusPembayaran === 'Belum Bayar') && (
                    <div className="space-y-6">
                      <div className="p-4 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-2xl text-xs sm:text-sm leading-relaxed">
                        <strong>Perhatian:</strong> Pengerjaan desain dan website baru akan dimulai setelah pembayaran DP (50%) telah dikonfirmasi oleh Admin. Silakan lakukan transfer ke rekening di bawah ini dan unggah bukti transfer Anda.
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#0B101C]/80 border border-white/5 p-4 rounded-2xl">
                        <div>
                          <span className="text-[10px] text-slate-500 font-semibold block uppercase tracking-wider mb-1">Transfer Bank</span>
                          <span className="text-white font-bold block text-sm sm:text-base">Bank Mandiri</span>
                          <span className="text-white flex items-center gap-1.5 text-xs mt-1">
                            No. Rekening: <strong className="text-cyan-400 font-mono select-all">1380012792003</strong>
                            <button
                              type="button"
                              onClick={handleCopyRekening}
                              className="p-1 hover:bg-white/10 rounded transition-colors text-slate-400 hover:text-white inline-flex items-center justify-center cursor-pointer"
                              title="Salin Nomor Rekening"
                            >
                              {copiedRekening ? (
                                <Check className="w-3 h-3 text-emerald-400" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                            </button>
                            {copiedRekening && (
                              <span className="text-[10px] text-emerald-400 font-semibold">Tersalin!</span>
                            )}
                          </span>
                          <span className="text-white block text-xs">A/N: <strong>Dhian Haryono</strong></span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-500 font-semibold block uppercase tracking-wider mb-1">Nominal Transfer (DP 50%)</span>
                          <span className="text-cyan-400 font-extrabold block text-lg sm:text-xl">{getDpAmount(order.paket)}</span>
                          <span className="text-slate-400 text-[10px] block mt-1">* Simpan bukti transfer Anda dalam format gambar (PNG/JPG).</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="block text-xs font-semibold text-slate-300">Unggah Bukti Transfer (Format JPG/PNG, Maks. 5MB)</label>
                        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handlePaymentFileChange}
                            disabled={isUploadingPayment}
                            className="flex-1 text-xs text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-cyan-500/10 file:text-cyan-400 hover:file:bg-cyan-500/20 file:cursor-pointer transition-colors bg-[#0B101C]/50 border border-white/10 rounded-xl p-2 outline-none"
                          />
                          {paymentFileBase64 && (
                            <Button
                              onClick={handleUploadPaymentSubmit}
                              disabled={isUploadingPayment}
                              className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold px-6 py-3 rounded-xl transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] flex items-center justify-center gap-2 cursor-pointer text-xs"
                            >
                              {isUploadingPayment ? 'Mengirim...' : 'Kirim Bukti'}
                            </Button>
                          )}
                        </div>
                        {uploadError && <p className="text-red-400 text-xs mt-1">{uploadError}</p>}
                      </div>
                    </div>
                  )}

                  {order.statusPembayaran === 'Menunggu Verifikasi' && (
                    <div className="space-y-4 text-center py-4">
                      <div className="inline-flex p-3 bg-amber-500/10 text-amber-400 rounded-full animate-pulse mb-2">
                        <RefreshCw className="w-8 h-8" />
                      </div>
                      <h4 className="text-white font-bold text-base">Menunggu Verifikasi Pembayaran</h4>
                      <p className="text-slate-400 text-xs max-w-md mx-auto leading-relaxed">
                        Bukti transfer Anda telah berhasil dikirim. Admin kami sedang memverifikasi pembayaran Anda. Status pengerjaan akan segera diperbarui setelah verifikasi selesai.
                      </p>
                      {order.buktiTransfer && (
                        <div className="mt-4 max-w-xs mx-auto border border-white/10 rounded-2xl overflow-hidden bg-[#0B101C]/50 p-2">
                          <span className="text-[10px] text-slate-500 block mb-2 uppercase font-semibold">Bukti Transfer Anda</span>
                          <img src={order.buktiTransfer} alt="Bukti Transfer" className="w-full h-auto max-h-48 object-contain rounded-xl" />
                        </div>
                      )}
                    </div>
                  )}

                  {order.statusPembayaran === 'DP Lunas' && (
                    <div className="flex items-center gap-4 p-5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-3xl">
                      <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-full shrink-0">
                        <Check className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-sm sm:text-base">DP Pembayaran Diterima (DP Lunas)</h4>
                        <p className="text-slate-400 text-xs mt-0.5 leading-relaxed">
                          Terima kasih! Pembayaran DP Anda telah kami verifikasi. Tahap pengembangan sedang dikerjakan sesuai antrean.
                        </p>
                      </div>
                    </div>
                  )}

                  {order.statusPembayaran === 'Lunas' && (
                    <div className="flex items-center gap-4 p-5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-3xl">
                      <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-full shrink-0">
                        <Check className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-sm sm:text-base">Pembayaran Lunas (Lengkap)</h4>
                        <p className="text-slate-400 text-xs mt-0.5 leading-relaxed">
                          Terima kasih banyak! Pembayaran untuk proyek website Anda telah lunas sepenuhnya.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Order Details Accordion/Card */}
              <div className="bg-[#131826]/60 backdrop-blur-xl border border-white/5 rounded-3xl p-5 sm:p-8 shadow-xl">
                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-cyan-500" />
                  Rincian Kebutuhan Website
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                  <div className="space-y-4">
                    <div>
                      <span className="text-xs text-slate-500 block mb-0.5">Nama Usaha / Brand</span>
                      <span className="font-semibold text-white">{order.namaUsaha}</span>
                    </div>
                    {order.slogan && (
                      <div>
                        <span className="text-xs text-slate-500 block mb-0.5">Slogan / Tagline</span>
                        <span className="text-slate-200">{order.slogan}</span>
                      </div>
                    )}
                    <div>
                      <span className="text-xs text-slate-500 block mb-0.5">Deskripsi Singkat Bisnis</span>
                      <p className="text-slate-300 text-xs leading-relaxed bg-[#0B101C]/50 border border-white/5 p-3 rounded-xl">
                        {order.deskripsiSingkat}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 block mb-0.5">Kategori & Pilihan Fitur</span>
                      <span className="font-medium text-white block">{order.kategoriKebutuhan}</span>
                      <span className="text-xs text-slate-400 block mt-1 leading-relaxed bg-[#0B101C]/50 border border-white/5 p-2 rounded-lg">
                        {order.pilihanKebutuhan}
                      </span>
                      {order.deskripsiFitur && (
                        <div className="mt-2">
                          <span className="text-[11px] text-slate-500 block mb-0.5 font-medium">Deskripsi Fitur yang Diinginkan</span>
                          <p className="text-slate-300 text-xs leading-relaxed bg-[#0B101C]/50 border border-white/5 p-3 rounded-xl whitespace-pre-wrap">
                            {order.deskripsiFitur}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <span className="text-xs text-slate-500 block mb-0.5">Domain Status</span>
                      <span className="text-white block font-medium">
                        {order.sudahDomain === 'Sudah' 
                          ? `Sudah punya (${order.namaDomain || '-'})` 
                          : `Belum punya (Minta dicarikan: ${order.namaDomain || '-'})`}
                      </span>
                    </div>
                    {order.referensiDesain && (
                      <div>
                        <span className="text-xs text-slate-500 block mb-0.5">Referensi Desain Web</span>
                        <p className="text-slate-300 text-xs leading-relaxed bg-[#0B101C]/50 border border-white/5 p-3 rounded-xl truncate-3-lines">
                          {order.referensiDesain}
                        </p>
                      </div>
                    )}
                    <div>
                      <span className="text-xs text-slate-500 block mb-0.5">Nomor WhatsApp Terdaftar</span>
                      <span className="text-white font-mono flex items-center gap-1.5 font-medium">
                        <Phone className="w-3.5 h-3.5 text-slate-500" />
                        {order.nomorWa}
                      </span>
                    </div>
                    {order.email && (
                      <div>
                        <span className="text-xs text-slate-500 block mb-0.5">Alamat Email</span>
                        <span className="text-white font-medium">
                          {order.email}
                        </span>
                      </div>
                    )}
                    {order.linkMateriVisual && (
                      <div>
                        <span className="text-xs text-slate-500 block mb-0.5">Materi Visual (Google Drive / Cloud)</span>
                        <a 
                          href={order.linkMateriVisual}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cyan-400 hover:text-cyan-300 font-medium inline-flex items-center gap-1.5 transition-colors border-b border-cyan-500/20 hover:border-cyan-300/30 pb-0.5"
                        >
                          Buka Tautan Aset
                          <ArrowRight className="w-3 h-3" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Help & Support CTA */}
              <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/5 border border-cyan-500/20 rounded-3xl p-5 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-md">
                <div>
                  <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-cyan-400" />
                    Punya pertanyaan terkait pesanan ini?
                  </h4>
                  <p className="text-slate-300 text-sm leading-relaxed max-w-xl">
                    Tim kami selalu siap membantu. Anda bisa menghubungi admin secara langsung via WhatsApp dengan menyertakan ID Pelacakan Anda.
                  </p>
                </div>

                <a 
                  href={`https://wa.me/6281320005405?text=Halo%20Admin%20Cetha%20Technologies%2C%20saya%20ingin%20bertanya%20mengenai%20status%20pemesanan%20website%20saya%20dengan%20ID%20${order._id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full md:w-auto text-center shrink-0 cursor-pointer"
                >
                  <Button className="w-full md:w-auto bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold px-6 py-5 rounded-xl transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] flex items-center justify-center gap-2 cursor-pointer">
                    <Phone className="w-4 h-4" />
                    Hubungi Admin
                  </Button>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

interface CardSearchBoxProps {
  searchId: string;
  setSearchId: (id: string) => void;
  isLoading: boolean;
  handleSearchSubmit: (e: FormEvent) => void;
}

function CardSearchBox({ searchId, setSearchId, isLoading, handleSearchSubmit }: CardSearchBoxProps) {
  return (
    <div className="bg-[#131826]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-5 sm:p-8 shadow-xl max-w-2xl mx-auto">
      <form onSubmit={handleSearchSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">
            ID Pelacakan Pesanan <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 sm:pl-4 flex items-center pointer-events-none text-slate-500">
              <Search className="w-5 h-5" />
            </div>
            <input
              required
              type="text"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              placeholder="Masukkan ID Pelacakan"
              className="w-full pl-10 sm:pl-12 pr-4 py-3.5 sm:py-4 bg-[#0B101C]/80 border border-white/10 rounded-2xl text-white outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all font-mono text-xs sm:text-sm tracking-wider"
              disabled={isLoading}
            />
          </div>
          <span className="text-[10px] text-slate-500 block mt-1.5 pl-1">
            Format: 24 karakter hex (contoh: 64b58caf9d2a6a12b4e5f03a)
          </span>
        </div>

        <Button
          type="submit"
          disabled={isLoading || !searchId.trim()}
          className={`w-full py-6 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${
            isLoading || !searchId.trim()
              ? 'bg-cyan-500/50 text-white/50 cursor-not-allowed'
              : 'bg-cyan-500 hover:bg-cyan-400 text-slate-900 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] cursor-pointer hover:scale-[1.01]'
          }`}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Mencari...
            </>
          ) : (
            <>
              Lacak Sekarang
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
