import Link from "next/link"
import Image from 'next/image';
import { FaGoogle } from "react-icons/fa";
import { GiGraduateCap } from "react-icons/gi";
const basePath = process.env.NEXT_PUBLIC_BASEPATH;

export default function Auth(){
    return (
        <main className="mx-3" >            
            <div className="flex items-center justify-center h-screen bg-cover bg-center">
                <div className="flex flex-col sm:flex-row w-full max-w-4xl mx-auto">
                    
                    {/* Bagian Kiri */}
                    <div className="sm:w-1/2 bg-white rounded-lg shadow-lg dark:bg-gray-800 hidden sm:flex flex-col items-center justify-center">
                        <div className="w-full h-auto mb-5 flex justify-center items-center" >
                            <Image priority src={`${basePath}/logo/logo-sti.png`} alt="STI Udinus Logo"  width={400} height={400} style={{ maxWidth: '50%', height: 'auto' }}  />
                        </div>

                        <div className='w-full h-auto mb-3 flex justify-center items-center ' >
                            <Image priority src={`${basePath}/draw/graduation.png`} alt="Beach day illustration" width={400} height={400} style={{ maxWidth: '60%', height: 'auto',  }}  />   
                        </div>

                        <p className="text-xl text-blueSTI font-bold ">Sistem Alumni</p>
                        <p className="text-xl text-blueSTI dark:text-blue-500">Universitas Dian Nuswantoro</p>
                    </div>

                    {/* Bagian Login */}
                    <div className=" flex items-center justify-center p-4 sm:p-0">
                        <div className="w-full max-w-sm sm:max-w-lg rounded-lg shadow-lg dark:bg-gray-800 mx-auto sm:p-10 p-8" style={{ backgroundColor: '#80C4E9' }}>
                            {/* Bagian Udinus (Mode Mobile) */}
                            <div className="flex sm:hidden flex-col items-center mb-4">
                                <div className="w-full h-auto mb-5 flex justify-center items-center" >
                                    <Image priority src={`${basePath}/logo/logo-sti.png`} alt="STI Udinus Logo"  width={400} height={400} style={{ maxWidth: '60%', height: 'auto' }}  />
                                </div>
                                <p className="text-sm text-blue-900 font-bold">Sistem Alumni</p>
                                <p className=" text-blue-900 dark:text-blue-500">Universitas Dian Nuswantoro</p>
                            </div>                                

                            <Image priority src={`${basePath}/draw/roleLogin.png`} alt="Beach day illustration" width={400} height={400} style={{ maxWidth: '100%', height: 'auto'}} />

                            <Link href={"/auth/login?type=alumni"}>
                                <button type="button" className="shadow-lg flex items-center justify-center gap-2 text-white bg-blueSTI hover:bg-blue-900 focus:ring-1 focus:outline-none focus:ring-yellow-200 focus:border-yellow-200 border-2 font-bold rounded-lg text-sm w-full sm:w-180 px-5 py-2 text-center mt-2"><GiGraduateCap className="text-2xl"/>Login Alumni</button>
                            </Link>

                            <Link href={"/auth/login?type=student"}>
                                <button type="button" className="shadow-lg flex items-center justify-center gap-2 text-white bg-blueSTI hover:bg-blue-900 focus:ring-1 focus:outline-none focus:ring-yellow-200 focus:border-yellow-200 border-2 font-bold rounded-lg text-sm w-full sm:w-180 px-5 py-2.5 text-center mt-2"><FaGoogle className="text-xl"/>Login Mahasiswa</button>
                            </Link>

                            <Link href={"/auth/login?type=coordinatorAndmitra"}>
                                <button type="button" className="shadow-lg flex items-center justify-center gap-2 text-white bg-blueSTI hover:bg-blue-900 focus:ring-1 focus:outline-none focus:ring-yellow-200 focus:border-yellow-200 border-2 font-bold rounded-lg text-sm w-full sm:w-180 px-5 py-2.5 text-center mt-2">Login Koordinator & Mitra</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}