'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  User,
  Briefcase,
  Globe,
  MessageSquare,
  Phone,
  Instagram,
  MapPin,
  FileText,
  CheckCircle,
  Edit2,
  Save,
  ExternalLink,
  Mail,
} from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { IOrder } from '@/types';

const renderValue = (val: string | undefined, fieldName: keyof IOrder) => {
  if (!val) return <span className='text-slate-600 italic'>Tidak data</span>;
  
  if (fieldName === 'nomorWa') {
    return (
      <a
        href={`https://wa.me/${val.replace(/\D/g, '')}`}
        target='_blank'
        rel='noopener noreferrer'
        className='text-cyan-400 hover:text-cyan-300 underline inline-flex items-center gap-1 font-semibold cursor-pointer'
      >
        {val}
        <ExternalLink className='w-3 h-3 shrink-0' />
      </a>
    );
  }

  if (fieldName === 'linkIg') {
    const isUrl = val.startsWith('http') || val.includes('.com');
    const href = isUrl ? val : `https://instagram.com/${val.replace('@', '')}`;
    const displayName = isUrl ? 'Buka Instagram' : (val.startsWith('@') ? val : `@${val}`);
    return (
      <a
        href={href}
        target='_blank'
        rel='noopener noreferrer'
        className='text-pink-400 hover:text-pink-300 underline inline-flex items-center gap-1 font-semibold cursor-pointer'
      >
        {displayName}
        <ExternalLink className='w-3 h-3 shrink-0' />
      </a>
    );
  }

  const getShortenedLinkLabel = (url: string) => {
    try {
      const parsed = new URL(url.startsWith('http') ? url : `https://${url}`);
      let hostname = parsed.hostname.replace('www.', '');
      if (hostname.includes('drive.google.com')) return 'Google Drive';
      if (hostname.includes('docs.google.com')) return 'Google Docs';
      if (hostname.includes('dropbox.com')) return 'Dropbox';
      if (hostname.includes('pinterest.com') || hostname.includes('pin.it')) return 'Pinterest';
      if (hostname.includes('behance.net')) return 'Behance';
      if (hostname.includes('dribbble.com')) return 'Dribbble';
      if (hostname.includes('instagram.com')) return 'Instagram';
      if (hostname.includes('github.com')) return 'GitHub';
      if (hostname.includes('figma.com')) return 'Figma';
      return `Buka ${hostname}`;
    } catch {
      return 'Buka Tautan';
    }
  };

  // Regex to check and parse URLs within normal text (e.g. referensiDesain or linkMateriVisual)
  const urlRegex = /(https?:\/\/[^\s,]+)/g;
  const parts = val.split(urlRegex);
  
  if (parts.length > 1) {
    return parts.map((part, i) => {
      if (part.match(urlRegex)) {
        return (
          <a
            key={i}
            href={part}
            target='_blank'
            rel='noopener noreferrer'
            className='text-cyan-400 hover:text-cyan-300 underline inline-flex items-center gap-1 font-semibold cursor-pointer'
          >
            {getShortenedLinkLabel(part)}
            <ExternalLink className='w-3 h-3 shrink-0' />
          </a>
        );
      }
      return part;
    });
  }
  
  // Fallback for strings that are just domains without http/https protocol (e.g. www.google.com or example.com)
  if (/^(www\.|[a-zA-Z0-9-]+\.)[a-zA-Z0-9-]+\.[a-z]{2,}/.test(val)) {
    const href = val.startsWith('http') ? val : `https://${val}`;
    return (
      <a
        href={href}
        target='_blank'
        rel='noopener noreferrer'
        className='text-cyan-400 hover:text-cyan-300 underline inline-flex items-center gap-1 font-semibold cursor-pointer'
      >
        {getShortenedLinkLabel(val)}
        <ExternalLink className='w-3 h-3 shrink-0' />
      </a>
    );
  }

  return val;
};

