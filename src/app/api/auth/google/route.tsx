import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export function GET(request: NextRequest) {

    const id = request.nextUrl.searchParams.get("id");
    const userId = decodeURIComponent(request.nextUrl.searchParams.get("user[id]") || '');
    const userName = decodeURIComponent(request.nextUrl.searchParams.get("user[name]") || '');
    const userEmail = decodeURIComponent(request.nextUrl.searchParams.get("user[email]") || '');
    const userRoles = decodeURIComponent(request.nextUrl.searchParams.get("user[roles]") || '');
    const token = request.nextUrl.searchParams.get("token");

    console.log('Extracted Parameters:', { id, userId, userName, userEmail, userRoles, token });

    if (!token || !id || !userId || !userName || !userEmail || !userRoles) {
        return NextResponse.json({ message: "Invalid SSO Callback parameters", params: { id, userId, userName, userEmail, userRoles, token } }, { status: 400 });
    }

    try {
        const decodedUser = {
            id: userId,
            name: userName,
            email: userEmail,
            roles: [userRoles]
        };

        cookies().set("next-token", token, { maxAge: 60 * 60 });
        cookies().set("next-user", JSON.stringify(decodedUser), { maxAge: 60 * 60 });

        const redirectUrl = new URL('/Alumni/dashboard', request.nextUrl.origin);
        console.log('Redirecting to:', redirectUrl.toString());
        return NextResponse.redirect(redirectUrl);

    } catch (error) {
        if (error instanceof Error) {
            console.error('Error handling SSO callback:', error);
            return NextResponse.json({ error: 'Failed to handle SSO callback.', details: error.message }, { status: 500 });
        } else {
            console.error('Unknown error handling SSO callback:', error);
            return NextResponse.json({ error: 'Failed to handle SSO callback.', details: 'Unknown error occurred' }, { status: 500 });
        }
    }
}
