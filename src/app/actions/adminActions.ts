'use server';

import connectToDatabase from '@/lib/db';
import Order from '@/models/Order';
import Portfolio from '@/models/Portfolio';
import Package from '@/models/Package';
import { revalidatePath } from 'next/cache';
import { IPortfolio, IPackage, IOrder, IDashboardStats } from '@/types';

// --- DASHBOARD ---
export async function getDashboardStats(): Promise<IDashboardStats> {
    try {
        const conn = await connectToDatabase();
        if (!conn) return { totalOrders: 0, pendingOrders: 0, totalPortfolios: 0, totalPackages: 0, analyticData: { status: [], packages: [] } };
        const [
            totalOrders,
            pendingOrders,
            totalPortfolios,
            totalPackages,
            statusAnalytics,
            packageAnalytics,
        ] = await Promise.all([
            Order.countDocuments(),
            Order.countDocuments({ status: 'Baru' }),
            Portfolio.countDocuments(),
            Package.countDocuments(),
            Order.aggregate([
                { $group: { _id: '$status', count: { $sum: 1 } } }
            ]),
            Order.aggregate([
                { $group: { _id: '$paket', count: { $sum: 1 } } },
                { $sort: { count: -1 } }
            ])
        ]);

        return {
            totalOrders,
            pendingOrders,
            totalPortfolios,
            totalPackages,
            analyticData: {
                status: JSON.parse(JSON.stringify(statusAnalytics)),
                packages: JSON.parse(JSON.stringify(packageAnalytics))
            }
        };
    } catch {
        return { totalOrders: 0, pendingOrders: 0, totalPortfolios: 0, totalPackages: 0, analyticData: { status: [], packages: [] } };
    }
}

// --- ORDER ACTIONS ---
export async function getOrders(): Promise<IOrder[]> {
    try {
        const conn = await connectToDatabase();
        if (!conn) return [];
        const orders = await Order.find().sort({ createdAt: -1 }).lean();
        return JSON.parse(JSON.stringify(orders));
    } catch {
        return [];
    }
}

export async function deleteOrder(id: string) {
    await connectToDatabase();
    await Order.findByIdAndDelete(id);
    revalidatePath('/admin/orders');
}

export async function updateOrderStatus(id: string, status: string) {
    await connectToDatabase();
    await Order.findByIdAndUpdate(id, { status });
    revalidatePath('/admin/orders');
}

export async function updateOrder(id: string, data: Partial<IOrder>) {
    await connectToDatabase();
    await Order.findByIdAndUpdate(id, data);
    revalidatePath('/admin/orders');
}

// --- PORTFOLIO ACTIONS ---
export async function getPortfolios(): Promise<IPortfolio[]> {
    try {
        const conn = await connectToDatabase();
        if (!conn) return [];
        const portfolios = await Portfolio.find().sort({ createdAt: -1 }).lean();
        return JSON.parse(JSON.stringify(portfolios));
    } catch {
        return [];
    }
}

export async function addPortfolio(data: Partial<IPortfolio>) {
    await connectToDatabase();
    await Portfolio.create(data);
    revalidatePath('/admin/portfolio');
    revalidatePath('/'); // Landing page
}

export async function updatePortfolio(id: string, data: Partial<IPortfolio>) {
    await connectToDatabase();
    await Portfolio.findByIdAndUpdate(id, data);
    revalidatePath('/admin/portfolio');
    revalidatePath('/');
}

export async function deletePortfolio(id: string) {
    await connectToDatabase();
    await Portfolio.findByIdAndDelete(id);
    revalidatePath('/admin/portfolio');
    revalidatePath('/');
}

export async function togglePortfolioVisibility(id: string, isHidden: boolean) {
    await connectToDatabase();
    await Portfolio.findByIdAndUpdate(id, { isHidden });
    revalidatePath('/admin/portfolio');
    revalidatePath('/');
}

// --- PACKAGE ACTIONS ---
export async function getPackages(): Promise<IPackage[]> {
    try {
        const conn = await connectToDatabase();
        if (!conn) return [];
        const packages = await Package.find().sort({ createdAt: -1 }).lean();
        return JSON.parse(JSON.stringify(packages));
    } catch {
        return [];
    }
}

export async function addPackage(data: Partial<IPackage>) {
    await connectToDatabase();
    await Package.create(data);
    revalidatePath('/admin/packages');
    revalidatePath('/'); // Landing page
}

export async function updatePackage(id: string, data: Partial<IPackage>) {
    await connectToDatabase();
    await Package.findByIdAndUpdate(id, data);
    revalidatePath('/admin/packages');
    revalidatePath('/');
}

export async function deletePackage(id: string) {
    await connectToDatabase();
    await Package.findByIdAndDelete(id);
    revalidatePath('/admin/packages');
    revalidatePath('/');
}

export async function togglePackageVisibility(id: string, isHidden: boolean) {
    await connectToDatabase();
    await Package.findByIdAndUpdate(id, { isHidden });
    revalidatePath('/admin/packages');
    revalidatePath('/');
}
