import Link from 'next/link';
import { Instagram, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  const whatsappUrl = 'https://wa.me/6281320005405';

  return (
    <footer className='bg-slate-900 text-slate-300 py-12 border-t border-slate-800'>
      <div className='container mx-auto px-4 md:px-6'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-8'>
          {/* Brand Column */}
          <div className='flex flex-col'>
            <Link href='/' className='text-2xl font-bold text-white mb-4 block'>
              Cetha Technologies
            </Link>
            <p className='text-slate-400 leading-relaxed max-w-sm mb-6'>
              Partner digital terpercaya untuk transformasi bisnis Anda. Kami
              membangun website yang tidak hanya indah, tapi juga menghasilkan.
            </p>
            <div className='flex items-start gap-3 text-slate-400'>
              <MapPin className='w-5 h-5 text-blue-500 shrink-0 mt-1' />
              <span>Bandung, Jawa Barat, Indonesia</span>
            </div>
          </div>

          {/* Menu Column */}
          <div className='md:pl-8'>
            <h4 className='text-white font-semibold mb-6 text-lg'>Menu</h4>
            <ul className='space-y-4'>
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

          {/* Connect Column */}
          <div>
            <h4 className='text-white font-semibold mb-6 text-lg'>Connect</h4>
            <div className='flex flex-col gap-4'>
              <a
                href='https://instagram.com'
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center gap-3 hover:text-pink-500 transition-colors group'
              >
                <div className='w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-slate-700 transition-colors'>
                  <Instagram size={20} />
                </div>
                <span>@cethatech</span>
              </a>
              <a
                href={whatsappUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center gap-3 hover:text-green-500 transition-colors group'
              >
                <div className='w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-slate-700 transition-colors'>
                  <Phone size={20} />
                </div>
                <span>WhatsApp Kami</span>
              </a>
            </div>
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
