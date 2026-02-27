import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Cetha Technologies | Jasa Pembuatan Landing Page Modern & Cepat',
  description:
    'Cetha Technologies spesialis pembuatan landing page performa tinggi menggunakan Next.js dan Tailwind CSS. Tingkatkan konversi penjualan Anda.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='id' className='scroll-smooth dark'>
      <body className={`${inter.className} antialiased text-slate-50 bg-[#07090E]`}>
        {children}
      </body>
    </html>
  );
}
