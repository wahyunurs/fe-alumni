import axios from 'axios';
import { getToken } from '@/hooks/auth/authClient';
import { useState } from 'react';

type Announcement = {
    id: string;
    isi: string;
    judul: string;
    published_at: Date;
    updated_at: Date;
    user: string;
}

export function useAnnouncement(){
    const token = getToken();
    const [data, setData] = useState<Announcement[]>([]);

    const index = async (): Promise< Announcement[] | void> => {
        try {

            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/pengumumanAlumni` , {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (Array.isArray(data)) setData(data);

            return data;
            
        } catch (error) {

            console.log("Error", error);
            
            throw new Error("Error get announecement");
        }

    }

    const post = async (formData: FormData): Promise<void> => {
        try {

            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/pengumumanAlumni` , formData, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            return data;
            
        } catch (error) {

            console.log("Error", error);
            
            throw new Error("Error post announecement");
        }

    }

    const show = async (uuid: string): Promise< Announcement | undefined > => {
        try {

            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/pengumumanAlumni/${uuid}` , {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            return data;
            
        } catch (error) {

            console.log("Error", error);
            
            throw new Error("Error show announecement");
        }

    }

    const update = async (formData: FormData, uuid: string): Promise<void> => {
        try {

            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/pengumumanAlumni/${uuid}` , formData, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            return data;
            
        } catch (error) {

            console.log("Error", error);
            
            throw new Error("Error update announecement");
        }

    }

    const remove = async (uuid: string): Promise< Announcement | undefined > => {
        try {

            const { data } = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/pengumumanAlumni/${uuid}` , {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            return data;
            
        } catch (error) {

            console.log("Error", error);
            
            throw new Error("Error delete announecement");
        }

    }

    return { data, index, post, show, update, remove };
}