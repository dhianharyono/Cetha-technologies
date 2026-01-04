import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className='bg-slate-900 text-slate-300 py-12 border-t border-slate-800'>
      <div className='container mx-auto px-4 md:px-6'>
        <div className='grid md:grid-cols-4 gap-8 mb-8'>
          <div className='col-span-1 md:col-span-1'>
            <Link href='/' className='text-2xl font-bold text-white mb-4 block'>
              Cetha Technologies
            </Link>
            <p className='text-sm text-slate-400 leading-relaxed mb-4'>
              Jasa pembuatan website modern, cepat, dan berorientasi pada
              konversi bisnis Anda.
            </p>
          </div>

          <div>
            <h4 className='text-white font-semibold mb-4'>Menu</h4>
            <ul className='space-y-2 text-sm'>
              <li>
                <Link
                  href='#services'
                  className='hover:text-blue-400 transition-colors'
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href='#portfolio'
                  className='hover:text-blue-400 transition-colors'
                >
                  Portfolio
                </Link>
              </li>
              <li>
                <Link
                  href='#pricing'
                  className='hover:text-blue-400 transition-colors'
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href='#faq'
                  className='hover:text-blue-400 transition-colors'
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className='text-white font-semibold mb-4'>Legal</h4>
            <ul className='space-y-2 text-sm'>
              <li>
                <Link
                  href='#'
                  className='hover:text-blue-400 transition-colors'
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href='#'
                  className='hover:text-blue-400 transition-colors'
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className='text-white font-semibold mb-4'>Connect</h4>
            <div className='flex space-x-4 mb-4'>
              <Link href='#' className='hover:text-blue-400 transition-colors'>
                <Twitter size={20} />
              </Link>
              <Link href='#' className='hover:text-blue-400 transition-colors'>
                <Facebook size={20} />
              </Link>
              <Link href='#' className='hover:text-blue-400 transition-colors'>
                <Instagram size={20} />
              </Link>
              <Link href='#' className='hover:text-blue-400 transition-colors'>
                <Linkedin size={20} />
              </Link>
            </div>
            <a
              href='mailto:hello@cethatech.id'
              className='flex items-center gap-2 hover:text-blue-400 transition-colors text-sm'
            >
              <Mail size={16} />
              hello@cethatech.id
            </a>
          </div>
        </div>

        <div className='border-t border-slate-800 pt-8 text-center text-sm text-slate-500'>
          <p>
            &copy; {new Date().getFullYear()} Cetha Technologies. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
