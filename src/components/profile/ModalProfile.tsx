'use client'

import { Modal } from "flowbite-react";
import { useForm, SubmitHandler } from 'react-hook-form';
import { useProfile } from '@/hooks/profile/alumni/useStore.hook';
import { getUser } from '@/hooks/auth/authClient';
import { toast } from 'sonner';
import { useState } from 'react'; // Tambahkan untuk mengelola state error

type Inputs = {
    pProfile: FileList;
};

export default function ModalProfile({ show, hide }: { show?: boolean, hide?: () => void, uuid?: string }) {

    const { register, handleSubmit, reset } = useForm<Inputs>();
    const { uploadPhotoAdmin, uploadPhotoAlumni, uploadPhotoMitra } = useProfile();

    const [errorMessage, setErrorMessage] = useState(''); // State untuk error message

    const onSubmit: SubmitHandler<Inputs> = async (data) => {

        const file = data.pProfile[0];
        const formData = new FormData();
        const fetchedUser = getUser();

        if (file) {
            // Validasi ukuran file lebih dari 2MB
            if (file.size > 2 * 1024 * 1024) {
                setErrorMessage('File size exceeds 2MB. Please upload a smaller file.');
                return; // Jangan lanjutkan jika file terlalu besar
            }
            formData.append('foto_profil', file);
        }

        if (fetchedUser?.roles.includes('alumni')) {
            await uploadPhotoAlumni(formData)
                .then(() => {
                    toast.success("Photo updated successfully");
                })
                .catch(() => {
                    toast.error("Failed to upload photo");
                });
        }

        if (fetchedUser?.roles.includes('admin')) {
            await uploadPhotoAdmin(formData)
                .then(() => {
                    toast.success("Photo updated successfully");
                })
                .catch(() => {
                    toast.error("Failed to upload photo");
                });
        }

        if (fetchedUser?.roles.includes('mitra')) {
            await uploadPhotoMitra(formData)
                .then(() => {
                    toast.success("Photo updated successfully");
                })
                .catch(() => {
                    toast.error("Failed to upload photo");
                });
        }

        reset();
        if (hide) hide();
    }

    return <Modal show={show} onClose={hide}>
        <Modal.Header> <p className="text-blue-500 text-base">Upload Photo Profile</p></Modal.Header>

        <Modal.Body>
            <form onSubmit={handleSubmit(onSubmit)} >

                <div className="flex flex-col gap-1 mb-3">
                    <label htmlFor="photo-profile-input">Choose Photo</label>
                    <input {...register('pProfile')} name="pProfile" id="photo-profile-input" type="file" className="file:bg-red-600" />
                    {errorMessage && (
                        <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
                    )}
                </div>

                <button type="submit" className="bg-blue-500 px-5 py-1 rounded-full text-white">
                    Upload
                </button>
            </form>
        </Modal.Body>
    </Modal>
}
