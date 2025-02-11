'use client';

import Image from 'next/image';
import AlumniDetail from './AlumniDetail';
import { useDataAlumni } from '@/hooks/data/dataAlumni.hooks';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
  search: string;
  ipk_min: string;
  ipk_max: string;
  year_of_graduation: string;
  job_interest: string;
  status: string;
};

export default function AlumniList() {
  const { register, handleSubmit } = useForm<Inputs>();
  const { data, getDataAlumni } = useDataAlumni();
  const [refresh, setRefresh] = useState<boolean>(true);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedUuid, setSelectedUuid] = useState<number | undefined>(undefined);
  const [filter, setFilter] = useState({
    search: '',
    ipk_min: '',
    ipk_max: '',
    year_of_graduation: '',
    job_interest: '',
    status: ''
  });

  const onClickButton = (id: number) => {
    setSelectedUuid(id);
    setOpenModal(true);
  };

  const onSearch: SubmitHandler<Inputs> = (data) => {
    setFilter({
      search: data.search,
      ipk_min: data.ipk_min,
      ipk_max: data.ipk_max,
      year_of_graduation: data.year_of_graduation,
      job_interest: data.job_interest,
      status: data.status
    });
    setRefresh(!refresh);
  };

  const onClose = () => {
    setOpenModal(false);
    setSelectedUuid(undefined);
  };

  const basePath = process.env.NEXT_PUBLIC_BASEPATH;

  useEffect(() => {
    getDataAlumni(filter);
  }, [refresh]);

  return (
    <div className="container mx-auto px-4 py-6">
      {openModal && <AlumniDetail show={openModal} done={onClose} uuid={selectedUuid} />}

      <header className="mb-6">
        <form onSubmit={handleSubmit(onSearch)} className="bg-white p-4 rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              {...register('search')}
              type="search"
              className="border px-4 py-2 rounded-md text-sm focus:ring focus:ring-blue-200"
              placeholder="Cari berdasarkan status, job interest"
            />
            <input
              {...register('ipk_min')}
              type="number"
              step="0.1"
              className="border px-4 py-2 rounded-md text-sm focus:ring focus:ring-blue-200"
              placeholder="IPK Minimal"
            />
            <input
              {...register('ipk_max')}
              type="number"
              step="0.1"
              className="border px-4 py-2 rounded-md text-sm focus:ring focus:ring-blue-200"
              placeholder="IPK Maksimal"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600 flex items-center justify-center"
            >
              Cari
            </button>
          </div>
        </form>
      </header>

      <main>
        {data && data.length > 0 ? (
          <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
            {data.map((item, index) => (
              <div
                key={`${index}-alumnus`}
                className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow ease-in-out cursor-pointer border border-transparent hover:border-blue-500"
                onClick={() => onClickButton(item.user_id)}
              >
                <div className="flex items-center gap-6">
                  <div className="w-20 aspect-square relative">
                    <img
                      alt="Photo Profile"
                      src={item.foto_profil
                        ? `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/storage/foto_profils/${item.foto_profil}`
                        : `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/storage/imglogo/default_logo.png`}
                      className="w-20 h-20 rounded-full object-cover object-center shadow-lg"
                    />
                  </div>
                  
                  <div className="text-sm">
                  <p className="font-semibold">Personal Data :</p>
                    <p>{item.name ? `Nama : ${item.name}` : 'Nama :'}</p>
                    <p>{item.ipk ? `IPK : ${item.ipk}` : 'IPK :'}</p>
                    <p>{item.tahun_lulus ? `Tahun Lulus : ${item.tahun_lulus}` : 'Tahun Lulus :'}</p>
                    <p>{item.status ? `Status : ${item.status}` : 'Status :'}</p>
                    <p>{item.interests_name ? `Job Interest: ${item.interests_name}` : 'Job Interest :'}</p>



                   {/* Awardss Section */}
                   <div className="mt-2">
                      <p className="font-semibold">Awards :</p>
                      <p>{item.nama_award ? `Keahlian di Bidang IT : ${item.nama_award}` : 'Nama Awards :'}</p>

                    </div>

                    {/* Skills Section */}
                    <div className="mt-2">
                      <p className="font-semibold">Skills :</p>
                      <p>{item.ahli_skill ? `Keahlian di Bidang IT : ${item.ahli_skill}` : 'Keahlian di Bidang IT :'}</p>
                      <p>{item.etoskerja_skill ? `Etos Kerja : ${item.etoskerja_skill}` : 'Etos Kerja :'}</p>
                      <p>{item.kepemimpinan_skill ? `Kepemimpinan : ${item.kepemimpinan_skill}` : 'Kepemimpinan :'}</p>
                      <p>{item.inggris_skill ? `Bahasa Inggris : ${item.inggris_skill}` : 'Bahasa Inggris :'}</p>
                      <p>{item.komunikasi_skill ? `Komunikasi Tim : ${item.komunikasi_skill}` : 'Komunikasi Tim :'}</p>
                      <p>{item.kerjasama_skill ? `Kerja Sama Tim : ${item.kerjasama_skill}` : 'Kerja Sama Tim :'}</p>
                    </div>

                                         {/* Contact Information */}
                                         <div className="mt-2">
                      <p className="font-semibold">Contact Information :</p>
                      <p className="text-gray-500">
                        {item.no_hp ? (
                          <a
                            href={`https://wa.me/${item.no_hp.replace(/\D/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                          >
                            {item.no_hp}
                          </a>
                        ) : 'No Telepon tidak tersedia'}
                      </p>
                      <p>
                        {item.email ? (
                          <a
                            href={`mailto:${item.email}`}
                            className="text-blue-500 hover:underline"
                          >
                            {item.email}
                          </a>
                        ) : 'Email :'}
                      </p>
                    </div>
                   
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center">Tidak ada data yang ditemukan.</p>
        )}
      </main>
    </div>
  );
}
