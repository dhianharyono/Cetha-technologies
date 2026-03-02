'use client';

import React from 'react';
import { ToastProvider } from '@/components/admin/ToastProvider';

export default function RootAdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <ToastProvider>
            <div className="min-h-screen bg-[#07090E] text-slate-300 font-sans antialiased relative z-0">
                <div className="absolute top-0 right-0 w-[800px] h-[600px] bg-cyan-900/10 blur-[150px] opacity-50 pointer-events-none -z-10 rounded-full" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[500px] bg-blue-900/10 blur-[150px] opacity-30 pointer-events-none -z-10 rounded-full" />
                {children}
            </div>
        </ToastProvider>
    );
}
