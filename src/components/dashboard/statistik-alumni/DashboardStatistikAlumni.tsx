'use client';

import Image from 'next/image';
import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from 'react';

const DoughnutChart = dynamic(() => import('@/components/chart/chartjs/DoughnoutChart'), { ssr: false });
const LineChart = dynamic(() => import('@/components/chart/chartjs/LineChart'), { ssr: false });

import { useDashboardAdmin } from '@/hooks/dashboard/admin/useDashboardAdmin.hook';
import { DataDiagram } from '@/components/chart/chartjs/DoughnoutChart';

export default function DsahboardStatistikAlumni(){

    const { data, getDashboardAdmin } = useDashboardAdmin();
    const [ dataStatusCount, setDataStatusCount ] = useState<DataDiagram[]>([]);
    const [ dataKerja, setDataKerja ] = useState<DataDiagram[]>([]);
    const basePath = process.env.NEXT_PUBLIC_BASEPATH;

    useEffect(() => {
        getDashboardAdmin()
    }, [])

    useEffect(() => {
        if (data?.jumlahStatus){
            const temp = [];
            for (const [key, value] of Object.entries(data.jumlahStatus)) {
                temp.push({ label: key, data: value });
            }
            setDataStatusCount(temp);
        }
    }, [data?.jumlahStatus])

    useEffect(() => {
        if (data?.bekerja || data?.tidakBekerja){
            const temp = [];
            temp.push({ label: 'Bekerja', data: data.bekerja });
            temp.push({ label: 'Tidak Bekerja', data: data.tidakBekerja });
            setDataKerja(temp);
        }
    }, [data?.bekerja, data?.tidakBekerja])     

    return (
        <main>
                        <div className="flex flex-col sm:flex-row gap-6 mt-4">
                {/* Upload new alumni */}
                <div className="p-4 border-2 border-brown-800 text-brown-600 shadow-sm rounded-lg flex-grow">
                    <div className="flex flex-col sm:flex-row items-center gap-5">
                        <div className="basis-24 aspect-square relative border-brown-500">
                            <Image
                                src={`${basePath}/draw/form.png`}
                                alt="dashboard-image"
                                fill
                            />
                        </div>
                        <div className="text-center sm:text-left">
                            <h4 className="text-sm sm:text-lg font-bold text-amber-900">Upload New Data Alumni</h4>
                            <p className="mb-4 text-sm sm:text-base text-amber-400">
                                Click the button below to upload new user.
                            </p>
                            <a
                                target="_blank"
                                href={`${basePath}/dashboard/import`}
                                rel="noopener noreferrer"
                                className="bg-amber-700 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-white hover:text-amber-800 transition-colors"
                            >
                                Upload Data Alumni
                            </a>
                        </div>
                    </div>
                </div>

                {/* Upload pengumuman */}
                <div className="p-4 border-2 border-brown-800 text-brown-600 shadow-sm rounded-lg flex-grow">
                    <div className="flex flex-col sm:flex-row items-center gap-5">
                        <div className="basis-24 aspect-square relative border-brown-500">
                            <Image
                                src={`${basePath}/draw/form1.png`}
                                alt="dashboard-image"
                                fill
                            />
                        </div>
                        <div className="text-center sm:text-left">
                            <h4 className="text-sm sm:text-lg font-bold text-red-900">Upload Pengumuman</h4>
                            <p className="mb-4 text-sm sm:text-base text-red-400">
                                Click the button below to upload new pengumuman.
                            </p>
                            <a
                                target="_blank"
                                href={`${basePath}/dashboard/import`}
                                rel="noopener noreferrer"
                                className="bg-red-700 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-white hover:text-red-800 transition-colors"
                            >
                                Upload Pengumuman
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <h1 className="font-bold text-xl text-blueSTI text-left mb-2 mt-6">Statistik Alumni</h1>
            <div className="flex flex-col sm:flex-row gap-4 mb-2">
                {/* Persentase Alumni Terlacak - Lebih kecil */}
                <div className="flex items-center basis-1/4 sm:basis-1/6 bg-gradient-to-r from-yellow-300 to-orange-400 shadow-lg rounded-xl p-5 hover:from-yellow-500 hover:to-orange-600 transition-all duration-300">
                    <div >
                        <h1 className="font-bold text-white text-center text-2xl">
                            {data?.persentaseTerlacak}
                        </h1>
                        <h3 className="font-semibold text-white text-center text-sm mb-1">Presentase Alumni Terlacak</h3>
                    </div>
                </div>

                {/* Total Alumni Terlacak */}
                <div className="flex items-center flex-grow bg-gradient-to-r from-green-400 to-green-500 shadow-lg rounded-xl p-5 hover:from-green-500 hover:to-green-600 transition-all duration-300">
                    <div className="flex-shrink-0 bg-white bg-opacity-30 rounded-full p-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M4.93 4.93a10 10 0 0114.14 0m-14.14 0a10 10 0 000 14.14m14.14-14.14a10 10 0 010 14.14" />
                        </svg>
                    </div>
                    <div className="ml-4">
                        <h1 className="font-bold text-white text-2xl">
                            {data?.totalAlumniTerlacak}
                        </h1>
                        <h3 className="font-semibold text-white text-sm mb-1">Jumlah Total Keseluruhan Alumni yang Terlacak</h3>
                    </div>
                </div>

                {/* Alumni Terlacak Lulus Tahun Ini */}
                <div className="flex items-center flex-grow bg-gradient-to-r from-blue-500 to-blue-700 shadow-lg rounded-xl p-5 hover:from-blue-700 hover:to-blue-800 transition-all duration-300">
                    <div className="flex-shrink-0 bg-white bg-opacity-30 rounded-full p-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h11M9 21V3m7 9h5M17 21V3" />
                        </svg>
                    </div>
                    <div className="ml-4">
                        <h1 className="font-bold text-white text-2xl">
                            {data?.totalAlumniTahunLulusSaatIni}
                        </h1>
                        <h3 className="font-semibold text-white text-sm mb-1">Jumlah Alumni yang Terlacak Lulus Pada Tahun Ini</h3>
                    </div>
                </div>
            </div>

            <h1 className="font-bold text-xl text-blueSTI text-left mb-2 mt-6">Statistik Mitra dan Survei Mitra Pengguna Alumni</h1>
            <div className="flex flex-col sm:flex-row gap-4 mb-2">
    {/* Mitra Terlacak - Lebih kecil */}
    <div className="flex items-center basis-1/4 sm:basis-1/6 bg-gradient-to-r from-red-400 to-red-600 shadow-lg rounded-xl p-5 hover:from-red-500 hover:to-red-700 transition-all duration-300">
        <div >
            <h1 className="font-bold text-white text-center text-2xl">
                {data?.totalMitra}
            </h1>
            <h3 className="font-semibold text-white text-center text-sm mb-1">Jumlah Mitra Program Studi</h3>
        </div>
    </div>

    {/* Total mitra yang mengisi survei */}
    <div className="flex items-center flex-grow bg-gradient-to-r from-green-400 to-green-600 shadow-lg rounded-xl p-5 hover:from-green-500 hover:to-green-700 transition-all duration-300">
        <div className="flex-shrink-0 bg-white bg-opacity-30 rounded-full p-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M4.93 4.93a10 10 0 0114.14 0m-14.14 0a10 10 0 000 14.14m14.14-14.14a10 10 0 010 14.14" />
            </svg>
        </div>
        <div className="ml-4">
            <h1 className="font-bold text-white text-2xl">
                {data?.totalInstansiMitra}
            </h1>
            <h3 className="font-semibold text-white text-sm mb-1">Jumlah Mitra yang Memiliki Alumni STI</h3>
        </div>
    </div>

    {/* Alumni Terlacak Lulus Tahun Ini */}
    <div className="flex items-center flex-grow bg-gradient-to-r from-blue-500 to-blue-700 shadow-lg rounded-xl p-5 hover:from-blue-600 hover:to-blue-800 transition-all duration-300">
        <div className="flex-shrink-0 bg-white bg-opacity-30 rounded-full p-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h11M9 21V3m7 9h5M17 21V3" />
            </svg>
        </div>
        <div className="ml-4">
            <h1 className="font-bold text-white text-2xl">
                {data?.totalSurveiAlumni}
            </h1>
            <h3 className="font-semibold text-white text-sm mb-1">Jumlah alumni yang telah direview oleh mitra</h3>
        </div>
    </div>
</div>


            <h1 className="font-bold text-xl text-blueSTI text-left mb-2 mt-4">Status Alumni</h1>
            <div className="flex flex-col md:flex-row gap-6 mt-4">
                {/* Card 1 - Alumni Bekerja */}
                <div className="basis-full flex justify-center h-auto">
                    <div className="bg-white shadow-lg hover:shadow-xl hover:bg-blue-100 transition-all duration-300 rounded-xl w-full max-w-lg">
                        {/* Card Header */}
                        <div className="border-b-2 border-gray-300 p-4">
                            <h3 className="text-sm font-semibold text-center">Alumni Bekerja</h3>
                        </div>

                        {/* Card Content */}
                        <div className="p-6 flex justify-center items-center">
                            <div className="w-full h-full flex items-center justify-center max-h-62">
                                <Suspense fallback={<div>Loading...</div>}>
                                    <DoughnutChart 
                                        key={"dk"} 
                                        dataDiagram={dataKerja} 
                                        label=" #" 
                                        isShowLabel 
                                    />
                                </Suspense>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Card 2 - Status Pekerjaan */}
                <div className="basis-full flex justify-center h-auto ">
                    <div className="bg-white shadow-lg hover:shadow-xl hover:bg-blue-100 transition-all duration-300 rounded-xl w-full max-w-lg">
                        {/* Card Header */}
                        <div className="border-b-2 border-gray-300 p-4">
                            <h3 className="text-sm font-semibold text-center">Bidang Pekerjaan</h3>
                        </div>

                        {/* Card Content */}
                        <div className="p-6 flex justify-center items-center">
                            <div className="w-full h-full flex items-center justify-center max-h-62">
                                <Suspense fallback={<div>Loading...</div>}>
                                    <DoughnutChart 
                                        key={"bj"} 
                                        title="Bidang Kerja" 
                                        label=" #" 
                                        dataDiagram={dataStatusCount} 
                                        isShowLabel 
                                    />
                                </Suspense>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </main>
    ) 
}