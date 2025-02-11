import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { getUserServer, getTokenServer } from '@/hooks/auth/authServer';

export function middleware(request: NextRequest) {

	const basePath = process.env.NEXT_PUBLIC_BASEPATH;

	const user = getUserServer();
	const token = getTokenServer();

	if (request.nextUrl.pathname.startsWith('/auth')) if (token && user) return NextResponse.redirect(new URL(`${basePath}/dashboard`, request.url));
  
	if (request.nextUrl.pathname.startsWith('/dashboard'))if (!token && !user) return NextResponse.redirect(new URL(`${basePath}`, request.url));
  
}