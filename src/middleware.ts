import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decrypt } from './lib/auth';

const protectedRoutes = ['/admin'];
const publicRoutes = ['/admin/login'];

export async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route) && !publicRoutes.includes(path));

    // Also protect API routes starts with /api/admin
    const isProtectedApi = path.startsWith('/api/admin');

    if (isProtectedRoute || isProtectedApi) {
        const session = req.cookies.get('session')?.value;
        const payload = await decrypt(session);

        if (!payload?.userId) {
            if (isProtectedApi) {
                return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
            }
            return NextResponse.redirect(new URL('/admin/login', req.nextUrl));
        }
    }

    // Redirect to dashboard if trying to access login page while already logged in
    if (publicRoutes.includes(path)) {
        const session = req.cookies.get('session')?.value;
        const payload = await decrypt(session);

        if (payload?.userId) {
            return NextResponse.redirect(new URL('/admin', req.nextUrl));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)', '/api/admin/:path*'],
};
