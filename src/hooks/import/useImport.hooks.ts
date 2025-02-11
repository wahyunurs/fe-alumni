'use client';

import axios from "axios";
import { getToken } from '@/hooks/auth/authClient';

export function useImport(){

    const importExcel = async (formData: FormData) => {
        const token = getToken();

        try {

            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/importAlumni`, formData, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (data) return data;
            
        } catch (error) {
            console.log("Error", error);
            throw new Error("Error get data");
        }
    }

    return { importExcel }
}