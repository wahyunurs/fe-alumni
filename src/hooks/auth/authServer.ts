"use server";

import { cookies } from 'next/headers';
import { getCookie } from 'cookies-next';

type User = {
    id?:string, 
    email?: string, 
    name?: string, 
    roles: Array<string>
}

export const getUserServer = (): User | null  => {
    const user = getCookie('next-user', { cookies });

    if (user) {
        const parsedUser = JSON.parse(String(user));
        return parsedUser;
    }

    return null;
}

export const getTokenServer = (): string | null => {
    const token = getCookie('next-token', { cookies });

    if (token) return token;

    return null;
}