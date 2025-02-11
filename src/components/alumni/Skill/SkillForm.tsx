'use client'

import { Modal } from "flowbite-react";
import { useEffect } from "react";
import { useForm, SubmitHandler } from 'react-hook-form';
import { useSkill } from '@/hooks/alumni/skill/useStore.hook';
import { getTingkatKemampuan } from '@/constant/skill/tingkatKemampuan';
import { toast } from 'sonner';

type Inputs = {
    teamwork: string; 
    expertiseIt: string; 
    expertiseEnglish: string; 
    expertiseCommunication: string; 
    selfDevelopment: string; 
    leadership: string; 
    workEtnic: string; 
};


export default function OrganizationForm({ show, hide, uuid }: { show?: boolean , hide?: () => void, uuid?: string | null }){

    const { register, handleSubmit, reset, setValue } = useForm<Inputs>();
    const { detailSkill, postSkill, updateSkill } = useSkill();
    const { data: optionsTinkatKemampuan } = getTingkatKemampuan();

    const onSubmit: SubmitHandler<Inputs> =  async (data) => {

        const formData = uuid ? new URLSearchParams() : new FormData();

        if (data.teamwork) formData.append("kerjasama_skill", String(data.teamwork));
        if (data.expertiseIt) formData.append("ahli_skill", String(data.expertiseIt));
        if (data.expertiseEnglish) formData.append("inggris_skill", String(data.expertiseEnglish));
        if (data.expertiseCommunication) formData.append("komunikasi_skill", String(data.expertiseCommunication));
        if (data.selfDevelopment) formData.append("pengembangan_skill", String(data.selfDevelopment));
        if (data.leadership) formData.append("kepemimpinan_skill", String(data.leadership));
        if (data.workEtnic) formData.append("etoskerja_skill", String(data.workEtnic));
        
        if (!uuid) await postSkill(formData)
            .then(() => {
                toast.success("Success post data");
            })
            .catch(() => {
                toast.error("Failed post data");
            });

        if (uuid)await updateSkill(formData, uuid)
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

            detailSkill(uuid)
                .then((item) => {
                    
                    setValue("teamwork", item?.kerjasama_skill ? item?.kerjasama_skill : "");
                    setValue("expertiseIt", item?.ahli_skill ? item?.ahli_skill : "");
                    setValue("expertiseEnglish", item?.inggris_skill ? item?.inggris_skill : "");
                    setValue("expertiseCommunication", item?.komunikasi_skill ? item?.komunikasi_skill : "");
                    setValue("selfDevelopment", item?.pengembangan_skill ? item?.pengembangan_skill : "");
                    setValue("leadership", item?.kepemimpinan_skill ? item?.kepemimpinan_skill : "");
                    setValue("workEtnic", item?.etoskerja_skill ? item?.etoskerja_skill : "");
                })
            
        }

    }, [uuid])
    

    return <Modal show={show} onClose={hide} className="overflow-y-auto">

        <Modal.Header > <p className="text-blue-500 text-base"> Form Skill</p></Modal.Header>

        <Modal.Body>
            <form onSubmit={handleSubmit(onSubmit)} >

                <div className="flex flex-col gap-1 mb-5">
                    <label htmlFor="teamwork" className="text-sm sm:text-base" >Kerjasama Tim</label>
                    <select {...register('teamwork')} name="teamwork" id="teamwork" required>
                            <option value="" >-none-</option>
                            { optionsTinkatKemampuan?.map((item) => {
                                return <option key={item.key} value={item.value} >{item.label}</option>
                            })}
                    </select>
                </div>

                <div className="flex flex-col gap-1 mb-5">
                    <label htmlFor="expertiseIt" className="text-sm sm:text-base" >Keahlian di Bidang IT</label>
                    <select {...register('expertiseIt')} name="expertiseIt" id="expertiseIt" required>
                            <option value="" >-none-</option>
                            { optionsTinkatKemampuan?.map((item) => {
                                return <option key={item.key} value={item.value} >{item.label}</option>
                            })}
                    </select>
                </div>

                <div className="flex flex-col gap-1 mb-5">
                    <label htmlFor="expertiseEnglish" className="text-sm sm:text-base" >Kemampuan Berbahasa Inggris</label>
                    <select {...register('expertiseEnglish')} name="expertiseEnglish" id="expertiseEnglish" required>
                            <option value="" >-none-</option>
                            { optionsTinkatKemampuan?.map((item) => {
                                return <option key={item.key} value={item.value} >{item.label}</option>
                            })}
                    </select>
                </div>

                <div className="flex flex-col gap-1 mb-5">
                    <label htmlFor="expertiseCommunication" className="text-sm sm:text-base" >Kemampuan Berkomunikasi</label>
                    <select {...register('expertiseCommunication')} name="expertiseCommunication" id="expertiseCommunication" required>
                            <option value="" >-none-</option>
                            { optionsTinkatKemampuan?.map((item) => {
                                return <option key={item.key} value={item.value} >{item.label}</option>
                            })}
                    </select>
                </div>

                <div className="flex flex-col gap-1 mb-5">
                    <label htmlFor="selfDevelopment" className="text-sm sm:text-base" >Pengembangan Diri</label>
                    <select {...register('selfDevelopment')} name="selfDevelopment" id="selfDevelopment" required>
                            <option value="" >-none-</option>
                            { optionsTinkatKemampuan?.map((item) => {
                                return <option key={item.key} value={item.value} >{item.label}</option>
                            })}
                    </select>
                </div>

                <div className="flex flex-col gap-1 mb-5">
                    <label htmlFor="leadership" className="text-sm sm:text-base" >Kepemimpinan</label>
                    <select {...register('leadership')} name="leadership" id="leadership" required>
                            <option value="" >-none-</option>
                            { optionsTinkatKemampuan?.map((item) => {
                                return <option key={item.key} value={item.value} >{item.label}</option>
                            })}
                    </select>
                </div>

                <div className="flex flex-col gap-1 mb-5">
                    <label htmlFor="workEtnic" className="text-sm sm:text-base" >Etos Kerja</label>
                    <select {...register('workEtnic')} name="workEtnic" id="workEtnic" required>
                            <option value="" >-none-</option>
                            { optionsTinkatKemampuan?.map((item) => {
                                return <option key={item.key} value={item.value} >{item.label}</option>
                            })}
                    </select>
                </div>

                <button type="submit" className="bg-blue-500 px-5 py-1 rounded-md text-white w-full sm:w-auto ">Submit</button>

            </form>
        </Modal.Body>
    </Modal>
}