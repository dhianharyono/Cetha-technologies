'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'FAQ', href: '#faq' },
  ];

  const whatsappUrl =
    'https://wa.me/6281320005405?text=Halo%2C%20saya%20ingin%20konsultasi%20gratis%20pembuatan%20website';

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-[#07090E]/80 backdrop-blur-md shadow-sm shadow-blue-900/10 py-4'
          : 'bg-transparent py-6',
      )}
    >
      <div className='container mx-auto px-4 md:px-6 flex items-center justify-between'>
        <Link
          href='/'
          className='text-2xl font-bold text-cyan-500 flex items-center gap-2'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='w-8 h-8'
          >
            <path d='M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5' />
          </svg>
          <span className='text-white text-lg sm:text-xl md:text-2xl font-extrabold tracking-tight'>
            Cetha Technologies
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className='hidden lg:flex items-center gap-8'>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className='text-slate-300 hover:text-cyan-400 font-medium transition-colors'
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className='hidden lg:block '>
          <Link href={whatsappUrl} target='_blank' rel='noopener noreferrer'>
            <Button className='cursor-pointer bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold shadow-[0_0_15px_rgba(6,182,212,0.5)] rounded-full px-6 transition-all hover:scale-105'>
              Konsultasi Gratis
            </Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className='lg:hidden text-white'
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className='lg:hidden absolute top-full left-0 right-0 bg-[#07090E]/95 backdrop-blur-xl border-b border-white/10 p-4 shadow-xl flex flex-col gap-4'>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className='text-slate-300 hover:text-cyan-400 text-sm font-medium transition-colors'
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
