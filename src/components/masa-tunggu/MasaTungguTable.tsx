'use client';

import { Table, Pagination } from "flowbite-react";
import { useEffect, useState } from "react";
import { useMasaTunggu } from '@/hooks/masa-tunggu/masaTunggu.hook';

export default function MasaTungguTableComponent({ status }: {status: string}){

    const { status: statusMasaTunggu, statusData, tahunLulus: getTahunLulus, tahunLulusData } = useMasaTunggu();
    const [ refresh, setRefresh ] = useState<boolean>(true);
    const [ filter, setFilter] = useState({
        currentPage: 1,
        lastPage:  1,
        tahun: {
            tahunLulus: "",
        }
    })

    const onTahunLulusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        event.preventDefault();
        const value = event.target.value;
        setFilter({ ...filter, tahun: { tahunLulus: value }})
        setRefresh(!refresh);
    }

    const onPageChange = (page: number) => {
        setFilter({ ...filter, currentPage: page });
        setRefresh(!refresh);
    }

    useEffect(() => {
        getTahunLulus();
    }, []);

    useEffect(() => {
        statusMasaTunggu({status, tahunLulus: filter.tahun.tahunLulus });        
    }, [refresh]);

    return (
        <section>
            { tahunLulusData.length > 0 && 
                <div className="my-3 ">
                    <select name="tahunLulus" id="tahunLulus" className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={onTahunLulusChange}  >
                        <option selected>Pilih Tahun Kelulusan</option>
                        {
                            tahunLulusData.map((item, index) => {
                                return <option key={`tahun-${index}`} value={item} >{item}</option>

                            })
                        }
                    </select>
                </div>
            }
            
            <div className="overflow-x-auto" >
                <Table hoverable striped >

                    <Table.Head className="text-xs sm:text-sm " >
                        <Table.HeadCell>No</Table.HeadCell>
                        <Table.HeadCell>Nama</Table.HeadCell>
                        <Table.HeadCell>NiM</Table.HeadCell>
                        <Table.HeadCell>Tahun Lulus</Table.HeadCell>
                        <Table.HeadCell>No Hp</Table.HeadCell>
                        <Table.HeadCell>Email</Table.HeadCell>
                        <Table.HeadCell>Instansi</Table.HeadCell>
                        <Table.HeadCell>Jabatan</Table.HeadCell>
                    </Table.Head>

                    <Table.Body className="divide-y text-xs sm:text-base  ">
                        {statusData.length === 0 ? (
                            <Table.Row className="bg-white">
                            <Table.Cell colSpan={29} className="text-start py-3 text-sm text-gray-500">
                                Data tidak tersedia
                            </Table.Cell>
                            </Table.Row>
                            ) : (
                            statusData.map((item, index) => {
                            return (
                                <Table.Row key={item.id} className="bg-white ">
                                    <Table.Cell>{index + 1}</Table.Cell>
                                    <Table.Cell>{item.name}</Table.Cell>
                                    <Table.Cell>{item.nim}</Table.Cell>
                                    <Table.Cell>{item.tahun_lulus}</Table.Cell>
                                    <Table.Cell>{item.no_hp}</Table.Cell> 
                                    <Table.Cell>{item.email}</Table.Cell> 
                                    <Table.Cell>{item.nama_job}</Table.Cell>  
                                    <Table.Cell>{item.jabatan_job}</Table.Cell>                                     
                                </Table.Row>
                            );})
                        )}                        
                    </Table.Body>
                </Table>
            </div>

            <Pagination layout="pagination" currentPage={filter.currentPage} totalPages={filter.lastPage} onPageChange={onPageChange} />

        </section>
    )
}