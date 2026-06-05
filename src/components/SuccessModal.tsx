'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Copy, Home, ArrowRight, ClipboardCheck } from 'lucide-react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
}

export default function SuccessModal({ isOpen, onClose, orderId }: SuccessModalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(orderId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative w-full max-w-md bg-[#131826]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden z-10 text-center"
          >
            {/* Glowing Decorative Elements */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-cyan-500/10 blur-[40px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-500/10 blur-[40px] rounded-full pointer-events-none" />

            {/* Success Icon */}
            <div className="flex justify-center mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
                className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400"
              >
                <Check className="w-8 h-8" />
              </motion.div>
            </div>

            {/* Typography */}
            <h2 className="text-2xl font-black bg-gradient-to-br from-white to-slate-400 bg-clip-text text-transparent mb-3">
              Pesanan Berhasil Dikirim!
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              Mohon menunggu respon dari admin <strong>Cetha Technologies</strong>. Kami akan segera menghubungi Anda melalui nomor WhatsApp yang tertera untuk memvalidasi dan memproses pesanan Anda.
            </p>

            {/* Tracking ID Block */}
            <div className="bg-[#0B101C]/85 border border-white/5 rounded-2xl p-4 mb-6">
              <span className="text-xs text-slate-400 block mb-2 font-medium">ID Pelacakan Pesanan Anda:</span>
              <div className="flex items-center justify-between gap-2 bg-[#07090E] border border-white/10 rounded-xl px-4 py-3 select-all">
                <span className="font-mono text-cyan-400 font-bold tracking-wider text-sm select-all">
                  {orderId}
                </span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="p-1.5 hover:bg-white/5 text-slate-400 hover:text-cyan-400 rounded-lg transition-colors cursor-pointer"
                  title="Salin ID"
                >
                  {copied ? (
                    <ClipboardCheck className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
              {copied && (
                <span className="text-[10px] text-emerald-400 block mt-1.5 font-medium animate-pulse">
                  ID berhasil disalin!
                </span>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3">
              <Link href={`/lacak-pesanan?id=${orderId}`} className="w-full">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-3.5 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold rounded-xl transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02]"
                >
                  Lacak Progress Pesanan
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              
              <Link href="/" className="w-full">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-3.5 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl border border-white/10 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Home className="w-4 h-4" />
                  Kembali ke Beranda
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
