'use client'

import { Modal } from "flowbite-react";
import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from 'react-hook-form';
import { getPengalamanKerja } from '@/constant/job/pengalamanKerja';
import { getTipeKerja } from '@/constant/job/tipeKerja';
import { getUser, User } from '@/hooks/auth/authClient';
import { useLokerAlumni, useLokerAdmin, useLokerMitra } from '@/hooks/loker/useStore.hook';
import { toast } from 'sonner';

import moment from "moment";


type Inputs = {
    agencyName: string;
    position: string;
    address: string;
    email: string;
    phone1: string | null;
    intershipExperience: string;
    wages: number | null;
    workType: string;
    description: string;
    url: string | null;
    tags: string | null;
    logoFile: FileList | null;
    validPeriod: Date | null | string;
  };


export default function LokerForm({ show, hide, uuid }: { show?: boolean , hide?: () => void, uuid?: string | null }){

    const { register, handleSubmit, reset, setValue } = useForm<Inputs>();
    const [ user, setUser] = useState<User>();
    const [ role, setRole ] = useState< "alumni" | "admin" | "mahasiswa" | "mitra" >();
    const { data: optionsInternExp } = getPengalamanKerja();
    const { data: optionsInternType } = getTipeKerja();
    const { post: postLokerAlumni, show: showLokerAlumni, update: updateLokerAlumni } = useLokerAlumni();
    const { post: postLokerAdmin, show: showLokerAdmin, update: updateLokerAdmin } = useLokerAdmin();
    const { post: postLokerMitra, show: showLokerMitra, update: updateLokerMitra } = useLokerMitra();

    const onSubmit: SubmitHandler<Inputs> =  async (data) => {
        const file = data.logoFile?.[0] ?? null;
        const formData = new FormData();

        if (user?.id) formData.append('user_id', user.id);
        if (data.agencyName) formData.append('NamaPerusahaan', data.agencyName);
        if (data.position) formData.append('Posisi', data.position);
        if (data.address) formData.append('Alamat', data.address);
        if (data.intershipExperience) formData.append('Pengalaman', data.intershipExperience);
        if (data.wages) formData.append('Gaji', String(data.wages));
        if (data.workType) formData.append('TipeKerja', data.workType);
        if (data.description) formData.append('Deskripsi', data.description);
        if (data.url) formData.append('Website', data.url);
        if (data.email) formData.append('Email', data.email);
        if (data.phone1) formData.append("no_hp", data.phone1);
        if (data.tags) formData.append('Tags', data.tags);
        if (formData instanceof FormData) if (file) formData.append('Logo', file);
        if (data.validPeriod) formData.append('MasaBerlaku', moment(data.validPeriod).format('YYYY-MM-DD'));
        try {
            if (!uuid) {
                formData.append('Verify', String("pending"));
                if (role === 'alumni') await postLokerAlumni(formData);
                if (role === 'admin') await postLokerAdmin(formData);
                if (role === 'mitra') await postLokerMitra(formData);
            }

            if (uuid) {
                if (role === 'alumni') await updateLokerAlumni(uuid, formData);
                if (role === 'admin') await updateLokerAdmin(uuid, formData);
                if (role === 'mitra') await updateLokerMitra(uuid, formData);
            } 
            toast.success("Form submitted successfully!");
            reset();
            if (hide) hide();
        } catch (error) {
            toast.error("Failed to submit the form.");
        }
    };

    useEffect(() => {

        if (uuid && role) {

            if (role === 'alumni'){
                showLokerAlumni(uuid)
                    .then((result) => {
    
                        const newDate = result?.MasaBerlaku ? moment(result?.MasaBerlaku).format("YYYY-MM-DD") : null;
    
                        setValue("agencyName", result?.NamaPerusahaan ? result?.NamaPerusahaan : "" );
                        setValue("position", result?.Posisi ? result?.Posisi : "" );
                        setValue("address", result?.Alamat ? result?.Alamat : "" );
                        setValue("email", result?.Email ? result?.Email : "" );
                        setValue("phone1", result?.no_hp ? result?.no_hp : "" );
                        setValue("intershipExperience", result?.Pengalaman ? result?.Pengalaman : "");
                        setValue("wages", result?.Gaji ? Number(result?.Gaji)  : null);
                        setValue("workType", result?.TipeKerja ? result?.TipeKerja : "");
                        setValue("description", result?.Deskripsi ? result?.Deskripsi : "");
                        setValue("url", result?.Website ? result?.Website : "");
                        setValue("tags", result?.Tags ? result?.Tags : "");
                        setValue("validPeriod", newDate );
    
                    })
                    .catch(() => {
                        toast.error("Failed to show!");
                    });
            }

            if (role === 'admin'){
                showLokerAdmin(uuid)
                    .then((result) => {
    
                        const newDate = result?.MasaBerlaku ? moment(result?.MasaBerlaku).format("YYYY-MM-DD") : null;
    
                        setValue("agencyName", result?.NamaPerusahaan ? result?.NamaPerusahaan : "" );
                        setValue("position", result?.Posisi ? result?.Posisi : "" );
                        setValue("address", result?.Alamat ? result?.Alamat : "" );
                        setValue("email", result?.Email ? result?.Email : "" );
                        setValue("phone1", result?.no_hp ? result?.no_hp : "" );
                        setValue("intershipExperience", result?.Pengalaman ? result?.Pengalaman : "");
                        setValue("wages", result?.Gaji ? Number(result?.Gaji)  : null);
                        setValue("workType", result?.TipeKerja ? result?.TipeKerja : "");
                        setValue("description", result?.Deskripsi ? result?.Deskripsi : "");
                        setValue("url", result?.Website ? result?.Website : "");
                        setValue("tags", result?.Tags ? result?.Tags : "");
                        setValue("validPeriod", newDate );
    
                    })
                    .catch(() => {
                        toast.error("Failed to show!");
                    });
            }
            if (role === 'mitra'){
                showLokerMitra(uuid)
                    .then((result) => {
    
                        const newDate = result?.MasaBerlaku ? moment(result?.MasaBerlaku).format("YYYY-MM-DD") : null;
    
                        setValue("agencyName", result?.NamaPerusahaan ? result?.NamaPerusahaan : "" );
                        setValue("position", result?.Posisi ? result?.Posisi : "" );
                        setValue("address", result?.Alamat ? result?.Alamat : "" );
                        setValue("email", result?.Email ? result?.Email : "" );
                        setValue("phone1", result?.no_hp ? result?.no_hp : "" );
                        setValue("intershipExperience", result?.Pengalaman ? result?.Pengalaman : "");
                        setValue("wages", result?.Gaji ? Number(result?.Gaji)  : null);
                        setValue("workType", result?.TipeKerja ? result?.TipeKerja : "");
                        setValue("description", result?.Deskripsi ? result?.Deskripsi : "");
                        setValue("url", result?.Website ? result?.Website : "");
                        setValue("tags", result?.Tags ? result?.Tags : "");
                        setValue("validPeriod", newDate );
    
                    })
                    .catch(() => {
                        toast.error("Failed to show!");
                    });
            }
        }

    }, [uuid, role])

    useEffect(() => {
        const result = getUser();
        if (result) {

            const roleAlumni: boolean | undefined = result?.roles?.includes('alumni');
            const roleAdmin: boolean | undefined = result?.roles?.includes('admin');
            const roleMahasiswa: boolean | undefined = result?.roles?.includes('mahasiswa');
            const roleMitra: boolean | undefined = result?.roles?.includes('mitra');

            setUser(result);

            if (roleAlumni) setRole('alumni');
            if (roleAdmin) setRole('admin');
            if (roleMahasiswa) setRole('mahasiswa');
            if (roleMitra) setRole('mitra');
        } 
    }, [])  
    

    return <Modal show={show} onClose={hide} className="overflow-y-auto">
        <Modal.Header > <p className="text-blueSTI text-base"> Form Lowongan</p></Modal.Header>

        <Modal.Body>
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="flex flex-col gap-1 mb-5">
                    <label htmlFor="agencyName" className="text-sm sm:text-base">
                        Nama Perusahaan <span className="text-red-500">*</span>
                    </label>
                    <input {...register('agencyName', { required: "Nama Perusahaan wajib diisi." })} name="agencyName" id="agencyName" type="text" className="text-sm" placeholder="Universitas Dian Nuswantoro" />
                </div>

                <div className="flex flex-col gap-1 mb-5">
                    <label htmlFor="position" className="text-sm sm:text-base">
                        Posisi <span className="text-red-500">*</span>
                    </label>
                    <input {...register('position', { required: "Posisi wajib diisi." })} name="position" id="position" type="text" className="text-sm" placeholder="Web Developer" />
                </div>

                <div className="flex flex-col gap-1 mb-5">
                    <label htmlFor="address" className="text-sm sm:text-base">
                        Alamat <span className="text-red-500">*</span>
                    </label>
                    <input {...register('address', { required: "Alamat wajib diisi." })} name="address" id="address" type="text" className="text-sm" placeholder="Jl Nakula" />
                </div>

                <div className="flex flex-col gap-1 mb-5">
                    <label htmlFor="email" className="text-sm sm:text-base">
                        Email <span className="text-red-500">*</span>
                    </label>
                    <input {...register('email', { required: "Email wajib diisi." })} name="email" id="email" type="email" className="text-sm" placeholder="interhsip@intern.com" />
                </div>

                <div className="flex flex-col gap-1 mb-5">
                    <label htmlFor="phone1" className="text-sm sm:text-base">
                        No Hp
                    </label>
                    <input {...register('phone1')} name="phone1" id="phone1" type="text" className="text-sm" placeholder="08xxxxxxxxxx" />
                </div>

                <div className="flex flex-col gap-1 mb-5">
                    <label htmlFor="intershipExperience" className="text-sm sm:text-base">
                        Pengalaman <span className="text-red-500">*</span>
                    </label>
                    <select {...register('intershipExperience', { required: "Pengalaman isi wajib diisi." })} name="intershipExperience" id="intershipExperience">
                        <option value="">-none-</option>
                        {optionsInternExp?.map((item) => {
                            return <option key={item.key} value={item.value}>{item.label}</option>;
                        })}
                    </select>
                </div>

                <div className="flex flex-col gap-1 mb-5">
                    <label htmlFor="wages" className="text-sm sm:text-base">
                        Gaji
                    </label>
                    <input {...register('wages')} name="wages" id="wages" type="number" className="text-sm" placeholder="3000000" />
                </div>

                <div className="flex flex-col gap-1 mb-5">
                    <label htmlFor="workType" className="text-sm sm:text-base">
                        Tipe Kerja <span className="text-red-500">*</span>
                    </label>
                    <select {...register('workType', { required: "Tipe Kerja wajib diisi." })} name="workType" id="workType">
                        <option value="">-none-</option>
                        {optionsInternType?.map((item) => {
                            return <option key={item.key} value={item.value}>{item.label}</option>;
                        })}
                    </select>
                </div>

                <div className="flex flex-col gap-1 mb-5">
                    <label htmlFor="description" className="text-sm sm:text-base">
                        Deskripsi <span className="text-red-500">*</span>
                    </label>
                    <textarea {...register('description', { required: "Deskripsi wajib diisi." })} rows={10} name="description" id="description" className="text-sm" placeholder="Telah melaksanakan dengan baik" />
                </div>

                <div className="flex flex-col gap-1 mb-5">
                    <label htmlFor="url" className="text-sm sm:text-base">
                        Website
                    </label>
                    <input {...register('url')} name="url" id="url" type="text" className="text-sm" placeholder="http://" />
                </div>

                <div className="flex flex-col gap-1 mb-5">
                    <label htmlFor="tags" className="text-sm sm:text-base">
                        Tags<span className="text-red-500">*</span>
                    </label>
                    <input {...register('tags')} name="tags" id="tags" type="text" className="text-sm" placeholder="nodejs, web" />
                </div>

                <div className="flex flex-col gap-1 mb-5">
                    <label htmlFor="logoFile" className="text-sm sm:text-base">
                        Logo Perusahaan
                    </label>
                    <input {...register('logoFile')} name="logoFile" id="logoFile" type="file" className="text-sm" />
                </div>

                <div className="flex flex-col gap-1 mb-5">
                    <label htmlFor="validPeriod" className="text-sm sm:text-base">
                        Masa Berlaku <span className="text-red-500">*</span>
                    </label>
                    <input {...register('validPeriod', { valueAsDate: true, required: "Tanggal wajib diisi." })} name="validPeriod" id="validPeriod" type="date" className="text-sm" />
                </div>

                <button type="submit" className="bg-blueSTI hover:bg-blue-600 active:bg-blue-500 px-5 py-2 text-white font-semibold text-xs sm:text-sm rounded-md flex items-center justify-center gap-x-2 w-full sm:w-auto">
                    Submit
                </button>

            </form>
        </Modal.Body>

    </Modal>
}