'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    customActionName?: string;
    isDestructive?: boolean;
}

export default function ConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    customActionName = 'Konfirmasi',
    isDestructive = true,
}: ConfirmModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4 overflow-hidden">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: 0.15 } }}
                        className="absolute inset-0 bg-[#07090E]/80 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    {/* Modal content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10, transition: { duration: 0.15 } }}
                        className="relative w-full max-w-md p-6 bg-[#131826] border border-white/10 rounded-2xl shadow-xl z-50 overflow-hidden"
                    >
                        {isDestructive && (
                            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 blur-[50px] pointer-events-none rounded-full" />
                        )}

                        <div className="flex gap-4 items-start relative z-10">
                            <div className={`p-3 rounded-xl shrink-0 ${isDestructive ? 'bg-red-500/10 text-red-400' : 'bg-cyan-500/10 text-cyan-400'}`}>
                                <AlertTriangle className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
                                <p className="text-sm text-slate-400 leading-relaxed">{message}</p>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 mt-8 relative z-10">
                            <button
                                onClick={onClose}
                                className="px-4 py-2 rounded-lg text-sm font-semibold text-slate-300 bg-white/5 hover:bg-white/10 border border-white/5 transition-colors"
                            >
                                Batal
                            </button>
                            <button
                                onClick={() => {
                                    onConfirm();
                                    onClose();
                                }}
                                className={`px-4 py-2 rounded-lg text-sm font-semibold text-white transition-colors ${isDestructive
                                        ? 'bg-red-500 hover:bg-red-600 shadow-[0_0_15px_rgba(239,68,68,0.3)]'
                                        : 'bg-cyan-500 hover:bg-cyan-600 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                                    }`}
                            >
                                {customActionName}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
