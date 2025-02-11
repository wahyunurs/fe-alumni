'use client';

import axios from 'axios';
import { useState } from 'react';
import { getToken } from '@/hooks/auth/authClient';

type Pagination = {
    currentPage: number;
    lastPage: number;
};

type Filter = {
    limit?: number;
    currentPage?: number;
};

type SurveiMitra = {
    id: number;
    name: string;
    name_alumni: string;
    kedisiplinan: string;
    kejujuran: string;
    motivasi: string;
    etos: string;
    moral: string;
    etika: string;
    bidang_ilmu: string;
    produktif: string;
    masalah: string;
    inisiatif: string;
    menulis_asing: string;
    komunikasi_asing: string;
    memahami_asing: string;
    alat_teknologi: string;
    adaptasi_teknologi: string;
    penggunaan_teknologi: string;
    emosi: string;
    percaya_diri: string;
    keterbukaan: string;
    kom_lisan: string;
    kom_tulisan: string;
    kepemimpinan: string;
    manajerial: string;
    masalah_kerja: string;
    motivasi_tempat_kerja: string;
    motivasi_diri: string;    
    created_at: Date;
    updated_at: Date;
};

export function useSurveiMitra() {
    const token = getToken();
    const [data, setData] = useState<SurveiMitra[]>([]);
    const [pagination, setPagination] = useState<Pagination>({ currentPage: 1, lastPage: 1 });

    const index = async (filter?: Filter): Promise<SurveiMitra[] | undefined> => {
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/surveiMitraAdmin`, {
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
            console.log("Error fetching Survei Mitra:", error);
            throw new Error('Error fetching Survei Mitra');
        }
    };

    return { data, pagination, index };
}
