'use client';

import React, { useState, useEffect } from 'react';
import { getPackages, addPackage, updatePackage, deletePackage, togglePackageVisibility } from '@/app/actions/adminActions';
import { useToast } from '@/components/admin/ToastProvider';
import ConfirmModal from '@/components/admin/ConfirmModal';
import { Plus, Edit2, Trash2, Eye, EyeOff, RefreshCcw, Star } from 'lucide-react';
import { IPackage } from '@/types';

export default function PackagesPage() {
    const [packages, setPackages] = useState<IPackage[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { showToast } = useToast();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentId, setCurrentId] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        originalPrice: '',
        description: '',
        features: '',
        cta: 'Pesan Sekarang',
        popular: false,
    });

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const fetchPackages = async () => {
        setIsLoading(true);
        try {
            const data = await getPackages();
            setPackages(data);
        } catch {
            showToast('Gagal memuat paket layanan', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPackages();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleOpenAdd = () => {
        setIsEditMode(false);
        setFormData({ name: '', price: '', originalPrice: '', description: '', features: '', cta: 'Pesan Sekarang', popular: false });
        setIsModalOpen(true);
    };

    const handleOpenEdit = (pkg: IPackage) => {
        setIsEditMode(true);
        setCurrentId(pkg._id || null);
        setFormData({
            name: pkg.name,
            price: pkg.price,
            originalPrice: pkg.originalPrice || '',
            description: pkg.description,
            features: pkg.features.join('\n'), // multi-line
            cta: pkg.cta,
            popular: pkg.popular,
        });
        setIsModalOpen(true);
    };

    const handleToggleHide = async (id: string, currentStatus: boolean) => {
        try {
            await togglePackageVisibility(id, !currentStatus);
            showToast(`Paket berhasil diperbarui`, 'success');
            fetchPackages();
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
            await deletePackage(selectedId);
            showToast('Paket berhasil dihapus', 'success');
            fetchPackages();
        } catch {
            showToast('Gagal menghapus paket', 'error');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            const payload = {
                ...formData,
                features: formData.features.split('\n').map(f => f.trim()).filter(Boolean),
            };

            if (isEditMode && currentId) {
                await updatePackage(currentId, payload);
                showToast('Paket Layanan diupdate', 'success');
            } else {
                await addPackage(payload);
                showToast('Paket Layanan ditambahkan', 'success');
            }
            setIsModalOpen(false);
            fetchPackages();
        } catch {
            showToast('Gagal menyimpan paket', 'error');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="space-y-6 relative">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-white tracking-tight">Paket & Harga</h1>
                    <p className="text-slate-400 mt-1">Kelola data program layanan yang ditawarkan ke Pelanggan.</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={fetchPackages}
                        className="p-2.5 bg-[#131826] border border-white/10 rounded-xl text-slate-300 hover:text-cyan-400 hover:bg-white/5 transition-colors group"
                    >
                        <RefreshCcw className={`w-5 h-5 ${isLoading ? 'animate-spin text-cyan-400' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
                    </button>
                    <button
                        onClick={handleOpenAdd}
                        className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-900 border border-emerald-400/20 rounded-xl text-sm font-bold transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                    >
                        <Plus className="w-4 h-4" />
                        Tambah Paket
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading ? (
                    [...Array(3)].map((_, i) => (
                        <div key={i} className="bg-[#131826]/40 border border-white/5 rounded-2xl p-6 animate-pulse flex flex-col space-y-4">
                            <div className="space-y-2">
                                <div className="h-6 w-1/3 bg-white/5 rounded" />
                                <div className="h-4 w-full bg-white/5 rounded" />
                                <div className="h-4 w-5/6 bg-white/5 rounded" />
                            </div>
                            <div className="h-8 w-24 bg-white/5 rounded-md" />
                            <div className="space-y-2 py-4 border-t border-white/5 flex-1">
                                <div className="h-4 w-16 bg-white/5 rounded" />
                                <div className="h-4 w-full bg-white/5 rounded" />
                                <div className="h-4 w-4/5 bg-white/5 rounded" />
                                <div className="h-4 w-5/6 bg-white/5 rounded" />
                            </div>
                            <div className="flex gap-2 pt-4 border-t border-white/10 mt-auto">
                                <div className="flex-1 h-10 bg-white/5 rounded-lg" />
                                <div className="flex-1 h-10 bg-white/5 rounded-lg" />
                            </div>
                        </div>
                    ))
                ) : packages.length === 0 ? (
                    <p className="text-slate-500 col-span-3">Belum ada paket.</p>
                ) : (
                    packages.map((pkg) => (
                        <div key={pkg._id} className={`bg-[#131826]/80 backdrop-blur-md border rounded-2xl p-6 relative group transition-all ${pkg.isHidden ? 'opacity-50 grayscale hover:grayscale-0 border-white/5' : pkg.popular ? 'border-cyan-500/50 shadow-[0_0_30px_rgba(6,182,212,0.1)]' : 'border-white/5 hover:border-white/20'}`}>

                            {pkg.popular && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-linear-to-r from-cyan-500 to-blue-500 rounded-full text-[10px] font-black tracking-widest text-white flex items-center gap-1 shadow-lg shadow-cyan-500/30">
                                    <Star className="w-3 h-3 fill-white" /> POPULAR
                                </div>
                            )}

                            <div className="absolute top-4 right-4 flex gap-2">
                                <button
                                    onClick={() => handleToggleHide(pkg._id || '', pkg.isHidden)}
                                    className="p-1.5 bg-black/50 backdrop-blur rounded-md border border-white/10 text-white hover:text-cyan-400 transition-colors"
                                >
                                    {pkg.isHidden ? <EyeOff className="w-4 h-4 text-red-400" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>

                            <div className="mb-4">
                                <h3 className="text-xl font-bold text-white mb-1">{pkg.name}</h3>
                                <p className="text-sm text-slate-400 line-clamp-2">{pkg.description}</p>
                            </div>

                            <div className="mb-6">
                                <div className="flex items-baseline gap-2">
                                    <span className="text-2xl font-black text-white">{pkg.price}</span>
                                    {pkg.originalPrice && <span className="text-sm font-semibold text-slate-500 line-through decoration-red-500/50">{pkg.originalPrice}</span>}
                                </div>
                            </div>

                            <div className="space-y-3 mb-6 flex-1 text-sm text-slate-300">
                                <div className="font-semibold text-white">Fitur:</div>
                                <ul className="list-disc pl-5 space-y-1">
                                    {pkg.features.slice(0, 4).map((f: string, i: number) => (
                                        <li key={i} className="line-clamp-1">{f}</li>
                                    ))}
                                    {pkg.features.length > 4 && <li>...</li>}
                                </ul>
                            </div>

                            <div className="flex gap-2 pt-4 border-t border-white/10">
                                <button onClick={() => handleOpenEdit(pkg)} className="flex-1 flex items-center justify-center py-2.5 bg-white/5 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-400 rounded-lg text-sm font-semibold transition-colors gap-2">
                                    <Edit2 className="w-4 h-4" /> Edit
                                </button>
                                <button onClick={() => handleDeleteParams(pkg._id || '')} className="flex-1 flex items-center justify-center py-2.5 bg-white/5 hover:bg-red-500/20 text-slate-300 hover:text-red-400 rounded-lg text-sm font-semibold transition-colors gap-2">
                                    <Trash2 className="w-4 h-4" /> Hapus
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <ConfirmModal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                title="Hapus Paket"
                message="Menghapus paket tidak akan memengaruhi riwayat order pelanggan terkait. Tetap lanjutkan penghapusan?"
            />

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4 overflow-y-auto pt-10 pb-10">
                    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
                    <div className="relative w-full max-w-lg bg-[#131826] border border-white/10 rounded-2xl p-6 shadow-2xl z-10 my-auto">
                        <h2 className="text-xl font-bold text-white mb-6">
                            {isEditMode ? 'Edit Paket Layanan' : 'Tambah Paket Baru'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Nama Paket</label>
                                    <input required type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full px-3 py-2.5 bg-[#0B101C]/80 border border-white/5 focus:border-cyan-500/50 rounded-xl text-white outline-none transition-colors text-sm" placeholder="Misal: Starter" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Harga Tampil</label>
                                    <input required type="text" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} className="w-full px-3 py-2.5 bg-[#0B101C]/80 border border-white/5 focus:border-cyan-500/50 rounded-xl text-white outline-none transition-colors text-sm" placeholder="Misal: Rp 1,5 Jt" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Harga Coret (Opsional)</label>
                                <input type="text" value={formData.originalPrice} onChange={e => setFormData({ ...formData, originalPrice: e.target.value })} className="w-full px-3 py-2.5 bg-[#0B101C]/80 border border-white/5 focus:border-cyan-500/50 rounded-xl text-white outline-none transition-colors text-sm" placeholder="Misal: Rp 3.000.000" />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Ringkasan Deskripsi</label>
                                <textarea required rows={2} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full px-3 py-2.5 bg-[#0B101C]/80 border border-white/5 focus:border-cyan-500/50 rounded-xl text-white outline-none transition-colors text-sm resize-none leading-relaxed" placeholder="Penjelasan cocok untuk siapa..." />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Daftar Fitur (Enter per baris)</label>
                                <textarea required rows={4} value={formData.features} onChange={e => setFormData({ ...formData, features: e.target.value })} className="w-full px-3 py-2.5 bg-[#0B101C]/80 border border-white/5 focus:border-cyan-500/50 rounded-xl text-white outline-none transition-colors text-sm resize-none leading-relaxed" placeholder="Portofolio 1 Halaman&#10;Revisi 2x..." />
                            </div>

                            <div className="flex gap-4 items-center">
                                <div className="flex-1">
                                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Teks Button</label>
                                    <input required type="text" value={formData.cta} onChange={e => setFormData({ ...formData, cta: e.target.value })} className="w-full px-3 py-2.5 bg-[#0B101C]/80 border border-white/5 focus:border-cyan-500/50 rounded-xl text-white outline-none transition-colors text-sm" placeholder="Pesan Sekarang" />
                                </div>
                                <label className="flex items-center gap-2 cursor-pointer pt-6">
                                    <input type="checkbox" checked={formData.popular} onChange={e => setFormData({ ...formData, popular: e.target.checked })} className="w-4 h-4 accent-cyan-500 rounded" />
                                    <span className="text-sm font-semibold text-slate-300">Tandai Paling Populer (Badge)</span>
                                </label>
                            </div>

                            <div className="flex gap-3 justify-end mt-8 pt-6 border-t border-white/5">
                                <button type="button" onClick={() => setIsModalOpen(false)} disabled={isSaving} className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl text-sm font-semibold transition-colors disabled:opacity-50">Batal</button>
                                <button type="submit" disabled={isSaving} className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-900 rounded-xl text-sm font-bold shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-colors flex items-center gap-2">
                                    {isSaving && <div className="w-4 h-4 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin" />}
                                    {isSaving ? 'Menyimpan...' : 'Kirim & Publikasikan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
