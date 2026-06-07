'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  getPortfolios,
  addPortfolio,
  updatePortfolio,
  deletePortfolio,
  togglePortfolioVisibility,
} from '@/app/actions/adminActions';
import { useToast } from '@/components/admin/ToastProvider';
import ConfirmModal from '@/components/admin/ConfirmModal';
import { Plus, Edit2, Trash2, Eye, EyeOff, RefreshCcw } from 'lucide-react';
import Image from 'next/image';
import { IPortfolio } from '@/types';

export default function PortfolioPage() {
  const [portfolios, setPortfolios] = useState<IPortfolio[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { showToast } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    fitur: '',
    paket: 'Pro Business',
    website: '',
  });

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const fetchPortfolios = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getPortfolios();
      setPortfolios(data);
    } catch {
      showToast('Gagal memuat portofolio', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchPortfolios();
  }, [fetchPortfolios]);

  const handleOpenAdd = () => {
    setIsEditMode(false);
    setFormData({
      title: '',
      description: '',
      image: '',
      fitur: '',
      paket: 'Pro Business',
      website: '',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (portfolio: IPortfolio) => {
    setIsEditMode(true);
    setCurrentId(portfolio._id || null);
    setFormData({
      title: portfolio.title,
      description: portfolio.description,
      image: portfolio.image,
      fitur: portfolio.fitur.join(', '),
      paket: portfolio.paket,
      website: portfolio.website || '',
    });
    setIsModalOpen(true);
  };

  const handleToggleHide = async (id: string, currentStatus: boolean) => {
    try {
      await togglePortfolioVisibility(id, !currentStatus);
      showToast(`Portofolio berhasil diperbarui`, 'success');
      fetchPortfolios();
    } catch {
      showToast('Gagal mengubah visibilitas', 'error');
    }
  };

  const handleDeleteParams = (id: string) => {
    setSelectedId(id);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedId) return;
    try {
      await deletePortfolio(selectedId);
      showToast('Portofolio dihapus', 'success');
      fetchPortfolios();
    } catch {
      showToast('Gagal menghapus portofolio', 'error');
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showToast('Ukuran gambar maksimal 5MB', 'error');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        fitur: formData.fitur
          .split(',')
          .map((f: string) => f.trim())
          .filter(Boolean),
      };

      if (isEditMode && currentId) {
        await updatePortfolio(currentId, payload);
        showToast('Portofolio berhasil diupdate', 'success');
      } else {
        await addPortfolio(payload);
        showToast('Portofolio baru ditambahkan', 'success');
      }
      setIsModalOpen(false);
      fetchPortfolios();
    } catch {
      showToast('Gagal menyimpan data', 'error');
    }
  };

  return (
    <div className='space-y-6 relative'>
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
        <div>
          <h1 className='text-3xl font-black text-white tracking-tight'>
            Kelola Portofolio
          </h1>
          <p className='text-slate-400 mt-1'>
            Daftar proyek klien untuk ditampilkan di landing page.
          </p>
        </div>
        <div className='flex gap-3'>
          <button
            onClick={fetchPortfolios}
            className='p-2.5 bg-[#131826] border border-white/10 rounded-xl text-slate-300 hover:text-cyan-400 hover:bg-white/5 transition-colors group'
          >
            <RefreshCcw
              className={`w-5 h-5 ${isLoading ? 'animate-spin text-cyan-400' : 'group-hover:rotate-180 transition-transform duration-500'}`}
            />
          </button>
          <button
            onClick={handleOpenAdd}
            className='flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-900 border border-emerald-400/20 rounded-xl text-sm font-bold transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)]'
          >
            <Plus className='w-4 h-4' />
            Tambah Baru
          </button>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {isLoading ? (
          [...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-[#131826]/40 border border-white/5 rounded-2xl overflow-hidden animate-pulse flex flex-col"
            >
              <div className="h-48 w-full bg-white/5" />
              <div className="p-5 flex flex-col grow space-y-3">
                <div className="h-6 w-20 bg-white/5 rounded-md" />
                <div className="h-6 w-3/4 bg-white/5 rounded" />
                <div className="space-y-2">
                  <div className="h-4 w-full bg-white/5 rounded" />
                  <div className="h-4 w-5/6 bg-white/5 rounded" />
                </div>
                <div className="flex gap-2 pt-4 border-t border-white/10 mt-auto">
                  <div className="flex-1 h-9 bg-white/5 rounded-lg" />
                  <div className="flex-1 h-9 bg-white/5 rounded-lg" />
                </div>
              </div>
            </div>
          ))
        ) : portfolios.length === 0 ? (
          <p className='text-slate-500 col-span-3'>Belum ada portofolio.</p>
        ) : (
          portfolios.map((item: IPortfolio) => (
            <div
              key={item._id}
              className={`bg-[#131826]/80 backdrop-blur-md border border-white/5 rounded-2xl overflow-hidden group transition-all flex flex-col ${item.isHidden ? 'opacity-50 grayscale hover:grayscale-0' : 'hover:border-white/20'}`}
            >
              <div className='relative h-48 w-full bg-[#0B101C]'>
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className='object-cover transition-transform duration-700 group-hover:scale-105'
                  />
                ) : (
                  <div className='w-full h-full flex items-center justify-center text-slate-500'>
                    No Image
                  </div>
                )}
                <div className='absolute top-3 right-3 flex gap-2'>
                  <button
                    onClick={() => handleToggleHide(item._id || '', item.isHidden)}
                    className='p-2 bg-black/50 backdrop-blur rounded-lg text-white hover:text-cyan-400 transition-colors'
                  >
                    {item.isHidden ? (
                      <EyeOff className='w-4 h-4 text-red-400' />
                    ) : (
                      <Eye className='w-4 h-4' />
                    )}
                  </button>
                </div>
              </div>
              <div className='p-5 flex flex-col grow'>
                <span className='text-xs w-fit font-bold text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 px-2 py-1 rounded-md mb-3 inline-block'>
                  {item.paket}
                </span>
                <h3 className='text-lg font-bold text-white mb-2 leading-tight line-clamp-1'>
                  {item.title}
                </h3>
                <p className='text-sm text-slate-400 mb-4 line-clamp-2'>
                  {item.description}
                </p>

                <div className='flex gap-2 mt-auto pt-4 border-t border-white/10'>
                  <button
                    onClick={() => handleOpenEdit(item)}
                    className='flex-1 flex items-center justify-center py-2 bg-white/5 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-400 rounded-lg text-sm transition-colors gap-2'
                  >
                    <Edit2 className='w-4 h-4' /> Edit
                  </button>
                  <button
                    onClick={() => handleDeleteParams(item._id || '')}
                    className='flex-1 flex items-center justify-center py-2 bg-white/5 hover:bg-red-500/20 text-slate-300 hover:text-red-400 rounded-lg text-sm transition-colors gap-2'
                  >
                    <Trash2 className='w-4 h-4' /> Hapus
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <ConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title='Hapus Portofolio'
        message='Yakin akan menghapus karya ini dari daftar proyek secara permanen?'
      />

      {isModalOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center px-4'>
          <div
            className='absolute inset-0 bg-black/80 backdrop-blur-sm'
            onClick={() => setIsModalOpen(false)}
          />
          <div className='relative w-full max-w-lg bg-[#131826] border border-white/10 rounded-2xl p-6 shadow-2xl z-10'>
            <h2 className='text-xl font-bold text-white mb-4'>
              {isEditMode ? 'Edit Portofolio' : 'Tambah Portofolio'}
            </h2>
            <form onSubmit={handleSubmit} className='space-y-4'>
              <div>
                <label className='block text-sm font-medium text-slate-300 mb-1'>
                  Judul Proyek
                </label>
                <input
                  required
                  type='text'
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className='w-full px-3 py-2 bg-[#0B101C]/50 border border-white/10 rounded-lg text-white outline-none focus:border-cyan-500 transition-colors text-sm'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-slate-300 mb-1'>
                  Deskripsi & Proses
                </label>
                <textarea
                  required
                  rows={7}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className='w-full px-3 py-2 bg-[#0B101C]/50 border border-white/10 rounded-lg text-white outline-none focus:border-cyan-500 transition-colors text-sm resize-none'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-slate-300 mb-1'>
                  Gambar Cover (Max 5MB)
                </label>
                <div className='flex flex-col gap-2'>
                  {formData.image && (
                    <div className='relative w-full h-32 rounded-lg overflow-hidden border border-white/10'>
                      <Image
                        src={formData.image}
                        alt='Preview'
                        fill
                        className='object-cover'
                      />
                    </div>
                  )}
                  <input
                    type='file'
                    required={!formData.image}
                    accept='image/*'
                    onChange={handleImageUpload}
                    className='w-full px-3 py-2 bg-[#0B101C]/50 border border-white/10 rounded-lg text-slate-300 outline-none focus:border-cyan-500 transition-colors text-sm file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-cyan-500/10 file:text-cyan-400 hover:file:bg-cyan-500/20'
                  />
                </div>
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-medium text-slate-300 mb-1'>
                    Paket Pemesanan
                  </label>
                  <input
                    required
                    type='text'
                    value={formData.paket}
                    onChange={(e) =>
                      setFormData({ ...formData, paket: e.target.value })
                    }
                    className='w-full px-3 py-2 bg-[#0B101C]/50 border border-white/10 rounded-lg text-white outline-none focus:border-cyan-500 transition-colors text-sm'
                    placeholder='Misal: Enterprise'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-slate-300 mb-1'>
                    Link Website (Opsional)
                  </label>
                  <input
                    type='url'
                    value={formData.website}
                    onChange={(e) =>
                      setFormData({ ...formData, website: e.target.value })
                    }
                    className='w-full px-3 py-2 bg-[#0B101C]/50 border border-white/10 rounded-lg text-white outline-none focus:border-cyan-500 transition-colors text-sm'
                    placeholder='https://...'
                  />
                </div>
              </div>
              <div>
                <label className='block text-sm font-medium text-slate-300 mb-1'>
                  Fitur Tersedia (Pisahkan dengan koma)
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.fitur}
                  onChange={(e) =>
                    setFormData({ ...formData, fitur: e.target.value })
                  }
                  className='w-full px-3 py-2 bg-[#0B101C]/50 border border-white/10 rounded-lg text-white outline-none focus:border-cyan-500 transition-colors text-sm resize-none'
                  placeholder='Fitur 1, Fitur 2, Fitur 3...'
                />
              </div>
              <div className='flex gap-3 justify-end mt-6 pt-4 border-t border-white/5'>
                <button
                  type='button'
                  onClick={() => setIsModalOpen(false)}
                  className='px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-sm font-medium transition-colors'
                >
                  Batal
                </button>
                <button
                  type='submit'
                  className='px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-slate-900 rounded-lg text-sm font-bold shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-colors'
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
