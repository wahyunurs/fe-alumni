'use client';

import Link from 'next/link';
import QuestionerForm from '@/components/kuesioner/questionerForm';
import { useRouter } from 'next/navigation'
 
export default function Register(){

    const router = useRouter()

    return <main className='py-5 px-8 rounded-lg shadow flex flex-col w-full justify-center max-w-xl mx-10 gap-x-3 ' >

        <QuestionerForm done={() => router.push('/auth/login?type=alumni')} />

        <p className='text-xs mt-3 text-center ' >Already have an account ? please <span className='text-blueSTI font-semibold' > <Link  href={"/auth/login?type=alumni"} >login</Link> </span> </p>
        

    </main>


    
}