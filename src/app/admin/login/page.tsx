'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/admin/ToastProvider';
import { motion } from 'framer-motion';
import { Lock, User, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
    const router = useRouter();
    const { showToast } = useToast();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();
            if (res.ok) {
                showToast('Berhasil masuk ke Dashboard!', 'success');
                router.push('/admin');
                router.refresh();
            } else {
                showToast(data.error || 'Login gagal, periksa kredensial Anda.', 'error');
            }
        } catch {
            showToast('Terjadi kesalahan sistem', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <div className="bg-[#131826]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
                    {/* Decorative Elements */}
                    <div className="absolute -top-32 -right-32 w-64 h-64 bg-cyan-500/10 blur-[60px] rounded-full pointer-events-none" />
                    <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-blue-500/10 blur-[60px] rounded-full pointer-events-none" />

                    <div className="text-center mb-10 relative z-10">
                        <h1 className="text-3xl font-black bg-linear-to-br from-white to-slate-400 bg-clip-text text-transparent mb-2">
                            Welcome Back
                        </h1>
                        <p className="text-slate-400 text-sm">Sign in to Cetha Tech Admin Panel</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6 relative z-10">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Username</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                                    <User className="w-5 h-5" />
                                </div>
                                <input
                                    required
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3.5 bg-[#0B101C]/80 border border-white/10 rounded-xl text-white outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all font-medium"
                                    placeholder="Enter your username"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                                    <Lock className="w-5 h-5" />
                                </div>
                                <input
                                    required
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-11 pr-12 py-3.5 bg-[#0B101C]/80 border border-white/10 rounded-xl text-white outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all font-medium"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full py-6 rounded-xl font-bold text-md transition-all ${isLoading
                                ? 'bg-cyan-500/50 text-white/50 cursor-wait'
                                : 'bg-cyan-500 hover:bg-cyan-400 text-slate-900 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)]'
                                }`}
                        >
                            {isLoading ? 'Signing In...' : 'Sign In'}
                        </Button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
}
