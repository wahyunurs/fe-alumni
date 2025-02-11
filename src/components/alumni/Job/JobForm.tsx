'use client'

import { Modal } from "flowbite-react";
import { useEffect } from "react";
import { useForm, SubmitHandler } from 'react-hook-form';
import { useJob } from '@/hooks/alumni/job/useStore.hook';
import { toast } from 'sonner';

type Inputs = {
    agency: string; // Nama Instansi
    bulanStart: string | null; // Bulan Mulai
    bulanEnd: string | null; // Bulan Akhir
    periodStart: number | null; // Periode Mulai
    periodEnd: number | null; // Periode Akhir
    jobTitle: string; // Jabatan Pekerjaan
    city: string; // Jabatan Kota
    address: string; // Jabatan Alamat
    country: string; // Jabatan negara
    note: string; // Jabatan Catatan
};


export default function JobForm({ show, hide, uuid }: { show?: boolean , hide?: () => void, uuid?: string | null }){

    const { register, handleSubmit, reset, setValue } = useForm<Inputs>();
    const { detailJob, postJob, updateJob } = useJob();

    const onSubmit: SubmitHandler<Inputs> =  async (data) => {

        const formData = uuid ? new URLSearchParams() : new FormData();

        if (data.agency) formData.append("nama_job", String(data.agency));
        if (data.bulanStart) formData.append("bulan_masuk_job", String(data.bulanStart));
        if (data.bulanEnd) formData.append("bulan_keluar_job", String(data.bulanEnd));
        if (data.periodStart) formData.append("periode_masuk_job", String(data.periodStart));
        if (data.periodEnd) formData.append("periode_keluar_job", String(data.periodEnd));
        if (data.jobTitle) formData.append("jabatan_job", String(data.jobTitle));
        if (data.city) formData.append("kota", String(data.city));
        if (data.address) formData.append("alamat", String(data.address));
        if (data.country) formData.append("negara", String(data.country));
        if (data.note) formData.append("catatan", String(data.note));
        
        if (!uuid) await postJob(formData)
            .then(() => {
                toast.success("Success post data");
            })
            .catch(() => {
                toast.error("Failed post data");
            });
        

        if (uuid) await updateJob(formData, uuid)
            .then(() => {
                toast.success("Success update data");
            }).catch(() => {
                toast.error("Failed update data");
            });
        
        reset();
        if (hide) hide();
    }

    useEffect(() => {

        if (uuid) {

            detailJob(uuid)
                .then((item) => {
                    
                    setValue("agency", item?.nama_job ? item?.nama_job : "");
                    setValue("bulanStart", item?.bulan_masuk_job ? item?.bulan_masuk_job : null);
                    setValue("bulanEnd", item?.bulan_keluar_job ? item?.bulan_keluar_job : null);
                    setValue("periodStart", item?.periode_masuk_job ? item?.periode_masuk_job : null);
                    setValue("periodEnd", item?.periode_keluar_job ? item?.periode_keluar_job : null);
                    setValue("jobTitle", item?.jabatan_job ? item?.jabatan_job : "");
                    setValue("city", item?.kota ? item?.kota : "");
                    setValue("address", item?.alamat ? item?.alamat : "");
                    setValue("country", item?.negara ? item?.negara : "");
                    setValue("note", item?.catatan ? item?.catatan : "");
                })
            
        }

    }, [uuid])
    

    return <Modal show={show} onClose={hide} className="overflow-y-auto">
        <Modal.Header > <p className="text-blue-500 text-base"> Form Job</p></Modal.Header>

        <Modal.Body>
            <form onSubmit={handleSubmit(onSubmit)} >

                <div className="flex flex-col gap-1 mb-5">
                    <label htmlFor="agency" className="text-sm sm:text-base" >Nama Instansi</label>
                    <input  {...register('agency')} name="agency" id="agency" type="text" className="text-sm" placeholder="Udinus" required/>
                </div>

                <div className="flex flex-col gap-1 mb-5">
                    <label htmlFor="bulanStart" className="text-sm sm:text-base">Bulan Mulai</label>
                    <select {...register('bulanStart')} name="bulanStart" id="bulanStart" className="text-sm" required>
                        <option value="">Pilih Bulan</option>
                        {["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"].map((bulan, index) => (
                            <option key={index} value={bulan}>{bulan}</option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col gap-1 mb-5">
                    <label htmlFor="bulanEnd" className="text-sm sm:text-base">Bulan Selesai</label>
                    <select {...register('bulanEnd')} name="bulanEnd" id="bulanEnd" className="text-sm" required>
                        <option value="">Pilih Bulan</option>
                        {["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"].map((bulan, index) => (
                            <option key={index} value={bulan}>{bulan}</option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col gap-1 mb-5">
                    <label htmlFor="periodStart" className="text-sm sm:text-base" >Periode</label>
                    <input  {...register('periodStart', { valueAsNumber: true })} name="periodStart" id="periodStart" type="number" className="text-sm" placeholder="2020" required/>
                </div>

                <div className="flex flex-col gap-1 mb-5">
                    <label htmlFor="periodEnd" className="text-sm sm:text-base" >Sampai</label>
                    <input  {...register('periodEnd', { valueAsNumber: true })} name="periodEnd" id="periodEnd" type="number" className="text-sm" placeholder="2020" required/>
                </div>

                <div className="flex flex-col gap-1 mb-5">
                    <label htmlFor="jobTitle" className="text-sm sm:text-base" >Jabatan Pekerjaan </label>
                    <input  {...register('jobTitle')} name="jobTitle" id="jobTitle" type="text" className="text-sm" placeholder="Developer" required/>
                </div>

                <div className="flex flex-col gap-1 mb-5">
                    <label htmlFor="city" className="text-sm sm:text-base" >Kota</label>
                    <input  {...register('city')} name="city" id="city" type="text" className="text-sm" placeholder="Semarang" required/>
                </div>

                <div className="flex flex-col gap-1 mb-5">
                    <label htmlFor="address" className="text-sm sm:text-base" >Alamat</label>
                    <input  {...register('address')} name="address" id="address" type="text" className="text-sm" placeholder="Jl. Imam Bonjol" required/>
                </div>

                <div className="flex flex-col gap-1 mb-5">
                    <label htmlFor="country" className="text-sm sm:text-base" >Negara</label>
                    <input  {...register('country')} name="country" id="country" type="text" className="text-sm" placeholder="Indonesia" required/>
                </div>

                <div className="flex flex-col gap-1 mb-5">
                    <label htmlFor="note" className="text-sm sm:text-base" >Catatan</label>
                    <textarea  {...register('note')} name="note" id="note" className="text-sm" placeholder="Telah melaksanakan dengan baik" required/>
                </div>

                <button type="submit" className="bg-blue-500 px-5 py-1 rounded-md text-white w-full sm:w-auto ">Submit</button>


            </form>
        </Modal.Body>
    </Modal>
}