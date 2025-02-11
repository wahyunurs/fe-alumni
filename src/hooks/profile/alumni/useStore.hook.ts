import axios from "axios";
import { useState } from "react"
import { getToken } from '@/hooks/auth/authClient';

export type Alumni = {
    name: string;
    email: string;
    foto_profil: string;
    jns_kelamin: string;
    nim: string;
    tahun_masuk: string;
    tahun_lulus: string;
    no_hp: string;
    status: string;
    bidang_job: string;
    jns_job: string;
    nama_job: string;
    jabatan_job: string;
    lingkup_job: string;
    bulan_masuk_job: string;
    biaya_studi: string;
    jenjang_pendidikan: string;
    universitas: string;
    program_studi: string;
    masa_tunggu: string;
    mulai_studi: string;
}

export function useProfile(){
    const token = getToken();

    const [data, setData] = useState<Alumni | undefined>();
    const [error, setError] = useState<string | undefined>();

    const getDataAlumni = async (): Promise<void> => {
        setError("");

        try {

            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/profilealumni`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response?.data?.data) setData(response?.data?.data);
            
        } catch (error) {
            console.log(error);
            setError("Failed to get profile");
            throw new Error("Failed to get profile");
        }
    }

    const changePasswordAlumni = async (data: FormData | URLSearchParams): Promise<void> => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/change-password`, data, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            return response.data;
            
        } catch (error) {
            console.log(error);
            setError("Failed to change password");
            throw new Error("Failed to change password");
        }
    }

    const uploadPhotoAlumni = async (data: FormData): Promise<void> => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/profilealumni`, data, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            return response.data;
            
        } catch (error) {
            console.log(error);
            setError("Failed to upload photo");
            throw new Error("Failed to upload photo");
        }
    }

    const getDataAdmin = async (): Promise<void> => {
        setError("");

        try {

            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/admin/profile`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response?.data?.data) setData(response?.data?.data);
            
        } catch (error) {
            console.log(error);
            setError("Failed to get profile");
            throw new Error("Failed to get profile");
        }
    }

    const changePasswordAdmin = async (data: FormData | URLSearchParams): Promise<void> => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/admin/profile/update-password`, data, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            return response.data;
            
        } catch (error) {
            console.log(error);
            setError("Failed to change password");
            throw new Error("Failed to change password");
        }
    }

    const uploadPhotoAdmin = async (data: FormData): Promise<void> => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/admin/profile/upload`, data, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            return response.data;
            
        } catch (error) {
            console.log(error);
            setError("Failed to upload photo");           
            throw new Error("Failed to upload photo");
        }
    }

    const updateDataAlumni = async (formData: URLSearchParams): Promise<void> => {
        try {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/profilealumni/edit`, formData, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            return data
        } catch (error) {
            console.log(error);
            throw new Error("Failed to change data alumni");
        }
    }

    const getDataMitra = async (): Promise<void> => {
        setError("");

        try {

            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/mitra/profile`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response?.data?.data) setData(response?.data?.data);
            
        } catch (error) {
            console.log(error);
            setError("Failed to get profile");
            throw new Error("Failed to get profile");
        }
    }

    const changePasswordMitra = async (data: FormData | URLSearchParams): Promise<void> => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/mitra/profile/update-password`, data, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            return response.data;
            
        } catch (error) {
            console.log(error);
            setError("Failed to change password");
            throw new Error("Failed to change password");
        }
    }

    const uploadPhotoMitra = async (data: FormData): Promise<void> => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/mitra/profile/upload`, data, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            return response.data;
            
        } catch (error) {
            console.log(error);
            setError("Failed to upload photo");           
            throw new Error("Failed to upload photo");
        }
    }
    
    return { data, error, getDataAlumni, getDataAdmin, getDataMitra, changePasswordAlumni, uploadPhotoAlumni, changePasswordAdmin, uploadPhotoAdmin, updateDataAlumni, changePasswordMitra, uploadPhotoMitra };

}