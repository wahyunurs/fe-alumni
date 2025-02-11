'use client';

import { HiLocationMarker, HiOfficeBuilding } from "react-icons/hi";
import { useDashboardAlumni } from '@/hooks/dashboard/alumni/useStore.hook';
import { useState, useEffect } from 'react';

import Image from 'next/image';
import Link from "next/link";
import LogangShow from "@/components/logang/LogangShow";

export default function DashboardLogang() {
    const { dataDashboardLogang, getDashbLogang } = useDashboardAlumni();
    const [openModalShow, setOpenModalShow] = useState<boolean>(false);
    const [selectUuid, setSelectUuid] = useState<string>();
    const basePath = process.env.NEXT_PUBLIC_BASEPATH;

    const onClickButton = (uuid: string) => {
        setSelectUuid(uuid);
        setOpenModalShow(true);
    }

    const onDone = () => {
        setOpenModalShow(false);
    }

    useEffect(() => {
        getDashbLogang();
    }, [])

    return (
        <section className="mb-5 space-y-6">
            <section>
                {openModalShow && <LogangShow show={openModalShow} onDone={onDone} uuid={selectUuid} />}
            </section>

            <div className="mb-6 space-y-3">
                <div>
                    <h2 className="text-2xl font-semibold text-gray-900">Explore Internship Opportunities</h2>
                    <p className="text-gray-600 text-justify">
                        Internships provide invaluable opportunities to gain hands-on experience and build a strong foundation for your future career. Whether you're a student or a recent graduate, discover internships in various fields and industries that align with your aspirations.
                    </p>

                    <p className='text-right font-semibold text-blue-500'>
                        <Link href="/dashboard/logang">Discover More</Link>
                    </p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
                {dataDashboardLogang?.map((item) => (
                    <div key={item.id} className="group transition-all ease-in-out transform hover:scale-105">
                        <div onClick={() => onClickButton(String(item.id))} className="bg-blue-500 w-full h-48 rounded-lg relative overflow-hidden group-hover:bg-blue-400 transition-colors ease-in hover:cursor-pointer">
                            <div className="absolute inset-0 bg-black opacity-20 group-hover:opacity-40"></div>
                        </div>

                        <div className="shadow-lg rounded-lg p-6 bg-white flex flex-col space-y-4">
                            <div className='flex gap-x-4 items-center'>
                                <div className='w-12 h-12 border border-blue-500 rounded-full overflow-hidden'>
                                    <Image
                                        src={`${basePath}/draw/undraw_Experience_design_re_dmqq.png`}
                                        alt='dashboard-image'
                                        width={48}
                                        height={48}
                                        className='object-cover w-full h-full'
                                    />
                                </div>
                                <p className='font-semibold text-xl'>{item.NamaPerusahaan}</p>
                            </div>

                            <p className='font-semibold text-gray-400 text-sm'>{item.Posisi}</p>

                            <button className='bg-yellow-300 text-sm py-1 px-5 rounded-full mb-2'>{item.Tags}</button>

                            <div className="flex gap-x-4 text-gray-500 text-sm">
                                <span className="flex items-center gap-x-2"><HiLocationMarker /> {item.Alamat}</span>
                                <span className="flex items-center gap-x-2"><HiOfficeBuilding /> {item.TipeMagang}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
