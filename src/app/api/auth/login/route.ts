import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectToDatabase from '@/lib/db';
import Admin from '@/models/Admin';
import { createSession } from '@/lib/auth';

export async function POST(req: Request) {
    try {
        await connectToDatabase();
        const { username, password } = await req.json();

        if (!username || !password) {
            return NextResponse.json({ error: 'Username and password required' }, { status: 400 });
        }

        const isNewAdminExists = await Admin.findOne({ username: 'admincetha' });
        if (!isNewAdminExists) {
            const defaultPasswordHash = await bcrypt.hash('Digimon123!!', 10);
            await Admin.create({ username: 'admincetha', passwordHash: defaultPasswordHash });

            // Optional: delete old 'admin' if it exists just to cleanup
            await Admin.deleteOne({ username: 'admin' });
        }

        const admin = await Admin.findOne({ username });
        if (!admin) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        const isMatch = await bcrypt.compare(password, admin.passwordHash);
        if (!isMatch) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        // Create JWT Session
        await createSession(admin._id.toString());

        return NextResponse.json({ success: true, message: 'Login successful' });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
