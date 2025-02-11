'use client';

import AcademicForm from "@/components/alumni/Academic/AcademicForm";
import { Table, Pagination } from "flowbite-react";
import { HiTrash, HiPencilAlt } from 'react-icons/hi';
import { useEffect, useState } from "react";
import { useAcademic } from '@/hooks/alumni/academic/useStore.hook';
import { toast } from 'sonner';



export default function AcademicTable({  }: { userId?: string }){

    const { academics, pagination, getAcademics, deleteAcademic } = useAcademic();

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
        await deleteAcademic(uuid)
            .then(() => {
                toast.success("Success delete data") ;
            }).catch(() => {
                toast.error("failed delete data") ;
            });

        setRefresh(!refresh);
    }

    useEffect(() => {

        getAcademics(filter);
        
    }, [refresh]);

    useEffect(() => {

        setFilter({  ...filter, lastPage: pagination?.lastPage ? pagination?.lastPage : 1 });
        
    }, [pagination])


    return <main>

        <aside>
            
            {  openModalForm && <AcademicForm show={openModalForm} hide={onHide}  uuid={thisUuid} /> }
            
        </aside>

        <section>

            <div className="flex justify-end" >
                <button onClick={() => setOpenModalForm(true)} className="bg-orange-400 font-semibold w-full text-sm sm:text-base sm:w-auto text-white shadow py-2 px-5 mb-3 rounded-lg" >Add +</button> 
            </div>

            <div className="overflow-x-auto" >
                <Table hoverable striped >

                    <Table.Head className="text-xs sm:text-sm " >
                        <Table.HeadCell>Nama Perguruan Tinggi</Table.HeadCell>
                        <Table.HeadCell>Program Studi</Table.HeadCell>
                        <Table.HeadCell>IPK</Table.HeadCell>
                        <Table.HeadCell>Tahun Masuk</Table.HeadCell>
                        <Table.HeadCell>Tahun Lulus</Table.HeadCell>
                        <Table.HeadCell>Kota</Table.HeadCell>
                        <Table.HeadCell>Negara</Table.HeadCell>
                        <Table.HeadCell>Catatan</Table.HeadCell>
                        <Table.HeadCell>Action</Table.HeadCell>
                    </Table.Head>

                    <Table.Body className="divide-y text-xs sm:text-base  ">
                        { academics.map((item) => {

                            return (
                                <Table.Row key={item.id} className="bg-white ">
                                    <Table.Cell>{item.nama_studi}</Table.Cell>
                                    <Table.Cell>{item.prodi}</Table.Cell>
                                    <Table.Cell>{item.ipk}</Table.Cell>
                                    <Table.Cell>{item.tahun_masuk}</Table.Cell>
                                    <Table.Cell>{item.tahun_lulus}</Table.Cell>
                                    <Table.Cell>{item.kota}</Table.Cell>
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