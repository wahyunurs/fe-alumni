'use client';

import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDataMitra } from '@/hooks/data-mitra/dataMitra.hooks';
import { HiChartBar, HiCollection, HiLocationMarker } from 'react-icons/hi';
import { HiBuildingLibrary } from 'react-icons/hi2';

import DataMitraAlumniDetail from '@/components/data-mitra/DataMitraAlumniDetail';

type Inputs = {
    keyword: string;
};

export default function DataMitraAlumniList() {
    const { register, handleSubmit } = useForm<Inputs>();
    const { data, getDataMitra } = useDataMitra();
    const [ filter, setFilter ] = useState({ keyword: "" });
    const [ openModal, setOpenModal ] = useState<boolean>(false);
    const [ selectedUuid, setSelectedUuid] = useState<number | undefined>(undefined);



    const onSearch: SubmitHandler<Inputs> = (formData) => {
        setFilter({
            keyword: formData.keyword,
        });
    };

    const onClose = () => {
        setOpenModal(false);
        setSelectedUuid(undefined);
    };

    const onClickButton = (id: number) => {
        setSelectedUuid(id);
        setOpenModal(true);
    };

    useEffect(() => {
        getDataMitra({ keyword: filter.keyword });
    }, [filter.keyword]);

    return (
        <div>
            <section>
                 { openModal && <DataMitraAlumniDetail show={openModal} done={onClose} uuid={selectedUuid} /> }
            </section>
            <main>
                <form onSubmit={handleSubmit(onSearch)}>
                    <div className='flex gap-1'>
                        <input
                            {...register('keyword')}
                            type='search'
                            className='border basis-full px-5 py-2 rounded-md text-sm focus:border-blue-500 outline-none'
                            placeholder='Cari nama'
                        />
                        <button
                            type='submit'
                            className='bg-blue-500 text-white px-5 py-2 rounded-md shrink-0'>
                            Search
                        </button>
                    </div>
                </form>

                <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3 sm:justify-center my-3">
                    {data?.map((item, index) => (
                        <div key={`${index}-alumnus`} className="hover:cursor-pointer" onClick={() => onClickButton(Number(item.id))}>
                            <div className='bg-white shadow hover:shadow-lg transition-shadow ease-linear p-3 rounded-md gap-3 flex divide-x-2 border border-blue-500 hover:border-blue-900'>
                                <div className='px-5 text-xs sm:text-sm items-center'>
                                    <div className="flex flex-col gap-4">
                                        <div className="flex items-center gap-2">
                                            <HiBuildingLibrary className="w-4 h-4 text-blue-500" />
                                            <p className="font-semibold">{item.nama_job || ""}</p>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <HiCollection className="w-4 h-4 text-gray-500" />
                                            <p>{item.jns_job || ""}</p>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <HiChartBar className="w-4 h-4 text-gray-500" />
                                            <p>{item.lingkup_job || ""}</p>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <HiLocationMarker className="w-4 h-4 text-gray-500" />
                                            <p>{item.kota || ""}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

        </div>
    );
}
