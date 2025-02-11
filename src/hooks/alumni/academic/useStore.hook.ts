import axios from 'axios';
import { create } from 'zustand';
import { getToken } from '@/hooks/auth/authClient';
import { useState } from 'react';

interface Academic {
    id?: number;
    user_id?: number;
    nama_studi?: string;
    jenjang_pendidikan?: string;
    prodi?: string;
    ipk?: string;
    tahun_masuk?: number;
    tahun_lulus?: number;
    kota?: string;
    negara?: string;
    catatan?: string;
    created_at?: string;
    updated_at?: string;
}

interface State {
    academics: Academic[];
    academic?: Academic;
    error?: string;
    success?: string;
    pagination?: {
        currentPage?: number,
        lastPage?: number,
    }
}

interface Action {
    getAcademics: (filter?: Filter) => Promise<void>;
    deleteAcademic: (uuid: string) => Promise<void>;
    detailAcademic: (uuid: string) => Promise<Academic | undefined | void>;
    postAcademic: (data: Academic | FormData | unknown ) => Promise<void>;
    updateAcademic: (data: Academic | FormData | unknown , uuid: string) => Promise<void>;
}

interface Filter {
    limit?: number;
    currentPage?: number;
}

interface Pagination {
    currentPage: number;
    lastPage: number;
}

export const useAcademic = create<State & Action>((set) => ({
    // * States
    academics: [],
    error: "",
    success: "",
    pagination: { currentPage: 1 },

    // * Actions
    getAcademics: async (filter?: Filter) => {

        const token = getToken();
        set({ error: "", success: "" });

        const currentPage = useAcademic.getState().pagination?.currentPage || 5;

        try {

            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/academicAlumni`, {
                params: {
                    page: filter?.currentPage ? filter.currentPage : currentPage,
                },
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.data) {
                const value = response.data;

                if (value.data) set({ academics: value.data });
                if (value.last_page) set({ pagination: { lastPage: value.last_page } });
            }

            

        } catch (error) {

            console.error("Error fetching academics:", error);

            set({ error: "Error fetching academics" });

            throw new Error("Error fetch academic");

        }
    },

    deleteAcademic: async (uuid: string) => {

        const token = getToken();
        set({ error: "", success: "" });

        try {

            const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/academicAlumni/${uuid}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });


            if (response) set({ success: "Success deleting data" });

            
        } catch (error) {

            console.error("Error deleting academic:", error);

            set({ error: "Error deleting academic" });

            throw new Error("Error delete academic");
            
        }
    },

    detailAcademic: async (uuid: string) => {

        const token = getToken();
        set({ error: "", success: "" });

        try {

            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/academicAlumni/${uuid}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });


            if (response.data) {

                set({ success: "Success get data" });

                return response.data;
            }

            
        } catch (error) {

            console.error("Error get academic:", error);

            set({ error: "Error get academic" });

            throw new Error("Error get academic");
            
        }

    },

    postAcademic: async (data) => {

        const token = getToken();
        set({ error: "", success: "" });

        try {            

            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/academicAlumni`, data, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response) set({ success: "Success create academic" })
            
        } catch (error) {

            console.error("Error create academic:", error);

            set({ error: "Error create academic" });
            
            throw new Error("Error post academic");
        }
    },

    updateAcademic: async (data, uuid) => {

        const token = getToken();
        set({ error: "", success: "" });

        try {            

            const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/academicAlumni/${uuid}`, data, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response) set({ success: "Success updating academic" })
            
        } catch (error) {

            console.error("Error updating academic:", error);

            set({ error: "Error updating academic" });
            
            throw new Error("Error update academic");
        }

    }
}));


export function useAcademicMhs(){

    const token = getToken();

    const [ data, setData ] = useState<Academic[]>([]);
    const [ pagination, setPagination] = useState<Pagination>({ currentPage: 1, lastPage: 1 });

    const get = async (filter?: Filter): Promise<Academic[] | unknown> => {

        try {

            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/academicMhs`, {
                params: {
                    page: filter?.currentPage ? filter.currentPage : pagination.currentPage,
                },
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            
            if (data.data) setData(data.data);
            if (data.last_page) setPagination({ ...pagination, lastPage: data.last_page });
            
            return data.data;

        } catch (error) {
            console.error("Error fetching academics:", error);
            throw new Error("Error fetch academic");
        }

    }

    const store = async ( formData: URLSearchParams ) => {
        try {            

            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/academicMhs`, formData, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            return data;

        } catch (error) {
            console.error("Error create academic:", error);            
            throw new Error("Error post academic");
        }
    }

    const show = async ( uuid: string ) => {
        try {

            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/academicMhs/${uuid}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            return data;
            
        } catch (error) {
            console.error("Error get academic:", error);
            throw new Error("Error get academic");
        }
    }

    const update = async ( uuid: string, formData: URLSearchParams ) => {
        try {            
            const { data } = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/academicMhs/${uuid}`, formData, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            return data;
            
        } catch (error) {
            console.error("Error updating academic:", error);
            throw new Error("Error update academic");
        }
    }

    const remove = async (uuid: string) => {
        try {

            const { data } = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/academicMhs/${uuid}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            return data;
            
        } catch (error) {
            console.error("Error deleting academic:", error);
            throw new Error("Error delete academic");
        }
    }

    return { data, pagination, get, store, show, update, remove }
}