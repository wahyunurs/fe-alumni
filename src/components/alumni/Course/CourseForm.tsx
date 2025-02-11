'use client'

import { Modal } from "flowbite-react";
import { useEffect } from "react";
import { useForm, SubmitHandler } from 'react-hook-form';
import { useCourse } from '@/hooks/alumni/course/useStore.hook';
import { toast } from 'sonner';

type Inputs = {
    courseName: string;
    courseAgency: string;
    courseLevel: string;
    year: number | null;
};


export default function AwardForm({ show, hide, uuid }: { show?: boolean , hide?: () => void, uuid?: string | null }){

    const { register, handleSubmit, reset, setValue } = useForm<Inputs>();
    const { detailCourse, postCourse, updateCourse } = useCourse();

    const onSubmit: SubmitHandler<Inputs> =  async (data) => {

        const formData = uuid ? new URLSearchParams() : new FormData();

        if (data.courseName) formData.append("nama_course", String(data.courseName));
        if (data.courseAgency) formData.append("institusi_course", String(data.courseAgency));
        if (data.courseLevel) formData.append("tingkat_course", String(data.courseLevel));
        if (data.year) formData.append("tahun_course", String(data.year));
        
        if (!uuid) await postCourse(formData)
            .then(() => {
                toast.success("Success post data");
            }).catch(() => {
                toast.error("Failed post data");
            });

        if (uuid) await updateCourse(formData, uuid)
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

            detailCourse(uuid)
                .then((item) => {
                    
                    setValue("courseName", item?.nama_course ? item?.nama_course : "" );
                    setValue("courseAgency", item?.institusi_course ? item.institusi_course : "");
                    setValue("courseLevel", item?.tingkat_course ? item.tingkat_course : "");
                    setValue("year", item?.tahun_course ? item?.tahun_course : null);
                })
            

        }

    }, [uuid])
    

    return <Modal show={show} onClose={hide} className="overflow-y-auto">
        <Modal.Header > <p className="text-blue-500 text-base"> Form Course</p></Modal.Header>

        <Modal.Body>
            <form onSubmit={handleSubmit(onSubmit)} >

                <div className="flex flex-col gap-1 mb-5">
                    <label htmlFor="courseName" className="text-sm sm:text-base" >Nama Course</label>
                    <input  {...register('courseName')} name="courseName" id="courseName" type="text" className="text-sm" placeholder="Majesty" required/>
                </div>

                <div className="flex flex-col gap-1 mb-5">
                    <label htmlFor="courseAgency" className="text-sm sm:text-base" >Nama Institusi Course</label>
                    <input  {...register('courseAgency')} name="courseAgency" id="courseAgency" type="text" className="text-sm" placeholder="Master Duel" required/>
                </div>

                <div className="flex flex-col gap-1 mb-5">
                    <label htmlFor="courseLevel" className="text-sm sm:text-base" >Tingkat Course</label>
                    <select {...register('courseLevel')} name="courseLevel" id="courseLevel" required>
                            <option value="" >-none-</option>
                            <option value="lokal" >Lokal</option>
                            <option value="nasional" >Nasional</option>
                            <option value="internasional" >Internasional</option>
                    </select>
                </div>

                <div className="flex flex-col gap-1 mb-5">
                    <label htmlFor="year" className="text-sm sm:text-base" >Tahun Course</label>
                    <input  {...register('year', { valueAsNumber: true })} name="year" id="year" type="number" min={0} className="text-sm" placeholder="2020" required/>
                </div>

                <button type="submit" className="bg-blue-500 px-5 py-1 rounded-md text-white w-full sm:w-auto ">Submit</button>

            </form>
        </Modal.Body>
    </Modal>
}