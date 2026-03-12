export interface IPortfolio {
    _id?: string;
    title: string;
    description: string;
    image: string;
    fitur: string[];
    paket: string;
    website?: string;
    isHidden: boolean;
    createdAt?: string | Date;
    updatedAt?: string | Date;
}

export interface IPackage {
    _id?: string;
    name: string;
    price: string;
    originalPrice?: string;
    description: string;
    features: string[];
    cta: string;
    popular: boolean;
    isHidden: boolean;
    createdAt?: string | Date;
    updatedAt?: string | Date;
}

export interface IOrder {
    _id?: string;
    paket: string;
    namaUsaha: string;
    slogan?: string;
    deskripsiSingkat: string;
    kategoriKebutuhan: string;
    pilihanKebutuhan: string;
    sudahDomain: string;
    namaDomain?: string;
    referensiDesain?: string;
    nomorWa: string;
    linkIg?: string;
    alamatFisik?: string;
    linkMateriVisual?: string;
    status: string;
    createdAt?: string | Date;
    updatedAt?: string | Date;
}

export interface IDashboardStats {
    totalOrders: number;
    pendingOrders: number;
    totalPortfolios: number;
    totalPackages: number;
    analyticData: {
        status: Array<{ _id: string; count: number }>;
        packages: Array<{ _id: string; count: number }>;
    };
}
