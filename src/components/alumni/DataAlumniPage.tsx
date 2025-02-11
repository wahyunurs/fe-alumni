'use client';
import Image from "next/image"
import { useCheckDataAlumni } from '@/hooks/dashboard/data-alumni/useStore.hook';
import { useAcademic, useAcademicMhs } from '@/hooks/alumni/academic/useStore.hook';
import { useJob } from "@/hooks/alumni/job/useStore.hook";
import { useInternship } from "@/hooks/alumni/internship/useStore.hook";
import { useOrganization } from "@/hooks/alumni/organization/useStore.hook";
import { useAward, useAwardMhs } from "@/hooks/alumni/award/useStore.hook";
import { useInterest } from '@/hooks/alumni/interest/useStore.hook';
import { useCourse } from "@/hooks/alumni/course/useStore.hook";
import { useSkill } from "@/hooks/alumni/skill/useStore.hook";
import { HiPencilAlt } from 'react-icons/hi';
import { useProfile } from "@/hooks/profile/alumni/useStore.hook";
import { getUser, User } from "@/hooks/auth/authClient";
import { IoLogoWhatsapp } from "react-icons/io";
import { MdEmail } from "react-icons/md";

import Link from 'next/link';
import { useEffect, useState } from "react";

export default function DataAlumniPage(){

    const getDataAlumni = useCheckDataAlumni();
    const { data, getDataAlumni : fetchDataAlumni } = useProfile();
    const [ filter ] = useState({ currentPage: 1, limit: 10 });

    const { academics, getAcademics } = useAcademic();
    const {data:jobs, getJobs} = useJob();
    const {data:internships, getInternship} = useInternship();
    const {data:organizations, getOrganization} = useOrganization();
    const {data:awards, getAwards} = useAward();
    const {data: interests, getInterests } = useInterest();
    const {data:courses, getCourses} = useCourse();
    const {data:skills, getSkills} = useSkill();

    const { data: dataAcademicMhs, get: getAcademicMhs } = useAcademicMhs();    
    const {  getAwards: getAwardMhs } = useAwardMhs()

    const [user, setUser] = useState<User | null>(null);
    const [ , setRole ] = useState< "alumni" | "admin" | "mahasiswa" >();
    const basePath = process.env.NEXT_PUBLIC_BASEPATH;


    useEffect(() => {
        const fetchedUser = getUser();

        if (fetchedUser){

            const roleAlumni: boolean | undefined = fetchedUser?.roles?.includes('alumni');
            const roleAdmin: boolean | undefined = fetchedUser?.roles?.includes('admin');
            const roleMahasiswa: boolean | undefined = fetchedUser?.roles?.includes('mahasiswa');

            if (roleAlumni) {
                setRole('alumni'); 
                fetchDataAlumni();

                getAcademics(filter);
                getJobs(filter);
                getInternship(filter);
                getOrganization(filter);
                getAwards(filter);
                getInterests(filter);
                getCourses(filter);
                getSkills(filter);
            }
            if (roleAdmin) {
                setRole('admin');
            } 
            if (roleMahasiswa) {
                setRole('mahasiswa');
                getAcademicMhs(filter);
                getAwardMhs(filter);
            }

            setUser(fetchedUser);
        }
    }, [])

    return <section className="" >
        {/* kotak atas */}
        <div className='bg-white shadow-md p-6 mx-auto mb-5 rounded-md'>
            <div className="relative">
                <div 
                    className="w-full h-40 bg-cover bg-center rounded-t-md" 
                    style={{ backgroundImage: `url('${basePath}/draw/bgDataAlumni.png')` }}
                >
                    <div className="absolute -bottom-10 left-6 w-[125px] h-[125px] border-white rounded-full flex items-center justify-center overflow-hidden">
                    <img
                            alt="Photo Profile"
                            src={data?.foto_profil
                                ? `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/storage/foto_profils/${data.foto_profil}`
                                : `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/storage/imglogo/default_logo.png`}
                            className="w-32 h-32 rounded-full object-cover shadow-lg"
                        />                    </div>
                </div>
            </div>

            <div className="pt-12">
                {/* Name Section */}
                <div className="font-bold mb-2 mt-2 text-center sm:text-left">{data?.name ?? ""}</div>

                {/* Role Section */}
                <div className="font-normal mb-4">
                    {user?.roles?.map((item) => (
                        <div key={item} className="text-center sm:text-left">{item} di Universitas Dian Nuswantoro</div>
                    ))}
                </div>

                {/* Contact Information */}
                <div className="mb-2 text-blueSTI font-semibold flex flex-col sm:flex-row sm:items-center sm:justify-start space-y-2 sm:space-y-0 sm:space-x-4">
                    {/* Email */}
                    <a href={`mailto:${data?.email}`} className=" text-red-500 hover:text-white bg-red-100 hover:bg-red-500 p-2 rounded-md transition-all ease-in-out w-full sm:w-auto text-center sm:text-left">
                        <MdEmail />
                        <span className="sr-only">Kirim email ke {data?.email}</span>
                    </a>
                    
                    {/* Phone Number */}
                    <a href={`https://wa.me/62${data?.no_hp?.replace(/^0/, '')}`} target="_blank" rel="noopener noreferrer" className="text-green-500 hover:text-white bg-green-100 hover:bg-green-500 p-2 rounded-md transition-all ease-in-out w-full sm:w-auto text-center sm:text-left">
                        <IoLogoWhatsapp />
                        <span className="sr-only">Kirim whatsapp ke {data?.no_hp}</span>
                    </a>
                </div>
            </div>
        </div>

        {/* kotak bawah */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Academic Section */}
            <div className="space-y-5">
                {getDataAlumni.data?.map((item) => {
                if (item.name === "Academic") {
                    return (
                    <div key={item.key} className="border bg-white shadow-md rounded-md">
                        <div className="bg-blueSTI flex justify-between items-center p-3 rounded-t-md">
                            <div className="text-white">{item.name}</div>
                                <Link href={`/dashboard/alumni/${item.path}`} className="shrink-0 text-white hover:text-gray-400">
                                    <HiPencilAlt />
                                </Link>
                            </div>
                        <div className="p-3 space-y-6"> {academics.map((academic, index) => (
                            <div key={`${item.key}-${index}`}>
                                <div className="p-3 flex justify-between">
                                    <div>
                                        <h3 className="text-sm font-semibold text-gray-800">{academic.jenjang_pendidikan}</h3>
                                        <p className="text-sm text-gray-700">{academic.nama_studi}</p>
                                        <p className="text-sm text-gray-600"> {academic.tahun_masuk} - {academic.tahun_lulus} &middot;{' '} {academic.tahun_lulus && academic.tahun_masuk ? academic.tahun_lulus - academic.tahun_masuk : '~'}{' '}tahun </p>
                                        <p className="text-sm text-gray-600">{academic.kota}, {academic.negara}</p>
                                        <p className="text-sm text-gray-600">IPK: {academic.ipk}</p>
                                        <p className="text-sm text-gray-600 italic">Catatan: {academic.catatan}</p>
                                    </div>
                                </div>
                                {academics.length > 1 && index < academics.length - 1 && (<hr className="border-gray-300" />)}
                            </div>
                        ))}
                        </div>
                    </div>
                    );
                }
                })}
            </div>

            {/* Job Section */}
            <div className="space-y-5">
                {getDataAlumni.data?.map((item) => {
                if (item.name === "Job") {
                    return (
                    <div key={item.key} className="border bg-white shadow-md rounded-md">
                        <div className="bg-blueSTI flex justify-between items-center p-3 rounded-t-md">
                            <div className="text-white">{item.name}</div>
                                <Link href={`/dashboard/alumni/${item.path}`} className="shrink-0 text-white hover:text-gray-400">
                                    <HiPencilAlt />
                                </Link>
                            </div>
                        <div className="p-3 space-y-6"> {jobs.map((job, index) => (
                            <div key={`${item.key}-${index}`}>
                                <div className="p-3 flex justify-between">
                                    <div>
                                        <h3 className="text-sm font-semibold text-gray-800">{job.nama_job} </h3>
                                        <p className="text-sm text-gray-600">{job.jabatan_job}</p>
                                        <p className="text-sm text-gray-600">{job.periode_masuk_job} - {job.periode_keluar_job} &middot;{' '}{job.periode_keluar_job && job.periode_masuk_job? job.periode_keluar_job - job.periode_masuk_job: '~'}{' '}tahun</p>
                                        <p className="text-sm text-gray-600">{job.kota}, {job.negara}</p>
                                        <p className="text-sm text-gray-600 italic">Catatan: {job.catatan}</p>
                                    </div>
                                </div>
                                {jobs.length > 1 && index < jobs.length - 1 && (<hr className="border-gray-300" />)}
                            </div>
                        ))}
                        </div>
                    </div>
                    );
                }
                })}
            </div>

            {/* Intern Section */}
            <div className="space-y-5">
                {getDataAlumni.data?.map((item) => {
                if (item.name === "Internship") {
                    return (
                    <div key={item.key} className="border bg-white shadow-md rounded-md">
                        <div className="bg-blueSTI flex justify-between items-center p-3 rounded-t-md">
                            <div className="text-white">{item.name}</div>
                                <Link href={`/dashboard/alumni/${item.path}`} className="shrink-0 text-white hover:text-gray-400">
                                    <HiPencilAlt />
                                </Link>
                            </div>
                        <div className="p-3 space-y-6"> {internships.map((internship, index) => (
                            <div key={`${item.key}-${index}`}>
                                <div className="p-3 flex justify-between">
                                    <div>
                                        <h3 className="text-sm font-semibold text-gray-800">{internship.nama_intern}</h3>
                                        <p className="text-sm text-gray-600">{internship.jabatan_intern}</p>
                                        <p className="text-sm text-gray-600">
                                            {internship.bulan_masuk_intern} {internship.periode_masuk_intern} - {internship.bulan_keluar_intern} {internship.periode_keluar_intern} &nbsp;&middot;&nbsp; 
                                            {(internship.periode_keluar_intern && internship.periode_masuk_intern) ? internship.periode_keluar_intern - internship.periode_masuk_intern : '~'} tahun</p>
                                        <p className="text-sm text-gray-600">{internship.kota}, {internship.negara} </p>
                                        <p className="text-sm text-gray-600 italic">Catatan: {internship.catatan} </p>
                                    </div>
                                </div>
                                {internships.length > 1 && index < internships.length - 1 && (<hr className="border-gray-300" />)}
                            </div>
                        ))}
                        </div>
                    </div>
                    );
                }
                })}
            </div>

            {/* Organization Section */}
            <div className="space-y-5">
                {getDataAlumni.data?.map((item) => {
                if (item.name === "Organization") {
                    return (
                    <div key={item.key} className="border bg-white shadow-md rounded-md">
                        <div className="bg-blueSTI flex justify-between items-center p-3 rounded-t-md">
                            <div className="text-white">{item.name}</div>
                                <Link href={`/dashboard/alumni/${item.path}`} className="shrink-0 text-white hover:text-gray-400">
                                    <HiPencilAlt />
                                </Link>
                            </div>
                        <div className="p-3 space-y-6"> {organizations.map((organization, index) => (
                            <div key={`${item.key}-${index}`}>
                                <div className="p-3 flex justify-between">
                                    <div>
                                        <h3 className="text-sm font-semibold text-gray-800">{organization.nama_org}</h3>
                                        <p className="text-sm text-gray-600">{organization.jabatan_org}</p>
                                        <p className="text-sm text-gray-600">{organization.periode_masuk_org} - {organization.periode_keluar_org} &middot; { (organization.periode_keluar_org && organization.periode_masuk_org) ? organization.periode_keluar_org - organization.periode_masuk_org  : '~' } tahun</p>
                                        <p className="text-sm text-gray-600">{organization.kota}, {organization.negara} </p>
                                        <p className="text-sm text-gray-600 italic">Catatan: {organization.catatan} </p>
                                    </div>
                                </div>
                                {organizations.length > 1 && index < organizations.length - 1 && (<hr className="border-gray-300" />)}
                            </div>
                        ))}
                        </div>
                    </div>
                    );
                }
                })}
            </div>

            {/* Award Section */}
            <div className="space-y-5">
                {getDataAlumni.data?.map((item) => {
                if (item.name === "Award") {
                    return (
                    <div key={item.key} className="border bg-white shadow-md rounded-md">
                        <div className="bg-blueSTI flex justify-between items-center p-3 rounded-t-md">
                            <div className="text-white">{item.name}</div>
                                <Link href={`/dashboard/alumni/${item.path}`} className="shrink-0 text-white hover:text-gray-400">
                                    <HiPencilAlt />
                                </Link>
                            </div>
                        <div className="p-3 space-y-6"> {awards.map((award, index) => (
                            <div key={`${item.key}-${index}`}>
                                <div className="p-3 flex justify-between">
                                    <div>
                                        <h3 className="text-sm font-semibold text-gray-800">{award.nama_award}</h3>
                                        <p className="text-sm text-gray-600">{award.institusi_award}</p>
                                        <p className="text-sm text-gray-600">Tingkat: {award.tingkat_award} </p>
                                        <p className="text-sm text-gray-600">Tahun: {award.tahun_award} </p>
                                        <p className="text-sm text-gray-600 italic">Catatan: {award.deskripsi_award} </p>
                                    </div>
                                </div>
                                {awards.length > 1 && index < awards.length - 1 && (<hr className="border-gray-300" />)}
                            </div>
                        ))}
                        </div>
                    </div>
                    );
                }
                })}
            </div>

            {/* Course Section */}
            <div className="space-y-5">
                {getDataAlumni.data?.map((item) => {
                if (item.name === "Course") {
                    return (
                    <div key={item.key} className="border bg-white shadow-md rounded-md">
                        <div className="bg-blueSTI flex justify-between items-center p-3 rounded-t-md">
                            <div className="text-white">{item.name}</div>
                                <Link href={`/dashboard/alumni/${item.path}`} className="shrink-0 text-white hover:text-gray-400">
                                    <HiPencilAlt />
                                </Link>
                            </div>
                        <div className="p-3 space-y-6"> {courses.map((course, index) => (
                            <div key={`${item.key}-${index}`}>
                                <div className="p-3 flex justify-between">
                                    <div>
                                        <h3 className="text-sm font-semibold text-gray-800">{course.nama_course}</h3>
                                        <p className="text-sm text-gray-600">{course.institusi_course}</p>
                                        <p className="text-sm text-gray-600">Tingkat: {course.tingkat_course} </p>
                                        <p className="text-sm text-gray-600">Tahun: {course.tahun_course} </p>
                                    </div>
                                </div>
                                {courses.length > 1 && index < courses.length - 1 && (<hr className="border-gray-300" />)}
                            </div>
                        ))}
                        </div>
                    </div>
                    );
                }
                })}
            </div>

            {/* Interest Section */}
            <div className="space-y-5">
                {getDataAlumni.data?.map((item) => {
                    if (item.name === "Interest") {
                        return (
                            <div key={item.key} className="border bg-white shadow-md rounded-md">
                                <div className="bg-blueSTI flex justify-between items-center p-3 rounded-t-md">
                                    <div className="text-white">{item.name}</div>
                                    <Link href={`/dashboard/alumni/${item.path}`} className="shrink-0 text-white hover:text-gray-400">
                                        <HiPencilAlt />
                                    </Link>
                                </div>
                                <div className="p-3 space-y-6">
                                    <div className="flex flex-wrap gap-4 justify-between">
                                        {interests.map((interest, index) => (
                                            <div key={`${item.key}-${index}`} className="flex-1 sm:w-1/2 lg:w-1/2 p-3 border rounded-md shadow-sm bg-gray-50">
                                                <p className="text-sm text-center text-gray-600">{interest.name}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );
                    }
                })}
            </div>

            {/* Skill Section */}
            <div className="space-y-5">
                {getDataAlumni.data?.map((item) => {
                if (item.name === "Skills") {
                    return (
                    <div key={item.key} className="border bg-white shadow-md rounded-md">
                        <div className="bg-blueSTI flex justify-between items-center p-3 rounded-t-md">
                        <div className="text-white">{item.name}</div>
                        <Link
                            href={`/dashboard/alumni/${item.path}`}
                            className="shrink-0 text-white hover:text-gray-400"
                        >
                            <HiPencilAlt />
                        </Link>
                        </div>
                        <div className="p-3 space-y-6">
                            {skills.map((skill, index) => (
                            <div key={`${item.key}-${index}`} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-3 border rounded-md shadow-sm bg-gray-50">
                                <p className="text-sm font-semibold text-gray-800">Kerjasama:</p>
                                <p className="text-sm text-gray-600">{skill.kerjasama_skill}</p>
                            </div>
                            <div className="p-3 border rounded-md shadow-sm bg-gray-50">
                                <p className="text-sm font-semibold text-gray-800">Keahlian:</p>
                                <p className="text-sm text-gray-600">{skill.ahli_skill}</p>
                            </div>
                            <div className="p-3 border rounded-md shadow-sm bg-gray-50">
                                <p className="text-sm font-semibold text-gray-800">Bahasa Inggris:</p>
                                <p className="text-sm text-gray-600">{skill.inggris_skill}</p>
                            </div>
                            <div className="p-3 border rounded-md shadow-sm bg-gray-50">
                                <p className="text-sm font-semibold text-gray-800">Komunikasi:</p>
                                <p className="text-sm text-gray-600">{skill.komunikasi_skill}</p>
                            </div>
                            <div className="p-3 border rounded-md shadow-sm bg-gray-50">
                                <p className="text-sm font-semibold text-gray-800">Pengembangan Diri:</p>
                                <p className="text-sm text-gray-600">{skill.pengembangan_skill}</p>
                            </div>
                            <div className="p-3 border rounded-md shadow-sm bg-gray-50">
                                <p className="text-sm font-semibold text-gray-800">Kepemimpinan:</p>
                                <p className="text-sm text-gray-600">{skill.kepemimpinan_skill}</p>
                            </div>
                            <div className="p-3 border rounded-md shadow-sm bg-gray-50">
                                <p className="text-sm font-semibold text-gray-800">Etos Kerja:</p>
                                <p className="text-sm text-gray-600">{skill.etoskerja_skill}</p>
                            </div>
                            </div>
                        ))}
                        </div>
                    </div>
                    );
                }
                })}
            </div>
        </div>

    </section>
}