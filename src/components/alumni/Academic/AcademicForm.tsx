'use client'

import { Modal } from "flowbite-react";
import { useEffect } from "react";
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAcademic } from '@/hooks/alumni/academic/useStore.hook';
import { toast } from 'sonner';


type Inputs = {
    universityName: string;
    majorStudi: string;
    gpa: number | null;
    yearIn: number | null;
    yearOut: number | null;
    city: string;
    country: string;
    note: string;
    jenjangPendidikan: string;
};


export default function AcademicForm({ show, hide, uuid }: { show?: boolean , hide?: () => void, uuid?: string | null }){

    const { detailAcademic, postAcademic, updateAcademic } = useAcademic();
    const { register, handleSubmit, reset, setValue } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> =  async (data) => {

        const formData = uuid ? new URLSearchParams()  : new FormData() ;

        if (data.universityName) formData.append("nama_studi", data.universityName);
        if (data.majorStudi) formData.append("prodi", data.majorStudi);
        if (data.gpa) formData.append("ipk", String(data.gpa));
        if (data.yearIn) formData.append("tahun_masuk", String(data.yearIn));
        if (data.yearOut) formData.append("tahun_lulus", String(data.yearOut));
        if (data.city) formData.append("kota", data.city);
        if (data.country) formData.append("negara", data.country);
        if (data.note) formData.append("catatan", data.note);
        if (data.jenjangPendidikan) formData.append("jenjang_pendidikan", data.jenjangPendidikan);

        if (!uuid) {
            await postAcademic(formData)
                .then(() => {
                    toast.success("Success post data");
                })
                .catch(() => {
                    toast.error("Failed post data");
                });

        }

        if (uuid) {
            await updateAcademic(formData, uuid)
                .then(() => {
                    toast.success("Success update data");
                })
                .catch(() => {
                    toast.error("Failed udpate data");
                });

        }

        
        
        reset();
        if (hide) hide();
    }

    useEffect( () => {

        if (uuid) {

            detailAcademic(uuid)
                .then((result) => {

                    setValue("universityName", result?.nama_studi ? result.nama_studi : "" );
                    setValue("majorStudi", result?.prodi ? result?.prodi : "" );
                    setValue("jenjangPendidikan", result?.jenjang_pendidikan ? result?.jenjang_pendidikan : "" );
                    setValue("gpa", result?.ipk ? Number(result?.ipk)  : null );
                    setValue("yearIn", result?.tahun_masuk ? result?.tahun_masuk : null);
                    setValue("yearOut", result?.tahun_lulus ? result?.tahun_lulus : null);
                    setValue("city", result?.kota ? result.kota : "");
                    setValue("country", result?.negara ? result.negara : "");
                    setValue("note", result?.catatan ? result.catatan : "");
                    
                    toast.success("Berhasil Mendapatkan Data");

                })
                .catch(() => {
                    toast.error("Gagal Mendapatkan Data");
                })
            
        }

    }, [uuid])
    

    return <Modal show={show} onClose={hide} className="overflow-y-auto">

        <Modal.Header > <p className="text-blue-500 text-base"> Form Academic</p></Modal.Header>

        <Modal.Body>
            <form onSubmit={handleSubmit(onSubmit)} >

                <div className="flex flex-col gap-1 mb-5">
                    <label htmlFor="universityName" className="text-sm sm:text-base" >Nama Universitas</label>
                    <input  {...register('universityName')} name="universityName" id="universityName" type="text" className="text-sm" placeholder="Kampus" required/>
                </div>

                <div className="flex flex-col gap-1 mb-5">
                    <label htmlFor="majorStudi" className="text-sm sm:text-base" >Program Studi</label>
                    <input  {...register('majorStudi')} name="majorStudi" id="majorStudi" type="text" className="text-sm" placeholder="Informatika" required/>
                </div>

                <div className="flex flex-col gap-1 mb-5">
                    <label htmlFor="jenjangPendidikan" className="text-sm sm:text-base" >Jenjang Pendidikan</label>
                    <input  {...register('jenjangPendidikan')} name="jenjangPendidikan" id="jenjangPendidikan" type="text" className="text-sm" placeholder="Sarjana" required/>
                </div>

                <div className="flex flex-col gap-1 mb-5">
                    <label htmlFor="gpa" className="text-sm sm:text-base" >IPK</label>
                    <input  {...register('gpa', {  valueAsNumber: true })} step="0.001" name="gpa" id="gpa" type="number" min={0} className="text-sm" placeholder="3.00" required/>
                </div>

                <div className="flex flex-col gap-1 mb-5">
                    <label htmlFor="yearIn" className="text-sm sm:text-base" >Tahun Masuk</label>
                    <input  {...register('yearIn', { valueAsNumber: true })} name="yearIn" id="yearIn" type="number" min={0} className="text-sm" placeholder="2020" required/>
                </div>

                <div className="flex flex-col gap-1 mb-5">
                    <label htmlFor="yearOut" className="text-sm sm:text-base" >Tahun Lulus</label>
                    <input  {...register('yearOut', { valueAsNumber: true })} name="yearOut" id="yearOut" type="number" min={0} className="text-sm" placeholder="2024" required/>
                </div>

                <div className="flex flex-col gap-1 mb-5">
                    <label htmlFor="city" className="text-sm sm:text-base" >Kota</label>
                    <input  {...register('city')} name="city" id="city" type="text" className="text-sm" placeholder="Semarang" required/>
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