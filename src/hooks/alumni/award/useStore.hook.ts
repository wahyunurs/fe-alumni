'use client';

import axios from "axios";
import { useState } from "react";
import { getToken } from '@/hooks/auth/authClient';

interface Award {
    id: number;
    user_id: number;
    nama_award: string;
    institusi_award: string;
    tingkat_award: string;
    tahun_award: number;
    deskripsi_award: string;
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


export function useAward(){

    const token = getToken();

    const [data, setData] = useState<Award[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [pagination, setPagination] = useState<Pagination>({ currentPage: 1, lastPage: 1 });

    const getAwards = async (filter?: Filter) => {

        try {

            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/awardAlumni`, {
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

            setError("Error fetching awards");

            throw new Error("Error fetch awards");
            
        }


    }

    const deleteAward = async (uuid: string) => {

        try {

            const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/awardAlumni/${uuid}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.data) setSuccess("Success delete award");

            
        } catch (error) {

            console.log("Error", error);

            setError("Error delete award");
            
            throw new Error("Error delete awards");
        }

    }

    const detailAward = async (uuid: string): Promise<Award | undefined> => {

        try {

            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/awardAlumni/${uuid}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.data) {

                setSuccess("Success show award");

                return response.data;
            }

            
        } catch (error) {

            console.log("Error", error);

            setError("Error show award");
            
            throw new Error("Error show awards");
        }

    }

    const updateAward = async (data: Award | FormData | unknown, uuid: string): Promise<void> => {


        try {

            const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/awardAlumni/${uuid}`, data , {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.data) setSuccess("Success update award");
            
        } catch (error) {

            console.log("Error", error);

            setError("Error update award");
            
            throw new Error("Error update awards");
        }
    }

    const postAward = async(data: Award | FormData | unknown): Promise<void> => {

        try {

            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/awardAlumni`, data , {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.data) setSuccess("Success update award");
            
            
        } catch (error) {

            console.log("Error", error);

            setError("Error create award");

            throw new Error("Error create awards");
        }

    }

    return { data, error, success, pagination, getAwards, deleteAward, detailAward, updateAward, postAward }; 
}

export function useAwardMhs(){

    const token = getToken();

    const [data, setData] = useState<Award[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [pagination, setPagination] = useState<Pagination>({ currentPage: 1, lastPage: 1 });

    const getAwards = async (filter?: Filter) => {

        try {

            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/awardMhs`, {
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

            setError("Error fetching awards");

            throw new Error("Error fetch awards");
            
        }


    }

    const deleteAward = async (uuid: string) => {

        try {

            const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/awardMhs/${uuid}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.data) setSuccess("Success delete award");

            
        } catch (error) {

            console.log("Error", error);

            setError("Error delete award");
            
            throw new Error("Error delete awards");
        }

    }

    const detailAward = async (uuid: string): Promise<Award | undefined> => {

        try {

            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/awardMhs/${uuid}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.data) {

                setSuccess("Success show award");

                return response.data;
            }

            
        } catch (error) {

            console.log("Error", error);

            setError("Error show award");
            
            throw new Error("Error show awards");
        }

    }

    const updateAward = async (data: Award | FormData | unknown, uuid: string): Promise<void> => {


        try {

            const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/awardMhs/${uuid}`, data , {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.data) setSuccess("Success update award");
            
        } catch (error) {

            console.log("Error", error);

            setError("Error update award");
            
            throw new Error("Error update awards");
        }
    }

    const postAward = async(data: Award | FormData | unknown): Promise<void> => {

        try {

            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/awardMhs`, data , {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.data) setSuccess("Success update award");
            
            
        } catch (error) {

            console.log("Error", error);

            setError("Error create award");

            throw new Error("Error create awards");
        }

    }

    return { data, error, success, pagination, getAwards, deleteAward, detailAward, updateAward, postAward }; 
}