'use client';

import Image from 'next/image';
import Link from 'next/link';
import dynamic from "next/dynamic";
import { useState, useEffect, Suspense } from 'react';
import { HiChevronDoubleRight } from "react-icons/hi";
import { useMasaTunggu } from '@/hooks/masa-tunggu/masaTunggu.hook';
import { DataDiagram } from '@/components/chart/chartjs/PieChart';
import { FaUsers, FaUserGraduate, FaClock } from 'react-icons/fa';
import BarChart from '../chart/chartjs/BarChart';

const PieChart = dynamic(() => import('@/components/chart/chartjs/PieChart'), { ssr: false });

export default function MasaTungguComponent(){

    const { data, tahunLulusData, check: checkMasaTunggu, tahunLulus: getTahunLulus } = useMasaTunggu();
    const [ dataDiagram, setDataDiagram ] = useState<DataDiagram[]>([]);
    const [ filter, setFilter ] = useState({ tahunLulus: "" });
    const [ refresh, setRefresh ] = useState<boolean>();
    const basePath = process.env.NEXT_PUBLIC_BASEPATH;


    const onTahunLulusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        event.preventDefault();
        const value = event.target.value;
        setFilter({ ...filter, tahunLulus: value})
        setRefresh(!refresh);
    }

    useEffect(() => {
        checkMasaTunggu({ tahunLulus: filter.tahunLulus });
        getTahunLulus()
    }, [refresh])

    useEffect(() => {
        if(data?.masaTungguCounts) if (data.masaTungguCounts.length){
            const temp = data.masaTungguCounts.map((item) => ({ label: item.name, data: item.count }));
            setDataDiagram(temp);
        }
    }, [data])
    
    const iconMapping = [FaUsers, FaUserGraduate, FaClock]; 

    return (
        <section>
            <div className="flex flex-col gap-4 mb-6">
                <p className="text-sm text-gray-500">
                    Berikut adalah data masa tunggu alumni secara keseluruhan yang diambil dari alumni yang telah berstatus bekerja dan wiraswasta.                
                </p>
            </div>
            { tahunLulusData.length > 0 && 
                <div className="my-3 ">
                    <select defaultValue="none" name="tahunLulus" id="tahunLulus" className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={onTahunLulusChange} aria-label="Pilih Tahun Kelulusan"  >
                        <option key="none" value="none" >Pilih Tahun Kelulusan</option>
                        {
                            tahunLulusData.map((item, index) => {
                                return <option key={`tahun-${index}`} value={item} >{item}</option>

                            })
                        }
                    </select>
                </div>
            }

            {/* Diagram */}
            <div className="mb-5 flex overflow-x-auto border rounded-xl shadow-md lg:grow-0 lg:justify-center lg:p-5 bg-white">
                <div className="min-w-[400px] lg:h-full lg:w-full">
                    <Suspense fallback={<div>Loading...</div>}  >
                        <BarChart dataDiagram={dataDiagram} title="Masa Tunggu Diagram" isShowLabel label='#'  />
                    </Suspense>
                </div>
            </div>

            {/* status alumni */}
            <div className="mb-5 flex overflow-x-auto rounded-xl lg:grow-0 lg:justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                {data?.masaTungguCounts.map((item, index) => {
                const Icon = iconMapping[index % iconMapping.length];
                return (
                    <div
                    key={index}
                    className="shadow-md group flex flex-col bg-white text-blueSTI rounded-lg hover:shadow-xl transition-all duration-300 w-full"
                    >
                    <div className="h-32 flex flex-col justify-center items-center text-center bg-blueSTI group-hover:bg-white transition-colors duration-200 rounded-t-lg">
                        <div className="mb-3 text-3xl text-white group-hover:text-blueSTI transition-colors duration-200">
                        <Icon />
                        </div>
                        <h3 className="font-bold text-base text-white group-hover:text-blueSTI text-center max-w-[80%] mx-auto">
                        {item.name}
                        </h3>                                    
                        <p className="text-xs mt-1 text-white group-hover:text-blueSTI">
                        {item.count} dari {data.totalAlumni} mahasiswa
                        </p>
                    </div>
                    <Link
                        href={`/dashboard/masa-tunggu-alumni/status?status=${item.name}`}
                        className="flex items-center justify-center p-3 rounded-b-lg transition-colors duration-200 bg-white text-blueSTI group-hover:bg-blueSTI group-hover:text-white"
                    >
                        <HiChevronDoubleRight className="text-blueSTI group-hover:text-white transition-colors" />
                    </Link>
                    </div>
                );
                })}
            </div>
            </div>
        </section>
    )
}