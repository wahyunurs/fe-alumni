'use client';

import SurveiPenggunaLulusanForm from '@/components/survei/SurveiPenggunaLulusanForm';

import { useState, useEffect } from 'react';
import { Table, Pagination, Popover } from 'flowbite-react';
import { HiTrash, HiPencilAlt, HiDocumentAdd } from 'react-icons/hi';
import { useSurveiPenggunaLulusan } from '@/hooks/survei-mitra/surveiPenggunaLulusan.hook';
import { toast } from 'sonner';

export default function SurveiPenggunaLulusanTable() {
  const [openModalForm, setOpenModalForm] = useState<boolean>(false);
  const [ thisUuid, setThisUUid ] = useState<null | string>(null);
  const [filter, setFilter] = useState({ currentPage: 1, lastPage: 1 });
  const [refresh, setRefresh] = useState<boolean>(true);
  const { data: dataPenggunaLulusan, index: indexPenggunaLulusan, remove: removePenggunaLulusan, pagination } = useSurveiPenggunaLulusan();

  const onEdit = (uuid: string) => {
    setThisUUid(uuid);
    setOpenModalForm(true);
  }

  const onDelete = async (uuid: string) => {
    try {
      await removePenggunaLulusan(uuid);
      setRefresh(!refresh);
      toast.success("Data berhasil dihapus");
    } catch (error) {
      console.error(error);
      toast.error("Gagal menghapus data");
    }
  }


  const onDone = () => {
    setThisUUid(null);
    setOpenModalForm(false);
    setRefresh(!refresh);
  }

  const onPageChange = (page: number) => {
    setFilter({ ...filter, currentPage: page });
    setRefresh(!refresh);
  };

  useEffect(() => {
    indexPenggunaLulusan(filter);
  }, [refresh]);

  useEffect(() => {
    setFilter({  ...filter, lastPage: pagination?.lastPage ? pagination?.lastPage : 1 });
  }, [pagination])

  return (
    <main>
      <aside>
        {openModalForm && <SurveiPenggunaLulusanForm show={openModalForm} done={onDone}  uuid={thisUuid} /> }
      </aside>

      <section>
        <div className="flex flex-col gap-4 mb-6">
            <p className="text-sm text-gray-500">
              Berikut adalah data survei penilaian mitra untuk kinerja alumni.
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

        <div className="overflow-x-auto shadow">
          <Table hoverable striped>
            <Table.Head className="text-xs sm:text-sm">
              <Table.HeadCell>NO</Table.HeadCell>
              <Table.HeadCell>Nama Alumni</Table.HeadCell>
              <Table.HeadCell>Kedisiplinan</Table.HeadCell>
              <Table.HeadCell>Kejujuran</Table.HeadCell>
              <Table.HeadCell>Motivasi</Table.HeadCell>
              <Table.HeadCell>Etos</Table.HeadCell>
              <Table.HeadCell>Moral</Table.HeadCell>
              <Table.HeadCell>Etika</Table.HeadCell>
              <Table.HeadCell>Bidang_ilmu</Table.HeadCell>
              <Table.HeadCell>Produktif</Table.HeadCell>
              <Table.HeadCell>Masalah</Table.HeadCell>
              <Table.HeadCell>Inisiatif</Table.HeadCell>
              <Table.HeadCell>Menulis_asing</Table.HeadCell>
              <Table.HeadCell>Komunikasi_asing</Table.HeadCell>
              <Table.HeadCell>Memahami_asing</Table.HeadCell>
              <Table.HeadCell>Alat_teknologi</Table.HeadCell>
              <Table.HeadCell>Adaptasi_teknologi</Table.HeadCell>
              <Table.HeadCell>Penggunaan_teknologi</Table.HeadCell>
              <Table.HeadCell>Emosi</Table.HeadCell>
              <Table.HeadCell>Percaya_diri</Table.HeadCell>
              <Table.HeadCell>Keterbukaan</Table.HeadCell>
              <Table.HeadCell>Kom_lisan</Table.HeadCell>
              <Table.HeadCell>Kom_tulisan</Table.HeadCell>
              <Table.HeadCell>Kepemimpinan</Table.HeadCell>
              <Table.HeadCell>Manajerial</Table.HeadCell>
              <Table.HeadCell>Masalah_kerja</Table.HeadCell>
              <Table.HeadCell>Motivasi_tempat_kerja</Table.HeadCell>
              <Table.HeadCell>Motivasi_diri</Table.HeadCell>           
              <Table.HeadCell>Action</Table.HeadCell>
            </Table.Head>

            <Table.Body className="divide-y text-xs sm:text-base">
              {dataPenggunaLulusan.length === 0 ? (
                <Table.Row className="bg-white">
                  <Table.Cell colSpan={29} className="text-start py-3 text-sm text-gray-500">
                    Data tidak tersedia
                  </Table.Cell>
                </Table.Row>
              ) : (
                dataPenggunaLulusan.map((item, index) => {
                  return (
                    <Table.Row key={`${index}-stats`} className="bg-white">
                      <Table.Cell>{index + 1}</Table.Cell>
                      <Table.Cell>{item.name_alumni}</Table.Cell>
                      <Table.Cell>{item.kedisiplinan}</Table.Cell>
                      <Table.Cell>{item.kejujuran}</Table.Cell>
                      <Table.Cell>{item.motivasi}</Table.Cell>
                      <Table.Cell>{item.etos}</Table.Cell>
                      <Table.Cell>{item.moral}</Table.Cell>
                      <Table.Cell>{item.etika}</Table.Cell>
                      <Table.Cell>{item.bidang_ilmu}</Table.Cell>
                      <Table.Cell>{item.produktif}</Table.Cell>
                      <Table.Cell>{item.masalah}</Table.Cell>
                      <Table.Cell>{item.inisiatif}</Table.Cell>
                      <Table.Cell>{item.menulis_asing}</Table.Cell>
                      <Table.Cell>{item.komunikasi_asing}</Table.Cell>
                      <Table.Cell>{item.memahami_asing}</Table.Cell>
                      <Table.Cell>{item.alat_teknologi}</Table.Cell>
                      <Table.Cell>{item.adaptasi_teknologi}</Table.Cell>
                      <Table.Cell>{item.penggunaan_teknologi}</Table.Cell>
                      <Table.Cell>{item.emosi}</Table.Cell>
                      <Table.Cell>{item.percaya_diri}</Table.Cell>
                      <Table.Cell>{item.keterbukaan}</Table.Cell>
                      <Table.Cell>{item.kom_lisan}</Table.Cell>
                      <Table.Cell>{item.kom_tulisan}</Table.Cell>
                      <Table.Cell>{item.kepemimpinan}</Table.Cell>
                      <Table.Cell>{item.manajerial}</Table.Cell>
                      <Table.Cell>{item.masalah_kerja}</Table.Cell>
                      <Table.Cell>{item.motivasi_tempat_kerja}</Table.Cell>
                      <Table.Cell>{item.motivasi_diri}</Table.Cell>
                      <Table.Cell className="flex gap-3">
                        <button onClick={() => onEdit(String(item.id))} className="bg-blue-500 px-5 py-3 text-white hover:bg-blue-600">
                          <HiPencilAlt />
                        </button>
                        <Popover
                          trigger="click"
                          placement="top-end"
                          content={
                            <div className="w-auto text-xs h-auto p-2 flex items-center gap-1">
                              <p>Delete This Item ?</p>
                              <button onClick={() => onDelete(String(item.id))} className="bg-red-500 px-5 text-white py-1">
                                sure
                              </button>
                            </div>
                          }
                        >
                          <button className="bg-red-500 px-5 py-3 text-white hover:bg-red-600">
                            <HiTrash />
                          </button>
                        </Popover>
                      </Table.Cell>
                    </Table.Row>
                  );
                })
              )}
            </Table.Body>

          </Table>
        </div>

        <Pagination layout="pagination" currentPage={filter.currentPage} totalPages={filter.lastPage} onPageChange={onPageChange} />
      </section>
    </main>
  );
}
