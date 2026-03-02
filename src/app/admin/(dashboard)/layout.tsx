import React from 'react';
import Sidebar from '@/components/admin/Sidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex w-full min-h-screen">
            <Sidebar />
            <main className="flex-1 min-w-0 overflow-y-auto">
                <div className="p-6 md:p-10 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
