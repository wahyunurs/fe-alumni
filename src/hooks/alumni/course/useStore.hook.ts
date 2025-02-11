'use client';

import axios from "axios";
import { useState } from "react";
import { getToken } from '@/hooks/auth/authClient';

interface Course {
    id: number;

    nama_course: string;
    institusi_course: string;
    tingkat_course: string;
    tahun_course: number;
   
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


export function useCourse() {

    const token = getToken();

    const [data, setData] = useState<Course[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [pagination, setPagination] = useState<Pagination>({ currentPage: 1, lastPage: 1 });

    const getCourses = async (filter?: Filter) => {

        try {

            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/courseAlumni`, {
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

            setError("Error fetching course");
            
            throw new Error("Error fetch course");
        }
    }

    const deleteCourse = async (uuid: string) => {

        try {

            const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/courseAlumni/${uuid}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.data) setSuccess("Success delete course");

            
        } catch (error) {

            console.log("Error", error);

            setError("Error delete course");
            
            throw new Error("Error delete course");
        }

    }

    const detailCourse = async (uuid: string): Promise<Course | undefined> => {

        try {

            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/courseAlumni/${uuid}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.data) {

                setSuccess("Success show courses");

                return response.data;
            }

            
        } catch (error) {

            console.log("Error", error);

            setError("Error show courses");
            
            throw new Error("Error show course");
        }

    }

    const updateCourse = async (data: Course | FormData | unknown, uuid: string): Promise<void> => {


        try {

            const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/courseAlumni/${uuid}`, data , {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.data) setSuccess("Success update courses");
            
        } catch (error) {

            console.log("Error", error);

            setError("Error update courses");
            
            throw new Error("Error update course");
        }
    }

    const postCourse = async(data: Course | FormData | unknown): Promise<void> => {

        try {

            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/courseAlumni`, data , {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.data) setSuccess("Success update courses");
            
            
        } catch (error) {

            console.log("Error", error);

            setError("Error create courses");

            throw new Error("Error create course");
        }

    }

    return { data, error, success, pagination, getCourses, detailCourse, postCourse, updateCourse, deleteCourse }

}

export function useCourseMhs() {

    const token = getToken();

    const [data, setData] = useState<Course[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [pagination, setPagination] = useState<Pagination>({ currentPage: 1, lastPage: 1 });

    const getCourses = async (filter?: Filter) => {

        try {

            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/courseAlumni`, {
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

            setError("Error fetching course");
            
            throw new Error("Error fetch course");
        }
    }

    const deleteCourse = async (uuid: string) => {

        try {

            const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/courseAlumni/${uuid}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.data) setSuccess("Success delete course");

            
        } catch (error) {

            console.log("Error", error);

            setError("Error delete course");
            
            throw new Error("Error delete course");
        }

    }

    const detailCourse = async (uuid: string): Promise<Course | undefined> => {

        try {

            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/courseAlumni/${uuid}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.data) {

                setSuccess("Success show courses");

                return response.data;
            }

            
        } catch (error) {

            console.log("Error", error);

            setError("Error show courses");
            
            throw new Error("Error show course");
        }

    }

    const updateCourse = async (data: Course | FormData | unknown, uuid: string): Promise<void> => {


        try {

            const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/courseAlumni/${uuid}`, data , {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.data) setSuccess("Success update courses");
            
        } catch (error) {

            console.log("Error", error);

            setError("Error update courses");
            
            throw new Error("Error update course");
        }
    }

    const postCourse = async(data: Course | FormData | unknown): Promise<void> => {

        try {

            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/courseAlumni`, data , {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.data) setSuccess("Success update courses");
            
            
        } catch (error) {

            console.log("Error", error);

            setError("Error create courses");

            throw new Error("Error create course");
        }

    }

    return { data, error, success, pagination, getCourses, detailCourse, postCourse, updateCourse, deleteCourse }

}