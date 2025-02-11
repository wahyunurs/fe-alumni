'use client';

import axios from "axios";
import { useState } from "react";
import { getToken } from '@/hooks/auth/authClient';

type CheckMasaTunggu = {
    masaTungguCounts: MasaTungguCounts[]
    totalAlumni: number;
    tahunLulus: number;
}

type MasaTungguCounts = {
    name: string;
    count: number;
}

type StatusTracerStudy = {
    id: number;
    biaya_studi: string;
    bidang_job: string;
    created_at: Date;
    email: string;
    foto_profil: string;
    jabatan_job: string;
    jenjang_pendidikan: string;
    jns_job: string;
    jns_kelamin: string;
    lingkup_job: string;
    nama_job: string;
    name: string;
    nim: string;
    no_hp: string;
    program_studi: string;
    status: string;
    masa_tunggu: string;
    tahun_lulus: string;
    tahun_masuk: string;
    universitas: string;
    updated_at: string;
    user_id: number;

}

export function useMasaTunggu(){
    const token = getToken();
    const [data, setData] = useState<CheckMasaTunggu>();
    const [statusData, setStatusData] = useState<StatusTracerStudy[]>([]);
    const [tahunLulusData, setTahunLulusData] = useState<string[]>([]);

    const check = async ({ tahunLulus }: { tahunLulus?: string } = {}): Promise< CheckMasaTunggu | undefined> => {
        try {

            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/cekMasaTunggu` , {
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                params: {
                    tahun_lulus: tahunLulus ? tahunLulus : undefined
                }
            });
            
            const MasaTungguCounts = Object.entries(data.masaTungguCounts).map((entry) => ({ name: entry[0], count: entry[1] })) as MasaTungguCounts[] ;

            setData({
                masaTungguCounts: MasaTungguCounts,
                tahunLulus: data.tahunLulus,
                totalAlumni: data.totalAlumni,
            })
            
            return data;
            
        } catch (error) {
            console.log("Error", error);
            throw new Error("Error check masa tunggu");
        }

    }

    const status = async ({ status, tahunLulus  }: { status?: string, tahunLulus?: string; } = {}): Promise< StatusTracerStudy[] | undefined> => {
        try {
            
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/masaTunggu` , {
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                params: {
                    status: status ? status : undefined,
                    tahun_lulus: tahunLulus ? tahunLulus : undefined,
                }
            });

            if (data.data) setStatusData(data.data);
           
            return data;
            
        } catch (error) {
            console.log("Error", error);
            throw new Error("Error status tracer study");
        }

    }

    const tahunLulus = async (): Promise< string[] | undefined> => {
        try {
            
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/tahunLulusMasaTunggu` , {
                headers: {
                    "Authorization": `Bearer ${token}`
                },
            });

            if (data.tahunLulus) setTahunLulusData(data.tahunLulus);
           
            return data;
            
        } catch (error) {
            console.log("Error", error);
            throw new Error("Error status tracer study");
        }

    }

    
    

    return { data, statusData, tahunLulusData, check, status, tahunLulus };
}