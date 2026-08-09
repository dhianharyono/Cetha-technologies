import { IPortfolio, IPackage } from '@/types';

export const projects: IPortfolio[] = [
  {
    title: 'Smart Class - Dashboard Wali Kelas',
    description: 'Aplikasi produktivitas dan pengelolaan kelas terpadu untuk wali kelas: absensi siswa, jurnal harian guru, rekap nilai, dan buku tabungan kelas.',
    image: '/images/smartclass.png',
    fitur: ['Absensi Online', 'Jurnal Guru', 'Rekap Nilai', 'Buku Tabungan'],
    paket: 'Custom',
    website: 'https://smartclass-pink.vercel.app/',
    isHidden: false,
  },
  {
    title: 'Dhian Haryono | Senior Frontend Engineer',
    description: 'Portfolio website pribadi Dhian Haryono, Senior Frontend Engineer spesialisasi aplikasi web Next.js, React, TypeScript, dan performa tinggi.',
    image: '/images/dhianharyono.png',
    fitur: ['Next.js', 'React.js', 'TypeScript', 'Tailwind CSS'],
    paket: 'Custom',
    website: 'https://www.dhianharyono.com/',
    isHidden: false,
  },
  {
    title: 'Tracer Study SMANTA | Data Digital Alumni',
    description: 'Aplikasi web penelusuran dan pengelolaan data alumni SMA N 1 Tawangsari. Memudahkan alumni memperbarui profil dan sekolah memantau statistik alumni.',
    image: '/images/tracer-study.png',
    fitur: ['Dashboard User', 'Dashboard Alumni', 'Dashboard Admin', 'Dashboard Sekolah'],
    paket: 'Custom',
    website: 'https://tracerstudy-smanta.vercel.app/',
    isHidden: false,
  },
  {
    title: 'Zahra Krisnadi | Ahli Gizi Terpercaya',
    description: 'Website portofolio profesional dan konsultasi gizi untuk Zahra Krisnadi. Menampilkan layanan dietien, edukasi gizi, dan pemesanan sesi konsultasi.',
    image: '/images/zahra-krisnadi.png',
    fitur: ['Layanan', 'Testimoni', 'Pilihan Paket', 'Portofolio'],
    paket: 'Website Usaha',
    website: 'https://zahrakrisnadi.vercel.app/',
    isHidden: false,
  },
];

export const pricingPlans: IPackage[] = [];

