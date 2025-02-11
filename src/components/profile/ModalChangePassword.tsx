'use client'

import { Modal } from "flowbite-react";
import { useForm, SubmitHandler } from 'react-hook-form';
import { useProfile } from '@/hooks/profile/alumni/useStore.hook';
import { getUser} from '@/hooks/auth/authClient';
import { toast } from 'sonner';


type Inputs = {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
};


export default function ModalChangePassword({ show, hide }: { show: boolean , hide?: () => void, uuid?: string }){

    const { register, handleSubmit, reset } = useForm<Inputs>();
    const { changePasswordAlumni, changePasswordAdmin, changePasswordMitra } = useProfile();

    const onSubmit: SubmitHandler<Inputs> =  async (data) => {

        if (data.confirmPassword !== data.newPassword) return toast.error("Password doesnt match");

        const fetchedUser = getUser();
        const formData = fetchedUser?.roles.includes('alumni') ? new FormData() : new URLSearchParams();
        

        if (data.oldPassword) formData.append("current_password", data.oldPassword);
        if (data.newPassword) formData.append("new_password", data.newPassword);
        if (data.confirmPassword) formData.append("new_password_confirmation", data.confirmPassword);

        if (fetchedUser?.roles.includes('alumni')) await changePasswordAlumni(formData)
            .then(() => {
                toast.success("Password changed succesfully");
            })
            .catch(() => {
                toast.error("Failed");
            });

        if (fetchedUser?.roles.includes('admin')) await changePasswordAdmin(formData)
            .then(() => {
                toast.success("Password changed succesfully");
            })
            .catch(() => {
                toast.error("Failed");
            });

        if (fetchedUser?.roles.includes('mitra')) await changePasswordMitra(formData)
            .then(() => {
                toast.success("Password changed succesfully");
            })
            .catch(() => {
                toast.error("Failed");
            });
        
        reset();
        if (hide) hide();
    }

    return <Modal show={show} onClose={hide} >
        <Modal.Header > <p className="text-blue-500 text-base"> Change Password</p></Modal.Header>

        <Modal.Body>
            <form onSubmit={handleSubmit(onSubmit)} >

                <div className="flex flex-col gap-1 mb-5">
                    <label htmlFor="oldPassword" className="text-sm sm:text-base" >Old Password</label>
                    <input  {...register('oldPassword')} name="oldPassword" id="oldPassword" type="password" className="text-sm" placeholder="Old Password" />
                </div>

                <div className="flex flex-col gap-1 mb-5">
                    <label htmlFor="newPassword" className="text-sm sm:text-base" >New Password</label>
                    <input  {...register('newPassword')} name="newPassword" id="newPassword" type="password" className="text-sm" placeholder="New Password" />
                </div>

                <div className="flex flex-col gap-1 mb-5">
                    <label htmlFor="confirmPassword" className="text-sm sm:text-base" >Confirm New Password</label>
                    <input  {...register('confirmPassword')} name="confirmPassword" id="confirmPassword" type="password" className="text-sm" placeholder="Confirm New Password" />
                </div>

                <button type="submit" className="bg-blue-500 px-5 py-1 rounded-full text-white">Submit</button>
            </form>
        </Modal.Body>
    </Modal>

}