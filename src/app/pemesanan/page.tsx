import { Suspense } from 'react';
import PemesananForm from '@/app/pemesanan/PemesananForm';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';



export default function PemesananPage() {
    return (
        <main className="min-h-screen bg-[#07090E] flex flex-col">
            {/* Simple Form Header */}
            <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#07090E]/80 backdrop-blur-md">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm font-medium">Kembali</span>
                    </Link>
                    <div className="text-white font-bold tracking-tight text-lg">
                        Cetha <span className="text-cyan-400">Tech</span>
                    </div>
                </div>
            </header>

            <div className="flex-1 py-12 md:py-20 relative z-10">
                <Suspense fallback={<div className="text-center text-white mt-20">Memuat formulir...</div>}>
                    <PemesananForm />
                </Suspense>
            </div>
        </main>
    );
}
