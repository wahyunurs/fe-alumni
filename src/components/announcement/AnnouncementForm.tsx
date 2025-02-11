'use client'

import { Modal } from "flowbite-react";
import { useEffect } from "react";
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAnnouncement } from '@/hooks/announcement/announcement.hook';
import { toast } from 'sonner';

type Inputs = {
    title: string;
    content: string;
};


export default function AnnouncementForm({ show, done, uuid }: { show?: boolean , done?: () => void, uuid?: string | null }){

    const { post: postAnnouncement, show: showAnnouncement, update: updateAnnouncement } = useAnnouncement();
    const { register, handleSubmit, reset, setValue } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> =  async (data) => {

        const formData = new FormData();

        if (data.title) formData.append("judul", String(data.title));
        if (data.content) formData.append("isi", String(data.content));
        
        if (!uuid) await postAnnouncement(formData)
            .then(() => {
                toast.success("Success post data");
            })
            .catch(() => {
                toast.error("Failed post data");
            });

        

        if (uuid) await updateAnnouncement(formData, uuid)
            .then(() => {
                toast.success("Success update data");
            })
            .catch(() => {
                toast.error("Failed update data");
            });
        
        reset();
        if (done) done();
    }

    useEffect(() => {

        if (uuid) {
            showAnnouncement(uuid)
                .then((item) => {
                    setValue("title", item?.judul ? item?.judul : "");
                    setValue("content", item?.isi ? item?.isi : "");
                })
        }

    }, [uuid])
    

    return <Modal show={show} onClose={done} className="overflow-y-auto">
        <Modal.Header > <p className="text-blue-500 text-base"> Form Pengumuman</p></Modal.Header>

        <Modal.Body>
            <form onSubmit={handleSubmit(onSubmit)} >

                <div className="flex flex-col gap-1 mb-5">
                    <label htmlFor="title" className="text-sm sm:text-base" >Judul Pengumuman</label>
                    <input  {...register('title')} name="title" id="title" type="text" className="text-sm" placeholder="Judul Pengumuman" required/>
                </div>

                <div className="flex flex-col gap-1 mb-5">
                    <label htmlFor="content" className="text-sm sm:text-base" >Isi pengumuman</label>
                    <textarea {...register('content')} name="content" id="content" rows={10} className="text-sm" placeholder="Isi pengumuman" required/>
                </div>

                <button type="submit" className="bg-blue-500 px-5 py-1 rounded-md text-white w-full sm:w-auto ">Submit</button>

            </form>
        </Modal.Body>
    </Modal>
}