import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://cetha-tech.vercel.app'),
  title: {
    default: 'Cetha Technologies | Jasa Pembuatan Website Modern & Cepat',
    template: '%s | Cetha Technologies',
  },
  description:
    'Cetha Technologies spesialis pembuatan Website performa tinggi, modern, responsif, dan SEO-friendly menggunakan Next.js & Tailwind CSS. Tingkatkan kredibilitas & konversi bisnis Anda.',
  keywords: [
    'Cetha Technologies',
    'Jasa Pembuatan Website',
    'Web Developer Indonesia',
    'Website Profesional',
    'Next.js Developer',
    'Website Murah',
    'Landing Page',
    'Website UMKM',
    'Website Company Profile',
    'Web Performa Tinggi',
  ],
  authors: [{ name: 'Cetha Technologies', url: 'https://cetha-tech.vercel.app' }],
  creator: 'Cetha Technologies',
  publisher: 'Cetha Technologies',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Cetha Technologies | Jasa Pembuatan Website Modern & Cepat',
    description:
      'Cetha Technologies spesialis pembuatan Website performa tinggi, modern, responsif, dan SEO-friendly. Tingkatkan kredibilitas & konversi bisnis Anda.',
    url: 'https://cetha-tech.vercel.app',
    siteName: 'Cetha Technologies',
    locale: 'id_ID',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Cetha Technologies - Jasa Pembuatan Website Modern & Performa Tinggi',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cetha Technologies | Jasa Pembuatan Website Modern & Cepat',
    description:
      'Cetha Technologies spesialis pembuatan Website performa tinggi, modern, responsif, dan SEO-friendly.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Cetha Technologies',
  url: 'https://cetha-tech.vercel.app',
  logo: 'https://cetha-tech.vercel.app/icon.png',
  image: 'https://cetha-tech.vercel.app/og-image.png',
  description:
    'Cetha Technologies spesialis pembuatan Website performa tinggi, modern, responsif, dan SEO-friendly.',
  sameAs: [
    'https://www.dhianharyono.com',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+6281320005405',
    contactType: 'customer service',
    areaServed: 'ID',
    availableLanguage: ['Indonesian', 'English'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='id' className='scroll-smooth dark'>
      <head>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${outfit.variable} font-sans antialiased text-slate-50 bg-[#07090E]`}
      >
        {children}
      </body>
    </html>
  );
}

