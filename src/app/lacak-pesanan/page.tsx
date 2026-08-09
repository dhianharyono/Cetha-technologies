import { Suspense } from 'react';
import LacakPesananContent from './LacakPesananContent';



export default function LacakPesananPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#07090E] flex items-center justify-center text-white">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-slate-400 text-sm font-medium">Memuat halaman pelacakan...</p>
                </div>
            </div>
        }>
            <LacakPesananContent />
        </Suspense>
    );
}
