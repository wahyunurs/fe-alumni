'use client';

import { HiLocationMarker, HiOfficeBuilding } from "react-icons/hi";
import { useDashboardAlumni } from '@/hooks/dashboard/alumni/useStore.hook';
import { useState, useEffect } from 'react';

import Image from 'next/image';
import Link from "next/link";
import LokerShow from "@/components/loker/LokerShow";

export default function DashboardLoker() {
    const { dataDashboardLoker, getDashbLoker } = useDashboardAlumni();
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
        getDashbLoker();
    }, [])

    return (
        <section className="mb-5 space-y-6">
            <section>
                {openModalShow && <LokerShow show={openModalShow} onDone={onDone} uuid={selectUuid} />}
            </section>

            <div className="mb-6 space-y-3">
                <div>
                    <h2 className="text-2xl font-semibold text-gray-900">Explore a World of Job Opportunities</h2>
                    <p className="text-gray-600 text-justify">
                    In today&apos;s dynamic job market, opportunities are abundant for those seeking to embark on a new career path or advance in their current one. Whether you&apos;re a seasoned professional or just starting out, there are numerous fields and industries actively looking for talented individuals like you. From tech startups to established corporations, the demand for innovative minds is growing.
                    </p>

                    <p className='text-right font-semibold text-blue-500'>
                        <Link href="/dashboard/logang">Discover More</Link>
                    </p>
                </div>
            </div>

                        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-10">
            {dataDashboardLoker?.map((item) => (
                <div key={item.id} className="group transition-all ease-in-out transform hover:scale-105">
                
                {/* Kotak Biru */}
                <div onClick={() => onClickButton(String(item.id))} className="bg-blue-500 w-full h-48 rounded-lg relative overflow-hidden group-hover:bg-blue-400 transition-colors ease-in hover:cursor-pointer shadow-lg">
                    <div className="absolute inset-0 bg-black opacity-20 group-hover:opacity-40"></div>
                </div>

                {/* Deskripsi Lowongan */}
                <div className="shadow-lg rounded-lg p-6 bg-white flex flex-col space-y-4 group-hover:shadow-2xl transition-shadow ease-in-out duration-300 transform group-hover:-translate-y-2">
                    
                    {/* Header */}
                    <div className="flex gap-x-4 items-center">
                    <div className="w-14 h-14 border border-blue-500 rounded-full overflow-hidden">
                        <Image
                        src={`${basePath}/draw/undraw_Experience_design_re_dmqq.png`}
                        alt='dashboard-image'
                        width={56}
                        height={56}
                        className='object-cover w-full h-full'
                        />
                    </div>
                    <p className='font-semibold text-xl text-gray-800'>{item.NamaPerusahaan}</p>
                    </div>

                    {/* Posisi */}
                    <p className='font-semibold text-gray-500 text-sm'>{item.Posisi}</p>

                    {/* Tag */}
                    <button className='bg-orangeSTI text-sm py-1 px-6 rounded-full text-white font-medium transition-all duration-200 hover:bg-orangeSTI'>
                    {item.Tags}
                    </button>

                    {/* Detail Info */}
                    <div className="flex gap-x-4 text-gray-500 text-sm">
                    <span className="flex items-center gap-x-2">
                        <HiLocationMarker /> {item.Alamat}
                    </span>
                    <span className="flex items-center gap-x-2">
                        <HiOfficeBuilding /> {item.TipeKerja}
                    </span>
                    </div>
                </div>
                </div>
            ))}
            </div>

        </section>
    );
}
