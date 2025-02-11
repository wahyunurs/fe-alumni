'use client';

import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useForgotPassword } from '@/hooks/auth/forgotPassword';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

type Inputs = {
    // * Main
    email: string;
    password: string;
    rePassword: string;
    formOtp: string;
}

export default function ForgotPassword(){

    // * Initialization
    const router = useRouter();

    const { sendOtp, verifyOtp, resetPassword, isOtpSend, isVerified } = useForgotPassword();
    const { register, handleSubmit, reset } = useForm<Inputs>();
    const [ status, setStatus ] = useState<'sendOtp' | 'verifyOtp' | 'resetPassword'>('sendOtp');

    // * Function
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        
        const formData = new FormData();
        if (data.email) formData.append('email', data.email);
        if (data.formOtp) formData.append('otp', data.formOtp);
        if (data.password) formData.append('password', data.password);
        if (data.rePassword) formData.append('password_confirmation', data.rePassword);

        if (status === 'sendOtp') {

            sendOtp(formData)
                .then(() => {

                    setStatus('verifyOtp');

                    toast.success("OTP has been sent into yout mail! Please check.");


                })
                .catch(() => {

                    toast.error("Failed to send OTP");
                    
                })
            
            return;
            
        }

        if (status === 'verifyOtp' && isOtpSend) {

            await verifyOtp(formData)
                .then(() => {
                    
                    setStatus('resetPassword');

                    toast.success("OTP has been verified!");

                })
                .catch(() => {

                    toast.error("Failed to verify OTP!");

                    
                });

            return;
        }

        if (status === 'resetPassword' && isVerified ) {

            if (data.password !== data.rePassword) return toast.error("Your password doesnt match");

            resetPassword(formData)
                .then(() => {

                    reset();

                    toast.success("Password has been reset!");

                    router.replace('/auth/login');
                    
                }).catch(() => {

                    toast.error("Failed to reset password");
                    
                });

            return 

        }
        
    }

    return (
        <main className='py-5 sm:px-8 rounded-lg shadow w-full max-w-lg mx-10 ' >
            <h3 className='font-semibold text-center text-blue-500 my-8' >Alumni Udinus</h3>
            <p className='mb-8' >Enter the email associated with your account and we will send you a code to reset your password</p>
            <form onSubmit={handleSubmit(onSubmit)} className="mx-auto mb-3">

                {status === 'sendOtp' && (
                    <div className="mb-5">
                        <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-900 ">Your email</label>
                        <input {...register('email')} type="email" id="email" name='email' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="alumni@mhs.co.id" required />
                    </div>
                )}
 
                {status === 'verifyOtp' && isOtpSend && (
                    <div className="mb-5">
                        <label htmlFor="formOtp" className="block mb-1 text-sm font-medium text-gray-900 ">Your OTP</label>
                        <input {...register('formOtp')} type="text" id="formOtp" name='formOtp' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " maxLength={6} placeholder="135246" required />
                    </div>
                )}

                {status === 'resetPassword' && isVerified && (
                    <div>

                        <div className="mb-5">
                            <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-900 ">Your New Password</label>
                            <input {...register('password')} type="password" id="password" name='password' minLength={8} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="some secret password" required />
                        </div>

                        <div className="mb-5">
                            <label htmlFor="rePassword" className="block mb-1 text-sm font-medium text-gray-900 ">Confirm Your Password</label>
                            <input {...register('rePassword')} type="password" id="rePassword" name='rePassword' minLength={8} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="some secret password" required />
                        </div>

                    </div>
                )}


                <button type="submit" className="text-white bg-blueSTI hover:bg-blueSTI focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center ">
                    { status === 'sendOtp' ? "Send Email" : status === 'verifyOtp' ? "Verify OTP" : status === 'resetPassword' ? "Reset Password" : "" }
                </button>

            </form>

            <Link href="/auth/login" className='text-center text-xs text-blue-500 ' > <p>Return to login</p> </Link>

        </main>
    )
}