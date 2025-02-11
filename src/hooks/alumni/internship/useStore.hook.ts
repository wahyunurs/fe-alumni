'use client';

import axios from "axios";
import { useState } from "react";
import { getToken } from '@/hooks/auth/authClient';

interface Internship {
    id: number;

    nama_intern: string;
    bulan_masuk_intern: string;
    periode_masuk_intern: number;
    bulan_keluar_intern: string;
    periode_keluar_intern: number;
    jabatan_intern: string;
    kota: string;
    negara: string;
    catatan: string;
   
    created_at: string;
    updated_at: string;
}

interface Filter {
    limit?: number;
    currentPage?: number;
}

interface Pagination {
    currentPage: number;
    lastPage: number;
}


export function useInternship() {

    const token = getToken();

    const [data, setData] = useState<Internship[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [pagination, setPagination] = useState<Pagination>({ currentPage: 1, lastPage: 1 });

    const getInternship = async (filter?: Filter) => {

        try {

            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/internshipAlumni`, {
                params: {
                    page: filter?.currentPage ? filter.currentPage : pagination.currentPage,
                },
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            if (response.data) {

                const value = response.data;

                if (value.data) setData(value.data);
                if (value.last_page) setPagination({ ...pagination, lastPage: value.last_page });
            }

            
        } catch (error) {

            console.log("Error", error);

            setError("Error fetching internships");
            
            throw new Error("Error fetch internship");
        }
    }

    const deleteInternship = async (uuid: string) => {

        try {

            const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/internshipAlumni/${uuid}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.data) setSuccess("Success delete internships");

            
        } catch (error) {

            console.log("Error", error);

            setError("Error delete internships");
            
            throw new Error("Error delete internship");
        }

    }

    const detailInternship = async (uuid: string): Promise<Internship | undefined> => {

        try {

            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/internshipAlumni/${uuid}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.data) {

                setSuccess("Success show internships");

                return response.data;
            }

            
        } catch (error) {

            console.log("Error", error);

            setError("Error show internships");
            
            throw new Error("Error show internship");
        }

    }

    const updateInternship = async (data: Internship | FormData | unknown, uuid: string): Promise<void> => {


        try {

            const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/internshipAlumni/${uuid}`, data , {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.data) setSuccess("Success update internships");
            
        } catch (error) {

            console.log("Error", error);

            setError("Error update internships");
         
            throw new Error("Error udpate internship");
        }
    }

    const postInternship = async(data: Internship | FormData | unknown): Promise<void> => {

        try {

            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/internshipAlumni`, data , {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.data) setSuccess("Success create internships");
            
            
        } catch (error) {

            console.log("Error", error);

            setError("Error create internships");

            throw new Error("Error create internship");
        }

    }

    return { data, error, success, pagination, getInternship, detailInternship, updateInternship, postInternship, deleteInternship }

}