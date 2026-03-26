import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta',
});

export const metadata: Metadata = {
  title: 'Cetha Technologies | Jasa Pembuatan Website Modern & Cepat',
  description:
    'Cetha Technologies spesialis pembuatan Website performa tinggi menggunakan Next.js dan Tailwind CSS. Tingkatkan konversi penjualan Anda.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='id' className='scroll-smooth dark'>
      <body
        className={`${plusJakartaSans.variable} font-sans antialiased text-slate-50 bg-[#07090E]`}
      >
        {children}
      </body>
    </html>
  );
}

