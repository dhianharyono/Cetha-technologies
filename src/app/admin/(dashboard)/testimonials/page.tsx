'use client';

import React, { useState, useEffect } from 'react';
import { getTestimonials, toggleTestimonialVisibility, deleteTestimonial } from '@/app/actions/adminActions';
import { useToast } from '@/components/admin/ToastProvider';
import ConfirmModal from '@/components/admin/ConfirmModal';
import { Trash2, Eye, EyeOff, RefreshCcw, Star, MessageSquare } from 'lucide-react';
import { ITestimonial } from '@/types';

export default function TestimonialsPage() {
    const [testimonials, setTestimonials] = useState<ITestimonial[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { showToast } = useToast();

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [togglingId, setTogglingId] = useState<string | null>(null);

    const fetchTestimonials = async () => {
        setIsLoading(true);
        try {
            const data = await getTestimonials();
            setTestimonials(data);
        } catch {
            showToast('Gagal memuat testimoni klien', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTestimonials();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleToggleVisibility = async (id: string, currentStatus: boolean) => {
        setTogglingId(id);
        try {
            await toggleTestimonialVisibility(id, !currentStatus);
            showToast(`Status testimoni berhasil diperbarui`, 'success');
            // Refresh local state to avoid full reload
            setTestimonials(prev => prev.map(item => item._id === id ? { ...item, isVisible: !currentStatus } : item));
        } catch {
            showToast('Gagal memperbarui status visibilitas', 'error');
        } finally {
            setTogglingId(null);
        }
    };

    const handleDeleteParams = (id: string) => {
        setSelectedId(id);
        setDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!selectedId) return;
        try {
            await deleteTestimonial(selectedId);
            showToast('Testimoni berhasil dihapus', 'success');
            setTestimonials(prev => prev.filter(item => item._id !== selectedId));
        } catch {
            showToast('Gagal menghapus testimoni', 'error');
        } finally {
            setDeleteModalOpen(false);
            setSelectedId(null);
        }
    };

    return (
        <div className="space-y-8 text-left">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
                        Kelola Testimoni
                    </h1>
                    <p className="text-slate-400 text-sm mt-1">
                        Tinjau, tampilkan, atau sembunyikan ulasan/testimoni dari klien Anda di landing page.
                    </p>
                </div>
                <button
                    onClick={fetchTestimonials}
                    disabled={isLoading}
                    className="p-3 bg-[#131826] hover:bg-white/5 border border-white/10 rounded-xl text-slate-400 hover:text-white transition-colors cursor-pointer disabled:opacity-50"
                    title="Refresh Data"
                >
                    <RefreshCcw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                </button>
            </div>

            {/* Table / List */}
            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20 bg-[#131826]/40 border border-white/5 rounded-3xl">
                    <RefreshCcw className="w-8 h-8 text-cyan-500 animate-spin mb-4" />
                    <p className="text-slate-400 text-sm">Memuat data testimoni...</p>
                </div>
            ) : testimonials.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 bg-[#131826]/40 border border-white/5 rounded-3xl text-center px-4">
                    <MessageSquare className="w-12 h-12 text-slate-600 mb-4" />
                    <h3 className="text-white font-bold text-lg mb-1">Belum Ada Testimoni</h3>
                    <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
                        Testimoni klien yang dikirimkan melalui halaman Lacak Pesanan akan muncul di sini untuk dimoderasi.
                    </p>
                </div>
            ) : (
                <div className="bg-[#131826]/60 border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-slate-300">
                            <thead className="text-[10px] uppercase font-bold tracking-wider text-slate-500 bg-[#0B101C]/50 border-b border-white/5">
                                <tr>
                                    <th className="px-6 py-4">Klien / Bisnis</th>
                                    <th className="px-6 py-4">Rating</th>
                                    <th className="px-6 py-4">Ulasan</th>
                                    <th className="px-6 py-4">Status Tampil</th>
                                    <th className="px-6 py-4 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {testimonials.map((item) => (
                                    <tr key={item._id} className="hover:bg-white/[0.02] transition-colors">
                                        {/* Klien / Bisnis Info */}
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                {item.avatarUrl ? (
                                                    <div className="w-10 h-10 rounded-xl overflow-hidden border border-white/10 shrink-0">
                                                        <img src={item.avatarUrl} alt={item.namaKlien} className="w-full h-full object-cover" />
                                                    </div>
                                                ) : (
                                                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold shrink-0">
                                                        {item.namaKlien.charAt(0).toUpperCase()}
                                                    </div>
                                                )}
                                                <div>
                                                    <div className="font-semibold text-white">{item.namaKlien}</div>
                                                    <div className="text-xs text-slate-400 mt-0.5">{item.namaUsaha}</div>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Rating Bintang */}
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-0.5">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <Star
                                                        key={star}
                                                        className={`w-4 h-4 ${
                                                            star <= item.rating
                                                                ? 'text-amber-400 fill-amber-400'
                                                                : 'text-slate-700'
                                                        }`}
                                                    />
                                                ))}
                                            </div>
                                        </td>

                                        {/* Ulasan */}
                                        <td className="px-6 py-5 max-w-md">
                                            <p className="text-slate-300 leading-relaxed line-clamp-3 font-medium whitespace-pre-wrap">
                                                {item.ulasan}
                                            </p>
                                        </td>

                                        {/* Status Tampil Toggle */}
                                        <td className="px-6 py-5">
                                            <button
                                                onClick={() => handleToggleVisibility(item._id || '', item.isVisible)}
                                                disabled={togglingId === item._id}
                                                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                                                    item.isVisible
                                                        ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                                                        : 'bg-slate-500/10 border border-white/5 text-slate-400'
                                                }`}
                                            >
                                                {togglingId === item._id ? (
                                                    <RefreshCcw className="w-3 h-3 animate-spin" />
                                                ) : item.isVisible ? (
                                                    <>
                                                        <Eye className="w-3.5 h-3.5" />
                                                        Ditampilkan
                                                    </>
                                                ) : (
                                                    <>
                                                        <EyeOff className="w-3.5 h-3.5" />
                                                        Disembunyikan
                                                    </>
                                                )}
                                            </button>
                                        </td>

                                        {/* Actions */}
                                        <td className="px-6 py-5 text-right">
                                            <button
                                                onClick={() => handleDeleteParams(item._id || '')}
                                                className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                                                title="Hapus Ulasan"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Confirm Delete Modal */}
            <ConfirmModal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                title="Hapus Testimoni"
                message="Apakah Anda yakin ingin menghapus testimoni ini secara permanen? Tindakan ini tidak dapat dibatalkan."
                customActionName="Hapus"
                isDestructive={true}
            />
        </div>
    );
}
