'use client';

import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from 'react';

const BarChart = dynamic(() => import('@/components/chart/chartjs/BarChart'), { ssr: false });

import { useDashboardMitra } from '@/hooks/dashboard/mitra/useDashboardMitra.hook';
import { DataDiagram } from '@/components/chart/chartjs/BarChart';

export default function DashboardMitra() {
    const { statistics, getDashboardMitra } = useDashboardMitra();
    const [dataKepuasan, setDataKepuasan] = useState<DataDiagram[]>([]);
    const [dataKesesuaian, setDataKesesuaian] = useState<DataDiagram[]>([]);
    const [dataSurveys, setDataSurveys] = useState<DataDiagram[]>([]);

    useEffect(() => {
        getDashboardMitra();
    }, []);

    useEffect(() => {
        if (statistics?.kepuasan_distribution) {
            const tempKepuasan = [1, 2, 3, 4, 5].map((rating) => {
                const found = statistics.kepuasan_distribution.find((item: { rating: number; count: number }) => item.rating === rating);
                return { label: `Rating ${rating}`, data: found ? found.count : 0 };
            });
            setDataKepuasan(tempKepuasan);
        }

        if (statistics?.kesesuaian_distribution) {
            const tempKesesuaian = [1, 2, 3, 4, 5].map((rating) => {
                const found = statistics.kesesuaian_distribution.find((item: { rating: number; count: number }) => item.rating === rating);
                return { label: `Rating ${rating}`, data: found ? found.count : 0 };
            });
            setDataKesesuaian(tempKesesuaian);
        }

        if (statistics) {
            const tempSurveys = [
                { label: 'Total Surveys', data: statistics.total_surveys },
                { label: 'Total Alumni in Surveys', data: statistics.total_alumni_in_surveys },
            ];
            setDataSurveys(tempSurveys);
        }
    }, [statistics]);

    return (
        <main>
            {/* Header Statistics */}
            <div className="flex flex-col sm:flex-row gap-4 mb-2">
                <div className="flex items-center basis-full bg-gradient-to-r from-green-400 to-green-500 shadow-lg rounded-xl p-5 hover:from-green-500 hover:to-green-600 transition-all duration-300">
                    <div className="flex-shrink-0 bg-white bg-opacity-30 rounded-full p-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M4.93 4.93a10 10 0 0114.14 0m-14.14 0a10 10 0 000 14.14m14.14-14.14a10 10 0 010 14.14" />
                        </svg>
                    </div>
                    <div className="ml-4">
                        <h1 className="font-bold text-white text-2xl">{statistics?.total_surveys || 0}</h1>
                        <h3 className="font-semibold text-white text-sm mb-1">Total Surveys</h3>
                    </div>
                </div>

                <div className="flex items-center basis-full bg-gradient-to-r from-blue-500 to-blue-700 shadow-lg rounded-xl p-5 hover:from-blue-700 hover:to-blue-800 transition-all duration-300">
                    <div className="flex-shrink-0 bg-white bg-opacity-30 rounded-full p-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h11M9 21V3m7 9h5M17 21V3" />
                        </svg>
                    </div>
                    <div className="ml-4">
                        <h1 className="font-bold text-white text-2xl">{statistics?.total_alumni_in_surveys || 0}</h1>
                        <h3 className="font-semibold text-white text-sm mb-1">Total Alumni in Surveys</h3>
                    </div>
                </div>
            </div>

            {/* Diagram Kepuasan */}
            <div className="flex flex-col md:flex-row gap-6 mt-4">
                <div className="basis-full flex justify-center h-auto">
                    <div className="bg-white shadow-lg hover:shadow-xl hover:bg-blue-100 transition-all duration-300 rounded-xl w-full max-w-lg">
                        <div className="border-b-2 border-gray-300 p-4">
                            <h3 className="text-sm font-semibold text-center">Kepuasan</h3>
                        </div>
                        <div className="p-6 flex justify-center items-center">
                            <Suspense fallback={<div>Loading...</div>}>
                                <BarChart dataDiagram={dataKepuasan} label="Jumlah Rating" isShowLabel />
                            </Suspense>
                        </div>
                    </div>
                </div>

                {/* Diagram Kesesuaian */}
                <div className="basis-full flex justify-center h-auto">
                    <div className="bg-white shadow-lg hover:shadow-xl hover:bg-blue-100 transition-all duration-300 rounded-xl w-full max-w-lg">
                        <div className="border-b-2 border-gray-300 p-4">
                            <h3 className="text-sm font-semibold text-center">Kesesuaian</h3>
                        </div>
                        <div className="p-6 flex justify-center items-center">
                            <Suspense fallback={<div>Loading...</div>}>
                                <BarChart dataDiagram={dataKesesuaian} label="Jumlah Rating" isShowLabel />
                            </Suspense>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
