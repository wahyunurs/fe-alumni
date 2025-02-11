'use client';

import AnnouncementForm from "@/components/announcement/AnnouncementForm";

import { useState, useEffect } from "react";
import { Table, Pagination, Popover } from "flowbite-react";
import { HiTrash, HiPencilAlt, HiDocumentAdd } from 'react-icons/hi';
import { useAnnouncement } from '@/hooks/announcement/announcement.hook';

export default function AnnouncementTable(){

    const [ openModalForm, setOpenModalForm ] = useState<boolean>(false);
    const [ thisUuid, setThisUUid ] = useState<null | string>(null);
    const [ filter, setFilter] = useState({ currentPage: 1, lastPage:  1, });
    const [ refresh, setRefresh ] = useState<boolean>(true);
    const {  data, index, remove: removeAnnouncement } = useAnnouncement();

    const onEdit = (uuid: string) => {
        setThisUUid(uuid);
        setOpenModalForm(true);
    }

    const onDelete = async (uuid: string) => {
        await removeAnnouncement(uuid);
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
        index();
    } ,[refresh])

    return (
        <main>
            <aside>
                {  openModalForm && <AnnouncementForm show={openModalForm} done={onDone}  uuid={thisUuid} /> }
            </aside>

            <section>
                <div className="flex flex-col gap-4 mb-6">
                    <p className="text-sm text-gray-500">
                        Berikut adalah pengumuman yang telah disiarkan.
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
                        <Table.Head className="text-xs sm:text-sm " >
                            <Table.HeadCell>No</Table.HeadCell>
                            <Table.HeadCell>Judul</Table.HeadCell>
                            <Table.HeadCell>isi Pengumuman</Table.HeadCell>
                            <Table.HeadCell>Action</Table.HeadCell>
                        </Table.Head>

                        <Table.Body className="divide-y text-xs sm:text-base  ">
                        {data.length === 0 ? (
                                <Table.Row className="bg-white">
                                <Table.Cell colSpan={29} className="text-start py-3 text-sm text-gray-500">
                                    Data tidak tersedia
                                </Table.Cell>
                                </Table.Row>
                                ) : (
                                data.map((item, index) => {
                                return (
                                    <Table.Row key={`${index}-stats`} className="bg-white ">
                                        <Table.Cell>{index + 1}</Table.Cell>
                                        <Table.Cell>{item.judul}</Table.Cell>
                                        <Table.Cell>{item.isi.length > 50 ? `${item.isi.slice(0, 50)}...` : item.isi}</Table.Cell>
                                        <Table.Cell className="flex gap-3" >
                                            <button onClick={() => onEdit(String(item.id))} className="bg-blue-500 px-5 py-3 text-white hover:bg-blue-600" ><HiPencilAlt /></button>
                                            <Popover 
                                                trigger="click"
                                                placement="top-end"
                                                content={
                                                    <div className="w-auto text-xs h-auto p-2 flex items-center gap-1" >
                                                        <p>Remove this ?</p> 
                                                        
                                                        <button onClick={() => onDelete(String(item.id))} className="bg-red-500 px-5 text-white" >sure</button>
                                                        
                                                    </div>
                                                }
                                            >
                                                <button className="bg-red-500 px-5 py-3 text-white hover:bg-red-600" ><HiTrash/></button>
                                            </Popover>
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