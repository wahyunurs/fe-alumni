'use client'

import { Modal } from "flowbite-react";
import { useEffect } from "react";
import { useForm, SubmitHandler } from 'react-hook-form';
import { useStatistik } from '@/hooks/statistik/statikstik.hook';
import { toast } from 'sonner';


type Inputs = {
    graduateYear: number | null;
    totalAlumni: number | null;
};


export default function StatistikForm({ show, done, uuid }: { show?: boolean , done?: () => void, uuid?: string | null }){

    const { show: showStatistik, update: updateStatistik, post: postStatistik } = useStatistik();
    const { register, handleSubmit, reset, setValue } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> =  async (data) => {

        const formData = uuid ? new URLSearchParams() :  new FormData();

        formData.append("tahun_lulus", String(data.graduateYear));
        formData.append("alumni_total", String(data.totalAlumni));
        
        if (!uuid) await postStatistik(formData)
            .then(() => {
                toast.success("Success post data");
            })
            .catch(() => {
                toast.error("Tahun statistik yang anda inputkan sudah tersedia!");
            });

        

        if (uuid) await updateStatistik(formData, uuid)
            .then(() => {
                toast.success("Success update data");
            })
            .catch(() => {
                toast.error("Tahun statistik yang anda inputkan sudah tersedia!");
            });
        
        reset();
        if (done) done();
    }

    useEffect(() => {
        if (uuid) {
            showStatistik(uuid)
                .then((item) => { 
                    setValue("graduateYear", item?.tahun_lulus ?? null);
                    setValue("totalAlumni", item?.alumni_total ?? null);
                })
        }
    }, [uuid])
    

    return <Modal show={show} onClose={done} className="overflow-y-auto">
        <Modal.Header > <p className="text-blue-500 text-base"> Form Statistik</p></Modal.Header>

        <Modal.Body>
            <form onSubmit={handleSubmit(onSubmit)} >

                <div className="flex flex-col gap-1 mb-5">
                    <label htmlFor="graduateYear" className="text-sm sm:text-base" >Tahun Lulus</label>
                    <input  {...register('graduateYear')} name="graduateYear" id="graduateYear" type="number" min={0} className="text-sm" placeholder="2020" required />
                </div>

                <div className="flex flex-col gap-1 mb-5">
                    <label htmlFor="totalAlumni" className="text-sm sm:text-base" >Total Alumni</label>
                    <input  {...register('totalAlumni')} name="totalAlumni" id="totalAlumni" type="number" min={0} className="text-sm" placeholder="100" required />
                </div>

                <button type="submit" className="bg-blue-500 px-5 py-1 rounded-md text-white w-full sm:w-auto ">Submit</button>

            </form>
        </Modal.Body>
    </Modal>
}