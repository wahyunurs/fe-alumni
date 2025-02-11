'use client';

import StatistikForm from "@/components/statitstik/StatistikForm";

import { useState, useEffect } from "react";
import { Table, Pagination, Popover } from "flowbite-react";
import { HiTrash, HiPencilAlt, HiDocumentAdd } from 'react-icons/hi';
import { useStatistik } from '@/hooks/statistik/statikstik.hook';

export default function StatistikTable(){
    const [ openModalForm, setOpenModalForm ] = useState<boolean>(false);
    const [ thisUuid, setThisUUid ] = useState<null | string>(null);
    const [ filter, setFilter] = useState({ currentPage: 1, lastPage:  1, });
    const [ refresh, setRefresh ] = useState<boolean>(true);
    const { data: dataStatistik, index: indesmtatistik, remove: removeStatistik, pagination } = useStatistik();

    const onEdit = (uuid: string) => {
        setThisUUid(uuid);
        setOpenModalForm(true);
    }

    const onDelete = async (uuid: string) => {
        await removeStatistik(uuid);
        setRefresh(!refresh);
    }

    const onDone = () => {
        setThisUUid(null);
        setOpenModalForm(false);
        setRefresh(!refresh);
    }

    const onPageChange = (page: number) => {
        setFilter({ ...filter, currentPage: page });
        setRefresh(!refresh);
    } 

    useEffect(() => {
        indesmtatistik(filter);
    }, [refresh])

    useEffect(() => {
        setFilter({  ...filter, lastPage: pagination?.lastPage ? pagination?.lastPage : 1 });
    }, [pagination])


    return (
        <main>
            <aside>
                {  openModalForm && <StatistikForm show={openModalForm} done={onDone}  uuid={thisUuid} /> }
            </aside>

            <section>
                <div className="flex flex-col gap-4 mb-6">
                    <p className="text-sm text-gray-500">
                        Berikut adalah statistik jumlah alumni secara keseluruhan beserta jumlah alumni yang telah terdeteksi setiap tahunnya.
                    </p>
                </div>
                
                <div className="flex items-center gap-4 mb-3">
                    <button 
                        onClick={() => setOpenModalForm(true)} 
                        className="flex items-center gap-2 bg-orange-400 font-semibold text-sm sm:text-base text-white shadow py-2 px-4 rounded-lg"
                    >
                        <HiDocumentAdd className="text-sm" />
                        <span>Add</span>
                    </button>
                </div>

                <div className="overflow-x-auto shadow" >
                    <Table hoverable striped >
                        <Table.Head className="text-sm sm:text-sm text-center " >
                            <Table.HeadCell>Tahun Lulus</Table.HeadCell>
                            <Table.HeadCell>Total Alumni</Table.HeadCell>
                            <Table.HeadCell>Alumni Terdeteksi</Table.HeadCell>
                            <Table.HeadCell>Action</Table.HeadCell>
                        </Table.Head>

                        <Table.Body className="divide-y text-sm sm:text-base text-center">
                            {dataStatistik.length === 0 ? (
                                <Table.Row className="bg-white">
                                <Table.Cell colSpan={29} className="text-start py-3 text-sm text-gray-500">
                                    Data tidak tersedia
                                </Table.Cell>
                                </Table.Row>
                                ) : (
                                dataStatistik.map((item, index) => {
                                return (
                                    <Table.Row key={`${index}-stats`} className="bg-white ">
                                        <Table.Cell>{item.tahun_lulus}</Table.Cell>
                                        <Table.Cell>{item.alumni_total}</Table.Cell>
                                        <Table.Cell>{item.alumni_terlacak}</Table.Cell>
                                        <Table.Cell className="flex justify-center items-center">
                                            <button onClick={() => onEdit(String(item.id))} className="bg-blue-500 px-5 py-3 text-white hover:bg-blue-600">
                                                <HiPencilAlt />
                                            </button>
                                        </Table.Cell>
                                    </Table.Row>
                                );})
                            )}
                        </Table.Body>
                    </Table>
                </div>
                <Pagination layout="pagination" currentPage={filter.currentPage} totalPages={filter.lastPage} onPageChange={onPageChange} />
            </section>
        </main>
    )
}