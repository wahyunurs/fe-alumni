import axios from 'axios';
import { NextResponse } from 'next/server';
import { getTokenServer } from '@/hooks/auth/authServer';
import { DocumentCV } from '@/components/cv/DocumentCV';
import { renderToStream } from '@react-pdf/renderer';

export type cvAlumni = {
    profile?: CVProfile
    academics: CVAcademics[],
    jobs: CVJobs[],
    internships: [],
    organizations: [],
    awards: [],
    courses: [],
    skills: [],
}

export type CVProfile = {
    name?: string;
    email?: string;
    no_hp?: string;
}


export type CVAcademics = {
    nama_studi: string;
    prodi: string;
    ipk: string;
    tahun_masuk: number;
    tahun_lulus: number;
    kota: string;
    negara: string;
    catatan: string;
}

export type CVJobs = {
    nama_job: string;
    periode_masuk_job: string;
    periode_keluar_job: string;
    jabatan_job: string;
    kota: string;
    negara: string;
    catatan: string;
}

export type CVInternsip = {
    nama_intern: string;
    periode_masuk_intern: string;
    periode_keluar_intern: string;
    jabatan_intern: string;
    kota: string;
    negara: string;
    catatan: string;
}

export type CVOrganization = {
    nama_org: string
    periode_masuk_org: string
    periode_keluar_org: string
    jabatan_org: string
    kota: string
    negara: string
    catatan: string
}

export type CVAward = {
    nama_award: string
    institusi_award: string
    tingkat_award: string
    tahun_award: number
    deskripsi_award: string
}

export type CVCourse = {
    nama_course: string
    institusi_course: string
    tingkat_course: string
    tahun_course: number
}

export type CVSkill = {
    kerjasama_skill: string
    ahli_skill: string
    inggris_skill: string
    komunikasi_skill: string
    pengembangan_skill: string
    kepemimpinan_skill: string
    etoskerja_skill: string
}

export async function GET() {

    const token = await getTokenServer();    

    const temp: cvAlumni = {
        profile: {},
        academics: [],
        jobs: [],
        internships: [],
        organizations: [],
        awards: [],
        courses: [],
        skills: []
    }

    try {

        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/cetakCvAlumni` , {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });        

        if (data.alumni) temp.profile = data.alumni;
        if (data.academics) temp.academics = data.academics;
        if (data.jobs) temp.jobs = data.jobs;
        if (data.internships) temp.internships = data.internships;
        if (data.organizations) temp.organizations = data.organizations;
        if (data.awards) temp.awards = data.awards;
        if (data.courses) temp.courses = data.courses;
        if (data.skills) temp.skills = data.skills;        
        
    } catch (error) {

        console.log("Error", error);
        
        throw new Error("Error creating cv");
    }

    const stream = await renderToStream(
        <DocumentCV 
            profile={temp.profile} 
            academics={temp.academics} 
            jobs={temp.jobs} 
            internships={temp.internships} 
            awards={temp.awards} 
            courses={temp.courses} 
            organizations={temp.organizations} 
            skills={temp.skills} 
        />
    )

    return new NextResponse(stream as unknown as ReadableStream );
}