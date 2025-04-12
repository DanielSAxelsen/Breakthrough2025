import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';
import { NextRequest } from 'next/server';

export const config = {
    matcher: ['/', '/((?!api|_next|_vercel|.*\\..*).*)']
};

export function middleware(request: NextRequest) {
    return createMiddleware(routing)(request);
}


