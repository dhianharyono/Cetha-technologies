'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
    LayoutDashboard,
    ShoppingCart,
    Image as ImageIcon,
    PackageSearch,
    LogOut,
    ChevronRight,
} from 'lucide-react';
import { useToast } from './ToastProvider';
import ConfirmModal from './ConfirmModal';
import { useState } from 'react';

const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
    { name: 'Pemesanan', icon: ShoppingCart, path: '/admin/orders' },
    { name: 'Portofolio', icon: ImageIcon, path: '/admin/portfolio' },
    { name: 'Paket Layanan', icon: PackageSearch, path: '/admin/packages' },
];

export default function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const { showToast } = useToast();
    const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
            showToast('Berhasil logout', 'success');
            router.push('/admin/login');
        } catch {
            showToast('Gagal logout', 'error');
        }
    };

    return (
        <aside className="w-64 flex-shrink-0 h-screen bg-[#07090E] border-r border-white/5 hidden md:flex flex-col z-20 sticky top-0">
            <div className="h-16 flex items-center px-6 border-b border-white/5">
                <h1 className="text-xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    Cetha Admin
                </h1>
            </div>

            <nav className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-2">
                {menuItems.map((item) => {
                    const isActive = pathname === item.path;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={`relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${isActive
                                ? 'bg-cyan-500/10 text-cyan-400 font-bold'
                                : 'text-slate-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <Icon className={`w-5 h-5 ${isActive ? 'text-cyan-400' : 'text-slate-500 group-hover:text-cyan-400/70'}`} />
                            <span className="text-sm">{item.name}</span>

                            {isActive && (
                                <motion.div
                                    layoutId="active-indicator"
                                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-cyan-400 rounded-r-full"
                                />
                            )}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-white/5">
                <button
                    onClick={() => setLogoutModalOpen(true)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                >
                    <div className="flex items-center gap-3">
                        <LogOut className="w-5 h-5" />
                        <span className="text-sm font-medium">Keluar</span>
                    </div>
                    <ChevronRight className="w-4 h-4 opacity-50" />
                </button>
            </div>

            <ConfirmModal
                isOpen={isLogoutModalOpen}
                onClose={() => setLogoutModalOpen(false)}
                onConfirm={handleLogout}
                title="Konfirmasi Logout"
                message="Apakah Anda yakin ingin keluar dari halaman admin?"
                customActionName="Keluar"
                isDestructive={true}
            />
        </aside>
    );
}
