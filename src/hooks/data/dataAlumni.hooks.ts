import axios from 'axios';
import { getToken } from '@/hooks/auth/authClient';
import { useState } from 'react';

type DataAlumni = {
    foto_profil: any;
    id: number;
    name: string;
    email: string;
    user_id: number;
    ipk: string;
    tahun_lulus: number;
    status: string;
    no_hp: string;
    interest_id: number;
    interests_name: string;
    nama_award: string;
    kerjasama_skill: string;
    ahli_skill: string;
    inggris_skill: string;
    komunikasi_skill: string;
    pengembangan_skill: string;
    kepemimpinan_skill: string;
    etoskerja_skill: string;
}

type TypeDataDetailAlumni = {
    academics: TypeAcademic[]
    awards: TypeAward[]
    courses: TypeCourses[]
    internships: TypeInternships[]
    jobs: TypeJobs[]
    organizations: TypeOrganizations[]
    skills: TypeSkills[]
}

type TypeAcademic = {
    catatan: string
    created_at: Date
    id: number
    ipk: string
    jenjang_pendidikan: string
    kota: string
    nama_studi: string
    negara: string
    prodi: string
    tahun_lulus: number
    tahun_masuk: number
    updated_at: Date
    user_id: number
}

type TypeAward = {
    created_at: Date
    deskripsi_award: string
    id: number
    institusi_award: string
    nama_award: string
    tahun_award: number
    tingkat_award: string
    updated_at: Date
    user_id: number
}
interface Interest {
    id: number;
    user_id: number;
    interest_id: string;
    created_at: string;
    updated_at: string;
    name: string;
}

type TypeCourses = {
    created_at: Date
    id: number
    institusi_course: string
    nama_course: string
    tahun_course: number
    tingkat_course: string
    updated_at: Date
    user_id: number
}

type TypeInternships = {
    bulan_keluar_intern: string
    bulan_masuk_intern: string
    catatan: string
    created_at: Date
    id: number
    jabatan_intern: string
    kota: string
    nama_intern: string
    negara: string
    periode_keluar_intern: number
    periode_masuk_intern: number
    updated_at: Date
    user_id: number
}

type TypeJobs = {
    bulan_keluar_job: string
    bulan_masuk_job: string
    catatan: string
    created_at: Date
    id: number
    jabatan_job: string
    kota: string
    nama_job: string
    negara: string
    periode_keluar_job: number
    periode_masuk_job: number
    updated_at: Date
    user_id: number
}

type TypeOrganizations = {
    bulan_keluar_org: string
    bulan_masuk_org: string
    catatan: string
    created_at: Date
    id: number
    jabatan_org: string
    kota: string
    nama_org: string
    negara: string
    periode_keluar_org: number
    periode_masuk_org: number
    updated_at: Date
    user_id: number
}

type TypeSkills = {
    ahli_skill: string
    created_at: Date
    etoskerja_skill: string
    id: number
    inggris_skill: string
    kepemimpinan_skill: string
    kerjasama_skill: string
    komunikasi_skill: string
    pengembangan_skill: string   
    updated_at: Date
    user_id: number
}

export function useDataAlumni(){
    const token = getToken();
    const [data, setData] = useState<DataAlumni[]>([]);
    const [detail, setDetail] = useState<TypeDataDetailAlumni>();

    const getDataAlumni = async ({ search, ipk_min, ipk_max }: { search?: string, ipk_min?: string, ipk_max?: string }): Promise< DataAlumni[] | undefined > => {
        try {

            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/dataAlumniAdmin` , {
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                params: {
                    search: search,
                    ipk_min: ipk_min,
                    ipk_max: ipk_max
                }
            });

            if (Array.isArray(data.data)) setData(data.data);

            console.log("nilai data", data.data)
            
            return data;

            
        } catch (error) {

            console.log("Error", error);
            
            throw new Error("Error get data alumni");
        }

    }

    

    const showDataCvAlumni = async (uuid: number) => {
        try {

            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/dataAlumniAdmin/${uuid}/cv`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                },
            })

            setDetail(data);

            return data;            
            
        } catch (error) {
            console.log("Error", error);
            throw new Error("Error show data cv alumni");
        }
    }

    return { data, detail, getDataAlumni, showDataCvAlumni };
}
