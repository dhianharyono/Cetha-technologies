import React from 'react';
import { getDashboardStats } from '@/app/actions/adminActions';
import {
    Users,
    ShoppingCart,
    ImageIcon,
    PackageSearch,
    ExternalLink,
    TrendingUp,
    BriefcaseBusiness
} from 'lucide-react';
import Link from 'next/link';
import { IDashboardStats } from '@/types';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
    let stats: IDashboardStats = {
        totalOrders: 0, pendingOrders: 0, totalPortfolios: 0, totalPackages: 0,
        analyticData: { status: [], packages: [] }
    };
    try {
        stats = await getDashboardStats();
    } catch (error) {
        console.warn('DB not connected during PRERENDERING or runtime', error);
    }

    const statCards = [
        {
            title: 'Total Order',
            value: stats.totalOrders,
            icon: ShoppingCart,
            color: 'text-cyan-400',
            bg: 'bg-cyan-500/10'
        },
        {
            title: 'Order Baru (Pending)',
            value: stats.pendingOrders,
            icon: Users,
            color: 'text-amber-400',
            bg: 'bg-amber-500/10'
        },
        {
            title: 'Total Portofolio',
            value: stats.totalPortfolios,
            icon: ImageIcon,
            color: 'text-emerald-400',
            bg: 'bg-emerald-500/10'
        },
        {
            title: 'Paket Layanan',
            value: stats.totalPackages,
            icon: PackageSearch,
            color: 'text-blue-400',
            bg: 'bg-blue-500/10'
        },
    ];

    return (
        <div className="space-y-8 animate-in fade-in zoom-in duration-500 ease-out">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-white mb-2 tracking-tight">Dashboard Overview</h1>
                    <p className="text-slate-400">Selamat datang kembali! Berikut ringkasan data aplikasi Anda.</p>
                </div>
                <Link
                    href="/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white px-5 py-2.5 rounded-xl border border-white/10 transition-colors shrink-0 w-fit font-medium text-sm"
                >
                    Lihat Landing Page <ExternalLink className="w-4 h-4 text-cyan-400" />
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <div key={i} className="bg-[#131826]/80 backdrop-blur-md border border-white/5 rounded-2xl p-6 relative overflow-hidden group hover:border-white/10 transition-colors">
                            {/* Highlight background */}
                            <div className={`absolute -right-6 -top-6 w-24 h-24 ${stat.bg} rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700`} />

                            <div className="flex items-start justify-between relative z-10">
                                <div>
                                    <p className="text-sm font-medium text-slate-400 mb-1">{stat.title}</p>
                                    <h3 className="text-3xl font-black text-white">{stat.value}</h3>
                                </div>
                                <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                                    <Icon className="w-6 h-6" />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Analytic Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                {/* Status Analytic */}
                <div className="bg-[#131826]/80 backdrop-blur-md border border-white/5 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2.5 bg-cyan-500/10 rounded-lg">
                            <TrendingUp className="w-5 h-5 text-cyan-400" />
                        </div>
                        <h2 className="text-xl font-bold text-white">Analitik Status Pesanan</h2>
                    </div>
                    {stats.analyticData.status.length > 0 ? (
                        <div className="space-y-4">
                            {stats.analyticData.status.map((item: { _id: string; count: number }, idx: number) => {
                                const percentage = Math.round((item.count / stats.totalOrders) * 100);
                                return (
                                    <div key={idx} className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-300 font-medium">{item._id}</span>
                                            <span className="text-white font-bold">{item.count} Pesanan ({percentage}%)</span>
                                        </div>
                                        <div className="w-full bg-white/5 rounded-full h-2.5">
                                            <div
                                                className="bg-linear-to-r from-cyan-500 to-blue-500 h-2.5 rounded-full"
                                                style={{ width: `${percentage}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    ) : (
                        <div className="py-8 text-center text-slate-500 text-sm">Belum ada data pesanan.</div>
                    )}
                </div>

                {/* Package Popularity Analytic */}
                <div className="bg-[#131826]/80 backdrop-blur-md border border-white/5 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2.5 bg-emerald-500/10 rounded-lg">
                            <BriefcaseBusiness className="w-5 h-5 text-emerald-400" />
                        </div>
                        <h2 className="text-xl font-bold text-white">Paket Paling Diminati</h2>
                    </div>
                    {stats.analyticData.packages.length > 0 ? (
                        <div className="space-y-4">
                            {stats.analyticData.packages.map((item: { _id: string; count: number }, idx: number) => {
                                const percentage = Math.round((item.count / stats.totalOrders) * 100);
                                return (
                                    <div key={idx} className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-300 font-medium">Paket {item._id}</span>
                                            <span className="text-white font-bold">{item.count} Pesanan ({percentage}%)</span>
                                        </div>
                                        <div className="w-full bg-white/5 rounded-full h-2.5">
                                            <div
                                                className="bg-linear-to-r from-emerald-500 to-cyan-500 h-2.5 rounded-full"
                                                style={{ width: `${percentage}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    ) : (
                        <div className="py-8 text-center text-slate-500 text-sm">Belum ada data pesanan.</div>
                    )}
                </div>
            </div>
        </div>
    );
}
