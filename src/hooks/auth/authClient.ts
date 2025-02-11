'use client';

import axios from "axios";
import { setCookie, getCookie, deleteCookie } from 'cookies-next';

export type Sign = {
    error?: unknown, 
    data?: { 
        expires_in?: number, 
        message?: string, 
        token?: string, 
        user?: User
    }
}

export type User = {
    id?: string, 
    email?: string, 
    name?: string, 
    roles: Array<string>
}

export const getUser = (): User | null => {
    if (typeof window === 'undefined') return null;

    const user = getCookie('next-user');
    if (user) {
        try {
            return JSON.parse(String(user));
        } catch {
            console.error("Failed to parse user cookie");
        }
    }
    return null;
}

export const getToken = (): string | null => {
    if (typeof window === 'undefined') return null; 

    const token = getCookie('next-token');
    return token ? String(token) : null;
}

export const login = async (formData: FormData): Promise<Sign | undefined> => {
    try {
        const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/login`, formData);

        if (data?.token) await setCookie('next-token', data.token, { maxAge: 60 * 60 });
        if (data?.user) await setCookie('next-user', JSON.stringify(data.user), { maxAge: 60 * 60 });

        return { data };

    } catch (error: unknown ) {
        if (axios.isAxiosError(error)) {
            const message = error.response?.data?.error ?? "Login failed";
            console.error("Login error:", message);
            throw new Error(message);
        } else {
            console.error("An unexpected error occurred");
            throw new Error("An unexpected error occurred");
        }
    }
}

export const register = async (formData: FormData): Promise<Sign | undefined> => {
    try {
        const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/register`, formData);
        return { data };

    } catch (error) {
        console.error("Registration error:", error);
        throw new Error("Failed to register");
    }
}

export const verifyOtpRegister = async (formData: FormData): Promise<Sign | undefined> => {
    try {
        const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/verify-otp-email`, formData);
        return { data };

    } catch (error) {
        console.error("OTP verification error:", error);
        throw new Error("Failed to verify OTP");
    }
}

export const logout = async (): Promise<void> => {
    const token = getToken();
    if (!token) {
        console.warn("No token found for logout");
        return;
    }

    try {
        await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/logout`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

    } catch (error) {
        console.error("Logout error:", error);
        throw new Error("Failed to logout");
    } finally {
        deleteCookie('next-token');
        deleteCookie('next-user');
    }
}
