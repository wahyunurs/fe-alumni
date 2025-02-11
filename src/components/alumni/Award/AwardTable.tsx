'use client';

import AwardForm from "@/components/alumni/Award/AwardForm";
import { Table, Pagination } from "flowbite-react";
import { HiTrash, HiPencilAlt } from 'react-icons/hi';
import { useEffect, useState } from "react";
import { useAward } from '@/hooks/alumni/award/useStore.hook';

export default function AwardTable({  }: { userId?: string }){

    const { data, pagination, getAwards, deleteAward } = useAward();

    const [ openModalForm, setOpenModalForm ] = useState<boolean>(false);
    const [ thisUuid, setThisUUid ] = useState<null | string>(null);
    const [ refresh, setRefresh ] = useState<boolean>(true);
    const [ filter, setFilter] = useState({
        currentPage: 1,
        lastPage:  1,
    })

    const onPageChange = (page: number) => {

        setFilter({ ...filter, currentPage: page });
        setRefresh(!refresh);

    } 

    const onHide = () => {
        setThisUUid(null);
        setOpenModalForm(false);
        setRefresh(!refresh);

    }

    const onEdit = (uuid: string) => {
        setThisUUid(uuid);
        setOpenModalForm(true);
    }

    const onDelete = async (uuid: string) => {
        await deleteAward(uuid);
        setRefresh(!refresh);
    }

    useEffect(() => {

        getAwards(filter);
        
    }, [refresh])

    useEffect(() => {

        setFilter({  ...filter, lastPage: pagination?.lastPage ? pagination?.lastPage : 1 });
        
    }, [pagination])

    return <main>

        <aside>
            {  openModalForm && <AwardForm show={openModalForm} hide={onHide}  uuid={thisUuid} /> }
            
        </aside>

        <section>

            <div className="flex justify-end" >
                <button onClick={() => setOpenModalForm(true)} className="bg-orange-400 font-semibold w-full text-sm sm:text-base sm:w-auto text-white shadow py-2 px-5 mb-3 rounded-lg" >Add +</button> 
            </div>

            <div className="overflow-x-auto shadow" >
                <Table hoverable striped >

                    <Table.Head className="text-xs sm:text-sm " >
                        <Table.HeadCell>Nama Award</Table.HeadCell>
                        <Table.HeadCell>Nama Institusi Award</Table.HeadCell>
                        <Table.HeadCell>Tingkat Award</Table.HeadCell>
                        <Table.HeadCell>Tahun Award</Table.HeadCell>
                        <Table.HeadCell>Deskripsi Award</Table.HeadCell>
                        <Table.HeadCell>Action</Table.HeadCell>
                    </Table.Head>

                    <Table.Body className="divide-y text-xs sm:text-base  ">
                        { data.map((item) => {

                            return (
                                <Table.Row key={item.id} className="bg-white ">
                                    <Table.Cell>{item.nama_award}</Table.Cell>
                                    <Table.Cell>{item.institusi_award}</Table.Cell>
                                    <Table.Cell>{item.tingkat_award}</Table.Cell>
                                    <Table.Cell>{item.tahun_award}</Table.Cell>
                                    <Table.Cell>{item.deskripsi_award}</Table.Cell>
                                    <Table.Cell className="flex gap-3" >
                                        <button onClick={() => onEdit(String(item.id))} className="bg-blue-500 px-5 py-3 text-white hover:bg-blue-600" ><HiPencilAlt /></button>
                                        <button onClick={() => onDelete(String(item.id))} className="bg-red-500 px-5 py-3 text-white hover:bg-red-600" ><HiTrash/></button>
                                    </Table.Cell>
                                </Table.Row>

                            )
                        })}
                        
                    </Table.Body>

                </Table>
            </div>

            <Pagination layout="pagination" currentPage={filter.currentPage} totalPages={filter.lastPage} onPageChange={onPageChange} />

        </section>

    </main>
    
}