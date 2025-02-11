'use client';

import axios from "axios";
import { useState } from "react";
import { getToken } from '@/hooks/auth/authClient';

interface Organization {
    id: number;

    nama_org: string;
    bulan_masuk_org: string;
    periode_masuk_org: number;
    bulan_keluar_org: string;
    periode_keluar_org: number;
    jabatan_org: string;
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


export function useOrganization() {

    const token = getToken();

    const [data, setData] = useState<Organization[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [pagination, setPagination] = useState<Pagination>({ currentPage: 1, lastPage: 1 });

    const getOrganization = async (filter?: Filter) => {

        try {

            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/organizationAlumni`, {
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

            setError("Error fetching organizations");
            
            throw new Error("Error fetch organizations")
        }
    }

    const deleteOrganization = async (uuid: string) => {

        try {

            const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/organizationAlumni/${uuid}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.data) setSuccess("Success delete organizations");

            
        } catch (error) {

            console.log("Error", error);

            setError("Error delete organizations");
            
            throw new Error("Error delete organizations")
        }

    }

    const detailOrganization = async (uuid: string): Promise<Organization | undefined> => {

        try {

            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/organizationAlumni/${uuid}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.data) {

                setSuccess("Success show organizations");

                return response.data;
            }

            
        } catch (error) {

            console.log("Error", error);

            setError("Error show organizations");
            
            throw new Error("Error show organizations")
        }

    }

    const updateOrganization = async (data: Organization | FormData | unknown, uuid: string): Promise<void> => {


        try {

            const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/organizationAlumni/${uuid}`, data , {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.data) setSuccess("Success update organizations");
            
        } catch (error) {

            console.log("Error", error);

            setError("Error update organizations");
            
            throw new Error("Error update organizations")
        }
    }

    const postOrganization = async(data: Organization | FormData | unknown): Promise<void> => {

        try {

            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/organizationAlumni`, data , {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.data) setSuccess("Success create organizations");
            
            
        } catch (error) {

            console.log("Error", error);

            setError("Error create organizations");

            throw new Error("Error create organizations")
        }

    }

    return { data, error, success, pagination, getOrganization, detailOrganization, updateOrganization, postOrganization, deleteOrganization }

}