'use client'

import { Modal } from "flowbite-react";
import { useEffect } from "react";
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAward } from '@/hooks/alumni/award/useStore.hook';
import { toast } from 'sonner';

type Inputs = {
    awardName: string;
    awardAgency: string;
    awardLevel: string;
    year: number | null;
    note: string;
};


export default function AwardForm({ show, hide, uuid }: { show?: boolean , hide?: () => void, uuid?: string | null }){

    const { detailAward, updateAward, postAward } = useAward();
    const { register, handleSubmit, reset, setValue } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> =  async (data) => {

        const formData = uuid ? new URLSearchParams() :  new FormData();

        if (data.awardName) formData.append("nama_award", String(data.awardName));
        if (data.awardAgency) formData.append("institusi_award", String(data.awardAgency));
        if (data.awardLevel) formData.append("tingkat_award", String(data.awardLevel));
        if (data.year) formData.append("tahun_award", String(data.year));
        if (data.note) formData.append("deskripsi_award", String(data.note));
        
        if (!uuid) await postAward(formData)
            .then(() => {
                toast.success("Success post data");
            })
            .catch(() => {
                toast.error("Failed post data");
            });

        

        if (uuid) await updateAward(formData, uuid)
            .then(() => {
                toast.success("Success update data");
            })
            .catch(() => {
                toast.error("Failed update data");
            });
        
        reset();
        if (hide) hide();
    }

    useEffect(() => {

        if (uuid) {

            detailAward(uuid)
                .then((item) => {
                    
                    setValue("awardName", item?.nama_award ? item?.nama_award : "");
                    setValue("awardAgency", item?.institusi_award ? item?.institusi_award : "");
                    setValue("awardLevel", item?.tingkat_award ? item?.tingkat_award : "");
                    setValue("year", item?.tahun_award ? Number(item?.tahun_award)  : null);
                    setValue("note", item?.deskripsi_award ? item?.deskripsi_award : "");
                })
            

        }

    }, [uuid])
    

    return <Modal show={show} onClose={hide} className="overflow-y-auto">
        <Modal.Header > <p className="text-blue-500 text-base"> Form Award</p></Modal.Header>

        <Modal.Body>
            <form onSubmit={handleSubmit(onSubmit)} >

                <div className="flex flex-col gap-1 mb-5">
                    <label htmlFor="awardName" className="text-sm sm:text-base" >Nama Award</label>
                    <input  {...register('awardName')} name="awardName" id="awardName" type="text" className="text-sm" placeholder="Majesty" required/>
                </div>

                <div className="flex flex-col gap-1 mb-5">
                    <label htmlFor="awardAgency" className="text-sm sm:text-base" >Nama Institusi Award</label>
                    <input  {...register('awardAgency')} name="awardAgency" id="awardAgency" type="text" className="text-sm" placeholder="Master Duel" required/>
                </div>

                <div className="flex flex-col gap-1 mb-5">
                    <label htmlFor="awardLevel" className="text-sm sm:text-base" >Tingkat Award</label>
                    <select {...register('awardLevel')} name="awardLevel" id="awardLevel" required>
                            <option value="" >-none-</option>
                            <option value="lokal" >Lokal</option>
                            <option value="nasional" >Nasional</option>
                            <option value="internasional" >Internasional</option>
                    </select>
                </div>

                <div className="flex flex-col gap-1 mb-5">
                    <label htmlFor="year" className="text-sm sm:text-base" >Tahun Award</label>
                    <input  {...register('year', { valueAsNumber: true })} name="year" id="year" type="number" min={0} className="text-sm" placeholder="2020" required/>
                </div>

                <div className="flex flex-col gap-1 mb-5">
                    <label htmlFor="note" className="text-sm sm:text-base" >Catatan</label>
                    <textarea  {...register('note')} rows={10} name="note" id="note" className="text-sm" placeholder="Telah melaksanakan dengan baik" required/>
                </div>

                <button type="submit" className="bg-blue-500 px-5 py-1 rounded-md text-white w-full sm:w-auto ">Submit</button>

            </form>
        </Modal.Body>
    </Modal>
}