const getPaketPrice = (paket: string) => {
  switch (paket) {
    case 'Portofolio Standar':
      return 'Rp 1.500.000 (1,5 Jt)';
    case 'Portofolio Lengkap':
      return 'Rp 2.000.000 (2 Jt)';
    case 'Portofolio':
      return 'Rp 2.000.000 (2 Jt)';
    case 'Company Profile':
      return 'Rp 2.500.000 (2,5 Jt)';
    case 'Katalog Produk':
      return 'Rp 3.000.000 (3 Jt)';
    case 'Website Usaha':
      return 'Rp 3.000.000 (3 Jt)';
    case 'Custom':
      return 'Sesuai Fitur (Up to 5 Jt)';
    case 'Enterprise':
      return 'Custom (Sesuai Kesepakatan)';
    default:
      return 'Sesuai Kesepakatan';
  }
};

interface OrderDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: IOrder | null;
  onUpdate: (id: string, data: Partial<IOrder>) => Promise<void>;
}

export default function OrderDetailModal({
  isOpen,
  onClose,
  order,
  onUpdate,
}: OrderDetailModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<IOrder> | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (order) {
      setFormData({
        ...order,
        statusPembayaran: order.statusPembayaran || 'Belum Bayar'
      });
    }
  }, [order]);

  if (!order) return null;

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      if (order?._id && formData) {
        await onUpdate(order._id, formData);
      }
      setIsEditing(false);
    } finally {
      setIsSaving(false);
    }
  };

  const handleApproveDp = async () => {
    if (!order?._id) return;
    setIsSaving(true);
    try {
      await onUpdate(order._id, {
        statusPembayaran: 'DP Lunas',
        currentStep: 2
      });
      setFormData((prev) => prev ? { ...prev, statusPembayaran: 'DP Lunas', currentStep: 2 } : null);
    } catch (err) {
      console.error("Failed to approve DP", err);
    } finally {
      setIsSaving(false);
    }
  };

  const DetailItem = ({
    icon: Icon,
    label,
    value,
    name,
    type = 'text',
    options = [],
  }: {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    value: string | undefined;
    name: keyof IOrder;
    type?: string;
    options?: string[];
  }) => {
    if (isEditing) {
      return (
        <div className='space-y-1.5 w-full'>
          <label className='text-[10px] uppercase font-bold text-slate-500 flex items-center gap-1.5'>
            <Icon className='w-3 h-3' />
            {label}
          </label>
          {type === 'select' ? (
            <select
              name={name}
              value={(formData?.[name] as string) || ''}
              onChange={handleInputChange}
              className='w-full bg-[#0B101C] border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-cyan-500/50 transition-colors'
            >
              {options.map((opt: string) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          ) : type === 'textarea' ? (
            <textarea
              name={name}
              value={(formData?.[name] as string) || ''}
              onChange={handleInputChange}
              rows={3}
              className='w-full bg-[#0B101C] border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-cyan-500/50 transition-colors resize-none'
            />
          ) : (
            <input
              type='text'
              name={name}
              value={(formData?.[name] as string) || ''}
              onChange={handleInputChange}
              className='w-full bg-[#0B101C] border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-cyan-500/50 transition-colors'
            />
          )}
        </div>
      );
    }

    return (
      <div className='space-y-1 w-full'>
        <span className='text-[10px] uppercase font-bold text-slate-500 flex items-center gap-1.5'>
          <Icon className='w-3 h-3' />
          {label}
        </span>
        <div className='text-sm text-white font-medium wrap-break-word whitespace-pre-wrap'>
          {renderValue(value, name)}
        </div>
      </div>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='absolute inset-0 bg-[#07090E]/90 backdrop-blur-md'
            onClick={!isSaving ? onClose : undefined}
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className='relative w-full max-w-2xl bg-[#131826] border border-white/10 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col'
          >
            {/* Header */}
            <div className='p-6 border-b border-white/5 flex items-center justify-between bg-[#0B101C]/50'>
              <div>
                <h2 className='text-xl font-black text-white flex items-center gap-3'>
                  {isEditing ? 'Edit Pesanan' : 'Detail Pesanan'}
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      order.status === 'Baru'
                        ? 'bg-amber-500/20 text-amber-400'
                        : order.status === 'Diproses'
                          ? 'bg-blue-500/20 text-blue-400'
                          : order.status === 'Selesai'
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : 'bg-red-500/20 text-red-500'
                    }`}
                  >
                    {order.status}
                  </span>
                </h2>
                <p className='text-xs text-slate-400 mt-1 flex flex-wrap items-center gap-1.5'>
                  <span>ID: {order._id}</span>
                  <span>•</span>
                  <a
                    href={`/lacak-pesanan?id=${order._id}`}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-cyan-400 hover:text-cyan-300 underline inline-flex items-center gap-0.5'
                  >
                    Lacak Pesanan
                    <ExternalLink className='w-3 h-3' />
                  </a>
                  <span>•</span>
                  <span>
                    {format(
                      new Date(order.createdAt || new Date()),
                      'dd MMMM yyyy HH:mm',
                      {
                        locale: id,
                      },
                    )}
                  </span>
                </p>
              </div>
              <button
                onClick={onClose}
                disabled={isSaving}
                className='p-2 hover:bg-white/5 rounded-full text-slate-400 hover:text-white transition-colors'
              >
                <X className='w-5 h-5' />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className='flex-1 overflow-y-auto p-6 scrollbar-hide'>
              <form
                id='order-form'
                onSubmit={handleSubmit}
                className='space-y-8'
              >
                {/* Section: Basic Information */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6'>
                  <DetailItem
                    icon={User}
                    label='Nama Usaha / Klien'
                    value={order.namaUsaha}
                    name='namaUsaha'
                  />
                  <DetailItem
                    icon={Briefcase}
                    label='Paket Dipilih'
                    value={order.paket ? `${order.paket} - ${getPaketPrice(order.paket)}` : ''}
                    name='paket'
                  />
                  <DetailItem
                    icon={MessageSquare}
                    label='Slogan Usaha'
                    value={order.slogan}
                    name='slogan'
                  />
                  <DetailItem
                    icon={Globe}
                    label='Kategori Kebutuhan'
                    value={order.kategoriKebutuhan}
                    name='kategoriKebutuhan'
                    type='select'
                    options={['Baru', 'Redesign', 'Lainnya']}
                  />
                  <div className='md:col-span-2'>
                    <DetailItem
                      icon={FileText}
                      label='Deskripsi Singkat'
                      value={order.deskripsiSingkat}
                      name='deskripsiSingkat'
                      type='textarea'
                    />
                  </div>
                </div>

                {/* Section: Status & Pembayaran */}
                <div className='pt-6 border-t border-white/5'>
                  <h3 className='text-xs font-black text-cyan-400 uppercase tracking-[0.2em] mb-4'>
                    Status & Pembayaran
                  </h3>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6 items-start'>
                    {/* Left: Status */}
                    <div className='space-y-4'>
                      <div className='space-y-1.5'>
                        <span className='text-[10px] uppercase font-bold text-slate-500 flex items-center gap-1.5'>
                          <CheckCircle className='w-3.5 h-3.5 text-cyan-400' />
                          Status Pembayaran DP
                        </span>
                        {isEditing ? (
                          <select
                            name='statusPembayaran'
                            value={formData?.statusPembayaran || 'Belum Bayar'}
                            onChange={handleInputChange}
                            className='w-full bg-[#0B101C] border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-cyan-500/50 transition-colors cursor-pointer'
                          >
                            <option value='Belum Bayar'>Belum Bayar</option>
                            <option value='Menunggu Verifikasi'>Menunggu Verifikasi</option>
                            <option value='DP Lunas'>DP Lunas</option>
                            <option value='Lunas'>Lunas</option>
                          </select>
                        ) : (
                          <div>
                            {(() => {
                              const status = order.statusPembayaran || 'Belum Bayar';
                              if (status === 'Belum Bayar') {
                                return (
                                  <div className='flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl'>
                                    <div className='w-2 h-2 rounded-full bg-red-500 animate-pulse' />
                                    <div className='text-sm font-semibold'>Belum Bayar</div>
                                  </div>
                                );
                              }
                              if (status === 'Menunggu Verifikasi') {
                                return (
                                  <div className='flex flex-col gap-3 p-4 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-xl'>
                                    <div className='flex items-center gap-3'>
                                      <div className='w-2 h-2 rounded-full bg-amber-500 animate-pulse' />
                                      <div className='text-sm font-semibold'>Menunggu Verifikasi</div>
                                    </div>
                                    <button
                                      type='button'
                                      onClick={handleApproveDp}
                                      disabled={isSaving}
                                      className='w-full px-4 py-2 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-slate-950 rounded-lg text-xs font-bold transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-1.5'
                                    >
                                      {isSaving && <div className='w-3 h-3 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin' />}
                                      Konfirmasi DP Lunas
                                    </button>
                                  </div>
                                );
                              }
                              if (status === 'DP Lunas') {
                                return (
                                  <div className='flex items-center gap-3 p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl'>
                                    <div className='w-2 h-2 rounded-full bg-emerald-500' />
                                    <div className='text-sm font-semibold'>DP Lunas</div>
                                  </div>
                                );
                              }
                              return (
                                <div className='flex items-center gap-3 p-4 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-xl'>
                                  <div className='w-2 h-2 rounded-full bg-cyan-500' />
                                  <div className='text-sm font-semibold'>Lunas</div>
                                </div>
                              );
                            })()}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right: Bukti Transfer */}
                    <div className='space-y-2'>
                      <span className='text-[10px] uppercase font-bold text-slate-500 flex items-center gap-1.5'>
                        <FileText className='w-3.5 h-3.5 text-cyan-400' />
                        Bukti Transfer DP
                      </span>
                      {order.buktiTransfer ? (
                        <div className='flex items-start gap-4 p-3 bg-[#0B101C]/50 border border-white/10 rounded-xl'>
                          <a
                            href={order.buktiTransfer}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='shrink-0 block w-20 h-20 relative rounded-lg overflow-hidden border border-white/10 hover:border-cyan-500/50 transition-colors'
                          >
                            <img src={order.buktiTransfer} alt='Bukti Transfer' className='w-full h-full object-cover' />
                          </a>
                          <div className='space-y-1.5 flex-grow'>
                            <p className='text-xs text-white font-medium'>Bukti Pembayaran Tersedia</p>
                            <p className='text-[11px] text-slate-400 leading-relaxed'>
                              Klien telah mengunggah bukti pembayaran. Klik gambar thumbnail untuk melihat ukuran penuh.
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className='flex items-center gap-3 p-4 bg-white/5 border border-white/10 text-slate-400 rounded-xl italic text-xs'>
                          Belum ada bukti transfer yang diunggah
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Section: Technical Details */}
                <div className='pt-6 border-t border-white/5'>
                  <h3 className='text-xs font-black text-cyan-400 uppercase tracking-[0.2em] mb-6'>
                    Detail Teknis
                  </h3>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6'>
                    <DetailItem
                      icon={CheckCircle}
                      label='Pilihan Kebutuhan'
                      value={order.pilihanKebutuhan}
                      name='pilihanKebutuhan'
                    />
                    <div className='md:col-span-2'>
                      <DetailItem
                        icon={FileText}
                        label='Deskripsi Fitur yang Diinginkan'
                        value={order.deskripsiFitur}
                        name='deskripsiFitur'
                        type='textarea'
                      />
                    </div>
                    <DetailItem
                      icon={Globe}
                      label='Sudah Punya Domain?'
                      value={order.sudahDomain}
                      name='sudahDomain'
                      type='select'
                      options={['Ya, sudah ada', 'Belum ada']}
                    />
                    <DetailItem
                      icon={Globe}
                      label='Nama Domain'
                      value={order.namaDomain}
                      name='namaDomain'
                    />
                    <DetailItem
                      icon={FileText}
                      label='Referensi Desain'
                      value={order.referensiDesain}
                      name='referensiDesain'
                    />
                    {isEditing ? (
                      <div className='space-y-1.5 w-full'>
                        <label className='text-[10px] uppercase font-bold text-slate-500 flex items-center gap-1.5'>
                          <CheckCircle className='w-3.5 h-3.5 text-cyan-400' />
                          Langkah Progres Pelacakan
                        </label>
                        <select
                          name='currentStep'
                          value={formData?.currentStep || 1}
                          onChange={(e) => {
                            const val = parseInt(e.target.value);
                            setFormData((prev) => prev ? { ...prev, currentStep: val } : null);
                          }}
                          className='w-full bg-[#0B101C] border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-cyan-500/50 transition-colors cursor-pointer'
                        >
                          <option value={1}>Pesanan Diterima</option>
                          <option value={2}>Validasi & Konsep Desain</option>
                          <option value={3}>Tahap Pengembangan</option>
                          <option value={4}>Tahap Revisi</option>
                          <option value={5}>Selesai & Go Live</option>
                        </select>
                      </div>
                    ) : (
                      <div className='space-y-1.5 w-full'>
                        <span className='text-[10px] uppercase font-bold text-slate-500 flex items-center gap-1.5'>
                          <CheckCircle className='w-3.5 h-3.5 text-cyan-400' />
                          Langkah Progres Pelacakan
                        </span>
                        <div>
                          <span className='inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 px-3.5 py-1.5 rounded-full text-xs font-bold shadow-[0_2px_10px_rgba(6,182,212,0.15)]'>
                            <span className='w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse' />
                            {order.currentStep === 1 ? 'Pesanan Diterima' :
                             order.currentStep === 2 ? 'Validasi & Konsep Desain' :
                             order.currentStep === 3 ? 'Tahap Pengembangan' :
                             order.currentStep === 4 ? 'Tahap Revisi' :
                             order.currentStep === 5 ? 'Selesai & Go Live' : '1 - Pesanan Diterima'}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Section: Contact & Assets */}
                <div className='pt-6 border-t border-white/5'>
                  <h3 className='text-xs font-black text-cyan-400 uppercase tracking-[0.2em] mb-6'>
                    Kontak & Materi
                  </h3>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6'>
                    <DetailItem
                      icon={Phone}
                      label='Nomor WhatsApp'
                      value={order.nomorWa}
                      name='nomorWa'
                    />
                    <DetailItem
                      icon={Instagram}
                      label='Link Instagram'
                      value={order.linkIg}
                      name='linkIg'
                    />
                    <DetailItem
                      icon={Mail}
                      label='Alamat Email'
                      value={order.email}
                      name='email'
                    />
                    <div className='md:col-span-2'>
                      <DetailItem
                        icon={MapPin}
                        label='Alamat Fisik'
                        value={order.alamatFisik}
                        name='alamatFisik'
                        type='textarea'
                      />
                    </div>
                    <div className='md:col-span-2'>
                      <DetailItem
                        icon={FileText}
                        label='Link Materi Visual'
                        value={order.linkMateriVisual}
                        name='linkMateriVisual'
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>

            {/* Footer Actions */}
            <div className='p-6 border-t border-white/5 bg-[#0B101C]/50 flex justify-between items-center'>
              <div className='text-xs text-slate-500 italic'>
                {isEditing
                  ? '* Pastikan semua data diisi dengan benar.'
                  : 'Informasi ini bersifat rahasia.'}
              </div>
              <div className='flex gap-3'>
                {isEditing ? (
                  <>
                    <button
                      type='button'
                      onClick={() => setIsEditing(false)}
                      disabled={isSaving}
                      className='px-5 py-2 rounded-xl text-sm font-bold text-slate-400 hover:text-white transition-colors'
                    >
                      Batal
                    </button>
                    <button
                      form='order-form'
                      type='submit'
                      disabled={isSaving}
                      className='px-6 py-2 bg-cyan-500 hover:bg-cyan-600 disabled:opacity-50 text-white rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(6,182,212,0.2)]'
                    >
                      {isSaving ? (
                        <div className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin' />
                      ) : (
                        <Save className='w-4 h-4' />
                      )}
                      Simpan Perubahan
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className='px-6 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-sm font-bold flex items-center gap-2 transition-all border border-white/10'
                  >
                    <Edit2 className='w-4 h-4' />
                    Edit Pesanan
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
