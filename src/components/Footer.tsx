import Link from 'next/link';
import { Instagram, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  const whatsappUrl = 'https://wa.me/6281320005405';

  return (
    <footer className='bg-[#04060A] border-t border-white/10 text-slate-400 pt-10 pb-8 sm:pt-16 sm:pb-10 relative z-10'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 pb-8 sm:pb-10'>
          {/* Brand Column */}
          <div className='lg:col-span-5 space-y-3 sm:space-y-4'>
            <div className='flex items-center gap-2.5'>
              <Link href='/' className='flex items-center gap-2.5 group'>
                <div className='text-2xl font-bold text-cyan-500 flex items-center gap-2'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    className='w-5 h-5'
                  >
                    <path d='M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5' />
                  </svg>
                </div>
                <span className='text-lg sm:text-xl font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors'>
                  Cetha Technologies
                </span>
              </Link>
            </div>
            <p className='text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md'>
              Partner digital terpercaya untuk transformasi bisnis atau personal
              branding Anda. Kami membangun website performa tinggi, modern,
              responsif, dan SEO-friendly.
            </p>

            {/* Social Icons Row */}
            <div className='flex items-center gap-2.5 sm:gap-3 pt-1 sm:pt-2'>
              <a
                href={whatsappUrl}
                target='_blank'
                rel='noopener noreferrer'
                aria-label='WhatsApp'
                className='flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 text-slate-300 transition-all hover:bg-emerald-500 hover:border-emerald-500 hover:text-white hover:shadow-lg'
              >
                <Phone className='h-3.5 w-3.5 sm:h-4 sm:w-4' />
              </a>
              <a
                href='https://www.instagram.com/cethatechnologies/'
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Instagram'
                className='flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 text-slate-300 transition-all hover:bg-pink-500 hover:border-pink-500 hover:text-white hover:shadow-lg'
              >
                <Instagram className='h-3.5 w-3.5 sm:h-4 sm:w-4' />
              </a>
              <a
                href='mailto:cethatechnologies@gmail.com'
                aria-label='Email'
                className='flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 text-slate-300 transition-all hover:bg-cyan-500 hover:border-cyan-500 hover:text-slate-950 hover:shadow-lg'
              >
                <Mail className='h-3.5 w-3.5 sm:h-4 sm:w-4' />
              </a>
            </div>
          </div>

          {/* Jelajahi / Quick Links */}
          <div className='lg:col-span-3 space-y-3 sm:space-y-4 md:pl-4 lg:pl-8'>
            <h4 className='text-[11px] sm:text-xs font-bold uppercase tracking-wider text-white'>
              Jelajahi
            </h4>
            <ul className='space-y-2 sm:space-y-2.5 text-xs sm:text-sm font-medium text-slate-400'>
              <li>
                <Link
                  href='/#process'
                  className='transition-colors hover:text-cyan-400'
                >
                  Mulai Layanan
                </Link>
              </li>
              <li>
                <Link
                  href='/#portfolio'
                  className='transition-colors hover:text-cyan-400'
                >
                  Portofolio
                </Link>
              </li>
              <li>
                <Link
                  href='/#pricing'
                  className='transition-colors hover:text-cyan-400'
                >
                  Paket Investasi
                </Link>
              </li>
              <li>
                <Link
                  href='/lacak-pesanan'
                  className='transition-colors hover:text-cyan-400'
                >
                  Lacak Pesanan
                </Link>
              </li>
              <li>
                <Link
                  href='/#faq'
                  className='transition-colors hover:text-cyan-400'
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Kontak / Info */}
          <div className='lg:col-span-4 space-y-4 sm:space-y-6 md:pl-4 lg:pl-8'>
            <div>
              <h4 className='text-[11px] sm:text-xs font-bold uppercase tracking-wider text-white mb-2 sm:mb-3'>
                Kontak
              </h4>
              <ul className='space-y-2 text-xs sm:text-sm text-slate-400 font-medium'>
                <li>
                  <a
                    href='https://www.instagram.com/cethatechnologies/'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='transition-colors hover:text-cyan-400 flex items-center gap-2'
                  >
                    <Instagram className='w-3.5 h-3.5 text-pink-400 shrink-0' />
                    <span>@cethatechnologies</span>
                  </a>
                </li>
                <li>
                  <a
                    href='mailto:cethatechnologies@gmail.com'
                    className='transition-colors hover:text-cyan-400 flex items-center gap-2 break-all'
                  >
                    <Mail className='w-3.5 h-3.5 text-cyan-400 shrink-0' />
                    <span>cethatechnologies@gmail.com</span>
                  </a>
                </li>
                <li className='flex items-center gap-2 text-slate-500 pt-1'>
                  <MapPin className='w-3.5 h-3.5 text-slate-400 shrink-0' />
                  <span>Bandung, Jawa Barat, Indonesia</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className='mt-6 pt-5 sm:mt-8 sm:pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center text-[11px] sm:text-xs text-slate-500 gap-2 sm:gap-3 w-full text-center sm:text-left'>
          <p>
            © {new Date().getFullYear()} Cetha Technologies. Hak cipta
            dilindungi.
          </p>
          <p>
            Developed by{' '}
            <Link
              href='/'
              className='font-semibold text-slate-300 hover:text-cyan-400 transition-colors'
            >
              Cetha Technologies
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
