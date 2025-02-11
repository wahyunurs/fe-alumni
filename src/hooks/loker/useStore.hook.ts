import axios from 'axios';
import { getToken } from '@/hooks/auth/authClient';
import { useState } from 'react';

export type Loker = {
    id: number;
    user_id: number;
    Alamat: string;
    Deskripsi: string;
    Email: string;
    Gaji: string;
    Logo: string;
    MasaBerlaku: string;
    NamaPerusahaan: string;
    Pengalaman: string;
    Posisi: string;
    no_hp: string;
    Tags: string;
    TipeKerja: string;
    Verify: string;
    Website: string;
    created_at: string;
    updated_at: string;
}

export type Filter = {
    TipeKerja?: string
    Pengalaman?: string
    tags?: string
}

export function useLokerAlumni(){
    const token = getToken();
    const [data, setData] = useState<Loker[]>([]);
    const [manageData, setManageData] = useState<Loker[]>([]);

    const manage = async (): Promise< Loker[] | void> => {
        try {

            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/manageLoker` , {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (Array.isArray(data)) setManageData(data);

            return data;
            
        } catch (error) {

            console.log("Error", error);
            
            throw new Error("Error manage loker");
        }

    }

    const index = async (filter: Filter | undefined): Promise< Loker[] | void> => {
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/loker`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                params: {
                    TipeKerja: filter?.TipeKerja ? filter.TipeKerja : undefined,
                    Pengalaman: filter?.Pengalaman ? filter.Pengalaman : undefined,
                    tags: filter?.tags? filter.tags: undefined,
                }
            });

            if (Array.isArray(data.data)) setData(data.data);

            return data.lokers;
        } catch (error) {
            console.error("Error fetching lokers:", error);
            
            throw new Error("Error index loker");
        }
    };

    const show = async (uuid: string): Promise<Loker | undefined> => {
        try {

            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/loker/${uuid}` , {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            return data;
            
        } catch (error) {

            console.log("Error", error);
            
            throw new Error("Error show loker");
        }

    }

    const post = async (formData : FormData | URLSearchParams): Promise<void> => {
        try {

            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/loker`, formData , {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            return data;
            
        } catch (error) {

            console.log("Error", error);
            
            throw new Error("Error post loker");
        }

    }

    const update = async (uuid: string, formData : FormData | URLSearchParams): Promise<void> => {
        try {

            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/loker/${uuid}`, formData , {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            return data;
            
        } catch (error) {

            console.log("Error", error);
            
            throw new Error("Error update loker");
        }

    }

    const remove = async (uuid: string): Promise<void> => {
        try {

            const { data } = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/loker/${uuid}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            return data;
            
        } catch (error) {

            console.log("Error", error);
            
            throw new Error("Error delete loker");
        }

    }

    return { data, manageData, index, show, post, manage, update, remove };
}

export function useLokerAdmin(){
    const token = getToken();
    const [data, setData] = useState<Loker[]>([]);
    const [manageData, setManageData] = useState<Loker[]>([]);

    const manage = async (): Promise< Loker[] | void> => {
     
        try {

            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/managelokerAdmin` , {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (Array.isArray(data.data)) setManageData(data.data);

            return data;
            
        } catch (error) {
            console.log("Error", error);
          
            throw new Error("Error manage loker");
            
        }
        

    }

    const index = async (filter: Filter | undefined): Promise<Loker[] | void> => {
        try {

            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/lokerAdmin`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                params: {
                    TipeKerja: filter?.TipeKerja ? filter.TipeKerja : undefined,
                    Pengalaman: filter?.Pengalaman ? filter.Pengalaman : undefined,
                    tags: filter?.tags? filter.tags: undefined,
                }
            });

            if (Array.isArray(data.data)) setData(data.data);
            
            return data;

        } catch (error) {
            console.log("Error index loker:", error);
  
            setData([]);
            return [];
        }
    };


    const show = async (uuid: string): Promise<Loker | undefined> => {
        try {

            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/lokerAdmin/${uuid}` , {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            return data.data;
            
        } catch (error) {

            console.log("Error", error);
            
            throw new Error("Error show loker");
        }

    }

    const post = async (formData : FormData | URLSearchParams): Promise<void> => {
        try {

            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/lokerAdmin`, formData , {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            return data;
            
        } catch (error) {

            console.log("Error", error);
            
            throw new Error("Error post loker");
        }

    }

    const update = async (uuid: string, formData : FormData | URLSearchParams): Promise<void> => {
        try {

            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/lokerAdmin/${uuid}`, formData , {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            return data;
            
        } catch (error) {

            console.log("Error", error);
            
            throw new Error("Error update loker");
        }

    }

    const remove = async (uuid: string): Promise<void> => {
        try {

            const { data } = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/lokerAdmin/${uuid}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            return data;
            
        } catch (error) {

            console.log("Error", error);
            
            throw new Error("Error delete loker");
        }

    }

    const verify = async (uuid: string, formData: FormData): Promise<Loker | undefined> => {
        try {

            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/lokerAdmin/${uuid}/verify`, formData, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            return data;
            
        } catch (error) {

            console.log("Error", error);
            
            throw new Error("Error show loker");
        }

    }

    return { data, manageData, index, show, post, manage, update, remove, verify };
}

export function useLokerMitra(){
    const token = getToken();
    const [data, setData] = useState<Loker[]>([]);
    const [manageData, setManageData] = useState<Loker[]>([]);

    const manage = async (): Promise< Loker[] | void> => {
        try {

            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/managelokerMitra` , {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (Array.isArray(data)) setManageData(data);

            return data;
            
        } catch (error) {

            console.log("Error", error);
            
            throw new Error("Error manage loker");
        }

    }

    const index = async (filter: Filter | undefined): Promise< Loker[] | void> => {
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/lokerMitra`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                params: {
                    TipeKerja: filter?.TipeKerja ? filter.TipeKerja : undefined,
                    Pengalaman: filter?.Pengalaman ? filter.Pengalaman : undefined,
                    tags: filter?.tags? filter.tags: undefined,
                }
            });

            if (Array.isArray(data.data)) setData(data.data);

            return data.lokers;
        } catch (error) {
            console.error("Error fetching lokers:", error);
            
            throw new Error("Error index loker");
        }
    };

    const show = async (uuid: string): Promise<Loker | undefined> => {
        try {

            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/lokerMitra/${uuid}` , {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            return data;
            
        } catch (error) {

            console.log("Error", error);
            
            throw new Error("Error show loker");
        }

    }

    const post = async (formData : FormData | URLSearchParams): Promise<void> => {
        try {

            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/lokerMitra`, formData , {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            return data;
            
        } catch (error) {

            console.log("Error", error);
            
            throw new Error("Error post loker");
        }

    }

    const update = async (uuid: string, formData : FormData | URLSearchParams): Promise<void> => {
        try {

            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/lokerMitra/${uuid}`, formData , {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            return data;
            
        } catch (error) {

            console.log("Error", error);
            
            throw new Error("Error update loker");
        }

    }

    const remove = async (uuid: string): Promise<void> => {
        try {

            const { data } = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/lokerMitra/${uuid}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            return data;
            
        } catch (error) {

            console.log("Error", error);
            
            throw new Error("Error delete loker");
        }

    }

    return { data, manageData, index, show, post, manage, update, remove };
}