import axios from 'axios';
import { getToken } from '@/hooks/auth/authClient';
import { useState } from 'react';

export type DataMitra = {
    id: number;
    nama_job: string; 
    jns_job: string; 
    lingkup_job: string; 
    kota: string; 
    alamat: string; 
};

export type DataMitraDetail = {
    id: number;
    nama_job: string;
    jns_job: string;
    lingkup_job: string; 
    kota: string; 
    alamat: string; 
};

export function useDataMitra() {
    const token = getToken();
    const [data, setData] = useState<DataMitra[]>([]);
    const [detail, setDetail] = useState<DataMitra | null>(null);

    const getAllDataMitra = async (): Promise<DataMitra[] | undefined> => {
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/dataMitra`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (Array.isArray(data)) {
                setData(data); 
            }

            return data;
        } catch (error) {
            console.error("Error fetching all mitra data", error);
            throw new Error("Error fetching all mitra data");
        }
    };

    const getDataMitra = async ({ keyword }: { keyword?: string }): Promise<DataMitra[] | undefined> => {
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/dataMitra/search`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
                params: {
                    keyword: keyword ? keyword : undefined,
                },
            });

            if (Array.isArray(data)) setData(data);

            return data;
        } catch (error) {
            console.error("Error fetching mitra data", error);
            throw new Error("Error fetching mitra data");
        }
    };

    const getDetailMitra = async (id: number): Promise<DataMitra | undefined> => {
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/dataMitra/${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });
           
            setDetail(data);
    
            return data;
        } catch (error) {
            console.error("Error fetching mitra details for ID:", id, error);
            throw new Error("Error fetching mitra details");
        }
    };
    
    

    return { data, detail, setDetail, getAllDataMitra, getDataMitra,  getDetailMitra };
}
