'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';
import { login as submitLogin } from '@/hooks/auth/authClient';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { HiAdjustments } from "react-icons/hi";
import { FaGoogle } from "react-icons/fa";
import { Spinner } from "flowbite-react";

type Inputs = {
    email: string;
    password: string;   
}

enum LoginType {
    student = "student",
    alumni = "alumni" ,
    coordinatorAndmitra =  "coordinator&mitra", 
}

export default function Login({ searchParams }: { searchParams: { type: LoginType }}){

    const router = useRouter();
    const { register, handleSubmit, reset } = useForm<Inputs>();
    const [isDisabled, setIsDisabled] = useState(false);
    
    const { type: loginType } = searchParams;

    const onLoginGoogle = async () => {
        const url =  process.env.NEXT_PUBLIC_BACKEND_API_URL;
        if (url) return router.push(`${url}/api/login/mahasiswa`);
    }

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const formData = new FormData();
        setIsDisabled(true);
        
        if (data.email) formData.append("email", data.email);
        if (data.password) formData.append("password", data.password);

        try {
            await submitLogin(formData);
            toast.success("Log in successfully");
            return router.replace("/dashboard");
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Login Failed";
            toast.error(errorMessage);
        }

        setIsDisabled(false);
        reset();        
    }  
      
    const basePath = process.env.NEXT_PUBLIC_BASEPATH;


    useEffect(() => {
        if (!loginType || !(loginType in LoginType)) router.push('/');
    }, [loginType, router]);
    

    return <main className='py-5 px-5 sm:px-8 rounded-lg shadow-lg flex w-full max-w-2xl mx-10 gap-x-3 ' >

        <div className='w-full flex-initial p-3' >

            <div className='flex gap-3 items-center mb-5' >
                <Link href={"/auth"} ><HiAdjustments className='text-2xl hover:text-blue-500' /></Link>
                <h2 className="text-2xl font-semibold " >Login</h2>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="mx-auto">

                <div className="mb-5">
                    <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-900 ">Your email</label>
                    <input {...register('email')} type="email" id="email" name='email' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="alumni@gmail.com" required />
                </div>

                <div className="mb-5">
                    <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-900 ">Your password</label>
                    <input {...register('password')} type="password" id="password" name='password' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder='xxxxxxxxx' required />
                </div>

                <p className='text-xs my-3 text-center sm:text-left text-blueSTI ' > <Link  href={"/auth/forgot-password"} >Forgot your password ?</Link></p>
                
                <button disabled={isDisabled} type="submit" className="shadow-lg disabled:bg-gray-400 text-white bg-blueSTI hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center mb-3"  > { isDisabled ? <Spinner size='sm' color='info' /> : "Submit"} </button>

                {
                    (loginType === LoginType.student) && (
                        <button onClick={onLoginGoogle} disabled={isDisabled} type="button" className=" shadow-lg disabled:bg-gray-400  hover:bg-gray-100 focus:ring-1 border focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center flex items-center justify-center gap-3"  >
                            <FaGoogle/>
                            Login By Google
                        </button>
                    ) 
                }
                
                {
                    (loginType === LoginType.alumni) && (
                        <p className='text-xs my-5 text-center' >Dont have an account ? you can <span className='text-blueSTI' > <Link  href={"/auth/register"} >register</Link> </span>  first</p>
                    )
                }
            </form>

        </div>

        <div className='hidden w-full flex-initial justify-center h-auto md:flex items-center  ' >

            <div  >
                <Image priority src={`${basePath}/draw/graduation.png`} alt="Beach day illustration" width={400} height={400} style={{ maxWidth: '100%', height: 'auto' }} />

                <p className="font-semibold mb-5 text-gray-400 text-center " >Welcome back, </p>

            </div>

        </div>

    </main>


    
}