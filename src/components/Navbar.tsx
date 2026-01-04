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

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/80 backdrop-blur-md shadow-sm py-4'
          : 'bg-transparent py-6'
      )}
    >
      <div className='container mx-auto px-4 md:px-6 flex items-center justify-between'>
        <Link
          href='/'
          className='text-2xl font-bold text-blue-600 flex items-center gap-2'
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
          <span className='text-slate-900 text-lg md:text-2xl'>
            Cetha Technologies
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className='hidden md:flex items-center gap-8'>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className='text-slate-600 hover:text-blue-600 font-medium transition-colors'
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className='hidden md:block'>
          <Button>Konsultasi Gratis</Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className='md:hidden text-slate-900'
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className='md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 p-4 shadow-lg flex flex-col gap-4'>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className='text-slate-600 hover:text-blue-600 font-medium py-2'
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Button className='w-full'>Konsultasi Gratis</Button>
        </div>
      )}
    </nav>
  );
}
