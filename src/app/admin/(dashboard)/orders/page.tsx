'use client';

import React, { useState, useEffect } from 'react';
import { getOrders, updateOrderStatus, deleteOrder } from '@/app/actions/adminActions';
import { useToast } from '@/components/admin/ToastProvider';
import ConfirmModal from '@/components/admin/ConfirmModal';
import { FileText, MoreVertical, Trash2, CheckCircle, RefreshCcw, Eye } from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

export default function OrdersPage() {
    const [orders, setOrders] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { showToast } = useToast();

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

    const fetchOrders = async () => {
        setIsLoading(true);
        try {
            const data = await getOrders();
            setOrders(data);
        } catch {
            showToast('Gagal memuat data order', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleStatusChange = async (id: string, newStatus: string) => {
        try {
            await updateOrderStatus(id, newStatus);
            showToast(`Status berhasil diubah menjadi ${newStatus}`, 'success');
            fetchOrders();
        } catch {
            showToast('Gagal mengubah status', 'error');
        }
    };

    const handleDeleteParams = (id: string) => {
        setSelectedOrderId(id);
        setDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!selectedOrderId) return;
        try {
            await deleteOrder(selectedOrderId);
            showToast('Order berhasil dihapus', 'success');
            fetchOrders();
        } catch {
            showToast('Gagal menghapus order', 'error');
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-white tracking-tight">Kelola Pemesanan</h1>
                    <p className="text-slate-400 mt-1">Daftar order masuk dari klien via Landing Page.</p>
                </div>
                <button
                    onClick={fetchOrders}
                    className="flex items-center gap-2 px-4 py-2 bg-[#131826] border border-white/10 rounded-xl text-sm font-medium hover:bg-white/5 transition-colors"
                >
                    <RefreshCcw className={`w-4 h-4 ${isLoading ? 'animate-spin text-cyan-400' : ''}`} />
                    Refresh
                </button>
            </div>

            <div className="bg-[#131826]/80 backdrop-blur-md border border-white/5 rounded-2xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-[#0B101C]/50 border-b border-white/5 uppercase text-xs font-semibold text-slate-400">
                            <tr>
                                <th className="px-6 py-4">Nama Usaha / Klien</th>
                                <th className="px-6 py-4">Paket</th>
                                <th className="px-6 py-4">Kategori</th>
                                <th className="px-6 py-4">Tanggal Order</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-slate-300">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-slate-500">Memuat data...</td>
                                </tr>
                            ) : orders.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-slate-500">Belum ada order masuk.</td>
                                </tr>
                            ) : (
                                orders.map((order) => (
                                    <tr key={order._id} className="hover:bg-white/[0.02] transition-colors">
                                        <td className="px-6 py-4 font-medium text-white">
                                            {order.namaUsaha}
                                            <span className="block text-xs text-slate-500 font-normal mt-0.5">{order.nomorWa}</span>
                                        </td>
                                        <td className="px-6 py-4 text-cyan-400 font-semibold">{order.paket}</td>
                                        <td className="px-6 py-4">{order.kategoriKebutuhan}</td>
                                        <td className="px-6 py-4">
                                            {format(new Date(order.createdAt), 'dd MMM yyyy, HH:mm', { locale: id })}
                                        </td>
                                        <td className="px-6 py-4">
                                            <select
                                                value={order.status}
                                                onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                                className={`text-xs font-bold px-3 py-1.5 rounded-full border border-white/10 outline-none cursor-pointer appearance-none ${order.status === 'Baru' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                                                        order.status === 'Diproses' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                                                            order.status === 'Selesai' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                                                'bg-red-500/10 text-red-400 border-red-500/20'
                                                    }`}
                                            >
                                                <option value="Baru" className="bg-[#131826] text-amber-400">Baru</option>
                                                <option value="Diproses" className="bg-[#131826] text-blue-400">Diproses</option>
                                                <option value="Selesai" className="bg-[#131826] text-emerald-400">Selesai</option>
                                                <option value="Batal" className="bg-[#131826] text-red-400">Batal</option>
                                            </select>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                {/* TODO: Add View Detail Modal logic when Eye clicked */}
                                                <button className="p-2 text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition-colors cursor-not-allowed opacity-50" title="Fitur Detail Segera Hadir">
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteParams(order._id)}
                                                    className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <ConfirmModal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                title="Hapus Data Order"
                message="Apakah Anda yakin ingin menghapus data order ini secara permanen? Data yang sudah dihapus tidak dapat dipulihkan."
            />
        </div>
    );
}
