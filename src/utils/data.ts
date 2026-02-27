export const projects = [
    {
        title: 'E-Commerce Fashion Modern',
        description:
            'Redesain toko online dengan fokus pada kecepatan checkout dan mobile experience.',
        image:
            'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        tech: ['Next.js', 'Tailwind CSS', 'Shopify'],
        result: 'Conversion naik 40%',
    },
    {
        title: 'Portal Berita Daerah',
        description:
            'Platform berita high-traffic dengan optimasi Core Web Vitals untuk SEO maksimal.',
        image:
            'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        tech: ['Next.js', 'ISR', 'Vercel'],
        result: 'Load time < 0.8s',
    },
    {
        title: 'Company Profile BUMN',
        description:
            'Website korporat yang elegan, aman, dan mudah dikelola oleh tim admin.',
        image:
            'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        tech: ['React', 'TypeScript', 'CMS'],
        result: 'Security Score A+',
    },
];

export const pricingPlans = [
    {
        name: 'Starter',
        price: 'Rp 1,5 Jt',
        originalPrice: 'Rp 2.000.000',
        description: 'Cocok untuk UMKM atau Personal Branding yang baru mulai.',
        features: [
            'Landing Page 1 Halaman',
            'Responsive Mobile Design',
            'SEO Basic Setup',
            'Revisi 2x',
            'Pengerjaan 3-5 Hari',
        ],
        cta: 'Pilih Starter',
        popular: false,
    },
    {
        name: 'Pro Business',
        price: 'Rp 2,5 Jt',
        originalPrice: 'Rp 3.000.000',
        description:
            'Solusi lengkap untuk bisnis yang ingin scale up dan terlihat profesional.',
        features: [
            'Multi-page Website (up to 5)',
            'CMS Integration',
            'Advanced SEO Optimization',
            'Integrasi WhatsApp/Email',
            'Google Analytics & Pixel',
            'Prioritas Support',
        ],
        cta: 'Pilih Pro',
        popular: true,
    },
    {
        name: 'Enterprise',
        price: 'Custom',
        originalPrice: null,
        description: 'Sistem kompleks untuk kebutuhan spesifik perusahaan besar.',
        features: [
            'Custom Web Application',
            'Database Integration',
            'High-Scale Performance',
            'Keamanan Tingkat Lanjut',
            'Dedicated Server Setup',
            'Maintenance Bulanan',
        ],
        cta: 'Hubungi Kami',
        popular: false,
    },
];
