'use client';

import Image from "next/image";
import ModalProfile from "@/components/profile/ModalProfile";
import ModalChangePassword from "./ModalChangePassword";
import { useEffect, useState } from "react";
import { useProfile } from '@/hooks/profile/alumni/useStore.hook';
import { getUser, User } from '@/hooks/auth/authClient';
import { HiPencilAlt, HiAcademicCap } from 'react-icons/hi';
import { Accordion } from "flowbite-react";
import { ProfileForm } from '@/components/profile/ProfileForm';

export default function Profile({}: { uuid?: string }) {

  const { data, getDataAlumni, getDataAdmin, getDataMitra } = useProfile();
  const [user, setUser] = useState<User | null>(null);
  const [openModalPhoto, setOpenModalPhoto] = useState(false);
  const [openModalPassword, setOpenModalPassword] = useState(false);
  const [refresh, setRefresh] = useState<boolean>(true);
  const [role, setRole] = useState<"alumni" | "admin" | "mahasiswa" | "mitra">();
  const basePath = process.env.NEXT_PUBLIC_BASEPATH;

  const hide = () => {
    setOpenModalPhoto(false);
    setOpenModalPassword(false);
  };

  const onDone = () => {
    setRefresh(!refresh);
  };

  useEffect(() => {
    const fetchedUser = getUser();

    if (fetchedUser) {
      const roleAlumni: boolean | undefined = fetchedUser?.roles?.includes('alumni');
      const roleAdmin: boolean | undefined = fetchedUser?.roles?.includes('admin');
      const roleMahasiswa: boolean | undefined = fetchedUser?.roles?.includes('mahasiswa');
      const roleMitra: boolean | undefined = fetchedUser?.roles?.includes('mitra');

      if (roleAlumni) {
        setRole('alumni');
        getDataAlumni();
      }
      if (roleAdmin) {
        setRole('admin');
        getDataAdmin();
      }
      if (roleMahasiswa) {
        setRole('mahasiswa');
      }
      if (roleMitra) {
        setRole('mitra');
      }
      setUser(fetchedUser);
    }
  }, [refresh]);

  return (
    <main className="container mx-auto lg:px-10">
    <aside>
      {openModalPhoto && <ModalProfile show={openModalPhoto} hide={hide} />}
      {openModalPassword && <ModalChangePassword show={openModalPassword} hide={hide} />}
    </aside>
  
    {/* Kotak Atas */}
    <section className="bg-white shadow-md p-6 mx-auto mb-5 rounded-md">
      <div className="relative">
        {/* Background Header */}
        <div 
          className="w-full h-40 bg-cover bg-center rounded-t-md" 
          style={{ backgroundImage: `url('${basePath}/draw/bgDataAlumni.png')` }}
        >
          {/* Foto Profil */}
          <div className="absolute -bottom-20 left-6 w-[125px] h-[125px] border-4 border-white bg-white rounded-full flex items-center justify-center shadow-lg">
            <img
              alt="Photo Profile"
              src={data?.foto_profil
                ? `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/storage/foto_profils/${data.foto_profil}`
                : `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/storage/imglogo/default_logo.png`}
              className="w-full h-full rounded-full object-cover"
            />
          </div>
        </div>
      </div>
  
      {/* Personal Information */}
      <div className=" pt-24"> {/* pt-24 untuk memberi ruang setelah foto */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="font-semibold text-gray-600 text-2xl">{data?.name ?? ""}</h1>
            <div className="flex gap-2 mt-2">
              {user?.roles?.map((item) => (
                <div key={item} className="px-4 py-1 bg-orange-200 text-xs rounded-full shadow-md">{item}</div>
              ))}
            </div>
          </div>
          <div className="flex gap-4">
            <button className="p-3 bg-orange-500 text-white rounded-full shadow-md hover:bg-orange-400 transition-all"onClick={() => setOpenModalPhoto(true)}>
              <HiAcademicCap className="text-xl" />
            </button>
            <button className="p-3 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-400 transition-all"onClick={() => setOpenModalPassword(true)}>
              <HiPencilAlt className="text-xl" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Accordion for Alumni Data */}
      {role === 'alumni' && (
        <Accordion collapseAll>
          <Accordion.Panel>
            <Accordion.Title className="text-sm font-semibold bg-gray-100 text-gray-600">Personal Information</Accordion.Title>
            <Accordion.Content><ProfileForm profileAlumni={data} onDone={onDone} /></Accordion.Content>
          </Accordion.Panel>
        </Accordion>
      )}
    </section>
    </main>
  );
}
