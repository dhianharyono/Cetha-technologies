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
      setFormData({ ...order });
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

    const renderValue = () => {
      if (!value) {
        return <span className='text-slate-600 italic'>Tidak ada data</span>;
      }

      if (name === 'nomorWa') {
        return (
          <a
            href={`https://wa.me/${value.replace(/\D/g, '')}`}
            target='_blank'
            rel='noopener noreferrer'
            className='text-cyan-400 hover:text-cyan-300 hover:underline inline-flex items-center gap-1 break-all'
          >
            {value}
            <ExternalLink className='w-3.5 h-3.5 shrink-0' />
          </a>
        );
      }

      if (name === 'linkIg') {
        const href = value.startsWith('http')
          ? value
          : `https://instagram.com/${value.replace('@', '')}`;
        return (
          <a
            href={href}
            target='_blank'
            rel='noopener noreferrer'
            className='text-pink-400 hover:text-pink-300 hover:underline inline-flex items-center gap-1 break-all'
          >
            {value}
            <ExternalLink className='w-3.5 h-3.5 shrink-0' />
          </a>
        );
      }

      // Automatically detect and format URLs for other text fields
      const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+)/g;
      const parts = value.split(urlRegex);

      if (parts.length === 1) {
        return <span className='whitespace-pre-line break-words'>{value}</span>;
      }

      return (
        <span className='whitespace-pre-line break-words'>
          {parts.map((part, idx) => {
            if (part.match(urlRegex)) {
              const href = part.startsWith('http') ? part : `https://${part}`;
              return (
                <a
                  key={idx}
                  href={href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-cyan-400 hover:text-cyan-300 hover:underline inline-flex items-center gap-0.5 break-all font-semibold'
                >
                  {part}
                  <ExternalLink className='w-3 h-3 inline-block shrink-0' />
                </a>
              );
            }
            return part;
          })}
        </span>
      );
    };

    return (
      <div className='space-y-1 w-full'>
        <span className='text-[10px] uppercase font-bold text-slate-500 flex items-center gap-1.5'>
          <Icon className='w-3 h-3' />
          {label}
        </span>
        <div className='text-sm text-white font-medium wrap-break-word'>
          {renderValue()}
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
                <p className='text-xs text-slate-400 mt-1'>
                  ID: {order._id} •{' '}
                  {format(
                    new Date(order.createdAt || new Date()),
                    'dd MMMM yyyy HH:mm',
                    {
                      locale: id,
                    },
                  )}
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
                    value={order.paket}
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
                          <CheckCircle className='w-3 h-3' />
                          Langkah Progres Pelacakan
                        </label>
                        <select
                          name='currentStep'
                          value={formData?.currentStep || 1}
                          onChange={(e) => {
                            const val = parseInt(e.target.value);
                            setFormData((prev) => prev ? { ...prev, currentStep: val } : null);
                          }}
                          className='w-full bg-[#0B101C] border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-cyan-500/50 transition-colors'
                        >
                          <option value={1}>1 - Pesanan Diterima</option>
                          <option value={2}>2 - Validasi & Rencana Desain</option>
                          <option value={3}>3 - Tahap Pengembangan</option>
                          <option value={4}>4 - Tahap Revisi</option>
                          <option value={5}>5 - Selesai & Go Live</option>
                        </select>
                      </div>
                    ) : (
                      <div className='space-y-1 w-full'>
                        <span className='text-[10px] uppercase font-bold text-slate-500 flex items-center gap-1.5'>
                          <CheckCircle className='w-3 h-3' />
                          Langkah Progres Pelacakan
                        </span>
                        <p className='text-sm text-white font-medium wrap-break-word'>
                          {order.currentStep === 1 ? '1 - Pesanan Diterima' :
                           order.currentStep === 2 ? '2 - Validasi & Konsep Desain' :
                           order.currentStep === 3 ? '3 - Tahap Pengembangan' :
                           order.currentStep === 4 ? '4 - Tahap Revisi' :
                           order.currentStep === 5 ? '5 - Selesai & Go Live' : '1 - Pesanan Diterima'}
                        </p>
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
