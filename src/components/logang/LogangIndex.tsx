'use client';

import { CiFilter, CiTrash } from "react-icons/ci";
import LogangShow from '@/components/logang/LogangShow';
import LogangForm from './LogangForm';
import { getPengalamanMagang } from "@/constant/internship/pengalamanMagang";
import { getTipeMagang } from "@/constant/internship/tipeMagang";
import { useEffect, useState } from "react"
import { useForm} from 'react-hook-form';
import { HiPlus, HiCog, HiLocationMarker, HiBriefcase, HiDesktopComputer,HiCurrencyDollar   } from 'react-icons/hi';
import { useRouter } from 'next/navigation' 
import { useLogangAlumni, useLogangAdmin, useLogangMitra, Filter } from '@/hooks/logang/useStore.hook';
import { getUser, User } from '@/hooks/auth/authClient';

export default function LogangIndex(){

    const router = useRouter();

    const { register, watch, reset} = useForm<Filter>();
    const [ user, setUser] = useState<User>();
    const [ role, setRole ] = useState< "alumni" | "admin" | "mahasiswa" | "mitra">();
    const [ refresh, setRefresh ] = useState<boolean>(true);
    const [ filter, setFilter ] = useState<Filter | undefined>({});
    const [tags, setTags] = useState<Filter | undefined>({});
    const { data: dataPengalamanMagang } = getPengalamanMagang();
    const { data: dataTipeMagang } = getTipeMagang();
    const { data: dataLogangAlumni, index: indexAlumni } = useLogangAlumni();
    const { data: dataLogangAdmin, index: indexAdmin } = useLogangAdmin();
    const { data: dataLogangMitra, index: indexMitra } = useLogangMitra();
    const [ openModalShow, setOpenModalShow ] = useState<boolean>(false);
    const [ openModalForm, setOpenModalForm ] = useState(false);
    const [ selectUuid, setSelectUuid ] = useState<string>();
    
    const jobExperience = watch("Pengalaman");
    const jobType = watch("TipeMagang");

    const handleReset = () => {
      reset({
            Pengalaman: '',
            TipeMagang: '',
      }); 
      setFilter({}); 
      setRefresh(!refresh);
  }

    const onClickButton = (uuid: string) => {
        setSelectUuid(uuid);
        setOpenModalShow(true);
    }

    const onDone = () => {
        setOpenModalShow(false);
        setOpenModalForm(false);
        setRefresh(!refresh);
    }

    const onTagClick = (tag: string) => {
        setFilter({ ...filter, tags: tag });
        setRefresh(!refresh);
    }

    useEffect(() => {
        if (user){
            if (role === 'alumni') indexAlumni(filter);
            if (role === 'admin') indexAdmin(filter);
            if (role === 'mitra') indexMitra(filter);
        }
    },[refresh, user])

    useEffect(() => {
        const result = getUser();
        if (result) {

            const roleAlumni: boolean | undefined = result?.roles?.includes('alumni');
            const roleAdmin: boolean | undefined = result?.roles?.includes('admin');
            const roleMahasiswa: boolean | undefined = result?.roles?.includes('mahasiswa');
            const roleMitra: boolean | undefined = result?.roles?.includes('mitra');

            if (roleAlumni) setRole('alumni');
            if (roleAdmin) setRole('admin');
            if (roleMahasiswa) setRole('mahasiswa');
            if (roleMitra) setRole('mitra');

            setUser(result);
        } 
    }, [])

    // Update filter state and refresh automatically when checkboxes change
    useEffect(() => {
      setFilter({
          Pengalaman: jobExperience ? jobExperience[0] : undefined,
          TipeMagang: jobType ? jobType[0] : undefined,
      });

      setRefresh(!refresh);
      console.log(filter)
  }, [jobExperience, jobType]);

 
     
    return (
       <div className='container mx-auto' >

            <section>
                { openModalShow && <LogangShow show={openModalShow}  uuid={selectUuid} onDone={onDone} /> }
                { openModalForm && <LogangForm show={openModalForm}  hide={onDone} /> }
            </section>
       
            <main className="flex flex-col md:flex-row gap-5 " >

                <div className="basis-1/4 shrink-0">
                    <div className="bg-white rounded-md p-3 border sticky top-5">
                        <div className="flex justify-between items-center text-base font-semibold">
                            <div className="flex items-center space-x-2 font-semibold text-gray-800">
                                <CiFilter />
                                <span className="text-lg">Filters</span>
                            </div>
                            <div
                                className="flex items-center text-red-500 cursor-pointer hover:text-red-700"
                                onClick={handleReset}
                            >
                                <CiTrash className="mr-2" />
                                <span className="text-lg">Reset</span>
                            </div>
                        </div>

                            <div className="mt-4">
                                <h1 className="text-sm font-semibold text-gray-800">Pengalaman Magang</h1>
                                <div className="text-lg">
                                    {dataPengalamanMagang?.map((item) => (
                                    <div key={item.key} className="flex items-center gap-1 mb-1">
                                        <input
                                        {...register("Pengalaman")}
                                        type="checkbox"
                                        value={item.value}
                                        name="Pengalaman"
                                        id={`Pengalaman-${item.key}`}
                                        />
                                        <label
                                        htmlFor={`Pengalaman-${item.key}`}
                                        className="text-sm"
                                        >
                                        {item.label}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-4">
                            <h1 className="text-sm font-semibold text-gray-800">Tipe Magang</h1>
                            <div className="text-lg">
                                {dataTipeMagang?.map((item) => (
                                <div key={item.key} className="flex items-center gap-1 mb-1">
                                    <input
                                    {...register("TipeMagang")}
                                    type="checkbox"
                                    value={item.value}
                                    name="TipeMagang"
                                    id={`TipeMagang-${item.key}`}
                                    />
                                    <label htmlFor={`TipeMagang-${item.key}`} className="text-sm">
                                    {item.label}
                                    </label>
                                </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="basis-full" >
                    <div className="flex gap-3 mb-3" >
                        <button onClick={() => setOpenModalForm(true)} className="bg-blueSTI hover:bg-blue-600 active:bg-blue-500 px-5 py-2 text-white font-semibold text-xs sm:text-sm  rounded-md flex items-center justify-center gap-x-2 w-full sm:w-auto" > <HiPlus /> Post Lowongan</button>
                        <button onClick={() => router.push("/dashboard/logang/manage")} className="bg-blueSTI hover:bg-blue-600 active:bg-blue-500 px-5 py-2 text-white font-semibold text-xs sm:text-sm rounded-md flex items-center justify-center gap-x-2 w-full sm:w-auto" > <HiCog /> Manage Lowongan</button>
                    </div>

                    {/* Data */}
                    <div className="grid  gap-6">
                        <div className="grid grid-cols-2 w-full gap-6 ">
                        {
                            user?.roles?.includes("alumni")
                            ? (
                                <>
                                {/* Alumni */}
                                    {(!dataLogangAlumni?.length) ? (
                                        <div className="col-span-full text-center text-gray-500 p-4">
                                            Maaf, kami tidak menemukan lowongan magang yang sesuai.
                                        </div>
                                    ) : (
                                        <>
                                            {/* Data untuk Alumni */}
                                            {dataLogangAlumni.map((item) => {
                                                const tags = item.Tags?.split(',') || [];

                                                return (
                                                    <div
                                                        key={item.id}
                                                        className="flex flex-col gap-3 p-4 rounded-lg shadow-md border bg-white hover:bg-blueSTI hover:text-white hover:shadow-lg transition-all ease-in cursor-pointer min-h-[00px] group"
                                                    >
                                                        <div className="flex items-center">
                                                            {/* Logo */}
                                                            <div className="h-12 w-12">
                                                                <img
                                                                    src={item?.Logo ? `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/storage/imglogo/${item.Logo}` : '/default_logo.png'}
                                                                    alt={item.NamaPerusahaan || 'Company Logo'}
                                                                    className="h-full w-full object-cover"
                                                                />
                                                            </div>
                                                            <div className="ml-4 flex flex-col max-w-[70%]">
                                                                {/* Nama Perusahaan */}
                                                                <p
                                                                    onClick={() => onClickButton(String(item.id))}
                                                                    className="overflow-hidden text-gray-800 group-hover:text-yellow-300 font-semibold text-base truncate"
                                                                >
                                                                    {item.NamaPerusahaan ?? '~'}
                                                                </p>
                                                                {/* Posisi magang */}
                                                                <h3
                                                                    onClick={() => onClickButton(String(item.id))}
                                                                    className="overflow-hidden text-gray-600 group-hover:text-yellow-300 font-medium text-sm truncate"
                                                                >
                                                                    {item.Posisi ?? '~'}
                                                                </h3>
                                                            </div>
                                                        </div>

                                                        {/* Tags */}
                                                        <div className="flex gap-2 flex-wrap mt-2">
                                                            {tags.map((e, index) => (
                                                                <div
                                                                    key={index}
                                                                    className="text-xs px-5 py-1 rounded-full bg-yellow-400 border-2 border-yellow-400 text-blueSTI group-hover:bg-blueSTI group-hover:border-white group-hover:text-white"
                                                                    onClick={() => onTagClick(e)} 
                                                                >
                                                                    {e}
                                                                </div>
                                                            ))}
                                                        </div>

                                                        {/* Detail Lokasi, Jenis magang, Gaji */}
                                                        <div className="mt-2 text-sm text-gray-600 space-y-1">
                                                            <div className="flex items-center gap-2 group-hover:text-white">
                                                                <HiLocationMarker className="group-hover:text-white" />
                                                                <span className="overflow-hidden text-ellipsis whitespace-nowrap max-w-[200px]">
                                                                    {item.Alamat}
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center">
                                                                <p className="flex items-center gap-2 group-hover:text-white">
                                                                    <HiDesktopComputer />
                                                                    {item.Pengalaman}
                                                                </p>
                                                            </div>
                                                            <div className="flex items-center">
                                                                <p className="flex items-center gap-2 group-hover:text-white">
                                                                    <HiBriefcase />
                                                                    {item.TipeMagang}
                                                                </p>
                                                            </div>
                                                            <div className="flex items-center">
                                                                <p className="flex items-center gap-2 group-hover:text-white">
                                                                    <HiCurrencyDollar />
                                                                    {item.Gaji ? new Intl.NumberFormat('id-ID').format(Number(item.Gaji)) : '~'}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </>
                                    )}
                                </>
                            ) : user?.roles?.includes("admin") ? (
                                <>
                                {/* Admin */}
                                    {(dataLogangAdmin?.length === 0) ? (
                                        <div className="col-span-full text-center text-gray-500 p-4">
                                            Maaf, kami tidak menemukan lowongan Magang yang sesuai.
                                        </div>
                                    ) : (
                                        <>
                                            {/* Data untuk Admin */}
                                            {dataLogangAdmin.map((item) => {
                                                const tags = item.Tags?.split(',') || [];

                                                return (
                                                    <div
                                                        key={item.id}
                                                        className="flex flex-col gap-3 p-4 rounded-lg shadow-md border bg-white hover:bg-blueSTI hover:text-white hover:shadow-lg transition-all ease-in cursor-pointer min-h-[00px] group"
                                                    >
                                                        <div className="flex items-center">
                                                            {/* Logo */}
                                                            <div className="h-12 w-12">
                                                                <img
                                                                    src={item?.Logo ? `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/storage/imglogo/${item.Logo}` : '/default_logo.png'}
                                                                    alt={item.NamaPerusahaan || 'Company Logo'}
                                                                    className="h-full w-full object-cover"
                                                                />
                                                            </div>
                                                            <div className="ml-4 flex flex-col max-w-[70%]">
                                                                {/* Nama Perusahaan */}
                                                                <p
                                                                    onClick={() => onClickButton(String(item.id))}
                                                                    className="overflow-hidden text-gray-800 group-hover:text-yellow-300 font-semibold text-base truncate"
                                                                >
                                                                    {item.NamaPerusahaan ?? '~'}
                                                                </p>
                                                                {/* Posisi Magang */}
                                                                <h3
                                                                    onClick={() => onClickButton(String(item.id))}
                                                                    className="overflow-hidden text-gray-600 group-hover:text-yellow-300 font-medium text-sm truncate"
                                                                >
                                                                    {item.Posisi ?? '~'}
                                                                </h3>
                                                            </div>
                                                        </div>

                                                        {/* Tags */}
                                                        <div className="flex gap-2 flex-wrap mt-2">
                                                            {tags.map((e, index) => (
                                                                <div
                                                                    key={index}
                                                                    className="text-xs px-5 py-1 rounded-full bg-yellow-400 border-2 border-yellow-400 text-blueSTI group-hover:bg-blueSTI group-hover:border-white group-hover:text-white"
                                                                    onClick={() => onTagClick(e)} 
                                                                >
                                                                    {e}
                                                                </div>
                                                            ))}
                                                        </div>

                                                        {/* Detail Lokasi, Jenis Magang, Gaji */}
                                                        <div className="mt-2 text-sm text-gray-600 space-y-1">
                                                            <div className="flex items-center gap-2 group-hover:text-white">
                                                                <HiLocationMarker className="group-hover:text-white" />
                                                                <span className="overflow-hidden text-ellipsis whitespace-nowrap max-w-[200px]">
                                                                    {item.Alamat}
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center">
                                                                <p className="flex items-center gap-2 group-hover:text-white">
                                                                    <HiDesktopComputer />
                                                                    {item.Pengalaman}
                                                                </p>
                                                            </div>
                                                            <div className="flex items-center">
                                                                <p className="flex items-center gap-2 group-hover:text-white">
                                                                    <HiBriefcase />
                                                                    {item.TipeMagang}
                                                                </p>
                                                            </div>
                                                            <div className="flex items-center">
                                                                <p className="flex items-center gap-2 group-hover:text-white">
                                                                    <HiCurrencyDollar />
                                                                    {item.Gaji ? new Intl.NumberFormat('id-ID').format(Number(item.Gaji)) : '~'}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </>
                                    )}
                                </>
                            ) : user?.roles?.includes("mitra") ? (
                                <>
                                {/* Mitra */}
                                    {(dataLogangMitra?.length === 0) ? (
                                        <div className="col-span-full text-center text-gray-500 p-4">
                                            Maaf, kami tidak menemukan lowongan Magang yang sesuai.
                                        </div>
                                    ) : (
                                        <>
                                            {/* Data untuk Mitra */}
                                            {dataLogangMitra.map((item) => {
                                                const tags = item.Tags?.split(',') || [];

                                                return (
                                                    <div
                                                        key={item.id}
                                                        className="flex flex-col gap-3 p-4 rounded-lg shadow-md border bg-white hover:bg-blueSTI hover:text-white hover:shadow-lg transition-all ease-in cursor-pointer min-h-[00px] group"
                                                    >
                                                        <div className="flex items-center">
                                                            {/* Logo */}
                                                            <div className="h-12 w-12">
                                                                <img
                                                                    src={item?.Logo ? `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/storage/imglogo/${item.Logo}` : '/default_logo.png'}
                                                                    alt={item.NamaPerusahaan || 'Company Logo'}
                                                                    className="h-full w-full object-cover"
                                                                />
                                                            </div>
                                                            <div className="ml-4 flex flex-col max-w-[70%]">
                                                                {/* Nama Perusahaan */}
                                                                <p
                                                                    onClick={() => onClickButton(String(item.id))}
                                                                    className="overflow-hidden text-gray-800 group-hover:text-yellow-300 font-semibold text-base truncate"
                                                                >
                                                                    {item.NamaPerusahaan ?? '~'}
                                                                </p>
                                                                {/* Posisi Magang */}
                                                                <h3
                                                                    onClick={() => onClickButton(String(item.id))}
                                                                    className="overflow-hidden text-gray-600 group-hover:text-yellow-300 font-medium text-sm truncate"
                                                                >
                                                                    {item.Posisi ?? '~'}
                                                                </h3>
                                                            </div>
                                                        </div>

                                                        {/* Tags */}
                                                        <div className="flex gap-2 flex-wrap mt-2">
                                                            {tags.map((e, index) => (
                                                                <div
                                                                    key={index}
                                                                    className="text-xs px-5 py-1 rounded-full bg-yellow-400 border-2 border-yellow-400 text-blueSTI group-hover:bg-blueSTI group-hover:border-white group-hover:text-white"
                                                                    onClick={() => onTagClick(e)} 
                                                                >
                                                                    {e}
                                                                </div>
                                                            ))}
                                                        </div>

                                                        {/* Detail Lokasi, Jenis Magang, Gaji */}
                                                        <div className="mt-2 text-sm text-gray-600 space-y-1">
                                                            <div className="flex items-center gap-2 group-hover:text-white">
                                                                <HiLocationMarker className="group-hover:text-white" />
                                                                <span className="overflow-hidden text-ellipsis whitespace-nowrap max-w-[200px]">
                                                                    {item.Alamat}
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center">
                                                                <p className="flex items-center gap-2 group-hover:text-white">
                                                                    <HiDesktopComputer />
                                                                    {item.Pengalaman}
                                                                </p>
                                                            </div>
                                                            <div className="flex items-center">
                                                                <p className="flex items-center gap-2 group-hover:text-white">
                                                                    <HiBriefcase />
                                                                    {item.TipeMagang}
                                                                </p>
                                                            </div>
                                                            <div className="flex items-center">
                                                                <p className="flex items-center gap-2 group-hover:text-white">
                                                                    <HiCurrencyDollar />
                                                                    {item.Gaji ? new Intl.NumberFormat('id-ID').format(Number(item.Gaji)) : '~'}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </>
                                    )}
                                </>
                            ) : null
                        }        
                        </div>
                    </div>
                </div>
            </main>
        </div> 
    ) 
}