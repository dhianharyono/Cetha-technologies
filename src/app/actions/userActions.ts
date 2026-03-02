'use server';

import connectToDatabase from '@/lib/db';
import Order from '@/models/Order';
import Portfolio from '@/models/Portfolio';
import Package from '@/models/Package';

export async function submitOrder(data: any) {
    try {
        await connectToDatabase();
        // Insert order to database
        const order = await Order.create(data);
        return { success: true, orderId: order._id.toString() };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function getPublicPortfolios() {
    try {
        const conn = await connectToDatabase();
        if (!conn) return [];
        const portfolios = await Portfolio.find({ isHidden: false }).sort({ createdAt: -1 }).lean();
        return JSON.parse(JSON.stringify(portfolios));
    } catch {
        return [];
    }
}

export async function getPublicPackages() {
    try {
        const conn = await connectToDatabase();
        if (!conn) return [];
        const packages = await Package.find({ isHidden: false }).sort({ createdAt: -1 }).lean();
        return JSON.parse(JSON.stringify(packages));
    } catch {
        return [];
    }
}
