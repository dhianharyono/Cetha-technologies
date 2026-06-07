'use server';

import connectToDatabase from '@/lib/db';
import Order from '@/models/Order';
import Portfolio from '@/models/Portfolio';
import Package from '@/models/Package';
import Testimonial from '@/models/Testimonial';
import { IOrder, IPortfolio, IPackage, ITestimonial } from '@/types';

export async function submitOrder(data: Partial<IOrder>) {
    try {
        await connectToDatabase();
        // Insert order to database
        const order = await Order.create(data);
        return { success: true, orderId: order._id.toString() };
    } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
}

export async function getPublicPortfolios(): Promise<IPortfolio[]> {
    try {
        const conn = await connectToDatabase();
        if (!conn) return [];
        const portfolios = await Portfolio.find({ isHidden: false }).sort({ createdAt: -1 }).lean();
        return JSON.parse(JSON.stringify(portfolios));
    } catch {
        return [];
    }
}

export async function getPublicPackages(): Promise<IPackage[]> {
    try {
        const conn = await connectToDatabase();
        if (!conn) return [];
        const packages = await Package.find({ isHidden: false }).sort({ createdAt: -1 }).lean();
        return JSON.parse(JSON.stringify(packages));
    } catch {
        return [];
    }
}

export async function submitTestimonial(data: Partial<ITestimonial>) {
    try {
        await connectToDatabase();
        if (data.orderId) {
            const existing = await Testimonial.findOne({ orderId: data.orderId });
            if (existing) {
                return { success: false, error: 'Anda sudah mengirimkan testimoni untuk pesanan ini.' };
            }
        }
        const testimonial = await Testimonial.create(data);
        return { success: true, testimonialId: testimonial._id.toString() };
    } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
}

export async function getPublicTestimonials(): Promise<ITestimonial[]> {
    try {
        const conn = await connectToDatabase();
        if (!conn) return [];
        const testimonials = await Testimonial.find({ isVisible: true }).sort({ createdAt: -1 }).lean();
        return JSON.parse(JSON.stringify(testimonials));
    } catch {
        return [];
    }
}
