'use client';

import JobForm from "@/components/alumni/Job/JobForm";
import { Table, Pagination } from "flowbite-react";
import { HiTrash, HiPencilAlt } from 'react-icons/hi';
import { useState, useEffect } from "react";
import { useJob } from '@/hooks/alumni/job/useStore.hook';


export default function JobTable({  }: { userId?: string }){

    const { data, pagination, getJobs, deleteJob } = useJob();

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
        await deleteJob(uuid);
        setRefresh(!refresh);
    }

    useEffect(() => {
        
        getJobs(filter);

    }, [refresh])

    useEffect(() => {

        setFilter({  ...filter, lastPage: pagination?.lastPage ? pagination?.lastPage : 1 });
        
    }, [pagination])

    return <main>

        <aside>
            {  openModalForm && <JobForm show={openModalForm} hide={onHide}  uuid={thisUuid} /> }
            
        </aside>

        <section>

            <div className="flex justify-end" >
                <button onClick={() => setOpenModalForm(true)} className="bg-orange-400 font-semibold w-full text-sm sm:text-base sm:w-auto text-white shadow py-2 px-5 mb-3 rounded-lg" >Add +</button> 
            </div>

            <div className="overflow-x-auto shadow-md ">
                <Table hoverable striped >

                    <Table.Head className="text-xs sm:text-sm " >
                        <Table.HeadCell>Nama Instansi</Table.HeadCell>
                        <Table.HeadCell>Bulan Masuk</Table.HeadCell>
                        <Table.HeadCell>Bulan Keluar</Table.HeadCell>
                        <Table.HeadCell>Periode</Table.HeadCell>
                        <Table.HeadCell>Jabatan</Table.HeadCell>
                        <Table.HeadCell>Kota</Table.HeadCell>
                        <Table.HeadCell>Alamat</Table.HeadCell>
                        <Table.HeadCell>Negara</Table.HeadCell>
                        <Table.HeadCell>Catatan</Table.HeadCell>
                        <Table.HeadCell>Action</Table.HeadCell>
                    </Table.Head>

                    <Table.Body className="divide-y text-xs sm:text-base  ">
                        { data.map((item) => {
                            return (
                                <Table.Row key={item.id} className="bg-white ">
                                    <Table.Cell>{item.nama_job}</Table.Cell>
                                    <Table.Cell>{item.bulan_masuk_job}</Table.Cell>
                                    <Table.Cell>{item.bulan_keluar_job}</Table.Cell>
                                    <Table.Cell>{item.periode_masuk_job} - {item.periode_keluar_job}</Table.Cell>
                                    <Table.Cell>{item.jabatan_job}</Table.Cell>
                                    <Table.Cell>{item.kota}</Table.Cell>
                                    <Table.Cell>{item.alamat}</Table.Cell>
                                    <Table.Cell>{item.negara}</Table.Cell>
                                    <Table.Cell>{item.catatan}</Table.Cell>
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