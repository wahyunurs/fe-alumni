'use client';

import axios from "axios";
import { getToken } from '@/hooks/auth/authClient';
import { useState } from "react";

type DashboardAlumni = {
    persentaseTerlacak: number;
    totalAlumniTerlacak: number;
    totalAlumniAsli: number;
    totalAlumniTahunLulusSaatIni: number;
    bekerja: number;
    tidakBekerja: number;
    jumlahStatus: DAStatusCount;
    totalMitra: number;
    totalInstansiBekerja: number;
    totalInstansiMitra: number;
    totalSurveiAlumni: number;
}

type DAStatusCount = {
    ["Bekerja Full Time"]: number;
    ["Bekerja Part Time"]: number;
    ["Belum Memungkinkan Bekerja"]: number;
    ["Melanjutkan Pendidikan"]: number;
    ["Menikah/Mengurus Keluarga"]: number;
    ["Tidak Bekerja Tetapi Sedang Mencari Pekerjaan"]: number;
    ["Wirausaha"]: number;
}

export function useDashboardAdmin(){

    const [ data, setData ]= useState<DashboardAlumni>();

    const getDashboardAdmin = async () => {
        const token = getToken();

        try {

            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/dashboardAdmin`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (data) setData(data);

            
        } catch (error) {
            console.log("Error", error);
            throw new Error("Error get data");
        }
    }

    return { data, getDashboardAdmin }
}