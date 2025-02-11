'use client';

import axios from "axios";
import { useState } from "react";
import { getToken } from '@/hooks/auth/authClient';

type Pagination = {
    currentPage: number;
    lastPage: number;
}

type Filter = {
    limit?: number;
    currentPage?: number;
}

type Statistik = {
    id: number;
    alumni_terlacak: number;
    alumni_total: number;
    tahun_lulus: number;
    created_at: Date;
    updated_at: Date;
}

export function useStatistik(){
    const token = getToken();
    const [data, setData] = useState<Statistik[]>([]);
    const [pagination, setPagination] = useState<Pagination>({ currentPage: 1, lastPage: 1 });

    const index = async (filter?: Filter): Promise< Statistik[] | undefined> => {
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/statistik` , {
                params: {
                    page: filter?.currentPage ? filter.currentPage : pagination.currentPage,
                },
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (Array.isArray(data.data)) setData(data.data);
            if (data.last_page) setPagination({ ...pagination, lastPage: data.last_page });

            return data.data;
            
        } catch (error) {
            console.log("Error", error);
            throw new Error("Error index statistik");
        }

    }

    const show = async (uuid: string): Promise< Statistik | undefined> => {
        try {

            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/statistik/${uuid}` , {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            return data.data;
            
        } catch (error) {
            console.log("Error", error);
            throw new Error("Error show statistik");
        }

    }

    const update = async (formData: FormData | URLSearchParams, uuid: string): Promise< Statistik | undefined> => {
        try {

            const { data } = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/statistik/${uuid}` , formData, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            return data.data;
            
        } catch (error) {
            console.log("Error", error);
            throw new Error("Error update statistik");
        }

    }

    const post = async (formData: FormData | URLSearchParams): Promise< Statistik | undefined> => {
        try {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/statistik` , formData, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            return data.data;
            
        } catch (error) {
            console.log("Error", error);
            throw new Error("Tahun statistik yang anda inputkan sudah tersedia!");
        }

    }

    const remove = async (uuid: string): Promise< Statistik | undefined> => {
        try {

            const { data } = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/statistik/${uuid}` , {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            return data.data;
            
        } catch (error) {
            console.log("Error", error);
            throw new Error("Error remove statistik");
        }

    }
    

    return { data, pagination, index, remove, show, update, post };
}