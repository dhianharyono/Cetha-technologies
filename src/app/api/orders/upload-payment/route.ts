import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Order from '@/models/Order';

export async function POST(req: Request) {
    try {
        await connectToDatabase();
        const { id, buktiTransfer } = await req.json();

        if (!id || !buktiTransfer) {
            return NextResponse.json({ error: 'ID and proof of payment are required' }, { status: 400 });
        }

        const order = await Order.findByIdAndUpdate(
            id,
            {
                buktiTransfer,
                statusPembayaran: 'Menunggu Verifikasi',
            },
            { new: true }
        );

        if (!order) {
            return NextResponse.json({ error: 'Order not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: order });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}
